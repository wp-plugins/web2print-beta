<?php
/*
 Plugin Name: Web to Print Plugin V3.1
 Plugin URI: http://www.delivergo.com
 Description: facebook application
 Author: Normprint Ltd.
 Version: 3.1
 */
class HOME_PHOTO {
function HOME_PHOTO($vt_config_2 = null){
    global $vt_config;
    if (is_array($vt_config_2)) {
        $this->TEXTS = $vt_config_2;    
    }
    else {
        $this->TEXTS = $vt_config;
    }
    
	$this->tpl = new template("VYTIEN");
    $this->session_register_vt();
}
//=================================================================================================
function redirect($url) {
    print "<html>\n<head>\n<meta http-equiv=\"refresh\" content=\"0;URL=$url\">\n</head>\n</html>";
    exit;
}
//=================================================================================================
function session_register_vt() {
    if (!session_is_registered("VT_PHOTOS")) {
        session_register("VT_PHOTOS");
        $_SESSION["VT_PHOTOS"] = array();
    }
}
//=================================================================================================
function process_update_list_selected_photos() {
    $new_photo = $_REQUEST["photo"];
    $arr_photos_remove[] = $new_photo;
    if (in_array($new_photo, $_SESSION["VT_PHOTOS"])) {
        $_SESSION["VT_PHOTOS"] = array_diff($_SESSION["VT_PHOTOS"], $arr_photos_remove);    
    }   // remove
    else {
        $_SESSION["VT_PHOTOS"][] = $new_photo;
    } // add new
}
//=================================================================================================
function process_view_my_selected_photos() {
    $this->TEXTS["_LIST_IMG_"] = "You don't have any selected photo.";
    
    if ($_SESSION["VT_PHOTOS"]) {
        $this->TEXTS["_LIST_IMG_"] = "";
        foreach ($_SESSION["VT_PHOTOS"] as $i => $src) {
            $this->TEXTS["_img_source_"] = $src;
            $this->TEXTS["check_uncheck_item_no"] = "check_uncheck_{$i}";
            $this->TEXTS["item_no"] = $i;
            $this->TEXTS["add_check_icon"] = (in_array($src, $_SESSION["VT_PHOTOS"])) ? "check.png" : "add.png";
            $this->TEXTS["div_add_check"] = (in_array($src, $_SESSION["VT_PHOTOS"])) ? "div_check" : "div_add";
            $this->TEXTS["_LIST_IMG_"] .= $this->display_page("photo");
        } // end for
    } // end if
    
    $content = $this->display_page("list_selected_photos");    
    return $content;
} 
//=================================================================================================
function display_page($page, $data = null) {
    if (is_null($data)) {
        $content = $this->tpl->pget_file($this->TEXTS["themes_path"].$this->folder."{$page}".$this->TEXTS["ext"], $this->TEXTS);
    }
    else {
        $content = $this->tpl->pget_file($this->TEXTS["themes_path"].$this->folder."{$page}".$this->TEXTS["ext"], $data);
    }
    return $content;
}

//=================================================================================================
function display_photos($page, $data = null){
    $link_photos = 'skins/';
    
    if (is_null($data)) {
        $content = $this->tpl->pget_file($link_photos.$this->folder."{$page}".$this->TEXTS["ext"], $this->TEXTS);
    }
    else {
        $content = $this->tpl->pget_file($link_photos.$this->folder."{$page}".$this->TEXTS["ext"], $data);
    }
    return $content;    
}

//=================================================================================================
}// END CLASS
?>