# Claude Cypress E2E Guidance

Este archivo esta pensado para que el desarrollador lo entregue a Claude antes de implementar tests E2E en Cypress.
Claude NO debe implementar a ciegas: debe hacer preguntas, cerrar ambiguedades y proponer una arquitectura mantenible antes de escribir codigo.

## Contexto
- Generado: 2026-06-08 07:45:20 UTC
- Casos Kiwi publicados incluidos: 13
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
| KIWI-653 | UC-01 | `cypress/e2e/uc-01.cy.ts` | Pendiente de implementar |
| KIWI-654 | UC-02 | `cypress/e2e/uc-02.cy.ts` | Pendiente de implementar |
| KIWI-655 | UC-03 | `cypress/e2e/uc-03.cy.ts` | Pendiente de implementar |
| KIWI-656 | UC-04 | `cypress/e2e/uc-04.cy.ts` | Pendiente de implementar |
| KIWI-657 | UC-05 | `cypress/e2e/uc-05.cy.ts` | Pendiente de implementar |
| KIWI-658 | UC-06 | `cypress/e2e/uc-06.cy.ts` | Pendiente de implementar |
| KIWI-659 | UC-07 | `cypress/e2e/uc-07.cy.ts` | Pendiente de implementar |
| KIWI-660 | UC-08 | `cypress/e2e/uc-08.cy.ts` | Pendiente de implementar |
| KIWI-661 | UC-09 | `cypress/e2e/uc-09.cy.ts` | Pendiente de implementar |
| KIWI-662 | UC-10 | `cypress/e2e/uc-10.cy.ts` | Pendiente de implementar |
| KIWI-663 | UC-11 | `cypress/e2e/uc-11.cy.ts` | Pendiente de implementar |
| KIWI-664 | UC-12 | `cypress/e2e/uc-12.cy.ts` | Pendiente de implementar |
| KIWI-665 | UC-13 | `cypress/e2e/uc-13.cy.ts` | Pendiente de implementar |

## Guia por caso Kiwi

### 1. KIWI-653 - UC-01

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-01.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-01 Registrar usuario

  # Generado automaticamente desde documentacion funcional para UC-01.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_01 @rf_RF_01
  Scenario: RF-01 - El sistema debe permitir registrar usuarios con username/email únicos.
    # Trazabilidad: Un usuario puede registrarse con username/email únicos.
    Given existe documentacion funcional para "Registrar usuario"
    When se ejecuta el comportamiento requerido por RF-01
    Then El sistema debe permitir registrar usuarios con username/email únicos.

  @direct @uc_UC_01 @rf_RF_02
  Scenario: RF-02 - El sistema debe exponer un endpoint REST de registro en /api/auth/register.
    # Trazabilidad: REST: /api/auth/register
    Given existe documentacion funcional para "Registrar usuario"
    When se ejecuta el comportamiento requerido por RF-02
    Then El sistema debe exponer un endpoint REST de registro en /api/auth/register.

  @direct @uc_UC_01 @rf_RF_10
  Scenario: RF-10 - Las contraseñas deben almacenarse con hash usando bcrypt.
    # Trazabilidad: Contraseñas almacenadas con hash (bcrypt).
    Given existe documentacion funcional para "Registrar usuario"
    When se ejecuta el comportamiento requerido por RF-10
    Then Las contraseñas deben almacenarse con hash usando bcrypt.

  @derived @uc_UC_01
  Scenario: UC-01 mantiene un resultado funcional consistente
    Given el flujo "Registrar usuario" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-01 - El sistema debe permitir registrar usuarios con username/email únicos.
- RF-02 - El sistema debe exponer un endpoint REST de registro en /api/auth/register.
- RF-10 - Las contraseñas deben almacenarse con hash usando bcrypt.
- UC-01 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-653.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-653.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 2. KIWI-654 - UC-02

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-02.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-02 Iniciar sesión (login) y obtener JWT

  # Generado automaticamente desde documentacion funcional para UC-02.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_02 @rf_RF_03
  Scenario: RF-03 - El sistema debe autenticar usuarios mediante tokens JWT.
    # Trazabilidad: autenticarlos mediante tokens JWT
    Given existe documentacion funcional para "Iniciar sesión (login) y obtener JWT"
    When se ejecuta el comportamiento requerido por RF-03
    Then El sistema debe autenticar usuarios mediante tokens JWT.

  @direct @uc_UC_02 @rf_RF_04
  Scenario: RF-04 - El sistema debe exponer un endpoint REST de login en /api/auth/login.
    # Trazabilidad: REST: /api/auth/login
    Given existe documentacion funcional para "Iniciar sesión (login) y obtener JWT"
    When se ejecuta el comportamiento requerido por RF-04
    Then El sistema debe exponer un endpoint REST de login en /api/auth/login.

  @direct @uc_UC_02 @rf_RF_05
  Scenario: RF-05 - El login debe devolver un token válido con id y role del usuario.
    # Trazabilidad: El login devuelve un token válido con id y role del usuario.
    Given existe documentacion funcional para "Iniciar sesión (login) y obtener JWT"
    When se ejecuta el comportamiento requerido por RF-05
    Then El login debe devolver un token válido con id y role del usuario.

  @direct @uc_UC_02 @rf_RF_09
  Scenario: RF-09 - El token JWT debe enviarse en la cabecera Authorization con formato Bearer <token>.
    # Trazabilidad: El token debe enviarse en Authorization: Bearer <token>.
    Given existe documentacion funcional para "Iniciar sesión (login) y obtener JWT"
    When se ejecuta el comportamiento requerido por RF-09
    Then El token JWT debe enviarse en la cabecera Authorization con formato Bearer <token>.

  @derived @uc_UC_02
  Scenario: UC-02 mantiene un resultado funcional consistente
    Given el flujo "Iniciar sesión (login) y obtener JWT" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-03 - El sistema debe autenticar usuarios mediante tokens JWT.
