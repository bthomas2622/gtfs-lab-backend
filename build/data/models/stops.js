'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StopModel = _mongoose2.default.model('Stop', new _mongoose2.default.Schema({
  agency_key: {
    type: Number,
    required: true,
    index: true
  },
  stop_id: {
    type: String,
    required: true,
    index: true
  },
  stop_code: {
    type: String,
    index: true
  },
  stop_name: {
    type: String,
    required: true
  },
  stop_desc: String,
  stop_lat: {
    type: Number,
    required: true,
    min: -90,
    max: 90
  },
  stop_lon: {
    type: Number,
    required: true,
    min: -180,
    max: 180
  },
  loc: {
    type: [Number],
    index: '2dsphere'
  },
  zone_id: String,
  stop_url: String,
  location_type: {
    type: Number,
    min: 0,
    max: 2
  },
  parent_station: String,
  stop_timezone: String,
  wheelchair_boarding: {
    type: Number,
    min: 0,
    max: 2
  },
  created: {
    type: Date,
    default: Date.now
  }
}));

exports.default = StopModel;