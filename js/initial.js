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
    
    $('.signin').click(function () {
    	openLogin();
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

            $('#banner-panel').append('<div id="banner"><h1>The best place to learn and share</h1><h2>Madrasa makes it simple to save and share how-to articles, videos, guides, resources, and podcasts from around the web.</h2><input id="explore" type="button" onclick="exploreClick()" value="Create Account"><br></div>');
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
                mixpanel.track_links("#link-overlay a", "click external link", {"title": this.title});

                if (data.results.length > 0) {

                    $('#title').append("Welcome, Here are some featured posts.");
                    
                    $.each(data.results, function () {
                        $('#link-display').append('<div id="link-overlay"><a href="' + this.link + '" target="_blank"><img src="img/madrasa-ph.png" data-src="' + this.image + '"><div id="featured"><a id="tags" href="#">' + this.tags + '</a></div><h3>' + this.title + '</h3><p>' + this.description + '</p><div class="actions post"><a class="actions poster" target="_blank" href="#" >Added by uname</a><a class="actions star" target="_blank" href="#" title="Star this">10 Stars</a></div><hr></a></div>');
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
                mixpanel.track_links("#link-overlay a", "click external link", {"title": this.title});

                if (data.results.length > 0) {
                    $.each(data.results, function () {
                        $('#link-display').append('<div id="link-overlay"><a href="' + this.link + '" target="_blank"><img src="img/madrasa-ph.png" data-src="' + this.image + '"><div id="featured"><a id="tags" href="#">' + this.tags + '</a></div><h3>' + this.title + '</h3><p>' + this.description + '</p><div class="actions post"><a class="actions twitter" target="_blank" href="http://twitter.com/home?status=I just learned about ' + encodeURIComponent(this.title) + ' ' + encodeURIComponent(this.link) + ' via @madrasaknows" title="Tweet this">Tweet</a><a class="actions reddit" target="_blank" title="Share to Reddit" href="//www.reddit.com/submit?title=' + this.title + '&url=' + this.link + '">Reddit This</a><a class="actions fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(this.link) + '&t=' + encodeURIComponent(this.title) + '" target="_blank" title="Share to Facebook">Share</a></div><hr></a></div>');
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
                mixpanel.track_links("#link-overlay a", "click external link", {"title": this.title});

				if (data.results.length > 0) {

					$.each(data.results, function () {
                        $('#link-display').append('<div id="link-overlay"><a href="' + this.link + '" target="_blank"><img src="img/madrasa-ph.png" data-src="' + this.image + '"><div id="featured"><a id="tags" href="#">' + this.tags + '</a></div><h3>' + this.title + '</h3><p>' + this.description + '</p><div class="actions post"><a class="actions twitter" target="_blank" href="http://twitter.com/home?status=I just learned about ' + encodeURIComponent(this.title) + ' ' + encodeURIComponent(this.link) + ' via @madrasaknows" title="Tweet this">Tweet</a><a class="actions reddit" target="_blank" title="Share to Reddit" href="//www.reddit.com/submit?title=' + this.title + '&url=' + this.link + '">Reddit This</a><a class="actions fb" href="http://www.facebook.com/sharer.php?u=' + encodeURIComponent(this.link) + '&t=' + encodeURIComponent(this.title) + '" target="_blank" title="Share to Facebook">Share</a></div><hr></a></div>');
					});
					$('img').unveil(200);

				} else {
					$('#link-display').append("<h1 id='title'>Sorry no results for <a href='#'>" + searchText + "</a>. Here's some other posts.</h1>");
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
                    $('.display.submission').remove();
                    
                } else {
                    alert(data.error);
                }
            }
        });
    }
}

function openLogin() {
    
    $('.panel.login').append("<div class='display login'><form><a class='close' href='#'><img src='img/close-btn-w.png'></a><h1>Sign In</h1><p>Start saving and sharing how-tos from around the web</p><input class='field email' type='email' placeholder='youremail@example.com'><input class='field password' type='password' placeholder='Enter password'><p class='msg'>No account? <a class='reg-switch' href='#'>sign up here</a></p><hr><input class='submit login' type='button' value='Sign In'></form></div>");
    
    $('.reg-switch').click(function () {
        $('.display.login').remove();
        openRegister();
    });
    
    $('.submit.login').click(function () {
        loginUser();
    });
    
    $('.close').click(function () {
        $('.display.login').remove();
    });
}
function loginUser() {
	
	var loginUser = [$('.field.email').val(), $('.field.password').val()];
    
    if (loginUser[0] === '' || loginUser[1] === '') {
        alert('Please enter your user name and password.');
    } else {
        $.ajax({
            url: 'php/login.php',
            type: 'POST',
            data: { 'login' : loginUser },
            beforeSend: function () {
                
            },
            success: function (data) {

                if (data.success) {

                    alert('You are now signed in!');
                    $('.display.loginUser').remove();
                    
                    
                } else {
                    alert(data.error);
                }
            }
        });
    }
}

function openRegister() {
    
    $('.panel.login').append("<div class='display register'><form><a class='close' href='#'><img src='img/close-btn-w.png'></a><h1>Create Your Account</h1><p>Join a growing community of people who love to learn.</p><input class='field user' type='text' placeholder='Pick a username*'><input class='field email' type='email' placeholder='youremail@example.com*'><input class='field password' type='password' placeholder='Choose a password*'><hr><input class='submit register' type='button' value='Sign Me Up Scotty'></form></div>");
    
    $('.submit.register').click(function () {
        registerUser();
    });
    
    $('.close').click(function () {
        $('.display.register').remove();
    });
}
function registerUser() {
	
	var signupUser = [$('.field.user').val(), $('.field.email').val(), $('.field.password').val()];
    
    if (submitFields[0] === '' || submitFields[1] === '' || submitFields[2] === '') {
        alert('Please fill out all the text boxes.');
    } else {
        $.ajax({
            url: 'php/register.php',
            type: 'POST',
            data: { 'register' : signupUser },
            beforeSend: function () {
                
            },
            success: function (data) {

                if (data.success) {

                    alert('Thanks for registering!');
                    $('.display.openRegister').remove();
                    
                } else {
                    alert(data.error);
                }
            }
        });
    }
}