- RF-04 - El sistema debe exponer un endpoint REST de login en /api/auth/login.
- RF-05 - El login debe devolver un token válido con id y role del usuario.
- RF-09 - El token JWT debe enviarse en la cabecera Authorization con formato Bearer <token>.
- UC-02 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-654.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-654.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 3. KIWI-655 - UC-03

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-03.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-03 Verificar token JWT y obtener perfil

  # Generado automaticamente desde documentacion funcional para UC-03.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_03 @rf_RF_06
  Scenario: RF-06 - El sistema debe exponer un endpoint REST de verificación en /api/auth/verify.
    # Trazabilidad: REST: /api/auth/verify
    Given existe documentacion funcional para "Verificar token JWT y obtener perfil"
    When se ejecuta el comportamiento requerido por RF-06
    Then El sistema debe exponer un endpoint REST de verificación en /api/auth/verify.

  @direct @uc_UC_03 @rf_RF_07
  Scenario: RF-07 - El endpoint de verificación debe validar token expirado o inválido.
    # Trazabilidad: valida token expirado/inválido
    Given existe documentacion funcional para "Verificar token JWT y obtener perfil"
    When se ejecuta el comportamiento requerido por RF-07
    Then El endpoint de verificación debe validar token expirado o inválido.

  @direct @uc_UC_03 @rf_RF_08
  Scenario: RF-08 - El endpoint de verificación debe devolver el perfil sin password.
    # Trazabilidad: devuelve perfil sin password
    Given existe documentacion funcional para "Verificar token JWT y obtener perfil"
    When se ejecuta el comportamiento requerido por RF-08
    Then El endpoint de verificación debe devolver el perfil sin password.

  @derived @uc_UC_03
  Scenario: UC-03 mantiene un resultado funcional consistente
    Given el flujo "Verificar token JWT y obtener perfil" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-06 - El sistema debe exponer un endpoint REST de verificación en /api/auth/verify.
- RF-07 - El endpoint de verificación debe validar token expirado o inválido.
- RF-08 - El endpoint de verificación debe devolver el perfil sin password.
- UC-03 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-655.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-655.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 4. KIWI-656 - UC-04

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-04.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-04 Autorizar operaciones por rol (user/admin)

  # Generado automaticamente desde documentacion funcional para UC-04.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_04 @rf_RF_11
  Scenario: RF-11 - Las operaciones administrativas deben requerir rol admin.
    # Trazabilidad: Las operaciones administrativas requieren rol admin.
    Given existe documentacion funcional para "Autorizar operaciones por rol (user/admin)"
    When se ejecuta el comportamiento requerido por RF-11
    Then Las operaciones administrativas deben requerir rol admin.

  @direct @uc_UC_04 @rf_RF_12
  Scenario: RF-12 - El backend debe impedir accesos a endpoints/resolvers admin a usuarios no admin.
    # Trazabilidad: El backend debe impedir accesos a endpoints/resolvers admin a usuarios no admin.
    Given existe documentacion funcional para "Autorizar operaciones por rol (user/admin)"
    When se ejecuta el comportamiento requerido por RF-12
    Then El backend debe impedir accesos a endpoints/resolvers admin a usuarios no admin.

  @direct @uc_UC_04 @rf_RF_13
  Scenario: RF-13 - En GraphQL, el sistema debe usar el contexto (token) para autorizar resolvers.
    # Trazabilidad: En GraphQL, se usa el contexto (token) para autorizar resolvers.
    Given existe documentacion funcional para "Autorizar operaciones por rol (user/admin)"
    When se ejecuta el comportamiento requerido por RF-13
    Then En GraphQL, el sistema debe usar el contexto (token) para autorizar resolvers.

  @derived @uc_UC_04
  Scenario: UC-04 mantiene un resultado funcional consistente
    Given el flujo "Autorizar operaciones por rol (user/admin)" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-11 - Las operaciones administrativas deben requerir rol admin.
