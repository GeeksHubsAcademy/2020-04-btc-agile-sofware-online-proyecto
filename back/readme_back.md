# Library API Rest

## Introducción

Library es una API rest simple que implementa un CRUD clásico. Su objetivo ha sido servir como plataforma para el desarrollo del bootcamp Agile Software.

En esencia se trata de una API realizada con **express** en la que podemos dar de alta, modificar y eliminar libros, empleando **mongodb** como base de datos.

## Setup del proyecto

### Instalación de dependencias

En primer lugar instale las dependencias:

```
npm install
```

### Build

Una vez instaladas las dependencias, para poner en marcha el proyecto es necesario transpilar el código `typescript`. Para ello ejecute:

```
npm run clean
```

que limpiará cualquier carpeta `dist` que pudiera encontrarse en el directorio.

Y acto seguido:

```
npm run build
```

### Seeds

Existe un script disponible para crear la base de datos de desarrollo y poblarla con algunos datos. Para ello, ejecute:

```
npm run seed
```

### Arrancar la aplicación

Si ya ha ejecutado el script para poblar la base de datos, está listo para arrancar la aplicación. Ejecute:

```
npm run start:dev
```

### Colecciones de postman

El proyecto incluye también una colección de postman con peticiones para que pueda probar la API REST, que se encuentra dentro de la carpeta `/back/postman`. Importe tanto el entorno, las globales y las colecciones en su postman y estará listo para probar la aplicacion.

## Tests

### Seed de test

Los test de esta aplicación se realizan sobre una base de datos creada ad-hoc para ejecutar los test. Para crear esta base de datos y poblarla con datos ejecute:

```
npm run seed:test
```

Esto debería crear una base de datos llamada `library_test` contra la que lanzaremos nuestros tests.

### Lanzar los tests

Una vez ha realizado el paso anterior, está listo para lanzar los tests. Para ello, ejecute:

```
npm run test
```
