# Kiwi TCMS

Total publicados: 1

## Indice
1. [UC-01](#uc-01) - Sin proyecto - reviewed

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
