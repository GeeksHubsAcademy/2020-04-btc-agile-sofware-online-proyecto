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
Nombre del proyecto : Library
Descripción: API REST con CRUD que permite agregar y borrar libros con una pequeña capa vista que permite agregar libros mediante un formulario y borrarlos mediante botones.
Alumno: Rubén Fernández Santos
```

## Herramientas empleadas

### Backend

- [nodejs](https://nodejs.org/en/) - Entorno de ejecución de JS del lado del servidor
- [express](http://expressjs.com/) - Framework para back de aplicaciones web.
- [mongodb](https://www.mongodb.com/) - Base de datos
- [mongoose](https://mongoosejs.com/) - ODM para mongodb
- [jest](https://jestjs.io/es-ES/) - Herramienta para testing de JS
- [supertest](https://www.npmjs.com/package/supertest) - Librería de node para testing de aplicaciones web.

### Frontend

- [react](https://es.reactjs.org/) - Librería de JS para la creación de interfaces de usuario.
- [cypress](https://www.cypress.io/) - Herramienta de testing end-to-end.

## Acerca de los README

El presente proyecto presenta una parte _backend_ y una parte _frontend_. Cada uno de ellos posee su propio archivo README con instrucciones a seguir para poner en funcionamiento cada una de las partes del proyecto..

## Principios SOLID

Al ser una **API REST** que no utiliza Orientación a Objetos "dura" en el sentido de crear clases, emplear herencias y crear interfaces, los principios SOLID no son fácilmente aplicables. No obstante, se han seguido algunos principios relacionados, como por ejemplo, definir funciones que llevan a cabo una única acción:
`/back/src/utils/check_fields.ts` # Realiza únicamente una verificación de campos
`/back/src/utils/format_methods.ts` # Formatea un objeto `Book`

## Refactors

En el caso de los refactors pasa de manera similar a los principios SOLID. La mayoría aplican a clases, herencia e interfaces, las cuales no se han empleado en esta aplicación. Aun así, se detallan algunos refactors que fueron aplicados:

- Fichero `/back/config/configb.ts`: Cuando se hizo necesario emplear la conexión en varios sitios se optó por refactorizar el código de la conexión en una función:

```javascript
# Antes de Refactor
mongoose
    .connect(`mongodb://localhost:27017/library`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));
```

```javascript
# Después de Refactor
const connectdb = (url: string, port: string, name: string) => {
  mongoose
    .connect(`mongodb://${url}:${port}/${name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));
};
```

- Fichero `/back/controllers/books.controller.ts`: El método `addBook` hace un _early return_ si la función no devuelve `true`.

```javascript
# Antes de Refactor
export const addBook = async (req, res) => {
  const newBook: IBook = req.body;

  if (validateFields(newBook)) {
    const bookAdded = await Book.create(newBook);

    if (bookAdded) {
      const bookAddedFormatted = formatBook(bookAdded);

      res.status(201).json(bookAddedFormatted);
    }
  } else {
    res.status(422).json({ message: "Title and author are required" });

  }
};
```

```javascript
# Después de Refactor
export const addBook = async (req, res) => {
  const newBook: IBook = req.body;

  if (!validateFields(newBook)) {
    res.status(422).json({ message: "Title and author are required" });
  } else {
    const bookAdded = await Book.create(newBook);

    if (bookAdded) {
      const bookAddedFormatted = formatBook(bookAdded);

      res.status(201).json(bookAddedFormatted);
    }
  }
};
```

Aunque ciertamente en este caso carece de demasiada utilidad debido a que es una única condición, pero si queremos agregar alguna condición adicional, será más fácil de implementar con esta aproximación.

- Fichero `/back/src/utils/check_fields.ts`
  Refactorización función `validateFields()`, y hacemos uso de nuevo de _early return_

```javascript
# Antes de Refactor
export function validateFields(book: any): boolean {
  let validBook: boolean;

  if (!book.title || !book.author) {
    validBook = false;
  } else {
    validBook = true;
  }

  return validBook;
}
```

```javascript
# Después de Refactor
export function validateFields(book: any): boolean {
  if (!book.title || !book.author) {
    return false;
  }
  return true;
}
```

- Finalmente, también se llevó a cabo un refactor separando controladores y rutas, que inicialmente, al tratarse de un número muy limitado de _endpoints_ se encontraban todos en el fichero `app.js`. Finalmente, se separaron controlador de rutas.
