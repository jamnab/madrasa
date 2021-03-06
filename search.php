<?php
echo "
<!DOCTYPE html>
<html lang='en-US'>
<head>
	<title>Madrasa | Enjoy Learning</title>
	<meta name='description' content='Enjoy Learning. Discover crazy, fun and interesting projects to do with your time.'>
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'>

	<link rel='icon' href='img/favicon.png'>
        <link rel='apple-touch-icon' href='img/ma-apple-icon.png'>
        <link rel='canonical' href='http://madrasa.ca'>
	<link rel='stylesheet' type='text/css' href='css/style.min.css'>
	<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700' rel='stylesheet' type='text/css'>

<!-- Twitter Card data --> 
<meta name='twitter:card' content='Enjoy Learning. Discover crazy, fun and interesting projects to do with your time.'> 
<meta name='twitter:site' content='@madrasaknows'> 
<meta name='twitter:title' content='Madrasa'> 
<meta name='twitter:description' content='Enjoy Learning. Discover crazy, fun and interesting projects to do with your time.'> 
<meta name='twitter:creator' content='@madrasaknows'> 
<meta name='twitter:image' content='http://madrasa.ca/img/ma-apple-icon.png'>

<!-- Open Graph data --> 
<meta property='og:title' content='Madrasa' /> 
<meta property='og:type' content='article' /> 
<meta property='og:url' content='http://madrasa.ca/' />
<meta property='og:image' content='http://madrasa.ca/img/ma-og-icon.png' />
<meta property='og:description' content='Enjoy Learning. Discover crazy, fun and interesting projects to do with your time.' /> 
<meta property='og:site_name' content='Madrasa' /> 
<meta property='fb:admins' content='508293321' />

<script type='text/javascript' src='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-52056f8b7993c149'></script>
	
	<!--[if lt IE 9]>
		<script src='js/html5shiv.min.js'></script>
	<![endif]-->	
	
</head>
    
<body>
<div id='fb-root'></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

	<div id='search-panel'>
		<div id='branding'><a id='logo' href='http://www.madrasa.ca'><img id='icon' src='img/ma-logo-w.png' alt='Ma'><img id='word-mark' src='img/ma-wordmark.png' alt='Madrasa'></a></div>
        
        <div id='search-area'>
		<input id='text' type='search' placeholder='What do you want to learn?' autofocus>

        </div>
        <div id='menu'><input id='menu-btn' type='button'></div>
		
		

	</div>
	<ul id='topic-list'>
                
                <li><a class='topic' id='art' href='#'><h4>Art</h4></a></li>
		<li><a class='topic' id='career' href='#'><h4>Career</h4></a></li>
                <li><a class='topic' id='design' href='#'><h4>Design</h4></a></li>
                <li><a class='topic' id='diy' href='#'><h4>DIY</h4></a></li>
                <li><a class='topic' id='fashion' href='#'><h4>Fashion</h4></a></li>
                <li><a class='topic' id='fitness' href='#'><h4>Fitness</h4></a></li>
                <li><a class='topic' id='food' href='#'><h4>Food</h4></a></li>
                <li><a class='topic' id='health' href='#'><h4>Health</h4></a></li>
                <li><a class='topic' id='language' href='#'><h4>Languages</h4></a></li>
                <li><a class='topic' id='lifehacks' href='#'><h4>Lifehacks</h4></a></li>
                <li><a class='topic' id='maker' href='#'><h4>Maker</h4></a></li>
                <li><a class='topic' id='money' href='#'><h4>Money</h4></a></li>
                <li><a class='topic' id='sports' href='#'><h4>Sports</h4></a></li>
		<li><a class='topic' id='startups' href='#'><h4>Startups</h4></a></li>
                <li><a class='topic' id='tech' href='#'><h4>Tech</h4></a></li>
                <li><a class='topic' id='writing' href='#'><h4>Writing</h4></a></li>
            
	    </ul>
            
	<div id='main-panel'>
		
		<div id='link-display'>
			<h1 id='title'></h1>
			
		</div>
		
	</div>    
</body>
<script ansyc src='http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js'></script>
    <script defer src='js/link.js'></script>
    <script async src='js/jquery.unveil.js'></script>
    <script async src=\"php/mysearch.php?text=" . $_REQUEST['text'] . "\"></script>
</html>";

?>