import { CRUDI } from "./Interfaces/CRUDI";

export class DataCrud implements CRUDI{

    public async find(param:any,req:any,res:any,object:any){
         return await param.find(object) 
    }

    public async create(param:any,req:any,res:any,object:any){
        return await param.create(object)
    }

    public async update(param:any,req:any,res:any,object){
        return await param.findOneAndUpdate(object, req, { new: true, runValidators: true })
    }

    public async delete(param:any,req,res,object){
        return await param.findOneAndDelete(object)
     }
 
} 

/* Refactor Extract Class (Unidad temática: Moving features between objects), 
esta clase se encarga de gestionar la conexión con base de datos haciendo el CRUD así la clase del controlador no tiene que hacerla */