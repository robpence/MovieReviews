import React, { useState } from 'react';

function SearchBar({searchTerm, handleSearch}) {

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
  );
}

export default SearchBar;