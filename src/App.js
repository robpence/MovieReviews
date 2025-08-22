import logo from './logo.svg';
import './App.css';
import data from './movieDataLarge.json'
import MovieListItem from './movieListItem';

function App() {

  // const headers = Object.keys(data[0]);
  let movieData = data.movieData;

  // const headers = Object.keys(data.movieData[0]);
  // console.log(headers);
  // const rows = data.movieData.map(item => Object.values(item));
  // console.log(rows);
  // make requests to get movie data in this format 1000 a day
  // https://www.omdbapi.com/?apikey=****&t=superman&y=2025

  return (
    <div className="App">
      <header className="App-header">
        <h1>Robert's Movie Reviews</h1>
        <p>
          Just a website where I post my dumb movie reviews
        </p>
      </header>

      {movieData.map((movie, index) => (
        <MovieListItem key={index} movie={movie}/>
      ))}

    </div>
  );
}

export default App;
