import { mongooseI } from "./mongooseI";
const mongoose = require('mongoose');

export class MongooseCon implements mongooseI {
    private _url: String;
    private _msg: String;

    constructor(url: String, msg: String) {
        this._url = url;
        this._msg = msg;
    }

  async  MongoProcess() {

        const url = this._url;
        const msg = this._msg

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,

        })
            .then(async function () {
                await console.log(msg)
            })
            .catch(async function (err){
                await console.error(err);
            });

    }

    static async MongoClose(){
        await mongoose.connection.close()
    }
}