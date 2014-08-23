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
					
				//Loop through each result and add it to the list
				  $.each(data.results, function() {
					  
				//Give the list element a rel with the data results ID incase we want to act on this later, like selecting from the list
					  
					$('#link-display').append(\"<div id='link-overlay'><a href='\" + this.link + \"' target='_blank'><img src='img/madrasa-pht.png' data-src='\" + this.image + \"'><h3>\" + this.title + \"</h3><p>\" + this.description + \"</p><hr><a id='tags' href='#'>\"+ this.tags + \"</a></a></div>\");
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