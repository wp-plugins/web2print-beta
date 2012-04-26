<?php
/*
 * function to create my products page
 * 
 * Peter / Dao Hung Cuong
 * 
 */

	add_shortcode('myproductsplaceholder', 'dgoReplaceMyProductsPlaceholder');
	//function fill data
	function dgoReplaceMyProductsPlaceholder($data){		
				
		$page = get_post(get_option('myProductsPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;		
				
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}		
				
		$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/myproductspage.js.tpl');
				
		$script = $jstemplate->getHtml();
				   
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/myproductspage.tpl');
		$template->replace_tags(array(
										"scriptPlaceHolder" => array($script,false),
										"pluginUrl" => array(linkToPlugin,false),
										"guidUser" => array($_SESSION['login']['guid'], false),
										"metaTag"					=> array($postTitle,false),										
										"blogName"					=> array(get_bloginfo(),false),
									 )
								);
		
		//get the html code of the control
		echo $html = $template->getHtml();		
	}
	
	//function create address book page
	function createMyProductsPage(){
		//If hasn't any page with name: My Products, inserting a page with this name
		$myProductsPage = get_page_by_title('My Products');
		
		if(!$myProductsPage){			
			//insert new post
			$myProductsData['post_title'] 		= 'My Products';
			$myProductsData['post_content'] 	= "[myproductsplaceholder]";
	        $myProductsData['post_status'] 		= 'publish';
	        $myProductsData['comment_status'] 	= 'closed';
	        $myProductsData['ping_status'] 		= 'closed';
	        $myProductsData['post_type'] 		= 'page';

			//insert post
			$myProductsID = wp_insert_post($myProductsData);
			//using add_option to mark it
	        delete_option('myProductsPageID');
	        add_option('myProductsPageID', $myProductsID);
			//using add_option to remember the title of page 
            delete_option('myProductsPageTitle');
            add_option('myProductsPageTitle', $myProductsData['post_title']);         
        
		}
	}
?>