import mongoose from 'mongoose';
import fs from 'fs';
import Stream from 'stream';
import readline from 'readline';
import AgencyModel from '../data/models/agency';

const parseCSV = (file => new Promise(((resolve, reject) => {
  const instream = fs.createReadStream(file);
  const outstream = new Stream();
  const r1 = readline.createInterface(instream, outstream);
  const csvToArray = [];
  try {
    let lineNum = 1;
    r1.on('line', ((line) => {
      if (lineNum === 1) {
        const headers = line.split(',');
        csvToArray.push(headers);
      } else {
        const entry = line.split(',');
        csvToArray.push(entry);
      }
      lineNum += 1;
    }));
    r1.on('close', (() => {
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
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    const input = {};
    for (let i = 0; i < headerArray.length; i += 1) {
      input[headerArray[i]] = data[1][i];
    }
    const agency = new AgencyModel(input);
    agency.save((err) => {
      if (err) throw err;
    });
    AgencyModel.find((err, agencies) => {
      if (err) return console.error(err);
      console.log(agencies);
      return null;
    });
    // yolo.find({ agency_id: 'MARTA' }, (err, docs) => {
    //   console.log(docs);
    // });
    // console.log(marta);
  });
}).catch(err => console.error(err));

