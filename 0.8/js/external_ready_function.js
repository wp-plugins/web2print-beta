/*This file separates ready funtions*/
/*function for ready public event*/
function ready_public_event(){
	jQuery.fx.speeds._default = 500;
	
	// Override prototypes to fix json serialization
    delete Number.prototype.toJSON;
    delete Boolean.prototype.toJSON;
    delete String.prototype.toJSON;
    delete Array.prototype.toJSON;
    Object.toJSON = JSON2.stringify;

    
	//use in account details page
    jQuery( "#account-details-tabs" ).tabs();
    
    //fix overflow when sidebar use overflow = hidden
    //jQuery('.order-product-main').parent().css("overflow","visible");
    
    jQuery('.best-product-element').hover(
    	function(){
    		jQuery(this).children('.best-product-img-over-nonslide').show();		    		
    	},
    	function(){
    		jQuery(this).children('.best-product-img-over-nonslide').hide();
    	}
    );
    
    jQuery('.best-product-element-best-seller').hover(
        	function(){
        		jQuery(this).children('.best-product-img-over').show();		    		
        	},
        	function(){
        		jQuery(this).children('.best-product-img-over').hide();
        	}
        );
    
    //product slider: on order-confirmation page
    jQuery(function(){ 		
    		
    		//event for slider
    		jQuery( "#slider-wrap" ).slider({    			
    			orientation: 'horizontal',
    			min: 0,
    			max: 5,    			
        		slide: function(event, ui) {
    				var newValue = 0;    			
    					newValue = 0 - ui.value * 143;
            		jQuery('.best-product-container-best-seller').animate({left: newValue}, 100); 
            		
             	},
             	change: function(event, ui) {
             		var newValue = 0;    				
             			newValue = 0 - ui.value * 143;
            		jQuery('.best-product-container-best-seller').animate({left: newValue}, 100); 
                }
    		
        	});  
    		
    		//event for mousewheel
    		jQuery(".best-product-container-best-seller,#slider-wrap").mousewheel(function(event, delta){
    			var sliderVal = jQuery('#slider-wrap').slider("value");//read current value of the slider
    			
    			sliderVal += delta;//increment the current value

    			jQuery('#slider-wrap').slider("value", sliderVal);//and set the new value of the slider
    			
    			event.preventDefault();//stop any default behaviour
    		});
    });
    
	
	//change input color
    jQuery('.validate-input').hover(
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
    
    //=======================================================
    jQuery('.validate-input input').focus(function(){    
        jQuery(this).parent().parent('.config-input-login').css({'border-color': '#ED9121'}); 
        jQuery(this).parent().parent('.config-input-login').css({'background-color': '#fefefe'});  //rgb(254, 254, 254) 
    });

    jQuery('.login-username').blur(function(){
    	jQuery(this).next('.address-check').removeClass('checkImgTrue');
    	jQuery(this).next('.address-check').removeClass('checkImgFalse');
    	if(jQuery(this).val() != ""){
    		var flag = validateUser(jQuery(this).val());
    		if(flag!=false){
    			jQuery('.login-input-login').css({"border-color":"green"});
    			jQuery(this).next('.address-check').removeClass('checkImgFalse');
                jQuery(this).next('.address-check').addClass('checkImgTrue');
                jQuery('.login-user-message').html("");
    		}else{
    			jQuery('.login-input-login').css({"border-color":"red"});
    			jQuery(this).next('.address-check').removeClass('checkImgTrue');
                jQuery(this).next('.address-check').addClass('checkImgFalse');
                jQuery('.login-user-message').html(jQuery('#trans-dialog-invalid-email').val());
    		}
    	}else{
    		jQuery('.login-input-login').css({"border-color":"red"});
            jQuery(this).next('.address-check').addClass('checkImgFalse');
    	}
    });
    
    jQuery('.login-password').blur(function(){
    	jQuery(this).next('.address-check').removeClass('checkImgFalse');
		jQuery(this).next('.address-check').removeClass('checkImgTrue');
    	if(jQuery(this).val() != ""){  
    		jQuery(this).next('.address-check').removeClass('checkImgFalse');
    		jQuery(this).next('.address-check').removeClass('checkImgTrue');
    		if(jQuery(this).val().length >= 6){
    			jQuery('.login-input-password').css({"border-color":"green"});
    			jQuery(this).next('.address-check').removeClass('checkImgFalse');
                jQuery(this).next('.address-check').addClass('checkImgTrue');
                jQuery('.login-password-message').html("");
    		}else{
    			jQuery('.login-input-password').css({"border-color":"red"});
    			jQuery(this).next('.address-check').removeClass('checkImgTrue');
                jQuery(this).next('.address-check').addClass('checkImgFalse');
                jQuery('.login-password-message').html(jQuery('#trans-dialog-invalid-password').val());
    		}
    	}else{
    		
    		jQuery('.login-input-password').css({"border-color":"red"});
            jQuery(this).next('.address-check').addClass('checkImgFalse');
    	}
    });
    
    //check login exist when register
    jQuery('#res-username').blur(function(){
    	jQuery('.address-check-user').removeClass('checkImgTrue');
	    jQuery('.address-check-user').removeClass('checkImgFalse');
    	if(jQuery('#res-username').val() != ""){
    		
		    jQuery('.address-check-user').addClass('checkImgContactExist');
	    	var flag = validateUser(jQuery('#res-username').val());
	    	if(flag!=false){    		    
		    	contacting_CheckContactingExist(jQuery('#res-username').val(), 'register-new-account', 'contact'); 
	    	}else{
	    		jQuery('.leftContentDiv .email-user').css({"border-color":"red"});
	    		jQuery('.register-status-message').html(jQuery('#trans-dialog-invalid-email').val());
	    		jQuery('.address-check-user').removeClass('checkImgContactExist');
	    		jQuery('.address-check-user').addClass('checkImgFalse');
	    		jQuery('#check-user-exist-status').val('false');
	    	}
    	}else{
    		
    		jQuery('.address-check-user').addClass('checkImgFalse');
    		jQuery('#check-user-exist-status').val('false');
    	}

    })
    
    //validate password when register
    jQuery('#reg-password').blur(function(){
    	jQuery('.address-check').removeClass('checkImgTrue');
		jQuery('.address-check').removeClass('checkImgFalse');
    	if(jQuery('#reg-password').val() != ""){
    		
    		if(jQuery('#reg-password').val().length < 6){
    			jQuery('.leftPassContentDiv .config-input-login').css({"border-color":"red"});
				jQuery('.address-check').addClass('checkImgFalse');
    			jQuery('.register-status-message-password').html(jQuery('#trans-dialog-password').val()+' '+jQuery('#trans-dialog-invalid-password').val());
    		}else{
    			jQuery('.leftPassContentDiv .config-input-login').css({"border-color":"green"});
				jQuery('.address-check').addClass('checkImgTrue');
    			jQuery('.register-status-message-password').html('');
    		}
    	}else{
    		
    		jQuery('.leftPassContentDiv .config-input-login').css({"border-color":"red"});
			jQuery('.address-check').addClass('checkImgFalse');
    	}
    })
    //validate password when register
    jQuery('#reg-confirm').blur(function(){
    	jQuery('.address-check-confirm').removeClass('checkImgTrue');
		jQuery('.address-check-confirm').removeClass('checkImgFalse');
    	if(jQuery('#reg-confirm').val() != ""){
    		
    		if(jQuery('#reg-confirm').val().length < 6){
    			jQuery('.rightPassContentDiv .config-input-login').css({"border-color":"red"});
				jQuery('.address-check-confirm').addClass('checkImgFalse');
    			jQuery('.register-status-message-password').html(jQuery('#trans-dialog-password-confirm').val()+' '+jQuery('#trans-dialog-invalid-password').val());
    		}else if(jQuery('#reg-confirm').val() != jQuery('#reg-password').val()){
    				jQuery('.rightPassContentDiv .config-input-login').css({"border-color":"red"});
    				jQuery('.address-check-confirm').addClass('checkImgFalse');
    				jQuery('.register-status-message-password').html(jQuery('#trans-dialog-confirm-not-equal').val());
    			}else{
    				jQuery('.rightPassContentDiv .config-input-login').css({"border-color":"green"});
    				jQuery('.address-check-confirm').addClass('checkImgTrue');
    				jQuery('.register-status-message-password').html('');
    			}
    	}else{
    		jQuery('.rightPassContentDiv .config-input-login').css({"border-color":"red"});
			jQuery('.address-check-confirm').addClass('checkImgFalse');
    	}
    })
    
    
    jQuery('#Register-button').click(function(){
    	var flag = jQuery('#check-user-exist-status').val();
    	  	
    	if(flag == "true"){
    		if(jQuery("#reg-password").val() != "" && jQuery("#reg-confirm").val() != ""){
				if(jQuery("#reg-password").val().length >= 6 && jQuery("#reg-confirm").val().length >= 6){
					if(jQuery("#reg-password").val() == jQuery("#reg-confirm").val()){						
						//show announce
						ShowUserDialog('Register', 'dgo-user-process', 'Please wait a moment...', 'Ok');
						
						jQuery.getJSON('http://api.wipmania.com/jsonp?callback=?', '', function(json) {
	    					var countryCode = json.address.country_code;
	    					
	    					var TimeZone = getTimeZoneId();
												
							var contact = {
											  "Active": false,
											  "ContactingAddress":[
											     {
											        "Active": true,
											        "Address":{
											           "Active": true,
											           "AddressAssignment":[
											              {
											                 "AddressTypeToken":"MAIN"
											              }
											           ],
											           "City": "",
											           "Company": "",
											           "CountryToken": countryCode,
											           "Email":[
											              {
											                 "Active":true,
											                 "Text":jQuery("#res-username").val()
											              }
											           ],
											           "Forename":"",
											           "GreetingToken":"Formal",
											           "ObjectNote":{
											              "Text": "Note for address"
											           },
											           "SalutationToken": "Male",
											           "Street": "",
											           "Surname": "",
											           "Telecommunication":[
											              {
											                 "Active": true,
											                 "Number": "",
											                 "TypeToken": "Phone"
											              }
											           ],
											           "ZipCode": ""
											        }
											     }
											  ],
											  "ContactingSetting": [
																	{
																		"Key": "Api.MaxNumOfResaleUnits",
																		"Type": "System.String",
																		"Value": 1
																	}
																   ],
											  "IdTimeZone": TimeZone,
											  "CurrencyToken": globalCurrency,
											  "DisplayLocale": countryCode.toLowerCase() + "-" + countryCode,
											  "Handle": "customer",
											  "LanguageToken": globalLanguage,
											  "Login": jQuery("#res-username").val(),
											  "Password": hex_md5(jQuery("#reg-password").val())											  
										};
									
									jQuery('.loginForm').dialog('close');	
									//create new account												
									contacting_Register(contact);
							})	    				
					}
				}
			
			}
    	}
    })
    
    //add or edit address in shopCart
	jQuery("#BtnDone").click(function(){
		var flag	  = true;
		
		if(jQuery('#forename').val() == ""){			
			jQuery('.address-name-first').addClass('address-input-check');
			jQuery('.address-name-first .address-check').addClass('check-img-false');
			flag = false;
		}else{
			jQuery('.address-name-first').removeClass('address-input-check');
			jQuery('.address-name-first .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#surname').val() == ""){			
			jQuery('.address-name-last').addClass('address-input-check');
			jQuery('.address-name-last .address-check').addClass('check-img-false');
			flag = false;
		}else{
			jQuery('.address-name-last').removeClass('address-input-check');
			jQuery('.address-name-last .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#street').val() == ""){			
			jQuery('.address-name-street').addClass('address-input-check');
			jQuery('.address-name-street .address-check').addClass('check-img-false');		
			flag = false;
		}else{
			jQuery('.address-name-street').removeClass('address-input-check');
			jQuery('.address-name-street .address-check').removeClass('check-img-false');	
		}
		
		
		if(jQuery('#zipcode').val() == ""){			
			jQuery('.address-name-zip').addClass('address-input-check');
			jQuery('.address-name-zip .address-check').addClass('check-img-false');			
			flag = false
		}else{
			jQuery('.address-name-zip').removeClass('address-input-check');
			jQuery('.address-name-zip .address-check').removeClass('check-img-false');	
		}
		
		if(jQuery('#city').val() == ""){
			jQuery('.address-name-city').addClass('address-input-check');
			jQuery('.address-name-city .address-check').addClass('check-img-false');				
			flag = false;
		}else{
			jQuery('.address-name-city').removeClass('address-input-check');
			jQuery('.address-name-city .address-check').removeClass('check-img-false');	
		}
		
		if(jQuery('#email').val() == ""){
			jQuery('.address-name-email').addClass('address-input-check');
			jQuery('.address-name-email .address-check').addClass('check-img-false');			
			flag = false;
		}else {
			jQuery('.address-name-email').removeClass('address-input-check');
			jQuery('.address-name-email .address-check').removeClass('check-img-false');	
			
			if(validateUser(jQuery('#email').val()) == false){			
				jQuery('.address-name-email').addClass('address-input-check');
				jQuery('.address-name-email .address-check').addClass('check-img-false');				
				flag = false;
			}
		}
		
		
		if(jQuery('#phone').val()!=""){						
			if(validatePhone(jQuery('#phone').val()) == false){
				jQuery('.address-name-phone').addClass('address-input-check');
				jQuery('.address-name-phone .address-check').addClass('check-img-false');				
				flag = false;
			}else{
				jQuery('.address-name-phone').removeClass('address-input-check');
				jQuery('.address-name-phone .address-check').removeClass('check-img-false');
			}
		}else{
			jQuery('.address-name-phone').removeClass('address-input-check');
			jQuery('.address-name-phone .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#addressNote').val() != ""){
			if(jQuery('#addressNote').val().length > 30){
				var message = '';
				message += '<div class="errorMessage-container">';
			    message += '<div class="errorMessage-label">'+jQuery('#popup-trans-note').val()+':</div><div class="errorMessage-text">'+jQuery('#popup-trans-invalid-note').val()+'</div>';
			    message += '</div>';
				jQuery('.address-note-content-message').html(message);
				jQuery('.add-info-note-message').show();
				jQuery('.textarea-div').addClass('address-input-check');
				
				flag = false;
			}else{
				jQuery('.address-note-content-message').html('');
				jQuery('.add-info-note-message').hide();
				jQuery('.textarea-div').removeClass('address-input-check');
			}	
		}else{
			jQuery('.address-note-content-message').html('');
			jQuery('.add-info-note-message').hide();
			jQuery('.textarea-div').removeClass('address-input-check');
		}
		if(dgoCurrentPage == 'shoppingCart'){
			if(jQuery('#password').val() != ""){
				if(jQuery('#password').val().length < 6){
					var message = '';
					message += '<div class="errorMessage-container">';
				    message += '<div class="errorMessage-label">'+jQuery('#popup-trans-pass').val()+':</div><div class="errorMessage-text">'+jQuery('#popup-trans-pass-mess').val()+'</div>';
				    message += '</div>';
					jQuery('.address-password-content-message').html(message);				
					jQuery('.add-info-password-message').show();
					jQuery('.address-name-password').addClass('address-input-check');
					jQuery('.address-name-password .address-check').addClass('check-img-false');				
					flag = false;
				}else{
					jQuery('.address-password-content-message').html('');				
					jQuery('.add-info-password-message').hide();
					jQuery('.address-name-password').removeClass('address-input-check');
					jQuery('.address-name-password .address-check').removeClass('check-img-false');
				}
			}else{
				jQuery('.address-password-content-message').html('');				
				jQuery('.add-info-password-message').hide();
				jQuery('.address-name-password').removeClass('address-input-check');
				jQuery('.address-name-password .address-check').removeClass('check-img-false');
			}
		}
		
		
		if(flag == true){
			//if in address Book page
			if(dgoCurrentPage == 'addressBook'){
				if(dgoContactOptions == 'edit'){
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.SalutationToken 				= jQuery('.sexual:selected').attr('value');
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Surname 						= jQuery('#surname').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Forename 						= jQuery('#forename').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Company 						= jQuery('#company').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Street 							= jQuery('#street').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.City 							= jQuery('#city').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.ZipCode 						= jQuery('#zipcode').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Telecommunication[0].Number 	= jQuery('#phone').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Email[0].Text					= jQuery('#email').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.CountryToken 					= jQuery('.add-info-country-dropdown-selected').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.ObjectNote.Text 				= jQuery('#addressNote').val();
					delete dgoContacting.ResaleUnit;
					delete dgoContacting.CurrencyToken;
					delete dgoContacting.Discount;
					delete dgoContacting.DisplayLocale;
					delete dgoContacting.Handle;
					delete dgoContacting.IdDiscount;
					delete dgoContacting.LanguageToken;
					delete dgoContacting.MessagingFlags;
					delete dgoContacting.UserImageType;
					contacting_Update();//function in contacting_request_function.js
					jQuery('.addnewaddressForm').dialog('close');	
				}
		    	if(dgoContactOptions == 'add'){	
					var contact = new Object();
					contact.Id = 0;
					contact.Active = true;				
					contact.TimeZone = TimeZone;
					contact.Address = new Object();
					contact.Address.Id = 0;				
					contact.Address.Active = true;				
					contact.Address.City = jQuery('#city').val();				
					contact.Address.Company = jQuery('#company').val();				
					contact.Address.CountryToken = jQuery('.add-info-country-dropdown-selected').val();
					contact.Address.Email = new Array();				
					contact.Address.Email[0] = new Object();			
					contact.Address.Email[0].Id = 0;				
					contact.Address.Email[0].Active = true;				
					contact.Address.Email[0].Text = jQuery('#email').val();				
					contact.Address.Forename = jQuery('#forename').val();				
					contact.Address.GreetingToken = "Formal";
					contact.Address.ObjectNote = new Object();				
					contact.Address.ObjectNote.Id = 0;				
					contact.Address.ObjectNote.Text = jQuery('#addressNote').val();				
					contact.Address.SalutationToken = jQuery('.sexual:selected').attr('value');				
					contact.Address.Street = jQuery('#street').val();				
					contact.Address.Surname = jQuery('#surname').val();
					contact.Address.Telecommunication = new Array();
					contact.Address.Telecommunication[0] = new Object();
					contact.Address.Telecommunication[0].Id = 0;				
					contact.Address.Telecommunication[0].Active = true;				
					contact.Address.Telecommunication[0].Number = jQuery('#phone').val();				
					contact.Address.Telecommunication[0].TypeToken = "Phone";				
					contact.Address.ZipCode = jQuery('#zipcode').val();		
						
					dgoContacting.ContactingAddress.push(contact);												
					contacting_Update();//function in contacting_request_function.js
					jQuery('.addnewaddressForm').dialog('close');
				}

		}
		
		//if in shop Cart
		if(dgoCurrentPage == 'shoppingCart'){
			if(dgoContactOptions == 'add'){
				var TimeZone = getTimeZoneToken();										
				var contact = new Object();
				contact.Id = 0;
				contact.Active = true;				
				contact.TimeZone = TimeZone;
				contact.Address = new Object();
				contact.Address.Id = 0;				
				contact.Address.Active = true;								
				contact.Address.AddressAssignment = new Array;
				contact.Address.AddressAssignment[0] = new Object;
				contact.Address.AddressAssignment[0].AddressTypeToken = "MAIN";								
				contact.Address.City = jQuery('#city').val();				
				contact.Address.Company = jQuery('#company').val();				
				contact.Address.CountryToken = jQuery('.add-info-country-dropdown-selected').val();
				contact.Address.Email = new Array();				
				contact.Address.Email[0] = new Object();			
				contact.Address.Email[0].Id = 0;				
				contact.Address.Email[0].Active = true;				
				contact.Address.Email[0].Text = jQuery('#email').val();				
				contact.Address.Forename = jQuery('#forename').val();				
				contact.Address.GreetingToken = "Formal";
				contact.Address.ObjectNote = new Object();				
				contact.Address.ObjectNote.Id = 0;				
				contact.Address.ObjectNote.Text = jQuery('#addressNote').val();				
				contact.Address.SalutationToken = jQuery('.sexual:selected').attr('value');				
				contact.Address.Street = jQuery('#street').val();				
				contact.Address.Surname = jQuery('#surname').val();
				contact.Address.Telecommunication = new Array();
				contact.Address.Telecommunication[0] = new Object();
				contact.Address.Telecommunication[0].Id = 0;				
				contact.Address.Telecommunication[0].Active = true;				
				contact.Address.Telecommunication[0].Number = jQuery('#phone').val();				
				contact.Address.Telecommunication[0].TypeToken = "Phone";				
				contact.Address.ZipCode = jQuery('#zipcode').val();				
			
				if(dgoContacting != null){
					dgoContacting.ContactingAddress.push(contact);												
					contacting_Update();//function in contacting_request_function.js
					jQuery('.addnewaddressForm').dialog('close');
				}else{
					if(jQuery('#password').val() != "" && jQuery('#password').val().length >= 6){
						
						var password = jQuery('#password').val();
						
						contact.Password = password;
						
						//add new address
						AddressWithOutLogin(contact, 'add');
					}else if(jQuery('#password').val() == ""){
						//add new address
						AddressWithOutLogin(contact, 'add');
					}
	
				}	
			}											
			
			if(dgoContactOptions == 'edit'){
				if(dgoContacting != null){
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.SalutationToken 			= jQuery('.sexual:selected').attr('value');
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Surname 					= jQuery('#surname').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Forename 					= jQuery('#forename').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Company 					= jQuery('#company').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Street 						= jQuery('#street').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.City 						= jQuery('#city').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.ZipCode 					= jQuery('#zipcode').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Telecommunication[0].Number = jQuery('#phone').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.Email[0].Text 				= jQuery('#email').val();
					dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.CountryToken 				= jQuery('.add-info-country-dropdown-selected').val();
					if(dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.ObjectNote != undefined){
						dgoContacting.ContactingAddress[dgoContactIdGlobal].Address.ObjectNote.Text 			= jQuery('#addressNote').val();
					}
					delete dgoContacting.ResaleUnit;
					delete dgoContacting.CurrencyToken;
					delete dgoContacting.Discount;
					delete dgoContacting.DisplayLocale;
					delete dgoContacting.Handle;
					delete dgoContacting.IdDiscount;
					delete dgoContacting.LanguageToken;
					delete dgoContacting.MessagingFlags;
					delete dgoContacting.UserImageType;
					contacting_Update();//function in contacting_request_function.js
					jQuery('.addnewaddressForm').dialog('close');
				}else{	
					var TimeZone = getTimeZoneToken();
					var contact = new Object();
					contact.Id = 0;
					contact.Active = true;				
					contact.TimeZone = TimeZone;
					contact.Address = new Object();
					contact.Address.Id = 0;				
					contact.Address.Active = true;
					contact.Address.AddressAssignment = new Array;
					contact.Address.AddressAssignment[0] = new Object;
					contact.Address.AddressAssignment[0].AddressTypeToken = "MAIN";				
					contact.Address.City = jQuery('#city').val();				
					contact.Address.Company = jQuery('#company').val();				
					contact.Address.CountryToken = jQuery('.add-info-country-dropdown-selected').val();
					contact.Address.Email = new Array();				
					contact.Address.Email[0] = new Object();			
					contact.Address.Email[0].Id = 0;				
					contact.Address.Email[0].Active = true;				
					contact.Address.Email[0].Text = jQuery('#email').val();				
					contact.Address.Forename = jQuery('#forename').val();				
					contact.Address.GreetingToken = "Formal";
					contact.Address.ObjectNote = new Object();				
					contact.Address.ObjectNote.Id = 0;				
					contact.Address.ObjectNote.Text = jQuery('#addressNote').val();				
					contact.Address.SalutationToken = jQuery('.sexual:selected').attr('value');				
					contact.Address.Street = jQuery('#street').val();				
					contact.Address.Surname = jQuery('#surname').val();
					contact.Address.Telecommunication = new Array();
					contact.Address.Telecommunication[0] = new Object();
					contact.Address.Telecommunication[0].Id = 0;				
					contact.Address.Telecommunication[0].Active = true;				
					contact.Address.Telecommunication[0].Number = jQuery('#phone').val();				
					contact.Address.Telecommunication[0].TypeToken = "Phone";				
					contact.Address.ZipCode = jQuery('#zipcode').val();		
					
					if(jQuery('#password').val() != "" && jQuery('#password').val().length >= 6){
						
						var password = jQuery('#password').val();
						
						//Add password element
						contact.Password = password;
						
						//update address
						AddressWithOutLogin(contact, 'edit');
					}else if(jQuery('#password').val() == ""){
						//update address
						AddressWithOutLogin(contact, 'edit');
					}
				}				
			}
		}
	}
	});

    //change input color
    jQuery('.address-input').hover(
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
    

    //=======================================================
    jQuery('.address-input-general input').focus(function(){    
        jQuery(this).parent().parent('.address-input').css({'border-color': '#ED9121'}); 
        jQuery(this).parent().parent('.address-input').css({'background-color': '#fefefe'});  //rgb(254, 254, 254) 
    });

    jQuery('.address-input-general input').blur(function(){    
        //jQuery(this).parent('.inputDiv').css({'background-color': 'transparent'});  //transparent
        //jQuery(this).parent().parent('.address-input').css({'background-color': 'transparent'});
        if(jQuery(this).val().length < 1){
            jQuery(this).parent().parent('.address-input').css({'border-color': 'red'});
            jQuery(this).parent().children('.address-check').removeClass('check-img-true');
            jQuery(this).parent().children('.address-check').addClass('check-img-false'); 
        }else{
            jQuery(this).parent().parent('.address-input').css({'border-color': 'green'});
            jQuery(this).parent().children('.address-check').removeClass('check-img-false');
            jQuery(this).parent().children('.address-check').addClass('check-img-true');
        }    
    });
    //======================================================
    jQuery('.address-input-uncheck input').focus(function(){    
        jQuery(this).parent().parent('.address-input').css({'border-color': '#ED9121'});
        jQuery(this).parent().parent('.address-input').css({'background-color': '#fefefe'});  
    });

    jQuery('.address-input-uncheck input').blur(function(){ 
        //jQuery(this).parent().parent('.address-input').css({'background-color': 'transparent'});   
        jQuery(this).parent().parent('.address-input').css({'border-color': '#cdcdcd'}); 
    });
    
    jQuery('.address-input-uncheck textarea').focus(function(){    
        jQuery(this).parent('.address-input-uncheck').css({'border-color': '#ED9121'});
        jQuery(this).parent('.address-input-uncheck').css({'background-color': '#fefefe'});  
    });

    jQuery('.address-input-uncheck textarea').blur(function(){  
        //jQuery(this).parent('.address-input-uncheck').css({'background-color': 'transparent'});  
        jQuery(this).parent('.address-input-uncheck').css({'border-color': '#cdcdcd'}); 
    });
    
    //change input color
    jQuery('.address-input-uncheck').hover(
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
    //======================================================
    //check email
    jQuery('.address-input-email input').focus(function(){    
        jQuery(this).parent().parent('.address-input').css({'border-color': '#ED9121'}); 
        jQuery(this).parent().parent('.address-input').css({'background-color': '#fefefe'});  //rgb(254, 254, 254) 
    });

    jQuery('.address-input-email input').blur(function(){    
        //jQuery(this).parent('.inputDiv').css({'background-color': 'transparent'});  //transparent
        //jQuery(this).parent().parent('.address-input').css({'background-color': 'transparent'});
        if(checkEmail(jQuery.trim(jQuery(this).val()))){
            jQuery(this).parent().parent('.address-input').css({'border-color': 'green'});
            jQuery(this).parent().children('.address-check').removeClass('check-img-false');
            jQuery(this).parent().children('.address-check').addClass('check-img-true'); 
        }else{
            jQuery(this).parent().parent('.address-input').css({'border-color': 'red'});
            jQuery(this).parent().children('.address-check').removeClass('check-img-true');
            jQuery(this).parent().children('.address-check').addClass('check-img-false');            
        }    
    });
    //+ End add new address form +//

/*---------------------------------------------*/
/*Order production Plugin
------------------------------------------------
*/
    //login button click
    jQuery('#login-button').click(function(){
        //show dialog login
        jQuery('.loginForm').dialog('open');
        jQuery('.loginForm').dialog({ position: 'center' });
    });
    
    //login button click
    jQuery('#logout-button').click(function(){
        userLogout();        
    });
    
    //language dropdown
    jQuery('#lanSelect').click(function(){
    	var languagePopUp = jQuery('.dropdown-item-select-lan').offset();
    	jQuery('.dropdown-container-lan').css({
    		top: languagePopUp.top,left: languagePopUp.left
    	})
    	jQuery('.dropdown-container-lan').slideToggle(0);
    	jQuery('.dropdown-container-cur').hide();
    	
    })
    
    //currency dropdown
    jQuery('#curSelect').click(function(){
    	var CurrencyPopUp = jQuery('.dropdown-item-select-cur').offset();
    	jQuery('.dropdown-container-cur').css({
    		top: CurrencyPopUp.top,left: CurrencyPopUp.left
    	})
    	jQuery('.dropdown-container-cur').slideToggle(0);
    	jQuery('.dropdown-container-lan').hide();
    	
    })
  
    //change dimension in order product sidebar
        jQuery('#dimSelect').click(function(){
        	//dimensionChange(key);
    	
    	if(dgoDimension == 'inch'){
    		var key = 'mm'; 
    		dgoDimension = 'mm';   		
    	}else{
    		var key = 'inch';
    	 	dgoDimension = 'inch';
    		
    	}
    	
    		dimensionChange(key);
    	
    	
    });        
    
    //assign button in login form
    jQuery('.assign-exist-account').click(function(){
    	userLogout(); 
    	jQuery('.loginForm').dialog('open');
    	jQuery('.loginForm').dialog({ position: 'center' });
    	jQuery('.assignOpenidOr').dialog('close');
    });
	
	//close materials-mdd if click article-mdd
	 jQuery('#article-select').click(function(){
	 			jQuery('.dgo-materials-abso').hide();
	 			jQuery('.dgo-style-abso').hide();
	 });
	 //close article-mdd if click materials-mdd	
	 jQuery('#material-select').click(function(){
	 			jQuery('.dgo-type-abso').hide();
	 			jQuery('.dgo-style-abso').hide();
	 });		       
	 //close style-mdd if click materials-mdd	
	 jQuery('#style-select').click(function(){
	 			jQuery('.dgo-type-abso').hide();
	 			jQuery('.dgo-materials-abso').hide();
	 });		       
    
    //upload pictures click
    jQuery('#buttonMultiUpload').click(function(){
            multiUploadClick();                             
    });
    
    //template search click
    jQuery('.template-search-button').click(function(){
    	var searchText = jQuery('.template-text input').val();
    	templateGet(searchText);	
    	jQuery('.template-text input').val("");
    });
    
    //close dialog
    setTimeout(function () { 
		//close dialog button
		jQuery('.ex-close-button').click(function(){
			jQuery(this).parent().next().click();
		});		
	}, 2000);
}

/*funtion for login event*/
function ready_login_event(){
	//+ Payment form +//
    //payment dialog
    jQuery(function() {
        jQuery( ".paymentForm" ).dialog({
            title: jQuery('.paymentForm .translate-title').val() + '<div class="ex-close-button"></div>',
            autoOpen: false,                            
            width: 400,
            dialogClass: "dgo-dialog-class dgo-payment-form",
            modal: true,   
            zIndex: 5001,
            resizable: false,
            position: 'center'
        });                   
    });
    //+ End payment form +//
    
    //+ Shipping form +//
    //shipping dialog
    jQuery(function() {
        jQuery( ".shippingForm" ).dialog({
            title: jQuery('.shippingForm .translate-title').val() + '<div class="ex-close-button"></div>',
            autoOpen: false,                            
            width: 400,
            dialogClass: "dgo-dialog-class dgo-shipping-form",
            modal: true,    
            zIndex: 5001,
            resizable: false,
            position: 'center'
        });                   
    });
	//+ End address form +//
    jQuery(function() {
        jQuery( ".addressForm" ).dialog({
            title: jQuery('.addressForm .translate-title').val() + '<div class="ex-close-button"></div>',
            autoOpen: false,                            
            width: 855,
            dialogClass: "dgo-dialog-class dgo-address-form",
            modal: true, 
            zIndex: 5001,
            resizable: false,
            position: 'center'
        });                   
    });
    //+ Add new address form +//
    //add new address dialog
    jQuery(function() {
        jQuery( ".addnewaddressForm" ).dialog({
            title: jQuery('.addnewaddressForm .translate-title').val() + '<div class="ex-close-button"></div>',
            autoOpen: false,                                        
            width: 450,
            dialogClass: "dgo-dialog-class dgo-add-address-form",
            modal: true,   
            zIndex: 5001,
            resizable: false,
            position: 'center'
        });                   
    });
	// Login dialog
    jQuery(function() {
        jQuery( ".loginForm" ).dialog({
            title: jQuery('#trans-dialog-login').val() + '<div class="ex-close-button"></div>',
            autoOpen: false,                            
            height: 410,
            width:720,
            dialogClass: "dgo-dialog-class dgo-login-form",
            modal: true, 
            zIndex: 5001,
            resizable: false,
            position: 'center'
        });  
        
      //forgot your password dialog
		jQuery("#forgot-password").dialog({
			title: jQuery('#trans-dialog-forgot-password').val() + '<div class="ex-close-button"></div>',
			autoOpen: false,
			width: 380,
			dialogClass: "dgo-dialog-class dgo-forgot-password",
			modal: true,
			zIndex: 5001,
			resizable: false,
            position: 'center'
		});
    	
        
    var testlink= (window.location.href).split("/");
		for(var i=0;i<testlink.length;i++){
		 	if(testlink[i]=="login"){
		 		jQuery('.loginForm').dialog('open');
		 		jQuery('.loginForm').dialog({ position: 'center' });
		 		break;
		 	}else if(testlink[i]=="register"){
		 		jQuery('.loginForm').dialog('open');
		 		jQuery('.loginForm').dialog({ position: 'center' });
		 		registerClickHandle();
		 	break;
		 	}
		}
    });        
   
    //only login board appears  
    jQuery('.registerBoard').hide();
    jQuery('.detailBoard').hide();  
	
	// Add contact via openID
	jQuery( ".addNewContactViaOpenId" ).dialog({
		title: jQuery('#trans-dialog-open-new-via-openid').val() + '<div class="ex-close-button"></div>',
		autoOpen: false,
		width: 450,
		dialogClass: "dgo-dialog-class dgo-new-contact-via-openid",
		modal: true,
		zIndex: 5001,		
		resizable: false,
        position: 'center'
	});
	
	// message dialog
	jQuery( "#message-dialog" ).dialog({
		title: 'Message' + '<div class="ex-close-button"></div>',
		autoOpen: false,
		width: 400,
		dialogClass: "dgo-dialog-class dgo-message-dialog",
		modal: true,
		zIndex: 5001,		
		resizable: false,
        position: 'center'
	});
	
	jQuery('.message-dialog-button-ok').click(function(){
		jQuery( "#message-dialog" ).dialog('close');
	})
	
	//close button in add new contact via openid dialog
	jQuery( ".dgo-new-contact-via-openid .ex-close-button" ).click(function(){
			jQuery( ".addNewContactViaOpenId" ).dialog('close');
			
			//hide all error messages
			jQuery('.add-info-firstname-message').hide();
			jQuery('.add-info-lastname-message').hide();
			jQuery('.add-info-street-message').hide();
			jQuery('.add-info-city-message').hide();
			jQuery('.add-info-email-message').hide();
			jQuery('.add-info-note-message').hide();
			jQuery('.add-info-phone-message').hide();
			jQuery('.add-info-password-message').hide();
			jQuery('.add-info-zip-message').hide();
			
			//hide all warning
			jQuery('.address-name-first').removeClass('address-input-check');
			jQuery('.address-name-first .address-check').removeClass('check-img-false');
			jQuery('.address-name-last').removeClass('address-input-check');
			jQuery('.address-name-last .address-check').removeClass('check-img-false');
			jQuery('.address-name-street').removeClass('address-input-check');
			jQuery('.address-name-street .address-check').removeClass('check-img-false');
			jQuery('.address-name-zip').removeClass('address-input-check');
			jQuery('.address-name-zip .address-check').removeClass('check-img-false');
			jQuery('.address-name-city').removeClass('address-input-check');
			jQuery('.address-name-city .address-check').removeClass('check-img-false');
			jQuery('.address-name-email').removeClass('address-input-check');
			jQuery('.address-name-email .address-check-openid-email').removeClass('check-img-false');
			jQuery('.address-name-phone').removeClass('address-input-check');
			jQuery('.address-name-phone .address-check').removeClass('check-img-false');
			jQuery('.textarea-div').removeClass('address-input-check');
			jQuery('.address-name-password').removeClass('address-input-check');
			jQuery('.address-name-password .address-check').removeClass('check-img-false');
			
			//open assign or open new account dialog
			jQuery( ".assignOpenidOr" ).dialog('open');
			jQuery( ".assignOpenidOr" ).dialog({ position: 'center' });
	});
	
	//Choose the way to assign openid account
	jQuery( ".assignOpenidOr" ).dialog({
		title: jQuery('#trans-dialog-open-new-via-openid').val() + '<div class="ex-close-button"></div>',
		autoOpen: false,
		width: 460,
		dialogClass: "dgo-dialog-class dgo-assign-openid-or",
		modal: true,
		zIndex: 5001,
		resizable: false,
        position: 'center'
	});
	
	
	//active account dialog
	jQuery(function() {
	    jQuery("#active-account").dialog({
			title: jQuery('#trans-dialog-active-account').val() + '<div class="ex-close-button"></div>',
			autoOpen: false,		 			
			height: 220,
			width: 500,
			dialogClass: "dgo-dialog-class dgo-active-form",
			modal: true,
			zIndex: 5001,
			resizable: false,
            position: 'center'
		});  
	});
	
	//change password form
	jQuery( ".changePassForm" ).dialog({
			title: jQuery('#trans-change-password').val() + '<div class="ex-close-button"></div>',
			autoOpen: false,					
			height: 380,
			width: 550,
			dialogClass: "dgo-dialog-class dgo-change-password-contacting",
			modal: true,
			zIndex: 5001,
			resizable: false,
            position: 'center'
	});
	
	//Active not enable account 
	jQuery('#activeAccountButton').click(function(){
		var flag = false;
		if(jQuery('#activeAccount').val()!=""){
			flag = validateUser(jQuery("#activeAccount").val());
			if(flag != false){				
				contacting_ActivationRequest(jQuery("#activeAccount").val());//function in contacting_request_function.js
			}
		}
	});

	//Recover button event
	jQuery("#recoverButton").click(function(){
		check_email_pass_recover();
	});
	
	//country dropdown in add new address dialog
	jQuery('.country-dropdown-dialog').click(function(){
		jQuery('.add-info-country-dropdown').show();
	})
	
	//hide country dropdown when mouseleave
	jQuery('.add-info-country-dropdown').mouseleave(function(){
		jQuery('.add-info-country-dropdown').hide();
	})
	
	//check email exist
	jQuery('#openid-email').blur(function(){
		if(jQuery('#openid-email').val() != ""){
			var flag = validateUser(jQuery('#openid-email').val());
			if(flag != false){
				//show error email message
				jQuery('.address-name-email').removeClass('address-input-check');
				jQuery('.address-name-email .address-check-openid-email').removeClass('check-img-false');
				jQuery('.openid-address-email-content-message').html('');				
				jQuery('.add-info-email-message').hide();			
				jQuery( ".address-check-openid-email" ).addClass('checkImgContactExist');
				jQuery('#check-openid-email-status').val('false');

				contacting_CheckContactingExist(jQuery('#openid-email').val(), 'openid-new-account', 'contact');//function in contacting_request_function.js
			}
		}
	})
	
	//button add new contact via openid
	jQuery("#openid-BtnDone").click(function(){
		var flag	  = true;
		
		if(jQuery('#openid-forename').val() == ""){
			jQuery('.address-name-first').addClass('address-input-check');
			jQuery('.address-name-first .address-check').addClass('check-img-false');
			flag = false;
		}else{
			jQuery('.address-name-first').removeClass('address-input-check');
			jQuery('.address-name-first .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#openid-surname').val() == ""){
			jQuery('.address-name-last').addClass('address-input-check');
			jQuery('.address-name-last .address-check').addClass('check-img-false');
			flag = false;
		}else{
			jQuery('.address-name-last').removeClass('address-input-check');
			jQuery('.address-name-last .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#openid-street').val() == ""){
			jQuery('.address-name-street').addClass('address-input-check');
			jQuery('.address-name-street .address-check').addClass('check-img-false');			
			flag = false;
		}else{
			jQuery('.address-name-street').removeClass('address-input-check');
			jQuery('.address-name-street .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#openid-zipcode').val() == ""){
			jQuery('.address-name-zip').addClass('address-input-check');
			jQuery('.address-name-zip .address-check').addClass('check-img-false');			
			flag = false;
		}else{
			jQuery('.address-name-zip').removeClass('address-input-check');
			jQuery('.address-name-zip .address-check').removeClass('check-img-false');	
		}
		
		if(jQuery('#openid-city').val() == ""){
			jQuery('.address-name-city').addClass('address-input-check');
			jQuery('.address-name-city .address-check').addClass('check-img-false');				
			flag = false;
		}else{
			jQuery('.address-name-city').removeClass('address-input-check');
			jQuery('.address-name-city .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#openid-email').val() == ""){
			jQuery('.address-name-email').addClass('address-input-check');
			jQuery('.address-name-email .address-check-openid-email').addClass('check-img-false');				
			flag = false;
		}else {
			//show error email message
			jQuery('.openid-address-email-content-message').html('');				
			jQuery('.add-info-email-message').hide();
			jQuery('.address-name-email').removeClass('address-input-check');
			jQuery('.address-name-email .address-check-openid-email').removeClass('check-img-false');
			
			if(validateUser(jQuery('#openid-email').val()) == false){			
				jQuery('.address-name-email').addClass('address-input-check');
				jQuery('.address-name-email .address-check-openid-email').addClass('check-img-false');				
				flag = false;
			}
		}
		
		
		if(jQuery('#openid-phone').val()!=""){						
			if(validatePhone(jQuery('#openid-phone').val()) == false){
				jQuery('.address-name-phone').addClass('address-input-check');
				jQuery('.address-name-phone .address-check').addClass('check-img-false');				
				flag = false;
			}else{
				jQuery('.address-name-phone').removeClass('address-input-check');
				jQuery('.address-name-phone .address-check').removeClass('check-img-false');
			}
		}else{
			jQuery('.openid-address-phone-content-message').html('');				
			jQuery('.add-info-phone-message').hide();
			jQuery('.address-name-phone').removeClass('address-input-check');
			jQuery('.address-name-phone .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#openid-addressNote').val() != ""){
			if(jQuery('#openid-addressNote').val().length > 30){
				var message = '';
				message += '<div class="errorMessage-container">';
			    message += '<div class="errorMessage-label">'+jQuery('#popup-trans-note').val()+':</div><div class="errorMessage-text">'+jQuery('#popup-trans-invalid-note').val()+'</div>';
			    message += '</div>';
				jQuery('.openid-address-note-content-message').html(message);
				jQuery('.add-info-note-message').show();
				jQuery('.address-name-note').addClass('address-input-check');
				jQuery('.address-name-note .address-check').addClass('check-img-false');
				flag = false;
			}else{
				jQuery('.openid-address-note-content-message').html('');
				jQuery('.add-info-note-message').hide();
				jQuery('.address-name-note').removeClass('address-input-check');
				jQuery('.address-name-note .address-check').removeClass('check-img-false');
			}	
		}else{
			jQuery('.openid-address-note-content-message').html('');
			jQuery('.add-info-note-message').hide();
			jQuery('.address-name-note').removeClass('address-input-check');
				jQuery('.address-name-note .address-check').removeClass('check-img-false');
		}
		
		if(flag==true){
			jQuery.getJSON('http://api.wipmania.com/jsonp?callback=?', '', function(json) {
			
    			var countryCode = json.address.country_code;
				var TimeZone = getTimeZoneId();
				
				var contact = {
					"Active": true,
					"IdTimeZone": TimeZone,
					"ContactingAddress":[
						{
						"Id": 0,
						"Active": true,
						"Address":{
								"Id": 0,
								"Active": true,
								"AddressAssignment":[
						              {
						                 "AddressTypeToken":"MAIN"
						              }
						        ],
								"City": jQuery('#openid-city').val(),
								"Company": jQuery('#openid-company').val(),
								"CountryToken": jQuery('.add-info-country-dropdown-selected').val(),
								"Email":[
									{
										"Id": 0,
										"Active":true,
										"Text": jQuery( "#openid-email" ).val()
									}
								],
								"Forename":jQuery('#openid-forename').val(),
								"GreetingToken":"Formal",
								"ObjectNote":{
									"Id": 0,
									"Text": jQuery('#openid-addressNote').val()
								},
								"SalutationToken": jQuery('.sexual:selected').attr('value'),
								"Street": jQuery('#openid-street').val(),
								"Surname": jQuery('#openid-surname').val(),
								"Telecommunication":[
									{
										"Id": 0,
										"Active": true,
										"Number": jQuery('#openid-phone').val(),
										"TypeToken": "Phone"
									}
								],
								"ZipCode": jQuery('#openid-zipcode').val()
							}
						}
					],
					"ContactingSetting": [
						{
							"Key": jQuery('#openid-loginprovifer').val(),
							"Type": "System.String",
							"Value": jQuery("#openid-id").val()
						},
						{
							"Key": "Api.MaxNumOfResaleUnits",
							"Type": "System.String",
							"Value": MaxNumOfResaleUnits
						}
					],
					"CurrencyToken": globalCurrency,
					"DisplayLocale": countryCode.toLowerCase() + "-" + countryCode,
					"Handle": "customer",
					"LanguageToken": globalLanguage,
					"Login": jQuery('#openid-email').val(),
					"Password": hex_md5(Math.random())						
				};
				
				//register new contact via login provider
				contacting_RegisterViaOpenid(contact);
			})
		}					
	});
}


/*function for ready user addressbook event*/
function ready_user_addressbook_event(){
	jQuery(function(){
		if(dgoGuid == ''){
			//window.location = homeUrl;
			jQuery( ".loginForm" ).dialog('open');	
			jQuery( ".loginForm" ).dialog({ position: 'center' });
		}
	});
	
	//add new address dialog
    jQuery(function() {
        jQuery( ".addnewaddressForm" ).dialog({
            title: jQuery('.addnewaddressForm .translate-title').val() + '<div class="ex-close-button"></div>',
            autoOpen: false,                            
            width: 450,
            dialogClass: "dgo-dialog-class dgo-add-address-form",
            modal: true, 
            zIndex: 5001,
            resizable: false,
            position: 'center'
        });                   
    });
	
	//add new address click
    jQuery('.newAddress').click(function(){
		dgoContactOptions = 'add';
		for(x in dgoCountryApi){
			if(dgoCountryApi[x].Key == globalCurrentCountry){
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
		
		//restore all value
    	jQuery('#surname').val("");
		jQuery('#forename').val("");
		jQuery('#company').val("");
		jQuery('#street').val("");
		jQuery('#city').val("");
		jQuery('#zipcode').val("");
		jQuery('#phone').val("");
		jQuery('#email').val("");
		jQuery('#addressNote').val("");				
	 			
		
		//remove all class warning
		jQuery('.address-name-first').removeClass('address-input-check');
		jQuery('.address-name-first .address-check').removeClass('check-img-false');
		jQuery('.address-name-last').removeClass('address-input-check');
		jQuery('.address-name-last .address-check').removeClass('check-img-false');
		jQuery('.address-name-street').removeClass('address-input-check');
		jQuery('.address-name-street .address-check').removeClass('check-img-false');
		jQuery('.address-name-zip').removeClass('address-input-check');
		jQuery('.address-name-zip .address-check').removeClass('check-img-false');
		jQuery('.address-name-city').removeClass('address-input-check');
		jQuery('.address-name-city .address-check').removeClass('check-img-false');
		jQuery('.address-name-email').removeClass('address-input-check');
		jQuery('.address-name-email .address-check').removeClass('check-img-false');
		jQuery('.address-name-phone').removeClass('address-input-check');
		jQuery('.address-name-phone .address-check').removeClass('check-img-false');
		jQuery('.textarea-div').removeClass('address-input-check');
		
		//hide all error messages
		jQuery('.add-info-note-message').hide();		
		jQuery( ".addnewaddressForm" ).dialog('open');
		jQuery( ".addnewaddressForm" ).dialog({ position: 'center' });
    });
    
	//import from google
	jQuery( "#import-contacting" ).dialog({
            title: jQuery('#import-google').val() + '<div class="ex-close-button"></div>',
            autoOpen: false,
            height: 500,
            width:820,
            dialogClass: "dgo-dialog-class dgo-import-contacting-google",
            modal: true,
            zIndex: 5001,
            resizable: false,
            position: 'center'
	});
	
	//import from linkedIn
	jQuery( "#import-contacting-linkedin" ).dialog({
        title: jQuery('#import-linkedin').val() + '<div class="ex-close-button"></div>',
        autoOpen: false,
        height: 500,
        width:820,
        dialogClass: "dgo-dialog-class dgo-import-contacting-linkedin",
        modal: true,
        zIndex: 5001,
        resizable: false,
        position: 'center'
	});
	
	//sort in addressBook
	jQuery('#sortValue').change(function(){
		
		var sortBy = jQuery(this).val();
		
		switch(sortBy){
			case 'first-name':	{
				sortContacting(sortBy);
				break;
			}
			case 'last-name':	{
				sortContacting(sortBy);
				break;
			}
			case 'company':		{
				sortContacting(sortBy);
				break;
			}
			case 'city':		{
				sortContacting(sortBy);
				break;
			}
			default: 			{
				sortContacting('first-name');
				break;
			}
		}
	});
	
	//import linkedin address when click import button from import from Linkedin dialog
	jQuery('#import-contacting-linkedin-now').click(function(){
		var a = 
		jQuery('#import-contacting-linkedin-content').find('.import-contact-linkedin-item').each(function(){
			if(jQuery(this).children('.dgo-tick-import-linkedin').children('.hidden').val() >= 0){
				var a = {
				   "Id": 0,
				   "Active": true,
				   "Address":{
				   "Id": 0,
		           "Active": true,
		           "City": jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-city').html(),
		           "Company": "",
		           "CountryToken": jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-country').html(),
		           "Email":[
		              {
		              	 "Id": 0,
		                 "Active":true,
		                 "Text":jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-email').html()
		              }
		           ],
		           "Forename":jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-first-name').html(),
		           "GreetingToken":"Formal",
		           "ObjectNote":{
		           	  "Id":0,
		              "Text": ""
		           },
		           "SalutationToken": "Male",
		           "Street": jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-street').html(),
		           "Surname": jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-last-name').html(),
		           "Telecommunication":[
		              {
		              	 "Id": 0,
		                 "Active": true,
		                 "Number": jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-phone').html(),
		                 "TypeToken": "Phone"
		              }
		           ],
		           "ZipCode": ""
		        }
				};			
				dgoContacting.ContactingAddress.push(a);
				jQuery(this).children('.dgo-tick-import-linkedin').children('.hidden').val(-1);
				jQuery(this).children('.dgo-tick-import-linkedin').hide();
				jQuery(this).hide();
				
			}
		});
		contacting_Update();
		jQuery("#import-contacting-linkedin" ).dialog('close');
	});
	
	//import google address when click import button from import from Google dialog
	jQuery('#import-contacting-now').click(function(){
		var a = 
		jQuery('#import-contacting-content').find('.import-contact-item').each(function(){
			if(jQuery(this).children('.dgo-tick-import').children('.hidden').val() >= 0){
				var a = {
				   "Id": 0,
				   "Active": true,
				   "Address":{
				   "Id": 0,
		           "Active": true,
		           "City": jQuery(this).children('.import-contact-item-content').children('.import-contact-item-city').html(),
		           "Company": "",
		           "CountryToken": globalCurrentCountry,
		           "Email":[
		              {
		              	 "Id": 0,
		                 "Active":true,
		                 "Text":jQuery(this).children('.import-contact-item-content').children('.import-contact-item-email').html()
		              }
		           ],
		           "Forename":jQuery(this).children('.import-contact-item-content').children('.import-contact-item-name').html(),
		           "GreetingToken":"Formal",
		           "ObjectNote":{
		           	  "Id":0,
		              "Text": ""
		           },
		           "SalutationToken": "Male",
		           "Street": jQuery(this).children('.import-contact-item-content').children('.import-contact-item-street').html(),
		           "Surname": "",
		           "Telecommunication":[
		              {
		              	 "Id": 0,
		                 "Active": true,
		                 "Number": "",
		                 "TypeToken": "Phone"
		              }
		           ],
		           "ZipCode": ""
		        }
				};			
				dgoContacting.ContactingAddress.push(a);
				jQuery(this).children('.dgo-tick-import').children('.hidden').val(-1);
				jQuery(this).children('.dgo-tick-import').hide();
				jQuery(this).hide();
			}
		});
		contacting_Update();
		jQuery("#import-contacting" ).dialog('close');
	});

	//search in import contact from google dialog       
    jQuery("#import-contacting-txt").keyup(function(){
		if(jQuery("#import-contacting-txt").val() == ""){
			showAll();
		}else{
			showAll();
			
			var str = jQuery("#import-contacting-txt").val().toLowerCase();
			jQuery('#import-contacting-content').find('.import-contact-item').each(function(){
				
				if(jQuery(this).children('.import-contact-item-content').children('.import-contact-item-email').html().toLowerCase().search(str)<0 && jQuery(this).children('.import-contact-item-content').children('.import-contact-item-name').html().toLowerCase().search(str)<0 && jQuery(this).children('.import-contact-item-content').children('.import-contact-item-street').html().toLowerCase().search(str)<0 && jQuery(this).children('.import-contact-item-content').children('.import-contact-item-phone').html().toLowerCase().search(str)<0){
					jQuery(this).hide();
					
				}
			});
		}
	});
	
	//search linkedin address in import from linkedin dialog
	jQuery("#import-contacting-linkedin-txt").keyup(function(){
		if(jQuery("#import-contacting-linkedin-txt").val() == ""){
			showAllLinkedin();
		}else{
			showAllLinkedin();
			var str = jQuery("#import-contacting-linkedin-txt").val().toLowerCase();
			jQuery('#import-contacting-linkedin-content').find('.import-contact-linkedin-item').each(function(){
				if(jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-first-name').html().toLowerCase().search(str)<0 && jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-last-name').html().toLowerCase().search(str)<0 && jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-street').html().toLowerCase().search(str)<0 && jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-country').html().toLowerCase().search(str)<0 && jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-city').html().toLowerCase().search(str)<0 && jQuery(this).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-phone').html().toLowerCase().search(str)<0){
					jQuery(this).hide();
				}
			});
		}
	});  

    //search in addressBook list
    jQuery('#searchValue').keyup(function(){
		if(jQuery('#searchValue').val()!=""){
			showAllContactingAddress();
			var str =  jQuery('#searchValue').val().toLowerCase();
			 jQuery('#all-contact-field').find('.contact-table-cell').each(function(){   
				 
				 if(jQuery(this).children('.name-field').children('.name-field-first-name').html().toLowerCase().search(str)<0 && 
				    jQuery(this).children('.name-field').children('.name-field-last-name').html().toLowerCase().search(str)<0 && 
				    jQuery(this).children('.name-field').children('.name-field-company').html().toLowerCase().search(str)<0 && 
				    jQuery(this).children('.address-field').children('.address-field-street').html().toLowerCase().search(str)<0 && 
				    jQuery(this).children('.address-field').children('.address-field-city').html().toLowerCase().search(str)<0 && 
				    jQuery(this).children('.address-field').children('.address-field-zipcode').html().toLowerCase().search(str)<0 && 
				    jQuery(this).children('.address-field').children('.address-field-country').html().toLowerCase().search(str)<0 && 
				    jQuery(this).children('.contact-field').children('.contact-field-phone').html().toLowerCase().search(str)<0 && 
				    jQuery(this).children('.contact-field').children('.contact-field-email').html().toLowerCase().search(str)<0 && 
				    jQuery(this).children('.contact-field').children('.contact-field-note').html().toLowerCase().search(str)<0)
				    {
		        	  jQuery(this).hide();
		            }
			 });
		}else{
			showAllContactingAddress();//function in importContact.js
		}
	});
}

/*function for ready upload event*/
function ready_upload_event(){
    jQuery('.right-up-left').click(function(){
        viewUploadPanel();
    });
    
    jQuery('.left-up-right').click(function(){
        viewFacebookPanel();
    });
    
    jQuery('.footer-buttons').click(function(){
        if(jQuery(this).children('span').html() == 'Next'){
            viewUploadPanel();    
        }else{
            //fill to hidden input
            if(jQuery('#typeSel').val() == ''){
                var productionType = jQuery('#typeSel').html(); 
            }else{
                var productionType = jQuery("#typeSel").val();
            }
            
            jQuery('.typeSelHidden').val(productionType);
            jQuery('.materialHidden').val(jQuery('#materialSel').val());
            
            jQuery('#submitForm').submit();
        }
    });
    
    jQuery('#facebook').click(function(){
        viewFacebookPanel();
    });
    
    jQuery('.import-album-image').click(function(){
        //save pictures are selected
        pictures_selected_get();
        
        var albumID = jQuery(this).children('input').val();
        
        //get status begin
        if(stt_begin[albumID] == 'undefined'){
            var stt = 'notbegin';
        }else{
            var stt = stt_begin[albumID];
        }
        
        //call list album
        var f = document.getElementById('album-photo-iframe');
        f.src = blogInfo + 'inc/fbClass/list_photo_page.php?albumID=' + albumID + '&stt=' + stt;
        
        //set the name for album
        jQuery('#detail-album-form span').html('Pictures in album: ' + jQuery(this).parent('.import-album-div').attr('title'));
        
        //set status begin
        stt_begin[albumID] = 'begin';
        
        //save the last album
        //lastAlbumSelected = albumID;
        
        //check session is cleared or not
        //session_picture_check();
    });
    
    //create slider
    jQuery( ".slider-jquery" ).slider({
        value: 0,
        min: 0,
        max: 6,
        
        change: function(event, ui) {
                //console.log(ui.value);
         }
    });
    
    
    //+ Direct upload form +//
    jQuery( ".directUploadForm" ).dialog({
        title: jQuery('.directUploadForm .translate-title').val() + '<div class="ex-close-button"></div>',
        autoOpen: false,                            
        height: 120,
        width: 225,
        dialogClass: "dgo-dialog-class dgo-direct-upload",
        modal: true, 
        zIndex: 5001,
        resizable: false,
        position: 'center'
    });                   
    
    //+ End Direct upload form +//            
	//crop picture preview dialog
	jQuery(function() {
		jQuery( "#preview-crop-form" ).dialog({
			title: jQuery('#preview-crop-form .translate-title').val()  + '<div class="ex-close-button"></div>',
			autoOpen: false,
			width: 500,
			height: 430,
			dialogClass: "dgo-dialog-class dgo-dialog-crop",
			modal: true,
			zIndex: 5001,
			resizable: false,
            position: 'center'
		});
	});
    
    //redirect dialog
	
    jQuery( "#redirect-board-form" ).dialog({
        title: jQuery('#redirect-board-form .translate-title').val() + '<div class="ex-close-button"></div>',
        autoOpen: false,
        width: 500,
        height: 150,
        dialogClass: "dgo-dialog-class dgo-dialog-redirect-board",
        modal: true,  
        zIndex: 5001,
        resizable: false,
        position: 'center'
    });                   
    
    
    //painting size dialog
    // Multi upload dialog
    jQuery(function() {
        jQuery( "#PaintingSizePriceForm" ).dialog({
            title: "Select Your Size" + '<div class="ex-close-button"></div>',
            autoOpen: false,                            
            height: 480,
            width: 800,
            dialogClass: "dgo-dialog-class dgo-painting-size",
            modal: true,
            zIndex: 5001,                                                  
            resizable: false,
            position: 'center'
        });                   
    });
}

/*function for ready shopping cart event*/
function ready_shopcart_event(){
	
	//errorMessage dialog
    jQuery(function() {
        jQuery( ".dgo-errorMessage" ).dialog({
            title: jQuery('#errorMessage-title').val() + '<div class="ex-close-button"></div>',
            autoOpen: false,                            
            width: 600,
            dialogClass: "dgo-dialog-class dgo-errorMessage-dialog",
            modal: true, 
            zIndex: 5001,
            resizable: false,
            position: 'center'
        });                   
    });
    
    jQuery('.right-ship-country select').change(function(){
    	globalCountry = jQuery(this).val();
    	jQuery.blockUI(0);
    	//if this country has states
    	statesGet( "GetPrice" );
    });
    
    jQuery('.right-ship-state select').change(function(){
    	//call request again to get prices with country selected    
    	productionTimeGet(jQuery(this).val() );	
		shippingMethodGet( jQuery(this).val() );
		paymentMethodGet(jQuery(this).val() );		
    });
    //+ End shipping form +//
    
    //+ Address form +//    
    //address dialog    
    
    //add new address form click
    jQuery('.addNewArea').click(function(){
        addnewAddressClick();
    });    
    
     //show new addres dialog in shopping cart
	jQuery('.shopping-contact-add').click(function(){
		//set option for case: add contact
		dgoContactOptions = 'add';
		
		if(dgoContacting == null){
			jQuery('.add-info-show-password').css({display:"block"});
		}else{
			jQuery('.add-info-show-password').css({display:"none"});
		}
		
		var date 				= new Date();		
		var gmtInMinutes 		= -date.getTimezoneOffset();		
		var daylightsavingtime 	= DaylightSavingTime();												
						
		for(var i in dgoTimeZones){
			if(daylightsavingtime == false){
				if(dgoTimeZones[i].UtcOffsetInMinutes == gmtInMinutes && dgoTimeZones[i].SupportsDaylightSaving == undefined){
					jQuery('#timezones').val(dgoTimeZones[i].Id);
				}
			}else{
				if(dgoTimeZones[i].UtcOffsetInMinutes == gmtInMinutes && dgoTimeZones[i].SupportsDaylightSaving == true){
					jQuery('#timezones').val(dgoTimeZones[i].Id);
				}
			}
			
		}
		
		
    	for(x in dgoCountryApi){
			if(dgoCountryApi[x].Key == jQuery('.right-ship-country select').val()){
				var country = '';
				var key= dgoCountryApi[x].Key.toLowerCase();
				//country += '<div class="add-info-country-flag"><img src="http://api.delivergo.com/lib/img/flags/64_png_rect/'+flags[dgoCountryApi[x].Key]+'"></div>';
				country +="<div class='add-info-country-flag flag_b_"+key+"'></div>";
				country += '<div class="add-info-country-name">'+dgoCountryApi[x].Name+'</div>';
				country += '<div class="add-info-country-button"></div>';
				jQuery('.country-dropdown-dialog').html(country);
				jQuery('.add-info-country-dropdown-selected').val(dgoCountryApi[x].Key);
				jQuery('.add-info-country-dropdown').hide();
			}
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
	 	
	 	
		//hide all error messages
		jQuery('.add-info-email-message').hide();
		jQuery('.add-info-note-message').hide();
		jQuery('.add-info-password-message').hide();
		
		//remove all class warning
		jQuery('.address-name-first').removeClass('address-input-check');
		jQuery('.address-name-first .address-check').removeClass('check-img-false');
		jQuery('.address-name-last').removeClass('address-input-check');
		jQuery('.address-name-last .address-check').removeClass('check-img-false');
		jQuery('.address-name-street').removeClass('address-input-check');
		jQuery('.address-name-street .address-check').removeClass('check-img-false');
		jQuery('.address-name-zip').removeClass('address-input-check');
		jQuery('.address-name-zip .address-check').removeClass('check-img-false');
		jQuery('.address-name-city').removeClass('address-input-check');
		jQuery('.address-name-city .address-check').removeClass('check-img-false');
		jQuery('.address-name-email').removeClass('address-input-check');
		jQuery('.address-name-email .address-check').removeClass('check-img-false');
		jQuery('.address-name-phone').removeClass('address-input-check');
		jQuery('.address-name-phone .address-check').removeClass('check-img-false');
		jQuery('.textarea-div').removeClass('address-input-check');
		jQuery('.address-name-password').removeClass('address-input-check');
		jQuery('.address-name-password .address-check').removeClass('check-img-false');
		
	});
	
	//search in shopping address
	jQuery('#shopping-contacting-txt').keyup(function(){
		if(jQuery(this).val()!=""){
			showAllAddressShopping();//function in external_function.js
			var str = jQuery(this).val().toLowerCase();
		jQuery('.addressContainer').find('.shopping-contact-item').each(function(){
			if(
				jQuery(this).children('.shopping-contact-item-content').children('div').children('span.shopping-field-first-name').html().toLowerCase().search(str)<0 &&
				jQuery(this).children('.shopping-contact-item-content').children('div').children('span.shopping-field-last-name').html().toLowerCase().search(str)<0 &&
				jQuery(this).children('.shopping-contact-item-content').children('div').children('span.shopping-field-company').html().toLowerCase().search(str)<0 &&
				jQuery(this).children('.shopping-contact-item-content').children('div').children('span.shopping-field-street').html().toLowerCase().search(str)<0 &&
				jQuery(this).children('.shopping-contact-item-content').children('div').children('span.shopping-field-city').html().toLowerCase().search(str)<0 &&
				jQuery(this).children('.shopping-contact-item-content').children('div').children('span.shopping-field-zipcode').html().toLowerCase().search(str)<0 &&
				jQuery(this).children('.shopping-contact-item-content').children('div').children('span.shopping-field-email').html().toLowerCase().search(str)<0 &&
				jQuery(this).children('.shopping-contact-item-content').children('div').children('span.shopping-field-phone').html().toLowerCase().search(str)<0 &&
				jQuery(this).children('.shopping-contact-item-content').children('div').children('span.shopping-field-country').html().toLowerCase().search(str)<0
				//jQuery(this).children('.shopping-contact-item-content').children('span.shopping-field-countryToken').html().toLowerCase().search(str)<0
			){
				jQuery(this).hide();
			}
		});
		}else{
			showAllAddressShopping();//function in external_function.js
		}
	});
	
	//payment form click
    jQuery('.payment-payment').click(function(){                      
       paymentClick();        
    });
    
    //shipping form click
    jQuery('.payment-ship').click(function(){                      
       shippingClick(); 
    });
    
    //address form click
    jQuery('.payment-address').click(function(){                      
       addressClick(); 
    });
    
    /*Article select change  */ 
    jQuery('.product-time-select').change(function(){
    	var article_id = jQuery(this).parent().parent().children('.article_id').val();
    	var protype = jQuery(this).val();
    	
    	var run = 1;
    	var amount = 1;
    	var amountRun = jQuery(this).parent().next().children('input').val();
    	if(amountRun == 'amount'){
    		amount = parseInt(jQuery(this).parent().next().children('.amout-select').val());
    	}else if(amountRun == 'run'){
    		run = parseInt(jQuery(this).parent().next().children('.amout-select').val());
    	}
    
    	article_price_get(article_id, protype, amount, run);
    });
	
    jQuery('.run-input-value').change(function(){
		
		var max_volume = parseInt(jQuery(this).parent().children('#max-volume').val());
		if(parseInt(jQuery(this).val()) > max_volume){
			jQuery(this).val(max_volume);
		}
    	jQuery('.cal-sum-value').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
    	jQuery(this).parent().parent().children('.priceDiv').html("<span><img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'></span>");
    	
    	var article_id =jQuery(this).parent().parent().children('.article_id').val();    	
    	var protype = jQuery(this).parent().prev().children('.product-time-select').val();
    	
    	var run = 1;
    	var amount = 1;
    	var amountRun = jQuery(this).parent().children('#test_amount_run').val();
    	if(amountRun == 'amount'){
    		amount =jQuery(this).val();
    	}else if(amountRun == 'run'){
    		run =jQuery(this).val();
    	}
   
    	article_price_get(article_id, protype, amount, run);
    });   
 	//function change Run value at shopcart page
	jQuery('.drop-run-hide').click(function(){
		var tmp='<?php echo $'
		jQuery(this).parent().parent().children('.run-input-value').val(jQuery(this).children('input').val());
		jQuery('.cal-sum-value').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
    	jQuery(this).parent().parent().parent().children('.priceDiv').html("<span><img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'></span>");
		var article_id =jQuery(this).parent().parent().parent().children('.article_id').val();
		var protype=jQuery(this).parent().parent().prev().children('.product-time-select').val();
		var run = 1;
    	var amount = 1;
    	var amountRun = jQuery(this).parent().next().val();
    	if(amountRun == 'amount'){
    		amount = jQuery(this).children('input').val();
    	}else if(amountRun == 'run'){
    		run =jQuery(this).children('input').val();
    	}
   
    	article_price_get(article_id, protype, amount, run);
	});
	
	//function open drop RunAmount box
	jQuery('.drop-icon').click(function(){
		jQuery('.amount-select-discount').hide();
		jQuery(this).next('.amount-select-discount').show();
	})
	
	//function close drop RunAmout box
	//close Amount select box when click any where
	jQuery('#page').click(function(e) {
		if(e.target.className !== "drop-icon") {
			jQuery('.amount-select-discount').hide();
		}
	});
    
    //delete contain product on shopping cart 
    jQuery('.delAction').click(function(){        
	    if(confirm('Are you sure want to delete?')){
	    	//get article id
	    	var article_id = jQuery(this).parent().children('.article_id').val();
	    	
	    	//remove this article
	    	var article_class = '.cart_article_' + article_id;
	    	jQuery(article_class).remove();    	

	    	//save to session
	    	var dataString = "option=article_delete&article=" + article_id;
			jQuery.ajax({
				type: "GET",
				url: web_2_print_blogInfo + "inc/ajax/ajaxShopCart.php",
				data: dataString,
				success: function(data){
					//save to articles object
			    	for(var i in shop_articles){
				    	if(shop_articles[i].ArticleID == article_id){
				    		delete shop_articles[i];
							//check if prices_import_header exist
							if(typeof(prices_import_header) != "undefined"){
								delete prices_import_header[i];	
								count_prices_import_header--;
							}				    		
				    	}
				    }				    
				    
				    var shop_articles_count = 0;
				    for(var i in shop_articles){
				    	shop_articles_count++;
				    }
				    
					if(typeof(prices_import_header) != "undefined"){
						jQuery('#shopCart-'+article_id.charAt(article_id.length-1)).remove();
					}	
					
					//calculate cost again
					if(shop_articles_count != 0){
						finalSumCost();
						
						if(typeof(prices_import_header) != "undefined"){
							var totalLeftPrices = 0;
						
							jQuery('.shopCart-items').each(function(){
								totalLeftPrices += jQuery(this).children('.shopCart-items-prices-hidden-header').val() * 1;
							});
							
							jQuery('.shopCart-Cost').html(formatCurrency(totalLeftPrices, globalCurrency) + ' ' + globalCurrency);
							jQuery('.shopCart-endprice-total').html(formatCurrency(totalLeftPrices, globalCurrency) + ' ' + globalCurrency.toLowerCase());
							jQuery('.shopCart-icon').html(count_prices_import_header - 1);
						}
					}else{
						jQuery('.ship-form-content').empty();
						jQuery('.payment-form-content').empty();
						jQuery('#shipping-price').html('');
						jQuery('#payment-price').html('');
						jQuery('.cal-sum-value').html('');
						
						if(typeof(prices_import_header) != "undefined"){
							jQuery('.shopCart-Cost').html(formatCurrency(0, globalCurrency) + ' ' + globalCurrency);
							jQuery('.shopCart-endprice-total').html(formatCurrency(0, globalCurrency) + ' ' + globalCurrency.toLowerCase());
							jQuery('.shopCart-icon').html(count_prices_import_header - 1);
							jQuery('.shopCart-endprice-total-note').hide();
							jQuery('.shopCart-items-container').html('<div style="margin-top:5px;width:100%;text-align:center">'+jQuery('.transEmptyShopCart').val()+'</div>');
						}
					}					
				}				
			});
			
			
	    }
    });
    
    //shopcart image hover
    jQuery('.article-picture-li').hover(
    	function(){
    		jQuery(this).children('.img_div_tools').css({display: 'block'});

    	},
    	function(){
    		jQuery(this).children('.img_div_tools').css({display: 'none'});

    	}
    );
    
    jQuery('.img_div_tools').hover(
    	function(){
    		jQuery(this).css({display: 'block'});
    	},
    	function(){
    		jQuery(this).css({display: 'none'});
    	}
    );
    
    //event for thumb over the picture of shopping cart
    jQuery('.shoppingImgDiv').hover(
        function() { jQuery(this).children('.shoppingThumbDiv').css({ display: "block" }); },
        function() { jQuery(this).children('.shoppingThumbDiv').css({ display: "none" }); }
    );
        
    jQuery(".shoppingImgDiv").mousemove(function(e) {
        var mousex = e.pageX + 25;
        var mousey = e.pageY + 25;
        jQuery(this).children('.shoppingThumbDiv').css({ top: mousey, left: mousex });
    });
    
    //order - confirm - button
    jQuery('.order-confirm-button').click(function(){
    	if(jQuery('.payment-select').val() == "PayPal"){
    		if(jQuery('.address-selected').length == 0){
    			//ShowUserDialog
    			showMessageDialog(jQuery('#address_missing_inform').val(), false);
    			
    		}else if (jQuery('.ship-form-type-selected').length == 0){
    			//ShowUserDialog
    			showMessageDialog(jQuery('#shipping_missing_inform').val(), false);
    			
    		}else if (!jQuery('input[name=termin]').is(':checked')){
    			//ShowUserDialog
    			showMessageDialog(jQuery('#right_missing_inform').val(), false);

    		}else{
    			
    				//save to session
    		    	var dataString = "option=Info_Before_Checkout&shipping=" + jQuery('.shipping-select').val() + "&payment=" + jQuery('.payment-select').val() + "&shipping_cost=" + jQuery('.cal-shipping-input').val() + "&payment_cost=" + jQuery('.cal-payment-input').val();
    				jQuery.ajax({
    					type: "GET",
    					url: web_2_print_blogInfo + "inc/ajax/ajaxShopCart.php",
    					data: dataString,
    					success: function(data){
    						
    						var tax = Math.round(jQuery('.cal-payment-input').val()*100)/100;
    							//tax = (tax + "").split(".");
    							//tax = tax[0] + "," + tax[1];
    							
    						var ship = Math.round(jQuery('.cal-shipping-input').val()*100)/100;
    							//ship = (ship + "").split(".");
    							//ship = ship[0] + "," + ship[1];
    							
    						//set tax cost in frmVTPayment form
    						jQuery(".check-out-tax").val(tax);
    						//set shipping cost in frmVTPayment form
    						jQuery(".check-out-ship").val(ship);
    						//change payment method to PayPal
    						jQuery('#hidPaymentType').val(1);
    						//submit form to payment.api.delivergo.com
    					    jQuery('#frmVTPayment').submit();						
    					}				
    				});

    		}
    	}else{
    		apiOrderConfirm();
    	}    	
    	
    });
    
    /*button checkount*/
    //amazon
    jQuery('.payment-access-amazon').click(function(){
    	submit_payment_vt(5);
    });
    //paypal
    jQuery('.payment-access-paypal').click(function(){
    	//submit_payment_vt(2);
    });    
}

/*function for activation page event*/
function ready_activation_event(){
	/*-------------Activation--------------------------------*/	

	jQuery('#activation-email').change(function(){
		if(jQuery('#activation-email').val() != ""){
			var flag = validateUser(jQuery(this).val());
			if(flag != false){
				jQuery('#errorLogin').removeClass('error');
				jQuery(this).removeClass('error');
				jQuery('#errorLogin').html('Email is valid');
				jQuery('#errorLogin').addClass('success');
				jQuery(this).addClass('success');
			}else{
				jQuery('#errorLogin').removeClass('success');
				jQuery(this).removeClass('success');
				jQuery('#errorLogin').html('Email is not valid');
				jQuery('#errorLogin').addClass('error');
				jQuery(this).addClass('error');
			}
		}		
	});
	
	jQuery('#captcha').blur(function(){
		if(jQuery(this).val() != ""){
			var captchaCode = jQuery(this).val();		
			if(captchaCode == dgoCaptchaCode){
				jQuery('#errorAuthentication').html('Authentication code is valid');
				jQuery('#errorAuthentication').removeClass('error');
				jQuery('#captcha').removeClass('error');
				jQuery('#errorAuthentication').addClass('success');
				jQuery('#captcha').addClass('success');
			}else{
				jQuery('#errorAuthentication').html('Authentication code is not valid');
				jQuery('#errorAuthentication').removeClass('success');
				jQuery('#captcha').removeClass('success');
				jQuery('#errorAuthentication').addClass('error');
				jQuery('#captcha').addClass('error');
			}
		}
	});
	
	jQuery('.activation-account-content-button').click(function(){
		var Email 		= jQuery('#activation-email').val();
		
		//GuidActive & ActiveCode are declared on activationaccountpage.js.tpl
		if(GuidActive != ""){
			if(Email != "" && ActiveCode != ""){
				//show annouce for customer
	    		ShowUserDialog('Activation', 'dgo-user-process', 'Please wait a moment...', 'Ok');
	    		
	    		contacting_CheckActivation(Email, ActiveCode, GuidActive);
			}
		}else if(Email != "" && ActiveCode != ""){
				//show annouce for customer
	    		ShowUserDialog('Activation', 'dgo-user-process', 'Please wait a moment...', 'Ok');
	    		
	    		contacting_CheckActivation(Email, ActiveCode, null);
		}
	});
}

//function for earn money page
function ready_earnMoney_event(){	

	jQuery( ".addnewaddressForm" ).dialog({
        title: jQuery('.addnewaddressForm .translate-title').val() + '<div class="ex-close-button"></div>',
        autoOpen: false,                            
        width: 450,
        dialogClass: "dgo-dialog-class dgo-add-address-form",
        modal: true, 
        zIndex: 5001,
        resizable: false,
        position: 'center'
    });
	
	//event on calendar input in earn money page
	//jQuery( "#earn-money-date-to" ).datepicker({ dateFormat: 'dd.mm.yy',selectOtherMonths: true,changeMonth: true, changeYear: true, maxDate: 'm' });
	//jQuery( "#earn-money-date-from" ).datepicker({ dateFormat: 'dd.mm.yy',selectOtherMonths: true,changeMonth: true, changeYear: true,  maxDate: 'm' });
	jQuery( "#dialog-earn-money-date-to" ).datepicker({ dateFormat: 'dd.mm.yy',selectOtherMonths: true,changeMonth: true, changeYear: true, maxDate: 'm' });
	jQuery( "#dialog-earn-money-date-from" ).datepicker({ dateFormat: 'dd.mm.yy',selectOtherMonths: true,changeMonth: true, changeYear: true,  maxDate: 'm' });	
	
	jQuery('.ui-daterangepicker-arrows').hide();	

	jQuery(function(){
		if(dgoGuid == ''){
			//window.location = homeUrl;
			jQuery( ".loginForm" ).dialog('open');	
			jQuery( ".loginForm" ).dialog({ position: 'center' });
		}
	});
	
	jQuery.jqplot.config.enablePlugins = true;
	
	if(window.location.hash != "#earn-money-tabs-3"){
		jQuery.jqplot('earn-money-statistic-chart', [], {  
			gridPadding: {top:6, right:5, bottom:2, left:6},
			seriesDefaults: {
			  yaxis: 'y2axis'
			},
			noDataIndicator: {
				show: true,
				indicator: '<img src="' + web_2_print_blogInfo + 'css/img/icon/loading.gif" /><br>Loading...',  			
				axes: {
					xaxis: {
						min: 0,
						max: 7,
						tickInterval: 1,
						  showTicks: false
					},
					yaxis: {
						min: 0,
						tickInterval: 2,
						  showTicks: false
					}
				}				
			},
			grid: {
				drawGridLines: true,             
				borderColor: '#EFEFEF',     
				borderWidth: 1,          
				shadow: false                                
			}
		   
		});
	}

	//event for shop selectbox
	jQuery('#earn-money-select-shop').change(function(){
		refreshChart('changeShop');
	});

	//event for button "refresh"
	jQuery('.earn-money-refresh-button').click(function(){
	
		if(jQuery('#earn-money-calendar').val() != "" && jQuery('#earn-money-calendar').val() != undefined){
			var periodDate 	= jQuery('#earn-money-calendar').val();
				periodDate 	= periodDate.split("-");
			var fromDate 	= periodDate[0].trim();
			var toDate 		= periodDate[1].trim();
			var limitDay 	= ((new Date(toDate.split(".")[2]+"/"+toDate.split(".")[1]+"/"+toDate.split(".")[0])) - (new Date(fromDate.split(".")[2]+"/"+fromDate.split(".")[1]+"/"+fromDate.split(".")[0])))/86400000;
			
			if(limitDay < 0){
				jQuery('#earn-money-calendar').val("");
				jQuery( "#earn-money-calendar" ).focus();
			}else{
				refreshChart("changeTimeviaInput");
			}
		}else{			
			refreshChart("changeTimeviaDropdown");
		}
	});
	
	//event for button "refresh"
	jQuery('.dialog-statistic-button-refesh').click(function(){		
		if(jQuery('#dialog-earn-money-calendar').val() != "" && jQuery('#dialog-earn-money-calendar').val() != undefined){
			var periodDate 	= jQuery('#dialog-earn-money-calendar').val();
				periodDate 	= periodDate.split("-");
			var fromDate 	= periodDate[0].trim();
			var toDate 		= periodDate[1].trim();
			var limitDay 	= ((new Date(toDate.split(".")[2]+"/"+toDate.split(".")[1]+"/"+toDate.split(".")[0])) - (new Date(fromDate.split(".")[2]+"/"+fromDate.split(".")[1]+"/"+fromDate.split(".")[0])))/86400000;
			
			if(limitDay < 0){
				jQuery('#dialog-earn-money-calendar').val("");
				jQuery( "#dialog-earn-money-calendar" ).focus();
			}else{
				refreshLargeChart("changeTimeviaInput");
			}
		}else{			
			refreshLargeChart("changeTimeviaDropdown");
		}
	});
	
	jQuery('.dialog-statistic-button-close').click(function(){
		jQuery( ".large-chart-statistic" ).dialog('close');
	});
	
	jQuery('#earn-money-tab-3-select-period').change(function(){
		if(jQuery(this).val() == "flexible"){
			jQuery('.earn-money-calendar-area').html("<input id='earn-money-calendar' type='text'>");
			if(jQuery('.earn-money-calendar-area').children('.ui-daterangepicker-arrows').length == 0){
				jQuery('#earn-money-calendar').daterangepicker({
					arrows:true,
					dateFormat: "dd.mm.yy"				
				});
				
				jQuery('.ui-daterangepickercontain').css({"z-index":"5004"});
			}						
			
			jQuery('.earn-money-calendar-area').children('.ui-daterangepicker-arrows').show();
		}else{
			jQuery('#earn-money-calendar').val("");
			jQuery('.earn-money-calendar-area').children('.ui-daterangepicker-arrows').hide();
		}
	});
	
	jQuery('#dialog-earn-money-tab-3-select-period').change(function(){
		if(jQuery(this).val() == "flexible"){
			jQuery('.dialog-earn-money-calendar-area').html("<input id='dialog-earn-money-calendar' type='text'>");
			
			if(jQuery('.dialog-earn-money-calendar-area').children('.ui-daterangepicker-arrows').length == 0){
				jQuery('#dialog-earn-money-calendar').daterangepicker({
					arrows:true,
					dateFormat: "dd.mm.yy"				
				});
				
				jQuery('.ui-daterangepickercontain').css({"z-index":"5004"});
			}

			jQuery('.dialog-earn-money-calendar-area').children('.ui-daterangepicker-arrows').show();
		}else{
			jQuery('#dialog-earn-money-calendar').val("");
			jQuery('.dialog-earn-money-calendar-area').children('.ui-daterangepicker-arrows').hide();
		}
	});
	
	// Shop configure form
    jQuery( ".large-chart-statistic" ).dialog({
        title: "Statistic Chart"  + '<div class="ex-close-button"></div>',
        autoOpen: false,                            
        width: 1000,
        closeOnEscape: false,
        dialogClass: "dgo-dialog-class dgo-provision-form-affiliate",
        modal: true,  
        zIndex: 5001,
        resizable: false,
        position: 'center'
    }); 
	
    // Shop configure form
    jQuery( ".provisionForm" ).dialog({
        title: "Provisions Configure"  + '<div class="ex-close-button"></div>',
        autoOpen: false,                            
        height: 768,
        width: 1024,
        closeOnEscape: false,
        dialogClass: "dgo-dialog-class dgo-provision-form-affiliate",
        modal: true,  
        zIndex: 5001,
        resizable: false,
        position: 'center'
    }); 

    //add button event 
    jQuery('.add-resales-unit-form-button').click(function(){
    	var shopname 		= jQuery('#shopname').val();
    	var shopdescription = jQuery('#shopdescription').val();
    	if(shopname != "" && shopdescription != ""){
    		//close dialog add new shop
    		jQuery( "#earn-money-add-resales-unit-form" ).dialog('close');
    		
    		jQuery.blockUI();
    		
    		var newShop = [{
							   "Active":true,
							   "CurrencyToken": globalCurrency,							   
							   "ResaleUnitSetting": [
							   	  {
							   		"Key": "Login.Uri",
							   		"Type": "System.String",
							   		"Value": homeUrl
							   	  },
							   	  {
							   		"Key": "Login.PasswordChanged.Uri",
							   		"Type": "System.String",
							   		"Value": homeUrl + '/account-details#change_password'
							   	  },
							   	  {
							   		"Key": "Calculation.EndUserPriceFormat",
							   		"Type": "System.String",
							   		"Value": "Net"
								  }
							   ],
							   "ResaleUnitTranslation":[
							      {
							         "Description": shopdescription,
							         "LanguageToken": globalLanguage,
							         "Name": shopname
							      }
							   ]
						 }];
			if(dgoAllDiscounts == null){								
				upgradeToAffiliate(dgoContacting,newShop);	
			}else{				
				affiliate_AddResaleUnit(newShop,'none-upgrade');
			}
    	}else{
    		ShowUserDialog(jQuery('#trans-create-a-new-shop').val(), 'dgo-user-warning', 'Shop name and description are required!', 'Ok');
    	}
    });
    
    
    // create new shop dialog
    jQuery( "#earn-money-add-resales-unit-form" ).dialog({
        title: jQuery('#trans-create-a-new-shop').val() + '<div class="ex-close-button"></div>',
        autoOpen: false,                            
        width: 450,
        closeOnEscape: false,
        dialogClass: "dgo-dialog-class dgo-create-new-shop",
        modal: true, 
        zIndex: 5001,
        resizable: false,
        position: 'center'
    });                  
    
    
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
                   
	            var provisionAmount = articleGroupArr[dgoCurrencyForShop][1] + articleGroupArr[dgoCurrencyForShop][2] * ui.value;
	            jQuery('.provision-amount-hidden').val(provisionAmount);
	            jQuery('.provision-amount').html(formatCurrency(provisionAmount, dgoCurrencyForShop));
	            
	            //jQuery('.price-widget').html(formatCurrency(articleGroupArr[dgoCurrencyForShop][0] + provisionAmount + parseFloat(jQuery('.provision-percent-hidden').val())*articleGroupArr[dgoCurrencyForShop][0]/100, dgoCurrencyForShop));
	            jQuery('.your-profit').html(formatCurrency(provisionAmount + parseFloat(jQuery('.provision-percent-hidden').val())*articleGroupArr[dgoCurrencyForShop][0]/100, dgoCurrencyForShop));
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
	            jQuery('.provision-calculate-percent .provision-price-element').html(formatCurrency(xValue*articleGroupArr[dgoCurrencyForShop][0]/100, dgoCurrencyForShop));
	            
	            //jQuery('.price-widget').html(formatCurrency(articleGroupArr[dgoCurrencyForShop][0] + parseFloat(jQuery('.provision-amount-hidden').val()) + xValue * articleGroupArr[dgoCurrencyForShop][0]/100, dgoCurrencyForShop));
	            jQuery('.your-profit').html(formatCurrency(parseFloat(jQuery('.provision-amount-hidden').val()) + xValue*articleGroupArr[dgoCurrencyForShop][0]/100, dgoCurrencyForShop));
	            
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
    		currentShop = jQuery(this).val();
    		
    		//change product groups
    		provisionShopChange( currentShop );
    	}
    });
    
    //currency change
    jQuery('.maintain-title-right .currency-select').change(
        function(){
        	//block ui
        	jQuery.blockUI(0);
        	
            adminCurChange(jQuery(this).val());
            
            for(x in globalResaleUnit){
        		if(globalResaleUnit[x].Id == currentShop){
        			globalResaleUnit[x].CurrencyToken = jQuery(this).val();
        			affiliate_updateResaleUnit();
        		}
            }
        }
    );
    
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
            		if(dgoAllDiscounts != null){
            			for(var j = 0;j < dgoAllDiscounts.length;j++){
                			if(dgoAllDiscounts[j].IdArticleGroup == idGroup){
                				//add discount profit
                				articleProfitAdd(dgoAllDiscounts[j].Id, shopDiscount[i].shopID, jQuery('.provision-amount-hidden').val(), jQuery('.provision-percent-hidden').val());            				
                				break;
                			}else if(j == dgoAllDiscounts.length-1){            				
                				//add discount for this product
                    			AddDiscountEntries(shopDiscount[i].shopID, idGroup, jQuery('.provision-amount-hidden').val(), jQuery('.provision-percent-hidden').val());
                			}
                		}  
            		}else{
            			AddDiscountEntries(shopDiscount[i].shopID, idGroup, jQuery('.provision-amount-hidden').val(), jQuery('.provision-percent-hidden').val());
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
            jQuery('.grid-content-row-selected .grid-provision-currency').html(dgoCurrencyForShop);
            	
            //update to api        
	        articleProfitUpdate(articleProfit[idGroup], articleProfit[idGroup]['active']);
	        
    	}
    	
    });
    
  //add or edit address in shopCart
  jQuery("#BtnDone").click(function(){
		var flag	  = true;
		
		if(jQuery('#forename').val() == ""){			
			jQuery('.address-name-first').addClass('address-input-check');
			jQuery('.address-name-first .address-check').addClass('check-img-false');
			flag = false;
		}else{
			jQuery('.address-name-first').removeClass('address-input-check');
			jQuery('.address-name-first .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#surname').val() == ""){			
			jQuery('.address-name-last').addClass('address-input-check');
			jQuery('.address-name-last .address-check').addClass('check-img-false');
			flag = false;
		}else{
			jQuery('.address-name-last').removeClass('address-input-check');
			jQuery('.address-name-last .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#street').val() == ""){			
			jQuery('.address-name-street').addClass('address-input-check');
			jQuery('.address-name-street .address-check').addClass('check-img-false');		
			flag = false;
		}else{
			jQuery('.address-name-street').removeClass('address-input-check');
			jQuery('.address-name-street .address-check').removeClass('check-img-false');	
		}
		
		
		if(jQuery('#zipcode').val() == ""){			
			jQuery('.address-name-zip').addClass('address-input-check');
			jQuery('.address-name-zip .address-check').addClass('check-img-false');			
			flag = false
		}else{
			jQuery('.address-name-zip').removeClass('address-input-check');
			jQuery('.address-name-zip .address-check').removeClass('check-img-false');	
		}
		
		if(jQuery('#city').val() == ""){
			jQuery('.address-name-city').addClass('address-input-check');
			jQuery('.address-name-city .address-check').addClass('check-img-false');				
			flag = false;
		}else{
			jQuery('.address-name-city').removeClass('address-input-check');
			jQuery('.address-name-city .address-check').removeClass('check-img-false');	
		}
		
		if(jQuery('#email').val() == ""){
			jQuery('.address-name-email').addClass('address-input-check');
			jQuery('.address-name-email .address-check').addClass('check-img-false');			
			flag = false;
		}else {
			jQuery('.address-name-email').removeClass('address-input-check');
			jQuery('.address-name-email .address-check').removeClass('check-img-false');	
			
			if(validateUser(jQuery('#email').val()) == false){			
				jQuery('.address-name-email').addClass('address-input-check');
				jQuery('.address-name-email .address-check').addClass('check-img-false');				
				flag = false;
			}
		}
		
		
		if(jQuery('#phone').val()!=""){						
			if(validatePhone(jQuery('#phone').val()) == false){
				jQuery('.address-name-phone').addClass('address-input-check');
				jQuery('.address-name-phone .address-check').addClass('check-img-false');				
				flag = false;
			}else{
				jQuery('.address-name-phone').removeClass('address-input-check');
				jQuery('.address-name-phone .address-check').removeClass('check-img-false');
			}
		}else{
			jQuery('.address-name-phone').removeClass('address-input-check');
			jQuery('.address-name-phone .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#addressNote').val() != ""){
			if(jQuery('#addressNote').val().length > 30){
				var message = '';
				message += '<div class="errorMessage-container">';
			    message += '<div class="errorMessage-label">'+jQuery('#popup-trans-note').val()+':</div><div class="errorMessage-text">'+jQuery('#popup-trans-invalid-note').val()+'</div>';
			    message += '</div>';
				jQuery('.address-note-content-message').html(message);
				jQuery('.add-info-note-message').show();
				jQuery('.textarea-div').addClass('address-input-check');
				
				flag = false;
			}else{
				jQuery('.address-note-content-message').html('');
				jQuery('.add-info-note-message').hide();
				jQuery('.textarea-div').removeClass('address-input-check');
			}	
		}else{
			jQuery('.address-note-content-message').html('');
			jQuery('.add-info-note-message').hide();
			jQuery('.textarea-div').removeClass('address-input-check');
		}
				
		if(flag == true){
			dgoContacting.ContactingAddress[0].Address.SalutationToken 				= jQuery('.sexual:selected').attr('value');
			dgoContacting.ContactingAddress[0].Address.Surname 						= jQuery('#surname').val();
			dgoContacting.ContactingAddress[0].Address.Forename 					= jQuery('#forename').val();
			dgoContacting.ContactingAddress[0].Address.Company 						= jQuery('#company').val();
			dgoContacting.ContactingAddress[0].Address.Street 						= jQuery('#street').val();
			dgoContacting.ContactingAddress[0].Address.City 						= jQuery('#city').val();
			dgoContacting.ContactingAddress[0].Address.ZipCode 						= jQuery('#zipcode').val();
			dgoContacting.ContactingAddress[0].Address.Telecommunication[0].Number 	= jQuery('#phone').val();
			dgoContacting.ContactingAddress[0].Address.Email[0].Text				= jQuery('#email').val();
			dgoContacting.ContactingAddress[0].Address.CountryToken 				= jQuery('.add-info-country-dropdown-selected').val();
			dgoContacting.ContactingAddress[0].Address.ObjectNote.Text 				= jQuery('#addressNote').val();
			delete dgoContacting.ResaleUnit;
			delete dgoContacting.CurrencyToken;
			delete dgoContacting.Discount;
			delete dgoContacting.DisplayLocale;
			delete dgoContacting.Handle;
			delete dgoContacting.IdDiscount;
			delete dgoContacting.LanguageToken;
			delete dgoContacting.MessagingFlags;
			delete dgoContacting.UserImageType;
			jQuery.blockUI(0);
			contacting_Update();//function in contacting_request_function.js				
			jQuery('.addnewaddressForm').dialog('close');	
		}
	});
    
}

