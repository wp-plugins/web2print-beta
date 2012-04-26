<?php

	function getInitialOptions(){
		//=========================================Include options to wordpress==============================================//		
		/*$color options*/
		$color[0] = 'a1a1a1'; $color[1] = 'ffffff'; $color[2] = '5c5c5c'; $color[3] = '6b6b6b'; 
		$color[4] = 'ffffff'; $color[5] = 'ffffff'; $color[6] = 'e3e3e3'; $color[7] = 'fffcff';  $color['radius'] = '10';
		$color[8] = 'ffffff'; $color[9] = '9c9c9c'; $color[10] = '969696'; $color[11] = '787878';$color[12] = 'e6e6e6';
		$color['buttontextshadow']='1';
		$color['headertextshadow']='1';
		$color['headertext']['EN'] ='Order Product';
		$color['headertext']['DE'] ='Hier bestellen';$color['headertext']['VI']='Đặt Hàng';
		$color['NetendpriceText']['EN']='* Prices excl. VAT plus Shipping.';
		$color['NetendpriceText']['DE']='* Preise exkl. MwSt. zzgl. Versand.';
		$color['NetendpriceText']['VI']='* Giá không bao gồm VAT và phí vận chuyển.';
		$color['GrossendpriceText']['EN']='* Prices incl. VAT plus shipping.';
		$color['GrossendpriceText']['DE']='* Preise inkl. MwSt. zzgl. Versand.';
		$color['GrossendpriceText']['VI']='* Giá đã bao gồm VAT và phí vận chuyển.';
		$color['button_text']['VI']='Tải hình';
		$color['button_text']['EN']='Upload Picture';
		$color['button_text']['DE']='Bild auswählen';
		delete_option('colors');
		add_option('colors', $color); 
		
		/*$profile options*/
		$profile_user['apikey'] = 'none';
		$profile_user['secret'] = 'none';
		$profile_user['resale'] = 'none';
		$profile_user['resaleGuid'] = 'none';
		$profile_user['EndUserPriceFormat'] = 'none';
		$profile_user['MaxNumOfResaleUnits'] = 'none';
		
		$profile_user_check = get_option('profile_user_info');
		//if($profile_user_check['apikey'] == ''){
			delete_option('profile_user_info');
			add_option('profile_user_info', $profile_user);
		//}		
		
		/*plugin option*/
		$plugin_option['edited'] = false; //default
		$plugin_option['language'] = 'EN'; //default
		$plugin_option['language_name'] = 'English'; //default
		$plugin_option['currency'] = 'EUR'; //default
		$plugin_option['dimension'] = 'mm';	//default
		$plugin_option['header_option_show'] = true;	//default
		$plugin_option['articleGroup-subtypes-view'] = "thumbnail";	//default
		$plugin_option['meta_tag_title']['EN'] = '#sitename - #articlename print & order';	//default
		$plugin_option['meta_tag_title']['DE'] = '#sitename - #articlename drucken & bestellen';	//default
		$plugin_option['meta_tag_title']['VI'] = '#sitename - #articlename in ấn & đặt hàng';	//default
		$plugin_option['meta_tag_description']['EN'] = 'Schneller Versand und Produktion Ihrer #articlename und vieler weiterer interessanter Produkte.';	//default
		$plugin_option['meta_tag_description']['DE'] = 'Fast delivery & production for your #articlename and much more interessting products';	//default
		$plugin_option['meta_tag_description']['VI'] = '#articlename in hình nhanh và nhiều mặt hàng hấp dẫn khác';	//default
		$plugin_option['Visibility']['Calculator'] = "false";	//default
		$plugin_option['Visibility']['CustomerCenter'] = "false";	//default
		$plugin_option['Visibility']['TemplateDesign'] = "false";	//default
		$plugin_option['PageOptions'] = "false";	//default: just show widget and some pages in costumer center		
		$plugin_option['SwitchDropdownItem'] = "10";	//default: just show widget and some pages in costumer center		
		
		delete_option('w2p_plugin_option');
		add_option('w2p_plugin_option', $plugin_option);
	}

?>