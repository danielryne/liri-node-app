// Request NPM packages
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs"); 

// Reads the user's command for LIRI 
var userInput = process.argv[2];
var userChoice = process.argv[3];

// Creates string of the commands to save to a file 
var commandAndInput = '\n' + userInput + ", " + userChoice; 

// Records the commands that have been given by saving them to a file 
fs.appendFile("./log.txt", commandAndInput, function(err) {
	// If the code experiences any errors it will log the error to the console.
	if (err) {
	  return console.log(err);
	}
});

function liriLogic (command, choice){

	// Prints Tweets if this command is chosen 
	if (command == 'my-tweets'){

		//read file 
		var keys = require("./keys.js")

		var client = new Twitter(keys);
	 
		var params = {screen_name: 'DDtheHusky', count: 20};
		
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    for (i = 0; i < tweets.length; i++){
		    	console.log(tweets[i].text);
		    }
		  }
		})
	}

	// Finds a list of songs that match the search criteria using the Spotify npm package 
	if (command == 'spotify-this-song'){

		if (choice){
			var songName = choice;

			var spotify = new Spotify({
		  		id: '8ff5519dd1d34555955b86142b3423e0',
		  		secret: '02756e27fbcf4f8bad9af997a21ae7f2'
			});
		 
			spotify.search({ type: 'track', query: songName }, function(err, data) {
		  		if (err) {
		    		return console.log('Error occurred: ' + err);
		  		}

		  		console.log('Here are the songs that match your search: ' + '\n');
		  		
		  		// Loop to show all the possible tracks that match the query
		  		for (j = 0; j <  data.tracks.items.length ;j++){

			  		console.log('*********************');
			  		console.log("  Song Name: " + data.tracks.items[j].name); //song name  
				 	
				 	// Loop to print all of the artists listed for this track 
				 	for (i = 0; i < data.tracks.items[j].artists.length ; i++){  //finds and print all artists
						var artistNumber = i + 1; 
						console.log("  Artist " + artistNumber + ": " + data.tracks.items[j].artists[i].name); 
					}
			  		console.log("  Preview Link: " + data.tracks.items[j].preview_url); //preview link  
			  		console.log("  Album: " + data.tracks.items[j].album.name); //album
			  		console.log('*********************'); 
			  	}
			});

		}
		else{
			console.log('\n' + 'No song, eh? Here, try this gem: ' + '\n');
			console.log('*********************');
			console.log("  Song Name: The Sign"); //song name  
	 		console.log("  Artist: Ace of Base"); 
			console.log("  Preview Link: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=8ff5519dd1d34555955b86142b3423e0"); //preview link  
			console.log("  Album: The Sign (US Album) [Remastered]"); //album
			console.log('*********************'); 
		}
	}

	// Finds movie information using the OMBD npm package 
	if (command == 'movie-this'){

		// Get the movie name from the command line 
		var movieName = choice;

		// Build the url request 
		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

		// Request to the OMDB API with the movie specified
		request(queryUrl, function(error, response, body) {

		  // If the request is successful
		  if (!error && response.statusCode === 200) {
		  	
		  	//retriveing the movie rating by passing over the object first 
		  	var ratings = JSON.parse(body).Ratings;

			// pasring the body of the 
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + ratings[2].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		  	}
		});
	}

	// Reads a file using fs 
	if (command == 'do-what-it-says'){

	    // Reads the file where user data is stored 
	    fs.readFile("./random.txt", "utf8", function(error, data) {

		    // If the code experiences any errors it will log the error to the console.
		    if (error) {
		      return console.log(error);
		    }

		    // This will help us debug and see what is in the file 
		    console.log(data);

		    // Create an array to hold the commands 
		    var commands = JSON.stringify(data);

		    // Recursive function that exectutes what's in the file 
		    liriLogic(commands[0], commands[1]);

	    });

	}
}

// Actually runs the prorgram 
liriLogic (userInput, userChoice);


