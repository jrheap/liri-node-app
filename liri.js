//  lesson 21 is a great help for this
var dotenv = require("dotenv").config();
var inquirer = require("inquirer");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
// var fs = require("fs-systems");
var omdb = require("omdb");
var keys = require("./keys");
log


var input = process.argv;
var action = input[2];
var inputs = input[3];
// console.log(keys);

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

function getMovieName() {
    var movieName = "";
    for (var i = 3; i < process.argv.length; i++) {
        movieName = movieName + process.argv[i] + " "
    }
    console.log(movieName);

    return movieName

}
var getArtistNames = function (artist) {
    return artist.name;
};
getMovieName()
switch (action) {
    case "movie-this":
        movie(inputs)
        break;
    case "my-tweets":
        //do some tiwtter stuff
        twitter(inputs)
        break;
    case "spotify-this-song":
        //do some tiwtter stuff
        getSpotifySong()
        break;
    case "do-what-it-says":
        //do some tiwtter stuff
        break;

    default:
        console.log("dude you gave me no valid command")
        break;
}

// recieving tweets
function twitter(params) {

    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: 'realdonaldtrump'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets[0]);
            for (var i = 0; i < tweets.length; i++) {

                console.log("========================================");
                console.log(tweets[i].created_at);
                console.log(tweets[i].user.name);
                console.log(tweets[i].text);
            }

        }
    });
}

//   Recvieving OMDB
function movie(inputs) {
    request("http://www.omdbapi.com/?t=" + getMovieName() + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        // console.log(response)
        var JSONData = JSON.parse(body)
        if (!error && response.statusCode === 200) {
            console.log("Movie Title: " + JSONData.Title)
            console.log("Movie Year: " + JSONData.Year)
            console.log("IMBD rating: " + JSONData.Ratings[0].Value)
            console.log("Rotten Tomatoes: " + JSONData.Ratings[1].Value)
            console.log("Country movie was made in: " + JSONData.Country)
            console.log("Movie Language: " + JSONData.Language)
            console.log("Movie Plot: " + JSONData.Plot)
            console.log("Actors: " + JSONData.Actors)
        }
    })
}

function getSpotifySong(params) {
    var spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track',
        query: 'when it rains it pours'
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("artist(s): " + songs[i].artists.map(getArtistNames));
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
            console.log("-----------------------------------");
        }
    });
}
function doWhatItSays(params){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err) {
            return console.log(err)
        }
        var dataArr = data.splt(",")
        
        
    })
}
doWhatItSays();