<?php 	
	//initialize some important values
	$portalId 			= "1fdefa4d-6250-41b2-9097-8e9388d77e5d"; //guid of your portal
	$userLanguage 		= "EN"; //current user language
	$filterForUser 		= "false"; //do you want to show only the templates of the current user?
	$searchQuery 		= "null"; //searchquery, to show search results
	$userName 			= "guest"; //current users name
	$userGuid 			= "00000000-0000-0000-0000-00000000000"; //current users guid
	$itemsPerPageCount 	= 6; //how many items should be shown per page?
	$startPage 			= 0; //which page should be shown initially?
	
	$userinfo = '{ 
		"Guid": "'.$userGuid.'", 
		"Name": "'.$userName.'" 
	}'; //complete needed user info
	
	//you can find all enums in file dgoControl/inc/enumclasses.php or see EOF
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
	$contentItemListControl 	= new DgoContentItemList(); //list control
	
	//initialize some important properties
	//state control properties
	$stateControl->setContentItemGuid($contentItemId);
	$stateControl->setLanguageToken($userLanguage);
	$stateControl->setPortalId($portalId);
	$stateControl->setUserInfo($userinfo);
	$stateControl->setAjaxProxy(linkToPlugin.'inc/ajaxproxy.php');
	
	//list control properties
	$contentItemListControl->setContentItemListPlaceholderId('w2pDgoContentItems'); //important, you can use this id to style something with css
	$contentItemListControl->setTemplatesPlaceHolderId('w2pDgoContentTemplates'); //important, you can use this id to style something with css
	$contentItemListControl->setGetPermaLink('getPermaLink');
	$contentItemListControl->setFilter($filter);
	$contentItemListControl->setDetailLevel(EnumDetailLevel::NoDetails); //you can find all enums in file dgoControl/inc/enumclasses.php or see EOF
	$contentItemListControl->setShowPager(false);
	$contentItemListControl->setShowFilter(false);
	
	echo $stateControl->getControlHtml();
	echo $contentItemListControl->getControlHtml();
?>