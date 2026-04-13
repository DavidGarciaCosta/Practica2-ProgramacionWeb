# Kiwi TCMS

## Resumen
UC-05

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 365
- Categoria: 

## Resumen final en Kiwi
UC-05

## Gherkin
```gherkin
Feature: Ver detalle de producto

  @direct @rf_RF-12
  Scenario: Consultar detalle de un producto existente
    Given que existe un producto en el catálogo
    When el visitante solicita el detalle del producto
    Then el sistema devuelve la información del producto
    # trazabilidad: "ver detalle de producto"

  @derived
  Scenario: Fallar al solicitar el detalle de un producto inexistente
    Given que no existe un producto con el identificador solicitado
    When el visitante solicita el detalle del producto
    Then el sistema indica que el producto no existe
    # trazabilidad: "ver detalle de producto"

  @derived
  Scenario: Consultar detalle sin autenticación
    Given que el visitante no está autenticado
    And existe un producto en el catálogo
    When el visitante solicita el detalle del producto
    Then el sistema devuelve la información del producto
    # trazabilidad: "consulta pública del catálogo"
```
