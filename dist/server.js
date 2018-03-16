'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _eventRoute = require('./routes/eventRoute');

var _eventRoute2 = _interopRequireDefault(_eventRoute);

var _centerRoute = require('./routes/centerRoute');

var _centerRoute2 = _interopRequireDefault(_centerRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.PORT || 3000;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.json({ type: 'application/json' }));

app.use('/api/events', _eventRoute2.default);
app.use('/api/centers', _centerRoute2.default);

app.listen(port, function () {
  console.log('we are running live');
});

exports.default = app;
//# sourceMappingURL=server.js.map