const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authenticateJWT, requireAdmin } = require('../middleware/authenticateJWT');

router.get('/', authenticateJWT, async (req, res) => {
    try {
        const { page = 1, limit = 20, category, search } = req.query;
        
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
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .populate('createdBy', 'username');
        
        const total = await Product.countDocuments(query);
        
        res.json({
            success: true,
            products,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos'
        });
    }
});

router.get('/:id', authenticateJWT, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('createdBy', 'username');
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener producto'
        });
    }
});

router.post('/', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;
        
        const product = new Product({
            name,
            description,
            price,
            category,
            image,
            stock,
            createdBy: req.user.id
        });
        
        await product.save();
        
        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            product
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear producto'
        });
    }
});

router.put('/:id', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;
        
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, image, stock },
            { new: true, runValidators: true }
        );
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Producto actualizado exitosamente',
            product
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar producto'
        });
    }
});

router.delete('/:id', authenticateJWT, requireAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Producto eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar producto'
        });
    }
});

module.exports = router;