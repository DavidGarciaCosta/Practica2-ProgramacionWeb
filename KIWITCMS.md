# Kiwi TCMS

Total publicados: 3

## Indice
1. [UC-01](#uc-01) - RM - reviewed
2. [UC-02](#uc-02) - RM - reviewed
3. [UC-03](#uc-03) - RM - reviewed

---

## UC-01

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 415
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 5
- Directos: 2
- Derivados: 3

### Resumen final en Kiwi
UC-01 [RM]

### Gherkin
```gherkin
Feature: Registro de usuarios (JWT)

  # Trazabilidad: "Un usuario puede registrarse con username/email únicos."
  @direct @uc-01 @rf-01
  Scenario: Registrar un usuario con username y email únicos
    Given que no existe una cuenta registrada con el mismo username o email
    When el visitante envía una solicitud de registro con username, email y password
    Then el sistema crea la cuenta de usuario
    And el sistema confirma que el username y el email quedan asociados de forma única

  # Trazabilidad: "Contraseñas almacenadas con hash (bcrypt)."
  @direct @uc-01 @rf-05
  Scenario: El password se almacena de forma no reversible
    Given que un visitante se registra con un password
    When el sistema persiste las credenciales del usuario
    Then el sistema almacena el password usando hash con bcrypt
    And el sistema no almacena el password en texto plano

  @derived @uc-01
  Scenario: Impedir registro con username duplicado
    Given que existe una cuenta registrada con un username determinado
    When el visitante intenta registrarse reutilizando ese mismo username
    Then el sistema rechaza el registro
    And el sistema informa que el username ya está en uso

  @derived @uc-01
  Scenario: Impedir registro con email duplicado
    Given que existe una cuenta registrada con un email determinado
    When el visitante intenta registrarse reutilizando ese mismo email
    Then el sistema rechaza el registro
    And el sistema informa que el email ya está en uso

  @derived @uc-01
  Scenario: Rechazar registro con datos obligatorios ausentes
    Given que un visitante quiere registrarse
    When el visitante envía el registro sin informar username o email o password
    Then el sistema rechaza el registro
    And el sistema informa que faltan datos obligatorios

```

---

## UC-02

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 416
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 6
- Directos: 2
- Derivados: 4

### Resumen final en Kiwi
UC-02 [RM]

### Gherkin
```gherkin
Feature: Login y uso de token JWT

  # Trazabilidad: "El login devuelve un token válido con id y role del usuario."
  @direct @uc-02 @rf-02
  Scenario: Iniciar sesión con credenciales válidas devuelve token y perfil básico
    Given que existe un usuario registrado con credenciales válidas
    When el usuario envía sus credenciales de acceso
    Then el sistema autentica al usuario
    And el sistema devuelve un token JWT válido
    And el sistema devuelve el perfil básico incluyendo id y role

  # Trazabilidad: "El token debe enviarse en Authorization: Bearer <token>."
  @direct @uc-02 @rf-04
  Scenario: Usar token en cabecera Authorization como Bearer token
    Given que el usuario dispone de un token JWT válido
    When el usuario invoca una operación autenticada enviando la cabecera Authorization con el formato "Bearer <token>"
    Then el sistema reconoce al usuario autenticado a partir del token

  @derived @uc-02
  Scenario: Rechazar login con password inválido
    Given que existe un usuario registrado
    When el usuario intenta iniciar sesión con un password incorrecto
    Then el sistema rechaza la autenticación
    And el sistema no devuelve un token JWT

  @derived @uc-02
  Scenario: Rechazar login con usuario inexistente
    Given que no existe una cuenta con unas credenciales dadas
    When el usuario intenta iniciar sesión con dichas credenciales
    Then el sistema rechaza la autenticación
    And el sistema no devuelve un token JWT

  @derived @uc-02
  Scenario: Rechazar invocación autenticada si falta cabecera Authorization
    Given que una operación requiere autenticación mediante token
    When el usuario invoca la operación sin cabecera Authorization
    Then el sistema rechaza la solicitud por falta de autenticación

  @derived @uc-02
  Scenario: Rechazar invocación autenticada con formato de Authorization no soportado
    Given que una operación requiere autenticación mediante token
    When el usuario invoca la operación con una cabecera Authorization que no sigue el formato "Bearer <token>"
    Then el sistema rechaza la solicitud por autenticación no válida

```

---

## UC-03

### Metadatos
- Proyecto asociado: RM
- Kiwi: created
- ID en Kiwi: 417
- Categoria: Sin categoria
- Madurez: reviewed
- Escenarios: 3
- Directos: 1
- Derivados: 2

### Resumen final en Kiwi
UC-03 [RM]

### Gherkin
```gherkin
Feature: Verificación de token y obtención de perfil

  # Trazabilidad: "El endpoint de verificación valida token expirado/inválido y devuelve perfil sin password."
  @direct @uc-03 @rf-03
  Scenario: Verificar token válido devuelve perfil sin password
    Given que el usuario dispone de un token JWT válido
    When el usuario solicita la verificación del token
    Then el sistema valida el token
    And el sistema devuelve el perfil del usuario
    And el perfil devuelto no incluye el password

  # Trazabilidad: "El endpoint de verificación valida token expirado/inválido"
  @derived @uc-03
  Scenario: Verificar token expirado o inválido falla
    Given que el usuario dispone de un token JWT expirado o inválido
    When el usuario solicita la verificación del token
    Then el sistema rechaza la verificación
    And el sistema informa que el token no es válido

  @derived @uc-03
  Scenario: Verificación sin token falla
    Given que el usuario no envía token
    When el usuario solicita la verificación del token
    Then el sistema rechaza la verificación por falta de autenticación

```
