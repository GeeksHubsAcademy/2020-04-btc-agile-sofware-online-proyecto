const request = require("supertest");
import { app } from '../../../src/es/events-app/app';
const mongoose = require('mongoose');


describe('Test de endpoints, respuestas de conexión', () => {

    const email1 = "email@gmail.com"
    const email2 = "email2@gmail.com"
    const user = "username"
    const userName = "Manuel"
    const userLastName = "Guerra Coello"
    const Pass = "1234567-"
    const wronPass = "1234567"
    let token;

    describe('Test de endpoints usuario', () => {

        it('Registro de usuario password menos de 8 carácteres, expected (500)', (done) => {
            request(app)
                .post('/user/register')
                .send({
                    "username": user,
                    "email": email1,
                    "password": wronPass,
                    "name": userName,
                    "lastname": userLastName
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
                "username": user,
                "email": email1,
                "name": userName,
                "lastname": userLastName
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
                "password": Pass,
                "name": userName,
                "lastname": userLastName
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
                "username": user,
                "password": Pass,
                "name": userName,
                "lastname": userLastName
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
                "username": user,
                "email": email1,
                "password": Pass,
                "name": userName,
                "lastname": userLastName
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
                "username": user,
                "email": email1,
                "password": Pass,
                "name": userName,
                "lastname": userLastName
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

    it('Login Usuario, expected (200)', (done) => {
        request(app)
            .post('/login')
            .send({
                "email": email1,
                "password": Pass
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

    it('Login Usuario, password invalido (401)', (done) => {
        request(app)
            .post('/login')
            .send({
                "email": email1,
                "password": Pass+"-"
            })
            .set('Accept', 'application/json')
            .expect(res => {
                expect(res.status).toBe(401)
                expect(res.text).toBe('Invalid Password!')
            })
            .end(async (err,) => {
                if (err) return await done(err);
                done();
            })
    })

    it('Login Usuario, Usuario no existente expected (404)', (done) => {
        request(app)
            .post('/login')
            .send({
                "email": email2,
                "password": Pass
            })
            .set('Accept', 'application/json')
            .expect(res => {
                expect(res.status).toBe(404)
                expect(res.text).toBe('email is not found')
            }).end(async (err, res) => {
                if (err) return await done(err);
                done();
            })
    })

    it('Actualización de usuario con token password menor a 8 carácteres, expected (500)', (done) => {
        request(app)
            .put('/user/update?email=' + email1)
            .send({
                "username": user,
                "email": email1,
                "password": wronPass,
                "name": userName,
                "lastname": userLastName
            })
            .set({ 'auth-token': token })
            .expect(res => {
                expect(res.status).toBe(500)
                expect(res.body.error).toBe('Password is shorter than the minimum allowed length (8)')
            }).end(async (err) => {
                if (err) return await done(err);
                done();
            })
    })





})
