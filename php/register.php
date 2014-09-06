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
    	
    	$data['results'] = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $_REQUEST['register']);
  
        foreach($data['results'] as $key=>$i) {
            //Escape array to prevent SQL injection
            $data['results'][$key] = $db->real_escape_string($i);   
        }
    	
    	$register = $data['results'];
    	
        //Create query to insert values
		$r = "INSERT INTO users (`uname`, `email`, `password`) VALUES ('$register[0]', '$register[1]', '$register[2]')";
        $signup = $db->query($r);
        
        $data['success'] = true;
        
        if ($data['success'] = true) {
            $date = date('Y-m-d H:i:s');
            $to      = 'jamesbmcnab@gmail.com';
            $subject = 'user registered';
            $message = 'A new user signed up on' . $date;
            //$headers = 'From: daily@madrasa.ca' . "\r\n" .
              //  'Reply-To: daily@madrasa.ca' . "\r\n" .
                //'X-Mailer: PHP/' . phpversion();
            //mail($to, $subject, $message, $headers);

            mail($to, $subject, $message);
        }
    } else {
        $data['success'] = false;
        $data['error'] = "C'mon man! That's not a valid submission!";
        
    }
	
	//Set the content type for a json object and ensure charset is UTF-8. NOt utf8 otherwise it will not work in IE (Darn IE! >.<)
	header("Content-Type: application/json; charset=UTF-8");
    echo json_encode((object)$data);
?>