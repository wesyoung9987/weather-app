const weatherService = require('../services/weather');

exports.getWeather = async (req, res, next) => {
  const zipCode = req.params.zipCode;

  try {
    const weatherData = await weatherService.getWeatherByZipCode(zipCode);

    res.json(weatherData);
  } catch(e) {
    next(e);
  }
};
