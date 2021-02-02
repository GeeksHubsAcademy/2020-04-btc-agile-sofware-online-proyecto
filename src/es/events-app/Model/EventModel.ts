import mongoose = require('mongoose');
import { deleteElement } from '../Controller/MWS/deleteElement';

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name of the event is required"]
    },
    invitations: {
        type: Number,
        required: [true, "The number of invitations is required"]
    },
    date: {
        type: String,
        required: [true, "The date of the event is required"]
    },
    time: {
        type: String,
        required: [true, "The time of the event is required"]
    },
    addres: {
        type: String,
        required: [true, "The addres is required"]
    },
    description: {
        type: String,
    },
    url: {
        type:String,
    },
    identifier : {
        type: String
    }
});

EventSchema.methods.toJSON = (function(){
    return deleteElement.element(this.toObject(),'identifier')
})

EventSchema.pre<any>('save',async function () {
    this.url = this.name.replace(/ /, "");
})

const Event = mongoose.model('Event', EventSchema);
export = Event;