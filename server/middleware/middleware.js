import jwt from 'jsonwebtoken';
import errorStatus from './middlewareFunction';
import { error } from 'util';

const number = /\d{8}/g;
const password = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const authenicateUser = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token;

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Forbidden to non user' });
    }
    req.userId = decoded.id;
    return next();
  });
};

const validateSignUp = (req, res, next) => {
  if (req.body.name === '' || req.body.name === undefined) {
    return errorStatus(400, 'name is required', res);
  }
  if (req.body.name.length < 5) {
    return errorStatus(400, 'name is too short', res);
  }

  if (req.body.email === undefined || req.body.email === '') {
    return errorStatus(400, 'email is required', res);
  }

  if (req.body.phoneNo === '' || req.body.phoneNo === undefined) {
    return errorStatus(400, 'phone number is required', res);
  }
  if (!(number.test(req.body.phoneNo)) || req.body.phoneNo.length > 13) {
    return errorStatus(400, 'valid phone number required', res);
  }
  if (req.body.password.length < 6) {
    return errorStatus(400, 'password is too short', res);
  }
  if (req.body.password === undefined) {
    return errorStatus(400, 'password is required', res);
  }
  if (!(password.test(req.body.password))) {
    return errorStatus(400, 'password should be a combination of uppercase,lowercase and numbers', res);
  }
  if (req.body.password !== req.body.confirmPassword) {
    return errorStatus(400, 'password not confirmed', res);
  }
  return next();
};

const validateLoginIn = (req, res, next) => {
  if (req.body.email === undefined) {
    return errorStatus(400, 'email is required', res);
  }
  if (req.body.password === undefined || req.body.password === '') {
    return errorStatus(400, 'password is required', res);
  }
  return next();
};

const validateEvent = (req, res, next) => {
  if (req.body.eventType === 'others' && (req.body.others === '' || req.body.others === undefined)) {
    return errorStatus(409, 'event type is required!!!', res);
  }
  return next();
};

export default {
  validateSignUp, validateLoginIn, validateEvent, authenicateUser
};

