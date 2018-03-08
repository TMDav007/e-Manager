const event = require('./../model/eventModel');

//functions that gets all events
const getAllEvents =(req, res) => {
   if (event.length > 0)
    {
        return res.json({
            events: event,
            error : false
       });
    }
    return res.json({
        message: "No event",
        error : true
   });
   
};

//this is addEvent event method to addEvent an event
const addEvent = (req, res) => {
    //check if the id is not existing
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
  
const update = (req, res) => {
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
            message: 'User not found',
            error : true
        });
}

const remove = (req, res) =>{
    for (let i = 0; i<event.length ; i++){
        if (event[i].id === parseInt(req.params.eventId)){
            event.splice(i,1);
            return res.json({
                message : "Success",
                error : false
            });
        }
    }
    return res.status(404).json({
        message: 'event not found',
        error : true
    });
}

const getEvent = (req, res) => {
    for (let i = 0; i<event.length ; i++){
        if (event[i].id === parseInt(req.params.eventId)){
            return res.json({
                event : event[i],
                message : "Success",
                error : false
            });
        }
    }
    return res.status(404).json({
        message: 'event not found',
        error : true
    });      
}

module.exports = {addEvent,getAllEvents,update, getEvent,remove}

