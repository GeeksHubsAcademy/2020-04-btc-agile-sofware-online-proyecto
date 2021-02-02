import mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    username: {
        type: String,
        required: [true, "the username it's required"]
    },
    email: {
        type: String,
        required: [true, "The email it's required"]
    },
    password: {
        type: String,
        required: [true, "The password it's required"],
        minlength: [8, "Password is shorter than the minimum allowed length (8)"],
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin', 'user']
    }
});

const User = mongoose.model('User', UserSchema);
export = User;