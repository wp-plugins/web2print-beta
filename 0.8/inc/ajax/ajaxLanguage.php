<?php
	//session start
	session_start();
	
	if(isset($_GET['option']) && $_GET['option'] == 'language'){
		$_SESSION["current_language"]['key'] = strtolower($_GET['language']).'_'.$_GET['language'];		
		$_SESSION["current_language"]['name'] = $_GET['languageName'];		
		echo json_encode('Success');						
	}
	    
	if(isset($_GET['option']) && $_GET['option'] == 'currency'){
		$_SESSION["current_currency"]['key'] = $_GET['currency'];		
		echo json_encode('Success');						
	} 
	
	if(isset($_GET['option']) && $_GET['option'] == 'dimension'){
		$_SESSION["current_dimension"] = $_GET['dimension'];		
		echo json_encode('Success');						
	}  

	if(isset($_GET['option']) && $_GET['option'] == 'getcountrycode'){
		$country = file_get_contents('http://api.wipmania.com/'.$_GET['ip'].'?google.com');	
		echo $country;						
	} 
	
?>