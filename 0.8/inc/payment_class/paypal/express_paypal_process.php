<?php
/*
 Plugin Name: Web to Print Plugin for Facebook
 Plugin URI: http://www.delivergo.com
 Description: payment with Paypal, Google, Amazon
 Author: Normprint Ltd.
 Version: 1.0
*/
class EXPRESS_PAYPAL_PROCESS extends EXPRESS_PAYPAL {
    function EXPRESS_PAYPAL_PROCESS() {
        $this->EXPRESS_PAYPAL();
    }
    //=============================================================================================
    function express_checkout($DATA_IMPORT) {
        // ==================================
        // PayPal Express Checkout Module
        // ==================================

        //'------------------------------------
        //' The paymentAmount is the total value of 
        //' the shopping cart, that was set 
        //' earlier in a session variable 
        //' by the shopping cart page
        //'------------------------------------
        //$this->paymentAmount = $_SESSION["Payment_Amount"];

        //'------------------------------------
        //' The currencyCodeType and paymentType 
        //' are set to the selections made on the Integration Assistant 
        //'------------------------------------
        $this->currencyCodeType = $this->TEXTS["paypal"]["currency"];
        $this->paymentType = "Sale";

        //'------------------------------------
        //' The returnURL is the location where buyers return to when a
        //' payment has been succesfully authorized.
        //'
        //' This is set to the value entered on the Integration Assistant 
        //'------------------------------------
        $this->returnURL = $this->TEXTS["paypal"]["return_url_checkout"];

        //'------------------------------------
        //' The cancelURL is the location buyers are sent to when they hit the
        //' cancel button during authorization of payment during the PayPal flow
        //'
        //' This is set to the value entered on the Integration Assistant 
        //'------------------------------------
        $this->cancelURL = $this->TEXTS["paypal"]["cancel_url_checkout"];

        //'------------------------------------
        //' Calls the SetExpressCheckout API call
        //'
        //' The CallShortcutExpressCheckout function is defined in the file PayPalFunctions.php,
        //' it is included at the top of this file.
        //'-------------------------------------------------
        $this->PAYPAL_VT_CART_ITEMS = $DATA_IMPORT;
        $resArray = $this->CallShortcutExpressCheckout ($this->currencyCodeType, $this->paymentType, $this->returnURL, $this->cancelURL, $this->PAYPAL_VT_CART_ITEMS, $this->PAYPAL_VT_TAX_AMOUNT, $this->PAYPAL_VT_SHIP_AMOUNT, $this->PAYPAL_VT_HANDLING_AMOUNT, $this->PAYPAL_VT_SHIP_DISCOUNT, $this->PAYPAL_VT_INSURANCE_AMOUNT);
        $ack = strtoupper($resArray["ACK"]);
        if($ack == "SUCCESS" || $ack == "SUCCESSWITHWARNING")
        {
            $this->RedirectToPayPal ( $resArray["TOKEN"] );
        } 
        else  
        {
            //Display a user friendly Error on the page using any of the following error information returned by PayPal
            $ErrorCode = urldecode($resArray["L_ERRORCODE0"]);
            $ErrorShortMsg = urldecode($resArray["L_SHORTMESSAGE0"]);
            $ErrorLongMsg = urldecode($resArray["L_LONGMESSAGE0"]);
            $ErrorSeverityCode = urldecode($resArray["L_SEVERITYCODE0"]);
            
            /*echo "SetExpressCheckout API call failed. ";
            echo "Detailed Error Message: " . $ErrorLongMsg;
            echo "Short Error Message: " . $ErrorShortMsg;
            echo "Error Code: " . $ErrorCode;
            echo "Error Severity Code: " . $ErrorSeverityCode; */
        }    
        return $resArray;
    }
    //=============================================================================================
    function express_review() {
        // Check to see if the Request object contains a variable named 'token'    
        $this->token = "";
        if (isset($_REQUEST['token']))
        {
            $this->token = $_REQUEST['token'];
        }

        // If the Request object contains the variable 'token' then it means that the user is coming from PayPal site.    
        if ( $this->token != "" )
        {

            /*
            '------------------------------------
            ' Calls the GetExpressCheckoutDetails API call
            '
            ' The GetShippingDetails function is defined in PayPalFunctions.jsp
            ' included at the top of this file.
            '-------------------------------------------------
            */
            

            $resArray = $this->GetShippingDetails( $this->token );
            $ack = strtoupper($resArray["ACK"]);
            if( $ack == "SUCCESS" || $ack == "SUCESSWITHWARNING") 
            {
                /*
                ' The information that is returned by the GetExpressCheckoutDetails call should be integrated by the partner into his Order Review 
                ' page        
                */
                $email = $resArray["EMAIL"]; // ' Email address of payer.
                $payerId = $resArray["PAYERID"]; // ' Unique PayPal customer account identification number.
                $payerStatus = $resArray["PAYERSTATUS"]; // ' Status of payer. Character length and limitations: 10 single-byte alphabetic characters.
                $salutation = $resArray["SALUTATION"]; // ' Payer's salutation.
                $firstName = $resArray["FIRSTNAME"]; // ' Payer's first name.
                $middleName = $resArray["MIDDLENAME"]; // ' Payer's middle name.
                $lastName = $resArray["LASTNAME"]; // ' Payer's last name.
                $suffix = $resArray["SUFFIX"]; // ' Payer's suffix.
                $cntryCode = $resArray["COUNTRYCODE"]; // ' Payer's country of residence in the form of ISO standard 3166 two-character country codes.
                $business = $resArray["BUSINESS"]; // ' Payer's business name.
                $shipToName = $resArray["SHIPTONAME"]; // ' Person's name associated with this address.
                $shipToStreet = $resArray["SHIPTOSTREET"]; // ' First street address.
                $shipToStreet2 = $resArray["SHIPTOSTREET2"]; // ' Second street address.
                $shipToCity = $resArray["SHIPTOCITY"]; // ' Name of city.
                $shipToState = $resArray["SHIPTOSTATE"]; // ' State or province
                $shipToCntryCode = $resArray["SHIPTOCOUNTRYCODE"]; // ' Country code. 
                $shipToZip = $resArray["SHIPTOZIP"]; // ' U.S. Zip code or other country-specific postal code.
                $addressStatus = $resArray["ADDRESSSTATUS"]; // ' Status of street address on file with PayPal   
                $invoiceNumber = $resArray["INVNUM"]; // ' Your own invoice or tracking number, as set by you in the element of the same name in SetExpressCheckout request .
                $phonNumber = $resArray["PHONENUM"]; // ' Payer's contact telephone number. Note:  PayPal returns a contact telephone number only if your Merchant account profile settings require that the buyer enter one. 
            } 
            else  
            {
                //Display a user friendly Error on the page using any of the following error information returned by PayPal
                $ErrorCode = urldecode($resArray["L_ERRORCODE0"]);
                $ErrorShortMsg = urldecode($resArray["L_SHORTMESSAGE0"]);
                $ErrorLongMsg = urldecode($resArray["L_LONGMESSAGE0"]);
                $ErrorSeverityCode = urldecode($resArray["L_SEVERITYCODE0"]);
                
                /*echo "GetExpressCheckoutDetails API call failed. ";
                echo "Detailed Error Message: " . $ErrorLongMsg;
                echo "Short Error Message: " . $ErrorShortMsg;
                echo "Error Code: " . $ErrorCode;
                echo "Error Severity Code: " . $ErrorSeverityCode;*/
            }
        }
        return $resArray;
    }
    //=============================================================================================
    function express_confirm() {
        /*
        '------------------------------------
        ' The paymentAmount is the total value of 
        ' the shopping cart, that was set 
        ' earlier in a session variable 
        ' by the shopping cart page
        '------------------------------------
        */
        
        $this->finalPaymentAmount =  $_SESSION["Payment_Amount"];
            
        /*
        '------------------------------------
        ' Calls the DoExpressCheckoutPayment API call
        '
        ' The ConfirmPayment function is defined in the file PayPalFunctions.jsp,
        ' that is included at the top of this file.
        '-------------------------------------------------
        */

        $resArray = $this->ConfirmPayment ( $this->finalPaymentAmount );
        $ack = strtoupper($resArray["ACK"]);
        if( $ack == "SUCCESS" || $ack == "SUCCESSWITHWARNING" )
        {
            /*
            '********************************************************************************************************************
            '
            ' THE PARTNER SHOULD SAVE THE KEY TRANSACTION RELATED INFORMATION LIKE 
            '                    transactionId & orderTime 
            '  IN THEIR OWN  DATABASE
            ' AND THE REST OF THE INFORMATION CAN BE USED TO UNDERSTAND THE STATUS OF THE PAYMENT 
            '
            '********************************************************************************************************************
            */

            $transactionId = $resArray["TRANSACTIONID"]; // ' Unique transaction ID of the payment. Note:  If the PaymentAction of the request was Authorization or Order, this value is your AuthorizationID for use with the Authorization & Capture APIs. 
            $transactionType = $resArray["TRANSACTIONTYPE"]; //' The type of transaction Possible values: l  cart l  express-checkout 
            $paymentType = $resArray["PAYMENTTYPE"];  //' Indicates whether the payment is instant or delayed. Possible values: l  none l  echeck l  instant 
            $orderTime = $resArray["ORDERTIME"];  //' Time/date stamp of payment
            $amt = $resArray["AMT"];  //' The final amount charged, including any shipping and taxes from your Merchant Profile.
            $currencyCode = $resArray["CURRENCYCODE"];  //' A three-character currency code for one of the currencies listed in PayPay-Supported Transactional Currencies. Default: USD. 
            $feeAmt = $resArray["FEEAMT"];  //' PayPal fee amount charged for the transaction
            $settleAmt = $resArray["SETTLEAMT"];  //' Amount deposited in your PayPal account after a currency conversion.
            $taxAmt = $resArray["TAXAMT"];  //' Tax charged on the transaction.
            $exchangeRate = $resArray["EXCHANGERATE"];  //' Exchange rate if a currency conversion occurred. Relevant only if your are billing in their non-primary currency. If the customer chooses to pay with a currency other than the non-primary currency, the conversion occurs in the customer’s account.
            
            /*
            ' Status of the payment: 
                    'Completed: The payment has been completed, and the funds have been added successfully to your account balance.
                    'Pending: The payment is pending. See the PendingReason element for more information. 
            */
            
            $paymentStatus = $resArray["PAYMENTSTATUS"]; 

            /*
            'The reason the payment is pending:
            '  none: No pending reason 
            '  address: The payment is pending because your customer did not include a confirmed shipping address and your Payment Receiving Preferences is set such that you want to manually accept or deny each of these payments. To change your preference, go to the Preferences section of your Profile. 
            '  echeck: The payment is pending because it was made by an eCheck that has not yet cleared. 
            '  intl: The payment is pending because you hold a non-U.S. account and do not have a withdrawal mechanism. You must manually accept or deny this payment from your Account Overview.         
            '  multi-currency: You do not have a balance in the currency sent, and you do not have your Payment Receiving Preferences set to automatically convert and accept this payment. You must manually accept or deny this payment. 
            '  verify: The payment is pending because you are not yet verified. You must verify your account before you can accept this payment. 
            '  other: The payment is pending for a reason other than those listed above. For more information, contact PayPal customer service. 
            */
            
            $pendingReason = $resArray["PENDINGREASON"];  

            /*
            'The reason for a reversal if TransactionType is reversal:
            '  none: No reason code 
            '  chargeback: A reversal has occurred on this transaction due to a chargeback by your customer. 
            '  guarantee: A reversal has occurred on this transaction due to your customer triggering a money-back guarantee. 
            '  buyer-complaint: A reversal has occurred on this transaction due to a complaint about the transaction from your customer. 
            '  refund: A reversal has occurred on this transaction because you have given the customer a refund. 
            '  other: A reversal has occurred on this transaction due to a reason not listed above. 
            */
            
            $reasonCode = $resArray["REASONCODE"];   
        }
        else  
        {
            //Display a user friendly Error on the page using any of the following error information returned by PayPal
            $ErrorCode = urldecode($resArray["L_ERRORCODE0"]);
            $ErrorShortMsg = urldecode($resArray["L_SHORTMESSAGE0"]);
            $ErrorLongMsg = urldecode($resArray["L_LONGMESSAGE0"]);
            $ErrorSeverityCode = urldecode($resArray["L_SEVERITYCODE0"]);
            
            /*echo "GetExpressCheckoutDetails API call failed. ";
            echo "Detailed Error Message: " . $ErrorLongMsg;
            echo "Short Error Message: " . $ErrorShortMsg;
            echo "Error Code: " . $ErrorCode;
            echo "Error Severity Code: " . $ErrorSeverityCode;*/
        }
        return $resArray;
    }
    //=============================================================================================
}
?>
