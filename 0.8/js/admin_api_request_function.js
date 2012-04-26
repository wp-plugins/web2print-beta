function apiGetPortalFromPhp(result){
	PortalName = result.Value.Info.PortalTranslation[0].Name;
			
	//show portal name
	jQuery('.postal-affiliate').html(result.Value.Info.PortalTranslation[0].Name); 
}

//======================================================================================================
//function get portal
function apiGetPortal(){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//get portal
	api.GetPortal( globalLanguage,
    	function(result){
			apiGetPortalFromPhp(result);	
    	}
    );
}

//function get available article
function w2pArticleGet(idGroup){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?d=1&u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	api.ApiKey = defaultAffid;
	
	//get article from api
    api.GetAvailableArticles(resaleUnitid, globalLanguage,
    	function(result){
    		//article_group_sort
        	article_group_arr = ArticleDecentralization(result.Value);
        	
        	if(idGroup != undefined){
        		widgetOverviewShow(article_group_arr, idGroup);
        	}
    	});
}

//function get material from API
function w2pMaterialGet( matchcode, identifier, callback ){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?d=1&u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	api.ApiKey = defaultAffid;
	
	//add article
	api.AddArticle(resaleUnitid, matchcode, identifier, globalLanguage);
	
	//get materials
	api.GetMaterials(
	    function(result){
			callback(result);	    		
		}, true);
}

/*Get formats from api*/
function w2pFormatsGet( matchcode, callback ){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?d=1&u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	api.ApiKey = defaultAffid;
	
	api.GetFormats(function(result){
		callback(result);
	}, globalLanguage, matchcode, null, null);
}

function w2pPriceGet(matchcode, identifier, material, formatArr, callback){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?d=1&u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	api.ApiKey = defaultAffid;
	
	api.Request.Header.Currency = globalCurrencyToken;
	api.Request.Order.Shipment.ShipTo.Country = globalCountry;
	
	//resale guid setting
    api.Request.Order.ResaleUnitId = resaleUnitid;
	
	for(var i = 0; i < formatArr.length; i++){
		//add article
		api.AddArticle(resaleUnitid, matchcode, identifier, globalLanguage);	
		var article = api.GetArticle(i);
		
		//set material
		article.Material = material;
		
		//set dimension
        article.PageLengthOpen = formatArr[i].forheight;
        article.PageWidthOpen = formatArr[i].forwidth;
        
        if(formatArr[i].fordepth != undefined){
        	article.PageDepthOpen = formatArr[i].fordepth;
        }
	}
	
	api.Calculate(
    	function(result){
    		callback(result);
    	}, true);
}

//function affiliate check exist plugin user
function affiliateCheckExist(){
	//create a new api object
    var api = new delivergo.api.admin();
    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
							
    //change portal
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
        
    //change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //get country from api
    api.AffiliateCheck( jQuery('#affiliate-id').val(), 
        function (result) {  
        	if(result.Value == "NotFound"){
        		api.Log("Username does not exist");
        		
        		//function reset input
        		inputDivReset('config-content-left');
        	}          
        }
    );
}

//function affiliate Authentication
function affiliateAuthentication(){
	var api = new delivergo.api.admin();
    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	var affiliate_id = jQuery('#affiliate-id').val();
    var pass_word 	 = hex_md5(jQuery('#affiliate-pass').val());
    
    var authenObject = {
		"Guid": affiliate_id,
        "Password": pass_word
  	}
    
    api.Request.Value = authenObject;
    
    //change portal
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
        
    //change the URL to ajaxproxy file
	api.AjaxProxy 	= web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
	
	api.Authenticate(
        function (result) {		
			jQuery.unblockUI();
        	if(result.Value.ContactingAddress){
        		jQuery('.current-language').val(result.Value.LanguageToken);
        		jQuery('.current-currency').val(result.Value.CurrencyToken);
        		
        		for(var i = 0;i < result.Value.ContactingSetting.length;i++){
        			if(result.Value.ContactingSetting[i].Key == "Api.MaxNumOfResaleUnits"){
        				jQuery('.MaxNumOfResaleUnits').val(result.Value.ContactingSetting[i].Value);
        				//submit form
        				jQuery('#affiliateLoginForm').submit();
        				break;
        			}        			
        		}

        	}else{
        		if(result.Value.AuthenticationStatus == "WrongPassword"){
					jQuery('.admin-affiliate-message-error').empty();
					jQuery('.admin-password-message-error').html('Password is wrong');
        		}
				
				if(result.Value.AuthenticationStatus == "NotFound"){
					jQuery('.admin-password-message-error').empty();
					jQuery('.admin-affiliate-message-error').html('Affiliate is incorrect');
        		}
        	}
        }
    );
}

