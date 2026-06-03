# Claude Cypress E2E Guidance

Este archivo esta pensado para que el desarrollador lo entregue a Claude antes de implementar tests E2E en Cypress.
Claude NO debe implementar a ciegas: debe hacer preguntas, cerrar ambiguedades y proponer una arquitectura mantenible antes de escribir codigo.

## Contexto
- Generado: 2026-06-03 08:11:33 UTC
- Casos Kiwi publicados incluidos: 6
- Stack objetivo: Cypress E2E

## Reglas de trabajo con Claude
- Cada test debe tener trazabilidad explicita al caso Kiwi que satisface.
- Antes de escribir codigo, Claude debe preguntar por datos, usuarios, roles, rutas, permisos, selectores, mocks, fixtures y criterios de exito.
- No se aceptan asserts superficiales como comprobar solo que una pagina carga.
- No se aceptan waits fijos salvo justificacion excepcional.
- Cada spec debe poder ejecutarse aislada, repetible y en CI.
- Los datos deben ser deterministas: seed/API/factory/fixture y limpieza clara.

## Arquitectura Cypress recomendada
- Organizar specs por dominio funcional o feature, no por detalle tecnico accidental.
- Usar `cypress/e2e/<feature>/<caso>.cy.*` para specs.
- Usar `cypress/fixtures` para datos estaticos controlados.
- Usar `cypress/support/commands.*` solo para acciones reutilizables reales: login, seed, limpieza, navegacion comun.
- Preferir selectores estables: `data-cy`, `data-testid`, `id`, `name`. Evitar CSS estructural y textos fragiles.
- Mantener asserts de negocio cerca del flujo que validan.
- Separar setup de datos, accion del usuario y verificacion final.

## Matriz Kiwi -> Cypress esperado

| Kiwi ID | Caso | Spec sugerida | Estado |
|---|---|---|---|
| KIWI-623 | UC-01 | `cypress/e2e/uc-01.cy.ts` | Pendiente de implementar |
| KIWI-624 | UC-02 | `cypress/e2e/uc-02.cy.ts` | Pendiente de implementar |
| KIWI-625 | UC-03 | `cypress/e2e/uc-03.cy.ts` | Pendiente de implementar |
| KIWI-626 | UC-04 | `cypress/e2e/uc-04.cy.ts` | Pendiente de implementar |
| KIWI-627 | UC-05 | `cypress/e2e/uc-05.cy.ts` | Pendiente de implementar |
| KIWI-628 | UC-06 | `cypress/e2e/uc-06.cy.ts` | Pendiente de implementar |

## Guia por caso Kiwi

### 1. KIWI-623 - UC-01

