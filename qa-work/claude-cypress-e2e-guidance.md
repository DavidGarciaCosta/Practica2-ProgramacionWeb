# Claude Cypress E2E Guidance

Este archivo esta pensado para que el desarrollador lo entregue a Claude antes de implementar tests E2E en Cypress.
Claude NO debe implementar a ciegas: debe hacer preguntas, cerrar ambiguedades y proponer una arquitectura mantenible antes de escribir codigo.

## Contexto
- Generado: 2026-06-03 08:11:22 UTC
- Casos Kiwi publicados incluidos: 1
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
