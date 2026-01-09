const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            max: 100
        },
        image: {
            type: String,
            default: ''
        }
    }],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
        index: true
    },
    shippingAddress: {
        address: { 
            type: String, 
            required: true,
            trim: true 
        },
        city: { 
            type: String, 
            required: true,
            trim: true 
        },
        postalCode: { 
            type: String, 
            required: true,
            trim: true 
        },
        country: { 
            type: String, 
            required: true,
            trim: true 
        }
    },
    paymentMethod: {
        type: String,
        default: 'cash',
        enum: ['cash', 'card', 'transfer']
    },
    notes: {
        type: String,
        default: '',
        trim: true,
        maxlength: 500
    }
}, { 
    timestamps: true 
});

// Virtual para número de pedido
orderSchema.virtual('orderNumber').get(function() {
    const date = new Date(this.createdAt);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const idPart = this._id.toString().slice(-6).toUpperCase();
    return `ORD-${year}${month}-${idPart}`;
});

// Virtual para contar items
orderSchema.virtual('itemCount').get(function() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Configurar virtuals para JSON
orderSchema.set('toJSON', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.__v;
        return ret;
    }
});

orderSchema.set('toObject', { 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.__v;
        return ret;
    }
});

// Indexes para mejor performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });

// Método de instancia
orderSchema.methods.getSummary = function() {
    return {
        id: this._id,
        orderNumber: this.orderNumber,
        itemCount: this.itemCount,
        total: this.total,
        status: this.status,
        createdAt: this.createdAt
    };
};

module.exports = mongoose.model('Order', orderSchema);