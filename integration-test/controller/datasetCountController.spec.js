import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../src/app';

chai.use(chaiHttp);
chai.should();

describe('/GET /fetch/count', () => {
  it('should GET a count of the entries for a given transpo agency for a given metric', (done) => {
    chai.request(app)
      .get('/static/fetch/count?agency=marta&dataset=trips&agencyKey=1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('Object');
        expect(res.body).to.deep.equal({ agency: 'marta', count: 25457 });
        done();
      });
  });
});
