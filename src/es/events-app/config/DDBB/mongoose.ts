import { mongooseI } from "./mongooseI";
const mongoose = require('mongoose');

export class MongooseCon implements mongooseI {
    private _url: String;
    private _msg: String;

    constructor(url: String, msg: String) {
        this._url = url;
        this._msg = msg;
    }

    MongoProcess() {

        mongoose.connect(this._url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,

        })
            .then(function () {
                console.log(this._msg)
            })
            .catch((err) => {
                console.error(err);
            });

    }
}