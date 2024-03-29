'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stopTimeSchema = new _mongoose2.default.Schema({
  agency_key: {
    type: Number,
    required: true,
    index: true
  },
  trip_id: {
    type: String,
    required: true,
    index: true
  },
  arrival_time: {
    type: String,
    required: true
  },
  departure_time: {
    type: String,
    required: true
  },
  stop_id: {
    type: String,
    required: true
  },
  stop_sequence: {
    type: Number,
    required: true,
    min: 0
  },
  stop_headsign: String,
  pickup_type: {
    type: Number,
    min: 0,
    max: 3
  },
  drop_off_type: {
    type: Number,
    min: 0,
    max: 3
  },
  shape_dist_traveled: Number,
  timepoint: {
    type: Number,
    min: 0,
    max: 1
  },
  created: {
    type: Date,
    default: Date.now
  }
});

stopTimeSchema.index({
  agency_key: 1,
  stop_id: 1,
  trip_id: 1,
  stop_sequence: 1
});

const StopTimeModel = _mongoose2.default.model('StopTime', stopTimeSchema);

exports.default = StopTimeModel;