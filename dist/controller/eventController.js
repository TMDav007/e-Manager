'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventModel = require('./../model/eventModel');

var _eventModel2 = _interopRequireDefault(_eventModel);

var _controllerFunctions = require('./controllerFunctions');

var _controllerFunctions2 = _interopRequireDefault(_controllerFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// class eventController class
/**
 * it is a class that control all event method;
 */
var eventController = function () {
  function eventController() {
    _classCallCheck(this, eventController);
  }

  _createClass(eventController, null, [{
    key: 'getAllEvents',

    /**
     * it GET all events
     * @param {string} req
     * @param {string} res
     * @returns {object} all events
     */
    value: function getAllEvents(req, res) {
      _controllerFunctions2.default.getAll(_eventModel2.default, req, res);
    }

    /**
     * it ADD an event
     * @param {string} req
     * @param {string} res
     * @returns {object} add event
     */

  }, {
    key: 'addEvent',
    value: function addEvent(req, res) {
      // addEvent method
      for (var i = 0; i < _eventModel2.default.length; i += 1) {
        if (parseInt(req.body.id, 10) === _eventModel2.default[i].id) {
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
      _eventModel2.default.push(req.body);
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

  }, {
    key: 'update',
    value: function update(req, res) {
      for (var i = 0; i < _eventModel2.default.length; i += 1) {
        if (_eventModel2.default[i].id === parseInt(req.params.eventId, 10)) {
          _eventModel2.default[i].eventType = req.body.eventType;
          _eventModel2.default[i].eventLocation = req.body.eventLocation;
          _eventModel2.default[i].state = req.body.state;
          _eventModel2.default[i].date = req.body.date;
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

  }, {
    key: 'remove',
    value: function remove(req, res) {
      _controllerFunctions2.default.remove(_eventModel2.default, req, res);
    }

    /**
     * it GET an event
     * @param {string} req
     * @param {string} res
     * @returns {object} an event
     */

  }, {
    key: 'getEvent',
    value: function getEvent(req, res) {
      _controllerFunctions2.default.getOne(_eventModel2.default, req, res);
    }
  }]);

  return eventController;
}();

exports.default = eventController;
//# sourceMappingURL=eventController.js.map