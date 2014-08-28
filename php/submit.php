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
    	
    	$data['results'] = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $_REQUEST['submit']);
  
        foreach($data['results'] as $key=>$i) {
            //Escape array to prevent SQL injection
            $data['results'][$key] = $db->real_escape_string($i);   
        }
    	
    	$submit = $data['results'];
    	
        //Create query to insert values
		$i = "INSERT INTO posts (`title`, `link`, `image`, `description`, `category`, `tags`) VALUES ('$submit[0]', '$submit[1]', '$submit[2]', '$submit[3]', '$submit[4]', '$submit[5]')";
        $insert = $db->query($i);
        
        $data['success'] = true;
        
        $date = date('Y-m-d H:i:s');
        $to      = 'jamesbmcnab@gmail.com';
        $subject = 'post submitted';
        $message = 'A post was submitted to madrasa on' . $date;
        //$headers = 'From: daily@madrasa.ca' . "\r\n" .
          //  'Reply-To: daily@madrasa.ca' . "\r\n" .
            //'X-Mailer: PHP/' . phpversion();
        //mail($to, $subject, $message, $headers);

        mail($to, $subject, $message);

    } else {
        $data['success'] = false;
        $data['error'] = "C'mon man! That's not a valid submission!";
        
    }
	
	//Set the content type for a json object and ensure charset is UTF-8. NOt utf8 otherwise it will not work in IE (Darn IE! >.<)
	header("Content-Type: application/json; charset=UTF-8");
    echo json_encode((object)$data);
?>