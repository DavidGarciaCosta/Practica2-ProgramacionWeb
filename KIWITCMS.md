# Kiwi TCMS

## Resumen
UC-11

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 372
- Categoria: 

## Resumen final en Kiwi
UC-11

## Gherkin
```gherkin
Feature: Consultar pedidos del usuario (histórico)

  @direct @rf_RF-24
  Scenario: Consultar el histórico de pedidos del usuario autenticado
    Given que el usuario está autenticado
    When solicita consultar sus pedidos
    Then el sistema devuelve su histórico de pedidos
    # trazabilidad: "consultar su histórico"

  @derived
  Scenario: Usuario sin pedidos recibe un listado vacío
    Given que el usuario está autenticado
    And el usuario no tiene pedidos
    When solicita consultar sus pedidos
    Then el sistema devuelve un listado vacío
    # trazabilidad: "consultar su histórico"

  @derived
  Scenario: Usuario no autenticado no puede consultar su histórico
    Given que el solicitante no está autenticado
    When solicita consultar pedidos del usuario
    Then el sistema deniega la operación
    # trazabilidad: "usuario autenticado"
```
