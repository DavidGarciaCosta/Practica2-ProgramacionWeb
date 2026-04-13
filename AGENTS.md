# AGENTS.md

## Purpose

This file is the single source of operational context for AI coding agents working on this repository.

Its purpose is to let an agent understand the project quickly, avoid unnecessary repository exploration, reduce token usage, and generate reliable Cypress E2E tests without inventing routes, selectors, commands, endpoints, or behaviors.

Agents must read this file before exploring other files.

If this file conflicts with the code, the code is the source of truth.

---

# Primary Agent Mission

The main mission for agents in this repository is:

1. Understand the application with minimal exploration.
2. Use real code and documentation evidence only.
3. Generate robust Cypress E2E tests.
4. Show a markdown preview before writing any files.
5. Write files only after explicit human approval.
6. Never invent missing information.

---

# Core Rules

## Never invent information

Do not invent:

- frontend routes
- selectors
- UI elements
- startup commands
- environment variables beyond what is defined in code
- seeded users
- admin credentials
- hidden pages
- GraphQL operations not exposed in UI
- auth persistence behavior beyond what is confirmed

If something cannot be confirmed from code or docs, report a gap instead of guessing.

---

## Minimize token usage

Do not scan the whole repository.

Use this exploration order:

1. `KIWITCMS.md`
2. `AGENTS.md`
3. `README.md`
4. `queriesMutations.md`
5. `server.js`
6. `config.js`
7. `src/public/login.html`
8. `src/public/register.html`
9. `src/public/products.html`
10. `src/public/cart.html`
11. `src/public/my-orders.html`
12. `src/public/admin.html`
13. `src/public/chat.html`
14. `src/public/client.js`
15. `src/public/cart.js`
16. `src/public/graphql-client.js`
17 `src/routes/authRoutes.js`
18. `src/routes/productRoutes.js`
19. `src/routes/adminRoutes.js`
20. `src/graphql/schema.js`
21. `src/graphql/resolvers.js`

Stop exploring as soon as enough evidence is obtained.

---

## Low-priority areas

Avoid spending tokens on:

- `node_modules/`
- generated files
- build output
- coverage
- large assets
- styling details unless they affect selectors
- backend internals unrelated to the flow being tested

---

# Real Project Overview

This repository implements a **Node.js + Express web application** with:

- JWT authentication
- GraphQL business operations
- static HTML frontend pages
- JavaScript frontend logic
- product browsing
- shopping cart
- order creation
- personal order history
- admin management flows
- chat functionality

Frontend is **not** React, Vue, Angular, or Next.
Frontend is implemented as **static HTML + JavaScript** served by Express from:

