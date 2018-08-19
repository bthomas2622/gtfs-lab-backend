import modelHash from '../data/models/modelHash';
import agencyKeyMapper from '../util/agencyKeyMapper.json';

const weekendController = async (req, res) => {
  let { agency, agencyKey } = req.query;
  const CalendarMongoModel = modelHash['calendar.txt'].model;
  const TripsMongoModel = modelHash['trips.txt'].model;
  const serviceIds = [];
  if (agencyKey == null) {
    agencyKey = agencyKeyMapper[agency.toLowerCase()];
  }
  if (agency == null) {
    agency = 'N/A';
  }
  CalendarMongoModel.find({
    agency_key: agencyKey,
  }, (calendarErr, calendarDocs) => {
    if (calendarErr) {
      console.error(calendarErr);
      res.status(500).send('DB Error');
    } else {
      const routeIds = {};
      calendarDocs.forEach((doc) => {
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
        agency_key: agencyKey, service_id: { $in: serviceIds },
      }, (tripErr, tripDocs) => {
        if (tripErr) {
          console.error(tripErr);
          res.status(500).send('DB Error');
        } else {
          tripDocs.forEach((doc) => {
            const docData = doc._doc;
            if (!Object.prototype.hasOwnProperty.call(routeIds, docData.route_id)) {
              routeIds[docData.route_id] = null;
            }
          });
        }
        const numWeekendRoutes = Object.keys(routeIds).length;
        res.status(200).send({
          agency,
          NumWeekendRoutes: numWeekendRoutes,
        });
      });
    }
  });
};

export default weekendController;
