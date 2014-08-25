'use strict';

$(function () {
    $(document).ready(function () {
	    window.scrollTo(0, 0);

        loadInitial();
    });

    $('.topic').click(function () {
        var featureID = $(this).attr('id');
        loadFeatures();
        opensesame();
    });
    
    $('#menu-btn').click(function () {
            //opensesame();
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

            $('#banner-panel').append('<div id="banner"><h1>Learn How To Start Up</h1><h2>Building a startup is hard. Madrasa makes is easier to find articles and videos from the best in the industry to help you survive the learning curve.</h2><input id="explore" type="button" onclick="exploreClick()" value="Start Learning"><br><div class="fb-like" data-href="https://www.facebook.com/madrasaknows" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div></div>');

        },
      
        success: function (data) {  

            if (data.success) {

                if (data.results.length > 0) {

                    $('#title').append("Welcome! Here are some interesting How-Tos.");
            
                    $.each(data.results, function () {
                        $('#link-display').append("<div id='link-overlay'><a href='" + this.link + "' target='_blank'><img src='img/madrasa-ph.png' data-src='" + this.image + "'><h3>" + this.title + "</h3><p>" + this.description + "</p><hr><a id='tags' href='#'>" + this.tags + "</a></a></div");
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
	$('html, body').animate({scrollTop: $('#main-panel').offset().top - 40}, 'slow', 'swing');
}
function submitAppear() {
    $('#submit-panel').append('<div id="submit-display"><a id="close" href="#"><img src="img/close-btn-w.png"></a><form><h1>Submit a Post</h1><p>Share educational articles, videos, podcasts, infographics, and more.</p><input class="submit title" name="title" maxlength="75" type="text" placeholder="Enter title*" required autofocus><input class="submit link" name="link" maxlength="155" type="text" placeholder="http://example.com*" required><input class="submit image" name="image" type="text" maxlength="155" placeholder="Add image url (Optional)"><textarea class="submit desc" name="desc" type="text" rows="3" maxlength="155" placeholder="Enter a description*" required></textarea><select class="submit cat" name="category"><option class="category" value="" selected disabled style="display:none;">Choose a category</option><option class="category" value="art">art</option><option class="category" value="design">design</option><option class="category" value="fashion">fashion</option><option class="category" value="sports">sports</option><option class="category" value="tech">tech</option></select><input class="submit tags" name="tags" type="text" maxlength="75" placeholder="Separate tags with a space"><hr><input id="submit-btn" type="button" value="Submit"></div>');
    
    $('#close').click(function () {
        $('#submit-display').remove();
    });

}

function opensesame() {
    var rightval = $('#topic-list').css("right");
        
    if (rightval === "-250px") {
        $('#search-panel').animate({ right: "250px" }, { duration: 225, queue: false });
        $('#main-panel').animate({ right: "250px" }, { duration: 225, queue: false });
        $('#topic-list').animate({ right: "0px" }, { duration: 225, queue: false });
    } else {
        $('#search-panel').animate({ right: "0px" }, { duration: 300, queue: false });
        $('#main-panel').animate({ right: "0px" }, { duration: 300, queue: false });
        $('#topic-list').animate({ right: "-250px" }, { duration: 300, queue: false });
    }
}

function loadFeatures() {

    $.ajax({
        url: 'php/features.php',
		type: 'POST',
		data: { 'subject' : featureID },
        beforeSend: function (data) {

            $('#link-display').show();
            $('#text').val("");
            $('#banner').remove();
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
					$('#banner').remove();
				}

			} else {
				alert(data.error);
			}
		}
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