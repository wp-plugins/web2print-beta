/**/
jQuery(document).ready(function(){
    //Request from API//
    /*General page==================================================*/
    jQuery.fx.speeds._default = 500;
    
    jQuery.jqplot.config.enablePlugins = true;
    
    //+ admin configure form +//
    // admin configure form
    jQuery(function() {
        jQuery( ".adminConfigForm" ).dialog({
            title: "Configure <div class='ex-close-button'></div>",
            autoOpen: false,                            
            //width: 750,
            width: 500,
            closeOnEscape: false,
            dialogClass: "dgo-dialog-class dgo-config-form",
            modal: true,                                                   
            resizable: false
        });                   
    });
    
    //affiliate login
    jQuery('#affiliate-login').click(function(){
		if(jQuery('#affiliate-id').val() != ""){
			//check guid is valid
			if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(jQuery('#affiliate-id').val()) == true){
				jQuery('.admin-affiliate-message-error').empty();				
				if(jQuery('#affiliate-pass').val() != ""){
					jQuery('.admin-password-message-error').empty();
					jQuery.blockUI(0);
					//Authentication
					affiliateAuthentication();
				}else{
					jQuery('.admin-password-message-error').html('Password is empty');
				}
			}else{
				jQuery('.admin-affiliate-message-error').html('Affiliate is invalid');
			}
		}else{
			jQuery('.admin-affiliate-message-error').html('Affiliate is empty');
		}
    	
    });
    
    jQuery('.logout-button').click(function (){
    	var flag = confirm("Are You Really, Really Sure?");
    	
    	if (flag == true)
    	  {
    		jQuery('#form-logout-flag').val(true);
    		jQuery('#affiliateLogoutForm').submit();
    	  }    	
    });
    
    jQuery('.reset-cache').click(function (){
    	var flag = confirm("Are You Sure?");
    	
    	if (flag == true){
    		jQuery.blockUI(0);
    		var dataString = "option=resetCache";
			jQuery.ajax({
			   type: "GET",
			   url: web_2_print_blogInfo + "inc/ajax/unsetSession.php",
			   data: dataString,
			   success: function(data){
				   jQuery.unblockUI();
			   		if(data == ""){
			   			alert("Reset cache successfully!");
			   		}else{
			   			alert("Error happens. Please contact with admin");
			   		}
			   }							 
			});
    	}    	
    });
    
    // admin configure form
    jQuery(function() {
        jQuery( ".provisionForm" ).dialog({
            title: "Provisions Configure <div class='ex-close-button'></div>",
            autoOpen: false,                            
            height: 768,
            width: 1024,
            closeOnEscape: false,
            dialogClass: "dgo-dialog-class dgo-provision-form",
            modal: true,                                                   
            resizable: false
        });                   
    });
    
    //dialog asking P user
    jQuery(function() {
        jQuery( ".askingShopForm" ).dialog({
            title: "Choose one shop <div class='ex-close-button'></div>",
            autoOpen: false,                            
            height: 320,
            width: 500,
            closeOnEscape: false,
            dialogClass: "dgo-dialog-class asking-shop-form",
            modal: true,                                                   
            resizable: false
        });                   
    });
        
    
    //currency change
    jQuery('.maintain-title-right .currency-select').change(
        function(){
            adminCurChange(jQuery(this).val());
        }
    );
    
    jQuery('.navigator-button').click(function(){
        jQuery('.navigator-button').removeClass('navigator-selected');
        jQuery(this).addClass('navigator-selected');
        
        jQuery('.provision-maintain-content').removeClass('provision-content-selected');
        if(jQuery(this).children('span').html() == 'Provisions'){
            jQuery('.provisions-content').addClass('provision-content-selected');    
        }else if(jQuery(this).children('span').html() == 'Statistics'){
            jQuery('.statistics-content').addClass('provision-content-selected');
        }else{
            jQuery('.settings-content').addClass('provision-content-selected');
        }
    });    jQuery('.navigator-provision').click();
    
    //slider
    //create slider
    jQuery( ".provision-slider" ).slider({
        value: 0,
        min: 0,
        max: 100,
        
        slide: function(event, ui) { 
	    	if(jQuery('.product-groups-selected .apiIDHidden').val() != undefined){
	    		//get product group id
	            var idGroup = jQuery('.product-groups-selected .apiIDHidden').val();
	           
	
	    	}else if(jQuery('.grid-content-row-selected .id-group-hidden').val() != undefined){
	    		//get product group id
	            var idGroup = jQuery('.grid-content-row-selected .id-group-hidden').val();
	            
	    	}   
        	
        	if(idGroup != undefined){
        		jQuery('.provision-slider-process').width( ui.value + '%'); //#D1D8DE  //F3C650 //CA262F
                   
	            var provisionAmount = articleGroupArr[globalCurrencyToken][1] + articleGroupArr[globalCurrencyToken][2] * ui.value;
	            jQuery('.provision-amount-hidden').val(provisionAmount);
	            jQuery('.provision-amount').html(formatCurrency(provisionAmount, globalCurrencyToken));
	            
	            //jQuery('.price-widget').html(formatCurrency(articleGroupArr[globalCurrencyToken][0] + provisionAmount + parseFloat(jQuery('.provision-percent-hidden').val())*articleGroupArr[globalCurrencyToken][0]/100, globalCurrencyToken));
	            jQuery('.your-profit').html(formatCurrency(provisionAmount + parseFloat(jQuery('.provision-percent-hidden').val())*articleGroupArr[globalCurrencyToken][0]/100, globalCurrencyToken));
	            
	            //change the widget price
	            priceOverviewShow(provisionAmount, parseFloat(jQuery('.provision-percent-hidden').val()) - 11.11);
	            
	            //change color of progress bar for warning 
	            if(ui.value < 50){
	                jQuery('.provision-slider-process').css({background: '#48B43A'});
	            }else if(ui.value < 80){
	                jQuery('.provision-slider-process').css({background: '#F3C650'});
	            }else{
	                jQuery('.provision-slider-process').css({background: '#CA262F'});
	            }
        	}            
        }
    }); 
    
    jQuery( ".percentage-slider" ).slider({
        value: 0,
        min: 0,
        max: 100,
        
        slide: function(event, ui) {
	    	if(jQuery('.product-groups-selected .apiIDHidden').val() != undefined){
	    		//get product group id
	            var idGroup = jQuery('.product-groups-selected .apiIDHidden').val();
	            var percent = dgoDefaultPercentage;
	
	    	}else if(jQuery('.grid-content-row-selected .id-group-hidden').val() != undefined){
	    		//get product group id
	            var idGroup = jQuery('.grid-content-row-selected .id-group-hidden').val();
	            var percent = articleProfit[idGroup]['minPercent'];
	    	}   
        	
	    	
	    	
        	if(idGroup != undefined){
        		var xValue = ui.value;
	            jQuery('.percentage-slider-process').width( xValue + '%');
	            
	            if(Math.round(ui.value) == Math.round(percentStartCal(percent))){
	            }else{
	                xValue = Math.round(ui.value);
	            }
	            
	            jQuery('.provision-percent').html(formatCurrency( xValue , 'EUR'));
	            jQuery('.provision-percent-hidden').val(xValue);
	            jQuery('.provision-calculate-percent .provision-price-element').html(formatCurrency(xValue*articleGroupArr[globalCurrencyToken][0]/100, globalCurrencyToken));
	            
	            //jQuery('.price-widget').html(formatCurrency(articleGroupArr[globalCurrencyToken][0] + parseFloat(jQuery('.provision-amount-hidden').val()) + xValue * articleGroupArr[globalCurrencyToken][0]/100, globalCurrencyToken));
	            jQuery('.your-profit').html(formatCurrency(parseFloat(jQuery('.provision-amount-hidden').val()) + xValue*articleGroupArr[globalCurrencyToken][0]/100, globalCurrencyToken));
	            
	            //change the widget price
	            priceOverviewShow(parseFloat(jQuery('.provision-amount-hidden').val()), xValue - 11.11);
	            
	            //change color of progress bar for warning 
	            if(ui.value < 50){
	                jQuery('.percentage-slider-process').css({background: '#48B43A'});
	            }else if(ui.value < 80){
	                jQuery('.percentage-slider-process').css({background: '#F3C650'});
	            }else{
	                jQuery('.percentage-slider-process').css({background: '#CA262F'});
	            }	
        	}                        
        }
    });
    
    //slider stop
    jQuery( ".provision-slider" ).bind( "slidestop", function(event, ui) {
    	if(jQuery('.product-groups-selected .apiIDHidden').val() != undefined){
    		//get product group id
            var idGroup = jQuery('.product-groups-selected .apiIDHidden').val();
           

    	}else if(jQuery('.grid-content-row-selected .id-group-hidden').val() != undefined){
    		//get product group id
            var idGroup = jQuery('.grid-content-row-selected .id-group-hidden').val();
            
    	}        
        	
        if(idGroup == undefined){
        	jQuery(this).slider( "option", "value", 0 );
        }        
    });
    
    //slider stop
    jQuery( ".percentage-slider" ).bind( "slidestop", function(event, ui) {
    	if(jQuery('.product-groups-selected .apiIDHidden').val() != undefined){
    		//get product group id
            var idGroup = jQuery('.product-groups-selected .apiIDHidden').val();
    	}else if(jQuery('.grid-content-row-selected .id-group-hidden').val() != undefined){
    		//get product group id
            var idGroup = jQuery('.grid-content-row-selected .id-group-hidden').val();          
    	}   
        	
        if(idGroup == undefined){
        	jQuery(this).slider( "option", "value", 0 );
        }       
    });
    
    //shop changing
    jQuery('.affiliate-select').change(function(){
    	if(jQuery(this).val() == 'title'){
    		//clear product group
    		jQuery('.product-group-content').empty();
    	}else{
    		//change product groups
    		provisionShopChange( jQuery(this).val() );
        	
    	}
    });
    
    jQuery('.EndUserPriceFormat').change(function(){
    	var shopId = jQuery('.affiliate-select').val();
    	
    	for(var j = 0; j < globalResaleUnits.length;j++){
    		if(globalResaleUnits[j].Id == shopId){
    			for(var i = 0;i < globalResaleUnits[j].ResaleUnitSetting.length;i++){
    	    		if(globalResaleUnits[j].ResaleUnitSetting[i].Key == "Calculation.EndUserPriceFormat"){
    	    			globalResaleUnits[j].ResaleUnitSetting[i].Value = jQuery(this).val();
    	    			jQuery.blockUI(0);
    	    			adminResaleUpdate();
    	    			
    	    			var dataString = "EndUserPriceFormat=" + jQuery(this).val();
						jQuery.ajax({
						   type: "GET",
						   url: web_2_print_blogInfo + "inc/apicred.inc.php",
						   data: dataString,
						   dataType: "json",
						   success: function(data){
						   		
						   }							 
						});
    	    		}
    	    	}
    		}
    	}
    	
    });
    
    //addNow click 
    jQuery('.warning-footer-button').click(function(){
    	var resaleUnitId = jQuery('.resale-guid').val();
    	
    	//block ui
    	jQuery.blockUI(0);
    	
    	if(jQuery('.product-groups-selected .apiIDHidden').val() != undefined){
    		//get product group id
            var idGroup = jQuery('.product-groups-selected .apiIDHidden').val();
           
            for(var i=0;i < shopDiscount.length;i++){
            	if(shopDiscount[i].shopGuid == resaleUnitId){
            		for(var j = 0;j < dgoAllDiscounts.length;j++){
            			if(dgoAllDiscounts[j].IdArticleGroup == idGroup){ 
            				var dataString = "option=resetCache";
            				var shopID = shopDiscount[i].shopID;
            				var discountID = dgoAllDiscounts[j].Id;
            				jQuery.ajax({
            				   type: "GET",
            				   url: web_2_print_blogInfo + "inc/ajax/unsetSession.php",
            				   data: dataString,
            				   success: function(data){
            					   //add discount profit
                   				   articleProfitAdd(discountID, shopID, jQuery('.provision-amount-hidden').val(), jQuery('.provision-percent-hidden').val());
            				   }							 
            				});
            				break;
            			}else if(j == dgoAllDiscounts.length-1){
            				var dataString = "option=resetCache";
            				var shopID = shopDiscount[i].shopID;
            				jQuery.ajax({
            				   type: "GET",
            				   url: web_2_print_blogInfo + "inc/ajax/unsetSession.php",
            				   data: dataString,
            				   success: function(data){
            					   //add discount for this product
                       			   AddDiscountEntries(shopID, idGroup, jQuery('.provision-amount-hidden').val(), jQuery('.provision-percent-hidden').val());
            				   }							 
            				});
            			}
            		}            		
            	}
            }

    	}else if(jQuery('.grid-content-row-selected .id-group-hidden').val() != undefined){
    		//get product group id
            var idGroup = jQuery('.grid-content-row-selected .id-group-hidden').val();
            
            articleProfit[idGroup]['percent'] = jQuery('.provision-percent-hidden').val();
            articleProfit[idGroup]['amount']  = jQuery('.provision-amount-hidden').val();
            
            jQuery('.grid-content-row-selected .grid-provision-relative').html(jQuery('.provision-percent').html()+' %');
            jQuery('.grid-content-row-selected .provision-absolute-row').html(jQuery('.provision-amount').html());
            jQuery('.grid-content-row-selected .grid-provision-currency').html(globalCurrencyToken);
            
            var dataString = "option=resetCache";
			jQuery.ajax({
			   type: "GET",
			   url: web_2_print_blogInfo + "inc/ajax/unsetSession.php",
			   data: dataString,
			   success: function(data){
				    //update to api        
			        articleProfitUpdate(articleProfit[idGroup], articleProfit[idGroup]['active']);
			   }							 
			});
    	}
    });
    
    //close click
    setTimeout(function () {
	    jQuery('.dgo-provision-form .ui-dialog-titlebar-close').click(function(){
			jQuery('#affiliateProvisionForm').submit();
		});
	}, 1000);
    
    //call function show config dialog
    jQuery('.add-new-button').click(function(){
        adminConfigShow();
    });
    
    //call provision dialog showing
    jQuery('.configure-button').click(function(){
        //ask which shop do you want
        //askShopChosen(shopDiscount);   
        var shopID = profile_user['resale'];
        
        //go to chosen shop
		jQuery('.askingShopForm').dialog('close');
		jQuery('.provisionForm').dialog('open');
		jQuery('.provisionForm').dialog({ position: 'center' });
		
		//change the shop
		jQuery('.affiliate-select').val(shopID);
		provisionShopChange(shopID);
    });
    
    
    
    //change input color
    jQuery('.inputDiv').hover(
        function(){
            if(jQuery(this).css('background-color') == 'transparent'){
                jQuery(this).css({'border-color': '#FFD800'});    
            }            
        },
        function(){            
            if(jQuery(this).css('background-color') == 'transparent'){
                jQuery(this).css({'border-color': '#cdcdcd'});    
            }
        }
    );
    
    //dialog auth...
    jQuery('.inputDiv input').focus(function(){    
        jQuery(this).parent('.inputDiv').css({'border-color': '#ED9121'}); 
        jQuery(this).parent('.inputDiv').css({'background-color': '#fefefe'});  //rgb(254, 254, 254) 
    });

    jQuery('.inputDiv input').blur(function(){    
        //jQuery(this).parent('.inputDiv').css({'background-color': 'transparent'});  //transparent
        if(jQuery(this).val().length < 6){
            jQuery(this).parent('.inputDiv').css({'border-color': 'red'});
            jQuery(this).parent().children('.checkImg').removeClass('checkImgTrue');
            jQuery(this).parent().children('.checkImg').addClass('checkImgFalse'); 
        }else{
            jQuery(this).parent('.inputDiv').css({'border-color': 'green'});
            jQuery(this).parent().children('.checkImg').removeClass('checkImgFalse');
            jQuery(this).parent().children('.checkImg').addClass('checkImgTrue');
        }    
    });
    
    
    jQuery('.config-content-right input').hover(
        function(){jQuery(this).css({'border-color': '#ED9121'});},
        function(){jQuery(this).css({'border-color': '#cdcdcd'});}
    );
    
    jQuery('.config-content-right input').focus(function(){
        jQuery(this).css({'border-color': '#ED9121'});
    });
    
    jQuery('.config-content-right input').blur(function(){
        jQuery(this).css({'border-color': '#cdcdcd'});
    });
    
    /*Widgets page==================================================*/
    jQuery('.cal-close-span').click(function(){
        jQuery(this).parent().parent().parent('.cal-content-div').slideToggle("slow");
        jQuery(this).parent().parent().parent().parent().children('.cal-tittle-div').children('.title-icon-toogle').removeClass('widget-hide');
        jQuery(this).parent().parent().parent().parent().children('.cal-tittle-div').children('.title-icon-toogle').addClass('widget-show');
    });
    
    jQuery('.title-icon-toogle').click(function(){
        jQuery(this).parent().parent().children('.cal-content-div').slideToggle("slow");
        if(jQuery(this).attr('class') != 'title-icon-toogle widget-hide'){
            jQuery(this).removeClass('widget-show');
            jQuery(this).addClass('widget-hide');    
        }else{
            jQuery(this).removeClass('widget-hide');
            jQuery(this).addClass('widget-show');    
        }
    });
    
    //saving
    jQuery('.cal-save-span').click(function(){ 	
    	jQuery('#admin-cal-form').submit();
    });
    
    jQuery('.cus-save-span').click(function(){
    	jQuery('#admin-cus-form').submit();
    });
    
    jQuery('.tem-save-span').click(function(){
    	jQuery('#admin-tem-form').submit();
    });
    
    //=============================Theming page====================================================== 	
 	//template click
 	jQuery('.theme-child-content').click(function(){
 		themeColorSet(colorArr[jQuery(this).children('.templateType').val()]);
 	});
 	
 	//submit form
 	jQuery('.template-bt-save').click(function(){
 		jQuery('#set_headertext').val(jQuery('#editme5').html());
 		jQuery('#button-text-input').val(jQuery('#buttonMultiUpload').html());
 		if(profile_user=='Net'){
 			jQuery('#set_Netendpricetext').val(jQuery('.text-endprice').html());
 		}else{
 			jQuery('#set_Grossendpricetext').val(jQuery('.text-endprice').html());
 		}
 		jQuery('#colorsForm').submit();
 	});
 	
    //hex1 for color line login
    jQuery('#hexbox1').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			jQuery('#hexbox1').val(hex);
			jQuery('#color-box1').css('backgroundColor', '#' + hex);
			jQuery('.theme-login').css('color', '#' + hex);
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box1').css('backgroundColor', '#' + this.value);
			jQuery('.theme-login').css('color', '#' + this.value);
		}
	});
	
	//hex2 for background color
	jQuery('#hexbox2').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			var tmp_color=jQuery('#hexbox13').val();
			jQuery('#hexbox2').val(hex);
			jQuery('#color-box2').css('backgroundColor', '#' + hex);
			jQuery('.order-product-main').css('background', '-moz-linear-gradient(top,  #' + hex + ',#'+tmp_color+')');
			jQuery('.order-product-main').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+tmp_color+'))');
			jQuery('.order-product-main').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+' #'+tmp_color+' \')"');
			jQuery('.order-product-main').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.order-product-main').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
			jQuery('.show-bg-gra').css('background', '-moz-linear-gradient(top,  #' + hex + ',#'+tmp_color+')');
			jQuery('.show-bg-gra').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+tmp_color+'))');
			jQuery('.show-bg-gra').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+' #'+tmp_color+' \')"');
			jQuery('.show-bg-gra').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.show-bg-gra').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box2').css('backgroundColor', '#' + this.value);
			jQuery('.order-product-main').css('background', '-moz-linear-gradient(top,  #' + hex + ',#'+tmp_color+')');
			jQuery('.order-product-main').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+tmp_color+'))');
			jQuery('.order-product-main').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+' #'+tmp_color+' \')"');
			jQuery('.order-product-main').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.order-product-main').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
			jQuery('.show-bg-gra').css('background', '-moz-linear-gradient(top,  #' + hex + ',#'+tmp_color+')');
			jQuery('.show-bg-gra').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+tmp_color+'))');
			jQuery('.show-bg-gra').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+' #'+tmp_color+' \')"');
			jQuery('.show-bg-gra').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.show-bg-gra').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
		}
	});
	
	//hexbox13 set color
	jQuery('#hexbox13').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			var tmp_color=jQuery('#hexbox2').val();
			jQuery('#hexbox13').val(hex);
			jQuery('#color-box13').css('backgroundColor', '#' + hex);
			jQuery('.order-product-main').css('background', '-moz-linear-gradient(top,  #'+tmp_color+ ',#'+ hex + ')');
			jQuery('.order-product-main').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' +tmp_color+ '), to(#'+ hex +'))');
			jQuery('.order-product-main').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + +tmp_color+ '\', endColorstr=\''+' #'+ hex +' \')"');
			jQuery('.order-product-main').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' +tmp_color+ '), to(#'+ hex +'))');
			jQuery('.order-product-main').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' +tmp_color+ '\', EndColorStr=\''+'#'+ hex +'\')');
			jQuery('.show-bg-gra').css('background', '-moz-linear-gradient(top,  #' +tmp_color+ ',#'+ hex +')');
			jQuery('.show-bg-gra').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' +tmp_color+ '), to(#'+ hex +'))');
			jQuery('.show-bg-gra').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' +tmp_color+ '\', endColorstr=\''+' #'+ hex +' \')"');
			jQuery('.show-bg-gra').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' +tmp_color+ '), to(#'+ hex +'))');
			jQuery('.show-bg-gra').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' +tmp_color+ '\', EndColorStr=\''+'#'+ hex +'\')');
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box13').css('backgroundColor', '#' + this.value);
			jQuery('.order-product-main').css('background', '-moz-linear-gradient(top,  #'+tmp_color+  ',#'+ hex +')');
			jQuery('.order-product-main').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' +tmp_color+ '), to(#'+ hex +'))');
			jQuery('.order-product-main').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#'+tmp_color+'\', endColorstr=\''+' #'+ hex +' \')"');
			jQuery('.order-product-main').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' +tmp_color+'), to(#'+ hex +'))');
			jQuery('.order-product-main').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' +tmp_color+ '\', EndColorStr=\''+'#'+ hex +'\')');
			jQuery('.show-bg-gra').css('background', '-moz-linear-gradient(top,  #' +tmp_color+ ',#'+ hex +')');
			jQuery('.show-bg-gra').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' +tmp_color+ '), to(#'+ hex +'))');
			jQuery('.show-bg-gra').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' +tmp_color+ '\', endColorstr=\''+' #'+ hex +' \')"');
			jQuery('.show-bg-gra').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' +tmp_color+ '), to(#'+ hex +'))');
			jQuery('.sshow-bg-gra').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' +tmp_color+'\', EndColorStr=\''+'#'+ hex +'\')');
		}
	});
	
	//hex3 for prices color
	jQuery('#hexbox3').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			jQuery('#hexbox3').val(hex);
			jQuery('#color-box3').css('backgroundColor', '#' + hex);
			jQuery('.order-product-content').css('color', '#' + hex);
			jQuery('.color-box-info-text1').children('span').css('color', '#' + hex);
			jQuery('.color-box-info-text2').children('span').css('color', '#' + hex);
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box3').css('backgroundColor', '#' + this.value);
			jQuery('.order-product-content').css('color', '#' + this.value);
			jQuery('.color-box-info-text1').children('span').css('color', '#' + hex);
			jQuery('.color-box-info-text2').children('span').css('color', '#' + hex);
		}
	});
	
	//hex4 for text button color
	jQuery('#hexbox4').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			jQuery('#hexbox4').val(hex);
			jQuery('#color-box4').css('backgroundColor', '#' + hex);
			//jQuery('.order-product-title').css('color', '#' + hex);
			jQuery('#buttonMultiUpload').css('color', '#' + hex);
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box4').css('backgroundColor', '#' + this.value);
			//jQuery('.order-product-title').css('color', '#' + this.value);
			jQuery('#buttonMultiUpload').css('color', '#' + this.value);
		}
	});
	
	//hex5 for header background color
	jQuery('#hexbox5').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			var tmp_color=jQuery('#hexbox11').val();
			jQuery('#hexbox5').val(hex);
			jQuery('#color-box5').css('backgroundColor', '#' + hex);
			jQuery('.order-product-title').css('background', '-moz-linear-gradient(top,  #' + hex + ',#'+tmp_color+')');
			jQuery('.order-product-title').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+tmp_color+'))');
			jQuery('.order-product-title').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+' #'+tmp_color+' \')"');
			jQuery('.order-product-title').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.order-product-title').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
			jQuery('.show-head-gra').css('background', '-moz-linear-gradient(top,  #' + hex + ',#'+tmp_color+')');
			jQuery('.show-head-gra').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+tmp_color+'))');
			jQuery('.show-head-gra').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+' #'+tmp_color+' \')"');
			jQuery('.show-head-gra').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.show-head-gra').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box5').css('backgroundColor', '#' + this.value);
			jQuery('.order-product-title').css('background', '-moz-linear-gradient(top,  #' + hex + ',#'+tmp_color+')');
			jQuery('.order-product-title').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+tmp_color+'))');
			jQuery('.order-product-title').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+' #'+tmp_color+' \')"');
			jQuery('.order-product-title').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.order-product-title').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
			jQuery('.show-head-gra').css('background', '-moz-linear-gradient(top,  #' + hex + ',#'+tmp_color+')');
			jQuery('.show-head-gra').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+tmp_color+'))');
			jQuery('.show-head-gra').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+' #'+tmp_color+' \')"');
			jQuery('.show-head-gra').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.show-head-gra').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
		}
	});
	//hex11 for header background color
	jQuery('#hexbox11').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			var tmp_color=jQuery('#hexbox5').val();
			jQuery('#hexbox11').val(hex);
			jQuery('#color-box11').css('backgroundColor', '#' + hex);
			jQuery('.order-product-title').css('background', '-moz-linear-gradient(top,  #'+tmp_color+',  #' + hex + ')');
			jQuery('.order-product-title').css('background', '-webkit-gradient(linear, left top, left bottom, from(#'+tmp_color+'), to(#'+hex+'))');
			jQuery('.order-product-title').css('-ms-filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' +tmp_color+ '\', endColorstr=\''+' #'+hex+' \')');
			jQuery('.order-product-title').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' +tmp_color+ '), to(#'+hex+'))');
			jQuery('.order-product-title').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' +tmp_color+ '\', EndColorStr=\''+'#'+hex+'\')');
			jQuery('.show-head-gra').css('background', '-moz-linear-gradient(top,  #'+tmp_color+',  #' + hex + ')');
			jQuery('.show-head-gra').css('background', '-webkit-gradient(linear, left top, left bottom, from(#'+tmp_color+'), to(#'+hex+'))');
			jQuery('.show-head-gra').css('-ms-filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' +tmp_color+ '\', endColorstr=\''+' #'+hex+' \')');
			jQuery('.show-head-gra').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' +tmp_color+ '), to(#'+hex+'))');
			jQuery('.show-head-gra').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' +tmp_color+ '\', EndColorStr=\''+'#'+hex+'\')');
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box5').css('backgroundColor', '#' + this.value);
			jQuery('.order-product-title').css('background', '-moz-linear-gradient(top,  #'+tmp_color+',  #' + hex + ')');
			jQuery('.order-product-title').css('background', '-webkit-gradient(linear, left top, left bottom, from(#'+tmp_color+'), to(#'+hex+'))');
			jQuery('.order-product-title').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' +tmp_color+ '\', endColorstr=\''+' #'+hex+' \')"');
			jQuery('.order-product-title').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' +tmp_color+ '), to(#'+hex+'))');
			jQuery('.order-product-title').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' +tmp_color+ '\', EndColorStr=\''+'#'+hex+'\')');
			jQuery('.order-product-title').css('background', '-moz-linear-gradient(top,  #'+tmp_color+',  #' + hex + ')');
			jQuery('.order-product-title').css('background', '-webkit-gradient(linear, left top, left bottom, from(#'+tmp_color+'), to(#'+hex+'))');
			jQuery('.order-product-title').css('-ms-filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' +tmp_color+ '\', endColorstr=\''+' #'+hex+' \')');
			jQuery('.order-product-title').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' +tmp_color+ '), to(#'+hex+'))');
			jQuery('.order-product-title').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' +tmp_color+ '\', EndColorStr=\''+'#'+hex+'\')');
		}
	});
	
	//hex6 for outline border color
	jQuery('#hexbox6').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			jQuery('#hexbox6').val(hex);
			jQuery('#color-box6').css('backgroundColor', '#' + hex);
			jQuery('.order-product-main-container').css('borderColor', '#' + hex);
			jQuery('.order-product-title').css('borderColor', '#' + hex);
			jQuery('.order-product-header').css('borderColor', '#' + hex);
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box6').css('backgroundColor', '#' + this.value);
			jQuery('.order-product-main-container').css('borderColor', '#' + this.value);
			jQuery('.order-product-title').css('borderColor', '#' + this.value);
			jQuery('.order-product-header').css('borderColor', '#' + this.value);
		}
	});
	
	//hex7 for price hover color
	jQuery('#hexbox7').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			jQuery('#hexbox7').val(hex);
			jQuery('#color-box7').css('backgroundColor', '#' + hex);
			jQuery('.order-product-subcontent .order-product-content-child:nth-child(2)').css('backgroundColor', '#' + hex);
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box7').css('backgroundColor', '#' + this.value);
			jQuery('.order-product-subcontent .order-product-content-child:nth-child(2)').css('backgroundColor', '#' + this.value);
		}
	});
	
	//hex8 for button background
	jQuery('#hexbox8').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			var tmp_color=jQuery('#hexbox12').val();
			jQuery('#hexbox8').val(hex);
			jQuery('#color-box8').css('backgroundColor', '#' + hex);
			jQuery('#buttonMultiUpload').css('background', '-moz-linear-gradient(top,  #' + hex + ',  #' + tmp_color + ')');	
			jQuery('#buttonMultiUpload').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('#buttonMultiUpload').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+'#'+tmp_color+'\')"');
			jQuery('#buttonMultiUpload').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('#buttonMultiUpload').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
			jQuery('.gradient-show').css('background', '-moz-linear-gradient(top,  #' + hex + ',  #' + tmp_color + ')');	
			jQuery('.gradient-show').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.gradient-show').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+'#'+tmp_color+'\')"');
			jQuery('.gradient-show').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.gradient-show').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box8').css('backgroundColor', '#' + this.value);
			jQuery('#buttonMultiUpload').css('backgroundColor', '#' + this.value);
			jQuery('#buttonMultiUpload').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+tmp_color+'))');
			jQuery('#buttonMultiUpload').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+'#'+tmp_color+'\')"');
			jQuery('#buttonMultiUpload').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('#buttonMultiUpload').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
			jQuery('.gradient-show').css('background', '-moz-linear-gradient(top,  #' + hex + ',  #' + tmp_color + ')');	
			jQuery('.gradient-show').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.gradient-show').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#' + hex + '\', endColorstr=\''+'#'+tmp_color+'\')"');
			jQuery('.gradient-show').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + hex + '), to(#'+ tmp_color+'))');
			jQuery('.gradient-show').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + hex + '\', EndColorStr=\''+'#'+tmp_color+'\')');
		}
	});
	
	//hex12 for button background
	jQuery('#hexbox12').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			var tmp_color=jQuery('#hexbox8').val();
			jQuery('#hexbox12').val(hex);
			jQuery('#color-box12').css('backgroundColor', '#' + hex);
			jQuery('#buttonMultiUpload').css('background', '-moz-linear-gradient(top,  #'+tmp_color+',  #' + hex + ')');	
			jQuery('#buttonMultiUpload').css('background', '-webkit-gradient(linear, left top, left bottom, from(#'+tmp_color+'), to(#'+hex+'))');
			jQuery('#buttonMultiUpload').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#'+tmp_color+ '\', endColorstr=\''+' #' + hex +' \')"');
			jQuery('#buttonMultiUpload').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#'+tmp_color+ '), to(#' + hex +'))');
			jQuery('#buttonMultiUpload').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#'+tmp_color+'\', EndColorStr=\''+'#' + hex +'\')');
			jQuery('.gradient-show').css('background', '-moz-linear-gradient(top,  #'+tmp_color+',  #' +hex+ ')');	
			jQuery('.gradient-show').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' +tmp_color+'), to(#'+hex+'))');
			jQuery('.gradient-show').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#'+tmp_color+ '\', endColorstr=\''+'#'+hex+'\')"');
			jQuery('.gradient-show').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#'+tmp_color+'), to(#'+hex+'))');
			jQuery('.gradient-show').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' +tmp_color+ '\', EndColorStr=\''+'#'+hex+'\')');
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box12').css('backgroundColor', '#' + this.value);
			jQuery('#buttonMultiUpload').css('backgroundColor', '#' + this.value);
			jQuery('#buttonMultiUpload').css('background', '-webkit-gradient(linear, left top, left bottom, from(#'+tmp_color+'), to(#'+hex+'))');
			jQuery('#buttonMultiUpload').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#'+tmp_color+'\', endColorstr=\''+' #'+hex+' \')"');
			jQuery('#buttonMultiUpload').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#'+tmp_color+ '), to(#'+hex+'))');
			jQuery('#buttonMultiUpload').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#'+tmp_color+'\', EndColorStr=\''+'#'+hex+'\')');
			jQuery('.gradient-show').css('background', '-moz-linear-gradient(top,  #'  + tmp_color +',  #' +hex+ ')');	
			jQuery('.gradient-show').css('background', '-webkit-gradient(linear, left top, left bottom, from(#'  + tmp_color +'), to(#'+hex+'))');
			jQuery('.gradient-show').css('-ms-filter','"progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+'#'  + tmp_color + '\', endColorstr=\''+'#'+hex+'\')"');
			jQuery('.gradient-show').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#'  + tmp_color + '), to(#'+hex+'))');
			jQuery('.gradient-show').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#'  + tmp_color +'\', EndColorStr=\''+'#'+hex+'\')');
		}
	});
	
	//hex9 for button background
	jQuery('#hexbox9').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			jQuery('#hexbox9').val(hex);
			jQuery('#color-box9').css('backgroundColor', '#' + hex);
			jQuery('.bt-uploader-container').css('border-color', '#' + hex);			
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box9').css('backgroundColor', '#' + this.value);
			jQuery('.bt-uploader-container').css('border-color', '#' + this.value);
		}
	});
	
	jQuery('#hexbox10').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			jQuery('#hexbox10').val(hex);
			jQuery('#color-box10').css('backgroundColor', '#' + hex);
			jQuery('#editme5').css('color', '#' + hex);			
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
		if(this.value.length == 6){
			jQuery('#color-box10').css('backgroundColor', '#' + this.value);
			jQuery('.order-product-title').children('span').css('color', '#' + this.value);
		}
	});
	
	jQuery('.color-box-selector').click(function(){
		jQuery(this).prev().children().children('input').click();
	});
	
	jQuery('.color-box-selector-right').click(function(){
		jQuery(this).next().children().children('input').click();
	});
	
	jQuery('.page-options-block').click(function(){
		jQuery('.page-options-block').removeClass("page-options-block-selected");
		jQuery(this).addClass("page-options-block-selected");
		jQuery('.page-options-block-selected .pageOptions-input').attr({"checked":"checked"});
	});
	
	jQuery('.page-save-span').click(function(){
		jQuery('#admin-page-form').submit();
	});
	
	jQuery('#theme-control-language').change(function(){
		var key = jQuery(this).val().split('_')[0];
			jQuery('#select-language').val(key);
			jQuery('#editme5').html(headerTextArr[key]);
			jQuery('#buttonMultiUpload').html(buttonTextArr[key]);
			if(profile_user=='Net'){
				jQuery('.text-endprice').html(NetendpricetextArr[key]);
			}else{
				jQuery('.text-endprice').html(GrossendpricetextArr[key]);
			}
			jQuery('#set_headertext').val(jQuery('#editme5').html());
			jQuery('#button-text-input').val(jQuery('#buttonMultiUpload').html());
			if(profile_user=='Net'){
					jQuery('#set_Netendpricetext').val(jQuery('.text-endprice').html());
				}else{
					jQuery('#set_Grossendpricetext').val(jQuery('.text-endprice').html());
				}
			jQuery('#colorsForm').submit();
	});
	
	//EditInarea header-text
	jQuery("#editme5").click(function() {
		//This if statement checks to see if there are 
		//and children of div.editme are input boxes. If so,
		//we don't want to do anything and allow the user
		//to continue typing
		if (jQuery(this).children('input').length == 0) {
		
			//Create the HTML to insert into the div. Escape any " characters 
			var inputbox = "<input type='text' id='header-input' class='inputbox' MaxLength='16' value=\""+jQuery(this).text()+"\">";
			//Insert the HTML into the div
			jQuery(this).html(inputbox);
			
			//Immediately give the input box focus. The user
			//will be expecting to immediately type in the input box,
			//and we need to give them that ability
			jQuery("input.inputbox").focus();
			
			//Once the input box loses focus, we need to replace the
			//input box with the current text inside of it.
			jQuery("input.inputbox").blur(function() {
				var value = jQuery(this).val();
				jQuery("#editme5").text(value);
				jQuery('#set_headertext').val(jQuery('#editme5').html());
				jQuery('#button-text-input').val(jQuery('#buttonMultiUpload').html());
				if(profile_user=='Net'){
					jQuery('#set_Netendpricetext').val(jQuery('.text-endprice').html());
				}else{
					jQuery('#set_Grossendpricetext').val(jQuery('.text-endprice').html());
				}
				jQuery('#colorsForm').submit();
			});
		}
	});

	//EditInarea vat-price-text
	jQuery(".text-endprice").click(function() {
		//This if statement checks to see if there are 
		//and children of div.editme are input boxes. If so,
		//we don't want to do anything and allow the user
		//to continue typing
		if (jQuery(this).children('input').length == 0) {
		
			//Create the HTML to insert into the div. Escape any " characters 
			var inputbox = "<input id='vat-price-input' name='endpriceText' type='text' class='inputbox' MaxLength='34' value=\""+jQuery(this).text()+"\">";
			//Insert the HTML into the div
			jQuery(this).html(inputbox);
			
			//Immediately give the input box focus. The user
			//will be expecting to immediately type in the input box,
			//and we need to give them that ability
			jQuery("input.inputbox").focus();
			
			//Once the input box loses focus, we need to replace the
			//input box with the current text inside of it.
			jQuery("input.inputbox").blur(function() {
				var value = jQuery(this).val();
				jQuery(".text-endprice").text(value);
				jQuery('#set_headertext').val(jQuery('#editme5').html());
				jQuery('#button-text-input').val(jQuery('#buttonMultiUpload').html());
				if(profile_user=='Net'){
					jQuery('#set_Netendpricetext').val(jQuery('.text-endprice').html());
				}else{
					jQuery('#set_Grossendpricetext').val(jQuery('.text-endprice').html());
				}
				jQuery('#colorsForm').submit();
			});
		}
	});
	
		//EditInarea button-text
	jQuery("#buttonMultiUpload").click(function() {
		//This if statement checks to see if there are 
		//and children of div.editme are input boxes. If so,
		//we don't want to do anything and allow the user
		//to continue typing
		if (jQuery(this).children('input').length == 0) {
		
			//Create the HTML to insert into the div. Escape any " characters 
			var inputbox = "<input type='text' id='button-input' class='inputbox' MaxLength='16' value=\""+jQuery(this).text()+"\">";
			//Insert the HTML into the div
			jQuery(this).html(inputbox);
			
			//Immediately give the input box focus. The user
			//will be expecting to immediately type in the input box,
			//and we need to give them that ability
			jQuery("input.inputbox").focus();
			
			//Once the input box loses focus, we need to replace the
			//input box with the current text inside of it.
			jQuery("input.inputbox").blur(function() {
				var value = jQuery(this).val();
				jQuery("#buttonMultiUpload").text(value);
				jQuery('#set_headertext').val(jQuery('#editme5').html());
				jQuery('#button-text-input').val(jQuery('#buttonMultiUpload').html());
				if(profile_user=='Net'){
					jQuery('#set_Netendpricetext').val(jQuery('.text-endprice').html());
				}else{
					jQuery('#set_Grossendpricetext').val(jQuery('.text-endprice').html());
				}
				jQuery('#colorsForm').submit();
			});
		}
	});
	
	//create radius slider
	jQuery( ".radius-slider" ).slider({
        value: 0,
        min: 0,
        max: 50,
        
        slide: function(event, ui){
        	jQuery('.radius-slider-process').width(ui.value*2 +'%');
        	jQuery('.radius-setting-input').children('input').val(ui.value);
        	radiusSet();
        } 
	})

	//create shadow slider
	jQuery( ".shadow-slider" ).slider({
        value: 0,
        min: 0,
        max: 6,
        
        slide: function(event, ui){
        	jQuery('.shadow-slider-process').width(ui.value*17 +'%');
        	jQuery('.txt-shadow-input').children('input').val(ui.value);
        	shadowSet();
        } 
	})

	//creat shadow-header slider
	jQuery( '.shadow-header-slider' ).slider({
        value: 0,
        min: 0,
        max: 6,
        
        slide: function(event, ui){
        	jQuery('.shadow-header-slider-process').width(ui.value*17 +'%');
        	jQuery('.txt-header-shadow-input').children('input').val(ui.value);
        	shadowheaderSet();
        } 
	});
	
	jQuery('.dropdown-switch-span').click(function(){
		jQuery('#switch-dropdown-form').submit();
	});
	
	//close dialog
    setTimeout(function () { 
		//close dialog button
		jQuery('.ex-close-button').click(function(){
			jQuery(this).parent().next().click();
		});		
	}, 2000);
});

