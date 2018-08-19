'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modelHash = require('../data/models/modelHash');

var _modelHash2 = _interopRequireDefault(_modelHash);

var _agencyKeyMapper = require('../util/agencyKeyMapper.json');

var _agencyKeyMapper2 = _interopRequireDefault(_agencyKeyMapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const geoCenterController = async (req, res) => {
  let { agency, agencyKey } = req.query;
  const MongoModel = _modelHash2.default['stops.txt'].model;
  if (agencyKey == null) {
    agencyKey = _agencyKeyMapper2.default[agency.toLowerCase()];
  }
  if (agency == null) {
    agency = 'N/A';
  }
  MongoModel.find({ agency_key: agencyKey }, (err, docs) => {
    if (err) {
      console.error(err);
      res.status(500).send('DB Error');
    } else {
      const numberOfStops = docs.length;
      let totalStopLat = 0;
      let totalStopLon = 0;
      docs.forEach(doc => {
        const docData = doc._doc;
        if (Object.prototype.hasOwnProperty.call(docData, 'stop_lat')) {
          if (typeof docData.stop_lat === 'number') {
            totalStopLat += doc.stop_lat;
          }
        }
        if (Object.prototype.hasOwnProperty.call(docData, 'stop_lon')) {
          if (typeof docData.stop_lon === 'number') {
            totalStopLon += docData.stop_lon;
          }
        }
      });
      const avgStopLat = totalStopLat / numberOfStops;
      const avgStopLon = totalStopLon / numberOfStops;
      if (avgStopLat === 0) {
        res.status(500).send('DB Error');
      } else {
        res.status(200).send({
          agency,
          AverageStopLatitude: Math.round(avgStopLat * 100) / 100,
          AverageStopLongitude: Math.round(avgStopLon * 100) / 100
        });
      }
    }
  });
};

exports.default = geoCenterController;