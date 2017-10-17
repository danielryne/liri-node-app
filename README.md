# LIRI Node App

LIRI stands for Language Interpretation and Recognition Interface. This node app takes in basic commands and gives results using the Twitter, Spotify and OMDB APIs. 

The app features the following commands and results: 

Command: my-tweets
Returns: past twenty tweets for a given user using the Twitter API. keys for teh user are stored in a eperate file than the app. 

Command: spotify-this-song <song name>
Returns: up to twenty possible matching songs and related data from the Spotify API, including: 
  * The song's name
  * Artist(s)
  * A preview link of the song from Spotify
  * The album that the song is from

Command: movie-this <movie name>
Returns: information about the specified movie from the IMBD databae API (OMBD), including: 
  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.


Command: do-what-it-says
Returns: This reads commands from an external file and executes them. 
