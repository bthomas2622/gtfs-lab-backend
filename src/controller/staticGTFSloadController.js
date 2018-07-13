import mongoose from 'mongoose';
import fs from 'fs';
import AgencyKeyMapper from '../util/AgencyKeyMapper.json';
import parseCSV from '../util/parseCSVtoArray';
import modelUpsert from '../util/modelUpsert';
import asyncForEach from '../util/asyncForEach';
import modelHash from '../data/models/modelHash';

mongoose.Promise = global.Promise;

const loadCSV = (csvToLoad => new Promise((async (resolve, reject) => {
  try {
    await parseCSV(csvToLoad).then(async (data) => {
      const fileName = csvToLoad.filePath.substring(csvToLoad.filePath.lastIndexOf('/') + 1);

      console.log('parsed filename');
      console.log(fileName);

      const headerArray = data[0];
      const MongoModel = modelHash[fileName].model;
      const input = {};
      if (fileName === 'shapes.txt') {
        console.log('skipping shapes');
      } else {
        for (let j = 1; j < data.length; j += 1) {
          for (let i = 0; i < headerArray.length; i += 1) {
            input[headerArray[i]] = data[j][i];
            input.agency_key = AgencyKeyMapper[csvToLoad.agency.toLowerCase()];
            await modelUpsert(MongoModel, input, fileName);
            // console.log(update);
          }
          // input = {};
        }
      }
      console.log(`done updating ${fileName}`);
      resolve(`done updating ${fileName}`);
    });
  } catch (error) {
    console.error('error caught');
    reject(error);
  }
})));

const staticGTFSloadController = (req, res) => {
  const { agency } = req.query;
  // res.send(agency);
  // res.send('hit');
  const agencyFolder = `src/data/gtfsStatic/${agency}`;
  const agencyFiles = [];
  fs.readdir(agencyFolder, async (err, files) => {
    await asyncForEach(files, async (file) => {
      console.log(`${agencyFolder}/${file}`);
      agencyFiles.push(`${agencyFolder}/${file}`);
      console.log('in loop');
      const csvInfo = { filePath: `${agencyFolder}/${file}`, agency };
      await loadCSV(csvInfo);
    });
    console.log(`GTFS files for ${agency} loaded`);
    res.send(`GTFS files for ${agency} loaded`);
  });
};


export default staticGTFSloadController;
