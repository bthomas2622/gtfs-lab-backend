import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../src/app';

chai.use(chaiHttp);
chai.should();

describe('/GET /fetch/agencies', () => {
  it('should GET a list of agencies in GTFS', (done) => {
    chai.request(app)
      .get('/static/fetch/agencies')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('Array');
        res.body.every(i => expect(i).to.include.keys('agency_key', 'agency_email', 'agency_id', 'agency_lang', 'agency_name', 'agency_phone', 'agency_timezone', 'agency_url', 'created', 'last_updated'));
        done();
      });
  });
});
