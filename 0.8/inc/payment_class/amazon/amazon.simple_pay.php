<?php
class AmazonSimplePay {

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
    function AmazonSimplePay() {
        global $vt_config;
        
        $this->vt_config = $vt_config;
        $this->accessKey = $this->vt_config["amazon"]["access_key_id"];  //Put your Access Key here
        $this->secretKey = $this->vt_config["amazon"]["secret_access_key"];  //Put  your Secret Key here
        $this->abandonUrl = $this->vt_config["amazon"]["abandonUrl"]; 
        $this->returnUrl = $this->vt_config["amazon"]["returnUrl"]; 
        $this->ipnUrl = $this->vt_config["amazon"]["ipnUrl"]; 
        $this->environment = $this->vt_config["amazon"]["sandbox"]; 
        $this->currency = $this->vt_config["amazon"]["currency"]; 
        $this->signatureMethod = "HmacSHA256"; 
        $this->referenceId = "vytien-orderID"; 
        $this->immediateReturn = "0"; 
        $this->processImmediate = "1"; 
        $this->collectShippingAddress = true; 
        
    }
    //=============================================================================================
    function setAmount($amount) {
        $this->amount = $amount + $this->AMAZON_VT_TAX_AMOUNT + $this->AMAZON_VT_SHIP_AMOUNT + $this->AMAZON_VT_HANDLING_AMOUNT + $this->AMAZON_VT_INSURANCE_AMOUNT - $this->AMAZON_VT_SHIP_DISCOUNT;
        $this->amount = $this->currency." ".$this->amount;    //Enter the amount you want to collect for the item  Example: USD 1.1
    }
    //=============================================================================================
    function getAmount() {
        return $this->amount;
    }
    //=============================================================================================
    function setDescription($desc) {
        $this->description = $desc;
    }
    //=============================================================================================
    function getDescription() {
         return $this->description;
    }
    //=============================================================================================
    function CreateForm() {
        try{
            ButtonGenerator::GenerateForm($this->accessKey,$this->secretKey,$this->amount, $this->description, $this->referenceId, $this->immediateReturn,$this->returnUrl, $this->abandonUrl, $this->processImmediate, $this->ipnUrl, $this->collectShippingAddress,$this->signatureMethod, $this->environment);

        }
        catch(Exception $e){
            echo 'Exception : ', $e->getMessage(),"\n";
        }
    }
    //=============================================================================================
}

?>
