'use strict';

$(function () {
    var featureID;
    
    $(document).ready(function () {

    });
	
	$('#header-panel').click(function () {
		//$('html, body').animate({scrollTop: $('#main-panel').offset().top - 60}, 'slow', 'swing');
	});
    
    $('.btn.menu').click(function () {
    	opensesame();
    });
    
    $('.btn.add').click(function () {
    
        submitAppear();
        
        $('#submit-btn').click(function () {
            submitPost();
        });
    });
      
	$('#text').keydown(function (e) {
        if (e.keyCode === 13) {
            doSearch();
            $('#text').val("");
        }
	});

});

function loadInitial() {
    var initialVal = true;
    
    $.ajax({
        url: 'php/initial.php',
		type: 'POST',
		data: { 'initial' : initialVal },
        beforeSend: function (data) {

        },
        success: function (data) {
        	
        	$.each(data.category, function (key, val) {
        		$('#topic-list').append('<li><a class="topic" id="' + val + '" href="#"><h4>' + val + '</h4></a></li>');
        	});
        	
        	$('.topic').click(function (featureID) {
        		
        		featureID = $(this).attr('id');
        		loadFeatures(featureID);
        	});

            if (data.success) {

                if (data.results.length > 0) {

                    $('#title').append("Welcome, Here are some featured posts.");
            
                    $.each(data.results, function () {
                        $('#link-display').append("<div id='link-overlay'><a href='" + this.link + "' target='_blank'><img src='img/madrasa-ph.png' data-src='" + this.image + "'><div id='featured'><span>" + this.category + "</span></div><h3>" + this.title + "</h3><p>" + this.description + "</p><hr><a id='tags' href='#'>" + this.tags + "</a></a></div");
                    });
                    $('img').unveil(200);
                } else {
                    $('#title').append("Uh oh, something went wrong.");
                }
            } else {
                alert(data.error);
            }
        }
    });
}

function exploreClick() {
	$('html, body').animate({scrollTop: $('#main-panel').offset().top - 60}, 'slow', 'swing');
}

function opensesame() {
    var rightval = $('#topic-list').css("right");
        
    if (rightval === "-250px") {
        $('#header-panel').animate({ right: "250px" }, { duration: 225, queue: false });
        $('#banner').animate({ right: "250px" }, { duration: 225, queue: false });
        $('#main-panel').animate({ right: "250px" }, { duration: 225, queue: false });
        $('#topic-list').animate({ right: "0px" }, { duration: 225, queue: false });
    } else {
        $('#header-panel').animate({ right: "0px" }, { duration: 300, queue: false });
        $('#banner').animate({ right: "0px" }, { duration: 300, queue: false });
        $('#main-panel').animate({ right: "0px" }, { duration: 300, queue: false });
        $('#topic-list').animate({ right: "-250px" }, { duration: 300, queue: false });
    }
}

function loadFeatures(featureID) {

    $.ajax({
        url: 'php/features.php',
		type: 'POST',
		data: { 'subject' : featureID },
        beforeSend: function (data) {
        
            $('#text').val("");
            $('#banner').remove();
            opensesame();
        },
        success: function (data) {
            if (data.success) {
                $('#link-display').empty();
                $('#title').empty();
                $('#text').val(featureID);
          
                if (data.results.length > 0) {
            
                    $.each(data.results, function () {
                        $('#link-display').append("<div id='link-overlay'><a href='" + this.link + "' target='_blank'><img src='img/madrasa-ph.png' data-src='" + this.image + "'><h3>" + this.title + "</h3><p>" + this.description + "</p><hr><a id='tags' href='#'>" + this.tags + "</a></a></div");
                    });
                    $('img').unveil(200);
                } else {
                    $('banner').remove();
                    $('#title').append("Uhhhh my bad...");
                }

            } else {
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