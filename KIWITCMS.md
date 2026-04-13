# Kiwi TCMS

## Resumen
UC-03

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 363
- Categoria: 

## Resumen final en Kiwi
UC-03

## Gherkin
```gherkin
Feature: Verificar token (JWT)

  Background:
    Given el sistema dispone de un endpoint de verificación de token

  @direct @rf_RF-05
  Scenario: Enviar token en cabecera Authorization Bearer
    Given que el usuario dispone de un token JWT
    When solicita la verificación enviando el token en la cabecera Authorization con esquema Bearer
    Then el sistema procesa la verificación del token
    # trazabilidad: "Authorization: Bearer <token>"

  @direct @rf_RF-06
  Scenario: Rechazar verificación con token expirado o inválido
    Given que el usuario envía un token expirado o inválido
    When solicita la verificación
    Then el sistema rechaza la verificación
    And el resultado indica que el token no es válido
    # trazabilidad: "valida token expirado/inválido"

  @direct @rf_RF-07
  Scenario: Devolver perfil sin password al verificar token válido
    Given que el usuario envía un token válido
    When solicita la verificación
    Then el sistema devuelve el perfil del usuario
    And el perfil no incluye el password
    # trazabilidad: "perfil sin password"

  @derived
  Scenario: Rechazar verificación cuando no se envía token
    Given que el usuario no envía la cabecera Authorization
    When solicita la verificación
    Then el sistema rechaza la solicitud
    And no devuelve perfil de usuario
    # trazabilidad: "Authorization: Bearer"

  @derived
  Scenario: Aceptar verificación de token válido y coherente con el usuario
    Given que el usuario envía un token válido emitido por el sistema
    When solicita la verificación
    Then el sistema confirma la validez
    And devuelve datos básicos del usuario
    # trazabilidad: "devuelve perfil"
```
