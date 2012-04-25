/*function Check login name when recover password*/
function contacting_RecoverPassword_CheckLogin(login){
	var api = new delivergo.api.contact();    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    api.CheckLoginExist(login, 
    	function(result){
	    	if(result.Value == "NotFound"){
        		jQuery("#loginName").val("");
        		api.Log("Username does not exist");        		
        	}else if(result.Value == "Found"){
        		contacting_RecoverPassword(login);//function in this page
        	}else if(result.Value == "Found, Disabled" || result.Value == "Found, NeedsActivation"){
        		api.Log('Username existed But not Enable');
        		jQuery("#loginName").val("");
        		jQuery('#forgot-password').dialog('close');        		
        		jQuery("#active-account").dialog('open');
        		jQuery("#active-account").dialog({ position: 'center' });
        	}
    });
    
    api.OnError = function(error) {
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };       
}

/*function Check login provider from api*/
function contacting_checkLoginProviderExist(settingKey,settingValue,option){	
	
	var api = new delivergo.api.contact();
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
	//block screen
	jQuery.blockUI(0);
	
    api.CheckLoginProviderExists(settingKey,settingValue,
    	function(result){
    		if(option == 'openid-new-account'){
    			var arrValue = result.Value.split(',');
	        	for(i=0;i<arrValue.length;i++){
	        		if(arrValue[i] == 'NotFound'){
	        			jQuery.unblockUI(0);
						
						jQuery(".assignOpenidOr").dialog("open");
	        			jQuery(".assignOpenidOr").dialog({ position: 'center' });
	        			if(globalLanguage == 'DE'){
	        				jQuery('.dgo-assign-openid-or .assign-exist-account').css('line-height','20px');
	        			}
	        			
	        		}else if(arrValue[i] == 'Found'){
	        			contacting_loginViaProvider(settingKey,settingValue);//function in this page
	        		}
	        	}
    		}
    		
    		if(option == 'add-connection'){
    			var arrValue = result.Value.split(',');
	        	for(i=0;i<arrValue.length;i++){
	        		if(arrValue[i] == 'NotFound'){
	        			var contactSetting = {
												"Key": settingKey,
												"Type": "System.String",
												"Value": settingValue
											};
						dgoContacting.ContactingSetting.push(contactSetting);
	        			contacting_Update();
	        			var dataString = "option=logoutProvider";
						//save to session
						jQuery.ajax({
						   type: "GET",
						   url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
						   data: dataString,
						   dataType: "json",
						   success: function(data){	
						   }
						 });	        			
	        		}else if(arrValue[i] == 'Found'){
					
						jQuery.unblockUI();
						
	        			api.Log('This connection is exist');
	        			jQuery('#add-more-login-provider').dialog('open');
	        			jQuery('#add-more-login-provider').dialog({ position: 'center' });
	        		}
	        	}
    		}	    		
    });
    
    api.OnError = function(error) {
      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };       
}

/*function check contacting login exist*/
function contacting_CheckContactingExist(login, option, variable){
	var api = new delivergo.api.contact();    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    api.CheckLoginExist(login, 
    	function(result){
    		if(option == 'openid-new-account'){
    			var arrValue = result.Value.split(',');
	        	for(i=0;i<arrValue.length;i++){
	        		if(arrValue[i] == "NotFound"){	        			
	        			jQuery( ".address-check-openid-email" ).removeClass('checkImgContactExist');
						jQuery( ".add-new-add-email-message" ).html('');
	        			jQuery('#check-openid-email-status').val('true');
	        		}else{	        			
	        			var message = '';
	        			message += '<div class="errorMessage-container">';
		    			message += '<div class="errorMessage-label">'+jQuery('#popup-trans-email').val()+':</div><div class="errorMessage-text">'+jQuery('#popup-trans-email-exist').val()+'</div>';
		    			message += '</div>';
		    			
		    			jQuery('.openid-address-email-content-message').html(message);
						jQuery('.add-info-email-message').show();
						jQuery('.address-name-email').addClass('address-input-check');
						jQuery('.address-name-email .address-check-openid-email').addClass('check-img-false');
	        			jQuery( ".address-check-openid-email" ).removeClass('checkImgContactExist');
	        			jQuery( ".add-new-add-email-message" ).html(message);break;
	        		}
	        	}  
    		}
    		
    		if(option == 'register-new-account'){
    			if(result.Value == "NotFound"){
    				jQuery('.leftContentDiv .email-user').css({"border-color":"green"});
    				jQuery('.address-check-user').removeClass('checkImgContactExist');
		    		jQuery('.address-check-user').addClass('checkImgTrue');
		    		jQuery('.register-status-message').html('');
		    		jQuery('#check-user-exist-status').val('true');		
	        	}else if(result.Value == "Found" || result.Value == "Found, NeedsActivation" || result.Value == "Found, Disabled"){
	        		jQuery('.leftContentDiv .email-user').css({"border-color":"red"});
	        		jQuery('.address-check-user').removeClass('checkImgContactExist');
    				jQuery('.address-check-user').addClass('checkImgFalse');
	        		jQuery('.register-status-message').html(jQuery("#popup-trans-email-exist").val());
	        		jQuery('.loginForm').dialog('open');
	        		jQuery('.loginForm').dialog({ position: 'center' });
	        		jQuery('#check-user-exist-status').val('false');
	        	}
    		}
    		
    		    		
    		if(option == 'recover-password'){
    			var arrValue = result.Value.split(',');
	        	for(i=0;i<arrValue.length;i++){
	        		if(arrValue[i] == "NotFound"){
	        			jQuery('.forgot-password-checkLoginExistStatus').removeClass('forgot-password-checkLoginExistStatus-success');
	        			jQuery('.forgot-password-checkLoginExistStatus').removeClass('forgot-password-checkLoginExistStatus-process');
	        			jQuery('.forgot-password-checkLoginExistStatus').addClass('forgot-password-checkLoginExistStatus-fail');
	        			jQuery('#forgotPassCheckExistStatus').val('false');
	        			jQuery('.forgot-password-content-message').html(jQuery('#trans-dialog-email-not-exist').val());
	        			break;
	        		}else{
	        			jQuery('.forgot-password-checkLoginExistStatus').removeClass('forgot-password-checkLoginExistStatus-fail');
	        			jQuery('.forgot-password-checkLoginExistStatus').removeClass('forgot-password-checkLoginExistStatus-process');
	        			jQuery('.forgot-password-checkLoginExistStatus').addClass('forgot-password-checkLoginExistStatus-success');
	        			jQuery('#forgotPassCheckExistStatus').val('true');
	        			jQuery('.forgot-password-content-message').html('');	        			
	        			break;
	        		}
	        	}
    		}
    recover_pass();
    });
    
    api.OnError = function(error) {
      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };       
}

/*function check activation login and then active*/
function contacting_CheckActivation(Email, ActivationCode, Guid){	    
	if(Guid == null){
		contacting_CheckEmailExist(Email, ActivationCode);
	}else{
		//create a new api object
		var api = new delivergo.api.contact();
		
		if(globalPortalUri != null)
			api.PortalUriBase = globalPortalUri;

			
			//change portal for nhain.vn
			api.PortalNameSpace = globalPortal; 
			
			api.IsDev = globalIsDev;
			
			//change the URL to ajaxproxy file    
		    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
			
			api.ApiKey = Guid;
			
			api.GetViaGuid( 
				function(result){
					var flagActiveCode = false;
		    		if(ActivationCode != result.Value.ActivationKey){	    			
						jQuery('#errorActivationCode').removeClass('success');
						jQuery('#activation-code').removeClass('success');
						jQuery('#errorActivationCode').html('Activation Code is wrong');
						jQuery('#errorActivationCode').addClass('error');
						jQuery('#activation-code').addClass('error');
					}else{					
						jQuery('#errorActivationCode').removeClass('error');
						jQuery('#activation-code').removeClass('error');
						jQuery('#errorActivationCode').html('Activation Code is valid');
						jQuery('#errorActivationCode').addClass('success');
						jQuery('#activation-code').addClass('success');					
						flagActiveCode = true;
					}
					if(flagActiveCode){
						result.Value.Active = true;
						contacting_Active(result.Value);	
					}
					
			});
			
		    api.OnError = function(error) {
			  
			  api.Log(error.Text);
			};
			        
			api.OnWarning = function(warning) {
			  api.Log(warning.Text);
			};  
	}
	 	
}

//function check existing email
function contacting_CheckEmailExist(Email, ActivationCode){
	//create a new api object
	var api = new delivergo.api.contact();    
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
		
	//change the URL to ajaxproxy file    
	api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';    
    
    api.CheckEmailExists(Email, 
    	function(result){
    		
    		if(result.Value == "Found, NeedsActivation" || result.Value == "Found, Disabled"){
    			jQuery('#errorLogin').removeClass('error');
				jQuery('#activation-email').removeClass('error');
    			jQuery('#errorLogin').html('Email is valid');
				jQuery('#errorLogin').addClass('success');
				jQuery('#activation-email').addClass('success');
				
				contacting_GetViaEmail(Email, ActivationCode,'active-account');	    			
    			
    		}else if(result.Value == 'NotFound'){
    			jQuery('#errorLogin').removeClass('success');
				jQuery('#activation-email').removeClass('success');
				jQuery('#errorLogin').html('Email is wrong');
				jQuery('#errorLogin').addClass('error');
				jQuery('#activation-email').addClass('error');
				
    		}else if(result.Value == 'Found'){
    			jQuery('#errorLogin').removeClass('success');
				jQuery('#activation-email').removeClass('success');
				jQuery('#errorLogin').html('This account is active');
				jQuery('#errorLogin').addClass('error');
				jQuery('#activation-email').addClass('error');
    		}
    		
    });
    
    api.OnError = function(error) {
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };       
}

function contacting_GetViaEmail(email, ActivationCode, option){
	var api = new delivergo.api.contact();    
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	
	//G1CN
	//589cf79f-ec89-4244-9598-6abf209807bb
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    api.GetViaEmail(email, 
    	function(result){
    			
    		if(option == 'active-account'){
    			var flagActiveCode = false;
    			
	    		if(ActivationCode != result.Value.ActivationKey){
					jQuery('#errorActivationCode').removeClass('success');
					jQuery('#activation-code').removeClass('success');
					jQuery('#errorActivationCode').html('Activation Code is wrong');
					jQuery('#errorActivationCode').addClass('error');
					jQuery('#activation-code').addClass('error');
				}else{
					jQuery('#errorActivationCode').removeClass('error');
					jQuery('#activation-code').removeClass('error');
					jQuery('#errorActivationCode').html('Activation Code is valid');
					jQuery('#errorActivationCode').addClass('success');
					jQuery('#activation-code').addClass('success');
					flagActiveCode = true;
				}
	    		if(flagActiveCode){
    				result.Value.Active = true;
    				contacting_Active(result);
    			}
    		}
    });
    
    api.OnError = function(error) {
      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };       
}

