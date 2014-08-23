$(function() {

	//Click event when search button is pressed
	//$('#submit').click(function(){
		//doSearch();

		//$('#text').val("");
        
	//});

	//Keypress event to see if enter was pressed in text input
	$('#text').keydown(function(e){

    	if(e.keyCode == 13){

    		doSearch();

			// Set it to an empty string
            $('#text').val("");
    	}
	});

	$('#text').onwebkitspeechchange = function(e) {
    //console.log(e); // SpeechInputEvent
    	doSearch();
	};
    
});

function doSearch() {

	var searchText = $('#text').val();
    
	$.ajax({
		url: 'php/search.php',
		type: 'POST',
		data: {
			'text': searchText
		},
		beforeSend: function(){

			//Lets add a loading image
			$('#results-holder').addClass('loading');
            
        $('#link-display').show();

			window.scrollTo(0,0);
            
            

		},
		success: function(data) {

			//change size of maincont
			//var display = document.getElementById("maincont");
        	//display.style.width = "calc( (100% / 3) * 2 )";
        	//display.style.display = "none";

			//Was everything successful, no errors in the PHP script
			if (data.success) {

				//Clear featured posts
                $('#link-display').empty();

				//Clear title
                $('#title').empty();
                
                //Display the featured posts
                $('#text').val(searchText);

				//Check to see if there are any results to display
				if(data.results.length > 0) {

					//Display the last query
					$('#link-display').append("<h1 id='title'>Here are How-Tos for <a href=''>"+searchText+"</a></h1>");

				//Loop through each result and add it to the list
					$.each(data.results, function() {

				//Give the list element a rel with the data results ID incase we want to act on this later, like selecting from the list

				$('#link-display').append("<div id='link-overlay'><a href='" + this.link + "' target='_blank'><img src='img/madrasa-ph.png' data-src='" + this.image + "'><h3>" + this.title + "</h3><p>" + this.description + "</p><hr><a id='tags' href='#'>" + this.tags + "</a></a></div");                        
					});
                    

				} else {

					//If there are no results, inform the user - add 'no-results' class so we can style it differently
					$('#link-display').append("<h1 id='title'>You found my one weakness... <a href=''>"+searchText+"</a>!</h1>");

                    //$('#link-display').empty();

				}

			} else {

				//Display the error message
				alert(data.error);
			}
		}
	});
}