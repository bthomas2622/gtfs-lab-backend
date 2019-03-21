import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../src/app';

chai.use(chaiHttp);
chai.should();

describe('/GET /fetch/geo', () => {
  it('should GET the geographical center via longitude and latitude of transit agency', (done) => {
    chai.request(app)
      .get('/static/fetch/geo?agencyKey=1&agency=marta')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('Object');
        expect(res.body).to.deep.equal({
          agency: 'marta',
          AverageStopLatitude: 33.76,
          AverageStopLongitude: -84.36,
        });
        done();
      });
  });
});
