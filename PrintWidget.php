<?php 	
	/*
        Plugin Name: Print widget
        Plugin URI: http://www.delivergo.com
        Description: Print widget Plugin, which allows you to sell motives on your wordpress blog.
        Author: Normprint Ltd.    		
		Version: 0.91
    */	
	
	define('PW_URI', site_url().'/wp-content/plugins/web2print-beta/');	
	define('PW_INC_URI', PW_URI . 'inc/');
	define('PW_CSS_URI', PW_URI . 'css/');
	define('PW_JS_URI', PW_URI . 'js/');
	
	include_once dirname(__FILE__) . '/functions.php';
	
	//When plugin is actived we will add some settings to wordpress 
    register_activation_hook(__FILE__, 'printwidget_install');
	//When plugin is deactived we will remove all settings
    register_deactivation_hook(__FILE__, 'printwidget_uninstall');	
	//add admin menu
	add_action('admin_menu','printwidget_admin_menu');
	//add warning message
	add_action('admin_notices', 'printwidget_notices', 10);
	//add script to footer
	add_action('get_footer', 'printwidget_run', 1);
?>