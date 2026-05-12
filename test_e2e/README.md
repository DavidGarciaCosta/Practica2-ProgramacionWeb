# Generated E2E Suite

## Planned scenarios
- Registrar usuario con username y email únicos
- Almacenar la contraseña del usuario de forma segura
- Rechazar el registro con email duplicado
- Rechazar el registro con username duplicado
- Rechazar el registro cuando faltan datos obligatorios
- No exponer el password en respuestas del registro
- Login exitoso devuelve token JWT con id y role
- Rechazar login con password incorrecto
- Rechazar login con usuario inexistente
- Rechazar acceso a operación autenticada si el token no se envía como Bearer
- No exponer credenciales sensibles en la respuesta de login
- Rechazar creación de pedido si el usuario no está autenticado
- Bloquear consulta de pedidos si el usuario no está autenticado
- Rechazar consulta de detalle de un pedido ajeno
- Rechazar cambio de rol si el actor no es admin
- Rechazar actualización de estado si el pedido no existe
- Estadísticas reflejan cambios tras actualización de estado

## Skipped scenarios
- Usar el token en la cabecera Authorization con esquema Bearer: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Verificar token válido devuelve perfil sin password: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Token inválido es rechazado: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Token expirado es rechazado: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Verificación sin token es rechazada: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Verificación devuelve únicamente perfil básico: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Listar productos con paginación, búsqueda y filtro por categoría: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Consultar detalle de un producto: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Paginar el listado usando page y limit: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Buscar productos por nombre o descripción: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Filtrar productos por categoría: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Solicitud de detalle de producto inexistente: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Búsqueda sin resultados devuelve lista vacía: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Crear un producto como administrador: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Eliminar un producto como administrador: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Actualizar el stock como administrador: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Bloquear operaciones de productos a usuario no admin: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Rechazar actualización de stock a valor negativo: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Rechazar creación de producto con datos incompletos: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Eliminar un producto inexistente es rechazado: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Validar que el stock resultante se mantiene consistente: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Mantener el carrito persistido en el navegador: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Recuperar el carrito al iniciar una nueva sesión del navegador: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Añadir un ítem al carrito: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Modificar la cantidad de un ítem del carrito: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Eliminar un ítem del carrito: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Calcular subtotal y total del carrito: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Establecer una cantidad inválida es rechazado: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Vaciar el carrito elimina el contenido persistido: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Crear un pedido siendo usuario autenticado: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Rechazar creación de pedido con carrito vacío: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Fallar la creación de pedido por producto inexistente o sin stock: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Calcular el total del pedido en el servidor: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Ignorar el total manipulado enviado por el cliente: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Descontar stock al crear el pedido: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Vincular el pedido al usuario autenticado: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Evitar efectos colaterales cuando la creación de pedido falla: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Crear pedido con múltiples ítems descuenta stock de cada ítem: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Consultar histórico de pedidos: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Consultar pedidos cuando no existen pedidos previos: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Un usuario solo puede ver sus propios pedidos: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Consultar detalle de un pedido del propio usuario: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Requerir rol admin para operaciones administrativas: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Impedir acceso a endpoints/resolvers admin a no administradores: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Autorizar resolvers GraphQL usando el contexto del token: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Listar usuarios como administrador: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Cambiar el rol de un usuario: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Eliminar un usuario: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Bloquear auto-eliminación del administrador: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Bloquear listado de usuarios a un usuario no admin: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Eliminar usuario inexistente es rechazado: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Listar pedidos filtrando por estado: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Ver detalle de un pedido: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Actualizar el estado de un pedido: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Consultar estadísticas agregadas de pedidos: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Bloquear administración de pedidos a usuario no admin: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Filtrar por estado sin coincidencias devuelve lista vacía: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Verificar que el detalle incluye el estado del pedido: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Enviar y recibir mensajes en tiempo real: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Persistir mensajes del chat: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Usar la sala por defecto general: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Enviar mensaje vacío es rechazado: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Recuperar historial de mensajes persistidos (si aplica): Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.
- Mantener el servicio de chat operativo ante desconexión y reconexión: Evidencia UI insuficiente: faltan ruta navegable o selectores fiables para inputs.

## Notes
- Repo type: node_webapp
- Discovery mode: local

## Run
cd test_e2e
npm install
npm run cy:run