//function for earn money page
function ready_productDetails_event(){	
	jQuery('.edit-link').hide();
	
	jQuery('.pro-details-dropdown-button').click(function(){
		jQuery('.pro-details-dropdown-block').css('border-color','orange');
		jQuery('#runs-dropdown').show();
	});
	
	jQuery('.prod-details-currency-dropdown').change(function(){		
		var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
		jQuery('.price-start-value').html(imgLoading);	
		dgoCurrencies = jQuery(this).val();	
		getPrices('currencyChange');	
	});
	
	jQuery('.prod-details-currency-dropdown').hover(function(){		
			jQuery(this).css('border-color','orange');
		},
		function(){
			jQuery(this).css('border-color','#CCC');
		}
	);
	
	jQuery('.pro-details-dropdown-block').hover(function(){		
			jQuery(this).css('border-color','orange');
		},
		function(){
			jQuery(this).css('border-color','#CCC');
		}
	);
	
	jQuery('body').click(function(e){
		var target = e.target;
		if(target.id != 'pro-details-dropdown-button' && target.id != "size-dropdown-main-id" && target.id != "size-dropdown-main-name" && target.id != "article-group-dropdown-img" && target.id != "article-group-dropdown-label" && target.id != "article-group-dropdown-arrow" && target.id != "subtypes-dropdown-img" && target.id != "subtypes-dropdown-label" && target.id != "subtypes-dropdown-arrow"){
			jQuery('#runs-dropdown').fadeOut(1);
			jQuery('.size-dropdown-content').fadeOut(1);			
			jQuery('.article-group-dropdown-content').fadeOut(1);			
			jQuery('.subtypes-dropdown-content').fadeOut(1);
			jQuery('.article-group-dropdown-display').css('border-color','#CCC');
			jQuery('.subtypes-dropdown-display').css('border-color','#CCC');
			jQuery('.pro-details-dropdown-block').css('border-color','#CCC');					
		}
	});
	
	jQuery('.add-more-emails').click(function(){
		if(jQuery('.more-email-container').children().length < 9){
			var number = (parseInt(jQuery('.more-email-container').children().length) + 1);
			var html = '<div class="emailForm-element-container"><div class="emailForm-element-left">';
				html += '<div class="emailForm-element-label">Name des Empfängers:</div>';
				html += '<div class="emailForm-element-input"><input class="emailForm-name" type="text" name="name-'+ number +'" ><div class="emailForm-email-error"></div></div></div>';
				html += '<div class="emailForm-element-right">';
				html += '<div class="emailForm-element-label">E-Mail Adresse:</div>';
				html += '<div class="emailForm-element-input"><input class="emailForm-email"  id="emailForm-email-'+ number +'" type="text" name="email-'+ number +'" ><div class="emailForm-email-error"></div></div></div></div>';
				html += '<div class="emailForm-element-container"><div class="emailForm-element-left"><div class="emailForm-element-label"></div></div>';
				html += '<div class="emailForm-element-right"><div class="emailForm-element-label remove-form" style="text-align:right;cursor:pointer;width:50px;float:right">Löschen<input type="hidden" value="'+number+'" class="form-number"></div></div>';
				html += '</div>';			
			jQuery('.more-email-container').append(html);
			
			jQuery('.remove-form').click(function(){
				var number = jQuery(this).children('.form-number').val();
				jQuery('#emailForm-email-'+number).parent('.emailForm-element-input').parent('.emailForm-element-right').parent('.emailForm-element-container').remove();
				jQuery(this).parent('.emailForm-element-right').parent('.emailForm-element-container').remove();
			});
			
			jQuery('.emailForm-name').blur(function(){
				if(jQuery(this).val() == ""){
					jQuery(this).parent().children('.emailForm-email-error').attr('class','emailForm-email-error error-case');
				}else{
					jQuery(this).parent().children('.emailForm-email-error').attr('class','emailForm-email-error success-case');
				}

		    });
			
		    jQuery('.emailForm-email').blur(function(){
				if(validateUser(jQuery(this).val()) == false){
					jQuery(this).parent().children('.emailForm-email-error').attr('class','emailForm-email-error error-case');
				}else{
					var number = parseInt(jQuery(this).attr('id').split("-")[1]);
					var typeEmail = jQuery(this).val();
					
					jQuery('.more-email-container').children('.emailForm-element-container').each(function(){
						var currentEmail  = jQuery(this).children('.emailForm-element-right').children('.emailForm-element-input').children('.emailForm-email').val();
						var currentNumber = jQuery(this).children('.emailForm-element-right').children('.emailForm-element-input').children('.emailForm-email').attr('id').split("-")[1];
						if(currentEmail != undefined || currentEmail != ""){
							if(number != currentNumber){
								if(currentEmail == typeEmail){
									thisEmail.parent().children('.emailForm-email-error').attr('class','emailForm-email-error error-case');
									jQuery(this).children('.emailForm-element-right').children('.emailForm-email-error').attr('class','emailForm-email-error error-case');
								}else{
									thisEmail.parent().children('.emailForm-email-error').attr('class','emailForm-email-error error-case');
									jQuery(this).children('.emailForm-element-right').children('.emailForm-email-error').attr('class','emailForm-email-error error-case');
								}
							}
						}				
					});
				}			
		    });
		}		
	})
}

