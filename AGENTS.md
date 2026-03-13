# AGENTS.md

## Purpose

This file is the **authoritative operational guide for AI coding agents** working on this repository.

Its purpose is to allow an AI agent to understand the application **without scanning the entire repository**, minimizing token usage while preserving accuracy.

Agents must treat this file as the **primary context source** before exploring the repository.

If information here conflicts with the code, the code is the source of truth.

---

# Agent Mission

The main mission of any AI agent working on this repository is:

1. Understand the application architecture quickly.
2. Map documented requirements to actual code evidence.
3. Generate **Cypress End-to-End tests** safely.
4. Avoid inventing routes, selectors, APIs, or behaviors.
5. Produce a **markdown preview before writing any files**.
6. Write files **only after explicit human approval**.

---

# Core Operating Principles

Agents must follow these rules strictly.

### Never invent information

Do not invent:

- frontend routes
- selectors
- UI elements
- authentication behavior
- admin capabilities
- seeded users
- environment variables
- ports
- startup commands

If something cannot be confirmed from code or documentation, **report a gap** instead of guessing.

---

### Minimize repository exploration

Agents must not scan the entire repository.

Use the following **exploration order**:

1. `AGENTS.md`
2. `README.md`
3. `queriesMutations.md`
4. `package.json`
5. `src/` routing files
6. `src/` authentication pages/components
7. registration/login forms
8. product listing and product detail UI
9. cart/order UI
10. admin UI if it exists
11. existing tests if present

Stop exploration **as soon as enough evidence is found**.

---

### Low-priority areas

Agents should avoid spending tokens exploring:

- node_modules
- build outputs
- dist
- coverage
- assets
- images
- vendor code
- generated files
- unrelated utilities

---

# Repository Overview

The repository contains:

- `src/` → main application code
- `README.md` → functional documentation and Gherkin scenarios
- `queriesMutations.md` → GraphQL queries and mutations
- `server.js` → backend server entry
- `config.js` → backend configuration
- `Documentacion_Practica2_DavidGarcia.pdf` → project documentation
- `Explicacion.md` → explanatory notes

The application appears to be a **web application with authentication, product browsing, and order management**.

---

# Application Domain

The project implements functionality similar to an **e-commerce or order management system**.

Main business capabilities include:

- user registration
- login with JWT authentication
- token verification
- product browsing
- product detail queries
- cart and order creation
- viewing user orders
- administrative management of users, products, and orders

---

# Authentication System

Authentication uses **JWT tokens**.

Confirmed endpoints:


POST /api/auth/register
POST /api/auth/login
GET /api/auth/verify


Tokens must be sent with:


Authorization: Bearer <token>


Roles confirmed in the system:


user
admin


Agents must verify in code:

- where the token is stored
- whether the token is in localStorage, cookies, or session
- how logout works
- how protected routes are implemented

Do not assume these behaviors without evidence.

---

# GraphQL Domain

The business logic uses **GraphQL operations** for most domain actions.

Confirmed areas include:

### Product operations

- product list
- product by id
- stock updates
- product creation
- product deletion

### Order operations

- create order
- cancel order
- update order status
- view orders
- view order detail
- order statistics

### User operations

- list users
- update user role
- delete user

Agents must confirm:

- the GraphQL endpoint
- how the frontend sends GraphQL requests
- which flows are actually exposed in the UI

---

# Known Frontend Flows

Documentation confirms the following frontend navigation examples:


/products
/cart


Typical user journey:

1. register account
2. login
3. browse products
4. add products to cart
5. go to cart
6. enter shipping information
7. checkout
8. create order via GraphQL

Agents must confirm actual routes in code before generating tests.

---

# Cypress E2E Strategy

AI agents generating tests must follow these rules.

### Output directory

All generated files must be written under:


test_e2e/


No other directory is allowed.

---

### Required test structure

Minimum expected output:


test_e2e/
├─ README.md
├─ package.json
├─ cypress.config.ts
└─ cypress/
├─ e2e/
│ ├─ auth/
│ ├─ products/
│ ├─ orders/
│ └─ admin/
└─ support/
├─ e2e.ts
└─ commands.ts


---

# Test Generation Rules

Tests must only cover flows **supported by code evidence**.

Never fabricate UI flows.

---

## Required Coverage

### Happy Path

Examples:

- successful registration
- successful login
- browsing products
- adding product to cart
- successful checkout
- viewing personal orders

---

### Negative Scenarios

Examples:

- duplicate registration
- invalid email
- missing fields
- incorrect credentials
- unauthorized access
- incomplete checkout

---

### Break-the-App Attempts

Where evidence supports it:

- repeated form submission
- malformed input
- navigation to protected areas without auth
- admin actions from non-admin role
- checkout with invalid state

If the UI does not expose the behavior, do not generate a test.

---

# Selector Policy

Agents must inspect real code to identify selectors.

### Preferred selector priority

1. `data-cy`
2. `data-testid`
3. accessible roles
4. form labels
5. aria-label
6. stable ids

---

### Avoid

- nth-child selectors
- deep CSS chains
- styling classes
- layout dependent selectors

---

### If selectors are weak

Agents must:

- mark selector reliability as low
- choose the least fragile option
- document the risk inside `test_e2e/README.md`

---

# Preview-Before-Write Policy

Agents must never write files immediately.

Required workflow:

1. generate proposed Cypress bundle
2. present files in markdown
3. wait for human feedback
4. apply revisions
5. validate bundle
6. write files

---

# Validation Rules

Before writing tests ensure:

- all files are under `test_e2e/`
- Cypress config exists
- support files exist
- spec files contain real tests
- TypeScript files are not empty
- Cypress dependency exists in package.json

If validation fails, stop and report errors.

---

# Uncertainty Policy

When something is unclear, agents must explicitly report the gap.

Common uncertainty areas:

- frontend routes
- selector stability
- admin UI existence
- token persistence method
- environment variables
- local startup commands
- API base URL
- GraphQL endpoint

Agents must never fabricate these.

---

# Suggested Test Plan Priority

Tests should be generated in this order if code supports them:


auth/register.cy.ts
auth/login.cy.ts
products/browse-products.cy.ts
orders/create-order.cy.ts
orders/my-orders.cy.ts
admin/manage-orders.cy.ts
admin/manage-products.cy.ts
admin/manage-users.cy.ts


Admin tests should only be generated if admin UI exists.

---

# Command Discovery

Agents must inspect `package.json` before assuming:

- install command
- start command
- test command
- dev server port
- backend port

Do not assume:


npm run dev
npm start
npm test


unless confirmed.

---

# Files To Inspect Next

After reading this file, agents should inspect:

1. README.md
2. queriesMutations.md
3. package.json
4. server.js
5. config.js
6. routing files inside src/
7. authentication pages/components
8. product pages
9. cart/order pages
10. admin pages
11. existing tests

Stop exploration once the necessary context is obtained.

---

# Maintenance

This file must be updated when:

- authentication flow changes
- routes change
- product/order flows change
- admin capabilities change
- testing strategy changes
- selector conventions are introduced

This document must remain **compact, factual, and optimized for agents**.
