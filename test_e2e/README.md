# Generated E2E Suite

## Planned scenarios
- Registrar un usuario mediante el endpoint /api/auth/register
- Registrar un usuario con username y email únicos
- Almacenar la contraseña con hash usando bcrypt al registrar
- Rechazar registro con username duplicado
- Rechazar registro con email duplicado
- Rechazar registro cuando falta algún campo de entrada
- Rechazar registro cuando el formato del email no es válido
- Registrar un usuario mediante el endpoint /api/auth/register
- Registrar un usuario con username y email únicos
- Almacenar la contraseña con hash usando bcrypt al registrar
- Rechazar registro con username duplicado
- Rechazar registro con email duplicado
- Rechazar registro cuando falta algún campo de entrada
- Rechazar registro cuando el formato del email no es válido
- Autenticar un usuario mediante tokens JWT
- Devolver un token válido con id y role del usuario en el login
- Enviar el token en la cabecera Authorization con formato Bearer <token>
- Rechazar login con credenciales inválidas
- Rechazar login cuando faltan credenciales de entrada
- Rechazar petición cuando la cabecera Authorization no usa el prefijo Bearer
- Rechazar petición cuando falta la cabecera Authorization
- Autenticar un usuario mediante tokens JWT
- Devolver un token válido con id y role del usuario en el login
- Enviar el token en la cabecera Authorization con formato Bearer <token>
- Rechazar login con credenciales inválidas
- Rechazar login cuando faltan credenciales de entrada
- Rechazar petición cuando la cabecera Authorization no usa el prefijo Bearer
- Rechazar petición cuando falta la cabecera Authorization
- Validar token expirado o inválido en el endpoint /api/auth/verify
- Devolver el perfil de usuario sin password al verificar el token
- Verificar token válido y obtener perfil básico
- Rechazar verificación cuando el token está expirado
- Rechazar verificación cuando el token es inválido
- Devolver perfil sin password en una verificación exitosa
- Validar token expirado o inválido en el endpoint /api/auth/verify
- Devolver el perfil de usuario sin password al verificar el token
- Verificar token válido y obtener perfil básico
- Rechazar verificación cuando el token está expirado
- Rechazar verificación cuando el token es inválido
- Devolver perfil sin password en una verificación exitosa

## Skipped scenarios
- Ninguno

## Notes
- Repo type: node_webapp
- Discovery mode: local

## Run
