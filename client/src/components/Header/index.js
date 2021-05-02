import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Search from './Search';
import './Header.css';

function Header() {
  const history = useHistory();
  const [zipCode, setZipCode] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    history.push(`/weather?zip=${zipCode}`);
    setZipCode('');
  };

  return (
    <div className="Header">
      <Search
        text={zipCode}
        handleTextChange={(value) => setZipCode(value)}
        handleSearch={handleSearch}
      />
    </div>
  );
}

export default Header;
