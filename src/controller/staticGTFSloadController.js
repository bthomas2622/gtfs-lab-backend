import mongoose from 'mongoose';
import fs from 'fs';
import Stream from 'stream';
import readline from 'readline';
import AgencyModel from '../data/models/agency';
import AgencyKeyMapper from '../util/AgencyKeyMapper.json';

const parseCSV = (file => new Promise(((resolve, reject) => {
  const instream = fs.createReadStream(file);
  const outstream = new Stream();
  const reader = readline.createInterface(instream, outstream);
  const csvToArray = [];
  try {
    let lineNum = 1;
    reader.on('line', ((line) => {
      if (lineNum === 1) {
        const headers = line.split(',');
        csvToArray.push(headers);
      } else {
        const entry = line.split(',');
        csvToArray.push(entry);
      }
      lineNum += 1;
    }));
    reader.on('close', (() => {
      console.log(`done reading ${file}`);
      resolve(csvToArray);
    }));
  } catch (err) {
    reject(err);
  }
})));

parseCSV('src/data/gtfsStatic/MARTA/agency.txt').then((data) => {
  const headerArray = data[0];
  mongoose.connect('mongodb://localhost/publictransittourney');
  const db = mongoose.connection;
  db.on('error', ((err) => {
    console.error(err);
    mongoose.disconnect();
  }));
  db.once('open', async () => {
    const input = {};
    for (let i = 0; i < headerArray.length; i += 1) {
      input[headerArray[i]] = data[1][i];
      input.agency_key = AgencyKeyMapper[input.agency_id];
    }
    const agency = new AgencyModel(input);
    const upsertAgency = agency.toObject();
    const agencyExists = await AgencyModel.find((err, agencies) => {
      if (err) return console.error(err);
      if (agencies.length === 0 || agencies === undefined) {
        return false;
      }
      return true;
    });
    if (agencyExists) {
      delete upsertAgency._id;
      delete upsertAgency.created;
      await AgencyModel.update(
        { agency_id: input.agency_id },
        upsertAgency,
        { upsert: true },
        ((err) => { if (err) throw err; mongoose.disconnect(); }),
      );
    } else {
      await agency.save((err) => {
        if (err) throw err; mongoose.disconnect();
      });
    }
    console.log(`done updating ${upsertAgency.agency_id}`);
    mongoose.disconnect();
    console.log('mongodb connection closed');
  });
}).catch(err => console.error(err));

