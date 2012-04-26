<?php
/*
 * function to create design details page
 * 
 * Peter / Dao Hung Cuong
 * 
 */

 	//remove_filter ('the_content', 'wpautop');
	//add_filter('the_content', 'dgoReplaceDesignDetailsPlaceholder',100);
	add_shortcode('designdetailsplaceholder', 'dgoReplaceDesignDetailsPlaceholder');
	//function fill data
	function dgoReplaceDesignDetailsPlaceholder($data){		
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}
		
		$page = get_post(get_option('designDetailsPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
		
		require_once('translation.class.php');			
		$translation 				= new Web_2_print_Translation('web2print');	
		
		//use template for js
		$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/designdetails.js.tpl');
		
		$script = $jstemplate->getHtml();		
		
		$imgLoading = "<img src='".linkToPlugin."css/img/icon/ajax-loading.gif'>";
		
		/*Get info from wordpress database*/
		$profile_user = get_option('profile_user_info');
		
		$endPriceUserFormat = ($profile_user['EndUserPriceFormat'] == "Net") ? $translation->translate('EndUserPriceFormat') : $translation->translate('EndUserPriceFormatGross');
		
		
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/designdetails.tpl');				
		
		$template->replace_tags(array(
										"scriptPlaceHolder" => array($script,false),
										"transLoading" 		=> array($translation->translate('Loading'),false),
										"imgLoadingSmall" 	=> array($imgLoading ,false),
										"pluginUrl" 		=> array(linkToPlugin,false),
										"transEndUserPriceFormat" 	=> array( $endPriceUserFormat ,false),
										"Link" 					=> array($translation->translate('Link') ,false),										
										"Copy" 					=> array($translation->translate('Copy') ,false),										
										"Tellafriends" 			=> array($translation->translate('Tellafriends') ,false),										
										"TageRueckgaberecht" 	=> array($translation->translate('TageRueckgaberecht') ,false),										
										"Expressversandmgl" 	=> array($translation->translate('Expressversandmgl') ,false),										
										"KeineMindestabnahme" 	=> array($translation->translate('KeineMindestabnahme') ,false),										
										"YourAdvantages" 		=> array($translation->translate('YourAdvantages') ,false),
										"metaTag"					=> array($postTitle,false),										
										"blogName"					=> array(get_bloginfo(),false),											
									  )
								);
		
		//get the html code of the control
		echo $html = $template->getHtml();
		//replace placeholder with control html
    	//$data = str_ireplace("%designdetailsplaceholder%", $html, $data);
    	//return the new page content
    	//return $data;
	}
	
	//function create design details page
	function createDesignDetailsPage(){
		//If hasn't any page with name: Address Book, inserting a page with this name
		$page = get_page_by_title('Design Details');
        if(!$page){
            //init page
            $currentData['post_title'] 		= 'Design Details';            
            $currentData['post_content'] 	= "[designdetailsplaceholder]";
            $currentData['post_status'] 	= 'publish';
            $currentData['comment_status'] 	= 'closed';
            $currentData['ping_status'] 	= 'closed';
            $currentData['post_type'] 		= 'page';
            //insert page
            $pageID = wp_insert_post($currentData);
            //using add_option to mark it
            delete_option('designDetailsPageID');
            add_option('designDetailsPageID', $pageID); 
            
            //using add_option to remember the title of page 
            delete_option('designDetailsPageTitle');
            add_option('designDetailsPageTitle', $currentData['post_title']);

            //update post metadata to set our own full width template
			update_post_meta($pageID, "_wp_page_template", "page-fullwidth.php");
        }
	}
?>