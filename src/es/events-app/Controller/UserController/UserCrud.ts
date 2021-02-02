import { DataCrud } from '../../Data access/DataCrud'
import { ControllerCrud } from '../ControllerCrud'
import { ErrorCatch } from '../ErrorCatch'
import { TokenAction } from '../MWS/TokenAction'

export class UserCrud extends ControllerCrud {

    constructor() {
        super(new DataCrud())
    }

    async Create(param:any,req:any,res:any,msg:string) {
        try {
            const user = await this.CRUD.find(param,req,res,{ email: req.body.email })

            if (user[0]) {
                return res.status(409).end('Email already Exist');
            }

            const createUser = await this.CRUD.create(param,req,res,req.body)
            return await res.send({ message: msg, object: createUser });

        } catch (error) {
            return res.send(error,'there was a problem creating the user')
        }
    }


}