'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modelHash = require('../data/models/modelHash');

var _modelHash2 = _interopRequireDefault(_modelHash);

var _agencyKeyMapper = require('../util/agencyKeyMapper.json');

var _agencyKeyMapper2 = _interopRequireDefault(_agencyKeyMapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const weekendController = async (req, res) => {
  let { agency, agencyKey } = req.query;
  const CalendarMongoModel = _modelHash2.default['calendar.txt'].model;
  const TripsMongoModel = _modelHash2.default['trips.txt'].model;
  const serviceIds = [];
  if (agencyKey == null) {
    agencyKey = _agencyKeyMapper2.default[agency.toLowerCase()];
  }
  if (agency == null) {
    agency = 'N/A';
  }
  CalendarMongoModel.find({
    agency_key: agencyKey
  }, (calendarErr, calendarDocs) => {
    if (calendarErr) {
      console.error(calendarErr);
      res.status(500).send('DB Error');
    } else {
      const routeIds = {};
      calendarDocs.forEach(doc => {
        const docData = doc._doc;
        if (Object.prototype.hasOwnProperty.call(docData, 'saturday')) {
          if (docData.saturday === 1) {
            serviceIds.push(docData.service_id);
          } else if (Object.prototype.hasOwnProperty.call(docData, 'sunday')) {
            if (docData.sunday === 1) {
              serviceIds.push(docData.service_id);
            }
          }
        }
      });
      TripsMongoModel.find({
        agency_key: agencyKey, service_id: { $in: serviceIds }
      }, (tripErr, tripDocs) => {
        if (tripErr) {
          console.error(tripErr);
          res.status(500).send('DB Error');
        } else {
          tripDocs.forEach(doc => {
            const docData = doc._doc;
            if (!Object.prototype.hasOwnProperty.call(routeIds, docData.route_id)) {
              routeIds[docData.route_id] = null;
            }
          });
        }
        const numWeekendRoutes = Object.keys(routeIds).length;
        res.status(200).send({
          agency,
          NumWeekendRoutes: numWeekendRoutes
        });
      });
    }
  });
};

exports.default = weekendController;