import Event = require('../Model/EventModel')
import { EventCrud } from '../Controller/EventController/EventCrud'

class EventControllers {

    static async Create(req, res) {
        const Post = new EventCrud();
        await Post.Create(Event, req, res, "Event created");
    }
    static async Get(req, res) {
        const Post = new EventCrud();
        await Post.ReadOne(Event, req, res, "Event Founded");
    }
    static async GetAll(req, res) {
        const Post = new EventCrud();
        await Post.Read(Event, req, res, "Events Founded");
    }
    static async GetPublic(req, res) {
        const Post = new EventCrud();
        await Post.ReadPublic(Event, req, res, "Event Founded");
    }
    static async Update(req, res) {
        const Put = new EventCrud();
        await Put.Update(Event, req, res, "Event updated");
    }
    static async Delete(req, res) {
        const Delete = new EventCrud();
        await Delete.Delete(Event, req, res, "Event Deleted");
    }

}

export = EventControllers;