# Library API Rest

## Introducción

_Library_ es una API REST simple que implementa un CRUD clásico. Su objetivo ha sido servir como plataforma para el desarrollo del bootcamp Agile Software.

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

Los test de esta aplicación se realizan sobre una base de datos creada _ad-hoc_ para ejecutar los test. Para crear esta base de datos y poblarla con datos ejecute:

```
npm run seed:test
```

Esto debería crear una base de datos llamada `library_test` contra la que lanzaremos nuestros tests.

### Lanzar los tests

Una vez ha realizado el paso anterior, está listo para lanzar los tests. Para ello, ejecute:

```
npm run test
```

Si los test resultan satisfactorios, el resultado debería ser algo similar a lo siguiente

```
 PASS  test/books.test.ts
  ✓ should pass (2 ms)
  GET /book
    ✓ should list all books (103 ms)
  POST /book
    ✓ should add a new book (52 ms)
    ✓ should refuse to add a new book (21 ms)
  GET /book/:id
    ✓ should return a single book (26 ms)
    ✓ should return a 404 book not found (20 ms)
  PATCH /book/:id
    ✓ should update a book (26 ms)
    ✓ should return a 404 book not found (19 ms)
  DELETE /book/:id
    ✓ should remove a book (21 ms)
    ✓ should return a 404 book not found (21 ms)

 PASS  test/utils.test.ts
  ✓ should pass (3 ms)
  UTILS validateFields()
    ✓ should return false because missing fields (2 ms)
    ✓ should return true because missing fields (2 ms)


File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------|---------|----------|---------|---------|-------------------
All files             |   91.71 |    66.67 |     100 |   91.71 |
 config               |     100 |      100 |     100 |     100 |
  configdb.ts         |     100 |      100 |     100 |     100 |
 src                  |   74.36 |        0 |     100 |   74.36 |
  app.ts              |   74.36 |        0 |     100 |   74.36 | 17-19,22-24,34-37
 src/controllers      |      92 |       75 |     100 |      92 |
  books.controller.ts |      92 |       75 |     100 |      92 | 10-11,57-58,73-74
 src/models           |     100 |      100 |     100 |     100 |
  book.model.ts       |     100 |      100 |     100 |     100 |
 src/routes           |     100 |      100 |     100 |     100 |
  books.routes.ts     |     100 |      100 |     100 |     100 |
 src/utils            |     100 |      100 |     100 |     100 |
  check_fields.ts     |     100 |      100 |     100 |     100 |
  format_methods.ts   |     100 |      100 |     100 |     100 |
----------------------|---------|----------|---------|---------|-------------------
Test Suites: 2 passed, 2 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        2.969 s, estimated 6 s
Ran all test suites.
```

Se generará un directorio coverage con un informe de los test que nos muestra las líneas de código no cubiertas por nuestros test de una forma más visual que la tabla de resultados mostrada arriba. Para ello, abra el fichero `index.html` contenido dentro de `/back/coverage/lcov-report`.
