# Kiwi TCMS

## Resumen
UC-04

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 364
- Categoria: 

## Resumen final en Kiwi
UC-04

## Gherkin
```gherkin
Feature: Consultar catálogo de productos

  @derived
  Scenario: Listar productos con paginación
    Given que existen productos en el catálogo
    When el visitante solicita el listado indicando page y limit
    Then el sistema devuelve una lista paginada de productos
    # trazabilidad: "paginación"

  @derived
  Scenario: Buscar productos por nombre o descripción
    Given que existen productos en el catálogo
    When el visitante solicita el listado aplicando un criterio de búsqueda por nombre o descripción
    Then el sistema devuelve los productos que coinciden con la búsqueda
    # trazabilidad: "búsqueda por nombre/descr"

  @derived
  Scenario: Filtrar productos por categoría
    Given que existen productos en el catálogo con distintas categorías
    When el visitante solicita el listado filtrando por categoría
    Then el sistema devuelve únicamente los productos de esa categoría
    # trazabilidad: "filtro por categoría"

  @derived
  Scenario: Combinar paginación, búsqueda y filtro
    Given que existen productos en el catálogo
    When el visitante solicita el listado combinando paginación, búsqueda y filtro por categoría
    Then el sistema devuelve resultados coherentes con todos los criterios
    # trazabilidad: "paginación, búsqueda y filtro por categoría"

  @derived
  Scenario: Listado vacío cuando no hay productos que cumplan el criterio
    Given que no existen productos que coincidan con el criterio solicitado
    When el visitante solicita el listado
    Then el sistema devuelve una lista vacía
    # trazabilidad: "consulta pública del catálogo"
```
