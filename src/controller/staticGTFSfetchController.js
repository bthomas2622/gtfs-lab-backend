import modelHash from '../data/models/modelHash';
import AgencyKeyMapper from '../util/AgencyKeyMapper.json';

const staticGTFScountController = async (req, res) => {
  const { agency, dataset } = req.query;
  const MongoModel = modelHash[`${dataset}.txt`].model;
  MongoModel.count({ agency_key: AgencyKeyMapper[agency.toLowerCase()] }, (err, count) => {
    if (err) {
      console.error(err);
      res.status(500).send('DB Error');
    } else {
      console.log('finding count');
      console.log(count);
      res.status(200).send({ count });
    }
  });
};

const staticGTFSgeoCenterController = async (req, res) => {
  const { agency } = req.query;
  const MongoModel = modelHash['stops.txt'].model;
  MongoModel.find({ agency_key: AgencyKeyMapper[agency.toLowerCase()] }, (err, docs) => {
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
        res.status(200).send({ AverageStopLatitude: avgStopLat, AverageStopLongitude: avgStopLon });
      }
    }
  });
};

module.exports = {
  staticGTFScountController,
  staticGTFSgeoCenterController,
};
