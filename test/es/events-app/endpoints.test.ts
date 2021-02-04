const request = require("supertest");
import { app } from '../../../src/es/events-app/app';
import { MongooseCon } from '../../../src/es/events-app/config/DDBB/MongooseCon';

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
                .end((err) => {
                    if (err) return done(err);
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
            .end((err) => {
                if (err) return done(err);
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
            .end((err) => {
                if (err) return done(err);
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
            .end((err) => {
                if (err) return done(err);
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
            .end((err) => {
                if (err) return done(err);
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
            .end((err) => {
                if (err) return done(err);
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
            .end((err, res) => {
                token = res.headers['auth-token'];
                if (err) return done(err);
                done();
            })
    })

    it('Login Usuario, password invalido (401)', (done) => {
        request(app)
            .post('/login')
            .send({
                "email": email1,
                "password": Pass + "-"
            })
            .set('Accept', 'application/json')
            .expect(res => {
                expect(res.status).toBe(401)
                expect(res.text).toBe('Invalid Password!')
            })
            .end((err,) => {
                if (err) return done(err);
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
            }).end((err, res) => {
                if (err) return done(err);
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
            }).end((err) => {
                if (err) return done(err);
                done();
            })
    })

    it('Actualización de usuario con token usuario no existente, expected (404)', (done) => {
        request(app)
            .put('/user/update?email=' + email2)
            .send({
                "username": user,
                "email": email2,
                "password": Pass,
                "name": userName,
                "lastname": userLastName
            })
            .set({ 'auth-token': token })
            .expect(res => {
                expect(res.status).toBe(404)
                expect(res.text).toBe('This user does not Exist')
            }).end((err) => {
                if (err) return done(err);
                done();
            })
    })


    it('Actualización de usuario con token, expected (200)', (done) => {
        request(app)
            .put('/user/update?email=' + email1)
            .send({
                "username": user + "1",
                "email": email1,
                "password": Pass,
                "name": userName,
                "lastname": userLastName
            })
            .set({ 'auth-token': token })
            .expect(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('User updated')
            })
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })


    it('Actualización de usuario sin token, expected (500)', (done) => {

        request(app)
            .put('/user/update?email=' + email1)
            .send({
                "username": user + "2",
                "email": email1,
                "password": Pass,
                "name": userName,
                "lastname": userLastName
            })
            .unset('auth-token')
            .expect(res => {
                expect(res.status).toBe(500)
                expect(res.body.error).toBe('jwt must be provided')
            })
            .end((err) => {
                if (err) return done(err);
                done();
            })


    })

    it('Obtener usuario, expected (200)', (done) => {
        request(app)
            .get('/user?email=' + email1)
            .set({ 'auth-token': token })
            .expect(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('User Found')
            })
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })

    it('Obtener usuario sin token, expected (500)', (done) => {
        request(app)
            .get('/user?email=' + email1)
            .unset('auth-token')
            .expect(res => {
                expect(res.status).toBe(500)
                expect(res.body.error).toBe('jwt must be provided')
            })
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })

    it('Obtener usuario no existente, expected (404)', (done) => {
        request(app)
            .get('/user?email=' + email2)
            .set({ 'auth-token': token })
            .expect(res => {
                expect(res.status).toBe(404)
                expect(res.text).toBe('This user does not Exist')
            })
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })

    describe('Test de endpoints evento', () => {

        const eventName = "event1";
        const eventName2 = "event2";
        const invitations = 3;
        const date = "12/02/2021"
        const time = "7:00";
        const addres = "c/ nombre de calle";
        const eventDescription = "esto es una descripción";

        it('Crear evento 1 sin token, expected (401)', (done) => {
            request(app)
                .post('/event/register')
                .send({
                    "name": eventName,
                    "invitations": invitations,
                    "date": date,
                    "time": time,
                    "addres": addres,
                    "description": eventDescription
                })
                .unset('auth-token')
                .expect(res => {
                    expect(res.status).toBe(401)
                    expect(res.text).toBe('You are not logged in')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Crear evento, sin nombre expected (500)', (done) => {
            request(app)
                .post('/event/register')
                .send({
                    "invitations": invitations,
                    "date": date,
                    "time": time,
                    "addres": addres,
                    "description": eventDescription
                })
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(500)
                    expect(res.body.error).toBe('The name of the event is required')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Crear evento, sin numero de invitaciones expected (500)', (done) => {
            request(app)
                .post('/event/register')
                .send({
                    "name": eventName,
                    "date": date,
                    "time": time,
                    "addres": addres,
                    "description": eventDescription
                })
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(500)
                    expect(res.body.error).toBe('The number of invitations is required')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Crear evento, sin fecha expected (500)', (done) => {
            request(app)
                .post('/event/register')
                .send({
                    "name": eventName,
                    "invitations": invitations,
                    "time": time,
                    "addres": addres,
                    "description": eventDescription
                })
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(500)
                    expect(res.body.error).toBe('The date of the event is required')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Crear evento, sin hora expected (500)', (done) => {
            request(app)
                .post('/event/register')
                .send({
                    "name": eventName,
                    "invitations": invitations,
                    "date": date,
                    "addres": addres,
                    "description": eventDescription
                })
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(500)
                    expect(res.body.error).toBe('The time of the event is required')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })


        it('Crear evento, sin dirección expected (500)', (done) => {
            request(app)
                .post('/event/register')
                .send({
                    "name": eventName,
                    "invitations": invitations,
                    "date": date,
                    "time": time,
                    "description": eventDescription
                })
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(500)
                    expect(res.body.error).toBe('The addres is required')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Crear evento 1, expected (200)', (done) => {
            request(app)
                .post('/event/register')
                .send({
                    "name": eventName,
                    "invitations": invitations,
                    "date": date,
                    "time": time,
                    "addres": addres,
                    "description": eventDescription
                })
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.message).toBe('Event created')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Crear evento 2, expected (200)', (done) => {
            request(app)
                .post('/event/register')
                .send({
                    "name": eventName2,
                    "invitations": invitations,
                    "date": date,
                    "time": time,
                    "addres": addres,
                    "description": eventDescription
                })
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.message).toBe('Event created')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Volver a crear evento 1, evento ya existente, expected (409)', (done) => {
            request(app)
                .post('/event/register')
                .send({
                    "name": eventName,
                    "invitations": invitations,
                    "date": date,
                    "time": time,
                    "addres": addres,
                    "description": eventDescription
                })
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(409)
                    expect(res.text).toBe('This event Already Exist')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Actualizar evento 1 sin token, expected (401)', (done) => {
            request(app)
                .put('/event/update?url=event1')
                .send({
                    "name": eventName,
                    "invitations": invitations,
                    "date": date,
                    "time": time,
                    "addres": addres,
                    "description": eventDescription + " modificada"
                })
                .unset('auth-token')
                .expect(res => {
                    expect(res.status).toBe(401)
                    expect(res.text).toBe('You are not logged in')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Actualizar evento 1, expected (200)', (done) => {
            request(app)
                .put('/event/update?url=event1')
                .send({
                    "name": eventName,
                    "invitations": invitations,
                    "date": date,
                    "time": time + " pm",
                    "addres": addres + " 2B",
                    "description": eventDescription + " modificada"
                })
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.message).toBe('Event updated')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Actualizar evento existente con nombre de otro evento existente, expected (409)', (done) => {
            request(app)
                .put('/event/update?url=event2')
                .send({
                    "name": eventName,
                    "invitations": invitations,
                    "date": date,
                    "time": time + " pm",
                    "addres": addres + " 2B",
                    "description": eventDescription + " modificada"
                })
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(409)
                    expect(res.text).toBe('A event exist with this name, event could not be updated')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Actualizar evento no existente, expected (404)', (done) => {
            request(app)
                .put('/event/update?url=event3')
                .send({
                    "name": eventName,
                    "invitations": invitations,
                    "date": date,
                    "time": time + " pm",
                    "addres": addres + " 2B",
                    "description": eventDescription + " modificada"
                })
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(404)
                    expect(res.text).toBe('This event does not exist')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Obtener evento de usuario Logueado, expected (200)', (done) => {
            request(app)
                .get('/events')
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.message).toBe('Events Founded')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Obtener evento de usuario no Logueado, expected (401)', (done) => {
            request(app)
                .get('/events')
                .unset('auth-token')
                .expect(res => {
                    expect(res.status).toBe(401)
                    expect(res.text).toBe('You are not logged in')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })


        it('Obtener evento 1 (único) de usuario Logueado, expected (200)', (done) => {
            request(app)
                .get('/event?url=event1')
                .set({ 'auth-token': token })
                .expect(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.message).toBe('Event Founded')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Obtener evento 1 (único) de usuario no Logueado, expected (401)', (done) => {
            request(app)
                .get('/event?url=event1')
                .unset('auth-token')
                .expect(res => {
                    expect(res.status).toBe(401)
                    expect(res.text).toBe('You are not logged in')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Obtener evento 1 (público), expected (200)', (done) => {
            request(app)
                .get('/event/public?url=event1')
                .expect(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.message).toBe('Event Founded')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })

        it('Obtener evento 3 no existente (público), expected (404)', (done) => {
            request(app)
                .get('/event/public?url=event3')
                .expect(res => {
                    expect(res.status).toBe(404)
                    expect(res.text).toBe('This event does not exist')
                })
                .end((err) => {
                    if (err) return done(err);
                    done();
                })
        })


        describe('Test de edpoints invitaciones ', () => {

            const name = "manuel";
            const lastName = "Guerra Coello";
            const email = "invited@email.com"
            const email2 = "invited2@email.com"
            const email3 = "invited3@email.com"
            const email4 = "invited4@email.com"
            const phone = "123456789";
            const birth = "29/03/1994";
            const nacionality = "Española"
            const addres = "calle, nombre de calle"
            const country = "España";
            const city = "Madrid";
            const zipCode = "28000"

            it('Registro de invitado sin nombre(500)', (done) => {
                request(app)
                    .post('/invited/register?url=event1')
                    .send({
                        "lastname": lastName,
                        "email": email,
                        "phone": phone,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres,
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .set({ 'auth-token': token })
                    .expect(res => {
                        expect(res.status).toBe(500)
                        expect(res.body.error).toBe('The name of the invited is required')
                    })
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })

            it('Registro de invitado sin apellido (500)', (done) => {
                request(app)
                    .post('/invited/register?url=event1')
                    .send({
                        "name": name,
                        "email": email,
                        "phone": phone,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres,
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .set({ 'auth-token': token })
                    .expect(res => {
                        expect(res.status).toBe(500)
                        expect(res.body.error).toBe('The lastname of the invited is required')
                    })
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })


            it('Registro de invitado sin email (500)', (done) => {
                request(app)
                    .post('/invited/register?url=event1')
                    .send({
                        "name": name,
                        "lastname": lastName,
                        "phone": phone,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres,
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .set({ 'auth-token': token })
                    .expect(res => {
                        expect(res.status).toBe(500)
                        expect(res.body.error).toBe('The email of the invited is required')
                    })
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })

            it('Registro de invitado sin número de teléfono (500)', (done) => {
                request(app)
                    .post('/invited/register?url=event1')
                    .send({
                        "name": name,
                        "lastname": lastName,
                        "email": email,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres,
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .set({ 'auth-token': token })
                    .expect(res => {
                        expect(res.status).toBe(500)
                        expect(res.body.error).toBe('The phone number of the invited is required')
                    })
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })

            it('Registro de invitado en evento 1, expected (200)', (done) => {
                request(app)
                    .post('/invited/register?url=event1')
                    .send({
                        "name": name,
                        "lastname": lastName,
                        "email": email,
                        "phone": phone,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres,
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .expect(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.message).toBe('Invited Created')
                    }).end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })

            it('Registro de invitado registrado anteriormente en evento 1 , expected (409)', (done) => {
                request(app)
                    .post('/invited/register?url=event1')
                    .send({
                        "name": name,
                        "lastname": lastName,
                        "email": email,
                        "phone": phone,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres,
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .expect(res => {
                        expect(res.status).toBe(409)
                        expect(res.text).toBe('You are already registered in this event')
                    })
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })

            it('Registro de invitado 2 en evento 1, expected (200)', (done) => {
                request(app)
                    .post('/invited/register?url=event1')
                    .send({
                        "name": name,
                        "lastname": lastName,
                        "email": email2,
                        "phone": phone,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres,
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .expect(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.message).toBe('Invited Created')
                    }).end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })

            it('Registro de invitado 3 en evento 1, expected (200)', (done) => {
                request(app)
                    .post('/invited/register?url=event1')
                    .send({
                        "name": name,
                        "lastname": lastName,
                        "email": email3,
                        "phone": phone,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres,
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .expect(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.message).toBe('Invited Created')
                    }).end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })

            it('Registro de invitado 4 en evento 1, no hay invitaciones disponibles expected (409)', (done) => {
                request(app)
                    .post('/invited/register?url=event1')
                    .send({
                        "name": name,
                        "lastname": lastName,
                        "email": email4,
                        "phone": phone,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres,
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .expect(res => {
                        expect(res.status).toBe(409)
                        expect(res.text).toBe('This event does not have invitations left')
                    }).end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })

            it('Registro de invitado en evento 2, expected (200)', (done) => {
                request(app)
                    .post('/invited/register?url=event2')
                    .send({
                        "name": name,
                        "lastname": lastName,
                        "email": email,
                        "phone": phone,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres,
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .expect(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.message).toBe('Invited Created')
                    })
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })

            it('Registro de invitado evento 3 (no existente), expected (404)', (done) => {
                request(app)
                    .post('/invited/register?url=event3')
                    .send({
                        "name": name,
                        "lastname": lastName,
                        "email": email2,
                        "phone": phone,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres,
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .expect(res => {
                        expect(res.status).toBe(404)
                        expect(res.text).toBe('This event does not exist')
                    })
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })

            it('Actualización de datos de invitado evento 1, expected (200)', (done) => {
                request(app)
                    .put('/invited/update?email='+email)
                    .send({
                        "name": name + " Alejandro",
                        "lastname": lastName,
                        "email": email,
                        "phone": phone,
                        "birthdate": birth,
                        "nacionality": nacionality,
                        "addres": addres + " puerta 5",
                        "country": country,
                        "city": city,
                        "zipcode": zipCode
                    })
                    .expect(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.message).toBe('Invited Updated')
                    })
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    })
            })
    
    
    

        })

     




    })


    afterAll(async (done) => {
        MongooseCon.MongoClose()
        done()
    });
})

