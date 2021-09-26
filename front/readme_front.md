# Library Front

## Introducción

Esta es la parte de front correspondiente a la API REST de _Library_. Es una sencilla aplicación que permite agregar y borrar libros en nuestra base de datos

## Setup del proyecto

### Instalación de dependencias

Ejecute:

```
npm install
```

### Ejecutar la aplicación

Una vez la parte de _backend_ esté en funcionamiento, ejecute:

```
npm start
```

## Test

La parte de _frontend_ incorpora algunos test realizados con **Cypress**.

Para el correcto funcionamiento de estos tests es necesario disponer de la base de datos recién lanzado el seed **en el backend**:

```
npm run seed:test
```

Y poner en funcionamiento el backend en modo front test con:

```
npm run start:fronttest
```

Después, con el _backend_ y el _front_ ejecutándose:

```
npm run test
```

Esto lanzará una pequeña batería de test que si ha seguido los pasos anteriores y todo ha resultado correcto, deberían de pasar. Al igual que los test en back, estos test emplearán la base de datos `library_test`.
