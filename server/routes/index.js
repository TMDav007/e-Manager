import eventController from './../controller/eventController';
import centerController from './../controller/centerController';
import middleware from './../middleware/middleware';

const routes = (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Events! Manager',
  }));

  app.post('/users/', middleware.validateSignUp, eventController.signUp);

  app.post('/users/login', eventController.logIn);

  app.post('/events/', middleware.authenicateUser, middleware.validateEvent, eventController.postEvent);

  app.put('/events/:id', middleware.authenicateUser, eventController.updateEvent);

  app.delete('/events/:id', middleware.authenicateUser, eventController.deleteEvent);

  app.post('/centers/', middleware.authenicateUser, centerController.addCenter);

  app.get('/centers/', middleware.authenicateUser, centerController.getAllCenter);

  app.get('/centers/:id', middleware.authenicateUser, centerController.getCenter);

  app.put('/centers/:centerName', middleware.authenicateUser, centerController.updateCenter);

  app.delete('/centers/:centerName', middleware.authenicateUser, centerController.removeCenter);
};

export default routes;
