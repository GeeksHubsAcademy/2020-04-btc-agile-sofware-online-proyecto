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


    }
}