'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CalendarModel = _mongoose2.default.model('Calendar', new _mongoose2.default.Schema({
  agency_key: {
    type: Number,
    required: true,
    index: true
  },
  service_id: {
    type: String,
    required: true
  },
  monday: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  tuesday: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  wednesday: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  thursday: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  friday: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  saturday: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  sunday: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  start_date: {
    type: Number,
    required: true,
    min: 10000000
  },
  end_date: {
    type: Number,
    required: true,
    min: 10000000
  },
  created: {
    type: Date,
    default: Date.now
  }
}));

exports.default = CalendarModel;