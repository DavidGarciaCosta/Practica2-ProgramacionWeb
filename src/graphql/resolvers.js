const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const resolvers = {
    Query: {
        // Productos
        products: async (_, { page = 1, limit = 20, category, search }) => {
            try {
                const query = {};
                
                if (category) {
                    query.category = category;
                }
                
                if (search) {
                    query.$or = [
                        { name: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } }
                    ];
                }
                
                const products = await Product.find(query)
                    .sort({ createdAt: -1 })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .populate('createdBy', 'username email');
                
                return products;
            } catch (error) {
                console.error('Error en products query:', error);
                throw new Error('Error al obtener productos');
            }
        },

        product: async (_, { id }) => {
            try {
                const product = await Product.findById(id).populate('createdBy', 'username email');
                if (!product) throw new Error('Producto no encontrado');
                return product;
            } catch (error) {
                console.error('Error en product query:', error);
                throw new Error('Error al obtener producto');
            }
        },

        // Pedidos
        orders: async (_, { status }, { user }) => {
            try {
                if (!user) throw new Error('No autenticado');
                
                const query = {};
                
                // Si es usuario normal, solo ve sus pedidos
                if (user.role === 'user') {
                    query.user = user.id;
                }
                
                // Filtrar por estado si se proporciona
                if (status) {
                    query.status = status;
                }
                
                const orders = await Order.find(query)
                    .populate('user', 'username email')
                    .sort({ createdAt: -1 });
                
                return orders;
            } catch (error) {
                console.error('Error en orders query:', error);
                throw new Error('Error al obtener pedidos');
            }
        },

        order: async (_, { id }, { user }) => {
            try {
                if (!user) throw new Error('No autenticado');
                
                const order = await Order.findById(id)
                    .populate('user', 'username email')
                    .populate('items.product', 'name category');
                
                if (!order) throw new Error('Pedido no encontrado');
                
                // Verificar permisos
                if (user.role !== 'admin' && order.user._id.toString() !== user.id) {
                    throw new Error('No autorizado');
                }
                
                return order;
            } catch (error) {
                console.error('Error en order query:', error);
                throw new Error('Error al obtener pedido');
            }
        },

        myOrders: async (_, __, { user }) => {
            try {
                if (!user) throw new Error('No autenticado');
                
                const orders = await Order.find({ user: user.id })
                    .sort({ createdAt: -1 });
                
                return orders;
            } catch (error) {
                console.error('Error en myOrders query:', error);
                throw new Error('Error al obtener pedidos');
            }
        },

        // Usuarios
        users: async (_, __, { user }) => {
            try {
                if (!user || user.role !== 'admin') throw new Error('No autorizado');
                
                const users = await User.find()
                    .select('-password')
                    .sort({ createdAt: -1 });
                
                return users;
            } catch (error) {
                console.error('Error en users query:', error);
                throw new Error('Error al obtener usuarios');
            }
        },

        user: async (_, { id }, { user }) => {
            try {
                if (!user || user.role !== 'admin') throw new Error('No autorizado');
                
                const userDoc = await User.findById(id).select('-password');
                if (!userDoc) throw new Error('Usuario no encontrado');
                return userDoc;
            } catch (error) {
                console.error('Error en user query:', error);
                throw new Error('Error al obtener usuario');
            }
        },

        // Estadísticas
        orderStats: async (_, __, { user }) => {
            try {
                if (!user || user.role !== 'admin') throw new Error('No autorizado');
                
                const total = await Order.countDocuments();
                const pending = await Order.countDocuments({ status: 'pending' });
                const completed = await Order.countDocuments({ status: 'completed' });
                const cancelled = await Order.countDocuments({ status: 'cancelled' });
                
                const revenueResult = await Order.aggregate([
                    { $match: { status: 'completed' } },
                    { $group: { _id: null, total: { $sum: '$total' } } }
                ]);
                
                const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

                return {
                    total,
                    pending,
                    completed,
                    cancelled,
                    totalRevenue
                };
            } catch (error) {
                console.error('Error en orderStats query:', error);
                throw new Error('Error al obtener estadísticas');
            }
        }
    },

    Mutation: {
        createOrder: async (_, { input }, { user }) => {
            try {
                if (!user) throw new Error('No autenticado');

                // Validar items
                if (!input.items || input.items.length === 0) {
                    return {
                        success: false,
                        message: 'El carrito está vacío',
                        order: null
                    };
                }

                // Verificar stock y calcular total real
                let calculatedTotal = 0;
                for (const item of input.items) {
                    const product = await Product.findById(item.product);
                    
                    if (!product) {
                        return {
                            success: false,
                            message: `Producto "${item.name}" no encontrado`,
                            order: null
                        };
                    }
                    
                    if (product.stock < item.quantity) {
                        return {
                            success: false,
                            message: `Stock insuficiente para "${product.name}". Disponible: ${product.stock}`,
                            order: null
                        };
                    }
                    
                    // Validar que el precio no haya cambiado
                    if (Math.abs(product.price - item.price) > 0.01) {
                        return {
                            success: false,
                            message: `El precio de "${product.name}" ha cambiado. Actualice el carrito.`,
                            order: null
                        };
                    }
                    
                    calculatedTotal += product.price * item.quantity;
                }

                // Validar total
                if (Math.abs(calculatedTotal - input.total) > 0.01) {
                    return {
                        success: false,
                        message: 'El total no coincide con los productos',
                        order: null
                    };
                }

                // Crear pedido
                const order = new Order({
                    user: user.id,
                    items: input.items,
                    total: calculatedTotal,
                    shippingAddress: input.shippingAddress,
                    notes: input.notes || '',
                    status: 'pending'
                });

                // Guardar pedido
                await order.save();

                // Actualizar stock de productos
                for (const item of input.items) {
                    await Product.findByIdAndUpdate(
                        item.product,
                        { $inc: { stock: -item.quantity } },
                        { new: true }
                    );
                }

                // Actualizar usuario con referencia al pedido
                await User.findByIdAndUpdate(user.id, {
                    $push: { orders: order._id }
                });

                // Populate para respuesta
                await order.populate('user', 'username email');

                return {
                    success: true,
                    message: 'Pedido creado exitosamente',
                    order
                };
            } catch (error) {
                console.error('Error en createOrder mutation:', error);
                return {
                    success: false,
                    message: 'Error al crear el pedido: ' + error.message,
                    order: null
                };
            }
        },

        updateOrderStatus: async (_, { orderId, status }, { user }) => {
            try {
                if (!user || user.role !== 'admin') {
                    return {
                        success: false,
                        message: 'No autorizado',
                        order: null
                    };
                }

                // Validar estado
                if (!['pending', 'completed', 'cancelled'].includes(status)) {
                    return {
                        success: false,
                        message: 'Estado inválido',
                        order: null
                    };
                }

                const order = await Order.findByIdAndUpdate(
                    orderId,
                    { status, updatedAt: Date.now() },
                    { new: true }
                ).populate('user', 'username email');

                if (!order) {
                    return {
                        success: false,
                        message: 'Pedido no encontrado',
                        order: null
                    };
                }

                return {
                    success: true,
                    message: `Estado del pedido actualizado a ${status === 'pending' ? 'En Proceso' : 
                              status === 'completed' ? 'Completado' : 'Cancelado'}`,
                    order
                };
            } catch (error) {
                console.error('Error en updateOrderStatus mutation:', error);
                return {
                    success: false,
                    message: 'Error al actualizar estado del pedido',
                    order: null
                };
            }
        },

        cancelOrder: async (_, { orderId }, { user }) => {
            try {
                if (!user) throw new Error('No autenticado');

                const order = await Order.findById(orderId);
                if (!order) {
                    return {
                        success: false,
                        message: 'Pedido no encontrado',
                        order: null
                    };
                }

                // Verificar permisos
                if (user.role !== 'admin' && order.user.toString() !== user.id) {
                    return {
                        success: false,
                        message: 'No autorizado',
                        order: null
                    };
                }

                // Solo se pueden cancelar pedidos pendientes
                if (order.status !== 'pending') {
                    return {
                        success: false,
                        message: 'Solo se pueden cancelar pedidos en proceso',
                        order: null
                    };
                }

                // Devolver stock
                for (const item of order.items) {
                    await Product.findByIdAndUpdate(
                        item.product,
                        { $inc: { stock: item.quantity } },
                        { new: true }
                    );
                }

                // Actualizar estado
                order.status = 'cancelled';
                order.updatedAt = Date.now();
                await order.save();

                await order.populate('user', 'username email');

                return {
                    success: true,
                    message: 'Pedido cancelado exitosamente',
                    order
                };
            } catch (error) {
                console.error('Error en cancelOrder mutation:', error);
                return {
                    success: false,
                    message: 'Error al cancelar pedido',
                    order: null
                };
            }
        },

        updateUserRole: async (_, { userId, role }, { user }) => {
            try {
                if (!user || user.role !== 'admin') {
                    return {
                        success: false,
                        message: 'No autorizado',
                        user: null
                    };
                }

                // Validar rol
                if (!['user', 'admin'].includes(role)) {
                    return {
                        success: false,
                        message: 'Rol inválido. Use "user" o "admin"',
                        user: null
                    };
                }

                // No permitir modificar tu propio rol
                if (userId === user.id) {
                    return {
                        success: false,
                        message: 'No puedes cambiar tu propio rol',
                        user: null
                    };
                }

                const targetUser = await User.findByIdAndUpdate(
                    userId,
                    { role },
                    { new: true }
                ).select('-password');

                if (!targetUser) {
                    return {
                        success: false,
                        message: 'Usuario no encontrado',
                        user: null
                    };
                }

                return {
                    success: true,
                    message: `Rol de ${targetUser.username} actualizado a ${role}`,
                    user: targetUser
                };
            } catch (error) {
                console.error('Error en updateUserRole mutation:', error);
                return {
                    success: false,
                    message: 'Error al actualizar rol',
                    user: null
                };
            }
        },

        deleteUser: async (_, { userId }, { user }) => {
            try {
                if (!user || user.role !== 'admin') {
                    return {
                        success: false,
                        message: 'No autorizado',
                        user: null
                    };
                }

                // No permitir eliminarte a ti mismo
                if (userId === user.id) {
                    return {
                        success: false,
                        message: 'No puedes eliminarte a ti mismo',
                        user: null
                    };
                }

                const deletedUser = await User.findByIdAndDelete(userId);

                if (!deletedUser) {
                    return {
                        success: false,
                        message: 'Usuario no encontrado',
                        user: null
                    };
                }

                return {
                    success: true,
                    message: `Usuario ${deletedUser.username} eliminado exitosamente`,
                    user: deletedUser
                };
            } catch (error) {
                console.error('Error en deleteUser mutation:', error);
                return {
                    success: false,
                    message: 'Error al eliminar usuario',
                    user: null
                };
            }
        },

        updateProductStock: async (_, { productId, stock }, { user }) => {
            try {
                if (!user || user.role !== 'admin') {
                    return {
                        success: false,
                        message: 'No autorizado',
                        product: null
                    };
                }

                // Validar stock
                if (stock < 0) {
                    return {
                        success: false,
                        message: 'El stock no puede ser negativo',
                        product: null
                    };
                }

                const product = await Product.findByIdAndUpdate(
                    productId,
                    { stock },
                    { new: true }
                );

                if (!product) {
                    return {
                        success: false,
                        message: 'Producto no encontrado',
                        product: null
                    };
                }

                return {
                    success: true,
                    message: `Stock de ${product.name} actualizado a ${stock}`,
                    product
                };
            } catch (error) {
                console.error('Error en updateProductStock mutation:', error);
                return {
                    success: false,
                    message: 'Error al actualizar stock',
                    product: null
                };
            }
        },

        createProduct: async (_, { name, description, price, category, stock, image }, { user }) => {
            try {
                if (!user || user.role !== 'admin') {
                    return {
                        success: false,
                        message: 'No autorizado',
                        product: null
                    };
                }

                // Validar datos
                if (price < 0) {
                    return {
                        success: false,
                        message: 'El precio no puede ser negativo',
                        product: null
                    };
                }

                if (stock < 0) {
                    return {
                        success: false,
                        message: 'El stock no puede ser negativo',
                        product: null
                    };
                }

                const product = new Product({
                    name,
                    description,
                    price,
                    category,
                    stock,
                    image: image || '',
                    createdBy: user.id
                });

                await product.save();
                await product.populate('createdBy', 'username email');

                return {
                    success: true,
                    message: `Producto "${name}" creado exitosamente`,
                    product
                };
            } catch (error) {
                console.error('Error en createProduct mutation:', error);
                return {
                    success: false,
                    message: 'Error al crear producto',
                    product: null
                };
            }
        },

        deleteProduct: async (_, { productId }, { user }) => {
            try {
                if (!user || user.role !== 'admin') {
                    return {
                        success: false,
                        message: 'No autorizado',
                        product: null
                    };
                }

                const product = await Product.findByIdAndDelete(productId);

                if (!product) {
                    return {
                        success: false,
                        message: 'Producto no encontrado',
                        product: null
                    };
                }

                return {
                    success: true,
                    message: `Producto "${product.name}" eliminado exitosamente`,
                    product
                };
            } catch (error) {
                console.error('Error en deleteProduct mutation:', error);
                return {
                    success: false,
                    message: 'Error al eliminar producto',
                    product: null
                };
            }
        }
    }
};

module.exports = resolvers;