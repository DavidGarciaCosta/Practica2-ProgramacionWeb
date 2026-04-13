# Kiwi TCMS

## Resumen
UC-15

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 398
- Categoria: 

## Resumen final en Kiwi
UC-15

## Gherkin
```gherkin
Feature: Listar pedidos con filtro por estado (admin)

  Background:
    Given que el sistema aplica autorización por roles (user/admin)

  @direct @rf_RF-34
  Scenario: Listar pedidos filtrando por estado
    Given que el solicitante tiene rol admin
    And existen pedidos con distintos estados
    When solicita listar pedidos aplicando un filtro por estado
    Then el sistema devuelve los pedidos que coinciden con el estado solicitado
    # trazabilidad: "filtro por estado"

  @derived
  Scenario: Listar pedidos sin filtro devuelve todos los pedidos
    Given que el solicitante tiene rol admin
    When solicita listar pedidos sin indicar filtro
    Then el sistema devuelve el listado completo de pedidos
    # trazabilidad: "Listar pedidos"

  @derived
  Scenario: Denegar listado de pedidos a usuario no admin
    Given que el solicitante no tiene rol admin
    When solicita listar pedidos
    Then el sistema deniega el acceso
    # trazabilidad: "requieren rol admin"

  @derived
  Scenario: Filtro por estado sin coincidencias devuelve listado vacío
    Given que el solicitante tiene rol admin
    And no existen pedidos con el estado solicitado
    When solicita listar pedidos con filtro
    Then el sistema devuelve un listado vacío
    # trazabilidad: "filtro por estado"
```
