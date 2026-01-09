class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('cart');
            if (saved) {
                this.items = JSON.parse(saved);
                console.log('Carrito cargado:', this.items.length, 'items');
            }
        } catch (error) {
            console.error('Error cargando carrito:', error);
            this.items = [];
        }
        this.updateCartUI();
    }

    saveToStorage() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.items));
            console.log('Carrito guardado:', this.items.length, 'items');
        } catch (error) {
            console.error('Error guardando carrito:', error);
        }
        this.updateCartUI();
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity <= product.stock) {
                existingItem.quantity = newQuantity;
                this.saveToStorage();
                this.showNotification(`✅ ${product.name} actualizado (${newQuantity} unidades)`);
                return true;
            } else {
                this.showNotification(`❌ Stock insuficiente para ${product.name}. Máximo: ${product.stock}`, 'error');
                return false;
            }
        } else {
            if (quantity <= product.stock) {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                    image: product.image || '',
                    stock: product.stock
                });
                this.saveToStorage();
                this.showNotification(`✅ ${product.name} añadido al carrito`);
                return true;
            } else {
                this.showNotification(`❌ Stock insuficiente`, 'error');
                return false;
            }
        }
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else if (quantity <= item.stock) {
                item.quantity = quantity;
                this.saveToStorage();
                this.showNotification(`📦 ${item.name}: ${quantity} unidades`);
            } else {
                this.showNotification(`❌ Stock insuficiente. Máximo: ${item.stock}`, 'error');
            }
        }
    }

    removeItem(productId) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            const item = this.items[itemIndex];
            this.items.splice(itemIndex, 1);
            this.saveToStorage();
            this.showNotification(`🗑️ ${item.name} eliminado del carrito`);
        }
    }

    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.showNotification('🛒 Carrito vaciado');
    }

    getTotal() {
        return this.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateCartUI() {
        const badge = document.getElementById('cart-badge');
        const count = this.getItemCount();
        
        if (badge) {
            if (count > 0) {
                badge.textContent = count > 99 ? '99+' : count;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
        
        // Actualizar contador en todas las páginas
        document.querySelectorAll('.cart-count').forEach(el => {
            if (count > 0) {
                el.textContent = count;
                el.style.display = 'inline';
            } else {
                el.style.display = 'none';
            }
        });
    }

    showNotification(message, type = 'success') {
        // Eliminar notificación existente
        const existing = document.querySelector('.cart-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${type === 'error' ? '#e74c3c' : 
                        type === 'warning' ? '#f39c12' : '#27ae60'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 600;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-eliminar después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Añadir estilos CSS si no existen
        if (!document.querySelector('#cart-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'cart-notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    prepareOrderData(shippingAddress, notes = '') {
        return {
            items: this.items.map(item => ({
                product: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            total: this.getTotal(),
            shippingAddress,
            notes
        };
    }

    // Verificar stock antes de checkout
    async validateStock() {
        const token = sessionStorage.getItem('token');
        if (!token) return { valid: false, message: 'No autenticado' };
        
        try {
            for (const item of this.items) {
                const response = await fetch(`/api/products/${item.id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.product.stock < item.quantity) {
                        return {
                            valid: false,
                            message: `Stock insuficiente para ${item.name}. Disponible: ${data.product.stock}`
                        };
                    }
                }
            }
            return { valid: true, message: 'Stock validado correctamente' };
        } catch (error) {
            console.error('Error validando stock:', error);
            return { valid: false, message: 'Error al validar stock' };
        }
    }
}

// Crear instancia global
window.cart = new ShoppingCart();

// Inicializar carrito en todas las páginas
document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartUI();
});