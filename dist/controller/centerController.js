'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _centerModel = require('./../model/centerModel');

var _centerModel2 = _interopRequireDefault(_centerModel);

var _controllerFunctions = require('./controllerFunctions');

var _controllerFunctions2 = _interopRequireDefault(_controllerFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  it is a class that control all center methods
 */
var centerController = function () {
  function centerController() {
    _classCallCheck(this, centerController);
  }

  _createClass(centerController, null, [{
    key: 'getAllCenters',

    /**
     * it GET all centers
     * @param {string} req
     * @param {string} res
     * @returns {object} all centers
     */
    value: function getAllCenters(req, res) {
      return _controllerFunctions2.default.getAll(_centerModel2.default, req, res);
    }

    /**
    * it ADD a center
    * @param {string} req
    * @param {string} res
    * @returns {object} add a center
    */

  }, {
    key: 'addCenter',
    value: function addCenter(req, res) {
      // check if the id is not existing
      _controllerFunctions2.default.add(_centerModel2.default, req, res);
    }

    /**
    * it PUT a center
    * @param {string} req
    * @param {string} res
    * @returns {object} update(put) centers
    */

  }, {
    key: 'updateCenter',
    value: function updateCenter(req, res) {
      _controllerFunctions2.default.update(_centerModel2.default, req, res);
    }

    /**
    * it DELETE all a center
    * @param {string} req
    * @param {string} res
    * @returns {object} delete a center
    */

  }, {
    key: 'removeCenter',
    value: function removeCenter(req, res) {
      _controllerFunctions2.default.remove(_centerModel2.default, req, res);
    }

    /**
    * it GET a center
    * @param {string} req
    * @param {string} res
    * @returns {object} a center
    */

  }, {
    key: 'getCenter',
    value: function getCenter(req, res) {
      _controllerFunctions2.default.getOne(_centerModel2.default, req, res);
    }
  }]);

  return centerController;
}();

exports.default = centerController;
//# sourceMappingURL=centerController.js.map