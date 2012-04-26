<meta name="DC.Title" content="{blogName} - {metaTag}" />
<div class='all-order-container'>
	<input class='dgo-page-name' type='hidden' value='allOrders' />
	<input type='hidden' id='trans-show-all-order' value='{transShowAllDetails}'  />
	<input type='hidden' id='trans-all-order' value='{transAllOrders}'  />
	<input type='hidden' id='trans-entries-per-page' value='{transEntriesPerPage}'  />
	<input type='hidden' id='trans-article' value='{transArticle}'  />
	<input type='hidden' id='trans-sum' value='{transSum}'  />
	<input type='hidden' id='trans-shippment-address' value='{transShippingAddress}'  />
	<input type='hidden' id='trans-payment' value='{transPayment}'  />
	<input type='hidden' id='trans-shipment' value='{transShipment}'  />
	<input type='hidden' id='trans-production' value='{transProduction}'  />
	<input type='hidden' id='trans-show-button' value='{transShow}'  />
	<input type='hidden' id='trans-pos' value='{transPos}'  />
	<input type='hidden' id='trans-details-description' value='{transDetailsandDescription}'  />
	<input type='hidden' id='trans-amount' value='{transAmount}'  />
	<input type='hidden' id='trans-price' value='{transPrice}'  />
	<input type='hidden' id='trans-action' value='{transAction}'  />
	<input type='hidden' id='trans-status' value='{transStatus}'  />
</div>
<script type="text/javascript">
	dgoCurrentPage 	= 'allOrders';
	dgoGuid 		= '{guid}';
	
	if(dgoGuid != null && dgoGuid != ""){
		allOrder_getListFromPhp({allorders});
	}	
</script>