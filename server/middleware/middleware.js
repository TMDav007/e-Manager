import jwt from 'jsonwebtoken';
import middlewareFunction from './middlewareFunction';

const number = /^\+?[0-9]{10,}$/;
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
  middlewareFunction.checkField(req.body.name, 'name', res);
  middlewareFunction.checkField(req.body.email, 'email', res);
  middlewareFunction.checkField(req.body.phoneNo, 'phone number', res);
  if (!number.test(req.body.phoneNo)) {
    return middlewareFunction.errorStatus(400, 'valid phone number required', res);
  }
  middlewareFunction.checkField(req.body.password, 'password', res);
  if (!(password.test(req.body.password))) {
    return middlewareFunction.errorStatus(400, 'password should be a combination of uppercase,lowercase and numbers', res);
  } else if (req.body.password !== req.body.confirmPassword) {
    middlewareFunction.errorStatus(400, 'password not confirmed', res);
  }
  return next();
};

const validateLoginIn = (req, res, next) => {
  middlewareFunction.checkField(req.body.email, 'email', res);
  middlewareFunction.checkField(req.body.password, 'password', res);
  next();
};

const validateEvent = (req, res, next) => {
  if (req.body.eventType === 'others' && (req.body.others === '' || req.body.others === undefined)) {
    middlewareFunction.errorStatus(409, 'event type is required!!!', res);
  }
  next();
};
const validateCenter = (req, res, next) => {
  middlewareFunction.checkField(req.body.centerName, 'center-name', res);
  next();
};

export default {
  validateSignUp, validateLoginIn, validateEvent, authenicateUser, validateCenter
};

