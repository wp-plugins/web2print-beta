<?php 
	$printwidgetSettings = get_option('printwidgetSettings');	
	$jsCode = isset($_POST['jsCode']) == true ? $_POST['jsCode'] : $printwidgetSettings['jsCode'];
?>
<div class="np_container">
	<div class="np_header">
		<span></span>
		<span><h2>Print widget - Manage your print widget settings.</h2></span>
	</div>
	<div class="np_settings_container">		
		<div class="np_settings_content">
			<div class="np_settings_menu">
				<ul>
					<li class="np_menu_selected">Settings<input type="hidden" value="np_settings"></li>
					<li>Pages<input type="hidden" value="np_pages"></li>
					<li>Categories<input type="hidden" value="np_categories"></li>
				</ul>
			</div>
			<div class="np_settings_tab" id="np_settings" style="display:block;">
				<form id="npSettingsForm" method="post">
					<p>To enable the plugin, enter your JS Code.</p>
					<div class="np_setting_items">
						<span>JS code:</span>
						<span><input type="text" name="jsCode" value="<?php echo $jsCode; ?>" placehoder="JS Code"></span>
						<span style="display:<?php echo $errorDisplay; ?>"></span>
						<span style="display:<?php echo $errorDisplay; ?>">We can not find your js code above. Please check it again.</span>
					</div>					
					<div class="np_setting_button np_border_5px np_save_setting">Save settings</div>
					<div class="np_settings_notices">
						<p>Please enter your JS Code with the affiliate informations above. If you can't find your Print Widget JS Code, contact us please - <a href="mailto:support@delivergo.com">support@delivergo.com</a>.</p>
					</div>
				</form>
			</div>
			<div class="np_settings_tab" id="np_pages">
				<form id="npPagesForm" method="post">
					<div class="np_setting_page_container np_border_top_right_5px">
						<div class="np_setting_page np_setting_page_header np_border_top_right_5px">
							<span class="np_label">All pages</span>
							<span class="np_input np_input_page"><input value="allPages" type="checkbox" name="activeAll_checkbox" class="activeAll_checkbox switch icons"></span>
						</div>
						<?php
							$args = array(
								'sort_order' => 'ASC',
								'sort_column' => 'post_title',				
								'post_type' => 'page',
								'post_status' => 'publish'
							); 
							//get all pages from wordpress.
							$pages = get_pages($args);
							foreach($pages as $key => $value){
						?>
							<div class="np_setting_page">
								<span class="np_label"><a href="post.php?post=<?php echo $value->ID; ?>&action=edit"><?php echo $value->post_title; ?></a></span>
								<span class="np_input np_input_page"><input value="<?php echo $value->ID; ?>" type="checkbox" name="active_checkbox[]" class="active_checkbox switch icons"></span>
							</div>
						<?php
							}
						?>
					</div>
					<input type="hidden" value="pageSubmit" name="pageSubmit">
				</form>
				<div class="np_setting_button np_border_5px np_save_pages">Save settings</div>
			</div>
			<div class="np_settings_tab" id="np_categories">
				<form id="npCategoriesForm" method="post">
					<div class="np_setting_page_container np_border_top_right_5px">
						<div class="np_setting_page np_setting_page_header np_border_top_right_5px">
							<span class="np_label">All categories</span>
							<span class="np_input np_input_page"><input value="allPages" type="checkbox" name="activeAll_checkbox_cat" class="activeAll_checkbox_cat switch icons"></span>
						</div>
						<?php
							$args = array(
								'order' => 'ASC',
								'orderby' => 'name',				
								'type' => 'post',
								'child_of' => 0,
							); 
							//get all pages from wordpress.
							$categories = get_categories($args);
							foreach($categories as $key => $value){
						?>
							<div class="np_setting_page">
								<span class="np_label"><?php echo $value->name; ?></span>
								<span class="np_input np_input_cat"><input value="<?php echo $value->cat_ID; ?>" type="checkbox" name="active_checkbox_cat[]" class="active_checkbox_cat switch icons"></span>
							</div>
						<?php
							}
						?>
						<input type="hidden" value="categorySubmit" name="categorySubmit">
					</div>
				</form>
				<div class="np_setting_button np_border_5px np_save_categories">Save settings</div>				
			</div>			
		</div>
	</div>
</div>
<script>
	var npSettings = <?php echo json_encode($printwidgetSettings); ?>;
	var npPages = <?php echo json_encode($pages); ?>;
</script>