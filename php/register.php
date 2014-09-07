<?php
    
$data = array(
	'results' => array(),	
    'success' => false,
    'error' => ''
);

	//Connect to the database
    require_once('db.inc.php');
	
	//Has the text been posted?
if (isset($_REQUEST['register']) && ($_REQUEST['register'] != "") ) {
  
        foreach($data['results'] as $key=>$i) {
            //Escape array to prevent SQL injection
            $data['results'][$key] = $db->real_escape_string($i);   
        }
    	
    	$register = $data['results'];
    	
        //Create query to insert values
		$r = "INSERT INTO users (`uname`, `email`, `password`) VALUES ('$register[0]', '$register[1]', '$register[2]')";
        $signup = $db->query($r);
        
        $to      = $register[1];
        $subject = 'Welcome to Madrasa';
        $message = 'Thanks for Signing. Click the link to login and start learning with Madrasa: http://www.madrasa.ca';
        $headers = 'From: daily@madrasa.ca' . "\r\n" .
        'Reply-To: daily@madrasa.ca' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

        mail($to, $subject, $message, $headers)
    
    } else {
        $data['success'] = false;
        $data['error'] = "C'mon man! That's not a valid submission!";
        
    }
	
	//Set the content type for a json object and ensure charset is UTF-8. NOt utf8 otherwise it will not work in IE (Darn IE! >.<)
	header("Content-Type: application/json; charset=UTF-8");
    echo json_encode((object)$data);
?>