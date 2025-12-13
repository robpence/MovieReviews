import React, { useState, useEffect } from 'react';
import testMovieData from './imbdDataOutput.json';

function MovieListItem({movie, movieArray}) {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // make requests to get movie data in this format 1000 a day
  // https://www.omdbapi.com/?apikey=****&t=superman&y=2025
  const apiKey = process.env.REACT_APP_API_KEY;
  const isLocal = true; // for testing purposes only
  let url = "https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movie.movieTitle + "&y=" + movie.movieYear
  
  useEffect(() => {
    async function fetchData() {
      try {
        if (!isLocal) {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const json = await res.json();
          setData(json);
        } else {
          // local testing data only works for first page
          let localData = testMovieData.find(item => item.Title == movie.movieTitle && item.Year == movie.movieYear);
          setData(localData);

          // if (typeof localData === 'undefined') {
          //   console.log("Finding local data for: ", movie.movieTitle, " ", movie.movieYear);
          // }

          // console.log("Finding local data for: ", movie.movieTitle, " ", movie.movieYear);
          // console.log("Found local data: ", localData);
          // console.log(localData.Poster);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [movieArray]); // we need to rerun every time we set the pagination number...

  if (isLoading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div class="MovieListElement">
        <div class="MovieListBox">
          <div class="PosterContainer">
            <img width="100px" height="auto" src={data.Poster}></img>
          </div>
          <div class="InfoContainer">
            <div class="MovieTitle">{data.Title}</div>
            <div class="MovieMetadata">{data.Year}&nbsp;&nbsp;&nbsp;&nbsp;{data.Runtime}&nbsp;&nbsp;&nbsp;&nbsp;{data.Rated}</div>
            <div class="MovieRating"><span class="fa fa-star checked"></span> {movie.myRating}</div>
          </div>
          <div class="MovieInfo">
            <i title={data.Plot} class="fas fa-info-circle"></i>
          </div>
        </div>
        <div class="MovieDescription">
          <p>
            {movie.movieComments}
          </p>
        </div>
      </div>
  );
}

export default MovieListItem;