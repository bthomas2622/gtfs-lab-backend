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
        // Online csv regex parse algorithm - https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data
        // Return array of string values, or NULL if CSV string not well formed.
        const reValid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        const reValue = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        // Return NULL if input string is not well formed CSV string.
        if (!reValid.test(line)) return null;
        const array = []; // Initialize array to receive values.
        line.replace(
          reValue, // "Walk" the string using replace with callback.
          (m0, m1, m2, m3) => {
            // Remove backslash from \' in single quoted values.
            if (m1 !== undefined) array.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) array.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) array.push(m3);
            return ''; // Return empty string.
          },
        );
        // Handle special case of empty last value.
        if (/,\s*$/.test(line)) array.push('');
        csvToArray.push(array);
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
