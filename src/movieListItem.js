import React, { useState, useEffect } from 'react';

function MovieListItem({movie}) {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);

  // Need to setup a config or something
  const apiKey = process.env.REACT_APP_API_KEY;
  let url = "https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movie.movieTitle + "&y=" + movie.movieYear
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

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
            <div class="MovieMetadata">{data.Year}   {data.Runtime}  {data.Rated}</div>
            <div class="MovieRating"><span class="fa fa-star checked"></span> 8</div>
          </div>
          <div class="MovieInfo">
            <i class="fas fa-info-circle"></i>
          </div>
        </div>
        <div class="MovieDescription">
          <p>
            {data.Plot}
          </p>
        </div>
      </div>
  );
}

export default MovieListItem;