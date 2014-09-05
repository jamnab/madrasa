'use strict';

$(function () {
    var featureID;
    
    $(document).ready(function () {
		loadInitial();
    });
	
	$('#header-panel').click(function () {
		//$('html, body').animate({scrollTop: $('#main-panel').offset().top - 60}, 'slow', 'swing');
	});
    
    $('.btn.menu').click(function () {
    	openSesame();
    });
    
    $('.btn.add').click(function () {
    
        submitAppear();
        
        $('.post').click(function () {
            submitPost();
        });
    });
    
    $('.btn.search').click(function () {
    	openSearch();
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
                openSesame();
        	});

            if (data.success) {

                if (data.results.length > 0) {
            
                    $.each(data.results, function () {
                        //$('#link-display').append("<div id='link-overlay'><a href='" + this.link + "' target='_blank'><img src='img/madrasa-ph.png' data-src='" + this.image + "'><div id='featured'><span>" + this.category + "</span></div><h3>" + this.title + "</h3><p>" + this.description + "</p><hr><a id='tags' href='#'>" + this.tags + "</a></a></div");
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

function openSearch() {
    var topval = $('#search-panel').css("margin-top");
        
    if (topval === "0px") {
        $('#search-panel').animate({ marginTop: "62px" }, { duration: 225, queue: false });
    } else {
        $('#search-panel').animate({ marginTop: "0px" }, { duration: 300, queue: false });
    }
}

function openSesame() {
    var rightval = $('#topic-list').css("right");
        
    if (rightval === "-250px") {
        $('#header-panel').animate({ right: "250px" }, { duration: 225, queue: false });
        $('#search-panel').animate({ right: "250px" }, { duration: 225, queue: false });
        $('#banner-panel').animate({ right: "250px" }, { duration: 225, queue: false });
        $('#main-panel').animate({ right: "250px" }, { duration: 225, queue: false });
        $('#topic-list').animate({ right: "0px" }, { duration: 225, queue: false });
    } else {
        $('#header-panel').animate({ right: "0px" }, { duration: 300, queue: false });
        $('#search-panel').animate({ right: "0px" }, { duration: 300, queue: false });
        $('#banner-panel').animate({ right: "0px" }, { duration: 300, queue: false });
        $('#main-panel').animate({ right: "0px" }, { duration: 300, queue: false });
        $('#topic-list').animate({ right: "-250px" }, { duration: 300, queue: false });
    }
}

function loadFeatures(featureID) {
    mixpanel.track("Topic search");
    $.ajax({
        url: 'php/features.php',
		type: 'POST',
		data: { 'subject' : featureID },
        beforeSend: function (data) {
        
            $('#banner').remove();
            $('#title').empty();
            $('#link-display').empty();
            openSesame();
        },
        success: function (data) {
            if (data.success) {
                $('#link-display').append("<h1 id='title'>Here are some posts about <a href='http://www.madrasa.ca/link.php?text='" + featureID + "'>" + featureID + "</a></h1>");
                mixpanel.track_links("#link-overlay a", "click external link", {"referrer": document.referrer});

                if (data.results.length > 0) {
                    $.each(data.results, function () {
                        $('#link-display').append('<div id="link-overlay"><a href="' + this.link + '" target="_blank" onclick="mixpanel.track("External link");"><img src="img/madrasa-ph.png" data-src="' + this.image + '"><h3>' + this.title + '</h3><p>' + this.description + '</p><div class="share post"><a class="social twitter" target="_blank" href="http://twitter.com/home?status=I just learned about ' + encodeURIComponent(this.title) + ' ' + encodeURIComponent(this.link) + ' via @madrasaknows" title="Tweet this">Tweet</a><a class="social reddit" target="_blank" title="Share to Reddit" href="//www.reddit.com/submit?title=' + this.title + '&url=' + this.link + '">Reddit This</a><a class="social fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(this.link) + '&t=' + encodeURIComponent(this.title) + '" target="_blank" title="Share to Facebook">Share</a></div><hr><a id="tags" href="#">"' + this.tags + '"</a></a></div');
                    });
                    $('img').unveil(200);
                } else {
                    $('banner').remove();
                    $('#title').append("Uh Oh something went wrong");
                }

            } else {
                alert(data.error);
            }
        }
    });
}

function doSearch() {
    mixpanel.track("User search");
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
                mixpanel.track_links("#link-overlay a", "click external link", {"referrer": document.referrer});

				if (data.results.length > 0) {

					$.each(data.results, function () {
                        $('#link-display').append('<div id="link-overlay"><a href="' + this.link + '" target="_blank" onclick="mixpanel.track("External link");"><img src="img/madrasa-ph.png" data-src="' + this.image + '"><h3>' + this.title + '</h3><p>' + this.description + '</p><div class="share post"><a class="social twitter" target="_blank" href="http://twitter.com/home?status=I just learned about ' + encodeURIComponent(this.title) + ' ' + encodeURIComponent(this.link) + ' via @madrasaknows" title="Tweet this">Tweet</a><a class="social reddit" target="_blank" title="Share to Reddit" href="//www.reddit.com/submit?title=' + this.title + '&url=' + this.link + '">Reddit This</a><a class="social fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(this.link) + '&t=' + encodeURIComponent(this.title) + '" target="_blank" title="Share to Facebook">Share</a></div><hr><a id="tags" href="#">"' + this.tags + '"</a></a></div');
					});
					$('img').unveil(200);

				} else {
					$('#link-display').append("<h1 id='title'>Sorry no results for <a href=''>" + searchText + "</a>.</h1>");
					
				}

			} else {
				alert(data.error);
			}
		}
	});
}
function submitAppear() {
    $('.panel.submission').append("<div class='display submission'><a class='close' href='#'><img src='img/close-btn-w.png'></a><form><h1>Submit a Post</h1><p>Share educational articles, videos, podcasts, infographics, and more.</p><input class='field title' name='title' maxlength='75' type='text' placeholder='Enter title*' required autofocus><input class='field link' name='link' maxlength='155' type='text' placeholder='http://example.com*' required><input class='field image' name='image' type='text' maxlength='155' placeholder='Add image url (Optional)'><textarea class='field desc' name='desc' type='text' rows='3' maxlength='155' placeholder='Enter a description*' required></textarea><select class='field cat' name='category'><option class='category' value='' selected disabled style='display:none;'>Choose a category</option><option class='category' value='Advice'>Advice</option><option class='category' value='Design'>Design</option><option class='category' value='Funding'>Funding</option><option class='category' value='Growth'>Growth</option><option class='category' value='Product'>Product</option><option class='category' value='Sales'>Sales</option><option class='category' value='Strategy'>Strategy</option><option class='category' value='Team'>Team</option><option class='category' value='Tech'>Tech</option><option class='category' value='Users'>Users</option><option class='category' value='Venture'>Venture</option></select><input class='field tags' name='tags' type='text' maxlength='75' placeholder='Separate tags with a space'><hr><input class='submit post' type='button' value='Submit'></div>");
    
    $('.close').click(function () {
        $('.display.submission').remove();
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