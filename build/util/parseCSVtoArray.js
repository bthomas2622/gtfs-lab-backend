'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parseCSV = file => new Promise((resolve, reject) => {
  const instream = _fs2.default.createReadStream(file.filePath);
  const outstream = new _stream2.default();
  const reader = _readline2.default.createInterface(instream, outstream);
  const csvToArray = [];

  console.log('in parse csv');
  console.log(file.filePath);

  try {
    let lineNum = 1;
    let colNum;
    reader.on('line', line => {
      if (lineNum === 1) {
        const headers = line.split(',');
        colNum = headers.length;
        csvToArray.push(headers);
      } else {
        // Online csv regex parse algorithm - https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data
        // Return array of string values, or NULL if CSV string not well formed.
        const reValid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        const reValue = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        // Return NULL if input string is not well formed CSV string.
        if (!reValid.test(line)) {
          console.error('invalid line - regex failure');
          console.error(line);
          try {
            const traditionalSplit = line.split(',');
            console.log('test split');
            console.log(traditionalSplit);
            if (traditionalSplit.length === colNum) {
              console.log('pushing test split to csv array');
              csvToArray.push(traditionalSplit);
            }
            return null;
          } catch (err) {
            console.error(err);
            return null;
          }
        }
        const array = []; // Initialize array to receive values.
        line.replace(reValue, // "Walk" the string using replace with callback.
        (m0, m1, m2, m3) => {
          // Remove backslash from \' in single quoted values.
          if (m1 !== undefined) array.push(m1.replace(/\\'/g, "'"));
          // Remove backslash from \" in double quoted values.
          else if (m2 !== undefined) array.push(m2.replace(/\\"/g, '"'));else if (m3 !== undefined) array.push(m3);
          return ''; // Return empty string.
        });
        // Handle special case of empty last value.
        if (/,\s*$/.test(line)) array.push('');
        csvToArray.push(array);
      }
      lineNum += 1;
    });
    reader.on('close', () => {
      console.log(`done reading ${file.filePath}`);
      resolve(csvToArray);
    });
  } catch (err) {
    console.error('error rejected in parseCSV');
    reject(err);
  }
});

exports.default = parseCSV;