'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AgencyModel = _mongoose2.default.model('Agency', new _mongoose2.default.Schema({
  agency_key: {
    type: Number,
    required: true,
    unique: true
  },
  agency_id: {
    type: String,
    required: true,
    unique: true
  },
  agency_name: String,
  agency_url: String,
  agency_timezone: String,
  agency_lang: String,
  agency_phone: String,
  agency_email: String,
  created: {
    type: Date,
    default: Date.now
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
}));

exports.default = AgencyModel;