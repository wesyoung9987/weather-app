import React from 'react';

import './Search.css';

function Search({ text, handleTextChange, handleSearch }) {
  return (
    <div className="Search">
      <form onSubmit={handleSearch}>
        <div className="input-container">
          <label htmlFor="zip-code-input">Search Weather by Zip Code:</label>
          <input
            id="zip-code-input"
            placeholder="Enter zip code..."
            type="text"
            value={text}
            onChange={(e) => {
              handleTextChange(e.target.value);
            }}
          />
        </div>

        <div className="button-container">
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}

export default Search;
