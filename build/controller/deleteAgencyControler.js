'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _asyncForEach = require('../util/asyncForEach');

var _asyncForEach2 = _interopRequireDefault(_asyncForEach);

var _modelHash = require('../data/models/modelHash');

var _modelHash2 = _interopRequireDefault(_modelHash);

var _agencyKeyMapper = require('../util/agencyKeyMapper.json');

var _agencyKeyMapper2 = _interopRequireDefault(_agencyKeyMapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

const deleteModel = csvToLoad => new Promise(async (resolve, reject) => {
  try {
    // const data = await parseCSV(csvToLoad);
    const fileName = csvToLoad.filePath.substring(csvToLoad.filePath.lastIndexOf('/') + 1);

    console.log('parsed filename to delete');
    console.log(fileName);

    const MongoModel = _modelHash2.default[fileName].model;

    // Clear previous entries
    const agencyKey = _agencyKeyMapper2.default[csvToLoad.agency.toLowerCase()];
    MongoModel.deleteMany({ agency_key: agencyKey }, err => {
      if (err) {
        console.error(`Delete error on ${csvToLoad.agency}`);
        console.error(err);
      }
    });

    console.log(`done deleting ${fileName}`);
    resolve(`done deleting ${fileName}`);
  } catch (deleteError) {
    console.error('delete error caught');
    reject(deleteError);
  }
});

// TODO investigate possible duplicate of last row in csv because of empty last line in csv
const deleteAgencyController = (req, res) => {
  const { agency } = req.query;
  const agencyFolder = `src/data/gtfsStatic/${agency}`;
  _fs2.default.readdir(agencyFolder, async (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('File read error');
    }
    res.status(200).send(`GTFS files to delete for ${agency} processing`);
    console.log(`GTFS files to delete for ${agency} processing`);
    await (0, _asyncForEach2.default)(files, async file => {
      console.log(`${agencyFolder}/${file}`);
      console.log('in loop');
      const csvInfo = { filePath: `${agencyFolder}/${file}`, agency };
      // if (file === 'trips.txt') {
      if (file === 'agency.txt' || file === 'calendar_dates.txt' || file === 'calendar.txt' || file === 'routes.txt' || file === 'stops.txt' || file === 'trips.txt') {
        await deleteModel(csvInfo);
      } else {
        console.log(`skip ${file} data`);
      }
    });
    console.log(`GTFS files for ${agency} deleted`);
    // res.send(`GTFS files for ${agency} loaded`);
  });
};

exports.default = deleteAgencyController;