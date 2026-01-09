const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const path = require('path');

const config = require('./config');
const typeDefs = require('./src/graphql/schema');
const resolvers = require('./src/graphql/resolvers');

const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const User = require('./src/models/User');
const Message = require('./src/models/Message');
const Order = require('./src/models/Order');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    pingTimeout: 60000,
    pingInterval: 25000
});

// =====================
// CONFIGURACIÓN GENERAL
// =====================

const PUBLIC_PATH = path.join(__dirname, 'src', 'public');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(PUBLIC_PATH));

// =====================
// MONGODB
// =====================

mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(() => {
        console.log('✅ MongoDB conectado');
        console.log(`📊 Base de datos: ${mongoose.connection.name}`);
        console.log(`👥 Colecciones: ${Object.keys(mongoose.connection.collections).join(', ')}`);
    })
    .catch(err => {
        console.error('❌ Error conectando a MongoDB:', err.message);
        process.exit(1);
    });

// Manejar eventos de conexión
mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose conectado');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Error de Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose desconectado');
});

// =====================
// APOLLO GRAPHQL
// =====================

async function startApolloServer() {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const authHeader = req.headers.authorization || '';
            const token = authHeader.replace('Bearer ', '');

            if (token) {
                try {
                    const user = jwt.verify(token, config.jwtSecret);
                    return { user };
                } catch (error) {
                    console.log('Token inválido:', error.message);
                    // No lanzamos error para permitir acceso público a algunas queries
                }
            }

            return { user: null };
        },
        formatError: (error) => {
            console.error('GraphQL Error:', error);
            return {
                message: error.message,
                locations: error.locations,
                path: error.path
            };
        }
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ 
        app, 
        path: '/graphql',
        cors: false
    });

    console.log(`🚀 GraphQL disponible en http://localhost:${config.port}${apolloServer.graphqlPath}`);
}

// =====================
// RUTAS REST API
// =====================

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// Verificar token - Mejorada
app.get('/api/auth/verify', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ 
                success: false, 
                message: 'Token no proporcionado' 
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Usuario no encontrado' 
            });
        }

        res.json({ 
            success: true, 
            user: user.toProfileJSON() 
        });
    } catch (error) {
        console.error('Error en verify:', error.message);
        res.status(401).json({ 
            success: false, 
            message: 'Token inválido o expirado' 
        });
    }
});

// Pedidos REST - Mejorada
app.get('/api/orders', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Token no proporcionado' 
            });
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        
        const query = { user: decoded.id };
        if (req.query.status) {
            if (!['pending', 'completed', 'cancelled'].includes(req.query.status)) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Estado inválido' 
                });
            }
            query.status = req.query.status;
        }

        const orders = await Order.find(query)
            .populate('user', 'username email')
            .sort({ createdAt: -1 });

        res.json({ 
            success: true, 
            orders 
        });
    } catch (error) {
        console.error('Error en /api/orders:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener pedidos' 
        });
    }
});

// =====================
// RUTAS HTML
// =====================

