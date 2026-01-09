const jwt = require('jsonwebtoken');
const config = require('../../config');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Token inválido o expirado'
                });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Token no proporcionado'
        });
    }
};

const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Acceso denegado. Se requieren permisos de administrador'
        });
    }
};

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        config.jwtSecret,
        { expiresIn: '24h' }
    );
};

module.exports = {
    authenticateJWT,
    requireAdmin,
    generateToken
};