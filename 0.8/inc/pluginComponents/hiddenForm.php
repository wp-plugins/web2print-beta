<div class="editImageDialog">
</div><!-- End edit picture -->
<!-- End upload form -->

<!-- Order form submit -->
<form id="orderSubmitForm" method="post" action="<?php echo linkToPlugin; ?>inc/ajax/redirectOrder.php">
	<input class="order-component-input" type="hidden" value="" name="order_components"/>			
	<input class="" type="hidden" value="<?php $orderPageID = get_option('confirmPageID'); $order_permalink = get_permalink($orderPageID); echo $order_permalink; ?>" name="order_permalink" />
</form>

<!-- Submit form -->
<form id="multiSelectSubmitForm" method="post" action="<?php echo linkToPlugin; ?>inc/ajax/redirectShop.php">
	<input id="prices-import" type="hidden" value="" name="prices_import">
    <input class="shopcart-link-hidden" type="hidden" value="<?php $pageID = get_option('shoppingPageID'); $permalink = get_permalink($pageID); echo $permalink; ?>" name="shopcart_permalink" />                     
 </form><!-- End submit form -->
 
<!-- Translate hidden -->
<div id="translate_hidden">
	<input id="address_missing_inform" type="hidden" value="<?php _e('AddressMissingInform', $l10n_prefix); ?>"/>
	<input id="shipping_missing_inform" type="hidden" value="<?php _e('ShippingMissingInform', $l10n_prefix); ?>"/>
	<input id="payment_missing_inform" type="hidden" value="<?php _e('PaymentMissingInform', $l10n_prefix); ?>"/>
	<input id="right_missing_inform" type="hidden" value="<?php _e('RightMissingInform', $l10n_prefix); ?>"/>
	<input id="rediect-to-shopcart" type="hidden" value="<?php _e('Youwillberedirectedtotheshoppingcartnow', $l10n_prefix); ?>"/>
	<input id="rediect-to-order-confirm" type="hidden" value="<?php _e('Youwillberedirectedtotheorderconfirmationnow', $l10n_prefix); ?>"/>
	<input id="trans-loading" type="hidden" value="<?php _e('Loading', $l10n_prefix); ?>"/>
	<input id="keyword_products" type="hidden" value="<?php _e('Keyword_products', $l10n_prefix); ?>"/>
	<input id="trans-notice-payment" type="hidden" value="<?php _e('NoticePayment', $l10n_prefix); ?>"/>
</div>
