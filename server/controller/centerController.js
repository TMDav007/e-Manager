const center = require('./../model/centerModel');
const controlFunction = require('./controllerFunctions');


class centerController{
    static getAllCenters(req,res){
       controlFunction.getAll(center,req,res);
    }

   static addCenter(req,res){
        //check if the id is not existing
       controlFunction.add(center,req,res);
   }

   static updateCenter(req,res){
        controlFunction.update(center,req,res);
   }

   static removeCenter(req,res){
        controlFunction.remove(center,req,res);
   }

   static getCenter(req,res){
        controlFunction.getOne(center,req,res);
   }
}  
  

 module.exports = centerController;