- RF-12 - El backend debe impedir accesos a endpoints/resolvers admin a usuarios no admin.
- RF-13 - En GraphQL, el sistema debe usar el contexto (token) para autorizar resolvers.
- UC-04 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-656.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-656.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 5. KIWI-657 - UC-05

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-05.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-05 Consultar catálogo de productos (listar con paginación/búsqueda/filtro)

  # Generado automaticamente desde documentacion funcional para UC-05.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_05 @rf_RF_14
  Scenario: RF-14 - El sistema debe permitir listar productos con paginación.
    # Trazabilidad: Listar productos con paginación
    Given existe documentacion funcional para "Consultar catálogo de productos (listar con paginación/búsqueda/filtro)"
    When se ejecuta el comportamiento requerido por RF-14
    Then El sistema debe permitir listar productos con paginación.

  @direct @uc_UC_05 @rf_RF_15
  Scenario: RF-15 - El sistema debe permitir listar productos con búsqueda.
    # Trazabilidad: Listar productos con ... búsqueda
    Given existe documentacion funcional para "Consultar catálogo de productos (listar con paginación/búsqueda/filtro)"
    When se ejecuta el comportamiento requerido por RF-15
    Then El sistema debe permitir listar productos con búsqueda.

  @direct @uc_UC_05 @rf_RF_16
  Scenario: RF-16 - El sistema debe permitir listar productos con filtro por categoría.
    # Trazabilidad: filtro por categoría
    Given existe documentacion funcional para "Consultar catálogo de productos (listar con paginación/búsqueda/filtro)"
    When se ejecuta el comportamiento requerido por RF-16
    Then El sistema debe permitir listar productos con filtro por categoría.

  @direct @uc_UC_05 @rf_RF_18
  Scenario: RF-18 - El listado de productos debe soportar page/limit.
    # Trazabilidad: El listado soporta page/limit
    Given existe documentacion funcional para "Consultar catálogo de productos (listar con paginación/búsqueda/filtro)"
    When se ejecuta el comportamiento requerido por RF-18
    Then El listado de productos debe soportar page/limit.

  @direct @uc_UC_05 @rf_RF_19
  Scenario: RF-19 - El listado de productos debe soportar búsqueda por nombre o descripción.
    # Trazabilidad: búsqueda por nombre/descr
    Given existe documentacion funcional para "Consultar catálogo de productos (listar con paginación/búsqueda/filtro)"
    When se ejecuta el comportamiento requerido por RF-19
    Then El listado de productos debe soportar búsqueda por nombre o descripción.

  @direct @uc_UC_05 @rf_RF_20
  Scenario: RF-20 - El listado de productos debe soportar filtro por categoría.
    # Trazabilidad: filtro por categoría
    Given existe documentacion funcional para "Consultar catálogo de productos (listar con paginación/búsqueda/filtro)"
    When se ejecuta el comportamiento requerido por RF-20
    Then El listado de productos debe soportar filtro por categoría.

  @derived @uc_UC_05
  Scenario: UC-05 mantiene un resultado funcional consistente
    Given el flujo "Consultar catálogo de productos (listar con paginación/búsqueda/filtro)" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-14 - El sistema debe permitir listar productos con paginación.
- RF-15 - El sistema debe permitir listar productos con búsqueda.
- RF-16 - El sistema debe permitir listar productos con filtro por categoría.
- RF-18 - El listado de productos debe soportar page/limit.
- RF-19 - El listado de productos debe soportar búsqueda por nombre o descripción.
- RF-20 - El listado de productos debe soportar filtro por categoría.
- UC-05 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-657.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-657.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 6. KIWI-658 - UC-06

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-06.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-06 Ver detalle de producto

  # Generado automaticamente desde documentacion funcional para UC-06.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_06 @rf_RF_17
  Scenario: RF-17 - El sistema debe permitir ver el detalle de un producto.
    # Trazabilidad: ver detalle de producto
    Given existe documentacion funcional para "Ver detalle de producto"
    When se ejecuta el comportamiento requerido por RF-17
    Then El sistema debe permitir ver el detalle de un producto.

  @derived @uc_UC_06
  Scenario: UC-06 mantiene un resultado funcional consistente
    Given el flujo "Ver detalle de producto" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-17 - El sistema debe permitir ver el detalle de un producto.
