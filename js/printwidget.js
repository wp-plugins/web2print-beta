jQuery('.np_settings_menu li').click(function(){
	jQuery('.np_settings_menu li').removeClass('np_menu_selected');
	jQuery(this).addClass('np_menu_selected');
	var id = jQuery('.np_menu_selected input').val();
	jQuery('.np_settings_tab').hide();
	jQuery('#'+id).show();
	window.location.hash = id.replace("np_","");
});

jQuery('.np_save_setting').click(function(){
	jQuery('.np_setting_items input').css('border-color','#CCCCCC');
	var jsCode = jQuery('.np_setting_items input').val().split('/')[0];
	var regexp = /(ftp|http|https):?/;
	if(regexp.test(jsCode) == true){
		jQuery('#npSettingsForm').submit();
	}else{
		jQuery('.np_setting_items input').css('border-color','#FF0000');
	}
});

jQuery('.np_save_pages').click(function(){
	jQuery('#npPagesForm').submit();
});

jQuery('.np_save_categories').click(function(){
	jQuery('#npCategoriesForm').submit();
});

jQuery('.activeAll_checkbox').click(function(){
	console.log(jQuery(this).attr('checked'));
});

setTimeout(function(){
	if(window.location.hash != ""){
		jQuery('input[value="np_'+window.location.hash.substr(1)+'"]').parent().click();
	}
	
	if(npSettings.jsCode != null){
		jQuery('#np_message').hide();
	}
		
	jQuery('.active_checkbox').slickswitch();
	jQuery('.active_checkbox_cat').slickswitch();
	jQuery('.activeAll_checkbox').slickswitch({
		toggledOn: function() {
			jQuery('input[name="active_checkbox[]"]').each(function(){
				if(jQuery(this).attr('checked') == undefined){
					jQuery(this).next().children('.ss-slider').click();
				}
			});			
		},
		toggledOff: function() {
			jQuery('input[name="active_checkbox[]"]').each(function(){
				if(jQuery(this).attr('checked') != undefined){
					jQuery(this).next().children('.ss-slider').click();
				}
			});	
		}
	});
	jQuery('.activeAll_checkbox_cat').slickswitch({
		toggledOn: function() {
			jQuery('input[name="active_checkbox_cat[]"]').each(function(){
				if(jQuery(this).attr('checked') == undefined){
					jQuery(this).next().children('.ss-slider').click();
				}
			});			
		},
		toggledOff: function() {
			jQuery('input[name="active_checkbox_cat[]"]').each(function(){
				if(jQuery(this).attr('checked') != undefined){
					jQuery(this).next().children('.ss-slider').click();
				}
			});	
		}
	});
	jQuery('.ss-on').hide();

	if(npSettings.pagesFilter != null){
		if(jQuery('input[name="active_checkbox[]"]').length != npSettings.pagesFilter.length){
			for(var i = 0;i < npSettings.pagesFilter.length;i++){
				jQuery('.np_input_page input[value="'+npSettings.pagesFilter[i]+'"]').next().click();
			}
		}else{
			jQuery('input[name="activeAll_checkbox"]').next().children('.ss-slider').click();
		}
	}
	
	if(npSettings.categoriesFilter != null){
		if(jQuery('input[name="active_checkbox_cat[]"]').length != npSettings.categoriesFilter.length){
			for(var i = 0;i < npSettings.categoriesFilter.length;i++){
				jQuery('.np_input_cat input[value="'+npSettings.categoriesFilter[i]+'"]').next().click();
			}
		}else{
			jQuery('input[name="activeAll_checkbox_cat"]').next().children('.ss-slider').click();
		}
	}
	
}, 50);