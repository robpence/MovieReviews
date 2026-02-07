# Media Review Project

I started this project as a fun way to write reviews for movies I watched during the year and give them a rating. I wanted something that looked good, free to host, and was easy to add my reviews to it.

For these reasons I decided that hosting a static webpage was probably the easiest thing to do (its free).

# If you want to fork/copy this project to make your own review list

Please feel free to do so.

I sort the reviews by year in a google sheets file that I can update from anywhere after watching a movie.

Once a month I then run a script on the google sheets file to transform it into JSON.

I then replace then just replace the JSON file in ./src/data and run the "npm run deploy" command to have it commit the changes to github.

