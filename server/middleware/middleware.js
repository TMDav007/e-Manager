import jwt from 'jsonwebtoken';
import errorStatus from './middlewareFunction';

const number = /\d{8}/g;
const password = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const checkField = (requestBody, requestAttribute, res) => {
  const undefinedOrEmpty = '' || undefined;
  if (requestBody === undefinedOrEmpty) {
    return errorStatus(400, `${requestAttribute} is required`, res);
  } else if (requestBody.length < 5) {
    return errorStatus(400, `${requestAttribute} is too short`, res);
  }
};
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
  checkField(req.body.name, 'name', res);
  checkField(req.body.email, 'email', res);
  checkField(req.body.phoneNo, 'phone number', res);
  if (!(number.test(req.body.phoneNo)) || req.body.phoneNo.length > 13) {
    errorStatus(400, 'valid phone number required', res);
  }
  checkField(req.body.password, 'password', res);
  if (!(password.test(req.body.password))) {
    errorStatus(400, 'password should be a combination of uppercase,lowercase and numbers', res);
  } else if (req.body.password !== req.body.confirmPassword) {
    errorStatus(400, 'password not confirmed', res);
  }
  return next();
};

const validateLoginIn = (req, res, next) => {
  checkField(req.body.email, 'email', res);
  checkField(req.body.password, 'password', res);
  next();
};

const validateEvent = (req, res, next) => {
  if (req.body.eventType === 'others' && (req.body.others === '' || req.body.others === undefined)) {
    errorStatus(409, 'event type is required!!!', res);
  }
  next();
};

export default {
  validateSignUp, validateLoginIn, validateEvent, authenicateUser
};

