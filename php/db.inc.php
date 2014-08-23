<?php
$dbhost = 'localhost'; //hostname
$dbuser = 'root'; //database username
$dbpass = 'amazonsocom'; //database password
$dbname = 'madrasa'; //database name

//Create the connection to the mySQL database or catch the exception if there is an error
$db = new mysqli($dbhost, $dbuser, $dbpass);

$db->select_db($dbname);

if($db->mysqli_connect_errno > 0){
    die('ERROR! - COULD NOT CONNECT TO mySQL DATABASE: ' . $db->connect_error);
}

//$clear = "FLUSH QUERY CACHE";

//$db->query($clear);

?>