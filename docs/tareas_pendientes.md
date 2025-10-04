# Tareas Pendientes por Requerimiento Funcional

Este documento describe las tareas pendientes para cada requerimiento funcional (RF) del proyecto, sirviendo como un plan de trabajo para la iteración y el desarrollo.

## RF01 - Gestión de Usuarios

**Estado Actual:** El registro de usuarios está completamente funcional. La persistencia en MongoDB y el manejo de objetos de valor (`EmailAddress`, `HashedPassword`) están implementados.

**Tareas Pendientes:**

-   **Implementar Inicio de Sesión de Usuarios:** Desarrollar la lógica para que los usuarios puedan iniciar sesión, incluyendo la verificación de credenciales y la generación de tokens de sesión (JWT).
    -   **Módulos Involucrados:** `api-gateway`, `@repo/domain`, `@repo/security` (JwtService).
-   **Implementar Autenticación y Autorización:** Desarrollar mecanismos completos de autenticación (basados en tokens) y autorización (roles, permisos) para proteger las rutas de la API.
    -   **Módulos Involucrados:** `api-gateway`, `@repo/security`.
-   **Gestión de Perfiles de Usuario:** Permitir a los usuarios ver y editar su información básica.
    -   **Módulos Involucrados:** `api-gateway`, `web`, `@repo/domain`, `@repo/infraestructure`.

## RF02 - Gestión de Salas de Votación

**Tareas Pendientes:**

-   **Creación de Salas de Votación:** Implementar la funcionalidad para que los moderadores puedan crear salas con configuraciones personalizables.
    -   **Módulos Involucrados:** `api-gateway`, `web`, `@repo/domain`, `@repo/infraestructure`.
-   **Acceso a Salas:** Desarrollar el mecanismo para que los usuarios accedan a las salas mediante un código único.
    -   **Módulos Involucrados:** `api-gateway`, `web`, `@repo/realtime`.
-   **Asignación de Roles:** Implementar la asignación automática de roles (moderador/participante) al unirse a una sala.
    -   **Módulos Involucrados:** `api-gateway`, `@repo/domain`, `@repo/realtime`.

## RF03 - Sistema de Votación en Tiempo Real

**Tareas Pendientes:**

-   **Creación de Propuestas de Votación:** Permitir a los moderadores crear propuestas con múltiples opciones.
    -   **Módulos Involucrados:** `api-gateway`, `web`, `@repo/domain`, `@repo/infraestructure`.
-   **Votación en Tiempo Real:** Implementar la funcionalidad de votación y la actualización automática e instantánea de resultados.
    -   **Módulos Involucrados:** `api-gateway`, `web`, `@repo/realtime`, `@repo/domain`, `@repo/infraestructure`.
-   **Tipos de Votación:** Soportar diferentes tipos de votación (opción múltiple, sí/no).
    -   **Módulos Involucrados:** `api-gateway`, `web`, `@repo/domain`.
-   **Control de Votaciones:** Implementar el control de apertura y cierre de votaciones por parte del moderador.
    -   **Módulos Involucrados:** `api-gateway`, `web`, `@repo/realtime`.

## RF04 - Sistema de Comunicación

**Tareas Pendientes:**

-   **Chat Integrado:** Desarrollar un chat específico para cada sala de votación.
    -   **Módulos Involucrados:** `api-gateway`, `web`, `@repo/realtime`.
-   **Notificaciones:** Implementar notificaciones automáticas de eventos importantes del sistema.
    -   **Módulos Involucrados:** `api-gateway`, `web`, `@repo/realtime`.
-   **Indicadores de Usuarios:** Mostrar indicadores visuales de usuarios conectados y activos en la sala.
    -   **Módulos Involucrados:** `web`, `@repo/realtime`.

## RF05 - Visualización de Resultados

**Tareas Pendientes:**

-   **Gráficos de Resultados:** Implementar gráficos de resultados actualizados en tiempo real (usando Chart.js).
    -   **Módulos Involucrados:** `web`, `@repo/realtime`.
-   **Dashboard de Estadísticas:** Desarrollar un dashboard con estadísticas básicas de participación.
    -   **Módulos Involucrados:** `web`, `@repo/infraestructure`.

## RF06 - Gestión de Sesiones

**Tareas Pendientes:**

-   **Persistencia de Sesiones:** Asegurar la persistencia de sesiones de usuario mediante JWT (una vez implementado el inicio de sesión).
    -   **Módulos Involucrados:** `api-gateway`, `web`, `@repo/security`.
-   **Manejo de Reconexiones:** Implementar el manejo automático de reconexiones en caso de pérdida de conexión.
    -   **Módulos Involucrados:** `web`, `@repo/realtime`.
-   **Gestión de Desconexiones:** Manejo adecuado de desconexiones y timeouts.
    -   **Módulos Involucrados:** `api-gateway`, `web`, `@repo/realtime`.