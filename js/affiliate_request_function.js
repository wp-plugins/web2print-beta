function getAffiliateSalesFromPhp(result){
	
	if(result.Value.length == 0){
		jQuery('.jqplot-noData-contents').html(jQuery('#trans-no-sales-yet').val());
	}else{
		jQuery("#earn-money-statistic-chart").html("");
		
		AffiliateSales = result.Value;
		AffiliateSalesAfterSort = new Array();
		ArrOrdersDateArticle = new Array(); //contain order days and numbers of sales / day
		ArrOrdersDate = new Array(); // contain order days,
		ArrLabelChart = new Array();
		maxValue = 1;
		
		//get all sales sorted by ResaleUnit
		for(var x = 0; x < globalResaleUnit.length; x++){
			if(globalResaleUnit[x].ResaleUnitTranslation != undefined){
				for(var j = 0; j < globalResaleUnit[x].ResaleUnitTranslation.length;  j++){
					if(globalResaleUnit[x].ResaleUnitTranslation[j].LanguageToken == globalLanguage){
						ArrLabelChart[x] = {
								"label": globalResaleUnit[x].ResaleUnitTranslation[j].Name
						}
					}else if(j == globalResaleUnit[x].ResaleUnitTranslation.length-1){
						ArrLabelChart[x] = {
								"label": globalResaleUnit[x].ResaleUnitTranslation[0].Name
						}
					}
				}
				
				AffiliateSalesAfterSort[x] = new Array();
				
				for(var i = 0;i < AffiliateSales.length; i++){
					if(AffiliateSales[i].ResaleUnitId == globalResaleUnit[x].Guid && AffiliateSales[i].OrderCount != undefined){
						AffiliateSalesAfterSort[x].push(AffiliateSales[i]);
					}
				}
				
			}
		}
		
		//create array to use for jqplot
		//array like: [[['10/10/2011',4],['9/10/2011',4],['8/10/2011',4],...],...]
		for(var i = 0;i < AffiliateSalesAfterSort.length; i++){
			//console.log(AffiliateSalesAfterSort[i].length);
			if(AffiliateSalesAfterSort[i].length != 0){
				var flagBreak = 0;//limit 7 days before
				ArrOrdersDateArticle[i] = new Array();
				ArrOrdersDate = new Array();
				
				for(var j = AffiliateSalesAfterSort[i].length-1;j >= 0;j--){    					
					if(flagBreak < 7){
						//the last day in AffiliateSalesAfterSort array
						var lastDay = AffiliateSalesAfterSort[i][j].Created.ParseRfcDate();            					
							lastDay = lastDay.format("dd/mm/yyyy"); 
						
						//today
						var today = new Date();
							today = today.format("dd/mm/yyyy");
							
						if(ArrOrdersDateArticle[i].length == 0){
							//we have to show the day begin is today
							if(lastDay == today){
								//add to ArrOrdersDateArticle & ArrOrdersDate arrays
								ArrOrdersDateArticle[i].push([lastDay,AffiliateSalesAfterSort[i][j].OrderCount]);                    			
								ArrOrdersDate.push(lastDay);
								
								//increase flagBreak
								flagBreak++; 
							}else{ 
								//set sales value for today is 0 if the last day in AffiliateSalesAfterSort[i] is not today and back to prev day
								//and if the prev day is not the last day in AffiliateSalesAfterSort[i], we set sales value is 0 too
								//until the prev day is equal with the last day in AffiliateSalesAfterSort[i]
								while(lastDay != today && flagBreak < 7){
									//add to ArrOrdersDateArticle & ArrOrdersDate arrays
									ArrOrdersDateArticle[i].push([today,0]);                    			
									ArrOrdersDate.push(today);
									
									//back to prev day
									today = findPreviousDay(today);
									
									//increase flagBreak
									flagBreak++;                            			
								}
								
								//if the prev day is the last day in AffiliateSalesAfterSort[i] and flagBreak still < 7 (not enough 7 days to show chart)
								//add the last day to array
								if(flagBreak < 7){
									//add to ArrOrdersDateArticle & ArrOrdersDate arrays
									ArrOrdersDateArticle[i].push([lastDay,AffiliateSalesAfterSort[i][j].OrderCount]);                        			
									ArrOrdersDate.push(lastDay);
									
									//increase flagBreak
									flagBreak++;
								}
								
								if(j == 0 && ArrOrdersDateArticle.length < 7){
									while(flagBreak < 7){
										//back to prev day
										today = findPreviousDay(today);
										
										//add to ArrOrdersDateArticle & ArrOrdersDate arrays
										ArrOrdersDateArticle[i].push([today,0]);                    			
										ArrOrdersDate.push(today);
										
										//increase flagBreak
										flagBreak++;
									}
								}
							}             			
						}else{        	
							//back to prev day
							var preDay = findPreviousDay(ArrOrdersDate[ArrOrdersDate.length-1]);        							
								
							while(lastDay != preDay && flagBreak < 7){
								//add to ArrOrdersDateArticle & ArrOrdersDate arrays
								ArrOrdersDateArticle[i].push([preDay,0]);                    			
								ArrOrdersDate.push(preDay);   
								
								//back to prev day
								preDay = findPreviousDay(preDay);
								
								//increase flagBreak
								flagBreak++;
							}
							
							if(flagBreak < 7){
								//add to ArrOrdersDateArticle & ArrOrdersDate arrays
								ArrOrdersDateArticle[i].push([lastDay,AffiliateSalesAfterSort[i][j].OrderCount]);                        			
								ArrOrdersDate.push(lastDay);
								
								//increase flagBreak
								flagBreak++;
							}
							
							//if ArrOrdersDateArticle dont have enough 7 days to show, we have to add day until we have enough 7 days        						
							if(j == 0 && ArrOrdersDateArticle.length < 7){
								while(flagBreak < 7){
									//back to prev day
									today = findPreviousDay(today);
									
									//add to ArrOrdersDateArticle & ArrOrdersDate arrays
									ArrOrdersDateArticle[i].push([today,0]);                    			
									ArrOrdersDate.push(today);
									
									//increase flagBreak
									flagBreak++;
								}
							}
							
						}
						
					}else{
						break;
					}
				}
			}else{
				var today = new Date();
					today = today.format("dd/mm/yyyy");
					
					var flagBreak = 0;//limit 7 days before
					ArrOrdersDateArticle[i] = new Array();
					ArrOrdersDate = new Array();
					
				while(flagBreak < 7){							
					
					//add to ArrOrdersDateArticle & ArrOrdersDate arrays
					ArrOrdersDateArticle[i].push([today,0]);                    			
					ArrOrdersDate.push(today);
					
					//back to prev day
					today = findPreviousDay(today);
					
					//increase flagBreak
					flagBreak++;                			
				}

			}
			
		}

		//change date format from '18/8/2011' to Date {Thu Aug 18 2011 11:32:08 GMT+0700 (SE Asia Standard Time)}
		//to show chart, jqplot doesn't understand format '18/8/2011'
		for(var x = 0;x < ArrOrdersDate.length;x++){
			var day = ArrOrdersDate[x].split("/");
				day = day[2]+"/"+day[1]+"/"+day[0];
				ArrOrdersDate[x] = new Date(day);
		}
		
		//change date format from '18/8/2011' to Date {Thu Aug 18 2011 11:32:08 GMT+0700 (SE Asia Standard Time)}
		//to show chart, jqplot doesn't understand format '18/8/2011'
		for(var x = 0;x < ArrOrdersDateArticle.length;x++){
			//if(ArrOrdersDateArticle[x] != undefined){
				for(var i = 0;i < ArrOrdersDateArticle[x].length;i++){
					var day = ArrOrdersDateArticle[x][i][0].split("/");
						day = day[2]+"/"+day[1]+"/"+day[0];
						ArrOrdersDateArticle[x][i][0] = new Date(day);
					
					if(maxValue < ArrOrdersDateArticle[x][i][1]){
						maxValue = ArrOrdersDateArticle[x][i][1];
					}
				}			
		}
		
		//reverse arrays
		ArrOrdersDateArticle 	= ArrOrdersDateArticle.reverse();
		ArrOrdersDate 			= ArrOrdersDate.reverse();
		ArrLabelChart			= ArrLabelChart.reverse();
		AffiliateSalesAfterSort = AffiliateSalesAfterSort.reverse();
		
		//Statistic chart
		var jqplotChart = jQuery.jqplot('earn-money-statistic-chart', ArrOrdersDateArticle, {
			series: ArrLabelChart,	
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
			   tooltipLocation: 'ne',
			   useAxesFormatters: true,
			   formatString: 'Date: %s - %d sales'
		   }
		   
		});
		
		jqplotChart.replot();

		//set css for label table
		jQuery('.jqplot-table-legend').css({"padding":"0 3px"});
	
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
	
	api.ApiKey = dgoGuid;			
	
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
    		getAffiliateSalesFromPhp(result);
        }
        
    );
}

//function edit shop name & description
function affiliate_editShop(shopID){	
	//block ui
	jQuery.blockUI(0);
	
	for(x in globalResaleUnit){
		if(globalResaleUnit[x].Id == shopID){
			for(i in globalResaleUnit[x].ResaleUnitTranslation){
				if(globalResaleUnit[x].ResaleUnitTranslation[i].LanguageToken == globalLanguage){
					globalResaleUnit[x].ResaleUnitTranslation[i].Name 			= jQuery('.shop-name-txt').html();
					globalResaleUnit[x].ResaleUnitTranslation[i].Description 	= jQuery('.shop-description-txt').html();
					affiliate_updateResaleUnit();
					
				}else if(i == globalResaleUnit[x].ResaleUnitTranslation.length-1){
					var shop = {
								"Description": jQuery('.shop-description-txt').html(),
								"LanguageToken": globalLanguage,
								"Name": jQuery('.shop-name-txt').html()
							   };
					
					globalResaleUnit[x].ResaleUnitTranslation.push(shop);
					affiliate_updateResaleUnit();	
				}
			}
		}
	}
}

function upgradeToAffiliate(contacting,newShop){
	var api = new delivergo.api.contact();    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
		
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
	
	api.Request.Value = contacting;
	
	api.IsDev = globalIsDev;
	
	api.AddOrUpgradeToAffiliate( function(result){
		
		//set articleGroupId is null
		articleGroupId = new Array();
		
		for(var i = 0; i < result.Value.Discount.DiscountEntry.length; i++){
			articleGroupId[i] = result.Value.Discount.DiscountEntry[i].IdArticleGroup+"|"+result.Value.Discount.DiscountEntry[i].Percentage;
		}
		
		//add new resaleUnit
		affiliate_AddResaleUnit(newShop,'upgrade');
		
		//fill the user affiliate...
    	jQuery('.user-affiliate').html(result.Value.Login);
    	
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
	});
	
    api.OnError = function(error) {
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };	
}

//function update resaleUnit
function affiliate_updateResaleUnit(){
	var api = new delivergo.api.contact();    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	api.Request.Value = globalResaleUnit;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.ApiKey = dgoGuid; //in widget.inc.php
    
    jQuery.blockUI(0);
    
    api.UpdateResaleUnits(function (result){
    	
    	jQuery.unblockUI();
    	
    	affiliate_GetReSaleUnit('processing-discount');    	    	
    });
    
    api.OnError = function(error) {
      api.Log(error);
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };    
}

/*function edit shop dialog*/
function Affiliate_EditResaleUnit(shopID){
	currentShop =  shopID;  
    jQuery('.provision-maintain-content').css({display: 'block'});    
    //go to chosen shop
	jQuery('.askingShopForm').dialog('close');
	jQuery('.provisionForm').dialog('open');
	jQuery('.provisionForm').dialog({ position: 'center' });
	
	//change the shop
	jQuery('.affiliate-select').val(shopID);
	provisionShopChange(shopID);
}

/*function open create a new shop dialog*/
function affiliate_create_new_shop_dialog(){
	jQuery( "#earn-money-add-resales-unit-form" ).dialog('open');
	jQuery( "#earn-money-add-resales-unit-form" ).dialog({ position: 'center' });
}

/*function add new shop*/
function affiliate_AddResaleUnit(newShop,options){
	var api = new delivergo.api.contact();    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	api.Request.Value = newShop;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.ApiKey = dgoGuid; //in widget.inc.php
    
    api.AddResaleUnits(function (result){    	
    	affiliate_GetReSaleUnit('processing-discount');    
    });
    
    api.OnError = function(error) {
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };   
	
}

function affiliate_GetReSaleUnit_handle(result, comeback, affiliateSales, profitArray){
	//assign value to global resale unit 
	globalResaleUnit = result.Value;
	
	//get all sales
	//getAffiliateSales(null, prevDay, toDay);
	if(affiliateSales != undefined){
		getAffiliateSalesFromPhp(affiliateSales);
	}else{
		getAffiliateSales(null, null, null);
	}
	
	var resaleUnit = result.Value;

	var selectShop = '';
	
	var content_shop = "";
	
	for(var x = 0;x < resaleUnit.length;x++){
		for(var i = 0; i < resaleUnit[x].ResaleUnitTranslation.length;i++){
			if(resaleUnit[x].ResaleUnitTranslation[i].LanguageToken == globalLanguage){
				content_shop += "<div class='earn-money-tabs-1-label earn-money-tab-1-label-shop'>";
				content_shop += "<div class='earn-money-tabs-1-label-icon'><img src='" + web_2_print_blogInfo + "css/img/icon/stock_zoom.png' class='earn-money-zoom-icon'></div>";
				content_shop += "<div class='earn-money-tabs-1-label-shopname'>" + resaleUnit[x].ResaleUnitTranslation[i].Name + "</div>";
				content_shop += "<div class='earn-money-tabs-1-label-description'>" + resaleUnit[x].ResaleUnitTranslation[i].Description + "</div>";
				content_shop += "<div class='earn-money-tabs-1-label-action is-bottons earn-money-action-botton' onclick=Affiliate_EditResaleUnit("+resaleUnit[x].Id+")>"+jQuery('#transEdit').val()+"</div></div>";
				
				selectShop += "<option value='"+resaleUnit[x].Guid+"'>"+resaleUnit[x].ResaleUnitTranslation[i].Name+"</option>";
				break;
			}else if(i == resaleUnit[x].ResaleUnitTranslation.length-1){
				content_shop += "<div class='earn-money-tabs-1-label earn-money-tab-1-label-shop'>";
				content_shop += "<div class='earn-money-tabs-1-label-icon'><img src='" + web_2_print_blogInfo + "css/img/icon/stock_zoom.png' class='earn-money-zoom-icon'></div>";
				content_shop += "<div class='earn-money-tabs-1-label-shopname'>" + resaleUnit[x].ResaleUnitTranslation[0].Name + "</div>";
				content_shop += "<div class='earn-money-tabs-1-label-description'>" + resaleUnit[x].ResaleUnitTranslation[0].Description + "</div>";
				content_shop += "<div class='earn-money-tabs-1-label-action is-bottons earn-money-action-botton' onclick=Affiliate_EditResaleUnit("+resaleUnit[x].Id+")>"+jQuery('#transEdit').val()+"</div></div>";
				
				selectShop += "<option value='"+resaleUnit[x].Guid+"'>"+resaleUnit[x].ResaleUnitTranslation[0].Name+"</option>";
				break;
			}
		}
	}
		
	jQuery('.earn-money-tabs-1-all-shop').html(content_shop);
	jQuery('#earn-money-select-shop').append(selectShop);
	
	shopDiscount = [];
		
	for(var x in resaleUnit){
		for(var i in resaleUnit[x].ResaleUnitTranslation){
			if(resaleUnit[x].ResaleUnitTranslation[i].LanguageToken == globalLanguage){
				var shopDescription = {shopID: resaleUnit[x].Id, shopGuid: resaleUnit[x].Guid ,shopDes: resaleUnit[x].ResaleUnitTranslation[i].Description, shopName: resaleUnit[x].ResaleUnitTranslation[i].Name , currency: resaleUnit[x].CurrencyToken ,Product: []};
				
				//set shop discount object
				shopDiscount.push(shopDescription);
			}else if(i == resaleUnit[x].ResaleUnitTranslation.length-1){
				var shopDescription = {shopID: resaleUnit[x].Id, shopGuid: resaleUnit[x].Guid ,shopDes: resaleUnit[x].ResaleUnitTranslation[i].Description, shopName: resaleUnit[x].ResaleUnitTranslation[i].Name , currency: resaleUnit[x].CurrencyToken ,Product: []};
				
				//set shop discount object
				shopDiscount.push(shopDescription);
			}
		} 
	}
	
	if(profitArray == undefined){
		//article profit get
		articleProfitGet( comeback );
	}else{
		articleProfitGetFromPhp( profitArray, comeback );
	}
	
}

