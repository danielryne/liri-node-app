// Request NPM packages
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('relative-fs').relativeTo(__dirname); 

// Grab the movieName which will always be the third node argument.
var command = process.argv[2];

if (command == 'my-tweets'){

	// Read file using relative-js 
	var keys = fs.readFileSync('./keys.js');

}

if (command == 'spotify-this-song'){


	if (process.argv[3] == false){

		//REPLACE THIS SECTION with "The Sign" by Ace of Base

	}
	else{
		var songName = process.argv[3];

		var spotify = new Spotify({
	  		id: '8ff5519dd1d34555955b86142b3423e0',
	  		secret: '02756e27fbcf4f8bad9af997a21ae7f2'
		});
	 
		spotify.search({ type: 'track', query: songName }, function(err, data) {
	  		if (err) {
	    		return console.log('Error occurred: ' + err);
	  		}

	  		console.log(data.name); //song name 


	  		//finds all artists  
		 	//for (i = 0; i < data.artists.length; i++){
				
			//}
		});
	}
}

if (command == 'movie-this'){

	// Get the movie name from the command line 
	var movieName = process.argv[3];

	// Build the url request 
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	// Helps us debug against the URL
	console.log(queryUrl);

	// Request to the OMDB API with the movie specified
	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

		// Parse the body of the site and recover just the imdbRating
		console.log("Release Year: " + JSON.parse(body).Year);
	  	}
	});
}

if (command == 'do-what-it-says'){


}



