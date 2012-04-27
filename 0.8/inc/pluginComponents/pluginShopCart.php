/*GET SESSION TO JAVA OBJECT*/
var shop_articles = [];


<?php
//echo "<pre>"; print_r( $_SESSION['prices_import'] ) ; echo "</pre>"; 
if(isset($_SESSION['prices_import'])){
	$articleCount = 0;
	
	//print_r($_SESSION['prices_import']);
	for($i = 0; $i < count($_SESSION['prices_import']); $i++){
		if($_SESSION['prices_import'][$i]->{'ArticleID'} != null){
			$articleCount++;
			
			//assign parameters for session
			$_SESSION['prices_import'][$i]->{'ArticleID'} = 'article_'.$i;			
?>	
			//change currency view
			var priceTemp = '<?php echo $_SESSION['prices_import'][$i]->{'Prices'}->{'Items'}[0]->{'Sale'}->{'Net'} ?>';
			var currencyTemp = '<?php echo $_SESSION['prices_import'][$i]->{'Prices'}->{'Items'}[0]->{'Sale'}->{'Currency'} ?>';

			var shop_article = <?php echo json_encode($_SESSION['prices_import'][$i]);  ?>;
			shop_article.PriceShow = formatCurrency(priceTemp, currencyTemp);
			shop_articles.push( shop_article );			
<?php 
		}
	}	
}
?>

var shoppingContainer = "<div class='headerShoppingDiv'><div class='changingShoppingDiv'></div><div class='upShoppingDiv'><div class='order order-confirm-button is-bottons'><span><?php _e('Order', $l10n_prefix); ?></span></div></div></div><form action='' method='post' id='frmVTPayment' name='frmVTPayment'><input type='hidden' name='hidPaymentType' id='hidPaymentType' value='0'><input type='hidden' name='hidSubmitPayment' id='hidSubmitPayment' value='1'>";                
shoppingContainer += "<div class='cartTable'><div class='cartArticleTitle'><div><?php _e('Pos', $l10n_prefix); ?></div><div><?php _e('ArticleAndDescription', $l10n_prefix); ?></div><div><?php _e('Amount', $l10n_prefix); ?></div><div><?php _e('Action', $l10n_prefix); ?></div><div><?php _e('Price', $l10n_prefix); ?></div></div></div></form>";			                
shoppingContainer += "<div class='paymentDiv'>";			                
shoppingContainer += "<div class='option-element-container'><div class='option-element-title'><span><?php _e('SelectShippingAddress', $l10n_prefix); ?></span></div><div class='payment-div payment-address'><div><span><?php _e('YourAddress', $l10n_prefix); ?></span></div><div></div></div><div class='option-element-result'></div></div>";
shoppingContainer += "<div class='option-element-container'><div class='option-element-title'><span><?php _e('SelectShippingMethod', $l10n_prefix); ?></span></div><div class='payment-div payment-ship'><div><span><?php _e('StandardShipping', $l10n_prefix); ?></span></div><div></div></div><div class='option-element-result'><span id='shipping-price'></span><input class='cal-shipping-input' type='hidden' value='' /></div></div>";
shoppingContainer += "<div class='option-element-container'><div class='option-element-title'><span><?php _e('SelectPaymentMethod', $l10n_prefix); ?></span></div><div class='payment-div payment-payment'><div><span><?php _e('PaymentMethod', $l10n_prefix); ?></span></div><div></div></div><div class='option-element-result'><span id='payment-price'></span><input class='cal-payment-input' type='hidden' value='' /></div></div></div>";
shoppingContainer += "<div class='sumDiv'><input class='cal-payment-cost' type='hidden' value='' /><div class='customerDiv'><input name='termin' type='checkbox'/><span><?php _e('TermsAndConditionCaption', $l10n_prefix); ?></span></div><div class='cal-sum-cost cal-cost'><div class='cal-sum-name'><span><?php _e('Include', $l10n_prefix).' '; ?></span></div><div class='cal-sum-value'></div><input type='hidden' value='' /></div></div>";
shoppingContainer += "<div class='footerShoppingDiv'><div class='continueShoppingDiv'><span></span></div><div class='couponShoppingDiv'><span></span></div><div class='upShoppingDiv'><span class='payExpress'></span><div class='order order-confirm-button is-bottons'><span><?php _e('Order', $l10n_prefix); ?></span></div>";
shoppingContainer += '<div class="payment-access-amazon"></div>';
shoppingContainer += '</div></div><input class="dgo-page-name" type="hidden" value="shoppingCart">';
jQuery('.shopping-cart-container').empty().append(shoppingContainer);