/*function get contacting via guid from api*/
function contacting_GetViaGuid(option){
	//create a new api object
	var api = new delivergo.api.contact();    
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
	
	api.ApiKey = dgoGuid;
	
	api.GetViaGuid( 
		function(result){	
			if(!result.Value.Active){
				contacting_Active(result);// function in this page
			}else{
				if(option == 'addressBook' && dgoCurrentPage == "shoppingCart"){
					if(guidUserInShopCart != undefined && guidUserInShopCart != 'null'){
						if(result.Value.ContactingAddress[0].Address.Forename != "" && result.Value.ContactingAddress[0].Address.Surname != ""){
		        			dgoUsername = result.Value.ContactingAddress[0].Address.Forename + " " + result.Value.ContactingAddress[0].Address.Surname;
		        		}else{
		        			dgoUsername = result.Value.Login; 
		        		} 
						
						var dataString = "pass=" + hex_md5( "addressBook" ) + "&loginUser=" + dgoUsername + "&option=login&guid=" + dgoGuid;
						jQuery.ajax({
						   type: "GET",
						   url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
						   data: dataString,
						   success: function(data){
						   		if(!data.error){						   			
						   			Func_Contact_GetAllContact(result.Value);
						   		}
						   }							 
						});
						
					jQuery('#logout-button').show();
					jQuery("#login-button").hide();		
					jQuery("#hello").html(dgoUsername);
					jQuery(".login-user-info").show();
					
					//show address menu
					jQuery('.customer-settings').show();
					
					}else{
						//print contact information					
						Func_Contact_GetAllContact(result.Value);
					}
										
				}else{
					Func_Contact_GetAllContact(result.Value);
				}
				
				if(dgologinProvider != null && dgologinName != null){
					contacting_checkLoginProviderExist(dgologinProvider,dgologinName,'add-connection');
				}
			}	
	});
	
    api.OnError = function(error) {
      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };   	
}
function contacting_GetViaGuidFromPhp(result, option){
	if(result != ""){
		if(option == 'addressBook' && dgoCurrentPage == "shoppingCart"){
			if(guidUserInShopCart != undefined && guidUserInShopCart != 'null'){
				if(result.Value.ContactingAddress[0].Address.Forename != "" && result.Value.ContactingAddress[0].Address.Surname != ""){
	    			dgoUsername = result.Value.ContactingAddress[0].Address.Forename + " " + result.Value.ContactingAddress[0].Address.Surname;
	    		}else{
	    			dgoUsername = result.Value.Login; 
	    		} 
				
				var dataString = "pass=" + hex_md5( "addressBook" ) + "&loginUser=" + dgoUsername + "&option=login&guid=" + dgoGuid;
				jQuery.ajax({
				   type: "GET",
				   url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
				   data: dataString,
				   success: function(data){
				   		if(!data.error){						   			
				   			Func_Contact_GetAllContact(result.Value);
				   		}
				   }							 
				});
				
				jQuery('#logout-button').show();
				jQuery("#login-button").hide();		
				jQuery("#hello").html(dgoUsername);
				jQuery(".login-user-info").show();
				
				//show address menu
				jQuery('.customer-settings').show();
			
			}else{
				//print contact information					
				Func_Contact_GetAllContact(result.Value);
			}
								
		}else{
			Func_Contact_GetAllContact(result.Value);
		}
		
		if(dgologinProvider != null && dgologinName != null){
			contacting_checkLoginProviderExist(dgologinProvider,dgologinName,'add-connection');
		}
	}
	
}
//Update contacting
function contacting_Update(){
	var api = new delivergo.api.contact();    
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    api.Request.Value = dgoContacting;
    
    api.Update(
    	function(result){
    		jQuery.unblockUI();
    		
    		dgoGuid = result.Value.Guid;
        	
        	dgoUsername = result.Value.ContactingAddress[0].Address.Forename + " " + result.Value.ContactingAddress[0].Address.Surname;
        	
        	var dataString = "guid=" + dgoGuid +"&pass=1&loginUser=" + dgoUsername + "&option=login";
        	
        	//save to session
        	jQuery.ajax({
			   type: "GET",
			   url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
			   data: dataString,
			   dataType: "json",
			   success: function(data){				   		   			   				
			   }
			});
			
    		Func_Contact_GetAllContact(result.Value);//function in this page    		
    },dgoContacting);
    
    api.OnError = function(error) {
      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };   
}
/*function active contacting from api*/
function contacting_Active(contact){
	var api = new delivergo.api.contact();    
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	
	api.DisableDebug();
	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.Request.Value = contact;
    
    api.Update( 
    	function(result){
    		alert(jQuery('#mess-active-successful').val());	
            
			dgoGuid = result.Value.Guid;
			
			if(result.Value.ContactingAddress[0].Address.Forename != "" && result.Value.ContactingAddress[0].Address.Surname != ""){
    			dgoUsername = result.Value.ContactingAddress[0].Address.Forename + " " + result.Value.ContactingAddress[0].Address.Surname;
    		}else{
    			dgoUsername = result.Value.Login; 
    		}
			
			var dataString = "pass=1&loginUser=" + dgoUsername + "&option=login&guid=" + result.Value.Guid;
			jQuery.ajax({
			   type: "GET",
			   url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
			   data: dataString,
			   success: function(data){
			   		if(!data.error){						   			
			   			Func_Contact_GetAllContact(dgoContacting);
			   			window.location = homeUrl + '/account-details';
			   		}
			   }							 
			});
			
			jQuery('#logout-button').show();
			jQuery("#login-button").hide();		
			jQuery("#hello").html(dgoUsername);
			jQuery(".login-user-info").show();
								
			//show address menu
			jQuery('.customer-settings').show();
			
			jQuery('.activation-account-content').css("display","none");			
    });
    
    api.OnError = function(error) {
      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };       
}

/*functon change password*/
function contacting_ChangePassword(newpassword){
	var api = new delivergo.api.contact();    
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	
	//change isDebug to false
	//api.EnableDebug();
	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';    
    
    dgoContacting.Password = hex_md5(newpassword);
    
    api.Request.Value = dgoContacting;
    
    api.ChangePassword( 
    	function(result){
			var dataString = "pass=&guid=&option=logout";
			jQuery.ajax({
				type: "GET",
				url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
				data: dataString,
				success: function(data){
					}
			});
			api.Log("Password changed! Now you can login with new password");
			jQuery( ".changePassForm" ).dialog('close');
			jQuery("#oldPassword").val("");
			jQuery("#newPassword").val("");
			jQuery("#newPassConfirm").val("");
			dgoContacting = null; 
			jQuery('#changePassword').hide();
			jQuery('#logout-button').hide();
			jQuery("#login-button").show();		
			jQuery(".login-user-info").hide();
			jQuery(".newAddress").hide();
			jQuery("div#all-contact-field").html("");
			window.location =  homeUrl;   	
    },dgoContacting);
    
    api.OnError = function(error) {
      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };       
}


/*function send recover password*/
function contacting_RecoverPassword(login){
	var api = new delivergo.api.contact();    
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	
	//api.EnableDebug();
	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.RecoverPassword(login, resaleGuidUser,
    	function(result){
			jQuery("#loginName").val("");
            jQuery("#login-name").val("");
            jQuery("#login-password").val("");
            api.Log("Success! Please check your email");
            alert("Success! Please check your email");
    });
    
    api.OnError = function(error) {
      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };       
}


/*function register new user*/
function contacting_Register(contact){
	var api = new delivergo.api.contact();    
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';

	api.Request.Value = contact;
    
    api.AddNewCustomer( 
    	function(result){
    		jQuery("#res-username").val("");
	        jQuery("#reg-password").val("");
	        jQuery("#reg-confirm").val("");
	        
	        //hide register board
            jQuery('.registerBoard').hide();
            
            //hide detail board
            jQuery('.detailBoard').hide();
            
            //show login board
            jQuery('.loginBoard').show();
            
            jQuery('.btSpanRight').html('Register');
            
        	contacting_ActivationRequest(result.Value.Login);//function in this page 
    });
    
    api.OnError = function(error) {
      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };       
}

