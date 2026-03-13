# AGENTS.md

## Purpose

This file provides complete operational context for AI agents working on this repository.

The goal is to allow an AI agent to understand the application **without scanning the entire repository**, minimizing token usage while maintaining accuracy.

Agents must read this file before exploring any other files.

If information here conflicts with the code, the code is the source of truth.

---

# Application Overview

This repository implements a **Node.js + Express web application with GraphQL and JWT authentication**.

The application provides:

- user registration
- user login
- JWT authentication
- product browsing
- shopping cart
- order creation
- viewing user orders
- admin management of users, products, and orders
- basic chat functionality

Frontend is implemented as **static HTML pages with JavaScript**, located in:


src/public/


Backend logic is implemented using:


Node.js
Express
GraphQL
JWT authentication


---

# Repository Structure


src/
├── graphql/
│ ├── schema.js
│ └── resolvers.js
│
├── middleware/
│ └── authenticateJWT.js
│
├── models/
│ ├── User.js
│ ├── Product.js
│ ├── Order.js
│ └── Message.js
│
├── public/
│ ├── index.html
│ ├── login.html
│ ├── register.html
│ ├── products.html
│ ├── cart.html
│ ├── my-orders.html
│ ├── admin.html
│ ├── chat.html
│ ├── cart.js
│ ├── client.js
│ └── graphql-client.js
│
├── routes/
│ ├── authRoutes.js
│ ├── productRoutes.js
│ └── adminRoutes.js


Other important files:


server.js
config.js
README.md
queriesMutations.md


---

# Backend Architecture

The backend is built with **Express**.

Main server entry:


server.js


Configuration file:


config.js


Routes are defined in:


src/routes/


Authentication middleware:


src/middleware/authenticateJWT.js


---

# Authentication System

Authentication uses **JWT tokens**.

Endpoints:


POST /api/auth/register
POST /api/auth/login
GET /api/auth/verify


Tokens must be included in requests using:


Authorization: Bearer <token>


Roles supported by the system:


user
admin


---

# GraphQL API

GraphQL is implemented in:


src/graphql/schema.js
src/graphql/resolvers.js


Operations include:

### Product queries

- list products
- get product by id

### Order operations

- create order
- cancel order
- update order status
- view orders
- view order details
- order statistics

### User administration

- list users
- update user role
- delete user

---

# Frontend Pages

Frontend pages are located in:


src/public/


Available pages:


index.html
login.html
register.html
products.html
cart.html
my-orders.html
admin.html
chat.html


JavaScript logic files:


cart.js
client.js
graphql-client.js


---

# Confirmed User Flows

### Registration

Page:


register.html


Flow:

1. user fills registration form
2. frontend calls `/api/auth/register`
3. validation rules apply
4. duplicate email or username must fail

---

### Login

Page:


login.html


Flow:

1. user submits credentials
2. backend returns JWT
3. token must be stored by frontend
4. token used for authenticated requests

---

### Product Browsing

Page:


products.html


Flow:

1. fetch products via GraphQL
2. render product list
3. allow adding products to cart

---

### Cart and Order Creation

Pages:


products.html
cart.html


Flow:

1. user adds items to cart
2. navigates to cart
3. enters shipping information
4. submits order
5. frontend sends GraphQL `createOrder`

---

### Viewing Orders

Page:


my-orders.html


Flow:

1. authenticated user requests own orders
2. orders fetched via GraphQL

---

### Admin Panel

Page:


admin.html


Capabilities may include:

- managing products
- managing orders
- managing users

Admin actions require role `admin`.

---

# Cypress E2E Test Generation

Agents generating Cypress tests must follow these rules.

All generated tests must be placed in:


test_e2e/


No other directory is allowed.

---

# Required Cypress Structure


test_e2e/
├── README.md
├── package.json
├── cypress.config.ts
└── cypress/
├── e2e/
│ ├── auth/
│ ├── products/
│ ├── orders/
│ └── admin/
└── support/
├── e2e.ts
└── commands.ts


---

# Cypress Test Coverage

Tests should cover:

## Happy Path

- successful registration
- successful login
- browsing products
- adding products to cart
- creating order
- viewing personal orders

---

## Negative Scenarios

- duplicate registration
- invalid email
- missing fields
- incorrect login credentials
- unauthorized access

---

## Break-the-App Scenarios

Where supported by UI:

- repeated form submission
- malformed input
- unauthorized navigation
- admin access from non-admin account
- checkout with invalid data

---

# Selector Policy

Agents must inspect HTML to determine selectors.

Preferred selector order:

1. `data-cy`
2. `data-testid`
3. form labels
4. aria-label
5. stable ids

Avoid:

- nth-child selectors
- deep CSS chains
- styling-only classes

---

# Test Generation Workflow

Agents must follow this workflow:

1. analyze AGENTS.md
2. inspect relevant HTML pages
3. inspect JS files controlling behavior
4. create Cypress test plan
5. generate markdown preview
6. wait for human feedback
7. validate bundle
8. write files into `test_e2e/`

Agents must **never write tests before preview approval**.

---

# Files Agents Should Inspect First


README.md
queriesMutations.md
server.js
config.js
src/public/login.html
src/public/register.html
src/public/products.html
src/public/cart.html
src/public/my-orders.html
src/public/admin.html
src/public/cart.js
src/public/client.js
src/public/graphql-client.js


Stop exploration once enough evidence is obtained.

---

# Maintenance

Update this file when:

- authentication logic changes
- frontend pages change
- routes change
- GraphQL schema changes
- testing strategy changes

This file must remain concise and factual.
