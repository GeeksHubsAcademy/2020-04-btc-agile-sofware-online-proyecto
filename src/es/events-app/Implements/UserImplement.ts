import User = require('../Model/UserModel')
import {  UserLogin  } from '../Controller/LoginController/UserLogin'
import { UserCrud } from '../Controller/UserController/UserCrud'
 
class UserControllers  {
    static async Login(req, res) {
        const Post = await new UserLogin();
        await Post.Login(User, req, res,"You are Logged");
    }
    static async Create(req, res) {
        const Post = await new UserCrud();
        await Post.Create(User, req, res, "User Registered");
    }
    static async Get(req, res) {
        const Post = await new UserCrud();
        await Post.Read(User, req, res, "User Found");
    }
    static async Update(req, res) {
        const Put = await new UserCrud();
        await Put.Update(User, req, res, "User updated");
    }
    static async Delete(req, res) {
        const Delete = await new UserCrud();
        await Delete.Delete(User, req, res, "User Deleted");
    }
}

export = UserControllers;