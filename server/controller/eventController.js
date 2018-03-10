const event = require('./../model/eventModel');
const controlFunction = require('./controllerFunctions')

//class eventController class
class eventController{
    //GET: method that gets all events
    static getAllEvents(req, res){
        controlFunction.getAll(event,req,res);
    }

    static addEvent(req,res){
        //addEvent method
        for (let i= 0; i<event.length; i++){
            if (parseInt(req.body.id) === event[i].id){
               return res.json({
                    message: "event id already existing",
                    error: true
                });
            }
            else if (!req.body.id){
                return res.json({
                    message: "event id is required",
                    error: true
                });
             } 
        } 
        event.push(req.body);
            return res.json({
            message: "Success",
            error: false
        }); 
    }

    //update event
    static update(req, res){
        for (let i= 0; i<event.length; i++){
            if (event[i].id === parseInt(req.params.eventId, 10)){
                event[i].eventType = req.body.eventType;
                event[i].eventLocation = req.body.eventLocation;
                event[i].state = req.body.state;
                event[i].date = req.body.date;
                return res.json({
                    message : 'Update Successful',
                    error : false
                });
            }
        }
        return res.status(404).json({
            message: 'not found',
            error : true
        });
    }

    static remove(req, res){
        controlFunction.remove(event,req,res);
    }

    static getEvent(req,res){
        controlFunction.getOne(event,req,res);
    }
}
  


module.exports = eventController;

