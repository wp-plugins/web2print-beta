<?php 	
	/*
        Plugin Name: Web to Print Plugin v4.2
        Plugin URI: http://www.delivergo.com
        Description: Plugin, which allows you to sell products on your wordpress blog, using the delivergo web to print API.
        Author: Normprint Ltd.    		
		Version: 4.2.1
		$Revision: 3293 $
    */
	
	//add action when page is loaded
    add_action('init','initW2p');

    //When plugin is actived we will add our page to wordpress 
    register_activation_hook(__FILE__, 'pluginPrintInstall');    
    //When plugin is deactived we will add our page to wordpress 
    register_deactivation_hook(__FILE__, 'pluginPrintUninstall');      

    //add action admin head
    add_action('admin_head', 'addAdminHeader', 0);
    //add action to lay script and css on the header tag
    add_action('wp_head', 'addPrintHeader', 0);     
    //add action when the plugin is loaded
    add_action('plugins_loaded', 'pluginPrintLoad');
    //add action to create admin page
    add_action('admin_menu','createAdminMenu');    
    //add filter to hide pages
	add_filter('wp_list_pages_excludes', 'wphp_list_pages_excludes',1);
	
	//global config class. all parameters are static, so use
	//e.g.: W2PConfig::$PortalGuid to access the portal guid
    require_once dirname(__FILE__) . '/config/config.class.php';
	//PHP class providing useful
    require_once dirname(__FILE__) . '/inc/helper.class.php';
	//include shop cart pages here!
	require_once dirname(__FILE__) . '/inc/shopcartstuff.inc.php';
	//include order confirm pages here!
	require_once dirname(__FILE__) . '/inc/orderconfirmstuff.inc.php';
	//include sebs designer pages here!
	require_once dirname(__FILE__) . '/inc/designerstuff.inc.php';
	//include peter addressbook pages here!
	require_once dirname(__FILE__) . '/inc/addressbookstuff.inc.php';
	//include peter accountdetails pages here!
	require_once dirname(__FILE__) . '/inc/accountdetailstuff.inc.php';
	//include peter activation pages here!
	require_once dirname(__FILE__) . '/inc/activationaccountstuff.inc.php';
	//include peter earnmoney pages here!
	require_once dirname(__FILE__) . '/inc/earnmoneystuff.inc.php';
	//include peter all Orders pages here!
	require_once dirname(__FILE__) . '/inc/allorderstuff.inc.php';
	//include peter all Orders pages here!
	require_once dirname(__FILE__) . '/inc/productdetailstuff.inc.php';
	//include peter all Orders pages here!
	require_once dirname(__FILE__) . '/inc/articlepricesstuff.inc.php';
	//include peter all designs here!
	require_once dirname(__FILE__) . '/inc/alldesignsstuff.inc.php';
	//include peter design details page here!
	require_once dirname(__FILE__) . '/inc/designdetailsstuff.inc.php';
	//include peter my products page here!
	require_once dirname(__FILE__) . '/inc/myproductsstuff.inc.php';
	//include peter my motives page here!
	require_once dirname(__FILE__) . '/inc/mymotivestuff.inc.php';
	//include pagehandlers
	require_once dirname(__FILE__) . '/inc/pagehandlers.inc.php';
	//include options
	require_once dirname(__FILE__) . '/inc/w2poptions.inc.php';
	//include header includes
	require_once dirname(__FILE__) . '/inc/addheader.inc.php';
	//admin funtions
	require_once dirname(__FILE__) . '/inc/admin_function.php';	
	//wp widget controls
	require_once dirname(__FILE__) . '/inc/controls.inc.php';
	//wp plugin controls
	require_once dirname(__FILE__) . '/inc/plugincontrolstuff.inc.php';
	//include rewrite url function
	require_once dirname(__FILE__) . '/inc/rewriteUrl.inc.php';	
	//include shortcode
	require_once dirname(__FILE__) . '/inc/shortcode.php';

	function wphp_list_pages_excludes( $exclude_array ) {		
		$allOrderPageID 		= get_option('allOrderPageID');
		$confirmPageID 			= get_option('confirmPageID');
		$archiveID 				= get_option('archiveID');
		$earnMoneyPageID 		= get_option('earnMoneyPageID');
		$addressPageID 			= get_option('addressPageID');
		$profilePageID 			= get_option('profilePageID');
		$activationPageID 		= get_option('activationPageID');
		$shopCartPageID 		= get_option('shoppingPageID');
		$designerPageID 		= get_option('designerPageID');
		$productdetailsPageID 	= get_option('productdetailsPageID');
		$designDetailsPageID 	= get_option('designDetailsPageID');
		$myProductsPageID 		= get_option('myProductsPageID');
		$myMotivesPageID 		= get_option('myMotivesPageID');
		
	    $our_array = array($allOrderPageID, $confirmPageID, $archiveID, $earnMoneyPageID, $addressPageID, $profilePageID, $activationPageID, $shopCartPageID, $designerPageID, $productdetailsPageID, $designDetailsPageID, $myProductsPageID, $myMotivesPageID);
	    //add our pages to our_array here
	    $exclude_array = array_merge( $exclude_array, $our_array );
	    return $exclude_array;
	}

	//do some initialisation stuff
    function initW2p(){
    	session_start();	
		
		//global vars	
		$linkToPlugin = get_bloginfo('url').'/wp-content/plugins/Web_2_Print_XML_V3/';
		$linkToTheme  = W2PConfig::$PortalTagString == 'nhain' ? get_bloginfo('url').'/wp-content/themes/iblogpro_nhain/' : get_bloginfo('url').'/wp-content/themes/PlakateComWpTheme/';
		define('linkToPlugin', $linkToPlugin);
		define('linkToTheme', $linkToTheme);
    }

    //Plugin Install at activation time
    function pluginPrintInstall(){
    	//get options
    	getInitialOptions();		
		//create all web 2 print pages
		addW2pPages();
    	//create shop cart page
        createShopCartPage();
    	//create the designerpage -> out of designerstuff.inc.php ;)
        createDesignerPage();
		//create address book page
		createAddressBookPage();
		//create account details page
		createAccountDetailsPage();
		//create actication page
		createActivationAccountPage();
		//create earn money page
		createEarnMoneyPage();
		//create all orders page
		createAllOrdersPage();
		//create Order Confirm page
		createOrderConfirmPage();
		//create all designs page
		createAllDesignsPage();
		//create design details page
		createDesignDetailsPage();	
		//create my products page
		createMyProductsPage();
		//create my motives page
		createMyMotivesPage();	
		//add rewrite url rule
		rewriteUrl();	
	}
	
    //Plugin unInstall at deactivation time
    function pluginPrintUninstall(){
        //remove pages from wordpress
        //when plugin was uninstalled
    	removeW2pPages();
    }
   
    //Function call when plugin loaded
    function pluginPrintLoad(){
    	$plugin_option = get_option("w2p_plugin_option");	
   	 	//just show when active
		if($plugin_option['Visibility']['CustomerCenter'] == "true"){
			if(is_user_logged_in()){
				//include customerwidget
				require_once dirname(__FILE__) . '/inc/createcustomerwidget.inc.php';
			}		
		}else{
			//include customerwidget
			require_once dirname(__FILE__) . '/inc/createcustomerwidget.inc.php';
		}

	    //just show when active
		if($plugin_option['Visibility']['Calculator'] == "true"){
			if(is_user_logged_in()){
				//widget stuff
				require_once dirname(__FILE__) . '/inc/widgets.inc.php';
			}		
		}else{
			//widget stuff
			require_once dirname(__FILE__) . '/inc/widgets.inc.php';
		}
		
        // register a widget sidebar
        register_sidebar_widget('Web_2_Print XML V3', 'createCalculatorWidget');
        register_sidebar_widget('Customer Center Settings', 'createCustomerWidget');
        register_sidebar_widget('Template / Design settings', 'createTemplateWidget');
        // register a widget control
        register_widget_control('Web_2_Print XML V3', 'createCalculatorSideBarControl');
        register_widget_control('Customer Center Settings', 'createCustomerControl');
        register_widget_control('Template / Design settings', 'createTemplateControl'); 
    }
?>