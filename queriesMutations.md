### QUERIES

#### 1. Obtener todos los productos
```graphql
query GetProducts {
  products {
    id
    name
    description
    price
    category
    image
    stock
    createdAt
  }
}
```

**Con filtros:**
```graphql
query GetProducts($page: Int, $limit: Int, $category: String, $search: String) {
  products(page: $page, limit: $limit, category: $category, search: $search) {
    id
    name
    price
    stock
  }
}
```

Variables:
```json
{
  "page": 1,
  "limit": 20,
  "category": "Electrónica",
  "search": "laptop"
}
```

#### 2. Obtener un producto por ID
```graphql
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    description
    price
    category
    image
    stock
    createdAt
  }
}
```

Variables:
```json
{
  "id": "507f1f77bcf86cd799439011"
}
```

#### 3. Obtener mis pedidos (usuario autenticado)
```graphql
query GetMyOrders {
  myOrders {
    id
    items {
      name
      price
      quantity
      image
    }
    total
    status
    shippingAddress {
      address
      city
      postalCode
      country
    }
    orderNumber
    itemCount
    createdAt
  }
}
```

**Requiere:** Token JWT del usuario

#### 4. Obtener todos los pedidos (solo admin)
```graphql
query GetOrders($status: String) {
  orders(status: $status) {
    id
    user {
      username
      email
    }
    items {
      name
      price
      quantity
    }
    total
    status
    orderNumber
    createdAt
  }
}
```

Variables (opcional):
```json
{
  "status": "pending"
}
```

**Requiere:** Token JWT de admin

#### 5. Obtener detalle de un pedido
```graphql
query GetOrder($id: ID!) {
  order(id: $id) {
    id
    user {
      username
      email
    }
    items {
      product
      name
      price
      quantity
      image
    }
    total
    status
    shippingAddress {
      address
      city
      postalCode
      country
    }
    notes
    orderNumber
    itemCount
    createdAt
    updatedAt
  }
}
```

Variables:
```json
{
  "id": "67def123456789abcdef0123"
}
```

#### 6. Obtener lista de usuarios (solo admin)
```graphql
query GetUsers {
  users {
    id
    username
    email
    role
    isOnline
    createdAt
  }
}
```

**Requiere:** Token JWT de admin

#### 7. Obtener estadísticas de pedidos (solo admin)
```graphql
query GetOrderStats {
  orderStats {
    total
    pending
    completed
    cancelled
    totalRevenue
  }
}
```

**Requiere:** Token JWT de admin

---

###  MUTATIONS

#### 1. Crear un pedido ( FUNCIONALIDAD PRINCIPAL)
```graphql
mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    success
    message
    order {
      id
      orderNumber
      total
      status
      createdAt
    }
  }
}
```

Variables:
```json
{
  "input": {
    "items": [
      {
        "product": "507f1f77bcf86cd799439011",
        "name": "Laptop HP Pavilion",
        "price": 799.99,
        "quantity": 1,
        "image": "https://example.com/laptop.jpg"
      },
      {
        "product": "507f1f77bcf86cd799439012",
        "name": "Mouse Logitech",
        "price": 29.99,
        "quantity": 2,
        "image": "https://example.com/mouse.jpg"
      }
    ],
    "total": 859.97,
    "shippingAddress": {
      "address": "Calle Mayor 123",
      "city": "Bilbao",
      "postalCode": "48001",
      "country": "España"
    },
    "notes": "Dejar en portería si no hay nadie"
  }
}
```

**Requiere:** Token JWT del usuario

**Validaciones automáticas:**
- Verifica stock disponible
- Valida que los precios no hayan cambiado
- Valida el total calculado
- Actualiza stock automáticamente
- Crea el pedido con estado "pending"

#### 2. Actualizar estado de pedido (solo admin)
```graphql
mutation UpdateOrderStatus($orderId: ID!, $status: String!) {
  updateOrderStatus(orderId: $orderId, status: $status) {
    success
    message
    order {
      id
      status
      orderNumber
    }
  }
}
```

Variables:
```json
{
  "orderId": "67def123456789abcdef0123",
  "status": "completed"
}
```

