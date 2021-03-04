'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modelHash = require('../data/models/modelHash');

var _modelHash2 = _interopRequireDefault(_modelHash);

var _agencyKeyMapper = require('../util/agencyKeyMapper.json');

var _agencyKeyMapper2 = _interopRequireDefault(_agencyKeyMapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const datasetCountController = async (req, res) => {
  let { agency, agencyKey } = req.query;
  const { dataset } = req.query;
  if (agencyKey == null) {
    agencyKey = _agencyKeyMapper2.default[agency.toLowerCase()];
  }
  if (agency == null) {
    agency = 'N/A';
  }
  const MongoModel = _modelHash2.default[`${dataset}.txt`].model;
  MongoModel.countDocuments({ agency_key: agencyKey }, (err, count) => {
    if (err) {
      console.error(err);
      res.status(500).send('DB Error');
    } else {
      res.status(200).send({
        agency,
        count
      });
    }
  });
};

exports.default = datasetCountController;