```text
src/public/
Real Repository Structure
Important root files

README.md

queriesMutations.md

server.js

config.js

Explicacion.md

Documentacion_Practica2_DavidGarcia.pdf

Source tree
src/
├── graphql/
│   ├── schema.js
│   └── resolvers.js
├── middleware/
│   └── authenticateJWT.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Message.js
├── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── products.html
│   ├── cart.html
│   ├── my-orders.html
│   ├── admin.html
│   ├── chat.html
│   ├── cart.js
│   ├── client.js
│   ├── graphql-client.js
│   └── styles.css
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── adminRoutes.js
Runtime and Server Facts
Server entry

Main backend entry:

server.js
Config file

Main config:

config.js
Confirmed runtime defaults

From config.js:

default port: 3000

default MongoDB URI: mongodb://localhost:27017/portal-productos-practica2

default JWT secret fallback exists

default environment: development

Static frontend serving

From server.js:

Express serves static frontend from src/public

GraphQL endpoint is mounted at /graphql

REST auth routes are mounted at /api/auth

product REST routes are mounted at /api/products

admin REST routes are mounted at /api/admin

Important note about package.json

No package.json is present in the uploaded repository zip.

Agents must not invent npm scripts.
If runnable Cypress setup requires package manager commands, the agent must mark that gap explicitly.

Authentication System

Authentication uses JWT.

Confirmed REST endpoints
POST /api/auth/register
POST /api/auth/login
GET /api/auth/verify
Auth header format
Authorization: Bearer <token>
Confirmed roles
user
admin
Confirmed frontend token storage

From src/public/client.js and src/public/graphql-client.js:

auth token is stored in sessionStorage

key used: token

Confirmed logout behavior

From src/public/client.js:

logout removes sessionStorage.token

logout also removes localStorage.cart

logout redirects to /

Confirmed auth redirect behavior

From src/public/client.js:

requireAuth() redirects unauthenticated users to /login

Important:
The frontend files are named login.html, register.html, etc., but redirects in JS may use extensionless routes like /login.
Agents must respect the actual code behavior and not normalize it unless necessary.

GraphQL Overview

GraphQL is implemented in:

src/graphql/schema.js
src/graphql/resolvers.js
Confirmed GraphQL endpoint

From src/public/graphql-client.js:

/graphql
Confirmed frontend auth behavior for GraphQL

From src/public/graphql-client.js:

GraphQL requests include Authorization: Bearer <token> when token exists

on GraphQL auth errors, token is removed from sessionStorage

on auth failure, frontend redirects to /login

Documented GraphQL areas

Business operations include:

Product operations

list products

get product by id

create product

update product stock

delete product

Order operations

create order

cancel order

update order status

list orders

get order details

order statistics

User admin operations

list users

update user role

delete user

Agents must still verify which of these operations are actually exposed in the UI before generating E2E specs.

Frontend Pages

Frontend pages are located in:

src/public/
Confirmed pages

index.html

login.html

register.html

products.html

cart.html

my-orders.html

admin.html

chat.html

Confirmed frontend JS files

client.js

cart.js

graphql-client.js

These files are high-priority for test generation.

Real UI Facts and Selectors

This section contains real selectors and IDs confirmed from the uploaded code.

Agents should prefer these before inspecting more deeply.

Index page

File:

src/public/index.html

Confirmed IDs:

cart-badge

userWelcome

loginBtn

registerBtn

logoutBtn

Useful selectors:

#loginBtn

#registerBtn

#logoutBtn

#cart-badge

#userWelcome

Login page

File:

src/public/login.html

Confirmed form:

#loginForm

Confirmed field IDs:

#email

#password

Other confirmed IDs:

#togglePassword

#rememberMe

#errorMessage

#successMessage

Useful selectors:

#loginForm

#email

#password

#togglePassword

#rememberMe

#errorMessage

#successMessage

Safe button strategy:

submit inside #loginForm

avoid brittle text-only selectors if a form submit is enough

Register page

File:

src/public/register.html

Confirmed form:

#registerForm

Confirmed field IDs:

#username

#email

#password

#confirmPassword

#acceptTerms

#newsletter

#errorMessage

#successMessage

Confirmed role inputs:

radio inputs with name="role"

Useful selectors:

#registerForm

#username

#email

#password

#confirmPassword

input[name="role"]

#acceptTerms

#newsletter

#errorMessage

#successMessage

Products page

File:

src/public/products.html

Confirmed IDs:

#cart-badge

#adminLink

#userWelcome

#logoutBtn

#createProductBtn

#searchInput

#categoryFilter

#productsGrid

#pagination

#prevPage

#pageInfo

#nextPage

#productModal

#modalTitle

#productForm

#productName

#productDescription

#productPrice

#productStock

#productCategory

#productImage

Useful selectors:

#productsGrid

#searchInput

#categoryFilter

#createProductBtn

#productModal

#productForm

#productName

#productDescription

#productPrice

#productStock

#productCategory

#productImage

#adminLink

#logoutBtn

Important:
This page clearly contains both product browsing UI and an admin-oriented product modal/form.
Agents must inspect visibility/role logic before assuming non-admin users can access product creation.

Cart page

File:

src/public/cart.html

Confirmed IDs:

#cart-badge

#userWelcome

#logoutBtn

#cartItems

#subtotal

#total

#checkoutForm

#address

#city

#postalCode

#country

#notes

#checkoutBtn

Useful selectors:

#cartItems

#subtotal

#total

#checkoutForm

#address

#city

#postalCode

#country

#notes

#checkoutBtn

My Orders page

File:

src/public/my-orders.html

Confirmed IDs:

#cart-badge

#userWelcome

#logoutBtn

#ordersContent

Useful selectors:

#ordersContent

#logoutBtn

#userWelcome

Admin page

File:

src/public/admin.html

Confirmed IDs:

#userWelcome

#logoutBtn

#statsGrid

#tab-orders

#orderStatusFilter

#ordersTable

#tab-users

#usersTable

#tab-products

#orderModal

#orderModalContent

Useful selectors:

#statsGrid

#tab-orders

#orderStatusFilter

#ordersTable

#tab-users

#usersTable

#tab-products

#orderModal

#orderModalContent

#logoutBtn

Chat page

File:

src/public/chat.html

Confirmed form:

#messageForm

Confirmed IDs:

#onlineCount

#logoutBtn

#userAvatar

#usernameDisplay

#userStatus

#userList

#messagesContainer

#typingIndicator

#typingUser

#messageInput

#sendMessage

#charCount

Useful selectors:

#messageForm

#messageInput

#sendMessage

#messagesContainer

#typingIndicator

#userList

#onlineCount

Frontend Logic Facts
client.js

Confirmed behaviors:

token read from sessionStorage.getItem('token')

auth verification uses /api/auth/verify

unauthenticated users are redirected to /login

admin-only elements use .admin-only

authenticated-user elements use .user-only

logout buttons use #logoutBtn or .logout-btn

Useful selectors and conventions from logic:

.admin-only

.user-only

#logoutBtn

.logout-btn

These are valid evidence-backed selectors.

cart.js

Confirmed behaviors:

cart is stored in localStorage under key cart

cart updates emit window.dispatchEvent(new CustomEvent('cartUpdated'))

adding more quantity than stock is rejected

invalid quantities are handled in code

cart UI updates dynamically

Implications for E2E:

tests can assert cart persistence through localStorage

tests can cover stock rejection scenarios

tests should clear localStorage.cart between runs when needed

graphql-client.js

Confirmed behaviors:

GraphQL endpoint default is /graphql

uses POST requests

sets Content-Type: application/json

includes bearer token when session token exists

auth-related GraphQL errors trigger token removal and redirect to /login

Implications for E2E:

authenticated GraphQL flows depend on sessionStorage.token

unauthorized GraphQL access should redirect to /login

Confirmed Main User Flows
Registration

Primary file:

src/public/register.html

Likely core selectors:

#registerForm

#username

#email

#password

#confirmPassword

input[name="role"]

#acceptTerms

Happy path:

fill registration form

submit valid data

receive success state

Negative scenarios:

duplicate username

duplicate email

invalid email

missing fields

unchecked required terms if enforced by UI

Login

Primary file:

src/public/login.html

Selectors:

#loginForm

#email

#password

#rememberMe

Happy path:

submit valid credentials

session token stored

authenticated navigation available

Negative scenarios:

wrong credentials

missing fields

Product Browsing

Primary file:

src/public/products.html

Selectors:

#productsGrid

#searchInput

#categoryFilter

#cart-badge

Happy path:

load products

filter or search

add to cart

Negative / resilience scenarios:

empty search results

unavailable product interaction if surfaced

bad stock behavior where UI exposes it

Cart and Checkout

Primary file:

src/public/cart.html

Selectors:

#cartItems

#checkoutForm

#address

#city

#postalCode

#country

#notes

#checkoutBtn

Happy path:

cart contains products

fill shipping information

submit checkout

order is created

Negative scenarios:

missing address

missing city

missing postal code

missing country

invalid or empty cart state

Break scenarios:

double submit

checkout with empty cart if UI allows the attempt

checkout with malformed input if not prevented by UI

My Orders

Primary file:

src/public/my-orders.html

Selectors:

#ordersContent

Happy path:

authenticated user sees own orders

Negative scenarios:

unauthenticated access should redirect or fail according to code

Admin

Primary file:

src/public/admin.html

Selectors:

#tab-orders

#ordersTable

#tab-users

#usersTable

#tab-products

#statsGrid

Happy path:

admin user can access admin panel

tabs render corresponding data

Negative scenarios:

non-admin user must not access admin capabilities

unauthorized access must fail

Important:
Generate admin specs only if the page logic confirms the flows are functional enough for E2E.

Chat

Primary file:

src/public/chat.html

Selectors:

#messageForm

#messageInput

#sendMessage

#messagesContainer

Happy path:

authenticated user sends a message if chat logic is active

Only generate chat E2E if the runtime behavior is stable and clearly implemented.

Cypress E2E Mission

The main testing goal is to generate reliable Cypress E2E tests for real user-facing flows.

All generated files must live under:

test_e2e/

No other output location is allowed.

Required Cypress Output Structure

Minimum expected structure:

test_e2e/
├── README.md
├── package.json
├── cypress.config.ts
└── cypress/
    ├── e2e/
    │   ├── auth/
    │   ├── products/
    │   ├── orders/
    │   ├── admin/
    │   └── chat/
    └── support/
        ├── e2e.ts
        └── commands.ts

Only create folders and specs supported by evidence.

Recommended Cypress Spec Priority

Generate specs in this order if the code supports them:

auth/register.cy.ts
auth/login.cy.ts
products/browse-products.cy.ts
orders/create-order.cy.ts
orders/my-orders.cy.ts
admin/manage-products.cy.ts
admin/manage-orders.cy.ts
admin/manage-users.cy.ts
chat/basic-chat.cy.ts

Admin and chat specs must only be generated if implementation evidence is strong enough.

Coverage Policy
Happy Path

Prioritize:

successful registration

successful login

browsing products

adding item to cart

successful order creation

viewing own orders

Negative Scenarios

Cover where supported:

duplicate registration

invalid email

missing required fields

incorrect credentials

unauthorized access

incomplete checkout

invalid stock/quantity interactions if surfaced by UI

Break-the-App Scenarios

Include when supported by code:

repeated submit

malformed input

unauthorized navigation

non-admin access to admin page

checkout with invalid data

invalid cart state

If the UI does not expose a behavior, do not fabricate a test for it.

Selector Policy

Use real selectors from this file first.

Preferred selector order

confirmed unique IDs from this file

.admin-only / .user-only when relevant

stable form structure such as #loginForm, #registerForm, #checkoutForm

button within a known form

visible text only as fallback

Avoid

Do not prefer:

nth-child selectors

long CSS chains

layout-based selectors

style-only classes

fragile DOM paths

Selector risk rule

If a selector is not strong enough:

mark the selector as risky

choose the least fragile fallback

explain the limitation in test_e2e/README.md if needed

Preview Before Write

Agents must never write tests immediately.

Required workflow:

analyze AGENTS.md

inspect critical files only

create Cypress test plan

generate complete test bundle

present bundle in markdown

wait for human feedback

apply requested corrections

validate bundle

write files into test_e2e/

Writing files before approval is forbidden.

Validation Rules

Before writing generated files, validate at least:

every file path is under test_e2e/

test_e2e/README.md exists

test_e2e/package.json exists

test_e2e/cypress.config.ts exists

test_e2e/cypress/support/e2e.ts exists

test_e2e/cypress/support/commands.ts exists

spec files contain real Cypress tests

TypeScript files are not empty

Cypress dependency exists in generated test_e2e/package.json

If validation fails, stop and report errors.

Command Discovery Policy

Because the repository zip does not include package.json, agents must not invent project commands.

Do not assume:

npm install

npm run dev

npm start

npm test

unless those commands are later confirmed from a real package.json or explicit human input.

If test setup needs commands, report the gap clearly.

Uncertainty Policy

When uncertain, agents must explicitly report the gap.

Common uncertainty areas in this project:

exact extensionless vs .html route handling in browser navigation

whether all documented GraphQL operations are fully exposed in UI

seeded user credentials

seeded admin credentials

chat feature runtime stability

exact local startup steps because package.json is absent from the uploaded zip

If a gap affects test generation, document it inside test_e2e/README.md.

What Agents Should Inspect Next

After reading this file, inspect in this exact order:

KIWITCMS.md

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

src/public/chat.html

src/public/client.js

src/public/cart.js

src/public/graphql-client.js

src/routes/authRoutes.js

src/routes/productRoutes.js

src/routes/adminRoutes.js

src/graphql/schema.js

src/graphql/resolvers.js

Inspect more only if evidence is still missing.

Maintenance Rules

Update this file when:

auth flow changes

page names or IDs change

GraphQL endpoint changes

cart or order flow changes

admin UI changes

selector conventions are added

package.json is added

testing strategy changes

Keep this file compact, factual, and operational.
