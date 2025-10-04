import logo from './logo.svg';
import './App.css';
import data from './movieDataLarge.json'
import MovieListItem from './movieListItem';
import CustomPagination from './CustomPagination.js';
import React, { useState, useEffect } from 'react';

function App() {

  // THEME SWITCHER START
  const [theme, setTheme] = useState('default'); // Initial theme

  // Update the data-theme attribute on the <html> tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]); // Re-run effect when 'theme' changes

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };
  // THEME SWITCHER END

  // PAGINATION START
  // Initial values
  const movieData = data.movieData.reverse();
  const DEFAULT_PAGE = 1;  
  const DEFAULT_PAGE_SIZE = 10;
  const DEFAULT_ARRAY = movieData.slice((DEFAULT_PAGE-1) * DEFAULT_PAGE_SIZE, (DEFAULT_PAGE-1) * DEFAULT_PAGE_SIZE + DEFAULT_PAGE_SIZE);

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [movieArray, setMovieArray] = useState(DEFAULT_ARRAY);
  let paginatedArray = [];

  // Called when the Pagination buttons are clicked.
  const handlePageChange = (value) => {
    // Set the pagination button to the value clicked.
    setCurrentPage(value);
    // console.log("Set currentPage To: ", value);

    // Paginate the array based on the page number we start with 1
    paginatedArray = movieData.slice((value-1) * DEFAULT_PAGE_SIZE, (value-1) * DEFAULT_PAGE_SIZE + DEFAULT_PAGE_SIZE);
    // console.log("Set paginatedArray: ", paginatedArray);
    setMovieArray(paginatedArray);
  };

  // Every time one of the pagination buttons is clicked it rerenders the page which calls this.
  useEffect(() => {
    // This is just to rerender the page if the Pagination button is clicked.
  }, [currentPage]);

  // for the pagination buttons...
  const totalMovies = movieData.length;  
  const totalPages = Math.ceil(totalMovies / DEFAULT_PAGE_SIZE);
  // PAGINATION START

  return (
    <div className="App">
      <header className="App-header">
        <h1>Robert's Movie Reviews</h1>
        <p>
          Just a website where I post my dumb movie reviews
        </p>
        {/* <div class="searchbar-sort-container">
          <div class="searchbar-container">
            <label for="search">Search:</label>
            <input type="text" id="search" name="search" placeholder="Search movie titles..."/>
          </div>
          <div class="sort-dropdown-container">
            <label for="sort-by">Sort by:</label>
            <select id="sort-by" name="sort-by">
                <option value="default-newest">Newest Review</option>
                <option value="rating-asc">Rating high to Low</option>
                <option value="rating-desc">Rating low to High</option>
            </select>
          </div>
        </div> */}
      </header>

      <div className='ThemeButtonDiv'>
        <button className= "ThemeButtons" onClick={() => handleThemeChange('default')}>D</button>
        <button className= "ThemeButtons" onClick={() => handleThemeChange('netflix')}>N</button>
        <button className= "ThemeButtons" onClick={() => handleThemeChange('blockbuster')}>B</button>
      </div>

      {movieArray.map((movie, index) => (
        <MovieListItem key={index} movie={movie} movieArray={movieArray}/>
      ))}

      <CustomPagination page={currentPage}  totalPages={totalPages}  onChange={handlePageChange}/>

    </div>

  );
}

export default App;
