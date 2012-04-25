<meta name="DC.Title" content="{blogName} - {metaTag}" />
<script type="text/javascript">
	var orderConfirmArr = {orderConfirmArr};	
	var orderConfirmArrFromApi = {orderConfirmArrFromApi};	
</script>
<div class="order-confirm-title">
	<div class="order-confirm-tks"><span>{transThanksForYourOrder}</span></div>
	<div class="order-logo-print" onclick="printPage('{tagName}','{isId}','{windowName}','{url}','{windowWidth}','{windowHeight}','{arrayCss}')"></div>
</div>
<div class="order-container">
	<div class="cia-payment">
		<div class="cia-payment-img"></div>
		<div class="cia-payment-content">
			<ul>
				<li><b>{transPleasetransferthepayment}:</b></li>	
				<li>{transBanknameBankforForeignTradeofVietnam}</li>	
				<li>{transCompanynameHoangProductCompanyLimited}</li>	
				<li>{transAccountnumber}: 0071000600982 - Vietcombank PGD Hàm Nghi</li>	
				<li>Swift code: BFTVVNVX</li>	
			</ul>
		</div>
		<div class='cia-payment-divide'></div>
		<div class="cia-payment-img-acb"></div>
		<div class="cia-payment-content">
			<ul>
				<li>{transBanknameBankforACB}</li>	
				<li>{transCompanynameHoangProductCompanyLimited}</li>	
				<li>{transAccountnumber}: 110059929 - ACB Hội Sở</li>	
				<li>Swift code: ASCBVNVX</li>	
			</ul>
		</div>
	</div>
	<div class="order-confirm-content">
		<div class="confirm-content-title">
			<span style="margin-left: 10px">{transOrderConfirmation}</span>
			<span>{internalOrderNumber}</span>
			<span>{transOrderDate}: {orderDate}</span><input type="hidden" value="{orderDate}" />
			<span>{Article}: {numberArticles}</span>
			<span>{Sum}: {sumPrice}</span>
		</div>
		<div class="confirm-order-detail">
			<div class="confirm-order-shipping">
				<div class="order-shipping-title"><span>{transShippingAddress}:</span></div>
				<div class="order-shipping-detail">
					<div>{orderUserName}</div>
					<div>{orderStreet}</div>
					<div>{orderCity}</div>
					<div>{orderCountry}</div>
				</div>
			</div>
			<div class="confirm-order-payment">
				<div class="order-payment-detail">
					<div class="order-payment-title"><span>{transPayment}: </span></div>
					<div class="order-payment-icon {paymentClass}"></div>
					<div class="order-payment-method"><span>{orderPayment}</div>
				</div>
				<div class="order-payment-detail">
					<div class="order-payment-title"><span>{transShipment}: </span></div>
					<div class="order-shipment-icon {shipmentClass}"></div>
					<div class="order-shipment-method"><span>{orderShipment}</span></div>
				</div>
			</div>
		</div>
		<div class="confirm-order-elements">
			{orderConfirmElements}
		</div>
		<div class="confirm-order-elements">
			<div class="order-show-all-price-wapper">		
				<div class="order-show-all-price">
					<div class="order-show-all-price-contain">
						<div class="order-show-all-price-label">{transPayment}: {orderPayment}</div>
						<div class="order-show-all-price-value">{paymentCost}</div>
					</div>
					<div class="order-show-all-price-contain">
						<div class="order-show-all-price-label">{transShipment}: {orderShipment}</div>
						<div class="order-show-all-price-value">{shippingCost}</div>
					</div>			
					<div class="order-show-all-price-contain">
						<div class="order-show-all-price-label">{VAT}</div>
						<div class="order-show-all-price-value">{vatCost}</div>
					</div>
					<div class="order-show-all-price-contain">
						<div class="order-show-all-price-label">{Sum}</div>
						<div class="order-show-all-price-value">{sumPrice}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="confirm-order-footer">
	<div class="order-footer-left">
		<p>{transPlsClickButtonBelowToCompleteYourOrder}</p>
		<div class="payment-access">{transPaymentMethod}</div>				
	</div>
	<div class="order-logo-print" onclick="printPage('{tagName}','{isId}','{windowName}','{url}','{windowWidth}','{windowHeight}','{arrayCss}')"></div>
</div>

