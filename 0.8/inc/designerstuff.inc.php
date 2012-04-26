<?php
/*
 * functions to add designerpages
 * and other stuff to our wordpress
 * plugin
 * 
 * @author seb
 * 
 * 
 */	
	
	//add filter to replace designer placeholder
	//use priority 100, because other filters destroyed
	//it, when using default priority
	//add_filter('the_content', 'dgoReplaceDesignerPlaceholder',100);
	add_shortcode('designerplaceholder', 'dgoReplaceDesignerPlaceholder');
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function dgoReplaceDesignerPlaceholder( $data ){
		//include our controlscript
		//maybe we find a solution to
		//provide it over an webservice
		require_once 'dgoControls/ctrlstate.php'; //needed for every other control
		require_once 'dgoControls/ctrldesigner.php';
		require_once 'dgoControls/ctrllist.php';
		require_once 'dgoControls/ctrlimagecontrols.php';
		
		//initialize some important values
		$portalId 			= $_SESSION['PortalGuid']; //guid of your portal
		$contentItemId 		= "a1cc6aa2-b931-45f1-926d-d022bcbe6d2b"; //empty template with standard texts
		
		$filterForUser 		= "false"; //do you want to show only the templates of the current user?
		$searchQuery 		= "null"; //searchquery, to show search results
		$itemsPerPageCount 	= 8; //how many items should be shown per page?
		$startPage 			= 0; //which page should be shown initially?
		
		//TODO: care for a clean linkstructure later
		if($_GET["t"] != "")
			$contentItemId 	= $_GET["t"]; //if needed, guid of the selected template (normally just needed for designer control
		
		$lang 				= split("_", $_SESSION["current_language"]['key']);
		$userLanguage 		= $lang[1]; //current user language
		$userName 			= "Guest"; //current users name
		$userGuid 			= Helper::GetNewGuid();
		if($_SESSION['login']['guid'] != "")
			$userGuid		= $_SESSION['login']['guid'];
		if($_SESSION['login']['loginUser'] != "")
			$userName		= $_SESSION['login']['loginUser'];
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
		$contentItemListControl		= new DgoContentItemList(); //designer control
		$imageControl				= new DgoImageControls(); //image upload controls
		
		//initialize some important properties
		//state control properties
		$stateControl->setContentItemGuid($contentItemId);
		$stateControl->setLanguageToken($userLanguage);
		$stateControl->setPortalId($portalId);
		$stateControl->setUserInfo($userinfo);
		$stateControl->setAjaxProxy(linkToPlugin.'inc/ajaxproxy.php');
		//designer control properties
		$designerControl->setDesignerPlaceholderId('dgoDesignerControl'); //important, you can use this id to style something with css
		$designerControl->setBShowControls(false);
		//list control properties
		$contentItemListControl->setContentItemListPlaceholderId('calculatorMoreItems'); //important, you can use this id to style something with css
		$contentItemListControl->setTemplatesPlaceHolderId('calculatorMoreTemplates'); //important, you can use this id to style something with css
		//$contentItemListControl->setGetPermaLink('getPermaLink'); //TODO: add permalink functionality here
		//$contentItemListControl->setControlLoaded('controlLoaded'); //TODO: if needed, add this controlloaded handler here
		$contentItemListControl->setFilter($filter);
		$contentItemListControl->setDetailLevel(EnumDetailLevel::NoDetails); //you can find all enums in file dgoControl/inc/enumclasses.php
		$contentItemListControl->setShowPager("false");//pager is just needed in overview site later
		$contentItemListControl->setShowFilter("false");//filter is just needed in overview site later
		
		$imageControl->setImageControlsId('dgoimagecontrols');
		$imageControl->setUploadSessionId($userGuid);//use user guid here
		$imageControl->setButtonImage(linkToPlugin.'/inc/dgoControls/img/own_uploads.png');
		$imageControl->setUploaderPath(linkToPlugin.'/inc/dgoControls/swf/uploadify.embedded.font.swf');
		//build the page now!
		//create new template engine object and
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/designerpage.tpl');
		//replace all placeholders with our
		//control html code	
		$template->replace_tags(array(
			"designercode" 			=> array($designerControl->getControlHtml(), false),
			"statecontrolcode" 		=> array($stateControl->getControlHtml(), false),
			"listcontrolcode" 		=> array($contentItemListControl->getControlHtml(), false),
			"imagecontrol"			=> array($imageControl->getControlHtml(), false)
		));
		//get the html code of the control
		echo $html = $template->getHtml();
		//replace placeholder with control html
    	//$data = str_ireplace("%designerplaceholder%", $html, $data);
    	//return the new page content
    	//return $data;
	} 
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function createDesignerPage(){
    	//create a new designer page
        $designerpage = get_page_by_title('Designer');
        if(!$designerpage){
        	//init page
            $designerData['post_title'] = 'Designer';            
            $designerData['post_content'] = '[designerplaceholder]';
            $designerData['post_status'] = 'publish';
            $designerData['comment_status'] = 'closed';
            $designerData['ping_status'] = 'closed';
            $designerData['post_type'] = 'page';
            //insert page
            $designerPageID = wp_insert_post($designerData);
            //using add_option to mark it
            delete_option('designerPageID');
            add_option('designerPageID', $designerPageID); 
            //using add_option to remember the title of page 
            delete_option('designerPageTitle');
            add_option('designerPageTitle', $designerData['post_title']);      

            //TODO: use an own page template here
            update_post_meta($designerPageID, "_wp_page_template", "page-fullwidth.php");
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    function includeDesignerScripts(){
    	/*designer files*/
		wp_enqueue_script( 'dgotoolstiop', 'http://api.delivergo.com/content.dev/js/jquery.tooltip.js');  
		wp_enqueue_script( 'dgotimeout',"http://api.delivergo.com/content.dev/js/jquery-dotimeout.js");
		//wp_enqueue_script( 'dgorater',"http://api.delivergo.com/content.dev/js/jquery.rater.js");
		wp_enqueue_script( 'dgoformat',"http://api.delivergo.com/content.dev/js/jquery.format.js");
		wp_enqueue_script( 'dgocheckbox',"http://api.delivergo.com/content.dev/js/jquery.checkbox.js");
		wp_enqueue_script( 'dgostepper',"http://api.delivergo.com/content.dev/js/jquery.numeric.stepper.js");
		wp_enqueue_script( 'dgocolorpicker',"http://api.delivergo.com/content.dev/js/jquery.colorPicker.js");
		wp_enqueue_script( 'dgodropdown',"http://api.delivergo.com/content.dev/js/jquery.dropdown.js");
		wp_enqueue_script( 'dgotreeview',"http://api.delivergo.com/content.dev/js/jquery.treeview.js");
		
		wp_enqueue_script('dgoswfobject', "http://api.delivergo.com/content.dev/js/swfobject.js");
		wp_enqueue_script('dgosimplemodal', "http://api.delivergo.com/content.dev/js/jquery.simplemodal-1.3.5.js");
		wp_enqueue_script('dgofgmenu', "http://api.delivergo.com/content.dev/js/fg.menu.js");
		wp_enqueue_script('dgozoompan', "http://api.delivergo.com/content.dev/js/jquery.zoompan.js");
		wp_enqueue_script('dgouploadify', "http://api.delivergo.com/content.dev/js/jquery.uploadify.v2.1.0.js");
		
		wp_enqueue_script( 'dgocontent', 'http://api.delivergo.com/content.dev/js/delivergo.content.js');  
		wp_enqueue_script( 'dgocontentbrwose', 'http://api.delivergo.com/content.dev/js/delivergo.content.browse.js');  
		wp_enqueue_script( 'dgocontentdesign', 'http://api.delivergo.com/content.dev/js/delivergo.content.design.js');
		wp_enqueue_script('dgocontentupload', "http://api.delivergo.com/content.dev/js/delivergo.content.upload.js"); 
		
		wp_enqueue_style( 'dgocntcss', 'http://api.delivergo.com/content.dev/css/delivergo.content.css');
		wp_enqueue_style( 'dgocntuplcss', "http://api.delivergo.com/content.dev/css/delivergo.content.upload.css");  
		wp_enqueue_style( 'dgottcss', 'http://api.delivergo.com/content.dev/css/jquery.tooltip.css');
		wp_enqueue_style( 'dgoratcss', 'http://api.delivergo.com/content.dev/css/jquery.rater.css');
		wp_enqueue_style( 'dgotreecss', 'http://api.delivergo.com/content.dev/css/jquery.treeview.css');
		wp_enqueue_style( 'dgoddcss', 'http://api.delivergo.com/content.dev/css/jquery.dropdown.css');
		wp_enqueue_style( 'dgochkcss', 'http://api.delivergo.com/content.dev/css/jquery.checkbox.css');
		wp_enqueue_style( 'dgocpcss', 'http://api.delivergo.com/content.dev/css/jquery.colorPicker.css');
		wp_enqueue_style( 'dgonscss', 'http://api.delivergo.com/content.dev/css/jquery.numeric.stepper.css');
		wp_enqueue_style( 'dgofgmenucss', 'http://api.delivergo.com/content.dev/css/fg.menu.css');
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
?>