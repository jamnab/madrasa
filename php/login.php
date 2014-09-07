<?php
	//Prepare an array to hold data we are going to send back to the jQuery
	$data = array(
		'results' => array(),
		'success' => false,
		'error' => ''
	);

    if (isset($_POST['login']) && ($_POST['login']) !="" ) {
        
        //Connect to the database
		require_once('db.inc.php');
        
        
        foreach($_POST['login'] as $key=>$i) {
            //Escape array to prevent SQL injection
            $_POST['login'][$key] = $db->real_escape_string($i);   
        }
        //Assign email var
        $email = $_POST['login'][0];
        $pword = $_POST['login'][1];
        
        // Select random posts
        $q = "SELECT * FROM users WHERE uname LIKE '" . $email . "' AND pword LIKE '" . $pword;
        
        $result = $db->query($q);
        
		//Did the query complete successfully?
		if (!$result) {

			//If not add an error to the data array
			$data['error'] = "Sorry I couldn't find an account with that information.";
		} else {

			//Loop through the results and add to the results array
			while ($row = $result->fetch_assoc()) {
				$data['results'][] = array(
					'title' => $row['title'],
					'link' => $row['link'],
					'image' => $row['image'],
					'description' => $row['description'],
					'tags' => $row['tags']
				);
			}
			//Everything went to plan so set success to true
			$data['success'] = true;
		  } 
        }

	
    
	//Set the content type for a json object and ensure charset is UTF-8. NOt utf8 otherwise it will not work in IE (Darn IE! >.<)
	header("Content-Type: application/json; charset=UTF-8");

	//json encode the data and cast to an object so we can reference items like this.id in the javascript instead of this['id'] etc.
	echo json_encode((object)$data);

?>