<div class="best-product" style="display:none">
	<div class="best-product-title">
		Related Product
	</div>
	<div class="best-product-container-nonslide">
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductCup}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProductCup}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Mugs</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductShirt}</div>
			<div class="best-product-shadow-over"></div>
		
			<div class="best-product-img">{bestProductShirt}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Custom T-shirts</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductMousepad}</div>
			<div class="best-product-shadow-over"></div>
		
			<div class="best-product-img">{bestProductMousepad}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Mouse pads</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductapron}</div>
			<div class="best-product-shadow-over"></div>
		
			<div class="best-product-img">{bestProductapron}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Aprons</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductsandal}</div>
			<div class="best-product-shadow-over"></div>
		
			<div class="best-product-img">{bestProductsandal}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Sandals</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProducttie}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProducttie}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Ties</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductbag}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProductbag}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Bags</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductcard}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProductcard}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Custom Cards</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProducthat}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProducthat}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Hats</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductKeychains}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProductKeychains}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Keychains</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductShirtGirl}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProductShirtGirl}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Custom T-shirts</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductdisk}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProductdisk}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Disks</div>
		</div>
	</div>
</div>

<div class="best-product" style="display:none">
	<div class="best-product-title">
		Best Seller
	</div>
	<div class="best-product-container">
		<div class="best-product-container-best-seller">
			<div class="best-product-element-best-seller">
				<div class="best-product-img-over">{bestProductCup10}</div>
				<div class="best-product-shadow-over"></div>
			
				<div class="best-product-img">{bestProductCup10}</div>
				<div class="best-product-shadow"></div>
				<div class="best-product-name">Mugs</div>
			</div>
			<div class="best-product-element-best-seller">
				<div class="best-product-img-over">{bestProductCup11}</div>
				<div class="best-product-shadow-over"></div>
			
				<div class="best-product-img">{bestProductCup11}</div>
				<div class="best-product-shadow"></div>
				<div class="best-product-name">Mugs</div>
			</div>
			<div class="best-product-element-best-seller">
				<div class="best-product-img-over">{bestProductCup14}</div>
				<div class="best-product-shadow-over"></div>
			
				<div class="best-product-img">{bestProductCup14}</div>
				<div class="best-product-shadow"></div>
				<div class="best-product-name">Mugs</div>
			</div>
			<div class="best-product-element-best-seller">
				<div class="best-product-img-over">{bestProductShirt29}</div>
				<div class="best-product-shadow-over"></div>
				
				<div class="best-product-img">{bestProductShirt29}</div>
				<div class="best-product-shadow"></div>
				<div class="best-product-name">Custom T-shirts</div>
			</div>
			<div class="best-product-element-best-seller">
				<div class="best-product-img-over">{bestProductShirt21}</div>
				<div class="best-product-shadow-over"></div>
				
				<div class="best-product-img">{bestProductShirt21}</div>
				<div class="best-product-shadow"></div>
				<div class="best-product-name">Custom T-shirts</div>
			</div>
			<div class="best-product-element-best-seller">
				<div class="best-product-img-over">{bestProductMousepad15}</div>
				<div class="best-product-shadow-over"></div>
				
				<div class="best-product-img">{bestProductMousepad15}</div>
				<div class="best-product-shadow"></div>
				<div class="best-product-name">Mouse pads</div>
			</div>
			<div class="best-product-element-best-seller">
				<div class="best-product-img-over">{bestProductMousepad16}</div>
				<div class="best-product-shadow-over"></div>
				
				<div class="best-product-img">{bestProductMousepad16}</div>
				<div class="best-product-shadow"></div>
				<div class="best-product-name">Mouse pads</div>
			</div>
			<div class="best-product-element-best-seller">
				<div class="best-product-img-over">{bestProductsandal35}</div>
				<div class="best-product-shadow-over"></div>
				
				<div class="best-product-img">{bestProductsandal35}</div>
				<div class="best-product-shadow"></div>
				<div class="best-product-name">Sandals</div>
			</div>
			<div class="best-product-element-best-seller">
				<div class="best-product-img-over">{bestProductdisk}</div>
				<div class="best-product-shadow-over"></div>
				
				<div class="best-product-img">{bestProductdisk}</div>
				<div class="best-product-shadow"></div>
				<div class="best-product-name">Disks</div>
			</div>
		</div>
	</div>
	<div id="slider-wrap">
	</div>
</div>

<div class="best-product" style="display:none">
	<div class="best-product-title">
		New Product
	</div>
	<div class="best-product-container-nonslide">
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductMousepad18}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProductMousepad18}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Mouse pads</div>
		</div>
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductapron}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProductapron}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Aprons</div>
		</div>		
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductShirt22}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProductShirt22}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Custom T-shirts</div>
		</div>	
		<div class="best-product-element">
			<div class="best-product-img-over-nonslide">{bestProductShirt28}</div>
			<div class="best-product-shadow-over"></div>
			
			<div class="best-product-img">{bestProductShirt28}</div>
			<div class="best-product-shadow"></div>
			<div class="best-product-name">Custom T-shirts</div>
		</div>	
	</div>
</div>
<script type="text/javascript">
	var wpPortal = '{portalInfo}';

	if(wpPortal == "nhain")
		jQuery('.cia-payment').show();
	
</script>