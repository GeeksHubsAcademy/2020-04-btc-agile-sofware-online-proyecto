# 2020-04-btc-agile-sw-online-proyecto

<p align="center">
    <img src="https://github.com/GeeksHubsAcademy/2020-geekshubs-media/blob/master/image/githubagilesoftware.jpg" >	
</p>

[![Build Status](https://travis-ci.com/thecoello/2020-04-btc-agile-sw-online-proyecto.svg?branch=develop)](https://travis-ci.com/thecoello/2020-04-btc-agile-sw-online-proyecto)

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

Descripción: events-app está desarrollada para la gestión de eventos.
Funcionamiento (proceso): 
-Usuario se registra en la app
-Usuario crea un evento
-Usuario envía el enlace de vento a los invitados
-Los invitados se registran 
(Cuando ya no quedan más invitaciones no se puede registrar más nadie,
ya que es necesario incluir el número de invitaciones al momento de crear el evento).

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
| nodeJS | 14.15.4|
| express | 4.17.1| 
| nodemon | 2.0.6 |
| body-parser | 1.19.0 |
| mongoose | 5.11.6 |
| jsonwebtoken | 8.5.1 |
| bcryptjs | 2.4.3 |
| Jest | 25.2.3 |
| ts-jest | 25.5.1 |
| @types/jest | 26.0.18|
| supertest | 6.0.1 |

## Línea de comandos
```
Prerrequisito: Docker
```
| 1) Instalar dependencias | 2) MongoDB Docker | 3) Arrancar app |
| :-------: | :-------: | :-------: |
| npm install | docker-compose up | npm start |

**Correr las colecciones de postman adjunta al repositorio**

```
1) events-app endpoints de Login, Crear, Leer y Actualizar.
2) events-app endpoints de Login y borrado.
```

**Para correr los tests de integración es encesario tener la base de datos levantada: docker-compose up**

| Correr Tests unitarios | Correr Tests de integración | Correr todos los tests
| :-------: | :-------: | :-------: |
| npm test units.test.ts | npm test endpoints.test.ts | npm test |

## Principios SOLID
| Principio | Fichero  |
| :-------: | :------: | 
| Single Responsibility | src/es/events-app/Controller/UserController/UserCrud.ts |
| Open / Close | src/es/events-app/Controller/ControllerCrud.ts |
| Interface segregation principle | src/es/events-app/Data access/DataCrud.ts |

## Patrones
| Patrón | Fichero | 
| :-------: | :------: |
| Modelos | src/es/events-app/Model |
| Modelo | src/es/events-app/Model/EventModel.ts |
| Modelo | src/es/events-app/Model/InvitedModel.ts |
| Modelo | src/es/events-app/Model/UserModel.ts |
| Vistas | src/es/events-app/Views |
| Vista| src/es/events-app/Views/EventViews.ts |
| Vista| src/es/events-app/Views/InvitedViews.ts |
| Vista| src/es/events-app/Views/UserViews.ts |
| Controladores | src/es/events-app/Controller |
| Controlador| src/es/events-app/Controller/EventController/EventCrud.ts |
| Controlador| src/es/events-app/Controller/InvitedController/InvitedCrud.ts |
| Controlador| src/es/events-app/Controller/UserController/UserCrud.ts |


## Refactors
| Refactor | Fichero | Método
| :-------: | :------: |:------: |
| Inline Method | src/es/events-app/Controller/MWS/elementsLeft.ts  | Linea 3|
| Extract Class | src/es/events-app/Data access/DataCrud.ts  | Lineas 5 - 17 |
| Self Encapsulate Field | src/es/events-app/config/DDBB/MongooseCon.ts  | Lineas 16 - 24... 40, 48, 52 |
| Consolidate Conditionals | src/es/events-app/Controller/EventController/EventCrud.ts  | Linea 111 o 113 |
| Rename Method | src/es/events-app/config/DDBB/MongooseCon.ts  |  Linea 32 - Linea 57 |
| Pull up Method | src/es/events-app/Controller/ControllerCrud.ts  |  Lineas 14 - 17 |


## Notas
```
Ponga aquí cualquier tipo de mensaje necesario.
```