- UC-06 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-658.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-658.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 7. KIWI-659 - UC-07

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-07.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-07 Administrar productos (crear/eliminar/actualizar stock)

  # Generado automaticamente desde documentacion funcional para UC-07.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_07 @rf_RF_21
  Scenario: RF-21 - Solo admin debe poder crear productos.
    # Trazabilidad: Solo admin puede crear
    Given existe documentacion funcional para "Administrar productos (crear/eliminar/actualizar stock)"
    When se ejecuta el comportamiento requerido por RF-21
    Then Solo admin debe poder crear productos.

  @direct @uc_UC_07 @rf_RF_22
  Scenario: RF-22 - Solo admin debe poder eliminar productos.
    # Trazabilidad: Solo admin puede ... eliminar productos
    Given existe documentacion funcional para "Administrar productos (crear/eliminar/actualizar stock)"
    When se ejecuta el comportamiento requerido por RF-22
    Then Solo admin debe poder eliminar productos.

  @direct @uc_UC_07 @rf_RF_23
  Scenario: RF-23 - Solo admin debe poder modificar stock.
    # Trazabilidad: Solo admin puede ... modificar stock.
    Given existe documentacion funcional para "Administrar productos (crear/eliminar/actualizar stock)"
    When se ejecuta el comportamiento requerido por RF-23
    Then Solo admin debe poder modificar stock.

  @direct @uc_UC_07 @rf_RF_24
  Scenario: RF-24 - El stock no debe poder ser negativo.
    # Trazabilidad: El stock no puede ser negativo.
    Given existe documentacion funcional para "Administrar productos (crear/eliminar/actualizar stock)"
    When se ejecuta el comportamiento requerido por RF-24
    Then El stock no debe poder ser negativo.

  @direct @uc_UC_07 @rf_RF_25
  Scenario: RF-25 - La API GraphQL debe exponer las queries products y product.
    # Trazabilidad: GraphQL: Query products/product.
    Given existe documentacion funcional para "Administrar productos (crear/eliminar/actualizar stock)"
    When se ejecuta el comportamiento requerido por RF-25
    Then La API GraphQL debe exponer las queries products y product.

  @direct @uc_UC_07 @rf_RF_26
  Scenario: RF-26 - La API GraphQL debe exponer las mutaciones createProduct, deleteProduct y updateProductStock.
    # Trazabilidad: Mutations: createProduct, deleteProduct, updateProductStock.
    Given existe documentacion funcional para "Administrar productos (crear/eliminar/actualizar stock)"
    When se ejecuta el comportamiento requerido por RF-26
    Then La API GraphQL debe exponer las mutaciones createProduct, deleteProduct y updateProductStock.

  @derived @uc_UC_07
  Scenario: UC-07 mantiene un resultado funcional consistente
    Given el flujo "Administrar productos (crear/eliminar/actualizar stock)" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-21 - Solo admin debe poder crear productos.
- RF-22 - Solo admin debe poder eliminar productos.
- RF-23 - Solo admin debe poder modificar stock.
- RF-24 - El stock no debe poder ser negativo.
- RF-25 - La API GraphQL debe exponer las queries products y product.
- RF-26 - La API GraphQL debe exponer las mutaciones createProduct, deleteProduct y updateProductStock.
- UC-07 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-659.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-659.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 8. KIWI-660 - UC-08

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-08.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-08 Gestionar carrito de compra en el navegador

  # Generado automaticamente desde documentacion funcional para UC-08.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_08 @rf_RF_27
  Scenario: RF-27 - El usuario debe gestionar un carrito en el navegador con persistencia en LocalStorage.
    # Trazabilidad: gestiona un carrito en el navegador con persistencia en LocalStorage
    Given existe documentacion funcional para "Gestionar carrito de compra en el navegador"
    When se ejecuta el comportamiento requerido por RF-27
    Then El usuario debe gestionar un carrito en el navegador con persistencia en LocalStorage.

  @direct @uc_UC_08 @rf_RF_28
  Scenario: RF-28 - El carrito debe mantenerse entre sesiones usando LocalStorage.
    # Trazabilidad: LocalStorage (mantener entre sesiones)
    Given existe documentacion funcional para "Gestionar carrito de compra en el navegador"
    When se ejecuta el comportamiento requerido por RF-28
    Then El carrito debe mantenerse entre sesiones usando LocalStorage.

  @direct @uc_UC_08 @rf_RF_29
  Scenario: RF-29 - El carrito debe permitir añadir ítems.
    # Trazabilidad: Operaciones Añadir
    Given existe documentacion funcional para "Gestionar carrito de compra en el navegador"
    When se ejecuta el comportamiento requerido por RF-29
    Then El carrito debe permitir añadir ítems.

  @direct @uc_UC_08 @rf_RF_30
  Scenario: RF-30 - El carrito debe permitir modificar cantidades.
    # Trazabilidad: modificar cantidades
    Given existe documentacion funcional para "Gestionar carrito de compra en el navegador"
    When se ejecuta el comportamiento requerido por RF-30
    Then El carrito debe permitir modificar cantidades.

  @direct @uc_UC_08 @rf_RF_31
  Scenario: RF-31 - El carrito debe permitir eliminar ítems.
    # Trazabilidad: eliminar ítems
    Given existe documentacion funcional para "Gestionar carrito de compra en el navegador"
    When se ejecuta el comportamiento requerido por RF-31
    Then El carrito debe permitir eliminar ítems.

  @direct @uc_UC_08 @rf_RF_32
  Scenario: RF-32 - El carrito debe permitir calcular subtotal y total.
    # Trazabilidad: calcular subtotal/total
    Given existe documentacion funcional para "Gestionar carrito de compra en el navegador"
    When se ejecuta el comportamiento requerido por RF-32
    Then El carrito debe permitir calcular subtotal y total.

  @derived @uc_UC_08
  Scenario: UC-08 mantiene un resultado funcional consistente
    Given el flujo "Gestionar carrito de compra en el navegador" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-27 - El usuario debe gestionar un carrito en el navegador con persistencia en LocalStorage.
