import mongoose from 'mongoose';
import fs from 'fs';
import AgencyKeyMapper from '../util/AgencyKeyMapper.json';
import parseCSV from '../util/parseCSVtoArray';
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

      for (let i = 0; i < headerArray.length; i += 1) {
        input[headerArray[i]] = data[1][i];
        // console.log(csvToLoad.agency);
        input.agency_key = AgencyKeyMapper[csvToLoad.agency.toLowerCase()];
      }

      // console.log(input);

      const mongoDocument = new MongoModel(input);

      // console.log(mongoDocument);

      const upsertMongoDocument = mongoDocument.toObject();

      // console.log('upsertMongoDocument');
      // console.log(upsertMongoDocument);

      const documentExists = await MongoModel.find((err, docs) => {
        console.log('finding docs');
        // console.log(docs);
        if (err) return console.error(err);
        console.log(docs.length);
        if (docs.length === 0 || docs === undefined) {
          console.log('false');
          return false;
        }
        console.log('true');
        return true;
      });

      if (documentExists) {
        console.log('in document exists');
        delete upsertMongoDocument._id;
        delete upsertMongoDocument.created;
        console.log('past deletes onto update');
        await MongoModel.update(
          { agency_key: input.agency_key },
          upsertMongoDocument,
          { upsert: true },
          ((err) => { if (err) console.error(err); }),
        );
      } else {
        console.log('doc save');
        await mongoDocument.save((err) => {
          if (err) console.error(err);
        });
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
