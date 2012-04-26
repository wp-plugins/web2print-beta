/*This file includes functions using in dialog box*/
//+-------------------------------------------+//
/*Functions for login dialog*/
	
	
	//logout
	function userLogout(){
		var dataString = "option=logout";
			jQuery.ajax({
			type: "GET",
			url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
			data: dataString,
			success: function(data){
					if(!data.error){
						jQuery.blockUI(0);
						window.location = homeUrl;
						 if(dgoCurrentPage == 'addressBook' ||
							dgoCurrentPage == 'allOrders' ||
							dgoCurrentPage == 'orderConfirm' ||
							dgoCurrentPage == 'accountDetails' ||
							dgoCurrentPage == 'earnMoney' ||
							dgoCurrentPage == 'archive' ||
							dgoCurrentPage == 'myMotives'){
							
						}else{
							if(dgoCurrentPage == 'shoppingCart'){
								var Defaulttext = '<div class="shopping-contact"><div class="shopping-contact-add is-bottons">'+jQuery('#trans-add-new-add').val()+'</div><div class="shopping-contact-text-or">'+jQuery('#trans-add-new-text-or').val()+'</div><div class="shopping-contact-login-here is-bottons" onclick="openLoginFormDialog()">'+jQuery('#trans-add-new-login-here').val()+'</div><div class="shopping-contact"></div></div>';

								jQuery("div.addressContainer").html(Defaulttext);
								jQuery('.payment-address span').html(jQuery('#transYourAddress-default-text').val());
								
								//show new addres dialog in shopping cart
								jQuery('.shopping-contact-add').click(function(){
									dgoContactOptions = 'add';
									if(dgoContacting == null){
										jQuery('.add-info-show-password').css({display:"block"});
									}else{
										jQuery('.add-info-show-password').css({display:"none"});
									}
									jQuery('#surname').val("");
									jQuery('#forename').val("");
									jQuery('#company').val("");
									jQuery('#street').val("");
									jQuery('#city').val("");
									jQuery('#zipcode').val("");
									jQuery('#phone').val("");
									jQuery('#email').val("");
									jQuery('#addressNote').val("");
									jQuery( ".addnewaddressForm" ).dialog('open');
									jQuery( ".addnewaddressForm" ).dialog({ position: 'center' });
								});
								
							}
						}

					}
				}
		});
		
		//reset global variable
		dgoContacting = null;
		dgoGuid = null; 
				
		jQuery('#logout-button').hide();
		jQuery("#login-button").show();		
		jQuery(".login-user-info").hide();
		jQuery(".customer-settings").hide();
		
		//hide address menu
		//jQuery('.setting-menu').css({display: 'none'});		
	}
	
	//Validate email and phone
	//Email validation
	function validateUser(email) {
	   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	   if(reg.test(email) == false) {
	      return false;
	   }
	}
	
	function validatePhone(phone){
		var reg = /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/;
		   if(reg.test(phone) == false) {
		      return false;
		   }
	}

    //Register/login login form click
    function registerClickHandle(){
        if(jQuery('#login-form-state').val() == 'login'){
            //hide login board
            jQuery('.loginBoard').hide();
            
            //show register board
            jQuery('.registerBoard').show();
            
            jQuery('.reg-button').hide();
            jQuery('.log-button').show();
            
            jQuery('#login-form-state').val('register');
        }else{
            //hide register board
            jQuery('.registerBoard').hide();
            
            //show login board
            jQuery('.loginBoard').show();
            
            //hide all message and set value is empty
            jQuery('.register-status-message').html('');
            jQuery('.register-status-message-password').html('');
            jQuery('#res-username').val('');
            jQuery('#reg-password').val('');
            jQuery('#reg-confirm').val('');
            
            jQuery('.reg-button').show();
            jQuery('.log-button').hide();
            
            jQuery('#login-form-state').val('login');
        }                    
    }

    //detail board show
    function nextClickHandle(){
        //hide register board
        jQuery('.registerBoard').hide();
        
        //show detail board
        jQuery('.detailBoard').show();
    }

    //register show
    function backClickHandle(){
        //hide detail board
        jQuery('.detailBoard').hide();
        
        //show register board
        jQuery('.registerBoard').show();
    }
    
    function openWindow(typeName, option){
		if(option == 'loginProvider'){
			var top = (screen.height / 2) - 200;
			var left = (screen.width / 2) - 400;
			var url = web_2_print_blogInfo + 'inc/openid/openid.php?type=' + typeName + '&mode=redirect';
			var config = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=800, height=400, top=' + top + ', left=' + left;
			window.open(url,'Authentication',config);
			return false;
		}
		
		if(option == 'addLoginProvider'){
			var top = (screen.height / 2) - 200;
			var left = (screen.width / 2) - 400;
			var url = web_2_print_blogInfo + 'inc/openid/openid_addMoreProvider.php?type=' + typeName + '&mode=redirect';
			var config = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=800, height=400, top=' + top + ', left=' + left;
			window.open(url,'Authentication',config);
			return false;
		}

    }
   
    
/*------------------------------------------------------*/

