				   dgoCaptchaCode 			= '{captchaCode}'; 
				   dgoCurrentPage 			= 'activationAccount';
				   var GuidActive 		    = '{guidActive}';
				   var ActiveCode     		= '{codeActive}';
									  
				   if(GuidActive != ''){	
				   		var arrCookies 			= document.cookie.split(";");
				   		var flagExistCookies 	= false;
				   		for(var x=0; x < arrCookies.length; x++){	
				   				   			
				   			if(arrCookies[x].substr(0,6) == "YOURIP"){
				   				flagExistCookies 	= true;				   				
				   				var tmp 			= arrCookies[x].split("=");				   				
				   				
			   					//create a new api object
								var api = new delivergo.api.contact();    
		
								if(globalPortalUri != null)
									api.PortalUriBase = globalPortalUri;
								
								//change portal for nhain.vn
								api.PortalNameSpace = globalPortal; 
								
								//change portal
								api.IsDev = globalIsDev;
								
								//change the URL to ajaxproxy file    
							    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
								
								//change apiKey
								api.ApiKey = GuidActive;
								
								api.GetViaGuid( 
									function(result){
										jQuery('#activation-email').val(result.Value.ContactingAddress[0].Address.Email[0].Text);					   						
				   						jQuery('#activation-code').val(ActiveCode);				   					
										if(result.Value.Active != true){
											if(tmp[1] >= 3){
												jQuery('#captcha-item-id').css("display","block");  									   									   														   									   					
												jQuery('#captcha-input-item-id').css("display","block");  									   									   														   									   					
												jQuery('#button-item-id').css("display","block");  									   									   														   									   					
					   						}else{
					   							if(result.Value.ActivationKey == ActiveCode){
					   								jQuery('#activation-email').attr('readonly','readonly');
				   									jQuery('#activation-code').attr('readonly','readonly');
													result.Value.Active = true;
													contacting_Active(result.Value);
												}else{
													//fix getJson on IE
													if (jQuery.browser.msie && window.XDomainRequest) {
											            // Use Microsoft XDR
											            var xdr = new XDomainRequest();
											            xdr.open("get", "http://hdsjsonip.appspot.com/?json");  
													    xdr.onload = function() {
													  		data = JSON2.parse(xdr.responseText);
													  		
													  		//show error message
														    jQuery('#errorActivationCode').removeClass('success');
															jQuery('#activation-code').removeClass('success');
															jQuery('#errorActivationCode').html('Activation Code is wrong');
															jQuery('#errorActivationCode').addClass('error');
															jQuery('#activation-code').addClass('error');
																															  	
														  	var ARRcookies = document.cookie.split(";");
															for (var i=0;i < ARRcookies.length;i++)
															  {
															  	if(ARRcookies[i].substr(0,6) == "YOURIP"){
															  		var tmp 	= ARRcookies[i].split("=");//eg YOURIP|192.168.1.1=1										  	
															  		var tmpCo	= tmp[0].split("|");// eg YOURIP|192.168.1.1
														  		
																  	if(tmpCo[1] == data.ip){										  		
															    		document.cookie = tmp[0] + "=" + (tmp[1] * 1 + 1);// increase 1 if 													    		
																  	}										  												  		
															  	}
															  }	
													    }          
											            xdr.send();
											        }else {
														jQuery.getJSON("http://hdsjsonip.appspot.com/?json",{},
														  function(data) {
														    //show error message
														    jQuery('#errorActivationCode').removeClass('success');
															jQuery('#activation-code').removeClass('success');
															jQuery('#errorActivationCode').html('Activation Code is wrong');
															jQuery('#errorActivationCode').addClass('error');
															jQuery('#activation-code').addClass('error');
																															  	
														  	var ARRcookies = document.cookie.split(";");
															for (var i=0;i < ARRcookies.length;i++)
															  {
															  	if(ARRcookies[i].substr(0,6) == "YOURIP"){
															  		var tmp 	= ARRcookies[i].split("=");//eg YOURIP|192.168.1.1=1										  	
															  		var tmpCo	= tmp[0].split("|");// eg YOURIP|192.168.1.1
														  		
																  	if(tmpCo[1] == data.ip){										  		
															    		document.cookie = tmp[0] + "=" + (tmp[1] * 1 + 1);// increase 1 if 													    		
																  	}										  												  		
															  	}
															  }												  													  	
														});
													}
												}																			
					   						}	
					   						
										}else{
											alert('Account is already activated');
											jQuery( ".loginForm" ).dialog('open');
										}
																				
								});
								
							    api.OnError = function(error) {
							      api.Log(error);
							    };
							            
							    api.OnWarning = function(warning) {
							      api.Log(warning.Text);
							    }; 	
				   				
				   			} 
				   		}	 
				   		
				   		if(flagExistCookies == false){
				   			//fix getJson on IE
							if (jQuery.browser.msie && window.XDomainRequest) {
					            // Use Microsoft XDR
					            var xdr = new XDomainRequest();
					            xdr.open("get", "http://hdsjsonip.appspot.com/?json");  
							    xdr.onload = function() {
							  		data = JSON2.parse(xdr.responseText);
							  		document.cookie = "YOURIP|" + data.ip + "=1";// eg YOURIP|192.168.1.1=1							  		
							    }          
					            xdr.send();
					        }else {
								jQuery.getJSON("http://hdsjsonip.appspot.com/?json",{},function(data) {
		   							document.cookie = "YOURIP|" + data.ip + "=1";// eg YOURIP|192.168.1.1=1		   							
		   						});
							}
							
							//create a new api object
							var api = new delivergo.api.contact();    
	
							if(globalPortalUri != null)
								api.PortalUriBase = globalPortalUri;
							
							//change portal for nhain.vn
							api.PortalNameSpace = globalPortal; 
							
							//change portal
							api.IsDev = globalIsDev;
							
							//change the URL to ajaxproxy file    
						    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
							
							//change apiKey
							api.ApiKey = GuidActive;
							
							api.GetViaGuid( 
								function(result){
								jQuery('#activation-email').val(result.Value.ContactingAddress[0].Address.Email[0].Text);					   						
			   						jQuery('#activation-code').val(ActiveCode);				   					
									if(result.Value.Active != true){
			   							if(result.Value.ActivationKey == ActiveCode){
			   								jQuery('#activation-email').attr('readonly','readonly');
		   									jQuery('#activation-code').attr('readonly','readonly');
											result.Value.Active = true;
											contacting_Active(result.Value);
										}else{
										    jQuery('#errorActivationCode').removeClass('success');
											jQuery('#activation-code').removeClass('success');
											jQuery('#errorActivationCode').html('Activation Code is wrong');
											jQuery('#errorActivationCode').addClass('error');
											jQuery('#activation-code').addClass('error');
										}																								   						
									}else{
										alert('Account is already activated');
										jQuery( ".loginForm" ).dialog('open');
									}
							});		   			
				   		}									
					}else{
						//fix getJson on IE
						if (jQuery.browser.msie && window.XDomainRequest) {
				            // Use Microsoft XDR
				            var xdr = new XDomainRequest();
				            xdr.open("get", "http://hdsjsonip.appspot.com/?json");  
						    xdr.onload = function() {
						  		data = JSON2.parse(xdr.responseText);
						  		jQuery('#captcha-item-id').css("display","block");  									   									   														   									   					
								jQuery('#captcha-input-item-id').css("display","block");  									   									   														   									   					
								jQuery('#button-item-id').css("display","block"); 
						    }          
				            xdr.send();
				        }else {
							jQuery.getJSON("http://hdsjsonip.appspot.com/?json",{},function(data) {
	   							jQuery('#captcha-item-id').css("display","block");  									   									   														   									   					
								jQuery('#captcha-input-item-id').css("display","block");  									   									   														   									   					
								jQuery('#button-item-id').css("display","block"); 
	   						});
						}		
						
					}