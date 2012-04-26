<?php 
	//assign template
	if (!class_exists('TemplateEngine')) {
		//needed for every other control
		require_once 'dgoControls/inc/template_engine.php';
	}
	
	require_once('translation.class.php');	
	
	//get product details page ID--------------------------------------
	$productdetailsPageID 		= get_option('productdetailsPageID');
	$designDetailsPageID 		= get_option('designDetailsPageID');
	//get product details link
	$arrPro						= get_permalink($productdetailsPageID);
	//get Design details link
	$arrDesignDetails			= get_permalink($designDetailsPageID);
	
	//get new array from these links
	$arrPro						= explode("/",$arrPro);
	$arrDesignDetails			= explode("/",$arrDesignDetails);
	
	$translation = new Web_2_print_Translation('web2print');
	
	//add new rule for rewrite url. e.g: photo_cug#cup-1999-0_40x40mm-1_Run
    //add_rewrite_rule($translation->translate('Keyword_products').'_(.*)$', 'index.php?pagename='.$arrPro[count($arrPro)-1],'top');
    add_rewrite_rule('(anh|photo|foto)_(.*)$', 'index.php?pagename='.$arrPro[count($arrPro)-1],'top');
    add_rewrite_rule('design_(.*)$', 'index.php?pagename='.$arrDesignDetails[count($arrDesignDetails)-1],'top');
    add_rewrite_rule('register$', 'index.php','top');
    add_rewrite_rule('login$', 'index.php','top');    
    //Remove rewrite rules and then recreate rewrite rules.
    flush_rewrite_rules(false);

	require_once 'pluginComponents/flag_array.php';
	//get colors option
	$colors = get_option('colors');
	$radius = $colors['radius'];
	$radiusless = $radius - 1;
	
	//Get info of changing options
    $plugin_option = get_option("w2p_plugin_option");
	
	//Get info of changing options
	$profile_user = get_option('profile_user_info');
	
	$language = explode("_", $_SESSION["current_language"]['key']);
	
	include_once "api_class/dgo_api.class.php";
	
	include_once "api_class/GroupArticle.php";

	$api = new DgoApiConnectionW2P();
	
	$api->setApiKey($profile_user['apikey']);	
		
	$api->setApiSecret($profile_user['secret']);
	
	$countryArray = $api->DoApiGetRequest('Countries/'.$language[1].'?compact', null, 'Countries:'.$language[1]);
	$countryArray = json_decode($countryArray);
	$returnCountryArray = array();
	
	if(count($countryArray->{'Value'}[0]->{'CountryTranslation'}) != 0){		
		$returnCountryArray['Value'] = array();	
		foreach($countryArray->{'Value'} as $key => $value){
			$tmp_arr = array();
			$tmp_arr['Active'] = $value->{'Active'};
			$tmp_arr['Description'] = $value->{'CountryTranslation'}[0]->{'Description'};
			$tmp_arr['LanguageToken'] = $value->{'CountryTranslation'}[0]->{'LanguageToken'};
			$tmp_arr['Name'] = $value->{'CountryTranslation'}[0]->{'Name'};
			$tmp_arr['Key'] = $value->{'Token'};		
			array_push($returnCountryArray['Value'],$tmp_arr);
		}
	}
	
	$returnCountryArray = count($returnCountryArray) != 0 ? $returnCountryArray : $countryArray;
	
	$contacting = "";
	if(isset($_SESSION['login'])){
		$contacting = $api->DoApiGetRequest('Customer/Guid/'.$_SESSION['login']['guid']);
		$contacting = json_decode($contacting);		
	}
	
	$portal = $api->DoApiGetRequest('Portal/'.$language[1], null, 'Portal:'.$language[1]);
	$portal = json_decode($portal);	

	$timezones = $api->DoApiGetRequest('TimeZones/'.$language[1], null, 'TimeZones:'.$language[1]);
	$timezones = json_decode($timezones);
	
	$currencies = $api->DoApiGetRequest('Currencies/'.$language[1], null, 'Currencies:'.$language[1]);
	$currencies = json_decode($currencies);
	$returnCurrencies = array();
	$returnCurrencies['Value'] = array();	
	foreach($currencies->{'Value'} as $key => $value){
		$tmp_arr = array();
		$tmp_arr['Active'] = $value->{'Active'};
		$tmp_arr['Description'] = $value->{'CurrencyTranslation'}[0]->{'Description'};
		$tmp_arr['LanguageToken'] = $value->{'CurrencyTranslation'}[0]->{'LanguageToken'};
		$tmp_arr['Name'] = $value->{'CurrencyTranslation'}[0]->{'Name'};
		$tmp_arr['Key'] = $value->{'Token'};		
		array_push($returnCurrencies['Value'],$tmp_arr);
	}
	
	$languages = $api->DoApiGetRequest('Languages/'.$language[1].'?compact', null, 'Languages:'.$language[1]);
	$languages = json_decode($languages);
	
	if(W2PConfig::$PortalTagString == "nhain")
		$categoryArray = $api->DoApiGetRequest('Category/'.$language[1].'/Article', null, W2PConfig::$PortalTagString.':'.$language[1]);
	else
		$categoryArray = $api->DoApiGetRequest('Category/'.$language[1].'/Article/'.W2PConfig::$PortalTagString, null, W2PConfig::$PortalTagString.':'.$language[1]);	
		
	$categoryArray = json_decode($categoryArray);
	
	if(!isset($plugin_option['ArticleName'])){
		foreach($categoryArray->{'Value'}->{'Children'} as $key => $value){
			if(is_array($value->{'Children'})){
				foreach($value->{'Children'} as $k => $v){
					$plugin_option['ArticleName'][makeFriendlyUrl($v->{'TagString'})] = $v->{'Name'};					
				}
			}			
		}
		//update to wp database
		update_option('w2p_plugin_option', $plugin_option);
	}else{
		foreach($categoryArray->{'Value'}->{'Children'} as $key => $value){
			if(is_array($value->{'Children'})){
				foreach($value->{'Children'} as $k => $v){
					if($plugin_option['ArticleName'][makeFriendlyUrl($v->{'TagString'})] != $v->{'Name'}){
						$plugin_option['ArticleName'][makeFriendlyUrl($v->{'TagString'})] = $v->{'Name'};	
					}
				}
			}			
		}
		//update to wp database
		update_option('w2p_plugin_option', $plugin_option);
	}

	//get article group from php
	$articleGroup = $api->DoApiGetRequest('ArticleGroups',$language[1],'ArticleGroups:'.$language[1]);
	
	//get available article from php
	$getArticle = $api->DoApiGetRequest('Customer/'.$profile_user['apikey'].'/ResaleUnit/'.$profile_user['resaleGuid'].'/Articles', $language[1], 'Available:'.$language[1]);
	
	$getArticle = json_decode($getArticle);
	
	$articleGroup = json_decode($articleGroup);
	
	$arr = $getArticle->{'Value'};	

	$matchCode_tmp = null;
	$ArticleArray = null;
	
	function GroupOrderArticle($valueObject, $groupName){
			$orderObjectReturn = array();
			$orderObjectGroup = array();
			
			$count = 0;
			
			for($i = 0; $i < count($valueObject); $i++){	
				if(is_array($valueObject[$i]) == false){
					$matchCode = explode("/", $valueObject[$i]->{'Matchcode'});
					
					if($matchCode[0] == $groupName){
						array_push($orderObjectGroup, $valueObject[$i]);
						$count++;
					}else{
						array_push($orderObjectReturn, $valueObject[$i]);
					}
					
				}else{
					$matchCode = explode("/", $valueObject[$i]['Matchcode']);
					
					if($matchCode[0] == $groupName){
						if(!isset($valueObject[$i]['Group'])){
							array_push($orderObjectGroup, $valueObject[$i]);
							$count++;
						}else{
							$orderObjectGroup = $valueObject[$i]['Group'];
							$count++;
						}
						
					}else{
						array_push($orderObjectReturn, $valueObject[$i]);
					}
					
				}		
			}
			
			if($count > 0){
				array_push($orderObjectReturn, array('Matchcode'  => $groupName, 
											  		 'Identifier' => $groupName, 
											  		 'Name' 	  => $groupName, 
											  		 'ArticleGroupEntry' => $groupName, 
											  		 'Group' 	  => $orderObjectGroup));
			}	
			
			return $orderObjectReturn;
		}
	
	foreach($arr as $key => $value){
		$match = explode("/",$value->{'Matchcode'});
		if($match[0] == "Crystal"){				
			$ArticleArray = GroupOrderArticle($arr, 'Crystal');
		}
	}

	for($i = 1;$i < count($arr);$i++){
		$matchCodeArr = explode("/",$arr[$i]->{'Matchcode'});
		$matchCodeArrBefore = explode("/",$arr[$i-1]->{'Matchcode'});
				
		if($matchCodeArr[0] == $matchCodeArrBefore[0]){
			if($matchCode_tmp == null || $matchCode_tmp != $matchCodeArr[0]){
				$matchCode_tmp = $matchCodeArr[0];
				if($ArticleArray == null){
					$ArticleArray = GroupOrderArticle($arr, $matchCode_tmp);
				}else{
					$ArticleArray = GroupOrderArticle($ArticleArray, $matchCode_tmp);
				}
			}
		}
	}	
	//call request to get material
	$result = $api->getMaterial('Calculate', $ArticleArray[0]->{'Matchcode'}, $ArticleArray[0]->{'Identifier'}, $ArticleArray, $language[1] ,$_SESSION["current_currency"]['key'],"",$ArticleArray[0]->{'Matchcode'}.':Material:'.$language[1],86400);
	
	$result = json_decode($result);

	//get format from php
	$formatObj = $api->getFormats('Token/'.$language[1].'/Format/PaperPrint/'.$ArticleArray[0]->{'Matchcode'},$language[1], "mm", $ArticleArray[0]->{'Offcut'}, $ArticleArray[0]->{'Matchcode'}.':Formats:'.$language[1]);

	$runInit = count($result->{'Order'}->{'Article'}[0]->{'Runs'}) > 1 ? $result->{'Order'}->{'Article'}[0]->{'Runs'}[0] : 1;
		
	$amountType = count($material->{'Order'}->{'Article'}[0]->{'Runs'}) > 1 ? 'run' : 'amount';	
		
	//get prices from php
	$pricesArr =  $api->getPrices('Calculate',$formatObj,$ArticleArray[0]->{'Matchcode'}, $ArticleArray[0]->{'Identifier'}, $ArticleArray, $result->{'Order'}->{'Article'}[0]->{'Materials'}[0]->{'Key'},$result->{'Order'}->{'Article'}[0]->{'MaxAreaToCalculate'},$language[1],$_SESSION["current_currency"]['key'],$profile_user['resaleGuid'], 1, $runInit,$amountType, $ArticleArray[0]->{'Identifier'}.':Prices:'.$result->{'Order'}->{'Article'}[0]->{'Materials'}[0]->{'Key'}.':'.$language[1]);
	
	foreach($pricesArr->{'Order'}->{'Article'} as $key => $value){
		$value->{'Identifier'} = $ArticleArray[0]->{'Identifier'};
	}

	/*Get info from wordpress database*/
	$colors = get_option("colors");
	$key = strtoupper(substr($_SESSION["current_language"]['key'],0,2));
	$endPriceUserFormat = ($profile_user['EndUserPriceFormat'] == "Net") ?  $colors['NetendpriceText'][$key]  :  $colors['GrossendpriceText'][$key] ;
	//Order Product sidebar translation
	$transOrderProduct 		= $colors['headertext'][$key] ;
	$transUploadPicture 	= $colors['button_text'][$key] ;
	//echo $colors['headertext'];
	//$transOrderProduct 		= __('OrderProduct', $l10n_prefix);
	$transArticle 			= __('Article', $l10n_prefix);	
	$transPosters 			= __('Posters', $l10n_prefix);	
	$transMaterials 		= __('Materials', $l10n_prefix);	
	$transStyles 			= __('Styles', $l10n_prefix);	
	$transOilPainting 		= __('OilPainting', $l10n_prefix);	
	$transSketchPainting 	= __('SketchPainting', $l10n_prefix);	
	$transPencilPainting 	= __('PencilPainting', $l10n_prefix);	
	$transPastelPainting 	= __('PastelPainting', $l10n_prefix);	
	//$transUploadPicture 	= __('UploadPicture', $l10n_prefix);	
	
	
	$linkToIcon = linkToPlugin;
	
	$curLangKey = (substr($_SESSION["current_language"]['key'],3,2) != "VI" ? substr($_SESSION["current_language"]['key'],3,2) : 'VI');
	$linkToFlagLang = '<div class="dropdown-img flag_'.substr($_SESSION["current_language"]['key'],3,2).'">'.'</div>';
	$curLangName = $translation->translate('Loading')."...";	
	$curCurrKey = ($_SESSION["current_currency"]['key'] != "VND" ? $_SESSION["current_currency"]['key'] : 'VND');
	$linkToFlagCurr =  '<div class="dropdown-img flag_'.($_SESSION["current_currency"]['key']).'">'.'</div>';	
	$curCurrName = ($_SESSION["current_currency"]['key'] != "VND" ? $_SESSION["current_currency"]['key'] : "VND");
	
	$curDime = $_SESSION["current_dimension"];

	if($plugin_option['header_option_show']){
		$header_display = 'block';
	}else{
		$header_display = 'none';
	}	
	$setshadow='';
	if($colors['buttontextshadow']==0){
		$setshadow='none';
	}else{
		$setshadow='1px ' .$colors['buttontextshadow'].'px 1px #ffffff;';
	}
	$setshadowheader='';
	if($colors['headertextshadow']==0){
		$setshadowheader='none';
	}else{
		$setshadowheader='1px ' .$colors['headertextshadow'].'px 1px #ffffff;';
	}
	$loading = "<img src='".linkToPlugin."css/img/icon/loading.gif'>";

	//add upload js template file
	$jsuploadtemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/dgo.upload.js.tpl');
	$jsuploadtemplate->replace_tags(array(							
									"pluginUrl" 		=> array(linkToPlugin,false),															
								  )
							);
								  
	$uploadtemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/dgo.upload.tpl');	
	$uploadtemplate->replace_tags(array(							
									"pluginUrl" 		=> array(linkToPlugin,false),								
									"dgouploadjs" 		=> array($jsuploadtemplate->getHtml(),false),							
									"PicHasLowResolution" 		=> array($translation->translate('PicHasLowResolution'),false),					
									"Readytoupload" 		=> array($translation->translate('Readytoupload'),false),					
									"Doyouwanttocanceluploadthisimage" 		=> array($translation->translate('Doyouwanttocanceluploadthisimage'),false),					
									"Saving" 		=> array($translation->translate('Saving'),false),					
									"of" 		=> array($translation->translate('of'),false),					
									"UploadComplete" 		=> array($translation->translate('UploadComplete'),false),					
									"Finished" 		=> array($translation->translate('Finished'),false),					
									"seconds" 		=> array($translation->translate('seconds'),false),					
									"minutes" 		=> array($translation->translate('minutes'),false),					
									"hours" 		=> array($translation->translate('hours'),false),					
									"days" 		=> array($translation->translate('days'),false),					
									"Yourfileswillbetransfered" 		=> array($translation->translate('Yourfileswillbetransfered'),false),							
									"Uploadingfile" 		=> array($translation->translate('Uploadingfile'),false),					
									"Remaining" 		=> array($translation->translate('Remaining'),false),					
									"Speed" 		=> array($translation->translate('Speed'),false),					
									"StopAll" 		=> array($translation->translate('StopAll'),false),					
								  )
							);

	

	//use template for js
	$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/orderproductsidebar.js.tpl');
	
	$jstemplate->replace_tags(array(
									"availableArticleArr" 	=> array(json_encode($getArticle),false),								
									"materialResult" 		=> array(json_encode($result),false),								
									"formatsResult" 		=> array(json_encode($formatObj),false),								
									"pricesResult" 		=> array(json_encode($pricesArr),false),								
									"matchcode" 		=> array(json_encode($ArticleArray[0]->{'Matchcode'}),false),								
									"ArticleGroupArray" => array(json_encode($articleGroup->{'Value'}),false),																
									"categoryArray" => array(json_encode($categoryArray->{'Value'}->{'Children'}),false),																
									"countryArray" => array(json_encode($returnCountryArray),false),																
									"contacting" => array(contacting == "" ? contacting : json_encode($contacting),false),																
									"portal" => array(json_encode($portal),false),																
									"timezones" => array(json_encode($timezones),false),																
									"currencies" => array(json_encode($returnCurrencies),false),
									"maskPictureThumbs"	=> array(json_encode($maskPictureThumbs),false),															
									"languages" => array(json_encode($languages),false),																
									"maskArray" => array(json_encode($mask_array_return),false),																
								  )
							);
							
	$script = $jstemplate->getHtml();
	
	//open the order product sidebar template
	$sidebarTemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/orderproductsidebar.tpl');
	
	$sidebarTemplate->replace_tags(array(
											"scriptPlaceHolder" => array( $script ,false),
											"header_display" => array( $header_display ,false),
											"color1" => array( $colors[1] ,false),										
											"color2" => array( $colors[2] ,false),										
											"color3" => array( $colors[3] ,false),										
											"color4" => array( $colors[4] ,false),										
											"color5" => array( $colors[5] ,false),										
											"color6" => array( $colors[6] ,false),										
											"color7" => array( $colors[7] ,false),
											"color8" => array( $colors[8] ,false),
											"color9" => array( $colors[9] ,false),
											"color10" => array( $colors[10] ,false),
											"color11" => array( $colors[11] ,false),
											"color12" => array( $colors[12] ,false),										
											"radiusless" => array( $radiusless ,false),										
											"radius" => array( $radius ,false),
											"text_shadow"=>array($setshadow,false),
											"text_header_shadow"=>array($setshadowheader,false),
											"transOrderProduct" => array( $transOrderProduct ,false),												
											"transArticle" => array( $transArticle ,false),												
											"transPosters" => array( $transPosters ,false),												
											"transMaterials" => array( $transMaterials ,false),												
											"transStyles" => array( $transStyles ,false),												
											"transOilPainting" => array( $transOilPainting ,false),												
											"transSketchPainting" => array( $transSketchPainting ,false),												
											"transPencilPainting" => array( $transPencilPainting ,false),												
											"transPastelPainting" => array( $transPastelPainting ,false),												
											"transUploadPicture" => array( $transUploadPicture ,false),
											"transLoading" 	=> array($translation->translate('Loading'),false),												
											"linkToIcon" => array( $linkToIcon ,false),												
											"linkToFlagLang" => array( $linkToFlagLang ,false),												
											"linkToFlagCurr" => array( $linkToFlagCurr ,false),												
											"curLangKey" => array( $curLangKey ,false),												
											"curLangName" => array( $curLangName ,false),												
											"curCurrKey" => array( $curCurrKey ,false),												
											"curCurrName" => array( $curCurrName ,false),												
											"curDime" => array( $curDime ,false),												
											"loading" => array( $loading ,false),
											"transLoading" => array( $translation->translate('Loading') ,false),
											"transEndUserPriceFormat" 	=> array( $endPriceUserFormat ,false),												
											"dgouploadtemplate" 	=> array( $uploadtemplate->getHtml() ,false),												
										  )
									);
								
	echo $sidebarTemplate->getHtml();
	?>