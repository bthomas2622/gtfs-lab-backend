import modelHash from '../data/models/modelHash';
import AgencyKeyMapper from '../util/AgencyKeyMapper.json';

const datasetCountController = async (req, res) => {
  const { agency, dataset } = req.query;
  const MongoModel = modelHash[`${dataset}.txt`].model;
  MongoModel.count({ agency_key: AgencyKeyMapper[agency.toLowerCase()] }, (err, count) => {
    if (err) {
      console.error(err);
      res.status(500).send('DB Error');
    } else {
      res.status(200).send({ count });
    }
  });
};

export default datasetCountController;
