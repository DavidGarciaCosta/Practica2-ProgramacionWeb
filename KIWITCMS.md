# Kiwi TCMS

## Resumen
UC-14

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 397
- Categoria: 

## Resumen final en Kiwi
UC-14

## Gherkin
```gherkin
Feature: Eliminar usuario (admin)

  Background:
    Given que el sistema aplica autorización por roles (user/admin)

  @direct @rf_RF-32
  Scenario: Eliminar un usuario como admin
    Given que el solicitante tiene rol admin
    And existe un usuario objetivo
    When solicita eliminar el usuario
    Then el sistema elimina el usuario
    # trazabilidad: "eliminar usuario"

  @direct @rf_RF-33
  Scenario: Impedir que un admin se elimine a sí mismo
    Given que el solicitante tiene rol admin
    And el usuario objetivo es el propio solicitante
    When solicita eliminar su propia cuenta
    Then el sistema rechaza la operación
    And la cuenta del administrador permanece activa
    # trazabilidad: "no permitir que un admin se elimine a sí mismo"

  @derived
  Scenario: Denegar eliminación de usuario a no admin
    Given que el solicitante no tiene rol admin
    When intenta eliminar un usuario
    Then el sistema deniega la operación
    # trazabilidad: "requieren rol admin"

  @derived
  Scenario: Fallar al eliminar usuario inexistente
    Given que el solicitante tiene rol admin
    And no existe el usuario objetivo
    When solicita eliminarlo
    Then el sistema indica que el usuario no existe
    # trazabilidad: "eliminar usuario"
```
