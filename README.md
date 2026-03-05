

<!-- UC:UC-01 START -->
## UC-01 — UC-01 Registrar usuario

### Procedencia
- (sin metadatos de documento)

### Publicación (Kiwi TCMS)
- Categoría: General
- Componente: General
- Prioridad: P1
- Estado: PROPOSED
- Automatizado: False
- Autor: david
- Tester por defecto: david
- Etiquetas: maturity:reviewed
- Kiwi IDs: SCN-UC-01-RF-01-01, SCN-UC-01-RF-03-01, SCN-UC-01-RF-08-01, SCN-UC-01-DER-01, SCN-UC-01-DER-02, SCN-UC-01-DER-03, SCN-UC-01-DER-04

### Feature (Gherkin)
```gherkin
@uc_UC-01
Feature: UC-01 Registrar usuario (UC-01)
  Background:
    Given el servicio de autenticación está disponible

  Scenario: Registrar un usuario mediante el endpoint /api/auth/register
    Given un visitante no autenticado
    When envía una solicitud POST a "/api/auth/register" con username, email y password
    Then el sistema registra el usuario

  Scenario: Registrar un usuario con username y email únicos
    Given un visitante no autenticado
    And no existe un usuario con el username proporcionado
    And no existe un usuario con el email proporcionado
    When envía una solicitud POST a "/api/auth/register" con username, email y password
    Then el sistema registra el usuario

  Scenario: Almacenar la contraseña con hash usando bcrypt al registrar
    Given un visitante no autenticado
    When envía una solicitud POST a "/api/auth/register" con username, email y password
    Then el sistema almacena la contraseña usando un hash con bcrypt

  Scenario: Rechazar registro con username duplicado
    Given un visitante no autenticado
    And existe un usuario con el username proporcionado
    When envía una solicitud POST a "/api/auth/register" con username, email y password
    Then el sistema rechaza el registro por username no único

  Scenario: Rechazar registro con email duplicado
    Given un visitante no autenticado
    And existe un usuario con el email proporcionado
    When envía una solicitud POST a "/api/auth/register" con username, email y password
    Then el sistema rechaza el registro por email no único

  Scenario: Rechazar registro cuando falta algún campo de entrada
    Given un visitante no autenticado
    When envía una solicitud POST a "/api/auth/register" con username, email y password incompletos
    Then el sistema rechaza el registro por datos de entrada incompletos

  Scenario: Rechazar registro cuando el formato del email no es válido
    Given un visitante no autenticado
    When envía una solicitud POST a "/api/auth/register" con un email con formato inválido
    Then el sistema rechaza el registro por email inválido
```
<!-- UC:UC-01 END -->

<!-- UC:UC-02 START -->
## UC-02 — UC-02 Autenticar usuario (login) y obtener JWT

### Procedencia
- (sin metadatos de documento)

### Publicación (Kiwi TCMS)
- Categoría: General
- Componente: General
- Prioridad: P1
- Estado: PROPOSED
- Automatizado: False
- Autor: david
- Tester por defecto: david
- Etiquetas: maturity:reviewed
- Kiwi IDs: SCN-UC-02-RF-02-01, SCN-UC-02-RF-04-01, SCN-UC-02-RF-07-01, SCN-UC-02-DER-01, SCN-UC-02-DER-02, SCN-UC-02-DER-03, SCN-UC-02-DER-04

