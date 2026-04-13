# Kiwi TCMS

## Resumen
UC-12

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 373
- Categoria: 

## Resumen final en Kiwi
UC-12

## Gherkin
```gherkin
Feature: Listar usuarios (admin)

  Background:
    Given que el sistema aplica autorización por roles (user/admin)

  @direct @rf_RF-30
  Scenario: Listar usuarios como administrador
    Given que el solicitante tiene rol admin
    When solicita listar usuarios
    Then el sistema devuelve el listado de usuarios
    # trazabilidad: "Listar usuarios"

  @derived
  Scenario: Denegar listado de usuarios a usuario no admin
    Given que el solicitante no tiene rol admin
    When solicita listar usuarios
    Then el sistema deniega el acceso
    # trazabilidad: "requieren rol admin"
```
