<?php
$vt_config["link_homepage"] = "index.php";

$vt_config["link_login"] = "http://fbv1.dev.delivergo.com/openid_vt/openid.php";
$vt_config["link_logout"] = "http://fbv1.dev.delivergo.com/openid_vt/?logout";

if ($_SERVER["HTTP_HOST"] == "localhost") {
    $vt_config["link_login"] = "http://localhost/wordpress/wp-content/plugins/Web_2_Print_XML_V3/inc/openid/openid.php";
    $vt_config["link_logout"] = "http://localhost/wordpress/wp-content/plugins/Web_2_Print_XML_V3/inc/openid/?logout";
}

/*facebook*/
$vt_config["link_fb"] = "index.php?page=fb";
$vt_config["link_fb_code"] = $vt_config["link_fb"]."&act=create_access_token";
$vt_config["link_fb_form"] = $vt_config["link_fb"]."&act=view_my_selected_photos";
$vt_config["link_fb_list_photos"] = $vt_config["link_fb"]."&act=view_photos";
$vt_config["link_fb_update_list_selected_photos"] = $vt_config["link_fb"]."&vt_ajax_act=update_list_selected_photos";

/*flick*/
$vt_config["link_flickr"] = "index.php?page=flickr";
$vt_config["link_flickr_form"] = $vt_config["link_fb"]."&act=view_my_selected_photos";
$vt_config["link_flickr_list_photos"] = $vt_config["link_fb"]."&act=view_photos";
$vt_config["link_flickr_update_list_selected_photos"] = $vt_config["link_fb"]."&vt_ajax_act=update_list_selected_photos";

/*picasa*/
$vt_config["link_picasa"] = "index.php?page=picasa";
$vt_config["link_picasa_list_photos"] = $vt_config["link_picasa"]."&act=view_photos";
$vt_config["link_picasa_form"] = $vt_config["link_picasa"]."&act=view_my_selected_photos";
$vt_config["link_picasa_update_list_selected_photos"] = $vt_config["link_picasa"]."&vt_ajax_act=update_list_selected_photos";
?>
