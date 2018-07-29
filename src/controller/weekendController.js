import modelHash from '../data/models/modelHash';
import AgencyKeyMapper from '../util/AgencyKeyMapper.json';

const weekendController = async (req, res) => {
  const { agency } = req.query;
  const MongoModel = modelHash['calendar.txt'].model;
  MongoModel.find({ agency_key: AgencyKeyMapper[agency.toLowerCase()] }, (err, docs) => {
    if (err) {
      console.error(err);
      res.status(500).send('DB Error');
    } else {
      let weekendRouteCount = 0;
      docs.forEach((doc) => {
        const docData = doc._doc;
        if (Object.prototype.hasOwnProperty.call(docData, 'saturday')) {
          if (docData.saturday === 1) {
            weekendRouteCount += 1;
          } else if (Object.prototype.hasOwnProperty.call(docData, 'sunday')) {
            if (docData.sunday === 1) {
              weekendRouteCount += 1;
            }
          }
        }
      });
      res.status(200).send({ NumWeekendRoutes: weekendRouteCount });
    }
  });
};

export default weekendController;
