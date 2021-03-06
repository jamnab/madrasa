<?php
	//Prepare an array to hold data we are going to send back to the jQuery
	$data = array(
		'results' => array(),
		'success' => false,
		'error' => ''
	);

    if (isset($_POST['subject'])) {
        
        //Connect to the database
		require_once('db.inc.php');

        //Collect subject title
        $subject = $db->real_escape_string($_POST['subject']); //prevent sql injection
        
        // Select random posts
        $q = "SELECT * FROM posts WHERE category LIKE '" . $subject . "' ORDER BY RAND() LIMIT 150";
        
        $result = $db->query($q);
        
		//Did the query complete successfully?
		if (!$result) {

			//If not add an error to the data array
			$data['error'] = "Could not query database for search results, MYSQL ERROR: " . $db->error;
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
