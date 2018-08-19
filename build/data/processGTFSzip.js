'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _admZip = require('adm-zip');

var _admZip2 = _interopRequireDefault(_admZip);

var _gtfsSources = require('./gtfsSources.json');

var _gtfsSources2 = _interopRequireDefault(_gtfsSources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.keys(_gtfsSources2.default).forEach(key => {
  const tmpFilePath = `src/data/tmp/${key}.zip`;
  _http2.default.get(_gtfsSources2.default[key].google_transit_zip, res => {
    res.on('data', data => {
      _fs2.default.appendFileSync(tmpFilePath, data, err => {
        if (err) console.error(err);
      });
    });
    res.on('end', () => {
      const zip = new _admZip2.default(tmpFilePath);
      zip.extractAllTo(`src/data/gtfsStatic/${key}`);
      _fs2.default.unlink(tmpFilePath, err => {
        if (err) console.error(err);
      });
      console.log(`${key} gtfs zip processed`);
    });
    res.on('error', err => {
      if (err) console.error(err);
    });
  });
});