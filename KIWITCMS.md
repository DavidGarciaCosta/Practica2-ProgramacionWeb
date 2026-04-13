# Kiwi TCMS

## Resumen
UC-02

## Estado de publicacion
- Kiwi: updated
- ID en Kiwi: 362
- Categoria: 

## Resumen final en Kiwi
UC-02

## Gherkin
```gherkin
Feature: Login de usuario (JWT)

  Background:
    Given existe un usuario registrado con credenciales válidas

  @direct @rf_RF-03
  Scenario: Autenticar usuario con JWT
    Given que el usuario proporciona sus credenciales de acceso
    When solicita autenticación
    Then el sistema autentica al usuario
    And emite un token JWT
    # trazabilidad: "autenticarlos mediante tokens JWT"

  @direct @rf_RF-04
  Scenario: Devolver token con id y role del usuario
    Given que el usuario proporciona credenciales correctas
    When solicita autenticación
    Then el sistema devuelve un token válido
    And el token contiene el identificador y el rol del usuario
    # trazabilidad: "token válido con id y role"

  @direct @rf_RF-08
  Scenario: No exponer contraseñas en el almacenamiento (hash bcrypt)
    Given que un usuario se registra y/o existe en el sistema
    When se inspecciona el almacenamiento de credenciales
    Then la contraseña no está almacenada en claro
    And la contraseña está almacenada con hash usando bcrypt
    # trazabilidad: "hash (bcrypt)"

  @derived
  Scenario: Rechazar login con credenciales inválidas
    Given que el usuario proporciona credenciales incorrectas
    When solicita autenticación
    Then el sistema rechaza la autenticación
    And no emite un token JWT
    # trazabilidad: "autenticarlos mediante tokens JWT"

  @derived
  Scenario: Rechazar login cuando faltan credenciales
    Given que el usuario no proporciona alguno de los campos requeridos para autenticación
    When solicita autenticación
    Then el sistema rechaza la solicitud
    And no emite token
    # trazabilidad: "Entradas username, email, password"
```
