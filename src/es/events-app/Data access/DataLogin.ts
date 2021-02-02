import { LoginI } from "./Interfaces/LoginI";
import bcrypt = require('bcryptjs')
import jwt = require('jsonwebtoken')

export class LoginData implements LoginI {
   
    find(param,req,res,object){
        return param.find(object);
    }


}