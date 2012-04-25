<meta name="DC.Title" content="{blogName} - {metaTag}" />
<div class='account-details-container'>
	<input class='dgo-page-name' type='hidden' value='earnMoney' />
	<input id='transEdit' type='hidden' value='{transEdit}' />
	<input type="hidden" id='trans-account-details' value='{transAccountDetails}'>
	<input type="hidden" id='trans-status' value='{transStatus}'>
	<input type="hidden" id='trans-main-address' value='{transMainAddress}'>
	<input type="hidden" id='trans-contact' value='{transContact}'>
	<input type="hidden" id='trans-click-here-to-add-text' value='{transClickHereToAddText}'>
	<input type="hidden" id='trans-create-a-new-shop' value='{transCreateNewShop}'>
	<input type="hidden" id='trans-no-sales-yet' value='{transNoSalesYet}'>
	<input type="hidden" id='trans-no-sales-yet' value='{transNoSalesYet}'>
	<div class='account-details-main-address'>
		<div class='account-details-main-address-head'></div>
		<div class='account-details-main-address-head-content'>
			<div class='address-loading-image'>
				{loadingicon}
			</div>
		</div>
		<div class='account-details-below '>
			<div id='account-details-tabs'>
				<ul class='ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'>
					<li class='ui-state-default ui-corner-top ui-tabs-selected ui-state-active'><a href='#earn-money-tabs-1'>{transAffiliateID}</a></li>
					<!-- li class='ui-state-default ui-corner-top'><a href='#earn-money-tabs-2'>{transReferralLink}</a></li-->
					<li class='ui-state-default ui-corner-top'><a href='#earn-money-tabs-3' onclick='showChart();'>{transStatistic}</a></li>
					<!-- li class='ui-state-default ui-corner-top'><a href='#earn-money-tabs-4'>{transPayment}</a></li-->
				</ul>
				<div class='ui-tabs-panel ui-widget-content ui-corner-bottom' id='earn-money-tabs-1'>
					<div class='earn-money-tabs-1-header' id='earn-money-tabs-1-id'>
						<div class='earn-money-tabs-1-header-affiliateId'><div class='affiliate-id-label'>{transYourAffiliateID}:</div> <div id='affiliate-id'>{Guid}</div></div>
						<div class='is-bottons' id='earn-money-tabs-1-header-copy-button'>{transCopy}</div>
						<script type="text/javascript">
							jQuery(function(){
								jQuery('#earn-money-tabs-1-header-copy-button').zclip({
									path: web_2_print_blogInfo + 'js/ZeroClipboard.swf',
									copy: function(){return jQuery(this).prev().children('#affiliate-id').html();}
								});
								
								jQuery('#zclip-ZeroClipboardMovie_1').css('left', jQuery('#earn-money-tabs-1-header-copy-button').offset().left);
								jQuery('#zclip-ZeroClipboardMovie_1').css('right', jQuery('#earn-money-tabs-1-header-copy-button').offset().right);
							});
						</script>
					</div>
					<div class='earn-money-tabs-1-label'>
						<div class='earn-money-tabs-1-label-icon'>&nbsp;</div>
						<div class='earn-money-tabs-1-label-shopname'><b>{transShopName}</b></div>
						<div class='earn-money-tabs-1-label-description'><b>{transDescription}</b></div>
						<div class='earn-money-tabs-1-label-action'><b>{transAction}</b></div>
					</div>
					<div class='earn-money-tabs-1-all-shop'>{transLoading}...</div>
					<div class='earn-money-tab-1-new-shop'>
						<div class='earn-money-tab-1-new-shop-text'>{transWeLoveFeedback}</div>
						<div class='earn-money-tab-1-new-shop-button is-bottons' onclick=affiliate_create_new_shop_dialog()>{transNewShop}</div>
					</div>
					<!--div class='earn-money-tab-1-new-customer-affiliate is-bottons'>{transNewCustomerAffiliateID}</div-->
				</div>
				<!-- div class='ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide' id='earn-money-tabs-2'>
					<div class='earn-money-tabs-2-header'>{transTellYourFriends}</div>
					<div class='earn-money-tabs-2-referal-link'>
						<span>
							{transYourUniqueReferralLink}<br>{transUseTheLinkBelow}
						</span>
						<br><br>
						<span class='earn-money-tabs-2-referal-link-details'>https://ref.portal.com/plugin_ZZ2_HGDJBY23</span>
						<br><br>
						<span class='earn-money-tab-2-label'>{transYourLastReferral}</span>
						<span>2010.05.25 - Country 17,76 EUR <a href='#' class='earn-money-a'>{transMoreInfo}</a></span>
						<br>
						<span>{transBannersForYourWebsite}<br>{transByHostingOne}
					</div>
					<div class='earn-money-tabs-2-banner'>
						<div class='earn-money-tabs-2-banner-details'>
							<div class='earn-money-tabs-2-banner-img'>
								<img src='http://localhost/wordpress/wp-content/plugins/Web_2_Print_XML_V3/css/img/icon/banner_design.png'>
							</div>
							<div class='earn-money-tabs-2-banner-referral-link'>https://org.portal.com/987_referral_link</div>
							<div class='is-bottons earn-money-tabs-2-banner-button'>Copy</div>
						</div>
						<div class='earn-money-tabs-2-banner-details'>
							<div class='earn-money-tabs-2-banner-img'>
								<img src='http://localhost/wordpress/wp-content/plugins/Web_2_Print_XML_V3/css/img/icon/1305780332_radio.png' >
							</div>
							<div class='earn-money-tabs-2-banner-referral-link'>https://abc.portal.com/21323_referral_link</div>
							<div class='is-bottons earn-money-tabs-2-banner-button'>Copy</div>
						</div>
						<div class='earn-money-tabs-2-banner-details'>
							<div class='earn-money-tabs-2-banner-img'>
								<img src='http://localhost/wordpress/wp-content/plugins/Web_2_Print_XML_V3/css/img/icon/banner-temp.png' >
							</div>
							<div class='earn-money-tabs-2-banner-referral-link'>https://ref.portal.com/5465_referral_link_banner_template</div>
							<div class='is-bottons earn-money-tabs-2-banner-button'>Copy</div>
						</div>
					</div>
				</div -->
				<div class='ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide' id='earn-money-tabs-3'>
					<div class='earn-money-tab-3-header'>
						<div class='earn-money-tab-3-header-left' onclick="showLargeChart();">
							<div class='earn-money-tab-3-header-left-chart' id="earn-money-statistic-chart"></div>
							<div class="general-content-third-shadow"></div>
						</div>
						<div class='earn-money-tab-3-header-right'>
							<!--div class='earn-money-tab-3-header-right-info'>
								<div class='earn-money-tab-3-header-right-info-left'>{transSalesReferrals}:</div>
								<div class='earn-money-tab-3-header-right-info-right'>10</div>
								<div class='earn-money-tab-3-header-right-info-left'>{transTurnover}:</div>
								<div class='earn-money-tab-3-header-right-info-right'>270,000 EURO</div>
								<div class='earn-money-tab-3-header-right-info-left'>{transYourProfit}:</div>
								<div class='earn-money-tab-3-header-right-info-right'>34,00 EURO</div>
							</div-->
							<div class='earn-money-tab-3-header-right-calendar'>
								<span class="earn-money-calendar-area"></span>
								<!-- span><input class='earn-money-calendar' type='text' name='dateFrom' id='earn-money-date-from'></span>
								{transTo} <span><input class='earn-money-calendar' type='text' name='dateFrom' id='earn-money-date-to'></span>
								<br>{transOrChoose}-->
								<span class='earn-money-tab-3-select'>
									<select id='earn-money-tab-3-select-period'>
										<option value='last-7-days'>Last 7 days</option>
										<option value='this-month'>This month</option>
										<option value='last-month'>{transLastMonth}</option>
										<option value='last-year'>{transLastYear}</option>
										<option value='whole'>Whole</option>
										<option value='flexible'>Flexible dates</option>
									</select>
								</span> 
								<span class='is-bottons earn-money-refresh-button'>{transRefresh}</span>
							</div>
						</div>
					</div>
					<!-- div class='earn-money-tab-3-content'>
						<div class='earn-money-tab-3-content-header'>
							<div class='earn-money-tab-3-content-header-icon'><img src='http://localhost/wordpress/wp-content/plugins/Web_2_Print_XML_V3/css/img/icon/print.png' class='earn-money-zoom-icon'></div>
							<div class='earn-money-tab-3-content-header-select-currency'>
								<select id='earn-money-select-currency'>
									<option>EUR</option>
									<option>THB</option>
									<option>USD</option>
									<option>VND</option>
								</select>
							</div>
							<div class='earn-money-tab-3-content-header-select-shop'>
								<select id='earn-money-select-shop'>
									<option value="all">All shop</option>
								</select>
							</div>
						</div>
						<div class='earn-money-tab-3-content-details'>
							<div class="earn-money-tab-3-content-details-container">
							<div class='earn-money-tab-3-content-details-date earn-money-tab-3-title'><b>{transDate}</b></div>
							<div class='earn-money-tab-3-content-details-shop earn-money-tab-3-title'><b>{transShop}</b></div>
							<div class='earn-money-tab-3-content-details-order earn-money-tab-3-title'><b>{transOrder}</b></div>
							<div class='earn-money-tab-3-content-details-country earn-money-tab-3-title'><b>{transCountry}</b></div>
							<div class='earn-money-tab-3-content-details-item earn-money-tab-3-title'><b>{transItem}</b></div>
							<div class='earn-money-tab-3-content-details-price earn-money-tab-3-title'><b>{transProductPrice}</b></div>
							<div class='earn-money-tab-3-content-details-provision earn-money-tab-3-title'><b>{transProvision}</b></div>
							<div class='earn-money-tab-3-content-details-status earn-money-tab-3-title'><b>{transStatus}</b></div>
							</div>
							<div class="earn-money-tab-3-content-details-container">
							<div class='earn-money-tab-3-content-details-date'>12.05.2011</div>
							<div class='earn-money-tab-3-content-details-shop'>IKB1234</div>
							<div class='earn-money-tab-3-content-details-order'>ACTD-00066</div>
							<div class='earn-money-tab-3-content-details-country'>Viet Nam</div>
							<div class='earn-money-tab-3-content-details-item'>Portraits</div>
							<div class='earn-money-tab-3-content-details-price'>26.80 Euro</div>
							<div class='earn-money-tab-3-content-details-provision'>2.60 Euro</div>
							<div class='earn-money-tab-3-content-details-status'>Ok</div>
							</div>
							<div class="earn-money-tab-3-content-details-container">
							<div class='earn-money-tab-3-content-details-date'>12.05.2011</div>
							<div class='earn-money-tab-3-content-details-shop'>IKB1234</div>
							<div class='earn-money-tab-3-content-details-order'>ACTD-00066</div>
							<div class='earn-money-tab-3-content-details-country'>Viet Nam</div>
							<div class='earn-money-tab-3-content-details-item'>Portraits</div>
							<div class='earn-money-tab-3-content-details-price'>26.80 Euro</div>
							<div class='earn-money-tab-3-content-details-provision'>2.60 Euro</div>
							<div class='earn-money-tab-3-content-details-status'>Storno</div>
							</div>
							<div class="earn-money-tab-3-content-details-container">
							<div class='earn-money-tab-3-content-details-date'>12.05.2011</div>
							<div class='earn-money-tab-3-content-details-shop'>IKB1234</div>
							<div class='earn-money-tab-3-content-details-order'>ACTD-00066</div>
							<div class='earn-money-tab-3-content-details-country'>Viet Nam</div>
							<div class='earn-money-tab-3-content-details-item'>Portraits</div>
							<div class='earn-money-tab-3-content-details-price'>26.80 Euro</div>
							<div class='earn-money-tab-3-content-details-provision'>2.60 Euro</div>
							<div class='earn-money-tab-3-content-details-status'>Ok</div>
							</div>
							<div class="earn-money-tab-3-content-details-container">
							<div class='earn-money-tab-3-content-details-date'>12.05.2011</div>
							<div class='earn-money-tab-3-content-details-shop'>IKB1234</div>
							<div class='earn-money-tab-3-content-details-order'>ACTD-00066</div>
							<div class='earn-money-tab-3-content-details-country'>Viet Nam</div>
							<div class='earn-money-tab-3-content-details-item'>Portraits</div>
							<div class='earn-money-tab-3-content-details-price'>26.80 Euro</div>
							<div class='earn-money-tab-3-content-details-provision'>2.60 Euro</div>
							<div class='earn-money-tab-3-content-details-status'>Pending</div>
							</div>							
						</div>
					</div-->
				</div>
				<!-- div class='ui-tabs-panel ui-widget-content ui-corner-bottom' id='earn-money-tabs-4'>
					<div class='earn-money-tabs-4-header'>
						<div class='earn-money-tabs-4-header-balance'>
							<span class='earn-money-tabs-4-label'>{transAvailableBalance}</span>
							<span class='earn-money-tabs-4-value'>78,00 Euro</span>
						</div>
						<div class='earn-money-tabs-4-header-withrawl'>
							<span class='earn-money-tabs-4-label'>{transWithdrawAmount}</span>
							<span class='earn-money-tabs-4-value'>
								<input type='text' id='widthrawl-amount' value='78,00'>&nbsp;
								<select id='currency-select-box'>
									<option>EUR</option>
									<option>VND</option>
								</select>
							</span>
						</div>
					</div>
					<div class='earn-money-tab-4-middle'>
						<div class='earn-money-tab-4-middle-left'>
							<div><input type='radio' name='withdraw-type' value='paypal'> PayPal (No Fees) / 24h</div>
							<div><input type='radio' name='withdraw-type' value='wire-transfer'> {transWireTransfer} (-10,00 Euro) / 2-5 Workdays</div>
							<div><input type='radio' name='withdraw-type' value='estern-union'> Western Union (-18,50 Euro) / 2-3 Workdays</div>
						</div>
						<div class='earn-money-tab-4-middle-right'>
							<span class='earn-money-tab-4-select-box'>
								<select id='withdraw-user'>
									<option>withdraw@cash.com</option>
								</select>
							</span>
							<span class='is-bottons withdraw-button'>{transWithdraw}</span>
						</div>
					</div>
					<div class='earm-money-tab-4-payment-history'>
						<div class='earm-money-tab-4-payment-history-header'>
							<div class='earm-money-tab-4-payment-history-left'>{transPaymentHistory}</div>
							<div class='earm-money-tab-4-payment-history-right'><img src='http://localhost/wordpress/wp-content/plugins/Web_2_Print_XML_V3/css/img/icon/print.png' class='earn-money-zoom-icon'></div>
						</div>
						<div class='earn-money-tabs-4-payment-history-details'>
							<div class='earn-money-tabs-4-payment-history-details-date payment-history-details-title'>{transDate}</div>
							<div class='earn-money-tabs-4-payment-history-details-amount payment-history-details-title'>{transAmount}</div>
							<div class='earn-money-tabs-4-payment-history-details-currency payment-history-details-title'>{transCurrency}</div>
							<div class='earn-money-tabs-4-payment-history-details-ip payment-history-details-title'>IP</div>
							<div class='earn-money-tabs-4-payment-history-details-status payment-history-details-title'>{transStatus}</div>
							<div class='earn-money-tabs-4-payment-history-details-date'>2011.05.14 12:58:45</div>
							<div class='earn-money-tabs-4-payment-history-details-amount'>104.00</div>
							<div class='earn-money-tabs-4-payment-history-details-currency'>USD</div>
							<div class='earn-money-tabs-4-payment-history-details-ip'>192.167.1.120</div>
							<div class='earn-money-tabs-4-payment-history-details-status'>Waiting for Approval</div>
							<div class='earn-money-tabs-4-payment-history-details-date'>17.06.2011 05:12:18</div>
							<div class='earn-money-tabs-4-payment-history-details-amount'>39.00</div>
							<div class='earn-money-tabs-4-payment-history-details-currency'>HKD</div>
							<div class='earn-money-tabs-4-payment-history-details-ip'>123.12.23.54</div>
							<div class='earn-money-tabs-4-payment-history-details-status'>Booked</div>
						</div>
					</div>
				</div-->
			</div>
		</div>
	</div>
