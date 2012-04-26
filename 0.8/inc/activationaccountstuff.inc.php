<?php 

/*
 * function to create address book page
 * 
 * Peter / Dao Hung Cuong
 * 
 */
	//remove_filter ('the_content', 'wpautop');
	//add_filter('the_content', 'dgoReplaceActivationAccountPlaceholder',100);
	add_shortcode('activationAccountplaceholder', 'dgoReplaceActivationAccountPlaceholder');
	//function fill data
	function dgoReplaceActivationAccountPlaceholder($data){		
		require_once('translation.class.php');
		
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}
		
		$page = get_post(get_option('activationPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
	
		$translation = new Web_2_print_Translation('web2print');
		
		$char = strtoupper(substr(str_shuffle('abcdefghjkmnpqrstuvwxyz'), 0, 4));
		
		if(!isset($_SESSION['captcha_authen']['code'])){
			$_SESSION['captcha_authen']['code'] = rand(1, 7) . rand(1, 7) . $char;
		}		

		$captcha = "<img src='".linkToPlugin."css/img/icon/image.php?".time()."' width='132' height='46' class='img-captcha' alt='Captcha image' />";
		
		$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/activationaccountpage.js.tpl');
		
		$jstemplate->replace_tags(array(
										"captchaCode" 	=> array($_SESSION['captcha_authen']['code'],false),
										"guidActive" 	=> array($_GET['Guid'],false),
										"codeActive" 	=> array($_GET['ActiveCode'],false),										
									  )
								);
		
		$script = $jstemplate->getHtml();
				   
		$imgLoading = "<img src='".linkToPlugin."css/img/icon/loading_icon.gif' width='500px'>";
		
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/activationaccountpage.tpl');		
		
		$template->replace_tags(array(
										"scriptPlaceHolder" 	=> array($script,false),
										"transPlsTypeYour" 		=> array($translation->translate('PlsTypeYour'),false),
										"transActivationCode" 	=> array($translation->translate('ActivationCode'),false),
										"transActiveNow" 		=> array($translation->translate('ActiveNow'),false),
										"transEmail"			=> array($translation->translate('Email'),false),
										"transActivationTitle"	=> array($translation->translate('ActivationTitle'),false),
										"captcha" 				=> array($captcha,false),
										"metaTag"				=>array($postTitle,false),										
										"blogName"				=>array(get_bloginfo(),false),
									  )
								);
		
		//get the html code of the control
		echo $html = $template->getHtml();
		//replace placeholder with control html
    	//$data = str_ireplace("%activationAccountplaceholder%", $html, $data);
    	//return the new page content
    	//return $data;
	}
	
	//function create address book page
	function createActivationAccountPage(){		
		//If hasn't any page with name: Activation Page, inserting a page with this name
		$activationPage = get_page_by_title('Activation');
		if(!$activationPage){
			//create catelogy
			$category = 'Customer Center';
			$catelogy_id = wp_create_category($category);
			
			//insert new post
			$activationData['post_title'] 		= 'Activation';
			$activationData['post_name'] 		= 'Activation';
			$activationData['post_content'] 	= "[activationAccountplaceholder]";
	        $activationData['post_status'] 		= 'publish';
	        $activationData['comment_status'] 	= 'closed';
	        $activationData['ping_status'] 		= 'closed';
	        $activationData['post_type'] 		= 'page';
			$activationData['post_category'] 	= array($catelogy_id);
			
			//insert post
			$activationID = wp_insert_post($activationData);
			
			//using add_option to mark it
	        delete_option('activationPageID');
	        add_option('activationPageID', $activationID);
			
            delete_option('activationPageTitle');
            add_option('activationPageTitle', $activationData['post_title']);         
			
			delete_post_meta($activationID, 'post_inspiration');        
			delete_post_meta($activationID, 'related_posts');        
		}
	}
?>
