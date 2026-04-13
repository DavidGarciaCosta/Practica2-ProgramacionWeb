# Kiwi TCMS

## Resumen
UC-13

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 396
- Categoria: 

## Resumen final en Kiwi
UC-13

## Gherkin
```gherkin
Feature: Cambiar rol de usuario (admin)

  Background:
    Given que el sistema aplica autorización por roles (user/admin)

  @direct @rf_RF-31
  Scenario: Cambiar rol de un usuario
    Given que el solicitante tiene rol admin
    And existe un usuario objetivo
    When solicita cambiar el rol del usuario a user o admin
    Then el sistema actualiza el rol del usuario
    # trazabilidad: "cambiar rol (user/admin)"

  @derived
  Scenario: Denegar cambio de rol a usuario no admin
    Given que el solicitante no tiene rol admin
    When intenta cambiar el rol de un usuario
    Then el sistema deniega la operación
    # trazabilidad: "requieren rol admin"

  @derived
  Scenario: Fallar al cambiar rol de usuario inexistente
    Given que el solicitante tiene rol admin
    And no existe el usuario objetivo
    When solicita cambiar el rol
    Then el sistema indica que el usuario no existe
    # trazabilidad: "gestiona usuarios"
```
