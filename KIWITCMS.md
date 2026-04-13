# Kiwi TCMS

## Resumen
UC-18

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 401
- Categoria: 

## Resumen final en Kiwi
UC-18

## Gherkin
```gherkin
Feature: Cancelar pedido (admin)

  @derived
  Scenario: Cancelar un pedido como administrador
    Given que el solicitante tiene rol admin
    And existe un pedido
    When solicita cancelar el pedido
    Then el sistema marca el pedido como cancelado
    # trazabilidad: "cancelOrder"

  @derived
  Scenario: Denegar cancelación de pedido a usuario no admin
    Given que el solicitante no tiene rol admin
    When intenta cancelar un pedido
    Then el sistema deniega la operación
    # trazabilidad: "requieren rol admin"

  @derived
  Scenario: Fallar al cancelar pedido inexistente
    Given que el solicitante tiene rol admin
    And no existe el pedido solicitado
    When solicita cancelar el pedido
    Then el sistema indica que el pedido no existe
    # trazabilidad: "cancelOrder"
```
