<?php
class FACEBOOK_PHOTO extends HOME_PHOTO {
//=================================================================================================
function FACEBOOK_PHOTO($vt_config = null) {
    $this->HOME_PHOTO($vt_config);
    $this->folder = "fb/";
    
    $this->TEXTS["aid"] = $_REQUEST["aid"];
    /*if (is_null($_SESSION["SES"]["FACEBOOK_VT"]["access_token"])) {
        $this->redirect($this->TEXTS["link_login"]);
    }*/
    $_SESSION["FB_ALBUM_ID"] = (isset($_REQUEST["album_id"]) && $_REQUEST["album_id"]) ? $_REQUEST["album_id"] : $_SESSION["FB_ALBUM_ID"];
    $_SESSION["SES"]["FACEBOOK_VT"]["access_token"] = isset($_REQUEST["access_token"]) ? $_REQUEST["access_token"] : $_SESSION["SES"]["FACEBOOK_VT"]["access_token"];
    
    $_SESSION["SES"]["FACEBOOK_VT"]["hidListAlbums"] = isset($_REQUEST["hidListAlbums"]) ? $_REQUEST["hidListAlbums"] : $_SESSION["SES"]["FACEBOOK_VT"]["hidListAlbums"];
    $_SESSION["SES"]["FACEBOOK_VT"]["hidListAlbumsPages"] = isset($_REQUEST["hidListAlbumsPages"]) ? $this->get_all_albums_from_facebook_pages($_REQUEST["hidListAlbumsPages"]) : $_SESSION["SES"]["FACEBOOK_VT"]["hidListAlbumsPages"];
    
    $this->access_token = $_SESSION["SES"]["FACEBOOK_VT"]["access_token"];  // this array is taken from openid callback.php
    
    $this->feedURL_albums = "https://graph.facebook.com/me/albums?access_token={$this->access_token}";
    
    $this->TEXTS["_total_selected_photos_"] = count($_SESSION["VT_PHOTOS"]);
}
//=================================================================================================
function set_default_settings() {
    $this->get_user_info();
}
//=================================================================================================
function get_user_info() {
    $this->TEXTS["_account_info_"] = $_SESSION["SES"]["FACEBOOK_VT"]["account_info"] = isset($_REQUEST["account_info"]) ? $_REQUEST["account_info"] : $_SESSION["SES"]["FACEBOOK_VT"]["account_info"];
    $this->TEXTS["_account_id_"] = $_SESSION["SES"]["FACEBOOK_VT"]["account_id"] = isset($_REQUEST["account_id"]) ? $_REQUEST["account_id"] : $_SESSION["SES"]["FACEBOOK_VT"]["account_id"];
    $this->TEXTS["_account_name_"] = $_SESSION["SES"]["FACEBOOK_VT"]["account_name"] = isset($_REQUEST["account_name"]) ? $_REQUEST["account_name"] : $_SESSION["SES"]["FACEBOOK_VT"]["account_name"];

    $_SESSION["SES"]["FACEBOOK_VT"]["account_friends"] = isset($_REQUEST["account_friends"]) ? $_REQUEST["account_friends"] : $_SESSION["SES"]["FACEBOOK_VT"]["account_friends"];
    $index = 0;
    $arr_friends = $this->parse_values_from_form($_SESSION["SES"]["FACEBOOK_VT"]["account_friends"], $index);
    $this->TEXTS["_total_friends_"] = count($arr_friends);
    foreach ($arr_friends as $i => $row) {
        $list_friends .= $this->display_page("friend", $row);
    }   // end for
    $this->TEXTS["_LIST_FRIENDS_"] = $list_friends;
    //=============
    $userArr = Array();
    $userArr['accountID'] = $this->TEXTS["_account_id_"];
    $userArr['accountName'] = $this->TEXTS["_account_name_"];
    return $userArr;
}
//=================================================================================================
function get_user_info1()  {
    if ($_REQUEST["access_token"]) {
        $url_info = "https://graph.facebook.com/me/?access_token={$this->access_token}";
        $content = $this->get_content_by_url($url_info);
        $content = htmlspecialchars($content);
        $content = str_replace("&quot;", "", $content);
        $content = str_replace(",", ":", $content);
        $arr = explode(":", $content);
        $_SESSION["arr_data"]["id"] = $arr[1];
        $_SESSION["arr_data"]["name"] = $arr[3];
    }
    $this->TEXTS["_user_account_"] = $_SESSION["arr_data"]["name"];
    $this->TEXTS["_userid_"] = $_SESSION["arr_data"]["id"];    
}
//=================================================================================================
function convert_data_from_string_to_array_album($content) {
    $content = htmlspecialchars($content);
    
    $arr_temp = array("&quot;id&quot;:&quot;", "},&quot;name&quot;:&quot;");
    
    $arr = explode("},{", $content);
    
    $index = 0;
    foreach ($arr as $ele) {
        reset($arr_temp);
        foreach ($arr_temp as $tmp) {
            $pos1 = strpos($ele, $tmp) + strlen($tmp);
            $pos2 = strpos($ele, "&quot;", $pos1);
            switch ($tmp) {
                case "&quot;id&quot;:&quot;" :
                    $id = substr($ele, $pos1, $pos2 - $pos1);
                    if (substr_count($id, "_")) continue;
                    $results[$index]["id"] = $id;
                break;
                //+++++++++++++++++++++++++++++++++++++++++
                case "},&quot;name&quot;:&quot;" :
                    $name = substr($ele, $pos1, $pos2 - $pos1);
                    if (substr_count($name, "_")) continue;
                    $results[$index]["name"] = $name;
                break;
                //+++++++++++++++++++++++++++++++++++++++++
            }   // end switch
        }   // end for 2
        $index++;
    }   // end for
    
    $this->get_previous_next_page($arr[count($arr) - 1]);
    return $results;
}
//=================================================================================================
function get_previous_next_page($content) {
    
    $previous = "&quot;previous&quot;:&quot;";
    $next = "&quot;next&quot;:&quot;";
    
    // previous token 
    $pos1 = strpos($content, $previous) + strlen($previous);
    $pos2 = strpos($content, "&quot;", $pos1);
    $pre_link = substr($content, $pos1, $pos2 - $pos1);
    
    
    $pos1 = strpos($pre_link, "?") + 1;
    $pre_link = (substr($pre_link, $pos1));
    $pre_link = str_replace("&amp;", "&", $pre_link);
    $arr_pre = explode("&", $pre_link);
    list($access_token, $_SESSION["SES"]["FACEBOOK_VT"]["previous_access_token"]) = explode("=", $arr_pre[0]);
    list($limit, $_SESSION["SES"]["FACEBOOK_VT"]["previous_limit"]) = explode("=", $arr_pre[1]);
    list($since, $_SESSION["SES"]["FACEBOOK_VT"]["previous_since"]) = explode("=", $arr_pre[2]);
    
    // next token
    $pos1 = strpos($content, $next) + strlen($next);
    $pos2 = strpos($content, "&quot;", $pos1);
    $next_link = substr($content, $pos1, $pos2 - $pos1);
    
    $temp = $this->get_content_by_url("https://graph.facebook.com/me/albums?access_token=118816781519532|2.HDHx8TyVno43HNQ2mSfe8w__.3600.1295262000-100001702411670|Yeoz7CbN1UDL1KQN-EhYKmKNYRo&limit=25&since=2011-01-16T08%3A39%3A19%2B0000");
    //var_dump($temp);
    //exit;
    
    $pos1 = strpos($next_link, "?") + 1;
    $next_link = (substr($next_link, $pos1));
    $next_link = str_replace("&amp;", "&", $next_link);
    $arr_next = explode("&", $next_link);
    
    list($access_token, $_SESSION["SES"]["FACEBOOK_VT"]["next_access_token"]) = explode("=", $arr_next[0]);
    list($limit, $_SESSION["SES"]["FACEBOOK_VT"]["next_limit"]) = explode("=", $arr_next[1]);
    list($until, $_SESSION["SES"]["FACEBOOK_VT"]["next_until"]) = explode("=", $arr_next[2]);
    
}
//=================================================================================================
function parse_values_from_form($data, &$index) {
    $temp_1 = explode("||", $data);
    $results = array();
    foreach ($temp_1 as $row) {
        $temp_2 = explode(":", $row);
        if (!$temp_2[0]) continue;
        $results[$index]["id"] = $temp_2[0];
        $results[$index]["name"] = $temp_2[1];
        $index++;
    }
    return $results;
}
//=================================================================================================
function get_all_albums_from_facebook_pages($data) {
    $arr_1 = explode("||", $data);
    $results = array();
    foreach ($arr_1 as $row) {
        list($id, $name) = explode(":", $row);
        if (!($id)) continue;
        $this->feedURL_albums_page = "https://graph.facebook.com/{$id}/albums";
        $sxml = $this->get_content_by_url($this->feedURL_albums_page);
        if (is_null($results)) {
            $results = $this->convert_data_from_string_to_array_album($sxml);
        } // end if
        else {
            $results = array_merge($results, $this->convert_data_from_string_to_array_album($sxml));    
        }
    }   // end for
    
    return $results;
}
//=================================================================================================
function get_list_albums_from_form() {
    unset($_SESSION["SES"]["FACEBOOK_VT"]["LIST_ALBUMS"]);
    $index = 0;

    $arr_data_1 = $this->parse_values_from_form($_SESSION["SES"]["FACEBOOK_VT"]["hidListAlbums"], $index);
    $arr_data_2 = $_SESSION["SES"]["FACEBOOK_VT"]["hidListAlbumsPages"];
   
    $_SESSION["SES"]["FACEBOOK_VT"]["LIST_ALBUMS"] = $arr_data_1;    
    if ($arr_data_2) {
        $_SESSION["SES"]["FACEBOOK_VT"]["LIST_ALBUMS"] = array_merge($arr_data_1, $arr_data_2);    
    } // end if
    
    $arr_data = $_SESSION["SES"]["FACEBOOK_VT"]["LIST_ALBUMS"];
    
    $content = $this->parse_item_albums($arr_data);
    return $content;
}
//=================================================================================================
function get_list_albums_from_session() {
    $arr_data = $_SESSION["SES"]["FACEBOOK_VT"]["LIST_ALBUMS"];
    $content = $this->parse_item_albums($arr_data);
    return $content;
}
//=================================================================================================
function get_list_albums_from_facebook() {
    // read feed into SimpleXML object
    
    $this->feedURL_albums = $_REQUEST["limit"] ? $this->feedURL_albums."&limit=".$_REQUEST["limit"] : $this->feedURL_albums;
    $this->feedURL_albums = $_REQUEST["since"] ? $this->feedURL_albums."&since=".urlencode($_REQUEST["since"]) : $this->feedURL_albums;
    $this->feedURL_albums = $_REQUEST["until"] ? $this->feedURL_albums."&until=".urlencode($_REQUEST["until"]) : $this->feedURL_albums;
    
    $sxml = $this->get_content_by_url($this->feedURL_albums);
    
    $results = $this->convert_data_from_string_to_array_album($sxml);
    
    if ($_SESSION["SES"]["FACEBOOK_VT"]["hidListAlbumsPages"]) {
        $results = array_merge($results, $_SESSION["SES"]["FACEBOOK_VT"]["hidListAlbumsPages"]);    
    } // end if
     
    $_SESSION["SES"]["FACEBOOK_VT"]["LIST_ALBUMS"] = $results;
    
    $content = $this->parse_item_albums($results);
    
    return $content;
}
//=================================================================================================
function parse_item_albums($arr_data) {
    $this->TEXTS["_total_albums_"] = $total = count($arr_data);
    // get album names and number of photos in each
    if($arr_data == NULL){return;}
    foreach ($arr_data as $i => $row) {
        $this->TEXTS["_album_id_"] = $row["id"];    
        $this->TEXTS["_album_title_"] = $row["name"];    
        $this->TEXTS["_album_source_"] = $this->get_one_photo($row["id"]);
        $this->TEXTS["img_border_normal_selected"] = "img_album_normal";
        if ($_SESSION["FB_ALBUM_ID"] == $row["id"]) {
            $this->TEXTS["_album_title_selected_"] = $row["name"];
            $this->TEXTS["img_border_normal_selected"] = "img_album_selected";
        }
        //$content .= $this->display_page("album");get_album_img()
        $content .= $this->get_album_img($this->TEXTS["_album_id_"], $this->TEXTS["_album_title_"]);
        
        //=======
        if($content == ''){return;}        
    }   // end for
    return $content;
}
//=================================================================================================
function get_one_photo($album_id) {
    //$src = $this->TEXTS["link_fb"]."&act=get_album_img&album_id={$album_id}";
    $src = "http://localhost/wordpress/wp-content/plugins/Web_2_Print_XML_V3/inc/fbClass/get_img_album.php?act=get_album_img&album_id={$album_id}";
    return $src;
}
//=================================================================================================
/*function get_album_img() {
    $data["_album_img_"] = $this->get_one_photo_for_album($_REQUEST["album_id"]);
    $data["_album_id_"] = $_REQUEST["album_id"];
    $data["link_fb_list_photos"] = $this->TEXTS["link_fb_list_photos"];
    $content = $this->display_page("album_photo", $data);
    echo $content;
    exit;
}*/

//=================================================================================================
function get_album_img($albumID = null, $albumTitle = null) {            
    $data["_album_img_"] = $this->get_one_photo_for_album($albumID);
    $data["_album_id_"] = $albumID;
    $data["_album_title_"] = $albumTitle;
    $data["link_fb_list_photos"] = $this->TEXTS["link_fb_list_photos"];
    
    //=======
    if($data["_album_img_"] == NULL){return;}
    
    $content = $this->display_page("album_photo", $data);
    return $content;
}
//=================================================================================================
function get_one_photo_for_album($album_id) {
    $url = "https://graph.facebook.com/{$album_id}/photos?access_token={$this->access_token}&limit=1";    
    $sxml = $this->get_content_by_url($url);
    
    $arr = explode(":", $sxml);
    foreach ($arr as $v) {
        if (substr_count($v, "_s.jpg")) {
            $result = "http:".$v;
            $result = str_replace("source", "", $result);
            $result = str_replace(",", "", $result);
            $result = str_replace("\"", "", $result);
            return $result;
        } // end if
    } // end for
}
//=================================================================================================
function format_url($url) {
    $url = str_replace("\/", "/", $url);
    $url = str_replace("&amp;", "&", $url);
    return $url;
}
//=================================================================================================
function get_content_by_url($url) {
    $sxml = @file_get_contents($url);
    $sxml = $this->format_url($sxml);  
    
    return $sxml;
}
//=================================================================================================
function get_list_photos($albumID = null) {
    //$url = "https://graph.facebook.com/{$_SESSION["FB_ALBUM_ID"]}/photos?access_token={$this->access_token}&limit=1000";    
    $url = "https://graph.facebook.com/".$albumID."/photos?access_token={$this->access_token}&limit=1000";    
    $sxml = $this->get_content_by_url($url);
    
    $arr = explode(":", $sxml);
    foreach ($arr as $v) {
        if (substr_count($v, "_n.jpg")) {
            $v = str_replace("\",\"height\"", "", $v);
            $v = str_replace("\"},{\"height\"", "", $v);
            $result[] = "http:".$v;
            
        } // end if
    } // end for
    if($result == NULL){
        return '<form id="null-form" name="selected-form"></form>';
    }
    $result = array_unique($result);

    $j = 0;
    foreach ($result as $i => $src) {
        $j++;
        $this->TEXTS["album_id"] = $albumID; 
        $this->TEXTS["check_uncheck_item_no"] = $_SESSION['a'.$albumID][$j];
        $this->TEXTS["_img_source_"] = $src;
        $this->TEXTS["item_no"] = $j;
        $this->TEXTS["add_check_icon"] = (in_array($src, $_SESSION["VT_PHOTOS"])) ? "check.png" : "add.png";
        $this->TEXTS["div_add_check"] = (in_array($src, $_SESSION["VT_PHOTOS"])) ? "div_check" : "div_add";
        $i = $i + 1;
        
        $content .= $this->display_photos("photo");    
    }   // end for
    
    return $content;
    
}
//=================================================================================================
function process_list_photos() {
    $content = "&nbsp;";
    switch ($_REQUEST["act"]) {
        case "view_photos" :
            $content = $this->process_view_photos();
        break;
        //+++++++++++++++++++++++++++++++++++++++++++++++++
        case "view_my_selected_photos" :
            $content = $this->process_view_my_selected_photos();  
        break;
        //+++++++++++++++++++++++++++++++++++++++++++++++++
    }
    return $content;
}
//=================================================================================================
function process_view_photos() {
    $this->TEXTS["_LIST_IMG_PHOTOS_"] = $this->get_list_photos();
    $content = $this->display_page("list_photos");
    return $content;
}
//=================================================================================================
function display_all_albums() {
    //$this->set_default_settings();
    if (isset($_REQUEST["hidListAlbums"]) && $_REQUEST["hidListAlbums"]) {
        $this->TEXTS["_LIST_ALBUMS_"] = $this->get_list_albums_from_form();
    }
    else if (isset($_REQUEST["access_token"]) && $_REQUEST["access_token"]) {
        $this->TEXTS["_LIST_ALBUMS_"] = $this->get_list_albums_from_facebook();
    }
    else {
        $this->TEXTS["_LIST_ALBUMS_"] = $this->get_list_albums_from_session();
    } 
    return $this->TEXTS["_LIST_ALBUMS_"];   
}
//=================================================================================================
function display() {    
    if ($_REQUEST["vt_ajax_act"] == "update_list_selected_photos") {
        $this->process_update_list_selected_photos();
        exit;    
    } // end if
    if ($_REQUEST["act"] == "get_album_img") {
        $this->get_album_img();
    }   // end if
    
    $this->TEXTS["_META_PAGE_"] = $this->display_page("meta");
    $this->TEXTS["_LOGIN_LOGOUT_PAGE_"] = $this->display_page("login_logout");
    if (isset($_REQUEST["hidListAlbums"]) && $_REQUEST["hidListAlbums"]) {
        $this->TEXTS["_LIST_ALBUMS_"] = $this->get_list_albums_from_form();
    }
    else if (isset($_REQUEST["access_token"]) && $_REQUEST["access_token"]) {
        $this->TEXTS["_LIST_ALBUMS_"] = $this->get_list_albums_from_facebook();
    }
    else {
        $this->TEXTS["_LIST_ALBUMS_"] = $this->get_list_albums_from_session();
    }
    
    $this->TEXTS["previous_access_token"] = $_SESSION["SES"]["FACEBOOK_VT"]["previous_access_token"] = isset($_REQUEST["previous_access_token"]) ? $_REQUEST["previous_access_token"] : $_SESSION["SES"]["FACEBOOK_VT"]["previous_access_token"];
    $this->TEXTS["previous_limit"] = $_SESSION["SES"]["FACEBOOK_VT"]["previous_limit"] = isset($_REQUEST["previous_limit"]) ? $_REQUEST["previous_limit"] : $_SESSION["SES"]["FACEBOOK_VT"]["previous_limit"];
    $this->TEXTS["previous_since"] = $_SESSION["SES"]["FACEBOOK_VT"]["previous_since"] = isset($_REQUEST["previous_since"]) ? $_REQUEST["previous_since"] : $_SESSION["SES"]["FACEBOOK_VT"]["previous_since"];
    
    $this->TEXTS["next_access_token"] = $_SESSION["SES"]["FACEBOOK_VT"]["next_access_token"] = isset($_REQUEST["next_access_token"]) ? $_REQUEST["next_access_token"] : $_SESSION["SES"]["FACEBOOK_VT"]["next_access_token"];
    $this->TEXTS["next_limit"] = $_SESSION["SES"]["FACEBOOK_VT"]["next_limit"] = isset($_REQUEST["next_limit"]) ? $_REQUEST["next_limit"] : $_SESSION["SES"]["FACEBOOK_VT"]["next_limit"];
    $this->TEXTS["next_until"] = $_SESSION["SES"]["FACEBOOK_VT"]["next_until"] = isset($_REQUEST["next_until"]) ? $_REQUEST["next_until"] : $_SESSION["SES"]["FACEBOOK_VT"]["next_until"];
    
    if ($_REQUEST["previous_access_token"]) {
        $this->TEXTS["_display_albums_previous_link_"] = "none";
    }
    if ($this->TEXTS["previous_access_token"] == $this->TEXTS["next_access_token"]) {
        $this->TEXTS["_display_albums_previous_link_"] = "none";
        $this->TEXTS["_display_albums_next_link_"] = "none";
    }
    
    
    $this->TEXTS["_LIST_PHOTOS_"] = $this->process_list_photos();
    
    //echo $this->display_page("index");
}
//=================================================================================================

function get_login_logout(){
    return $this->display_page('login_logout');
}
}
?>
