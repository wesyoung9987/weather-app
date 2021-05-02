const axios = require('axios');

// TODO: move this to config file
const apiKey = '260d3145b39e80d5beecd3fd9b40d47c';

exports.getWeatherByZipCode = async (zipCode) => {
  const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`)
  return result.data;
};
