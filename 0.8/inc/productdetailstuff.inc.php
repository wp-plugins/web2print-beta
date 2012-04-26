<?php
/*
 * function to create Product details page
 * 
 * @Peter
 * 
 */
	//remove_filter ('the_content', 'wpautop');
	//add_filter('the_content', 'dgoReplaceProductDetailsPlaceholder',100);	
	add_shortcode('productdetailsplaceholder', 'dgoReplaceProductDetailsPlaceholder');		
	//function fill data
	function dgoReplaceProductDetailsPlaceholder($data){
		$page = get_post(get_option('productdetailsPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
		
		/*
		 * Designer controls
		 * */
		//include our controlscript
		require_once 'dgoControls/ctrlstate.php'; //needed for every other control
		require_once 'dgoControls/ctrldesigner.php';
		require_once 'dgoControls/ctrllist.php';
		require_once 'dgoControls/ctrltreeview.php';
		require_once 'dgoControls/ctrlimagecontrols.php';
		require_once 'dgoControls/ctrldesignercontrols.php';
		
		//initialize some important values
		$portalId 			= "200330c8-0476-11e0-a9e0-400bdfd72085"; //guid of your portal
		$contentItemId 		= 'b8d52c95-5c7d-4b55-a3a3-e27f0851187d'; //if needed, guid of the selected template (normally just needed for designer control
		$userLanguage 		= "DE"; //current user language
		$filterForUser 		= "false"; //do you want to show only the templates of the current user?
		$searchQuery 		= "null"; //searchquery, to show search results
		$userName 			= "slierka1986"; //current users name
		$userGuid 			= "e974c3b9-5aeb-4ef8-8d91-8a6faab86813"; //current users guid
		$itemsPerPageCount 	= 10000; //how many items should be shown per page?
		$startPage 			= 0; //which page should be shown initially?

		$userinfo = '{ 
			"Guid": "'.$userGuid.'", 
			"Name": "'.$userName.'" 
		}'; //complete needed user info
		
		//you can find all enums in file dgoControl/inc/enumclasses.php
		$filter = '{ 
			"LanguageToken": 		"'.$userLanguage.'",
			"RequireActive": 		true,
			"ItemsPerPage": 		'.$itemsPerPageCount.',
			"PageNumber": 			'.$startPage.',
			"ApprovalState": 		"'.EnumApprovalState::Approved.'",
			"FilterForUser": 		'.$filterForUser.',
			"PortalId": 			"'.$portalId.'",
			"PreviewSize": 			"'.EnumPreviewSize::Small.'",
			"SearchQuery": 			'.$searchQuery.',
			"SortCriteria": 		"'.EnumSortCriteria::Newest.'",
			"TemplateGroupToken": 	null,
			"User": 				'.$userinfo.'
		}'; //the complete filter json object
		
		//create new control objects
		$stateControl 				= new DgoStateControl(); //state control
		$designerControl 			= new DgoContentDesigner(); //designer control
		$contentItemListControl 	= new DgoContentItemList(); //list control
		$treeControl				= new DgoContentCategory(); //tree control
		$imageControl				= new DgoImageControls(); //image upload controls
		
		//initialize some important properties
		//state control properties
		$stateControl->setContentItemGuid($contentItemId);
		$stateControl->setLanguageToken($userLanguage);
		$stateControl->setPortalId($portalId);
		$stateControl->setUserInfo($userinfo);
		$stateControl->setAjaxProxy(linkToPlugin.'inc/dgoControls/inc/ajaxproxy.php');
		
		//designer control properties
		$designerControl->setDesignerPlaceholderId('MyDesignerPlaceHolder'); //important, you can use this id to style something with css
		$designerControl->setBShowControls(true);
		
		//list control properties
		$contentItemListControl->setContentItemListPlaceholderId('wohoooooContentItems'); //important, you can use this id to style something with css
		$contentItemListControl->setTemplatesPlaceHolderId('wohoooooTemplates'); //important, you can use this id to style something with css
		$contentItemListControl->setGetPermaLink('getPermaLink');
		$contentItemListControl->setControlLoaded('controlLoaded');
		$contentItemListControl->setFilter($filter);
		$contentItemListControl->setDetailLevel(EnumDetailLevel::NoDetails); //you can find all enums in file dgoControl/inc/enumclasses.php
		$contentItemListControl->setShowPager("false");
		$contentItemListControl->setShowFilter("false");
		
		//tree control properties
		$treeControl->setTreeplaceHolder('treeviewcontrol');
		$treeControl->setListplaceHolder('wohoooooContentItems');
		$treeControl->setTemplatesplaceHolder('wohoooooTemplates');
		$treeControl->setControlMode(CategoryControlMode::Treeview);
		
		$imageControl->setImageControlsId('imagecontrols');
		$imageControl->setUploadSessionId('e974c3b9-5aeb-4ef8-8d91-8a6faab86813');
		//================================================================================================//
		
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}

		if(isset($_POST)){
			$identifer = $_POST['articleIdentifer'];			
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
			
		$translation 				= new Web_2_print_Translation('web2print');	
		
		//add new rule for rewrite url. e.g: photo_cug#cup-1999-0_40x40mm-1_Run
	    //add_rewrite_rule($translation->translate('Keyword_products').'_(.*)$', 'index.php?pagename='.$arrPro[count($arrPro)-1],'top');
		add_rewrite_rule('(anh|photo|foto)_(.*)$', 'index.php?pagename='.$arrPro[count($arrPro)-1],'top');
	    add_rewrite_rule('design_(.*)$', 'index.php?pagename='.$arrDesignDetails[count($arrDesignDetails)-1],'top');
		add_rewrite_rule('register$', 'index.php','top');
   		add_rewrite_rule('login$', 'index.php','top');
	    
	    //Remove rewrite rules and then recreate rewrite rules.
	    flush_rewrite_rules(false);
		//end-----------------------------------------------------------
		
		$globallanguage = explode("_",$_SESSION["current_language"]['key']);
		
		//Get info of changing options
		$plugin_option = get_option("w2p_plugin_option");
		
		/*Get info from wordpress database*/
		$profile_user = get_option('profile_user_info');
		
		
		include_once "api_class/dgo_api.class.php";
		include_once "api_class/GroupArticle.php";
		
		$api = new DgoApiConnectionW2P();
			
		$api->setApiKey($profile_user['apikey']);	
			
		$api->setApiSecret($profile_user['secret']);
		
		$currencies = $api->DoApiGetRequest('Currencies/'.$globallanguage[1], null, 'Currencies:'.$globallanguage[1]);
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
		
		$portalArray = $api->DoApiGetRequest('Portal',$globallanguage[1],'Portal:'.$globallanguage[1]);
		
		$portalArray = json_decode($portalArray);

		$portalArray = stripslashes(json_encode($portalArray));		
		
		$articleGroup = $api->DoApiGetRequest('ArticleGroups',$globallanguage[1],'ArticleGroups:'.$globallanguage[1]);
		
		$getArticle = $api->DoApiGetRequest('Customer/'.$profile_user['apikey'].'/ResaleUnit/'.$profile_user['resaleGuid'].'/Articles', $globallanguage[1], 'Available:'.$globallanguage[1]);
		
		$getArticle = json_decode($getArticle);
		
		$articleGroup = json_decode($articleGroup);
		
		if(W2PConfig::$PortalTagString == "nhain")
			$ArticleCategory = $api->DoApiGetRequest('Category/'.$globallanguage[1].'/Article',null,'ArticleCategory:'.$globallanguage[1].W2PConfig::$PortalTagString);
		else
			$ArticleCategory = $api->DoApiGetRequest('Category/'.$globallanguage[1].'/Article/'.W2PConfig::$PortalTagString, null,'ArticleCategory:'.$globallanguage[1].W2PConfig::$PortalTagString);

		$ArticleCategory = json_decode($ArticleCategory);	

		$endPriceUserFormat = ($profile_user['EndUserPriceFormat'] == "Net") ? $translation->translate('EndUserPriceFormat') : $translation->translate('EndUserPriceFormatGross');

		//global currency
		$globalCurrency = $_SESSION["current_currency"]['key'];

		//if we the customers choose some products
		$chosen_slider = null;
		$chosen_script = null;
		for($i = 0; $i < count($_SESSION['pics_import']); $i++ ){
			$chosen_script .= '
				var _pic = '.json_encode($_SESSION["pics_import"][$i]).';
				var _handle = _pic.ImgHandle;
				eval("img" + _handle + " = undefined");
				//push to array
				result_arr[_handle] = _pic;
			';
		}
		
		$chosen_count = count($_SESSION['pics_import']);
		if($chosen_count > 0){
			for($i = 0; $i < $chosen_count; $i++){
				$chosen_slider .= '<div><a hash="javascript:void(0)" class="img-cover-mask"><img handle="'.$_SESSION['pics_import'][$i]->{'ImgHandle'}.'" bigthumb="'.$_SESSION['pics_import'][$i]->{'MaskUri'}.'" src="'.$_SESSION['pics_import'][$i]->{'MaskThumb'}.'" style="width: 40px; height: 40px;" alt="Picture"></a></div>';
			}
		}
		
		//add upload js template file
		$jsuploadtemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/dgo.upload.js.tpl');
		$jsuploadtemplate->replace_tags(array(							
										"pluginUrl" 		=> array(linkToPlugin,false),															
									  )
								);
		//crop function js
		$dgocropjstpl = new TemplateEngine(dirname(__FILE__).'/../tpl/dgo.crop.js.tpl');
		
		//use template for js
		$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/productdetails.js.tpl');
		$jstemplate->replace_tags(array(
										"articleIdentifer" 		=> array($identifer,false),	
										"pluginUrl" 			=> array(linkToPlugin,false),									
										"language" 				=> array($globallanguage[1],false),									
										"portal" 				=> array(W2PConfig::$PortalToken,false),									
										"currency" 				=> array($plugin_option['currency'],false),									
										"globallanguage" 		=> array($globallanguage[1] ,false),										
										"globalCurrency" 		=> array($plugin_option['currency'] ,false),
										"dropdownSwitchItem" 	=> array($plugin_option['SwitchDropdownItem'] ,false),										
										"chosen_script" 		=> array($chosen_script ,false),										
										"currencyArray" 		=> array(json_encode($returnCurrencies) ,false), 										
										"portalArray" 			=> array($portalArray ,false), 										
										"ArticleCategory" 		=> array(json_encode($ArticleCategory->{'Value'}) ,false), 										
										"ArticleGroupArray" 	=> array(json_encode($getArticle->{'Value'}) ,false),
										"dgoGuid" 				=> array($_SESSION['login']['guid'], false),	
										"dgoUsername" 			=> array($_SESSION['login']['loginUser'], false),							
										"articleGroupView" 		=> array($plugin_option['articleGroup-subtypes-view'], false),							
										"MetaTagTitle" 			=> array($plugin_option['meta_tag_title'][$globallanguage[1]], false),							
										"MetaTagDes" 			=> array($plugin_option['meta_tag_description'][$globallanguage[1]], false),							
									  )
								);
		
		$script = $jstemplate->getHtml();
		
		$jsscripttemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/productdetails.func.js.tpl');		
		$jsscripttemplate->replace_tags(array(	
										"dgocropjstpl" 			=> array($dgocropjstpl->getHtml(), false),									
										"somepictures" 			=> array( json_encode($translation->translate('SomePictures')), false),	
										"1picture" 				=> array( json_encode($translation->translate('1Picture')), false),
										"youhavealso" 			=> array( json_encode($translation->translate('YouHaveAlso')), false),
										"whichnottouchedyet" 	=> array( json_encode($translation->translate('WhichNotTouchedYet')), false)				
									  )
								);
		$scriptFunctionPlaceHolder = $jsscripttemplate->getHtml();

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

		//open crop template file	
		$dgocroptpl = new TemplateEngine(dirname(__FILE__).'/../tpl/dgo.crop.tpl');	
		
		$dgocroptpl->replace_tags(array(
			"pluginUrl" 			=> array(linkToPlugin,false),
			"transQuality" 			=> array($translation->translate('Quality') ,false),										
			"transPreview" 			=> array($translation->translate('Preview') ,false),										
			"transCropFitpictures" 	=> array($translation->translate('CropFitpictures') ,false),
			"transOrientation" 		=> array($translation->translate('Orientation') ,false),										
			"transZoom" 			=> array($translation->translate('Zoom') ,false),
			"transDone" 			=> array($translation->translate('Done') ,false),
			"transPreview" 			=> array($translation->translate('Preview') ,false),
		));
		
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/productdetails.tpl');		
		
		$imgLoading = "<img src='".linkToPlugin."css/img/icon/ajax-loading.gif'>";
		
		$template->replace_tags(array(
										"scriptPlaceHolder" 	=> array($script,false),
										"scriptFunctionPlaceHolder" 	=> array($scriptFunctionPlaceHolder,false),
										"transLoading" 			=> array($translation->translate('Loading'),false),										
										"keyword_breadcrumb" 	=> array($translation->translate('Keyword_breadcrumb'),false),
										"keyword_products" 		=> array($translation->translate('Keyword_products'),false),
										"UploadPicture" 		=> array($translation->translate('UploadPicture') ,false),										
										"AvailableSizes" 		=> array($translation->translate('AvailableSizes') ,false),										
										"AvailableColors" 		=> array($translation->translate('AvailableColors') ,false),										
										"Subtypes" 				=> array($translation->translate('Subtypes') ,false),										
										"ArticleGroups" 		=> array($translation->translate('ArticleGroups') ,false),										
										"Products" 				=> array($translation->translate('Products') ,false),										
										"transDone" 			=> array($translation->translate('Done') ,false),																			
										"transUploadingfile" 	=> array($translation->translate('Uploadingfile') ,false),										
										"transRemaining" 		=> array($translation->translate('Remaining') ,false),										
										"transSpeed" 			=> array($translation->translate('Speed') ,false),										
										"transStopAll" 			=> array($translation->translate('StopAll') ,false),										
										"PicHasLowResolution" 	=> array($translation->translate('PicHasLowResolution') ,false),										
										"Readytoupload" 		=> array($translation->translate('Readytoupload') ,false),										
										"Doyouwanttocanceluploadthisimage" 	=> array($translation->translate('Doyouwanttocanceluploadthisimage') ,false),										
										"Saving" 				=> array($translation->translate('Saving') ,false),										
										"of" 					=> array($translation->translate('of') ,false),										
										"UploadComplete" 		=> array($translation->translate('UploadComplete') ,false),										
										"Finished" 				=> array($translation->translate('Finished') ,false),										
										"seconds" 				=> array($translation->translate('seconds') ,false),										
										"minutes" 				=> array($translation->translate('minutes') ,false),										
										"hours" 				=> array($translation->translate('hours') ,false),
										"Copy"					=> array($translation->translate('Copy') ,false),					
										"days" 					=> array($translation->translate('days') ,false),										
										"Link" 					=> array($translation->translate('Link') ,false),										
										"Tellafriends" 			=> array($translation->translate('Tellafriends') ,false),										
										"TageRueckgaberecht" 	=> array($translation->translate('TageRueckgaberecht') ,false),										
										"Expressversandmgl" 	=> array($translation->translate('Expressversandmgl') ,false),										
										"KeineMindestabnahme" 	=> array($translation->translate('KeineMindestabnahme') ,false),										
										"YourAdvantages" 		=> array($translation->translate('YourAdvantages') ,false),										
										"transOnlineDesigner" 	=> array($translation->translate('OnlineDesigner') ,false),
										"transUploadPictures" 	=> array($translation->translate('UploadPictures') ,false),										
										"pluginUrl" 			=> array(linkToPlugin,false),																				
										"articleIdentifer" 		=> array($identifer,false),										
										"Yourfileswillbetransfered" 	=> array($translation->translate('Yourfileswillbetransfered'),false),
										"imgLoadingSmall" 				=> array( $imgLoading ,false),										
										"transEndUserPriceFormat" 		=> array( $endPriceUserFormat ,false),										
										"chosenslider" 					=> array( $chosen_slider ,false),
										"NoCommentTranslation" 			=> array( $translation->translate('NoCommentTranslation') ,false),
										"currentPageUrl" 				=> array( $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] ,false),
										//"scriptdesignercontrol" 	=> array($designerControl->getDesignerScript(), false),
										//"designercode" 			=> array($designerControl->getControlHtml(), false),
										//"designercontrols" 		=> array($designerControl->getDesignerControlsHtml(), false),		
										//"imagecontrolscode"		=> array($imageControl->getControlHtml(), false),
										//"statecontrolcode" 		=> array($stateControl->getControlHtml(), false),																				
										"dgouploadtpl" 			=> array($uploadtemplate->getHtml(), false),
										"dgocroptpl" 			=> array($dgocroptpl->getHtml(), false),
										"nologinopen" 			=> array($_SESSION['login']['guid'] == null ? '' : '!--', false),
										"nologinclose" 			=> array($_SESSION['login']['guid'] == null ? '' : '--', false),
										"loginopen" 			=> array($_SESSION['login']['guid'] != null ? '' : '!--', false),
										"loginclose" 			=> array($_SESSION['login']['guid'] != null ? '' : '--', false),
										"transHello" 			=> array($translation->translate('Hello'), false),
										"transLookForwardIdea" 	=> array($translation->translate('LookForwardIdea'), false),
										"transLeaveAComment" 	=> array($translation->translate('LeaveAComment'), false),
										"transLogin" 			=> array($translation->translate('Login'), false),
										"transOr" 				=> array($translation->translate('Or'), false),
										"transSignUp" 			=> array($translation->translate('SignUp'), false),
										"username" 				=> array($_SESSION['login']['loginUser'], false),
										"transPricePer" 		=> array($translation->translate('PricePer'), false),
										"transmaxpricePer" 		=> array($translation->translate('maxpricePer'), false),
										"transSend" 			=> array($translation->translate('Send'), false),
										"pageName"				=> array($postTitle,false),																				
										"blogName"				=> array(get_bloginfo(),false),
										"userlogourl" 			=> array($_SESSION['login']['photoUser'] == 'null' ? linkToPlugin.'css/img/icon/main_user.png' : $_SESSION['login']['photoUser'], false),
									  )
								);
		
		//get the html code of the control
		echo $html = $template->getHtml();
		
		//replace placeholder with control html
		/* ========================= TRANSLATION =======================================*/		
    	//Include language file
		require_once("pluginComponents/language_cus.php");			
		// Load up the plugin text domain
		load_plugin_textdomain( 
			$l10n_prefix,                        		// Plugin text domain reference
			false,                                     // False - deprecated parameter
			dirname( plugin_basename( __FILE__ ) ) . '/lang/'  // Path to translation files
		);
		/*==============================================================================*/
		//login template
		include_once('pluginComponents/loginForm.php');

    	//$data = str_ireplace("%productdetailsplaceholder%", $html, $data);
    	//return the new page content
    	//return $data;
	}
	
	//function create address book page
	function createProductDetailsPage(){
		//create a new shopping cart page
        //If hasn't any page with name: Shopping cart, inserting a page with this name
        $page = get_page_by_title('Product Details');
        if(!$page){
            //init page
            $currentData['post_title'] 		= 'Product Details';            
            $currentData['post_content'] 	= "[productdetailsplaceholder]";
            $currentData['post_status'] 	= 'publish';
            $currentData['comment_status'] 	= 'closed';
            $currentData['ping_status'] 	= 'closed';
            $currentData['post_type'] 		= 'page';
            
            //insert page
            $pageID = wp_insert_post($currentData);
            
            //using add_option to mark it
            delete_option('productdetailsPageID');
            add_option('productdetailsPageID', $pageID); 
            
            //using add_option to remember the title of page 
            delete_option('productdetailsPageTitle');
            add_option('productdetailsPageTitle', $currentData['post_title']);

            //update post metadata to set our own full width template
			update_post_meta($pageID, "_wp_page_template", "page-fullwidth.php");
        }
	}
	
?>