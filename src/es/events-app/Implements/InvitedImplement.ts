import Invited = require('../Model/InvitedModel')
import { InvitedCrud } from '../Controller/InvitedController/InvitedCrud'

class InvitedControllers  {
    static async Create(req, res) {
        const Post = new InvitedCrud();
        await Post.Create(Invited, req, res, "Invited Created");
    }
    static async Get(req, res) {
        const Post = new InvitedCrud();
        await Post.Read(Invited, req, res, "Invited Founded");
    }
    static async Update(req, res) {
        const Put = new InvitedCrud();
        await Put.Update(Invited, req, res, "Invited Updated");
    }
    static async Delete(req, res) {
        const Delete =  new InvitedCrud();
        await Delete.Delete(Invited, req, res, "Invited Deleted");
    }
}

export = InvitedControllers;

