<?php 
	$plugin_option = get_option("w2p_plugin_option");	
	
	$productDetailsPage = get_post(get_option('productdetailsPageID'));		
	//get meta tag for this post
	$productDetailsTitle = $productDetailsPage->post_title;
	
	if(isset($_POST['admin-option-language'])){
		$temp = explode('_',$_POST['admin-option-language']);
		
		$plugin_option['language'] = $temp[0];
		$plugin_option['language_name'] = $temp[1];
		
		$_SESSION["current_language"]['key'] = strtolower($temp[0])."_".$temp[0];
		
		$plugin_option['meta_tag_title'][$_POST['admin-option-language']] 		= $_POST['admin-option-metaTag-title'];
		$plugin_option['meta_tag_description'][$_POST['admin-option-language']] = $_POST['admin-option-metaTag-description'];
		
		//update option
        update_option('w2p_plugin_option', $plugin_option);
	}
	
	$language = explode("_", $_SESSION["current_language"]['key']);
	
	/*
	$plugin_option['meta_tag_title']['EN'] = '#sitename - #articlename print & order';	//default
	$plugin_option['meta_tag_title']['DE'] = '#sitename - #articlename drucken & bestellen';	//default
	$plugin_option['meta_tag_title']['VI'] = '#sitename - #articlename in ấn & đặt hàng';	//default
	$plugin_option['meta_tag_description']['DE'] = 'Schneller Versand und Produktion Ihrer #articlename und vieler weiterer interessanter Produkte.';	//default
	$plugin_option['meta_tag_description']['EN'] = 'Fast delivery & production for your #articlename and much more interessting products';	//default
	$plugin_option['meta_tag_description']['VI'] = '#articlename in hình nhanh và nhiều mặt hàng hấp dẫn khác';	//default
	
	//$plugin_option['articleGroup-subtypes-view'] = "thumbnail";
		
	//update option
    update_option('w2p_plugin_option', $plugin_option);
	*/
	if(isset($_POST['pageOptions'])){
		//create more subpages
		if($_POST['pageOptions'] == 0 && $plugin_option['PageOptions'] == "true"){
			removePageOnDemand();
			$plugin_option['PageOptions'] = "false";	
		}
		//remove all subpages
		if($_POST['pageOptions'] == 1 && $plugin_option['PageOptions'] == "false"){
			createPageOnDemand();
			$plugin_option['PageOptions'] = "true";
		}
		
		//update option
        update_option('w2p_plugin_option', $plugin_option);
	}
	
	if(isset($_POST['switch-dropdown-items'])){
		
		$plugin_option['SwitchDropdownItem'] = $_POST['switch-dropdown-items'];
		
		$plugin_option['articleGroup-subtypes-view'] = $_POST['switch-view-articlegroup'];
		
		//update option
        update_option('w2p_plugin_option', $plugin_option);
	}
	
	$languagesArr = $api->DoApiGetRequest('Languages/'.$language[1].'?compact', null, 'Languages:'.$language[1]);
	
	/* ========================= TRANSLATION =======================================*/		
	//Include language file
	require_once("language_w2p.php");			
	// Load up the plugin text domain
	load_plugin_textdomain( 
		$l10n_prefix,                        		// Plugin text domain reference
		false,                                     // False - deprecated parameter
		'Web_2_Print_XML_V3/inc/lang/' // Path to translation files
	);
	/*==============================================================================*/