</div>
<div style="height: 0;overflow:hidden">
	<div class="provisionForm">
		<div class="provision-form">
			<div class="provision-tilte">
				<div class="provision-title-first"><span class="aff-title">{User}:</span><span class="user-affiliate"></span></div>			
				<div class="provision-title-second"><span class="aff-title">{Portal}:</span><span class="postal-affiliate"></span></div>
				<div class="provision-title-third"><span class="aff-title">{ActiveSince}:</span><span class="active-time-affiliate"></span></div>
			</div>
			<input type="hidden" id="trans-sales-per-day" value="{SalesPerDay}">
			<input type="hidden" id="trans-edit" value="{transEdit}">
			<div class="provision-maintain">
				<div class="provision-maintain-title">
					<div class="maintain-title-left">
						<div class="navigator-button navigator-provision"><span>{Provision}</span></div>
						<div class="navigator-button navigator-statistic"><span>{Statistics}</span></div>                       
					</div>
					<div class="maintain-title-right">
						<form id="affiliateProvisionForm" method="post" action="">
						<select name="affiliateSelect" class="affiliate-select"></select>
						<!--<select name="EndUserPriceFormat" class="EndUserPriceFormat"></select>-->
						<select class="currency-select"></select>
						<input class="resale-guid" type="hidden" value="" name="resale-guid">                        
						</form>
					</div>
				</div>
				<div class="provision-maintain-content provisions-content" style="display:block">
					<div class="provisions-shop-description"><span>{ConfigurationFor} </span><span id="shop-description"></span></div>
					<div class="provisions-content-calculate">
						<div class="cal-product-group">
							<div class="product-group-title"><span>{AvailableProductGroup}</span></div>
							<div class="product-group-content"></div>
						</div>
						<div class="cal-content-next"><div></div></div>
						<div class="cal-provision-calculate">
							<div class="provision-calculate-tilte"><span>{CalculateYourPriceandProvision}</span></div>
							<div class="cal-provision-content">
								<div class="provision-calculate-choose"><span>{YourSelection}: </span><span></span></div>
								<div class="provision-calculate-ex">
									<div class="provision-label"><span>{ExamplePriceFromMerchant}: </span></div>
									<div class="provision-price"><input class="provision-merchant" type="text" value="100,00"/><span class="provision-currency">Euro</span></div>
								</div>
								<div class="provision-calculate-cal">
									<div class="provision-calculate-amount">
										<div class="provision-label"><span>{YourProvisionAmount}:</span></div>
										<div class="provision-price"><span class="provision-amount">0,00</span><input class="provision-amount-hidden" type="hidden" value="0" /><span class="provision-currency">Euro</span></div>
									</div>
									<div class="provision-calcualte-slider">
										<div class="provision-slider-cover"><div class="provision-slider provision-cal-provision"></div><div class="provision-slider-process"></div></div>
									</div>
									<div class="provision-calculate-percent">
										<div class="provision-label"><span>{Yourpercentages}:</span><span class="provision-percent">0,00</span><input class="provision-percent-hidden" type="hidden" value="0" /><span> %</span></div>
										<div class="provision-price"><span class="provision-price-element">0,00</span><span class="provision-currency">Euro</span></div>
									</div>
									<div class="provision-calcualte-slider">
										<div class="provision-slider-cover"><div class="percentage-slider provision-cal-provision"></div><div class="percentage-slider-process"></div></div>
									</div>
								</div>
								<div class="provision-calculate-widget">
									<div class="provision-label"><span>{YourProfits}:</span></div>
									<div class="provision-price"><span class="your-profit">0,00</span><span class="provision-currency">Euro</span></div>
								</div>
							</div>
						</div>
						<div class="cal-content-next"><div></div></div>
						<div class="cal-calculate-warning">
							<div class="cal-calculate-warning-border">						   
								<div class="provision-warning-title"><span>Sales Prices</span></div>
									<div class="sale-price-content">
										<div class="subtypes"><select id="subtypes" onchange="subTypeChange();"><option>Subtypes</option></select></div>
										<div class="materials"><select id="materials" onchange="materialChange();"><option>Materials</option></select></div>
										<div class="sale-prices" id="sale-prices"></div>
									</div>							
								<div class="provision-warning-footer">
									<div class="warning-footer-button admin-is-bottons"><span><?php _e('AddNow', $l10n_prefix);?></span></div>
								</div>
							</div>
						</div>
					</div>
					<div class="provisions-content-grid">
						<div class="content-grid-title"><span><?php _e('ExistingProduct', $l10n_prefix);?></span></div>
						<div class="content-grid-grid">
							<div class="grid-title">
								<div class="grid-product-active" title="<?php _e('Active', $l10n_prefix);?>"><span><?php _e('Active', $l10n_prefix);?></span></div>
								<div class="grid-product-group" title="<?php _e('ProductGroup', $l10n_prefix);?>"><span><?php _e('ProductGroup', $l10n_prefix);?></span><div title="Sort this column" class="grid-icon-sort" onclick="gridRowSort('product')"><input type="hidden" value="0" /></div></div>
								<div class="grid-provision-absolute" title="<?php _e('Provisionabsolute', $l10n_prefix);?>"><span><?php _e('Provisionabsolute', $l10n_prefix);?></span><div title="Sort this column" class="grid-icon-sort" onclick="gridRowSort('absolute')"><input type="hidden" value="0" /></div></div>
								<div class="grid-provision-relative" title="<?php _e('Provisionrelative', $l10n_prefix);?>"><span><?php _e('Provisionrelative', $l10n_prefix);?></span><div title="Sort this column" class="grid-icon-sort" onclick="gridRowSort('relative')"><input type="hidden" value="0" /></div></div>
								<div class="grid-created" title="<?php _e('Created', $l10n_prefix);?>"><span><?php _e('Created', $l10n_prefix);?></span><div title="Sort this column" class="grid-icon-sort" onclick="gridRowSort('created')"><input type="hidden" value="0" /></div></div>
								<div class="grid-last-change" title="<?php _e('LastChange', $l10n_prefix);?>"><span><?php _e('LastChange', $l10n_prefix);?></span><div title="Sort this column" class="grid-icon-sort" onclick="gridRowSort('modified')"><input type="hidden" value="0" /></div></div>
								<div class="up-down-grid"></div>
							</div>
							<div class="content-grid-content"></div>
							<div class="content-grid-sort" style="display: none;"></div>
						</div>
					</div>
				</div><!-- End of provisions content -->
				<!--div class="provision-maintain-content statistics-content" style="display: none"></div><!-- End of statistics content -->                
			</div>		
		</div>
	</div>
</div>
<script type="text/javascript">
	{scriptPlaceHolder}
</script>