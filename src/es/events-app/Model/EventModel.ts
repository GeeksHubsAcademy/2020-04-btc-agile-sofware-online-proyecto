import mongoose = require('mongoose');

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



const Event = mongoose.model('Event', EventSchema);
export = Event;