- Proyecto: `pr`
- Categoria: `no informada`
- Spec sugerida: `cypress/e2e/uc-01.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: Registro y autenticación de usuarios (JWT)
  Como visitante/usuario
  Quiero registrarme y autenticarme
  Para obtener un token JWT y acceder a operaciones autenticadas

  Background:
    Given el sistema expone rutas REST de autenticación

  # @direct — RF-01
  Scenario: Registrar un usuario
    Given que el usuario proporciona username, email y password
    When el usuario solicita el registro
    Then el sistema registra el usuario
    And el registro queda asociado a credenciales válidas
    # trazabilidad: "El sistema permite registrar usuarios"

  # @direct — RF-02
  Scenario: Autenticarse y obtener un token JWT
    Given que el usuario está registrado
    When el usuario inicia sesión con credenciales válidas
    Then el sistema autentica al usuario mediante un token JWT
    # trazabilidad: "autenticarlos mediante tokens JWT"

  # @direct — RF-03
  Scenario: Almacenar contraseñas con hash usando bcrypt
    Given que un usuario se registra con un password
    When el sistema persiste las credenciales
    Then el sistema almacena el password usando hash con bcrypt
    And no almacena el password en texto plano
    # trazabilidad: "Contraseñas almacenadas con hash (bcrypt)."

  # @direct — RF-04
  Scenario: Enviar el token en Authorization con esquema Bearer
    Given que el usuario tiene un token JWT emitido por el sistema
    When el usuario solicita un recurso autenticado
    Then el token se envía en la cabecera Authorization usando el esquema Bearer
    # trazabilidad: "Authorization: Bearer"

  # @direct — RF-05
  Scenario: Disponibilidad del endpoint de registro
    When el cliente invoca la ruta REST "/api/auth/register"
    Then el sistema atiende la solicitud de registro
    # trazabilidad: "/api/auth/register"

  # @direct — RF-06
  Scenario: Disponibilidad del endpoint de login
    When el cliente invoca la ruta REST "/api/auth/login"
    Then el sistema atiende la solicitud de login
    # trazabilidad: "/api/auth/login"

  # @direct — RF-07
  Scenario: Disponibilidad del endpoint de verificación de token
    When el cliente invoca la ruta REST "/api/auth/verify"
    Then el sistema atiende la solicitud de verificación del token
    # trazabilidad: "/api/auth/verify"

  # @direct — RF-08
  Scenario: Impedir registro con username o email duplicados
    Given que ya existe un usuario con el mismo username o email
    When un nuevo usuario intenta registrarse con ese username o email
    Then el sistema rechaza el registro
    And informa que username o email deben ser únicos
    # trazabilidad: "username/email únicos"

  # @direct — RF-09
  Scenario: El login devuelve token con id y role
    Given que el usuario inicia sesión correctamente
    When el sistema genera la respuesta de login
    Then la respuesta incluye un token válido
    And el token contiene el id del usuario
    And el token contiene el role del usuario
    # trazabilidad: "token válido con id y role"

  # @direct — RF-10
  Scenario: Verificar token inválido o expirado
    Given que el cliente presenta un token inválido o expirado
    When el cliente solicita la verificación del token
    Then el sistema indica que el token no es válido
    # trazabilidad: "valida token expirado/inválido"

  # @direct — RF-11
  Scenario: Verificación devuelve perfil sin password
    Given que el cliente presenta un token válido
    When el cliente solicita la verificación del token
    Then el sistema devuelve el perfil del usuario
    And el perfil devuelto no incluye el password
    # trazabilidad: "devuelve perfil sin password."

  # @derived — cobertura adicional (4-8 escenarios)
  Scenario: Fallar el login con credenciales inválidas
    Given que el usuario proporciona credenciales inválidas
    When el usuario intenta iniciar sesión
    Then el sistema rechaza la autenticación

  Scenario: Verificación de token ausente
    Given que el cliente no envía token
    When el cliente solicita la verificación del token
    Then el sistema rechaza la solicitud por ausencia de token

  Scenario: Rechazar esquema Authorization distinto de Bearer
    Given que el cliente envía un token con un esquema de Authorization distinto de Bearer
    When el cliente solicita un recurso autenticado
    Then el sistema rechaza la solicitud por esquema inválido

  Scenario: Registro con campos obligatorios incompletos
    Given que el usuario omite username o email o password
    When el usuario solicita el registro
    Then el sistema rechaza el registro por datos incompletos
```

#### Escenarios detectados
- Registrar un usuario
- Autenticarse y obtener un token JWT
- Almacenar contraseñas con hash usando bcrypt
- Enviar el token en Authorization con esquema Bearer
- Disponibilidad del endpoint de registro
- Disponibilidad del endpoint de login
- Disponibilidad del endpoint de verificación de token
- Impedir registro con username o email duplicados
- El login devuelve token con id y role
- Verificar token inválido o expirado
- Verificación devuelve perfil sin password
- Fallar el login con credenciales inválidas
- Verificación de token ausente
- Rechazar esquema Authorization distinto de Bearer
- Registro con campos obligatorios incompletos

#### Preguntas obligatorias que Claude debe hacer al desarrollador
- Cual es la ruta exacta y minima para ejecutar este flujo en la aplicacion?
- Que usuario, rol, permisos y estado inicial necesita el caso?
- Que datos deben existir antes del test y como se crean de forma determinista?
- Que datos deben limpiarse despues para que el test sea independiente?
- Que llamadas externas deben mockearse, interceptarse o estabilizarse?
- Que selectores robustos existen para cada accion y assertion?
- Que resultado visible, persistido o de API prueba realmente que el caso se satisface?
- Que edge cases o errores estan implicitos en el caso Kiwi?
- Como se ejecutara este test en CI y que variables necesita?

