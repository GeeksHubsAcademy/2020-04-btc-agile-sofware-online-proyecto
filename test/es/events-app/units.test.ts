import { deleteElement } from "../../../src/es/events-app/Controller/MWS/deleteElement"

describe('Tests unitarios', () => {

    describe('Test unitario de clase deleteElement, elimina un objeto de un JSON. TO BE', () => {
        const json = {
            "correo": "email@gmail.com",
            "contraseña": "123456789-"
        }

        const deletethis = deleteElement.element(json, 'contraseña');
        
        expect(deletethis).toStrictEqual({"correo": "email@gmail.com"})

    })


})
