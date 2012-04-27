<?php 
ob_start();
session_start();

function redirect($url,$second)
	{
		return '<meta http-equiv="refresh" content="'.$second.';url='.$url.'" />';
	}
	
  // include the LinkedIn class
  require_once('linkedin_3.0.1.class.php');	

  // display constants
  $API_CONFIG = array(
    'appKey'       => 'TsTwOBFGX0oyzXqfSxbpK-8tWOKb-GEs12Qwg0wfjSjiuExEULrpXEdK3-0d7tRN',
	  'appSecret'    => 'ru3GwsDhSSiWBexx2Yb9do1K7wdRV4nrCCKjHRFfHiG2hVWxlF2rhig1L1_E-rBV',
	  'callbackUrl'  => NULL 
  );
  define('CONNECTION_COUNT', 20);
  define('UPDATE_COUNT', 10);

  // set index
  $_REQUEST[LINKEDIN::_GET_TYPE] = (isset($_REQUEST[LINKEDIN::_GET_TYPE])) ? $_REQUEST[LINKEDIN::_GET_TYPE] : '';
  switch($_REQUEST[LINKEDIN::_GET_TYPE]) {
 
    case 'initiate':
			      // user initiated LinkedIn connection, create the LinkedIn object
			      $API_CONFIG['callbackUrl'] = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['PHP_SELF'] . '?' . LINKEDIN::_GET_TYPE . '=initiate&' . LINKEDIN::_GET_RESPONSE . '=1';
			      $OBJ_linkedin = new LinkedIn($API_CONFIG);
			      
			      // check for response from LinkedIn
			      $_GET[LINKEDIN::_GET_RESPONSE] = (isset($_GET[LINKEDIN::_GET_RESPONSE])) ? $_GET[LINKEDIN::_GET_RESPONSE] : '';
			      if(!$_GET[LINKEDIN::_GET_RESPONSE]) {
			        // LinkedIn hasn't sent us a response, the user is initiating the connection
			        
			        // send a request for a LinkedIn access token
			        $response = $OBJ_linkedin->retrieveTokenRequest();
			        if($response['success'] === TRUE) {
			          // split up the response and stick the LinkedIn portion in the user session
			          $_SESSION['oauth']['linkedin']['request'] = $response['linkedin'];
			          $url = LINKEDIN::_URL_AUTH . $_SESSION['oauth']['linkedin']['request']['oauth_token'];
			          //$pattern = "#^#"
			          // redirect the user to the LinkedIn authentication/authorisation page to initiate validation.
			          //header('Location: ' . LINKEDIN::_URL_AUTH . $_SESSION['oauth']['linkedin']['request']['oauth_token']);
			          echo redirect($url,0);
			        } else {
			          // bad token request
			          echo "Request token retrieval failed:<br /><br />RESPONSE:<br /><br /><pre>" . print_r($response, TRUE) . "</pre><br /><br />LINKEDIN OBJ:<br /><br /><pre>" . print_r($OBJ_linkedin, TRUE) . "</pre>";
			        }
			      } else {
			        // LinkedIn has sent a response, user has granted permission, take the temp access token, the user's secret and the verifier to request the user's real secret key
			        $response = $OBJ_linkedin->retrieveTokenAccess($_GET['oauth_token'], $_SESSION['oauth']['linkedin']['request']['oauth_token_secret'], $_GET['oauth_verifier']);
			        if($response['success'] === TRUE) {
			          // the request went through without an error, gather user's 'access' tokens
			          $_SESSION['oauth']['linkedin']['access'] = $response['linkedin'];
			          
			          // set the user as authorized for future quick reference
			          $_SESSION['oauth']['linkedin']['authorized'] = TRUE;
			            
			          // redirect the user back to the demo page
			          //header('Location: ' . $_SERVER['PHP_SELF']);
			          echo redirect($_SERVER['PHP_SELF'],0);
			        } else {
			          // bad token access
			          echo "Access token retrieval failed:<br /><br />RESPONSE:<br /><br /><pre>" . print_r($response, TRUE) . "</pre><br /><br />LINKEDIN OBJ:<br /><br /><pre>" . print_r($OBJ_linkedin, TRUE) . "</pre>";
			        }
			      }
			      break;
    default:
      // nothing being passed back, display demo page
}

      // check PHP version
      if(version_compare(PHP_VERSION, '5.0.0', '<')) {
        throw new Exception('You must be running version 5.x or greater of PHP to use this library.'); 
      } 
      
      // check for cURL
      if(extension_loaded('curl')) {
        $curl_version = curl_version();
        $curl_version = $curl_version['version'];
      } else {
        throw new Exception('You must load the cURL extension to use this library.'); 
      }
?>
          <?php
          if(isset($_SESSION['oauth']['linkedin']['authorized'])){
	          if($_SESSION['oauth']['linkedin']['authorized'] == 1) {
	            // user is already connected
	            $OBJ_linkedin = new LinkedIn($API_CONFIG);
	            $OBJ_linkedin->setTokenAccess($_SESSION['oauth']['linkedin']['access']);
				
	            $response = $OBJ_linkedin->connections('~/connections:(id,first-name,last-name,main-address,location,phone-numbers,picture-url)?start=0&count=' . CONNECTION_COUNT);
	            if($response['success'] === TRUE) {
	             $connections = new SimpleXMLElement($response['linkedin']);
				 
				 $_SESSION['linkedin'] = array();
				 $i = 0;
				 foreach($connections->person as $connection){
				 	$_SESSION['linkedin'][$i]['first-name'] = (string) $connection->{'first-name'};
				 	$_SESSION['linkedin'][$i]['last-name'] = (string) $connection->{'last-name'};
				 	$_SESSION['linkedin'][$i]['main-address'] = (string) $connection->{'main-address'};
				 	$_SESSION['linkedin'][$i]['city'] = (string) $connection->{'location'}->{'name'};
				 	$_SESSION['linkedin'][$i]['country'] = (string) $connection->{'location'}->{'country'}->{'code'};
				 	$_SESSION['linkedin'][$i]['phone-number'] = (string) $connection->{'phone-numbers'}->{'phone-number'}->{'phone-number'};
				 	$_SESSION['linkedin'][$i]['picture-url'] = (string) $connection->{'picture-url'};
					$i++;
				 }
				 print_r($_SESSION['linkedin']);				 
				 echo "<script>window.close();if (window.opener && !window.opener.closed) {window.opener.location.reload();}</script>";
				}
				
              
			  }
		  }
            ?>