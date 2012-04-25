<?php
	//session start
	session_start();
	
	//store informations after click order button (payment is PayPal)
	//we will show these infomations after user checkouts success in paypal system
	if($_GET['option'] == 'Info_Before_Checkout'){
		$shipping 		= $_GET['shipping'];
		$payment 		= $_GET['payment'];
		$payment_cost 	= $_GET['payment_cost'];
		$shipping_cost 	= $_GET['shipping_cost'];
		
		if(isset($_SESSION['Info_Before_Checkout'])){
			$_SESSION['Info_Before_Checkout']["shipping"] 		= $shipping;
			$_SESSION['Info_Before_Checkout']["payment"] 		= $payment;
			$_SESSION['Info_Before_Checkout']["payment_cost"] 	= $payment_cost;
			$_SESSION['Info_Before_Checkout']["shipping_cost"] 	= $shipping_cost;
			
			echo json_encode($_SESSION['Info_Before_Checkout']);			
		}else{
			$_SESSION['Info_Before_Checkout'] = array(
													"shipping" => $shipping,
													"payment" => $payment,
													"payment_cost" => $payment_cost,
													"shipping_cost" => $shipping_cost
													);
											
			echo json_encode($_SESSION['Info_Before_Checkout']);
		}		
	}
	
	if($_GET['option'] == 'article_delete'){
		$article_id = $_GET['article'];
		
		foreach($_SESSION['prices_import'] as $i => $value){
			if($value->{'ArticleID'} == $article_id){				
				unset($_SESSION['prices_import'][$i]);
			}	
		}
		
		if(count($_SESSION['prices_import']) == 1){
			unset($_SESSION['prices_import']);
		}
		
		if(isset($_SESSION['prices_import']['guid-user-from-android'])){
			unset($_SESSION['prices_import']['guid-user-from-android']);			
		}
		
	}else if($_GET['option'] == 'article_change'){
		$article_id = $_GET['article'];
		
		$article_protype = $_GET['pro'];
		$article_run = $_GET['run'];
		$article_amount = $_GET['amount'];
		$article_price = $_GET['price'];
		$article_price_vat = $_GET['price_vat'];
		$article_currency = $_GET['currency'];
		
		for($i = 0; $i < count($_SESSION['prices_import']); $i++){
			if($_SESSION['prices_import'][$i]->{'ArticleID'} == $article_id){
				$_SESSION['prices_import'][$i]->{'PriceType'} = $article_protype;
				$_SESSION['prices_import'][$i]->{'Run'} = $article_run;
				$_SESSION['prices_import'][$i]->{'Amount'} = $article_amount;
				$_SESSION['prices_import'][$i]->{'ProductPrice'} = $article_price;
				$_SESSION['prices_import'][$i]->{'ProductPriceVAT'} = $article_price_vat;
				$_SESSION['prices_import'][$i]->{'Prices'}->{'Items'}[0]->{'Currency'} = $article_currency;
			}	
		}
	}else if($_GET['option'] == 'price_change'){
		$article_index = $_GET['index'];
		$article_price = $_GET['price'];
		$article_price_vat = $_GET['price_vat'];
		$article_currency = $_GET['currency'];		
		
		$count = 0;
		for($i = 0; $i < count($_SESSION['prices_import']); $i++){
				$prices_import = $_SESSION['prices_import'][$i];
				if($prices_import->{'ArticleID'} != null){
					if($count == $article_index){
						//change value
						$prices_import->{'ProductPrice'} = $article_price;
						$prices_import->{'ProductPriceVAT'} = $article_price_vat;
						$prices_import->{'Prices'}->{'Items'}[0]->{'Currency'} = $article_currency;
						
						$count = 0;
						break;
					}
					$count++;
				}
		}
	}
	
	if($_GET['option'] == 'logout'){
		unset($_SESSION['login']);
		unset($_SESSION['dgoUserLogin']);
		unset($_SESSION['contact']);
		unset($_SESSION['linkedin']);
	}
?>