const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../middleware/authenticateJWT');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'El usuario o email ya existe'
            });
        }

        const user = new User({
            username,
            email,
            password,
            role: role || 'user'
        });

        await user.save();

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            token,
            user: user.toProfileJSON()
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        const token = generateToken(user);

        res.json({
            success: true,
            message: 'Inicio de sesión exitoso',
            token,
            user: user.toProfileJSON()
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
});

router.get('/verify', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token no proporcionado'
            });
        }

        const token = authHeader.split(' ')[1];
        const jwt = require('jsonwebtoken');
        const config = require('../../config');
        
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findById(decoded.id);
        
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
        res.status(401).json({
            success: false,
            message: 'Token inválido'
        });
    }
});

module.exports = router;