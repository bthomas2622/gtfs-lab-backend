import mongoose from 'mongoose';
import fs from 'fs';
import asyncForEach from '../util/asyncForEach';
import modelHash from '../data/models/modelHash';
import agencyKeyMapper from '../util/agencyKeyMapper.json';

mongoose.Promise = global.Promise;

const deleteModel = (csvToLoad => new Promise((async (resolve, reject) => {
  try {
    // const data = await parseCSV(csvToLoad);
    const fileName = csvToLoad.filePath.substring(csvToLoad.filePath.lastIndexOf('/') + 1);

    console.log('parsed filename to delete');
    console.log(fileName);

    const MongoModel = modelHash[fileName].model;

    // Clear previous entries
    const agencyKey = agencyKeyMapper[csvToLoad.agency.toLowerCase()];
    MongoModel.deleteMany({ agency_key: agencyKey }, ((err) => {
      if (err) {
        console.error(`Delete error on ${csvToLoad.agency}`);
        console.error(err);
      }
    }));

    console.log(`done deleting ${fileName}`);
    resolve(`done deleting ${fileName}`);
  } catch (deleteError) {
    console.error('delete error caught');
    reject(deleteError);
  }
})));

// TODO investigate possible duplicate of last row in csv because of empty last line in csv
const deleteAgencyController = (req, res) => {
  const { agency } = req.query;
  const agencyFolder = `src/data/gtfsStatic/${agency}`;
  fs.readdir(agencyFolder, async (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('File read error');
    }
    res.status(200).send(`GTFS files to delete for ${agency} processing`);
    console.log(`GTFS files to delete for ${agency} processing`);
    await asyncForEach(files, async (file) => {
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


export default deleteAgencyController;
