//Script for order confirmation
<?php
	$order_confirmation = $_SESSION['order_component'];
	$InternalOrderNumber = $order_confirmation->{'InternalOrderNumber'};
	$OrderDate = $order_confirmation->{'OrderDate'};
	$Address = $order_confirmation->{'Customer'}->{'Address'};
	$Payment =$order_confirmation->{'Article'}[0]->{'Payment'}->{'Type'};
	$Shipment = $order_confirmation->{'Shipment'}->{'ShipmentProvider'}.' '.$order_confirmation->{'Shipment'}->{'ShipmentTariff'};
	$articles = $order_confirmation->{'Article'};

	?>
		// Order date
		var order_date = '<?php echo $OrderDate; ?>';
		order_date = order_date.ParseRfcDate();
		order_date = order_date.format('dd.mm.yyyy - HH:MM:ss');
		
		// Order Sum
		var order_sum = 0;
		
		// Order Shipping
		var order_confirm_shipping = '<div class="order-shipping-title"><span>Shipping Address:</span></div><div class="order-shipping-detail"><div><?php echo $Address->{'Street'}; ?></div>';
		order_confirm_shipping += '<div><?php echo $Address->{'Forename'}; ?> <?php echo $Address->{'Surname'}; ?></div>';
		order_confirm_shipping += '<div><?php echo $Address->{'City'}; ?></div>';
		order_confirm_shipping += '<div><?php echo $Address->{'Country'}; ?></div></div>';
		
		// Order Payment
		var order_confirm_payment = '<div class="order-payment-detail"><div class="order-payment-title"><span>Payment:</span></div><div class="order-payment-icon"></div><div class="order-payment-method"><span><?php echo $Payment; ?></div></div>';
		order_confirm_payment += '<div class="order-payment-detail"><div class="order-payment-title"><span>Shipment:</span></div><div class="order-shipment-icon"></div><div class="order-shipment-method"><span><?php echo $Shipment; ?></span></div></div>';
		
		// Order Element Title 		
		var order_confirm_title = '<div class="order-element-title">';
		order_confirm_title += '<div class="order-position"><span>Position</span></div>';
		order_confirm_title += '<div class="order-description"><span>Detail & Description</span></div>';
		order_confirm_title += '<div class="order-amount"><span>Amount</span></div>';
		order_confirm_title += '<div class="order-price"><span>Price</span></div>';
		order_confirm_title += '<div class="order-action"><span>Action</span></div></div>';
		
		// Order Element Content
		var order_confirm_element = '';		
		<?php 
			for($i = 0; $i < count($articles); $i++){
				?>					
					// Order Content Element Content
					var order_confirm = '';
					order_confirm += '<div class="order-element-content">';	
					order_confirm += '<div class="order-position-content"><div class="order-position-image"><img height="50" src="" alt=""/></div></div>';			
					order_confirm += '<div class="order-description-content"><div><?php echo $articles[$i]->{'Description'}.'<br/>' ?>Production: <?php echo $articles[$i]->{'PriceType'}; ?></div></div>';			
					order_confirm += '<div class="order-amount-content"><?php echo $articles[$i]->{'Amount'}.' x '.$articles[$i]->{'Run'}; ?></div>';
						
					// Price Element
					var price_currency = '<?php echo $articles[$i]->{'Prices'}->{'Items'}[0]->{'Sale'}->{'Currency'} ;?>';	
					var price_element = formatCurrency('<?php echo $articles[$i]->{'Prices'}->{'Items'}[0]->{'Sale'}->{'Net'} ;?>', price_currency) + ' ' + price_currency;
					order_sum += parseFloat('<?php echo $articles[$i]->{'Prices'}->{'Items'}[0]->{'Sale'}->{'Net'} ;?>');
							
					order_confirm += '<div class="order-price-content">' + price_element + '</div>';			
					order_confirm += '<div class="order-action-content"><div class="order-action-button is-bottons"><span>Show</span></div></div></div>';			
								
				
					order_confirm_element += '<div class="order-number"><span><?php echo $InternalOrderNumber.' - '.$i; ?></span></div>';
					order_confirm_element += order_confirm_title + order_confirm;
				<?php
			}
			
			?>
			//add shipment fee to sum price
			order_sum += parseFloat('<?php echo $articles[0]->{'Prices'}->{'Items'}[1]->{'Sale'}->{'Net'} ;?>');
			<?php
		?>
		
		// Order Content
		var order_confirm_content = '<div class="order-confirm-title"><div class="order-confirm-tks"><span>Thanks for Your Order!</span></div><div class="order-logo-print"></div></div>';
		order_confirm_content += '<div class="order-confirm-content">';
		order_confirm_content += '<div class="confirm-content-title"><span>Order Confirmation</span><span><?php echo $InternalOrderNumber; ?></span><span>' + order_date + '</span><span>Article: <?php echo count($articles); ?></span><span>Sum: ' + formatCurrency(order_sum, price_currency) + ' ' + price_currency + '</span></div>';
		order_confirm_content += '<div class="confirm-order-detail"><div class="confirm-order-shipping">' + order_confirm_shipping + '</div><div class="confirm-order-payment">' + order_confirm_payment + '</div></div>';
		order_confirm_content += '<div class="confirm-order-elements">';
		order_confirm_content += order_confirm_element + '</div></div>';
		order_confirm_content += '<div class="confirm-order-footer"><div class="order-logo-print"></div></div>';
		jQuery('.order-confirm-container').append(order_confirm_content);
	<?php
?> 