- RF-28 - El carrito debe mantenerse entre sesiones usando LocalStorage.
- RF-29 - El carrito debe permitir añadir ítems.
- RF-30 - El carrito debe permitir modificar cantidades.
- RF-31 - El carrito debe permitir eliminar ítems.
- RF-32 - El carrito debe permitir calcular subtotal y total.
- UC-08 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-660.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-660.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 9. KIWI-661 - UC-09

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-09.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-09 Crear pedido

  # Generado automaticamente desde documentacion funcional para UC-09.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_09 @rf_RF_33
  Scenario: RF-33 - Un usuario autenticado debe poder crear pedidos.
    # Trazabilidad: Un usuario autenticado puede crear pedidos
    Given existe documentacion funcional para "Crear pedido"
    When se ejecuta el comportamiento requerido por RF-33
    Then Un usuario autenticado debe poder crear pedidos.

  @direct @uc_UC_09 @rf_RF_35
  Scenario: RF-35 - La API GraphQL debe exponer la mutación createOrder.
    # Trazabilidad: GraphQL Mutation createOrder
    Given existe documentacion funcional para "Crear pedido"
    When se ejecuta el comportamiento requerido por RF-35
    Then La API GraphQL debe exponer la mutación createOrder.

  @direct @uc_UC_09 @rf_RF_38
  Scenario: RF-38 - Los pedidos deben contemplar estados pending, completed y cancelled.
    # Trazabilidad: Estados pending, completed, cancelled
    Given existe documentacion funcional para "Crear pedido"
    When se ejecuta el comportamiento requerido por RF-38
    Then Los pedidos deben contemplar estados pending, completed y cancelled.

  @direct @uc_UC_09 @rf_RF_39
  Scenario: RF-39 - El sistema debe validar stock al crear pedido.
    # Trazabilidad: Validar stock
    Given existe documentacion funcional para "Crear pedido"
    When se ejecuta el comportamiento requerido por RF-39
    Then El sistema debe validar stock al crear pedido.

  @direct @uc_UC_09 @rf_RF_40
  Scenario: RF-40 - El sistema debe validar precio al crear pedido.
    # Trazabilidad: validar precio
    Given existe documentacion funcional para "Crear pedido"
    When se ejecuta el comportamiento requerido por RF-40
    Then El sistema debe validar precio al crear pedido.

  @direct @uc_UC_09 @rf_RF_41
  Scenario: RF-41 - El sistema debe recalcular el total en servidor al crear pedido.
    # Trazabilidad: recalcular total en servidor
    Given existe documentacion funcional para "Crear pedido"
    When se ejecuta el comportamiento requerido por RF-41
    Then El sistema debe recalcular el total en servidor al crear pedido.

  @direct @uc_UC_09 @rf_RF_42
  Scenario: RF-42 - El sistema debe descontar stock al crear pedido.
    # Trazabilidad: descontar stock al crear pedido
    Given existe documentacion funcional para "Crear pedido"
    When se ejecuta el comportamiento requerido por RF-42
    Then El sistema debe descontar stock al crear pedido.

  @direct @uc_UC_09 @rf_RF_43
  Scenario: RF-43 - No se debe crear un pedido si el carrito está vacío.
    # Trazabilidad: No se crea un pedido si el carrito está vacío.
    Given existe documentacion funcional para "Crear pedido"
    When se ejecuta el comportamiento requerido por RF-43
    Then No se debe crear un pedido si el carrito está vacío.

  @direct @uc_UC_09 @rf_RF_44
  Scenario: RF-44 - Si un producto no existe o no hay stock suficiente, el pedido debe fallar con mensaje informativo.
    # Trazabilidad: Si un producto no existe o no hay stock suficiente, el pedido falla con mensaje informativo.
    Given existe documentacion funcional para "Crear pedido"
    When se ejecuta el comportamiento requerido por RF-44
    Then Si un producto no existe o no hay stock suficiente, el pedido debe fallar con mensaje informativo.

  @direct @uc_UC_09 @rf_RF_45
  Scenario: RF-45 - El total usado para el pedido debe calcularse en servidor y no confiar en el cliente.
    # Trazabilidad: El total usado para el pedido se calcula en servidor (no se confía en el cliente).
    Given existe documentacion funcional para "Crear pedido"
    When se ejecuta el comportamiento requerido por RF-45
    Then El total usado para el pedido debe calcularse en servidor y no confiar en el cliente.

  @direct @uc_UC_09 @rf_RF_46
  Scenario: RF-46 - Al crear el pedido, el sistema debe reducir el stock de productos y vincular el pedido al usuario.
    # Trazabilidad: Al crear el pedido, el stock de productos se reduce y se vincula el pedido al usuario.
    Given existe documentacion funcional para "Crear pedido"
    When se ejecuta el comportamiento requerido por RF-46
    Then Al crear el pedido, el sistema debe reducir el stock de productos y vincular el pedido al usuario.

  @derived @uc_UC_09
  Scenario: UC-09 mantiene un resultado funcional consistente
    Given el flujo "Crear pedido" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-33 - Un usuario autenticado debe poder crear pedidos.
