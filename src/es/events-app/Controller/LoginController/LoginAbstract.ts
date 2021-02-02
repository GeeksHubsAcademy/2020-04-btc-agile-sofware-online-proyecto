import { LoginI } from "../../Data access/Interfaces/LoginI";

export abstract class LoginAbstract {
    login: LoginI

    constructor(Login:LoginI){
        this.login = Login;
    }

    public abstract Login(param,req,res,msg);

}