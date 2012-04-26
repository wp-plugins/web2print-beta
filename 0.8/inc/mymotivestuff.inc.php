<?php
/*
 * function to create my products page
 * 
 * Peter / Dao Hung Cuong
 * 
 */

	add_shortcode('mymotivesplaceholder', 'dgoReplaceMyMotivesPlaceholder');
	//function fill data
	function dgoReplaceMyMotivesPlaceholder($data){		
		
		$page = get_post(get_option('myMotivesPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
		
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}

		//Get info of changing options
		$profile_user = get_option('profile_user_info');
		
		include_once('translation.class.php');			
		$translation = new Web_2_print_Translation('web2print');
		
		include_once "api_class/dgo_api.class.php";	
		include_once "api_class/GroupArticle.php";
	
		$api = new DgoApiConnectionW2P();		
		$api->setApiKey($profile_user['apikey']);				
		$api->setApiSecret($profile_user['secret']);
		
		$language = explode("_", $_SESSION["current_language"]['key']);
		
		$portal = W2PConfig::$globalIsDev == "true" ? "portal.dev" : "portal";
		
		//get available article from php
		$getArticle = $api->DoApiGetRequest('Customer/'.$profile_user['apikey'].'/ResaleUnit/'.$profile_user['resaleGuid'].'/Articles', $language[1], 'Available:'.$language[1]);		
		$getArticle = json_decode($getArticle);
		$getArticle = $getArticle->{'Value'};
		//get resaleUnits
		$resaleUnits = $api->DoApiGetRequest('Customer/'.$profile_user['apikey'].'/ResaleUnits', null, 'ResaleUnitShop:'.$profile_user['apikey']);
		$resaleUnits = json_decode($resaleUnits);
		$resaleUnits = $resaleUnits->{'Value'};
		
		//get language
		$languages = $api->DoApiGetRequest('Languages/'.$language[1].'?compact', null, 'Languages:'.$language[1]);
		$languages = json_decode($languages);

		$htmlLanguage = '';		
		foreach($languages->{'Value'} as $key => $value){		
			$selectedLanguage = '';
			if($value->{'Key'} == 'VI' || $value->{'Key'} == 'EN' || $value->{'Key'} == 'DE'){
				if($value->{'Key'} == $language[1]){
					$selectedLanguage = "selected='selected'";
				}
				
				$htmlLanguage .= "<option value = '".$value->{'Key'}."' ".$selectedLanguage.">".$value->{'Name'}."</option>";
			}		
		}
		
		//get article group from php
		$portalArray =  $api->DoApiRequest('api/Portal/'.$language[1]);
		$portalArray =  json_decode($portalArray);
		//get motif sharing
		$motifSharing = $api->DoApiGetRequest("Token/".$language[1]."/Status/MotifSharing", null, 'MotifSharing:'.$language[1].W2PConfig::$PortalTagString);		
		$motifSharing = json_decode($motifSharing);
		//get motif evaluation
		$motifEvaluation = $api->DoApiGetRequest("Token/".$language[1]."/Status/MotifEvaluation", null, 'MotifEvaluation:'.$language[1].W2PConfig::$PortalTagString);		
		$motifEvaluation = json_decode($motifEvaluation);
		//get all motif
		$thumbsArray = $api->GetThumbnailsFromUser('Upload', $language[1], 'VND', $portalArray->{'Value'}->{'Info'}->{'Guid'}, 'Customer/'.$_SESSION['login']['guid'].'/Thumbnail', 'https://api.delivergo.com/'.$portal.'/normprint/api/');		
		$thumbsArray = json_decode($thumbsArray);
		$thumbsArray = $thumbsArray->{'Value'};
		
		$motifCategory = $api->DoApiGetRequest("Categories/".$language[1]."/User/MotifCategories", null, 'MotifCategories:'.$language[1].$portal, 'https://api.delivergo.com/'.$portal.'/normprint/api/');		
		$motifCategory = json_decode($motifCategory);
		$motifCategory = $motifCategory->{'Value'};
		
		$motifAgeRating = $api->DoApiGetRequest("Token/".$language[1]."/Customer/AgeRating", null, 'MotifAgeRating:'.$language[1].$portal, 'https://api.delivergo.com/'.$portal.'/normprint/api/');		
		$motifAgeRating = json_decode($motifAgeRating);
		$motifAgeRating = $motifAgeRating->{'Value'};

		$motivesHtml = '';
		
		$paginatorLimit = 3;
		$totalPage = 0;
		
		if(count($thumbsArray) > 0){
			//current page			
			$currentPage = 1;
			//total items
			$totalItems = count($thumbsArray);
			//number of items per page 
			$itemsPerPage = count($thumbsArray) < 10 ? count($thumbsArray) : 10;
			//total number of pages
			
			if($totalItems % $itemsPerPage == 0){
				$pageNumber = round($totalItems / $itemsPerPage);
			}else{
				$pageNumber = (($totalItems / $itemsPerPage) - ($totalItems % $itemsPerPage)/10) + 1;
			}
			
			$lastCurrentPage  = $totalPage = $pageNumber;
			$beginCurrentPage = 1;
			
			//page start
			$pageStart = ($currentPage - 1) * $itemsPerPage;
			//page end
			$pageEnd = $currentPage * $itemsPerPage;
			//paginatorLimit
						
			$pagePerTotal = '1/'.$pageNumber;
			
			$paginator = '';
			$display = 'none';
			
			if($pageNumber > 1){
				$display = 'block';
				$paginator .= '<div class="paginator-next">'.$translation->translate('Next').'</div>';			
				
				if($pageNumber > $paginatorLimit){
					$lastCurrentPage = $pageNumber = $paginatorLimit;
					$paginator .= '<div class="paginator-more">...</div>'; 
				}
				
				for($i = $pageNumber;$i >= 1;$i--){
					if($i == 1)
						$paginator .= '<div class="paginator-number paginator-selected">'.$i.'</div>';
					else
						$paginator .= '<div class="paginator-number">'.$i.'</div>'; 	
				}				
				
				$paginator .= '<div class="paginator-prev">'.$translation->translate('Previous').'</div>';
			}
						
			for($i = $pageStart;$i <= $pageEnd;$i++){		
				
				$descriptionHtml = '';
				if($i == 0){			
					$motivesHtml .= '<div class="myproduct-header-element" id="myproduct-'.$i.'">';
					$motivesHtml .= '<div class="header-element-head"><div class="head-column-left">'.$translation->translate('Thumbnail').'</div><div class="head-column-center">'.$translation->translate('Details').'</div><div class="head-column-right">'.$translation->translate('Action').'</div></div>';
					$motivesHtml .= '<div class="header-element-content"><div class="content-column-left">';
					$motivesHtml .= '<div class="column-left-picture"><img src=""></div>';
					$motivesHtml .= '<div class="column-left-productID">ID: M'.Helper::base_dec2base($thumbsArray[$i]->{'Id'}, 62).'</div>';
					$motivesHtml .= '<div class="column-left-active"><div class="column-left-active-checkbox"><input type="checkbox" '.($thumbsArray[$i]->{'Active'} == 1 ? 'checked="checked"' : '').' class="active-checker"></div><div class="column-left-active-text">'.$translation->translate('Active').'</div></div></div>';
					$motivesHtml .= '<div class="content-column-center">';
					
					if(isset($thumbsArray[$i]->{'ThumbnailTranslation'})){
						for($j = 0; $j < count($thumbsArray[$i]->{'ThumbnailTranslation'});$j++){
							$value = $thumbsArray[$i]->{'ThumbnailTranslation'}[$j];
							if($value->{'LanguageToken'} == $language[1]){
								$motivesHtml .= '<div><span>'.$translation->translate('Name').':</span> <span class="center-info-name">'.$value->{'Name'}.'</span></div>';
								$descriptionHtml .= '<div><span>'.$translation->translate('Description').':</span> <span class="center-info-des">'.$value->{'Description'}.'</span></div>';
								break;
							}else if($j == count($thumbsArray[$i]->{'ThumbnailTranslation'}) - 1){
								$motivesHtml .= '<div><span>'.$translation->translate('Name').':</span> <span class="center-info-name">'.$value->{'Name'}.'</span></div>';
								$descriptionHtml .= '<div><span>'.$translation->translate('Description').':</span> <span class="center-info-des">'.$value->{'Description'}.'</span></div>';
							}
						}
					}else{
						$motivesHtml .= '<div><span>'.$translation->translate('Name').':</span> <span class="center-info-name">...</span></div>';	
						$motivesHtml .= '<div><span>'.$translation->translate('Description').':</span> <span class="center-info-des">...</span></div>';	
					}
					
					$motivesHtml .= $descriptionHtml;
					
					if(isset($thumbsArray[$i]->{'ThumbnailSetting'})){
						$motivesHtml .= '<div><span>'.$translation->translate('Keywords').':</span> <span class="center-info-keyword">';
						foreach($thumbsArray[$i]->{'ThumbnailSetting'} as $key => $value){
							if($value->{'Key'} == 'Api.Metadata.Keyword.'.$language[1]){
								$motivesHtml .= $value->{'Value'}.', ';
							}							
						}
						$motivesHtml .= '</span></div>';
						
					}else{
						$motivesHtml .= '<div><span>'.$translation->translate('Keywords').':</span> <span class="center-info-keyword">...</span></div>';
					}
					
					$motivesHtml .= '<div class="center-info-prices"><div class="center-info-prices-left">';					
					
					//$motivesHtml .= '<div><span>'.$translation->translate('Shops').':</span> <span class="center-info-article-name">...</span></div></div>';
					$motivesHtml .= '</div>';
					$motivesHtml .= '<div class="center-info-prices-right">';
					$motivesHtml .= '<div><span>'.$translation->translate('SalesPrices').':</span> <span class="center-info-article-name">...</span></div></div></div>';
					$motivesHtml .= '<div class="center-info-others"><div class="center-info-others-left">';
					
					if(isset($thumbsArray[$i]->{'ThumbnailSetting'})){
						foreach($thumbsArray[$i]->{'ThumbnailSetting'} as $key => $value){
							if($value->{'Key'} == 'Api.Metadata.Visibility'){
								for($j = 0;$j < count($motifSharing->{'Value'}->{'ChildTokens'});$j++){
									if($value->{'Value'} == $motifSharing->{'Value'}->{'ChildTokens'}[$j]->{'Token'}){
										$motivesHtml .= '<div><span>'.$translation->translate('Sharing').':</span> <span class="center-info-article-sharing" title="'.$motifSharing->{'Value'}->{'ChildTokens'}[$j]->{'SystemTokenTranslation'}[0]->{'Name'}.'">'.$motifSharing->{'Value'}->{'ChildTokens'}[$j]->{'SystemTokenTranslation'}[0]->{'Name'}.'</span></div>';										
									}									
								}
								break;
							}else if($key == count($thumbsArray[$i]->{'ThumbnailSetting'}) - 1){
								$motivesHtml .= '<div><span>'.$translation->translate('Sharing').':</span> <span class="center-info-article-sharing">...</span></div>';
							}							
						}
					}else{
						$motivesHtml .= '<div><span>'.$translation->translate('Sharing').':</span> <span class="center-info-article-sharing">...</span></div>';
					}
					
					$motivesHtml .= '<div><span>'.$translation->translate('Created').':</span> <span class="center-info-article-created" title="'.Helper::ParseRFCDate($thumbsArray[$i]->{'Created'}).'">'.Helper::ParseRFCDate($thumbsArray[$i]->{'Created'}).'</span></div>';
					
					
					$motivesHtml .= '</div>';
					$motivesHtml .= '<div class="center-info-others-right">';
					
					if(isset($thumbsArray[$i]->{'ThumbnailSetting'})){
						foreach($thumbsArray[$i]->{'ThumbnailSetting'} as $key => $value){
							if($value->{'Key'} == 'Api.Metadata.ReviewState'){
								$motivesHtml .= '<div><span>'.$translation->translate('Status').':</span> <span class="center-info-article-status" title="'.$value->{'Value'}.'">'.$value->{'Value'}.'</span></div>';
								break;
							}else if($key == count($thumbsArray[$i]->{'ThumbnailSetting'}) - 1){
								$motivesHtml .= '<div><span>'.$translation->translate('Status').':</span> <span class="center-info-article-status">...</span></div>';
							}							
						}
					}else{
						$motivesHtml .= '<div><span>'.$translation->translate('Status').':</span> <span class="center-info-article-status">...</span></div>';
					}
					
					if(isset($thumbsArray[$i]->{'Modified'})){
						$motivesHtml .= '<div><span>'.$translation->translate('LastChange').':</span> <span class="center-info-article-last" title="'.Helper::ParseRFCDate($thumbsArray[$i]->{'Modified'}).'">'.Helper::ParseRFCDate($thumbsArray[$i]->{'Modified'}).'</span></div>';	
					}else{
						$motivesHtml .= '<div><span>'.$translation->translate('LastChange').':</span> <span class="center-info-article-last">...</span></div>';
					}
									
					$motivesHtml .= '</div></div></div>';
					$motivesHtml .= '<div class="content-column-right">';
					$motivesHtml .= '<div class="column-right-editdetails">'.$translation->translate('Edit').'<input type="hidden" value="'.$i.'" class="thumb-id"></div>';
					$motivesHtml .= '<div class="column-right-ordernow">'.$translation->translate('Order').'</div></div></div></div>';	
					
				}else{
					$motivesHtml .= '<div class="myproduct-header-element" id="myproduct-'.$i.'">';
					$motivesHtml .= '<div class="header-element-content"><div class="content-column-left">';
					$motivesHtml .= '<div class="column-left-picture"><img src=""></div>';
					$motivesHtml .= '<div class="column-left-productID">ID: M'.Helper::base_dec2base($thumbsArray[$i]->{'Id'}, 62).'</div>';
					$motivesHtml .= '<div class="column-left-active"><div class="column-left-active-checkbox"><input type="checkbox" '.($thumbsArray[$i]->{'Active'} == 1 ? 'checked="checked"' : '').' class="active-checker"></div><div class="column-left-active-text">'.$translation->translate('Active').'</div></div></div>';
					$motivesHtml .= '<div class="content-column-center">';
					
					if(isset($thumbsArray[$i]->{'ThumbnailTranslation'})){
						for($j = 0; $j < count($thumbsArray[$i]->{'ThumbnailTranslation'});$j++){
							$value = $thumbsArray[$i]->{'ThumbnailTranslation'}[$j];
							if($value->{'LanguageToken'} == $language[1]){
								$motivesHtml .= '<div><span>'.$translation->translate('Name').':</span> <span class="center-info-name">'.$value->{'Name'}.'</span></div>';
								$descriptionHtml .= '<div><span>'.$translation->translate('Description').':</span> <span class="center-info-des">'.$value->{'Description'}.'</span></div>';
								break;
							}else if($j == count($thumbsArray[$i]->{'ThumbnailTranslation'}) - 1){
								$motivesHtml .= '<div><span>'.$translation->translate('Name').':</span> <span class="center-info-name">'.$value->{'Name'}.'</span></div>';
								$descriptionHtml .= '<div><span>'.$translation->translate('Description').':</span> <span class="center-info-des">'.$value->{'Description'}.'</span></div>';
							}
						}
					}else{
						$motivesHtml .= '<div><span>'.$translation->translate('Name').':</span> <span class="center-info-name">...</span></div>';
						$motivesHtml .= '<div><span>'.$translation->translate('Description').':</span> <span class="center-info-des">...</span></div>';	
					}
					
					$motivesHtml .= $descriptionHtml;
					
					if(isset($thumbsArray[$i]->{'ThumbnailSetting'})){
						$motivesHtml .= '<div><span>'.$translation->translate('Keywords').':</span> <span class="center-info-keyword">';
						foreach($thumbsArray[$i]->{'ThumbnailSetting'} as $key => $value){
							if($value->{'Key'} == 'Api.Metadata.Keyword.'.$language[1]){
								$motivesHtml .= $value->{'Value'}.', ';
							}							
						}
						$motivesHtml .= '</span></div>';
						
					}else{
						$motivesHtml .= '<div><span>'.$translation->translate('Keywords').':</span> <span class="center-info-keyword">...</span></div>';
					}
					
					$motivesHtml .= '<div class="center-info-prices"><div class="center-info-prices-left">';					
					
					//$motivesHtml .= '<div><span>'.$translation->translate('Shops').':</span> <span class="center-info-article-name">...</span></div></div>';
					$motivesHtml .= '</div>';
					$motivesHtml .= '<div class="center-info-prices-right">';
					$motivesHtml .= '<div><span>'.$translation->translate('SalesPrices').':</span> <span class="center-info-article-name">...</span></div></div></div>';
					$motivesHtml .= '<div class="center-info-others"><div class="center-info-others-left">';
					
					if(isset($thumbsArray[$i]->{'ThumbnailSetting'})){
						foreach($thumbsArray[$i]->{'ThumbnailSetting'} as $key => $value){
							if($value->{'Key'} == 'Api.Metadata.Visibility'){
								for($j = 0;$j < count($motifSharing->{'Value'}->{'ChildTokens'});$j++){
									if($value->{'Value'} == $motifSharing->{'Value'}->{'ChildTokens'}[$j]->{'Token'}){
										$motivesHtml .= '<div><span>'.$translation->translate('Sharing').':</span> <span class="center-info-article-sharing" title="'.$motifSharing->{'Value'}->{'ChildTokens'}[$j]->{'SystemTokenTranslation'}[0]->{'Name'}.'">'.$motifSharing->{'Value'}->{'ChildTokens'}[$j]->{'SystemTokenTranslation'}[0]->{'Name'}.'</span></div>';										
									}									
								}	
								break;								
							}else if($key == count($thumbsArray[$i]->{'ThumbnailSetting'}) - 1){
								$motivesHtml .= '<div><span>'.$translation->translate('Sharing').':</span> <span class="center-info-article-sharing">...</span></div>';
							}							
						}
					}else{
						$motivesHtml .= '<div><span>'.$translation->translate('Sharing').':</span> <span class="center-info-article-sharing">...</span></div>';
					}
					
					$motivesHtml .= '<div><span>'.$translation->translate('Created').':</span> <span class="center-info-article-created" title="'.Helper::ParseRFCDate($thumbsArray[$i]->{'Created'}).'">'.Helper::ParseRFCDate($thumbsArray[$i]->{'Created'}).'</span></div>';
					
					
					$motivesHtml .= '</div>';
					$motivesHtml .= '<div class="center-info-others-right">';
					
					if(isset($thumbsArray[$i]->{'ThumbnailSetting'})){
						foreach($thumbsArray[$i]->{'ThumbnailSetting'} as $key => $value){
							if($value->{'Key'} == 'Api.Metadata.ReviewState'){
								$motivesHtml .= '<div><span>'.$translation->translate('Status').':</span> <span class="center-info-article-status" title="'.$value->{'Value'}.'">'.$value->{'Value'}.'</span></div>';
								break;
							}else if($key == count($thumbsArray[$i]->{'ThumbnailSetting'}) - 1){
								$motivesHtml .= '<div><span>'.$translation->translate('Status').':</span> <span class="center-info-article-status">...</span></div>';
							}							
						}
					}else{
						$motivesHtml .= '<div><span>'.$translation->translate('Status').':</span> <span class="center-info-article-status">...</span></div>';
					}
					
					if(isset($thumbsArray[$i]->{'Modified'})){
						$motivesHtml .= '<div><span>'.$translation->translate('LastChange').':</span> <span class="center-info-article-last" title="'.Helper::ParseRFCDate($thumbsArray[$i]->{'Modified'}).'">'.Helper::ParseRFCDate($thumbsArray[$i]->{'Modified'}).'</span></div>';	
					}else{
						$motivesHtml .= '<div><span>'.$translation->translate('LastChange').':</span> <span class="center-info-article-last">...</span></div>';
					}
					
					$motivesHtml .= '</div></div></div>';
					$motivesHtml .= '<div class="content-column-right">';
					$motivesHtml .= '<div class="column-right-editdetails">'.$translation->translate('Edit').'<input type="hidden" value="'.$i.'" class="thumb-id"></div>';
					$motivesHtml .= '<div class="column-right-ordernow">'.$translation->translate('Order').'</div></div></div></div>';	
					
				}
			}
		}else{
			$motivesHtml = '<div class="myproduct-header-content"><div class="myproduct-header-element" id="myproduct-1"><div class="header-element-head"><div class="head-column-left">'.$translation->translate('Thumbnail').'</div><div class="head-column-center">'.$translation->translate('Details').'</div><div class="head-column-right">'.$translation->translate('Action').'</div></div><div class="header-element-content" style="text-align:center">You don\'t have any motives yet.</div></div></div>';
		}
		
		$motifSharingHtml = '';
		
		for($i = 0;$i < count($motifSharing->{'Value'}->{'ChildTokens'});$i++){
			$motifSharingHtml .= '<div class="popup-share-box-ele motif-sharing-item" title="'.$motifSharing->{'Value'}->{'ChildTokens'}[$i]->{'SystemTokenTranslation'}[0]->{'Name'}.'">';
			$motifSharingHtml .= '<div class="share-box-ele-input"><input type="radio" name="shareinput" class="shareinput" value="'.$motifSharing->{'Value'}->{'ChildTokens'}[$i]->{'Token'}.'"></div>';
			$motifSharingHtml .= '<div class="share-box-ele-text">'.$motifSharing->{'Value'}->{'ChildTokens'}[$i]->{'SystemTokenTranslation'}[0]->{'Name'}.'</div>';
			$motifSharingHtml .= '</div>';
		}
		
		$resaleUnitsHtml = '';
		
		for($i = 0;$i < count($resaleUnits);$i++){
			$resaleUnitsHtml .= '<div class="popup-salesunit-box-ele">';
			$resaleUnitsHtml .= '<div class="salesunit-box-ele-input"><input class="input-salesunit" type="checkbox" name="salesunit" value="'.$resaleUnits[$i]->{'Id'}.'"></div>';
			$resaleUnitsHtml .= '<div class="salesunit-box-ele-text">'.$resaleUnits[$i]->{'ResaleUnitTranslation'}[0]->{'Name'}.'</div>';
			$resaleUnitsHtml .= '</div>';
		}		
				 
		$motifEvaluationHtml .= '<select class="popup-status-select">';
		for($i = 0;$i < count($motifEvaluation->{'Value'}->{'ChildTokens'});$i++){
			$motifEvaluationHtml .= '<option value="'.$motifEvaluation->{'Value'}->{'ChildTokens'}[$i]->{'Token'}.'">'.$motifEvaluation->{'Value'}->{'ChildTokens'}[$i]->{'SystemTokenTranslation'}[0]->{'Name'}.'</option>';
		}		
		$motifEvaluationHtml .= '</select>';
		
		$addCategoriesHtml = '';
		
		if(is_array($motifCategory->{'ChildCategories'})){
			foreach($motifCategory->{'ChildCategories'} as $key => $value){
				$addCategoriesHtml .= '<div class="popup-add-category-ele" title="'.$value->{'CategoryTranslation'}[0]->{'Name'}.'">';
				$addCategoriesHtml .= '<div class="category-ele-checkbox"><input type="checkbox" class="category-checkbox-value" name="category-checkbox-value" value="'.$value->{'Id'}.'"></div>';			
				$addCategoriesHtml .= '<div class="category-ele-label">'.$value->{'CategoryTranslation'}[0]->{'Name'}.'</div>';
				$addCategoriesHtml .= '</div>';
			}
		}
		
		$motifAgeRatingHtml = '';
		if(is_array($motifAgeRating->{'ChildTokens'})){
			foreach($motifAgeRating->{'ChildTokens'} as $key => $value){
				$motifAgeRatingHtml .= '<div class="popup-share-box-ele moitf-age-rating" title="'.$value->{'SystemTokenTranslation'}[0]->{'Name'}.'">';
				$motifAgeRatingHtml .= '<div class="share-box-ele-input"><input type="radio" class="contentinput" name="contentinput" value="'.$value->{'Id'}.'"></div>';			
				$motifAgeRatingHtml .= '<div class="share-box-ele-text">'.$value->{'SystemTokenTranslation'}[0]->{'Name'}.'</div>';
				$motifAgeRatingHtml .= '</div>';
			}
		}
		
		$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/mymotivespage.js.tpl');
				
		$jstemplate->replace_tags(array(										
										"guidUser" => array($_SESSION['login']['guid'], false),
										"thumbsarray" => array(json_encode($thumbsArray), false),
										"motifSharing" => array(json_encode($motifSharing->{'Value'}), false),
										"motifEvaluation" => array(json_encode($motifEvaluation->{'Value'}), false),
										"motifAgeRating" => array(json_encode($motifAgeRating), false),
										"motifCategory" => array(json_encode($motifCategory), false),
										"resaleUnits" => array(json_encode($resaleUnits), false),
										"paginatorLimit" => array($paginatorLimit, false),
										"lastCurrentPage" => array($lastCurrentPage, false),
										"beginCurrentPage" => array($beginCurrentPage, false),
										"pageNumber" => array($totalPage, false),
									 )
								);
		
		$script = $jstemplate->getHtml();
				   
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/mymotivespage.tpl');
		$template->replace_tags(array(
										"scriptPlaceHolder" => array($script,false),
										"pluginUrl" => array(linkToPlugin,false),										
										"transEditDetails" => array($translation->translate('Edit'),false),										
										"contentHtml" => array($motivesHtml,false),										
										"motifSharingHtml" => array($motifSharingHtml,false),										
										"motifEvaluationHtml" => array($motifEvaluationHtml,false),										
										"motifAgeRatingHtml" => array($motifAgeRatingHtml,false),										
										"resaleUnitsHtml" => array($resaleUnitsHtml,false),
										"addCategoriesHtml" => array($addCategoriesHtml, false),
										"htmlLanguage" => array($htmlLanguage, false),
										"paginator" => array($paginator,false),										
										"display" => array($display,false),										
										"transDelete" => array($translation->translate('Delete'),false),										
										"transSave" => array($translation->translate('Save'),false),										
										"transCancel" => array($translation->translate('Cancel'),false),										
										"transStatus" => array($translation->translate('Status'),false),										
										"transShare" => array($translation->translate('Sharing'),false),										
										"transAdd" => array($translation->translate('Add'),false),										
										"transContent" => array($translation->translate('AVS'),false),
										"edit" => array($translation->translate('Edit'),false),
										"motiv" => array($translation->translate('Motiv'),false),
										"AddNewMotive" => array($translation->translate('AddNewMotive'),false),
										"transIUnderstandAcceptTC" => array($translation->translate('IUnderstandAcceptTC'),false),
										"transYourCurrentCommissions" => array($translation->translate('YourCurrentCommissions'),false),
										"transMotivePrice" => array($translation->translate('MotivePrice'),false),
										"transFormat" => array($translation->translate('Format'),false),
										"transLevel" => array($translation->translate('Level'),false),
										"transTransparentBG" => array($translation->translate('TransparentBG'),false),
										"transType" => array($translation->translate('Type'),false),
										"transCreator" => array($translation->translate('Creator'),false),
										"transAddName" => array($translation->translate('AddName'),false),
										"transAddDescription" => array($translation->translate('AddDescription'),false),
										"transAddKeywords" => array($translation->translate('AddKeywords'),false),
										"transAddCategories" => array($translation->translate('AddCategories'),false),
										"transPage" => array($translation->translate('Pages'),false),
										"pagePerTotal" => array($pagePerTotal,false),
										"transMotiveCanBeEditedByOtherUsers" => array($translation->translate('MotiveCanBeEditedByOtherUsers'),false),
										"metaTag" => array($postTitle,false),										
										"blogName" => array(get_bloginfo(),false),											
									 )
								);
		
		//get the html code of the control
		echo $html = $template->getHtml();		
	}
	
	//function create address book page
	function createMyMotivesPage(){
		//If hasn't any page with name: My Products, inserting a page with this name
		$myMotivesPage = get_page_by_title('My Motives / Medias');
		
		if(!$myMotivesPage){			
			//insert new post
			$myMotivesData['post_title'] 		= 'My Motives / Medias';
			$myMotivesData['post_content'] 		= "[mymotivesplaceholder]";
	        $myMotivesData['post_status'] 		= 'publish';
	        $myMotivesData['comment_status'] 	= 'closed';
	        $myMotivesData['ping_status'] 		= 'closed';
	        $myMotivesData['post_type'] 		= 'page';

			//insert post
			$myMotivesID = wp_insert_post($myMotivesData);
			//using add_option to mark it
	        delete_option('myMotivesPageID');
	        add_option('myMotivesPageID', $myMotivesID);
			//using add_option to remember the title of page 
            delete_option('myMotivesPageTitle');
            add_option('myMotivesPageTitle', $myMotivesData['post_title']);         
        
		}
	}
?>