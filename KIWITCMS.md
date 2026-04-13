# Kiwi TCMS

## Resumen
UC-09

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 369
- Categoria: 

## Resumen final en Kiwi
UC-09

## Gherkin
```gherkin
Feature: Gestionar carrito en el navegador

  @direct @rf_RF-17
  Scenario: Mantener un carrito en el navegador con persistencia
    Given que el usuario utiliza un carrito de compra en el navegador
    When añade productos al carrito
    Then el carrito se guarda con persistencia local en el navegador
    # trazabilidad: "carrito en el navegador con persistencia en LocalStorage"

  @direct @rf_RF-18
  Scenario: Mantener el carrito entre sesiones
    Given que el usuario añade ítems al carrito
    When cierra y vuelve a abrir la aplicación en el navegador
    Then el carrito previo se restaura desde el almacenamiento local
    # trazabilidad: "mantener entre sesiones"

  @direct @rf_RF-19
  Scenario: Añadir ítems al carrito
    Given que existe un producto en el catálogo
    When el usuario añade el producto al carrito
    Then el carrito contiene el ítem añadido
    # trazabilidad: "Añadir"

  @direct @rf_RF-20
  Scenario: Modificar cantidades en el carrito
    Given que el carrito contiene un ítem
    When el usuario modifica la cantidad del ítem
    Then el carrito refleja la nueva cantidad
    # trazabilidad: "modificar cantidades"

  @direct @rf_RF-21
  Scenario: Eliminar ítems del carrito
    Given que el carrito contiene un ítem
    When el usuario elimina el ítem del carrito
    Then el ítem desaparece del carrito
    # trazabilidad: "eliminar ítems"

  @direct @rf_RF-22
  Scenario: Calcular subtotal y total del carrito
    Given que el carrito contiene uno o más ítems con cantidades
    When el usuario consulta el resumen del carrito
    Then el sistema calcula el subtotal y el total
    # trazabilidad: "calcular subtotal/total"

  @derived
  Scenario: Evitar cantidades inválidas en el carrito
    Given que el carrito contiene un ítem
    When el usuario intenta establecer una cantidad inválida
    Then el carrito no acepta la cantidad inválida
    # trazabilidad: "modificar cantidades"
```
