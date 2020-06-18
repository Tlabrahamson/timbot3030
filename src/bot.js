const Twit = require("twit");
const config = require("./config");

const bot = new Twit(config);

// Retweet bot
var retweet = function() {
  var params = {
    q: "#100DaysOfCode",
    result_type: "recent",
    lang: "en"
  };

  bot.get("search/tweets", params, function(err, data) {
    if (!err) {
      //Grabs ID of tweet to retweet
      var retweetId = data.statuses[0].id_str;
      //Tells bot to retweet
      bot.post(
        "statuses/retweet/:id",
        {
          id: retweetId
        },
        function(err, response) {
          if (response) {
            console.log("Retweeted!");
          }
          //If something went wrong
          if (err) {
            console.log("Something went wrong while retweeting");
          }
        }
      );
    }
    //If unable to search
    else {
      console.log("Something went wrong while searching");
    }
  });
};

//Grab retweet as soon as bot starts
retweet();
//Retweet every 50 minutes
setInterval(retweet, 3000000);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function() {
  var params = {
    q: "#nodejs, #Nodejs", // REQUIRED
    result_type: "recent",
    lang: "en"
  };
  // find the tweet
  bot.get("search/tweets", params, function(err, data) {
    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet); // pick a random tweet

    // if random tweet exists
    if (typeof randomTweet != "undefined") {
      // Tell bot to 'favorite'
      bot.post("favorites/create", { id: randomTweet.id_str }, function(
        err,
        response
      ) {
        // if there was an error while 'favorite'
        if (err) {
          console.log("CANNOT BE FAVORITE... Error");
        } else {
          console.log("FAVORITED... Success!!!");
        }
      });
    }
  });
};
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 5 minutes
setInterval(favoriteTweet, 300000);

// function to generate a random tweet tweet
function ranDom(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
