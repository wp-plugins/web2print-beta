<?php
 	//session start
    session_start(); 
/* The redirect file is used for redirecting to shopping cart

after save post parameters to the session

this will solve the resend from browers */
	//create session
	if(!isset($_SESSION['prices_import'])){		
		$_SESSION['prices_import'] = Array();
	}
        
	//save shopping cart session	
	if(isset($_POST['prices_import'])){
		//check if this string '\"' exist or not		
		preg_match('/(\\\")+/', $_POST['prices_import'], $matches);
		
		//if count > 0. this string '\"' still exists
		if(count($matches) > 0){
			//before saving to session, change char like '\"' to '"'
			array_push($_SESSION['prices_import'], json_decode(stripslashes($_POST['prices_import'])));
		}else{
			//save to session
			array_push($_SESSION['prices_import'], json_decode($_POST['prices_import']));
		}	
			
	}
	
	if(isset($_POST['guid_user'])){
		$_SESSION['prices_import']['guid-user-from-android'] = $_POST['guid_user'];
		$_SESSION['prices_import']['guid-affiliate-from-android'] = $_POST['guid_affiliate'];
		$_SESSION['prices_import']['pass-affiliate-from-android'] = $_POST['pass_affiliate'];
		$_SESSION['prices_import']['resaleid-from-android'] = $_POST['resaleID'];
	}

	if(count($_SESSION['prices_import']) != 0){
		
		session_write_close();
		 //redirect to shopping cart
    	header("Location: ".$_POST['shopcart_permalink']); /* Redirect browser */    	
	}   

    /* Make sure that code below does not get executed when we redirect. */
    exit(0);
?>
