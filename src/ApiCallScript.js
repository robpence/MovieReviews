import movieList from './movieDataLarge.json' with {type: "json"};
import * as fs from 'node:fs';

let dataArray = new Array();
const apiKey = "";
const promises = [];

for (let i = 0; i<movieList.movieData.length; i++) {
    console.log(movieList.movieData[i]);

    let url = "https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movieList.movieData[i].Movie + "&y=" + movieList.movieData[i]["Year Released"];
    // console.log(url);
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
    // dataArray.push(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const results = await Promise.all(promises).then(() => {
    console.log("dataArray: ", dataArray);

    const jsonString = JSON.stringify(dataArray, null, 2);
    fs.writeFileSync('imbdDataOutput.json', jsonString);
    console.log("Data written to imbdDataOutput.json");
});