#### Propuesta de implementacion Cypress
- Crear un `describe` con referencia clara a KIWI-{case_id}.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-{case_id}.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 2. KIWI-624 - UC-02

- Proyecto: `pr`
- Categoria: `no informada`
- Spec sugerida: `cypress/e2e/uc-02.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: Autorización por roles (usuario/administrador)
  Como sistema
  Quiero restringir operaciones administrativas
  Para que solo usuarios con rol admin puedan ejecutarlas

  Background:
    Given que el sistema obtiene el rol del usuario desde el token en el contexto

  # @direct — RF-12
  Scenario: Requerir rol admin en operaciones administrativas
    Given que una operación es administrativa
    When un usuario intenta ejecutarla
    Then el sistema requiere que el rol del usuario sea admin
    # trazabilidad: "Las operaciones administrativas requieren rol admin."

  # @direct — RF-13
  Scenario: Bloquear accesos admin a usuarios no admin
    Given que un usuario no tiene rol admin
    When intenta acceder a un endpoint o resolver administrativo
    Then el backend impide el acceso
    # trazabilidad: "impedir accesos a endpoints/resolvers admin a usuarios no admin"

  # @direct — RF-14
  Scenario: Autorizar resolvers usando el contexto (token)
    Given que el cliente ejecuta una operación GraphQL
    When el backend construye el contexto con el token
    Then la autorización de resolvers se decide usando ese contexto
    # trazabilidad: "se usa el contexto (token) para autorizar resolvers"

  # @derived — cobertura adicional
  Scenario: Denegar operación administrativa sin token
    Given que el cliente no envía token
    When intenta ejecutar una operación administrativa
    Then el sistema rechaza la operación

  Scenario: Permitir operación administrativa a admin
    Given que el usuario tiene rol admin
    When ejecuta una operación administrativa
    Then el sistema permite la operación

  Scenario: Permitir operación no administrativa a usuario autenticado
    Given que el usuario está autenticado y tiene rol user
    When ejecuta una operación no administrativa
    Then el sistema permite la operación

  Scenario: Denegar operación administrativa con token válido pero rol user
    Given que el usuario presenta un token válido con rol user
    When intenta ejecutar una operación administrativa
    Then el sistema rechaza la operación por falta de permisos
```

#### Escenarios detectados
- Requerir rol admin en operaciones administrativas
- Bloquear accesos admin a usuarios no admin
- Autorizar resolvers usando el contexto (token)
- Denegar operación administrativa sin token
- Permitir operación administrativa a admin
- Permitir operación no administrativa a usuario autenticado
- Denegar operación administrativa con token válido pero rol user

#### Preguntas obligatorias que Claude debe hacer al desarrollador
- Cual es la ruta exacta y minima para ejecutar este flujo en la aplicacion?
- Que usuario, rol, permisos y estado inicial necesita el caso?
- Que datos deben existir antes del test y como se crean de forma determinista?
- Que datos deben limpiarse despues para que el test sea independiente?
- Que llamadas externas deben mockearse, interceptarse o estabilizarse?
- Que selectores robustos existen para cada accion y assertion?
- Que resultado visible, persistido o de API prueba realmente que el caso se satisface?
- Que edge cases o errores estan implicitos en el caso Kiwi?
- Como se ejecutara este test en CI y que variables necesita?

#### Propuesta de implementacion Cypress
- Crear un `describe` con referencia clara a KIWI-{case_id}.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-{case_id}.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 3. KIWI-625 - UC-03

