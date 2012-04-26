<?php
/*
 * function to create all designs page
 * 
 * Peter / Dao Hung Cuong
 * 
 */

 	//remove_filter ('the_content', 'wpautop');
	//add_filter('the_content', 'dgoReplaceAllDesignsPlaceholder',100);
	add_shortcode('alldesignsplaceholder', 'dgoReplaceAllDesignsPlaceholder');
	//function fill data
	function dgoReplaceAllDesignsPlaceholder($data){		
		require_once('translation.class.php');	
		$page = get_post(get_option('allDesignsPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
		
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}
		
		$translation 	= new Web_2_print_Translation('web2print');								
		
		//use template for js
		$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/alldesignspage.js.tpl');
		
		$script = $jstemplate->getHtml();		
		
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/alldesignspage.tpl');
		
		$template->replace_tags(array(
										"scriptPlaceHolder" 	=> array($script,false),
										"metaTag"	=>array($postTitle,false),										
										"blogName"	=>array(get_bloginfo(),false),										
									  )
								);
		
		//get the html code of the control
		echo $html = $template->getHtml();
		//replace placeholder with control html
    	//$data = str_ireplace("%alldesignsplaceholder%", $html, $data);
    	//return the new page content
    	//return $data;
	}
	
	//function create account details page
	function createAllDesignsPage(){
		//If hasn't any page with name: Address Book, inserting a page with this name
		$profilePage = get_page_by_title('Motive Designs');
		if(!$profilePage){			
			//insert new post
			$profileData['post_title'] 		= 'Motive Designs';
			$profileData['post_content'] 	= "[alldesignsplaceholder]";
	        $profileData['post_status'] 	= 'publish';
	        $profileData['comment_status'] 	= 'closed';
	        $profileData['ping_status'] 	= 'closed';
	        $profileData['post_type'] 		= 'page';			
			//insert post
			$profileID = wp_insert_post($profileData);
			
			//using add_option to mark it
	        delete_option('allDesignsPageID');
	        add_option('allDesignsPageID', $profileID);
			
	        //using add_option to remember the title of page 
            delete_option('allDesignsPageTitle');
            add_option('allDesignsPageTitle', $profileData['post_title']);    

            //update post metadata to set our own full width template
			update_post_meta($pageID, "_wp_page_template", "page-fullwidth.php");
		}
	}
?>