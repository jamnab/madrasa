'use strict';

$(function() {

  $(document).ready( function() {
	
	window.scrollTo(0,0);

        loadInitial();
      
  });

//Click event when particular link is pressed
  $('.topic').click( function() {
      
      featureID = $(this).attr('id');
	
        loadFeatures();
      opensesame();
      //e.preventDefault();
      
  });
   
    
     //Click event when Submit a link is pressed
    $('#menu-btn').click( function() {
            //opensesame();
        submitAppear();
    });
      
//Keypress event to see if enter was pressed in text input
	$('#text').keydown(function(e){

    	if(e.keyCode == 13){

    		doSearch();

			// Set it to an empty string
            $('#text').val("");
    	}
	});

});

function exploreClick() {
	$('html, body').animate({scrollTop: $('#main-panel').offset().top -40}, 'slow', 'swing');
};

function loadInitial() {
    
    var initialVal = true;
	 //$('#more').hide();    
  $.ajax({
    
        url: 'php/initial.php',
		type: 'POST',
		data: { 
            
            'initial' : initialVal
              
              },
    beforeSend: function (data) {

	$('#banner-panel').append('<div id="banner"><h1>Learn How To Get Started</h1><h2>Discover great how-tos from around the web. Find the tutorials you want without getting lost searching.</h2><input id="explore" type="button" onclick="exploreClick()" value="Start Exploring"><br><div class="fb-like" data-href="https://www.facebook.com/madrasaknows" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div></div>');

      },
      
    success: function(data) {

      //Was everything successful, no errors in the PHP script
      if (data.success) {
        
          
        //Check to see if there are any results to display
        if(data.results.length > 0) {
            
            //Display the featured posts
            $('#title').append("Welcome! Here are some interesting How-Tos.");
            
        //Loop through each result and add it to the list
          $.each(data.results, function() {
              
        //Give the list element a rel with the data results ID incase we want to act on this later, like selecting from the list
              
            $('#link-display').append("<div id='link-overlay'><a href='" + this.link + "' target='_blank'><img src='img/madrasa-ph.png' data-src='" + this.image + "'><h3>" + this.title + "</h3><p>" + this.description + "</p><hr><a id='tags' href='#'>"+ this.tags + "</a></a></div");
          });
	$("img").unveil(200);            
        } else {

          //If there are no results, inform the user - add 'no-results' class so we can style it differently
          $('#title').append("Uh oh, something went wrong.");

        }

      } else {

        //Display the error message
        alert(data.error);
      }
    }
  });
}

function submitAppear() {
    $('#submit-panel').append('<div id="submit-display"><a id="close" href="#"><img src="img/close-btn-w.png"></a><form action="submit.php"><h1>Submit a Post</h1><p>Add educational articles, videos, podcasts, infographics, etc. you`d like to share.</p><input class="submit title" name="title" maxlength="75" type="text" placeholder="Enter title*" required autofocus><input class="submit link" name="link" maxlength="155" type="text" placeholder="http://example.com*" required><input class="submit image" name="image" type="text" maxlength="155" placeholder="Add image url (Optional)"><textarea class="submit description" name="desc" type="text" rows="3" maxlength="155" placeholder="Enter a description*" required></textarea><select class="categories" name="category"><option class="category" value="category">Pick a category</option><option class="category" value="art">art</option><option class="category" value="design">design</option><option class="category" value="fashion">fashion</option><option class="category" value="sports">sports</option><option class="category" value="tech">tech</option></select><input class="submit tags" name="tags" type="text" maxlength="75" placeholder="Separate tags with a space"><hr><input id="submit-btn" type="button" value="Submit"></div>');
    
    $('#close').click( function() {
        $('#submit-display').remove();
    });

}

function opensesame() {
    var rightval = $('#topic-list').css("right");
        
        if(rightval == "-250px") {
            $('#search-panel').animate({  
                right: "250px"  
              }, { duration: 225, queue: false });  
              $('#main-panel').animate({  
                right: "250px"  
              }, { duration: 225, queue: false });
                $('#topic-list').animate({  
                right: "0px"  
              }, { duration: 225, queue: false });
        }
        else {
            $('#search-panel').animate({  
                right: "0px"  
              }, { duration: 300, queue: false });  
              $('#main-panel').animate({  
                right: "0px"  
              }, { duration: 300, queue: false });
                $('#topic-list').animate({  
                right: "-250px"  
              }, { duration: 300, queue: false });
        }

	$('#main-panel').click( function() {
            opensesame();
    	});
}

function loadFeatures() {

	$('#more').hide();

  $.ajax({
    
        url: 'php/features.php',
		type: 'POST',
		data: { 
            
            'subject' : featureID
              
              },
      beforeSend: function(data) {

        $('#link-display').show();

          //Display the featured posts
            $('#text').val("");


	$('#banner').remove();
      },
    success: function(data) {

      //Was everything successful, no errors in the PHP script
      if (data.success) {
          
            //Clear featured posts
            $('#link-display').empty();

            //Clear title
            $('#title').empty();

            //Display the featured posts
            $('#text').val(featureID);
          
        //Check to see if there are any results to display
        if(data.results.length > 0) {
            

        //Loop through each result and add it to the list
          $.each(data.results, function() {

        //Give the list element a rel with the data results ID incase we want to act on this later, like selecting from the list

            $('#link-display').append("<div id='link-overlay'><a href='" + this.link + "' target='_blank'><img src='img/madrasa-ph.png' data-src='" + this.image + "'><h3>" + this.title + "</h3><p>" + this.description + "</p><hr><a id='tags' href='#'>"+ this.tags + "</a></a></div");
          });
            $("img").unveil(200);
        } else {
		$('banner').remove();
          //If there are no results, inform the user - add 'no-results' class so we can style it differently
          $('#title').append("Uhhhh my bad...");

        }

      } else {

        //Display the error message
        alert(data.error);
      }
    }
  });
}

function doSearch() {

	var searchText = $('#text').val();
    
	$.ajax({
		url: 'php/search.php',
		type: 'POST',
		data: {
			'text': searchText
		},
		beforeSend: function () {
            
			$('#banner').remove();
            
            

		},
		success: function(data) {

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
					$('#link-display').append("<h1 id='title'>Here are How-Tos for <a href='#'>"+searchText+"</a></h1>");

				//Loop through each result and add it to the list
					$.each(data.results, function() {

				//Give the list element a rel with the data results ID incase we want to act on this later, like selecting from the list
                        
            $('#link-display').append("<div id='link-overlay'><a href='" + this.link + "' target='_blank'><img src='img/madrasa-ph.png' data-src='" + this.image + "'><h3>" + this.title + "</h3><p>" + this.description + "</p><hr><a id='tags' href='#'>" + this.tags + "</a></a></div>");
					});
					
					$("img").unveil(200);
                    

				} else {

					//If there are no results, inform the user - add 'no-results' class so we can style it differently
					$('#link-display').append("<h1 id='title'>Sorry no results for <a href=''>"+searchText+"</a>. Here's some </h1>");
					loadInitial();
					$('#banner').remove();

				}

			} else {

				//Display the error message
				alert(data.error);
			}
		}
	});
}