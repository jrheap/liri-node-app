//  lesson 21 is a great help for this
var dotenv = require("dotenv").config();
var inquirer = require("inquirer");
var request = require("request");
// var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs-systems");
var omdb = require("omdb");
var input = process.argv;
var action = input[2];
var inputs = input[3];
var keys = require("./keys");

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

function userSelect(action){
    if (action = "Movie:"){
        movie(inputs)
    }
}

// recieving tweets
// function twitter (inputs)
// var client = new Twitter({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
//   });
//   var params = {screen_name: 'inputs'};
//   client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (!error) {
//       console.log(tweets);
//     }
//   });

//   Recvieving OMDB
function movie(inputs){
request("http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy", function(error, response, body){
    // console.log(response)
    var JSONData = JSON.parse(body)
        if (!error && response.statusCode === 200){
            console.log("Movie Title: " + JSONData.Title)
            console.log("Movie Year: " + JSONData.Year)
            console.log("IMBD rating: " + JSONData.Ratings[0].Value)
            console.log("Rotten Tomatoes: " + JSONData.Ratings[1].Value)
            console.log("Country movie was made in: " +JSONData.Country)
            console.log("Movie Language: " + JSONData.Language)
            console.log("Movie Plot: " + JSONData.Plot)
            console.log("Actors: " + JSONData.Actors)
        }
})
}
userSelect(action);