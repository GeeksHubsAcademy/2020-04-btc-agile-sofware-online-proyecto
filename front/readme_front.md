# Library Front

## Introducción

Esta es la parte de front correspondiente a la API REST de Library. Es una sencilla aplicación que permite agregar y borrar libros en nuestra base de datos

## Setup del proyecto

### Instalación de dependencias

Ejecute:

```
npm install
```

### Ejecutar la aplicación

Una vez la parte de backend este en funcionamiento, ejecute:

```
npm start
```

## Test

La parte de frontend incorpora algunos test realizados con **Cypress**.

Para el correcto funcionamiento de estos tests es necesario ejecutar en primer lugar disponer de la base de datos recién lanzado el seed **en el backend**:

```
npm run seed
```

Después, con el backend y el front ejecutándose:

```
npm run test
```

Esto lanzará una pequeña batería de test que si ha seguido los pasos anteriores y todo ha resultado correcto, deberían de pasar.
