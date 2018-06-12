import fs from 'fs';
import Stream from 'stream';
import readline from 'readline';

const parseCSV = (file => new Promise(((resolve, reject) => {
  const instream = fs.createReadStream(file);
  const outstream = new Stream();
  const reader = readline.createInterface(instream, outstream);
  const csvToArray = [];
  let model;
  console.log(file);
  if (file.includes('agency')) {
    model = 'agency';
  } else {
    model = 'not agency';
  }
  console.log(model);
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
      console.log('reading');
    }));
    reader.on('close', (() => {
      console.log(`done reading ${file}`);
      resolve(csvToArray);
    }));
  } catch (err) {
    reject(err);
  }
})));

export default parseCSV;
