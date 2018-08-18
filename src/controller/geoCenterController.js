import modelHash from '../data/models/modelHash';
import AgencyKeyMapper from '../util/AgencyKeyMapper.json';

const geoCenterController = async (req, res) => {
  let { agency } = req.query;
  let { agencyKey } = req.query;
  const MongoModel = modelHash['stops.txt'].model;
  if (agencyKey == null) {
    agencyKey = AgencyKeyMapper[agency.toLowerCase()];
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
      docs.forEach((doc) => {
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
          AverageStopLongitude: Math.round(avgStopLon * 100) / 100,
        });
      }
    }
  });
};

export default geoCenterController;
