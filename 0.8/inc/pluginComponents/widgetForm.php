<?php
	if(!session_id())
		session_start();
				
	$plugin_option = get_option("w2p_plugin_option");
	$profile_user 	= get_option('profile_user_info'); 
	
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
	
	if(isset($_POST['dgo_language'])){
		$temp = $_POST['dgo_language'];
		$temp = split("[_]", $temp);
		
		if($plugin_option['language'] != $temp[0] || $plugin_option['currency'] != $_POST['dgo_currency'] || $plugin_option['dimension'] = $_POST['dgo_dimension']){
			$plugin_option['edited'] = true;
		}
		
		$plugin_option['language'] = $temp[0];
		$plugin_option['language_name'] = $temp[1];
		$plugin_option['currency'] = $_POST['dgo_currency'];
		$plugin_option['dimension'] = $_POST['dgo_dimension'];				
		
		if(isset($_POST['header_option_show'])){
			$plugin_option['header_option_show'] = true;
		}else{
			$plugin_option['header_option_show'] = false;
		}
		
		$_SESSION["current_language"]['key'] = strtolower($plugin_option['language'])."_".$plugin_option['language'];
		
		//update option
        update_option('w2p_plugin_option', $plugin_option); 
				
	}else{
		if($plugin_option['language'] == ""){
			$_SESSION["current_language"]['key'] = "en_EN";
		}else{
			$_SESSION["current_language"]['key'] = strtolower($plugin_option['language'])."_".$plugin_option['language'];
		}
	}
	
	/*===========================Visibility function================================*/
	if(isset($_POST["visibilityCalculator"])){			
		$plugin_option['Visibility']['Calculator'] 	= $_POST["visibilityCalculator"];
		//update option
		update_option('w2p_plugin_option', $plugin_option); 
	}else if(isset($_POST['cal-submit'])){
		$plugin_option['Visibility']['Calculator'] 	= "false";
		//update option
		update_option('w2p_plugin_option', $plugin_option); 
	}
	
	if(isset($_POST["visibilityCustomer"])){ 
		$plugin_option['Visibility']['CustomerCenter'] = $_POST["visibilityCustomer"];
		//update option
		update_option('w2p_plugin_option', $plugin_option);  
	}else if(isset($_POST['cus-submit'])){
		$plugin_option['Visibility']['CustomerCenter'] = "false";
		//update option
		update_option('w2p_plugin_option', $plugin_option); 
	}
	
	if(isset($_POST["visibilityTemplates"])){ 
		$plugin_option['Visibility']['TemplateDesign'] = $_POST["visibilityTemplates"];
		//update option
		update_option('w2p_plugin_option', $plugin_option);  
	}else if(isset($_POST['tem-submit'])){
		$plugin_option['Visibility']['TemplateDesign'] = "false";
		//update option
		update_option('w2p_plugin_option', $plugin_option); 
	}	
	
	/* ========================= TRANSLATION =======================================*/		
	//Include language file
	require_once("language_w2p.php");			
	// Load up the plugin text domain
	load_plugin_textdomain( 
		$l10n_prefix,                        		// Plugin text domain reference
		false,                                     // False - deprecated parameter
		'Web_2_Print_XML_V3/inc/lang/' // Path to translation files
	);
	/*==============================================================================*/
	
