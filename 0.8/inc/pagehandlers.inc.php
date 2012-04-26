<?php
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function addW2pPages(){
		
		//If hasn't any page with name: Address Book, inserting a page with this name
		$archivePage = get_page_by_title('Archive');
		if(!$archivePage){
			//create catelogy
			$category = 'Customer Center';
			$catelogy_id = wp_create_category($category);
			//insert new post
			$archiveData['post_title'] = 'Archive';
			$archiveData['post_content'] .= "<div class='archive-container'>This is Archive page<input class='dgo-page-name' type='hidden' value='archive' /></div>";
	        $archiveData['post_status'] = 'publish';
	        $archiveData['comment_status'] = 'closed';
	        $archiveData['ping_status'] = 'closed';
	        $archiveData['post_type'] = 'page';
			$archiveData['post_category'] = array($catelogy_id);
			//insert post
			$archiveID = wp_insert_post($archiveData);
			//using add_option to mark it
	        delete_option('archiveID');
	        add_option('archiveID', $archiveID);
		}	
	}
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	function removeW2pPages(){
		//get our page ID
        $pageID = get_option('shoppingPageID');  
		$designerPageID = get_option('designerPageID');    
		$confirmID = get_option('confirmPageID');
        $allOrderID = get_option('allOrderPageID');
        $archiveID = get_option('archiveID');
        $earnMoneyPageID = get_option('earnMoneyPageID');
        $addressPageID = get_option('addressPageID');
        $profilePageID = get_option('profilePageID');
        $activationPageID = get_option('activationPageID');
        $productdetailsPageID = get_option('productdetailsPageID');
        $articlePricesPageID = get_option('articlePricesPageID');
        $allDesignsPageID = get_option('allDesignsPageID');
        $designDetailsPageID = get_option('designDetailsPageID');
        $myProductsID 	= get_option('myProductsPageID');
        $myMotivesID 	= get_option('myMotivesPageID');
        //$page = get_page_by_title('Designer');
        
				
        //delete this page
        wp_delete_post($pageID, true);  
		wp_delete_post($designerPageID, true);
		wp_delete_post($confirmID, true);
		wp_delete_post($allOrderID, true);
		wp_delete_post($archiveID, true);
		wp_delete_post($earnMoneyPageID, true);
		wp_delete_post($addressPageID, true);
		wp_delete_post($activationPageID, true);
		wp_delete_post($profilePageID, true);
		wp_delete_post($designerPageID, true);
		wp_delete_post($productdetailsPageID, true);
		wp_delete_post($articlePricesPageID, true);
		wp_delete_post($allDesignsPageID, true);
		wp_delete_post($designDetailsPageID, true);
		wp_delete_post($myProductsID, true);
		wp_delete_post($myMotivesID, true);
		//wp_delete_post($page->ID, true);
		
	}
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function createPageOnDemand(){
    	//create Product Details page
		createProductDetailsPage();
		//create Article Prices page
		createArticlePricesPage();		
    }
    
    function removePageOnDemand(){
        $productdetailsPageID = get_option('productdetailsPageID');
        $articlePricesPageID = get_option('articlePricesPageID');

		wp_delete_post($productdetailsPageID, true);
		wp_delete_post($articlePricesPageID, true);
    }
?>