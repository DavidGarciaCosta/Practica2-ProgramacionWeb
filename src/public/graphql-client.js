class GraphQLClient {
    constructor(endpoint = '/graphql') {
        this.endpoint = endpoint;
    }

    async query(query, variables = {}) {
        const token = sessionStorage.getItem('token');
        
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify({ query, variables })
            });

            // Verificar si la respuesta es JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Respuesta del servidor no es JSON');
            }

            const result = await response.json();

            // Verificar errores de GraphQL
            if (result.errors) {
                const errorMessage = result.errors[0].message;
                console.error('GraphQL Error:', result.errors);
                
                // Manejar errores de autenticación
                if (errorMessage.includes('No autenticado') || errorMessage.includes('No autorizado')) {
                    sessionStorage.removeItem('token');
                    window.location.href = '/login';
                    return null;
                }
                
                throw new Error(errorMessage);
            }

            return result.data;

        } catch (error) {
            console.error('GraphQL Client Error:', error);
            
            // Mostrar error al usuario
            if (typeof window.showNotification === 'function') {
                window.showNotification(`❌ Error: ${error.message}`, 'error');
            } else {
                alert(`Error: ${error.message}`);
            }
            
            throw error;
        }
    }
}

const client = new GraphQLClient();

// API GraphQL mejorada
window.GraphQLAPI = {
    // Productos
    getProducts: async (page = 1, limit = 20, category = null, search = null) => {
        const query = `
            query GetProducts($page: Int, $limit: Int, $category: String, $search: String) {
                products(page: $page, limit: $limit, category: $category, search: $search) {
                    id
                    name
                    description
                    price
                    category
                    image
                    stock
                    createdAt
                }
            }
        `;
        
        const data = await client.query(query, { page, limit, category, search });
        return data ? data.products : [];
    },

    getProduct: async (id) => {
        const query = `
            query GetProduct($id: ID!) {
                product(id: $id) {
                    id
                    name
                    description
                    price
                    category
                    image
                    stock
                    createdAt
                }
            }
        `;
        
        const data = await client.query(query, { id });
        return data ? data.product : null;
    },

    // Pedidos
    getOrders: async (status = null) => {
        const query = `
            query GetOrders($status: String) {
                orders(status: $status) {
                    id
                    user {
                        id
                        username
                        email
                    }
                    items {
                        product
                        name
                        price
                        quantity
                        image
                    }
                    total
                    status
                    shippingAddress {
                        address
                        city
                        postalCode
                        country
                    }
                    orderNumber
                    itemCount
                    createdAt
                    updatedAt
                }
            }
        `;
        
        const data = await client.query(query, { status });
        return data ? data.orders : [];
    },

    getMyOrders: async () => {
        const query = `
            query GetMyOrders {
                myOrders {
                    id
                    items {
                        product
                        name
                        price
                        quantity
                        image
                    }
                    total
                    status
                    shippingAddress {
                        address
                        city
                        postalCode
                        country
                    }
                    orderNumber
                    itemCount
                    createdAt
                }
            }
        `;
        
        const data = await client.query(query);
        return data ? data.myOrders : [];
    },

    createOrder: async (input) => {
        const mutation = `
            mutation CreateOrder($input: CreateOrderInput!) {
                createOrder(input: $input) {
                    success
                    message
                    order {
                        id
                        orderNumber
                        total
                        status
                        createdAt
                    }
                }
            }
        `;
        
        const data = await client.query(mutation, { input });
        return data ? data.createOrder : { success: false, message: 'Error desconocido', order: null };
    },

    updateOrderStatus: async (orderId, status) => {
        const mutation = `
            mutation UpdateOrderStatus($orderId: ID!, $status: String!) {
                updateOrderStatus(orderId: $orderId, status: $status) {
                    success
                    message
                    order {
                        id
                        status
                        orderNumber
                    }
                }
            }
        `;
        
        const data = await client.query(mutation, { orderId, status });
        return data ? data.updateOrderStatus : { success: false, message: 'Error desconocido', order: null };
    },

    cancelOrder: async (orderId) => {
        const mutation = `
            mutation CancelOrder($orderId: ID!) {
                cancelOrder(orderId: $orderId) {
                    success
                    message
                    order {
                        id
                        status
                        orderNumber
                    }
                }
            }
        `;
        
        const data = await client.query(mutation, { orderId });
        return data ? data.cancelOrder : { success: false, message: 'Error desconocido', order: null };
    },

    // Usuarios (solo admin)
    getUsers: async () => {
        const query = `
            query GetUsers {
                users {
                    id
                    username
                    email
                    role
                    isOnline
                    createdAt
                }
            }
        `;
        
        const data = await client.query(query);
        return data ? data.users : [];
    },

    updateUserRole: async (userId, role) => {
        const mutation = `
            mutation UpdateUserRole($userId: ID!, $role: String!) {
                updateUserRole(userId: $userId, role: $role) {
                    success
                    message
                    user {
                        id
                        username
                        role
                    }
                }
            }
        `;
        
        const data = await client.query(mutation, { userId, role });
        return data ? data.updateUserRole : { success: false, message: 'Error desconocido', user: null };
    },

    deleteUser: async (userId) => {
        const mutation = `
            mutation DeleteUser($userId: ID!) {
                deleteUser(userId: $userId) {
                    success
                    message
                    user {
                        id
                        username
                    }
                }
            }
        `;
        
        const data = await client.query(mutation, { userId });
        return data ? data.deleteUser : { success: false, message: 'Error desconocido', user: null };
    },

    // Productos (solo admin)
    updateProductStock: async (productId, stock) => {
        const mutation = `
            mutation UpdateProductStock($productId: ID!, $stock: Int!) {
                updateProductStock(productId: $productId, stock: $stock) {
                    success
                    message
                    product {
                        id
                        name
                        stock
                    }
                }
            }
        `;
        
        const data = await client.query(mutation, { productId, stock });
        return data ? data.updateProductStock : { success: false, message: 'Error desconocido', product: null };
    },

    createProduct: async (productData) => {
        const mutation = `
            mutation CreateProduct(
                $name: String!,
                $description: String!,
                $price: Float!,
                $category: String!,
                $stock: Int!,
                $image: String
            ) {
                createProduct(
                    name: $name,
                    description: $description,
                    price: $price,
                    category: $category,
                    stock: $stock,
                    image: $image
                ) {
                    success
                    message
                    product {
                        id
                        name
                        price
                        stock
                        category
                    }
                }
            }
        `;
        
        const data = await client.query(mutation, productData);
        return data ? data.createProduct : { success: false, message: 'Error desconocido', product: null };
    },

    deleteProduct: async (productId) => {
        const mutation = `
            mutation DeleteProduct($productId: ID!) {
                deleteProduct(productId: $productId) {
                    success
                    message
                    product {
                        id
                        name
                    }
                }
            }
        `;
        
        const data = await client.query(mutation, { productId });
        return data ? data.deleteProduct : { success: false, message: 'Error desconocido', product: null };
    },

    // Estadísticas (solo admin)
    getOrderStats: async () => {
        const query = `
            query GetOrderStats {
                orderStats {
                    total
                    pending
                    completed
                    cancelled
                    totalRevenue
                }
            }
        `;
        
        const data = await client.query(query);
        return data ? data.orderStats : {
            total: 0,
            pending: 0,
            completed: 0,
            cancelled: 0,
            totalRevenue: 0
        };
    }
};