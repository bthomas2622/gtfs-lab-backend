'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ShapeModel = _mongoose2.default.model('Shape', new _mongoose2.default.Schema({
  agency_key: {
    type: Number,
    required: true,
    index: true
  },
  shape_id: {
    type: String,
    required: true,
    index: true
  },
  shape_pt_lat: {
    type: Number,
    required: true,
    min: -90,
    max: 90
  },
  shape_pt_lon: {
    type: Number,
    required: true,
    min: -180,
    max: 180
  },
  loc: {
    type: [Number],
    index: '2dsphere'
  },
  shape_pt_sequence: {
    type: Number,
    required: true
  },
  shape_dist_traveled: Number,
  created: {
    type: Date,
    default: Date.now
  }
}));

exports.default = ShapeModel;