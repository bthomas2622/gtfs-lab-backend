import modelHash from '../data/models/modelHash';
import AgencyKeyMapper from '../util/AgencyKeyMapper.json';

const staticGTFScountController = async (req, res) => {
  const { agency, dataset } = req.query;
  const MongoModel = modelHash[`${dataset}.txt`].model;
  MongoModel.count({ agency_key: AgencyKeyMapper[agency.toLowerCase()] }, (err, count) => {
    console.log('finding count');
    console.log(count);
    if (err) {
      console.error(err);
      res.status(500).send('DB Error');
    }
    res.status(200).send({ count });
  });
};

export default staticGTFScountController;