?>   
<div class="widget-maintain">
     <form id="admin-page-form" method="post">
        <div class="cal-setting-div">
            <div class="cal-tittle-div"><div><span><?php _e('PageSettings', $l10n_prefix);?></span></div><div class="title-icon-toogle widget-hide"></div></div>
            <div class="cal-content-div">                
                <div class="second-content-div">
                    <div class="second-1-div"><div><span><?php _e('Options', $l10n_prefix);?></span></div><div><span></span></div></div>
                    <div class="second-2-div">
                    	<div class="page-options-block <?php echo ($plugin_option['PageOptions'] == "false"? 'page-options-block-selected' : '' ); ?>">
                    		<div class="page-options-input"><input style="margin: 2px;" type="radio" class="pageOptions-input" name="pageOptions" value="0" <?php echo ($plugin_option['PageOptions'] == "false"? 'checked="checked"' : '' ); ?> ></div>
                    		<div class="page-options-label"><?php _e('Widgetonly', $l10n_prefix);?></div>
                    	</div>
                    	<div class="page-options-block <?php echo ($plugin_option['PageOptions'] == "true"? 'page-options-block-selected' : '' ); ?>">
                    		<div class="page-options-input"><input style="margin: 2px;" type="radio" class="pageOptions-input" name="pageOptions" value="1" <?php echo ($plugin_option['PageOptions'] == "true"? 'checked="checked"' : '' ); ?>></div>
                    		<div class="page-options-label"><?php _e('WidgetSubpages', $l10n_prefix);?></div>
                    	</div>
                    </div>
                </div>
                <div class="footer-content-div">
                    <div class="footer-1-div"><span class="cal-del-span"><?php _e('Delete', $l10n_prefix);?></span> / <span class="cal-close-span"><?php _e('Close', $l10n_prefix);?></span></div>
                    <div class="footer-2-div"><div class="page-save-span admin-is-bottons"><span><?php _e('Save', $l10n_prefix);?></span></div></div>
                </div>
            </div>
        </div><!-- End calculator setting div -->        
     </form>        
    <div class="cus-setting-div">
        <form id="switch-dropdown-form" method="post">
            <div class="cal-tittle-div"><div><span><?php _e('DropdownSwitch', $l10n_prefix);?></span></div><div class="title-icon-toogle widget-hide"></div></div>                    
            <div class="cal-content-div">
                <div class="second-content-div">
	                <div class="second-1-div"><div><span><?php _e('Howmanyentriesdoyouwanttochoose', $l10n_prefix);?></span></div><div><span></span></div></div>
	                <div class="second-2-div">
	                	<div style="margin-right:5px;float: left;line-height:25px;"><?php _e('Entries', $l10n_prefix);?></div>
		                <select class="switch-dropdown-items" name="switch-dropdown-items">
		                	<?php 
		                		for($i = 0;$i <= 20; $i++){
		                			echo '<option value="'.$i.'">'.$i.'</option>';
		                		}
		                	?>		                    
		                </select>
	                </div>
                </div>
				<div class="second-content-div">
	                <div class="second-1-div"><div><span><?php _e('Changearticlegroupsubtypesview', $l10n_prefix);?></span></div><div><span></span></div></div>
	                <div class="second-2-div">
	                	<div style="width: 40%;float: left;line-height:30px;">
							<span><input type="radio" <?php echo ($plugin_option['articleGroup-subtypes-view'] == "thumbnail") ? "checked='checked'" : ""; ?> name="switch-view-articlegroup" value="thumbnail" style="margin: 2px;"></span>
							<span><?php _e('Thumbnail', $l10n_prefix);?></span>
						</div>
	                	<div style="width: 40%;float: left;line-height:30px;">
							<span><input type="radio" <?php echo ($plugin_option['articleGroup-subtypes-view'] == "dropdown") ? "checked='checked'" : ""; ?> name="switch-view-articlegroup" value="dropdown" style="margin: 2px;"></span>
							<span><?php _e('Dropdown', $l10n_prefix);?></span>
						</div>		                
	                </div>
                </div>
                <div class="footer-content-div">
                    <div class="footer-1-div"><span class="cus-del-span"><?php _e('Delete', $l10n_prefix);?></span> / <span class="cal-close-span"><?php _e('Close', $l10n_prefix);?></span></div>
                    <div class="footer-2-div"><div class="dropdown-switch-span admin-is-bottons"><span><?php _e('Save', $l10n_prefix);?></span></div></div>
                </div>                    
            </div> 
        </form>                                       
    </div><!-- End customer setting div -->
	<div class="cus-setting-div" style="width:340px;">
        <form id="meta-tag-form" method="post">
            <div class="cal-tittle-div"><div><span><?php _e('MetaTagInProductDetails', $l10n_prefix);?></span></div><div class="title-icon-toogle widget-hide"></div></div>                    
            <div class="cal-content-div">
                <div class="second-content-div">
	                <div class="second-1-div"><div><span><?php _e('Language', $l10n_prefix);?>:</span></div><div><span></span></div></div>
					<div style="float:left;width:150px;margin-left:50px"><?php _e('Availablevariables', $l10n_prefix);?>:</div>
	                <div class="second-2-div" style="overflow: hidden">
	                	<div style="width: 100px;float: left;line-height:25px;margin-right:10px;"><select name="admin-option-language" class="admin-option-language" style="width:100px;"></select></div>
	                	<div style="width: 150px;float: left;line-height:25px;margin-right:10px;">							
							<div style="border: 1px solid #DFDFDF;overflow:hidden;border-radius: 3px;padding: 5px;">
								<div>#sitename</div>
								<div>#articlename</div>
								<div>#motivename</div>
							</div>							
						</div>
						<div style="width: 100%;float: left;line-height:35px;"><?php _e('Metatagfortitle', $l10n_prefix);?></div>
						<div style="clear: both;"></div>
						<div style="width: 310px;float: left;line-height:25px;border:1px solid #DFDFDF;border-radius: 3px;padding-left:10px;"><input style="width:98%;border: none" type="text" value="<?php echo $plugin_option['meta_tag_title'][$language[1]]; ?>" style="border:none" name="admin-option-metaTag-title" class="admin-option-metaTag-title"></div>
						<div style="width: 100%;float: left;line-height:35px;"><?php _e('Metatagfordescription', $l10n_prefix);?></div>
						<div style="clear: both;"></div>
						<div style="height: 120px;width: 315px;float: left;line-height:25px;border:1px solid #DFDFDF;border-radius: 3px;padding-left:5px;"><textarea style="height: 110px;width:98%;border: none;resize:none" width="98%" style="border:none" name="admin-option-metaTag-description" class="admin-option-metaTag-description"><?php echo $plugin_option['meta_tag_description'][$language[1]]; ?></textarea></div>
	                </div>
                </div>
                <div class="footer-content-div">
                    <div class="footer-1-div"><span class="cus-del-span"><?php _e('Delete', $l10n_prefix);?></span> / <span class="cal-close-span"><?php _e('Close', $l10n_prefix);?></span></div>
                    <div class="footer-2-div"><div class="save-meta-tag admin-is-bottons"><span><?php _e('Save', $l10n_prefix);?></span></div></div>
                </div>                    
            </div> 
        </form>                                       
    </div>
</div><!-- End widget div -->

<script type="text/javascript">
	globalLanguage 		= '<?php echo $language[1]; ?>';
	var dropdownSwitch 	= '<?php echo $plugin_option['SwitchDropdownItem']?>';
	languageArr			= null;
	metaTagObj 			= <?php echo json_encode($plugin_option['meta_tag_title']);?>;
	metaTagDesObj 		= <?php echo json_encode($plugin_option['meta_tag_description']);?>;
	siteName 			= '<?php echo get_bloginfo(); ?>';
	
	//get language
	//adminControlGetLanguage( 'Admin-Option' );
	adminControlGetLanguage_handle(<?php echo $languagesArr; ?>, 'Admin-Option');
	
	jQuery('.switch-dropdown-items').val(dropdownSwitch);	
	
	jQuery('.admin-option-language').change(function(){
		jQuery('#meta-tag-form').submit();
	});
	
	jQuery('.save-meta-tag').click(function(){
		jQuery('#meta-tag-form').submit();
	});
</script>