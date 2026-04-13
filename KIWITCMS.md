# Kiwi TCMS

Total publicados: 1

---

# Kiwi TCMS

## Resumen
UC-01

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 404
- Categoria: 

## Resumen final en Kiwi
UC-01

## Gherkin
```gherkin
Feature: Registro de usuario (JWT)

  Background:
    Given el sistema de e-commerce está disponible

  @direct @rf-01
  Scenario: Registrar un usuario nuevo
    Given que el usuario proporciona username, email y password
      # "Entradas username, email, password"
    When solicita el registro de un usuario
      # "El sistema permite registrar usuarios"
    Then el usuario queda registrado
    And el sistema devuelve el perfil básico del usuario

  @direct @rf-02
  Scenario: Impedir registro con username o email ya existente
    Given que existe un usuario con el mismo username o el mismo email
      # "username/email únicos"
    When se intenta registrar otro usuario con ese username o email
    Then el sistema rechaza el registro
    And informa que el username o email debe ser único

  @derived
  Scenario: Rechazar registro con datos obligatorios ausentes
    Given que falta username o falta email o falta password
      # "Entradas username, email, password"
    When se intenta registrar el usuario
    Then el sistema rechaza el registro
    And informa que faltan datos obligatorios

  @derived
  Scenario: Mantener la unicidad ante registros repetidos (idempotencia práctica)
    Given que un usuario ya fue registrado con un username y email concretos
      # "username/email únicos"
    When se reintenta registrar el mismo username y email
    Then el sistema rechaza el registro
    And no crea una segunda cuenta

  @derived
  Scenario: Asegurar que la respuesta de registro no incluye el password
    Given que el usuario solicita el registro con credenciales válidas
    When el sistema responde al registro
    Then el perfil devuelto no contiene el password
      # "devuelve perfil sin password." (criterio análogo de perfil)

```
