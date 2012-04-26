<?php 

/*
 * function to create earn money page
 * 
 * Peter / Dao Hung Cuong
 * 
 */
	//remove_filter ('the_content', 'wpautop');
	//add_filter('the_content', 'dgoReplaceEarnMoneyPlaceholder',100);
	add_shortcode('earnmoneyplaceholder', 'dgoReplaceEarnMoneyPlaceholder');
	//function fill data
	function dgoReplaceEarnMoneyPlaceholder($data){		
		
		$page = get_post(get_option('earnMoneyPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
		
		require_once('translation.class.php');	
		$translation = new Web_2_print_Translation('web2print');
		
		$profile_user = get_option('profile_user_info');		
		
		//Get info of changing options
		$plugin_option = get_option("w2p_plugin_option");
		
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}
			
		include_once "api_class/dgo_api.class.php";	
		include_once "api_class/GroupArticle.php";
						
		$api = new DgoApiConnectionW2P();	
		$api->setApiKey($profile_user['apikey']);				
		$api->setApiSecret($profile_user['secret']);
		
		$language = explode("_", $_SESSION["current_language"]['key']);
		
		//get available article from php
		$articleGroup = $api->DoApiGetRequest('ArticleGroups',$language[1],'ArticleGroups:'.$language[1]);		
		$articleGroup = json_decode($articleGroup);
		
		$resaleUnits = $api->DoApiGetRequest('Customer/'.$_SESSION['login']['guid'].'/ResaleUnits',null,'ResaleUnits:'.$_SESSION['login']['guid']);
		$resaleUnits = json_decode($resaleUnits);
		
		$salesStatistic = $api->GetSalesStatistic('Affiliate/'.$_SESSION['login']['guid'].'/Sales');
		$salesStatistic = json_decode($salesStatistic);
		
		$profitArray = $api->DoApiGetRequest('Customer/'.$_SESSION['login']['guid'].'/Discounts',null,'Discounts:'.$_SESSION['login']['guid']);
		$profitArray = json_decode($profitArray);
		
		$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/earnmoneypage.js.tpl');
		
		$jstemplate->replace_tags(array(										
										"guid" 				=> array($_SESSION['login']['guid'],false),
										"currency" 			=> array($plugin_option['currency'],false),
										"availableArticle" 	=> array(json_encode($articleGroup),false),
										"resaleUnits" 		=> array(json_encode($resaleUnits),false),
										"affiliateSalesStatistic" 	=> array(json_encode($salesStatistic),false),
										"profitArray" 		=> array(json_encode($profitArray),false),
									  )
								);
		
		$script = $jstemplate->getHtml();					
		
		$imgLoading = "<img src='".linkToPlugin."css/img/icon/loading.gif'><br>".$translation->translate('Loading')."...";		
		
		$guidUser = $_SESSION['login']['guid'];
		
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/earnmoneypage.tpl');
		
		$template->replace_tags(array(
										"scriptPlaceHolder" 			=> array($script,false),										
										"transAffiliateID" 				=> array($translation->translate('AffiliateID'),false),
										"transCreateNewShop" 			=> array($translation->translate('CreateNewShop'),false),
										"transNoSalesYet" 				=> array($translation->translate('NoSalesYet'),false),
										"transLoading" 					=> array($translation->translate('Loading'),false),
										"transReferralLink" 			=> array($translation->translate('ReferralLink'),false),
										"transStatistic" 				=> array($translation->translate('Statistic'),false),
										"transWithdraw" 				=> array($translation->translate('Withdraw'),false),
										"transYourAffiliateID" 			=> array($translation->translate('YourAffiliateID'),false),
										"transCopy" 					=> array($translation->translate('Copy'),false),
										"transTellYourFriends" 			=> array($translation->translate('TellYourFriends'),false),
										"transShopName" 				=> array($translation->translate('ShopName'),false),
										"transDescription" 				=> array($translation->translate('Description'),false),
										"transAction" 					=> array($translation->translate('Action'),false),
										"transWeLoveFeedback" 			=> array($translation->translate('WeLoveFeedback'),false),
										"transNewShop" 					=> array($translation->translate('NewShop'),false),
										"transNewCustomerAffiliateID" 	=> array($translation->translate('NewCustomerAffiliateID'),false),
										"transYourUniqueReferralLink" 	=> array($translation->translate('YourUniqueReferralLink'),false),
										"transUseTheLinkBelow" 			=> array($translation->translate('UseTheLinkBelow'),false),
										"transYourLastReferral" 		=> array($translation->translate('YourLastReferral'),false),
										"transMoreInfo" 				=> array($translation->translate('MoreInfo'),false),
										"transBannersForYourWebsite" 	=> array($translation->translate('BannersForYourWebsite'),false),
										"transByHostingOne" 			=> array($translation->translate('ByHostingOne'),false),
										"transSalesReferrals" 			=> array($translation->translate('SalesReferrals'),false),
										"transTurnover" 				=> array($translation->translate('Turnover'),false),
										"transYourProfit" 				=> array($translation->translate('YourProfit'),false),
										"transTo" 						=> array($translation->translate('to'),false),
										"transOrChoose" 				=> array($translation->translate('OrChoose'),false),
										"transRefresh" 					=> array($translation->translate('Refresh'),false),
										"transLastWeek" 				=> array($translation->translate('LastWeek'),false),
										"transLastMonth" 				=> array($translation->translate('LastMonth'),false),
										"transLastYear" 				=> array($translation->translate('LastYear'),false),
										"transDate" 					=> array($translation->translate('Date'),false),
										"transShop" 					=> array($translation->translate('Shop'),false),
										"transOrder" 					=> array($translation->translate('Order'),false),
										"transCountry" 					=> array($translation->translate('Country'),false),
										"transItem" 					=> array($translation->translate('Item'),false),
										"transProductPrice" 			=> array($translation->translate('ProductPrice'),false),
										"transProvision" 				=> array($translation->translate('Provision'),false),
										"transStatus" 					=> array($translation->translate('Status'),false),
										"transAvailableBalance" 		=> array($translation->translate('AvailableBalance'),false),
										"transWithdrawAmount" 			=> array($translation->translate('WithdrawAmount'),false),
										"transWithdraw" 				=> array($translation->translate('Withdraw'),false),
										"transPayment" 					=> array($translation->translate('AffiliatePayment'),false),
										"transWireTransfer" 			=> array($translation->translate('WireTransfer'),false),
										"transPaymentHistory" 			=> array($translation->translate('PaymentHistory'),false),
										"transAmount" 					=> array($translation->translate('Amount'),false),
										"transCurrency" 				=> array($translation->translate('Currency'),false),
										"transEdit" 					=> array($translation->translate('Edit'),false),
										"transMainAddress" 				=> array($translation->translate('MainAddress'),false),
										"transStatus" 					=> array($translation->translate('Status'),false),
										"transAccountDetails" 			=> array($translation->translate('AccountDetails'),false),
										"transClickHereToAddText" 		=> array($translation->translate('ClickHereToAddText'),false),
										"transContact" 					=> array($translation->translate('Contact'),false),
										"User" 							=> array($translation->translate('User'),false),
										"Portal" 						=> array($translation->translate('Portal'),false),
										"ActiveSince" 					=> array($translation->translate('ActiveSince'),false),
										"SalesPerDay" 					=> array($translation->translate('SalesPerDay'),false),
										"Provision" 					=> array($translation->translate('Provision'),false),
										"Statistics" 					=> array($translation->translate('Statistics'),false),
										"ConfigurationFor" 				=> array($translation->translate('ConfigurationFor'),false),
										"AvailableProductGroup" 		=> array($translation->translate('AvailableProductGroup'),false),
										"CalculateYourPriceandProvision" 	=> array($translation->translate('CalculateYourPriceandProvision'),false),
										"YourSelection" 				=> array($translation->translate('YourSelection'),false),
										"ExamplePriceFromMerchant" 		=> array($translation->translate('ExamplePriceFromMerchant'),false),
										"YourProvisionAmount" 			=> array($translation->translate('YourProvisionAmount'),false),
										"Yourpercentages" 				=> array($translation->translate('Your percentages'),false),
										"YourProfits" 					=> array($translation->translate('YourProfits'),false),
										"loadingicon" 					=> array($imgLoading,false),										
										"Guid" 							=> array($guidUser,false),
										"metaTag"					=> array($postTitle,false),										
										"blogName"					=> array(get_bloginfo(),false),										
									  )
								);
		
		//get the html code of the control
		echo $html = $template->getHtml();
		//replace placeholder with control html
    	//$data = str_ireplace("%earnmoneyplaceholder%", $html, $data);
    	//return the new page content
    	//return $data;
	}
	
	//function create address book page
	function createEarnMoneyPage(){		
		$profilePage = get_page_by_title('Earn Money');
		if(!$profilePage){
			//create catelogy
			$category = 'Customer Center';
			$catelogy_id = wp_create_category($category);
			
			//insert new post
			$earnMoneyPage['post_title'] 		= 'Earn Money';
			$earnMoneyPage['post_content'] 		= "[earnmoneyplaceholder]";
	        $earnMoneyPage['post_status'] 		= 'publish';
	        $earnMoneyPage['comment_status'] 	= 'closed';
	        $earnMoneyPage['ping_status'] 		= 'closed';
	        $earnMoneyPage['post_type'] 		= 'page';
			$earnMoneyPage['post_category'] 	= array($catelogy_id);
			
			//insert post
			$earnMoneyID = wp_insert_post($earnMoneyPage);
			
			//using add_option to mark it
	        delete_option('earnMoneyPageID');
	        add_option('earnMoneyPageID', $earnMoneyID);
			
            delete_option('earnMoneyPageTitle');
            add_option('earnMoneyPageTitle', $earnMoneyPage['post_title']);         
        
		}
	}
?>
