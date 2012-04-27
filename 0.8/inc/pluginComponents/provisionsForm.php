<?php 
	if(!session_id())
		session_start();
		
	//Include language file
	require_once("language_w2p.php");			
	// Load up the plugin text domain
	load_plugin_textdomain( 
		$l10n_prefix,                  // Plugin text domain reference
		false,                         // False - deprecated parameter
		'Web_2_Print_XML_V3/inc/lang/' // Path to translation files
	);

	?>
	<!-- hidden input for translation -->
	<input type="hidden" id="trans-add-now" value="<?php _e('AddNow', $l10n_prefix); ?>">
	<input type="hidden" id="trans-save-now" value="<?php _e('Save', $l10n_prefix); ?>">
	<input type="hidden" id="trans-loading" value="<?php _e('Loading', $l10n_prefix); ?>">
	<!-- end hidden input for translation -->
	
	<!--General configure -->
	<div class="general-maintain">
        <div class="general-maintain-content">
            <div class="general-content">
                <div class="general-content-first">
                    <div class="content-first-img"></div>
                    <div class="content-first-img-shadow"></div>
                    <div class="content-first-active"><input id="affiliate-active-check" type="checkbox" value="" checked="checked"/><span><?php _e('Active', $l10n_prefix);?></span></div>
                </div>
                <input type="hidden" id="visibility-status-public" value="<?php _e('ForEveryone', $l10n_prefix);?>">
                <input type="hidden" id="visibility-status-private" value="<?php _e('OnlyForLoggedInUsers', $l10n_prefix);?>">
                <div class="general-content-second">
                    <div class="content-second content-second-first"><span><?php _e('User', $l10n_prefix);?>: </span><span class="user-affiliate"></span> - <?php _e('ShopID', $l10n_prefix);?>: <span class="shop-affiliate"></span></div>
                    <div class="content-second content-second-second"><span><?php _e('SelectProducts', $l10n_prefix);?>:</span><span class="select-products"></span></div>                    
                    <div class="content-second content-second-forth"><span><?php _e('Visibility', $l10n_prefix);?>: <span class="visibility-status"></span></span></div>
                    <div class="configure-button admin-is-bottons"><span><?php _e('Configure', $l10n_prefix);?></span></div> 
                </div>              
                <div class="general-content-forth">
                     <a href="#" target="_blank"><div id="statistic-chart"></div></a>
                    <div class="general-content-third-shadow"></div>
                </div>
            </div><!-- End content div -->
            <div class="general-content-none">
            	<div class="general-content-none-warning"><span><?php _e('Ooopsyoudonthaveanaccountconfiguredtillnow', $l10n_prefix);?></span></div>
            </div>
        </div><!-- End general maintain content -->
        <div class="general-footer">
            <div class="footer-contact"><div><span><?php _e('Ifyouwanttogiveussomefeedbackfeelfreeto', $l10n_prefix);?> </span></div><a href="#"><div class="btn-contactus admin-is-bottons"><?php _e('ContactUs', $l10n_prefix);?></div></a></div>
            <div class="footer-button admin-is-bottons add-new-button"><span><?php _e('AddNew', $l10n_prefix);?></span></div>
            <form id="affiliateLogoutForm" method="post" action="admin.php?page=general-settings">
            	<input type='hidden' name='logout-flag' id='form-logout-flag' value='false'>
            </form>
            <div class="footer-button admin-is-bottons logout-button"><span><?php _e('Logout', $l10n_prefix);?></span></div>
            <div class="footer-button admin-is-bottons reset-cache" style="margin-right:15px;"><span><?php _e('ResetCache', $l10n_prefix);?></span></div>
        </div><!-- End footer div -->
    </div><!--End general div -->
    
    <!-- Dialog asking P user -->
    <div class="hide-dialog">
    <div class="askingShopForm">
    	<div class="asking-shop-title"><span><?php _e('Whichshopyouwanttoconfigure', $l10n_prefix);?></span></div>
    	<div class="asking-shop-content">
    		<div class="shop-div-title">
    			<div class="shop-div-name"><span><?php _e('Name', $l10n_prefix);?></span></div>
    			<div class="shop-div-des"><span><?php _e('Description', $l10n_prefix);?></span></div>
    		</div>
    	</div>
    </div>
    </div>
    <!-- Configure form --> 
    <div class="hide-dialog">   
    <div class="adminConfigForm">
        <div class="config-maintain">
            <div class="config-title">
                <span><?php _e('Pleasefillthebelowtoactivetheplugin', $l10n_prefix);?> <?php _e('Yougettheneededinformationsdirectfromyourpartner', $l10n_prefix);?> <?php _e('Ifthereareanyquestionspleasecontactus', $l10n_prefix);?></span>
            </div>
            <form id="affiliateLoginForm" method="post" action="admin.php?page=general-settings">
            <div class="config-content">
                <div class="config-content-left">
                    <div class="config-content-row">
						<div class="config-label">
							<span><?php _e('AffiliateID', $l10n_prefix);?>:</span>
						</div>
						<br>
						<div class="config-input">
							<div class="inputDiv"><input name="affiliateId" id="affiliate-id" type="text" value=""/><div class="checkImg"></div></div>
							<div class="admin-affiliate-message-error"></div>
						</div>
					</div>
                    <div class="config-content-row">
						<div class="config-label">
							<span><?php _e('Password', $l10n_prefix);?>:</span>
						</div>
						<br>
						<div class="config-input">
							<div class="inputDiv"><input name="affiliatePass" id="affiliate-pass" type="password" value=""/><div class="checkImg"></div></div>
							<div class="admin-password-message-error"></div>
						</div>
					</div>
                    <input type="hidden" value="new" name="afiiliateResale" />  
                    <input class="current-language" type="hidden" value="" name="current-language">                    
                    <input class="current-currency" type="hidden" value="" name="current-currency"> 
                    <input class="MaxNumOfResaleUnits" type="hidden" value="" name="MaxNumOfResaleUnits"> 
                    <div id="affiliate-login" class="admin-is-bottons"><span><?php _e('Login', $l10n_prefix);?></span></div>                   
                </div>
                <!-- div class="config-content-right">   
					<form method="post" action="" name="frmVT" id="frmVT">
						<div class="imgLogin">
							<a href="javascript: void(0);"><img src="<?php //echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/facebook.png" alt="Facebook" onclick="openWindow('facebook','loginProvider');"/></a>
							<a href="javascript: void(0);"><img src="<?php //echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/yahoo.png" alt="Yahoo" onclick="openWindow('yahoo','loginProvider');"/></a><br/>						
							<a href="javascript: void(0);"><img src="<?php //echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/google.png" alt="Google" onclick="openWindow('google','loginProvider');"/></a>						
							<a href="javascript: void(0);"><img src="<?php //echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/aol.png" alt="AOL"/></a><br/>						
							<a href="javascript: void(0);"><img src="<?php //echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/twitter.png" alt="Twitter" onclick="openWindow('twitter','loginProvider');"/></a>						
							<a href="javascript: void(0);"><img src="<?php //echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/msn.png" alt="FlickR"/></a><br/>                    
						</div>                           
					</form>				
                </div-->
            </div>
            </form>
        </div><!-- End config maintain -->
    </div><!-- End configure form -->
    </div>
    
    <!-- Provision Form -->
    <div class="hide-dialog">
    <div class="provisionForm">
        <div class="provision-form">
            <div class="provision-tilte">
                <div class="provision-title-first"><span class="aff-title"><?php _e('User', $l10n_prefix);?>:</span><span class="user-affiliate"></span></div>
                <div class="provision-title-second"><span class="aff-title"><?php _e('Portal', $l10n_prefix);?>:</span><span class="postal-affiliate"></span></div>
                <div class="provision-title-third"><span class="aff-title"><?php _e('ActiveSince', $l10n_prefix);?>:</span><span class="active-time-affiliate"></span></div>
            </div>
            <input type="hidden" id="trans-sales-per-day" value="<?php _e('SalesPerDay', $l10n_prefix);?>">
            <div class="provision-maintain">
                <div class="provision-maintain-title">
                    <div class="maintain-title-left">
                        <div class="navigator-button navigator-provision"><span><?php _e('Provision', $l10n_prefix);?></span></div>
                        <div class="navigator-button navigator-statistic"><span><?php _e('Statistics', $l10n_prefix);?></span></div>                       
                    </div>
                    <div class="maintain-title-right">
                    	<form id="affiliateProvisionForm" method="post" action="admin.php?page=general-settings">
                    	<select name="affiliateSelect" class="affiliate-select"></select>
                    	<select name="EndUserPriceFormat" class="EndUserPriceFormat"></select>
                        <select class="currency-select"></select>
                        <input class="resale-guid" type="hidden" value="" name="resale-guid">                        
                        </form>
                    </div>
                </div>
                <div class="provision-maintain-content provisions-content" style="display:block">
                	<div class="provisions-shop-description"><span><?php _e('ConfigurationFor', $l10n_prefix);?> </span><span id="shop-description"></span></div>
                    <div class="provisions-content-calculate">
						<div class="cal-product-group">
							<div class="product-group-title"><span><?php _e('AvailableProductGroup', $l10n_prefix);?></span></div>
							<div class="product-group-content"></div>
						</div>
						<div class="cal-content-next"><div></div></div>
						<div class="cal-provision-calculate">
							<div class="provision-calculate-tilte"><span><?php _e('CalculateYourPriceandProvision', $l10n_prefix);?></span></div>
							<div class="cal-provision-content">
								<div class="provision-calculate-choose"><span><?php _e('YourSelection', $l10n_prefix);?>: </span><span></span></div>
								<div class="provision-calculate-ex">
									<div class="provision-label"><span><?php _e('ExamplePriceFromMerchant', $l10n_prefix);?>: </span></div>
									<div class="provision-price"><input class="provision-merchant" type="text" value="100,00" readonly="readonly"/><span class="provision-currency">Euro</span></div>
								</div>
								<div class="provision-calculate-cal">
									<div class="provision-calculate-amount">
										<div class="provision-label"><span><?php _e('YourProvisionAmount', $l10n_prefix);?>:</span></div>
										<div class="provision-price"><span class="provision-amount">0,00</span><input class="provision-amount-hidden" type="hidden" value="0" /><span class="provision-currency">Euro</span></div>
									</div>
									<div class="provision-calcualte-slider">
                                        <div class="provision-slider-cover"><div class="provision-slider provision-cal-provision"></div><div class="provision-slider-process"></div></div>
                                    </div>
									<div class="provision-calculate-percent">
										<div class="provision-label"><span><?php _e('Your percentages', $l10n_prefix);?>:</span><span class="provision-percent">0,00</span><input class="provision-percent-hidden" type="hidden" value="0" /><span> %</span></div>
										<div class="provision-price"><span class="provision-price-element">0,00</span><span class="provision-currency">Euro</span></div>
									</div>
                                    <div class="provision-calcualte-slider">
                                        <div class="provision-slider-cover"><div class="percentage-slider provision-cal-provision"></div><div class="percentage-slider-process"></div></div>
                                    </div>
								</div>
								<div class="provision-calculate-widget">
									<div class="provision-label"><span><?php _e('YourProfits', $l10n_prefix);?>:</span></div>
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
	                            	<div class="sale-prices" id="sale-prices">	                            		
	                            	</div>
	                            </div>
                            </div>
                            <div class="provision-warning-footer"><div class="warning-footer-button admin-is-bottons"><span><?php _e('AddNow', $l10n_prefix);?></span></div></div>
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
                <div class="provision-maintain-content statistics-content"></div><!-- End of statistics content -->                
            </div>
            
        </div>
    </div>
    </div>
    <!-- End Provision Form -->
    
	<?php
?>
