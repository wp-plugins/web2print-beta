<?php
session_start();
/*
 Plugin Name: Widget to Login Plugin V1.0
 Plugin URI: http://www.delivergo.com
 Description: OpenID application
 Author: Normprint Ltd.
 Version: 1.0
 */
 if($_SERVER["HTTP_HOST"] == "localhost"){
	$blogURL = 'http://'.$_SERVER["HTTP_HOST"].'/wordpress';
 }else{
	$blogURL = 'http://'.$_SERVER["HTTP_HOST"];
 }
 
 $openIDSource = $blogURL.'/wp-content/plugins/Web_2_Print_XML_V3/inc/openid';

  
require_once('library/twitteroauth/OAuth.php');
require_once('library/twitteroauth/twitteroauth.php');

if ($_SERVER["HTTP_HOST"] == "localhost") {
    define('openid_root', $openIDSource);
	/*
    // facebook settings for wp3.dev.delivergo.com
    define('facebook_key', 'd5dbf5cac5d0e506b8f44453bca0e954');
    define('facebook_secret', '058060d155b357cb90ec434d9918b0d3');
    define('facebook_id', '192486300787992');
	*/
	    
    // facebook settings for nhain.vn
    define('facebook_key', '36ca175ecc10e1452e35609565550d76');
    define('facebook_secret', 'b2955312482f8629d035a4bf8b0c6074');
    define('facebook_id', '178264008900176');
} // end if localhost
else {
    define('openid_root', $openIDSource);    
    // facebook settings for nhain.vn
    define('facebook_key', '36ca175ecc10e1452e35609565550d76');
    define('facebook_secret', 'b2955312482f8629d035a4bf8b0c6074');
    define('facebook_id', '178264008900176');
} // end else Internet

define('openid_callback', openid_root.'/callback_addMoreProvider.php');
define('openid_login_page', openid_root.'/openid_addMoreProvider.php');
// facebook
define('facebook_logout_url', 'http://m.facebook.com/logout.php?confirm=1&next='.openid_login_page);
define('facebook_callback', openid_root.'/callback_addMoreProvider.php?mode=facebook&');
// twitter settings
define('CONSUMER_KEY', '5ffu02I9JOw4ATWDrQYVZA');
define('CONSUMER_SECRET', 'HJh6j4WOgrgcfvGg8CafobOICHh0evR75k3W7IKPf0Q');
define('OAUTH_CALLBACK', openid_root.'/callback_addMoreProvider.php?mode=twitter');

define('paypal_api', 'paypal_api1.normprint.com');
define('paypal_api_pw', 'DUZBMHDSCE5JDGBW');
define('paypal_api_signature', 'AmFLXXnTtuTqdAycsBP.Zvsu2jSWAVQq93abqOOQ240Pz--8R4GDAFsG');
define('paypal_callback', openid_root.'/callback_addMoreProvider.php?mode=paypal');

//-------------------------------------------------------------------------------------------------
function __autoload($class)
{
	//echo '<br>'.$class;
	if($class != 'Zend_Oauth_Client' && 
	   $class != 'Zend_Oauth_Config' && 
	   $class != 'Zend_Oauth_Token_Access' && 
	   $class != 'Zend_Http_Client_Adapter_Socket' &&
	   $class != 'Zend_Uri_Http' &&
	   $class != 'Zend_Http_Response'
	   ){
		   $file = 'library/' . str_replace('_', '/', $class) . '.php';
		   require_once($file);
	   }
}
//-------------------------------------------------------------------------------------------------
function redirect($url) {
    print "<html>\n<head>\n<meta http-equiv=\"refresh\" content=\"0;URL=$url\">\n</head>\n</html>";
    exit;
}   // end function
//=================================================================================================
$u = new user();

