import { deleteElement } from "../../../src/es/events-app/Controller/MWS/deleteElement"
import { elementLeft } from "../../../src/es/events-app/Controller/MWS/elementsLeft"

describe('Tests unitarios', () => {

    describe('Test unitario de clase deleteElement', () => {

        test('Elimina un objeto de un JSON. objeto con correo y contraseña se espera que sea solo correo',function(){
            const json = {
                "correo": "email@gmail.com",
                "contraseña": "123456789-"
            }
    
            const deletethis = deleteElement.element(json, 'contraseña');
            expect(deletethis).toStrictEqual({"correo": "email@gmail.com"})
        })

        test('Elimina un objeto de un JSON. objeto con correo y contraseña se elimina contraseña y se espera que no devuelva correo y correo',function(){
            const json = {
                "correo": "email@gmail.com",
                "contraseña": "123456789-"
            }
    
            const deletethis = deleteElement.element(json, 'contraseña');
            
            expect(deletethis).not.toBe({"correo": "email@gmail.com","contraseña": "123456789-"})
    
        })
    
    })

    describe('Test unitario de clase elementsLeft, resta a las invitaciones los invitados que están inscrito en base de datos. ', function () {

        test('Resta bien. To be 5-2=3', function () {
            let Resta = elementLeft.element(5, 2)
            expect(Resta).toBe(3)
        })

    
    })
   
})
