	<meta http-equiv="Content-Style-Type" content="text/css"> 
	<meta name="DC.Title" content="{blogName} - {metaTag}" />
	<div class='shopping-cart-container'>
		<div class='headerShoppingDiv'>
			<div class='changingShoppingDiv'></div>
			<div class='upShoppingDiv'>
				<div class='order order-confirm-button is-bottons'><span>{transOrder}</span></div>
				<div class='order-confirm-block'></div>
			</div>
		</div>
		<form action="http://payment.api.delivergo.com/payment.php" method="post" id="frmVTPayment" name="frmVTPayment">
			<input type="hidden" name="hidSubmitPayment" id="hidSubmitPayment" value="1">
			<input type="hidden" name="hidPaymentType" id="hidPaymentType" value="1">
			<input class="IsDebug" type="hidden" name="IsDebug" value="false">
			<input class="PortalId" type="hidden" name="PortalId" value="">
			<input class="UserLanguage" type="hidden" name="UserLanguage" value="{userLanguage}">
			<input class="ReturnUri" type="hidden" name="ReturnUri" value="{returnURi}">
			<input class="check-out-tax" type="hidden" name="tax" value="0">
			<input class="check-out-ship" type="hidden" name="shipping" value="0">
			<input class="check-out-handling" type="hidden" name="handling" value="0">
			<input class="check-out-ship-discount" type="hidden" name="ship_disc" value="0">
			<input class="check-out-insurance" type="hidden" name="insurance" value="0">
			<div class='cartTable'>
				<div class='cartArticleTitle'>
					<div>{transPos}</div>
					<div>{transArticleAndDescription}</div>
					<div>{transAmount}</div>
					<div>{transAction}</div>
					<div>{transPrice}</div>
				</div>
				{articleArticles}
				<div class="shopcart-empty-test" style="display:none">
					<!--<div class="cart-empty-icon"></div> -->
					<span>{transCartEmptyText}</span>
				</div>
			</div>
		</form>
		<div class='paymentDiv'>
			<div class='option-element-container'>
				<div class='option-element-title'><span>{transSelectShippingAddress}</span></div>
				<div class='payment-div payment-address'><div><span>{transYourAddress}</span></div><div></div></div>
				<div class='option-element-result'></div>
			</div>
			<input type='hidden' value='{transYourAddress}' name='default-text' id='transYourAddress-default-text'>
			<input type='hidden' value='{transFree}' name='default-text' id='transFree-default-text'>
			<input type='hidden' value='{transCropMessage}' name='default-text' id='transCropMessage-text'>
			<div class='option-element-container'>
				<div class='option-element-title'><span>{transSelectShippingMethod}</span></div>
				<div class='payment-div payment-ship'><div><span>{transStandardShipping}</span><input class='shipping-select' type='hidden' value='' /></div><div></div></div>
				<div class='option-element-result'><span id='shipping-price'></span><input class='cal-shipping-input' type='hidden' value='' /></div>
			</div>
			<div class='option-element-container'>
				<div class='option-element-title'><span>{transSelectPaymentMethod}</span></div>
				<div class='payment-div payment-payment'><div><span class="payment-div-payment-method">{transPaymentMethod}</span><input class='payment-select' type='hidden' value='' /></div><div></div></div>
				<div class='option-element-result'><span id='payment-price'></span><input class='cal-payment-input' type='hidden' value='' /></div>
			</div>
		</div>
		<div class='sumDiv'>
			<input class='cal-payment-cost' type='hidden' value='' />
			<div class='customerDiv'><span><input name='termin' type='checkbox'/></span><span><a href="http://www.druckerei.de/de_DE_Service_AGB.druckerei" target="_blank">{transTermsAndConditionCaption}</a></span></div>
			<div class='cal-sum-cost cal-cost'>
				<div class='cal-sum-name' title='{transInclude}'><span>{transInclude}</span></div>
				<div class='cal-sum-value'>{imgLoadingSmall}</div><input type='hidden' value='' />
			</div>
		</div>
		<div class='footerShoppingDiv'>
			<div class='continueShoppingDiv'><span></span></div>
			<div class='couponShoppingDiv'><span></span></div>
			<div class='upShoppingDiv'><span class='payExpress'></span>
				<div class='order order-confirm-button is-bottons'><span>{transOrder}</span></div>
				<div class='order-confirm-block'></div>
				<!-- div class="payment-access-amazon"></div-->
				<!-- div class="payment-access-paypal"></div-->			
			</div>
			<input class="dgo-page-name" type="hidden" value="shoppingCart">
		</div>	
	</div>	
