<?php 
	?>
		<html>
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
				<title>Redirect to plugin shopcart</title>
				<script src="http://api.delivergo.com/lib/jquery/jquery-1.5.1.js" type="text/javascript"></script>
				<script src="http://api.delivergo.com/lib.dev/js/json2.js" type="text/javascript"></script>
				<script src="http://api.delivergo.com/lib.dev/js/delivergo.api.js" type="text/javascript"></script>
				<script src="../../js/lib/dateFormat.js" type="text/javascript"></script>
				
				<script type="text/javascript">
					function GetOrderByGuid( guid ){
						var globalPortal = 'nhain';
						var globalIsDev = true;
						var guidUser = '56ee2956-d374-4f70-b1d4-b1fa8774a53d';
						var globalPortalUri = null;
					
						var api = new delivergo.api();
						
						if(globalPortalUri != null)
							api.PortalUriBase = globalPortalUri;
						
						//change portal for nhain.vn
						api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
							
						//change url to ajaxproxy file
						api.AjaxProxy = '../ajaxproxy.php?u=';
						
						//set apikey
    					api.ApiKey = guidUser;

						api.LoadRequest( guid , function(result) {
							var android_order = result.Value.Order.Article[0];
							var android_item = android_order.Prices.Items;							
							
							for(var i = 0; i < android_item.length; i++){
								if(android_item[i].Type == 'BasePrice|Standard'){
									var price_time = android_item[i].MaxDate.ParseRfcDate();
					            	price_time = price_time.format("dd.mm.yyyy");
									android_order.PriceTime = price_time;
								}
							}
							
							//product price
							var product_price = 0;
							var product_price_vat = 0;
							for(var j = 0; j < android_item.length; j++){						
								var type_split = android_item[j].Type.split("|");
								
								if(type_split[0] != 'Shipment'){
									product_price += android_item[j].SaleNet;
									product_price_vat += android_item[j].VatPercentage;
								}	
							}	
							
							android_order.ArticleID = 'article_id';
							android_order.Product = android_order.Matchcode;
							//android_order.Description = android_order.Description.substring(0, android_order.Description.length - 4);
							android_order.ProductPrice = product_price;
            				android_order.ProductPriceVAT = product_price_vat;						
							
							//save this article to hidden input
							jQuery('#prices-import').val(JSON2.stringify(android_order));							
							
							//submit form
	 						jQuery('#multiSelectSubmitForm').submit();
						});
					}
					//guidAffiliate=e8ef43ab-2f58-4419-bc01-acf6c9738486&passAffiliate=123456&resaleID=de8e98d6-0c29-47be-a5f0-f7df821103d5
					GetOrderByGuid('<?php echo $_GET['guid']; ?>');
				</script>
			</head>
			<body>		
				<form id="multiSelectSubmitForm" method="post" action="redirectShop.php">
					<input id="prices-import" type="hidden" value="" name="prices_import">
					<input id="guid-user" type="hidden" value="<?php echo $_GET['guidUser']; ?>" name="guid_user">
					<input id="guid-affiliate" type="hidden" value="<?php echo $_GET['guidAffiliate'];?>" name="guid_affiliate">
					<input id="pass-affiliate" type="hidden" value="<?php echo $_GET['passAffiliate'];?>" name="pass_affiliate">
					<input id="resaleID" type="hidden" value="<?php echo $_GET['resaleID'];?>" name="resaleID">
				    <input class="shopcart-link-hidden" type="hidden" value="http://www.nhain.vn/shopping-cart" name="shopcart_permalink">                   
				    <!--input class="shopcart-link-hidden" type="hidden" value="http://localhost/wordpress/shopping-cart/" name="shopcart_permalink"-->                    
				 </form>	
			</body>
		</html>
	<?php
?>
