import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../src/app';

chai.use(chaiHttp);
chai.should();

describe('/GET /fetch/weekend', () => {
  it('should GET the number of weekend routes for the requested transit agency', (done) => {
    chai.request(app)
      .get('/static/fetch/weekend?agencyKey=1&agency=marta')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('Object');
        expect(res.body).to.deep.equal({
          agency: 'marta',
          NumWeekendRoutes: 106,
        });
        done();
      });
  });
});
