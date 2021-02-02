import mongoose = require('mongoose');

const InvitedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name of the invited is required"]
    },
    lastname: {
        type: String,
        required: [true, "The lastname of the invited is required"]
    },
    email: {
        type: String,
        required: [true, "The email of the invited is required"]
    },
    phone: {
        type: String,
        required: [true, "The phone number of the invited is required"]
    },
    birthdate: {
        type: String,
    },
    nacionality: {
        type: String
    },
    addres: {
        type: String
    },
    country: {
        type: String
    },
    city : {
        type: String
    },
    zipcode : {
        type: Number
    },
    eventID: {
        type: Array
    }
});


const Invited = mongoose.model('Invited', InvitedSchema);
export = Invited;