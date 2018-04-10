'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _eventController = require('./../controller/eventController');

var _eventController2 = _interopRequireDefault(_eventController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventRouter = _express2.default.Router();

// router for the get and  post(add)
eventRouter.get('/', _eventController2.default.getAllEvents).post('/', _eventController2.default.addEvent);

// router for update,get an event and delete an event
eventRouter.put('/:eventId', _eventController2.default.update).get('/:id', _eventController2.default.getEvent).delete('/:id', _eventController2.default.remove);

exports.default = eventRouter;
//# sourceMappingURL=eventRoute.js.map