/*function get Resale Unit*/
function affiliate_GetReSaleUnit(comeback){
	var api = new delivergo.api.contact();    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.ApiKey = dgoGuid; //in widget.inc.php
   
    api.GetResaleUnits(function(result){    	    	
        affiliate_GetReSaleUnit_handle(result, comeback);
    });
    
    api.OnError = function(error) {
      api.Log(error);
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };       
}

/*function get contact via guid*/
function affiliate_GetContactViaGuid(guid){
	//create a new api object
    var api = new delivergo.api.contact();    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
    
    //change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.ApiKey = dgoGuid;
    //get country from api
    api.GetViaGuid(
        function (result) {
        	dgoContacting = result.Value;
        	
        	var dataString = "option=getPassword";
			jQuery.ajax({
			   type: "GET",
			   url: web_2_print_blogInfo + "inc/ajax/saveLogin.php",
			   data: dataString,
			   success: function(data){
			   		if(!data.error){
			   			dgoPassword = data;
			   		}
			   }							 
			});
        	
	        if(result.Value.Discount != undefined || result.Value.Discount.DiscountTranslation != undefined)
	        {
	        	//fill the user affiliate...
	        	jQuery('.user-affiliate').html(result.Value.Login);
	        	
	        	//set default value for percentage
	        	dgoDefaultPercentage = result.Value.Discount.DiscountEntry[0].Percentage;
	        	
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
        }
    );
    
    api.OnError = function(error) {
      api.Log(error);
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };
}

function articleGroupHandle(result){
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

//admin api request function
function articleGroupGet(){
    //create a new api object
    var api = new delivergo.api();
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
    
    //change the URL to ajaxproxy file        
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //get country from api
    api.GetArticleGroups( globalLanguage, 
        function (result) {           	
           articleGroupHandle(result);
        }
    );   
}

function articleProfitGetFromPhp(result, comeback){
	//if have discounts
	if(result.Value.length > 0){
		dgoAllDiscounts = result.Value;
		
		jQuery('.affiliate-select').html('');
		
		if(comeback == 'processing-discount'){
			//comeback = '';            	
			
			for(var i = 0; i < shopDiscount.length;i++){
				//if(shopDiscount[i].shopID == currentShop){
					shopDiscount[i].Product.splice(0,shopDiscount[i].Product.length);
				//}
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
							if(result.Value[i].Percentage != null && result.Value[i].Percentage != undefined){
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

		//Count shops and integrate them
		var shopCount = 0;
		var shopOptions = '';
		for(var i = 0; i < shopDiscount.length; i++){        			      			
			//increase count
			shopCount++;
			shopOptions += '<option value="' + shopDiscount[i].shopID + '">' + shopDiscount[i].shopName + '</option>';       			
		}
		
		//if has no shop is added
		if(shopCount == 0){
			api.Log('<br>Do not have any shop...</br>')	
		}
		
		//if has only 1 shop
		else if(shopCount == 1){
			//hidden the selectbox
			jQuery('.affiliate-select').css({display: 'none'});
			
		}
		
		//if have more than 1 shop, add to selectbox
		else{
			jQuery('.affiliate-select').append(shopOptions);
							
		}
		
		if(comeback == 'processing-discount'){
			//set status for comeback is empty
			comeback = '';
			
			//remove all item
			jQuery('.content-grid-content').html('');
			jQuery('.product-group-content').html('');            	
			
			jQuery('.affiliate-select').val(currentShop);
			
			provisionShopChange( currentShop );
		}
	}
}

//function get Discount profit
function articleProfitGet( comeback ){
  //create a new api object
  var api = new delivergo.api.contact();
      
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

  //change portal
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
  
  //change the URL to ajaxproxy file    
  api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
  
  //guid
  api.ApiKey = dgoGuid;

  //get country from api
  api.GetDiscounts(
      function (result) {
        jQuery.unblockUI();  	
      	//if have discounts
      	if(result.Value.length > 0){
      		dgoAllDiscounts = result.Value;
      		
      		jQuery('.affiliate-select').html('');
      		
      		if(comeback == 'processing-discount'){
              	//comeback = '';            	
      			
      			for(var i = 0; i < shopDiscount.length;i++){
      				//if(shopDiscount[i].shopID == currentShop){
      					shopDiscount[i].Product.splice(0,shopDiscount[i].Product.length);
      				//}
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
      							if(result.Value[i].Percentage != null && result.Value[i].Percentage != undefined){
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

      		//Count shops and integrate them
      		var shopCount = 0;
      		var shopOptions = '';
      		for(var i = 0; i < shopDiscount.length; i++){        			      			
  				//increase count
  				shopCount++;
  				shopOptions += '<option value="' + shopDiscount[i].shopID + '">' + shopDiscount[i].shopName + '</option>';       			
      		}
      		
      		//if has no shop is added
      		if(shopCount == 0){
      			api.Log('<br>Do not have any shop...</br>')	
      		}
      		
      		//if has only 1 shop
      		else if(shopCount == 1){
      			//hidden the selectbox
      			jQuery('.affiliate-select').css({display: 'none'});
      			
      		}
      		
      		//if have more than 1 shop, add to selectbox
      		else{
      			jQuery('.affiliate-select').append(shopOptions);
      			      			
      		}
      		
      		if(comeback == 'processing-discount'){
        		//set status for comeback is empty
	  			comeback = '';
	  			
	  			//remove all item
            	jQuery('.content-grid-content').html('');
            	jQuery('.product-group-content').html('');            	
            	
            	jQuery('.affiliate-select').val(currentShop);
            	
            	provisionShopChange( currentShop );
      		}
      	} 
      	
                      
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
function articleProfitUpdate(ArticleProfit, active){
	//create a new api object
	var api = new delivergo.api.contact();
      
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	  //disable debug
	  api.DisableDebug();
	  
	  //calculate the amount with currency(EUR)
	  //var amountCal = articleGroupArr[dgoCurrencyForShop][1] + articleProfit['amount'] * articleGroupArr[dgoCurrencyForShop][2];
	  
	  //create new Value array
	  api.Request.Value = [
		{
			"Active": active,
			"Created": ArticleProfit['createdSave'],
			"Creator": ArticleProfit['creator'],
			"Id": ArticleProfit['profitID'],
			"IdContactingDiscountEntry": ArticleProfit['discountID'],
			"IdResaleUnit": ArticleProfit['resaleID'],
			"ResaleProfitAmount": ArticleProfit['amount'],   
			"ResaleProfitPercentage": ArticleProfit['percent']
		}
	  ];
  
  //change portal
  api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
  
  //change the URL to ajaxproxy file    
  api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';  
  
  //guid
  api.ApiKey = dgoGuid;
  
  //get country from api
  api.UpdateProfits(
     function(result){   	 
    	 affiliate_GetReSaleUnit('processing-discount');
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
	
	//calculate the amount with currency(EUR)
	var amountCal = articleGroupArr[dgoCurrencyForShop][1] + amount * articleGroupArr[dgoCurrencyForShop][2];
	
	api.Request.Value = 	[{
						   "Active":true,
						   "ContactingDiscountProfitEntry":[
					    	{
						         "Active":true,         	
						         "Id":0,
						         "IdContactingDiscountEntry":0,
						         "IdResaleUnit":idResale,
						         "ResaleProfitAmount": amountCal,
						         "ResaleProfitPercentage": percentage
						      }
						   ],
						   "Id":0,
						   "IdArticleGroup":idArticleGroup,
						   "Percentage": null
						}];
	
	//change the URL to ajaxproxy file    
  api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
  
  api.ApiKey = dgoGuid; //in widget.inc.php
  
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

  //calculate the amount with currency(EUR)
  var amountCal = articleGroupArr[dgoCurrencyForShop][1] + amount * articleGroupArr[dgoCurrencyForShop][2];
	
  api.Request.Value = [{
						   "Active":true,
						   "IdContactingDiscountEntry":IdDiscount,
						   "IdResaleUnit":IdShop,
						   "ResaleProfitAmount": amountCal,
						   "ResaleProfitPercentage": percentage
						}];
  
  //change portal
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
  
  //change the URL to ajaxproxy file    
  api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
  
  api.ApiKey = dgoGuid;
  
  //get country from api
  api.AddProfits(
      function (result) {
      	comeback = 'processing-discount';
      	articleProfitGet( comeback ); 
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
  
  api.ApiKey = dgoGuid;
  
  //get country from api
  api.DeleteProfits(
      function (result) {
      	comeback = 'processing-discount';
      	articleProfitGet( comeback ); 
      }        
  );    
}

//==============================================================

//provisions shops change
function provisionShopChange( shopID ){
	//article group html
	var articleGroup = '';
	
	//shop currency
	var shopCurrency = '';
	    
	 //article profit array includes products in one shop
	 articleProfit = new Array();

	 for(var i = 0; i < shopDiscount.length; i++){		
		if(shopDiscount[i].shopID == shopID){
		    for(var j = 0;j < dgoArticleGroup.length;j++){		    	
		    	var n = 0;
		    	while(n <= dgoContacting.Discount.DiscountEntry.length-1){
		    		if(dgoContacting.Discount.DiscountEntry[n].IdArticleGroup == dgoArticleGroup[j].Id){
		    			//----------------------------------------------------------------------------
				    	
				    	if(shopDiscount[i].Product.length > 0){
				    		var count = 0;	
				    		while(count < shopDiscount[i].Product.length){
					    		
					    		if(shopDiscount[i].Product[count].groupID == dgoArticleGroup[j].Id){		    			
									break;
					    		}else if(count == shopDiscount[i].Product.length-1){
					    			var percentage = dgoDefaultPercentage;			    			
					    			for(var x = 0;x < dgoAllDiscounts.length; x++){
					    				if(dgoAllDiscounts[x].IdArticleGroup == dgoArticleGroup[j].Id){
					    					if(dgoAllDiscounts[x].Percentage != null){
					    						percentage = dgoAllDiscounts[x].Percentage;
					    					}
					    				}
					    			}
					    			
					    			articleGroup += '<div class="product-groups' + dgoArticleGroup[j].Id + ' product-groups even-groups"><span>';
									articleGroup += articleGroupArr[dgoArticleGroup[j].Id] + '</span><span style="float:right;padding-right:5px">('+ percentage +'%)</span><input class="min-percent-for-product" type="hidden" value="' + percentage + '" /><input class="apiIDHidden" type="hidden" value="' + dgoArticleGroup[j].Id + '" /></div>';
					    		}
					    		count++;
					    	}
				    	}else{
				    		if(dgoAllDiscounts != null){
				    			var percentage = dgoDefaultPercentage;
				    			for(var x = 0;x < dgoAllDiscounts.length; x++){
				    				if(dgoAllDiscounts[x].IdArticleGroup == dgoArticleGroup[j].Id){
				    					
				    					if(dgoAllDiscounts[x].Percentage != null){
				    						percentage = dgoAllDiscounts[x].Percentage;
				    					}
				    				}
				    			}
					    		articleGroup += '<div class="product-groups' + dgoArticleGroup[j].Id + ' product-groups even-groups"><span>';
								articleGroup += articleGroupArr[dgoArticleGroup[j].Id] + '</span><span style="float:right;padding-right:5px">('+ percentage +'%)</span><input class="min-percent-for-product" type="hidden" value="' + percentage + '" /><input class="apiIDHidden" type="hidden" value="' + dgoArticleGroup[j].Id + '" /></div>';
				    		}else{
				    			for(var i in dgoContacting.Discount.DiscountEntry){
				    				for(var j in dgoArticleGroup){
				    					if(dgoContacting.Discount.DiscountEntry[i].IdArticleGroup == dgoArticleGroup[j].Id){
				    						articleGroup += '<div class="product-groups' + dgoArticleGroup[j].Id + ' product-groups even-groups"><span>';
											articleGroup += articleGroupArr[dgoArticleGroup[j].Id] + '</span><span style="float:right;padding-right:5px">('+ dgoDefaultPercentage +'%)</span><input class="min-percent-for-product" type="hidden" value="' + dgoDefaultPercentage + '" /><input class="apiIDHidden" type="hidden" value="' + dgoArticleGroup[j].Id + '" /></div>';
				    					}
				    				}
				    			}
				    		}
				    		
				    	}
				    	//----------------------------------------------------------------------------
		    		}
		    		n++;
		    	}
		    	
		    }
		}
	 }
	 
 	//fill to product groups container + fill to article Array
	for(var i = 0; i < shopDiscount.length; i++){
		
		if(shopDiscount[i].shopID == shopID){
			dgoCurrencyForShop = shopDiscount[i].currency;
			
			jQuery('.currency-select').val(dgoCurrencyForShop);
			
			//change shop description
			jQuery('#shop-description').html('<span class="shop-name-txt">' + shopDiscount[i].shopName + '</span> & <span class="shop-description-txt">' + shopDiscount[i].shopDes + '</span> <span class="is-bottons edit-shop-name-description-button" onclick="affiliate_editShop('+shopID+')">'+jQuery('#trans-edit').val()+'</span>');
			
			//edit replace shop name
			jQuery(".shop-name-txt").editInPlace({
				callback: function(unused, enteredText,original) { 
					if(enteredText == ""){
						enteredText = original;
					}
					return enteredText;},
					value_required: true
			});
			
			//edit replace shop description
			jQuery(".shop-description-txt").editInPlace({
				callback: function(unused, enteredText,original) { 
					if(enteredText == ""){
						enteredText = original;
					}
					return enteredText;},
					value_required: true
			});
			
			//change hidden input
			jQuery('.resale-guid').val(shopDiscount[i].shopGuid);
			
			if(shopDiscount[i].Product.length > 0){
				//hide currency dropdown
				jQuery('.currency-select').css({"display":"block"});
				
				for(var j = 0; j < shopDiscount[i].Product.length; j++){
					
					//fill to article Array
					//change the create and modify time
					var created = shopDiscount[i].Product[j].groupCreated.ParseRfcDate();
					var group_created = created.format("dd.mm.yyyy - hh:MM:ss");
					var group_created_sort = created.format("dd.mm.yyyy - hh:MM:ss");
					
					var group_modified = '';
					var group_modified_sort = '';
					
					if(shopDiscount[i].Product[j].groupModified != ""){
						 var modified = shopDiscount[i].Product[j].groupModified.ParseRfcDate();
		                 group_modified = modified.format("dd.mm.yyyy - hh:MM:ss");
		                 group_modified_sort = modified.format("dd.mm.yyyy - hh:MM:ss");
		                 
					}
					
					articleProfit[shopDiscount[i].Product[j].groupID] = new Array();
					articleProfit[shopDiscount[i].Product[j].groupID]['active'] = shopDiscount[i].Product[j].groupActive;
					articleProfit[shopDiscount[i].Product[j].groupID]['amount'] = shopDiscount[i].Product[j].groupAmount;
					articleProfit[shopDiscount[i].Product[j].groupID]['percent'] = shopDiscount[i].Product[j].groupPercent;
					articleProfit[shopDiscount[i].Product[j].groupID]['currency'] = shopDiscount[i].currency;
					articleProfit[shopDiscount[i].Product[j].groupID]['name'] = shopDiscount[i].Product[j].groupName;
					shopCurrency = shopDiscount[i].currency;
					articleProfit[shopDiscount[i].Product[j].groupID]['minPercent'] = shopDiscount[i].Product[j].groupMinPercent;
					articleProfit[shopDiscount[i].Product[j].groupID]['created'] = group_created;
					articleProfit[shopDiscount[i].Product[j].groupID]['createdHidden'] = group_created_sort;
					articleProfit[shopDiscount[i].Product[j].groupID]['createdSave'] = shopDiscount[i].Product[j].groupCreated;
					articleProfit[shopDiscount[i].Product[j].groupID]['creator'] = shopDiscount[i].Product[j].groupCreator;
					articleProfit[shopDiscount[i].Product[j].groupID]['modified'] = group_modified;
					articleProfit[shopDiscount[i].Product[j].groupID]['modifiedHidden'] = group_modified_sort;
					articleProfit[shopDiscount[i].Product[j].groupID]['profitID'] = shopDiscount[i].Product[j].profitID;
					articleProfit[shopDiscount[i].Product[j].groupID]['discountID'] = shopDiscount[i].Product[j].discountID;
					articleProfit[shopDiscount[i].Product[j].groupID]['resaleID'] = shopDiscount[i].Product[j].resaleID;
					articleProfit[shopDiscount[i].Product[j].groupID]['groupID'] = shopDiscount[i].Product[j].groupID;
				}
				
				for(var n = 0;n < articleProfit.length; n++){
				 	if(articleProfit[n] != undefined){
				 		//clear all grid 
				 		resetState(shopCurrency, n);
				 		break;
				 	}
				 }
				 
			}else{
				//show currency dropdown
				jQuery('.currency-select').css({"display":"inline"});
				
				//remove all items in 
				jQuery('.grid-content-row').remove();
				
				var currency = dgoCurrencyForShop;
				
				if(dgoCurrencyForShop == 'EUR')
				 {
					currency = 'Euro';
				 }
				 
				 jQuery('.provision-currency').html(currency);
			}
			
			//event for statistic tab
			jQuery('.navigator-statistic').click(function(){
		    	window.open(homeUrl+'/earn-money/#earn-money-tabs-3','_blank');
		    });

		}
	}
	
	//add active group
	jQuery('.product-group-content').empty();
    jQuery('.product-group-content').append(articleGroup); 
        
    
    
	 //product group click
	 jQuery('.product-groups').click(function(){
		//remove selected product in existing product box
		jQuery('.grid-content-row').removeClass('grid-content-row-selected');
		
		//add selected class
		 jQuery('.product-groups').removeClass('product-groups-selected');
		 jQuery(this).addClass('product-groups-selected');
		 var idGroup = jQuery(this).children('.apiIDHidden').val();
		 //change the calculation label
		 jQuery('.provision-calculate-choose span:nth-child(2)').html(jQuery(this).children('span').html());
		 
		//set min percent
		 sliderBarMinPosSet(percentStartCal(jQuery(this).children('.min-percent-for-product').val()));
		 
		 //change amount and percentage                                 
		 sliderBarPosSet( parseFloat(0) , percentStartCal(jQuery(this).children('.min-percent-for-product').val()));
		 
		 
		 //change button text to 'Add now'
		 jQuery('.warning-footer-button span').html(jQuery('#trans-add-now').val());
		 //widget overview
		if(article_group_arr == null){
			w2pArticleGet1(idGroup);
		}else{
			widgetOverviewShow(article_group_arr, idGroup);
		}
		
	 }); 
 
 
 
	 //select active product groups
	 var gridCount = 0;

	 for(var i = 0; i < shopDiscount.length; i++){
		if(shopDiscount[i].shopID == shopID){
			for(var j = 0; j < shopDiscount[i].Product.length; j++){    			
				
					gotoGrid('add', 'server', shopDiscount[i].Product[j].groupActive, shopDiscount[i].Product[j].groupID);    				
					
					//increase count
					gridCount++;
				
			}
		}
	 }

	//event deactive or active in existing product
	jQuery('.grid-product-active').click(function(){
	 if(jQuery(this).children('.input-article-status').val() == "true"){
		gridRowDeactive(jQuery(this).children('.id-group-hidden').val());
	 }else{
		gridRowActive(jQuery(this).children('.id-group-hidden').val());
	 }
	});
 
	 //if have product group in grid, select the first grid
	 if(gridCount > 0){
		jQuery('.content-grid-content .grid-content-row:first-child').click();
	 
	 //else click first product group
	 }else{
		jQuery('.product-group-content .product-groups:first-child').click();	
	 }
}

//function reset state
function resetState( shopCurrency, idGroup ){    
 //clear all grids
 jQuery('.grid-content-row').remove();
 
	//change to the right currency
 adminCurChange( shopCurrency , idGroup );
 
 jQuery('.currency-select').val( shopCurrency );
 
 //Change all of value to 0
 //add selected class    
 //change the calculation label
 jQuery('.provision-calculate-choose span:nth-child(2)').html('');

 //set the min percentage
 sliderBarMinPosSet(0);
 
 //change amount and percentage                                 
 sliderBarPosSet( 0 , 0 );
 
 //change to addnow label
 jQuery('.warning-footer-button span').html(jQuery('#trans-add-now').val());
}

//function currency change
function adminCurChange(currency, idGroup){    
 dgoCurrencyForShop = currency;

 if(currency == 'EUR')
 {
 	currency = 'Euro';
 }
 
 jQuery('.provision-currency').html(currency);
 jQuery('.provision-merchant').val(formatCurrency(articleGroupArr[dgoCurrencyForShop][0], dgoCurrencyForShop));
        
 var value1 = jQuery( ".provision-slider" ).slider( "option", "value" );
 var value2 = jQuery( ".percentage-slider" ).slider( "option", "value" );
 
 var xValue = value2;
 
 if(idGroup != undefined){	 
 	if(Math.round(value2) == Math.round(percentStartCal(articleProfit[idGroup]['minPercent']))){
	        xValue = value2;
	    }else{
	        xValue = Math.round(value2);
	    }	    
	    
	    jQuery('.provision-amount-hidden').val(articleGroupArr[dgoCurrencyForShop][1] + value1 * articleGroupArr[dgoCurrencyForShop][2]);
	    jQuery('.provision-amount').html(formatCurrency(articleGroupArr[dgoCurrencyForShop][1] + value1 * articleGroupArr[dgoCurrencyForShop][2], dgoCurrencyForShop));
	    jQuery('.provision-percent-hidden').val(xValue);
	    jQuery('.provision-percent').html(formatCurrency( xValue, 'EUR'));
	    jQuery('.provision-calculate-percent .provision-price-element').html(formatCurrency(xValue * articleGroupArr[dgoCurrencyForShop][0]/100, dgoCurrencyForShop));	    
	    jQuery('.your-profit').html(formatCurrency(articleGroupArr[dgoCurrencyForShop][1] + value1 * articleGroupArr[dgoCurrencyForShop][2] + value2 * articleGroupArr[dgoCurrencyForShop][0]/100, dgoCurrencyForShop));
 }
 //widget overview
    if(article_group_arr != null){
    	if(idGroup != undefined){
	    	widgetOverviewShow(article_group_arr, idGroup);
	    }else{
	    	if(jQuery('.product-groups-selected').html() != null){
	    		var idGroup = jQuery('.product-groups-selected .apiIDHidden').val();
	    		widgetOverviewShow(article_group_arr, idGroup);
	    	}else if(jQuery('.grid-content-row-selected').html() != null){
	    		var idGroup = jQuery('.grid-content-row-selected .id-group-hidden').val();
	    		widgetOverviewShow(article_group_arr, idGroup);
	    	}
	    }	
    }
 else{
	 jQuery('.product-groups-selected').click();
 }
}

//function get product group to grid row
function gotoGrid(action, from, status, idGroup){
		
	//get product group name
	var product_group = articleProfit[idGroup]['name'];
	
	//get product group amount
	var provision_absolute = '<span class="provision-absolute-row">' + formatCurrency(articleProfit[idGroup]['amount'], dgoCurrencyForShop) + '</span>' + ' ' + '<span class="grid-provision-currency">' + dgoCurrencyForShop + '</span>';
 var provision_absolute_hidden = articleProfit[idGroup]['amount'];
 
 //get product group percent
 var provision_relative = formatCurrency(articleProfit[idGroup]['percent'],'EUR') + ' %';
 var provision_relative_hidden = articleProfit[idGroup]['percent'];
 
 //get product group created time
 var product_created = articleProfit[idGroup]['created'];
 var product_created_hidden = articleProfit[idGroup]['createdHidden'];
 
 //get product group modified time
 if(from == 'client'){
 	var now = new Date;
	    var last_change = now.format("dd.mm.yyyy - hh:MM:ss");
	    var last_change_hidden = now.FormatRfcDate(true);
 }else if(from == 'server'){
 	var last_change = articleProfit[idGroup]['modified'];
	    var last_change_hidden = articleProfit[idGroup]['modifiedHidden'];
 }else{
 	console.log('Wrong parameters on gotoGrid() furntion!');
 }
 
 //change array which includes amount and percentage
 var id_discount = articleProfit[idGroup]['groupID'];
 
 var xValue = 0;
 var sliderValue = jQuery( ".percentage-slider" ).slider( "option", "value" );
 if(Math.round(sliderValue) == Math.round(percentStartCal(articleProfit[id_discount]['minPercent']))){
            xValue = sliderValue;
 }else{
     xValue = Math.round(sliderValue);
 }
     
 //if action is add or save
 if(action == 'add'){
 	var id_group_row = "grid-content-row" + idGroup;
 	
     var grid_row = '';
     
     if(status == true){
     	grid_row += '<div onclick="gridRowEdit(' + idGroup + ')" class="grid-content-row ' + id_group_row + '"><div class="grid-product-active"><input class="id-group-hidden" type="hidden" value="' + idGroup + '"/><input type="hidden" value="true" class="input-article-status"><div class="grid-product-active-box"><img src="'+web_2_print_blogInfo+'css/img/icon/tick.png"></div></div><div class="grid-product-group"><div class="grid-product-group-popup"><div class="grid-product-group-popup-arrow"></div><div class="grid-product-group-popup-content"><div class="grid-product-group-popup-content-left"></div><div class="grid-product-group-popup-content-right">Discount for this product is '+articleProfit[idGroup]['minPercent']+'%.</div></div></div>' + product_group + '</div><div class="grid-provision-absolute">' + provision_absolute + '<input type="hidden" value="' + provision_absolute_hidden + '" /></div>';
     }else{
     	grid_row += '<div onclick="gridRowEdit(' + idGroup + ')" class="grid-content-row ' + id_group_row + ' grid-product-deactive"><div class="grid-product-active"><input class="id-group-hidden" type="hidden" value="' + idGroup + '"/><input type="hidden" value="false" class="input-article-status"><div class="grid-product-active-box"></div></div><div class="grid-product-group"><div class="grid-product-group-popup"><div class="grid-product-group-popup-arrow"></div><div class="grid-product-group-popup-content"><div class="grid-product-group-popup-content-left"></div><div class="grid-product-group-popup-content-right">Discount for this product is '+articleProfit[idGroup]['minPercent']+'%.</div></div></div>' + product_group + '</div><div class="grid-provision-absolute">' + provision_absolute + '<input type="hidden" value="' + provision_absolute_hidden + '" /></div>';
     }
     
     grid_row += '<div class="grid-provision-relative"><input type="hidden" value="' + provision_relative_hidden + '" />' + provision_relative + '</div><div class="grid-created"><input type="hidden" value="' + product_created_hidden + '" />' + product_created + '</div><div class="grid-last-change"><input type="hidden" value="' + last_change_hidden + '" />' + last_change + '</div><div onclick="gridRowDelete(' + articleProfit[idGroup]['profitID'] + ')" class="grid-delete-icon" title="Delete this row"></div></div>';
     
     jQuery('.content-grid-content').append(grid_row);        
     
     jQuery('.warning-footer-button span').html(jQuery('#trans-save-now').val());
 }else if(action == 'save'){
 	var id_group_row = ".grid-content-row" + idGroup;
         
     jQuery(id_group_row).children('.grid-provision-absolute').children('.provision-absolute-row').html(formatCurrency(jQuery('.provision-amount-hidden').val(), dgoCurrencyForShop));
     jQuery(id_group_row).children('.grid-provision-absolute').children('.grid-provision-currency').html(dgoCurrencyForShop);
     jQuery(id_group_row).children('.grid-provision-relative').html(provision_relative);
     jQuery(id_group_row).children('.grid-last-change').html(last_change);
 }else{
 	console.log('Wrong parameters on gotoGrid() furntion!');
 }
 
 jQuery('.grid-product-group').hover(function(){
	 jQuery(this).children('.grid-product-group-popup').show();
 },function(){
	 jQuery(this).children('.grid-product-group-popup').hide();
 })
 
 
 //product group hidden
 var product_group_hidden = ".product-groups" + idGroup;
 jQuery(product_group_hidden).css({display: "none"});
}

//function set slider bar
function sliderBarPosSet(amount, percentage){
 //=================== amount first
 
 //change min of amount
 jQuery( ".provision-slider" ).slider( "option", "value", amount );
 
 //change color of progress bar for warning 
 if(amount < 50){
     jQuery('.provision-slider-process').css({background: '#48B43A'});
 }else if(amount < 80){
     jQuery('.provision-slider-process').css({background: '#F3C650'});
 }else{
     jQuery('.provision-slider-process').css({background: '#CA262F'});
 }
 
 //change process
 var processAmount = amount;
 jQuery('.provision-slider-process').width( processAmount + '%');
 
 //change amount
 jQuery('.provision-amount-hidden').val(articleGroupArr[dgoCurrencyForShop][1] + amount * articleGroupArr[dgoCurrencyForShop][2]);
 jQuery('.provision-amount').html(formatCurrency(articleGroupArr[dgoCurrencyForShop][1] + amount * articleGroupArr[dgoCurrencyForShop][2], dgoCurrencyForShop));    
 
 //=================== percentage
 //change min of percentage
 jQuery( ".percentage-slider" ).slider( "option", "value", percentage );
 
 //change process
 var processPercentage = percentage;
 jQuery('.percentage-slider-process').width( processPercentage + '%');
 
 //change color of progress bar for warning 
 if(percentage < 50){
     jQuery('.percentage-slider-process').css({background: '#48B43A'});
 }else if(percentage < 80){
     jQuery('.percentage-slider-process').css({background: '#F3C650'});
 }else{
     jQuery('.percentage-slider-process').css({background: '#CA262F'});
 }
 
 //change percentage
 jQuery('.provision-percent-hidden').val( percentage );
 jQuery('.provision-percent').html(formatCurrency( percentage, 'EUR' ));
 jQuery('.provision-calculate-percent .provision-price-element').html(formatCurrency(percentage * articleGroupArr[dgoCurrencyForShop][0]/100, dgoCurrencyForShop));    
 jQuery('.your-profit').html(formatCurrency( articleGroupArr[dgoCurrencyForShop][1] + amount * articleGroupArr[dgoCurrencyForShop][2] + percentage * articleGroupArr[dgoCurrencyForShop][0]/100, dgoCurrencyForShop));
}

//function set slider bar
function sliderBarMinPosSet(percentage){ 
 //=================== percentage
 //change min of percentage
 jQuery( ".percentage-slider" ).slider( "option", "min", percentage );
 
 //change margin left of slider
 if(percentage > 90){
     var marginPercentage = percentage - 5;    
 }else{
     var marginPercentage = percentage + 4;        
 }

 marginPercentage = marginPercentage + '%';
 jQuery('.percentage-slider').css({marginLeft: marginPercentage})
 
 //change process
 var processPercentage = percentage;
 jQuery('.percentage-slider-process').width( processPercentage + '%');
}

//fumction calculate percentate
function percentStartCal(percentDiscount){    
 var merchant = parseFloat(jQuery('.provision-merchant').val());
 
 var ourPrice = merchant - percentDiscount * merchant / 100;
 
 var percentStart = (merchant / ourPrice - 1)  * 100;
 
 return percentStart;
}

function percentReCal(percent){
 var merchant = parseFloat(jQuery('.provision-merchant').val());
 
 var ourPrice = merchant / (percent + 100) * 100;
 
 var percentReCal = (merchant - ourPrice) / merchant * 100;
 
 return percentReCal;
}

//Function for datagrid
function gridRowEdit(idGroup){
	
	 //remove selected product in available product 
	 jQuery('.product-groups').removeClass('product-groups-selected');
	
	 //change button text to 'save now'
	 jQuery('.warning-footer-button span').html(jQuery('#trans-save-now').val());
		
	 //change the calculation label
	 jQuery('.provision-calculate-choose span:nth-child(2)').html(articleProfit[idGroup]['name']);
	 
	 //row grid edit click 
	 var id_grid_row = '.grid-content-row' + idGroup;
	 jQuery('.grid-content-row').removeClass('grid-content-row-selected');
	 jQuery(id_grid_row).addClass('grid-content-row-selected');
	 
	 //change currency
	 var currency = jQuery(id_grid_row).children('.grid-provision-absolute').children('.grid-provision-currency').html();
	 
	 //set the min percentage
	 sliderBarMinPosSet(percentStartCal(articleProfit[idGroup]['minPercent']));
	 
	 var amount = articleProfit[idGroup]['amount'];
	 
	 amount = amount / articleGroupArr[dgoCurrencyForShop][2];
	 	 
	 //change amount and percentage                                 
	 sliderBarPosSet( amount , articleProfit[idGroup]['percent'] );
	 
	 if(currency != null){
	     adminCurChange(currency, idGroup);
	     jQuery('.maintain-title-right .currency-select').val(currency);
	 }     
		
	 if(article_group_arr == null){
    	w2pArticleGet1(idGroup);
    }else{
    	widgetOverviewShow(article_group_arr, idGroup);
    }
}

function gridRowActive(idGroup){
	//block ui
	jQuery.blockUI(0);
	
 //ok delete this row
 var id_grid_row = '.grid-content-row' + idGroup;
 jQuery(id_grid_row).removeClass('grid-product-deactive');         
 jQuery(id_grid_row + ' .grid-product-active-box').html('<img src="'+web_2_print_blogInfo+'css/img/icon/tick.png">');         
 jQuery(id_grid_row + ' .input-article-status').val("true");         
 
 //save to array and object
 articleProfit[idGroup]['active'] = true;
 
 for(var i = 0; i < shopDiscount.length; i++){
 	if(shopDiscount[i].shopID == currentShop){
 		for(var j = 0; j < shopDiscount[i].Product.length; j++){
 			if(shopDiscount[i].Product[j].groupID == idGroup){
 				shopDiscount[i].Product[j].groupActive = articleProfit[idGroup]['active'];	    				
 			}
 		}
 	}
 }
 //save to api	    
 articleProfitUpdate(articleProfit[idGroup], true);
     
}

function gridRowDeactive(idGroup){
	//block ui
	jQuery.blockUI(0);	
	
	 //ok delete this row
	 var id_grid_row = '.grid-content-row' + idGroup;
	 jQuery(id_grid_row).addClass('grid-product-deactive');         
	 jQuery(id_grid_row + ' .grid-product-active-box').html('');         
	 jQuery(id_grid_row + ' .input-article-status').val("false");         
	 
	 //save to array and object
	 articleProfit[idGroup]['active'] = false;
	
	 for(var i = 0; i < shopDiscount.length; i++){
	 	if(shopDiscount[i].shopID == currentShop){
	 		for(var j = 0; j < shopDiscount[i].Product.length; j++){
	 			if(shopDiscount[i].Product[j].groupID == idGroup){
	 				shopDiscount[i].Product[j].groupActive = articleProfit[idGroup]['active'];	    				
	 			}
	 		}
	 	}
	 }
	 //save to api	    
	 articleProfitUpdate(articleProfit[idGroup], false);
     
}

function gridRowDelete(idDiscountProfit){	
	
	//delete grid row 
 if(confirm('Are you sure want to delete this row?')){                
 	//block ui
 	jQuery.blockUI();
 	
 	//delete discount profit	    
 	articleProfitDelete(idDiscountProfit);
 }    
}

function gridRowSort(type){
 var productGroup = [];
 var productGroupID = [];
 var flag = 0;
 
 switch(type){
     case "product":
         jQuery('.content-grid-content').find('.grid-product-group').each(function(){
             var product_name_id = jQuery(this).html() + jQuery(this).parent().find('.id-group-hidden').val();
             productGroup.push(product_name_id);
             productGroupID[product_name_id] = jQuery(this).parent().find('.id-group-hidden').val();
         });
         
         //identify flag
         flag = jQuery('.grid-title .grid-product-group input').val();
         break;
     case "absolute":
         jQuery('.content-grid-content').find('.grid-provision-absolute').each(function(){
             var product_name_id = jQuery(this).children('input').val() + jQuery(this).parent().find('.id-group-hidden').val();
             productGroup.push(product_name_id);
             productGroupID[product_name_id] = jQuery(this).parent().find('.id-group-hidden').val();
         });
         
         //identify flag
         flag = jQuery('.grid-title .grid-provision-absolute input').val();
         break;
     case "relative":
         jQuery('.content-grid-content').find('.grid-provision-relative').each(function(){
             var product_name_id = jQuery(this).children('input').val() + jQuery(this).parent().find('.id-group-hidden').val();
             productGroup.push(product_name_id);
             productGroupID[product_name_id] = jQuery(this).parent().find('.id-group-hidden').val();
         });
         
         //identify flag
         flag = jQuery('.grid-title .grid-provision-relative input').val();
         break;
     case "created":
         jQuery('.content-grid-content').find('.grid-created').each(function(){
             var product_name_id = jQuery(this).children('input').val() + jQuery(this).parent().find('.id-group-hidden').val();
             productGroup.push(product_name_id);
             productGroupID[product_name_id] = jQuery(this).parent().find('.id-group-hidden').val();
         });
         
         //identify flag
         flag = jQuery('.grid-title .grid-created input').val();
         break;
     case "modified":
         jQuery('.content-grid-content').find('.grid-last-change').each(function(){
             var product_name_id = jQuery(this).children('input').val() + jQuery(this).parent().find('.id-group-hidden').val();
             productGroup.push(product_name_id);
             productGroupID[product_name_id] = jQuery(this).parent().find('.id-group-hidden').val();
         });
         
         //identify flag
         flag = jQuery('.grid-title .grid-last-change input').val();
         break;            
 }
  
 
 //sort productGroup
 if(flag == 0){
     //sort ascending
     if(type == "absolute"){
     	productGroup.sort(compare);
     }else{
     	productGroup.sort();
     }
             
     flag = 1;   
 }else{
     //sort descending
     if(type == "absolute"){
     	productGroup.sort(compare);
     }else{
     	productGroup.sort();
     }   
     productGroup.reverse();
     flag = 0;
 }

 //return flag to input
 switch(type){
     case "product":
         jQuery('.grid-title .grid-product-group input').val(flag);
         break;
     case "absolute":
         jQuery('.grid-title .grid-provision-absolute input').val(flag);
         break;
     case "relative":
         jQuery('.grid-title .grid-provision-relative input').val(flag);
         break;
     case "created":
         jQuery('.grid-title .grid-created input').val(flag);
         break;
     case "modified":
         jQuery('.grid-title .grid-last-change input').val(flag);
         break;
 }  

 //begin to sort
 var grid_row_id = '';
 var idGroup = '';
 for(var i = 0; i < productGroup.length; i++){
     //get row
     idGroup = productGroupID[productGroup[i]]; 
     grid_row_id = '.grid-content-row' + idGroup;
     
     //sort
     jQuery(grid_row_id).appendTo('.content-grid-content');
 }
}

//show statistic chart in earnMoney page
function showChart(){
	jQuery.doTimeout(10,function() {
		
		//remove old chart 
		jQuery('#earn-money-statistic-chart').html('');
		
		if(AffiliateSales == null){
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
			
			jQuery('.jqplot-noData-contents').html(jQuery('#trans-no-sales-yet').val());
		}else{
			//Statistic chart
		    jQuery.jqplot('earn-money-statistic-chart', ArrOrdersDateArticle, {
				series: ArrLabelChart,	
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
				   tooltipLocation: 'ne',
				   useAxesFormatters: true,
				   formatString: 'Date: %s - %d sales'
			   }
			   
			});
		    
		    //set css for label table
		    jQuery('.jqplot-table-legend').css({"padding":"0 3px"});
		}
		
		
	});
}

//find the previous day
function findPreviousDay(currDay){
	var prevDay = null;
	
	currDay = currDay.split("/");
	currDay = new Date(currDay[2]+"/"+currDay[1]+"/"+currDay[0]);
	prevDay = new Date(currDay.getTime() - 86400000);
	prevDay = prevDay.format('dd/mm/yyyy');
	
	return prevDay;
}


//refresh button
function refreshChart(option){
	if(AffiliateSalesAfterSort.length > 0){				
		
		//array use to show chart
		newArrayAffiliateSales 	= new Array();
		
		newArrayLabel = null;
		//array use to show label
		newArrayLabel  			= new Array();
		//new array orders date
		newArrOrdersDate		= new Array();
		
		switch(option){
			case "changeShop": {
					//remove old chart 
					jQuery('#earn-money-statistic-chart').html('');
					
					chartPeriodOptions = 'changeShop';
					
					//get choice shop in select box 
					var choiceShop = jQuery('#earn-money-select-shop').val();
					
					if(choiceShop == 'all'){
						//if the choice shop is All Shop
						newArrayAffiliateSales 	= ArrOrdersDateArticle;
						newArrayLabel			= ArrLabelChart;
						newArrOrdersDate 		= ArrOrdersDate;
					}else{
						//get currnent shop want to see
						for(var i = 0;i < AffiliateSalesAfterSort.length;i++){
							if(AffiliateSalesAfterSort[i][0] != undefined){
								//get array affiliate sales of choice shop  
								if(AffiliateSalesAfterSort[i][0].ResaleUnitId == choiceShop){
									newArrayAffiliateSales.push(ArrOrdersDateArticle[i]);
									newArrOrdersDate = ArrOrdersDate;
									var objTmp = {
											"label": ArrLabelChart[i].label
										};
										
									newArrayLabel.push(objTmp); 
									break;
								}
							}
						}

						if(newArrayAffiliateSales.length == 0){
							jQuery('#earn-money-tab-3-select-period').attr({'disabled':true});
							jQuery('#dialog-earn-money-tab-3-select-period').attr({'disabled':true});
							
							var objTmp = {
									"label": jQuery('#earn-money-select-shop option:selected').html()
								};
							newArrayLabel.push(objTmp); 
							
							newArrOrdersDate = ArrOrdersDate;
							newArrayAffiliateSales[0] = [];
							for(var x = 0;x < ArrOrdersDate.length; x++){								
								newArrayAffiliateSales[0].push([ArrOrdersDate[x],0]);
							}
						}else{
							jQuery('#earn-money-tab-3-select-period').attr({'disabled':false});
							jQuery('#dialog-earn-money-tab-3-select-period').attr({'disabled':false});
		        		}
					}
					

				break;
			}
			
			case "changeTimeviaDropdown": {			
					
					var periodTime 	= jQuery('#earn-money-tab-3-select-period').val();
					var choiceShop 	= jQuery('#earn-money-select-shop').val();					
					var newAffiliateSalesAfterSort = new Array();
					
					if(choiceShop == 'all'){
						//if the choice shop is All Shop
						newAffiliateSalesAfterSort 	= AffiliateSalesAfterSort;
						newArrOrdersDate 			= ArrOrdersDate;
					}else{
						for(var i = 0;i < AffiliateSalesAfterSort.length;i++){
							if(AffiliateSalesAfterSort[i][0] != undefined){
								//get array affiliate sales of choice shop 
								if(AffiliateSalesAfterSort[i][0].ResaleUnitId == choiceShop){
									newAffiliateSalesAfterSort.push(AffiliateSalesAfterSort[i]);
									var objTmp = {
											"label": ArrLabelChart[i].label
										};
										
									newArrayLabel.push(objTmp); 
									break;
								}
							}
						}
					}
					
					//options is last 7 days
					if(periodTime == 'last-7-days' && chartPeriodOptions != 'last-7-days'){					
						
						//set current period option
						chartPeriodOptions = "last-7-days";
						
						for(var i=0;i < newAffiliateSalesAfterSort.length;i++){
							var flagBreak = 0;//limit 7 days before
							newArrayAffiliateSales[i] 	= new Array();
							newArrOrdersDate			= null;
							newArrOrdersDate			= new Array();
							//the min day in array newArrOrdersDate
							//use to calculate the last 7 days
							var minDay = ArrOrdersDate[0];						
								minDay = minDay.format('dd/mm/yyyy');
								//back to prev day
								minDay = findPreviousDay(minDay);							
								
							for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
								if(flagBreak < 7){
									//the last day in newArrayAffiliateSales array								
		            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();	            					
		            					lastDay = lastDay.format("dd/mm/yyyy");
		            					
		            				if(minDay == lastDay && flagBreak < 7){
		            						
		            						//add to newArrayAffiliateSales & newArrOrdersDate arrays
		            						newArrayAffiliateSales[i].push([minDay,newAffiliateSalesAfterSort[i][j].OrderCount]);
		            						newArrOrdersDate.push(minDay);
		            						
		            						//back to prev day
		    								minDay = findPreviousDay(minDay);
		    								
		    								//increase flagBreak
		            						flagBreak++;
		            				}else if(minDay > lastDay && flagBreak < 7){	            					
		            					while(minDay > lastDay && flagBreak < 7){
		            						//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([minDay,0]);
		            						newArrOrdersDate.push(minDay);
		            						
		            						//back to prev day
		    								minDay = findPreviousDay(minDay);
		    								
		    								//increase flagBreak         						
		            						flagBreak++;
		            					}
		            					
		            					//if the prev day is the last day in AffiliateSalesAfterSort[i] and flagBreak still < 7 (not enough 7 days to show chart)
	            						//add the last day to array
	            						if(flagBreak < 7){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
	            							newArrOrdersDate.push(lastDay);
	            							
	            							//back to prev day
	        								minDay = findPreviousDay(minDay);
	            							
	        								//increase flagBreak
	                            			flagBreak++;
	            						}
	            						            						
		            				}else{
		            					if(j == 0 && newArrayAffiliateSales[i].length < 7){
	            							while(flagBreak < 7){
	            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            								newArrayAffiliateSales[i].push([minDay,0]);                    			
	                                			newArrOrdersDate.push(minDay);
	                                			
	                                			//back to prev day
	            								minDay = findPreviousDay(minDay);
	            								
	            								//increase flagBreak
	                                			flagBreak++;
	            							}
	            						}
		            				}
								}
							}
							
							while(flagBreak < 7){
								//add to newArrayAffiliateSales & newArrOrdersDate arrays
								newArrayAffiliateSales[i].push([minDay,0]);                    			
	                			newArrOrdersDate.push(minDay);
	                			
	                			//back to prev day
								minDay = findPreviousDay(minDay);
	                			
								//increase flagBreak
	                			flagBreak++;
							}
							
						}
					}
					
					//option is this month
					if(periodTime == 'this-month' && chartPeriodOptions != 'this-month'){
						
						//set current period option
						chartPeriodOptions = "this-month";
						
						//create array to use for jqplot
		        		//array like: [[['10/10/2011',4],['9/10/2011',4],['8/10/2011',4],...],...]
		        		for(var i = 0;i < newAffiliateSalesAfterSort.length; i++){
		        			newArrayAffiliateSales[i] 	= new Array();
							newArrOrdersDate			= null;
							newArrOrdersDate			= new Array();
							
							for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
								//the last day in newArrayAffiliateSales array
	            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();            					
	            					lastDay = lastDay.format("dd/mm/yyyy"); 
	            					
	            				//today
	            				var today = new Date();
	            					today = today.format("dd/mm/yyyy");
	            						
	            					//
	            					if(lastDay.split("/")[1] != today.split("/")[1]){
	            						if(newArrayAffiliateSales[i].length == 0){
	            							var curentMonth = today.split("/")[1];
		            						while(today.split("/")[1] == curentMonth){
		            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                							newArrayAffiliateSales[i].push([today,0]);                    			
	                							newArrOrdersDate.push(today);
	                							
	                                			//back to prev day
	                                			today = findPreviousDay(today);
		            						}
	            						}	            						
	            						break;
	            					}
	            					
	            					if(newArrayAffiliateSales[i].length == 0){
	                					//we have to show the day begin is today
	                					if(lastDay == today){
	                						//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                						newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                    			
	                						newArrOrdersDate.push(lastDay);
	                						
	                					}else{
	                						
	                						//set sales value for today is 0 if the last day in newArrayAffiliateSales[i] is not today and back to prev day
	                						//and if the prev day is not the last day in newArrayAffiliateSales[i], we set sales value is 0 too
	                						//until the prev day is equal with the last day in newArrayAffiliateSales[i]
	                						while(lastDay != today && today.split("/")[1] == lastDay.split("/")[1]){
	                							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                							newArrayAffiliateSales[i].push([today,0]);                    			
	                							newArrOrdersDate.push(today);
	                							
	                                			//back to prev day
	                                			today = findPreviousDay(today);
	                                			                           			
	                						}
	                						
	                						//if the prev day is the last day in newArrayAffiliateSales[i]
	                						//add the last day to array
	                						if(lastDay == today){
	                							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
	                							newArrOrdersDate.push(lastDay);
	                							
	                						}
	                						
	                						if(j == 0 && today.split("/")[1] == lastDay.split("/")[1]){
	                							while(today.split("/")[1] == lastDay.split("/")[1]){
	                								//back to prev day
	                                    			today = findPreviousDay(today);
	                                    			
	                                    			//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                                    			newArrayAffiliateSales[i].push([today,0]);                    			
	                                    			newArrOrdersDate.push(today);
	                                    			
	                							}
	                						}
	                					}             			
	                				}else{        	
	                					//back to prev day
	            						var preDay = findPreviousDay(newArrOrdersDate[newArrOrdersDate.length-1]);        							
	            							
	            						while(lastDay != preDay && preDay.split("/")[1] == lastDay.split("/")[1]){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([preDay,0]);                    			
	            							newArrOrdersDate.push(preDay);   
	            							
	                            			//back to prev day
	                            			preDay = findPreviousDay(preDay);	                            			
	            						}
	            						
	            						if(lastDay == preDay){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
	            							newArrOrdersDate.push(lastDay);
	            							
	            						}
	                        			
	            						//show all days in month        						
	            						if(j == 0 && preDay.split("/")[1] == today.split("/")[1]){
                							while(preDay.split("/")[1] == today.split("/")[1]){
                								//back to prev day
                								preDay = findPreviousDay(preDay);
                                    			
                                    			if(preDay.split("/")[1] == today.split("/")[1]){
                                    				//add to newArrayAffiliateSales & newArrOrdersDate arrays
                                        			newArrayAffiliateSales[i].push([preDay,0]);                    			
                                        			newArrOrdersDate.push(preDay);
                                    			}
                                    			                                    			
                							}
                						}
	                					
	                				}
							}
		        		}
		        		
		        		for(var i = 0; i < newArrayAffiliateSales.length; i++){
		        			if(newArrayAffiliateSales[i].length == 0){
		        				for(var x = 0; x < newArrOrdersDate.length; x++){
		        					newArrayAffiliateSales[i].push([newArrOrdersDate[x],0]);
		        				}
		        			}
		        		}
		        		
					}
					
					//option is last month
					if(periodTime == 'last-month' && chartPeriodOptions != 'last-month'){
						
						//set current period option
						chartPeriodOptions = "last-month";

						//create array to use for jqplot
		        		//array like: [[['10/10/2011',4],['9/10/2011',4],['8/10/2011',4],...],...]
		        		for(var i = 0;i < newAffiliateSalesAfterSort.length; i++){
		        			newArrayAffiliateSales[i] 	= new Array();
							newArrOrdersDate			= null;
							newArrOrdersDate			= new Array();

							for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
								//the last day in newArrayAffiliateSales array
	            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();            					
	            					lastDay = lastDay.format("dd/mm/yyyy"); 
	            					
	            				var lastDayOfPreviousMonth = new Date();
	            					lastDayOfPreviousMonth.setDate(1);
	            					lastDayOfPreviousMonth = lastDayOfPreviousMonth.format("dd/mm/yyyy");
	            					//back to prev day
	            					lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth); 
	            					
	            					
	            					if(lastDay.split("/")[1] == lastDayOfPreviousMonth.split("/")[1]){
	            						if(newArrayAffiliateSales[i].length == 0){
		            						if(lastDay == lastDayOfPreviousMonth){
		            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                    			
		                						newArrOrdersDate.push(lastDay);
		            						}else{
		            							while(lastDay != lastDayOfPreviousMonth && lastDayOfPreviousMonth.split("/")[1] == lastDay.split("/")[1]){
		            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                							newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
		                							newArrOrdersDate.push(lastDayOfPreviousMonth);
		                							
		                                			//back to prev day
		                							lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
		            							}
		            							
		            							
		                						if(lastDay == lastDayOfPreviousMonth){
		                							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
		                							newArrOrdersDate.push(lastDay);
		                							
		                						}
		                						
		                						if(j == 0 && lastDayOfPreviousMonth.split("/")[1] == lastDay.split("/")[1]){
		                							while(lastDayOfPreviousMonth.split("/")[1] == lastDay.split("/")[1]){
		                								//back to prev day
		                								lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
		                                    			
		                                    			//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                                    			newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
		                                    			newArrOrdersDate.push(lastDayOfPreviousMonth);
		                                    			
		                							}
		                						}
		            						}
	            						}else{
	            							//back to prev day
		            						var preDay = findPreviousDay(newArrOrdersDate[newArrOrdersDate.length-1]);        							
		            							
		            						while(lastDay != preDay && preDay.split("/")[1] == lastDay.split("/")[1]){
		            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		            							newArrayAffiliateSales[i].push([preDay,0]);                    			
		            							newArrOrdersDate.push(preDay);   
		            							
		                            			//back to prev day
		                            			preDay = findPreviousDay(preDay);	                            			
		            						}
		            						
		            						if(lastDay == preDay){
		            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
		            							newArrOrdersDate.push(lastDay);
		            							
		            						}
		                        			
		            						//show all days in month        						
		            						if(j == 0 && preDay.split("/")[1] == lastDayOfPreviousMonth.split("/")[1]){
	                							while(preDay.split("/")[1] == lastDayOfPreviousMonth.split("/")[1]){
	                								//back to prev day
	                								preDay = findPreviousDay(preDay);
	                                    			
	                                    			if(preDay.split("/")[1] == lastDayOfPreviousMonth.split("/")[1]){
	                                    				//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                                        			newArrayAffiliateSales[i].push([preDay,0]);                    			
	                                        			newArrOrdersDate.push(preDay);
	                                    			}
	                                    			                                    			
	                							}
	                						}
	            						}
	            					}else if(j == 0 && newArrayAffiliateSales[i].length == 0){
	            						
	            						var currentMonth = lastDayOfPreviousMonth.split("/")[1];
	            						while(lastDayOfPreviousMonth.split("/")[1] == currentMonth){
	            							
            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
                							newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
                							newArrOrdersDate.push(lastDayOfPreviousMonth);
                							
                                			//back to prev day
                							lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
            							}
	            					}
	            					
	            					
							}
		        		}
		        		
		        		for(var i = 0; i < newArrayAffiliateSales.length; i++){
		        			if(newArrayAffiliateSales[i].length == 0){
		        				for(var x = 0; x < newArrOrdersDate.length; x++){
		        					newArrayAffiliateSales[i].push([newArrOrdersDate[x],0]);
		        				}
		        			}
		        		}
		        		
					}
					
					//option is this month
					if(periodTime == 'last-year' && chartPeriodOptions != 'last-year'){
						
						//set current period option
						chartPeriodOptions = "last-year";

						//create array to use for jqplot
		        		//array like: [[['10/10/2011',4],['9/10/2011',4],['8/10/2011',4],...],...]
		        		for(var i = 0;i < newAffiliateSalesAfterSort.length; i++){
		        			newArrayAffiliateSales[i] 	= new Array();
							newArrOrdersDate			= null;
							newArrOrdersDate			= new Array();

							for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
								//the last day in newArrayAffiliateSales array
	            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();            					
	            					lastDay = lastDay.format("dd/mm/yyyy"); 
	            					
	            				var lastDayOfPreviousMonth = new Date();	            					
	            					lastDayOfPreviousMonth.setFullYear(lastDayOfPreviousMonth.getFullYear()-1);
	            					lastDayOfPreviousMonth.setDate(30);
	            					lastDayOfPreviousMonth.setMonth(11);
	            					lastDayOfPreviousMonth = lastDayOfPreviousMonth.format("dd/mm/yyyy");
	            					
	            					if(lastDay.split("/")[2] == lastDayOfPreviousMonth.split("/")[2]){
	            						if(newArrayAffiliateSales[i].length == 0){
		            						if(lastDay == lastDayOfPreviousMonth){
		            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                    			
		                						newArrOrdersDate.push(lastDay);
		            						}else{
		            							while(lastDay != lastDayOfPreviousMonth && lastDayOfPreviousMonth.split("/")[2] == lastDay.split("/")[2]){
		            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                							newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
		                							newArrOrdersDate.push(lastDayOfPreviousMonth);
		                							
		                                			//back to prev day
		                							lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
		            							}
		            							
		            							
		                						if(lastDay == lastDayOfPreviousMonth){
		                							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
		                							newArrOrdersDate.push(lastDay);
		                							
		                						}
		                						
		                						if(j == 0 && lastDayOfPreviousMonth.split("/")[2] == lastDay.split("/")[2]){
		                							while(lastDayOfPreviousMonth.split("/")[2] == lastDay.split("/")[2]){
		                								//back to prev day
		                								lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
		                                    			
		                                    			//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                                    			newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
		                                    			newArrOrdersDate.push(lastDayOfPreviousMonth);
		                                    			
		                							}
		                						}
		            						}
	            						}else{
	            							//back to prev day
		            						var preDay = findPreviousDay(newArrOrdersDate[newArrOrdersDate.length-1]);        							
		            							
		            						while(lastDay != preDay && preDay.split("/")[2] == lastDay.split("/")[2]){
		            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		            							newArrayAffiliateSales[i].push([preDay,0]);                    			
		            							newArrOrdersDate.push(preDay);   
		            							
		                            			//back to prev day
		                            			preDay = findPreviousDay(preDay);	                            			
		            						}
		            						
		            						if(lastDay == preDay){
		            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
		            							newArrOrdersDate.push(lastDay);
		            							
		            						}
		                        			
		            						//show all days in month        						
		            						if(j == 0 && preDay.split("/")[2] == lastDayOfPreviousMonth.split("/")[2]){
	                							while(preDay.split("/")[2] == lastDayOfPreviousMonth.split("/")[2]){
	                								//back to prev day
	                								preDay = findPreviousDay(preDay);
	                                    			
	                                    			if(preDay.split("/")[2] == lastDayOfPreviousMonth.split("/")[2]){
	                                    				//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                                        			newArrayAffiliateSales[i].push([preDay,0]);                    			
	                                        			newArrOrdersDate.push(preDay);
	                                    			}
	                                    			                                    			
	                							}
	                						}
	            						}
	            					}else if(j == 0 && newArrayAffiliateSales[i].length == 0){
	            						
	            						var currentYear = lastDayOfPreviousMonth.split("/")[2];
	            						
	            						while(lastDayOfPreviousMonth.split("/")[2] == currentYear){	            							
            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
                							newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
                							newArrOrdersDate.push(lastDayOfPreviousMonth);
                							
                                			//back to prev day
                							lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
            							}
	            					}
	            					
	            					
							}
		        		}	
		        		
		        		for(var i = 0; i < newArrayAffiliateSales.length; i++){
		        			if(newArrayAffiliateSales[i].length == 0){
		        				for(var x = 0; x < newArrOrdersDate.length; x++){
		        					newArrayAffiliateSales[i].push([newArrOrdersDate[x],0]);
		        				}
		        			}
		        		}
		        		
					}
						
					//option is this month
					if(periodTime == 'whole' && chartPeriodOptions != 'whole'){
						
						//set current period option
						chartPeriodOptions = "whole";

						//create array to use for jqplot
		        		//array like: [[['10/10/2011',4],['9/10/2011',4],['8/10/2011',4],...],...]
		        		for(var i = 0;i < newAffiliateSalesAfterSort.length; i++){
		        			newArrayAffiliateSales[i] 	= new Array();
							newArrOrdersDate			= null;
							newArrOrdersDate			= new Array();

							for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
								//the last day in newArrayAffiliateSales array
	            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();            					
	            					lastDay = lastDay.format("dd/mm/yyyy"); 
	            					            						            					
            						if(newArrayAffiliateSales[i].length == 0){
	            						    newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                    			
	                						newArrOrdersDate.push(lastDay);
	            					}else{
            							//back to prev day
	            						var preDay = findPreviousDay(newArrOrdersDate[newArrOrdersDate.length-1]);        							
	            							
	            						while(lastDay != preDay){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([preDay,0]);                    			
	            							newArrOrdersDate.push(preDay);   
	            							
	                            			//back to prev day
	                            			preDay = findPreviousDay(preDay);	                            			
	            						}
	            						
	            						if(lastDay == preDay){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
	            							newArrOrdersDate.push(lastDay);
	            							
	            						}	                        			
            						}
							}
		        		}
		        		
		        		for(var i = 0; i < newArrayAffiliateSales.length; i++){
		        			if(newArrayAffiliateSales[i].length == 0){
		        				for(var x = 0; x < newArrOrdersDate.length; x++){
		        					newArrayAffiliateSales[i].push([newArrOrdersDate[x],0]);
		        				}
		        			}
		        		}
		        		
					}
					
					//change date format from '18/8/2011' to Date {Thu Aug 18 2011 11:32:08 GMT+0700 (SE Asia Standard Time)}
	        		//to show chart, jqplot doesn't understand format '18/8/2011'
	        		for(var x = 0;x < newArrOrdersDate.length;x++){
	        			var day = newArrOrdersDate[x].split("/");
	        				day = day[2]+"/"+day[1]+"/"+day[0];
	        				newArrOrdersDate[x] = new Date(day);
	        		}
	        		
	        		//change date format from '18/8/2011' to Date {Thu Aug 18 2011 11:32:08 GMT+0700 (SE Asia Standard Time)}
	        		//to show chart, jqplot doesn't understand format '18/8/2011'
	        		for(var x = 0;x < newArrayAffiliateSales.length;x++){
	        			for(var i=0;i < newArrayAffiliateSales[x].length;i++){
	        				if(newArrayAffiliateSales[x][i] != undefined){
	        					var day = newArrayAffiliateSales[x][i][0].split("/");
	    						day = day[2]+"/"+day[1]+"/"+day[0];
	    						newArrayAffiliateSales[x][i][0] = new Date(day);
	    					
			    				if(maxValue < newArrayAffiliateSales[x][i][1]){
			    					maxValue = newArrayAffiliateSales[x][i][1];
			    				}
	        				}
	        				
	        			}
	        			
	        		}
	        		
	        		//reverse arrays
	        		newArrOrdersDate 		= newArrOrdersDate.reverse();
				
				break;
			}
			
			case "changeTimeviaInput": {				
								
				var newAffiliateSalesAfterSort = new Array();
				
				var choiceShop 	= jQuery('#earn-money-select-shop').val();	
				
					for(var i = 0;i < AffiliateSalesAfterSort.length;i++){
						//get array affiliate sales of choice shop 
						if(AffiliateSalesAfterSort[i][0].ResaleUnitId == choiceShop){
							newAffiliateSalesAfterSort.push(AffiliateSalesAfterSort[i]);
							var objTmp = {
									"label": ArrLabelChart[i].label
								};
								
							newArrayLabel.push(objTmp); 
							break;
						}else if(i == AffiliateSalesAfterSort.length-1){
							//if the choice shop is All Shop
							newAffiliateSalesAfterSort 	= AffiliateSalesAfterSort;
							newArrayLabel				= ArrLabelChart;
						}
					}									

					for(var i=0;i < newAffiliateSalesAfterSort.length;i++){
						var flagBreak = 0;//limit 7 days before
						newArrayAffiliateSales[i] 	= new Array();
						newArrOrdersDate			= null;
						newArrOrdersDate			= new Array();
						
						var periodDate 	= jQuery('#earn-money-calendar').val();
							periodDate 	= periodDate.split("-");
						var fromDate 	= periodDate[0].trim();
						var toDate 		= periodDate[1].trim();
						var limitDay 	= ((new Date(toDate.split(".")[2]+"/"+toDate.split(".")[1]+"/"+toDate.split(".")[0])) - (new Date(fromDate.split(".")[2]+"/"+fromDate.split(".")[1]+"/"+fromDate.split(".")[0])))/86400000;
					
							fromDate = fromDate.replace(/\./g,"/");				
							toDate = toDate.replace(/\./g,"/");
							
						for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
							if(flagBreak <= limitDay){
								//the last day in newArrayAffiliateSales array								
	            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();	            					
	            					lastDay = lastDay.format("dd/mm/yyyy");
	            				if(toDate.split("/")[1] == lastDay.split("/")[1]){
	            					if(toDate == lastDay && flagBreak <= limitDay){
	            						
	            						//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            						newArrayAffiliateSales[i].push([toDate,newAffiliateSalesAfterSort[i][j].OrderCount]);
	            						newArrOrdersDate.push(toDate);
	            						
	            						//back to prev day
	            						toDate = findPreviousDay(toDate);
	    								
	    								//increase flagBreak
	            						flagBreak++;
		            				}else if(toDate > lastDay && flagBreak <= limitDay){	            					
		            					while(toDate > lastDay && flagBreak <= limitDay){
		            						//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([toDate,0]);
		            						newArrOrdersDate.push(toDate);
		            						
		            						//back to prev day
		            						toDate = findPreviousDay(toDate);
		            						
		    								//increase flagBreak         						
		            						flagBreak++;
		            					}
		            					
		            					//if the prev day is the last day in AffiliateSalesAfterSort[i] and flagBreak still < 7 (not enough 7 days to show chart)
	            						//add the last day to array
	            						if(toDate == lastDay && flagBreak <= limitDay){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
	            							newArrOrdersDate.push(lastDay);
	            							
	            							//back to prev day
	            							toDate = findPreviousDay(toDate);
	            							
	        								//increase flagBreak
	                            			flagBreak++;
	            						}
	            						            						
		            				}else{
		            					if(j == 0 && flagBreak <= limitDay){
	            							while(flagBreak <= limitDay){
	            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            								newArrayAffiliateSales[i].push([toDate,0]);                    			
	                                			newArrOrdersDate.push(toDate);
	                                			
	                                			//back to prev day
	                                			toDate = findPreviousDay(toDate);
	                                			
	            								//increase flagBreak
	                                			flagBreak++;
	            							}
	            						}
		            				}
	            				}		            				
							}
						}
						
						while(flagBreak <= limitDay){
							//add to newArrayAffiliateSales & newArrOrdersDate arrays
							newArrayAffiliateSales[i].push([toDate,0]);                    			
                			newArrOrdersDate.push(toDate);
                			
                			//back to prev day
                			toDate = findPreviousDay(toDate);
                			
							//increase flagBreak
                			flagBreak++;
						}
						
					}
				
				//change date format from '18/8/2011' to Date {Thu Aug 18 2011 11:32:08 GMT+0700 (SE Asia Standard Time)}
        		//to show chart, jqplot doesn't understand format '18/8/2011'
        		for(var x = 0;x < newArrOrdersDate.length;x++){
        			var day = newArrOrdersDate[x].split("/");
        				day = day[2]+"/"+day[1]+"/"+day[0];
        				newArrOrdersDate[x] = new Date(day);
        		}
        		
        		//change date format from '18/8/2011' to Date {Thu Aug 18 2011 11:32:08 GMT+0700 (SE Asia Standard Time)}
        		//to show chart, jqplot doesn't understand format '18/8/2011'
        		for(var x = 0;x < newArrayAffiliateSales.length;x++){
        			for(var i=0;i < newArrayAffiliateSales[x].length;i++){
        				var day = newArrayAffiliateSales[x][i][0].split("/");
    						day = day[2]+"/"+day[1]+"/"+day[0];
    						newArrayAffiliateSales[x][i][0] = new Date(day);
    					
	    				if(maxValue < newArrayAffiliateSales[x][i][1]){
	    					maxValue = newArrayAffiliateSales[x][i][1];
	    				}
        			}
        			
        		}

        		//reverse arrays
        		newArrOrdersDate 		= newArrOrdersDate.reverse();        		
				
        		for(var i=0;i<newArrayAffiliateSales.length;i++){
        			newArrayAffiliateSales[i] = newArrayAffiliateSales[i].reverse();
        		}
        		
				break;
			}
		}
		
		if(newArrayAffiliateSales.length > 0 && newArrayLabel.length > 0 && newArrOrdersDate.length > 0){
			//remove old chart 
			jQuery('#earn-money-statistic-chart').html('');
			
			//Statistic chart
		    var jqplotChart = jQuery.jqplot('earn-money-statistic-chart', newArrayAffiliateSales, {
				series: newArrayLabel,	
				legend: {show:true, location: 'nw', yoffset: 6},
				gridPadding: {top:6, right:5, bottom:2, left:6},
				axes: {        				
					xaxis: {  
						renderer: jQuery.jqplot.DateAxisRenderer,            					
						ticks: newArrOrdersDate,
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
				   tooltipLocation: 'ne',
				   useAxesFormatters: true,
				   formatString: 'Date: %s - %d sales'
			   }
			   
			});
		    
		    jqplotChart.replot();
		    
		    //set css for label table
		    jQuery('.jqplot-table-legend').css({"padding":"0 3px"});
		    
		}

	}
}


//refresh button
function refreshLargeChart(option){
	if(AffiliateSalesAfterSort.length > 0){				
		
		//array use to show chart
		newArrayAffiliateSales 	= new Array();
		newArrayLabel = null;
		//array use to show label
		newArrayLabel  			= new Array();
		//new array orders date
		newArrOrdersDate		= new Array();
		
		switch(option){
			case "changeTimeviaDropdown": {			
					
					var periodTime 	= jQuery('#dialog-earn-money-tab-3-select-period').val();
					var choiceShop 	= jQuery('#earn-money-select-shop').val();					
					var newAffiliateSalesAfterSort = new Array();
					
					if(choiceShop == 'all'){
						//if the choice shop is All Shop
						newAffiliateSalesAfterSort 	= AffiliateSalesAfterSort;
						newArrOrdersDate 			= ArrOrdersDate;
					}else{
						for(var i = 0;i < AffiliateSalesAfterSort.length;i++){
							if(AffiliateSalesAfterSort[i][0] != undefined){
								//get array affiliate sales of choice shop 
								if(AffiliateSalesAfterSort[i][0].ResaleUnitId == choiceShop){
									newAffiliateSalesAfterSort.push(AffiliateSalesAfterSort[i]);
									var objTmp = {
											"label": ArrLabelChart[i].label
										};
										
									newArrayLabel.push(objTmp); 
									break;
								}
							}
						}
					}
									
					//options is last 7 days
					if(periodTime == 'last-7-days' && chartPeriodOptions != 'last-7-days'){					
						
						//set current period option
						chartPeriodOptions = "last-7-days";
						
						for(var i=0;i < newAffiliateSalesAfterSort.length;i++){
							var flagBreak = 0;//limit 7 days before
							newArrayAffiliateSales[i] 	= new Array();
							newArrOrdersDate			= null;
							newArrOrdersDate			= new Array();
							//the min day in array newArrOrdersDate
							//use to calculate the last 7 days
							var minDay = ArrOrdersDate[0];						
								minDay = minDay.format('dd/mm/yyyy');
								//back to prev day
								minDay = findPreviousDay(minDay);							
								
							for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
								if(flagBreak < 7){
									//the last day in newArrayAffiliateSales array								
		            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();	            					
		            					lastDay = lastDay.format("dd/mm/yyyy");
		            					
		            				if(minDay == lastDay && flagBreak < 7){
		            						
		            						//add to newArrayAffiliateSales & newArrOrdersDate arrays
		            						newArrayAffiliateSales[i].push([minDay,newAffiliateSalesAfterSort[i][j].OrderCount]);
		            						newArrOrdersDate.push(minDay);
		            						
		            						//back to prev day
		    								minDay = findPreviousDay(minDay);
		    								
		    								//increase flagBreak
		            						flagBreak++;
		            				}else if(minDay > lastDay && flagBreak < 7){	            					
		            					while(minDay > lastDay && flagBreak < 7){
		            						//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([minDay,0]);
		            						newArrOrdersDate.push(minDay);
		            						
		            						//back to prev day
		    								minDay = findPreviousDay(minDay);
		    								
		    								//increase flagBreak         						
		            						flagBreak++;
		            					}
		            					
		            					//if the prev day is the last day in AffiliateSalesAfterSort[i] and flagBreak still < 7 (not enough 7 days to show chart)
	            						//add the last day to array
	            						if(flagBreak < 7){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
	            							newArrOrdersDate.push(lastDay);
	            							
	            							//back to prev day
	        								minDay = findPreviousDay(minDay);
	            							
	        								//increase flagBreak
	                            			flagBreak++;
	            						}
	            						            						
		            				}else{
		            					if(j == 0 && newArrayAffiliateSales[i].length < 7){
	            							while(flagBreak < 7){
	            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            								newArrayAffiliateSales[i].push([minDay,0]);                    			
	                                			newArrOrdersDate.push(minDay);
	                                			
	                                			//back to prev day
	            								minDay = findPreviousDay(minDay);
	            								
	            								//increase flagBreak
	                                			flagBreak++;
	            							}
	            						}
		            				}
								}
							}
							
							while(flagBreak < 7){
								//add to newArrayAffiliateSales & newArrOrdersDate arrays
								newArrayAffiliateSales[i].push([minDay,0]);                    			
	                			newArrOrdersDate.push(minDay);
	                			
	                			//back to prev day
								minDay = findPreviousDay(minDay);
	                			
								//increase flagBreak
	                			flagBreak++;
							}
							
						}
					}
					
					//option is this month
					if(periodTime == 'this-month' && chartPeriodOptions != 'this-month'){
						
						//set current period option
						chartPeriodOptions = "this-month";
						
						//create array to use for jqplot
		        		//array like: [[['10/10/2011',4],['9/10/2011',4],['8/10/2011',4],...],...]
		        		for(var i = 0;i < newAffiliateSalesAfterSort.length; i++){
		        			newArrayAffiliateSales[i] 	= new Array();
							newArrOrdersDate			= null;
							newArrOrdersDate			= new Array();
							
							for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
								//the last day in newArrayAffiliateSales array
	            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();            					
	            					lastDay = lastDay.format("dd/mm/yyyy"); 
	            					
	            				//today
	            				var today = new Date();
	            					today = today.format("dd/mm/yyyy");
	            						
	            					//
	            					if(lastDay.split("/")[1] != today.split("/")[1]){
	            						if(newArrayAffiliateSales[i].length == 0){
	            							var curentMonth = today.split("/")[1];
		            						while(today.split("/")[1] == curentMonth){
		            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                							newArrayAffiliateSales[i].push([today,0]);                    			
	                							newArrOrdersDate.push(today);
	                							
	                                			//back to prev day
	                                			today = findPreviousDay(today);
		            						}
	            						}	            						
	            						break;
	            					}
	            					
	            					if(newArrayAffiliateSales[i].length == 0){
	                					//we have to show the day begin is today
	                					if(lastDay == today){
	                						//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                						newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                    			
	                						newArrOrdersDate.push(lastDay);
	                						
	                					}else{
	                						
	                						//set sales value for today is 0 if the last day in newArrayAffiliateSales[i] is not today and back to prev day
	                						//and if the prev day is not the last day in newArrayAffiliateSales[i], we set sales value is 0 too
	                						//until the prev day is equal with the last day in newArrayAffiliateSales[i]
	                						while(lastDay != today && today.split("/")[1] == lastDay.split("/")[1]){
	                							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                							newArrayAffiliateSales[i].push([today,0]);                    			
	                							newArrOrdersDate.push(today);
	                							
	                                			//back to prev day
	                                			today = findPreviousDay(today);
	                                			                           			
	                						}
	                						
	                						//if the prev day is the last day in newArrayAffiliateSales[i]
	                						//add the last day to array
	                						if(lastDay == today){
	                							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
	                							newArrOrdersDate.push(lastDay);
	                							
	                						}
	                						
	                						if(j == 0 && today.split("/")[1] == lastDay.split("/")[1]){
	                							while(today.split("/")[1] == lastDay.split("/")[1]){
	                								//back to prev day
	                                    			today = findPreviousDay(today);
	                                    			
	                                    			//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                                    			newArrayAffiliateSales[i].push([today,0]);                    			
	                                    			newArrOrdersDate.push(today);
	                                    			
	                							}
	                						}
	                					}             			
	                				}else{        	
	                					//back to prev day
	            						var preDay = findPreviousDay(newArrOrdersDate[newArrOrdersDate.length-1]);        							
	            							
	            						while(lastDay != preDay && preDay.split("/")[1] == lastDay.split("/")[1]){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([preDay,0]);                    			
	            							newArrOrdersDate.push(preDay);   
	            							
	                            			//back to prev day
	                            			preDay = findPreviousDay(preDay);	                            			
	            						}
	            						
	            						if(lastDay == preDay){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
	            							newArrOrdersDate.push(lastDay);
	            							
	            						}
	                        			
	            						//show all days in month        						
	            						if(j == 0 && preDay.split("/")[1] == today.split("/")[1]){
                							while(preDay.split("/")[1] == today.split("/")[1]){
                								//back to prev day
                								preDay = findPreviousDay(preDay);
                                    			
                                    			if(preDay.split("/")[1] == today.split("/")[1]){
                                    				//add to newArrayAffiliateSales & newArrOrdersDate arrays
                                        			newArrayAffiliateSales[i].push([preDay,0]);                    			
                                        			newArrOrdersDate.push(preDay);
                                    			}
                                    			                                    			
                							}
                						}
	                					
	                				}
							}
		        		}		        		
					}
					
					//option is this month
					if(periodTime == 'last-month' && chartPeriodOptions != 'last-month'){
						
						//set current period option
						chartPeriodOptions = "last-month";

						//create array to use for jqplot
		        		//array like: [[['10/10/2011',4],['9/10/2011',4],['8/10/2011',4],...],...]
		        		for(var i = 0;i < newAffiliateSalesAfterSort.length; i++){
		        			newArrayAffiliateSales[i] 	= new Array();
							newArrOrdersDate			= null;
							newArrOrdersDate			= new Array();

							for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
								//the last day in newArrayAffiliateSales array
	            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();            					
	            					lastDay = lastDay.format("dd/mm/yyyy"); 
	            					
	            				var lastDayOfPreviousMonth = new Date();
	            					lastDayOfPreviousMonth.setDate(1);
	            					lastDayOfPreviousMonth = lastDayOfPreviousMonth.format("dd/mm/yyyy");
	            					//back to prev day
	            					lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth); 
	            					
	            					
	            					if(lastDay.split("/")[1] == lastDayOfPreviousMonth.split("/")[1]){
	            						if(newArrayAffiliateSales[i].length == 0){
		            						if(lastDay == lastDayOfPreviousMonth){
		            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                    			
		                						newArrOrdersDate.push(lastDay);
		            						}else{
		            							while(lastDay != lastDayOfPreviousMonth && lastDayOfPreviousMonth.split("/")[1] == lastDay.split("/")[1]){
		            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                							newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
		                							newArrOrdersDate.push(lastDayOfPreviousMonth);
		                							
		                                			//back to prev day
		                							lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
		            							}
		            							
		            							
		                						if(lastDay == lastDayOfPreviousMonth){
		                							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
		                							newArrOrdersDate.push(lastDay);
		                							
		                						}
		                						
		                						if(j == 0 && lastDayOfPreviousMonth.split("/")[1] == lastDay.split("/")[1]){
		                							while(lastDayOfPreviousMonth.split("/")[1] == lastDay.split("/")[1]){
		                								//back to prev day
		                								lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
		                                    			
		                                    			//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                                    			newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
		                                    			newArrOrdersDate.push(lastDayOfPreviousMonth);
		                                    			
		                							}
		                						}
		            						}
	            						}else{
	            							//back to prev day
		            						var preDay = findPreviousDay(newArrOrdersDate[newArrOrdersDate.length-1]);        							
		            							
		            						while(lastDay != preDay && preDay.split("/")[1] == lastDay.split("/")[1]){
		            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		            							newArrayAffiliateSales[i].push([preDay,0]);                    			
		            							newArrOrdersDate.push(preDay);   
		            							
		                            			//back to prev day
		                            			preDay = findPreviousDay(preDay);	                            			
		            						}
		            						
		            						if(lastDay == preDay){
		            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
		            							newArrOrdersDate.push(lastDay);
		            							
		            						}
		                        			
		            						//show all days in month        						
		            						if(j == 0 && preDay.split("/")[1] == lastDayOfPreviousMonth.split("/")[1]){
	                							while(preDay.split("/")[1] == lastDayOfPreviousMonth.split("/")[1]){
	                								//back to prev day
	                								preDay = findPreviousDay(preDay);
	                                    			
	                                    			if(preDay.split("/")[1] == lastDayOfPreviousMonth.split("/")[1]){
	                                    				//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                                        			newArrayAffiliateSales[i].push([preDay,0]);                    			
	                                        			newArrOrdersDate.push(preDay);
	                                    			}
	                                    			                                    			
	                							}
	                						}
	            						}
	            					}else if(j == 0 && newArrayAffiliateSales[i].length == 0){
	            						
	            						var currentMonth = lastDayOfPreviousMonth.split("/")[1];
	            						while(lastDayOfPreviousMonth.split("/")[1] == currentMonth){
	            							
            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
                							newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
                							newArrOrdersDate.push(lastDayOfPreviousMonth);
                							
                                			//back to prev day
                							lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
            							}
	            					}
	            					
	            					
							}
		        		}		        		
					}
					
					//option is this month
					if(periodTime == 'last-year' && chartPeriodOptions != 'last-year'){
						
						//set current period option
						chartPeriodOptions = "last-year";

						//create array to use for jqplot
		        		//array like: [[['10/10/2011',4],['9/10/2011',4],['8/10/2011',4],...],...]
		        		for(var i = 0;i < newAffiliateSalesAfterSort.length; i++){
		        			newArrayAffiliateSales[i] 	= new Array();
							newArrOrdersDate			= null;
							newArrOrdersDate			= new Array();

							for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
								//the last day in newArrayAffiliateSales array
	            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();            					
	            					lastDay = lastDay.format("dd/mm/yyyy"); 
	            					
	            				var lastDayOfPreviousMonth = new Date();	            					
	            					lastDayOfPreviousMonth.setFullYear(lastDayOfPreviousMonth.getFullYear()-1);
	            					lastDayOfPreviousMonth.setDate(30);
	            					lastDayOfPreviousMonth.setMonth(11);
	            					lastDayOfPreviousMonth = lastDayOfPreviousMonth.format("dd/mm/yyyy");
	            						            					
	            					if(lastDay.split("/")[2] == lastDayOfPreviousMonth.split("/")[2]){
	            						if(newArrayAffiliateSales[i].length == 0){
		            						if(lastDay == lastDayOfPreviousMonth){
		            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                    			
		                						newArrOrdersDate.push(lastDay);
		            						}else{
		            							while(lastDay != lastDayOfPreviousMonth && lastDayOfPreviousMonth.split("/")[2] == lastDay.split("/")[2]){
		            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                							newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
		                							newArrOrdersDate.push(lastDayOfPreviousMonth);
		                							
		                                			//back to prev day
		                							lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
		            							}
		            							
		            							
		                						if(lastDay == lastDayOfPreviousMonth){
		                							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
		                							newArrOrdersDate.push(lastDay);
		                							
		                						}
		                						
		                						if(j == 0 && lastDayOfPreviousMonth.split("/")[2] == lastDay.split("/")[2]){
		                							while(lastDayOfPreviousMonth.split("/")[2] == lastDay.split("/")[2]){
		                								//back to prev day
		                								lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
		                                    			
		                                    			//add to newArrayAffiliateSales & newArrOrdersDate arrays
		                                    			newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
		                                    			newArrOrdersDate.push(lastDayOfPreviousMonth);
		                                    			
		                							}
		                						}
		            						}
	            						}else{
	            							//back to prev day
		            						var preDay = findPreviousDay(newArrOrdersDate[newArrOrdersDate.length-1]);        							
		            							
		            						while(lastDay != preDay && preDay.split("/")[2] == lastDay.split("/")[2]){
		            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		            							newArrayAffiliateSales[i].push([preDay,0]);                    			
		            							newArrOrdersDate.push(preDay);   
		            							
		                            			//back to prev day
		                            			preDay = findPreviousDay(preDay);	                            			
		            						}
		            						
		            						if(lastDay == preDay){
		            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
		            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
		            							newArrOrdersDate.push(lastDay);
		            							
		            						}
		                        			
		            						//show all days in month        						
		            						if(j == 0 && preDay.split("/")[2] == lastDayOfPreviousMonth.split("/")[2]){
	                							while(preDay.split("/")[2] == lastDayOfPreviousMonth.split("/")[2]){
	                								//back to prev day
	                								preDay = findPreviousDay(preDay);
	                                    			
	                                    			if(preDay.split("/")[2] == lastDayOfPreviousMonth.split("/")[2]){
	                                    				//add to newArrayAffiliateSales & newArrOrdersDate arrays
	                                        			newArrayAffiliateSales[i].push([preDay,0]);                    			
	                                        			newArrOrdersDate.push(preDay);
	                                    			}
	                                    			                                    			
	                							}
	                						}
	            						}
	            					}else if(j == 0 && newArrayAffiliateSales[i].length == 0){
	            						
	            						var currentYear = lastDayOfPreviousMonth.split("/")[2];
	            						
	            						while(lastDayOfPreviousMonth.split("/")[2] == currentYear){	            							
            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
                							newArrayAffiliateSales[i].push([lastDayOfPreviousMonth,0]);                    			
                							newArrOrdersDate.push(lastDayOfPreviousMonth);
                							
                                			//back to prev day
                							lastDayOfPreviousMonth = findPreviousDay(lastDayOfPreviousMonth);
            							}
	            					}
	            					
	            					
							}
		        		}		        		
					}
						
					//option is this month
					if(periodTime == 'whole' && chartPeriodOptions != 'whole'){
						
						//set current period option
						chartPeriodOptions = "whole";

						//create array to use for jqplot
		        		//array like: [[['10/10/2011',4],['9/10/2011',4],['8/10/2011',4],...],...]
		        		for(var i = 0;i < newAffiliateSalesAfterSort.length; i++){
		        			newArrayAffiliateSales[i] 	= new Array();
							newArrOrdersDate			= null;
							newArrOrdersDate			= new Array();

							for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
								//the last day in newArrayAffiliateSales array
	            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();            					
	            					lastDay = lastDay.format("dd/mm/yyyy"); 
	            					            						            					
            						if(newArrayAffiliateSales[i].length == 0){
	            						    newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                    			
	                						newArrOrdersDate.push(lastDay);
	            					}else{
            							//back to prev day
	            						var preDay = findPreviousDay(newArrOrdersDate[newArrOrdersDate.length-1]);        							
	            							
	            						while(lastDay != preDay){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([preDay,0]);                    			
	            							newArrOrdersDate.push(preDay);   
	            							
	                            			//back to prev day
	                            			preDay = findPreviousDay(preDay);	                            			
	            						}
	            						
	            						if(lastDay == preDay){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
	            							newArrOrdersDate.push(lastDay);
	            							
	            						}	                        			
            						}
							}
		        		}		        		
					}
					
					//change date format from '18/8/2011' to Date {Thu Aug 18 2011 11:32:08 GMT+0700 (SE Asia Standard Time)}
	        		//to show chart, jqplot doesn't understand format '18/8/2011'
	        		for(var x = 0;x < newArrOrdersDate.length;x++){
	        			var day = newArrOrdersDate[x].split("/");
	        				day = day[2]+"/"+day[1]+"/"+day[0];
	        				newArrOrdersDate[x] = new Date(day);
	        		}
	        		
	        		//change date format from '18/8/2011' to Date {Thu Aug 18 2011 11:32:08 GMT+0700 (SE Asia Standard Time)}
	        		//to show chart, jqplot doesn't understand format '18/8/2011'
	        		for(var x = 0;x < newArrayAffiliateSales.length;x++){
	        			for(var i=0;i < newArrayAffiliateSales[x].length;i++){
	        				var day = newArrayAffiliateSales[x][i][0].split("/");
	    						day = day[2]+"/"+day[1]+"/"+day[0];
	    						newArrayAffiliateSales[x][i][0] = new Date(day);
	    					
		    				if(maxValue < newArrayAffiliateSales[x][i][1]){
		    					maxValue = newArrayAffiliateSales[x][i][1];
		    				}
	        			}
	        			
	        		}
	        		
	        		//reverse arrays
	        		newArrOrdersDate 		= newArrOrdersDate.reverse();
	        		      	
				
				break;
			}
			
			case "changeTimeviaInput": {				
				
				var newAffiliateSalesAfterSort = new Array();
				
				var choiceShop 	= jQuery('#earn-money-select-shop').val();	
				
					for(var i = 0;i < AffiliateSalesAfterSort.length;i++){
						//get array affiliate sales of choice shop 
						if(AffiliateSalesAfterSort[i][0].ResaleUnitId == choiceShop){
							newAffiliateSalesAfterSort.push(AffiliateSalesAfterSort[i]);
							var objTmp = {
									"label": ArrLabelChart[i].label
								};
								
							newArrayLabel.push(objTmp); 
							break;
						}else if(i == AffiliateSalesAfterSort.length-1){
							//if the choice shop is All Shop
							newAffiliateSalesAfterSort 	= AffiliateSalesAfterSort;
							newArrayLabel				= ArrLabelChart;
						}
					}									

					for(var i=0;i < newAffiliateSalesAfterSort.length;i++){
						var flagBreak = 0;//limit 7 days before
						newArrayAffiliateSales[i] 	= new Array();
						newArrOrdersDate			= null;
						newArrOrdersDate			= new Array();
						
						var periodDate 	= jQuery('#dialog-earn-money-calendar').val();
							periodDate 	= periodDate.split("-");
						var fromDate 	= periodDate[0].trim();
						var toDate 		= periodDate[1].trim();
						var limitDay 	= ((new Date(toDate.split(".")[2]+"/"+toDate.split(".")[1]+"/"+toDate.split(".")[0])) - (new Date(fromDate.split(".")[2]+"/"+fromDate.split(".")[1]+"/"+fromDate.split(".")[0])))/86400000;
					
							fromDate = fromDate.replace(/\./g,"/");				
							toDate = toDate.replace(/\./g,"/");
							
						for(var j = newAffiliateSalesAfterSort[i].length-1;j >= 0;j--){
							if(flagBreak <= limitDay){
								//the last day in newArrayAffiliateSales array								
	            				var lastDay = newAffiliateSalesAfterSort[i][j].Created.ParseRfcDate();	            					
	            					lastDay = lastDay.format("dd/mm/yyyy");
	            				if(toDate.split("/")[1] == lastDay.split("/")[1]){
	            					if(toDate == lastDay && flagBreak <= limitDay){
	            						
	            						//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            						newArrayAffiliateSales[i].push([toDate,newAffiliateSalesAfterSort[i][j].OrderCount]);
	            						newArrOrdersDate.push(toDate);
	            						
	            						//back to prev day
	            						toDate = findPreviousDay(toDate);
	    								
	    								//increase flagBreak
	            						flagBreak++;
		            				}else if(toDate > lastDay && flagBreak <= limitDay){	            					
		            					while(toDate > lastDay && flagBreak <= limitDay){
		            						//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([toDate,0]);
		            						newArrOrdersDate.push(toDate);
		            						
		            						//back to prev day
		            						toDate = findPreviousDay(toDate);
		            						
		    								//increase flagBreak         						
		            						flagBreak++;
		            					}
		            					
		            					//if the prev day is the last day in AffiliateSalesAfterSort[i] and flagBreak still < 7 (not enough 7 days to show chart)
	            						//add the last day to array
	            						if(toDate == lastDay && flagBreak <= limitDay){
	            							//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            							newArrayAffiliateSales[i].push([lastDay,newAffiliateSalesAfterSort[i][j].OrderCount]);                        			
	            							newArrOrdersDate.push(lastDay);
	            							
	            							//back to prev day
	            							toDate = findPreviousDay(toDate);
	            							
	        								//increase flagBreak
	                            			flagBreak++;
	            						}
	            						            						
		            				}else{
		            					if(j == 0 && flagBreak <= limitDay){
	            							while(flagBreak <= limitDay){
	            								//add to newArrayAffiliateSales & newArrOrdersDate arrays
	            								newArrayAffiliateSales[i].push([toDate,0]);                    			
	                                			newArrOrdersDate.push(toDate);
	                                			
	                                			//back to prev day
	                                			toDate = findPreviousDay(toDate);
	                                			
	            								//increase flagBreak
	                                			flagBreak++;
	            							}
	            						}
		            				}
	            				}		            				
							}
						}
						
						while(flagBreak <= limitDay){
							//add to newArrayAffiliateSales & newArrOrdersDate arrays
							newArrayAffiliateSales[i].push([toDate,0]);                    			
                			newArrOrdersDate.push(toDate);
                			
                			//back to prev day
                			toDate = findPreviousDay(toDate);
                			
							//increase flagBreak
                			flagBreak++;
						}
						
					}
				
				//change date format from '18/8/2011' to Date {Thu Aug 18 2011 11:32:08 GMT+0700 (SE Asia Standard Time)}
        		//to show chart, jqplot doesn't understand format '18/8/2011'
        		for(var x = 0;x < newArrOrdersDate.length;x++){
        			var day = newArrOrdersDate[x].split("/");
        				day = day[2]+"/"+day[1]+"/"+day[0];
        				newArrOrdersDate[x] = new Date(day);
        		}
        		
        		//change date format from '18/8/2011' to Date {Thu Aug 18 2011 11:32:08 GMT+0700 (SE Asia Standard Time)}
        		//to show chart, jqplot doesn't understand format '18/8/2011'
        		for(var x = 0;x < newArrayAffiliateSales.length;x++){
        			for(var i=0;i < newArrayAffiliateSales[x].length;i++){
        				var day = newArrayAffiliateSales[x][i][0].split("/");
    						day = day[2]+"/"+day[1]+"/"+day[0];
    						newArrayAffiliateSales[x][i][0] = new Date(day);
    					
	    				if(maxValue < newArrayAffiliateSales[x][i][1]){
	    					maxValue = newArrayAffiliateSales[x][i][1];
	    				}
        			}
        			
        		}

        		//reverse arrays
        		newArrOrdersDate 		= newArrOrdersDate.reverse();        		
				
        		for(var i=0;i<newArrayAffiliateSales.length;i++){
        			newArrayAffiliateSales[i] = newArrayAffiliateSales[i].reverse();
        		}
				
				break;
			}
		}
		
		if(newArrayAffiliateSales.length > 0 && newArrayLabel.length > 0 && newArrOrdersDate.length > 0){
			//remove old chart 
			jQuery('#large-chart-statistic-content').html('');
			
			//Statistic chart
			var jqplotChart = jQuery.jqplot('large-chart-statistic-content', newArrayAffiliateSales, {
				series: newArrayLabel,	
				legend: {show:true, location: 'nw', yoffset: 6},
				gridPadding: {top:6, right:5, bottom:2, left:6},
				axes: {        				
					xaxis: {  
						renderer: jQuery.jqplot.DateAxisRenderer,            					
						ticks: newArrOrdersDate,
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
				   tooltipLocation: 'ne',
				   useAxesFormatters: true,
				   formatString: 'Date: %s - %d sales'
			   }
			   
			});
		    
			jqplotChart.replot();
			
		    //set css for label table
		    jQuery('.jqplot-table-legend').css({"padding":"0 3px"});
		    
		  //remove old chart 
			jQuery('#earn-money-statistic-chart').html('');
			
			//Statistic chart
			var jqplotChart1 = jQuery.jqplot('earn-money-statistic-chart', newArrayAffiliateSales, {
				series: newArrayLabel,	
				legend: {show:true, location: 'nw', yoffset: 6},
				gridPadding: {top:6, right:5, bottom:2, left:6},
				axes: {        				
					xaxis: {  
						renderer: jQuery.jqplot.DateAxisRenderer,            					
						ticks: newArrOrdersDate,
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
				   tooltipLocation: 'ne',
				   useAxesFormatters: true,
				   formatString: 'Date: %s - %d sales'
			   }
			   
			});
		    
			jqplotChart1.replot();
			
		    //set css for label table
		    jQuery('.jqplot-table-legend').css({"padding":"0 3px"});
		}

	}
}

function showLargeChart(){
	jQuery( ".large-chart-statistic" ).dialog('open');
	jQuery( ".large-chart-statistic" ).dialog({ position: 'center' });
	
	if(newArrayAffiliateSales == null){
		//Statistic chart
		var jqplotChart = jQuery.jqplot('large-chart-statistic-content', ArrOrdersDateArticle, {
			series: ArrLabelChart,	
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
			   tooltipLocation: 'ne',
			   useAxesFormatters: true,
			   formatString: 'Date: %s - %d sales'
		   }
		   
		});
	    
		jqplotChart.replot();
		
	    //set css for label table
	    jQuery('.jqplot-table-legend').css({"padding":"0 3px"});
	}else{
		//remove old chart 
		jQuery('#large-chart-statistic-content').html('');
		
		//Statistic chart
		var jqplotChart = jQuery.jqplot('large-chart-statistic-content', newArrayAffiliateSales, {
			series: newArrayLabel,	
			legend: {show:true, location: 'nw', yoffset: 6},
			gridPadding: {top:6, right:5, bottom:2, left:6},
			axes: {        				
				xaxis: {  
					renderer: jQuery.jqplot.DateAxisRenderer,            					
					ticks: newArrOrdersDate,
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
			   tooltipLocation: 'ne',
			   useAxesFormatters: true,
			   formatString: 'Date: %s - %d sales'
		   }
		   
		});
	    
		jqplotChart.replot();
		
	    //set css for label table
	    jQuery('.jqplot-table-legend').css({"padding":"0 3px"});
	    
	    
	}
}
/*Get formats from api*/
function w2pFormatsGet1( matchcode, callback ){
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

function w2pPriceGet1(matchcode, identifier, material, formatArr, callback){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?d=1&u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	api.ApiKey = defaultAffid;
	var langCurrency=jQuery('.currency-select').val();
	
	//api.Request.Header.Currency = globalCurrencyToken;
	api.Request.Header.Currency = langCurrency;
	
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

function w2pMaterialGet1( matchcode, identifier, callback ){
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
//show the overview of the widget
function widgetOverviewShow(arr, idGroup){	
	var articleGroupName = null;
	
	for(var i = 0; i < dgoArticleGroup.length; i++){
		if(dgoArticleGroup[i].Id == idGroup){
			articleGroupName = dgoArticleGroup[i].Token;
			break;
		}
	}
	
	//fill Subtypes
	if(article_group_arr[articleGroupName] != undefined){
		var articleItems = article_group_arr[articleGroupName].Items;
	}else if(article_group_arr['CRYSTAL'] != undefined){
		var articleItems = article_group_arr['CRYSTAL'].Items;
	}
	
	var subtypeOptions = '';
	
	if(articleItems != undefined){
		var subtypeOptions = '';
		
		if(articleItems[0] != undefined){
			for(var i = 0;i < articleItems.length; i++){
				var size_i = articleItems[i].PageLengthOpen * articleItems[i].PageWidthOpen;
					size_i = articleItems[i].PageDepthOpen == null ? size_i : size_i * articleItems[i].PageDepthOpen;
				for(var j = i+1;j < articleItems.length;j++){
					var size_j = articleItems[j].PageLengthOpen * articleItems[j].PageWidthOpen;
						size_j = articleItems[j].PageDepthOpen == null ? size_j : size_j * articleItems[j].PageDepthOpen;
						if(size_j < size_i){
							var tmp = {};
							tmp = articleItems[j];
							articleItems[j] = articleItems[i];
							articleItems[i] = tmp; 
						}
				}
			}
			
			for(var j = 0; j < articleItems.length; j++){
				subtypeOptions += '<option value="' + articleItems[j].Identifier + '__' + articleItems[j].Matchcode + '">' + articleItems[j].Name + '</option>';
			}
		}else{			
			for(var k = 0; k < articleItems[articleGroupName].length; k++){				
				subtypeOptions += '<option value="' + articleItems[articleGroupName][k].Identifier + '__' + articleItems[articleGroupName][k].Matchcode + '">' + articleItems[articleGroupName][k].Name + '</option>';
			}
		}
		
		jQuery('select#subtypes').empty().append(subtypeOptions);
		subTypeChange();
	}
}

//function subtype onchange
function subTypeChange(){
	var subTypeVal = jQuery('select#subtypes').val();
	var subTypeVal = subTypeVal.split('__');

	var matchCode = subTypeVal[1];
	var identifier = subTypeVal[0];
	
	w2pMaterialGet1( matchCode, identifier, function(result){
		
		defaultMaxArea = result.Order.Article[0].MaxAreaToCalculate;
		defaultMinArea = result.Order.Article[0].MinAreaToCalculate;
		
		//fill materials box
		var materialOptions = '';
		var materials = result.Order.Article[0].Materials;
		for(var i = 0; i < materials.length; i++){
			materialOptions += '<option value="' + identifier + '__' + matchCode + '__' + materials[i].Key + '">' + materials[i].Name + '</option>';
		}
		
		jQuery('select#materials').empty().append(materialOptions);
		
		//material change
		materialChange();
	} );
}

//function material change
function materialChange(){
	var materialVal = jQuery('select#materials').val().split('__');
	var matchCode = materialVal[1];
	var identifier = materialVal[0];
	var material = materialVal[2];
	
	jQuery('#sale-prices').html('<div style="text-align:center;margin-top:20px"><img src="'+web_2_print_blogInfo+'css/img/icon/loading.gif"><br>'+jQuery('#trans-loading').val()+'...</div>');
	
	//get formats
	w2pFormatsGet1(matchCode, function(result){
		
		var api = new delivergo.api();
		
		//save to object
    	if(result.Value == undefined){
    		result.Value = result.value.Value;
    	}
		
    	var formats_object = new Array();
    	
		for(var i = 0; i < result.Value.length; i++){
    		var children = result.Value[i];
 		
	    		var forWidth 	= children.Width;
		    	var forHeight 	= children.Height;
		    	var forDepth	= null;
		    	
		    	if(matchCode.split('/').length > 2){
		    		var forName 	=  matchCode.split('/')[2] + ' (' + children.Name + ')';
		    		var forInchName =  matchCode.split('/')[2] + ' (' + api.ConvertMm2Inch(forWidth) + ' x ' + api.ConvertMm2Inch(forHeight) + ' inch' + ')';
		    	}else{
		    		var forName 	=  children.Name;
		    		
		    		var forInchName =  forName.replace(forWidth,api.ConvertMm2Inch(forWidth))
		    								  .replace(forHeight,api.ConvertMm2Inch(forHeight))
		    								  .replace("mm","inch");
		    		
		    	}

				if(children.Depth != null){
	    			forDepth = children.Depth;
	    			if(matchCode.split('/').length > 2){
	    				forInchName = matchCode.split('/')[2] + ' (' + api.ConvertMm2Inch(forWidth) + ' x ' + api.ConvertMm2Inch(forHeight) + ' x ' + api.ConvertMm2Inch(forDepth) +' inch' + ')';
	    			}else{
	    				forInchName =  forInchName.replace(forDepth,api.ConvertMm2Inch(forDepth));
	    			}
	    			
	    			formats_object.push({forwidth: forWidth, forheight: forHeight, forname: forName, forinchname: forInchName, fordepth: forDepth});
	    		}else{
	    			var forArea = children.Area;
	    			//forArea < defaultMinArea || 
		    		if(forArea > defaultMaxArea){
		    			//do nothing
		    		}else{
		    			formats_object.push({forwidth: forWidth, forheight: forHeight, forname: forName, forinchname: forInchName, fordepth: forDepth});
		    		}  
	    		}
  		
    	}
		
		w2pPriceGet1(matchCode, identifier, material, formats_object, function(result){
			article_group_price = result.Order.Article;
			
			//show overview prices
			priceOverviewShow();
		});
	});
}

//function show prices
function priceOverviewShow(amount, percent){
	//price overviews
	var priceOverviews = '';
	
	var EndUserPrice = jQuery('.EndUserPriceFormat').val();
	
	var api = new delivergo.api();

	var langCurrency = jQuery('.currency-select').val();
	
	for(var i = 0; i < article_group_price.length; i++){
		//calculate price || affiliate
		var article_prices = article_group_price[i].Prices.Items;
		var article_price = 0;
		//var article_currency = article_prices[0].Currency;
		
		var article_currency = jQuery('.currency-select').val();
		
		var sale_object = [];
		var article_price_array = [];
		for(var j = 0; j < article_prices.length; j++){	
			var type_split = article_prices[j].Type.split("|");
			
			if(type_split[0] != 'Shipment'){
				//article_price += article_prices[j].SaleNet;
				sale_object.push(article_prices[j]);
			}	
						
		}
		
		article_price_array = api.CalculateGrossPrice(sale_object);
		
		article_price = (EndUserPrice == "Net") ? article_price_array[0].SaleNetSum : article_price_array[0].SaleGrossSum;
		
		if(amount == undefined){
			var article_price_show = formatCurrency( article_price , article_currency) + ' ' + article_currency;	
			
			if(article_group_price[i].PageDepthOpen != null){
				var formatSpan = article_group_price[i].PageWidthOpen + 'x' + article_group_price[i].PageLengthOpen + 'x' + article_group_price[i].PageDepthOpen + ' mm';
			}else{
				var formatSpan = article_group_price[i].PageWidthOpen + 'x' + article_group_price[i].PageLengthOpen + ' mm';
			}
		
		
			var priceOverview = '<div class="sale-price"><div class="sale-price-dimension"><input class="input-radio" type="radio" value="" name="radio-dimension"><span>' + formatSpan + '</span></div><div class="content-price"><span>' + article_price_show + '</span></div><input type="hidden" class="input-price" value="' + article_price + '"/><input type="hidden" class="overview-price" value="' + article_price + '"/></div>';
			priceOverviews += priceOverview;
		}else{
			article_price = article_price + amount + articleGroupArr[langCurrency][0]*percent/100;
			
			var article_price_show = formatCurrency( article_price , article_currency) + ' ' + article_currency;
			
			var _i = i + 1;
			jQuery('DIV.sale-price:nth-child(' + _i + ')').children('.content-price').children('span').html(article_price_show);
			jQuery('DIV.sale-price:nth-child(' + _i + ')').children('.overview-price').val(article_price);
			jQuery('input.provision-merchant').val(formatCurrency(jQuery('.sale-price-selected').children('.overview-price').val(), langCurrency));
		}
	}
	
	if(amount == undefined){
		jQuery('DIV#sale-prices').empty().append(priceOverviews);
		jQuery('DIV.sale-price').click(function(){
			jQuery(this).children().children('.input-radio').attr('checked', 'checked');
			jQuery('DIV.sale-price').css('background', 'none');
			jQuery(this).css('background', '#FFC400');
			
			jQuery('DIV.sale-price').removeClass('sale-price-selected');
			jQuery(this).addClass('sale-price-selected');
			
			if(jQuery('.product-groups-selected .apiIDHidden').val() != undefined){
	    		//get product group id
	            var idGroup = jQuery('.product-groups-selected .apiIDHidden').val();
	            var percent = dgoDefaultPercentage;
	
	    	}else if(jQuery('.grid-content-row-selected .id-group-hidden').val() != undefined){
	    		//get product group id
	            var idGroup = jQuery('.grid-content-row-selected .id-group-hidden').val();
	            var percent = articleProfit[idGroup]['minPercent'];
	    	}
	    	
			articleGroupArr[langCurrency][0] = parseFloat(jQuery(this).children('.input-price').val());			
			articleGroupArr[langCurrency][0] = articleGroupArr[langCurrency][0] - articleGroupArr[langCurrency][0]*percent/100;
			jQuery('input.provision-merchant').val(formatCurrency( jQuery(this).children('.overview-price').val() , langCurrency));			
			
			jQuery('.provision-calculate-percent .provision-price-element').html(formatCurrency(parseFloat(jQuery('.provision-percent-hidden').val())*articleGroupArr[langCurrency][0]/100, langCurrency));
			jQuery('.your-profit').html(formatCurrency(parseFloat(jQuery('.provision-amount-hidden').val()) + parseFloat(jQuery('.provision-percent-hidden').val())*articleGroupArr[langCurrency][0]/100, langCurrency));
		});	
		
		jQuery('DIV.sale-price:first-child').click();
	}
}
//function get available article
function w2pArticleGet1(idGroup){
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