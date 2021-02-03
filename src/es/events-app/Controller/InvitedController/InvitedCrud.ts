import { findDatabase } from '../../config/DDBB/findDatabase';
import { elementLeft } from '../MWS/elementsLeft';
import { ErrorCatch } from '../ErrorCatch';
import { ControllerCrud } from '../ControllerCrud';
import { DataCrud } from '../../Data access/DataCrud';

const ObjectId = require('mongodb').ObjectId

export class InvitedCrud extends ControllerCrud{

    constructor(){
        super(new DataCrud())
    }

    async Create(param:any,req:any,res:any,msg:string) {
        try {
            const findInvitedByEmail = await this.CRUD.find(param,req,res,{email: req.body.email})
            const findEvent = await findDatabase.find("eventsapp", "events", { url: req.query.url })
            
            if (!findEvent[0]) {
                return await res.status(404).end('This event does not exist');
            }

            const findInvitations = await this.CRUD.find(param,req,res,{eventID: findEvent[0]._id })
            const invitationsLeft = elementLeft.element(findEvent[0].invitations, findInvitations.length)
            
            if ((invitationsLeft) === 0) {
                return await res.status(409).end('This event does not have invitations left');
            } else if (!findInvitedByEmail[0]) {
                req.body.eventID = findEvent[0]._id
                const invitation = await this.CRUD.create(param,req,res,req.body)
                return await res.send({ message: msg, object: invitation });
            } else if (findInvitedByEmail[0].eventID.includes(findEvent[0]._id)) {
                return await res.status(409).end('You are already registered in this event');
            } else {
                const currentEventsIds = findInvitedByEmail[0].eventID
                currentEventsIds.push(findEvent[0]._id)
                const newEventRegister = await this.CRUD.update(param,{eventID: currentEventsIds},res,{_id:findInvitedByEmail[0]._id})
                return res.send({ message: msg, object: newEventRegister });
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem creating the invitation')
        }
    }

    async Read(param:any,req:any,res:any,msg:string) {
        try {
            const invited = await this.CRUD.find(param,req,res,{ email: req.query.email })

            if (!invited[0]) {
                return res.status(404).end('You are not registered in any events');
            }

            const events = invited[0].eventID.map(function (id) {
                return ObjectId(id)
            });

            const findEvent = await findDatabase.find("eventsapp", "events", { "_id": { "$in": events } })
            return res.send({ message: msg, object: invited[0], events: findEvent });
        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the invitation')
        }
    }

    async Update(param:any,req:any,res:any,msg:string) {
        try {

            const invited = await this.CRUD.update(param,req.body,res,{ email: req.query.email })

            if (!invited) {
                return await res.status(404).end('This invited does not exist');
            }

            return await res.send({ message: msg, object: invited });

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem updating the invitation')
        }
    }

    async Delete(param:any,req:any,res:any,msg:string) {
        try {
            const invited = await this.CRUD.delete(param,req,res,{ email: req.query.email })

            if (!invited) {
                return await res.status(404).end('This invited does not exist');
            }

            return await res.send({ message: msg, object: invited });

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem deleting the invitation')
        }
    }
}