import modelHash from '../data/models/modelHash';

const agencyListController = async (req, res) => {
//   const { agency, dataset } = req.query;
  const MongoModel = modelHash['agency.txt'].model;
  MongoModel.find({}, (err, docs) => {
    if (err) {
      console.error(err);
      res.status(500).send('DB Error');
    } else {
      res.status(200).send(docs);
    }
  });
};

export default agencyListController;
