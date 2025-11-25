import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form className="search-wrapper" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search city (e.g., Pune)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="search-input"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