**Estados válidos:** `pending`, `completed`, `cancelled`

**Requiere:** Token JWT de admin

#### 3. Cancelar un pedido
```graphql
mutation CancelOrder($orderId: ID!) {
  cancelOrder(orderId: $orderId) {
    success
    message
    order {
      id
      status
      orderNumber
    }
  }
}
```

Variables:
```json
{
  "orderId": "67def123456789abcdef0123"
}
```

**Requiere:** Token JWT del propietario o admin

#### 4. Cambiar rol de usuario (solo admin)
```graphql
mutation UpdateUserRole($userId: ID!, $role: String!) {
  updateUserRole(userId: $userId, role: $role) {
    success
    message
    user {
      id
      username
      role
    }
  }
}
```

Variables:
```json
{
  "userId": "507f1f77bcf86cd799439020",
  "role": "admin"
}
```

**Roles válidos:** `user`, `admin`

**Requiere:** Token JWT de admin

#### 5. Eliminar usuario (solo admin)
```graphql
mutation DeleteUser($userId: ID!) {
  deleteUser(userId: $userId) {
    success
    message
    user {
      id
      username
    }
  }
}
```

Variables:
```json
{
  "userId": "507f1f77bcf86cd799439020"
}
```

**Requiere:** Token JWT de admin

**Protección:** No se puede auto-eliminar

#### 6. Crear producto (solo admin)
```graphql
mutation CreateProduct(
  $name: String!,
  $description: String!,
  $price: Float!,
  $category: String!,
  $stock: Int!,
  $image: String
) {
  createProduct(
    name: $name,
    description: $description,
    price: $price,
    category: $category,
    stock: $stock,
    image: $image
  ) {
    success
    message
    product {
      id
      name
      price
      stock
    }
  }
}
```

Variables:
```json
{
  "name": "Teclado Mecánico",
  "description": "Teclado mecánico RGB para gaming",
  "price": 89.99,
  "category": "Electrónica",
  "stock": 50,
  "image": "https://example.com/keyboard.jpg"
}
```

**Requiere:** Token JWT de admin

#### 7. Actualizar stock de producto (solo admin)
```graphql
mutation UpdateProductStock($productId: ID!, $stock: Int!) {
  updateProductStock(productId: $productId, stock: $stock) {
    success
    message
    product {
      id
      name
      stock
    }
  }
}
```

Variables:
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "stock": 100
}
```

**Requiere:** Token JWT de admin

#### 8. Eliminar producto (solo admin)
```graphql
mutation DeleteProduct($productId: ID!) {
  deleteProduct(productId: $productId) {
    success
    message
    product {
      id
      name
    }
  }
}
```

Variables:
```json
{
  "productId": "507f1f77bcf86cd799439011"
}
```

**Requiere:** Token JWT de admin

---

##  Autenticación

### Obtener token JWT

**Endpoint REST:**
```
POST http://localhost:3000/api/auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439020",
    "username": "usuario",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### Usar token en GraphQL

En cada request a `/graphql`, incluir el header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

##  Flujo de Prueba Completo

### 1. Registrar un usuario
```bash
POST http://localhost:3000/api/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123"
}
```

### 2. Hacer login
```bash
POST http://localhost:3000/api/auth/login
{
  "email": "test@example.com",
  "password": "test123"
}
# Guardar el token recibido
```

### 3. Ver productos (GraphQL)
```graphql
query {
  products {
    id
    name
    price
    stock
  }
}
```

### 4. Añadir al carrito (Frontend)
- Ir a http://localhost:3000/products
- Hacer clic en "Añadir al Carrito" en varios productos
- Ver badge del carrito actualizado

### 5. Finalizar compra vía GraphQL (Frontend automático)
- Ir a http://localhost:3000/cart
- Llenar formulario de dirección
- Clic en "Finalizar Compra"
- El frontend automáticamente ejecuta la mutation `createOrder`

### 6. Ver mis pedidos
```graphql
query {
  myOrders {
    orderNumber
    total
    status
    items {
      name
      quantity
    }
  }
}
```

---

