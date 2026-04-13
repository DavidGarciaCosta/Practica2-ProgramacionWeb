# Kiwi TCMS

## Resumen
UC-16

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 399
- Categoria: 

## Resumen final en Kiwi
UC-16

## Gherkin
```gherkin
Feature: Ver detalle de pedido (admin)

  Background:
    Given que el sistema aplica autorización por roles (user/admin)

  @direct @rf_RF-35
  Scenario: Ver detalle de un pedido como admin
    Given que el solicitante tiene rol admin
    And existe un pedido
    When solicita ver el detalle del pedido
    Then el sistema devuelve la información detallada del pedido
    # trazabilidad: "ver detalle"

  @derived
  Scenario: Denegar ver detalle de pedido a usuario no admin
    Given que el solicitante no tiene rol admin
    When intenta ver el detalle de un pedido
    Then el sistema deniega el acceso
    # trazabilidad: "requieren rol admin"

  @derived
  Scenario: Fallar al consultar detalle de pedido inexistente
    Given que el solicitante tiene rol admin
    And no existe el pedido solicitado
    When solicita ver el detalle
    Then el sistema indica que el pedido no existe
    # trazabilidad: "ver detalle"
```
