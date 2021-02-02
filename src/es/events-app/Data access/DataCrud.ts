import { CRUDI } from "./Interfaces/CRUDI";

export class DataCrud implements CRUDI{

    public async find(param:any,req:any,res:any,object:any){
         return await param.find(object) 
    }

    public async create(param:any,req:any,res:any,object:any){
        return await param.create(object)
    }

} 