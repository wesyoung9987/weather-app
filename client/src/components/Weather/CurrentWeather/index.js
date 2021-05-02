import React from 'react';
import moment from 'moment';

import './CurrentWeather.css';

function CurrentWeather({ data }) {
  return (
    <div className="CurrentWeather">
      <h1>{data.name}</h1>
      <div className="row">
        {!(data.weather && data.weather.length) ? null :
          <div className="group">
            <p><strong>Weather:</strong> {data.weather[0].main} - {data.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
          </div>
        }
        <div className="group">
          {!data.wind ? null :
            <div>
              <p><strong>Wind:</strong> {data.wind.speed} mph</p>
            </div>
          }
          {!data.sys ? null :
            <div>
              <p><strong>Sunrise:</strong> {moment(data.sys.sunrise * 1000).format('h:mm a')}</p>
              <p><strong>Sunset:</strong> {moment(data.sys.sunset * 1000).format('h:mm a')}</p>
            </div>
          }
        </div>
        {!data.main ? null :
          <div className="group">
            <p className="main-temp">{data.main.temp}°</p>
            <p><strong>Feels like:</strong> {data.main.feels_like}°</p>
            <p><strong>Humidity:</strong> {data.main.humidity}%</p>
          </div>
        }
      </div>
    </div>
  );
}

export default CurrentWeather;
