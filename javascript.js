function ajaxCall(){
	//call ajax
	$.ajax({
		url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#search').val(),
		//jsonp use= requesting a file from another domain can cause problems, due to cross domain policy.
		//Requesting an external script from another domain does not have this problem. JSONP uses this advantage
		//and request files using the script tag instead of the XMLHttpRequest object.
		dataType: 'jsonp',
		type: 'GET',
		success: function(data){
			$('#s_result').empty();
			//console.log(data);
			var data = JSON.stringify(data);
			data = JSON.parse(data);
			//loop through data and output
			var output = '';
			data.query.search.forEach(function(data){
				var title = "<h2 class='srchTtl'>" + data.title + "</h2>";
				var snippet = "<p>" + data.snippet + "</p>";
				var link = '<a href="https://en.wikipedia.org/wiki/' + data.title + '" target="_blank">';
				var endLink = '</a>';
				output += link + title + endLink + snippet + "<hr>";
			});
			$('#s_result').append(output);
		}

	});
};

//declare the random article function
function randomFunction(){
	$('#s_result').empty();
	$('#search').empty();
	//this link for random article generate, developed by wikipedia
	$('iframe').attr('src', 'https://en.wikipedia.org/wiki/Special:Random');
};

$(document).ready(function(){
	//live search when input something into the imput form
	$('#search').focus();
	$('#search').off('keyup');
	$('#search').on('keyup', function(){
		ajaxCall();
		//when ajax call is set the iframe will be empty
		$('iframe').attr('src', '');
	});

	//random article show in the html iframe when click the button
	$('#random').on('click', function(){
		randomFunction();
		$(this).text('Show me another article..')

	})
});