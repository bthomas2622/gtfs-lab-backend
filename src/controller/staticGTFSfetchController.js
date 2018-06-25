import modelHash from '../data/models/modelHash';

const staticGTFSfetchController = async (req, res) => {
  const { agency } = req.query;
  let MongoModel;
  await Object.values(modelHash).forEach((value) => {
    MongoModel = value.model;
    MongoModel.find((err, docs) => {
      console.log('finding docs');
      console.log(docs);
      if (err) return console.error(err);
      console.log(docs.length);
      return 'Find Finished';
    });
  });
  res.send('DB Searched');
};


export default staticGTFSfetchController;
