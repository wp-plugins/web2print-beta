<?php
/*
 * function to create account details page
 * 
 * Peter / Dao Hung Cuong
 * 
 */

 	//remove_filter ('the_content', 'wpautop');
	//add_filter('the_content', 'dgoReplaceAccountDetailsPlaceholder',100);
	add_shortcode('accountdetailsplaceholder', 'dgoReplaceAccountDetailsPlaceholder');	
	//function fill data
	function dgoReplaceAccountDetailsPlaceholder($data){		
		require_once('translation.class.php');	
		$translation 	= new Web_2_print_Translation('web2print');				
		$imgLoading 	= "<img src='".linkToPlugin."css/img/icon/loading.gif'><br>Loading...";			
		$imgPayment 	= "<img src='".linkToPlugin."css/img/imgPayment/debit.png' width='32px' height='32px'>";			
		
		$page = get_post(get_option('profilePageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
		
		//Get info of changing options
		$profile_user = get_option('profile_user_info');
		
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}
		
		//use template for js
		$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/accountdetailspage.js.tpl');
		
		$jstemplate->replace_tags(array(										
										"guid" 	=> array($_SESSION['login']['guid'],false),
										"pass" 	=> array($_SESSION['login']['pass'],false),										
									  )
								);
		
		$script = $jstemplate->getHtml();		
		
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/accountdetailspage.tpl');
		
		$template->replace_tags(array(
										"scriptPlaceHolder" 			=> array($script,false),
										"accountdetails" 				=> array($imgLoading,false),
										"imgPayment" 					=> array($imgPayment,false),
										"transAccounts" 				=> array($translation->translate('Accounts'),false),
										"transAccountDetails" 			=> array($translation->translate('AccountDetails'),false),
										"transPaymentDetails" 			=> array($translation->translate('PaymentDetails'),false),
										"transStatus" 					=> array($translation->translate('Status'),false),
										"transMainAddress" 				=> array($translation->translate('MainAddress'),false),
										"transContact" 					=> array($translation->translate('Contact'),false),
										"transAccountConnection" 		=> array($translation->translate('AccountConnection'),false),
										"transSettings" 				=> array($translation->translate('Settings'),false),
										"transChangePassword" 			=> array($translation->translate('ChangePassword'),false),
										"transAddAConnection" 			=> array($translation->translate('AddAConnection'),false),
										"transWeLoveFeedback" 			=> array($translation->translate('WeLoveFeedback'),false),
										"transDontHaveConnection" 		=> array($translation->translate('DontHaveConnection'),false),
										"transName" 					=> array($translation->translate('Name'),false),
										"transEdit" 					=> array($translation->translate('Edit'),false),
										"transDelete" 					=> array($translation->translate('Delete'),false),
										"transNewPaymentMethod" 		=> array($translation->translate('NewPaymentMethod'),false),
										"transNewsLetter" 				=> array($translation->translate('NewsLetter'),false),
										"transCurrency" 				=> array($translation->translate('Currency'),false),
										"transLanguage" 				=> array($translation->translate('Language'),false),
										"transJobsPerPage" 				=> array($translation->translate('JobsPerPage'),false),
										"transAddress" 					=> array($translation->translate('Address'),false),
										"transDescription" 				=> array($translation->translate('Description'),false),
										"transGetTheNewestInfomation" 	=> array($translation->translate('GetTheNewestInfomation'),false),
										"transChooseYourPreferedLanguage" 	=> array($translation->translate('ChooseYourPreferedLanguage'),false),
										"transChooseYourPreferedCurrency" 	=> array($translation->translate('ChooseYourPreferedCurrency'),false),
										"transChooseYourPreferedAddress" 	=> array($translation->translate('ChooseYourPreferedAddress'),false),
										"transHowManyJobs" 					=> array($translation->translate('HowManyJobs'),false),
										"transSomethingIsMissing" 			=> array($translation->translate('SomethingIsMissing'),false),
										"transAreYouSure" 					=> array($translation->translate('AreYouSure'),false),
										"transClickHereToAddText" 			=> array($translation->translate('ClickHereToAddText'),false),
										"transVia" 							=> array($translation->translate('Via'),false),
										"metaTag"							=>array($postTitle,false),										
										"blogName"							=>array(get_bloginfo(),false),
									  )
								);
		
		//get the html code of the control
		echo $html = $template->getHtml();
		//replace placeholder with control html
    	//$data = str_ireplace("%accountdetailsplaceholder%", $html, $data);
    	//return the new page content
    	//return $data;
	}
	
	//function create account details page
	function createAccountDetailsPage(){
		//If hasn't any page with name: Address Book, inserting a page with this name
		$profilePage = get_page_by_title('Account Details');
		if(!$profilePage){
			//create catelogy
			$category = 'Customer Center';
			$catelogy_id = wp_create_category($category);
			//insert new post
			$profileData['post_title'] 		= 'Account Details';
			$profileData['post_content'] 	= "[accountdetailsplaceholder]";
	        $profileData['post_status'] 	= 'publish';
	        $profileData['comment_status'] 	= 'closed';
	        $profileData['ping_status'] 	= 'closed';
	        $profileData['post_type'] 		= 'page';
			$profileData['post_category'] 	= array($catelogy_id);
			//insert post
			$profileID = wp_insert_post($profileData);
			//using add_option to mark it
	        delete_option('profilePageID');
	        add_option('profilePageID', $profileID);
			//using add_option to remember the title of page 
            delete_option('accountPageTitle');
            add_option('accountPageTitle', $profileData['post_title']);      
		}
	}
?>