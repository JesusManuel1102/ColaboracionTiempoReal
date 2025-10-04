# PROYECTO TCC: Sistema de Colaboración en Tiempo Real para Toma de Decisiones

Bienvenido al repositorio del **Sistema de Colaboración en Tiempo Real para Toma de Decisiones (PROYECTO TCC)**. Este proyecto tiene como objetivo principal desarrollar una aplicación web colaborativa que permita a múltiples usuarios participar en sesiones de toma de decisiones y votaciones interactivas, facilitando la comunicación y el consenso grupal a través de herramientas digitales modernas.

## 🚀 Visión General del Proyecto

En la era digital, la toma de decisiones efectiva se ve a menudo obstaculizada por limitaciones geográficas, la falta de herramientas colaborativas adecuadas y procesos ineficientes. Este sistema busca superar estos desafíos ofreciendo una plataforma robusta y escalable para reuniones corporativas, votaciones académicas, decisiones comunitarias y sesiones de brainstorming.

## ✨ Características Principales

-   **Gestión de Usuarios:** Registro seguro, autenticación y gestión de perfiles.
-   **Salas de Votación:** Creación y gestión de salas personalizables con acceso controlado.
-   **Votación en Tiempo Real:** Mecanismos de votación interactivos con actualización instantánea de resultados.
-   **Comunicación Integrada:** Chat en tiempo real para facilitar la discusión durante las sesiones.
-   **Visualización de Resultados:** Gráficos y dashboards para el análisis de los resultados de las votaciones.
-   **Arquitectura Escalable:** Diseñado para soportar múltiples usuarios concurrentes y crecimiento futuro.

## 🛠️ Tecnologías Utilizadas

Este proyecto está construido como un monorepo utilizando las siguientes tecnologías clave:

-   **Backend:** Node.js, Express, Socket.io, JWT (JSON Web Tokens), MongoDB.
-   **Frontend:** React.
-   **Gestión de Proyectos:** pnpm, TurboRepo.
-   **Lenguaje:** TypeScript.
-   **Base de Datos:** MongoDB.

## 📂 Estructura del Monorepo

El proyecto sigue una estructura de monorepo organizada en `apps/` y `packages/`:

-   **`apps/`**
    -   `api-gateway`: La puerta de enlace principal para las interacciones del cliente con el backend.
    -   `web`: La aplicación frontend construida con React.
-   **`packages/`**
    -   `domain`: Contiene la lógica de negocio central y los objetos de dominio.
    -   `infraestructure`: Implementaciones de persistencia y servicios externos.
    -   `security`: Servicios relacionados con la seguridad, como hashing y JWT.
    -   `shared`: Utilidades y tipos compartidos entre los diferentes paquetes.
    -   `realtime`: Lógica para funcionalidades en tiempo real (Socket.io).
    -   `eslint-config`: Configuraciones de ESLint compartidas.
    -   `typescript-config`: Configuraciones de TypeScript compartidas.

## 📚 Documentación del Proyecto

Para una comprensión más profunda del proyecto, consulta los siguientes documentos:

-   [Información General del Proyecto](./docs/informacion_proyecto.md)
-   [Arquitectura del Proyecto](./docs/arquitectura.md)
-   [Patrones Arquitectónicos Utilizados](./docs/patrones_arquitectonicos.md)
-   [Funcionalidades Activas y Pendientes](./docs/funcionalidades.md)
-   [Tareas Pendientes por Requerimiento Funcional](./docs/tareas_pendientes.md)

## 🚀 Cómo Empezar (Próximamente)

Instrucciones detalladas sobre cómo configurar el entorno de desarrollo, instalar dependencias y ejecutar el proyecto localmente se añadirán pronto.

## 🌟 Agradecimientos

Este proyecto ha sido desarrollado con la valiosa contribución y dirección de **Juan David Cardona**, quien ha liderado la implementación y el diseño arquitectónico, y **Jesus Manuel Ballesteros**, dueño del proyecto.

// ... existing code ...

## 🤝 Contribución

¡Agradecemos cualquier contribución! Por favor, consulta nuestras guías de contribución (próximamente) para más detalles.

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE.md) (o la licencia que corresponda).