- Proyecto: `pr`
- Categoria: `no informada`
- Spec sugerida: `cypress/e2e/uc-03.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: Consultar catálogo de productos (público)
  Como visitante
  Quiero consultar el catálogo
  Para explorar productos antes de comprar

  Background:
    Given que el sistema expone queries GraphQL para catálogo

  # @direct — RF-15
  Scenario: Listar productos con paginación
    When el cliente consulta el listado de productos
    Then el sistema permite paginar los resultados
    # trazabilidad: "Listar productos con paginación"

  # @direct — RF-16
  Scenario: Listar productos con búsqueda
    When el cliente consulta el listado de productos con un criterio de búsqueda
    Then el sistema filtra los productos por el criterio de búsqueda
    # trazabilidad: "búsqueda"

  # @direct — RF-17
  Scenario: Listar productos con filtro por categoría
    When el cliente consulta el listado de productos indicando una categoría
    Then el sistema filtra los productos por categoría
    # trazabilidad: "filtro por categoría"

  # @direct — RF-18
  Scenario: Ver detalle de un producto
    When el cliente consulta el detalle de un producto
    Then el sistema devuelve la información del producto
    # trazabilidad: "ver detalle de producto"

  # @direct — RF-19
  Scenario: Soportar page/limit y búsqueda por nombre/descr y filtro por categoría
    When el cliente consulta productos con page y limit
    And aporta criterios de búsqueda por nombre o descripción
    And aporta filtro por categoría
    Then el sistema aplica paginación
    And aplica búsqueda
    And aplica filtro por categoría
    # trazabilidad: "page/limit, búsqueda por nombre/descr y filtro por categoría"

  # @direct — RF-20
  Scenario: Disponibilidad de queries products y product
    When el cliente ejecuta la query GraphQL "products"
    Then el sistema devuelve una lista de productos
    And la query está disponible
    When el cliente ejecuta la query GraphQL "product"
    Then el sistema devuelve el detalle de un producto
    And la query está disponible
    # trazabilidad: "Query products/product"

  # @derived — cobertura adicional
  Scenario: Consultar un producto inexistente
    Given que no existe un producto con el identificador solicitado
    When el cliente consulta el detalle del producto
    Then el sistema informa que el producto no existe

  Scenario: Solicitar una página sin resultados
    Given que el cliente solicita una página fuera de rango
    When consulta el listado de productos
    Then el sistema devuelve una lista vacía

  Scenario: Búsqueda sin coincidencias
    When el cliente consulta el listado con un término sin coincidencias
    Then el sistema devuelve una lista vacía

  Scenario: Listado público sin autenticación
    Given que el cliente no está autenticado
    When consulta products o product
    Then el sistema permite la consulta pública del catálogo
```

#### Escenarios detectados
- Listar productos con paginación
- Listar productos con búsqueda
- Listar productos con filtro por categoría
- Ver detalle de un producto
- Soportar page/limit y búsqueda por nombre/descr y filtro por categoría
- Disponibilidad de queries products y product
- Consultar un producto inexistente
- Solicitar una página sin resultados
- Búsqueda sin coincidencias
- Listado público sin autenticación

#### Preguntas obligatorias que Claude debe hacer al desarrollador
- Cual es la ruta exacta y minima para ejecutar este flujo en la aplicacion?
- Que usuario, rol, permisos y estado inicial necesita el caso?
- Que datos deben existir antes del test y como se crean de forma determinista?
- Que datos deben limpiarse despues para que el test sea independiente?
- Que llamadas externas deben mockearse, interceptarse o estabilizarse?
- Que selectores robustos existen para cada accion y assertion?
- Que resultado visible, persistido o de API prueba realmente que el caso se satisface?
- Que edge cases o errores estan implicitos en el caso Kiwi?
- Como se ejecutara este test en CI y que variables necesita?

#### Propuesta de implementacion Cypress
- Crear un `describe` con referencia clara a KIWI-{case_id}.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-{case_id}.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 4. KIWI-626 - UC-04

