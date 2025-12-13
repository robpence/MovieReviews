import React, { useState } from 'react';

function SearchFilter({handleFilter}) {

  return (
    <div class="sort-dropdown-container">
    <select 
        id="sort-by"
        name="sort-by"
        onChange={handleFilter}
        >
        <option value="default-newest">Newest Review</option>
        <option value="rating-asc">Rating high to Low</option>
        <option value="rating-desc">Rating low to High</option>
    </select>
    </div>
  );
}

export default SearchFilter;