'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _centerController = require('./../controller/centerController');

var _centerController2 = _interopRequireDefault(_centerController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var centerRouter = _express2.default.Router();

// router for the get,post,delte and put
centerRouter.get('/', _centerController2.default.getAllCenters).post('/', _centerController2.default.addCenter);

centerRouter.put('/:id', _centerController2.default.updateCenter).delete('/:id', _centerController2.default.removeCenter).get('/:id', _centerController2.default.getCenter);

exports.default = centerRouter;
//# sourceMappingURL=centerRoute.js.map