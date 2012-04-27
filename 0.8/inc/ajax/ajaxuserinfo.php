<?php
/*Ajax to login & logout user*/
session_start(); 

//receive $_GET
 $user = isset($_GET['user'])?$_GET['user']:'false';
 
if($user == 'false') {
    if(!isset($_SESSION['userInfo'])){    
        header("HTTP/1.0 400 Bad Request");
        echo "ajaxSession.php failed because 'user' query parameter is missing";
        exit();    
    }
}

//remove session user
if(!isset($_SESSION['userInfo'])){
    //save session
    session_register('userInfo');
    $_SESSION['userInfo'] = array(); 
    $_SESSION['userInfo']['name'] = $user;
}else{
    //unset session
    unset($_SESSION['userInfo']);        
}

//ajax need a json response
echo '{"Value": "Success"}';
?>