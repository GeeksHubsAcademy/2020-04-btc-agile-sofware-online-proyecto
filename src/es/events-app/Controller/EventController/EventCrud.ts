import { ControllerCrud } from '../ControllerCrud'
import { TokenAction } from '../MWS/TokenAction';
import { ErrorCatch } from '../ErrorCatch';
import { findDatabase } from '../../config/DDBB/findDatabase';
import { DataCrud } from '../../Data access/DataCrud';

const ObjectId = require('mongodb').ObjectId

export class EventCrud extends ControllerCrud {
    constructor() {
        super(new DataCrud())
    }

    async Create(param:any,req:any,res:any,msg:any) {
        try {
            const userId = await TokenAction.decode(req);
            const event = await this.CRUD.find(param,req,res,{name: req.body.name})

            if (!userId) {
                return res.status(401).end('You are not logged in');
            } else if (event[0]) {
                return res.status(409).end('This event Already Exist');
            }

            const findUser = await findDatabase.find("eventsapp", "users", { _id: ObjectId(userId) })
            const token = await TokenAction.ValToken(findUser[0]._id,req,res)

            if (token === true) {
                req.body.identifier = userId;
                const eventCreate = await this.CRUD.create(param,req,res,req.body)
                return await res.send({ message: msg, object: eventCreate });
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem creating the event')
        }
    }

    async Read(param:any,req:any,res:any,msg:any) {
        try {
            const userId = TokenAction.decode(req);
            const event = await this.CRUD.find(param,req,res,{ identifier: userId })

            if (!userId) {
                return await res.status(401).end('You are not logged in');
            } else if (!event[0] || event[0].identifier !== userId) {
                return await res.status(404).end('This user do not have events created');
            }

            const findUser = await findDatabase.find("eventsapp", "users", { _id: ObjectId(userId) })
            const token = TokenAction.ValToken(findUser[0]._id, req, res)

            if ((token === true)) {
                return await res.send({ message: msg, object: event[0] });
            } 

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the event')
        }
    }

    async ReadOne(param:any,req:any,res:any,msg:any) {
        try {
            const userId = TokenAction.decode(req);
            const event = await this.CRUD.find(param,req,res,{ url: req.query.url });

            if (!userId) {
                return res.status(401).end('You are not logged in');
            } else if (!event[0] || event[0].identifier !== userId) {
                return res.status(404).end('This user do not have events created');
            }

            const findUser = await findDatabase.find("eventsapp", "users", { _id: ObjectId(userId) })
            const token = TokenAction.ValToken(findUser[0]._id, req, res)

            if (token === true) {
                return await res.send({ message: msg, object: event[0] });
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the event')
        }
    }

    async ReadPublic(param:any,req:any,res:any,msg:any) {
        try {
            const event = await this.CRUD.find(param,req,res,{ url: req.query.url })

            if (!event[0]) {
                return await res.status(404).end('This event does not exist');
            }

            return await res.send({ message: msg, object: event[0] })

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the event')
        }
    }


    async Update(param:any,req:any,res:any,msg:any) {
        try {
            const event = await this.CRUD.find(param,req,res,{ url: req.query.url })
            const findSameEvent = await this.CRUD.find(param,req,res,{ name: req.body.name })
            const userId = TokenAction.decode(req);

            if (!userId) {
                return res.status(401).end('You are not logged in');
            } else if (!event[0] || event[0].identifier !== userId) {
                return res.status(404).end('This event does not exist');
            } else if (findSameEvent && (req.body.name.toString() !== event[0].name.toString())) {
                return res.status(409).end('A event exist with this name, event could not be updated');
            }

            const findUser = await findDatabase.find("eventsapp", "users", { _id: ObjectId(userId) })
            const token = TokenAction.ValToken(findUser[0]._id, req, res)

            if (token === true) {
                req.body.identifier = userId;

                const eventUpdated = await this.CRUD.update(param,req.body,res,{_id: event[0]._id})
                eventUpdated.save()
                return await res.send({ message: msg, object: eventUpdated });
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem updating the event')
        }
    }


    async Delete(param:any,req:any,res:any,msg:any) {
        try {
            const userId = TokenAction.decode(req);
            const event = await this.CRUD.find(param,req,res,{ url: req.query.url })

            if (!userId) {
                return res.status(401).end('You are not logged in');
            } else if (!event[0] || event[0].identifier !== userId) {
                return res.status(404).end('This event does not exist');
            }

            const findUser = await findDatabase.find("eventsapp", "users", { _id: ObjectId(userId) })
            const token = TokenAction.ValToken(findUser[0]._id, req, res)

            if (token === true) {
                const eventDeleted = await this.CRUD.delete(param,req,res,{_id: event[0]._id})
                return await res.send({ message: msg, object: eventDeleted });
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem deleting the event')
        }
    }


}