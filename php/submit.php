<?php
    
$data = array(
	'results' => array(),	
    'success' => false,
    'error' => ''
);

	//Connect to the database
    require_once('db.inc.php');
	
	//Has the text been posted?
if (isset($_REQUEST['submit'])) {		
    
        //foreach($_REQUEST['submit'] as $data['results']) {
            //Escape array to prevent SQL injection
            //$data['results'] = $db->real_escape_string($_REQUEST['submit']);
            //$data['results'] = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $_REQUEST['submit']);
        //}
    
        //Create query to insert values
		//$s = "INSERT INTO startups" . "(title, link, image, description, category, tags)" . "VALUES ('$submit[0]', '$submit[1]', '$submit[2]', '$submit[3]', '$submit[4]', '$submit[5]')";
        $data['results'] = $_REQUEST['submit'];
        $data['success'] = true;
        
    } else {
        $data['success'] = false;
        $data['error'] = "C'mon man! That's not a valid submission!";
        
    }
	
	//Set the content type for a json object and ensure charset is UTF-8. NOt utf8 otherwise it will not work in IE (Darn IE! >.<)
	header("Content-Type: application/json; charset=UTF-8");
    echo json_encode((object)$data);
?>