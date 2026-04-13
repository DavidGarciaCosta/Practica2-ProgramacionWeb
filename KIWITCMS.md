# Kiwi TCMS

## Resumen
UC-06

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 366
- Categoria: 

## Resumen final en Kiwi
UC-06

## Gherkin
```gherkin
Feature: Crear producto (admin)

  Background:
    Given que el sistema aplica autorización por roles (user/admin)

  @direct @rf_RF-13
  Scenario: Permitir creación de producto solo a admin
    Given que el solicitante tiene rol admin
    When solicita la creación de un producto
    Then el sistema crea el producto
    # trazabilidad: "Solo admin puede crear"

  @direct @rf_RF-09
  Scenario: Requerir rol admin para operaciones administrativas
    Given que la operación es administrativa
    When un usuario sin rol admin intenta crear un producto
    Then el sistema deniega la operación
    # trazabilidad: "requieren rol admin"

  @direct @rf_RF-10
  Scenario: Impedir acceso a operación admin a usuario no admin
    Given que el solicitante no tiene rol admin
    When intenta acceder a la operación administrativa de creación de producto
    Then el backend impide el acceso
    # trazabilidad: "impedir accesos a endpoints/resolvers admin"

  @derived
  Scenario: Rechazar creación cuando faltan datos del producto
    Given que el solicitante tiene rol admin
    And no se proporcionan los datos mínimos para definir un producto
    When solicita la creación
    Then el sistema rechaza la creación
    And no se crea el producto
    # trazabilidad: "Gestión de productos (CRUD)"

  @derived
  Scenario: Crear producto y que aparezca en el catálogo público
    Given que el solicitante tiene rol admin
    When crea un producto
    Then el producto queda disponible en el catálogo para consultas públicas
    # trazabilidad: "consulta pública del catálogo"
```
