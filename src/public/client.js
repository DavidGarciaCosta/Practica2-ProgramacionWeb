// Funciones auxiliares del cliente

export async function checkAuth() {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
        return null;
    }

    try {
        const response = await fetch('/api/auth/verify', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.user;
        } else {
            sessionStorage.removeItem('token');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        sessionStorage.removeItem('token');
        return null;
    }
}

export function requireAuth(redirectUrl = '/login') {
    const token = sessionStorage.getItem('token');
    if (!token) {
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}

export function updateUIForUser(user) {
    const adminElements = document.querySelectorAll('.admin-only');
    const userElements = document.querySelectorAll('.user-only');
    
    if (user && user.role === 'admin') {
        adminElements.forEach(el => el.style.display = 'block');
    } else {
        adminElements.forEach(el => el.style.display = 'none');
    }
    
    if (user) {
        userElements.forEach(el => el.style.display = 'block');
    } else {
        userElements.forEach(el => el.style.display = 'none');
    }
}

export function setupLogout() {
    const logoutBtns = document.querySelectorAll('#logoutBtn, .logout-btn');
    
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sessionStorage.removeItem('token');
            localStorage.removeItem('cart');
            window.location.href = '/';
        });
    });
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        z-index: 1000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;
    
    if (type === 'success') {
        notification.style.background = '#27ae60';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else if (type === 'warning') {
        notification.style.background = '#f39c12';
    } else {
        notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

export async function authFetch(url, options = {}) {
    const token = sessionStorage.getItem('token');
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers,
        },
    };
    
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (response.status === 401) {
        sessionStorage.removeItem('token');
        window.location.href = '/login';
        return null;
    }
    
    return response;
}

// Inyectar estilos para notificaciones
if (!document.querySelector('style[data-notifications]')) {
    const style = document.createElement('style');
    style.setAttribute('data-notifications', 'true');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}