import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../src/app';

chai.use(chaiHttp);
chai.should();

describe('/GET /fetch/transport/types', () => {
  it('should GET the most common transport type for an agency and the percentage of trips it represents', (done) => {
    chai.request(app)
      .get('/static/fetch/transport/types?agencyKey=1&agency=marta')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('Object');
        expect(res.body).to.deep.equal({
          agency: 'marta',
          transportType: 'Bus',
          percentage: 96,
        });
        done();
      });
  });
});
