# 2020-04-btc-agile-sw-online-proyecto

<p align="center">
    <img src="https://github.com/GeeksHubsAcademy/2020-geekshubs-media/blob/master/image/githubagilesoftware.jpg" >	
</p>

## Workflow
```
Forkea el proyecto y trabaja en tu rama.
Commitea de vez en cuando las 'features' que vayas desarrollando.
Una vez lo creas necesario, haz un 'pull request' a la rama Master.
Avísanos por el slack del curso.
```

## Información
```
Nombre del proyecto : events-app
Descripción: events-app está desarrollada para la gestión de eventos, el funcionamiento conlleva con el registro de un usuario a la app > usuario crea un evento > usuario envía el enlace de la url a los invitados > los invitados se registran (Cuando ya no quedan más invitaciones disponibles no se puede registrar más nadie, ya que es necesario incluir el número de invitaciones al momento de crear el evento).
Alumno: Manuel Guerra Coello
```

## Instalación
| Alias | URL |
| :-------: | :------: |
| Typescript|   https://www.typescriptlang.org/| 
| Jest Runner |  https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner |
| vscode-icons | https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons | 
| ts-jest | https://github.com/kulshekhar/ts-jest  | 


## Versiones
| Alias | Version |
| :-------: | :------: |
| Visual Studio Code| 1.52.1 |
| typescript | 3.9.7 |
| ts-node | 9.1.1 |
| @types/node" | 14.14.12 |
| nodeJS | v14.15.4|
| express | | 4.17.1| 
| nodemon | 2.0.6 |
| body-parser | 1.19.0 |
| mongoose | 5.11.6 |
| jsonwebtoken | 8.5.1 |
| bcryptjs | 2.4.3 |
| Jest | 25.2.3 |
| ts-jest | 25.5.1 |
| @types/jest | ^26.0.18|
| supertest | 6.0.1 |


## Línea de comandos
```
prerrequisito: Docker

Instalar dependencias: 
npm install 

Contenedor Docker base de datos mongodb:
docker-compose up

Arrancar app:
npm start

(correr las colección de postman adjunta al repositorio):
1) events-app endpoints de Login, Crear, Leer y Actualizar.
2) comprobar en la base de datos que todo está creado, postman debería dar 200 en todas los endpoints
3) events-app endpoints de Login y borrado.
4) comprobar en la base de datos que todo está borrado, postman debería dar 200 en todas los endpoints

[Añade más comandos necesarios]
Tests unitarios: 
npm test units.test.ts

Tests de integración:
ctrl+c
docker-compose up (De no tener la base de datos levantada)
npm test endpoints.test.ts

Correr todos los tests: 
ctrl+c
docker-compose up (De no tener la base de datos levantada)
npm test

Nota: ctrl+c es para cerrar la conexión del terminal y usar este mismo para correr los test, 
no debería ser necesario ya que la aplicación con npm start arranca en el puerto 3000
y los tests de integración los levanta (supertest) con sus propios puertos. Por otro lado
es necesario tener la base de datos levantada al momento de correr todos los tests o 
únicamente los tests de integración ya que es necesaria la base de datos para realizar 
los tests de los endpoints.

```
## Principios SOLID
| Principio | Fichero  |
| :-------: | :------: | 
| Single Responsibility | src/es/events-app/Controller/UserController/UserCrud.ts  
| Open / Close | src/es/events-app/Controller/ControllerCrud.ts  
| Interface segregation principle | src/es/events-app/Data access/DataCrud.ts  |

## Patrones
| Patrón | Fichero | Método
| :-------: | :------: |:------: |
| Modelo | src/es/events-app/Model/EventModel.ts  |... |
| Modelo | src/es/events-app/Model/InvitedModel.ts |... |
| Modelo | src/es/events-app/Model/UserModel.ts  |... |

## Refactors
| Refactor | Fichero | Método
| :-------: | :------: |:------: |
| ... | ...  |... |
| ... | ...  |... |
| ... | ...  |... |

## Notas
```
Ponga aquí cualquier tipo de mensaje necesario.
```