/*function Check login provider from api*/
function contactingLoginViaProvider(settingKey,settingValue){	
	
	var api = new delivergo.api.contact();
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    api.GetViaProvider(settingKey,settingValue,
    	function(result){
    	
    	})
}

function contactingGet_handle(result, salesStatistic){
	dgoContacting = result.Value;
	
	if(salesStatistic == undefined){
		getAffiliateSales(profile_user['resaleGuid'], null, null);	
	}else{
		getAffiliateSales_handle(salesStatistic);
	}	
	
	Username = result.Value.Login;	
	//set default value for percentage
	dgoDefaultPercentage = result.Value.Discount.DiscountEntry[0].Percentage;
	
	//fill the user affiliate...
	jQuery('.user-affiliate').html(result.Value.Login);
				
	//show portal name
	jQuery('.postal-affiliate').html(globalPortal);
	
	if(visibilityCalculator == false || visibilityCalculator == "false"){
		jQuery('.visibility-status').html(jQuery('#visibility-status-public').val());
	}else{
		jQuery('.visibility-status').html(jQuery('#visibility-status-private').val());
	}
	
	//fill the active affiliate...
	var tempTime = result.Value.Created.ParseRfcDate();
		tempTime = tempTime.format("dd.mm.yyyy - hh:MM:ss");
	var affiliate_created = tempTime;
	jQuery('.active-time-affiliate').html(affiliate_created);        	
			
	//affiliate level
	var discountEntry = result.Value.Discount.DiscountEntry;
	for(var i = 0; i < discountEntry.length; i++){
		affiliate_level[ discountEntry[i].IdArticleGroup ] = discountEntry[i].Percentage;
	}  
}

//admin exist contacting get
function contactingGet( guid ){	
	
	//create a new api object
    var api = new delivergo.api.contact();
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
    
    //change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.ApiKey = globalGuid = guid;
    
    //get country from api
    api.GetViaGuid(
        function (result) {        	
        	contactingGet_handle(result);        	 	
        }
    );
}

