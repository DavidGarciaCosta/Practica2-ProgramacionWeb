# Kiwi TCMS

Total publicados: 9

## Indice
1. [UC-01](#uc-01) - RM - reviewed
2. [UC-02](#uc-02) - RM - reviewed
3. [UC-03](#uc-03) - RM - reviewed
4. [UC-04](#uc-04) - RM - reviewed
5. [UC-05](#uc-05) - RM - reviewed
6. [UC-06](#uc-06) - RM - reviewed
7. [UC-07](#uc-07) - RM - reviewed
8. [UC-08](#uc-08) - RM - reviewed
9. [UC-09](#uc-09) - RM - reviewed

---

## UC-01

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 415
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 5
- Directos: 2
- Derivados: 3

### Resumen final en Kiwi
UC-01 [RM]

### Gherkin
```gherkin
Feature: Registro de usuarios (JWT)

  # Trazabilidad: "Un usuario puede registrarse con username/email únicos."
  @direct @uc-01 @rf-01
  Scenario: Registrar un usuario con username y email únicos
    Given que no existe una cuenta registrada con el mismo username o email
    When el visitante envía una solicitud de registro con username, email y password
    Then el sistema crea la cuenta de usuario
    And el sistema confirma que el username y el email quedan asociados de forma única

  # Trazabilidad: "Contraseñas almacenadas con hash (bcrypt)."
  @direct @uc-01 @rf-05
  Scenario: El password se almacena de forma no reversible
    Given que un visitante se registra con un password
    When el sistema persiste las credenciales del usuario
    Then el sistema almacena el password usando hash con bcrypt
    And el sistema no almacena el password en texto plano

  @derived @uc-01
  Scenario: Impedir registro con username duplicado
    Given que existe una cuenta registrada con un username determinado
    When el visitante intenta registrarse reutilizando ese mismo username
    Then el sistema rechaza el registro
    And el sistema informa que el username ya está en uso

  @derived @uc-01
  Scenario: Impedir registro con email duplicado
    Given que existe una cuenta registrada con un email determinado
    When el visitante intenta registrarse reutilizando ese mismo email
    Then el sistema rechaza el registro
    And el sistema informa que el email ya está en uso

  @derived @uc-01
  Scenario: Rechazar registro con datos obligatorios ausentes
    Given que un visitante quiere registrarse
    When el visitante envía el registro sin informar username o email o password
    Then el sistema rechaza el registro
    And el sistema informa que faltan datos obligatorios

```

---

## UC-02

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 416
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 6
- Directos: 2
- Derivados: 4

### Resumen final en Kiwi
UC-02 [RM]

### Gherkin
```gherkin
Feature: Login y uso de token JWT

  # Trazabilidad: "El login devuelve un token válido con id y role del usuario."
  @direct @uc-02 @rf-02
  Scenario: Iniciar sesión con credenciales válidas devuelve token y perfil básico
    Given que existe un usuario registrado con credenciales válidas
    When el usuario envía sus credenciales de acceso
    Then el sistema autentica al usuario
    And el sistema devuelve un token JWT válido
    And el sistema devuelve el perfil básico incluyendo id y role

  # Trazabilidad: "El token debe enviarse en Authorization: Bearer <token>."
  @direct @uc-02 @rf-04
  Scenario: Usar token en cabecera Authorization como Bearer token
    Given que el usuario dispone de un token JWT válido
    When el usuario invoca una operación autenticada enviando la cabecera Authorization con el formato "Bearer <token>"
    Then el sistema reconoce al usuario autenticado a partir del token

  @derived @uc-02
  Scenario: Rechazar login con password inválido
    Given que existe un usuario registrado
    When el usuario intenta iniciar sesión con un password incorrecto
    Then el sistema rechaza la autenticación
    And el sistema no devuelve un token JWT

  @derived @uc-02
  Scenario: Rechazar login con usuario inexistente
    Given que no existe una cuenta con unas credenciales dadas
    When el usuario intenta iniciar sesión con dichas credenciales
    Then el sistema rechaza la autenticación
    And el sistema no devuelve un token JWT

  @derived @uc-02
  Scenario: Rechazar invocación autenticada si falta cabecera Authorization
    Given que una operación requiere autenticación mediante token
    When el usuario invoca la operación sin cabecera Authorization
    Then el sistema rechaza la solicitud por falta de autenticación

  @derived @uc-02
  Scenario: Rechazar invocación autenticada con formato de Authorization no soportado
    Given que una operación requiere autenticación mediante token
    When el usuario invoca la operación con una cabecera Authorization que no sigue el formato "Bearer <token>"
    Then el sistema rechaza la solicitud por autenticación no válida

```

---

## UC-03

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 417
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 3
- Directos: 1
- Derivados: 2

### Resumen final en Kiwi
UC-03 [RM]

### Gherkin
```gherkin
Feature: Verificación de token y obtención de perfil

  # Trazabilidad: "El endpoint de verificación valida token expirado/inválido y devuelve perfil sin password."
  @direct @uc-03 @rf-03
  Scenario: Verificar token válido devuelve perfil sin password
    Given que el usuario dispone de un token JWT válido
    When el usuario solicita la verificación del token
    Then el sistema valida el token
    And el sistema devuelve el perfil del usuario
    And el perfil devuelto no incluye el password

  # Trazabilidad: "El endpoint de verificación valida token expirado/inválido"
  @derived @uc-03
  Scenario: Verificar token expirado o inválido falla
    Given que el usuario dispone de un token JWT expirado o inválido
    When el usuario solicita la verificación del token
    Then el sistema rechaza la verificación
    And el sistema informa que el token no es válido

  @derived @uc-03
  Scenario: Verificación sin token falla
    Given que el usuario no envía token
    When el usuario solicita la verificación del token
    Then el sistema rechaza la verificación por falta de autenticación

```

---

## UC-04

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 418
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 6
- Directos: 3
- Derivados: 3

### Resumen final en Kiwi
UC-04 [RM]

### Gherkin
```gherkin
Feature: Consulta pública del catálogo de productos

  # Trazabilidad: "Listar productos con paginación, búsqueda y filtro por categoría"
  @direct @uc-04 @rf-08
  Scenario: Listar productos con paginación, búsqueda y filtro por categoría
    Given que existen productos en el catálogo
    When el visitante consulta el listado de productos indicando page y limit y un texto de búsqueda y una categoría
    Then el sistema devuelve una lista paginada de productos que coinciden con los criterios

  # Trazabilidad: "ver detalle de producto"
  @direct @uc-04 @rf-09
  Scenario: Consultar detalle de un producto
    Given que existe un producto en el catálogo
    When el visitante consulta el detalle del producto
    Then el sistema devuelve la información del producto solicitado

  # Trazabilidad: "El listado soporta page/limit, búsqueda por nombre/descr y filtro por categoría."
  @direct @uc-04 @rf-10
  Scenario: Búsqueda por nombre o descripción y paginación con page/limit
    Given que existen productos con nombres y descripciones variadas
    When el visitante consulta el catálogo usando page y limit y un texto de búsqueda
    Then el sistema filtra por coincidencias en nombre o descripción
    And el sistema aplica paginación según page y limit

  @derived @uc-04
  Scenario: Consultar catálogo con página fuera de rango devuelve lista vacía
    Given que existen N productos en el catálogo
    When el visitante consulta una página que no contiene resultados
    Then el sistema devuelve una lista vacía de productos

  @derived @uc-04
  Scenario: Filtro por categoría sin resultados devuelve lista vacía
    Given que existen productos en el catálogo
    When el visitante consulta el catálogo filtrando por una categoría sin productos
    Then el sistema devuelve una lista vacía de productos

  @derived @uc-04
  Scenario: Consultar detalle de producto inexistente falla
    Given que no existe un producto con un identificador dado
    When el visitante consulta el detalle del producto inexistente
    Then el sistema informa que el producto no existe

```

---

## UC-05

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 419
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 8
- Directos: 6
- Derivados: 2

### Resumen final en Kiwi
UC-05 [RM]

### Gherkin
```gherkin
Feature: Administración de productos (operaciones restringidas a admin)

  # Trazabilidad: "Las operaciones administrativas requieren rol admin."
  @direct @uc-05 @rf-06
  Scenario: Requerir rol admin para operaciones administrativas
    Given que un usuario está autenticado con rol no admin
    When el usuario intenta ejecutar una operación administrativa de productos
    Then el sistema deniega el acceso por permisos insuficientes

  # Trazabilidad: "El backend debe impedir accesos a endpoints/resolvers admin a usuarios no admin."
  @direct @uc-05 @rf-07
  Scenario: Bloquear acceso a resolvers/endpoints admin si no es admin
    Given que un usuario está autenticado con rol no admin
    When el usuario intenta acceder a una operación marcada como admin
    Then el sistema impide el acceso

  # Trazabilidad: "Solo admin puede crear/eliminar productos"
  @direct @uc-05 @rf-11
  Scenario: Crear producto como administrador
    Given que un administrador está autenticado
    When el administrador solicita crear un producto
    Then el sistema crea el producto en el catálogo

  # Trazabilidad: "Solo admin puede crear/eliminar productos"
  @direct @uc-05 @rf-12
  Scenario: Eliminar producto como administrador
    Given que un administrador está autenticado
    And existe un producto en el catálogo
    When el administrador solicita eliminar el producto
    Then el sistema elimina el producto del catálogo

  # Trazabilidad: "Solo admin puede crear/eliminar productos y modificar stock."
  @direct @uc-05 @rf-13
  Scenario: Actualizar stock como administrador
    Given que un administrador está autenticado
    And existe un producto en el catálogo
    When el administrador solicita actualizar el stock del producto
    Then el sistema actualiza el stock del producto

  # Trazabilidad: "El stock no puede ser negativo."
  @direct @uc-05 @rf-14
  Scenario: Impedir actualizar stock a un valor negativo
    Given que un administrador está autenticado
    And existe un producto en el catálogo
    When el administrador solicita actualizar el stock a un valor negativo
    Then el sistema rechaza la actualización
    And el sistema mantiene el stock sin cambios

  @derived @uc-05
  Scenario: Rechazar crear producto si no hay autenticación
    Given que un visitante no está autenticado
    When el visitante intenta crear un producto
    Then el sistema deniega el acceso por falta de autenticación

  @derived @uc-05
  Scenario: Eliminar producto inexistente informa error
    Given que un administrador está autenticado
    And no existe un producto con un identificador dado
    When el administrador intenta eliminar el producto inexistente
    Then el sistema informa que el producto no existe

```

---

## UC-06

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 420
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 8
- Directos: 6
- Derivados: 2

### Resumen final en Kiwi
UC-06 [RM]

### Gherkin
```gherkin
Feature: Carrito de compra en navegador con LocalStorage

  # Trazabilidad: "El usuario gestiona un carrito en el navegador con persistencia en LocalStorage."
  @direct @uc-06 @rf-15
  Scenario: Gestionar carrito en navegador con persistencia
    Given que el usuario usa el carrito en el navegador
    When el usuario añade un producto al carrito
    Then el carrito refleja el producto añadido
    And el carrito se persiste en LocalStorage

  # Trazabilidad: "LocalStorage (mantener entre sesiones)"
  @direct @uc-06 @rf-16
  Scenario: Mantener carrito entre sesiones
    Given que existe un carrito guardado en LocalStorage
    When el usuario vuelve a abrir la aplicación en el navegador
    Then el sistema carga el carrito desde LocalStorage

  # Trazabilidad: "Añadir, modificar cantidades, eliminar ítems, calcular subtotal/total"
  @direct @uc-06 @rf-17
  Scenario: Añadir ítems al carrito
    Given que el carrito está vacío
    When el usuario añade un ítem al carrito
    Then el carrito contiene el ítem añadido

  # Trazabilidad: "Añadir, modificar cantidades, eliminar ítems, calcular subtotal/total"
  @direct @uc-06 @rf-18
  Scenario: Modificar cantidades de ítems en el carrito
    Given que el carrito contiene un ítem con cantidad 1
    When el usuario cambia la cantidad del ítem a 2
    Then el carrito actualiza la cantidad a 2

  # Trazabilidad: "Añadir, modificar cantidades, eliminar ítems, calcular subtotal/total"
  @direct @uc-06 @rf-19
  Scenario: Eliminar ítems del carrito
    Given que el carrito contiene un ítem
    When el usuario elimina el ítem del carrito
    Then el carrito no contiene el ítem

  # Trazabilidad: "Añadir, modificar cantidades, eliminar ítems, calcular subtotal/total"
  @direct @uc-06 @rf-20
  Scenario: Calcular subtotal y total del carrito
    Given que el carrito contiene uno o más ítems con precio asociado
    When el usuario consulta el subtotal y el total del carrito
    Then el sistema calcula el subtotal
    And el sistema calcula el total

  @derived @uc-06
  Scenario: Modificar cantidad a cero elimina el ítem
    Given que el carrito contiene un ítem con cantidad 1
    When el usuario establece la cantidad del ítem a 0
    Then el ítem se elimina del carrito

  @derived @uc-06
  Scenario: Carrito vacío tiene total cero
    Given que el carrito está vacío
    When el usuario consulta el total del carrito
    Then el total calculado es 0

```

---

## UC-07

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 421
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 8
- Directos: 6
- Derivados: 2

### Resumen final en Kiwi
UC-07 [RM]

### Gherkin
```gherkin
Feature: Creación de pedidos (validaciones en servidor)

  # Trazabilidad: "Un usuario autenticado puede crear pedidos"
  @direct @uc-07 @rf-21
  Scenario: Crear pedido siendo usuario autenticado
    Given que el usuario está autenticado
    And el usuario dispone de un carrito con ítems
    When el usuario solicita crear un pedido
    Then el sistema crea el pedido

  # Trazabilidad: "No se crea un pedido si el carrito está vacío."
  @direct @uc-07 @rf-23
  Scenario: Impedir crear pedido con carrito vacío
    Given que el usuario está autenticado
    And el carrito no contiene ítems
    When el usuario solicita crear un pedido
    Then el sistema rechaza la creación del pedido
    And el sistema informa que el carrito está vacío

  # Trazabilidad: "Si un producto no existe o no hay stock suficiente, el pedido falla con mensaje informativo."
  @direct @uc-07 @rf-24
  Scenario: Fallar creación de pedido si hay producto inexistente o sin stock
    Given que el usuario está autenticado
    And el carrito contiene un producto inexistente o con stock insuficiente
    When el usuario solicita crear un pedido
    Then el sistema rechaza la creación del pedido
    And el sistema informa del motivo (producto inexistente o stock insuficiente)

  # Trazabilidad: "El total usado para el pedido se calcula en servidor (no se confía en el cliente)."
  @direct @uc-07 @rf-25
  Scenario: Recalcular total del pedido en servidor
    Given que el usuario está autenticado
    And el carrito contiene ítems con precios
    When el usuario solicita crear un pedido proporcionando un total calculado en cliente
    Then el sistema calcula el total en servidor
    And el sistema ignora cualquier manipulación del total enviado por el cliente

  # Trazabilidad: "Al crear el pedido, el stock de productos se reduce"
  @direct @uc-07 @rf-26
  Scenario: Descontar stock al crear pedido
    Given que el usuario está autenticado
    And el carrito contiene un producto con stock disponible
    When el usuario solicita crear un pedido
    Then el sistema reduce el stock del producto según las cantidades del pedido

  # Trazabilidad: "y se vincula el pedido al usuario."
  @direct @uc-07 @rf-27
  Scenario: Vincular pedido al usuario
    Given que el usuario está autenticado
    And el carrito contiene ítems
    When el usuario solicita crear un pedido
    Then el sistema vincula el pedido creado al usuario autenticado

  @derived @uc-07
  Scenario: Rechazar creación de pedido si el usuario no está autenticado
    Given que el visitante no está autenticado
    When el visitante intenta crear un pedido
    Then el sistema rechaza la operación por falta de autenticación

  @derived @uc-07
  Scenario: Fallar creación de pedido si el precio del producto cambió en el servidor
    Given que el usuario está autenticado
    And el carrito contiene ítems
    And el precio de uno de los productos difiere respecto al valor que el cliente tenía
    When el usuario solicita crear un pedido
    Then el sistema calcula el total con el precio vigente en servidor
    And el sistema crea el pedido con el total recalculado o rechaza la operación según reglas de negocio

```

---

## UC-08

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 422
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 3
- Directos: 1
- Derivados: 2

### Resumen final en Kiwi
UC-08 [RM]

### Gherkin
```gherkin
Feature: Consulta del histórico de pedidos del usuario

  # Trazabilidad: "y consultar su histórico."
  @direct @uc-08 @rf-22
  Scenario: Consultar mis pedidos siendo usuario autenticado
    Given que el usuario está autenticado
    And el usuario tiene uno o más pedidos asociados
    When el usuario consulta su histórico de pedidos
    Then el sistema devuelve la lista de pedidos del usuario

  @derived @uc-08
  Scenario: Consultar mis pedidos sin autenticación falla
    Given que el visitante no está autenticado
    When el visitante consulta el histórico de pedidos
    Then el sistema rechaza la consulta por falta de autenticación

  @derived @uc-08
  Scenario: Usuario sin pedidos obtiene lista vacía
    Given que el usuario está autenticado
    And el usuario no tiene pedidos asociados
    When el usuario consulta su histórico de pedidos
    Then el sistema devuelve una lista vacía

```

---

## UC-09

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 423
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 7
- Directos: 4
- Derivados: 3

### Resumen final en Kiwi
UC-09 [RM]

### Gherkin
```gherkin
Feature: Administración de usuarios (solo admin)

  # Trazabilidad: "Listar usuarios, cambiar rol (user/admin), eliminar usuario"
  @direct @uc-09 @rf-28
  Scenario: Listar usuarios como administrador
    Given que un administrador está autenticado
    When el administrador solicita listar usuarios
    Then el sistema devuelve la lista de usuarios registrados

  # Trazabilidad: "cambiar rol (user/admin)"
  @direct @uc-09 @rf-29
  Scenario: Cambiar rol de un usuario como administrador
    Given que un administrador está autenticado
    And existe un usuario con rol user
    When el administrador actualiza el rol del usuario a admin
    Then el sistema guarda el nuevo rol del usuario

  # Trazabilidad: "eliminar usuario"
  @direct @uc-09 @rf-30
  Scenario: Eliminar un usuario como administrador
    Given que un administrador está autenticado
    And existe un usuario registrado
    When el administrador solicita eliminar al usuario
    Then el sistema elimina al usuario

  # Trazabilidad: "no permitir que un admin se elimine a sí mismo"
  @direct @uc-09 @rf-31
  Scenario: Impedir que un admin se elimine a sí mismo
    Given que un administrador está autenticado
    When el administrador intenta eliminar su propia cuenta
    Then el sistema rechaza la operación
    And el sistema mantiene la cuenta del administrador

  @derived @uc-09
  Scenario: Usuario no admin no puede listar usuarios
    Given que un usuario con rol no admin está autenticado
    When el usuario intenta listar usuarios
    Then el sistema deniega el acceso por permisos insuficientes

  @derived @uc-09
  Scenario: Usuario no admin no puede cambiar roles
    Given que un usuario con rol no admin está autenticado
    When el usuario intenta cambiar el rol de otro usuario
    Then el sistema deniega el acceso por permisos insuficientes

  @derived @uc-09
  Scenario: Usuario no admin no puede eliminar usuarios
    Given que un usuario con rol no admin está autenticado
    When el usuario intenta eliminar a un usuario
    Then el sistema deniega el acceso por permisos insuficientes

```
