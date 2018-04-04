import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Model from './../models';
import messageStatus from './../middleware/middlewareFunction';

const { Event, User } = Model;


// class eventController class
/**
 * it is a class that control all event method;
 */
class eventController {
  /**
 * it post all event
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
  static postEvent(req, res) {
    Event.findOne({ where: { date: req.body.date } })
      .then((existedDate) => {
        if (existedDate) {
          return messageStatus(409, 'date already existing', res);
        }
        Event.create({
          location: req.body.location,
          center: req.body.center,
          eventType: req.body.eventType,
          others: req.body.others,
          date: req.body.date,
          duration: req.body.duration,
          amount: req.body.amount,
        })
          .then((event) => {
            if (!event) {
              return res.status(500).send({
                message: 'Server error. Event not created'
              });
            }
            return res.status(200).send({ message: 'success', event });
          }).catch(() => res.status(400).send());
      });
  }

  /**
 * it create a new user
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
  static signUp(req, res) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        User.findOne({ where: { email: req.body.email.trim().toLowerCase() } })
          .then((existingUser) => {
            if (existingUser) {
              return res.status(409).json({ error: 'email already existing' });
            }
            User.create({
              name: req.body.name,
              email: req.body.email,
              phoneNo: req.body.phoneNo,
              password: hash,
            }).then((user) => {
              const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: 86400 });
              return res.status(200).json({ authentication: true, message: 'sign up successful', token });
            }).catch(() => res.status(401).send());
          });
      });
    });
  }

  /**
 * login user
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
  static logIn(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return messageStatus(404, 'email not found', res);
        }
        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword) {
          return res.status(401).send({ authentication: false, message: 'Password Incorrect', token: null });
        }
        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: 86400 });
        return res.status(200).send({ authentication: true, message: 'Password correct', token });
      });
  }

  /**
   * it Update an events
   * @param {string} req
   * @param {string} res
   * @returns {object} PUT(update) event
   */
  static updateEvent(req, res) {
    Event.findById(req.params.id)
      .then((event) => {
        if (!event) {
          return messageStatus(404, 'event not found', res);
        }
        Event.update({
          location: req.body.location || event.location,
          center: req.body.center || event.center,
          eventType: req.body.eventType || event.eventType,
          others: req.body.others || event.others,
          date: req.body.date || event.date,
          duration: req.body.duration || event.duration,
          amount: req.body.amount || event.amount
        }, {
          where: {
            id: req.params.id,
          },
        }).then((updatedEvent) => {
          if (!updatedEvent) {
            return messageStatus(500, 'event could not be updated, try again', res);
          }
          return res.status(200).json({ message: 'success', updatedEvent });
        });
      });
  }

  /**
   * it DELETE all events
   * @param {string} req
   * @param {string} res
   * @returns {object} remove an event
   */
  static deleteEvent(req, res) {
    Event.findById(req.params.id)
      .then((event) => {
        if (!event) {
          return messageStatus(404, 'event not found', res);
        }
        Event.destroy({
          where: {
            id: req.params.id,
          }
        })
          .then((deletedEvent) => {
            if (!deletedEvent) {
              return messageStatus(500, 'event unable to delete, try again', res);
            }
            return res.status(200).json({ message: 'event deleted' });
          });
      });
  }
}


export default eventController;
