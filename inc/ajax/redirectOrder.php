<?php

/* The redirect file is used for redirecting to order confirmation

after save post parameters to the session

this will solve the resend from browers */
	//session start
    session_start();

    
	//save order session
	if(isset($_POST['order_components'])){	
		$_SESSION['order_component'] = json_decode(stripslashes($_POST['order_components']));
		
		if(isset($_SESSION['login']['guid'])){
			for($i = 0;$i < count($_SESSION['order_component']->{'Article'});$i++){			
				for($j = 0;$j < count($_SESSION['order_component']->{'Article'}[$i]->{'PrintData'});$j++){
					$_SESSION['order_component']->{'Article'}[$i]->{'PrintData'}[$j]->{'Items'}[0] = preg_replace('/Users\/[a-zA-Z0-9]+/','Users/'.preg_replace("/-+/", '', $_SESSION['login']['guid']),$_SESSION['order_component']->{'Article'}[$i]->{'PrintData'}[$j]->{'Items'}[0]);					
				}
			}
		}
		
	}

    //redirect to shopping cart
    header("Location: ".$_POST['order_permalink']); /* Redirect browser */

    /* Make sure that code below does not get executed when we redirect. */
    exit;
?>
