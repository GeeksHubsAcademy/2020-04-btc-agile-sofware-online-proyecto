const request = require("supertest");
import { app } from '../../../src/es/events-app/app';
const mongoose = require('mongoose');


describe('Test de endpoints, respuestas de conexión', () => {

    const email1 = "email@gmail.com"
    const email2 = "email2@gmail.com"
    let token;

    describe('Test de endpoints usuario', () => {

        it('Registro de usuario password menos de 8 carácteres, expected (500)', (done) => {
            request(app)
                .post('/user/register')
                .send({
                    "username": "username",
                    "email": email1,
                    "password": "1234567",
                    "name": "Manuel",
                    "lastname": "Guerra Coello"
                })
                .set('Accept', 'application/json')
                .expect(res => {
                    expect(res.status).toBe(500)
                    expect(res.body.error).toBe('Password is shorter than the minimum allowed length (8)')
                })
                .end(async (err) => {
                    if (err) return await done(err);
                    done();
                })
        })
    })

    it('Registro de usuario password sin password, expected (500)', (done) => {
        request(app)
            .post('/user/register')
            .send({
                "username": "username",
                "email": email1,
                "name": "Manuel",
                "lastname": "Guerra Coello"
            })
            .set('Accept', 'application/json')
            .expect(res => {
                expect(res.status).toBe(500)
                expect(res.body.error).toBe('The password it\'s required')
            })
            .end(async (err) => {
                if (err) return await done(err);
                done();
            })

    })




})
