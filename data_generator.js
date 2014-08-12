/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {}; // streams property of window
streams.home = []; // home property of streams
streams.users = {}; // users property of streams
streams.users.shawndrost = []; // username array in users property
streams.users.sharksforcheap = []; // username array in users property
streams.users.mracus = []; // username array in users property
streams.users.douglascalhoun = []; // username array in users property
streams.users.shawndrost.time = []; // timestamp array in users property
streams.users.sharksforcheap.time = []; // timestamp array in users property
streams.users.mracus.time = []; // timestamp array in users property
streams.users.douglascalhoun.time = []; // timestamp array in users property
streams.users.shawndrost.image = '/images/JS7Tixp.png';
streams.users.sharksforcheap.image = '/images/UFP60wK.gif';
streams.users.mracus.image = '/images/tumblr_n7kzs1voHo1qhnszoo1_400.gif';
streams.users.douglascalhoun.image = '/images/nM04wNS.gif';
window.users = Object.keys(streams.users); // populates users property of windows with array of usernames [shawndrost,sharksforcheap,...]

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){ // newTweet is a string comprised of a tweet
  var username = newTweet.user; // gets username from user property of tweet in generateRandomTweet
  streams.users[username].push(newTweet); // pushes newTweet to username array
  streams.home.push(newTweet); // pushes newTweet to home property array
  streams.users[username].time.push(new Date() / 1000);
};

// utility function
var randomElement = function(array){ // returns random element of array
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['drank', 'drunk', 'deployed', 'got', 'developed', 'built', 'invented', 'experienced', 'fought off', 'hardened', 'enjoyed', 'developed', 'consumed', 'debunked', 'drugged', 'doped', 'made', 'wrote', 'saw'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var randomMessage = function(){ // generates ordered array of a random tweet
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users); // assigns a random user for user property of tweet
  tweet.message = randomMessage(); // generates random tweet for message property of tweet
  tweet.created_at = new Date(); // generates current timestamp for tweet
  addTweet(tweet); // initializes addTweet inside the scope of generateRandomTweet
};

for(var i = 0; i < 10; i++){
  generateRandomTweet();
}

var scheduleNextTweet = function(){
  generateRandomTweet();
  setTimeout(scheduleNextTweet, 4000 + Math.random() * 5000); // generates random tweet every 10s or less
};
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message,visitor){
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  addTweet(tweet);
};
