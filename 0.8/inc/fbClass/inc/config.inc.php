<?php
/*
 Plugin Name: Web to Print Plugin V3.1
 Plugin URI: http://www.delivergo.com
 Description: facebook application
 Author: Normprint Ltd.
 Version: 3.1
 */
define("AUTHOR", "HUNGAZ_VYTIEN");
define("EMAIL", "hungaz@vietaz.com, vytien83@yahoo.com");

$vt_config["themes_path"] = "wp-content/plugins/Web_2_Print_XML_V3/inc/fbClass/skins/";
$vt_config["ext"] = ".html";

// facebook


if ($_SERVER["HTTP_HOST"] == "localhost") {
    $vt_config["facebook_appid"] = "196318157050673";   // localhost
    $vt_config["facebook_key"] = "a04e68d287c0b4c3e1aa14cb575980b0";
    $vt_config["facebook_secret"] = "765a87901123e85e83800c4b846bd03c";
    $vt_config["openid_root"] = "http://localhost/openid";
}
else {
    $vt_config["facebook_appid"] = "159286770790669";    // internet
    $vt_config["facebook_key"] = "3b1637d71ecc143db91d2ecf19b0f10c";
    $vt_config["facebook_secret"] = "4c871ba0b1a30a242fe083759090112b";
    $vt_config["openid_root"] = "http://wp3.dev.delivergo.com/wp-content/plugins/Web_2_Print_XML_V3/inc/openid";
}

$vt_config["facebook_callback"] = $vt_config["openid_root"]."/callback.php?mode=facebook&";  // = Canvas URL

// flick vytien83
$vt_config["flick_key"] = "92eec566dd9f27370e66d5ce128c4b16";
$vt_config["flick_secret"] = "5d76e6ff05b32373";



?>