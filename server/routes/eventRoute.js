//this is the route file

const express = require('express')
const eventsController = require('./../controller/eventController')
const eventRouter = express.Router();

//router for the get and  post(add)
eventRouter.get('/',eventsController.getAllEvents)
            .post('/',eventsController.addEvent);

//router for update,get an event and delete an event
eventRouter.put('/:eventId',eventsController.update)
            .get('/:eventId',eventsController.getEvent)
            .delete('/:eventId',eventsController.remove);

module.exports = eventRouter;