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


    it('Registro de usuario sin nombre de usuario, expected (500)', (done) => {
        request(app)
            .post('/user/register')
            .send({
                "email": email1,
                "password": "1234567-",
                "name": "Manuel",
                "lastname": "Guerra Coello"
            })
            .set('Accept', 'application/json')
            .expect(res => {
                expect(res.status).toBe(500)
                expect(res.body.error).toBe('the username it\'s required')
            })
            .end(async (err) => {
                if (err) return await done(err);
                done();
            })
    })

    it('Registro de usuario sin email, expected (500)', (done) => {
        request(app)
            .post('/user/register')
            .send({
                "username": "username",
                "password": "1234567-",
                "name": "Manuel",
                "lastname": "Guerra Coello"
            })
            .set('Accept', 'application/json')
            .expect(res => {
                expect(res.status).toBe(500)
                expect(res.body.error).toBe('The email it\'s required')
            })
            .end(async (err) => {
                if (err) return await done(err);
                done();
            })
    })

    it('Registro de usuario, expected (200)', (done) => {
        request(app)
            .post('/user/register')
            .send({
                "username": "username",
                "email": email1,
                "password": "1234567-",
                "name": "Manuel",
                "lastname": "Guerra Coello"
            })
            .set('Accept', 'application/json')
            .expect(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('User Registered')
            })
            .end(async (err) => {
                if (err) return await done(err);
                done();
            })

    })

    it('Registro de usuario, Usuario ya existe, expected (409) ', (done) => {
        request(app)
            .post('/user/register')
            .send({
                "username": "username",
                "email": email1,
                "password": "1234567-",
                "name": "Manuel",
                "lastname": "Guerra Coello"
            })
            .expect(res => {
                expect(res.status).toBe(409)
                expect(res.text).toBe('Email already Exist')
            })
            .end(async (err) => {
                if (err) return await done(err);
                done();
            })

    })

    it('Logging Usuario, expected (200)', (done) => {
        request(app)
            .post('/login')
            .send({
                "email": "email@gmail.com",
                "password": "1234567-"
            })
            .set('Accept', 'application/json')
            .expect(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('You are Logged')
            })
            .end(async (err, res) => {
                token = res.headers['auth-token'];
                if (err) return await done(err);
                done();
            })
    })





})
