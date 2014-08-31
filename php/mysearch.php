<?php
	if (isset($_REQUEST['text']) && ($_REQUEST['text'] != "")) {
	

		echo "$(function() {

		  //Click event when particular link is pressed
		  $(document).ready( function(){
			   
				loadLinks();
			  
		  });
			  
		});

		function loadLinks() {
			
		  $.ajax({
			url: 'php/sharelink.php',
			type: 'POST',
			data: {
				'text': \"" . $_REQUEST['text'] . "\"
			},
			beforeSend: function(data) {
				$('#link-display').show();
				
			  },
			  
			success: function(data) {

			  //Was everything successful, no errors in the PHP script
			  if (data.success) {
				
				  
				//Check to see if there are any results to display
				if(data.results.length > 0) {
					
					//Display the featured posts
					$('#title').append(\"Here are How-Tos for " 
					. $_REQUEST['text'] . "\");
					$('#link-display').append(\"<script defer>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','twitter-wjs');</script>\");
				//Loop through each result and add it to the list
				  $.each(data.results, function() {
					  
				//Give the list element a rel with the data results ID incase we want to act on this later, like selecting from the list
					  
					$('#link-display').append('<div id=\"link-overlay\"><a href=\"' + this.link + '\" target=\"_blank\"><img src=\"img/madrasa-ph.png\" data-src=\"' + this.image + '\"><h3>' + this.title + '</h3><p>' + this.description + '</p><div class=\"share post\"><a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-via=\"madrasaknows\" data-text=\"I just learned about \"' + this.title + '\" data-count=\"none\" data-url=\"' + this.link + '\" data-lang=\"en\">Tweet</a><a target=\"_blank\" href=\"//www.reddit.com/submit?title=' + this.title + '&url=' + this.link + '\"><img class=\"reddit\" src=\"//www.reddit.com/static/spreddit10.gif\" alt=\"submit to reddit\" border=\"0\" /></a><div class=\"fb-share-button\" data-href=\"' + this.link + '\" data-type=\"button\"></div></div><hr><a id=\"tags\" href=\"#\">\"' + this.tags + '\"</a></a></div');
				  });

					$('img').unveil(200);
					
				} else {

				  //If there are no results, inform the user - add 'no-results' class so we can style it differently
				  $('#title').append(\"What did you do?\");

				}

			  } else {

				//Display the error message
				alert(data.error);
			  }
			}
		  });
		}";

	}
	
	else {
		echo "ooops";
	}
?>