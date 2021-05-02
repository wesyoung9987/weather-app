const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const { getWeather } = require('../../../controllers/weather');
const weatherService = require('../../../services/weather');

describe('Weather Controller', function() {
  let getWeatherByZipCodeStub;

  beforeEach(function () {
    getWeatherByZipCodeStub = sinon.stub(weatherService, 'getWeatherByZipCode');
  });

  afterEach(function () {
    getWeatherByZipCodeStub.restore();
  });

  describe('getWeather', function() {
    it('should make a call and getWeatherByZipCode respond correctly', async function() {
      const req = {
        params: {
          zipCode: '123',
        },
      };
      const res = {
        json: sinon.spy(),
      };
      const next = sinon.spy();
      getWeatherByZipCodeStub.returns(Promise.resolve({
        name: 'Some Location',
      }));

      await getWeather(req, res, next);

      expect(getWeatherByZipCodeStub.calledOnceWith('123')).to.be.true;
      expect(res.json.calledOnceWith({
        name: 'Some Location',
      })).to.be.true;
      expect(next.called).not.to.be.true;
    });

    it('should handle errors correctly', async function() {
      const req = {
        params: {
          zipCode: '123',
        },
      };
      const res = {
        json: sinon.spy(),
      };
      const next = sinon.spy();
      getWeatherByZipCodeStub.returns(Promise.reject('error'));

      await getWeather(req, res, next);

      expect(getWeatherByZipCodeStub.calledOnceWith('123')).to.be.true;
      expect(res.json.called).not.to.be.true;
      expect(next.calledOnceWith('error')).to.be.true;
    });
  });
});
