# Kiwi TCMS

## Resumen
UC-10

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 370
- Categoria: 

## Resumen final en Kiwi
UC-10

## Gherkin
```gherkin
Feature: Crear pedido

  Background:
    Given que el usuario está autenticado

  @direct @rf_RF-23
  Scenario: Crear un pedido como usuario autenticado
    Given que el carrito contiene al menos un producto
    When el usuario solicita crear un pedido
    Then el sistema crea el pedido
    # trazabilidad: "puede crear pedidos"

  @direct @rf_RF-25
  Scenario: Impedir crear un pedido con carrito vacío
    Given que el carrito está vacío
    When el usuario solicita crear un pedido
    Then el sistema no crea el pedido
    And informa que el carrito está vacío
    # trazabilidad: "No se crea un pedido si el carrito está vacío."

  @direct @rf_RF-26
  Scenario: Fallar el pedido si un producto no existe o no hay stock suficiente
    Given que el carrito contiene un producto inexistente o con stock insuficiente
    When el usuario solicita crear un pedido
    Then el pedido falla
    And el sistema devuelve un mensaje informativo
    # trazabilidad: "producto no existe o no hay stock suficiente"

  @direct @rf_RF-27
  Scenario: Calcular el total del pedido en el servidor
    Given que el carrito contiene productos con precios
    When el usuario solicita crear un pedido
    Then el sistema recalcula el total en el servidor
    And el total del pedido no depende del total enviado por el cliente
    # trazabilidad: "El total usado para el pedido se calcula en servidor"

  @direct @rf_RF-28
  Scenario: Descontar stock al crear el pedido
    Given que el carrito contiene productos con stock suficiente
    When el usuario solicita crear un pedido
    Then el sistema crea el pedido
    And el stock de los productos del pedido se reduce
    # trazabilidad: "stock de productos se reduce"

  @direct @rf_RF-29
  Scenario: Vincular el pedido al usuario
    Given que el usuario está autenticado
    And el carrito contiene productos
    When el usuario solicita crear un pedido
    Then el pedido queda vinculado al usuario
    # trazabilidad: "se vincula el pedido al usuario"

  @derived
  Scenario: Evitar que un usuario no autenticado cree un pedido
    Given que el solicitante no está autenticado
    When solicita crear un pedido
    Then el sistema deniega la operación
    And no se crea el pedido
    # trazabilidad: "usuario autenticado"

  @derived
  Scenario: Protegerse ante manipulación del total por el cliente
    Given que el carrito contiene productos
    And el cliente intenta enviar un total diferente al que corresponde
    When el usuario solicita crear un pedido
    Then el sistema usa el total calculado en servidor
    And crea o rechaza el pedido según validaciones de negocio
    # trazabilidad: "no se confía en el cliente"
```
