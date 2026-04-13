# Kiwi TCMS

## Resumen
UC-17

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 400
- Categoria: 

## Resumen final en Kiwi
UC-17

## Gherkin
```gherkin
Feature: Actualizar estado de pedido (admin)

  Background:
    Given que el sistema aplica autorización por roles (user/admin)

  @direct @rf_RF-36
  Scenario: Actualizar el estado de un pedido
    Given que el solicitante tiene rol admin
    And existe un pedido con un estado actual
    When solicita actualizar el estado del pedido
    Then el sistema actualiza el estado del pedido
    # trazabilidad: "actualizar estado"

  @derived
  Scenario: Denegar actualización de estado a usuario no admin
    Given que el solicitante no tiene rol admin
    When intenta actualizar el estado de un pedido
    Then el sistema deniega la operación
    # trazabilidad: "requieren rol admin"

  @derived
  Scenario: Fallar al actualizar estado de un pedido inexistente
    Given que el solicitante tiene rol admin
    And no existe el pedido solicitado
    When solicita actualizar el estado
    Then el sistema indica que el pedido no existe
    # trazabilidad: "actualizar estado"

  @derived
  Scenario: Actualizar estado a un valor no permitido
    Given que el solicitante tiene rol admin
    And existe un pedido
    When solicita actualizar el estado a un valor fuera de los estados soportados
    Then el sistema rechaza la actualización
    # trazabilidad: "Estados pending, completed, cancelled"
```
