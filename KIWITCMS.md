# Kiwi TCMS

Total publicados: 1

## Indice
1. [UC-01](#uc-01) - RM - reviewed

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
