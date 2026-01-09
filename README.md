# Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

**Asignatura:** Programación Web  

**Estudiante:** David Garcia Costa 

**Fecha:** Enero 2026 

**Repositorio:** 

## Descripción

Portal de productos evolucionado a E-commerce completo con GraphQL, gestión de carrito, pedidos y panel de administración.

## Instalación

### Requisitos previos
- Node.js v18 o superior
- MongoDB v6 o superior
- NPM o Yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone 
cd Practica2
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del proyecto:
```env
MONGODB_URI=mongodb://localhost:27017/practica2-ecommerce
JWT_SECRET=tu_clave_secreta_super_segura_aqui
PORT=3000
```

4. **Iniciar MongoDB**
```bash
# En Windows
net start MongoDB

# En Linux/Mac
sudo systemctl start mongod
```

5. **Ejecutar el proyecto**
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

6. **Acceder a la aplicación**
- Frontend: http://localhost:3000
- GraphQL Playground: http://localhost:3000/graphql

##  Estructura del Proyecto

```
Practica2/
├── src/
│   ├── graphql/
│   │   ├── schema.js        # TypeDefs de GraphQL
│   │   └── resolvers.js     # Resolvers (Queries y Mutations)
│   ├── models/
│   │   ├── User.js          # Modelo de Usuario
│   │   ├── Product.js       # Modelo de Producto
│   │   ├── Order.js         # Modelo de Pedido (NUEVO)
│   │   └── Message.js       # Modelo de Mensaje (Chat)
│   ├── routes/
│   │   ├── authRoutes.js    # Rutas REST de autenticación
│   │   ├── productRoutes.js # Rutas REST de productos
│   │   └── adminRoutes.js   # Rutas REST de admin (NUEVO)
│   ├── middleware/
│   │   └── authenticateJWT.js
│   └── public/
│       ├── index.html
│       ├── login.html
│       ├── register.html
│       ├── products.html
│       ├── cart.html        # Página del carrito (NUEVA)
│       ├── my-orders.html   # Mis pedidos (NUEVA)
│       ├── admin.html       # Panel admin mejorado
│       ├── chat.html
│       ├── cart.js          # Lógica del carrito (NUEVA)
│       ├── graphql-client.js # Cliente GraphQL (NUEVO)
│       └── styles.css
├── server.js                # Configuración del servidor
├── config.js
├── package.json
└── README.md
```

##  Tecnologías Utilizadas

- **Backend:**
  - Node.js + Express
  - Apollo Server Express (GraphQL)
  - MongoDB + Mongoose
  - JWT (Autenticación)
  - Socket.IO (Chat en tiempo real)

- **Frontend:**
  - HTML5 + CSS3 + JavaScript vanilla
  - Cliente GraphQL personalizado
  - LocalStorage para persistencia del carrito

## Funcionalidades Implementadas

###  Práctica 1 (Mantenidas)
- Autenticación JWT (login/register)
- Sistema de roles (user/admin)
- CRUD de productos
- Chat en tiempo real con Socket.IO

### Práctica 2 (Nuevas)

#### 1. Panel de Administrador
-  Listar todos los usuarios
-  Cambiar rol de usuarios (user ↔ admin)
-  Eliminar usuarios
-  Visualizar todos los pedidos
-  Filtrar pedidos por estado (pending/completed)
-  Ver detalle de cada pedido
-  Estadísticas de pedidos e ingresos

#### 2. Área de Usuario
-  Añadir productos al carrito
-  Ver carrito con lista de productos
-  Modificar cantidades en el carrito
-  Eliminar productos del carrito
-  Persistencia del carrito en LocalStorage
-  Formulario de dirección de envío
-  Finalizar compra (crea pedido vía GraphQL)
-  Ver mis pedidos
-  Carrito se vacía automáticamente tras compra

#### 3. GraphQL
-  Servidor Apollo Server Express
-  Schema completo con TypeDefs
-  Queries: products, orders, myOrders, users, orderStats
-  Mutations: createOrder, updateOrderStatus, updateUserRole, deleteUser
-  Context con autenticación JWT
-  Convivencia con API REST existente

## Documentación de GraphQL

### Endpoint
```
POST http://localhost:3000/graphql
```

### Autenticación
Incluir token JWT en el header:
```
Authorization: Bearer <tu_token_jwt>
```

---

## Decisiones Técnicas

### ¿Por qué Apollo Server?
- Integración perfecta con Express
- Playground integrado para pruebas
- Excelente manejo de context para autenticación
- Schema-first approach

### ¿Por qué LocalStorage para el carrito?
- Persistencia entre sesiones
- No requiere autenticación para navegar
- Rápido y eficiente
- Se sincroniza al crear el pedido

### ¿Por qué convivencia REST + GraphQL?
- Autenticación mantiene REST (estándar establecido)
- GraphQL para operaciones complejas de datos
- Transición gradual sin romper funcionalidad existente

### Validaciones implementadas
- Stock disponible antes de crear pedido
- Precios actualizados (evita manipulación)
- Total calculado correctamente
- Autenticación en todas las operaciones sensibles
- Autorización por rol (admin/user)

---

##  Modelo de Datos

### Order (Pedido)
```javascript
{
  user: ObjectId,           // Referencia a User
  items: [{
    product: ObjectId,      // Referencia a Product
    name: String,           // Guardado en momento de compra
    price: Number,          // Guardado en momento de compra
    quantity: Number,
    image: String
  }],
  total: Number,
  status: String,           // 'pending', 'completed', 'cancelled'
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,    // 'cash', 'card', 'transfer'
  notes: String,
  createdAt: Date,          // Automático
  updatedAt: Date           // Automático
}
```

