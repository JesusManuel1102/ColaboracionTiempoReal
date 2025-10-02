# Arquitectura del sistema

En este proyecto vamos a trabajar con una arquitectura monorepo. Donde vamos a incluir diferentes patrones de diseño y patrones de arquitectura enfocados en la logica de negocios como en la emicion de eventos. 

- **Arquitectura Hexagonal**: Vamos a utilizar este patrón para separar la lógica de negocio de la infraestructura. Esto nos permitirá cambiar la infraestructura sin afectar la lógica de negocio.
- **DDD**: Vamos a utilizar este patrón para organizar la lógica de negocio en torno a los dominios. Esto nos permitirá mantener el código organizado y fácil de entender.
- **Event Driven**: Vamos a utilizar este patrón para emmitir eventos cuando ocurra algún cambio en la lógica de negocio. Esto nos permitirá desacoplar los diferentes componentes del sistema y hacer que sean más fáciles de mantener.

Patrones de diseño: 

- **Repository**: Vamos a utilizar este patrón para abstraer la persistencia de datos. Esto nos permitirá cambiar la implementación de la persistencia sin afectar la lógica de negocio.
- **Factory**: Vamos a utilizar este patrón para crear objetos complejos. Esto nos permitirá mantener el código organizado y fácil de entender.
- **Service**: Vamos a utilizar este patrón para encapsular la lógica de negocio. Esto nos permitirá mantener el código organizado y fácil de entender.
- **Repository**: Vamos a utilizar este patrón para abstraer la persistencia de datos. Esto nos permitirá cambiar la implementación de la persistencia sin afectar la lógica de negocio.