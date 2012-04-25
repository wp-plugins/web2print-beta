<?php
ob_start();
session_start();
// load Zend Gdata libraries
require_once '../Zend/Loader.php';
require_once 'GData_Cls.php';
require_once 'oauth_common.php';

Zend_Loader::loadClass('Zend_Gdata');
Zend_Loader::loadClass('Zend_Gdata_AuthSub');
Zend_Loader::loadClass('Zend_Gdata_Query');
Zend_Loader::loadClass('Zend_Gdata_Feed');

//tao doi tuong gdata(dung de ket noi gg)
$gdata = new GData();

if(isset($_SESSION['ACCESS_TOKEN']) && $_SESSION['ACCESS_TOKEN']!=NULL)
{
	$_SESSION['httpClient'] = $gdata->getClientWithAccess($_SESSION['ACCESS_TOKEN']);
}
else
{
	if (!empty($_GET) && isset($_SESSION['REQUEST_TOKEN'])) 
	{//have requesttoken
		$_SESSION['httpClient'] = $gdata->getClientWithRequest($_SESSION['REQUEST_TOKEN']);
	}
	else
	{
		//have request_token in session? give them a link to go to login page
		$_SESSION['REQUEST_TOKEN'] = serialize($consumer->getRequestToken(array('scope' => implode(' ', $SCOPES))));//save token to session
		
		$approvalUrl = $consumer->getRedirectUrl(array('hd' => 'default'));
		
		header('Location: '.$approvalUrl);
		
		//echo "<a href=\"$approvalUrl\">Grant access</a>";
		
		exit();//stop the code
		
	}
}

if(isset($_SESSION['httpClient']))//neu da co client
{
	$gdata = new GData();
	$gdata->setClient($_SESSION['httpClient']);
	$_SESSION['contact']  = $gdata->getResult();//dung client de lay du lieu
	$id = $gdata->getresultId();
	$_SESSION['contact']['Id'] = (string) $id;
	
	if($_SESSION['contact']){
		//header('Location: http://localhost/contacting/importContact.php');		
		echo "<script>window.close();if (window.opener && !window.opener.closed) {window.opener.location.reload();}</script>";
		
	}
}

?>