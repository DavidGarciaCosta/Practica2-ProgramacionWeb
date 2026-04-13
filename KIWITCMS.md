# Kiwi TCMS

## Resumen
UC-19

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 402
- Categoria: 

## Resumen final en Kiwi
UC-19

## Gherkin
```gherkin
Feature: Consultar estadísticas de pedidos (admin)

  Background:
    Given que el sistema aplica autorización por roles (user/admin)

  @direct @rf_RF-37
  Scenario: Consultar estadísticas agregadas de pedidos
    Given que el solicitante tiene rol admin
    When solicita estadísticas de pedidos
    Then el sistema devuelve estadísticas agregadas
    # trazabilidad: "estadísticas agregadas"

  @direct @rf_RF-38
  Scenario: Incluir total, por estado e ingresos en estadísticas
    Given que el solicitante tiene rol admin
    When solicita estadísticas de pedidos
    Then las estadísticas incluyen el total de pedidos
    And las estadísticas incluyen el desglose por estado
    And las estadísticas incluyen los ingresos
    # trazabilidad: "total, por estado, ingresos"

  @derived
  Scenario: Denegar consulta de estadísticas a usuario no admin
    Given que el solicitante no tiene rol admin
    When solicita estadísticas de pedidos
    Then el sistema deniega el acceso
    # trazabilidad: "requieren rol admin"
```
