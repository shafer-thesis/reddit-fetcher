

function parseJSON(redditjson){

	$('#content').html('');
	var fifth_upvoes 			= 0;
	var output_string             = '';
	var resultsToReturn = 5;

	output_string +='<h2>Results:</h2><p>' + 'The Reddit API returns ' + redditjson[1]['data']['children'].length +  (redditjson[1]['data']['children'].length == 1?' entry':' entries') +  ' for this URL</p>';
	

	output_string +='<table id="table_id"><thead><tr><th>sub</th><th>date</th><th>comments</th><th>score</th><th># of gold</th><th>link</th></tr></thead><tbody>' ;

	//console.log(redditjson);

	 for(i=0;i<redditjson[1]['data']['children'].length;i++){
	 	//console.log(redditjson[1]['data']['children'][i]['data']['num_comments']);

	var comments = redditjson[1]['data']['children'][i]['data']['num_comments'],
	score = redditjson[1]['data']['children'][i]['data']['score'],
	subreddit = redditjson[1]['data']['children'][i]['data']['subreddit'],
	date_created = new Date(redditjson[1]['data']['children'][i]['data']['created']*1000),
	id = redditjson[1]['data']['children'][i]['data']['id'],
	title = redditjson[1]['data']['children'][i]['data']['title'],
	submitted_by = redditjson[1]['data']['children'][i]['data']['author'],
	link = redditjson[1]['data']['children'][i]['data']['permalink'],
	//topComment = getRedditCommentData(subreddit, id),
	gilded = redditjson[1]['data']['children'][i]['data']['gilded'];

	if(comments >= 5){

		output_string +='<tr><td>/r/' + subreddit + '</td>';

		output_string +=' <td nowrap=1> ' + date_created.toString().substring(0,15) + '</td>';

		output_string +=' <td> ' + comments + ' </td>';

		output_string +='<td>' + score + ' </td>' ;

		output_string += '<td>' + gilded + '</td>';

		output_string +='<td><a href="http://reddit.com' + link + '">' + link + '</a> </td></tr>' ;

		current_url = "https://www.reddit.com/r/" + subreddit + "/comments/" + id + ".json?sort=top&limit=1";

		commentData = getRedditCommentData(current_url);

		output_string += "<tr><td width=100%>" + commentData + "</td></tr>";
		//parseJSON2(current_url);


	}

	}
	output_string +='</tbody></table>' ;

	// put content into the #content div
	$('#content').html(output_string);
}



function getRedditData(theURL){
	$.getScript(
		//"http://www.reddit.com/api/info.json?jsonp=parseJSON&url="+theURL
		"https://www.reddit.com/duplicates/74jbg.json?jsonp=parseJSON&limit=100"
	);

}

function getRedditCommentData(current_url){
		$.getJSON(current_url, function(returnJSON){
			if(!returnJSON[1]['data']['children'][0]['data']['body']){
				topComment = "N/A";
			} else {
			topComment = (returnJSON[1]['data']['children'][0]['data']['body']);
			author = returnJSON[1]['data']['children'][0]['data']['author'];
		}
			//commentData = {'topComment': topComment, 'author': author};
			console.log(topComment);
		});
}




