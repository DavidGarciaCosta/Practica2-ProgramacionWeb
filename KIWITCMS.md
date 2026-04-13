# Kiwi TCMS

## Resumen
UC-01

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 361
- Categoria: 

## Resumen final en Kiwi
UC-01

## Gherkin
```gherkin
Feature: Registro de usuario

  Background:
    Given el sistema permite el registro de usuarios

  @direct @rf_RF-01
  Scenario: Registrar un usuario
    Given que el visitante aporta credenciales de registro (username, email, password)
    When solicita el registro
    Then el sistema crea la cuenta de usuario
    And las credenciales quedan registradas sin exponer la contraseña en claro
    # trazabilidad: "El sistema permite registrar usuarios"

  @direct @rf_RF-02
  Scenario: Impedir registro con username o email duplicados
    Given que ya existe un usuario registrado con el mismo username o el mismo email
    When el visitante solicita el registro con esos datos
    Then el sistema rechaza el registro
    And informa que username y/o email deben ser únicos
    # trazabilidad: "username/email únicos"

  @derived
  Scenario: Registrar usuario con datos mínimos válidos
    Given que el visitante aporta un username, email y password válidos
    And no existe un usuario con el mismo username ni con el mismo email
    When solicita el registro
    Then el sistema crea la cuenta
    And el usuario queda disponible para autenticación posterior
    # trazabilidad: "permite registrar usuarios"

  @derived
  Scenario: Rechazar registro cuando falta algún dato obligatorio
    Given que el visitante no proporciona alguno de los datos de entrada (username, email o password)
    When solicita el registro
    Then el sistema rechaza el registro
    And no se crea la cuenta
    # trazabilidad: "Entradas username, email, password"

  @derived
  Scenario: Idempotencia funcional ante reintento de registro con mismos datos
    Given que un registro previo con username y email ya fue realizado con éxito
    When el visitante vuelve a solicitar el registro con el mismo username y/o email
    Then el sistema no crea un segundo usuario
    And el sistema rechaza la solicitud por duplicidad
    # trazabilidad: "username/email únicos"
```
