# PROYECTO TCC: SISTEMA DE COLABORACIÓN EN TIEMPO REAL PARA TOMA DE DECISIONES

## 1. Propuesta del Proyecto

### 1.1 Objetivo General

Desarrollar una aplicación web colaborativa en tiempo real que permita a múltiples usuarios participar en sesiones de toma de decisiones y votaciones interactivas, facilitando la comunicación y el consenso grupal a través de herramientas digitales modernas.

### 1.2 Objetivos Específicos

- Implementar un sistema de autenticación seguro para usuarios mediante JWT
- Crear salas de votación independientes con gestión de sesiones en tiempo real
- Desarrollar funcionalidades de votación con visualización inmediata de resultados
- Integrar un sistema de chat para facilitar la discusión durante las votaciones
- Proporcionar herramientas de visualización de datos para análisis de resultados
- Garantizar la escalabilidad del sistema para múltiples usuarios concurrentes

## 2. Definición del Problema

### 2.1 Problemática Actual

En la era digital, muchas organizaciones, equipos de trabajo, instituciones educativas y grupos comunitarios enfrentan desafíos significativos para tomar decisiones de manera efectiva:

- **Limitaciones geográficas:** Los miembros del grupo no siempre pueden reunirse físicamente
- **Falta de herramientas colaborativas:** Ausencia de plataformas que combinen votación y discusión en tiempo real
- **Procesos de decisión ineficientes:** Métodos tradicionales que consumen tiempo y recursos
- **Dificultad para documentar decisiones:** Falta de registro histórico de votaciones y debates
- **Exclusión de participantes remotos:** Imposibilidad de incluir a todos los stakeholders en el proceso

### 2.2 Justificación

La necesidad de una solución tecnológica que democratice y agilice los procesos de toma de decisiones es evidente en diversos contextos:

- Reuniones corporativas y juntas directivas
- Votaciones estudiantiles y académicas
- Decisiones comunitarias y participación ciudadana
- Sesiones de brainstorming (tormenta de ideas) y planificación de proyectos

## 3. Impacto Esperado de la Aplicación

### 3.1 Impacto Organizacional

- **Mejora en la eficiencia:** Reducción del tiempo necesario para alcanzar consensos
- **Mayor participación:** Inclusión de stakeholders remotos en procesos decisorios
- **Transparencia:** Visibilidad completa del proceso de votación y sus resultados
- **Reducción de costos:** Disminución de gastos asociados a reuniones presenciales

### 3.2 Impacto Social

- **Democratización:** Facilitación de procesos participativos en comunidades
- **Inclusión digital:** Herramienta accesible para diferentes tipos de usuarios
- **Sostenibilidad:** Reducción de la huella de carbono al evitar desplazamientos

### 3.3 Impacto Tecnológico

- **Innovación en colaboración:** Integración de tecnologías modernas para trabajo remoto
- **Escalabilidad:** Arquitectura preparada para crecimiento futuro
- **Interoperabilidad:** Diseño que permite futuras integraciones con otros sistemas

## 4. Arquitectura General del Sistema 
Falta generar el diagrama de la arquitectura de nuestro monorepositorio para colocarlo aqui.

## 6. Requerimientos del Sistema

### 6.1 Requerimientos Funcionales

#### RF01 - Gestión de Usuarios

- El sistema debe permitir registro de nuevos usuarios con validación de datos
- Los usuarios deben poder iniciar y cerrar sesión de manera segura
- Debe implementar autenticación mediante JWT con tokens de acceso
- Gestión de perfiles de usuario con información básica

#### RF02 - Gestión de Salas de Votación

- Creación de salas de votación con configuración personalizable por el moderador
- Acceso a salas mediante código único generado automáticamente
- Lista de salas activas disponibles para el usuario
- Asignación automática de roles (moderador/participante)

#### RF03 - Sistema de Votación en Tiempo Real

- Creación de propuestas de votación con múltiples opciones
- Votación en tiempo real con actualización automática e instantánea de resultados
- Soporte para diferentes tipos de votación (opción múltiple, sí/no)
- Control de apertura y cierre de votaciones por parte del moderador

