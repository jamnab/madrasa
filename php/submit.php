<?php
    
$data = array(
		'success' => false,
		'error' => ''
	);

    $submit = array(
		'title' => "$_REQUEST['title']",
		'link' => "$_REQUEST['link']",
        'image' => "$_REQUEST['image']",
        'desc' => "$_REQUEST['desc']",
        'cat' => "$_REQUEST['cat']",
        'tags' => "$_REQUEST['tags']",
	);
	
	//Connect to the database
    require_once('db.inc.php');
	
	//Has the text been posted?
	if (isset($submit['title']) && isset($submit['link']) && isset($submit['desc']) && isset($submit['cat'])) {

		

		//Escape each field to prevent SQL injection
        $title = $db->real_escape_string($submit['title']);
        $link = $db->real_escape_string($submit['link']);
        $image = $db->real_escape_string($submit['image']);
        $desc = $db->real_escape_string($submit['desc']);
        $cat = $db->real_escape_string($submit['cat']);
        $tags = $db->real_escape_string($submit['tags']);
        
        //foreach($submit as $submit) {
          //  $submit = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $submit);
        //}
        
        //escape invalid ascii characters
             
        //Create query to insert values
		$s = "INSERT INTO startups" . "(title, link, image, description, category, tags)" . "VALUES ('$title', '$link', '$image', '$desc', '$cat', '$tags')";
        
        $data['success'] = true;
        
    } else {
        $data['success'] = false;
        $data['error'] = "C'mon man! That's not a valid submission!";
        
    }
	
	//Set the content type for a json object and ensure charset is UTF-8. NOt utf8 otherwise it will not work in IE (Darn IE! >.<)
	header("Content-Type: application/json; charset=UTF-8");
    echo json_encode((object)$data);
?>