- Proyecto: `pr`
- Categoria: `no informada`
- Spec sugerida: `cypress/e2e/uc-04.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: Gestionar productos (CRUD/stock) como administrador
  Como administrador
  Quiero gestionar productos
  Para mantener el catálogo actualizado y controlar el stock

  Background:
    Given que las operaciones de gestión de productos son administrativas

  # @direct — RF-21
  Scenario: Crear un producto como administrador
    Given que el usuario tiene rol admin
    When ejecuta la operación de crear producto
    Then el sistema crea el producto
    # trazabilidad: "Crear producto"

  # @direct — RF-22
  Scenario: Eliminar un producto como administrador
    Given que el usuario tiene rol admin
    When ejecuta la operación de eliminar producto
    Then el sistema elimina el producto
    # trazabilidad: "eliminar producto"

  # @direct — RF-23
  Scenario: Actualizar stock como administrador
    Given que el usuario tiene rol admin
    When ejecuta la operación de actualizar stock
    Then el sistema actualiza el stock del producto
    # trazabilidad: "actualizar stock"

  # @direct — RF-24
  Scenario: Restringir creación/eliminación/modificación de stock a admin
    Given que el usuario no tiene rol admin
    When intenta crear o eliminar un producto o modificar stock
    Then el sistema rechaza la operación por permisos
    # trazabilidad: "Solo admin puede crear/eliminar productos y modificar stock."

  # @direct — RF-25
  Scenario: Impedir stock negativo
    Given que el usuario tiene rol admin
    When intenta establecer un stock con valor negativo
    Then el sistema rechaza la actualización
    And el stock no se actualiza
    # trazabilidad: "El stock no puede ser negativo."

  # @direct — RF-26
  Scenario: Disponibilidad de mutations createProduct, deleteProduct y updateProductStock
    Given que el usuario tiene rol admin
    When ejecuta la mutation GraphQL "createProduct"
    Then el sistema procesa la creación
    When ejecuta la mutation GraphQL "deleteProduct"
    Then el sistema procesa la eliminación
    When ejecuta la mutation GraphQL "updateProductStock"
    Then el sistema procesa la actualización de stock
    # trazabilidad: "Mutations: createProduct, deleteProduct, updateProductStock."

  # @derived — cobertura adicional
  Scenario: Eliminar un producto inexistente
    Given que el usuario tiene rol admin
    And no existe el producto a eliminar
    When intenta eliminar el producto
    Then el sistema informa que el producto no existe

  Scenario: Actualizar stock a cero
    Given que el usuario tiene rol admin
    When establece el stock a 0
    Then el sistema actualiza el stock a 0

  Scenario: Operación administrativa sin token
    Given que el cliente no envía token
    When intenta crear o eliminar un producto o modificar stock
    Then el sistema rechaza la operación
```

#### Escenarios detectados
- Crear un producto como administrador
- Eliminar un producto como administrador
- Actualizar stock como administrador
- Restringir creación/eliminación/modificación de stock a admin
- Impedir stock negativo
- Disponibilidad de mutations createProduct, deleteProduct y updateProductStock
- Eliminar un producto inexistente
- Actualizar stock a cero
- Operación administrativa sin token

#### Preguntas obligatorias que Claude debe hacer al desarrollador
- Cual es la ruta exacta y minima para ejecutar este flujo en la aplicacion?
- Que usuario, rol, permisos y estado inicial necesita el caso?
- Que datos deben existir antes del test y como se crean de forma determinista?
- Que datos deben limpiarse despues para que el test sea independiente?
- Que llamadas externas deben mockearse, interceptarse o estabilizarse?
- Que selectores robustos existen para cada accion y assertion?
- Que resultado visible, persistido o de API prueba realmente que el caso se satisface?
- Que edge cases o errores estan implicitos en el caso Kiwi?
- Como se ejecutara este test en CI y que variables necesita?

#### Propuesta de implementacion Cypress
- Crear un `describe` con referencia clara a KIWI-{case_id}.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-{case_id}.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 5. KIWI-627 - UC-05

