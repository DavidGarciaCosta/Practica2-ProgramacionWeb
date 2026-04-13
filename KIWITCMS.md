# Kiwi TCMS

## Resumen
UC-08

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 368
- Categoria: 

## Resumen final en Kiwi
UC-08

## Gherkin
```gherkin
Feature: Actualizar stock de producto (admin)

  Background:
    Given que el sistema aplica autorización por roles (user/admin)

  @direct @rf_RF-15
  Scenario: Permitir modificar stock solo a admin
    Given que el solicitante tiene rol admin
    And existe un producto en el catálogo
    When solicita modificar el stock del producto
    Then el sistema actualiza el stock
    # trazabilidad: "modificar stock"

  @direct @rf_RF-16
  Scenario: Impedir que el stock quede en un valor negativo
    Given que el solicitante tiene rol admin
    And existe un producto en el catálogo
    When solicita actualizar el stock a un valor negativo
    Then el sistema rechaza la actualización
    And el stock no se establece en negativo
    # trazabilidad: "stock no puede ser negativo"

  @derived
  Scenario: Denegar actualización de stock a usuario no admin
    Given que el solicitante no tiene rol admin
    When intenta modificar el stock de un producto
    Then el sistema deniega la operación
    # trazabilidad: "requieren rol admin"

  @derived
  Scenario: Actualizar stock de un producto inexistente
    Given que el solicitante tiene rol admin
    And no existe el producto solicitado
    When solicita modificar el stock
    Then el sistema indica que el producto no existe
    # trazabilidad: "gestión de productos"
```
