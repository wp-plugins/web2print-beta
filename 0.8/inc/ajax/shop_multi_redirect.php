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
	if(isset($_POST['multi_prices_import'])){
		//check if this string '\"' exist or not		
		preg_match('/(\\\")+/', $_POST['multi_prices_import'], $matches);
		
		//if count > 0. this string '\"' still exists
		if(count($matches) > 0){
			$multi_prices_import = json_decode(stripslashes($_POST['multi_prices_import']));
			//before saving to session, change char like '\"' to '"'
			for($i = 0; $i < count($multi_prices_import); $i++){
				array_push($_SESSION['prices_import'], $multi_prices_import[$i]);
			}			
		}else{
			$multi_prices_import = json_decode($_POST['multi_prices_import']);
			//save to session
			for($i = 0; $i < count($multi_prices_import); $i++){
				array_push($_SESSION['prices_import'], $multi_prices_import[$i]);
			}
		}	
			
	}	
	
	if(count($_SESSION['prices_import']) != 0){		
		 //redirect to shopping cart
    	header("Location: ".$_POST['shopcart_permalink']);
    	session_write_close();
	} 

    /* Make sure that code below does not get executed when we redirect. */
   	exit(0);
?>
