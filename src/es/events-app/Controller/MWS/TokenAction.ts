import jwt = require('jsonwebtoken');

export class TokenAction {

    static ValToken(id: any,req:any,res:any):boolean {

        const idToken = jwt.verify(req.header('auth-token'), 'token')

        if(id.toString() === idToken.toString()){
            return true
        }

        throw 'Token does not match'
    }

}