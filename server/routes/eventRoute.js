import express from 'express';
import eventsController from './../controller/eventController';

const eventRouter = express.Router();

// router for the get and  post(add)
eventRouter.get('/', eventsController.getAllEvents)
  .post('/', eventsController.addEvent);

// router for update,get an event and delete an event
eventRouter.put('/:eventId', eventsController.update)
  .get('/:id', eventsController.getEvent)
  .delete('/:id', eventsController.remove);

export default eventRouter;
