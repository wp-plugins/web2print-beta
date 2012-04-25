<?php
require_once '../Zend/Loader.php';
Zend_Loader::loadClass('Zend_Oauth');
Zend_Loader::loadClass('Zend_Oauth_Consumer');
Zend_Loader::loadClass('Zend_Oauth_Token_Request');
Zend_Loader::loadClass('Zend_Gdata');


// set your Google consumer key / secret
$CONSUMER_KEY		=	'flyerwolf.com';
$CONSUMER_SECRET	=	'lwLSesrsFY69q7psgA2+jjBC';

//$RETURN_TO = 'http://localhost/contacting/inc/importGoogle.php';
//http://localhost/wordpress/wp-content/plugins/Web_2_Print_XML_V3

$RETURN_TO = "http://".$_SERVER[HTTP_HOST].$_SERVER[PHP_SELF];

// Multi-scoped token.

$SCOPES = array(//scope to access

'https://docs.google.com/feeds/',
'https://www.google.com/m8/feeds/',
'https://docs.googleusercontent.com/'

);


$oauthOptions = array(//config request parameter

/*'requestScheme' => Zend_Oauth::REQUEST_SCHEME_HEADER,

'version' => '1.0',*/

'consumerKey' => $CONSUMER_KEY,

'consumerSecret' => $CONSUMER_SECRET,

'signatureMethod' => 'HMAC-SHA1',

'callbackUrl' => $RETURN_TO,

'requestTokenUrl' => 'https://www.google.com/accounts/OAuthGetRequestToken',

'userAuthorizationUrl' => 'https://www.google.com/accounts/OAuthAuthorizeToken',

'accessTokenUrl' => 'https://www.google.com/accounts/OAuthGetAccessToken'

);//config request parameter - END

$consumer = new Zend_Oauth_Consumer($oauthOptions);//create consumer
?>