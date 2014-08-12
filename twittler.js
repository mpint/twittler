$(document).ready(function(){

	var $twits = $('#twits'),
		index = streams.home.length - 1;
	
	while(index >= 0){
		var tweet = streams.home[index];
		var $tweet = $('<div></div>');
		$tweet.html('<span class="at-symbol">@</span>' + '<span class="user-name">' + 
					 tweet.user + '</span>' + ': ' + '<span class="message">' + 
					 tweet.message + '</span>');
		$tweet.appendTo($twits);
		index -= 1;
	}
	console.log(streams.home);
	var twitHeight = $('#new-twits').css('height'); // get recent tweet css height
	$('#profile-view').css('height',twitHeight);	// set profile div height equal to recent tweet height
	

	$('#new-twits').on('click.names', '.user-name', function(){
		var userName = $(this).text();
		getProfile(userName);
	}); // click handler for user names //
	
	$('.login-container').on('click.login', function(){
		createAccount();
	});

	updateFeed(); // 
	
});

function updateFeed () { // recent twit feed
	
	var len = streams.home.length,
		bound = len - 10,
		newTwits = [],
		msg = '',
		tweet = 0;
	
	$('#twits').empty();
	
	for (var i = len; i > bound; i--) {
		
		tweet = streams.home[i - 1];
			
		msg = ('<div>' + '<span class="at-symbol">@</span>' + '<span class="user-name">' 
					+ tweet.user + '</span>' + ': ' + '<span class="message">' + tweet.message + '</span></div>');
		
		newTwits.push(msg);
		
		$(msg).appendTo($('#twits'));
		
	}
	
	$('#new-twits').off('.names');
	$('#new-twits').on('click.names', '.user-name', function(){
		var userName = $(this).text();
		getProfile(userName);
	}); // click handler for user names

	var feedInterval = setTimeout(function (){updateFeed()}, 4000);
}

function getProfile (userName) {
	
	clearInterval(document.userInterval);
	document.userInterval = setInterval(function(){profileFeed(userName)}, 4000);
	
	$('.profile-help').hide();
	$('#profile-view section').empty();
	
	profileHeader(userName);
	profileFeed(userName);
	
}

function profileHeader (userName) {

	var users = streams.users,
	name = users[userName],
	image = name.image;	
	
	$('#profile-image').html('<span class="at-symbol">@</span> ' + '<span class="user-name">' + userName + '</span>');
	// $('#profile-image').css('background', 'red');
	
}

function profileFeed (userName) {
	
	// var userInterval = setInterval(function(){profileFeed(userName)}, 4000);
	
	var user = streams.users[userName],
	len = streams.users[userName].length,
	bound = len - 8 >= 0 ? len - 8 : 0,
	userTwits = [],
	msg = '',
	twit = 0,
	theTime = new Date() / 1000;
	
	$('#profile-twits').empty();
	
	for (var i = len; i > bound; i--) {
		
		twit = user[i - 1];
		timeDiff = (theTime - user.time[i - 1]).toFixed(0);
		var timeText = timeMessage(timeDiff);
		
		
		msg = ('<div><span class="time">' + timeText + '</span><span class="message">' + twit.message + '</span></div>');
		
		$(msg).appendTo($('#profile-twits'));
	}
	

}

function timeMessage(time) {
	if (time < 60) {return 'a moment ago';}
	else if (time > 60 && time < 120) {return 'about a minute ago';}
	else if (time > 120 && time < 240) {return 'a few minutes ago';}
	else { 
		var mins = (time / 60).toFixed(0); 
		return  mins + ' minutes ago';
	}
}

function createAccount () {
	var yourName = prompt('enter a user name');
	
	if (yourName) {
		alert('welcome to Twittler, ' + yourName);
		streams.users[yourName] = [];
		streams.users[yourName].time = [];
		
		$('.login-container').text('your profile | ');
		$('.login-container').append('twit <input type="text" />');
		
		$('.login-container').off('.login');
		$('.login-container').on('click.yourProfile', function () {
			getProfile(yourName);
		});
		$('.login-container input').on('focus.login',function () {
			$(this).css('background-color', '#e7e7e7');
		}).on('blur.login', function () {
			$(this).css('background-color', 'white');
		});
		$(document).keypress(function(e) {
			if(e.which == 13) {
				var yourTwit = $('.login-container input').val();
				$('.login-container input').val('');
				writeTweet(yourTwit,yourName);
			}
});
	}
}