//fill articles
for(var i = 0; i < shop_articles.length; i++){
	//calculate production time
	var production_time = shop_articles[i].Prices.Items[0].MaxDate;
	production_time = new Date(parseInt(production_time.substr(6)));
	production_time = production_time.format('dd.mm.yyyy');
	
	var rowContent = '<div class="cart_article_' + shop_articles[i].ArticleID + '"><div class="cartArticle">';
	rowContent += '<div class="posDiv"></div>';
	rowContent += '<div class="descriptionDiv">' + shop_articles[i].Description + '<br/>' + shop_articles[i].Name +'<br /><?php _e("ProductFinishedCaption", $l10n_prefix).' '; ?><select class="product-time-select"><option value="' + shop_articles[i].PriceType + '">' + production_time + '</option></select><br /></div>';
	rowContent += '<div class="amountDiv"><select class="amout-select"><option>' + shop_articles[i].Run + '</option></select></div>';
	rowContent += '<div><img class="delAction" src="' + web_2_print_blogInfo + 'css/img/icon/delete.png"/></div>';
	rowContent += '<div class="priceDiv"><span>' + shop_articles[i].PriceShow + ' ' + shop_articles[i].Prices.Items[0].Sale.Currency + '</span></div>';
	rowContent += '<input class="article_id" type="hidden" value="' + shop_articles[i].ArticleID + '" /><input class="order_dim_width" type="hidden" value="' + shop_articles[i].PageWidthOpen + '" /><input class="order_dim_height" type="hidden" value="' + shop_articles[i].PageLengthOpen + '" /></div>';
	rowContent += '<div class="shop-article-pictures"><div class="shop-article-pictures-in">';
	
	for(var j = 0; j < shop_articles[i].Pictures.length; j++){
		if(shop_articles[i].Pictures[j].Active == undefined){
			var _pictures = shop_articles[i].Pictures[j];
			
			rowContent += '<li class="article-picture-li"><div class="article-picture-border article-picture-border_' + i + j +'"><img class="article_' + _pictures.Format + '" src="'+ _pictures.ThumbnailUri + '" alt=""/>';
			rowContent += '<input class="thumb_hidden" type="hidden" value="'+ _pictures.ThumbnailUri +'"/><input class="url_hidden" type="hidden" value="'+ _pictures.ImageUri +'"/><input class="article_id" type="hidden" value="' + shop_articles[i].ArticleID + '"/><input class="handle_hidden" type="hidden" value="'+ _pictures.Handle +'"/><input class="image_hidden" type="hidden" value="'+ _pictures.Filename +'"/><input class="width_hidden" type="hidden" value="'+ _pictures.ImageWidth +'"/><input class="height_hidden" type="hidden" value="'+ _pictures.ImageHeight +'"/></div><div class="img_div_tools">';
			rowContent += '<div class="shop_img_delete" onclick="ArticlePictureDelete(' + i + "," + j +')"></div><div class="shop_img_edit" onclick="ArticlePictureEdit(' + i + "," + j +')"></div></div></li>'; //onclick="ArticlePictureEdit(' + i + "," + j +')"
		}
	}
	
	rowContent += '<input type="hidden" name="item_sku[]" value="' + i +  '">';
	rowContent += '<input class="check-out-name" type="hidden" name="item_name[]" value="' + shop_articles[i].article_name +  '">';
	rowContent += '<input class="check-out-des" type="hidden" name="item_desc[]" value="' + shop_articles[i].article_des +  '">';
	rowContent += '<input class="check-out-run" type="hidden" name="item_qty[]" value="' + shop_articles[i].article_run +  '">';
	rowContent += '<input class="check-out-price" type="hidden" name="item_price[]" value="' + shop_articles[i].article_price +  '">';
	rowContent += '<input class="check-out-price" type="hidden" name="item_unit_price[]" value="' + shop_articles[i].article_price +  '">';
	rowContent += '</div></div></div>';
	
	//append to table
    jQuery('.cartTable').append(rowContent);
}

//call functions get production time, payment method, shipping method
if(shop_articles.length > 0){
	//cal sum cost
	finalSumCost();

	//get countries
	//countriesGet();
	
	//call payment methods get	
	productionTimeGet();
	shippingMethodGet();
	paymentMethodGet();
	
	//check cropping
	//croppingPopupCheck();
}


<?php
	if(isset($_SESSION['anonymous'])){
		?>
			dgoAddressSession = <?php echo json_encode($_SESSION['anonymous']) ?>;			
		<?php
	}
?>