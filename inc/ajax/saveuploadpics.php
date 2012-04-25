<?php

/* The redirect file is used for redirecting to order confirmation

after save post parameters to the session

this will solve the resend from browers */
	//session start
    session_start();
	
    ini_set('session.gc_maxlifetime',30*60);
	ini_set('session.gc_probability',1);
	ini_set('session.gc_divisor',1);
	
	session_regenerate_id();
	
	//create session
	if(!isset($_SESSION['pics_import'])){
		$_SESSION['pics_import'] = Array();
	}

	//save shopping cart session
	if(isset($_GET['data'])){
		$pics_import = stripslashes($_GET['data']);
		$pics_import = json_decode($pics_import);
		
		//save to session
		//for($i = 0; $i < count($pics_import); $i++){
			array_push($_SESSION['pics_import'], $pics_import);
		//}		
	}
	
	session_write_close();
?>