function getAffiliateSales_handle(result){

	jQuery.jqplot('statistic-chart', [], {  
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

	if(result.Value.length == 0){
		jQuery('.jqplot-noData-contents').html('No sales yet');
	}else{
		jQuery("#statistic-chart").html("");
		
		var AffiliateSales = result.Value;
		var ArrOrdersDateArticle = new Array(); //contain order days and numbers of sales / day
		var ArrOrdersDate = new Array(); // contain order days,
		var flagBreak = 0;//limit 7 days before
		var maxValue = 1;
		
		for(var i = AffiliateSales.length-1;i >= 0; i--){
			if(flagBreak <= 6){
				var lastDay = AffiliateSales[i].Created.ParseRfcDate();            					
					lastDay = lastDay.format("dd/mm/yyyy");  
				var today = new Date();
					today = today.format("dd/mm/yyyy");
					
				if(ArrOrdersDateArticle.length == 0){
					if(lastDay == today){
						ArrOrdersDateArticle.push([lastDay,AffiliateSales[i].OrderCount]);                    			
						ArrOrdersDate.push(lastDay);
					}else{
						while(lastDay != today && flagBreak <= 6){
							ArrOrdersDateArticle.push([today,0]);                    			
							ArrOrdersDate.push(today);
							
							//back to prev day
							today = findPreviousDay(today);
							
							flagBreak++;
						}
						
						if(flagBreak < 7){
							ArrOrdersDateArticle.push([lastDay,AffiliateSales[i].OrderCount]);                        			
							ArrOrdersDate.push(lastDay);
							//increase 1 after finish calculate sales per day
							flagBreak++;
						}
					}             			
				}else{        	
					//back to prev day
					var preDay = findPreviousDay(ArrOrdersDate[ArrOrdersDate.length-1]);    							
						
					while(lastDay != preDay && flagBreak <= 6){
						ArrOrdersDateArticle.push([preDay,0]);                    			
						ArrOrdersDate.push(preDay);      
						//back to prev day
						preDay = findPreviousDay(preDay);
						flagBreak++;
					}
					
					if(flagBreak < 7){
						ArrOrdersDateArticle.push([lastDay,AffiliateSales[i].OrderCount]);                        			
						ArrOrdersDate.push(lastDay);
						//increase 1 after finish calculate sales per day
						flagBreak++;
					}
					
					
				}
				
			}else{
				break;
			}
		}
		
		if(ArrOrdersDate.length < 7){
			for(var i = ArrOrdersDate.length; i < 7 ; i++){
				//back to prev day
				var newDate = findPreviousDay(ArrOrdersDate[i-1]);        					        					
					ArrOrdersDate.push(newDate);            					           					
			}
		}
		
		for(x in ArrOrdersDate){
			var day = ArrOrdersDate[x].split("/");
				day = day[2]+"/"+day[1]+"/"+day[0];
				ArrOrdersDate[x] = new Date(day);
		}
		
		for(x in ArrOrdersDateArticle){
			var day = ArrOrdersDateArticle[x][0].split("/");
				day = day[2]+"/"+day[1]+"/"+day[0];
				ArrOrdersDateArticle[x][0] = new Date(day);
				
			if(maxValue < ArrOrdersDateArticle[x][1]){
				maxValue = ArrOrdersDateArticle[x][1];
			}
		}
		
		ArrOrdersDateArticle 	= ArrOrdersDateArticle.reverse();
		ArrOrdersDate 			= ArrOrdersDate.reverse();
		
		//Statistic chart
		jQuery.jqplot('statistic-chart', [ArrOrdersDateArticle], {
			series: [{label: jQuery('#trans-sales-per-day').val()}],	
			legend: {show:true, location: 'nw', yoffset: 6},
			gridPadding: {top:6, right:5, bottom:2, left:6},
			axes: {        				
				xaxis: {  
					renderer: jQuery.jqplot.DateAxisRenderer,            					
					ticks: ArrOrdersDate,
					tickOptions: {				  
						showLabel: false,
						showMark: false,
						showGridline: true,
						formatString: '%d.%m.%Y'
					},
					numberTicks: 7
				},
				yaxis: {
				   pad: 1,	
				   min: 0,
				   max: maxValue,        				   
				   tickOptions: {				  
						showLabel: false,
						showGridline: true,
						showMark: false
				   },           				   
				   numberTicks: maxValue + 1
			   }
			},
			cursor: {
			   show: true,
			   style: 'pointer',
			   showTooltip: false
		   },
		   grid: {
				drawGridLines: true,           
				borderColor: '#EFEFEF',     
				borderWidth: 1,          
				shadow: false
			},
		   highlighter: {
			   tooltipLocation: 'nw',
			   useAxesFormatters: true,
			   formatString: 'Date: %s - %d sales'
		   }
		   
		});
		
	}
}

//get all sales
function getAffiliateSales(IdResaleUnit, fromDate, toDate){	
	
	var api = new delivergo.api.contact();
    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	api.ApiKey = globalGuid;			
	
	api.Request.Value = {
			"Interval": "Daily",
			"FromDate": fromDate,
			"ToDate": toDate
	};
    
    //change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //get country from api
    api.GetAffiliateSales(IdResaleUnit,
        function (result) {
    		getAffiliateSales_handle(result);
        }
        
    );
}

//get all orders
function getAffiliateOrders(IdResaleUnit, itemsPerPage, pageNumber){
	//set email when click "Contact us" button 
	jQuery('.footer-contact a').attr({"href":"mailto:delivergo@gmail.com?subject="+jQuery('.user-affiliate').html()+"%20-%20"+jQuery('.shop-affiliate').html()+"%20-%20WP Plugin"});
	
	
	var api = new delivergo.api.contact();
    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	api.ApiKey = globalGuid;
    
    //change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //get country from api
    api.GetAffiliateOrders(IdResaleUnit, itemsPerPage, pageNumber,
        function (result) {
    	
    		if(result.Value.OverallItemCount == 0){
    			jQuery('.jqplot-noData-contents').html('No sales yet');
    		}else{
    			if(itemsPerPage == 1){
            		getAffiliateOrders(IdResaleUnit, result.Value.OverallItemCount, pageNumber);
            	}else{
            		jQuery("#statistic-chart").html("");
            		
            		var AffiliateOrders = result.Value;
            		var ArrOrdersDateArticle = new Array(); //contain order days and numbers of sales / day
            		var ArrOrdersDate = new Array(); // contain order days,
            		var flagBreak = 1;//limit 7 days before
            		var maxValue = 1;
            		
            		for(var i=0;i < AffiliateOrders.Items.length ;i++){            			
            			if(flagBreak <= 6){
            				var d = AffiliateOrders.Items[i].Created.ParseRfcDate();            					
            					d = d.format("dd/mm/yyyy");
            					
            				if(ArrOrdersDateArticle.length == 0){
                    			ArrOrdersDateArticle.push([d,1]);                    			
                    			ArrOrdersDate.push(d);
            				}else{
            					//check if orders in same day
            					if(d == ArrOrdersDate[ArrOrdersDate.length-1]){
            						ArrOrdersDateArticle[ArrOrdersDateArticle.length-1][1]++; //increase 1 SalesCount for each day
            					}else{
            						var preDay = ArrOrdersDate[ArrOrdersDate.length-1].split("/");
            							if(preDay[0] > 10){
            								preDay = (preDay[0]*1 - 1)+"/"+preDay[1]+"/"+preDay[2];
            							}else{
            								preDay = "0"+(preDay[0]*1 - 1)+"/"+preDay[1]+"/"+preDay[2];
            							}
            							
            						while(d != preDay && flagBreak <= 6){
            							ArrOrdersDateArticle.push([preDay,0]);                    			
                            			ArrOrdersDate.push(preDay);                            			
                            			preDay = preDay.split("/");                            			
                            			if(preDay[0] >= 10){
            								preDay = (preDay[0]*1 - 1)+"/"+preDay[1]+"/"+preDay[2];
            							}else{
            								preDay = "0"+(preDay[0]*1 - 1)+"/"+preDay[1]+"/"+preDay[2];
            							}
                            			flagBreak++;
            						}
            						
                        			ArrOrdersDateArticle.push([d,1]);                        			
                        			ArrOrdersDate.push(d);
            						//increase 1 after finish calculate sales per day
                        			flagBreak++;
            					}
            				}
            				
            			}else{
            				break;
            			}
            		}            		
            		
            		if(ArrOrdersDate.length < 7){
            			for(var i = ArrOrdersDate.length; i < 7 ; i++){
            				var CurrDay = ArrOrdersDate[i-1].split("/");
            					CurrDay = CurrDay[2]+"/"+CurrDay[1]+"/"+(CurrDay[0]*1 - 1);
            					CurrDay = new Date(CurrDay);
            				var	newDate = CurrDay.format("dd/mm/yyyy");
            					ArrOrdersDate.push(newDate);            					           					
            			}
            		}
            		
            		for(x in ArrOrdersDate){
            			var d = ArrOrdersDate[x].split("/");
            				d = d[2]+"/"+d[1]+"/"+d[0];
    						ArrOrdersDate[x] = new Date(d);
            		}
            		
            		for(x in ArrOrdersDateArticle){
            			var d = ArrOrdersDateArticle[x][0].split("/");
        					d = d[2]+"/"+d[1]+"/"+d[0];
        					ArrOrdersDateArticle[x][0] = new Date(d);
        					
        				if(maxValue < ArrOrdersDateArticle[x][1]){
        					maxValue = ArrOrdersDateArticle[x][1];
        				}
            		}
            		
            		ArrOrdersDateArticle 	= ArrOrdersDateArticle.reverse();
            		ArrOrdersDate 			= ArrOrdersDate.reverse();
            		
            		//Statistic chart
            	    jQuery.jqplot('statistic-chart', [ArrOrdersDateArticle], {
            			series: [{label: 'Sales per day'}],	
            			legend: {show:true, location: 'nw', yoffset: 6},
            			gridPadding: {top:6, right:5, bottom:2, left:6},
            			axes: {
            				xaxis: {  
            					renderer: jQuery.jqplot.DateAxisRenderer,            					
            					ticks: ArrOrdersDate,
            					tickOptions: {				  
            						showLabel: false,
            						showMark: false,
            						showGridline: true,
            						formatString: '%d.%m.%Y'
            					}
            				},
            				yaxis: {
            				   min: 0,
            				   max: maxValue,
            				   tickOptions: {				  
	           						showLabel: false,
            						showGridline: true,
            						showMark: false,
            						mark: 'inside'
	           				   },
	           				   pad: 3
            			   }
            			},
            			cursor: {
            			   show: true,
            			   style: 'pointer',
            			   showTooltip: false
            		   },
            		   grid: {
            		        drawGridLines: true,           
            		        borderColor: '#EFEFEF',     
            		        borderWidth: 1,          
            		        shadow: false
            		    },
            		   highlighter: {
            			   tooltipLocation: 'nw',
            			   useAxesFormatters: true,
            			   formatString: 'Date: %s - %d sales'
            		   }
            		   
            		});
            	}
    		}
        	   	
        }
    );
}

function adminResaleUpdate(){
	var api = new delivergo.api.contact();    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	api.Request.Value = globalResaleUnits;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.ApiKey = profile_user['apikey'];
    
    api.UpdateResaleUnits(function (result){    	

    	adminResaleGet( 'update-resaleUnit' );
    	
    	//show new prices
    	priceOverviewShow();
    });
    
    api.OnError = function(error) {
      api.Log(error);
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };    
}

function adminResaleGet_handle(result, comeback, profitArray){
	globalResaleUnits = result.Value;
        	
	//get shop infomations
	for(var i = 0; i < result.Value.length; i++){
							
		for(var j = 0;j < result.Value[i].ResaleUnitSetting.length;j++){
			if(result.Value[i].ResaleUnitSetting[j].Key == "Calculation.EndUserPriceFormat"){
				var EndUserPriceFormat = result.Value[i].ResaleUnitSetting[j].Value;
			}
		}
		
		var shopDescription = {shopID: result.Value[i].Id, shopGuid: result.Value[i].Guid ,shopDes: result.Value[i].ResaleUnitTranslation[0].Description, shopName: result.Value[i].ResaleUnitTranslation[0].Name , currency: result.Value[i].CurrencyToken ,Product: [], EndUserPrice: EndUserPriceFormat};
		
		//set shop discount object
		shopDiscount.push(shopDescription); 
		
		if(profile_user['resaleGuid'] != undefined && profile_user['resaleGuid'] == result.Value[i].Guid){        			        			
			jQuery('.general-content-forth a').attr({"href":result.Value[i].ResaleUnitSetting[0].Value+"/earn-money#earn-money-tabs-3"});
		}
	}
	
	if(profile_user['resale'] != undefined){
		for(var i = 0; i < shopDiscount.length; i++){
			if(shopDiscount[i].shopID == profile_user['resale']){
				jQuery('.shop-affiliate').html(shopDiscount[i].shopName);
				
			}
		}
	}
	
	if(comeback != "update-resaleUnit"){
		if(profitArray == undefined){
			//article profit get
			articleProfitGet( comeback );
		}else{
			articleProfitGet_handle(profitArray, comeback)
		}		
	}else{
		jQuery.unblockUI();
	} 
}

//admin resale unit GET request function
function adminResaleGet( comeback ){
	//create a new api object
    var api = new delivergo.api.admin();
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
    
    //change the URL to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //guid
    api.ApiKey = profile_user['apikey'];
    
    //get country from api
    api.GetResaleUnits( 
        function (result) {
        	adminResaleGet_handle(result, comeback);
        }
    );
}

//===============================================================================================================

function articleGroupGet_handle(result){	

	//get ArticleGroupProfitConfig
	var articleProfitConfig;
	dgoArticleGroup = result.Value; 
	
	//get result to arr
	for(var i = 0; i < result.Value.length; i++){        		   		
		if(result.Value[i].ArticleGroupTranslation != undefined){
			//save group name
			articleGroupArr[result.Value[i].Id] = result.Value[i].ArticleGroupTranslation[0].Name;	        		
		}
		
		if(result.Value[i].ArticleGroupProfitConfig != undefined){
			//save group name      		
			articleProfitConfig = result.Value[i].ArticleGroupProfitConfig;
		}
	}
	
	//fill to currency select box
	var articleOption = '';
	for(var i = 0; i < articleProfitConfig.length; i++){
		var languageToken = articleProfitConfig[i].CurrencyToken;
		var purchasePrice = articleProfitConfig[i].SamplePurchasePrice;
		var profitStart = 0;
		var profitStep = articleProfitConfig[i].RelativeProfitStep;
		var numberStep = articleProfitConfig[i].NumberRelativeSteps;
		
		//create language array
		articleGroupArr[languageToken] = new Array();
		articleGroupArr[languageToken][0] = purchasePrice;
		articleGroupArr[languageToken][1] = profitStart;
		articleGroupArr[languageToken][2] = profitStep;
		articleGroupArr[languageToken][3] = numberStep;
		
		articleOption += '<option>' + languageToken + '</option>';
		
	}
  
	//add language to dropdown box
	jQuery('.maintain-title-right .currency-select').append(articleOption);
}

function articleProfitGet_handle(result, comeback){
	dgoAllDiscounts = result.Value;
        	
	//set email when click "Contact us" button 
	jQuery('.footer-contact a').attr({"href":"mailto:delivergo@gmail.com?subject="+PortalName+"%20-%20"+Username+"%20-%20"+jQuery('.shop-affiliate').html()+"%20-%20WP Plugin"});
	//show configure button
	jQuery('.configure-button').css({display: 'block'});
	//hide display process	
	jQuery.unblockUI();
	
	//if have discounts
	if(result.Value.length > 0){
		if(comeback == 'processing-discount'){
			//comeback = '';            	
			
			for(var i = 0; i < shopDiscount.length;i++){
				if(shopDiscount[i].shopID == profile_user['resale']){
					shopDiscount[i].Product.splice(0,shopDiscount[0].Product.length);
				}
			}
								
		}
		
		for(var i = 0; i < result.Value.length; i++){      			
			//add active group
			if(result.Value[i].ContactingDiscountProfitEntry != null){        				
				//add article groups to this shop
				for(var j = 0; j < result.Value[i].ContactingDiscountProfitEntry.length; j++){
					for(var k = 0; k < shopDiscount.length; k++){       						
						if(result.Value[i].ContactingDiscountProfitEntry[j].IdResaleUnit == shopDiscount[k].shopID){        							
							
							//modified time
							var modified = '';
							if(result.Value[i].ContactingDiscountProfitEntry[j].Modified != undefined){
								modified = result.Value[i].ContactingDiscountProfitEntry[j].Modified;
							}
							
							//min percentage
							if(result.Value[i].Percentage != null && result.Value[i].Percentage != undefined && result.Value[i].Percentage != 0){
								var minPercentage = result.Value[i].Percentage;
							}else if(dgoDefaultPercentage != null){
								var minPercentage = dgoDefaultPercentage;
							}else{
								api.Log('Error: Out of discount percentage');
							}
							
							//profit percentage
							if(result.Value[i].ContactingDiscountProfitEntry[j].ResaleProfitPercentage > minPercentage){
								var profitPercentage = result.Value[i].ContactingDiscountProfitEntry[j].ResaleProfitPercentage;
							}else{
								var profitPercentage = minPercentage;
							}
							
							//recalculate profit amount
							var groupAmountCal = result.Value[i].ContactingDiscountProfitEntry[j].ResaleProfitAmount;
							
							var groupLabel = '';
							for(var x = 0;x < dgoArticleGroup.length; x++){
								if(dgoArticleGroup[x].Id == result.Value[i].IdArticleGroup){
									groupLabel = dgoArticleGroup[x].ArticleGroupTranslation[0].Name;
								}
							}
							
							var groupContent = {
								groupActive: result.Value[i].ContactingDiscountProfitEntry[j].Active,
								groupID: result.Value[i].IdArticleGroup,
								groupName: groupLabel,
								profitID: result.Value[i].ContactingDiscountProfitEntry[j].Id,
								discountID: result.Value[i].ContactingDiscountProfitEntry[j].IdContactingDiscountEntry,
								resaleID: result.Value[i].ContactingDiscountProfitEntry[j].IdResaleUnit,
								groupAmount: groupAmountCal,
								groupPercent: profitPercentage,
								groupMinPercent: minPercentage,
								groupCreated: result.Value[i].ContactingDiscountProfitEntry[j].Created,
								groupCreator: result.Value[i].ContactingDiscountProfitEntry[j].Creator,
								groupModified: modified
							};        							      							
							
							//push to shopdiscount object
							shopDiscount[k].Product.push(groupContent);        							
						}
					}
				}     				
			}  			
		}  
		
		//products chosen
		if(whichShopChosen != 'none'){
			productActiveGet( whichShopChosen );
		}
		
		if(comeback == 'processing-discount'){
			//set status for comeback is empty
			comeback = '';
			
			//remove all item
			jQuery('.content-grid-content').html('');
			jQuery('.product-group-content').html('');
				
			provisionShopChange( profile_user['resale'] );
		}
		
		//Count shops and integrate them
		var shopCount = 0;
		var shopOptions = '';
		for(var i = 0; i < shopDiscount.length; i++){        			
			if(shopDiscount[i].Product.length != 0){
				//increase count
				shopCount++;
				shopOptions += '<option value="' + shopDiscount[i].shopID + '">' + shopDiscount[i].shopName + '</option>'; 
			}
		}
		
		//if has no shop is added
		if(shopCount == 0){
			api.Log('<br>Do not have any shop...</br>')	
		}
		
		//if has only 1 shop
		else if(shopCount == 1){
			//hidden the selectbox
			jQuery('.affiliate-select').css({display: 'none'});
			jQuery('.affiliate-select').append(shopOptions);
		}
		
		//if have more than 1 shop, add to selectbox
		else{
			jQuery('.affiliate-select').append(shopOptions);
		}
	} 
	
	//if there are more than one shop, asks plugin user which shop he wants
	if(shopDiscount.length >= 1 && comeback == 'new'){
		//asking for which shop P user chooses
		askShopChosen( shopDiscount );
	}else{
		//show configure button
		//jQuery('.configure-button').css({display: 'block'});
	}
}

//function get Discount profit
function articleProfitGet( comeback ){
    //create a new api object
    var api = new delivergo.api.admin();
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
    
    //change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //guid
    api.ApiKey = profile_user['apikey'];

    //get country from api
    api.GetDiscounts(
        function (result) {
        	articleProfitGet_handle(result, comeback);
        },
        function (result) {
            //Warning message
            for(var i = 0; i < result.Status.Warnings.length; i++){
                api.Log("Warning: " + result.Status.Warnings[i].Text);
            }
            
        },
        function (result) {
            //Error message
            for(var i = 0; i < result.Status.Errors.length; i++){
                api.Log("Error: " + result.Status.Errors[i].Text);
            }                    
        }
    );   
}

//function update provisions
function articleProfitUpdate(articleProfit, active){
    //create a new api object
    var api = new delivergo.api.admin();
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //disable debug
    api.DisableDebug();
    
    //calculate the amount with currency(EUR)
    //var amountCal = articleGroupArr[globalCurrencyToken][1] + articleProfit['amount'] * articleGroupArr[globalCurrencyToken][2];
    
    //create new Value array
    api.Request.Value = [
    	{
    		"Active": active,
    		"Created": articleProfit['createdSave'],
    		"Creator": articleProfit['creator'],
    		"Id": articleProfit['profitID'],
    		"IdContactingDiscountEntry": articleProfit['discountID'],
    		"IdResaleUnit": articleProfit['resaleID'],
    		"ResaleProfitAmount": articleProfit['amount'],   
    		"ResaleProfitPercentage": articleProfit['percent']
    	}
    ];
    
    //change portal
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
    
    //change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';  
    
    //guid
    api.ApiKey = profile_user['apikey'];
    
    //get country from api
    api.UpdateProfits(
       function(result){
    	 //block ui
       	 jQuery.unblockUI();
       	 
       	 articleProfitGet( 'processing-discount' );
       }
    );
}

/*function add Discount*/
function AddDiscountEntries(idResale,idArticleGroup, amount, percentage){
	var api = new delivergo.api.contact();    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	api.Request.Value = 	[{
	   "Active":true,
	   "ContactingDiscountProfitEntry":[
      	{
	         "Active":true,         	
	         "Id":0,
	         "IdContactingDiscountEntry":0,
	         "IdResaleUnit":idResale,
	         "ResaleProfitAmount": amount,
	         "ResaleProfitPercentage": percentage
	      }
	   ],
	   "Id":0,
	   "IdArticleGroup":idArticleGroup,
	   "Percentage": null
	}];
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.ApiKey = profile_user['apikey']; //in widget.inc.php
    
    api.AddDiscountEntries(function (result){
    	articleProfitGet( 'processing-discount' );  		
    });

    api.OnError = function(error) {
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };       
	
}

//function put provisions
function articleProfitAdd(IdDiscount,IdShop, amount, percentage){
    //create a new api object
    var api = new delivergo.api.contact();
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    api.Request.Value = [{
						   "Active":true,
						   "IdContactingDiscountEntry":IdDiscount,
						   "IdResaleUnit":IdShop,
						   "ResaleProfitAmount": amount,
						   "ResaleProfitPercentage": percentage
						}];
    
    //change portal
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    //change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.ApiKey = profile_user['apikey'];
    
    //get country from api
    api.AddProfits(
        function (result) {
        	articleProfitGet( 'processing-discount' );
        }        
    );    
}

//function delete provisions
function articleProfitDelete(idDiscountProfit){
    //create a new api object
    var api = new delivergo.api.contact();
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    api.Request.Value = [{
        					Id: idDiscountProfit
    					}];
    
    //change portal
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    //change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.ApiKey = profile_user['apikey'];
    
    //get country from api
    api.DeleteProfits(
        function (result) {
        	articleProfitGet( 'processing-discount' );
        }        
    );    
}

//======================================================================================================
//function format currency
function formatCurrency(amount, cur){
    var numberDecimal = 0;
    
    if(cur){
        switch(cur){
            case 'EUR':
                numberDecimal = 2; 
                break;   
        }    
    }
    
    var c = jQuery().number_format( amount,{
         numberOfDecimals: numberDecimal,
         decimalSeparator: ',',
         thousandSeparator: '.'
     });
     return c;    
}

//format number
// Numeric only control handler
jQuery.fn.ForceNumericOnly =
function()
{
    return this.each(function()
    {
        jQuery(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (
                key == 8 || 
                key == 9 ||
                key == 46 ||
                (key >= 37 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        })
    })
};

//check email
//validates, if the string "emailInput" is a valid email-address, or not
checkEmail = function (emailInput) {
    var regexp = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    return regexp.test(emailInput);
}

//function sort number
function compare(a,b){
	return a-b;
}

function adminControlGetLanguage_handle(result, position){
	if(position == 'wp_control'){
		var option_result = '';
		var option_value = 0;
		for(var i = 0; i < result.Value.length; i++){
			if( result.Value[i].Key== 'DE' || result.Value[i].Key=='VI'|| result.Value[i].Key=='EN'){
				if(globalLanguage == result.Value[i].Key){
					option_value = i;
					option_result += '<option value="' + result.Value[i].Key + '_' + result.Value[i].Name + '" selected="selected">' + result.Value[i].Name + '</option>';
				}else{
					option_result += '<option value="' + result.Value[i].Key + '_' + result.Value[i].Name + '">' + result.Value[i].Name + '</option>';
				}
			}	
		}
		jQuery('#dgo-control-language').empty().append(option_result);
		
		jQuery('#theme-control-language').empty().append(option_result);
		
		if(select_language_value != undefined){
			jQuery('#theme-control-language').val(select_language_value);
		}
	}
	
	if(position == 'Admin-Option'){
		var option_result = '';
		languageArr = result.Value;
		for(var i = 0; i < result.Value.length; i++){
			if( result.Value[i].Key== 'DE' || result.Value[i].Key=='VI'|| result.Value[i].Key=='EN'){
				if(globalLanguage == result.Value[i].Key){
					option_value = i;
					option_result += '<option value="' + result.Value[i].Key + '_' + result.Value[i].Name + '" selected="selected">' + result.Value[i].Name + '</option>';
				}else{
					option_result += '<option value="' + result.Value[i].Key + '_' + result.Value[i].Name + '">' + result.Value[i].Name + '</option>';
				}
			}	
		}
		
		jQuery('.admin-option-language').empty().append(option_result)
	}
}

/*------------- Admin Control Request --------------------------------------*/
function adminControlGetLanguage( position ){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;

	api.ApiKey = profile_user['apikey'];
	
    api.GetLanguages(globalLanguage, function(result){    	
    	adminControlGetLanguage_handle(result, position);    	
    });
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };
}

function adminControlGetCurrency_handle(result, position){

	var option_result = '';
	var option_value = 0;
	for(var i = 0; i < result.Value.length; i++){	    		
		if(globalCurrencyToken == result.Value[i].Key){
			option_value = i;
			option_result += '<option value="' + result.Value[i].Key + '" selected>' + result.Value[i].Key + '</option>';
		}else{
			option_result += '<option value="' + result.Value[i].Key + '">' + result.Value[i].Key + '</option>';
		}
		
	}

	if(position == 'wp_control'){
		jQuery('#dgo-control-currency').empty().append(option_result);
		//set chosen value
		jQuery("#dgo-control-currency").val(dgoCurrencies);
	}
	
	if(position == 'Admin-theme'){
		jQuery('.curSelect').empty().append(option_result);
		//set chosen value
		jQuery(".curSelect").val(dgoCurrencies);
	}
	
	
}

function adminControlGetCurrency( position ){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    api.GetCurrencies(globalLanguage, function(result){    	
		adminControlGetCurrency_handle(result, position);
    });

    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };
}


function adminControlGetDimension( position ){
	var option_result = '';
	var option_select = 'selected="selected"';
	
	if(jQuery('#hidden-dimension').val() == 'mm'){		
		option_result += '<option value="mm" '+ option_select + '>mm</option>';
		option_result += '<option value="inch">inch</option>';
	}else{
		option_result += '<option value="mm">mm</option>';
		option_result += '<option value="inch" '+ option_select + '>inch</option>';
	}
	
	if(position == 'wp_control'){
		jQuery('#dgo-control-dimension').empty().append(option_result);
		jQuery('#dgo-control-dimension').val(dgoDimension);
	}
	
	if(position == 'Admin-theme'){
		jQuery('.dimSelect').empty().append(option_result);
		jQuery('.dimSelect').val(dgoDimension);
	}
}

function findPreviousDay(currDay){
	var prevDay = null;
	
	currDay = currDay.split("/");
	currDay = new Date(currDay[2]+"/"+currDay[1]+"/"+currDay[0]);
	prevDay = new Date(currDay.getTime() - 86400000);
	prevDay = prevDay.format('dd/mm/yyyy');
	
	return prevDay;
}
