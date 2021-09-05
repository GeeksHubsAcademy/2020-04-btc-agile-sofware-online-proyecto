# Transpilar

Ver el `package.json`;

```
npm run build
```

Este comando ejecuta el tsc. Este comando hace el paso de los ts a js. Los ficheros generados se pueden ejecutar con el comando `node`.

# Ejecutar

```
node .dist/test1.js
```

## Modo watch

Para no tener que realizar el paso de transpilado cada vez que guardamos podemos instalar `ts-node-dev` y ejecutarlo como está en el `packaje.json`.

```
ts-nde-dev ./src/app.ts
```

Uso de Modulos ECMA en jest
https://stackoverflow.com/questions/60372790/node-v13-jest-es6-native-support-for-modules-without-babel-or-esm/61653104#61653104

## Limpiar `dist`

`rimraf` es una paquete de node que en esencia nos permite hacer un borrado tipo `rm -rf` que sólo funciona en sistema unix, también en windows. Básicamente para que si alguien descarga el proyecto en Windows, le permita también usar el script clean que limpia el código transpilado en `/dist`.

Para borrar la carpeta:

```
npm run clean
```

# Ejecutar los test

No ha conseguido mockear la base de datos, por lo que tomé la decisión de generar una nueva base de datos exclusiva para la realización de los test.

1. Ejecuta `npm run seed:test`. Esto generará la base de datos `library_test`.

2. Ejecuta `npm run test`. Lanza los test sobre la base de datos de test.

## Consulta de coverage de los test
