<?php
/*
 Plugin Name: Web to Print Plugin for Facebook
 Plugin URI: http://www.delivergo.com
 Description: payment with Paypal, Google, Amazon
 Author: Normprint Ltd.
 Version: 1.0
*/
// DO NOT CHANGE IF YOU DON'T KNOW WHAT YOU WANT
$vt_config["root"] = "http://fbv1.dev.delivergo.com/payment_access/";
if ($_SERVER["HTTP_HOST"] == "localhost") {
    $vt_config["root"] = "http://localhost/payment_access/";    
} // end if

$vt_config["paypal"]["html_path"] = "html/";
/********************* PAYPAL SETTINGS *********************/
$vt_config["paypal"]["account_email"] = "paypal@normprint.com"; //the account that is registered with paypal where money will be sent to
$vt_config["paypal"]["SandboxFlag"] = false;
$vt_config["paypal"]["API_UserName"] = "paypal_api1.normprint.com";
$vt_config["paypal"]["API_Password"] = "DUZBMHDSCE5JDGBW";
$vt_config["paypal"]["API_Signature"] = "AmFLXXnTtuTqdAycsBP.Zvsu2jSWAVQq93abqOOQ240Pz--8R4GDAFsG";
$vt_config["paypal"]["currency"] = "VND";                   //currency code     

$vt_config["paypal"]["target"] = "_blank";                  //Frame Name, usually '_blank','_self','_top' . Comment out to use current frame.
$vt_config["paypal"]["class_button"] = "paypalbutton";      //CSS class to apply to the button. Comes in very handy
$vt_config["paypal"]["img_width"] = "150";                  //button width in pixels. Will apply am Inline CSS Style to the button. Comment if not needed.
$vt_config["paypal"]["custom"] = "";                        //a custom string that gets passed through paypals pages, back to your IPN page and Return URL as $_POST['custom'] . useful for database id's or invoice numbers. WARNING: does have a max string limit, don't go over 150 chars to be safe
$vt_config["paypal"]["img_src"] = "logo.jpg";               //image 150px x 50px that can be displayed on your paypal pages.
$vt_config["paypal"]["button_image"] = $vt_config["paypal"]["html_path"]."img/paypal_512.png";  //img to use for this button
$vt_config["paypal"]["button_text"] = "I agree, proceed to Payment";                            //text to use if image not found or not specified
$vt_config["paypal"]["ask_for_address"] = false;                                                //wether to ask for mailing address or not
$vt_config["paypal"]["return_url"] = $vt_config["root"]."paypal.php";                 //url of the page users are sent to after successful payment
$vt_config["paypal"]["ipn_url"] = $vt_config["root"]."ipn.php";                       //url of the IPN page (this overrides account settings, IF IPN has been setup at all.
$vt_config["paypal"]["cancel_url"] = $vt_config["root"]."paypal_cancel.php";          //url of the page users are sent to if they cancel through the paypal process

$vt_config["paypal"]["return_url_checkout"] = $vt_config["root"]."index.php?step=return_review_paypal";
$vt_config["paypal"]["cancel_url_checkout"] = $vt_config["root"]."index.php?step=cancel_review_paypal";
$vt_config["paypal"]["img"] = "https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif";
$vt_config["paypal"]["return_url_confirm"] = $vt_config["root"]."index.php?step=return_confirm_paypal";
/********************* PAYPAL SETTINGS *********************/
/********************* GOOGLE CHECKOUT SETTINGS *********************/
$vt_config["google"]["merchant_id"] = "263990411923320";
$vt_config["google"]["merchant_key"] = "VNFarlqpVj8kqCCmAQG65A";
$vt_config["google"]["server_type"] = "sandbox";
$vt_config["google"]["currency"] = "USD";
$vt_config["google"]["return_url"] = $vt_config["root"]."google.php?";
$vt_config["google"]["merchant_private_data"] = "merchantprivate";
/********************* GOOGLE CHECKOUT SETTINGS *********************/
/********************* AMAZON CHECKOUT SETTINGS *********************/
$vt_config["amazon"]["aws_account_id"] = "6597-3087-3103";
$vt_config["amazon"]["canonical_user_id"] = "b7d5e007af77e624fdcdd254fb307d29741c32a1ac1bab2959a2bc09bdbe9790";
$vt_config["amazon"]["access_key_id"] = "AKIAJJZEOOOOWYWWNH6Q";
$vt_config["amazon"]["secret_access_key"] = "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";
$vt_config["amazon"]["abandonUrl"] = "http://localhost/payment_access/return_amazon.php";  // cancel url
$vt_config["amazon"]["returnUrl"] = "http://localhost/payment_access/return_amazon.php";  // success url
$vt_config["amazon"]["ipnUrl"] = "http://localhost/payment_access/return_amazon.php"; // ipn url
$vt_config["amazon"]["sandbox"] = "prod";
$vt_config["amazon"]["currency"] = "USD"; //currency code     
/********************* AMAZON CHECKOUT SETTINGS *********************/

?>
