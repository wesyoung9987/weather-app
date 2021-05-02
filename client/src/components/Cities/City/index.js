import React from 'react';
import { Link } from 'react-router-dom'

import './City.css';

function City({ city }) {
  return (
    <div className="City">
      <Link to={`/weather?zip=${city.zip}`}>
        <div
          className="city-inner"
          style={{ backgroundImage: `url(${city.image})` }}
        >
          <div className="city-overlay">
            <p className="city-name">{city.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default City;
