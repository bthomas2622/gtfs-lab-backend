'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _agency = require('./agency');

var _agency2 = _interopRequireDefault(_agency);

var _calendar_dates = require('./calendar_dates');

var _calendar_dates2 = _interopRequireDefault(_calendar_dates);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _shapes = require('./shapes');

var _shapes2 = _interopRequireDefault(_shapes);

var _stop_times = require('./stop_times');

var _stop_times2 = _interopRequireDefault(_stop_times);

var _stops = require('./stops');

var _stops2 = _interopRequireDefault(_stops);

var _trips = require('./trips');

var _trips2 = _interopRequireDefault(_trips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const modelHash = {};
modelHash['agency.txt'] = { model: _agency2.default, docName: 'agencies' };
modelHash['calendar_dates.txt'] = { model: _calendar_dates2.default, docName: 'calendardates' };
modelHash['calendar.txt'] = { model: _calendar2.default, docName: 'calendars' };
modelHash['routes.txt'] = { model: _routes2.default, docName: 'routes' };
modelHash['shapes.txt'] = { model: _shapes2.default, docName: 'shapes' };
modelHash['stops.txt'] = { model: _stops2.default, docName: 'stops' };
modelHash['stop_times.txt'] = { model: _stop_times2.default, docName: 'stoptimes' };
modelHash['trips.txt'] = { model: _trips2.default, docName: 'trips' };

exports.default = modelHash;