const Weather = require('./controllers/weather');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ status: 'ok' });
  });
  app.get('/weather/:zipCode', Weather.getWeather);
};
