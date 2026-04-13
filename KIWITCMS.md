# Kiwi TCMS

Total publicados: 6

---

# Kiwi TCMS

## Resumen
UC-06

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 409
- Categoria: 

## Resumen final en Kiwi
UC-06

## Gherkin
```gherkin
Feature: Carrito de compra en el navegador (LocalStorage)

  Background:
    Given que el visitante usa el frontend estático del sistema

  @direct @rf-17
  Scenario: Gestionar un carrito persistente en el navegador
    Given que el carrito se gestiona en el navegador
      # "carrito en el navegador"
    When el usuario añade o modifica ítems en el carrito
    Then el estado del carrito se persiste en LocalStorage
      # "persistencia en LocalStorage"

  @direct @rf-18
  Scenario: Mantener el carrito entre sesiones
    Given que el usuario tiene un carrito persistido en LocalStorage
      # "mantener entre sesiones"
    When el usuario cierra y reabre el navegador
    Then el carrito se carga desde LocalStorage

  @direct @rf-19
  Scenario: Añadir ítems al carrito
    Given que existe un producto disponible para añadir al carrito
      # "Añadir"
    When el usuario añade el producto al carrito
    Then el carrito incluye el ítem añadido

  @direct @rf-20
  Scenario: Modificar cantidades de ítems del carrito
    Given que el carrito contiene un ítem
      # "modificar cantidades"
    When el usuario cambia la cantidad del ítem
    Then el carrito refleja la nueva cantidad

  @direct @rf-21
  Scenario: Eliminar ítems del carrito
    Given que el carrito contiene un ítem
      # "eliminar ítems"
    When el usuario elimina el ítem del carrito
    Then el ítem ya no aparece en el carrito

  @direct @rf-22
  Scenario: Calcular subtotal y total del carrito
    Given que el carrito contiene uno o más ítems
      # "calcular subtotal/total"
    When el sistema calcula los importes del carrito
    Then se obtiene el subtotal
    And se obtiene el total

  @derived
  Scenario: Carrito vacío al iniciar sin datos en LocalStorage
    Given que no existe un carrito almacenado en LocalStorage
    When el usuario abre el catálogo
    Then el carrito aparece vacío

  @derived
  Scenario: El total del carrito se actualiza al cambiar cantidades
    Given que el carrito contiene ítems y tiene un total calculado
    When el usuario modifica la cantidad de un ítem
    Then el sistema recalcula subtotal y total

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
UC-04

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 407
- Categoria: 

## Resumen final en Kiwi
UC-04

## Gherkin
```gherkin
Feature: Consulta del catálogo de productos

  Background:
    Given el sistema de e-commerce está disponible

  @direct @rf-11
  Scenario: Listar productos con paginación, búsqueda y filtro por categoría
    Given que existen productos en el catálogo
      # "Listar productos con paginación, búsqueda y filtro por categoría"
    When el visitante consulta el listado de productos indicando parámetros de paginación
    And opcionalmente indica un texto de búsqueda
    And opcionalmente indica una categoría
    Then el sistema devuelve una lista de productos acorde a los criterios

  @direct @rf-12
  Scenario: Consultar el detalle de un producto
    Given que existe un producto en el catálogo
      # "ver detalle de producto."
    When el visitante consulta el detalle de ese producto
    Then el sistema devuelve la información del producto

  @derived
  Scenario: Devolver lista vacía cuando no hay productos que coincidan
    Given que no existen productos que coincidan con el texto de búsqueda o la categoría indicada
    When el visitante consulta el listado de productos
    Then el sistema devuelve una lista vacía

  @derived
  Scenario: Respetar límites de paginación al listar productos
    Given que existen más productos que los que caben en una página
      # "paginación"
    When el visitante consulta el listado con un límite de elementos por página
    Then el sistema devuelve como máximo esa cantidad de productos

  @derived
  Scenario: Búsqueda por nombre o descripción
    Given que existen productos con un término presente en el nombre o la descripción
      # "búsqueda por nombre/descr"
    When el visitante busca por ese término
    Then el sistema devuelve los productos que coinciden por nombre o descripción

  @derived
  Scenario: Filtrar productos por categoría
    Given que existen productos de varias categorías
      # "filtro por categoría"
    When el visitante filtra por una categoría concreta
    Then el sistema devuelve únicamente productos de esa categoría

```

---

# Kiwi TCMS

## Resumen
UC-05

## Estado de publicacion
- Kiwi: created
- ID en Kiwi: 408
- Categoria: 

## Resumen final en Kiwi
UC-05

## Gherkin
```gherkin
Feature: Administración de productos (roles admin)

  Background:
    Given el sistema de e-commerce está disponible

  @direct @rf-09
  Scenario: Requerir rol admin para operaciones administrativas
    Given que un usuario intenta realizar una operación administrativa
      # "Las operaciones administrativas requieren rol admin."
    When el usuario no tiene rol admin
    Then el sistema deniega la operación

  @direct @rf-10
  Scenario: Impedir acceso a operaciones admin a usuarios no admin
    Given que un usuario autenticado tiene rol distinto de admin
      # "impedir accesos a endpoints/resolvers admin a usuarios no admin"
    When intenta acceder a una operación de administración de productos
    Then el sistema impide el acceso

  @direct @rf-13
  Scenario: Crear un producto como administrador
    Given que el usuario tiene rol admin
      # "Crear producto"
    When solicita crear un producto con datos válidos
    Then el sistema crea el producto

  @direct @rf-14
  Scenario: Eliminar un producto como administrador
    Given que el usuario tiene rol admin
      # "eliminar producto"
    And existe un producto en el catálogo
    When solicita eliminar ese producto
    Then el sistema elimina el producto

  @direct @rf-15
  Scenario: Actualizar stock de un producto como administrador
    Given que el usuario tiene rol admin
      # "actualizar stock"
    And existe un producto en el catálogo
    When solicita actualizar el stock del producto a un valor válido
    Then el sistema actualiza el stock

  @direct @rf-16
  Scenario: Rechazar actualización de stock a un valor negativo
    Given que el usuario tiene rol admin
      # "El stock no puede ser negativo."
    And existe un producto en el catálogo
    When solicita actualizar el stock a un valor negativo
    Then el sistema rechaza la actualización de stock

  @derived
  Scenario: Rechazar crear producto si no es admin
    Given que el usuario no tiene rol admin
    When solicita crear un producto
    Then el sistema rechaza la creación

  @derived
  Scenario: Rechazar eliminar producto si no es admin
    Given que el usuario no tiene rol admin
    When solicita eliminar un producto
    Then el sistema rechaza la eliminación

```
