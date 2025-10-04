# Funcionalidades del Proyecto

Este documento detalla las funcionalidades que están actualmente activas en el proyecto y aquellas que aún están pendientes de implementar o completar.

## Funcionalidades Activas

Las siguientes funcionalidades han sido implementadas y están operativas:

- **Registro de Usuarios:** Funcionalidad de registro de usuarios completamente operativa, incluyendo validación de datos, hashing de contraseñas y persistencia en la base de datos MongoDB.
  - **Tecnologías:** `api-gateway`, `@repo/domain`, `@repo/security` (BcryptHashingService), `@repo/infraestructure` (MongoUserRepository).
- **Inicio de Sesión de Usuarios:** Implementación de la lógica para que los usuarios puedan iniciar sesión, incluyendo la verificación de credenciales y la generación de tokens de sesión (JWT).
  - **Módulos Involucrados:** `api-gateway`, `@repo/domain`, `@repo/security` (JwtService).
- **Gestión de Usuarios (Persistencia):** La información de los usuarios se guarda y gestiona en MongoDB, utilizando `uuid` como identificador principal.
  - **Tecnologías:** `@repo/infraestructure` (MongoUserRepository, MongoUserSchema).
- **Manejo de Objetos de Valor:** `EmailAddress` y `HashedPassword` como objetos de valor con sus propiedades privadas y métodos públicos para acceso (ej. `toString()`).
  - **Tecnologías:** `@repo/domain`.
- **Compilación del Monorepo:** El proceso de construcción completo del monorepo (`pnpm build`) se ejecuta sin errores, asegurando que todos los paquetes y aplicaciones se compilen correctamente.
  - **Tecnologías:** `pnpm`, `turbo`, TypeScript.

## Funcionalidades Pendientes

Las siguientes funcionalidades están planificadas o en proceso de desarrollo:

- **Autenticación y Autorización:** Implementación completa de mecanismos de autenticación (basados en tokens) y autorización (roles, permisos) para proteger las rutas de la API.
  - **Módulos Involucrados:** `api-gateway`, `@repo/security`.
- **Interfaz de Usuario (Frontend):** Desarrollo de la interfaz de usuario completa en la aplicación `web` para interactuar con todas las funcionalidades del backend (registro, inicio de sesión, etc.).
  - **Módulos Involucrados:** `web`.
- **Event-Driven Architecture (EDA):** Implementación de una arquitectura basada en eventos para desacoplar aún más los componentes y permitir una comunicación asíncrona.
  - **Módulos Involucrados:** `api-gateway`, `@repo/realtime` (potencialmente), `@repo/shared` (definición de eventos).
- **Gestión de API Keys:** Desarrollo de la funcionalidad para que los usuarios puedan generar y gestionar sus propias API Keys.
  - **Módulos Involucrados:** `api-gateway`, `@repo/domain`, `@repo/infraestructure`.
- **Funcionalidades en Tiempo Real:** Implementación de características en tiempo real, como notificaciones o chat, utilizando el paquete `realtime`.
  - **Módulos Involucrados:** `@repo/realtime`.
- **Validación de Datos Avanzada:** Implementación de validaciones más robustas y personalizadas para los datos de entrada en el backend.
  - **Módulos Involucrados:** `api-gateway`, `@repo/domain`.
