$(function() {

  //Click event when particular link is pressed
  $('.topic').click( function(){
      
      featureID = $(this).attr('id');
      
        loadFeatures();
      opensesame();
      //e.preventDefault();
      //e.preventDefault();
      
  });
   
    
     //Click event when Submit a link is pressed
    $('#submit-link').click( function() {
            opensesame();
    });
    
    //Click event when Madrasa logo is pressed
    $('#logo').click( function() {
            //abracadabra();
    });
    
});

function opensesame() {
    var rightval = $('#topic-list').css("right");
        
        if(rightval == "-250px") {
            $('#search-panel').animate({  
                right: "250px"  
              }, { duration: 300, queue: false });  
              $('#main-panel').animate({  
                marginRight: "250px"  
              }, { duration: 300, queue: false });
                $('#topic-list').animate({  
                right: "0px"  
              }, { duration: 300, queue: false });
        }
        else {
            $('#search-panel').animate({  
                right: "0px"  
              }, { duration: 500, queue: false });  
              $('#main-panel').animate({  
                marginRight: "0px"  
              }, { duration: 500, queue: false });
                $('#topic-list').animate({  
                right: "-250px"  
              }, { duration: 500, queue: false });
        }
}

function abracadabra() {
    var leftval = $('#action-list').css("left");
        
        if(leftval == "-250px") {
            $('#search-panel').animate({  
                left: "250px"  
              }, { duration: 300, queue: false });  
              $('#main-panel').animate({  
                marginLeft: "250px"  
              }, { duration: 300, queue: false });
                $('#action-list').animate({  
                left: "0px"  
              }, { duration: 300, queue: false });
        }
        else {
            $('#search-panel').animate({  
                left: "0px"  
              }, { duration: 500, queue: false });  
              $('#main-panel').animate({  
                marginLeft: "0px"  
              }, { duration: 500, queue: false });
                $('#action-list').animate({  
                left: "-250px"  
              }, { duration: 500, queue: false });
        }
}

function loadFeatures() {
    
    //variable to js history push
        //var url = location.hash.slice(1);
    var url = featureID;
        
    history.pushState({}, featureID, url);
    //$('.topic').attr('href') = '/' + featureID;
    //history.pushState({}, featureID, url + '/' + featureID);
        
    // alert(featureID);
    
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
          
            $('#link-display #link-overlay img').css("background-image","");

        //Check to see if there are any results to display
        if(data.results.length > 0) {
            

        //Loop through each result and add it to the list
          $.each(data.results, function() {

        //Give the list element a rel with the data results ID incase we want to act on this later, like selecting from the list

	$('#link-display').append("<div id='link-overlay'><a href='" + this.link + "' target='_blank'><img src='img/madrasa-ph.png' data-src='" + this.image + "'><h3>" + this.title + "</h3><p>" + this.description + "</p><hr><a id='tags' href='#'>" + this.tags + "</a></a></div");
          });
            
        } else {

          //If there are no results, inform the user - add 'no-results' class so we can style it differently
          $('#title').append("What did you do!?");

                    //$('#link-display').empty();
        }

      } else {

        //Display the error message
        alert(data.error);
      }
    }
  });
}

//function submitLink() {
//    $('#link-display').hide();
    
//    $('#post-display').show();
    
//    $('#post-display').append("<form id='link-form' method='post' action='mailto:jamesbmcnab@gmail.com'><h2>Submit A Link</h2><p><input id='text' type='text' placeholder='What would you like to learn?'></p><hr><input id='confirm' value='Submit' type='submit'></form>");

    
//}