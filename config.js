require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portal-productos-practica2',
    jwtSecret: process.env.JWT_SECRET || 'default_secret_change_this',
    nodeEnv: process.env.NODE_ENV || 'development'
};

console.log('🔧 Configuración cargada:');
console.log('  - Puerto:', config.port);
console.log('  - MongoDB:', config.mongoUri);
console.log('  - Entorno:', config.nodeEnv);

module.exports = config;