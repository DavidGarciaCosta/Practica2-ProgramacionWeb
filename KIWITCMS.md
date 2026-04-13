# Kiwi TCMS

## Resumen
UC-20

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 403
- Categoria: 

## Resumen final en Kiwi
UC-20

## Gherkin
```gherkin
Feature: Chat en tiempo real (Socket.IO)

  Background:
    Given que existe un canal de chat

  @direct @rf_RF-41
  Scenario: Usar la sala por defecto 'general'
    Given que un usuario se conecta al chat
    When no especifica una sala
    Then el sistema lo asocia a la sala por defecto 'general'
    # trazabilidad: "Sala por defecto 'general'"

  @direct @rf_RF-39
  Scenario: Enviar y recibir mensajes en tiempo real
    Given que dos usuarios están conectados a la sala 'general'
    When uno de los usuarios envía un mensaje
    Then el otro usuario recibe el mensaje en tiempo real
    # trazabilidad: "Emitir/recibir mensajes en tiempo real"

  @direct @rf_RF-40
  Scenario: Persistir mensajes en MongoDB
    Given que un usuario envía un mensaje en el chat
    When el sistema procesa el mensaje
    Then el mensaje queda almacenado en la base de datos
    # trazabilidad: "almacenar mensajes en MongoDB"

  @derived
  Scenario: Manejar desconexión y reconexión sin perder la capacidad de recibir mensajes
    Given que un usuario está conectado a la sala 'general'
    When el usuario se desconecta y se reconecta
    Then el usuario puede volver a enviar y recibir mensajes
    # trazabilidad: "tiempo real"

  @derived
  Scenario: Rechazar mensajes vacíos o inválidos
    Given que un usuario está conectado al chat
    When intenta enviar un mensaje vacío o inválido
    Then el sistema rechaza el mensaje
    And no lo distribuye a otros usuarios
    # trazabilidad: "Emitir/recibir mensajes"
```
