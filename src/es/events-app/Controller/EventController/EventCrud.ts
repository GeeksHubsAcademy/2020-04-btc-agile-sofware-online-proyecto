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


}