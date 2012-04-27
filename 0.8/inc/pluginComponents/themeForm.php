<?php
	//check session start
	if(!session_id())
		session_start();
	
	$languagesArr = $api->DoApiGetRequest('Languages/'.$plugin_option['language'].'?compact', null, 'Languages:'.$plugin_option['language']);	
	$currenciesArr = $api->DoApiGetRequest('Currencies/'.$plugin_option['language'], null, 'Currencies:'.$plugin_option['language']);
	$currenciesArr = json_decode($currenciesArr);
	$returnCurrencies = array();
	$returnCurrencies['Value'] = array();	
	foreach($currenciesArr->{'Value'} as $key => $value){
		$tmp_arr = array();
		$tmp_arr['Active'] = $value->{'Active'};
		$tmp_arr['Description'] = $value->{'CurrencyTranslation'}[0]->{'Description'};
		$tmp_arr['LanguageToken'] = $value->{'CurrencyTranslation'}[0]->{'LanguageToken'};
		$tmp_arr['Name'] = $value->{'CurrencyTranslation'}[0]->{'Name'};
		$tmp_arr['Key'] = $value->{'Token'};		
		array_push($returnCurrencies['Value'],$tmp_arr);
	}
	
?>
<!--add some scrip to do change text header area -->
	<div class="theme-container">
		<div class="theme-page-title"><span><?php _e('Customerdesign', $l10n_prefix);?></span></div>
		<!--Form-->
		<form id="colorsForm" method="post" action="admin.php?page=theme-settings">
		<div class="theme-page-viewer">
			<div class="theme-color-boxes1">
				<div class="button-other-design is-links"><span><a href="#anchor"><?php _e('Moredesign', $l10n_prefix);?></a></span></div>
				<div class="color-box-container">
					<div class="color-box-info">
						<div class="color-box-info-text"><span><?php _e('ColourTextLogin', $l10n_prefix);?></span></div>
						<div class="color-box-info-input"><input id="hexbox1" name="hexbox1" type="text" value="" /></div>
					</div>
					<div class="color-box-selector"><div id="color-box1" class="color-selector-box"></div></div>
				</div>
				<div class="color-box-container">
					<div class="color-box-info">
						<div class="color-box-info-text"><span><?php _e('GradientBackground', $l10n_prefix);?></span></div>
						<div class="color-box-info-input2"><input id="hexbox2" name="hexbox2" type="text" value="" /></div>
					</div>
					
					<div class="color-box-selector"><div id="color-box2" class="color-selector-box2"></div></div><div class="show-bg-gra"></div>
				</div>
				<div class="color-box-container13">
					<div class="color-box-info">
						<div class="color-box-info-input13"><input id="hexbox13" name="hexbox13" type="text" value="" /></div>
					</div>
					<div class="color-box-selector"><div id="color-box13" class="color-selector-box13"></div></div>
				</div>
				<div class="color-box-container">
					<div class="color-box-info">
						<div class="color-box-info-text"><span><?php _e('ColourTextPrices', $l10n_prefix);?></span></div>
						<div class="color-box-info-input"><input id="hexbox3" name="hexbox3" type="text" value="" /></div>
					</div>
					<div class="color-box-selector"><div id="color-box3" class="color-selector-box"></div></div>
				</div>
				<div class="color-box-container">
					<div class="color-box-info">
						<div class="color-box-info-text"><span><?php _e('ColourTextButton', $l10n_prefix);?></span></div>
						<div class="color-box-info-input"><input id="hexbox4" name="hexbox4" type="text" value="" /></div>
					</div>
					<div class="color-box-selector"><div id="color-box4" class="color-selector-box"></div></div>
				</div>
				<div class="color-box-container">
					<div class="color-box-info">
						<div class="color-box-info-text"><span><?php _e('GradientButton', $l10n_prefix);?></span></div>
						<div class="color-box-info-input8"><input id="hexbox8" name="hexbox8" type="text" value="" /></div>
					</div>
					<div class="color-box-selector"><div id="color-box8" class="color-selector-box8"></div></div><div class="gradient-show"></div>
				</div>
				<div class="color-box-container">
					<div class="color-box-info">
						<div class="color-box-info-input12"><input id="hexbox12" name="hexbox12" type="text" value="" /></div>
					</div>
					<div class="color-box-selector"><div id="color-box12" class="color-selector-box12"></div></div>
				</div>
				<div class="txt-shadow-setting">
					<div class="txt-shadow-text"><span><?php _e('ShadowTextButton ', $l10n_prefix);?></span></div>
					<div class="txt-shadow-input" style="display:none"><input type="text" name="buttontextshadow" value="" onchange="shadowSet()"/></div>
					<div class="txt-shadow-button admin-is-bottons" style="display:none" onclick="shadowSet()"><span><?php _e('Show', $l10n_prefix);?></span></div>
				
					<div class="shadow-slider-cover">
							<div class="shadow-slider provision-cal-provision ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
								<a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 0%;"></a>
							</div>
							<div class="shadow-slider-process" style="background: none repeat scroll 0% 0%; width: 0%;"></div>
					</div>
					
				</div>
			</div>
			<div class="theme-widget-viewer">
				<div class="theme-login">
					<div class="theme-login-info">
						<div class="user-profile-picture"></div>
						<div class="user-profile-info"><span>Hello Dark Moon!</span></div>
					</div>
					<div class="theme-login-botton"><span><?php _e('Logout', $l10n_prefix);?></span></div>
				</div>
				<!-- HTML -->
				<div class="order-product-main-container">
		        <div class="order-product-main">                               
		            <div id="editme5" class="order-product-title">
		            	
		                <span>Quick Calculator</span>    
		            </div><!-- End title order div -->
		            <input id="set_headertext" type="hidden" value="" name="headertext" />
		            <div class="order-product-header">
		            	<select class="lang-sel" id="theme-control-language" name="dgo_language" >
	                        <!-- option value="<?php echo $plugin_option['language']; ?>"><?php echo $plugin_option['language_name']; ?></option-->
	                    </select>
		            	<select class="curSelect"><option><?php echo $plugin_option['currency']; ?></option></select>
		            	<select class="dimSelect"><option><?php echo $plugin_option['dimension']; ?></option></select>
		            </div> 
		                      
		            <div class="order-product-type">
		            	<div class="color-box-info-text1"><span><?php _e('Article', $l10n_prefix);?></span></div>
		                <select id="typeSel" name="typeSel" style="width: 90%;"><option></span></option></select>
		            </div><!-- End product order div -->
		            <div class="order-product-material">
		            	<div class="color-box-info-text2"><span><?php _e('Materials', $l10n_prefix);?></span></div>		                
		                <select id="materialSel" style="width: 90%;" onchange="priceChange(blogInfo);"><option></span></option></select>
		            </div><!-- End materialOrderDiv -->
		            <div class="order-product-content">
		                <div class="order-product-subcontent">
		                    <!-- Content will be fill at runtime --> 
		                    <div class="order-product-content-child"><div class="content-dimension"><input type="radio" value="" disabled="true"><span>85 x 54 mm</span></div><div class="content-price"><span>26,00 Euro</span></div></div>
		                    <div class="order-product-content-child"><div class="content-dimension"><input type="radio" value="" checked="checked"><span>80 x 50 mm</span></div><div class="content-price"><span>25,00 Euro</span></div></div>
		                    <div class="order-product-content-child"><div class="content-dimension"><input type="radio" value="" disabled="true"><span>90 x 55 mm</span></div><div class="content-price"><span>27,00 Euro</span></div></div> 
		                    <div class="order-product-content-child"><div class="content-dimension"><input type="radio" value="" disabled="true"><span>55 x 90 mm</span></div><div class="content-price"><span>27,00 Euro</span></div></div>
		                </div>
		           <input id="set_Netendpricetext" type="hidden" value="" name="NetendpriceText" />
		            <input id="set_Grossendpricetext" type="hidden" value="" name="GrossendpriceText" />
		            <div class="text-endprice"></div>
		            </div><!-- End size order div -->
		            
		            <!-- Start text div -->
		            <div class="btOrderDiv" align="center">
		                <div class="uploadOrderDiv">
		                	<div class="bt-uploader-container">
		                		<input type='hidden' name='button_text' id='button-text-input' value=''/>
			                    <div id="buttonMultiUpload" class="bt-uploader">
			                    </div>
			                </div>                           
		                </div>
		            </div><!-- End button order div -->
		        </div><!-- End order div -->
		        </div>
			</div>
			<div class="theme-color-boxes2">
				<div class="button-reset-theme is-links" onclick="themeColorSet(colorArr['silver']);"><span><?php _e('Reset', $l10n_prefix);?></span></div>
				
				<div class="color-box-container-right">
					<div class="color-box-selector-right"><div id="color-box10" class="color-selector-box"></div></div>
					<div class="color-box-info-right">
						<div class="color-box-info-text"><span><?php _e('ColourTextHeader', $l10n_prefix);?></span></div>
						<div class="color-box-info-input-r"><input id="hexbox10" name="hexbox10" type="text" value="" /></div>
					</div>					
				</div>
				<div class="color-box-container-right">
					<div class="color-box-selector-right"><div id="color-box5" class="color-selector-box5"></div></div>
					<div class="color-box-info-right5">
						<div class="color-box-info-text"><span><?php _e('GradientHeader', $l10n_prefix);?></span></div>
						<div class="color-box-info-input5"><input id="hexbox5" name="hexbox5" type="text" value="" /></div>
					</div>
					<div class="show-head-gra"></div>					
				</div>
				<div class="txt-header-shadow-setting">
					<div class="txt-header-shadow-text"><span><?php _e('ShadowTextHeader', $l10n_prefix);?></span></div>
					<div class="txt-header-shadow-input" style="display:none"><input type="text" name="headertextshadow" value="" onchange="shadowheaderSet()"/></div>
					<div class="txt-header-shadow-button admin-is-bottons" style="display:none" onclick="shadowSet()"><span><?php _e('Show', $l10n_prefix);?></span></div>
				
					<div class="shadow-header-slider-cover">
							<div class="shadow-header-slider provision-cal-provision ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
								<a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 0%;"></a>
							</div>
							<div class="shadow-header-slider-process" style="background: none repeat scroll 0% 0%; width: 0%;"></div>
					</div>
					
				</div>
				<div class="color-box-container-right11">
					<div class="color-box-selector-right"><div id="color-box11" class="color-selector-box11"></div></div>
					<div class="color-box-info-right">
						<div class="color-box-info-input11"><input id="hexbox11" name="hexbox11" type="text" value="" /></div>
					</div>					
				</div>
				<div class="color-box-container-right">
					<div class="color-box-selector-right"><div id="color-box6" class="color-selector-box"></div></div>
					<div class="color-box-info-right">
						<div class="color-box-info-text"><span><?php _e('ColourWidgetOutline', $l10n_prefix);?></span></div>
						<div class="color-box-info-input-r"><input id="hexbox6" name="hexbox6" type="text" value="" /></div>
					</div>					
				</div>
				<div class="color-box-container-right">
					<div class="color-box-selector-right"><div id="color-box7" class="color-selector-box"></div></div>
					<div class="color-box-info-right">
						<div class="color-box-info-text"><span><?php _e('ColourActiveElement', $l10n_prefix);?></span></div>
						<div class="color-box-info-input-r"><input id="hexbox7" name="hexbox7" type="text" value="" /></div>
					</div>					
				</div>
				<div class="color-box-container-right">
					<div class="color-box-selector-right"><div id="color-box9" class="color-selector-box"></div></div>
					<div class="color-box-info-right">
						<div class="color-box-info-text"><span><?php _e('ColourButtonOutline', $l10n_prefix);?></span></div>
						<div class="color-box-info-input-r"><input id="hexbox9" name="hexbox9" type="text" value="" /></div>
					</div>					
				</div>	
				<div class="template-radius-setting">
					<div class="radius-setting-text"><span><?php _e('BorderRadiusOutline', $l10n_prefix);?></span></div>
					<div class="radius-setting-button admin-is-bottons" style="display:none" onclick="radiusSet()"><span><?php _e('Show', $l10n_prefix);?></span></div>
					<div class="radius-setting-input " style="display:none" ><input type="text" name="radius" value="20" onchange="radiusSet()"/></div>
				
					<div class="radius-slider-cover">
						<div class="radius-slider provision-cal-provision ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
							<a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 0%;"></a>
						</div>
						<div class="radius-slider-process" style="background: none repeat scroll 0% 0%; width: 0%;"></div>
					</div>
				</div>
				<div class="template-bt-save admin-is-bottons">
					<span><?php _e('Save', $l10n_prefix);?></span>
				</div>			
			</div>			
		</div>
		</form>
		<!--Form-->
		<!-- Anchor -->
		<a name="anchor"></a><span>
		<div class="theme-page-gallery">
			<div class="theme-gallery-title"><?php _e('DesignGallery', $l10n_prefix);?></span></div>
			<div class="theme-gallery-content">				
				<div class="theme-gallery-child">
					<div class="theme-child-title"><span><?php _e('WhiteTheme', $l10n_prefix);?></span></div>
					<div class="theme-child-content">
						<div class="theme-child-component white-template"></div>
						<input class="templateType" type="hidden" value="white" />
					</div>
				</div>
				<div class="theme-gallery-child">
					<div class="theme-child-title"><span><?php _e('BlueTheme', $l10n_prefix);?></span></div>
					<div class="theme-child-content">
						<div class="theme-child-component blue-template"></div>
						<input class="templateType" type="hidden" value="blue" />
					</div>
				</div>
				<div class="theme-gallery-child">
					<div class="theme-child-title"><span><?php _e('SilverTheme', $l10n_prefix);?></span></div>
					<div class="theme-child-content">
						<div class="theme-child-component silver-template"></div>
						<input class="templateType" type="hidden" value="silver" />
					</div>
				</div>
				<div class="theme-gallery-child">
					<div class="theme-child-title"><span><?php _e('BlackTheme', $l10n_prefix);?></span></div>
					<div class="theme-child-content">
						<div class="theme-child-component black-template"></div>
						<input class="templateType" type="hidden" value="black" />
					</div>
				</div>
				<div class="theme-gallery-child">
					<div class="theme-child-title"><span><?php _e('RedTheme', $l10n_prefix);?></span></div>
					<div class="theme-child-content">
						<div class="theme-child-component red-template"></div>
						<input class="templateType" type="hidden" value="red" />
					</div>
				</div>
				<div class="theme-gallery-child">
					<div class="theme-child-title"><span><?php _e('AtomicTheme', $l10n_prefix);?></span></div>
					<div class="theme-child-content">
						<div class="theme-child-component atomic-template"></div>
						<input class="templateType" type="hidden" value="atomic" />
					</div>
				</div>
				<div class="theme-gallery-child">
					<div class="theme-child-title"><span><?php _e('CloudTheme', $l10n_prefix);?></span></div>
					<div class="theme-child-content">
						<div class="theme-child-component cloud-template"></div>
						<input class="templateType" type="hidden" value="cloud" />
					</div>
				</div>
				<div class="theme-gallery-child">
					<div class="theme-child-title"><span><?php _e('ShadowTheme', $l10n_prefix);?></span></div>
					<div class="theme-child-content">
						<div class="theme-child-component shadow-template"></div>
						<input class="templateType" type="hidden" value="shadow" />
					</div>
				</div>
				<div class="theme-gallery-child">
					<div class="theme-child-title"><span><?php _e('GreenTheme', $l10n_prefix);?></span></div>
					<div class="theme-child-content">
						<div class="theme-child-component green-template"></div>
						<input class="templateType" type="hidden" value="green" />
					</div>
				</div>
				<div class="theme-gallery-child">
					<div class="theme-child-title"><span><?php _e('BrownTheme', $l10n_prefix);?></span></div>
					<div class="theme-child-content">
						<div class="theme-child-component brown-template"></div>
						<input class="templateType" type="hidden" value="brown" />
					</div>
				</div>	
			</div>
		</div>
	</div>
<script type="text/javascript">
	jQuery(document).ready(function() {
		var visibilityCalculator 		= '<?php $plugin_option['Visibility']['Calculator']; ?>';
		    var visibilityCustomerCenter 	= '<?php $plugin_option['Visibility']['CustomerCenter']; ?>';
		    var visibilityTemplateDesign 	= '<?php $plugin_option['Visibility']['TemplateDesign']; ?>';
		    globalLanguage = '<?php echo $plugin_option['language']; ?>';
		    dgoCurrencies = '<?php echo $plugin_option['currency']; ?>';
		    dgoDimension= '<?php echo $plugin_option['dimension']; ?>';
			//get language
			adminControlGetLanguage_handle(<?php echo $languagesArr; ?>, 'wp_control');
			//get language
		    adminControlGetCurrency_handle(<?php echo json_encode($returnCurrencies); ?>, 'Admin-theme');
		    //get language
		    adminControlGetDimension( 'Admin-theme' );
	});
</script>	
