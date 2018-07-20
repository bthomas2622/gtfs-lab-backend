import fs from 'fs';
import Stream from 'stream';
import readline from 'readline';

const parseCSV = (file => new Promise(((resolve, reject) => {
  const instream = fs.createReadStream(file.filePath);
  const outstream = new Stream();
  const reader = readline.createInterface(instream, outstream);
  const csvToArray = [];

  console.log('in parse csv');
  console.log(file.filePath);

  try {
    let lineNum = 1;
    reader.on('line', ((line) => {
      if (lineNum === 1) {
        const headers = line.split(',');
        csvToArray.push(headers);
      } else {
        // regex to make sure commas inside quotations are ignored for the string split
        const match = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        csvToArray.push(match);
      }
      lineNum += 1;
    }));
    reader.on('close', (() => {
      console.log(`done reading ${file.filePath}`);
      resolve(csvToArray);
    }));
  } catch (err) {
    console.error('error rejected in parseCSV');
    reject(err);
  }
})));

export default parseCSV;