- RF-35 - La API GraphQL debe exponer la mutación createOrder.
- RF-38 - Los pedidos deben contemplar estados pending, completed y cancelled.
- RF-39 - El sistema debe validar stock al crear pedido.
- RF-40 - El sistema debe validar precio al crear pedido.
- RF-41 - El sistema debe recalcular el total en servidor al crear pedido.
- RF-42 - El sistema debe descontar stock al crear pedido.
- RF-43 - No se debe crear un pedido si el carrito está vacío.
- RF-44 - Si un producto no existe o no hay stock suficiente, el pedido debe fallar con mensaje informativo.
- RF-45 - El total usado para el pedido debe calcularse en servidor y no confiar en el cliente.
- RF-46 - Al crear el pedido, el sistema debe reducir el stock de productos y vincular el pedido al usuario.
- UC-09 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-661.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-661.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 10. KIWI-662 - UC-10

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-10.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-10 Consultar pedidos del usuario (histórico)

  # Generado automaticamente desde documentacion funcional para UC-10.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_10 @rf_RF_34
  Scenario: RF-34 - Un usuario autenticado debe poder consultar su histórico de pedidos.
    # Trazabilidad: consultar su histórico
    Given existe documentacion funcional para "Consultar pedidos del usuario (histórico)"
    When se ejecuta el comportamiento requerido por RF-34
    Then Un usuario autenticado debe poder consultar su histórico de pedidos.

  @direct @uc_UC_10 @rf_RF_36
  Scenario: RF-36 - La API GraphQL debe exponer la query myOrders.
    # Trazabilidad: Queries myOrders
    Given existe documentacion funcional para "Consultar pedidos del usuario (histórico)"
    When se ejecuta el comportamiento requerido por RF-36
    Then La API GraphQL debe exponer la query myOrders.

  @direct @uc_UC_10 @rf_RF_37
  Scenario: RF-37 - La API GraphQL debe exponer la query order.
    # Trazabilidad: Queries ... order.
    Given existe documentacion funcional para "Consultar pedidos del usuario (histórico)"
    When se ejecuta el comportamiento requerido por RF-37
    Then La API GraphQL debe exponer la query order.

  @derived @uc_UC_10
  Scenario: UC-10 mantiene un resultado funcional consistente
    Given el flujo "Consultar pedidos del usuario (histórico)" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-34 - Un usuario autenticado debe poder consultar su histórico de pedidos.