?>
	<script type="text/javascript">
			var visibilityCalculator 		= '<?php $plugin_option['Visibility']['Calculator']; ?>';
		    var visibilityCustomerCenter 	= '<?php $plugin_option['Visibility']['CustomerCenter']; ?>';
		    var visibilityTemplateDesign 	= '<?php $plugin_option['Visibility']['TemplateDesign']; ?>';			
			
			/*Ready function*/
            jQuery(document).ready(function() {
            	if(!flag_func_call){ 
					flag_func_call = true;            
		            //get language
		            //adminControlGetLanguage( 'wp_control' );		            
					adminControlGetLanguage_handle(<?php echo $languagesArr; ?>, 'wp_control');
		            //get language
		            adminControlGetCurrency_handle(<?php echo json_encode($returnCurrencies); ?>, 'wp_control');
					//adminControlGetCurrency( 'wp_control' );		            
		            //get language
		            adminControlGetDimension( 'wp_control' );
	            }
            });

		    globalLanguage = '<?php echo $plugin_option['language']; ?>';
		    dgoCurrencies = '<?php echo $plugin_option['currency']; ?>';
		    dgoDimension= '<?php echo $plugin_option['dimension']; ?>';
		    
    </script>
	<div class="widget-maintain">
        <form id="admin-cal-form" method="post" action="admin.php?page=widget-settings"><div class="cal-setting-div">
            <div class="cal-tittle-div"><div><span><?php _e('CalculatorSettings', $l10n_prefix);?></span></div><div class="title-icon-toogle widget-hide"></div></div>
            <div class="cal-content-div">
                <div class="first-content-div">
                    <input class="cal-1-check" type="checkbox" <?php if($plugin_option['Visibility']['Calculator'] == "true") echo "checked";?> name="visibilityCalculator" id="visibility-calculator" value="true"/>
                    <input type="hidden" name='cal-submit' value="true">
                    <span><?php _e('ShowOnlyForLoginedUser', $l10n_prefix);?></span>
                </div>
                <div class="second-content-div">
                    <div class="second-1-div"><div><span><?php _e('Preselection', $l10n_prefix);?></span></div><div><span><?php _e('Show', $l10n_prefix);?></span> <input name="header_option_show" type="checkbox" value="<?php if($plugin_option['header_option_show']){echo 'true';}else{echo 'false';} ?>" <?php if($plugin_option['header_option_show']){echo 'checked=""';} ?>"/></div></div>
                    <div class="second-2-div">
                    	<input type="hidden" id="hidden-language" value="<?php echo $plugin_option['language']; ?>"/>
                        <select class="lang-sel" id="dgo-control-language" name="dgo_language">
                        	<option value="<?php echo $plugin_option['language']; ?>"><?php echo $plugin_option['language_name']; ?></option>
                        </select>
                        
                        <input type="hidden" id="hidden-currency" value="<?php echo $plugin_option['currency']; ?>"/>
                        <select class="cur-sel" id="dgo-control-currency" name="dgo_currency">
                        	<option value="<?php echo $plugin_option['currency']; ?>"><?php echo $plugin_option['currency']; ?></option>                        	
                        </select>
                        
                        <input type="hidden" id="hidden-dimension" value="<?php echo $plugin_option['dimension']; ?>"/>
                        <select class="dim-sel" id="dgo-control-dimension" name="dgo_dimension">
                        	<option value="<?php echo $plugin_option['dimension']; ?>"><?php echo $plugin_option['dimension']; ?></option>
                        </select>
                    </div>
                </div>
                <div class="footer-content-div">
                    <div class="footer-1-div"><span class="cal-del-span"><?php _e('Delete', $l10n_prefix);?></span> / <span class="cal-close-span"><?php _e('Close', $l10n_prefix);?></span></div>
                    <div class="footer-2-div"><div class="cal-save-span admin-is-bottons"><span><?php _e('Save', $l10n_prefix);?></span></div></div>
                </div>
            </div>
        </div><!-- End calculator setting div --></form>
        <div class="cus-setting-div">
        <form id="admin-cus-form" method="post">
            <div class="cal-tittle-div"><div><span><?php _e('CustomerCenterSettings', $l10n_prefix);?></span></div><div class="title-icon-toogle widget-hide"></div></div>                    
            <div class="cal-content-div">
                <div class="first-content-div">
                    <input class="cus-1-check" type="checkbox" <?php if($plugin_option['Visibility']['CustomerCenter'] == "true") echo "checked";?> name="visibilityCustomer" id="visibility-customer" value="true"/>
                    <input type="hidden" name='cus-submit' value="true">
                    <span><?php _e('ShowOnlyForLoginedUser', $l10n_prefix);?></span>
                </div>
                <div class="footer-content-div">
                    <div class="footer-1-div"><span class="cus-del-span"><?php _e('Delete', $l10n_prefix);?></span> / <span class="cal-close-span"><?php _e('Close', $l10n_prefix);?></span></div>
                    <div class="footer-2-div"><div class="cus-save-span admin-is-bottons"><span><?php _e('Save', $l10n_prefix);?></span></div></div>
                </div>                    
            </div> 
         </form>                                       
        </div><!-- End customer setting div -->
        <div class="tem-setting-div">
        <form id="admin-tem-form" method="post">
            <div class="cal-tittle-div"><div><span><?php _e('TemplateDesignSettings', $l10n_prefix);?></span></div><div class="title-icon-toogle widget-hide"></div></div>                                     
                <div class="cal-content-div">
                    <div class="first-content-div">
                    <input class="tem-1-check" type="checkbox" <?php if($plugin_option['Visibility']['TemplateDesign'] == "true") echo "checked";?> name="visibilityTemplates" id="visibility-templates" value="true"/>
                    <input type="hidden" name='tem-submit' value="true">
                    <span><?php _e('ShowOnlyForLoginedUser', $l10n_prefix);?></span>
                </div>
                <div class="footer-content-div">
                    <div class="footer-1-div"><span class="tem-del-span"><?php _e('Delete', $l10n_prefix);?></span> / <span class="cal-close-span"><?php _e('Close', $l10n_prefix);?></span></div>
                    <div class="footer-2-div"><div class="tem-save-span admin-is-bottons"><span><?php _e('Save', $l10n_prefix);?></span></div></div>
                </div>                    
            </div>  
       
        </form>                  
        </div><!-- End template setting div -->
    </div><!-- End widget div -->