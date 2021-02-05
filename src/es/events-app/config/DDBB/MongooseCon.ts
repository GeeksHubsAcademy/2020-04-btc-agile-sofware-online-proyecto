import { mongooseI } from "./mongooseI";
const mongoose = require('mongoose');

export class MongooseCon implements mongooseI {
    private _url: String;
    private _msg: String;
    private _err: String

    constructor(url: String, msg: String) {
        this._url = url;
        this._msg = msg;
    }

    /*Self Encapsulate Field con el uso de geters*/

    getMsg() : String {
        return this._msg
    }

    getUrl() : String {
        return this._url
    }

    getErr() : String {
        return this._err
    }

    setError(err : string) {
        this._err = err;
    }
    
  async  MongoConnect() {
      /*Rename Method: cada metodo inicia con "Mongo" pero tienen su propio naming, 
      MongoConnect() crea la conexión a base de datos
      MongoClose() cierra la conexión a base de datos en los tests  */

        const url = this._url;
        const msg = this._msg

        await mongoose.connect(this.getUrl(), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,

        })
            .then(async ()=> {
                await console.log(this.getMsg())
            })
            .catch(async (err)=>{
                this.setError(err)
                await console.error(this.getErr());
            });

    }

    static async MongoClose(){
        console.log("... Test Ended");
        await mongoose.connection.close();
    }
}