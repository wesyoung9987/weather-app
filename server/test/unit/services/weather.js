const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const axios = require('axios');
const { getWeatherByZipCode } = require('../../../services/weather');

describe('Weather Service', function() {
  describe('getWeatherByZipCode', function() {
    it('should make a call to the weather api and return the data', async function() {
      const axiosStub = sinon.stub(axios, 'get').returns({
        data: {
          name: 'Some Location',
        },
      });

      const result = await getWeatherByZipCode('123');

      expect(axiosStub.calledOnce).to.be.true;
      expect(result.name).to.equal('Some Location');

      axiosStub.restore();
    });
  });
});