#### RF04 - Sistema de Comunicación

- Chat integrado específico para cada sala de votación
- Envío y recepción de mensajes en tiempo real
- Notificaciones automáticas de eventos importantes del sistema
- Indicadores visuales de usuarios conectados y activos

#### RF05 - Visualización de Resultados

- Gráficos de resultados actualizados en tiempo real usando Chart.js
- Dashboard con estadísticas básicas de participación
- Visualización clara del progreso de votaciones activas

#### RF06 - Gestión de Sesiones

- Persistencia de sesiones de usuario mediante JWT
- Manejo automático de reconexiones en caso de pérdida de conexión
- Estado visible de conectividad de usuarios en la sala
- Gestión adecuada de desconexiones y timeouts

### 6.2 Requerimientos No Funcionales

#### RNF01 - Rendimiento

- Tiempo de respuesta menor a 2 segundos para operaciones de la interfaz
- Soporte para al menos 50 usuarios concurrentes por sala
- Latencia máxima de 1 segundo para actualizaciones en tiempo real vía WebSocket

#### RNF02 - Seguridad

- Implementación de autenticación segura mediante JWT con expiración de tokens
- Encriptación de contraseñas utilizando bcrypt con salt de alta seguridad
- Validación rigurosa de datos de entrada tanto en frontend como backend
- Implementación de middlewares de seguridad para protección contra ataques comunes

#### RNF03 - Usabilidad

- Interfaz responsiva totalmente compatible con dispositivos móviles y desktop
- Tiempo de aprendizaje máximo de 5 minutos para usuarios nuevos
- Diseño intuitivo siguiendo principios de Material Design

#### RNF04 - Disponibilidad

- Disponibilidad del sistema del 95% durante las horas de desarrollo y pruebas
- Manejo adecuado de errores con mensajes informativos para el usuario
- Recuperación automática ante fallos menores de conectividad

#### RNF05 - Compatibilidad

- Compatible con navegadores modernos (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Diseño responsivo adaptable a diferentes tamaños de pantalla (móvil, tablet, desktop)
- API REST bien documentada para futuras integraciones

## 8. Conclusión

El Sistema de Colaboración en Tiempo Real para Toma de Decisiones representa una solución tecnológica integral que aborda eficientemente los desafíos contemporáneos en procesos decisorios colaborativos. La problemática de la exclusión de participantes remotos, la falta de herramientas que combinen votación y discusión en tiempo real, y los métodos tradicionales ineficientes encuentran respuesta en esta propuesta innovadora.

La arquitectura basada en Node.js + Express + Socket.io + JWT + React + MongoDB constituye un stack tecnológico robusto y moderno que garantiza escalabilidad, seguridad y una experiencia de usuario óptima. La comunicación bidireccional en tiempo real, la autenticación segura sin estado, y la flexibilidad de datos proporcionan una base sólida para el desarrollo de una plataforma colaborativa efectiva.

El impacto esperado trasciende el ámbito puramente tecnológico. A nivel organizacional, la aplicación promete mejorar la eficiencia en la toma de decisiones, incrementar la participación mediante la inclusión de stakeholders remotos, y proporcionar transparencia completa en los procesos de votación. Socialmente, contribuirá a la democratización de procesos participativos y la inclusión digital, mientras que tecnológicamente establece las bases para futuras innovaciones en colaboración distribuida.

La viabilidad del proyecto está garantizada por la madurez de las tecnologías seleccionadas, todas de código abierto y ampliamente adoptadas en la industria. La arquitectura modular y sin estado facilita el desarrollo incremental y la escalabilidad futura, mientras que el ecosistema JavaScript unificado optimiza los tiempos de desarrollo y mantenimiento.

Este proyecto no solo cumple con los objetivos académicos del TCC, sino que también aporta valor real al proporcionar una herramienta práctica aplicable en diversos contextos organizacionales, educativos y comunitarios. La combinación de rigor técnico, relevancia social e innovación tecnológica posiciona esta propuesta como una contribución significativa tanto al desarrollo profesional como al ecosistema de soluciones colaborativas digitales.