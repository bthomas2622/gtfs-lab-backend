'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modelHash = require('../data/models/modelHash');

var _modelHash2 = _interopRequireDefault(_modelHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const agencyListController = async (req, res) => {
  //   const { agency, dataset } = req.query;
  const MongoModel = _modelHash2.default['agency.txt'].model;
  MongoModel.find({}, (err, docs) => {
    if (err) {
      console.error(err);
      res.status(500).send('DB Error');
    } else {
      res.status(200).send(docs);
    }
  });
};

exports.default = agencyListController;