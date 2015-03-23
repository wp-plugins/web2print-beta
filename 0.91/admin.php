<?php
function printwidget_page_settings(){
	wp_register_style("printwidget_admin_css", PW_CSS_URI.'style.css');
	wp_enqueue_style("printwidget_admin_css");
	wp_register_style("printwidget_slickswitch_css", PW_CSS_URI.'slickswitch.css');
	wp_enqueue_style("printwidget_slickswitch_css");
	wp_register_script("printwidget_slickswitch_script", PW_JS_URI.'jquery.slickswitch.js');
	wp_enqueue_script('printwidget_slickswitch_script'); 
	wp_register_script("printwidget_admin_script", PW_JS_URI.'printwidget.js');
	wp_enqueue_script('printwidget_admin_script'); 
	
	$printwidgetSettings = get_option('printwidgetSettings');
	$errorDisplay = "none";
	if(isset($_POST['jsCode'])){
		$header_response = @get_headers($_POST['jsCode'], 1);
		if ( strpos( $header_response[0], "404" ) !== false ){
			//FILE DOES NOT EXIST
			$errorDisplay = "block";
		} 
		else{
			//FILE EXISTS!!
			$printwidgetSettings['jsCode'] = $_POST['jsCode'];
			update_option( 'printwidgetSettings', $printwidgetSettings );
		}		
	}
	
	if(isset($_POST['pageSubmit'])){
		if(isset($_POST['active_checkbox'])){
			$printwidgetSettings['pagesFilter'] = $_POST['active_checkbox'];
			update_option( 'printwidgetSettings', $printwidgetSettings );
		}else{
			$printwidgetSettings['pagesFilter'] = null;
			update_option( 'printwidgetSettings', $printwidgetSettings );
		}
		
	}
	
	if(isset($_POST['categorySubmit'])){
		if(isset($_POST['active_checkbox_cat'])){
			$printwidgetSettings['categoriesFilter'] = $_POST['active_checkbox_cat'];
			update_option( 'printwidgetSettings', $printwidgetSettings );
		}else{
			$printwidgetSettings['categoriesFilter'] = null;
			update_option( 'printwidgetSettings', $printwidgetSettings );
		}
	}
	
	include dirname(__FILE__) . '/inc/admin.inc.php';
}
?>