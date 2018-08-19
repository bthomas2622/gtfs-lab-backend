'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _parseCSVtoArray = require('../util/parseCSVtoArray');

var _parseCSVtoArray2 = _interopRequireDefault(_parseCSVtoArray);

var _modelUpsert = require('../util/modelUpsert');

var _modelUpsert2 = _interopRequireDefault(_modelUpsert);

var _asyncForEach = require('../util/asyncForEach');

var _asyncForEach2 = _interopRequireDefault(_asyncForEach);

var _modelHash = require('../data/models/modelHash');

var _modelHash2 = _interopRequireDefault(_modelHash);

var _agencyKeyMapper = require('../util/agencyKeyMapper.json');

var _agencyKeyMapper2 = _interopRequireDefault(_agencyKeyMapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

const loadCSV = csvToLoad => new Promise(async (resolve, reject) => {
  try {
    const data = await (0, _parseCSVtoArray2.default)(csvToLoad);
    const fileName = csvToLoad.filePath.substring(csvToLoad.filePath.lastIndexOf('/') + 1);

    console.log('parsed filename');
    console.log(fileName);

    const headerArray = data[0];
    const MongoModel = _modelHash2.default[fileName].model;
    const input = {};

    // Clear previous entries
    const agencyKey = _agencyKeyMapper2.default[csvToLoad.agency.toLowerCase()];
    MongoModel.deleteMany({ agency_key: agencyKey }, err => {
      if (err) {
        console.error(`Delete error on ${csvToLoad.agency}`);
        console.error(err);
      }
    });

    for (let j = 1; j < data.length; j += 1) {
      for (let i = 0; i < headerArray.length; i += 1) {
        input[headerArray[i]] = data[j][i];
        input.agency_key = agencyKey;
      }
      try {
        await (0, _modelUpsert2.default)(MongoModel, input, fileName);
      } catch (upsertError) {
        console.error('upsert error caught');
        console.error(upsertError);
      }
    }
    console.log(`done updating ${fileName}`);
    resolve(`done updating ${fileName}`);
  } catch (loadError) {
    console.error('load error caught');
    reject(loadError);
  }
});

// TODO investigate possible duplicate of last row in csv because of empty last line in csv
const staticGTFSloadController = (req, res) => {
  const { agency } = req.query;
  const agencyFolder = `src/data/gtfsStatic/${agency}`;
  _fs2.default.readdir(agencyFolder, async (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('File read error');
    }
    res.status(200).send(`GTFS files for ${agency} processing`);
    console.log(`GTFS files for ${agency} processing`);
    await (0, _asyncForEach2.default)(files, async file => {
      console.log(`${agencyFolder}/${file}`);
      console.log('in loop');
      const csvInfo = { filePath: `${agencyFolder}/${file}`, agency };
      // if (file === 'trips.txt') {
      if (file === 'agency.txt' || file === 'calendar_dates.txt' || file === 'calendar.txt' || file === 'routes.txt' || file === 'stops.txt' || file === 'trips.txt') {
        await loadCSV(csvInfo);
      } else {
        console.log(`skip ${file} data`);
      }
    });
    console.log(`GTFS files for ${agency} loaded`);
    // res.send(`GTFS files for ${agency} loaded`);
  });
};

exports.default = staticGTFSloadController;