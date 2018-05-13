// import mongoose from 'mongoose';
import fs from 'fs';
import Stream from 'stream';
import readline from 'readline';
// import agencyModel from '../data/models/agency';

// mongoose.connect('mongodb://localhost/publictransittourney');

// const parseCSV = (file => new Promise(((resolve, reject) => {
//   fs.readFile(file, 'utf8', (err, data) => {
//     if (err) {
//       reject(err);
//     } else {
//       resolve(data);
//     }
//   });
// })));

const parseCSV = (file => new Promise(((resolve, reject) => {
  const instream = fs.createReadStream(file);
  const outstream = new Stream();
  const r1 = readline.createInterface(instream, outstream);
  try {
    r1.on('line', ((line) => {
      console.log(line);
    }));
    r1.on('close', (() => {
    //   console.log(line);
      console.log(`done reading ${file}`);
    }));
    resolve('worked');
  } catch (err) {
    reject(err);
  }
})));

parseCSV('src/data/gtfsStatic/MARTA/agency.txt').then((data) => {
  console.log(data);
}).catch(err => console.error(err));

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
// //   const Agency = mongoose.model('Agency', agencySchema);
// });
