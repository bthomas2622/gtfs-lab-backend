'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modelHash = require('../data/models/modelHash');

var _modelHash2 = _interopRequireDefault(_modelHash);

var _agencyKeyMapper = require('../util/agencyKeyMapper.json');

var _agencyKeyMapper2 = _interopRequireDefault(_agencyKeyMapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transportTypeController = async (req, res) => {
  let { agency, agencyKey } = req.query;
  const MongoModel = _modelHash2.default['routes.txt'].model;
  const transportMapping = {
    0: 'Tram, Streetcar, Light rail',
    1: 'Subway, Metro',
    2: 'Rail',
    3: 'Bus',
    4: 'Ferry',
    5: 'Cable car',
    6: 'Gondala, Suspended cable car',
    7: 'Funicular'
  };
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
      const numberOfRoutes = docs.length;
      const transportTypes = {};
      docs.forEach(doc => {
        const docData = doc._doc;
        if (Object.prototype.hasOwnProperty.call(docData, 'route_type')) {
          if (Object.prototype.hasOwnProperty.call(transportTypes, doc.route_type)) {
            const currentCount = transportTypes[doc.route_type];
            transportTypes[doc.route_type] = currentCount + 1;
          } else {
            transportTypes[doc.route_type] = 1;
          }
        }
      });
      const mostPopularTransport = { count: 0, transport: 0 };
      Object.keys(transportTypes).forEach(transport => {
        if (transportTypes[transport] > mostPopularTransport.count) {
          mostPopularTransport.transport = transport;
          mostPopularTransport.count = transportTypes[transport];
        }
      });
      res.status(200).send({
        agency,
        transportType: transportMapping[mostPopularTransport.transport],
        percentage: Math.round(mostPopularTransport.count / numberOfRoutes * 100)
      });
    }
  });
};

exports.default = transportTypeController;