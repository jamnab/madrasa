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
					  
					$('#link-display').append('<div id=\"link-overlay\"><a href=\"' + this.link + '\" target=\"_blank\"><img src=\"img/madrasa-ph.png\" data-src=\"' + this.image + '\"><h3>' + this.title + '</h3><p>' + this.description + '</p><div class=\"share post\"><a class=\"social twitter\" target=\"_blank\" href=\"http://twitter.com/home?status=I just learned about ' + encodeURIComponent(this.title) + ' ' + encodeURIComponent(this.link) + ' via @madrasaknows\" title=\"Tweet this\">Tweet</a><a class=\"social reddit\" target=\"_blank\" title=\"Share to Reddit\" href=\"//www.reddit.com/submit?title=' + this.title + '&url=' + this.link + '\">Reddit This</a><a class=\"social fb\" href=\"http://www.facebook.com/sharer.php?u=' + encodeURIComponent(this.link) + '&t=' + encodeURIComponent(this.title) + '\" target=\"_blank\" title=\"Share to Facebook\">Share</a></div><hr><a id=\"tags\" href=\"#\">' + this.tags + '</a></a></div');
				  });

					$('img').unveil(200);
					
				} else {

				  //If there are no results, inform the user - add 'no-results' class so we can style it differently
				  $('#title').append(\"Sorry I couldn't find anything\");

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