//function for earn money page
function ready_motiveDesigns_event(){	
	
	jQuery('.all-design-pro-cat-title').click(function(){
		jQuery('.design-tab-type').removeClass('tab-selected');
		jQuery('.article-cat').removeClass('article-selected');
		jQuery('.design-tab-type-product').addClass('tab-selected');		
		jQuery('#design-type-select').val(jQuery('.tab-selected').attr('title'));
		
		//clear dynamic link in url
		window.location.hash = "#product";
		
		var url = jQuery('#design-detail-url').val();
		
		var html = '';
		
		jQuery('.all-design-rightside-content').empty();
		
		var count = 0;

		if(dgoLatestDesigns != null){
			var MotiveProductDesignArr = toMotiveProductDesignArr(dgoLatestDesigns);
			
			jQuery.each(dgoLatestDesigns, function(i, v){
				if(v.Type.split("_")[1] == "product"){
					var	designName = v.Type.split(":")[1];
					
					if(v.ThumbnailTranslation != undefined){
						for(var j = 0;j < v.ThumbnailTranslation.length;j++){
							if(v.ThumbnailTranslation[j].LanguageToken == globalLanguage){
								designName = v.ThumbnailTranslation[j].Name;
							}
						}
					}	
						
    				jQuery('.all-design-rightside-content').append('<div class="all-design-rightside-block"><a href="'+url+'_'+makeFriendlyUrl(designName)+'_'+v.IdArticle+'_'+v.Id+'"><div class="all-design-rightside-block-pic"><img class="thumb-product-'+i+'" src="" ><img class="thumb-design-'+i+'" src="" style="display:none"></div><div class="all-design-rightside-block-title">'+designName+'</div></a></div>');
    				count++;
    				dgoDesignsAfterFilter.push(v);
    			}
    		});
    		
    		if(count == 0){
    			jQuery('.all-design-rightside-content').html('UPDATE coming soon.');
    		}else{
    			jQuery.each(dgoLatestDesigns, function(i, v){
					if(v.Type.split("_")[1] == "product"){
						var guidDesgin = v.Type.split("_")[2];
							guidDesgin = guidDesgin.split(":")[0];
							
        				var img_class = '.thumb-design-' + i;
        				jQuery(img_class).hide();

        				jQuery(img_class).load(function(){
        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
        					
    						jQuery(this).width(size[0]);
    					
    						jQuery(this).height(size[1]);
        					
        					jQuery(this).show();
        					
        				})
        				
        				.error(function(){}).attr('src', v.ThumbnailUri);
        				
        				for(var k = 0;k < MotiveProductDesignArr[guidDesgin].length;k++){
    						if(MotiveProductDesignArr[guidDesgin][k].Type.split("_")[1] == "main"){
    							
    							var img_class = '.thumb-product-' + i;
    	        				jQuery(img_class).hide();
    	
    	        				jQuery(img_class).load(function(){
    	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
    	        					
    	    						jQuery(this).width(size[0]);
    	    					
    	    						jQuery(this).height(size[1]);
    	        				})
    	        				
    	        				.error(function(){}).attr('src', MotiveProductDesignArr[guidDesgin][k].ThumbnailUri);
    	        				
    	        				break;
    						}else if(k == MotiveProductDesignArr[guidDesgin].length - 1){
    							var img_class = '.thumb-product-' + i;
    	        				jQuery(img_class).hide();
    	
    	        				jQuery(img_class).load(function(){
    	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
    	        					
    	    						jQuery(this).width(size[0]);
    	    					
    	    						jQuery(this).height(size[1]);
    	        					
    	        				})
    	        				
    	        				.error(function(){}).attr('src', v.ThumbnailUri);
    						}
    					}

        			}
    				
        		});
    		}
    		
    		jQuery('.all-design-rightside-block-pic').hover(function(){
    			jQuery(this).children('img:nth-child(2)').hide();
    			jQuery(this).children('img:nth-child(1)').show();
    		},function(){
    			jQuery(this).children('img:nth-child(1)').hide();
    			jQuery(this).children('img:nth-child(2)').show();
    		});
		}else{
			getLatestDesigns(50, 1);
		}
	});
	
	jQuery('.design-tab-type').click(function(){
		jQuery('.design-tab-type').removeClass('tab-selected');
		jQuery(this).addClass('tab-selected');
		
		jQuery('#design-type-select').val(jQuery(this).attr('title'));
		
		var html = '';
		jQuery('.all-design-rightside-content').empty();
		var count = 0;
		var designType = dgoDesignType = jQuery('#design-type-select').val();
		var url = jQuery('#design-detail-url').val();
		var guidArticle = jQuery('.article-selected .article-id-hidden').val();
		
		var index = jQuery('.article-selected .article-index-hidden').val();
		
		
		
		if(index != undefined){
			var MotiveProductDesignArr = toMotiveProductDesignArr(dgoDesigns);
			
			var ArticleName = makeFriendlyUrl(dgoAvailableArticles[index].Name.toLowerCase());			
			
			dgoArticleId = jQuery('.article-selected .article-id-hidden').val();
			
			var Hashurl 	= ArticleName + '_' + dgoArticleId;
				Hashurl 	+= '_' + dgoDesignType;
				
			window.location.hash = Hashurl;
			
			if(dgoDesigns != null){
				jQuery.each(dgoDesigns, function(i, v){
					if(designType == 'motiv'){
	    				if(v.Type.split("_")[1] == 'main'){
	    					var	designName = '';
	    					
	    					if(v.ThumbnailTranslation != undefined){
	    						for(var j = 0;j < v.ThumbnailTranslation.length;j++){
	    							if(v.ThumbnailTranslation[j].LanguageToken == globalLanguage){
	    								designName = v.ThumbnailTranslation[j].Name;
	    							}
	    						}
	    					}	
	    						
	        				jQuery('.all-design-rightside-content').append('<div class="all-design-rightside-block"><a href="'+url+'_'+makeFriendlyUrl(designName)+'_'+guidArticle+'_'+v.Id+'"><div class="all-design-rightside-block-pic"><img class="thumb-product-'+i+'" src=""><img class="thumb-design-'+i+'" src="" style="display:none"></div><div class="all-design-rightside-block-title">'+designName+'</div></a></div>');
	        				count++;
	        				dgoDesignsAfterFilter.push(v);
	        			}
	    			}else{
	    				if(v.Type.split("_")[1] == "product"){
							var	designName = '';
	    					
							if(v.ThumbnailTranslation != undefined){
								for(var j = 0;j < v.ThumbnailTranslation.length;j++){
									if(v.ThumbnailTranslation[j].LanguageToken == globalLanguage){
										designName = v.ThumbnailTranslation[j].Name;
									}
								}
							}	
								
	        				jQuery('.all-design-rightside-content').append('<div class="all-design-rightside-block"><a href="'+url+'_'+makeFriendlyUrl(designName)+'_'+guidArticle+'_'+v.Id+'"><div class="all-design-rightside-block-pic"><img class="thumb-product-'+i+'" src="" ><img class="thumb-design-'+i+'" src="" style="display:none"></div><div class="all-design-rightside-block-title">'+designName+'</div></a></div>');
	        				count++;
	        				dgoDesignsAfterFilter.push(v);
	        			}
	    			}
	    			
	    		});
	    		
	    		if(count == 0){
	    			jQuery('.all-design-rightside-content').html('UPDATE coming soon.');
	    		}else{
	    			jQuery.each(dgoDesigns, function(i, v){
	    				if(designType == 'motiv'){
		        			if(v.Type.split("_")[1] == 'main'){
		        				var guidDesgin = v.Type.split("_")[2];
									guidDesgin = guidDesgin.split(":")[0];
									
		        				var img_class = '.thumb-design-' + i;
		        				jQuery(img_class).hide();
		
		        				jQuery(img_class).load(function(){
		        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
		        					
		    						jQuery(this).width(size[0]);
		    					
		    						jQuery(this).height(size[1]);
		        					
		        					jQuery(this).show();
		        					
		        				})
		        				
		        				.error(function(){}).attr('src', v.ThumbnailUri);
		        				          					
	        					for(var k = 0;k < MotiveProductDesignArr[guidDesgin].length;k++){
	        						if(MotiveProductDesignArr[guidDesgin][k].Type.split("_")[1] == "product"){
	        							
	        							var img_class = '.thumb-product-' + i;
	        	        				jQuery(img_class).hide();
	        	
	        	        				jQuery(img_class).load(function(){
	        	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
	        	        					
	        	    						jQuery(this).width(size[0]);
	        	    					
	        	    						jQuery(this).height(size[1]);
	        	    						
	        	    						//jQuery(this).show();

	        	        				})
	        	        				
	        	        				.error(function(){}).attr('src', MotiveProductDesignArr[guidDesgin][k].ThumbnailUri);
	        	        				
	        	        				break;
	        						}else if(k == MotiveProductDesignArr[guidDesgin].length - 1){
	        							var img_class = '.thumb-product-' + i;
	        	        				jQuery(img_class).hide();
	        	
	        	        				jQuery(img_class).load(function(){
	        	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
	        	        					
	        	    						jQuery(this).width(size[0]);
	        	    					
	        	    						jQuery(this).height(size[1]);
	        	    						
	        	    						//jQuery(this).show();
	        	        				})
	        	        				
	        	        				.error(function(){}).attr('src', v.ThumbnailUri);
	        						}
	        					}
		
		        			}
	    				}else{
	    					if(v.Type.split("_")[1] == "product"){
	    						var guidDesgin = v.Type.split("_")[2];
									guidDesgin = guidDesgin.split(":")[0];
									
		        				var img_class = '.thumb-design-' + i;
		        				jQuery(img_class).hide();
		
		        				jQuery(img_class).load(function(){
		        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
		        					
		    						jQuery(this).width(size[0]);
		    					
		    						jQuery(this).height(size[1]);
		        					
		        					jQuery(this).show();
		        					
		        				})
		        				
		        				.error(function(){}).attr('src', v.ThumbnailUri);
		        				
		        				for(var k = 0;k < MotiveProductDesignArr[guidDesgin].length;k++){
	        						if(MotiveProductDesignArr[guidDesgin][k].Type.split("_")[1] == "main"){
	        							
	        							var img_class = '.thumb-product-' + i;
	        	        				jQuery(img_class).hide();
	        	
	        	        				jQuery(img_class).load(function(){
	        	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
	        	        					
	        	    						jQuery(this).width(size[0]);
	        	    					
	        	    						jQuery(this).height(size[1]);
	        	    						
	        	    						//jQuery(this).show();
	        	        				})
	        	        				
	        	        				.error(function(){}).attr('src', MotiveProductDesignArr[guidDesgin][k].ThumbnailUri);
	        	        				
	        	        				break;
	        						}else if(k == MotiveProductDesignArr[guidDesgin].length - 1){
	        							var img_class = '.thumb-product-' + i;
	        	        				jQuery(img_class).hide();
	        	
	        	        				jQuery(img_class).load(function(){
	        	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
	        	        					
	        	    						jQuery(this).width(size[0]);
	        	    					
	        	    						jQuery(this).height(size[1]);
	        	    						
	        	    						//jQuery(this).show();
	        	        					
	        	        				})
	        	        				
	        	        				.error(function(){}).attr('src', v.ThumbnailUri);
	        						}
	        					}
		
		        			}
	    				}
	        		});

	    		}
			}
		}else{
			var MotiveProductDesignArr = toMotiveProductDesignArr(dgoLatestDesigns);
			
			jQuery.each(dgoLatestDesigns, function(i, v){
				if(designType == 'motiv'){
					if(v.Type.split("_")[1] == 'main'){
						var	designName = v.Type.split(":")[1];
						
						if(v.ThumbnailTranslation != undefined){
							for(var j = 0;j < v.ThumbnailTranslation.length;j++){
								if(v.ThumbnailTranslation[j].LanguageToken == globalLanguage){
									designName = v.ThumbnailTranslation[j].Name;
								}
							}
						}
							
	    				jQuery('.all-design-rightside-content').append('<div class="all-design-rightside-block"><a href="'+url+'_'+makeFriendlyUrl(designName)+'_'+v.IdArticle+'_'+v.Id+'"><div class="all-design-rightside-block-pic"><img class="thumb-product-'+i+'" src=""><img class="thumb-design-'+i+'" src="" style="display:none"></div><div class="all-design-rightside-block-title">'+designName+'</div></a></div>');
	    				count++;
	    				dgoDesignsAfterFilter.push(v);
	    			}
				}else{
					if(v.Type.split("_")[1] == "product"){
						var	designName = v.Type.split(":")[1];
						
						if(v.ThumbnailTranslation != undefined){
							for(var j = 0;j < v.ThumbnailTranslation.length;j++){
								if(v.ThumbnailTranslation[j].LanguageToken == globalLanguage){
									designName = v.ThumbnailTranslation[j].Name;
								}
							}
						}	
							
	    				jQuery('.all-design-rightside-content').append('<div class="all-design-rightside-block"><a href="'+url+'_'+makeFriendlyUrl(designName)+'_'+v.IdArticle+'_'+v.Id+'"><div class="all-design-rightside-block-pic"><img class="thumb-product-'+i+'" src="" ><img class="thumb-design-'+i+'" src="" style="display:none"></div><div class="all-design-rightside-block-title">'+designName+'</div></a></div>');
	    				count++;
	    				dgoDesignsAfterFilter.push(v);
	    			}
				}
				
			});
			
			if(count == 0){
				jQuery('.all-design-rightside-content').html('UPDATE coming soon.');
			}else{
				jQuery.each(dgoLatestDesigns, function(i, v){
					if(designType == 'motiv'){
	        			if(v.Type.split("_")[1] == 'main'){
	        				var guidDesgin = v.Type.split("_")[2];
								guidDesgin = guidDesgin.split(":")[0];
								
	        				var img_class = '.thumb-design-' + i;
	        				jQuery(img_class).hide();

	        				jQuery(img_class).load(function(){
	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
	        					
	    						jQuery(this).width(size[0]);
	    					
	    						jQuery(this).height(size[1]);
	        					
	        					jQuery(this).show();
	        					
	        				})
	        				
	        				.error(function(){}).attr('src', v.ThumbnailUri);
	        				          					
	    					for(var k = 0;k < MotiveProductDesignArr[guidDesgin].length;k++){
	    						if(MotiveProductDesignArr[guidDesgin][k].Type.split("_")[1] == "product"){
	    							
	    							var img_class = '.thumb-product-' + i;
	    	        				jQuery(img_class).hide();
	    	
	    	        				jQuery(img_class).load(function(){
	    	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
	    	        					
	    	    						jQuery(this).width(size[0]);
	    	    					
	    	    						jQuery(this).height(size[1]);
	    	        					
	    	        					//jQuery(this).show();
	    	        					
	    	        				})
	    	        				
	    	        				.error(function(){}).attr('src', MotiveProductDesignArr[guidDesgin][k].ThumbnailUri);
	    	        				
	    	        				break;
	    	        				
	    						}else if(k == MotiveProductDesignArr[guidDesgin].length - 1){
	    							var img_class = '.thumb-product-' + i;
	    	        				jQuery(img_class).hide();
	    	
	    	        				jQuery(img_class).load(function(){
	    	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
	    	        					
	    	    						jQuery(this).width(size[0]);
	    	    					
	    	    						jQuery(this).height(size[1]);
	    	        					
	    	        					//jQuery(this).show();
	    	        					
	    	        				})
	    	        				
	    	        				.error(function(){}).attr('src', v.ThumbnailUri);
	    						}
	    					}

	        			}
					}else{
						if(v.Type.split("_")[1] == "product"){
							var guidDesgin = v.Type.split("_")[2];
								guidDesgin = guidDesgin.split(":")[0];
								
	        				var img_class = '.thumb-design-' + i;
	        				jQuery(img_class).hide();

	        				jQuery(img_class).load(function(){
	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
	        					
	    						jQuery(this).width(size[0]);
	    					
	    						jQuery(this).height(size[1]);
	        					
	        					jQuery(this).show();
	        					
	        				})
	        				
	        				.error(function(){}).attr('src', v.ThumbnailUri);
	        				
	        				for(var k = 0;k < MotiveProductDesignArr[guidDesgin].length;k++){
	    						if(MotiveProductDesignArr[guidDesgin][k].Type.split("_")[1] == "main"){
	    							
	    							var img_class = '.thumb-product-' + i;
	    	        				jQuery(img_class).hide();
	    	
	    	        				jQuery(img_class).load(function(){
	    	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
	    	        					
	    	    						jQuery(this).width(size[0]);
	    	    					
	    	    						jQuery(this).height(size[1]);
	    	        					
	    	    						//jQuery(this).show();
	    	        					
	    	        				})
	    	        				
	    	        				.error(function(){}).attr('src', MotiveProductDesignArr[guidDesgin][k].ThumbnailUri);
	    	        				
	    	        				break;
	    						}else if(k == MotiveProductDesignArr[guidDesgin].length - 1){
	    							var img_class = '.thumb-product-' + i;
	    	        				jQuery(img_class).hide();
	    	
	    	        				jQuery(img_class).load(function(){
	    	        					var size = scaleSize(165, 165, jQuery(this).width(), jQuery(this).height());    					
	    	        					
	    	    						jQuery(this).width(size[0]);
	    	    					
	    	    						jQuery(this).height(size[1]);
	    	        					
	    	        					//jQuery(this).show();
	    	        					
	    	        				})
	    	        				
	    	        				.error(function(){}).attr('src', v.ThumbnailUri);
	    						}
	    					}

	        			}
					}
	    		});

			}
			
			
		}

		jQuery('.all-design-rightside-block-pic').hover(function(){
			jQuery(this).children('img:nth-child(2)').hide();
			jQuery(this).children('img:nth-child(1)').show();
		},function(){
			jQuery(this).children('img:nth-child(1)').hide();
			jQuery(this).children('img:nth-child(2)').show();
		});

	});
	
}

