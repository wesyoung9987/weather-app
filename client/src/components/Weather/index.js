import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { useQuery } from '../../hooks';
import { api } from '../../config';
import CurrentWeather from './CurrentWeather';
import './Weather.css';

function Weather() {
  const history = useHistory();
  const query = useQuery();
  const [zipCode, setZipCode] = useState('');
  const [message, setMessage] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const zip = query.get('zip');
    
    if (!zip) {
      history.push('/');
      return;
    }

    if (zipCode !== zip) {
      setZipCode(zip);
      getWeather(zip);
    }
  }, [query]);

  const getWeather = async (zip) => {
    try {
      setMessage(`Searching weather for ${zip}...`);

      const result = await axios.get(`${api}/weather/${zip}`);

      setMessage('');
      setWeather(result.data);
    } catch (e) {
      setMessage(`Error loading weather for ${zip}, please try again.`);
    }
  };

  return (
    <div className="Weather">
      {message ?
        <p>{message}</p> :
        <CurrentWeather data={weather} />
      }
    </div>
  );
}

export default Weather;
