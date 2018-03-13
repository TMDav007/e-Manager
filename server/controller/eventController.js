import event from './../model/eventModel';
import controlFunction from './controllerFunctions';

// class eventController class
/**
 * it is a class that control all event method;
 */
class eventController {
  /**
   * it GET all events
   * @param {string} req
   * @param {string} res
   * @returns {object} all events
   */
  static getAllEvents(req, res) {
    controlFunction.getAll(event, req, res);
  }

  /**
   * it ADD an event
   * @param {string} req
   * @param {string} res
   * @returns {object} add event
   */
  static addEvent(req, res) {
    // addEvent method
    for (let i = 0; i < event.length; i += 1) {
      if (parseInt(req.body.id, 10) === event[i].id) {
        return res.json({
          message: 'event id already existing',
          error: true
        });
      } else if (!req.body.id) {
        return res.json({
          message: 'event id is required',
          error: true
        });
      }
    }
    event.push(req.body);
    return res.json({
      message: 'Success',
      error: false
    });
  }

  /**
   * it PUT all events
   * @param {string} req
   * @param {string} res
   * @returns {object} PUT(update) event
   */
  static update(req, res) {
    for (let i = 0; i < event.length; i += 1) {
      if (event[i].id === parseInt(req.params.eventId, 10)) {
        event[i].eventType = req.body.eventType;
        event[i].eventLocation = req.body.eventLocation;
        event[i].state = req.body.state;
        event[i].date = req.body.date;
        return res.json({
          message: 'Update Successful',
          error: false
        });
      }
    }
    return res.status(404).json({
      message: 'not found',
      error: true
    });
  }

  /**
   * it DELETE all events
   * @param {string} req
   * @param {string} res
   * @returns {object} remove an event
   */
  static remove(req, res) {
    controlFunction.remove(event, req, res);
  }

  /**
   * it GET an event
   * @param {string} req
   * @param {string} res
   * @returns {object} an event
   */
  static getEvent(req, res) {
    controlFunction.getOne(event, req, res);
  }
}


export default eventController;
