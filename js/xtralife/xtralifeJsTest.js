
//in your Javascript file:
var clan = Clan("KG8xzkSNI2vY4je", "mMbuNx4IY1s8xvO874QK", "sandbox");
// var gamer = Gamer();
var curGamer;
var loginDiv;
var ldBoardDiv;
var leaderboardName = "private";

$( document ).ready(function() {
    loginDiv = $('#loginXtra');
    ldBoardDiv = $('#leaderboardXtra');
})


function main(){
	LoginAnonymous(leaderboardPop);


}


function LoginAnonymous(callback)
{
  clan.loginAnonymous(null, callback);
}

function leaderboardPop(error,gamer){
	if(!error)
    {
      // console.log("Display Name: " + gamer. profile.displayName);
      curGamer = gamer;
      clan.withGamer(gamer).leaderboards(leaderboardName).getHighscores("intermediateMode", 1, 10, function(error, bestHighScoresRes)
	    {
	      if(error)
	            console.log("Best high scores error: " + JSON.stringify(error));
	        else{
	        	// console.log("Best high scores: " + JSON.stringify(bestHighScoresRes));
				ldBoardDiv.empty();
				ldBoardDiv.append('<ul id="ldList"></ul>');
				ldBoardDiv.find("#ldList").append('<li class="ldListElmRow" id="ldListElm_title"> \n'
					+ '<ul class="ldListElmUl">\n'
						+'<li class="ldListElm" id="ldListName_title"><b>Name</b></li>\n'
						+'<li class="ldListElm" id="ldListScore_title"><b>Score</b></li>\n'
						+'<li class="ldListElm" id="ldListTime_title"><b>Time</b></li>\n'
					+ '</ul>\n'
				+ '</li>\n');



	        	var scoreData = bestHighScoresRes.intermediateMode.scores;
	        	// console.log("Best high scores: " + JSON.stringify(scoreData));
	         	$.each(scoreData, function(i,item){
	         		addRowToLeaderBoard(i,item);
	        	});
	         }
				
	    });
    }
    else
    {
      console.log("Login error: " + JSON.stringify(error));
    }
}

function addRowToLeaderBoard(i,item){
	ldBoardDiv.find("#ldList").append('<li class="ldListElmRow" id="ldListElm_'+i+'"> \n'
		+ '<ul class="ldListElmUl">\n'
			+'<li class="ldListElm" id="ldListName_'+i+'">'+item.profile.displayName+'</li>\n'
			+'<li class="ldListElm" id="ldListScore_'+i+'">'+item.score.score+'</li>\n'
			+'<li class="ldListElm" id="ldListTime_'+i+'">'+item.score.timestamp+'</li>\n'
		+ '</ul>\n'
	+ '</li>\n');
}

function sendScoreXtra(){
	// var userName = $('input[name=username]').val();
	// curGamer.profile.displayName = userName;
	 clan.withGamer(curGamer).leaderboards(leaderboardName).post(finalScore, "intermediateMode", "hightolow",
        "context for score", false, function(error, postScoreRes)
    {
      if(error)
            console.log("Post score error: " + JSON.stringify(error));
        else
            console.log("Post score succeeded: " + JSON.stringify(postScoreRes));
    });
}


function loginXtra()
{
  	var email = loginDiv.find('input[name=username]').val();
	var password = loginDiv.find('input[name=password]').val();

  clan.login("email", email,password, null, function(error, gamer)
  {
    if(!error)
    {
      console.log("Display Name: " + gamer.profile.displayName);
    }
    else
    {
      console.log("Login error: " + JSON.stringify(error));
    }
  });
}








main();