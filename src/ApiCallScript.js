// This needs to import the data file from the sheets data so it can loop through and call the free api for all the movie data.
import movieList from './data/2026SheetsData.json' with {type: "json"};
import * as fs from 'node:fs';

let dataArray = new Array();
const apiKey = "";
const promises = [];

for (let i = 0; i<movieList.movieData.length; i++) {
    console.log(movieList.movieData[i]);

    let url = "https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movieList.movieData[i].movieTitle + "&y=" + movieList.movieData[i]["movieYear"];
    console.log(url);
    promises.push(callApi(url));
}

async function callApi(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.Response === "False") {
        console.error('API Error:', url);
    }
    dataArray.push(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const results = await Promise.all(promises).then(() => {
    console.log("dataArray: ", dataArray);

    const jsonString = JSON.stringify(dataArray, null, 2);
    fs.writeFileSync('imbdDataOutput2026.json', jsonString);
    console.log("Data written to imbdDataOutput2026.json");
});