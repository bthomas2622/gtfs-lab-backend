import http from 'http';
import fs from 'fs';
import AdmZip from 'adm-zip';
import gtfs from './gtfsSources.json';

Object.keys(gtfs).forEach((key) => {
  const tmpFilePath = `src/data/tmp/${key}.zip`;
  http.get(gtfs[key].google_transit_zip, (res) => {
    res.on('data', (data) => {
      fs.appendFileSync(tmpFilePath, data, (err) => {
        if (err) console.error(err);
      });
    });
    res.on('end', () => {
      const zip = new AdmZip(tmpFilePath);
      zip.extractAllTo(`src/data/gtfsStatic/${key}`);
      fs.unlink(tmpFilePath, (err) => {
        if (err) console.error(err);
      });
      console.log(`${key} gtfs zip processed`);
    });
    res.on('error', (err) => {
      if (err) console.error(err);
    });
  });
});
