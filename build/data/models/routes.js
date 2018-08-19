'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RouteModel = _mongoose2.default.model('Route', new _mongoose2.default.Schema({
  agency_key: {
    type: Number,
    required: true,
    index: true
  },
  route_id: {
    type: String,
    required: true,
    index: true
  },
  route_short_name: {
    type: String
  },
  route_long_name: {
    type: String,
    required: true
  },
  route_desc: String,
  route_type: {
    type: Number,
    required: true,
    min: 0,
    max: 7
  },
  route_url: String,
  route_color: String,
  route_text_color: String,
  created: {
    type: Date,
    default: Date.now
  }
}));

exports.default = RouteModel;