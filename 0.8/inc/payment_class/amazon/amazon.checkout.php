<?php
class AmazonCheckOut {

    /*private static $accessKey = "AKIAJJZEOOOOWYWWNH6Q";                //Put your Access Key here
    private static $secretKey = "KeTSJvtN/4VmRtXZRNKuVzY4/9xcuel/BYa30vYc";            //Put  your Secret Key here
    private static $amount="USD 1.1";                         //Enter the amount you want to collect for the item
    private static $signatureMethod="HmacSHA256";                     // Valid values  are  HmacSHA256 and HmacSHA1.
    private static $description="Test Widget";                     //Enter a description of the item
    private static $referenceId="vytien-reference123";                  //Optionally, enter an ID that uniquely identifies this transaction for your records
    private static $abandonUrl="http://localhost/payment_access/test/amazon/return_amazon.php";         //Optionally, enter the URL where senders should be redirected if they cancel their transaction
    private static $returnUrl="http://localhost/payment_access/test/amazon/return_amazon.php";             //Optionally enter the URL where buyers should be redirected after they complete the transaction
    private static $immediateReturn="0";                          //Optionally, enter "1" if you want to skip the final status page in Amazon Payments
    private static $processImmediate="1";                          //Optionally, enter "1" if you want to settle the transaction immediately else "0". Default value is "1" 
    private static $ipnUrl="http://localhost/payment_access/test/amazon/return_amazon.php";                 //Optionally, type the URL of your host page to which Amazon Payments should send the IPN transaction information.
    private static $collectShippingAddress=null;                     //Optionally, enter "1" if you want Amazon Payments to return the buyer's shipping address as part of the transaction information
    private static $environment="sandbox";                     //Valid values are "sandbox" or "prod"
    */
    function AmazonCheckOut($vt_config) {
        ///global $vt_config;
        
		/*echo '<pre>';
		print_r($vt_config);
		echo '</pre>';*/
		
        $this->vt_config = $vt_config;
        $this->merchant_id = $this->vt_config["amazon"]["aws_merchant_id"];
        $this->currency_code = $this->vt_config["amazon"]["currency"]; 
        $this->continue_shopping_URL = $this->vt_config["amazon"]["continue_shopping_URL"]; 
        $this->img_button_src = $this->vt_config["amazon"]["img_button_src"]; 
        $this->sandbox = $this->vt_config["amazon"]["sandbox"]; 
        
    }
    //=============================================================================================
    function CreateForm() {
        try{
            $data = $this->data;
            $elements_hidden = "";
            foreach ($data as $f => $v) {
                $elements_hidden .= "<input type='hidden' name='{$f}' value='{$v}' /> \n";
            } // end for
            $this->action_url = ($this->sandbox == "sandbox") ? "https://payments-sandbox.amazon.com" : "https://payments.amazon.com";
            $content = "
            <form method=POST action='{$this->action_url}/checkout/{$this->merchant_id}' name='frm_payment_vytien' id='frm_payment_vytien'>
            {$elements_hidden}
            <input type='hidden' name='currency_code' value='{$this->currency_code}' />
            <input name='continue_shopping_URL' value='{$this->continue_shopping_URL}' type='hidden' />            
            </form>
            ";
            return $content;
            /*
            * <input type='hidden' name='item_description_1' value='Item level promotions example' />
            <input type='hidden' name='item_merchant_id_1' value='AU923CLL66718' />
            <input type='hidden' name='item_price_1' value='22.00' />
            <input type='hidden' name='item_quantity_1' value='1' />
            <input type='hidden' name='item_title_1' value='Umbrella with Promotions' />
            <input type='hidden' name='item_promotion_type_1' value='fixed_amount_off'/>
            <input type='hidden' name='item_promotion_1' value='2.05'/>
            <input type='hidden' name='item_url_1' value='http://www.amazon.com/Classic-Clear-Bubble-Umbrella-totes/dp/B001DZQ31G/ref=sr_1_2'/>
            <input type='hidden' name='item_image_url_1' value='https://images-na.ssl-images-amazon.com/images/G/01/cba/images/shoppingcart/samplecode/white_umbrella.jpg'/>
            */
        }
        catch(Exception $e){
            echo 'Exception : ', $e->getMessage(),"\n";
        }
    }
    //=============================================================================================
}

?>
