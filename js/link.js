$(function() {

  //Click event when particular link is pressed
  $(document).ready( function(){

      
  });

//Click event when particular link is pressed
  $('.topic').click( function(){
      
      featureID = $(this).attr('id');
	
        loadFeatures();
      opensesame();
      //e.preventDefault();
      
  });
   
    
     //Click event when Submit a link is pressed
    $('#menu-btn').click( function() {
            opensesame();
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

	window.scrollTo(0,0);
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

          //If there are no results, inform the user - add 'no-results' class so we can style it differently
          $('#title').append("What did you do!?");

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
		beforeSend: function(){

			//Lets add a loading image
			$('#results-holder').addClass('loading');
            
        $('#link-display').show();

			window.scrollTo(0,0);
            
            

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
					$('#link-display').append("<h1 id='title'>Here are How-Tos for <a href=''>"+searchText+"</a></h1>");

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
					

				}

			} else {

				//Display the error message
				alert(data.error);
			}
		}
	});
}