/*function register new user via openid*/
function contacting_RegisterViaOpenid(contact){
	var api = new delivergo.api.contact();    
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	
	//api.EnableDebug();
	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.Request.Value = contact;
    
    api.AddNewCustomer( 
    	function(result){
    		dgoUsername = result.Value.Login;
			jQuery( ".assignOpenidOr" ).dialog('close');
			window.location.reload();
    });
    
    api.OnError = function(error) {
      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

/*function activation request*/
function contacting_ActivationRequest(login){
	var api = new delivergo.api.contact();    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	
	//api.EnableDebug();
	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.RequestActivation(homeUrl, login, 
    	function(result){
    		if(!result.error){
	    		if(result.Value == null){
	    			if(result.Status.Errors != undefined){
	    				jQuery('.forgot-password-content-message-active').html(result.Status.Errors[0].Key);	
	    			}else{
	    				jQuery('.forgot-password-content-message-active').html(result.Status.Warnings[0].Key);
	    			}    			
	    			    			
	    		}else{    			
	    			jQuery('.forgot-password-content-message-active').html('');
	    			jQuery("#login-username").val("");
		        	jQuery("#login-password").val("");
		        	//close dialog
		            jQuery('.dgo-user-dialog-over').hide();
		            alert(jQuery('#mess-resgiter-successful').val());	            		        	
		            jQuery("#active-account").dialog('close');
		            jQuery("#forgot-password-contacting").dialog('close');		            		            
	    		}
	    	}else{
	    		jQuery('.forgot-password-content-message-active').html('Error when sending request. Please try a again');
	    	}
    });
    
    api.OnError = function(error) {
      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

/*function authentication from api*/
function contacting_Authentication(){
	
	var api = new delivergo.api.contact();   
	 
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	//change url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u='; 
	
	var contact = {
			"Login": dgoUsername,
	        "Password": dgoPassword
	};
	
	//set Value for request
    api.Request.Value = contact;
	
	api.Authenticate(
		function(result){
			
			if(result.Value.AuthenticationStatus == "WrongPassword"){
				jQuery.unblockUI();
				jQuery('.login-input-password').css({"border-color":"red"});
				jQuery('.login-password').next('.address-check').removeClass('checkImgTrue');
				jQuery('.login-password').next('.address-check').addClass('checkImgFalse');
				jQuery('.login-password-message').html(jQuery('#trans-dialog-wrong-password').val());				
			}else
			if(result.Value.AuthenticationStatus == "Disabled" || result.Value.AuthenticationStatus == "NeedsActivation"){
				jQuery.unblockUI();
				jQuery('#activeAccount').val(jQuery("#login-username").val());
				jQuery("#login-username").val("");
				jQuery("#login-password").val("");
	        	api.Log('Username existed But need Activation');
	        	jQuery("#active-account").dialog('open');
	        	jQuery("#active-account").dialog({ position: 'center' });
			}else
			if(result.Value.AuthenticationStatus == "NotFound"){
				jQuery.unblockUI();
				jQuery('.login-input-login').css({"border-color":"red"});
				jQuery('.login-username').next('.address-check').removeClass('checkImgTrue');
				jQuery('.login-username').next('.address-check').addClass('checkImgFalse');
				jQuery('.login-user-message').html(jQuery('#trans-dialog-email-not-exist').val());
			}else
			if(result.Value.AuthenticationStatus == "None"){					
				dgoContacting 	= result.Value;
	        	dgoGuid			= result.Value.Guid; 	
	        		if(result.Value.ContactingAddress[0].Address.Forename != "" && result.Value.ContactingAddress[0].Address.Surname != ""){
	        			dgoUsername = result.Value.ContactingAddress[0].Address.Forename + " " + result.Value.ContactingAddress[0].Address.Surname;
	        		}else{
	        			dgoUsername = result.Value.Login; 
	        		}  
	        		
	        		//photo user
	        		var dgoPhotoUser = null;
	        		var _contactingAddress = result.Value.ContactingAddress;
	        		for(var i = 0; i < _contactingAddress.length; i++){
	        			if(_contactingAddress[i].Address.AddressAssignment != undefined){
	        				if(_contactingAddress[i].Address.AddressAssignment[0].AddressTypeToken == 'Main'){
	        					var dgoPhotoUser = _contactingAddress[i].Address.Uri == undefined ? null : _contactingAddress[i].Address.Uri[0].Text.substr(8);
	        				}
	        			}
	        		}	        		
	        		     		
		        	var dataString = "pass=" + hex_md5( dgoPassword + "addressBook" ) + "&loginUser=" + dgoUsername + "&photoUser=" + dgoPhotoUser + "&option=login&guid=" + result.Value.Guid;
						jQuery.ajax({
						   type: "GET",
						   url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
						   data: dataString,
						   success: function(data){
						   		if(!data.error){
						   			/*if(dgoCurrentPage == 'addressBook' || dgoCurrentPage == 'accountDetails' || dgoCurrentPage == 'earnMoney' || dgoCurrentPage == 'productDetails'){
										window.location.reload();
									}*/
						   			window.location.reload();
						   			//Func_Contact_GetAllContact(dgoContacting);
						   		}
						   }							 
						});
						
					jQuery('#logout-button').show();
					jQuery("#login-button").hide();		
					jQuery("#hello").html(dgoUsername);
					jQuery(".login-user-info").show();
					jQuery("#login-username").val("");
					jQuery("#login-password").val("");
					jQuery('.loginForm').dialog('close');
					
					//show address menu
					jQuery('.customer-settings').show();					
			}
			
	},contact);
	
    api.OnError = function(error) {      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    }; 	
	
		
}


/*function login via provider*/
function contacting_loginViaProvider(settingKey,settingValue){
	var api = new delivergo.api.contact();    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//set apikey
    api.ApiKey = guidUser;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.GetViaProvider(settingKey,settingValue,
    	function(result){
			
	    	dgoGuid = result.Value.Guid;
        	//dgoUsername = result.Value.Login;
        	dgoUsername = result.Value.ContactingAddress[0].Address.Forename + " " + result.Value.ContactingAddress[0].Address.Surname;
        	var dataString = "guid=" + dgoGuid +"&pass=1&loginUser=" + dgoUsername + "&option=login";
        	//save to session
        	jQuery.ajax({
			   type: "GET",
			   url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
			   data: dataString,
			   dataType: "json",
			   success: function(data){	
			   		if(!data.error){	
				   		jQuery('#logout-button').show();
						jQuery("#login-button").hide();		
						jQuery("#hello").html(dgoUsername);	
						jQuery(".login-user-info").show();											
						jQuery('.customer-settings').show();
						
						window.location.reload();
						
						if(jQuery('.dgo-page-name').val() == 'shoppingCart'){
							dgoCurrentPage = 'shoppingCart';						
							Func_Contact_GetAllContact(result.Value);//function in this page							
						}
					}	   			   				
			   }
			});
    });
    
    api.OnError = function(error) {      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}
/*function upload avatar*/
function contacting_UploadAvatar(id,pic_url,idAvatar){
	var api = new delivergo.api.contact();    
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    if(!dgoContacting.ContactingAddress[id].Address.Uri){
		dgoContacting.ContactingAddress[id].Address.Uri = [
			{
			"Id": 0,
			"Text": "profile:"+pic_url,
			"Active": true
			}
		]
	}else{
		dgoContacting.ContactingAddress[id].Address.Uri[idAvatar].Text = "profile:"+pic_url;
	}
	
	api.Request.Value = dgoContacting;
	
	api.Update( 
		function(result){
			contacting_GetViaGuid('addressBook');
	},dgoContacting);
	
    api.OnError = function(error) {      
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    }; 	
}
/*=======================FUNTIONS for contacting=========================*/
//show contact when add new address without login
function Func_Contact_ShowContactWithoutLogin(result){
	
	jQuery('.shopping-contact-item').remove();
   		var contact = "";
    	var countryName = "";
    	var j = 0;
    	
    	while(j < result.length){
        	
        	for(i=0 ; i < dgoCountryApi.length; i++){
        		if(dgoCountryApi[i].Key == result[j].Address.CountryToken){
        			countryName = "<div><span class='shopping-field-country'>"+dgoCountryApi[i].Name+"</span>"; 			
        		}
        	}
        	
        	//check firstname empty
        	if(result[j].Address.Forename != ""){
        		var firstname = "<input type='hidden' class='shopping-field-salutation' value='" + result[j].Address.SalutationToken + "'/><div><span class='shopping-field-first-name'>"+result[j].Address.Forename+"</span>";
        	}else{
        		var firstname = "<div><span class='shopping-field-first-name'></span>";
        	}
        	
        	//check lastname empty
        	if(result[j].Address.Surname != ""){
        		var lastname = "<span class='shopping-field-last-name'>"+result[j].Address.Surname+"</span></div>";
        	}else{
        		var lastname = "<span class='shopping-field-last-name'></span></div>";;
        	}
        	
        	//check company empty
        	if(result[j].Address.Company != ""){
        		var company = "<div><span class='shopping-field-company'>"+result[j].Address.Company+"</span></div>";
        	}else{
        		var company = "<div><span class='shopping-field-company'></span></div>";
        	}
        	
        	//check street empty
        	if(result[j].Address.Street != ""){
        		var street = "<div><span class='shopping-field-street'>"+result[j].Address.Street+"</span></div>";
        	}else{
        		var street = "<div><span class='shopping-field-street'></span></div>";
        	}
        	
        	//check city empty
        	if(result[j].Address.City != ""){
        		var city = "<div><span class='shopping-field-city'>"+result[j].Address.City+"</span></div>";
        	}else{
        		var city = "<div><span class='shopping-field-city'></span></div>";
        	}
        	
        	//check zipcode empty
        	if(result[j].Address.ZipCode != ""){
        		var zipcode = "<div><span class='shopping-field-zipcode'>"+result[j].Address.ZipCode+"</span></div>";
        	}else{
        		var zipcode = "<div><span class='shopping-field-zipcode'></span></div>";
        	}
        	
        	//check phone exist
        	if(result[j].Address.Telecommunication != undefined){
        		var phone = "<div><span class='shopping-field-phone'>"+result[j].Address.Telecommunication[0].Number+"</span></div>";
        	}else{
        		var phone = "<div><span class='shopping-field-phone'></span></div>";
        	}
        	
        	//check email empty
        	if(result[j].Address.Email != undefined){
        		var email = "<div><span class='shopping-field-email'>"+result[j].Address.Email[0].Text+"</span></div>";
        	}else{
        		var email = "<div><span class='shopping-field-email'></span></div>";
        	}
			
			if(result[j].Password != undefined){
				var password = "<input type='hidden' class='shopping-field-password' value='" + result[j].Password + "'>";
			}else{
				var password = "";
			}
			
			var timezones = "<input type='hidden' class='shopping-field-timezones' value='" + result[j].TimeZone + "'>";
			
			contact	+= "<div class='shopping-contact-item' id='address-"+j+"'  onmouseover='displayIcon("+j+")' onmouseout='hideIcon("+j+")' >";
        	contact += "<div class='shopping-contact-item-header is-bottons' onclick='CheckAddressShopping("+j+")'>" + jQuery('.translate-ship-title').val() + "</div>";		            		
        	contact += "<div class='shopping-contact-item-content' onclick='CheckAddressShopping("+j+")'>";
        	contact += firstname+" "+lastname;
        	contact += company;
        	contact += street;
        	contact += city;
        	contact += zipcode;
        	contact += email;
        	contact += phone;
        	contact += countryName+"<span class='shopping-field-countryToken' style='display:none'>"+result[j].Address.CountryToken+"</span></div>";
        	contact += "</div>"; 
        	contact += "<div class='dgo-tick' id='tick-"+j+"'>";           				            	          	
        	contact += "<span><a href='javascript:void(0)' onclick='editContactingWithoutLogin("+j+")'><img src='"+web_2_print_blogInfo+"css/img/icon/edit-1.png' title='edit' width=32 height=32 border=0></a> &nbsp;&nbsp;<a href='javascript:void(0)' onclick='deleteAddressShoppingWithoutLogin("+j+")'><img src='"+web_2_print_blogInfo+"css/img/icon/trash.png' title='delete' width=32 height=32 border=0></a>";
        	contact += "</span><input style='display:none' class='dgo-address-radio' type='radio' name='check-address' id='check-address-"+j+"' value='"+j+"'>" + password + timezones + "</div></div>";
        	contact += "</div>";          	
        	j++;
            	
        }
        
        jQuery(".addressContainer").append(contact);
        
        if(result.length > 0){
        	CheckAddressShopping(0);	
        }
        
}

//get all contact
function Func_Contact_GetAllContact(result){
	dgoContacting = result;

	//get contact for shopping cart page
	if(dgoCurrentPage == 'shoppingCart'){
		jQuery('.shopping-contact-item').remove();
   		var contact = "";
    	var countryName = "";
    	
    	var j = 0;
    	
    	while(j<result.ContactingAddress.length){
        	
        	for(i=0;i<dgoCountryApi.length;i++){
        		if(dgoCountryApi[i].Key == result.ContactingAddress[j].Address.CountryToken){
        			countryName = "<div><span class='shopping-field-country'>"+dgoCountryApi[i].Name+"</span>"; 			
        		}
        	}
        	
        	//check firstname empty
        	if(result.ContactingAddress[j].Address.Forename != ""){
        		var firstname = "<input type='hidden' class='shopping-field-salutation' value='" + result.ContactingAddress[j].Address.SalutationToken + "'/><div><span class='shopping-field-first-name'>"+result.ContactingAddress[j].Address.Forename+"</span></div>";
        	}else{
        		var firstname = "<input type='hidden' class='shopping-field-salutation' value='" + result.ContactingAddress[j].Address.SalutationToken + "'/><div><span class='shopping-field-first-name'></span></div>";
        	}
        	
        	//check lastname empty
        	if(result.ContactingAddress[j].Address.Surname != ""){
        		var lastname = "<div><span class='shopping-field-last-name'>"+result.ContactingAddress[j].Address.Surname+"</span></div>";
        	}else{
        		var lastname = "<div><span class='shopping-field-last-name'></span></div>";;
        	}
        	
        	//check company empty
        	if(result.ContactingAddress[j].Address.Company != ""){
        		var company = "<div><span class='shopping-field-company'>"+result.ContactingAddress[j].Address.Company+"</span></div>";
        	}else{
        		var company = "<div><span class='shopping-field-company'></span></div>";
        	}
        	
        	//check street empty
        	if(result.ContactingAddress[j].Address.Street != ""){
        		var street = "<div><span class='shopping-field-street'>"+result.ContactingAddress[j].Address.Street+"</span></div>";
        	}else{
        		var street = "<div><span class='shopping-field-street'></span></div>";
        	}
        	
        	//check city empty
        	if(result.ContactingAddress[j].Address.City != ""){
        		var city = "<div><span class='shopping-field-city'>"+result.ContactingAddress[j].Address.City+"</span></div>";
        	}else{
        		var city = "<div><span class='shopping-field-city'></span></div>";
        	}
        	
        	//check zipcode empty
        	if(result.ContactingAddress[j].Address.ZipCode != ""){
        		var zipcode = "<div><span class='shopping-field-zipcode'>"+result.ContactingAddress[j].Address.ZipCode+"</span></div>";
        	}else{
        		var zipcode = "<div><span class='shopping-field-zipcode'></span></div>";
        	}
        	
        	//check phone exist
        	if(result.ContactingAddress[j].Address.Telecommunication != undefined){
        		var phone = "<div><span class='shopping-field-phone'>"+result.ContactingAddress[j].Address.Telecommunication[0].Number+"</span></div>";
        	}else{
        		var phone = "<div><span class=''shopping-field-phone'></span></div>";
        	}
        	
        	var email = "<div><span class='shopping-field-email'>"+result.ContactingAddress[j].Address.Email[0].Text+"</span></div>";    
				
			contact	+= "<div class='shopping-contact-item' id='address-"+j+"' onmouseover='displayIcon("+j+")' onmouseout='hideIcon("+j+")' >";
        	contact += "<div class='shopping-contact-item-header is-bottons' onclick='CheckAddressShopping("+j+")'>" + jQuery('.translate-ship-title').val() + "</div>";		            		
        	contact += "<div class='shopping-contact-item-content' onclick='CheckAddressShopping("+j+")'>";
        	contact += firstname+" "+lastname;
        	contact += company;
        	contact += street;
        	contact += city;
        	contact += zipcode;
        	contact += email;
        	contact += phone;
        	contact += countryName+"<span class='shopping-field-countryToken' style='display:none'>"+result.ContactingAddress[j].Address.CountryToken+"</span></div>";
        	contact += "</div>";           	
        	contact += "<div class='dgo-tick' id='tick-"+j+"'>";           				            	          	
        	contact += "<span><a href='javascript:void(0)' onclick='editContacting("+j+")'><img src='"+web_2_print_blogInfo+"css/img/icon/edit-1.png' title='edit' width=32 height=32 border=0></a> &nbsp;&nbsp;&nbsp;";
        	if(j == 0){
        		contact += "</span><input style='display:none' class='dgo-address-radio' type='radio' name='check-address' id='check-address-"+j+"' value='"+j+"'></div></div>";
        	}else{
        		contact += "<a href='javascript:void(0)' onclick='deleteAddressShopping("+j+")'><img src='"+web_2_print_blogInfo+"css/img/icon/trash.png' title='delete' width=32 height=32 border=0></a></span><input style='display:none' class='radio' type='radio' name='check-address' id='check-address-"+j+"' value='"+j+"'></div></div>";
        	}           	
        	j++;
            	
        }
       
        jQuery(".addressContainer").append(contact);
        if(result.ContactingAddress[0].Address.Forename != "" || result.ContactingAddress[0].Address.Surname != "" || result.ContactingAddress[0].Address.Street != "" || result.ContactingAddress[0].Address.City != ""){
        	CheckAddressShopping(0);
        }

	}
	
	//get contact for address book page
	if(dgoCurrentPage == 'addressBook'){
		if(result.ContactingAddress.length>1){
       		var contact = "";
        	var countryName = "";
        	var userAvatar = "";
        	var j = 1;
        	while(j<result.ContactingAddress.length){
	        	
	        	for(i=0;i<dgoCountryApi.length;i++){
	        		if(dgoCountryApi[i].Key == result.ContactingAddress[j].Address.CountryToken){
	        			countryName = "<span class='address-field-country'>"+dgoCountryApi[i].Name+"</span>"; 			
	        		}
	        	}
	        	
	        	//check firstname empty
	        	if(result.ContactingAddress[j].Address.Forename != ""){
	        		var firstname = "<span class='name-field-first-name'>"+result.ContactingAddress[j].Address.Forename+"</span><br>";
	        	}else{
	        		var firstname = "<span class='name-field-first-name'></span><br>";
	        	}
	        	
	        	//check lastname empty
	        	if(result.ContactingAddress[j].Address.Surname != ""){
	        		var lastname = "<span class='name-field-last-name'>"+result.ContactingAddress[j].Address.Surname+"</span><br><br>";
	        	}else{
	        		var lastname = "<span class='name-field-last-name'></span><br><br>";;
	        	}
	        	
	        	//check company empty
	        	if(result.ContactingAddress[j].Address.Company != ""){
	        		var company = "<span class='name-field-company'>"+result.ContactingAddress[j].Address.Company+"</span><br>";
	        	}else{
	        		var company = "<span class='name-field-company'></span><br>";
	        	}
	        	
	        	//check street empty
	        	if(result.ContactingAddress[j].Address.Street != ""){
	        		var street = "<span class='address-field-street'>"+result.ContactingAddress[j].Address.Street+"</span><br>";
	        	}else{
	        		var street = "<span class='address-field-street'></span><br>";
	        	}
	        	
	        	//check city empty
	        	if(result.ContactingAddress[j].Address.City != ""){
	        		var city = "<span class='address-field-city'>"+result.ContactingAddress[j].Address.City+"</span><br>";
	        	}else{
	        		var city = "<span class='address-field-city'></span><br>";
	        	}
	        	
	        	//check zipcode empty
	        	if(result.ContactingAddress[j].Address.ZipCode != ""){
	        		var zipcode = "<span class='address-field-zipcode'>"+result.ContactingAddress[j].Address.ZipCode+"</span><br>";
	        	}else{
	        		var zipcode = "<span class='address-field-zipcode'></span><br>";
	        	}
	        	
	        	//check phone exist
	        	if(result.ContactingAddress[j].Address.Telecommunication != undefined){
	        		var phone = jQuery('#transPhone').val()+": <span class='contact-field-phone'>"+result.ContactingAddress[j].Address.Telecommunication[0].Number+"</span><br>";
	        	}else{
	        		var phone = "<span class='contact-field-phone'></span><br>";
	        	}
	        	
	        	//check email empty
	        	if(result.ContactingAddress[j].Address.Email != undefined){
	        		var email = jQuery('#transEmail').val()+": <span class='contact-field-email'>"+result.ContactingAddress[j].Address.Email[0].Text+"</span><br>";
	        	}else{
	        		var email = "<span class='contact-field-email'></span><br>";
	        	}
	        	
	        	
	        	//check note empty
	        	if(result.ContactingAddress[j].Address.ObjectNote != undefined){
	        		var note = jQuery('#transNote').val()+": <span class='contact-field-note'>"+result.ContactingAddress[j].Address.ObjectNote.Text+"</span>";
	        	}else{
	        		var note = "<span class='contact-field-note'></span>";
	        	}
	        	if(result.ContactingAddress[j].Address.Uri == undefined){
		    		//check sexual
			    	if(result.ContactingAddress[j].Address.SalutationToken == "Male" || result.ContactingAddress[j].Address.SalutationToken == "Neutral"){
			    		userAvatar = web_2_print_blogInfo + "/css/img/boy_grau_avatar.jpg";
			    	}else{
			    		userAvatar = web_2_print_blogInfo + "/css/img/girl_grau_avatar.jpg";
			    	}	
		    	}else{
		    		userAvatar = result.ContactingAddress[j].Address.Uri[0].Text.substr(8,result.ContactingAddress[j].Address.Uri[0].Text.length);
		    	}
					
					contact	+= "<div class='contact-table-cell' id='"+j+"' onmouseover=showButton('"+j+"') onmouseout=hideButton('"+j+"')><div class='img-field' onclick='openUploadDialog("+j+");'><img src='"+userAvatar+"' width='80' height='80' title='"+jQuery('#trans-upload-avatar').val()+"'></div>";
	            	contact += "<div class='name-field'>"+firstname+lastname+company+"<div id=\""+j+"-delete\" class=\"button-edit-delete is-bottons\" onclick='deleteContact("+j+");'><span>"+jQuery('#trans-delete-button').val()+"</span></div></div>";		            		
	            	contact += "<div class='address-field'>"+street+city+zipcode+countryName+"</div>";
	            	contact += "<div class='contact-field'>"+phone+email+note+"</div>";
	            	contact += "<div class='button-field'><div id=\""+j+"-edit\" class=\"button-edit-delete is-bottons\" onclick='editContacting("+j+")'><span>"+jQuery('#trans-edit-button').val()+"</span></div></div>";
	            	contact += "</div>";           	
	            	j++;
	            	
            }
            
            jQuery("#all-contact-field").html(contact);
            jQuery("#changePassword").show();
            jQuery(".newAddress").show();
       }else{		  
            jQuery("#changePassword").show();
            jQuery(".newAddress").show();   		
       		jQuery("#all-contact-field").html("<div class='contact-table-cell' align='center'>"+jQuery('#transYouDontHave').val()+"!</div>");
       }
	}
	
	//get contact for account details page
	if(dgoCurrentPage == 'accountDetails'){
		var header = "";
   		var userAvatar = "";
   		var content = "";
   		var countryName = "";
   		
   		var selectCountry = "";
   		var selectCountryName = "";
   		var connections = "";
   		for(i=0;i<dgoCountryApi.length;i++){
   			
        		if(dgoCountryApi[i].Key == result.ContactingAddress[0].Address.CountryToken){				        			
        			selectCountryName = dgoCountryApi[i].Name;
        			selectCountry += dgoCountryApi[i].Name + ", "; 			
        		}else{
        			selectCountry += dgoCountryApi[i].Name + ", ";
        		}
        }
        
   		//header part
   		header += "<div class='account-details-main-address-head-left'>" + jQuery('#trans-account-details').val() + " - "+result.ClientNumber+"</div>";
   		header += "<div class='account-details-main-address-head-right'>" + jQuery('#trans-status').val() + ": Affiliate</div>";
   		
   		//main address part
   		if(result.ContactingAddress[0].Address.Uri == undefined){
   			if(result.ContactingAddress[0].Address.SalutationToken == "Male" || result.ContactingAddress[0].Address.SalutationToken == "Neutral"){
		    		userAvatar = web_2_print_blogInfo + "/css/img/boy_grau_avatar.jpg";
		    }else{
		    		userAvatar = web_2_print_blogInfo + "/css/img/girl_grau_avatar.jpg";
		    }
   		}else{
		    userAvatar = result.ContactingAddress[0].Address.Uri[0].Text.substr(8,result.ContactingAddress[0].Address.Uri[0].Text.length);
		}
		
		if(result.ContactingAddress[0].Address.Telecommunication != undefined){
			if(result.ContactingAddress[0].Address.Telecommunication[0].Number == ""){
				var phone = "";			
			}else{				
				var phone = result.ContactingAddress[0].Address.Telecommunication[0].Number;			
			}
		}
	    
	    //check firstname empty
    	if(result.ContactingAddress[0].Address.Forename != ""){
    		var firstname = result.ContactingAddress[0].Address.Forename;
    	}else{
    		var firstname = "";
    	}
    	
    	//check lastname empty
    	if(result.ContactingAddress[0].Address.Surname != ""){
    		var lastname = result.ContactingAddress[0].Address.Surname;
    	}else{
    		var lastname = "";
    	}
	    
	    //check street empty
    	if(result.ContactingAddress[0].Address.Street != ""){
    		var street = result.ContactingAddress[0].Address.Street;
    	}else{
    		var street = "";
    	}
	    
	    //check city empty
    	if(result.ContactingAddress[0].Address.City != ""){
    		var city = result.ContactingAddress[0].Address.City;
    	}else{
    		var city = "";
    	}    	
	        	
    	//check company empty
    	if(result.ContactingAddress[0].Address.Company != ""){
    		var company = result.ContactingAddress[0].Address.Company;
    	}else{
    		var company = "";
    	}
	
    	//check zipcode empty
    	if(result.ContactingAddress[0].Address.ZipCode != ""){
    		var zipcode = result.ContactingAddress[0].Address.ZipCode;
    	}else{
    		var zipcode = "";
    	}	  
	        	
		content += "<div class='account-details-main-address-head-content-img' onclick='openUploadDialog(0);'>";
		content += "<img src='"+userAvatar+"' width='80' height='80' alt='Avatar' title='Upload your avatar'></div>";
		content += "<div class='account-details-main-address-head-content-address'><b>" + jQuery('#trans-main-address').val() + ":</b><br>";
		content += "<span class='account-details-main-address-head-content-add-forename' title='Firstname'>"+firstname+"</span> <span class='account-details-main-address-head-content-add-surname' title='Lastname'>"+lastname+"</span><br>";
		content += "<span class='account-details-main-address-head-content-add-street' title='Street'>"+street+"</span><br>";
		content += "<span class='account-details-main-address-head-content-add-zipcode' title='ZipCode'>"+zipcode+"</span><br>";
		content += "<span class='account-details-main-address-head-content-add-city' title='City'>"+city+"</span><br></div>";
		content += "<div class='account-details-main-address-head-content-contact'><b>" + jQuery('#trans-contact').val() + ":</b><br>";
		content += "<span class='account-details-main-address-head-content-add-phone' title='Phone'>"+phone+"</span><br>";
		content += "<span class='account-details-main-address-head-content-add-email' title='Email'>"+result.ContactingAddress[0].Address.Email[0].Text+"</span><br>";
		content += "<span class='account-details-main-address-head-content-add-company' title='Company'>"+company+"</span><br><span class='account-details-main-address-head-content-add-country'>"+selectCountryName+"</span><br></div>";  
		content += "<div class='account-details-main-address-head-content-edit'><a href='javascript:void(0);'><img src='"+web_2_print_blogInfo+"/css/img/icon/edit-1.png' border='0'></a></div>";
		
		//content in connection
		connections += "<div class='account-details-connection-header'>" + jQuery('#trans-account-connection').val() + "</div>";
		
		if(result.ContactingSetting != undefined){
			var flag = false;
			for(i=0;i<result.ContactingSetting.length;i++){
				if(result.ContactingSetting[i].Key.substr(0,13) == "LoginProvider"){
					if(validateUser(result.ContactingSetting[i].Value) != false){
						var loginProvider 	= result.ContactingSetting[i].Key;
						var loginName 		= result.ContactingSetting[i].Value;
						connections += "<div class='account-details-connection'>";
						connections += "<div class='account-details-connection-img'><img src='"+web_2_print_blogInfo+"css/img/boy_grau_avatar.jpg' width='80' height='80'></div>";
						connections += "<div class='account-details-connection-email'>"+loginName+" "+jQuery('#trans-via').val()+" "+loginProvider.substr(14,loginProvider.length)+"</div><div class='is-bottons account-details-connection-button' onclick=settingConnection('"+loginProvider+"','"+loginName+"')>" + jQuery('#trans-settings').val() + "</div></div>";
						flag = true;
					}
					
				}
			}
			if(flag == false){
				connections += "<div class='account-details-connection'>" + jQuery('#trans-you-dont-have-connection').val() + "</div>";
			}
			
		}else{
			connections += "<div class='account-details-connection'>" + jQuery('#trans-you-dont-have-connection').val() + "</div>";
		}
		if(dgoPassword != 1){
			connections += "<div class='account-details-connection-bottom'><div class='is-bottons account-details-connection-bottom-change' id='changePassword' onclick='changePasswordAccount()'>" + jQuery('#trans-change-password').val() + "</div><div class='account-details-connection-bottom-divide'>" + jQuery('#trans-we-love').val() + "</div><div class='is-bottons account-details-connection-bottom-add' onclick='addAccountConnection()'>" + jQuery('#trans-add-connection').val() + "</div></div>";
		}else{
			connections += "<div class='account-details-connection-bottom'><div class='account-details-connection-bottom-divide'></div><div class='is-bottons account-details-connection-bottom-add' onclick='addAccountConnection()'>" + jQuery('#trans-add-connection').val() + "</div></div>";
		}
																
		//changePasswordAccount() in external_function.js
		jQuery('.account-details-main-address-head').html(header);
		jQuery('.account-details-main-address-head-content').html(content);
		jQuery('#account-details-tabs-1').html(connections);
		if(window.location.hash!=""){
			jQuery('.changePassForm').dialog('open');
			jQuery('.changePassForm').dialog({ position: 'center' });
		}else{
			//do nothing
		}
		jQuery('.account-details-main-address-head-content-edit').click(function(){
			jQuery('#forename').val(result.ContactingAddress[0].Address.Forename);
			jQuery('#surname').val(result.ContactingAddress[0].Address.Surname);
			jQuery('#company').val(result.ContactingAddress[0].Address.Company);
			jQuery('#street').val(result.ContactingAddress[0].Address.Street);
			jQuery('#city').val(result.ContactingAddress[0].Address.City);
			jQuery('#zipcode').val(result.ContactingAddress[0].Address.ZipCode);
			jQuery('#sexual').val(result.ContactingAddress[0].Address.SalutationToken);
			for(x in dgoCountryApi){
				if(dgoCountryApi[x].Key == result.ContactingAddress[0].Address.CountryToken){
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
			
			if(result.ContactingAddress[0].Address.Telecommunication!= undefined){
				jQuery('#phone').val(result.ContactingAddress[0].Address.Telecommunication[0].Number);
			}
			if(result.ContactingAddress[0].Address.Email!= undefined){
				jQuery('#email').val(result.ContactingAddress[0].Address.Email[0].Text);
			}
			
			
			if(result.ContactingAddress[0].Address.ObjectNote != undefined){
				jQuery('#addressNote').val(result.ContactingAddress[0].Address.ObjectNote.Text);
			}
			
			jQuery( '.addnewaddressForm' ).dialog('open');
			jQuery( '.addnewaddressForm' ).dialog({ position: 'center' });
		});
			
	}
	
	//get contact for account details page
	if(dgoCurrentPage == 'earnMoney'){
		var header = "";
   		var userAvatar = "";
   		var content = "";
   		var countryName = "";
   		
   		var selectCountry = "";
   		var selectCountryName = "";
   		var connections = "";
   		for(i=0;i<dgoCountryApi.length;i++){
   			
        		if(dgoCountryApi[i].Key == result.ContactingAddress[0].Address.CountryToken){				        			
        			selectCountryName = dgoCountryApi[i].Name;
        			selectCountry += dgoCountryApi[i].Name + ", "; 			
        		}else{
        			selectCountry += dgoCountryApi[i].Name + ", ";
        		}
        }
        
   		//header part
   		header += "<div class='account-details-main-address-head-left'>" + jQuery('#trans-account-details').val() + " - "+result.ClientNumber+"</div>";
   		header += "<div class='account-details-main-address-head-right'>" + jQuery('#trans-status').val() + ": Affiliate</div>";
   		
   		//main address part
   		if(result.ContactingAddress[0].Address.Uri == undefined){
   			if(result.ContactingAddress[0].Address.SalutationToken == "Male" || result.ContactingAddress[0].Address.SalutationToken == "Neutral"){
		    		userAvatar = web_2_print_blogInfo + "/css/img/boy_grau_avatar.jpg";
		    }else{
		    		userAvatar = web_2_print_blogInfo + "/css/img/girl_grau_avatar.jpg";
		    }
   		}else{
		    userAvatar = result.ContactingAddress[0].Address.Uri[0].Text.substr(8,result.ContactingAddress[0].Address.Uri[0].Text.length);
		}
		
		if(result.ContactingAddress[0].Address.Telecommunication != undefined){
			if(result.ContactingAddress[0].Address.Telecommunication[0].Number == ""){
				var phone = "";			
			}else{
				var phone = result.ContactingAddress[0].Address.Telecommunication[0].Number;			
			}
		}
		
	    //check firstname empty
    	if(result.ContactingAddress[0].Address.Forename != ""){
    		var firstname = result.ContactingAddress[0].Address.Forename;
    	}else{
    		var firstname = "";
    	}
    	
    	//check lastname empty
    	if(result.ContactingAddress[0].Address.Surname != ""){
    		var lastname = result.ContactingAddress[0].Address.Surname;
    	}else{
    		var lastname = "";
    	}
	    
	    //check street empty
    	if(result.ContactingAddress[0].Address.Street != ""){
    		var street = result.ContactingAddress[0].Address.Street;
    	}else{
    		var street = "";
    	}
	    
	    //check city empty
    	if(result.ContactingAddress[0].Address.City != ""){
    		var city = result.ContactingAddress[0].Address.City;
    	}else{
    		var city = "";
    	}       	
	        	
    	//check company empty
    	if(result.ContactingAddress[0].Address.Company != ""){
    		var company = result.ContactingAddress[0].Address.Company;
    	}else{
    		var company = "";
    	}
	
    	//check zipcode empty
    	if(result.ContactingAddress[0].Address.ZipCode != ""){
    		var zipcode = result.ContactingAddress[0].Address.ZipCode;
    	}else{
    		var zipcode = "";
    	}	  
	        	
		content += "<div class='account-details-main-address-head-content-img' onclick='openUploadDialog(0);'>";
		content += "<img src='"+userAvatar+"' width='80' height='80' alt='Avatar' title='Upload your avatar'></div>";
		content += "<div class='account-details-main-address-head-content-address'><b>" + jQuery('#trans-main-address').val() + ":</b><br>";
		content += "<span class='account-details-main-address-head-content-add-surname' title='Surname'>"+firstname+"</span> <span class='account-details-main-address-head-content-add-forename' title='Firstname'>"+lastname+"</span><br>";
		content += "<span class='account-details-main-address-head-content-add-street' title='Street'>"+street+"</span><br>";
		content += "<span class='account-details-main-address-head-content-add-zipcode' title='ZipCode'>"+zipcode+"</span><br>";
		content += "<span class='account-details-main-address-head-content-add-city' title='City'>"+city+"</span><br></div>";
		content += "<div class='account-details-main-address-head-content-contact'><b>" + jQuery('#trans-contact').val() + ":</b><br>";
		content += "<span class='account-details-main-address-head-content-add-phone' title='Phone'>"+phone+"</span><br>";
		content += "<span class='account-details-main-address-head-content-add-email' title='Email'>"+result.ContactingAddress[0].Address.Email[0].Text+"</span><br>";
		content += "<span class='account-details-main-address-head-content-add-company' title='Company'>"+company+"</span><br><span class='account-details-main-address-head-content-add-country'>"+selectCountryName+"</span><br></div>";  
		content += "<div class='account-details-main-address-head-content-edit'><a href='javascript:void(0);'><img src='"+web_2_print_blogInfo+"/css/img/icon/edit-1.png' border='0'></a></div>";
		
									
		//changePasswordAccount() in external_function.js
		jQuery('.account-details-main-address-head').html(header);
		jQuery('.account-details-main-address-head-content').html(content);
		
		jQuery('.account-details-main-address-head-content-edit').click(function(){
			jQuery('#forename').val(result.ContactingAddress[0].Address.Forename);
			jQuery('#surname').val(result.ContactingAddress[0].Address.Surname);
			jQuery('#company').val(result.ContactingAddress[0].Address.Company);
			jQuery('#street').val(result.ContactingAddress[0].Address.Street);
			jQuery('#city').val(result.ContactingAddress[0].Address.City);
			jQuery('#zipcode').val(result.ContactingAddress[0].Address.ZipCode);
			jQuery('#sexual').val(result.ContactingAddress[0].Address.SalutationToken);
			for(x in dgoCountryApi){
				if(dgoCountryApi[x].Key == result.ContactingAddress[0].Address.CountryToken){
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
			
			if(result.ContactingAddress[0].Address.Telecommunication!= undefined){
				jQuery('#phone').val(result.ContactingAddress[0].Address.Telecommunication[0].Number);
			}
			if(result.ContactingAddress[0].Address.Email!= undefined){
				jQuery('#email').val(result.ContactingAddress[0].Address.Email[0].Text);
			}
			
			
			if(result.ContactingAddress[0].Address.ObjectNote != undefined){
				jQuery('#addressNote').val(result.ContactingAddress[0].Address.ObjectNote.Text);
			}
			
			jQuery( '.addnewaddressForm' ).dialog('open');
			jQuery( '.addnewaddressForm' ).dialog({ position: 'center' });
		});
		
	}
}

//delete address in shopping card with not login case
function deleteAddressShoppingWithoutLogin(id){
	var dataString = "option=anonymous&action=delete&id="+id;
        	
	//delete address with id
	jQuery.ajax({
	   type: "GET",
	   url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
	   data: dataString,
	   dataType: "text",
	   success: function(data){
	   		if(!data.error){
	   			data = JSON2.parse(data);
	   			if(data != 'NoAddress'){
	   				jQuery('.payment-address span').html(jQuery('#transYourAddress-default-text').val());
	   				Func_Contact_ShowContactWithoutLogin(data);	
	   			}else{
	   				jQuery('.addressContainer').html('<div class="shopping-contact"><div class="shopping-contact-add is-bottons">'+jQuery('#trans-add-new-add').val()+'</div><div style="display: none;" class="shopping-contact-text-or">'+jQuery('.addressContainer .shopping-contact .shopping-contact-text-or').html()+'</div><div style="display: none;" class="shopping-contact-login-here is-bottons" onclick="openLoginFormDialog()">'+jQuery('.addressContainer .shopping-contact .shopping-contact-login-here').html()+'</div><div class="shopping-contact"></div></div>');
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
					
					if(jQuery('.addressContainer').children('div').length > 1){
		        		jQuery('.import-contact-search').hide();
		            	jQuery('.shopping-contact-login-here').hide();
		            	jQuery('.shopping-contact-text-or').hide();
		        	}else{
		        		jQuery('.import-contact-search').hide();
		            	jQuery('.shopping-contact-login-here').show();
		            	jQuery('.shopping-contact-text-or').show();
		        	}
	   			}
	   			
	   		}				   		   			   				
	   }
	});
}
//delete address
function deleteContact(id){
	if(id!=0){
		var r = confirm("Are you sure ?");
		if ( r == true )
	  	{
			dgoContacting.ContactingAddress.splice(id, 1);
			contacting_Update();//function in contacting_request_function.js
	  	}	
	}
}
//delete address in shopping cart
function deleteAddressShopping(id){
	if(id!=0){
		var r = confirm("Are you sure ?");
		if (r == true)
	  	{
			dgoContacting.ContactingAddress.splice(id, 1);
			contacting_Update();//function in contacting_request_function.js
			jQuery('#address-'+id).hide();			
	  	}
	}
}

//User Authentication
function userAuthentication(){
	if(jQuery("#login-username").val() != "" && jQuery("#login-password").val()!=""){
		var flag = validateUser(jQuery("#login-username").val());//function in dialog_function.js
		if(flag!=false && jQuery("#login-password").val().length>=6){
			jQuery.blockUI(0);
			dgoUsername = jQuery("#login-username").val();
			dgoPassword = hex_md5(jQuery("#login-password").val());			
			contacting_Authentication();
		}	
	}
}

//sort contact
function sortContacting(sortBy){
	if(dgoContacting != null){
		//sort by firtname
		if(sortBy == 'first-name'){
			var arrSort		 	= new Array();
			var tmp 			= new Array();
			
			for(var i=1;i<dgoContacting.ContactingAddress.length;i++){
				
				arrSort[i-1] = dgoContacting.ContactingAddress[i].Address.Forename + "-" + dgoContacting.ContactingAddress[i].Id;
			}
			arrSort = arrSort.sort();
		
			for(var i=0;i<arrSort.length;i++){
				for(var j=1;j<dgoContacting.ContactingAddress.length;j++){
					var subArr = arrSort[i].split("-"); 
					if(subArr[1] == dgoContacting.ContactingAddress[j].Id && subArr[0] == dgoContacting.ContactingAddress[j].Address.Forename){						
						tmp.push(dgoContacting.ContactingAddress[j]); 
					}
				}
			}
		
		}
		//sort by lastname
		if(sortBy == 'last-name'){
			var arrSort 	= new Array();
			var tmp 		= new Array();
			
			for(var i=1;i<dgoContacting.ContactingAddress.length;i++){
				arrSort[i-1] = dgoContacting.ContactingAddress[i].Address.Surname + "-" + dgoContacting.ContactingAddress[i].Id;
								
			}
			arrSort = arrSort.sort();
			
			for(var i=0;i<arrSort.length;i++){
				for(var j=1;j<dgoContacting.ContactingAddress.length;j++){
					var subArr = arrSort[i].split("-"); 
					if(subArr[1] == dgoContacting.ContactingAddress[j].Id && subArr[0] == dgoContacting.ContactingAddress[j].Address.Surname){						
						tmp.push(dgoContacting.ContactingAddress[j]); 
					}
				}
			}
			
		}
		//sort by company
		if(sortBy == 'company'){
			var arrSort 	= new Array();
			var tmp 		= new Array();
			
			for(var i=1;i<dgoContacting.ContactingAddress.length;i++){
				arrSort[i-1] = dgoContacting.ContactingAddress[i].Address.Company + "-" + dgoContacting.ContactingAddress[i].Id;
								
			}
			arrSort = arrSort.sort();
			
			for(var i=0;i<arrSort.length;i++){
				for(var j=1;j<dgoContacting.ContactingAddress.length;j++){
					var subArr = arrSort[i].split("-"); 
					if(subArr[1] == dgoContacting.ContactingAddress[j].Id && subArr[0] == dgoContacting.ContactingAddress[j].Address.Company){						
						tmp.push(dgoContacting.ContactingAddress[j]); 
					}
				}
			}
			
		}
		
		//sort by company
		if(sortBy == 'city'){
			var arrSort 	= new Array();
			var tmp 		= new Array();
			
			for(var i=1;i<dgoContacting.ContactingAddress.length;i++){
				arrSort[i-1] = dgoContacting.ContactingAddress[i].Address.City + "-" + dgoContacting.ContactingAddress[i].Id;
								
			}
			arrSort = arrSort.sort();
			
			for(var i=0;i<arrSort.length;i++){
				for(var j=1;j<dgoContacting.ContactingAddress.length;j++){
					var subArr = arrSort[i].split("-"); 
					if(subArr[1] == dgoContacting.ContactingAddress[j].Id && subArr[0] == dgoContacting.ContactingAddress[j].Address.City){						
						tmp.push(dgoContacting.ContactingAddress[j]); 
					}
				}
			}
		
		}
		PrintSortingContacting(tmp);//function in this page
	}
}

//Print sorting contacting
function PrintSortingContacting(tmp){
	jQuery('#all-contact-field').html("");

	//fill new contacting address
	var contact = "";
	var countryName = "";
	var userAvatar = "";
	var j = 0;
	
	while(j<tmp.length){
    	
    	for(i=0;i<dgoCountryApi.length;i++){
    		if(dgoCountryApi[i].Key == tmp[j].Address.CountryToken){
    			countryName = "<span class='address-field-country'>"+dgoCountryApi[i].Name+"</span>"; 			
    		}
    	}
    	
    	//check firstname empty
    	if(tmp[j].Address.Forename != ""){
    		var firstname = "<span class='name-field-first-name'>"+tmp[j].Address.Forename+"</span><br>";
    	}else{
    		var firstname = "<span class='name-field-first-name'></span><br>";
    	}
    	
    	//check lastname empty
    	if(tmp[j].Address.Surname != ""){
    		var lastname = "<span class='name-field-last-name'>"+tmp[j].Address.Surname+"</span><br>";
    	}else{
    		var lastname = "<span class='name-field-last-name'></span><br>";;
    	}
    	
    	//check company empty
    	if(tmp[j].Address.Company != ""){
    		var company = "<span class='name-field-company'>"+tmp[j].Address.Company+"</span><br>";
    	}else{
    		var company = "<span class='name-field-company'></span><br>";
    	}
    	
    	//check street empty
    	if(tmp[j].Address.Street != ""){
    		var street = "Address: <span class='address-field-street'>"+tmp[j].Address.Street+"</span><br>";
    	}else{
    		var street = "<span class='address-field-street'></span><br>";
    	}
    	
    	//check city empty
    	if(tmp[j].Address.City != ""){
    		var city = "<span class='address-field-city'>"+tmp[j].Address.City+"</span><br>";
    	}else{
    		var city = "<span class='address-field-city'></span><br>";
    	}
    	
    	//check zipcode empty
    	if(tmp[j].Address.ZipCode != ""){
    		var zipcode = "<span class='address-field-zipcode'>"+tmp[j].Address.ZipCode+"</span><br>";
    	}else{
    		var zipcode = "<span class='address-field-zipcode'></span><br>";
    	}
    	
    	//check phone exist
    	if(tmp[j].Address.Telecommunication != undefined){
    		var phone = "Phone: <span class='contact-field-phone'>"+tmp[j].Address.Telecommunication[0].Number+"</span><br>";
    	}else{
    		var phone = "<span class='contact-field-phone'></span><br>";
    	}
    	
    	//check email empty
    	if(tmp[j].Address.Email[0].Text != ""){
    		var email = "Email: <span class='contact-field-email'>"+tmp[j].Address.Email[0].Text+"</span><br>";
    	}else{
    		var email = "<span class='contact-field-email'></span><br>";
    	}
    	
    	
    	//check note empty
    	if(tmp[j].Address.ObjectNote.Text != ""){
    		var note = "Note: <span class='contact-field-note'>"+tmp[j].Address.ObjectNote.Text+"</span>";
    	}else{
    		var note = "<span class='contact-field-note'></span>";
    	}
    	
    	if(!tmp[j].Address.Uri){
    		//check sexual
	    	if(tmp[j].Address.SalutationToken == "Male" || tmp[j].Address.SalutationToken == "Neutral"){
	    		userAvatar = web_2_print_blogInfo + "/css/img/boy_grau_avatar.jpg";
	    	}else{
	    		userAvatar = web_2_print_blogInfo + "/css/img/girl_grau_avatar.jpg";
	    	}	
    	}else{
    		userAvatar = tmp[j].Address.Uri[0].Text.substr(8,tmp[j].Address.Uri[0].Text.length);
    	}
    	
    	
    		for(var n=0;n<dgoContacting.ContactingAddress.length;n++){
    			if(dgoContacting.ContactingAddress[n].Id == tmp[j].Id){
    				var key = n;
    			}
    		}
        	contact	+= "<div class='contact-table-cell' id='"+key+"' onmouseover=showButton('"+key+"') onmouseout=hideButton('"+key+"')><div class='img-field' onclick='openUploadDialog("+key+");'><img src='"+userAvatar+"' width='80' height='80' title='Upload avatar'></div>";
        	contact += "<div class='name-field'>"+firstname+lastname+company+"<div id=\""+key+"-delete\" class=\"button-edit-delete is-bottons\" onclick='deleteContact("+key+");'><span>Delete</span></div></div>";
        	contact += "<div class='address-field'>"+street+city+zipcode+countryName+"</div>";
        	contact += "<div class='contact-field'>"+phone+email+note+"</div>";
        	contact += "<div class='button-field'><div id=\""+key+"-edit\" class=\"button-edit-delete is-bottons\" onclick='editContacting("+key+")'><span>Edit</span></div></div>";
        	contact += "</div>";           	
        	j++;
        	
    }
	jQuery('#all-contact-field').html(contact);
	
}

//Edit contact
function editContactingWithoutLogin(id){
	dgoContactOptions = 'edit';
	dgoContactIdGlobal = id;
	var dataString = "option=anonymous&action=info";
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
	  	
	//save to session
	jQuery.ajax({
	   type: "GET",
	   url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
	   data: dataString,
	   dataType: "text",
	   success: function(data){
	   		if(!data.error){
	   			data = JSON2.parse(data);
	   			for(x in dgoCountryApi){
					if(dgoCountryApi[x].Key == data[id].Address.CountryToken){
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
				
	   			jQuery('#sexual').val(data[id].Address.SalutationToken);
				jQuery('#surname').val(data[id].Address.Surname);
				jQuery('#forename').val(data[id].Address.Forename);
				jQuery('#company').val(data[id].Address.Company);
				jQuery('#street').val(data[id].Address.Street);
				jQuery('#city').val(data[id].Address.City);
				jQuery('#zipcode').val(data[id].Address.ZipCode);
				
				if(data[id].Address.Telecommunication!= undefined){
					jQuery('#phone').val(data[id].Address.Telecommunication[0].Number);
				}
				if(data[id].Address.Email!= undefined){
					jQuery('#email').val(data[id].Address.Email[0].Text);
				}
				
				if(data[id].Address.ObjectNote != undefined){
					jQuery('#addressNote').val(data[id].Address.ObjectNote.Text);
				}
				if(data[id].Password != undefined){
					jQuery('.add-info-password').css({"display":"block"});
					jQuery('#password').val(data[id].Password);
					
				}
				
				//jQuery('.addressForm').dialog('open');	   			
				jQuery('.addnewaddressForm').dialog('open');	   			
				jQuery('.addnewaddressForm').dialog({ position: 'center' });   			
	   		}				   		   			   				
	   }
	});
	
    
}

//Edit contact
function editContacting(id){
	dgoContactOptions = 'edit';
	dgoContactIdGlobal = id;
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
	
	for(x in dgoCountryApi){
		if(dgoCountryApi[x].Key == dgoContacting.ContactingAddress[id].Address.CountryToken){
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
    jQuery('#sexual').val(dgoContacting.ContactingAddress[id].Address.SalutationToken);
	jQuery('#surname').val(dgoContacting.ContactingAddress[id].Address.Surname);
	jQuery('#forename').val(dgoContacting.ContactingAddress[id].Address.Forename);
	jQuery('#company').val(dgoContacting.ContactingAddress[id].Address.Company);
	jQuery('#street').val(dgoContacting.ContactingAddress[id].Address.Street);
	jQuery('#city').val(dgoContacting.ContactingAddress[id].Address.City);
	jQuery('#zipcode').val(dgoContacting.ContactingAddress[id].Address.ZipCode);
	if(dgoContacting.ContactingAddress[id].Address.Telecommunication!= undefined){
		jQuery('#phone').val(dgoContacting.ContactingAddress[id].Address.Telecommunication[0].Number);
	}
	if(dgoContacting.ContactingAddress[id].Address.Email!= undefined){
		jQuery('#email').val(dgoContacting.ContactingAddress[id].Address.Email[0].Text);
	}
	
	
	if(dgoContacting.ContactingAddress[id].Address.ObjectNote != undefined){
		jQuery('#addressNote').val(dgoContacting.ContactingAddress[id].Address.ObjectNote.Text);
	}
	
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
		//jQuery('.addressForm').dialog('open');	   			
		jQuery('.addnewaddressForm').dialog('open');
		jQuery('.addnewaddressForm').dialog({ position: 'center' });
}

//function add new address (without login)
function AddressWithOutLogin(address, option){
	//create a new api object
	var api = new delivergo.api.contact();    
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
	api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.CheckEmailExists(jQuery('#email').val(), 
    	function(result){
    		if(result.Value == 'NotFound'){
    			var newAddress = JSON2.stringify(address);
				if(option == 'edit'){
					var dataString = "newAdd=" + newAddress + "&option=anonymous&action=edit&id="+dgoContactIdGlobal;	
				}							
				if(option == 'add'){
					var dataString = "newAdd=" + newAddress + "&option=anonymous&action=add";
				}

	        	//save to session
	        	jQuery.ajax({
				   type: "GET",
				   url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
				   data: dataString,
				   dataType: "text",
				   success: function(data){
				   		if(!data.error){
				   			data = JSON2.parse(data);				   			
				   			if(data != "Found"){					   			
					   			Func_Contact_ShowContactWithoutLogin(data);
					   			
					   			//hide error email message
					   			jQuery('.address-email-content-message').html('');				
								jQuery('.add-info-email-message').hide();
					   			jQuery('.address-name-email').removeClass('address-input-check');
								jQuery('.address-name-email .address-check').removeClass('check-img-false');
					   			//close add new address dialog
					   			jQuery('.addnewaddressForm').dialog('close');
					   		}else{
					   			var message = '';
					   			message += '<div class="errorMessage-container">';
							    message += '<div class="errorMessage-label">'+jQuery('#popup-trans-email').val()+':</div><div class="errorMessage-text">'+jQuery('#popup-trans-email-exist').val()+'</div>';
							    message += '</div>';
							    
							    //show error email message
							    jQuery('.address-name-email').addClass('address-input-check');
								jQuery('.address-name-email .address-check').addClass('check-img-false');
								jQuery('.address-email-content-message').html(message);				
								jQuery('.add-info-email-message').show();					   			
					   		}
				   		}				   		   			   				
				   }
				});
    		}else{
    			jQuery( ".dgo-errorMessage" ).dialog('open');  
    			jQuery( ".dgo-errorMessage" ).dialog({ position: 'center' });
    			
    			if(globalLanguage == "DE"){
			    	jQuery('.errorMessage-forgot-button').css('line-height','20px');
			    	jQuery('.errorMessage-use-button').css('line-height','20px');
			    }
    		}
    	});
}
function MakeNewAddress(key,loginProvider,firstName,lastName){
	var date = new Date()
	var gmtInMinutes = -date.getTimezoneOffset();
	
	for(var i in dgoTimeZones){
		if(dgoTimeZones[i].UtcOffsetInMinutes == gmtInMinutes && dgoTimeZones[i].SupportsDaylightSaving == undefined){
			jQuery('#openid-timezones').val(dgoTimeZones[i].Id);
		}
	}
	jQuery( "#openid-email" ).val(loginProvider);
	jQuery( "#openid-id" ).val(loginProvider);
	jQuery( "#openid-loginprovifer" ).val(key);
	jQuery( "#openid-surname" ).val(lastName);
	jQuery( "#openid-forename" ).val(firstName);
	jQuery( ".addNewContactViaOpenId" ).dialog("open");
	jQuery( ".addNewContactViaOpenId" ).dialog({ position: 'center' });
	
}

//show all address in addressBook page
function showAllContactingAddress(){
	jQuery('#all-contact-field').find('.contact-table-cell').each(function(){          
    	  jQuery(this).show();
}); 
}

//show all address in import from Google dialog
function showAll(){
	
	jQuery('#import-contacting-content').find('.import-contact-item').each(function(){ 
		if(jQuery(this).children('.dgo-tick-import').children('.hidden').val() < 0){		 
			jQuery(this).show(); 
		} 	
	});
}

//show all address in import from Linkedin dialog
function showAllLinkedin(){
	jQuery('#import-contacting-linkedin-content').find('.import-contact-linkedin-item').each(function(){
		if(jQuery(this).children('.dgo-tick-import-linkedin').children('.hidden').val() < 0){
			jQuery(this).show();
		}
	});
}

//Select all Google address to import
function selectAll(numberContact){
	for(var i=0;i<numberContact;i++){
		jQuery("#check-"+i).val(i);
		jQuery("#check-"+i).attr('checked', true);
		jQuery("#tick-"+i).show();
	}
}

//Unselect all Google address 
function none(numberContact){
	for(var i=0;i<numberContact;i++){
		jQuery("#check-"+i).val(-1);
		jQuery("#check-"+i).attr('checked', false);
		jQuery("#tick-"+i).hide();
	}
}

//Select all Linkedin address to import
function selectAllLinkedin(numberContact){
	for(var i=0;i<numberContact;i++){
		jQuery("#check-linkedin-"+i).val(i);
		jQuery("#check-linkedin-"+i).attr('checked', true);
		jQuery("#tick-linkedin-"+i).show();
	}
}

//Unselect all Linkedin address
function noneLinkedin(numberContact){
	for(var i=0;i<numberContact;i++){
		jQuery("#check-linkedin-"+i).val(-1);
		jQuery("#check-linkedin-"+i).attr('checked', false);
		jQuery("#tick-linkedin-"+i).hide();
	}
}

//select one Google address
function tick(id){
		if(jQuery("#check-"+id).val() == -1){
			jQuery("#check-"+id).val(id);
			jQuery("#check-"+id).attr('checked', true);
			jQuery("#tick-"+id).show();	
		}else{
			jQuery("#check-"+id).val(-1);
			jQuery("#check-"+id).attr('checked', false);
			jQuery("#tick-"+id).hide();
		}
}

//Select one Linkedin address
function tickLinkedin(id){
		if(jQuery("#check-linkedin-"+id).val() == -1){
			jQuery("#check-linkedin-"+id).val(id);
			jQuery("#check-linkedin-"+id).attr('checked', true);
			jQuery("#tick-linkedin-"+id).show();	
		}else{
			jQuery("#check-linkedin-"+id).val(-1);
			jQuery("#check-linkedin-"+id).attr('checked', false);
			jQuery("#tick-linkedin-"+id).hide();
		}
}

//Import google address into contacting address
function importGoogleDirect(id){
	tick(id);
	var a = {
			   "Id": 0,
			   "Active": true,
			   "Address":{
			   "Id": 0,
	           "Active": true,
	           "City": "",
	           "Company": "",
	           "CountryToken": "DE",
	           "Email":[
	              {
	              	 "Id": 0,
	                 "Active":true,
	                 "Text":jQuery('#import-contact-item-'+id).children('.import-contact-item-content').children('.import-contact-item-email').html()
	              }
	           ],
	           "Forename":jQuery('#import-contact-item-'+id).children('.import-contact-item-content').children('.import-contact-item-name').html(),
	           "GreetingToken":"Formal",
	           "ObjectNote":{
	           	  "Id":0,
	              "Text": ""
	           },
	           "SalutationToken": "Male",
	           "Street": jQuery('#import-contact-item-'+id).children('.import-contact-item-content').children('.import-contact-item-street').html(),
	           "Surname": "",
	           "Telecommunication":[
	              {
	              	 "Id": 0,
	                 "Active": true,
	                 "Number": jQuery('#import-contact-item-'+id).children('.import-contact-item-content').children('.import-contact-item-phone').html(),
	                 "TypeToken": "Phone"
	              }
	           ],
	           "ZipCode": ""
	        }
			};			
	dgoContacting.ContactingAddress.push(a);
	contacting_Update(); //function in contacting_request_funciton.js
	jQuery('#import-contact-item-'+id).hide(1500);
}

//Import linkedin address into contacting address
function importLinkedinDirect(id){
	tickLinkedin(id);
	var a = {
			   "Id": 0,
			   "Active": true,
			   "Address":{
			   "Id": 0,
	           "Active": true,
	           "City": jQuery('#import-contact-linkedin-item-'+id).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-city').html(),
	           "Company": "",
	           "CountryToken": jQuery('#import-contact-linkedin-item-'+id).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-country').html(),
	           "Email":[
	              {
	              	 "Id": 0,
	                 "Active":true,
	                 "Text":jQuery('#import-contact-linkedin-item-'+id).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-email').html()
	              }
	           ],
	           "Forename":jQuery('#import-contact-linkedin-item-'+id).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-first-name').html(),
	           "GreetingToken":"Formal",
	           "ObjectNote":{
	           	  "Id":0,
	              "Text": ""
	           },
	           "SalutationToken": "Male",
	           "Street": jQuery('#import-contact-linkedin-item-'+id).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-street').html(),
	           "Surname": jQuery('#import-contact-linkedin-item-'+id).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-last-name').html(),
	           "Telecommunication":[
	              {
	              	 "Id": 0,
	                 "Active": true,
	                 "Number": jQuery('#import-contact-linkedin-item-'+id).children('.import-contact-linkedin-item-content').children('.import-contact-linkedin-item-phone').html(),
	                 "TypeToken": "Phone"
	              }
	           ],
	           "ZipCode": ""
	        }	
			};			
	dgoContacting.ContactingAddress.push(a);
	contacting_Update(); //function in contacting_request_funciton.js
	jQuery('#import-contact-linkedin-item-'+id).hide(1500);
}

function AssignThumbnailsToUser(contactingGuid, imageType, portal, imageObject){
	var api = new delivergo.api.contact();   
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = portal == undefined ? globalPortal : portal; 
	
	api.IsDev = globalIsDev;
    
	api.Request.Value = imageObject;
	
    api.AssignThumbnailsToUser(contactingGuid, imageType,
    	function(result){
    		amountPicturesToCount++;
    		
    		if(amountPicturesToCount >= amountPicturesToCount){
				if(dgoCurrentPage == "productDetails"){					
					//unblock screen
					jQuery.unblockUI();
				}else{
					//submit form to go to order confirmation
					//leave object to hidden input
					jQuery('#prices-import').val(JSON2.stringify(global_price_object[order_price_chosen]));
					
					//submit form
					jQuery('#multiSelectSubmitForm').submit();
				}    			
    		}
    });
}

function MoveThumbnailsFromOneAccToAnother(contactingGuid, portal, imageObject){
	var api = new delivergo.api.contact();   
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = portal == undefined ? globalPortal : portal; 
	
	api.IsDev = globalIsDev;
    
	api.Request.Value = imageObject;
	
	api.MoveThumbnailsFromOneAccToAnother(contactingGuid, function(result){
			jQuery('#orderSubmitForm').submit();
	});
}

function UpdateThumbnailsFromUser(thumbId, portal, options){
	var api = new delivergo.api.contact();   
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = portal == undefined ? globalPortal : portal; 
	
	api.IsDev = globalIsDev;
    
	api.Request.Value = new Array();
	api.Request.Value.push(dgoThumbsArray[thumbId]);
	
    api.UpdateThumbnailsFromUser(function(result){
    	jQuery.unblockUI();    	    	
    	var id = jQuery('.current-motive-id').val();
    	
    	if(options == "save"){
    		jQuery( ".myproduct-hover-popup" ).dialog('close');
        	
        	if(result.Value[0].ThumbnailTranslation != undefined){
    	    	for(var i = 0;i < result.Value[0].ThumbnailTranslation.length;i++){
    				if(result.Value[0].ThumbnailTranslation[i].LanguageToken == globalLanguage){
    					jQuery('#myproduct-'+id+' .center-info-name').html(result.Value[0].ThumbnailTranslation[i].Name);
    					jQuery('#myproduct-'+id+' .center-info-des').html(result.Value[0].ThumbnailTranslation[i].Description);
    					break;
    				}else if(i == result.Value[0].ThumbnailTranslation.length - 1){
    					jQuery('#myproduct-'+id+' .center-info-name').html(result.Value[0].ThumbnailTranslation[i].Name);
    					jQuery('#myproduct-'+id+' .center-info-des').html(result.Value[0].ThumbnailTranslation[i].Description);
    				}
    		    }			    	    		
        	}
			
			if(result.Value[0].ThumbnailSetting != undefined){
				for(var i = 0;i < result.Value[0].ThumbnailSetting.length;i++){
					if(result.Value[0].ThumbnailSetting[i].Key == 'Api.Metadata.ReviewState'){
						jQuery('#myproduct-'+id+' .center-info-article-status').html(result.Value[0].ThumbnailSetting[i].Value);
					}
					
					if(result.Value[0].ThumbnailSetting[i].Key == 'Api.Metadata.Visibility'){
						for(var j = 0;j < dgoMotifSharing.ChildTokens.length;j++){
							if(result.Value[0].ThumbnailSetting[i].Value == dgoMotifSharing.ChildTokens[j].Token){
								jQuery('#myproduct-'+id+' .center-info-article-sharing').html(dgoMotifSharing.ChildTokens[j].SystemTokenTranslation[0].Name);
							}
						}
					}
				}
			}
			
			if(result.Value[0].ThumbnailCategory != undefined){
				var categoryHtml = '';
				for(var i = 0;i < result.Value[0].ThumbnailCategory.length;i++){
					for(var j = 0;j < dgoMotifCategory.ChildCategories.length;j++){
						if(result.Value[0].ThumbnailCategory[i].IdCategory == dgoMotifCategory.ChildCategories[j].Id){
							categoryHtml += dgoMotifCategory.ChildCategories[j].CategoryTranslation[0].Name + ', ';
						}
					}
				}
				//fill categories to creat / edit motive dialog
				jQuery('.center-details-category').html(categoryHtml);
				jQuery('.center-details-category').attr('title',categoryHtml);
				//close add category dialog
				jQuery('.popup-add-category').dialog('close');
			}
    	}
    	
    	if(options == "add-keyword"){
    		keywords = '';
    		for(var i = 0;i < result.Value[0].ThumbnailSetting.length;i++){
				if(result.Value[0].ThumbnailSetting[i].Key == 'Api.Metadata.Keyword.'+globalLanguage){
					keywords += result.Value[0].ThumbnailSetting[i].Value + ', ';
				}
			}
    		
    		jQuery('.center-details-keywords').html(keywords);
    		jQuery('#myproduct-'+id+' .center-info-keyword').html(keywords);
    		
    	}
    	    	
    	
    });
}
//getMotivPrices(fileName, "Upload", resaleGuidUser)
function getMotivPrices(fileName, type, resaleUnitId){
	var api = new delivergo.api.contact();   
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = 'normprint'; 
	
	api.IsDev = true;
	
	articleId = (type == "Upload" ? "08aaca47-9341-4045-962d-0ebf0e3b1b56" : "2ad8263c-2d0e-4cb7-a91f-a76697fd5037");
    
    api.GetMotivPrices(fileName, articleId, resaleUnitId, function(result){
    	
    });
}
//GetThumbnailsFromUser("Upload", 100, "normprint")
function GetThumbnailsFromUser(imageType, amount, portal){
	var api = new delivergo.api.contact();   
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = portal == undefined ? globalPortal : portal; 
	
	api.IsDev = globalIsDev;
    
	api.Request.Value = {
							"Type": imageType,
							"Language": globalLanguage,
							"Pagesize": amount,
							"PageNumber": 1,
							"IdPortal": PortalGuid
						};
	
    api.GetThumbnailsFromUser(dgoGuid, function(result){
    		
    });
}