- Proyecto: `pr`
- Categoria: `no informada`
- Spec sugerida: `cypress/e2e/uc-05.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: Gestionar carrito de compra en el navegador
  Como visitante/usuario
  Quiero gestionar un carrito en el navegador
  Para preparar un pedido

  Background:
    Given que el carrito se gestiona en el navegador

  # @direct — RF-27
  Scenario: Carrito con persistencia en LocalStorage
    When el usuario añade productos al carrito
    Then el carrito se persiste en LocalStorage
    # trazabilidad: "carrito ... persistencia en LocalStorage"

  # @direct — RF-28
  Scenario: Mantener carrito entre sesiones
    Given que el usuario ha guardado un carrito en LocalStorage
    When el usuario vuelve a abrir la aplicación en otra sesión
    Then el carrito se recupera desde LocalStorage
    # trazabilidad: "mantener entre sesiones"

  # @direct — RF-29
  Scenario: Añadir ítems al carrito
    When el usuario añade un ítem al carrito
    Then el carrito contiene el ítem añadido
    # trazabilidad: "Añadir"

  # @direct — RF-30
  Scenario: Modificar cantidades de ítems
    Given que el carrito contiene un ítem
    When el usuario modifica la cantidad del ítem
    Then el carrito refleja la nueva cantidad
    # trazabilidad: "modificar cantidades"

  # @direct — RF-31
  Scenario: Eliminar ítems del carrito
    Given que el carrito contiene un ítem
    When el usuario elimina el ítem
    Then el carrito ya no contiene el ítem
    # trazabilidad: "eliminar ítems"

  # @direct — RF-32
  Scenario: Calcular subtotal y total
    Given que el carrito contiene uno o más ítems
    When el usuario consulta el resumen del carrito
    Then el sistema calcula el subtotal
    And el sistema calcula el total
    # trazabilidad: "calcular subtotal/total"

  # @derived — cobertura adicional
  Scenario: Persistencia tras modificar cantidades
    Given que el carrito está persistido en LocalStorage
    When el usuario cambia cantidades
    Then el carrito actualizado se vuelve a persistir en LocalStorage

  Scenario: Vaciar el carrito eliminando todos los ítems
    Given que el carrito contiene múltiples ítems
    When el usuario elimina todos los ítems
    Then el carrito queda vacío

  Scenario: Total con carrito vacío
    Given que el carrito está vacío
    When el usuario consulta el total
    Then el total es 0 o equivalente funcional
```

#### Escenarios detectados
- Carrito con persistencia en LocalStorage
- Mantener carrito entre sesiones
- Añadir ítems al carrito
- Modificar cantidades de ítems
- Eliminar ítems del carrito
- Calcular subtotal y total
- Persistencia tras modificar cantidades
- Vaciar el carrito eliminando todos los ítems
- Total con carrito vacío

#### Preguntas obligatorias que Claude debe hacer al desarrollador
- Cual es la ruta exacta y minima para ejecutar este flujo en la aplicacion?
- Que usuario, rol, permisos y estado inicial necesita el caso?
- Que datos deben existir antes del test y como se crean de forma determinista?
- Que datos deben limpiarse despues para que el test sea independiente?
- Que llamadas externas deben mockearse, interceptarse o estabilizarse?
- Que selectores robustos existen para cada accion y assertion?
- Que resultado visible, persistido o de API prueba realmente que el caso se satisface?
- Que edge cases o errores estan implicitos en el caso Kiwi?
- Como se ejecutara este test en CI y que variables necesita?

#### Propuesta de implementacion Cypress
- Crear un `describe` con referencia clara a KIWI-{case_id}.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-{case_id}.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 6. KIWI-628 - UC-06

