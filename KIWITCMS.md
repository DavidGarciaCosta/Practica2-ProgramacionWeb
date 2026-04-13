# Kiwi TCMS

Total publicados: 9

## Indice
1. [UC-01](#uc-01) - Sin proyecto - reviewed
2. [UC-02](#uc-02) - Sin proyecto - reviewed
3. [UC-03](#uc-03) - Sin proyecto - reviewed
4. [UC-04](#uc-04) - Sin proyecto - reviewed
5. [UC-05](#uc-05) - Sin proyecto - reviewed
6. [UC-06](#uc-06) - Sin proyecto - reviewed
7. [UC-07](#uc-07) - Sin proyecto - reviewed
8. [UC-08](#uc-08) - Sin proyecto - reviewed
9. [UC-09](#uc-09) - Sin proyecto - reviewed

---

## UC-01

### Metadatos
- Proyecto asociado: Sin proyecto
- Kiwi: updated
- ID en Kiwi: 404
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 8
- Directos: 6
- Derivados: 2

### Resumen final en Kiwi
UC-01

### Gherkin
```gherkin
Feature: Registro y autenticación de usuario (JWT)

  Background:
    Given el sistema expone las rutas REST "/api/auth/register" y "/api/auth/login" (trazabilidad: "Rutas REST: /api/auth/register, /api/auth/login")

  @direct @RF-01
  Scenario: Registrar un usuario y autenticarse usando JWT
    Given el usuario proporciona credenciales de registro (username, email, password) (trazabilidad: "Entradas username, email, password")
    When el usuario se registra con username y email únicos (trazabilidad: "username/email únicos")
    And el usuario inicia sesión con sus credenciales (trazabilidad: "Rutas REST: /api/auth/login")
    Then el sistema devuelve un token JWT y el perfil básico del usuario (trazabilidad: "Salidas JWT + perfil básico")

  @direct @RF-02
  Scenario: Las contraseñas se almacenan con hash
    Given existe un registro de usuario creado en el sistema (trazabilidad: "Contraseñas almacenadas con hash (bcrypt).")
    When el sistema persiste la contraseña del usuario
    Then la contraseña no queda almacenada en texto plano (trazabilidad: "hash (bcrypt)")

  @direct @RF-03
  Scenario: Enviar el token con esquema Bearer en Authorization
    Given el usuario dispone de un token JWT válido (trazabilidad: "tokens JWT")
    When el usuario invoca una operación que requiere autenticación
    Then el token debe enviarse en la cabecera "Authorization" usando el esquema "Bearer" (trazabilidad: "Authorization: Bearer")

  @direct @RF-04
  Scenario: Exposición de endpoints de registro e inicio de sesión
    When un cliente intenta consumir la funcionalidad de autenticación
    Then el sistema dispone de endpoints REST para registro y login (trazabilidad: "/api/auth/register, /api/auth/login")

  @direct @RF-05
  Scenario: Evitar duplicados de username o email en registro
    Given existe un usuario registrado con un username o email ya existente (trazabilidad: "username/email únicos")
    When se intenta registrar otro usuario con el mismo username o el mismo email
    Then el sistema rechaza el registro por no cumplir unicidad (trazabilidad: "únicos")

  @direct @RF-06
  Scenario: El login devuelve token con id y role
    Given el usuario está previamente registrado (trazabilidad: "registrar usuarios")
    When el usuario realiza login correctamente (trazabilidad: "login")
    Then el sistema devuelve un token válido que incluye id y role del usuario (trazabilidad: "token válido con id y role")

  @derived
  Scenario: Login fallido con credenciales inválidas
    Given existe un usuario registrado (trazabilidad: "El sistema permite ... autenticarlos")
    When el usuario intenta iniciar sesión con credenciales inválidas
    Then el sistema no autentica al usuario y no entrega un token JWT (trazabilidad: "autenticarlos mediante tokens JWT")

  @derived
  Scenario: Registro fallido por datos requeridos ausentes
    Given el registro requiere username, email y password (trazabilidad: "Entradas username, email, password")
    When el usuario intenta registrarse sin aportar alguno de los datos requeridos
    Then el sistema no crea el usuario (trazabilidad: "permite registrar usuarios")

```

---

## UC-02

### Metadatos
- Proyecto asociado: Sin proyecto
- Kiwi: updated
- ID en Kiwi: 405
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 5
- Directos: 2
- Derivados: 3

### Resumen final en Kiwi
UC-02

### Gherkin
```gherkin
Feature: Verificación de token de autenticación

  Background:
    Given el sistema expone el endpoint REST "/api/auth/verify" (trazabilidad: "/api/auth/verify")

  @direct @RF-07
  Scenario: El sistema expone un endpoint para verificación de token
    When un cliente requiere validar su autenticación
    Then puede invocar el endpoint "/api/auth/verify" (trazabilidad: "Rutas REST: ... /api/auth/verify")

  @direct @RF-08
  Scenario: Verificar token válido devuelve perfil sin password
    Given el cliente envía un token válido (trazabilidad: "verificación valida")
    When se verifica el token en "/api/auth/verify" (trazabilidad: "endpoint de verificación")
    Then el sistema devuelve el perfil del usuario sin incluir la password (trazabilidad: "devuelve perfil sin password")

  @derived
  Scenario: Token ausente en verificación
    Given el endpoint valida tokens (trazabilidad: "endpoint de verificación valida")
    When el cliente invoca "/api/auth/verify" sin token
    Then el sistema no valida la sesión del usuario (trazabilidad: "verificación")

  @derived
  Scenario: Token inválido en verificación
    Given el endpoint debe validar token inválido (trazabilidad: "token ... inválido")
    When el cliente envía un token inválido a "/api/auth/verify"
    Then el sistema rechaza la verificación (trazabilidad: "valida token ... inválido")

  @derived
  Scenario: Token expirado en verificación
    Given el endpoint debe validar token expirado (trazabilidad: "token expirado")
    When el cliente envía un token expirado a "/api/auth/verify"
    Then el sistema rechaza la verificación (trazabilidad: "valida token expirado")

```

---

## UC-03

### Metadatos
- Proyecto asociado: Sin proyecto
- Kiwi: updated
- ID en Kiwi: 406
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 5
- Directos: 3
- Derivados: 2

### Resumen final en Kiwi
UC-03

### Gherkin
```gherkin
Feature: Autorización por roles (user/admin)

  Background:
    Given el sistema dispone de roles "user" y "admin" (trazabilidad: "roles (usuario/administrador)")

  @direct @RF-09
  Scenario: Operaciones administrativas requieren rol admin
    Given existe una operación administrativa (trazabilidad: "operaciones administrativas")
    When un usuario con rol distinto de admin intenta ejecutarla
    Then el sistema requiere rol admin para permitir la operación (trazabilidad: "requieren rol admin")

  @direct @RF-10
  Scenario: Bloquear acceso a endpoints/resolvers admin a no-admin
    Given el backend debe impedir accesos a endpoints/resolvers admin (trazabilidad: "impedir accesos")
    When un usuario no-admin intenta acceder a una operación admin
    Then el backend bloquea el acceso (trazabilidad: "a usuarios no admin")

  @direct @RF-11
  Scenario: La autorización en GraphQL se decide desde el contexto (token)
    Given una operación GraphQL requiere autorización (trazabilidad: "autorizar resolvers")
    When el backend evalúa el contexto construido a partir del token (trazabilidad: "contexto (token)")
    Then el resolver permite o deniega el acceso según el rol del usuario (trazabilidad: "para autorizar")

  @derived
  Scenario: Acceso permitido a operación admin con rol admin
    Given un usuario autenticado con rol admin (trazabilidad: "rol admin")
    When intenta acceder a una operación administrativa
    Then el backend permite el acceso (trazabilidad: "operaciones administrativas")

  @derived
  Scenario: Acceso denegado a operación admin con token ausente
    Given el sistema usa el token en el contexto para autorizar (trazabilidad: "contexto (token)")
    When se intenta acceder a una operación admin sin token
    Then el backend deniega el acceso (trazabilidad: "impedir accesos")

```

---

## UC-04

### Metadatos
- Proyecto asociado: Sin proyecto
- Kiwi: updated
- ID en Kiwi: 407
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 7
- Directos: 3
- Derivados: 4

### Resumen final en Kiwi
UC-04

### Gherkin
```gherkin
Feature: Consulta pública del catálogo de productos

  @direct @RF-12
  Scenario: Listar productos con paginación, búsqueda y filtro
    Given el catálogo permite listar productos (trazabilidad: "Listar productos")
    When el visitante consulta el listado con paginación, búsqueda o filtro por categoría (trazabilidad: "paginación, búsqueda y filtro por categoría")
    Then el sistema devuelve una lista de productos acorde a los criterios (trazabilidad: "soporta")

  @direct @RF-13
  Scenario: Consultar detalle de un producto
    Given existe un producto en el catálogo (trazabilidad: "ver detalle de producto")
    When el visitante solicita el detalle del producto
    Then el sistema devuelve la información del producto (trazabilidad: "detalle")

  @direct @RF-14
  Scenario: Disponibilidad de queries GraphQL para catálogo
    When un cliente consume la API GraphQL del catálogo
    Then están disponibles las queries "products" y "product" (trazabilidad: "Query products/product")

  @derived
  Scenario: Paginación con page/limit devuelve subconjunto del catálogo
    Given el listado soporta parámetros de paginación (trazabilidad: "page/limit")
    When el visitante solicita una página concreta con un límite
    Then el sistema devuelve solo los elementos de esa página (trazabilidad: "paginación")

  @derived
  Scenario: Búsqueda por nombre o descripción reduce resultados
    Given el listado soporta búsqueda (trazabilidad: "búsqueda por nombre/descr")
    When el visitante busca por un término
    Then el sistema devuelve productos que coinciden con el nombre o descripción (trazabilidad: "búsqueda")

  @derived
  Scenario: Filtro por categoría reduce resultados
    Given el listado soporta filtro por categoría (trazabilidad: "filtro por categoría")
    When el visitante filtra por una categoría
    Then el sistema devuelve productos de la categoría indicada (trazabilidad: "categoría")

  @derived
  Scenario: Consulta de detalle de producto inexistente
    Given el catálogo permite ver detalle (trazabilidad: "ver detalle")
    When el visitante solicita el detalle de un producto que no existe
    Then el sistema informa que el producto no está disponible (trazabilidad: "producto")

```

---

## UC-05

### Metadatos
- Proyecto asociado: Sin proyecto
- Kiwi: updated
- ID en Kiwi: 408
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 11
- Directos: 9
- Derivados: 2

### Resumen final en Kiwi
UC-05

### Gherkin
```gherkin
Feature: Administración de productos (CRUD/stock)

  Background:
    Given solo admin puede crear/eliminar productos y modificar stock (trazabilidad: "Solo admin puede crear/eliminar productos y modificar stock")

  @direct @RF-15
  Scenario: Crear producto como administrador
    Given un administrador autenticado (trazabilidad: "Solo admin")
    When ejecuta la mutación "createProduct" (trazabilidad: "Mutations: createProduct")
    Then el sistema crea el producto (trazabilidad: "Crear producto")

  @direct @RF-16
  Scenario: Eliminar producto como administrador
    Given un administrador autenticado (trazabilidad: "Solo admin")
    When ejecuta la mutación "deleteProduct" (trazabilidad: "deleteProduct")
    Then el sistema elimina el producto (trazabilidad: "eliminar producto")

  @direct @RF-17
  Scenario: Actualizar stock como administrador
    Given un administrador autenticado (trazabilidad: "modificar stock")
    When ejecuta la mutación "updateProductStock" (trazabilidad: "updateProductStock")
    Then el sistema actualiza el stock del producto (trazabilidad: "actualizar stock")

  @direct @RF-18
  Scenario: Disponibilidad de mutaciones GraphQL de administración de productos
    When un cliente consume la API GraphQL de administración de productos
    Then están disponibles "createProduct", "deleteProduct" y "updateProductStock" (trazabilidad: "Mutations: createProduct, deleteProduct, updateProductStock")

  @direct @RF-19
  Scenario: El listado soporta page/limit
    Given el catálogo soporta listado paginado (trazabilidad: "page/limit")
    When se consulta con "page" y "limit"
    Then el sistema aplica la paginación (trazabilidad: "soporta")

  @direct @RF-20
  Scenario: El listado soporta búsqueda por nombre o descripción
    Given el catálogo soporta búsqueda (trazabilidad: "búsqueda por nombre/descr")
    When se consulta el listado con un término de búsqueda
    Then el sistema filtra por nombre o descripción (trazabilidad: "búsqueda")

  @direct @RF-21
  Scenario: El listado soporta filtro por categoría
    Given el catálogo soporta filtro (trazabilidad: "filtro por categoría")
    When se consulta el listado con una categoría
    Then el sistema filtra por la categoría (trazabilidad: "categoría")

  @direct @RF-22
  Scenario: Bloquear mutaciones admin a usuarios no-admin
    Given un usuario autenticado sin rol admin (trazabilidad: "usuarios no admin")
    When intenta ejecutar una mutación de administración de productos (trazabilidad: "crear/eliminar productos")
    Then el sistema deniega la operación (trazabilidad: "Solo admin")

  @direct @RF-23
  Scenario: No permitir stock negativo
    Given el stock no puede ser negativo (trazabilidad: "El stock no puede ser negativo")
    When un administrador intenta actualizar el stock a un valor negativo
    Then el sistema rechaza la actualización (trazabilidad: "no puede ser negativo")

  @derived
  Scenario: Actualizar stock a cero (borde)
    Given el stock no puede ser negativo (trazabilidad: "no puede ser negativo")
    When un administrador actualiza el stock del producto a 0
    Then el sistema acepta el valor y mantiene el stock en 0 (trazabilidad: "stock")

  @derived
  Scenario: Eliminar un producto inexistente
    Given el sistema permite eliminar productos (trazabilidad: "eliminar producto")
    When un administrador intenta eliminar un producto que no existe
    Then el sistema informa que el producto no se encuentra (trazabilidad: "deleteProduct")

```

---

## UC-06

### Metadatos
- Proyecto asociado: Sin proyecto
- Kiwi: updated
- ID en Kiwi: 409
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 8
- Directos: 6
- Derivados: 2

### Resumen final en Kiwi
UC-06

### Gherkin
```gherkin
Feature: Carrito de compra en el navegador (LocalStorage)

  Background:
    Given el carrito se persiste en LocalStorage y se mantiene entre sesiones (trazabilidad: "LocalStorage (mantener entre sesiones)")

  @direct @RF-24
  Scenario: Gestionar carrito con persistencia en LocalStorage
    When el usuario usa el carrito en el navegador (trazabilidad: "carrito en el navegador")
    Then el sistema persiste el carrito en LocalStorage (trazabilidad: "persistencia en LocalStorage")

  @direct @RF-25
  Scenario: Mantener el carrito entre sesiones
    Given el usuario tiene ítems en el carrito (trazabilidad: "carrito")
    When el usuario cierra y vuelve a abrir la sesión del navegador
    Then el carrito se mantiene (trazabilidad: "mantener entre sesiones")

  @direct @RF-26
  Scenario: Añadir ítems al carrito
    Given existe un producto en el catálogo (trazabilidad: "Operaciones Añadir")
    When el usuario añade el producto al carrito
    Then el carrito incluye el ítem añadido (trazabilidad: "Añadir")

  @direct @RF-27
  Scenario: Modificar cantidades de ítems del carrito
    Given existe un ítem en el carrito (trazabilidad: "modificar cantidades")
    When el usuario cambia la cantidad del ítem
    Then el carrito refleja la nueva cantidad (trazabilidad: "modificar")

  @direct @RF-28
  Scenario: Eliminar ítems del carrito
    Given existe un ítem en el carrito (trazabilidad: "eliminar ítems")
    When el usuario elimina el ítem
    Then el carrito ya no contiene el ítem (trazabilidad: "eliminar")

  @direct @RF-29
  Scenario: Calcular subtotal y total del carrito
    Given el carrito contiene uno o más ítems (trazabilidad: "calcular subtotal/total")
    When el usuario consulta el resumen del carrito
    Then el sistema calcula subtotal y total (trazabilidad: "subtotal/total")

  @derived
  Scenario: Eliminar el último ítem deja el carrito vacío
    Given el carrito contiene un único ítem (trazabilidad: "eliminar ítems")
    When el usuario elimina ese ítem
    Then el carrito queda vacío (trazabilidad: "carrito")

  @derived
  Scenario: Cantidad no válida al modificar un ítem
    Given el carrito permite modificar cantidades (trazabilidad: "modificar cantidades")
    When el usuario intenta establecer una cantidad no válida
    Then el carrito no aplica una cantidad inválida (trazabilidad: "modificar")

```

---

## UC-07

### Metadatos
- Proyecto asociado: Sin proyecto
- Kiwi: updated
- ID en Kiwi: 410
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 12
- Directos: 11
- Derivados: 1

### Resumen final en Kiwi
UC-07

### Gherkin
```gherkin
Feature: Creación de pedidos (GraphQL createOrder)

  Background:
    Given existe la mutación GraphQL "createOrder" para crear pedidos (trazabilidad: "Mutation createOrder")
    And los pedidos manejan estados "pending", "completed" y "cancelled" (trazabilidad: "Estados pending, completed, cancelled")

  @direct @RF-30
  Scenario: Crear pedido como usuario autenticado
    Given el usuario está autenticado (trazabilidad: "usuario autenticado")
    When el usuario solicita crear un pedido
    Then el sistema permite la creación del pedido (trazabilidad: "puede crear pedidos")

  @direct @RF-32
  Scenario: Disponibilidad de mutación createOrder
    When un cliente consume la API GraphQL de pedidos
    Then está disponible la mutación "createOrder" (trazabilidad: "Mutation createOrder")

  @direct @RF-34
  Scenario: El pedido se crea con un estado válido
    When se crea un pedido
    Then el pedido queda en uno de los estados soportados (trazabilidad: "pending, completed, cancelled")

  @direct @RF-35
  Scenario: Validar stock al crear pedido
    Given el pedido se compone de productos del catálogo (trazabilidad: "Validar stock")
    When el usuario intenta crear el pedido
    Then el sistema valida que exista stock suficiente para cada producto (trazabilidad: "Validar stock")

  @direct @RF-36
  Scenario: Validar precio al crear pedido
    Given el usuario envía su carrito para crear el pedido (trazabilidad: "validar precio")
    When se procesa la creación
    Then el sistema valida el precio con el catálogo vigente (trazabilidad: "validar precio")

  @direct @RF-37
  Scenario: Recalcular total en servidor al crear pedido
    Given el total no debe confiarse al cliente (trazabilidad: "no se confía en el cliente")
    When el usuario solicita crear el pedido
    Then el sistema recalcula el total en el servidor (trazabilidad: "recalcular total en servidor")

  @direct @RF-38
  Scenario: Descontar stock al crear pedido
    Given existe stock disponible para los productos
    When se crea el pedido
    Then el sistema descuenta el stock correspondiente (trazabilidad: "descontar stock")

  @direct @RF-39
  Scenario: No permitir crear pedido con carrito vacío
    Given el carrito del usuario está vacío (trazabilidad: "carrito está vacío")
    When el usuario intenta crear un pedido
    Then el sistema no crea el pedido (trazabilidad: "No se crea un pedido")

  @direct @RF-40
  Scenario: Fallar pedido por producto inexistente o stock insuficiente
    Given el pedido incluye un producto inexistente o con stock insuficiente (trazabilidad: "no existe o no hay stock suficiente")
    When el usuario intenta crear el pedido
    Then el pedido falla con un mensaje informativo (trazabilidad: "falla con mensaje informativo")

  @direct @RF-41
  Scenario: Ignorar manipulación del total por el cliente
    Given el cliente puede enviar un total manipulado (trazabilidad: "no se confía en el cliente")
    When el usuario intenta crear el pedido
    Then el total final se calcula en servidor y no usa el total del cliente (trazabilidad: "se calcula en servidor")

  @direct @RF-42
  Scenario: Vincular pedido al usuario y reducir stock
    Given el usuario está autenticado (trazabilidad: "vincula el pedido al usuario")
    When el usuario crea el pedido
    Then el sistema vincula el pedido al usuario y reduce el stock (trazabilidad: "stock ... se reduce y se vincula")

  @derived
  Scenario: Crear pedido falla si el usuario no está autenticado
    Given crear pedidos es para usuario autenticado (trazabilidad: "usuario autenticado")
    When un visitante intenta crear un pedido
    Then el sistema deniega la creación del pedido (trazabilidad: "puede crear pedidos")

```

---

## UC-08

### Metadatos
- Proyecto asociado: Sin proyecto
- Kiwi: updated
- ID en Kiwi: 411
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 5
- Directos: 2
- Derivados: 3

### Resumen final en Kiwi
UC-08

### Gherkin
```gherkin
Feature: Consulta de pedidos del usuario (histórico)

  Background:
    Given la API GraphQL incluye las queries "myOrders" y "order" (trazabilidad: "Queries myOrders, order")

  @direct @RF-31
  Scenario: Consultar histórico de pedidos como usuario autenticado
    Given el usuario está autenticado (trazabilidad: "usuario autenticado")
    When consulta su histórico de pedidos
    Then el sistema devuelve sus pedidos (trazabilidad: "consultar su histórico")

  @direct @RF-33
  Scenario: Disponibilidad de queries myOrders y order
    When un cliente consume la API GraphQL de consulta de pedidos
    Then están disponibles "myOrders" y "order" (trazabilidad: "Queries myOrders, order")

  @derived
  Scenario: myOrders solo devuelve pedidos del propio usuario
    Given el usuario consulta "myOrders" (trazabilidad: "myOrders")
    When el sistema devuelve el listado
    Then los pedidos devueltos pertenecen al usuario autenticado (trazabilidad: "su histórico")

  @derived
  Scenario: Consultar pedidos sin autenticación
    Given consultar histórico es para usuario autenticado (trazabilidad: "usuario autenticado")
    When un visitante intenta consultar "myOrders"
    Then el sistema deniega el acceso o no devuelve pedidos (trazabilidad: "consultar su histórico")

  @derived
  Scenario: Consultar detalle de pedido inexistente
    Given existe la query "order" (trazabilidad: "order")
    When el usuario consulta un pedido que no existe
    Then el sistema informa que no hay resultados (trazabilidad: "order")

```

---

## UC-09

### Metadatos
- Proyecto asociado: Sin proyecto
- Kiwi: updated
- ID en Kiwi: 412
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 8
- Directos: 6
- Derivados: 2

### Resumen final en Kiwi
UC-09

### Gherkin
```gherkin
Feature: Administración de usuarios

  Background:
    Given el administrador gestiona usuarios registrados (trazabilidad: "Operaciones Listar usuarios, cambiar rol, eliminar usuario")
    And el sistema no permite que un admin se elimine a sí mismo (trazabilidad: "no permitir que un admin se elimine a sí mismo")

  @direct @RF-43
  Scenario: Listar usuarios como administrador
    Given un usuario con rol admin (trazabilidad: "Administrador")
    When consulta el listado de usuarios (trazabilidad: "Listar usuarios")
    Then el sistema devuelve los usuarios registrados (trazabilidad: "gestiona usuarios registrados")

  @direct @RF-44
  Scenario: Cambiar el rol de un usuario
    Given un usuario con rol admin (trazabilidad: "cambiar rol")
    When ejecuta el cambio de rol de un usuario a "user" o "admin" (trazabilidad: "(user/admin)")
    Then el sistema actualiza el rol del usuario (trazabilidad: "cambiar rol")

  @direct @RF-45
  Scenario: Eliminar un usuario
    Given un usuario con rol admin (trazabilidad: "eliminar usuario")
    When solicita eliminar un usuario
    Then el sistema elimina el usuario indicado (trazabilidad: "eliminar usuario")

  @direct @RF-46
  Scenario: Impedir auto-eliminación de administrador
    Given un administrador autenticado (trazabilidad: "admin")
    When intenta eliminar su propia cuenta
    Then el sistema impide la auto-eliminación (trazabilidad: "no permitir")

  @direct @RF-47
  Scenario: Disponibilidad de query users
    When un cliente consume la API GraphQL de administración de usuarios
    Then está disponible la query "users" (trazabilidad: "Query users")

  @direct @RF-48
  Scenario: Disponibilidad de mutaciones updateUserRole y deleteUser
    When un cliente consume la API GraphQL de administración de usuarios
    Then están disponibles las mutaciones "updateUserRole" y "deleteUser" (trazabilidad: "Mutations updateUserRole, deleteUser")

  @derived
  Scenario: Usuario no-admin no puede listar usuarios
    Given las operaciones administrativas requieren rol admin (trazabilidad: "requieren rol admin")
    When un usuario no-admin intenta ejecutar la operación de listar usuarios
    Then el sistema deniega el acceso (trazabilidad: "impedir accesos")

  @derived
  Scenario: Intentar eliminar un usuario inexistente
    Given el sistema permite eliminar usuarios (trazabilidad: "eliminar usuario")
    When un admin intenta eliminar un usuario que no existe
    Then el sistema informa que el usuario no se encuentra (trazabilidad: "deleteUser")

```
