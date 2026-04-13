# Kiwi TCMS

Total publicados: 3

---

# Kiwi TCMS

## Resumen
UC-03

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 406
- Categoria: 

## Resumen final en Kiwi
UC-03

## Gherkin
```gherkin
Feature: Verificación de token JWT

  Background:
    Given el sistema de e-commerce está disponible

  @direct @rf-07
  Scenario: Detectar token inválido o expirado
    Given que el usuario presenta un token JWT inválido o expirado
      # "valida token expirado/inválido"
    When solicita la verificación del token
    Then el sistema rechaza la verificación del token

  @direct @rf-08
  Scenario: Devolver perfil sin password con token válido
    Given que el usuario presenta un token JWT válido
    When solicita la verificación del token
      # "/api/auth/verify" y "devuelve perfil sin password."
    Then el sistema valida el token
    And devuelve el perfil del usuario
    And el perfil devuelto no contiene el password

  @derived
  Scenario: Rechazar verificación cuando no se envía token
    Given que el usuario no envía ningún token
    When solicita la verificación del token
    Then el sistema rechaza la solicitud de verificación

  @derived
  Scenario: Aceptar token enviado con el esquema Bearer
    Given que el usuario envía un token JWT en la cabecera Authorization usando el esquema Bearer
      # "Authorization: Bearer <token>."
    When solicita la verificación del token
    Then el sistema procesa el token proporcionado

```

---

# Kiwi TCMS

## Resumen
UC-01

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 404
- Categoria: 

## Resumen final en Kiwi
UC-01

## Gherkin
```gherkin
Feature: Registro de usuario (JWT)

  Background:
    Given el sistema de e-commerce está disponible

  @direct @rf-01
  Scenario: Registrar un usuario nuevo
    Given que el usuario proporciona username, email y password
      # "Entradas username, email, password"
    When solicita el registro de un usuario
      # "El sistema permite registrar usuarios"
    Then el usuario queda registrado
    And el sistema devuelve el perfil básico del usuario

  @direct @rf-02
  Scenario: Impedir registro con username o email ya existente
    Given que existe un usuario con el mismo username o el mismo email
      # "username/email únicos"
    When se intenta registrar otro usuario con ese username o email
    Then el sistema rechaza el registro
    And informa que el username o email debe ser único

  @derived
  Scenario: Rechazar registro con datos obligatorios ausentes
    Given que falta username o falta email o falta password
      # "Entradas username, email, password"
    When se intenta registrar el usuario
    Then el sistema rechaza el registro
    And informa que faltan datos obligatorios

  @derived
  Scenario: Mantener la unicidad ante registros repetidos (idempotencia práctica)
    Given que un usuario ya fue registrado con un username y email concretos
      # "username/email únicos"
    When se reintenta registrar el mismo username y email
    Then el sistema rechaza el registro
    And no crea una segunda cuenta

  @derived
  Scenario: Asegurar que la respuesta de registro no incluye el password
    Given que el usuario solicita el registro con credenciales válidas
    When el sistema responde al registro
    Then el perfil devuelto no contiene el password
      # "devuelve perfil sin password." (criterio análogo de perfil)

```

---

# Kiwi TCMS

## Resumen
UC-02

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 405
- Categoria: 

## Resumen final en Kiwi
UC-02

## Gherkin
```gherkin
Feature: Autenticación de usuario (login) con JWT

  Background:
    Given el sistema de e-commerce está disponible

  @direct @rf-03
  Scenario: Autenticar un usuario y generar un JWT
    Given que existe un usuario registrado
      # "autenticarlos mediante tokens JWT"
    When el usuario envía credenciales válidas para iniciar sesión
    Then el sistema autentica al usuario
    And genera un token JWT

  @direct @rf-04
  Scenario: Devolver token con id y role en el login
    Given que el usuario inicia sesión con credenciales válidas
      # "El login devuelve un token válido con id y role del usuario."
    When el sistema responde al login
    Then el sistema devuelve un token JWT válido
    And el token contiene el id del usuario
    And el token contiene el role del usuario

  @direct @rf-05
  Scenario: Verificar que las contraseñas se almacenan con hash
    Given que un usuario se ha registrado en el sistema
      # "Contraseñas almacenadas con hash (bcrypt)."
    When se consulta el almacenamiento interno de la contraseña del usuario
    Then la contraseña no está almacenada en texto plano
    And la contraseña está almacenada como un hash

  @direct @rf-06
  Scenario: Usar el esquema Bearer para enviar el token
    Given que el usuario ha obtenido un token JWT tras el login
      # "Authorization: Bearer <token>."
    When el usuario accede a una operación que requiere autenticación
    Then el token se envía en la cabecera Authorization usando el esquema Bearer

  @derived
  Scenario: Rechazar login con credenciales inválidas
    Given que el usuario envía credenciales inválidas
    When intenta iniciar sesión
    Then el sistema rechaza la autenticación

  @derived
  Scenario: Rechazar login cuando faltan datos de entrada
    Given que falta el identificador del usuario o falta la contraseña
    When intenta iniciar sesión
    Then el sistema rechaza la autenticación

  @derived
  Scenario: No exponer el password en la salida del login
    Given que el usuario inicia sesión correctamente
      # "Salidas JWT + perfil básico del usuario"
    When el sistema devuelve el perfil básico del usuario
    Then el perfil no incluye el password

```
