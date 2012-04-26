<?php
/*
 * function to create account details page
 * 
 * Peter / Dao Hung Cuong
 * 
 */

 	//remove_filter ('the_content', 'wpautop');
	//add_filter('the_content', 'dgoReplaceAllOrdersPlaceholder',100);
	add_shortcode('allordersplaceholder', 'dgoReplaceAllOrdersPlaceholder');
	//function fill data
	function dgoReplaceAllOrdersPlaceholder($data){		
						
		require_once('translation.class.php');
	
		$page = get_post(get_option('allOrderPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
		
		$translation = new Web_2_print_Translation('web2print');
		
		include_once "api_class/dgo_api.class.php";
	
		include_once "api_class/GroupArticle.php";
	
		/*Get info from wordpress database*/
		$profile_user = get_option('profile_user_info');
		
		$api = new DgoApiConnectionW2P();
		
		$api->setApiKey($profile_user['apikey']);	
			
		$api->setApiSecret($profile_user['secret']);

		$allorders = $api->DoApiGetRequest('Customer/'.$_SESSION['login']['guid'].'/Orders/50/1');
		$allorders = json_decode($allorders);
		
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}
		
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/allorderspage.tpl');
		
		$template->replace_tags(array(
										"transShowAllDetails" 		=> array($translation->translate('ShowAllDetails'),false),										
										"transAllOrders" 			=> array($translation->translate('AllOrders'),false),										
										"transEntriesPerPage" 		=> array($translation->translate('EntriesPerPage'),false),										
										"transArticle" 				=> array($translation->translate('Article'),false),										
										"transSum" 					=> array($translation->translate('Sum'),false),										
										"transShippingAddress" 		=> array($translation->translate('ShippingAddress'),false),										
										"transPayment" 				=> array($translation->translate('PaymentMethod'),false),										
										"transShipment" 			=> array($translation->translate('Shipment'),false),										
										"transProduction" 			=> array($translation->translate('Production'),false),										
										"transShow" 				=> array($translation->translate('Show'),false),										
										"transPos" 					=> array($translation->translate('Pos'),false),										
										"transDetailsandDescription" => array($translation->translate('ArticleAndDescription'),false),										
										"transAmount" 				=> array($translation->translate('Amount'),false),										
										"transPrice" 				=> array($translation->translate('Price'),false),										
										"transStatus" 				=> array($translation->translate('Status'),false),										
										"transAction" 				=> array($translation->translate('Action'),false),										
										"allorders" 				=> array(json_encode($allorders),false),
										"guid" 						=> array($_SESSION['login']['guid'],false),	
										"metaTag"					=> array($postTitle,false),										
										"blogName"					=> array(get_bloginfo(),false),										
									  )
								);
		
		//get the html code of the control
		echo $html = $template->getHtml();
		//replace placeholder with control html
    	//$data = str_ireplace("%allordersplaceholder%", $html, $data);
    	//return the new page content
    	//return $data;
	}
	
	//function create account details page
	function createAllOrdersPage(){
		//If hasn't any page with name: All Order, inserting a page with this name
		$allOrderPage = get_page_by_title('All Orders');
		if(!$allOrderPage){
			//create catelogy
			$category = 'Customer Center';
			$catelogy_id = wp_create_category($category);
			
			//insert new post
			$allOrderData['post_title'] 	= 'All Orders';
			$allOrderData['post_content'] 	= "[allordersplaceholder]";
	        $allOrderData['post_status'] 	= 'publish';
	        $allOrderData['comment_status'] = 'closed';
	        $allOrderData['ping_status'] 	= 'closed';
	        $allOrderData['post_type'] 		= 'page';
			$allOrderData['post_category'] 	= array($catelogy_id);
			
			//insert post
			$allOrderID = wp_insert_post($allOrderData);
			
			//using add_option to mark it
	        delete_option('allOrderPageID');
	        add_option('allOrderPageID', $allOrderID);
		}
	}
?>