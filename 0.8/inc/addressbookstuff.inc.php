<?php
/*
 * function to create address book page
 * 
 * Peter / Dao Hung Cuong
 * 
 */

 
	//remove_filter ('the_content', 'wpautop');
	//add_filter('the_content', 'dgoReplaceAddressBookPlaceholder',100);
	add_shortcode('addressbookplaceholder', 'dgoReplaceAddressBookPlaceholder');
	//function fill data
	function dgoReplaceAddressBookPlaceholder($data){		
		
		//add translation class
		require_once('translation.class.php');
	
		$page = get_post(get_option('addressPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
	
		$translation = new Web_2_print_Translation('web2print');
		
		if(isset($_SESSION['contact'])){
			$btnImportGoogle =  "<div onclick=\"importGoogleContact();\" type=\"button\" id=\"import-google\" class=\"import-google is-bottons\">".$translation->translate('ImportFromGoogle')."</div>";
		}else{
			$btnImportGoogle =  "<div onclick=\"importGoogleLogin();\" type=\"button\" id=\"import-google\" class=\"import-google is-bottons\">".$translation->translate('ImportFromGoogle')."</div>";
		}
		if(isset($_SESSION['linkedin'])){
			$btnImportLinkedin =  "<div onclick=\"importLinkedinContact();\" type=\"button\" id=\"import-linkedin\" class=\"import-google is-bottons\" >".$translation->translate('ImportFromLinkedin')."</div>";
		}else{
			$btnImportLinkedin =  "<div onclick=\"importLinkedInLogin();\" type=\"button\" id=\"import-linkedin\" class=\"import-google is-bottons\" >".$translation->translate('ImportFromLinkedin')."</div>";
		}
		
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}
		
		$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/addressbookpage.js.tpl');
		
		$jstemplate->replace_tags(array(										
										"guid" 	=> array($_SESSION['login']['guid'],false),										
									  )
								);
		
		$script = $jstemplate->getHtml();
				   
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/addressbookpage.tpl');
		
		$template->replace_tags(array(
										"scriptPlaceHolder" => array($script,false),										
										//"btnImportGoogle" 	=> array($btnImportGoogle,false),
										"btnImportLinkedin" => array($btnImportLinkedin,false),
										"transAddNewAddress" => array($translation->translate('AddNewAddress'),false),
										"trans-edit-button" => array($translation->translate('Edit'),false),
										"trans-delete-button" => array($translation->translate('Delete'),false),
										"transUploadAvatar" => array($translation->translate('UploadAvatar'),false),
										"transYouDontHave" => array($translation->translate('YouDontHaveAddress'),false),
										"transSearch" => array($translation->translate('Search'),false),
										"transFirstName" => array($translation->translate('FirstName'),false),
										"transLastName" => array($translation->translate('LastName'),false),
										"transCompany" => array($translation->translate('Company'),false),
										"transCity" => array($translation->translate('City'),false),
										"transName" => array($translation->translate('Name'),false),
										"transAddress" => array($translation->translate('Address'),false),
										"transContact" => array($translation->translate('Contact'),false),
										"transNote" => array($translation->translate('Note'),false),
										"transEmail" => array($translation->translate('Email'),false),
										"transPhone" => array($translation->translate('Phone'),false),
										"metaTag"	=>array($postTitle,false),										
										"blogName"	=>array(get_bloginfo(),false),
									  )
								);
		
		//get the html code of the control
		echo $html = $template->getHtml();
		//replace placeholder with control html
    	//$data = str_ireplace("%addressbookplaceholder%", $html, $data);
    	//return the new page content
    	//return $data;
	}
	
	//function create address book page
	function createAddressBookPage(){
		//If hasn't any page with name: Address Book, inserting a page with this name
		$addressPage = get_page_by_title('Address Book');
		if(!$addressPage){
			//create catelogy
			$category = 'Customer Center';
			$catelogy_id = wp_create_category($category);
			//insert new post
			$addressBookData['post_title'] 		= 'Address Book';
			$addressBookData['post_content'] 	= "[addressbookplaceholder]";
	        $addressBookData['post_status'] 	= 'publish';
	        $addressBookData['comment_status'] 	= 'closed';
	        $addressBookData['ping_status'] 	= 'closed';
	        $addressBookData['post_type'] 		= 'page';
			$addressBookData['post_category'] 	= array($catelogy_id);
			//insert post
			$addressBookID = wp_insert_post($addressBookData);
			//using add_option to mark it
	        delete_option('addressPageID');
	        add_option('addressPageID', $addressBookID);
			//using add_option to remember the title of page 
            delete_option('addressPageTitle');
            add_option('addressPageTitle', $addressBookData['post_title']);         
        
		}
	}
?>