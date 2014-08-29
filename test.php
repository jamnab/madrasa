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

<script>
// Include the UserVoice JavaScript SDK (only needed once on a page)
UserVoice=window.UserVoice||[];(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/1NEz1ThXifqkPb2swiGxQ.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();

//
// UserVoice Javascript SDK developer documentation:
// https://www.uservoice.com/o/javascript-sdk
//

// Set colors
UserVoice.push(['set', {
  accent_color: '#f7e577',
  trigger_color: 'white',
  trigger_background_color: '#f7e577'
}]);

// Identify the user and pass traits
// To enable, replace sample data with actual user traits and uncomment the line
UserVoice.push(['identify', {
  //email:      'john.doe@example.com', // User’s email address
  //name:       'John Doe', // User’s real name
  //created_at: 1364406966, // Unix timestamp for the date the user signed up
  //id:         123, // Optional: Unique id of the user (if set, this should not change)
  //type:       'Owner', // Optional: segment your users by type
  //account: {
  //  id:           123, // Optional: associate multiple users with a single account
  //  name:         'Acme, Co.', // Account name
  //  created_at:   1364406966, // Unix timestamp for the date the account was created
  //  monthly_rate: 9.99, // Decimal; monthly rate of the account
  //  ltv:          1495.00, // Decimal; lifetime value of the account
  //  plan:         'Enhanced' // Plan name for the account
  //}
}]);

// Add default trigger to the bottom-right corner of the window:
UserVoice.push(['addTrigger', { mode: 'satisfaction', trigger_position: 'bottom-right' }]);

// Or, use your own custom trigger:
//UserVoice.push(['addTrigger', '#id', { mode: 'satisfaction' }]);

// Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
UserVoice.push(['autoprompt', {}]);
</script>

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

	<div id='header-panel'>
		<div id='branding'><a id='logo' href='http://www.madrasa.ca' title='home'><img id='icon' src='img/ma-logo-w.png' alt='Ma'><img id='word-mark' src='img/ma-wordmark.png' alt='Madrasa'></a></div>
        <div id='menu'><input class='btn add' type='button' title='submit'><input class='btn menu' type='button' title='menu'></div>
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