<!-- Add new address form -->
	<div style='width:1px;height:1px;overflow:hidden;'>
		<div class="addnewaddressForm">
			<form id="formIDAddress" method="post" action="">
				<div class="add-new-address-content">
					<div class="address-info-row add-info-name">
						<div class="address-label"><span><b>{transName}:</b></span></div>
						<div class="address-input address-name-last">
							<div><input type="text" name="lastname" id="surname" /><div class="address-check"></div></div>							
						</div>	
						<div style="display:none">
							<input type="text" name="name" id="testname" /><div class="address-check"></div>
						</div>
						<div class="address-input address-name-first">
							<div>
								<input type="text" name="firstname" id="forename" /><div class="address-check"></div>
							</div>
						</div>
						<div style="display:none">
							<input type="text" name="name" id="testname" /><div class="address-check"></div>
						</div>						
						<div class="address-name-content">
							<div class="gender-div">
								<select class="GenderSel" id="sexual">
									<option class='sexual' name='male' value='Male' selected='selected'>{transMr}</option>
									<option class='sexual' name="female" value='Female'>{transMrs}</option>
									<option class='sexual' name='neutral' value='Neutral'>{transNeutral}</option>
								</select>
							</div>
						</div>
					</div>				
					<div class="address-info-row add-info-company"><div class="address-label"><span>{transCompany}:</span></div><div class="address-input "><div><input type="text" value="" name="company" id="company"/></div></div></div>
					<div class="address-info-row add-info-street"><div class="address-label"><span><b>{transStreet}:</b></span></div><div class="address-input address-name-street "><div><input type="text" value="" name="street" id="street"/><div class="address-check"></div></div></div></div>				
					<div class="address-info-row add-info-city"><div class="address-label"><span><b>{transCity}:</b></span></div><div class="address-input address-name-city "><div><input type="text" value="" name="city" id="city"/><div class="address-check"></div></div></div></div>				
					<div class="address-info-row add-info-zip"><div class="address-label"><span><b>{transZip}:</b></span></div><div class="address-input address-name-zip "><div><input type="text" value="" name="zipcode" id="zipcode"/><div class="address-check"></div></div></div></div>
					<div class="address-info-row add-info-country"><div class="address-label"><span><b>{transCountry}:</b></span></div><div class="address-input "><div><div class="add-info-country country-dropdown-dialog"></div><div class="add-info-country-dropdown" style="display:none"><input type="hidden" class="add-info-country-dropdown-selected" value=""></div></div></div></div>
					<div class="address-info-row add-info-phone"><div class="address-label"><span>{transPhone}:</span></div><div class="address-input address-name-phone "><div><input type="text" value="" name="phone" id="phone"/><div class="address-check"></div></div></div></div>				
					<div class="address-info-row add-info-email"><div class="address-label"><span><b>{transEmail}:</b></span></div><div class="address-input address-name-email "><div><input type="text" name="email" value="" id="email"/><div class="address-check" id='email-exist-status'></div></div></div></div>
					<div class="address-info-row add-info-email-message" style="display:none"><div class="address-label"><span>&nbsp;</span></div><div class="address-email-content-message"></div></div>
					<div class="address-info-row add-info-show-password" style="display:none"><div class="address-label"><a href='javascript:void(0)' onclick='showPasswordField()'>{transPasswordSettings}</a></div><div class="address-input-password"></div></div>
					<div class="address-info-row add-info-password" style="display:none"><div class="address-label"><span>{transPassword}:</span></div><div class="address-input address-name-password "><div><input type="password" name="password" value="" id="password"/><div class="address-check"></div></div></div></div>
					<div class="address-info-row add-info-password-message" style="display:none"><div class="address-label"><span>&nbsp;</span></div><div class="address-password-content-message"></div></div>			
					<div class="address-info-row add-info-offers"><input type="checkbox" value=""/> <span>{transSendMeOffer}</span></div>
					<div class="address-info-row add-info-note">
						<div class="address-label">
							<span>{transNote}</span>
						</div>
						<div class="textarea-div address-name-note">
							<TEXTAREA NAME="addInfoNote" id="addressNote" NAME="note" ></TEXTAREA>
						</div>
					</div></br>
					<div class="address-info-row add-info-note-message" style="display:none"><div class="address-label"><span>&nbsp;</span></div><div class="address-note-content-message"></div></div>
					<div class="addressFooter is-bottons" id="BtnDone"><span>{transSave}</span></div>
				</div>
			</form>
			<input class="translate-title" type="hidden" value="{transAddress}"/>
		</div>
	</div>
	
	<div class="dgo-dialog-form-cover">	
		<!-- Payment form -->
		<div class="paymentForm">
			<input class="translate-title" type="hidden" value="{transPaymentMethod}"/>
			<div class="payment-form-container">
				<div class="payment-form-content"></div>
				<div class="payment-form-footer">
					<div class="left-payment-footer"><span>{transAlreadyAnAccountCaption}<a href="javascript:void(0)" onclick="openLoginFormDialog()"><b>{transLoginHere}</b></a></span></div>
					<!--div class="right-payment-footer is-bottons"><span>Next</span></div-->
				</div>
			</div>
		</div><!-- End payment form -->
		
		<!-- Shipping form -->
		<div class="shippingForm">
			<input class="translate-title" type="hidden" value="{transShippingType}"/>
			<div class="ship-form-container">
				<div class="ship-form-content"></div>
				<div class="ship-form-country">
					<div class="left-ship-country"><span>{transShowMePriceFor}</span></div><div class="right-ship-country"><select></select></div>
				</div>
				<div class="ship-form-footer">
					<div class="left-ship-state"><span>{transState}</span></div><div class="right-ship-state"><select></select></div>
					<!--div class="is-bottons"><span>Next</span></div-->
				</div>
			</div>                
		</div><!-- End shipping form -->
		
		<!-- Address form -->
		<div class="addressForm">
			<input id='trans-add-new-add' type='hidden' value="{transNewAddressCaption}"/>
			<input id='trans-add-new-text-or' type='hidden' value="{transOrChoose}"/>
			<input id='trans-add-new-login-here' type='hidden' value="{transLoginReturningCus}"/>
			<input class="translate-title" type="hidden" value="{transSelectShippingAddress}"/>
			<input class="translate-ship-title" type="hidden" value="{transSelectThisAddress}"/>
			<div class="address-form-content">
				<div class="dgo-text">
					<span></span>
				</div>
				<div class="import-contact-search">
					<span>
						<input type="text" id="shopping-contacting-txt" />
						<input type="submit" id="shopping-contacting-search" value="{transSearch}" />
					</span>
				</div>
				<div class="addressContainer">                    
					<div class='shopping-contact'>
						<div class='shopping-contact-add is-bottons'>{transNewAddressCaption}</div>
						<div class='shopping-contact-text-or'>{transOrChoose}</div>
						<div class='shopping-contact-login-here is-bottons' onclick="openLoginFormDialog()">{transLoginReturningCus}</div>		            
					</div>
					<!-- add address here-->
				</div>
			</div>             
		</div>
		<!-- End address form -->
	</div>
<script type="text/javascript">
	{scriptPlaceHolder}
</script>
<!-- Dgo crop template -->
{dgocroptpl}
<script type="text/javascript">
	var checkcart= jQuery('.product-time-select').val();
	if(checkcart!=undefined){
		jQuery('.shopcart-empty-test').hide();
	}else{
		jQuery('.shopcart-empty-test').show();
	}
</script>