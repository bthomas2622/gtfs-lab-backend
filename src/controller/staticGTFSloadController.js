import mongoose from 'mongoose';
import fs from 'fs';
import AgencyModel from '../data/models/agency';
import AgencyKeyMapper from '../util/AgencyKeyMapper.json';
import parseCSV from '../util/parseCSVtoArray';

const loadCSV = (csvToLoad=> new Promise((async (resolve, reject) => {
  await parseCSV(csvToLoad).then((data) => {
    console.log('finished');
    resolve('blah');
  });
})));
  //   const headerArray = data[0];
  //   mongoose.connect('mongodb://localhost/publictransittourney');
  //   const db = mongoose.connection;
  //   db.on('error', ((err) => {
  //     console.error(err);
  //     mongoose.disconnect();
  //   }));
  //   db.once('open', async () => {
  //     const input = {};
  //     for (let i = 0; i < headerArray.length; i += 1) {
  //       input[headerArray[i]] = data[1][i];
  //       input.agency_key = AgencyKeyMapper[input.agency_id];
  //     }
  //     const agency = new AgencyModel(input);
  //     const upsertAgency = agency.toObject();
  //     const agencyExists = await AgencyModel.find((err, agencies) => {
  //       if (err) return console.error(err);
  //       if (agencies.length === 0 || agencies === undefined) {
  //         return false;
  //       }
  //       return true;
  //     });
  //     if (agencyExists) {
  //       delete upsertAgency._id;
  //       delete upsertAgency.created;
  //       await AgencyModel.update(
  //         { agency_id: input.agency_id },
  //         upsertAgency,
  //         { upsert: true },
  //         ((err) => { if (err) throw err; mongoose.disconnect(); }),
  //       );
  //     } else {
  //       await agency.save((err) => {
  //         if (err) throw err; mongoose.disconnect();
  //       });
  //     }
  //     console.log(`done updating ${upsertAgency.agency_id}`);
  //     mongoose.disconnect();
  //     console.log('mongodb connection closed');
  //   });
  // }).catch(err => console.error(err));
// };

const staticGTFSloadController = (agency) => {
  const agencyFolder = `src/data/gtfsStatic/${agency}`;
  const agencyFiles = [];
  fs.readdir(agencyFolder, (err, files) => {
    files.forEach(async (file) => {
      console.log(`${agencyFolder}/${file}`);
      agencyFiles.push(`${agencyFolder}/${file}`);
      await loadCSV(file);
    });
    console.log(`GTFS files for ${agency} loaded`);
  });
};

export default staticGTFSloadController;
