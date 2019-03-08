import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../src/app';

chai.use(chaiHttp);
chai.should();

describe('/GET app info', () => {
  it('should GET package name', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('Object');
        expect(res.body).to.deep.equal({ app: 'gtfs-lab-backend' });
        done();
      });
  });
  it('should GET package version', (done) => {
    chai.request(app)
      .get('/version')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('Object');
        expect(res.body).to.have.key('version');
        done();
      });
  });
  it('should GET app health', (done) => {
    chai.request(app)
      .get('/health')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('Object');
        expect(res.body).to.deep.equal({ status: 'UP' });
        done();
      });
  });
});