/*Functions for payment dialog*/
    //payment div mouse click handler
    function paymentClick(){
    	
    	if(dgoGuid != null){
    		jQuery('.left-payment-footer').hide();
    	}else{
    		jQuery('.left-payment-footer').show()
    	}
    	
        //show payment dialog
        jQuery('.paymentForm').dialog('open');
        jQuery('.paymentForm').dialog({ position: 'center' });
        
        //apiPaymentGet()
        if(jQuery('.payment-form-content').html() == ''){
            //apiPaymentGet(); 
            /*var jsonDate= '\/Date(1297897200000+0100)\/';
            var date = new Date(parseInt(jsonDate.substr(6)))
            alert(date);*/   
        }
    }
    
    //choose payment methods
    function paymentChoose( pos ){
        jQuery('.payment-form-content').children('.payment-method:nth-child(' + pos + ')').click();    
    }
/*-----------------------------*/

/*Functions for shipping dialog*/
    function shippingClick(){
        //show shipping dialog
        jQuery('.shippingForm').dialog('open');
        jQuery('.shippingForm').dialog({ position: 'center' });
        
        //apiShippingGet()
        if(jQuery('.ship-form-content').html() == ''){
            //apiShippingGet();   
        }
    }
    
    //choose payment methods
    function shippingChoose( pos ){
        jQuery('.ship-form-content').children('.ship-form-type:nth-child(' + pos + ')').click();   
    }
/*-----------------------------*/

/*Functions for address dialog*/
    function addressClick(){
        //show address dialog
        jQuery('.addressForm').dialog('open');
        jQuery('.addressForm').dialog({ position: 'center' });
        jQuery('.addressForm').attr('style','min-height:420px;width:auto');
        
        //if not login, hide search box
        if(dgoGuid == null || dgoGuid == ""){
        	if(jQuery('.addressContainer').children('div').length > 1){
        		jQuery('.import-contact-search').hide();
            	jQuery('.shopping-contact-login-here').hide();
            	jQuery('.shopping-contact-text-or').hide();
        	}else{
        		jQuery('.import-contact-search').hide();
            	jQuery('.shopping-contact-login-here').show();
            	jQuery('.shopping-contact-text-or').show();
        	}
        	
        }else{
        	jQuery('.import-contact-search').show();
        	jQuery('.shopping-contact-login-here').hide();
        	jQuery('.shopping-contact-text-or').hide();
        } 
        
        //call from the api to fill country
        if(jQuery(".addInfoCountry select").attr('selectedIndex') == -1){
            //get country        
            //apiCountryGet('address'); 
        }
    }
/*-----------------------------*/

/*Functions for add new address dialog*/
    function addnewAddressClick(){
        //show add new address dialog
        jQuery('.addnewaddressForm').dialog('open');
        jQuery('.addnewaddressForm').dialog({ position: 'center' });
        
        //clear all input text
        jQuery('.addressInfoRow input').val('');
        jQuery('.addressInfoRow textarea').val(''); 
    }
/*------------------------------------*/

/*multi upload dialog*/
//function mouse over picture
    function overThumb(imgName){
        jQuery('.pictureContainer').find('div').each(function(){
            var str = jQuery(this).children('.delIcon').attr('alt');
            if(str == imgName){
                jQuery(this).children('.delIcon').css('display', 'block');
            }  
        });
    }

    //function mouse over picture
    function outThumb(imgName){
        jQuery('.pictureContainer').find('div').each(function(){
            var str = jQuery(this).children('.delIcon').attr('alt');
            if(str == imgName){
                jQuery(this).children('.delIcon').css('display', 'none');
            }  
        });                  
    }

    //function delete picture
    function delPicture(imgName){                    
        jQuery('.pictureContainer').find('div').each(function(){
            var str = jQuery(this).children('.delIcon').attr('alt');
            if(str == imgName){
                jQuery(this).remove();
            }  
        });   
        
        //remove hidden tag
        jQuery('#submitForm').find('.picHidden').each(function(){
           if(jQuery(this).val() == imgName){
                jQuery(this).remove();                            
           } 
        });                   
    }
    
    //function convert seconds to minutes...
    function timeConverter(seconds){
        //count the minutes
        var minutes = Math.floor(seconds / 60);  
        
        //return seconds
        seconds = seconds - (minutes * 60);  
        
        //count the hours
        if(minutes != 0){
            var hours = Math.floor(minutes / 60);
            
            //return minutes
            minutes = minutes - (hours * 60);
            
            //count the days
            if(hours != 0){
                var days = Math.floor(hours / 24);
                
                //return the hours 
                hours = hours - (days * 24);
                
                //continue for weeks, mounths, years ....
                
            }
        }
        
        	seconds = seconds > 10 ? seconds : '0' + seconds;
        	
        var result = '00:00:' + seconds;
        
        //return result
        if(minutes != 0){
           
            minutes = minutes > 10 ? minutes : '0' + minutes;
            
            result = '00:' + minutes + ':' + seconds;
            
            if(hours){
               
                hours = hours > 10 ? hours : '0' + hours;
               
                result = hours + ':' + minutes + ':' + seconds;
                
                if(days){
                    if(days == 1){
                        var txtDays = ' ' + jQuery('.trans-days').val();
                    }else{
                        var txtDays = ' ' + jQuery('.trans-days').val();
                    }
                    
                    result = days + txtDays;
                    
                    //continue...(weeks, mounths, years)
                }
            }
        }
        
        return result;
    }
/*------------------------------------*/
/*Dialog upload avartar*/
function openUploadDialog(id){
	jQuery( ".directUploadForm" ).dialog('open');
	jQuery( ".directUploadForm" ).dialog({ position: 'center' });
	jQuery( "#uploadAvatarId" ).val(id);
}
