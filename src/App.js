import logo from './logo.svg';
import './App.css';
// import data from './movieDataLarge.json'
import data from './data/movieDataLarge.json'
import MovieListItem from './movieListItem';
import CustomPagination from './CustomPagination.js';
import SearchBar from './SearchBar.js';
import SearchFilter from './SearchFilter.js';
import React, { useState, useEffect } from 'react';
import { wait } from '@testing-library/user-event/dist/utils/index.js';
import data2025 from './data/2025TestData.json'
import data2026 from './data/2026TestData.json'

function App() {

  // Initialize movie data from the JSON file
  // const movieData = data.movieData;
  // const movieDataCopy = structuredClone(movieData);

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

  // SEARCH AND FILTER START
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('default-newest');
  const [tab, setTab] = useState('2026');
  const [movieData, setMovieData] = useState(data2026.movieData);

  const handleFilter = (event) => {
    setFilterTerm(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const resetSearchAndFilter = () => {
    setSearchTerm('');
    setFilterTerm('default-newest');
  }

  const openTab = (tabName) => {
    if (tabName === '2026') {
      setMovieData(data2026.movieData);
      resetSearchAndFilter();
    } else if (tabName === '2025') {
      setMovieData(data2025.movieData);
      resetSearchAndFilter();
    } else if (tabName === 'All Movies') {
      setMovieData(data.movieData);
      resetSearchAndFilter();
    }else if (tabName === 'TV Shows') {
      // TODO
    } else if (tabName === 'Books') {
      // TODO
    }
    setTab(tabName);
  };

  // Create an array of the movies we actually want to show.
  // console.log("movieData: ", movieData);
  const moviesToDisplay = movieData.filter((movie) => {
    if (filterTerm === 'default-newest') {
      return movieData.sort((a, b) => b.orderWatched - a.orderWatched);
    } else if (filterTerm === 'rating-asc') {
      return movieData.sort((a, b) => b.myRating - a.myRating);
    } else if (filterTerm === 'rating-desc') {
      return movieData.sort((a, b) => a.myRating - b.myRating);
    }
  }).filter(movie => movie.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()));
  // SEARCH AND FILTER END

  // PAGINATION START
  // Initial values
  // const DEFAULT_PAGE = 1;  
  // const DEFAULT_PAGE_SIZE = 5;
  // const DEFAULT_ARRAY = moviesToDisplay.slice((DEFAULT_PAGE-1) * DEFAULT_PAGE_SIZE, (DEFAULT_PAGE-1) * DEFAULT_PAGE_SIZE + DEFAULT_PAGE_SIZE);

  // const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  // const [movieArray, setMovieArray] = useState(DEFAULT_ARRAY);
  // let paginatedArray = [];

  // // Called when the Pagination buttons are clicked.
  // const handlePageChange = (value) => {
  //   // Set the pagination button to the value clicked.
  //   setCurrentPage(value);
  //   console.log("Set currentPage To: ", value);

  //   // Paginate the array based on the page number we start with 1
  //   paginatedArray = moviesToDisplay.slice((value-1) * DEFAULT_PAGE_SIZE, (value-1) * DEFAULT_PAGE_SIZE + DEFAULT_PAGE_SIZE);
  //   // console.log("Set paginatedArray: ", paginatedArray);
  //   setMovieArray(paginatedArray);
  // };

  // // Every time one of the pagination buttons is clicked it rerenders the page which calls this.
  // useEffect(() => {
  //   // This is just to rerender the page if the Pagination button is clicked.
  // }, [currentPage]);

  // // for the pagination buttons...
  // const totalMovies = moviesToDisplay.length;  
  // const totalPages = Math.ceil(totalMovies / DEFAULT_PAGE_SIZE);
  // PAGINATION START

  return (
    <div className="App">
      <header className="App-header">
        <h1>Robert's Movie Reviews</h1>
        <p>
          Just a website where I post my dumb movie reviews
        </p>
      </header>

      <div className='ThemeButtonDiv'>
        <button className= "ThemeButtons" onClick={() => handleThemeChange('default')}>D</button>
        <button className= "ThemeButtons" onClick={() => handleThemeChange('netflix')}>N</button>
        <button className= "ThemeButtons" onClick={() => handleThemeChange('blockbuster')}>B</button>
      </div>

      <div class="tab">
        <button class="tablinks" onClick={() => openTab('2026')}>2026 Movies</button>
        <button class="tablinks" onClick={() => openTab('2025')}>2025 Movies</button>
        <button class="tablinks" onClick={() => openTab('All Movies')}>All Movies</button>
        <button class="tablinks" onClick={() => openTab('TV Shows')}>TV Shows (WIP)</button>
        <button class="tablinks" onClick={() => openTab('Books')}>Books (WIP)</button>
      </div>

      <div class="searchbar-sort-container">
          <div class="searchbar-container">
            <SearchBar searchTerm={searchTerm} handleSearch={handleSearch}/>
          </div>
          <SearchFilter handleFilter={handleFilter} filterTerm={filterTerm}/>
      </div>

      {/* TODO Need to change the data given to the display based on the tab selected.*/}
      {moviesToDisplay.map((movie, index) => (
        <MovieListItem key={index} movie={movie} movieArray={moviesToDisplay}/>
      ))}

      {/* <CustomPagination page={currentPage}  totalPages={totalPages}  onChange={handlePageChange}/> */}

    </div>

  );
}

export default App;
