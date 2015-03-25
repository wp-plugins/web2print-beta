<?php
//install printwidget plugin and define some settings.
function printwidget_install(){
	$printwidgetSettings = array(
							"jsCode" => null,
							"pagesFilter" => null,
							"categoriesFilter" => null
							);
	delete_option('printwidgetSettings');
	add_option('printwidgetSettings', $printwidgetSettings); 
}

//install printwidget plugin and define some settings.
function printwidget_uninstall(){
	$printwidgetSettings = get_option('printwidgetSettings');
	delete_option('printwidgetSettings');	
}

//function create admin page
function printwidget_admin_menu(){	
	//parent menu Web 2 print
	add_options_page('Print Widget', 'Print Widget', 8, 'printwidget', 'printwidget_page_settings');
	//admin functions
	include_once dirname(__FILE__) . '/admin.php';
}

//function add notices
function printwidget_notices(){
	$printwidgetSettings = get_option('printwidgetSettings');	
	if($printwidgetSettings['jsCode'] == null){
		include_once dirname(__FILE__) . '/inc/notice.inc.php';
	}
}

//add print widget code to post or page outside.
function printwidget_run(){
	global $post;	
	$post_categories = wp_get_post_categories($post->ID);	
	$printwidgetSettings = get_option('printwidgetSettings');
	if($printwidgetSettings['jsCode'] != null){
		if($post->post_type == "page"){
			if($printwidgetSettings['pagesFilter'] != null){
				foreach($printwidgetSettings['pagesFilter'] as $key => $value){
					if($post->ID == $value){
	?>
						<script src="<?php echo PW_JS_URI.'jquery.js'; ?>"></script>
						<script src="<?php echo PW_JS_URI.'jquery-ui.js'; ?>"></script>
						<script src="<?php echo $printwidgetSettings['jsCode']; ?>"></script>						
	<?php
						break;
					}
				}
			}
		}else{
			if($printwidgetSettings['categoriesFilter'] != null){
				foreach($post_categories as $k => $v){
					foreach($printwidgetSettings['categoriesFilter'] as $key => $value){
						if($v == $value){
?>
							<script src="<?php echo PW_JS_URI.'jquery.js'; ?>"></script>
							<script src="<?php echo PW_JS_URI.'jquery-ui.js'; ?>"></script>
							<script src="<?php echo $printwidgetSettings['jsCode']; ?>"></script>							
<?php
							break;
						}
					}
				}
			}
		}
	}else{
?>
		<script>console.log("Print widget plugin: Missing JS Code!")</script>
<?php
	}
	
}
?>