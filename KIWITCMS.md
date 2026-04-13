# Kiwi TCMS

## Resumen
UC-07

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 367
- Categoria: 

## Resumen final en Kiwi
UC-07

## Gherkin
```gherkin
Feature: Eliminar producto (admin)

  Background:
    Given que el sistema aplica autorización por roles (user/admin)

  @direct @rf_RF-14
  Scenario: Permitir eliminar producto solo a admin
    Given que el solicitante tiene rol admin
    And existe un producto en el catálogo
    When solicita eliminar el producto
    Then el sistema elimina el producto
    # trazabilidad: "Solo admin puede crear/eliminar productos"

  @derived
  Scenario: Denegar eliminación a usuario no admin
    Given que el solicitante no tiene rol admin
    When intenta eliminar un producto
    Then el sistema deniega la operación
    And el producto permanece sin cambios
    # trazabilidad: "requieren rol admin"

  @derived
  Scenario: Fallar al eliminar un producto inexistente
    Given que el solicitante tiene rol admin
    And no existe el producto solicitado
    When solicita eliminarlo
    Then el sistema indica que el producto no existe
    # trazabilidad: "eliminar productos"
```
