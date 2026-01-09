const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        isOnline: Boolean!
        createdAt: String!
        orders: [Order]
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        category: String!
        image: String
        stock: Int!
        createdAt: String!
        createdBy: User
    }

    type OrderItem {
        product: ID!
        name: String!
        price: Float!
        quantity: Int!
        image: String
    }

    type ShippingAddress {
        address: String!
        city: String!
        postalCode: String!
        country: String!
    }

    type Order {
        id: ID!
        user: User!
        items: [OrderItem!]!
        total: Float!
        status: String!
        shippingAddress: ShippingAddress
        paymentMethod: String
        notes: String
        orderNumber: String!
        itemCount: Int!
        createdAt: String!
        updatedAt: String!
    }

    type OrderStats {
        total: Int!
        pending: Int!
        completed: Int!
        cancelled: Int!
        totalRevenue: Float!
    }

    type QueryResponse {
        success: Boolean!
        message: String!
    }

    type OrderResponse {
        success: Boolean!
        message: String!
        order: Order
    }

    type UserResponse {
        success: Boolean!
        message: String!
        user: User
    }

    type ProductResponse {
        success: Boolean!
        message: String!
        product: Product
    }

    input ShippingAddressInput {
        address: String!
        city: String!
        postalCode: String!
        country: String!
    }

    input OrderItemInput {
        product: ID!
        name: String!
        price: Float!
        quantity: Int!
        image: String
    }

    input CreateOrderInput {
        items: [OrderItemInput!]!
        total: Float!
        shippingAddress: ShippingAddressInput!
        notes: String
    }

    type Query {
        # Productos
        products(page: Int, limit: Int, category: String, search: String): [Product!]!
        product(id: ID!): Product
        
        # Pedidos
        orders(status: String): [Order!]!
        order(id: ID!): Order
        myOrders: [Order!]!
        
        # Usuarios
        users: [User!]!
        user(id: ID!): User
        
        # Estadísticas (solo admin)
        orderStats: OrderStats!
    }

    type Mutation {
        # Gestión de Pedidos
        createOrder(input: CreateOrderInput!): OrderResponse!
        updateOrderStatus(orderId: ID!, status: String!): OrderResponse!
        cancelOrder(orderId: ID!): OrderResponse!
        
        # Gestión de Usuarios (solo admin)
        updateUserRole(userId: ID!, role: String!): UserResponse!
        deleteUser(userId: ID!): UserResponse!
        
        # Gestión de Productos (solo admin)
        updateProductStock(productId: ID!, stock: Int!): ProductResponse!
        createProduct(
            name: String!,
            description: String!,
            price: Float!,
            category: String!,
            stock: Int!,
            image: String
        ): ProductResponse!
        
        deleteProduct(productId: ID!): ProductResponse!
    }
`;

module.exports = typeDefs;