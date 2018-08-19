'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CalendarDateModel = _mongoose2.default.model('CalendarDate', new _mongoose2.default.Schema({
  agency_key: {
    type: Number,
    required: true,
    index: true
  },
  service_id: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  exception_type: {
    type: Number,
    required: true,
    min: 1,
    max: 2
  },
  holiday_name: String,
  created: {
    type: Date,
    default: Date.now
  }
}));

exports.default = CalendarDateModel;