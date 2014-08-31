<?php
echo "
<!DOCTYPE html>
<html lang='en-US'>
<head>
	<title>Madrasa | Learn About Startups, From Startups</title>
	<meta name='description' content='Madrasa makes it easier to find articles and videos from the best in the industry to help you the gain insight and skills you need to succeed.'>
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
	
	<!--[if lt IE 9]>
		<script src='js/html5shiv.min.js'></script>
	<![endif]-->	
	
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-43086008-6', 'auto');
  ga('send', 'pageview');

</script>

</head>
    
<body>
    <div id=\"fb-root\"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = \"//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0\";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>
	<div id='header-panel'>
		<div id='branding'><a id='logo' href='http://www.madrasa.ca' title='home'><img id='icon' src='img/ma-logo-w.png' alt='Ma'><img id='word-mark' src='img/ma-wordmark.png' alt='Madrasa'></a></div>
        <div id='menu'>
            <input class='btn search' type='button' title='search'>
            <input class='btn add' type='button' title='submit'>
            <input class='btn menu' type='button' title='menu'>
        </div>
	</div>
    <div id='search-panel'><input id='text' type='search' placeholder='What would you like to learn?'></div>
	<ul id='topic-list'></ul>
	<div id='banner-panel'></div>            
	<div id='main-panel'><div id='link-display'><h1 id='title'></h1></div></div>
    <div id='submit-panel'></div>    
</body>
<script ansyc src='http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js'></script>
    <script defer src='js/link.js'></script>
    <script async src='js/jquery.unveil.js'></script>
    <script async src=\"php/mysearch.php?text=" . $_REQUEST['text'] . "\"></script>
</html>";

?>