- Proyecto: `pr`
- Categoria: `no informada`
- Spec sugerida: `cypress/e2e/uc-06.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: Crear pedido (usuario autenticado)
  Como usuario autenticado
  Quiero crear un pedido
  Para comprar los productos del carrito

  Background:
    Given que el usuario está autenticado

  # @direct — RF-33
  Scenario: Crear un pedido como usuario autenticado
    Given que el usuario tiene un carrito con productos
    When el usuario solicita crear el pedido
    Then el sistema crea el pedido
    # trazabilidad: "puede crear pedidos"

  # @direct — RF-35
  Scenario: Disponibilidad de la mutation createOrder
    When el cliente ejecuta la mutation GraphQL "createOrder"
    Then el sistema procesa la creación del pedido
    # trazabilidad: "Mutation createOrder"

  # @direct — RF-38
  Scenario: Validar stock al crear el pedido
    Given que el carrito contiene productos
    When el usuario solicita crear el pedido
    Then el sistema valida el stock de cada producto
    # trazabilidad: "Validar stock"

  # @direct — RF-39
  Scenario: Validar precio al crear el pedido
    Given que el carrito contiene productos
    When el usuario solicita crear el pedido
    Then el sistema valida el precio de los productos
    # trazabilidad: "validar precio"

  # @direct — RF-41
  Scenario: Recalcular el total en servidor
    Given que el carrito contiene productos
    When el usuario solicita crear el pedido
    Then el sistema recalcula el total en el servidor
    # trazabilidad: "recalcular total en servidor"

  # @direct — RF-42
  Scenario: Descontar stock al crear el pedido
    Given que el carrito contiene productos con stock suficiente
    When el usuario solicita crear el pedido
    Then el sistema descuenta el stock correspondiente
    # trazabilidad: "descontar stock al crear pedido"

  # @direct — RF-43
  Scenario: Impedir crear un pedido con carrito vacío
    Given que el carrito está vacío
    When el usuario solicita crear el pedido
    Then el sistema rechaza la creación del pedido
    # trazabilidad: "No se crea un pedido si el carrito está vacío."

  # @direct — RF-44
  Scenario: Fallar si un producto no existe
    Given que el carrito contiene un producto que no existe
    When el usuario solicita crear el pedido
    Then el sistema rechaza la creación del pedido
    And devuelve un mensaje informativo
    # trazabilidad: "Si un producto no existe"

  # @direct — RF-45
  Scenario: Fallar si no hay stock suficiente
    Given que el carrito contiene un producto sin stock suficiente
    When el usuario solicita crear el pedido
    Then el sistema rechaza la creación del pedido
    And devuelve un mensaje informativo
    # trazabilidad: "no hay stock suficiente"

  # @direct — RF-46
  Scenario: No confiar en el total del cliente
    Given que el cliente envía un total manipulado
    When el usuario solicita crear el pedido
    Then el sistema utiliza el total calculado en servidor
    And no confía en el total enviado por el cliente
    # trazabilidad: "no se confía en el cliente"

  # @direct — RF-47
  Scenario: Reducir el stock de productos tras crear el pedido
    Given que el carrito contiene productos con stock suficiente
    When el sistema crea el pedido
    Then el stock de productos se reduce
    # trazabilidad: "el stock de productos se reduce"

  # @direct — RF-48
  Scenario: Vincular el pedido al usuario
    When el sistema crea el pedido
    Then el pedido queda vinculado al usuario autenticado
    # trazabilidad: "se vincula el pedido al usuario"

  # @derived — cobertura adicional
  Scenario: Rechazar createOrder sin autenticación
    Given que el cliente no está autenticado
    When intenta crear un pedido
    Then el sistema rechaza la operación

  Scenario: Registrar estado inicial del pedido
    Given que el usuario solicita crear un pedido
    When el sistema crea el pedido
    Then el pedido queda en un estado válido del sistema
    # trazabilidad: "Estados pending, completed, cancelled"

  Scenario: Precio cambiado entre carrito y servidor
    Given que el precio de un producto cambió en el servidor
    And el carrito contiene el producto con el precio anterior
    When el usuario solicita crear el pedido
    Then el sistema valida el precio y evita inconsistencia
    # trazabilidad: "validar precio"
```

#### Escenarios detectados
- Crear un pedido como usuario autenticado
- Disponibilidad de la mutation createOrder
- Validar stock al crear el pedido
- Validar precio al crear el pedido
- Recalcular el total en servidor
- Descontar stock al crear el pedido
- Impedir crear un pedido con carrito vacío
- Fallar si un producto no existe
- Fallar si no hay stock suficiente
- No confiar en el total del cliente
- Reducir el stock de productos tras crear el pedido
- Vincular el pedido al usuario
- Rechazar createOrder sin autenticación
- Registrar estado inicial del pedido
- Precio cambiado entre carrito y servidor

#### Preguntas obligatorias que Claude debe hacer al desarrollador
- Cual es la ruta exacta y minima para ejecutar este flujo en la aplicacion?
- Que usuario, rol, permisos y estado inicial necesita el caso?
- Que datos deben existir antes del test y como se crean de forma determinista?
- Que datos deben limpiarse despues para que el test sea independiente?
- Que llamadas externas deben mockearse, interceptarse o estabilizarse?
- Que selectores robustos existen para cada accion y assertion?
- Que resultado visible, persistido o de API prueba realmente que el caso se satisface?
- Que edge cases o errores estan implicitos en el caso Kiwi?
- Como se ejecutara este test en CI y que variables necesita?

#### Propuesta de implementacion Cypress
- Crear un `describe` con referencia clara a KIWI-{case_id}.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-{case_id}.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.
