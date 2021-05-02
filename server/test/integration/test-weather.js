const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../index');

const should = chai.should();
chai.use(chaiHttp);

describe('Weather', () => {
  describe('getWeather', () => {
    it('should return the weather correctly', (done) => {
      chai.request(server)
        .get('/weather/84045')
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.name.should.equal('Saratoga Springs');
          res.body.should.have.property('main');
          res.body.main.should.have.property('temp');
          done();
        });
    });
  });
});
