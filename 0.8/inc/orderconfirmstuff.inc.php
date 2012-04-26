<?php

	//remove_filter ('the_content', 'wpautop');
	//add_filter('the_content', 'dgoReplaceOrderConfirmPlaceholder',100);
	add_shortcode('orderconfirmplaceholder', 'dgoReplaceOrderConfirmPlaceholder');
	//function fill data
	function dgoReplaceOrderConfirmPlaceholder($data){
		$page = get_post(get_option('confirmPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
	
		require_once('translation.class.php');	
		$translation = new Web_2_print_Translation('web2print');
		
		global $post;
		$current_page = get_the_title($post->ID);
				
		//require control
		require_once 'dgoControls/ctrlstate.php'; //needed for every other control		
		$stateControl 	= new DgoStateControl(); //state control		
		
		//require baokimpayment lib
		require_once('payment_class/BaoKimPayment.php');
		
		//require nganluongpayment lib
		require_once('payment_class/NganLuongPayment.php');
		
		//***************************************************
		
		$paymentIconArr = array(
			'BaoKimInstant' => 'BaoKim.png',
			'CIA' 			=> 'cash.png',
			'NganLuong' 	=> 'NganLuong.png',
			'Payoo' 		=> 'Payoo.png',
			'PayPal' 		=> 'PayPal.png',
			'COD' 			=> 'COD.png',
			'Invoice' 		=> 'Invoice.png',
			'DebitBalance' 	=> 'DebitBalance.png',
			'Amazon' 		=> 'Amazon.png',
		);
		
		include_once "api_class/dgo_api.class.php";

		//Get info of changing options
		$profile_user = get_option("profile_user_info");
		
		//$plugin_option = get_option("w2p_plugin_option");
		$globallanguage = explode("_",$_SESSION["current_language"]['key']);
		
		$api = new DgoApiConnectionW2P();
		
		$api->setApiKey($profile_user['apikey']);
		
		$api->setApiSecret($profile_user['secret']);
		
		$orderObj = $api->DoApiRequest('Orders/'.$_SESSION['order_component']->{'InternalOrderNumber'});
		
		$orderObj = json_decode($orderObj);
		
		$orderObj = $orderObj->{'Value'};
		
		//get available article from php
		$getArticle = $api->DoApiGetRequest('Customer/'.$profile_user['apikey'].'/ResaleUnit/'.$profile_user['resaleGuid'].'/Articles', $globallanguage[1], 'Available:'.$globallanguage[1]);
		
		$getArticle = json_decode($getArticle);
		
		$articleGroup = json_decode($articleGroup);
		
		$arr = $getArticle->{'Value'};	

		$matchCode_tmp = null;
		$ArticleArray = null;
		
		function GroupOrderArticle_orderConfirm($valueObject, $groupName){
				$orderObjectReturn = array();
				$orderObjectGroup = array();
				
				$count = 0;
				
				for($i = 0; $i < count($valueObject); $i++){	
					if(is_array($valueObject[$i]) == false){
						$matchCode = explode("/", $valueObject[$i]->{'Matchcode'});
						
						if($matchCode[0] == $groupName){
							array_push($orderObjectGroup, $valueObject[$i]);
							$count++;
						}else{
							array_push($orderObjectReturn, $valueObject[$i]);
						}
						
					}else{
						$matchCode = explode("/", $valueObject[$i]['Matchcode']);
						
						if($matchCode[0] == $groupName){
							if(!isset($valueObject[$i]['Group'])){
								array_push($orderObjectGroup, $valueObject[$i]);
								$count++;
							}else{
								$orderObjectGroup = $valueObject[$i]['Group'];
								$count++;
							}
							
						}else{
							array_push($orderObjectReturn, $valueObject[$i]);
						}
						
					}		
				}
				
				if($count > 0){
					array_push($orderObjectReturn, array('Matchcode'  => $groupName, 
														 'Identifier' => $groupName, 
														 'Name' 	  => $groupName, 
														 'ArticleGroupEntry' => $groupName, 
														 'Group' 	  => $orderObjectGroup));
				}	
				
				return $orderObjectReturn;
		}
		
		foreach($arr as $key => $value){
			$match = explode("/",$value->{'Matchcode'});
			if($match[0] == "Crystal"){				
				$ArticleArray = GroupOrderArticle_orderConfirm($arr, 'Crystal');
			}
		}

		for($i = 1;$i < count($arr);$i++){
			$matchCodeArr = explode("/",$arr[$i]->{'Matchcode'});
			$matchCodeArrBefore = explode("/",$arr[$i-1]->{'Matchcode'});
					
			if($matchCodeArr[0] == $matchCodeArrBefore[0]){
				if($matchCode_tmp == null || $matchCode_tmp != $matchCodeArr[0]){
					$matchCode_tmp = $matchCodeArr[0];
					if($ArticleArray == null){
						$ArticleArray = GroupOrderArticle_orderConfirm($arr, $matchCode_tmp);
					}else{
						$ArticleArray = GroupOrderArticle_orderConfirm($ArticleArray, $matchCode_tmp);
					}
				}
			}
		}

		if($current_page == $translation->translate('OrderConfirmation')){									
			//delete session on shopping cart
			unset($_SESSION['prices_import']);
		}

			$order_confirmation = $_SESSION['order_component'];
			foreach($order_confirmation->{'Article'} as $n => $r){
				foreach($ArticleArray as $key => $value){
					//if this article doesnt have group
					if(is_array($value) == false){
						if($value->{'Identifier'} == $r->{'Identifier'}){
							$match_code = $value->{'Matchcode'};
							$identifier_code = $r->{'Identifier'};
							$material_code = $r->{'Material'};
							break;
						}
					}else{					
						foreach($value['Group'] as $k => $v){
							if($v->{'Identifier'} == $r->{'Identifier'}){
								$match_code = $v->{'Matchcode'};
								$identifier_code = $r->{'Identifier'};
								$material_code = $r->{'Material'};
								break;
							}						
						}
					}	
				}
			}
			
			if(isset($order_confirmation->{'Errors'})){
				$order_status = 'Error';
			}else{
				$order_status = 'Success';
			}
			
			$OrderNumber	  = $orderObj->{'OrderNumber'};
			$OrderDate		  = date_create($orderObj->{'Created'});
			$OrderDate 		  = date_format($OrderDate,'d.m.Y');
			$Address 		  = $orderObj->{'OrderContacting'}[0]->{'OrderContactingAddress'}[1];
			$Payment		  = "";			
			
			$paymentTranslation = $order_confirmation->{'Article'}[0]->{'Payment'}->{'Name'};
			$Payment			= $order_confirmation->{'Article'}[0]->{'Payment'}->{'Name'};
			$paymentClass 	    = 'payment-'.$order_confirmation->{'Article'}[0]->{'Payment'}->{'Type'};
			
			$Shipment 		= $order_confirmation->{'Shipment'}->{'ShipmentName'};
			$icon_class 	= $order_confirmation->{'Shipment'}->{'ShipmentProvider'};
			$shipmentClass 	= 'shipment-'.$order_confirmation->{'Shipment'}->{'ShipmentProvider'};
			
			$Sum 			  = 0;
			
			$VAT 			  = 0;
			
			$paymentPrice	  = 0;
			
			$shippingPrice    = 0;
			
			$articles         = $orderObj->{'OrderArticle'};	
			
			//script
			$scriptPlaceHolder  .= '
				//check cropping
				orderDateConvert();				
			';
			
			$articleDescriptions = '';
			
			$articleOrderConfirm = null;
			//$articleNameDescription = null;
			$articleName			= null;
			for($i = 0; $i < count($articles); $i++){							
				
				$internalOrderNumber 	= $articles[$i]->{'JobNumber'};
				
				for($j = 0;$j < count($articles[$i]->{'OrderArticleTranslation'});$j++){
					if($articles[$i]->{'OrderArticleTranslation'}[$j]->{'LanguageToken'} == $globallanguage[1]){
						$articleName 			= $articles[$i]->{'OrderArticleTranslation'}[$j]->{'Name'};
						$Oderproduct_description=$articles[$i]->{'OrderArticlePriceToken'}[0]->{'PriceToken'}->{'PriceTokenTranslation'}[0]->{'Description'};
						$Oderproduct_description=explode(',',$Oderproduct_description);
						$description_product=$Oderproduct_description[0];
					}else if($j == count($articles[$i]->{'OrderArticleTranslation'})-1 && $articleName == null){
						$articleName 			= $articles[$i]->{'OrderArticleTranslation'}[0]->{'Name'};
						$Oderproduct_description=$articles[$i]->{'OrderArticlePriceToken'}[0]->{'PriceToken'}->{'PriceTokenTranslation'}[0]->{'Description'};
						$Oderproduct_description=explode(',',$Oderproduct_description);
						$description_product=$Oderproduct_description[$i];
					}
				}	
				
				$articleName .= " (" . $articles[$i]->{'PageLengthOpen'} . " x " . $articles[$i]->{'PageWidthOpen'};
				
				if(isset($articles[$i]->{'PageDepthOpen'})){
					$articleName .= " x " . $articles[$i]->{'PageDepthOpen'};
				}
				
				$articleName .= ") " . $plugin_option['dimension'];
				
				
				$price_session= $_SESSION['order_component']->{'Article'};
				$img_name= $price_session[$i]->{'Identifier'};
				$articleDescriptions 	.= $articleDescription.';';
				$realdy_shipment=date_create($articles[0]->{'PlannedProductionEndDateMin'});
				$articlePriceType 		= date_format($realdy_shipment,'d.m.Y').'- '.$articles[0]->{'PriceTypeToken'};
				$articleAmount 			= $articles[0]->{'Amount'};
				$articleRun 			= $articles[0]->{'Run'};
				$articlePrice = 0;
				//$tmp=$articles[$i]->{'OrderArticlePriceToken'}[$i]->{'PriceToken'};
				$price_session= $_SESSION['order_component']->{'Article'};
				
				//$tpm=json_decode($tmp);
				for($k = 0; $k < count($price_session[$i]->{'Prices'}->{'Items'}); $k++){
					$type_temp = explode('|',$price_session[$i]->{'Prices'}->{'Items'}[$k]->{'Type'});
					if($type_temp[0] == 'Payment'){
						if($i == 0){
							//Payment price
							$paymentPrice += $price_session[$i]->{'Prices'}->{'Items'}[$k]->{'SaleNet'};
							
							//Payment price VAT count one time
							$VAT_temp = $price_session[$i]->{'Prices'}->{'Items'}[$k]->{'VatPercentage'} * $price_session[$i]->{'Prices'}->{'Items'}[$k]->{'SaleNet'} / 100;
							$VAT += $VAT_temp;
						}
					}else if($type_temp[0] == 'Shipment'){
						if($i == 0){
							//Shipment price
							$shippingPrice = $price_session[$i]->{'Prices'}->{'Items'}[$k]->{'SaleNet'};
							
							//Shipment price VAT count one time
							$VAT_temp = $price_session[$i]->{'Prices'}->{'Items'}[$k]->{'VatPercentage'} * $price_session[$i]->{'Prices'}->{'Items'}[$k]->{'SaleNet'} / 100;
							$VAT += $VAT_temp;
						}
					}else{
						//Base price
						$articlePrice +=$price_session[$i]->{'Prices'}->{'Items'}[$k]->{'SaleNet'};
						
						//Base price VAT		
						$VAT_temp = $price_session[$i]->{'Prices'}->{'Items'}[$k]->{'VatPercentage'} * $price_session[$i]->{'Prices'}->{'Items'}[$k]->{'SaleNet'} / 100;
						$VAT += $VAT_temp;
					}
				}
				$price_session= $_SESSION['order_component']->{'Article'};
				$articleCurrency 		= $price_session[$i]->{'Prices'}->{'Items'}[0]->{'Currency'};				
				$articlePriceShow 		= formatCurrency($articlePrice, $articleCurrency).' '.$articleCurrency;
		
				$articles_uri    		= $price_session[$i]->{PrintData}[0]->{Items}[0];
				$articlePic 			= '<img src="'.$articles_uri.'" width="70" alt="Article Picture">';
				$article_thums='style="background-image:url('.linkToPlugin.'css/img/productThumbs/'.$img_name.'.png);height:75px; width: 70px;"';
				$img_mask_replace=str_replace(".","_",$img_name);
				$articlePicturemash_confirm = linkToPlugin.'css/img/imgMask/'.$img_mask_replace.'.png';
				$articleThumes=str_replace('.','_',$img_name);
				//$articles_name[5] = explode('.',$articles_name[5]);
				$Sum += $articlePrice;	
				?>
				<script type="text/javascript">
	             var img_links_test='<?php echo $articles_uri ?>';
	             var img = new Image();
				img.onload = function() {
				  if(this.width>this.height){
				  	jQuery('.order-position-image img').css({"height":"75px"});
				  	jQuery('.order-position-image img').css({"width":"auto"});
				  }else{
					jQuery('.order-position-image img').css({"width":"75px"});
				  	jQuery('.order-position-image img').css({"height":"auto"});
				  }
				}
				img.src = img_links_test;

                </script>
				<?php
				
				//open the article template file
				$articleTemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/orderconfirmarticle.tpl');
				
				$articleTemplate->replace_tags(array(
								"internalOrderNumber" 		=> array( $internalOrderNumber ,false),										
								//"articleName" 				=> array( $articleName ,false),										
								"articleNameDescription" 	=> array( $description_product,false),										
								"articleDescription" 		=> array( $articleDescription ,false),										
								"articlePriceType" 			=> array( $articlePriceType ,false),
								"articleThumes"				=> array( $articleThumes ,false),						
								"articleAmount" 			=> array( $articleAmount ,false),										
								"articleRun" 				=> array( $articleRun ,false),										
								"articlePriceShow" 			=> array( $articlePriceShow ,false),	
								"articlePic" 				=> array( $articlePic ,false),
								"articlethums" 				=> array( $article_thums ,false),
								"articleThumbs_confirm"	    => array( $img_mask_replace,false),
								"articlePicturemash_confirm" => array( $articlePicturemash_confirm ,false),
								"transPos" 					=> array( $translation->translate('Pos') ,false),
								"transDetailsandDescription" => array( $translation->translate('DetailsandDescription') ,false),
								"transAmount" 				=> array( $translation->translate('Amount') ,false),
								"transPrice" 				=> array( $translation->translate('Price') ,false),
								"transAction" 				=> array( $translation->translate('Action') ,false),
								"transProduction" 			=> array( $translation->translate('ProductFinishedCaption') ,false),
								"transShow" 				=> array( $translation->translate('Show') ,false),

							  )
						);
						
				$articleOrderConfirm .= $articleTemplate->getHtml();
			}		
	
			$numberArticles 	= count($articles);
			$orderStreet 		= $Address->{'OrderAddress'}->{'Street'};
			$orderUserName 		= $Address->{'OrderAddress'}->{'Forename'}." ".$Address->{'OrderAddress'}->{'Surname'};
			$orderCity 			= $Address->{'OrderAddress'}->{'City'};
			$orderCountry 		= $Address->{'OrderAddress'}->{'Country'};
			$orderPayment 		= $Payment;
			$orderShipment 		= $Shipment;
			
			$price_session		= $_SESSION['order_component']->{'Article'};
			$articleCurrency 	= $price_session[0]->{'Prices'}->{'Items'}[0]->{'Currency'};
			$shippingShow 		= formatCurrency($shippingPrice, $articleCurrency).' '.$articleCurrency;
			$paymentShow 		= formatCurrency($paymentPrice, $articleCurrency).' '.$articleCurrency;
			$VATShow 			= formatCurrency($VAT, $articleCurrency).' '.$articleCurrency;
			
				$Sum += $paymentPrice;
				$Sum += $shippingPrice;
				$Sum += $VAT;
			
			$sumShow 			= formatCurrency($Sum, $articleCurrency).' '.$articleCurrency;
			
			if($order_status == "Success"){
				$Status_Title 	= $translation->translate('ThanksForYourOrder');
				$displayVCBInfo = 'none';

				if($orderPayment == "CIA"){
					$displayVCBInfo = 'block';
				}
				
				//------------------------------------ baokim payment
				if($orderPayment == 'BaoKimInstant' || $orderPayment == 'BaoKimSafe'){				
					$baokim = new BaoKimPayment();
					if(!isset($_GET['created_on'])){
						$order_id 			= $_SESSION['order_component']->{'InternalOrderNumber'};
						$business 			= 'cuongd@normprint.com';
						$total_amount 		= round($Sum);
						$order_description 	= $articleDescriptions;
						$shipping_fee 		= 0; //shipping fee
						$tax_fee 			= 0; //tax fee
						$url_success 		= get_bloginfo('url'). 'order-confirmation'; //Url callback to update payment status on our site
						$url_cancel 		= get_bloginfo('url'). 'order-confirmation'; //Url when click link "Tôi không muốn thanh toán đơn hàng này" on Bao Kim payment system
						$url_detail 		= ''; //Url contain details information about order
						$request_url 		= $baokim->createRequestUrl($order_id, $business, $total_amount, $shipping_fee, $tax_fee, $order_description, $url_success, $url_cancel, $url_detail);									    
						$transPaymentMethod = "<a href=".$request_url."><img src='".linkToPlugin."css/img/imgCheckOut/baokim.png' border='0'></a><br>";
						$transPaymentMethod .= "<a href='https://www.baokim.vn/payment_guide/huongdannhain.html' target='_blank'>[".$translation->translate('PaymentMethodInstructionViaBaoKim')."]</a><br>";
						$transText 			= $translation->translate('PlsClickButtonBelowToCompleteYourOrder');
					}else{
						$check 				= $baokim->verifyResponseUrl($_GET);
						if($check){
							$transText 		= '';			
						}else{
							$order_id 			= $_SESSION['order_component']->{'InternalOrderNumber'};
							$business 			= 'cuongd@normprint.com';
							$total_amount 		= round($Sum);
							$order_description 	= $articleDescriptions;
							$shipping_fee 		= 0; //shipping fee
							$tax_fee 			= 0; //tax fee
							$url_success 		= get_bloginfo('url'). '/w2p-shop/order-confirmation-3'; //Url callback to update payment status on our site
							$url_cancel 		= get_bloginfo('url'). '/w2p-shop/order-confirmation-3'; //Url when click link "Tôi không muốn thanh toán đơn hàng này" on Bao Kim payment system
							$url_detail 		= ''; //Url contain details information about order						
							
							$request_url 		= $baokim->createRequestUrl($order_id, $business, $total_amount, $shipping_fee, $tax_fee, $order_description, $url_success, $url_cancel, $url_detail);									    
							$transPaymentMethod = "<a href=".$request_url."><img src='".linkToPlugin."css/img/imgCheckOut/baokim.png' border='0'></a><br>";
							$transPaymentMethod .= "<a href='https://www.baokim.vn/payment_guide/huongdannhain.html' target='_blank'>[".$translation->translate('PaymentMethodInstructionViaBaoKim')."]</a><br>";
							$transText 			= $translation->translate('PlsClickButtonBelowToCompleteYourOrder');
						}
					}
				}
				//---------------------------------------- end baokim payment
				
				//---------------------------------------- nganluong payment
				if($orderPayment == "NganLuong"){
					
					$nl= new NL_Checkout();
					if(!isset($_GET["transaction_info"])){
						$order_id 		= $_SESSION['order_component']->{'InternalOrderNumber'};
						$business 		= 'cuongd@normprint.com';
						$total_amount 	= round($Sum);					
						$url_success 	= get_bloginfo('url'). '/w2p-shop/order-confirmation'; //Url callback to update payment status on our site					
						$url			= $nl->buildCheckoutUrl($url_success, $business, $order_id,  $order_id, $total_amount);
						
						$transPaymentMethod = "<a href=".$url."><img src='".linkToPlugin."css/img/imgCheckOut/nganluong.png' border='0'></a><br>";
						$transPaymentMethod .= "<a href='http://help.nganluong.vn/nhain.vn.html' target='_blank'>[".$translation->translate('PaymentMethodInstructionViaNganLuong')."]</a><br>";
						$transText 			= $translation->translate('PlsClickButtonBelowToCompleteYourOrder');
					}else{
						$transaction_info	= $_GET["transaction_info"];
						$order_code			= $_GET["order_code"];
						$price				= $_GET["price"];
						$payment_id 		= $_GET["payment_id"];
						//get payment method (1 = payment instant ,2 = payment safe)
						$payment_type 		= $_GET["payment_type"];
						$error_text 		= $_GET["error_text"];
						$secure_code 		= $_GET["secure_code"];
						
						$check = $nl->verifyPaymentUrl($transaction_info, $order_code, $price, $payment_id, $payment_type, $error_text, $secure_code);
						
						if($check == false){
							$order_id 		= $_SESSION['order_component']->{'InternalOrderNumber'};
							$business 		= 'cuongd@normprint.com';
							$total_amount 	= round($Sum);					
							$url_success 	= get_bloginfo('url'). '/w2p-shop/order-confirmation'; //Url callback to update payment status on our site											
							$url 			= $nl->buildCheckoutUrl($url_success, $business, $order_id,  $order_id, $total_amount);	
							$transPaymentMethod = "<a href=".$url."><img src='".linkToPlugin."css/img/imgCheckOut/nganluong.png' border='0'></a><br>";
							$transPaymentMethod .= "<a href='http://help.nganluong.vn/nhain.vn.html' target='_blank'>[".$translation->translate('PaymentMethodInstructionViaNganLuong')."]</a><br>";
							$transText 			= $translation->translate('PlsClickButtonBelowToCompleteYourOrder');
						}else{
							$transText = '';
						}
					}				
				}
				//---------------------------------------- end ngan luong payment
			}
			
			//use for print page
			$tagName 		= 'order-container'; //tag div
			$windowName 	= $translation->translate('OrderConfirmation'); //window name
			$isId			= 'false'; //id or class div you want to print
			$homeUrl		= home_url(); //home url
			$windowWidth 	= '585'; //window width
			$windowHeight	= '750'; //window height
			$arrayCss		= 'order-confirmation.css|shoppingCart.css'; //array css use for new window 
			 
			//Best sales product
			$bestProductCup 		= '<img src="'.linkToPlugin.'css/img/icon/cup.png" title="Cup">';
			$bestProductCup10 		= '<img src="'.linkToPlugin.'css/img/icon/10.png" title="Cup">';
			$bestProductCup11 		= '<img src="'.linkToPlugin.'css/img/icon/11.png" title="Cup">';
			$bestProductCup14 		= '<img src="'.linkToPlugin.'css/img/icon/14.png" title="Cup">';
			$bestProductShirt		= '<img src="'.linkToPlugin.'css/img/icon/T-shirts.png" title="T-Shirt">';
			$bestProductShirt29		= '<img src="'.linkToPlugin.'css/img/icon/29.png" title="T-Shirt">';
			$bestProductShirt21		= '<img src="'.linkToPlugin.'css/img/icon/21.png" title="T-Shirt">';
			$bestProductShirt22		= '<img src="'.linkToPlugin.'css/img/icon/22.png" title="T-Shirt">';
			$bestProductShirt28		= '<img src="'.linkToPlugin.'css/img/icon/28.png" title="T-Shirt">';
			$bestProductMousepad 	= '<img src="'.linkToPlugin.'css/img/icon/mousepad.png" title="Mouse pad">';
			$bestProductMousepad15 	= '<img src="'.linkToPlugin.'css/img/icon/15.png" title="Mouse pad">';
			$bestProductMousepad16 	= '<img src="'.linkToPlugin.'css/img/icon/16.png" title="Mouse pad">';
			$bestProductMousepad18 	= '<img src="'.linkToPlugin.'css/img/icon/18.png" title="Mouse pad">';
			$bestProductShirtGirl 	= '<img src="'.linkToPlugin.'css/img/icon/T-shirt-girl.png" title="T-Shirt">';
			$bestProductKeychains 	= '<img src="'.linkToPlugin.'css/img/icon/Keychains.png" title="Keychains">';
			$bestProducthat 		= '<img src="'.linkToPlugin.'css/img/icon/hat.png" title="hat">';
			$bestProductcard 		= '<img src="'.linkToPlugin.'css/img/icon/card.png" title="card">';
			$bestProductbag 		= '<img src="'.linkToPlugin.'css/img/icon/bag.png" title="bag">';
			$bestProductapron 		= '<img src="'.linkToPlugin.'css/img/icon/apron.png" title="apron">';
			$bestProductsandal 		= '<img src="'.linkToPlugin.'css/img/icon/sandal.png" title="sandal">';
			$bestProductsandal35 	= '<img src="'.linkToPlugin.'css/img/icon/35.png" title="sandal">';
			$bestProducttie 		= '<img src="'.linkToPlugin.'css/img/icon/tie.png" title="tie">';
			$bestProductdisk 		= '<img src="'.linkToPlugin.'css/img/icon/disk.png" title="disk">';
			
			
			//open the template file
			$template = new TemplateEngine(dirname(__FILE__).'/../tpl/orderconfirm.tpl');
			$template->replace_tags(array(
											"portalInfo" 									=> array( W2PConfig::$globalPortal ,false),											
											"tagName" 										=> array( $tagName ,false),										
											"windowName" 									=> array( $windowName ,false),										
											"isId" 											=> array( $isId ,false),										
											"url" 											=> array( $homeUrl ,false),										
											"windowWidth" 									=> array( $windowWidth ,false),										
											"windowHeight" 									=> array( $windowHeight ,false),										
											"arrayCss" 										=> array( $arrayCss ,false),										
											"orderDate" 									=> array( $OrderDate ,false),
											"internalOrderNumber" 							=> array( $OrderNumber ,false),
											"numberArticles" 								=> array( $numberArticles ,false),										
											"sumPrice" 										=> array( $sumShow ,false),										
											"orderStreet" 									=> array( $orderStreet ,false),										
											"orderUserName" 								=> array( $orderUserName ,false),										
											"orderCity" 									=> array( $orderCity ,false),										
											"orderCountry" 									=> array( $orderCountry ,false),										
											"orderPayment" 									=> array( $orderPayment ,false),										
											"orderShipment" 								=> array( $orderShipment ,false),										
											"orderConfirmElements" 							=> array( $articleOrderConfirm ,false),																		
											"transThanksForYourOrder" 						=> array( $Status_Title ,false),																		
											"shippingCost" 									=> array( $shippingShow ,false),																		
											"paymentCost" 									=> array( $paymentShow ,false),																		
											"vatCost" 										=> array( $VATShow ,false),																		
											"bestProductCup" 								=> array( $bestProductCup ,false),																		
											"bestProductCup10" 								=> array( $bestProductCup10 ,false),																		
											"bestProductCup11" 								=> array( $bestProductCup14 ,false),																		
											"bestProductCup14" 								=> array( $bestProductCup11 ,false),																		
											"bestProductShirt" 								=> array( $bestProductShirt ,false),																		
											"bestProductShirt29" 							=> array( $bestProductShirt29 ,false),																		
											"bestProductShirt21" 							=> array( $bestProductShirt21 ,false),																		
											"bestProductShirt22" 							=> array( $bestProductShirt22 ,false),																		
											"bestProductShirt28" 							=> array( $bestProductShirt28 ,false),																		
											"bestProductMousepad" 							=> array( $bestProductMousepad ,false),																		
											"bestProductMousepad15" 						=> array( $bestProductMousepad15 ,false),																		
											"bestProductMousepad16" 						=> array( $bestProductMousepad16 ,false),																		
											"bestProductMousepad18" 						=> array( $bestProductMousepad18 ,false),																		
											"bestProductapron" 								=> array( $bestProductapron ,false),																		
											"bestProductsandal" 							=> array( $bestProductsandal ,false),																		
											"bestProductsandal35" 							=> array( $bestProductsandal35 ,false),																																			
											"bestProducttie" 								=> array( $bestProducttie ,false),																		
											"bestProductbag" 								=> array( $bestProductbag ,false),																		
											"bestProductcard" 								=> array( $bestProductcard ,false),																		
											"bestProducthat" 								=> array( $bestProducthat ,false),																		
											"bestProductdisk" 								=> array( $bestProductdisk ,false),																		
											"bestProductKeychains" 							=> array( $bestProductKeychains ,false),																		
											"bestProductShirtGirl" 							=> array( $bestProductShirtGirl ,false),																		
											"transOrderConfirmation" 						=> array( $translation->translate('OrderConfirmation') ,false),																		
											"transShippingAddress" 							=> array( $translation->translate('ShippingAddress') ,false),																		
											"transPayment" 									=> array( $translation->translate('Payment') ,false),																		
											"transShipment" 								=> array( $translation->translate('Shipment') ,false),																		
											"transPlsClickButtonBelowToCompleteYourOrder" 	=> array( $transText ,false),																		
											"transPaymentMethod" 							=> array( $transPaymentMethod ,false),																		
											"transPleasetransferthepayment" 				=> array( $translation->translate('Pleasetransferthepayment') ,false),																		
											"transBanknameBankforForeignTradeofVietnam" 	=> array( $translation->translate('BanknameBankforForeignTradeofVietnam') ,false),																		
											"transBanknameBankforACB" 						=> array( $translation->translate('BanknameBankforACB') ,false),																		
											"transCompanynameHoangProductCompanyLimited" 	=> array( $translation->translate('CompanynameHoangProductCompanyLimited') ,false),																		
											"transAccountnumber" 							=> array( $translation->translate('Accountnumber') ,false),
											"Sum" 											=> array( $translation->translate('Sum') ,false),
											"Article" 										=> array( $translation->translate('Article') ,false),																		
											"transOrderDate" 								=> array( $translation->translate('OrderDate') ,false),																		
											"paymentClass" 									=> array( $paymentClass ,false),																		
											"shipmentClass" 								=> array( $shipmentClass ,false),																		
											"VAT" 											=> array( $translation->translate('VAT') ,false),																		
											"orderConfirmArr" 								=> array( json_encode($_SESSION['order_component']) ,false),																		
											"orderConfirmArrFromApi" 						=> array( json_encode($orderObj) ,false),
											"metaTag"					=> array($postTitle,false),										
											"blogName"					=> array(get_bloginfo(),false),											
										  )
									);		

			//get the html code of the control
			echo $html = $template->getHtml();
			//replace placeholder with control html
	    	//$data = str_ireplace("%orderconfirmplaceholder%", $html, $data);
	    	//return the new page content
	    	//return $data;
				
		
	}
	
	//function create address book page
	function createOrderConfirmPage(){		
		//If hasn't any page with name: Order Confirmation, inserting a page with this name
		$confirmPage = get_page_by_title('Order Confirmation');
		if(!$confirmPage){
			//create catelogy
			$category = 'W2P Shop';
			$catelogy_id = wp_create_category($category);
			//insert new post
			$confirmData['post_title'] 		= 'Order Confirmation';
			$confirmData['post_content'] 	= "[orderconfirmplaceholder]";
	        $confirmData['post_status'] 	= 'publish';
	        $confirmData['comment_status'] 	= 'closed';
	        $confirmData['ping_status'] 	= 'closed';
	        $confirmData['post_type'] 		= 'page';	
			$confirmData['post_category'] 	= array($catelogy_id);
			//insert post
			$confirmID = wp_insert_post($confirmData);
			//using add_option to mark it
	        delete_option('confirmPageID');
	        add_option('confirmPageID', $confirmID);
		}
	}
?>