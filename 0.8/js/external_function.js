/**
*   Usage:  number_format(123456.789, 2, '.', ',');
*   result: 123,456.79
**/
function number_format(number, decimals, dec_point, thousands_sep) {
    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d = dec_point == undefined ? "," : dec_point;
    var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
 
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function isNumber(e){
	var keypressed = null;

	if (window.event)
	{
		keypressed = window.event.keyCode; //IE
	}
	else
	{
		keypressed = e.which; //NON-IE, Standard
	}

	if (keypressed < 48 || keypressed > 57){ //CharCode 0 
		//CharCode 9
		if (keypressed == 8 || keypressed == 127){//Ph�m Delete v� Ph�m Back
			return;
		}
			return false;
	}else if(jQuery('.amount-input').val().length > 3){
		return false;
	}
}

function best_product_over(){
	jQuery('.best-product-element best-product-img-over').css({"display":"block"});
}

function best_product_out(){
	jQuery('.best-product-element best-product-img-over').css({"display":"none"});
}

//print part of page
function printPage(tagName,isId,windowName,url,width,height,arrayCss)
{
   arrayCss = arrayCss.split("|");
   
   var  html = "<html>";
   for(var i = 0;i < arrayCss.length;i++){
	   html += "<link href='" + web_2_print_blogInfo + "css/"+arrayCss[i]+"' rel='stylesheet' type='text/css'/>";
   }
   		
   		html += "<body style='font-family:Tahoma;font-size:12px'>";
   		html += "<div style='width:"+width+"px;float:right;height:42px;margin:0 10px 20px 0;text-align:right;cursor:pointer'><img src='" + web_2_print_blogInfo + "css/img/icon/print.png' border='0' onclick='window.print()' style='border:1px solid #CCC;border-radius: 5px;padding:5px'></div>";
   		html += "<div style='width:"+width+"px;padding:10px;margin:0 auto;float:left'>";   		
   		if(isId == 'true'){
   		   html += jQuery('#'+tagName).html();
   	    }else{
   		   html += jQuery('.'+tagName).html();
   	    }
   	   
   	   html += "</div>";
   	   html += "</body>";
   	   html += "</html>";
   
   var configWindow = 'left=0,top=0,scrollbars=1,width='+(width*1+50)+',height='+height;	   
    
   var printWin = window.open(url,windowName,configWindow);
   
   printWin.document.write(html);
   printWin.document.close();
   printWin.focus();
}

/*This file using for external functions*/
/*This function using for many onload functions*/
    //function to use multi onload
    function addLoadEvent(func) { 
      var oldonload = window.onload; 
      if (typeof window.onload != 'function') { 
        window.onload = func; 
      } else { 
        window.onload = function() { 
          if (oldonload) { 
            oldonload(); 
          } 
          func(); 
        } 
      } 
    }

/*Order product functions*/
    //Multi upload handler
    function multiUploadClick(){
        //parse value to hidden input
        jQuery('.typeSelHidden').val(jQuery('#typeSel').val());                    
        
        //open dialog
        jQuery('.multiUploadForm').dialog('open');
        jQuery('.multiUploadForm').dialog({ position: 'center' });
        if(jQuery('.right-content-upload').css('display') == 'block' && jQuery('.left-content-upload').css('display') == 'block'){
            jQuery('.left-content-upload').animate({width: 'toggle'},0);
            jQuery('.title-upload-import').animate({width: 'toggle'},0);
            jQuery('.left-footer-upload').css({display: 'none'});    
        }
    }

    //Direct upload handler
    function directUploadHandler(){
        //parse value to hidden input
        jQuery('.motifHidden').val(jQuery('#motifsel').val());
        jQuery('.typeSelHidden').val(jQuery('#typeSel').val());                    
        jQuery('.runHidden').val(jQuery('#runSel').val());

        //open dialog
        jQuery('.directUploadForm').dialog('open');
        jQuery('.directUploadForm').dialog({ position: 'center' });
    }
    
    //view upload container
    function viewUploadPanel(){
        //toogle
        jQuery('.title-upload-import').animate({width: 'toggle'},0);
        jQuery('.title-upload-upload').animate({width: 'toggle'},0);
        jQuery('.left-content-upload').animate({width: 'toggle'},500);
        jQuery('.right-content-upload').animate({width: 'toggle'},500);
        jQuery('.left-footer-upload').css({display: 'none'});
        
        //change button name
        jQuery('.footer-buttons span').html('Shopping Cart');
        
        //show upload content
        jQuery('.upload-center-content').css({display: 'block'});
        jQuery('.facebook-center-content').css({display: 'none'});
        
        //import picture to upload container
        importFromFacebook();
        
        //reset selected picture
        stt_begin = [];
    }
    
    //view facebook panel
    function viewFacebookPanel(){
        //toogle
        jQuery('.title-upload-import').animate({width: 'toggle'},0);
        jQuery('.title-upload-upload').animate({width: 'toggle'},0);
        jQuery('.right-content-upload').animate({width: 'toggle'},500);
        jQuery('.left-content-upload').animate({width: 'toggle'},500);
        jQuery('.left-footer-upload').css({display: 'block'});
        
        //change button name
        jQuery('.footer-buttons span').html('Next');
        
        //show facebook content
        jQuery('.upload-center-content').css({display: 'none'});
        jQuery('.facebook-center-content').css({display: 'block'});
        
        //reset import from facebook
        resetFromFacebook();
    }
    
    //function get selected pictures
    function pictures_selected_get(){        
        var iframeEl = document.getElementById('album-photo-iframe');
        var form = iframeEl.contentDocument.getElementById('selected-form');
        if(form){
            //get album id
            var albumID = form.albumID.value;
            
            //array temp
            var arr_temp = new Array();
            
            for(var i = 0; i < form.elements.length - 1; i++){ 
                var k = i + 1;               
                arr_temp[i] = form.elements[k].value;
            }
            
            //save to array with albumID
            picturesArr[albumID] = arr_temp;
            //for(i in picturesArr){console.log(picturesArr[i][0])};
        };
    }
    
    //check session is cleared or not
    function session_picture_check(){
         var iframeEl = document.getElementById('album-photo-iframe');
         var form = iframeEl.contentDocument.getElementById('null-form');
         
         if(form){
             //jQuery('.list-albums-import').replaceWith('<div class="facebook-login-import"><span>Login to facebook:</span><br/><br/><fb:login-button id="bottons-facebook" perms="user_photos,friends_photos,user_photo_video_tags,friends_photo_video_tags" onlogin="facebook_events_index_page();">Facebook</fb:login-button></div>');
             jQuery('.list-albums-import').empty();
         }        
    }
    
    //import picture from facebook
    function importFromFacebook(){
        //import the last select to array
        pictures_selected_get();
        
        //content add to upload container
        var pictureFacebookOption = '';
        
        //parse array
        for(i in picturesArr){
            for(var j = 0; j < picturesArr[i].length; j++){
                //pictureFacebookOption += '<div class="border-upload-picture"><div class="fix-upload-picture"><img src="' + picturesArr[i][j] + '" alt="" height="100"></div></div>';
                facebook2S3(picturesArr[i][j]);
            }
        }
        
        //clear array
        picturesArr = [];
        
        //jQuery('.upload-center-content').append(pictureFacebookOption);
    }
    
    //reset import from facebook
    function resetFromFacebook(){
        //reset title
        jQuery('.count-pictures-input').val(0);
        jQuery('#detail-album-form span').html('Pictures in album');
        
        //call list album
        var f = document.getElementById('album-photo-iframe');
        f.src = web_2_print_blogInfo + 'inc/fbClass/list_photo_page.php?albumID=' + lastAlbumSelected + '&stt=notbegin';
        
        //reset count picture selected
        jQuery('.count-selected-input').val(0);
    }
    
    //logout facebook
    function facebookLogout(){
        jQuery('.left-footer-upload .zero-left-footer').remove();
        jQuery('.left-footer-upload').prepend('<div class="zero-left-footer"><span>Do you have an account of facebook. Click here to login</span></div>');
        jQuery('.first-left-footer').empty();
        jQuery('.second-left-footer').empty();
        jQuery('.list-albums-import').empty();
        
        //clear session
        //call list album
        var f = document.getElementById('album-photo-iframe');
        f.src = web_2_print_blogInfo + 'inc/fbClass/list_photo_page.php?albumID=none';
        
        //reset title
        jQuery('.count-pictures-input').val(0);
        jQuery('#detail-album-form span').html('Pictures in album');
        jQuery('.title-upload-import .first-title span').html('Album: 0');
        //reset count picture selected
        jQuery('.count-selected-input').val(0);
        
        //change state
        viewUploadPanel();
    }
/*-----------------------*/    
    //function when click order
    function orderSubmit(){      
        jQuery('#submitForm').submit();                                       
    }
/*------------------------------------------------------------*/

/* Shopping Cart */
//function calculat price
function priceCalculate( affiliatePercent, affiliateAmount, price, rabate){
	var priceCal = affiliatePercent + affiliateAmount + price + rabate;
	return priceCal;
}

//function sum cost
function finalSumCost(){
    //sum cost
    var sumCost = 0;
    
    //calculate sum cost from articles
    for(var i in shop_articles){
    	if(shop_articles[i].ProductPriceVAT != undefined){
    		sumCost += parseFloat(shop_articles[i].ProductPriceVAT);
    	}    	
    }
    
    if(jQuery('.cal-shipping-input').val() != ''){
    	//shipping cost
	    sumCost += parseFloat(jQuery('.cal-shipping-input').val());
	}else{
		jQuery('#shipping-price').html("");
	}
	
	if(jQuery('.cal-payment-input').val() != ''){  
	    //payment cost
	    sumCost += parseFloat(jQuery('.cal-payment-input').val());
	}
	
	if(jQuery('.payment-method').children('.payment-method-price').html() == null){
		//show sum cost
		jQuery('.cal-sum-cost .cal-sum-value').html(formatCurrency(sumCost, globalCurrency) + ' ' + globalCurrency);
    	jQuery('.cal-sum-cost input').val(sumCost);	  
	}else{
		if(jQuery('.payment-method').children('.payment-method-price').html().split(" ")[1] == globalCurrency){
			//show sum cost
			jQuery('.cal-sum-cost .cal-sum-value').html(formatCurrency(sumCost, globalCurrency) + ' ' + globalCurrency);
	    	jQuery('.cal-sum-cost input').val(sumCost);
		}
	}
}

//function reset shop cart
function emptyShopCartReset(){
	//check for article exist
}

//submit payment check out
function submit_payment_vt(num) {
    jQuery('#hidPaymentType').val(num);
    jQuery('#frmVTPayment').submit();
    return true;
}

/*=============================================================*/
//show login dialog
function showLoginDialog(){
	jQuery( ".dgo-errorMessage" ).dialog('close');
	jQuery( ".addnewaddressForm" ).dialog('close');
	jQuery( ".loginForm" ).dialog('open');
	jQuery( ".loginForm" ).dialog({ position: 'center' });
}

//function close error message in shopCart
function hideErrorDialog(){
	jQuery( "#email" ).val("");
	jQuery( "#email" ).focus();
	jQuery( ".dgo-errorMessage" ).dialog('close');
}

//function show password fields in shopCart
function showPasswordField(){
	jQuery('#password').val('');
	jQuery('.address-password-content-message').html('');
	jQuery('.add-info-password-message').hide();
	jQuery('.address-name-password').removeClass('address-input-check');
	jQuery('.address-name-password .address-check').removeClass('check-img-false');
	jQuery('.add-info-password').slideToggle("fast");
}
/*------------------------------------------------------------*/
//show edit & delete button when mouse out when add address in ShopCart
function showButton(id){
	jQuery("div#"+id+"-edit").show();
	jQuery("div#"+id+"-delete").show();
}

//hide edit & delete button when mouse out when add address in ShopCart
function hideButton(id){
	jQuery("div#"+id+"-edit").hide();
	jQuery("div#"+id+"-delete").hide();
}
//Open new window to login with google account
function importGoogleLogin(){
	NewWindow(web_2_print_blogInfo + 'inc/importGoogleLinkedin/importGoogle.php','importGoogle','800','450','no');	
}

//Open new window to login with linkedin account
function importLinkedInLogin(){
	NewWindow(web_2_print_blogInfo + 'inc/importGoogleLinkedin/importLinkedin.php?lType=initiate','importLinkedIn','800','450','no');
}
//Checking contacting exist before showing the dialog with linkedin contact inside
function importLinkedinContact(){
	if(dgoContacting != ""){
		jQuery( "#import-contacting-linkedin" ).dialog('open');
		jQuery( "#import-contacting-linkedin" ).dialog({ position: 'center' });
	}
}

//Checking contacting exist before showing the dialog with google contact inside
function importGoogleContact(){
	if(dgoContacting != ""){
		jQuery( "#import-contacting" ).dialog('open');
		jQuery( "#import-contacting" ).dialog({ position: 'center' });
	}
}
/*********function get current TimeZone Id****************/
function getTimeZoneId(){
	var date = new Date()
						
	var gmtInMinutes = -date.getTimezoneOffset();
	
	var daylightsavingtime = DaylightSavingTime();//check if daylighsavingtime is observed or not												
	
	for(var i in dgoTimeZones){
		if(daylightsavingtime == false){
			if(dgoTimeZones[i].UtcOffsetInMinutes == gmtInMinutes && dgoTimeZones[i].SupportsDaylightSaving == undefined){
				var TimeZone = dgoTimeZones[i].Id;													
			}
		}else{
			if(dgoTimeZones[i].UtcOffsetInMinutes == gmtInMinutes && dgoTimeZones[i].SupportsDaylightSaving == true){
				var TimeZone = dgoTimeZones[i].Id;
			}
		}		
	}
	
	return TimeZone;
}
/*********function get current TimeZone Token****************/
function getTimeZoneToken(){
	var date = new Date()
						
	var gmtInMinutes = -date.getTimezoneOffset();
	
	var daylightsavingtime = DaylightSavingTime();//check if daylighsavingtime is observed or not												
	
	for(var i in dgoTimeZones){
		if(daylightsavingtime == false){
			if(dgoTimeZones[i].UtcOffsetInMinutes == gmtInMinutes && dgoTimeZones[i].SupportsDaylightSaving == undefined){
				var TimeZone = dgoTimeZones[i].Token;													
			}
		}else{
			if(dgoTimeZones[i].UtcOffsetInMinutes == gmtInMinutes && dgoTimeZones[i].SupportsDaylightSaving == true){
				var TimeZone = dgoTimeZones[i].Token;
			}
		}		
	}
	
	return TimeZone;
}

/**********function daylightSavingTime****************/
function DaylightSavingTime(){
	var myDate = new Date();
	var january_date1 = new Date(myDate.getFullYear(), 0, 1, 0, 0, 0, 0);
	var gmtString = january_date1.toGMTString();
	var january_date2 = new Date(gmtString.substring(0, gmtString.lastIndexOf(" ")-1));
	var std_time_offset = (january_date1 - january_date2) / (1000 * 60 * 60);
	
	var june_date1 = new Date(myDate.getFullYear(), 6, 1, 0, 0, 0, 0);
	gmtString = june_date1.toGMTString();
	var june_date2 = new Date(gmtString.substring(0, gmtString.lastIndexOf(" ")-1));
	var daylight_time_offset = (june_date1 - june_date2) / (1000 * 60 * 60);	
	
	if (std_time_offset == daylight_time_offset) {
	    return false; // daylight savings time is NOT observed
	} else {
	    return true; // daylight savings time is observed
	}
}
//=============================================================
 //check address from shopping cart
function CheckAddressShopping(id){
	jQuery('.addressContainer').find('.shopping-contact-item').each(function(){
		jQuery(this).removeClass('address-selected');
	});

	jQuery('#address-'+id).addClass('address-selected');
	jQuery('#check-address-'+id).attr('checked',true);
	
	
	var label_address_add = jQuery('#address-'+id+' .shopping-contact-item-content .shopping-field-first-name').html() + ' ';
	label_address_add += jQuery('#address-'+id+' .shopping-contact-item-content .shopping-field-last-name').html() + ', ';
	label_address_add += jQuery('#address-'+id+' .shopping-contact-item-content .shopping-field-street').html() + ', ';
	label_address_add += jQuery('#address-'+id+' .shopping-contact-item-content .shopping-field-city').html();
	
	label_address_add = label_address_add.slice(0,34);
	label_address_add += '..';
	
	jQuery( ".addressForm" ).dialog('close');
	if(jQuery('#address-'+id+' .shopping-contact-item-content .shopping-field-first-name').html() != "" ||
	   jQuery('#address-'+id+' .shopping-contact-item-content .shopping-field-last-name').html() != "" ||
	   jQuery('#address-'+id+' .shopping-contact-item-content .shopping-field-street').html() != "" ||
	   jQuery('#address-'+id+' .shopping-contact-item-content .shopping-field-city').html() != "")
	   {
			jQuery('.payment-address span').html(label_address_add);   	
	   }
	
	
	//check country
	var country_chosen = jQuery('#address-'+id+' .shopping-contact-item-content .shopping-field-countryToken').html();
	
	/*if(jQuery('.right-ship-country select').val() != country_chosen){
		jQuery('.right-ship-country select').val(country_chosen);
		jQuery('.right-ship-country select').attr({ disabled: "disabled" });
		//if this country has states
	   	statesGet( "GetPrice" );
    }*/
}

//show all address in shopping cart
function showAllAddressShopping(){
	jQuery('.addressContainer').find('.shopping-contact-item').each(function(){
		jQuery(this).show();
	});
}

//show icon in address shopping
function displayIcon(id){
	jQuery('#tick-'+id).show();
}

//hide icon in address shopping
function hideIcon(id){
	jQuery('#tick-'+id).hide();
}

//change password in account details
function changePasswordAccount(){
	jQuery( ".changePassForm" ).dialog('open');
	jQuery( ".changePassForm" ).dialog({ position: 'center' });
}
function recoverPassword(){
	jQuery( ".addnewaddressForm" ).dialog('close');
	jQuery( ".dgo-errorMessage" ).dialog('close');
	jQuery("#forgot-password").dialog('open');
	jQuery("#forgot-password").dialog({ position: 'center' });
}

 //add account connection dialog in account details
function addAccountConnection(){
	jQuery( "#add-more-login-provider" ).dialog('open');
	jQuery( "#add-more-login-provider" ).dialog({ position: 'center' });
}


//settings connection
function settingConnection(loginProvider,loginName){
	if(dgoContacting.ContactingSetting.length > 1){
		for(x in dgoContacting.ContactingSetting){
			if(dgoContacting.ContactingSetting[x].Key != loginProvider){
				jQuery('#setting-select-login-provider').children('option[value="'+dgoContacting.ContactingSetting[x].Key+'"]').hide();
			}		
		}	
	}
	jQuery('#setting-select-login-provider').val(loginProvider);
	jQuery('#setting-select-login-provider-old').val(loginProvider);
	jQuery('#setting-connection-login-name').val(loginName);
	jQuery('#setting-connection-login-name-old').val(loginName);
	jQuery( ".setting-account-connection" ).dialog('open');	
	jQuery( ".setting-account-connection" ).dialog({ position: 'center' });
}
//open dialog
function openLoginFormDialog(){
	jQuery('.loginForm').dialog('open');
	jQuery('.loginForm').dialog({ position: 'center' });
}

//select country in country dropdown
function SelectCountry(Countrykey){		
	for(x in dgoCountryApi){
		if(dgoCountryApi[x].Key == Countrykey){
			var country = '';
			var key=dgoCountryApi[x].Key.toLowerCase();
			//country += '<div class="add-info-country-flag"><img src="http://api.delivergo.com/lib/img/flags/64_png_rect/'+flags[dgoCountryApi[x].Key]+'"></div>';
			country +="<div class='add-info-country-flag flag_b_"+key+"'></div>";
			country += '<div class="add-info-country-name">'+dgoCountryApi[x].Name+'</div>';
			country += '<div class="add-info-country-button"></div>';
			jQuery('.country-dropdown-dialog').html(country);
			jQuery('.add-info-country-dropdown-selected').val(dgoCountryApi[x].Key);
			jQuery('.add-info-country-dropdown').hide();
		}
	}
}

//function get picture from api
function getPictureFromApi(number,articleUri){
	/*
	//we have to check that the image finish upload or not every 10s
	var api = new delivergo.api.imaging();
		    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

		//change portal for nhain.vn
		api.PortalNameSpace = globalPortal;
		
		api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
	
		api.GetImageState(portal, user, handle, function(result){
			if(result.Value.ImageHeight > result.Value.ImageWidth){
				var dimension = "height=50";
			}else{
				var dimension = "width=50";
			}
			var img = "<img src='" + result.Value.ThumbnailUri + "' " + dimension + ">";
			jQuery('#order-position-image-'+number).html(img);
		})
		*/
	var img = "<img src='" + articleUri + "' width='50' alt='Article Picture'>";
	jQuery('#order-position-image-'+number).html(img);
}

//article picture editing
function ArticlePictureEdit(i, j){	
	//picture class
	var article_class = '.article-picture-border_' + i + j;
	var product_article_class ='.cart_article_article_' + i;  
	
	//product size
	var productWidth = jQuery(product_article_class).find('.order_dim_width').val();
	var productHeight = jQuery(product_article_class).find('.order_dim_height').val();
	
	//handle
	var _handle = jQuery(article_class).children('.handle_hidden').val().replace(/-/g, '');
	
	//we have to check that the image finish upload or not every 10s
	var api = new delivergo.api.imaging();
	
	api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
	
	//show the slider bar
	var img_slide_html = '';
	var img_count = 0;
	jQuery(product_article_class).find('.article-picture-border').each(function(index){
		var img_selected = '';
		if(jQuery(this).children('.picture-order').val() == j){ img_selected = 'crop-picture-border-selected';}
		
		var _imageuri = jQuery(this).children('.url_hidden').val();
		var _imagethumb = jQuery(this).children('.thumb_hidden').val();
		var _imagehandle = jQuery(this).children('.handle_hidden').val().replace(/-/g, '');
		var _imageName = jQuery(this).children('.image_hidden').val();
		var _imageWidth = jQuery(this).children('.width_hidden').val();
		var _imageHeight = jQuery(this).children('.height_hidden').val();
		var _imageFag = (parseInt(_imageWidth) > parseInt(_imageHeight)) ? 'picture_landscape' : 'picture_portrait';
		var _imageParentClass = '.' + jQuery(this).attr('class').split(' ')[1];
		
		img_slide_html += '<li class="crop-picture-li"><div class="crop-picture-border crop-picture-border'+ _imagehandle +' '+ img_selected +'"><img class="img-sidebar '+ _imageFag +'" file="'+ _imageuri +'" src="'+ _imagethumb +'" /><img class="handle_tick" src="'+ web_2_print_blogInfo +'css/img/icon/tick_green.png" />';
		img_slide_html += '<input class="handle" type="hidden" value="'+ _imagehandle +'"><input class="name" type="hidden" value="'+ _imageName +'"><input class="width" type="hidden" value="'+ _imageWidth +'"><input class="height" type="hidden" value="'+ _imageHeight +'"><input class="parent_class" type="hidden" value="'+ _imageParentClass +'"/>';
		
		img_count++;
	});
	//append html
	jQuery('.image-crop-slider-content').empty().append(img_slide_html);
	jQuery(".image-crop-slider-content").width(67 * img_count);
	
	//check the mask cropping
	//set the flag
	jQuery('#crop-mask-flag').val('orientation');
	var _articleguid = jQuery(product_article_class).children('.article-guid-hidden').val();
	var _check_mask_size = productWidth + '_' + productHeight;
	if(maskArray != null){
		for(var k = 0; k < maskArray.length; k++){
			if(maskArray[k]['mask'].ArticleGuid == _articleguid && maskArray[k]['mask'].MaskSize == _check_mask_size){
				//set the flag
				jQuery('#crop-mask-flag').val('mask');
				
				//add mask to dialog
				//write the mask dropdown
				var mask_elements = maskArray[k]['mask'];
				var file_name = mask_elements.ThumbnailTranslation[0].Name;
				jQuery('#masks-dropdown').empty();
				jQuery('#masks-dropdown').append('<div><img title="'+ file_name +'" src="'+ mask_elements.MaskThumbUri +'"><span>'+ file_name +'</span><input type="hidden" value="'+ maskArray[k]['background'].MaskID + '_' + mask_elements.MaskUri +'"></div>');
				
				//write the submask
				if(maskArray[k]['submask'] != undefined){
					for(var i = 0; i < maskArray[k]['submask'].length; i++){
						var mask_elements = maskArray[k]['submask'][i];
						var file_name = mask_elements.ThumbnailTranslation[0].Name;
						jQuery('#masks-dropdown').append('<div><img title="'+ file_name +'" src="'+ mask_elements.MaskThumbUri +'"><span>'+ file_name +'</span><input type="hidden" value="'+ maskArray[k]['background'].MaskID + '_' + mask_elements.MaskUri +'"></div>');
					}
				}
				
				//mask list click
				jQuery('#masks-list').unbind('click');
				jQuery('#masks-list').click(function(e){
					jQuery('#masks-dropdown').show();
					e.stopPropagation();
				});
				
				//mask click
				jQuery('#masks-dropdown div').unbind('click');
				jQuery('#masks-dropdown div').click(function(e){
					jQuery('#masks-dropdown div').removeClass('mask-selected');
					jQuery(this).addClass('mask-selected');
					
					//add loading
					jQuery('.image-crop-loading').show();
					jQuery('#mask-div img').load(function(){
						jQuery('.image-crop-loading').hide();
					}).attr({src: jQuery('#masks-dropdown .mask-selected input').val().split('_')[1]});
					
					jQuery('#masks-list .mask-name').attr({"title": jQuery(this).children('span').html()});
					jQuery('#masks-list .mask-name').html(jQuery(this).children('span').html());
					jQuery('#mask-user-chosen').attr({src: jQuery(this).children('img').attr('src')});
					jQuery('#masks-dropdown').fadeOut(1);
					
					//set the mask
					if(img_current != null){
						img_current.SetTheMask(jQuery('#masks-dropdown .mask-selected input').val().split('_')[1]);
					}					
					
					e.stopPropagation();
				});
				
				jQuery('#masks-dropdown div:first-child').click();
				
				//mask dropdown blur
				jQuery("body").unbind('click');
				jQuery("body").click(function (evt) {
				     var target = evt.target;
				     if(target.id != 'masks-dropdown'){
				            jQuery("#masks-dropdown").fadeOut(1);
				    }                
				});
			}
		}
	}
	
	//call the crop function
	ImageCropFunctionCall(_handle, productWidth, productHeight);
	
	//click event
	jQuery('.crop-picture-border').click(function(){
		var handle_select = jQuery(this).children('.handle').val();
		
		if(img_current.ImgHandle.replace(/-/g, '') != handle_select){
			//change the selected
			jQuery('.crop-picture-border').removeClass('crop-picture-border-selected');
			jQuery(this).addClass('crop-picture-border-selected');
			
			//call the crop function
			ImageCropFunctionCall(handle_select, productWidth, productHeight);
		}
	});	
	
	//open cropping dialog
	jQuery('#mask-crop-form').dialog('open');
	jQuery('#mask-crop-form').dialog({ position: 'center' });
}

//article picture deleting
function ArticlePictureDelete(i, j){
	
	var article_class = '.article-picture-border_' + i + j;
	
	//save to session
	//article_id
	var _article_id = jQuery(article_class).children('.article_id').val();
	
	var image_count = 0;
	jQuery(article_class).parent().parent().find('.article-picture-li').each(function(){
		image_count++;
	});
	
	if(image_count > 1){
		if(confirm('Are you sure want to delete?')){
			var dataString = "option=image_delete&article=" + _article_id + "&image=" + j;	
			jQuery.ajax({
				type: "GET",
				url: web_2_print_blogInfo + "inc/ajax/ajaxCutting.php",
				data: dataString,
				success: function(data){   				
					//remove picture				
					jQuery(article_class).parent('.article-picture-li').remove();	
					
					var imgHandle = jQuery(article_class).children('.handle_hidden').val().replace(/-/g, '');
					
					//remove this image in shopCart header
					jQuery('.'+imgHandle).remove();
					
					//increse possible run choosen
					var changing_run_class = '.cartArticle #' + _article_id;		
					jQuery(changing_run_class).children('.amount-select-discount').find('.drop-run-hide').each(function(){
						if(jQuery(this).children('input').val() >= (image_count - 1) ){
							jQuery(this).show();
						}
					});
				}				
			});
		}
	}else{
		alert('Cannot delete this picture.');
	}
}
/****************************All Orders********************************************/
//open or close one order
function buttonAllOrder(number, option, orderNumber){
	if(option == null){
		var button = jQuery('#all-order-button-'+number).html();
		if(button == '<img src="'+web_2_print_blogInfo+'css/img/icon/Black_Plus.png" class="all-order-button">'){
			jQuery('#all-order-button-'+number).html('<img src="'+web_2_print_blogInfo+'css/img/icon/Black_Miner.png" class="all-order-button">');
		}else{
			jQuery('#all-order-button-'+number).html('<img src="'+web_2_print_blogInfo+'css/img/icon/Black_Plus.png" class="all-order-button">');
		}
			jQuery("#all-order-details-"+number).toggle();
			jQuery(".all-order-elements-"+number).toggle();
	}
	if(option == 'details'){
		if(jQuery("#all-order-details-"+number).children('.confirm-order-shipping').html() == "null" &&
		   jQuery("#all-order-details-"+number).children('.confirm-order-payment').html() == "null" ){
				jQuery('.account-details-loading').dialog('open');
				jQuery('.account-details-loading').dialog({ position: 'center' });
				allOrder_getOrder(orderNumber,number);
		}
		else{
			var button = jQuery('#all-order-button-'+number).html();
			if(button == '<img src="'+web_2_print_blogInfo+'css/img/icon/Black_Plus.png" class="all-order-button">'){
				jQuery('#all-order-button-'+number).html('<img src="'+web_2_print_blogInfo+'css/img/icon/Black_Miner.png" class="all-order-button">');
			}else{
				jQuery('#all-order-button-'+number).html('<img src="'+web_2_print_blogInfo+'css/img/icon/Black_Plus.png" class="all-order-button">');
			}
				jQuery("#all-order-details-"+number).toggle();
				jQuery(".all-order-elements-"+number).toggle();
		}
		
	}
}
/*Order confirmation page*/
function orderDateConvert(){
	// Order date
	setTimeout(function () { 
		var order_date = jQuery('.confirm-content-title input').val();
		
		order_date = order_date.ParseRfcDate();
		order_date = order_date.format('dd.mm.yyyy - HH:MM:ss');
		jQuery('.confirm-content-title span:nth-child(3)').html(order_date);
	}, 1000);
}

//checking cropping
function croppingPopupCheck(){
	if(shop_articles != null){
		var flag_cut = true;
		
		for(var i = 0; i < shop_articles.length; i++){
			if(shop_articles[i].Pictures != undefined){
				for(var j = 0; j < shop_articles[i].Pictures.length; j++){
					if(shop_articles[i].Pictures[j].Active != "false"){					
						var _handle = shop_articles[i].Pictures[j].Handle.replace(/-/g, '');				
						
						if(eval('img' + _handle) == undefined){
							jQuery('.cartTable').find('.cartArticle').each(function(index){
								if( flag_cut && jQuery(this).children('.article_id').val() == shop_articles[i].ArticleID ){
									//check the size to know this image needs to be cropped or not?
									var order_dim_width = jQuery(this).children('.order_dim_width').val();
									var order_dim_height = jQuery(this).children('.order_dim_height').val();
									var _rate1 = (order_dim_width / order_dim_height).toFixed(1);																
									
									//check for every pictures
									jQuery(this).next().find('.article-picture-border').each(function(index){
										var dim_width = jQuery(this).children('.width_hidden').val();
										var dim_height = jQuery(this).children('.height_hidden').val();
										var _rate2 = (dim_width / dim_height).toFixed(1);
										var _rate3 = (dim_height / dim_width).toFixed(1);
										
										if(jQuery(this).children('.have-mask').val() == 'no'){
											if(_rate1 != _rate2 && _rate1 != _rate3){
												if(flag_cut){
													jQuery(this).next().children('.shop_img_edit').click();
													flag_cut = false;
												}
											}
										}else{
											if(_rate2 != 1 || _rate3 != 1){
												if(flag_cut){
													jQuery(this).next().children('.shop_img_edit').click();
													flag_cut = false;
												}
											}
										}
									});								
								}
							});
						}
						
						//break
						if(!flag_cut){
							break;
						}	
					}
				}
			}
		}
	}
}
/* Activation function */
//check email recover pass
function check_email_pass_recover(){
	if(jQuery("#loginName").val() != ""){
			jQuery('.forgot-password-checkLoginExistStatus').removeClass('forgot-password-checkLoginExistStatus-success');
			jQuery('.forgot-password-checkLoginExistStatus').removeClass('forgot-password-checkLoginExistStatus-fail');
			jQuery('.forgot-password-checkLoginExistStatus').addClass('forgot-password-checkLoginExistStatus-process');
			jQuery('#forgotPassCheckExistStatus').val('false');
			var flag = validateUser(jQuery('#loginName').val());
			if(flag!=false){
				contacting_CheckContactingExist(jQuery("#loginName").val(),'recover-password',null);	
			}else{
				jQuery('.forgot-password-checkLoginExistStatus').removeClass('forgot-password-checkLoginExistStatus-process');
				jQuery('.forgot-password-checkLoginExistStatus').addClass('forgot-password-checkLoginExistStatus-fail');
				jQuery('#forgotPassCheckExistStatus').val('false');
				jQuery('.forgot-password-content-message').html('<span>'+jQuery('#loginName').val() + '</span> is not an email! Please type again');				
			}	
		}		
}
function recover_pass(){
	 var flag = jQuery('#forgotPassCheckExistStatus').val();
				if(flag == "true"){
					contacting_RecoverPassword(jQuery("#loginName").val());//function in contacting_request_function.js 			
					jQuery("#forgot-password").dialog("close");
				}				
} 