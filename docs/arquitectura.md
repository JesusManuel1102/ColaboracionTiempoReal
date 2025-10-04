# Arquitectura del Sistema

Este documento describe la arquitectura del monorepo, que está diseñado para una aplicación escalable y modular. El proyecto utiliza un enfoque de monorepo para gestionar múltiples aplicaciones y paquetes compartidos bajo un mismo repositorio.

## Estructura del Monorepo

El monorepo se organiza en dos directorios principales:

-   `apps/`: Contiene las aplicaciones principales del proyecto.
-   `packages/`: Contiene los paquetes de código compartido que son utilizados por las aplicaciones y otros paquetes.

### Directorio `apps/`

#### `api-gateway`

-   **Descripción:** Esta es la aplicación principal de backend que expone una API REST. Se encarga de la autenticación, autorización, gestión de usuarios y la lógica de negocio central. Actúa como la puerta de enlace para todas las solicitudes del frontend y otros servicios.
-   **Tecnologías Clave:** Node.js, Express, TypeScript.

#### `web`

-   **Descripción:** Esta es la aplicación frontend que proporciona la interfaz de usuario para los usuarios finales. Consume la API expuesta por `api-gateway` para interactuar con el backend.
-   **Tecnologías Clave:** React, Vite, TypeScript.

### Directorio `packages/`

#### `domain`

-   **Descripción:** Contiene la lógica de negocio central del proyecto, incluyendo entidades, objetos de valor (value objects), interfaces de repositorio y servicios de dominio. Es agnóstico a la infraestructura y a la tecnología.
-   **Ejemplos:** `User` entity, `EmailAddress` value object, `IHashingService` interface.

#### `infraestructure`

-   **Descripción:** Implementa las interfaces definidas en el paquete `domain`. Se encarga de la persistencia de datos (por ejemplo, con MongoDB), la comunicación con servicios externos y otros detalles de implementación técnica.
-   **Ejemplos:** `MongoUserRepository` (implementación de `IUserRepository`), esquemas de Mongoose.

#### `security`

-   **Descripción:** Proporciona servicios relacionados con la seguridad, como el hashing de contraseñas, la generación y validación de tokens (JWT), y otras utilidades de seguridad.
-   **Ejemplos:** `BcryptHashingService`, `JwtService`.

#### `shared`

-   **Descripción:** Contiene utilidades, tipos y constantes que son comunes y pueden ser utilizados por cualquier parte del monorepo sin introducir dependencias cíclicas.
-   **Ejemplos:** Tipos de errores personalizados, funciones de utilidad genéricas.

#### `realtime`

-   **Descripción:** Gestiona la funcionalidad en tiempo real de la aplicación, como notificaciones o chat, utilizando WebSockets u otras tecnologías de tiempo real.
-   **Tecnologías Clave:** Socket.IO (ejemplo).

#### `eslint-config` y `typescript-config`

-   **Descripción:** Contienen configuraciones compartidas para ESLint y TypeScript, respectivamente, asegurando la consistencia del código y la calidad en todo el monorepo.

## Tecnologías Clave Utilizadas

-   **Node.js:** Entorno de ejecución para el backend.
-   **TypeScript:** Lenguaje de programación para todo el proyecto, proporcionando tipado estático.
-   **Mongoose:** ODM (Object Data Modeling) para interactuar con MongoDB en el backend.
-   **React:** Biblioteca de JavaScript para construir interfaces de usuario en el frontend.
-   **Vite:** Herramienta de construcción rápida para el desarrollo frontend.
-   **pnpm:** Gestor de paquetes para el monorepo, optimizando el uso de espacio en disco y la velocidad de instalación.
-   **TurboRepo:** Herramienta de construcción para monorepos que optimiza los tiempos de construcción y prueba mediante el almacenamiento en caché y la ejecución distribuida.

## Flujo de Datos e Interacciones (Ejemplo: Registro de Usuario)

1.  **Frontend (`web`):** El usuario interactúa con el formulario de registro en la aplicación web.
2.  **API Gateway (`api-gateway`):** La aplicación web envía una solicitud POST a la API Gateway con los datos del usuario.
3.  **Servicio de Dominio (`domain`):** La API Gateway utiliza un servicio de dominio para validar los datos del usuario y crear una entidad `User`.
4.  **Servicio de Seguridad (`security`):** El servicio de dominio utiliza el servicio de hashing de `security` para cifrar la contraseña del usuario.
5.  **Repositorio de Infraestructura (`infraestructure`):** El servicio de dominio utiliza el repositorio de usuario de `infraestructure` para persistir la entidad `User` en la base de datos (MongoDB).
6.  **Base de Datos (MongoDB):** El `MongoUserRepository` guarda el documento de usuario en la colección `Users`.
7.  **Respuesta:** La API Gateway envía una respuesta al frontend indicando el éxito o fracaso del registro.