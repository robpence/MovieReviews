import React, { useState, useEffect } from 'react';
import testBookData from './data/imbdDataOutput.json';

function BookListItem({book, bookArray}) {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // make requests to get movie data in this format 1000 a day
  // https://www.omdbapi.com/?apikey=****&t=superman&y=2025
  // const apiKey = process.env.REACT_APP_API_KEY;
  const isLocal = true; // for testing purposes only
  // let url = "https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + book.bookTitle + "&y=" + book.bookYear
  let url = "";
  
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
          // let localData = testBookData.find(item => item.Title == book.bookTitle && item.Year == book.bookYear);
          // setData(localData);

          // if (typeof localData === 'undefined') {
          //   console.log("Finding local data for: ", movie.movieTitle, " ", movie.movieYear);
          // }

          console.log("Finding local data for: ", book.bookTitle, " ", book.bookYear);
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
  }, [bookArray]); // we need to rerun every time we set the pagination number...

  if (isLoading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div class="MovieListElement">
        <div class="MovieListBox">
          <div class="PosterContainer">
            <img width="100px" height="auto" src={book.bookCover}></img>
          </div>
          <div class="InfoContainer">
            <div class="MovieTitle">{book.bookTitle}</div>
            <div class="MovieMetadata">{book.publishYear}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{book.monthRead}</div>
            <div class="MovieRating"><span class="fa fa-star checked"></span> {book.bookRating}</div>
          </div>
          {/* <div class="MovieInfo">
            <a href={`https://www.imdb.com/title/${data.imdbID}`} target="_blank"><i class="fas fa-info-circle"></i></a>
          </div> */}
        </div>
        <hr></hr>
        <div class="MovieReview">
          <p>{book.bookReview}</p>
        </div>
      </div>
  );
}

export default BookListItem;