- RF-36 - La API GraphQL debe exponer la query myOrders.
- RF-37 - La API GraphQL debe exponer la query order.
- UC-10 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-662.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-662.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 11. KIWI-663 - UC-11

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-11.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-11 Administrar usuarios (listar/cambiar rol/eliminar)

  # Generado automaticamente desde documentacion funcional para UC-11.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_11 @rf_RF_47
  Scenario: RF-47 - El administrador debe poder listar usuarios.
    # Trazabilidad: Operaciones Listar usuarios
    Given existe documentacion funcional para "Administrar usuarios (listar/cambiar rol/eliminar)"
    When se ejecuta el comportamiento requerido por RF-47
    Then El administrador debe poder listar usuarios.

  @direct @uc_UC_11 @rf_RF_48
  Scenario: RF-48 - El administrador debe poder cambiar rol (user/admin).
    # Trazabilidad: cambiar rol (user/admin)
    Given existe documentacion funcional para "Administrar usuarios (listar/cambiar rol/eliminar)"
    When se ejecuta el comportamiento requerido por RF-48
    Then El administrador debe poder cambiar rol (user/admin).

  @direct @uc_UC_11 @rf_RF_49
  Scenario: RF-49 - El administrador debe poder eliminar usuario.
    # Trazabilidad: eliminar usuario
    Given existe documentacion funcional para "Administrar usuarios (listar/cambiar rol/eliminar)"
    When se ejecuta el comportamiento requerido por RF-49
    Then El administrador debe poder eliminar usuario.

  @direct @uc_UC_11 @rf_RF_50
  Scenario: RF-50 - El sistema no debe permitir que un admin se elimine a sí mismo.
    # Trazabilidad: no permitir que un admin se elimine a sí mismo
    Given existe documentacion funcional para "Administrar usuarios (listar/cambiar rol/eliminar)"
    When se ejecuta el comportamiento requerido por RF-50
    Then El sistema no debe permitir que un admin se elimine a sí mismo.

  @direct @uc_UC_11 @rf_RF_51
  Scenario: RF-51 - La API GraphQL debe exponer la query users.
    # Trazabilidad: GraphQL Query users
    Given existe documentacion funcional para "Administrar usuarios (listar/cambiar rol/eliminar)"
    When se ejecuta el comportamiento requerido por RF-51
    Then La API GraphQL debe exponer la query users.

  @direct @uc_UC_11 @rf_RF_52
  Scenario: RF-52 - La API GraphQL debe exponer la mutación updateUserRole.
    # Trazabilidad: Mutations updateUserRole
    Given existe documentacion funcional para "Administrar usuarios (listar/cambiar rol/eliminar)"
    When se ejecuta el comportamiento requerido por RF-52
    Then La API GraphQL debe exponer la mutación updateUserRole.

  @direct @uc_UC_11 @rf_RF_53
  Scenario: RF-53 - La API GraphQL debe exponer la mutación deleteUser.
    # Trazabilidad: Mutations ... deleteUser.
    Given existe documentacion funcional para "Administrar usuarios (listar/cambiar rol/eliminar)"
    When se ejecuta el comportamiento requerido por RF-53
    Then La API GraphQL debe exponer la mutación deleteUser.

  @direct @uc_UC_11 @rf_RF_54
  Scenario: RF-54 - La API debe incluir rutas REST /api/admin/* según implementación.
    # Trazabilidad: REST: /api/admin/* (según implementación).
    Given existe documentacion funcional para "Administrar usuarios (listar/cambiar rol/eliminar)"
    When se ejecuta el comportamiento requerido por RF-54
    Then La API debe incluir rutas REST /api/admin/* según implementación.

  @derived @uc_UC_11
  Scenario: UC-11 mantiene un resultado funcional consistente
    Given el flujo "Administrar usuarios (listar/cambiar rol/eliminar)" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-47 - El administrador debe poder listar usuarios.
- RF-48 - El administrador debe poder cambiar rol (user/admin).
- RF-49 - El administrador debe poder eliminar usuario.
- RF-50 - El sistema no debe permitir que un admin se elimine a sí mismo.
- RF-51 - La API GraphQL debe exponer la query users.
- RF-52 - La API GraphQL debe exponer la mutación updateUserRole.
- RF-53 - La API GraphQL debe exponer la mutación deleteUser.
- RF-54 - La API debe incluir rutas REST /api/admin/* según implementación.
- UC-11 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-663.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-663.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 12. KIWI-664 - UC-12

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-12.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-12 Administrar pedidos y estadísticas (listar/ver detalle/actualizar estado/cancelar/estadísticas)

  # Generado automaticamente desde documentacion funcional para UC-12.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_12 @rf_RF_55
  Scenario: RF-55 - El administrador debe poder listar pedidos con filtro por estado.
    # Trazabilidad: Listar pedidos (con filtro por estado)
    Given existe documentacion funcional para "Administrar pedidos y estadísticas (listar/ver detalle/actualizar estado/cancelar/estadísticas)"
    When se ejecuta el comportamiento requerido por RF-55
    Then El administrador debe poder listar pedidos con filtro por estado.

  @direct @uc_UC_12 @rf_RF_56
  Scenario: RF-56 - El administrador debe poder ver el detalle de un pedido.
    # Trazabilidad: ver detalle
    Given existe documentacion funcional para "Administrar pedidos y estadísticas (listar/ver detalle/actualizar estado/cancelar/estadísticas)"
    When se ejecuta el comportamiento requerido por RF-56
    Then El administrador debe poder ver el detalle de un pedido.

  @direct @uc_UC_12 @rf_RF_57
  Scenario: RF-57 - El administrador debe poder actualizar el estado del pedido.
    # Trazabilidad: actualizar estado
    Given existe documentacion funcional para "Administrar pedidos y estadísticas (listar/ver detalle/actualizar estado/cancelar/estadísticas)"
    When se ejecuta el comportamiento requerido por RF-57
    Then El administrador debe poder actualizar el estado del pedido.

  @direct @uc_UC_12 @rf_RF_58
  Scenario: RF-58 - El administrador debe poder consultar estadísticas: total, por estado e ingresos.
    # Trazabilidad: estadísticas (total, por estado, ingresos)
    Given existe documentacion funcional para "Administrar pedidos y estadísticas (listar/ver detalle/actualizar estado/cancelar/estadísticas)"
    When se ejecuta el comportamiento requerido por RF-58
    Then El administrador debe poder consultar estadísticas: total, por estado e ingresos.

  @direct @uc_UC_12 @rf_RF_59
  Scenario: RF-59 - La API GraphQL debe exponer las queries orders, order y orderStats.
    # Trazabilidad: GraphQL Query orders/order/orderStats
    Given existe documentacion funcional para "Administrar pedidos y estadísticas (listar/ver detalle/actualizar estado/cancelar/estadísticas)"
    When se ejecuta el comportamiento requerido por RF-59
    Then La API GraphQL debe exponer las queries orders, order y orderStats.

  @direct @uc_UC_12 @rf_RF_60
  Scenario: RF-60 - La API GraphQL debe exponer la mutación updateOrderStatus.
    # Trazabilidad: Mutation updateOrderStatus
    Given existe documentacion funcional para "Administrar pedidos y estadísticas (listar/ver detalle/actualizar estado/cancelar/estadísticas)"
    When se ejecuta el comportamiento requerido por RF-60
    Then La API GraphQL debe exponer la mutación updateOrderStatus.

  @direct @uc_UC_12 @rf_RF_61
  Scenario: RF-61 - La API GraphQL debe exponer la mutación cancelOrder.
    # Trazabilidad: Mutation ... cancelOrder.
    Given existe documentacion funcional para "Administrar pedidos y estadísticas (listar/ver detalle/actualizar estado/cancelar/estadísticas)"
    When se ejecuta el comportamiento requerido por RF-61
    Then La API GraphQL debe exponer la mutación cancelOrder.

  @derived @uc_UC_12
  Scenario: UC-12 mantiene un resultado funcional consistente
    Given el flujo "Administrar pedidos y estadísticas (listar/ver detalle/actualizar estado/cancelar/estadísticas)" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-55 - El administrador debe poder listar pedidos con filtro por estado.
- RF-56 - El administrador debe poder ver el detalle de un pedido.
- RF-57 - El administrador debe poder actualizar el estado del pedido.
- RF-58 - El administrador debe poder consultar estadísticas: total, por estado e ingresos.
- RF-59 - La API GraphQL debe exponer las queries orders, order y orderStats.
- RF-60 - La API GraphQL debe exponer la mutación updateOrderStatus.
- RF-61 - La API GraphQL debe exponer la mutación cancelOrder.
- UC-12 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-664.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-664.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.

### 13. KIWI-665 - UC-13

- Proyecto: `IdBox`
- Categoria: `Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos`
- Spec sugerida: `cypress/e2e/uc-13.cy.ts`

#### Objetivo funcional
El test debe demostrar que el comportamiento descrito en Kiwi se cumple de forma observable y no solo que la UI navega sin error.

#### Gherkin / Caso Kiwi
```gherkin
Feature: UC-13 Chat en tiempo real (enviar/recibir mensajes y persistencia opcional)

  # Generado automaticamente desde documentacion funcional para UC-13.
  # Fuente: DRF Práctica 2 - E-commerce con GraphQL y Gestión de Pedidos

  @direct @uc_UC_13 @rf_RF_62
  Scenario: RF-62 - El sistema debe soportar chat en tiempo real con Socket.IO.
    # Trazabilidad: Chat en tiempo real (Socket.IO).
    Given existe documentacion funcional para "Chat en tiempo real (enviar/recibir mensajes y persistencia opcional)"
    When se ejecuta el comportamiento requerido por RF-62
    Then El sistema debe soportar chat en tiempo real con Socket.IO.

  @direct @uc_UC_13 @rf_RF_63
  Scenario: RF-63 - El chat debe usar una sala por defecto 'general'.
    # Trazabilidad: Sala por defecto 'general'
    Given existe documentacion funcional para "Chat en tiempo real (enviar/recibir mensajes y persistencia opcional)"
    When se ejecuta el comportamiento requerido por RF-63
    Then El chat debe usar una sala por defecto 'general'.

  @direct @uc_UC_13 @rf_RF_64
  Scenario: RF-64 - El sistema debe permitir emitir mensajes en tiempo real.
    # Trazabilidad: Emitir/recibir mensajes en tiempo real
    Given existe documentacion funcional para "Chat en tiempo real (enviar/recibir mensajes y persistencia opcional)"
    When se ejecuta el comportamiento requerido por RF-64
    Then El sistema debe permitir emitir mensajes en tiempo real.

  @direct @uc_UC_13 @rf_RF_65
  Scenario: RF-65 - El sistema debe permitir recibir mensajes en tiempo real.
    # Trazabilidad: Emitir/recibir mensajes en tiempo real
    Given existe documentacion funcional para "Chat en tiempo real (enviar/recibir mensajes y persistencia opcional)"
    When se ejecuta el comportamiento requerido por RF-65
    Then El sistema debe permitir recibir mensajes en tiempo real.

  @direct @uc_UC_13 @rf_RF_66
  Scenario: RF-66 - El sistema debe poder almacenar mensajes en MongoDB (Message).
    # Trazabilidad: almacenar mensajes en MongoDB (Message).
    Given existe documentacion funcional para "Chat en tiempo real (enviar/recibir mensajes y persistencia opcional)"
    When se ejecuta el comportamiento requerido por RF-66
    Then El sistema debe poder almacenar mensajes en MongoDB (Message).

  @derived @uc_UC_13
  Scenario: UC-13 mantiene un resultado funcional consistente
    Given el flujo "Chat en tiempo real (enviar/recibir mensajes y persistencia opcional)" tiene datos validos
    When el usuario completa el flujo principal
    Then el resultado observable coincide con la documentacion funcional
```

#### Escenarios detectados
- RF-62 - El sistema debe soportar chat en tiempo real con Socket.IO.
- RF-63 - El chat debe usar una sala por defecto 'general'.
- RF-64 - El sistema debe permitir emitir mensajes en tiempo real.
- RF-65 - El sistema debe permitir recibir mensajes en tiempo real.
- RF-66 - El sistema debe poder almacenar mensajes en MongoDB (Message).
- UC-13 mantiene un resultado funcional consistente

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
- Crear un `describe` con referencia clara a KIWI-665.
- Preparar datos en `beforeEach` mediante API/fixture/factory, no manualmente por UI salvo que el caso lo exija.
- Ejecutar solo las acciones de usuario necesarias para satisfacer el caso.
- Validar resultado funcional con asserts fuertes: estado visible, mensaje exacto, cambio de datos o respuesta API relevante.
- Evitar `cy.wait(ms)`; usar intercepts, assertions retryables o esperas a estados observables.

#### Criterios de aceptacion del test
- [ ] Incluye trazabilidad KIWI-665.
- [ ] Falla si se rompe el comportamiento funcional principal.
- [ ] Cubre precondiciones y datos necesarios.
- [ ] Usa selectores robustos.
- [ ] No depende del orden de ejecucion ni de datos compartidos inestables.
- [ ] Puede ejecutarse localmente y en CI.

#### Riesgos a vigilar
- Flakiness por esperas fijas, datos compartidos, servicios externos o fechas.
- Falsos positivos por asserts demasiado genericos.
- Duplicacion de helpers o comandos Cypress innecesarios.
