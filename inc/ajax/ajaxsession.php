<?php
session_start();
/**
 * @author kubia47
 * @copyright 2010
 */                
 //receive $_GET
 $proxy_id = isset($_GET['picId'])?$_GET['picId']:'false';
 
if($proxy_id == 'false') {    
    header("HTTP/1.0 400 Bad Request");
    echo "ajaxSession.php failed because 'picId' query parameter is missing";
    exit();    
}
 
//unset the session with received picture
if(isset($_SESSION['containCount'])){
    //delete the element of the session
    $_SESSION['containCount'][$proxy_id] = '';
    $_SESSION['formatImg'][$proxy_id] = '';    
    //unset($_SESSION['description'][$proxy_id]);
    //unset($_SESSION['amountCart'][$proxy_id]);
    //unset($_SESSION['priceCart'][$proxy_id]); 
}

echo '{"Value": "Success"}';
?>