const serveHtml = (file) => (req, res) => {
    const filePath = path.join(PUBLIC_PATH, file);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error enviando ${file}:`, err);
            res.status(404).send('Archivo no encontrado');
        }
    });
};

app.get('/', serveHtml('index.html'));
app.get('/login', serveHtml('login.html'));
app.get('/register', serveHtml('register.html'));
app.get('/products', serveHtml('products.html'));
app.get('/cart', serveHtml('cart.html'));
app.get('/my-orders', serveHtml('my-orders.html'));
app.get('/admin', serveHtml('admin.html'));
app.get('/chat', serveHtml('chat.html'));

// =====================
// SOCKET.IO (CHAT) - Mejorado
// =====================

const connectedUsers = new Map();

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Token no proporcionado'));
    }

    try {
        socket.user = jwt.verify(token, config.jwtSecret);
        next();
    } catch (error) {
        next(new Error('Token inválido'));
    }
});

io.on('connection', async (socket) => {
    console.log(`✅ Usuario conectado: ${socket.user.username} (ID: ${socket.user.id})`);
    connectedUsers.set(socket.id, socket.user);

    // Actualizar estado del usuario
    await User.findByIdAndUpdate(socket.user.id, { 
        isOnline: true 
    });

    // Enviar historial de mensajes
    try {
        const messages = await Message.find()
            .sort({ createdAt: -1 })
            .limit(50);
        socket.emit('message history', messages.reverse());
    } catch (error) {
        console.error('Error cargando historial:', error);
    }

    // Notificar a todos sobre el nuevo usuario
    io.emit('user connected', {
        username: socket.user.username,
        userId: socket.user.id,
        onlineUsers: Array.from(connectedUsers.values()).map(u => ({
            username: u.username,
            userId: u.id
        }))
    });

    // Enviar contador actualizado
    io.emit('user count', connectedUsers.size);

    // Manejar mensajes de chat
    socket.on('chat message', async (msg) => {
        try {
            const message = await new Message({
                user: socket.user.username,
                userId: socket.user.id,
                message: msg,
                room: 'general'
            }).save();

            io.emit('chat message', {
                user: socket.user.username,
                userId: socket.user.id,
                message: msg,
                timestamp: message.createdAt,
                role: socket.user.role
            });
        } catch (error) {
            console.error('Error guardando mensaje:', error);
            socket.emit('error', 'Error al enviar mensaje');
        }
    });

    // Manejar escritura
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            user: socket.user.username
        });
    });

    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', socket.user.username);
    });

    // Manejar desconexión
    socket.on('disconnect', async () => {
        console.log(`❌ Usuario desconectado: ${socket.user.username}`);
        connectedUsers.delete(socket.id);

        try {
            await User.findByIdAndUpdate(socket.user.id, { 
                isOnline: false 
            });

            io.emit('user disconnected', {
                username: socket.user.username,
                onlineUsers: Array.from(connectedUsers.values()).map(u => ({
                    username: u.username,
                    userId: u.id
                }))
            });

            io.emit('user count', connectedUsers.size);
        } catch (error) {
            console.error('Error actualizando estado:', error);
        }
    });

    // Manejar errores
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

// =====================
// ADMIN POR DEFECTO
// =====================

async function createDefaultAdmin() {
    try {
        const exists = await User.findOne({ email: 'admin@portal.com' });
        if (!exists) {
            const admin = new User({
                username: 'admin',
                email: 'admin@portal.com',
                password: 'admin123',
                role: 'admin'
            });
            
            await admin.save();
            console.log('✅ Usuario admin creado:');
            console.log('   Email: admin@portal.com');
            console.log('   Contraseña: admin123');
        } else {
            console.log('✅ Usuario admin ya existe');
            // Actualizar contraseña por si acaso
            if (exists.role !== 'admin') {
                exists.role = 'admin';
                await exists.save();
                console.log('   Rol actualizado a admin');
            }
        }
    } catch (error) {
        console.error('❌ Error creando admin:', error);
    }
}

// =====================
// INICIAR SERVIDOR
// =====================

startApolloServer().then(() => {
    server.listen(config.port, async () => {
        console.log('\n' + '='.repeat(50));
        console.log('🚀 SERVICIO INICIADO');
        console.log('='.repeat(50));
        console.log(`📡 URL: http://localhost:${config.port}`);
        console.log(`📊 Panel admin: http://localhost:${config.port}/admin`);
        console.log(`🛒 Carrito: http://localhost:${config.port}/cart`);
        console.log(`💬 Chat: http://localhost:${config.port}/chat`);
        console.log(`🛍️ Productos: http://localhost:${config.port}/products`);
        console.log(`⚡ GraphQL: http://localhost:${config.port}/graphql`);
        console.log('='.repeat(50) + '\n');
        
        await createDefaultAdmin();
    });
});

// =====================
// MANEJO DE ERRORES GLOBAL
// =====================

process.on('uncaughtException', (error) => {
    console.error('⚠️ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});

// =====================
// CIERRE LIMPIO
// =====================

process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando servidor...');
    
    try {
        // Desconectar todos los sockets
        io.disconnectSockets();
        
        // Cerrar conexión MongoDB
        await mongoose.connection.close();
        
        console.log('✅ Servidor cerrado correctamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error cerrando servidor:', error);
        process.exit(1);
    }
});