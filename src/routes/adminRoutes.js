const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const { authenticateJWT, requireAdmin } = require('../middleware/authenticateJWT');

router.get('/users', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            users
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios'
        });
    }
});

router.put('/users/:id/role', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const { role } = req.body;
        
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Rol inválido'
            });
        }
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Rol actualizado exitosamente',
            user
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar rol'
        });
    }
});

router.delete('/users/:id', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        if (req.params.id === req.user.id) {
            return res.status(400).json({
                success: false,
                message: 'No puedes eliminarte a ti mismo'
            });
        }
        
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Usuario eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar usuario'
        });
    }
});

router.get('/orders', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const { status } = req.query;
        const query = {};
        
        if (status) {
            query.status = status;
        }
        
        const orders = await Order.find(query)
            .populate('user', 'username email')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            orders
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener pedidos'
        });
    }
});

router.get('/stats', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        const completedOrders = await Order.countDocuments({ status: 'completed' });
        const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });
        
        const revenueResult = await Order.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
        
        res.json({
            success: true,
            stats: {
                total: totalOrders,
                pending: pendingOrders,
                completed: completedOrders,
                cancelled: cancelledOrders,
                totalRevenue: totalRevenue
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener estadísticas'
        });
    }
});

module.exports = router;