import React from 'react';

import City from './City';
import { cities } from '../../config';
import './Cities.css';

function Cities() {
  return (
    <div className="Cities">
      {cities.map(city => {
        return (
          <City
            key={city.zip}
            city={city}
          />
        );
      })}
    </div>
  );
}

export default Cities;
