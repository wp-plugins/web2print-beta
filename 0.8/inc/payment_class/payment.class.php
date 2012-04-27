<?php
/*
 Plugin Name: Web to Print Plugin for Facebook
 Plugin URI: http://www.delivergo.com
 Description: payment with Paypal, Google, Amazon
 Author: Normprint Ltd.
 Version: 1.0
*/
class PAYMENT_VT {
//=================================================================================================
function PAYMENT_VT($vt_config) {
    //global $vt_config;
    
    $this->TEXTS = $vt_config;	
}
//=================================================================================================
/* PAYPAL EXPRESS CHECKOUT */
function create_paypal_express() {
    $this->objPaypal = new EXPRESS_PAYPAL_PROCESS();
    $this->set_values_payal_express_from_shopping_cart();
    $this->objPaypal->express_checkout($_SESSION["PAYPAL_CART"]);
}
//=================================================================================================
function set_values_payal_express_from_shopping_cart() {
    unset($_SESSION["PAYPAL_CART"]);
    $total = 0;
    foreach ($_REQUEST["item_name"] as $key => $val) {
        $item_name = $val;
        $item_qty = $_REQUEST["item_qty"][$key];
        $item_unit_price = $_REQUEST["item_unit_price"][$key];
        $item_price = $_REQUEST["item_price"][$key];
        $item_desc = $_REQUEST["item_desc"][$key];
        $item_sku = $_REQUEST["item_sku"][$key];
        $total += floatval($item_price);
        // session cart saves cart items infor to re-display
        // list items will be show on paypal: "review your information" page
        $_SESSION["PAYPAL_CART"][] = array("ITEM_NAME" => $item_name,
                                        "ITEM_SKU" => $item_sku,
                                        "ITEM_DESCRIPTION" => $item_desc,
                                        "ITEM_UNIT_PRICE" => $item_unit_price,
                                        "ITEM_QTY" => $item_qty,
                                        "ITEM_PRICE" => $item_price);
    } // end for
    
    $this->objPaypal->PAYPAL_VT_TAX_AMOUNT = 2;
    $this->objPaypal->PAYPAL_VT_SHIP_AMOUNT = 3;
    $this->objPaypal->PAYPAL_VT_HANDLING_AMOUNT = 4;
    $this->objPaypal->PAYPAL_VT_SHIP_DISCOUNT = 1;
    $this->objPaypal->PAYPAL_VT_INSURANCE_AMOUNT = 5;
    
    if ($_REQUEST["chkShipAddress"]) {
        $this->objPaypal->PAYPAL_VT_SHIPTONAME = "Normprint's Buyer";
        $this->objPaypal->PAYPAL_VT_SHIPTOSTREET = "71 Saint Peter";
        $this->objPaypal->PAYPAL_VT_SHIPTOCITY = "San Jose";
        $this->objPaypal->PAYPAL_VT_SHIPTOSTATE = "CA";
        $this->objPaypal->PAYPAL_VT_SHIPTOCOUNTRYCODE = "US";
        $this->objPaypal->PAYPAL_VT_SHIPTOZIP = "95131";
        $this->objPaypal->PAYPAL_VT_SHIPTOPHONENUM = "084-967-4444";    
    } // use address from website for shipping
    
    if ($_REQUEST["locate_code"]) {
        $this->objPaypal->PAYPAL_VT_LOCALECODE = $_REQUEST["locate_code"];    
    }
    
    
    return $total;
    
    
}
//=================================================================================================
function review_paypal_express_page() {
    $this->objPaypal = new EXPRESS_PAYPAL_PROCESS();
    $return_data = $this->objPaypal->express_review();
    $return_data["ACK"] = strtoupper($return_data["ACK"]);
    $content = "<p><h1>Normprint: Confirmation</h1></p>";
    if (($return_data["ACK"]) == "SUCCESS" || ($return_data["ACK"]) == "SUCESSWITHWARNING") {
        foreach ($return_data as $f => $v) {
            $content .= "<p>{$f}: {$v}</p>";
        }
        $content .= "<p><a href='{$this->TEXTS["paypal"]["return_url_confirm"]}'><img src='{$this->TEXTS["paypal"]["img"]}' border='0'></a></p>";
    } // end if
    else {
        $content .= "Error";
    }
    return $content;
}
//=================================================================================================
function confirm_paypal_express_page() {
    $this->objPaypal = new EXPRESS_PAYPAL_PROCESS();
    $return_data = $this->objPaypal->express_confirm();
    $return_data["ACK"] = strtoupper($return_data["ACK"]);
    $content = "<p><h1>Normprint: Thank you</h1></p>";
    if (($return_data["ACK"]) == "SUCCESS" || ($return_data["ACK"]) == "SUCESSWITHWARNING") {
        foreach ($return_data as $f => $v) {
            $content .= "<p>{$f}: {$v}</p>";
        }
        $content .= "<p>Thank you for your order</p>";
    } // end if
    else {
        $content .= "Error";
    }
    return $content;
}
//=================================================================================================
/* PAYPAL STANDARD CHECKOUT */
function create_paypal_standard() {
    $this->objPaypal = new PayPalButton;    
    $this->set_default_values_paypal_standard();
}
//=================================================================================================
function set_default_values_paypal_standard() {
    $this->objPaypal->accountemail = $this->TEXTS["paypal"]["account_email"];                        //the account that is registered with paypal where money will be sent to
    $this->objPaypal->custom = "custom_values_from_website_to_paypal_for_return";    //a custom string that gets passed through paypals pages, back to your IPN page and Return URL as $_POST['custom'] . useful for database id's or invoice numbers. WARNING: does have a max string limit, don't go over 150 chars to be safe
    $this->objPaypal->currencycode = $this->TEXTS["paypal"]["currency"];                        //currency code
    $this->objPaypal->buttonimage = $this->TEXTS["paypal"]["button_image"];                        //image 150px x 50px that can be displayed on your paypal pages.
    $this->objPaypal->buttontext = $this->TEXTS["paypal"]["button_text"];                        //text to use if image not found or not specified
    $this->objPaypal->askforaddress = $this->TEXTS["paypal"]["ask_for_address"];                                                //wether to ask for mailing address or not
    $this->objPaypal->return_url = $this->TEXTS["paypal"]["return_url"];                        //url of the page users are sent to after successful payment
    $this->objPaypal->ipn_url = $this->TEXTS["paypal"]["ipn_url"];                                //url of the IPN page (this overrides account settings, IF IPN has been setup at all.
    $this->objPaypal->cancel_url = $this->TEXTS["paypal"]["cancel_url"];                         //url of the page users are sent to if they cancel through the paypal process
    $this->objPaypal->class = $this->TEXTS["paypal"]["class_button"];                         //CSS class to apply to the button. Comes in very handy
}
//=================================================================================================
function add_items_paypal_standard() {
    foreach ($_REQUEST["item_name"] as $key => $val) {
        $item_name = $val;
        $item_qty = $_REQUEST["item_qty"][$key];
        $item_unit_price = $_REQUEST["item_unit_price"][$key];
        $this->objPaypal->AddItem($item_name, $item_qty, $item_unit_price);
    }
}
//=================================================================================================
/* GOOGLE CHECKOUT */
function create_google() {
    $this->set_default_values_google();
    $this->objGoogle = new GoogleCart($this->google_merchant_id, $this->google_merchant_key, $this->google_server_type, $this->google_currency);
    $this->set_additional_info_google();
}
//=================================================================================================
function set_additional_info_google() {
    $this->objGoogle->GOOGLE_VT_TAX_AMOUNT = 2;
    $this->objGoogle->GOOGLE_VT_SHIP_AMOUNT = 3;
    $this->objGoogle->GOOGLE_VT_HANDLING_AMOUNT = 4;
    $this->objGoogle->GOOGLE_VT_SHIP_DISCOUNT = 1;
    $this->objGoogle->GOOGLE_VT_INSURANCE_AMOUNT = 5;
    
    // Add tax rules
    $tax_rule = new GoogleDefaultTaxRule($this->objGoogle->GOOGLE_VT_TAX_AMOUNT);
    $tax_rule->SetStateAreas(array("MA"));
    $this->objGoogle->AddDefaultTaxRules($tax_rule);
    
    // Specify "Return to xyz" link
    $this->objGoogle->SetContinueShoppingUrl($this->google_edit_url);
    $this->objGoogle->SetEditCartUrl($this->google_edit_url);
    
    // Add shipping options
    $ship_1 = new GoogleFlatRateShipping("USPS Priority Mail", 3.00);
    $Gfilter = new GoogleShippingFilters();
    $Gfilter->SetAllowedCountryArea('CONTINENTAL_48');

    $ship_1->AddShippingRestrictions($Gfilter);
    $this->objGoogle->AddShipping($ship_1);
        
    //$this->objGoogle->SetMerchantPrivateData($this->google_merchant_private_data);
    //$this->objGoogle->SetMerchantPrivateData(new MerchantPrivateData(array( "animals" => "dog")));
    
    /*
    // Request buyer's phone number
    $cart->SetRequestBuyerPhone(true);
    */
}
//=================================================================================================
function set_default_values_google() {
    $this->google_merchant_id = $this->TEXTS["google"]["merchant_id"];
    $this->google_merchant_key = $this->TEXTS["google"]["merchant_key"];
    $this->google_server_type = $this->TEXTS["google"]["server_type"];
    $this->google_currency = $this->TEXTS["google"]["currency"];
    $this->google_return_url = $this->TEXTS["google"]["return_url"];
    $this->google_edit_url = $this->TEXTS["google"]["edit_url"];
    $this->google_merchant_private_data = $this->TEXTS["google"]["merchant_private_data"];
}
//=================================================================================================
function add_items_google() {
    foreach ($_REQUEST["item_name"] as $key => $val) {
        $item_name = $val;
        $total_count = $item_qty = $_REQUEST["item_qty"][$key];
        $item_unit_price = $_REQUEST["item_unit_price"][$key];
        $item_1 = new GoogleItem(  $item_name,      // Item name
                                   $item_description, // Item description
                                   $total_count, // Quantity
                                   $item_unit_price); // Unit price
        $this->objGoogle->AddItem($item_1);
    } // end for  
}
//=================================================================================================
/* AMAZON SIMPLE PAY */
function create_amazon_simple_pay() {
    $this->objAmazon = new AmazonSimplePay();
}
//=================================================================================================
function add_items_amazon_simple_pay() {
    $total_amount = 0;
    foreach ($_REQUEST["item_name"] as $key => $val) {
        $total_amount += $_REQUEST["item_price"][$key];
        $description .= $_REQUEST["item_desc"][$key]."<br>";
    } // end for
    
    $this->objAmazon->AMAZON_VT_TAX_AMOUNT = 2;
    $this->objAmazon->AMAZON_VT_SHIP_AMOUNT = 3;
    $this->objAmazon->AMAZON_VT_HANDLING_AMOUNT = 4;
    $this->objAmazon->AMAZON_VT_SHIP_DISCOUNT = 1;
    $this->objAmazon->AMAZON_VT_INSURANCE_AMOUNT = 5;
    
    $this->objAmazon->setAmount($total_amount);
    $this->objAmazon->setDescription($description);
}
//=================================================================================================
/* AMAZON CHECKOUT */
//=================================================================================================
function create_amazon_checkout() {
    $this->objAmazon = new AmazonCheckOut($this->TEXTS);
}
//=================================================================================================
function add_items_amazon_checkout() {
    $i = 1;
    foreach ($_REQUEST["item_name"] as $key => $val) {
        $this->objAmazon->data["item_description_{$i}"] = $_REQUEST["item_desc"][$key];
        $this->objAmazon->data["item_merchant_id_{$i}"] = $this->TEXTS["amazon"]["aws_merchant_id"];
        $this->objAmazon->data["item_price_{$i}"] = $_REQUEST["item_unit_price"][$key];
        $this->objAmazon->data["item_quantity_{$i}"] = $_REQUEST["item_qty"][$key];
        $this->objAmazon->data["item_title_{$i}"] = $_REQUEST["item_name"][$key];
        $i++;
        /*$this->objAmazon->data["item_promotion_type_{$i}"] = "";
        $this->objAmazon->data["item_promotion_{$i}"] = "";
        $this->objAmazon->data["item_url_{$i}"] = "";
        $this->objAmazon->data["item_image_url_{$i}"] = "";
        */
    } // end for
}
//=================================================================================================
function display() {                   
    switch ($_REQUEST["hidPaymentType"]) {
        case "1" : // Paypal express
            $this->create_paypal_express();
        break;
        //-------------------------------------------------
        case "2" : // Paypal standard
            $this->create_paypal_standard();
            $this->add_items_paypal_standard();
            $this->objPaypal->OutputButton($content);
        break;
        //-------------------------------------------------
        case "3" : // Google 
            $this->create_google();
            $this->add_items_google();
            $content = $this->objGoogle->CheckoutButtonCode("SMALL"); // // Display Google Checkout button
        break;
        //-------------------------------------------------
        case "4" : // Amazon Simple Pay
            $this->create_amazon_simple_pay();
            $this->add_items_amazon_simple_pay();
            $content = $this->objAmazon->CreateForm();
        break;
        //-------------------------------------------------
        case "5" : // Amazon Checkout
            $this->create_amazon_checkout();
            $this->add_items_amazon_checkout();
            $content = $this->objAmazon->CreateForm();
        break;
        //-------------------------------------------------
    } // end switch
    switch ($_REQUEST["step"])  {
        case "return_review_paypal" : 
            $content = $this->review_paypal_express_page();
        break;
        //-------------------------------------------------
        case "return_confirm_paypal" :
            $content = $this->confirm_paypal_express_page();
        break;
        //-------------------------------------------------
    }
    echo $content;
}
//=================================================================================================
}
?>
