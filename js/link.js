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
		data: { 'text' : searchText },
		beforeSend: function () {
            $('#banner').remove();
		},
		success: function (data) {

			if (data.success) {

                $('#link-display').empty();
                $('#title').empty();
                $('#text').val(searchText);

				if (data.results.length > 0) {

					$('#link-display').append("<h1 id='title'>Here are How-Tos for <a href='#'>" + searchText + "</a></h1>");

					$.each(data.results, function () {
                        $('#link-display').append("<div id='link-overlay'><a href='" + this.link + "' target='_blank'><img src='img/madrasa-ph.png' data-src='" + this.image + "'><h3>" + this.title + "</h3><p>" + this.description + "</p><hr><a id='tags' href='#'>" + this.tags + "</a></a></div>");
					});
					$("img").unveil(200);

				} else {
					$('#link-display').append("<h1 id='title'>Sorry no results for <a href=''>" + searchText + "</a>. Here's some </h1>");
					loadInitial();
					$('#banner').remove();
				}

			} else {
				alert(data.error);
			}
		}
	});
}
function submitAppear() {
    $('#submit-panel').append('<div id="submit-display"><a id="close" href="#"><img src="img/close-btn-w.png"></a><form><h1>Submit a Post</h1><p>Share educational articles, videos, podcasts, infographics, and more.</p><input class="submit title" name="title" maxlength="75" type="text" placeholder="Enter title*" required autofocus><input class="submit link" name="link" maxlength="155" type="text" placeholder="http://example.com*" required><input class="submit image" name="image" type="text" maxlength="155" placeholder="Add image url (Optional)"><textarea class="submit desc" name="desc" type="text" rows="3" maxlength="155" placeholder="Enter a description*" required></textarea><select class="submit cat" name="category"><option class="category" value="" selected disabled style="display:none;">Choose a category</option><option class="category" value="Advice">Advice</option><option class="category" value="Design">Design</option><option class="category" value="Funding">Funding</option><option class="category" value="Growth">Growth</option><option class="category" value="Product">Product</option><option class="category" value="Sales">Sales</option><option class="category" value="Strategy">Strategy</option><option class="category" value="Team">Team</option><option class="category" value="Tech">Tech</option><option class="category" value="Users">Users</option><option class="category" value="Venture">Venture</option></select><input class="submit tags" name="tags" type="text" maxlength="75" placeholder="Separate tags with a space"><hr><input id="submit-btn" type="button" value="Submit"></div>');
    
    $('#close').click(function () {
        $('#submit-display').remove();
    });

}
function submitPost() {

	var submitFields = [$('.title').val(), $('.link').val(), $('.image').val(), $('.desc').val(), $('.cat ').val(), $('.tags').val()];
    
    if (submitFields[0] === '' || submitFields[1] === '' || submitFields[3] === '' || submitFields[4] === '') {
        alert('Please enter at least a title, link, description & category.');
    } else {
        $.ajax({
            url: 'php/submit.php',
            type: 'POST',
            data: { 'submit' : submitFields },
            beforeSend: function () {
                
            },
            success: function (data) {

                if (data.success) {

                    alert('Thanks for contributing!');
                    $('#submit-display').remove();

                } else {
                    alert(data.error);
                }
            }
        });
    }
}