### Feature (Gherkin)
```gherkin
@uc_UC-02
Feature: UC-02 Autenticar usuario (login) y obtener JWT (UC-02)
  Background:
    Given el servicio de autenticación está disponible

  Scenario: Autenticar un usuario mediante tokens JWT
    Given un usuario existente con credenciales válidas
    When envía una solicitud POST a "/api/auth/login" con sus credenciales
    Then el sistema autentica al usuario y emite un token JWT

  Scenario: Devolver un token válido con id y role del usuario en el login
    Given un usuario existente con credenciales válidas
    When envía una solicitud POST a "/api/auth/login" con sus credenciales
    Then el sistema devuelve un token JWT válido
    And el token incluye el id del usuario
    And el token incluye el role del usuario

  Scenario: Enviar el token en la cabecera Authorization con formato Bearer <token>
    Given un usuario con un token JWT emitido por el sistema
    When envía una solicitud al endpoint "/api/auth/verify" con la cabecera "Authorization: Bearer <token>"
    Then el sistema procesa el token recibido en la cabecera Authorization

  Scenario: Rechazar login con credenciales inválidas
    Given un usuario existente
    When envía una solicitud POST a "/api/auth/login" con credenciales inválidas
    Then el sistema rechaza la autenticación

  Scenario: Rechazar login cuando faltan credenciales de entrada
    Given un visitante no autenticado
    When envía una solicitud POST a "/api/auth/login" con credenciales incompletas
    Then el sistema rechaza la autenticación por datos de entrada incompletos

  Scenario: Rechazar petición cuando la cabecera Authorization no usa el prefijo Bearer
    Given un usuario con un token JWT emitido por el sistema
    When envía una solicitud al endpoint "/api/auth/verify" con una cabecera Authorization sin el prefijo "Bearer"
    Then el sistema rechaza la solicitud por formato de Authorization inválido

  Scenario: Rechazar petición cuando falta la cabecera Authorization
    Given un usuario con un token JWT emitido por el sistema
    When envía una solicitud al endpoint "/api/auth/verify" sin la cabecera Authorization
    Then el sistema rechaza la solicitud por falta de token
```
<!-- UC:UC-02 END -->

<!-- UC:UC-03 START -->
## UC-03 — UC-03 Verificar token JWT y obtener perfil de usuario

### Procedencia
- (sin metadatos de documento)

### Publicación (Kiwi TCMS)
- Categoría: Inventario
- Componente: General
- Prioridad: P2
- Estado: PROPOSED
- Automatizado: False
- Autor: david
- Tester por defecto: david
- Etiquetas: maturity:reviewed
- Kiwi IDs: SCN-UC-03-RF-05-01, SCN-UC-03-RF-06-01, SCN-UC-03-DER-01, SCN-UC-03-DER-02, SCN-UC-03-DER-03, SCN-UC-03-DER-04

### Feature (Gherkin)
```gherkin
@uc_UC-03
Feature: UC-03 Verificar token JWT y obtener perfil de usuario (UC-03)
  Background:
    Given el servicio de autenticación está disponible

  Scenario: Validar token expirado o inválido en el endpoint /api/auth/verify
    Given un usuario con un token JWT expirado o inválido
    When envía una solicitud a "/api/auth/verify" con la cabecera "Authorization: Bearer <token>"
    Then el sistema valida el token y lo marca como expirado o inválido

  Scenario: Devolver el perfil de usuario sin password al verificar el token
    Given un usuario con un token JWT válido
    When envía una solicitud a "/api/auth/verify" con la cabecera "Authorization: Bearer <token>"
    Then el sistema devuelve el perfil básico del usuario
    And el perfil devuelto no incluye el campo password

  Scenario: Verificar token válido y obtener perfil básico
    Given un usuario con un token JWT válido
    When envía una solicitud a "/api/auth/verify" con la cabecera "Authorization: Bearer <token>"
    Then el sistema valida el token
    And el sistema devuelve el perfil básico del usuario

  Scenario: Rechazar verificación cuando el token está expirado
    Given un usuario con un token JWT expirado
    When envía una solicitud a "/api/auth/verify" con la cabecera "Authorization: Bearer <token>"
    Then el sistema rechaza la verificación por token expirado

  Scenario: Rechazar verificación cuando el token es inválido
    Given un usuario con un token JWT inválido
    When envía una solicitud a "/api/auth/verify" con la cabecera "Authorization: Bearer <token>"
    Then el sistema rechaza la verificación por token inválido

  Scenario: Devolver perfil sin password en una verificación exitosa
    Given un usuario con un token JWT válido
    When envía una solicitud a "/api/auth/verify" con la cabecera "Authorization: Bearer <token>"
    Then el sistema devuelve el perfil del usuario
    And el perfil devuelto no incluye el campo password
```
<!-- UC:UC-03 END -->
