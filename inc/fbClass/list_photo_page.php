<?php
require_once('inc/class.my.template.inc'); 
require_once('inc/home.class.php'); 
require_once('inc/facebook.class.php');
require_once('inc/links.inc.php');
require_once('inc/config.inc.php');
 
$objFacebook = new FACEBOOK_PHOTO($vt_config);
if($_REQUEST['albumID'] != 'none'){
    if(isset($_REQUEST['stt']) && $_REQUEST['stt'] != 'begin'){
        unset($_SESSION['a'.$_REQUEST['albumID']]);    
    }
    
    $content = $objFacebook->get_list_photos($_REQUEST['albumID']);
    echo '<link href="css/reset.css" rel="stylesheet" type="text/css"/>';
    echo '<link href="css/list-photos.css" rel="stylesheet" type="text/css"/>';
    echo '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>';
    echo '<script src="js/list-photos.js" type="text/javascript"></script>';

    echo '<div class="photo-page-border">';
    echo $content;
    echo '<form id="selected-form" name="selected-form"><input type="hidden" name="albumID" value="'.$_REQUEST['albumID'].'"/></form>';
    echo '<script>countAlbumPictures();</script>';
    
    if(isset($_REQUEST['stt']) && $_REQUEST['stt'] == 'begin'){
        echo '<script>pictureSelectedSet();</script>';
    }
}else{
    echo '<link href="css/list-photos.css" rel="stylesheet" type="text/css"/>';
    echo '<div class="null-photos-pages">Choose your list album on the left side</div>';
}                

?>