//function for design Details page
function ready_designDetails_event(){	
		
	jQuery('.edit-link').hide();

	jQuery('.pro-details-dropdown-button').click(function(){
		jQuery('#runs-dropdown').show();
	});
			
	jQuery('.prod-details-currency-dropdown').change(function(){
		var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
		
		jQuery('.price-start-value').html(imgLoading);	
		
		dgoCurrencies = jQuery(this).val();
		DesignDetails_getArticleGroup(dgoArticleGroupIdentifier,"changeCurrency",null);
				
	});
	
	jQuery('body').click(function(e){
		var target = e.target;
		if(target.id != 'pro-details-dropdown-button'){
			jQuery('#runs-dropdown').fadeOut(1);
		}
	});
	
	jQuery('.prod-details-add-cart-button').click(function(){		
		var idDesign = jQuery('.img-cover-selected').attr('id');
			idDesign = idDesign.split('-')[1];
		
		var arrDim = jQuery('.design-thumb-'+idDesign).attr('id');
			arrDim = arrDim.split("-");
		
		if(arrDim[0] > arrDim[1]){
            var picture_format = 'picture_landscape';
        }else{
            var picture_format = 'picture_portrait';
        }
		
		dgoDesigns[idDesign].Ratio = {
            	"RatioWidth" : global_price_object[order_price_chosen].PageWidthOpen, 
            	"RatioHeight" : global_price_object[order_price_chosen].PageLengthOpen
           };
		
		dgoDesigns[idDesign].Format = picture_format;
			
		//add design you choose to array
		global_price_object[order_price_chosen].Pictures.push(dgoDesigns[idDesign]);
					
		//leave object to hidden input
		jQuery('#prices-import').val(JSON2.stringify(global_price_object[order_price_chosen]));
					
		//submit form
		jQuery('#designSelectSubmitForm').submit();
	})
	
}
/*function for ready user account details event*/
function ready_user_accountdetail_event(){
	jQuery(function(){
		if(dgoGuid == ''){
			//window.location = homeUrl;
			jQuery( ".loginForm" ).dialog('open');	
			jQuery( ".loginForm" ).dialog({ position: 'center' });	
		}
	});
	
	jQuery( ".addnewaddressForm" ).dialog({
        title: jQuery('.addnewaddressForm .translate-title').val() + '<div class="ex-close-button"></div>',
        autoOpen: false,                            
        width: 450,
        dialogClass: "dgo-dialog-class dgo-add-address-form",
        modal: true, 
        zIndex: 5001,
        resizable: false,
        position: 'center'
    }); 
	
	// add more provider dialog
	jQuery( "#add-more-login-provider" ).dialog({
		title: jQuery('#trans-add-connection').val() + '<div class="ex-close-button"></div>',
		autoOpen: false,
		height: 270,
		width: 350,
		dialogClass: "dgo-dialog-class dgo-add-more-provider",
		modal: true,
		zIndex: 5001,
		resizable: false,
        position: 'center'
	});
	
	//loading dialog in account details
	jQuery( ".account-details-loading" ).dialog({
		title: 'Loading...' + '<div class="ex-close-button"></div>',
		autoOpen: false,
		height: 200,
		width: 800,
		dialogClass: "dgo-dialog-class dgo-account-details-loading",
		modal: true,
		zIndex: 5001,
		resizable: false,
        position: 'center'
	});
	
	//setting a connection
	jQuery( ".setting-account-connection" ).dialog({
		title: jQuery('#trans-settings').val() + '<div class="ex-close-button"></div>',
		autoOpen: false,
		height: 230,
		width: 450,
		dialogClass: "dgo-dialog-class dgo-setting-account-connection",
		modal: true,
		zIndex: 5001,
		resizable: false,
        position: 'center'
	});
	
	//edit account connection
	jQuery('#connection-setting-delete-button').click(function(){
		var loginName 		= jQuery('#setting-connection-login-name').val();
		var loginProvider 	= jQuery('#setting-select-login-provider').val();
		var r = confirm(jQuery('#trans-are-you-sure').val());
		if ( r == true )
	  	{	
	  		jQuery('.setting-account-connection').dialog('close');
			jQuery('.account-details-loading').dialog('open');
			jQuery('.account-details-loading').dialog({ position: 'center' });
	  		for(x in dgoContacting.ContactingSetting){
	  			if(dgoContacting.ContactingSetting[x].Key == loginProvider && dgoContacting.ContactingSetting[x].Value == loginName){	  			
	  				dgoContacting.ContactingSetting.splice(x,1);
	  				contacting_Update();
	  			}
	  		}
	  	}	
	});
	
	//add or edit address in shopCart
	jQuery("#BtnDone").click(function(){
		var flag	  = true;
		
		if(jQuery('#forename').val() == ""){			
			jQuery('.address-name-first').addClass('address-input-check');
			jQuery('.address-name-first .address-check').addClass('check-img-false');
			flag = false;
		}else{
			jQuery('.address-name-first').removeClass('address-input-check');
			jQuery('.address-name-first .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#surname').val() == ""){			
			jQuery('.address-name-last').addClass('address-input-check');
			jQuery('.address-name-last .address-check').addClass('check-img-false');
			flag = false;
		}else{
			jQuery('.address-name-last').removeClass('address-input-check');
			jQuery('.address-name-last .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#street').val() == ""){			
			jQuery('.address-name-street').addClass('address-input-check');
			jQuery('.address-name-street .address-check').addClass('check-img-false');		
			flag = false;
		}else{
			jQuery('.address-name-street').removeClass('address-input-check');
			jQuery('.address-name-street .address-check').removeClass('check-img-false');	
		}
		
		
		if(jQuery('#zipcode').val() == ""){			
			jQuery('.address-name-zip').addClass('address-input-check');
			jQuery('.address-name-zip .address-check').addClass('check-img-false');			
			flag = false
		}else{
			jQuery('.address-name-zip').removeClass('address-input-check');
			jQuery('.address-name-zip .address-check').removeClass('check-img-false');	
		}
		
		if(jQuery('#city').val() == ""){
			jQuery('.address-name-city').addClass('address-input-check');
			jQuery('.address-name-city .address-check').addClass('check-img-false');				
			flag = false;
		}else{
			jQuery('.address-name-city').removeClass('address-input-check');
			jQuery('.address-name-city .address-check').removeClass('check-img-false');	
		}
		
		if(jQuery('#email').val() == ""){
			jQuery('.address-name-email').addClass('address-input-check');
			jQuery('.address-name-email .address-check').addClass('check-img-false');			
			flag = false;
		}else {
			jQuery('.address-name-email').removeClass('address-input-check');
			jQuery('.address-name-email .address-check').removeClass('check-img-false');	
			
			if(validateUser(jQuery('#email').val()) == false){			
				jQuery('.address-name-email').addClass('address-input-check');
				jQuery('.address-name-email .address-check').addClass('check-img-false');				
				flag = false;
			}
		}
		
		
		if(jQuery('#phone').val()!=""){						
			if(validatePhone(jQuery('#phone').val()) == false){
				jQuery('.address-name-phone').addClass('address-input-check');
				jQuery('.address-name-phone .address-check').addClass('check-img-false');				
				flag = false;
			}else{
				jQuery('.address-name-phone').removeClass('address-input-check');
				jQuery('.address-name-phone .address-check').removeClass('check-img-false');
			}
		}else{
			jQuery('.address-name-phone').removeClass('address-input-check');
			jQuery('.address-name-phone .address-check').removeClass('check-img-false');
		}
		
		if(jQuery('#addressNote').val() != ""){
			if(jQuery('#addressNote').val().length > 30){
				var message = '';
				message += '<div class="errorMessage-container">';
			    message += '<div class="errorMessage-label">'+jQuery('#popup-trans-note').val()+':</div><div class="errorMessage-text">'+jQuery('#popup-trans-invalid-note').val()+'</div>';
			    message += '</div>';
				jQuery('.address-note-content-message').html(message);
				jQuery('.add-info-note-message').show();
				jQuery('.textarea-div').addClass('address-input-check');
				
				flag = false;
			}else{
				jQuery('.address-note-content-message').html('');
				jQuery('.add-info-note-message').hide();
				jQuery('.textarea-div').removeClass('address-input-check');
			}	
		}else{
			jQuery('.address-note-content-message').html('');
			jQuery('.add-info-note-message').hide();
			jQuery('.textarea-div').removeClass('address-input-check');
		}
				
		if(flag == true){
			dgoContacting.ContactingAddress[0].Address.SalutationToken 				= jQuery('.sexual:selected').attr('value');
			dgoContacting.ContactingAddress[0].Address.Surname 						= jQuery('#surname').val();
			dgoContacting.ContactingAddress[0].Address.Forename 					= jQuery('#forename').val();
			dgoContacting.ContactingAddress[0].Address.Company 						= jQuery('#company').val();
			dgoContacting.ContactingAddress[0].Address.Street 						= jQuery('#street').val();
			dgoContacting.ContactingAddress[0].Address.City 						= jQuery('#city').val();
			dgoContacting.ContactingAddress[0].Address.ZipCode 						= jQuery('#zipcode').val();
			dgoContacting.ContactingAddress[0].Address.Telecommunication[0].Number 	= jQuery('#phone').val();
			dgoContacting.ContactingAddress[0].Address.Email[0].Text				= jQuery('#email').val();
			dgoContacting.ContactingAddress[0].Address.CountryToken 				= jQuery('.add-info-country-dropdown-selected').val();
			dgoContacting.ContactingAddress[0].Address.ObjectNote.Text 				= jQuery('#addressNote').val();
			delete dgoContacting.ResaleUnit;
			delete dgoContacting.CurrencyToken;
			delete dgoContacting.Discount;
			delete dgoContacting.DisplayLocale;
			delete dgoContacting.Handle;
			delete dgoContacting.IdDiscount;
			delete dgoContacting.LanguageToken;
			delete dgoContacting.MessagingFlags;
			delete dgoContacting.UserImageType;
			jQuery.blockUI(0);
			contacting_Update();//function in contacting_request_function.js				
			jQuery('.addnewaddressForm').dialog('close');	
		}
	});
	
	//Event on change button in change password dialog
	jQuery("#BtnChange").click(function(){
		if(jQuery("#oldPassword").val() != "" && jQuery("#newPassword").val()!= "" && jQuery("#newPassConfirm").val()!= ""){
			if(jQuery("#oldPassword").val().length >= 6 && jQuery("#newPassword").val().length >= 6 && jQuery("#newPassConfirm").val().length >= 6){
				var oldPass = hex_md5(hex_md5(jQuery("#oldPassword").val()) + "addressBook");
				if(oldPass == dgoPassword){
					if(jQuery("#newPassword").val() == jQuery("#newPassConfirm").val()){
						contacting_ChangePassword(jQuery("#newPassword").val());
					}
				}else{
					alert("Old password not equal");
					jQuery("#oldPassword").val("");
					jQuery("#oldPassword").focus();
				}
			}
		}
	});

}

function ready_myMotives_event(){
	jQuery(function(){
		if(dgoGuid == '' || dgoGuid == null){
			//window.location = homeUrl;
			jQuery( ".loginForm" ).dialog('open');	
			jQuery( ".loginForm" ).dialog({ position: 'center' });	
		}
	});
}

function ready_allOrders_event(){
	jQuery(function(){
		if(dgoGuid == '' || dgoGuid == null){
			//window.location = homeUrl;
			jQuery( ".loginForm" ).dialog('open');	
			jQuery( ".loginForm" ).dialog({ position: 'center' });	
		}
	});
}
