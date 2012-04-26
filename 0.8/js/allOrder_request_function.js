/*function change entries per page*/
function changeEntryPerPage(){
	//get entry when selected
	var entry = jQuery('#all-order-filter').val();
	
	//assign to global variable
	dgoEntryPerpage = entry;
	
	//get old header before get all orders with new entry
	var oldHeader = '<div class="all-order-header">'+jQuery('.all-order-header').html()+'</div>';
	
	jQuery('.all-order-container').html(oldHeader);
	jQuery('#all-order-filter').val(entry);
	
	//get list customer's order with new pageSize
	allOrder_getList(dgoGuid, dgoEntryPerpage, 1);
}

/*function show all order details*/
function showAllOrderDetails(option){
	//status of checkbox
	var status = jQuery('#all-order-show-all').attr('checked');
	var x = 0;
	if(option == 'click'){
		if(status){
			while(x < dgoAllOrders.length){
				
					var button = jQuery('#all-order-button-'+x+' img').attr('src');
					
					if(button == web_2_print_blogInfo + 'css/img/icon/Black_Plus.png'){
						jQuery('#all-order-button-'+x).html('<img src="'+web_2_print_blogInfo+'css/img/icon/Black_Miner.png" class="all-order-button">');
						jQuery("#all-order-details-"+x).toggle();
						jQuery(".all-order-elements-"+x).toggle();
					}

				x++;
			}
		}else{
			while(x < dgoAllOrders.length){
				
				var button = jQuery('#all-order-button-'+x+' img').attr('src');
				
				if(button == web_2_print_blogInfo + 'css/img/icon/Black_Miner.png'){
					jQuery('#all-order-button-'+x).html('<img src="'+web_2_print_blogInfo+'css/img/icon/Black_Plus.png" class="all-order-button">');
					jQuery("#all-order-details-"+x).toggle();
					jQuery(".all-order-elements-"+x).toggle();	
				}
				
				x++;
			}
		}
	}
	
	if(option == 'auto'){
		
		while(x < dgoAllOrders.length){
	
				var _OrderNumber		= dgoAllOrders[x].OrderNumber;
							
				if(jQuery("#all-order-details-"+x).children('.confirm-order-shipping').html() == "null" && 
			       jQuery("#all-order-details-"+x).children('.confirm-order-payment').html() == "null" ){								
					allOrder_getOrder(_OrderNumber,x);
				}				
	
				x++;
		}
		
		x = 0 ;
		
		while(x < dgoAllOrders.length){
			
			jQuery("#all-order-details-"+x).toggle();
			jQuery(".all-order-elements-"+x).toggle();
			
			x++;	
		}
				
	}
}

/*function get order via orderNumber*/
function allOrder_getOrder(orderNumber,number){
	
	var api = new delivergo.api.contact();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.GetOrder(orderNumber, 
    	function(result){
    		
    		var _allOrder 				= "";
    		var _OrderContacting 		= result.Value.OrderContacting;
			var _OrderArticle 			= result.Value.OrderArticle;
			var _street 				= _OrderContacting[0].OrderContactingAddress[1].OrderAddress.Street;
			var _name 					= _OrderContacting[0].OrderContactingAddress[1].OrderAddress.Forename + " " +_OrderContacting[0].OrderContactingAddress[1].OrderAddress.Surname;
			var _city					= _OrderContacting[0].OrderContactingAddress[1].OrderAddress.City;
			var _countryName 			= "";
			var _shipment 				= _OrderArticle[0].ShipmentProviderToken;
    		var _paymentType			= _OrderArticle[0].OrderArticlePriceToken[3].PriceToken.Token.split('|');
    		var orderSum 				= 0;
    		var order_confirm_element 	= '';
			var order_confirm 			= '';
			var price_element 			= '';
			var j 						= 0;
			var order_confirm_element 	= '';
			
			//Get country name
			for(i=0;i<dgoCountryApi.length;i++){
        		if(dgoCountryApi[i].Key == _OrderContacting[0].OrderContactingAddress[1].OrderAddress.CountryToken){
        			_countryName = dgoCountryApi[i].Name; 			
        		}
        	}
			
			// Order shipment
			var order_confirm_shipping = '<div class="order-shipping-title"><span>' + jQuery('#trans-shippment-address').val() + ':</span></div><div class="order-shipping-detail"><span>'+_street+'</span><br>';
			order_confirm_shipping += '<span>'+_name+'</span><br>';
			order_confirm_shipping += '<span>'+_city+'</span><br>';
			order_confirm_shipping += '<span>'+_countryName+'</span></div>';
			
			// Order Payment
			var order_confirm_payment = '<div class="order-payment-detail"><div class="order-payment-title"><span>' + jQuery('#trans-payment').val() + ':</span></div><div class="order-payment-icon payment'+'-'+_paymentType[1]+'"></div><div class="order-payment-method"><span>'+_paymentType[1]+'</span></div></div>';
			order_confirm_payment += '<div class="order-payment-detail"><div class="order-payment-title"><span>' + jQuery('#trans-shipment').val() + ':</span></div><div class="order-shipment-icon shipment'+'-'+_shipment+'"></div><div class="order-shipment-method"><span>'+_shipment+'</span></div>';
			
			jQuery("#all-order-details-"+number).children('.confirm-order-shipping').html(order_confirm_shipping); 
			jQuery("#all-order-details-"+number).children('.confirm-order-payment').html(order_confirm_payment);
				 
			//calculate sum of price
			while(j < _OrderArticle.length){
				
				var _articleUri 			= "";
						
				var _priceType 				= _OrderArticle[j].PriceTypeToken;
				var _shipmentStatus 		= _OrderArticle[j].ShipmentStatus;
				var _amount					= _OrderArticle[j].Amount;
				var _run					= _OrderArticle[j].Run;
				var _articleGuid			= _OrderArticle[j].Guid;
				var _jobNumber				= _OrderArticle[j].JobNumber;
				var _description			= "";
				var _currencyToken			= _OrderArticle[j].CurrencyToken;
				
				if(_OrderArticle[j].OrderArticleTranslation.length > 1){
					_description = _OrderArticle[j].OrderArticleTranslation[1].Name + ' (' + _OrderArticle[j].PageLengthOpen + 'mm x ' + _OrderArticle[j].PageWidthOpen + 'mm)';
				}else{
					_description = _OrderArticle[j].OrderArticleTranslation[0].Name + ' (' + _OrderArticle[j].PageLengthOpen + 'mm x ' + _OrderArticle[j].PageWidthOpen + 'mm)';			
				}
								
				//calculate the price and the sum			
				if(_currencyToken != ''){
					
					var EndPrice = 0;					
					
					for(n=0;n<_OrderArticle[j].OrderArticlePriceToken.length;n++){
						if(_OrderArticle[j].OrderArticlePriceToken[n].PriceToken.SalePrice != undefined){
							var BasePrice			= _OrderArticle[j].OrderArticlePriceToken[n].PriceToken.SalePrice * _OrderArticle[j].CurrencyToEuro;
							var VatBasePrice		= BasePrice * (_OrderArticle[j].OrderArticlePriceToken[n].PriceToken.VatPercentage/100);
						
							EndPrice 				+= (BasePrice + VatBasePrice);
						}
						
					}
										
					orderSum			+= EndPrice;
					
					var price_element 	= api.FormatCurrency(EndPrice,_currencyToken) + ' ' + _currencyToken;
					
				}
				else{
					_currencyToken	= 'EUR';
					
					var EndPrice 	= 0;					
					
					for(n=0;n<_OrderArticle[j].OrderArticlePriceToken.length;n++){
						if(_OrderArticle[j].OrderArticlePriceToken[n].PriceToken.SalePrice != undefined){
							var BasePrice			= _OrderArticle[j].OrderArticlePriceToken[n].PriceToken.SalePrice;
							var VatBasePrice		= BasePrice * (_OrderArticle[j].OrderArticlePriceToken[n].PriceToken.VatPercentage/100);
						
							EndPrice 				+= (BasePrice + VatBasePrice);
						}
					}
										
					orderSum				+= EndPrice;					
					var price_element 		= api.FormatCurrency(EndPrice,_currencyToken) + ' ' + _currencyToken;				
					
				}
				
				// Order Content Element Content
				var order_confirm = '';
				
				//img for each article
				var _articleUri = "";
				
				//get article img thumb
				for(i=0;i<dgoAllOrdersArticleImage.length;i++){
					if(_articleGuid == dgoAllOrdersArticleImage[i].ArticleGuid){
						_articleUri = dgoAllOrdersArticleImage[i].Value;break;
					}else{
						_articleUri	= web_2_print_blogInfo + "css/img/imgArticle/VN_PLOT.A_DYN_POS_VN.png";
					}
				}
				
				//show only 3 thumb on order header
				if(_OrderArticle.length >= 3){
					if(j <= 2){
						jQuery(".all-order-img-thumb-"+number).append("<img src='"+_articleUri+"' width=20 height=20 class='all-order-button' style='margin-left:5px'>");	
					}
				}else{
					if(_OrderArticle.length == 1){
						jQuery(".all-order-img-thumb-"+number).append("<img src='"+_articleUri+"' width=20 height=20 class='all-order-button' style='margin-left:5px'>");
						jQuery(".all-order-img-thumb-"+number).append("<img src='"+web_2_print_blogInfo+"css/img/icon/Black_Miner.png' width=20 height=20 class='all-order-button' style='margin-left:5px;visibility: hidden;border-color:white;'>");
						jQuery(".all-order-img-thumb-"+number).append("<img src='"+web_2_print_blogInfo+"css/img/icon/Black_Miner.png' width=20 height=20 class='all-order-button' style='margin-left:5px;visibility: hidden;border-color:white;'>");
					}
					
					if(_OrderArticle.length == 2){
						if(j == 1){
							jQuery(".all-order-img-thumb-"+number).append("<img src='"+_articleUri+"' width=20 height=20 class='all-order-button' style='margin-left:5px'>");
							jQuery(".all-order-img-thumb-"+number).append("<img src='"+web_2_print_blogInfo+"css/img/icon/Black_Miner.png' width=20 height=20 class='all-order-button' style='margin-left:5px;visibility: hidden;border-color:white;'>");
						}else{
							jQuery(".all-order-img-thumb-"+number).append("<img src='"+_articleUri+"' width=20 height=20 class='all-order-button' style='margin-left:5px'>");
						}
					}
				}
				
				// Order Element Title 		
				var order_confirm_title = '<div class="order-element-title">';
				order_confirm_title += '<div class="order-position"><span>' + jQuery('#trans-pos').val() + '</span></div>';
				order_confirm_title += '<div class="order-description"><span>' + jQuery('#trans-details-description').val() + '</span></div>';
				order_confirm_title += '<div class="order-amount"><span>' + jQuery('#trans-amount').val() + '</span></div>';
				order_confirm_title += '<div class="order-price"><span>' + jQuery('#trans-price').val() + '</span></div>';
				order_confirm_title += '<div class="order-action"><span>' + jQuery('#trans-action').val() + '</span></div></div>';
				
				order_confirm += '<div class="order-element-content order-element-content-all">';	
				order_confirm += '<div class="order-position-content"><div class="order-position-image"><img src="'+_articleUri+'"></div><div class="order-position-image-original"><img src="'+_articleUri+'"></div></div>';			
				order_confirm += '<div class="order-description-content order-description-content-font"><div>'+_description+'<br/>' + jQuery('#trans-production').val() + ': '+_priceType+'<br/>' + jQuery('#trans-status').val() + ': '+_shipmentStatus+'</div></div>';			
				order_confirm += '<div class="order-amount-content">'+_amount+' x '+_run+'</div>';
					
						
				order_confirm += '<div class="order-price-content">' + price_element + '</div>';			
				order_confirm += '<div class="order-action-content"><div class="order-action-button is-bottons"><span>' + jQuery('#trans-show-button').val() + '</span></div></div></div>';			
							
			
				order_confirm_element += '<div class="order-number"><span>'+_jobNumber+'</span></div>';
				order_confirm_element += order_confirm_title + order_confirm;
				
										
				j++;
			}

			//format the sum
			jQuery('#all-order-sum-'+number).html(jQuery('#trans-sum').val() + ': ' + api.FormatCurrency(orderSum,_currencyToken) + ' ' + _currencyToken);
						
			//fill order to all order page
			jQuery(".all-order-elements-"+number).html(order_confirm_element);
			
			//mouseover effect on article image			
			jQuery('.order-position-content').hover(
				function() { jQuery(this).children('.order-position-image-original').css({ display: "block" }); },
				function() { jQuery(this).children('.order-position-image-original').css({ display: "none" }); });
			
			jQuery(".order-position-content").mousemove(function(e) {
				/*
				var mousex = (e.pageX - 300);
				var mousey = (e.pageY - 280) * -1;
				*/
				var mousex = (e.pageX + 25);
				var mousey = (e.pageY + 25);
				jQuery(this).children('.order-position-image-original').css({ top: mousey, left: mousex });
				
			});
			
			//close loading dialog
			jQuery('.account-details-loading').dialog('close');

    	}
    );
    
    api.OnError = function(error) {
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

/*function get all orders*/
function allOrder_getList(guid, pageSize, pageIndex){	
	jQuery('.account-details-loading').dialog('open');
	jQuery('.account-details-loading').dialog({ position: 'center' });
	
	var api = new delivergo.api.contact();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.ApiKey = guid;
    
    api.GetCustomerOrders(pageSize, pageIndex, 
    	function(result){
    		
    		//global variable
			dgoAllOrders 	= result.Value.Items;
			
			var totalOrder 	= result.Value.OverallItemCount;
			
			var x = 0;
			
			if(jQuery('.all-order-header').html() == null || jQuery('.all-order-header').html() == undefined){
				var order_confirm_content = '<div class="all-order-header"><div class="all-order-header-left">' + jQuery('#trans-all-order').val() + ' ('+totalOrder+')</div><div class="all-order-header-right"><div class="all-order-header-right-all-details"><input type="checkbox" id="all-order-show-all" onclick=showAllOrderDetails("click")> ' + jQuery('#trans-show-all-order').val() + '</div><div class="all-order-header-right-filter">' + jQuery('#trans-entries-per-page').val() + ': <select id="all-order-filter" onchange="changeEntryPerPage()"><option value="50">50</option><option value="100">100</option><option value="150">150</option></select></div></div></div>';
			}else{
				var order_confirm_content = '';
			}
			
			while(x < dgoAllOrders.length){
				
				var _OrderNumber		= "'"+dgoAllOrders[x].OrderNumber+"'";
				var _articleNumber		= dgoAllOrders[x].OrderArticle.length;
				var _orderDate			= dgoAllOrders[x].Created.ParseRfcDate();				
				    _orderDate			= _orderDate.format("dd.mm.yyyy");

				//option in buttonAllOrder function    
				var option = "'details'";
				
				//container image thumb
				var _articleUri = "<span class='all-order-img-thumb-" + x + " all-order-img'></span>";
								
				//order content				
				order_confirm_content += '<div class="order-confirm-content" id="order-confirm-content-'+x+'">';
				order_confirm_content += '<div class="confirm-content-title"><span id="all-order-button-'+x+'" onclick="buttonAllOrder('+x+','+option+', '+_OrderNumber+');"><img src="'+web_2_print_blogInfo+'css/img/icon/Black_Plus.png" class="all-order-button"></span>'+_articleUri+'<span>'+_OrderNumber.replace(/'+/g,"")+'</span><span>'+_orderDate+'</span><span>' + jQuery('#trans-article').val() + ': '+_articleNumber+'</span><span id="all-order-sum-'+x+'"></span></div>';
				order_confirm_content += '<div class="confirm-order-detail" id="all-order-details-'+x+'"><div class="confirm-order-shipping">null</div><div class="confirm-order-payment">null</div></div>';
				order_confirm_content += '<div class="confirm-order-elements all-order-elements-'+x+'">null</div>';
				order_confirm_content += '</div>';
			
				//Get all article img				
				for(i=0;i<_articleNumber;i++){
					//get order number
					var _articleGuid = dgoAllOrders[x].OrderArticle[i].Guid;
					
					api.GetArticlePictures(_articleGuid, 
						function(articleData){		
							
							if(articleData.Value[0] != undefined){
								var img = {
											"ArticleGuid"	: 	_articleGuid,
											"Value"			: 	articleData.Value[0].Uri						
										}
								//global variable contain article image (object)
								dgoAllOrdersArticleImage.push(img);
							}
						})					
				}
				x++;
			}
						
			//show all order
			jQuery('.all-order-container').append(order_confirm_content);
			
			//get image thumb and calculate sum, get order details
			showAllOrderDetails('auto');
   });
   
    api.OnError = function(error) {
      api.Log(error.Text);
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };    
		
}

function allOrder_getListFromPhp(result){
	var api = new delivergo.api.contact();

	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
	
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
	api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
	
	api.ApiKey = dgoGuid;
	
	if(result.Value != undefined){
		//global variable
		dgoAllOrders 	= result.Value.Items;
		
		var totalOrder 	= result.Value.OverallItemCount;
		
		var x = 0;
		
		if(jQuery('.all-order-header').html() == null || jQuery('.all-order-header').html() == undefined){
			var order_confirm_content = '<div class="all-order-header"><div class="all-order-header-left">' + jQuery('#trans-all-order').val() + ' ('+totalOrder+')</div><div class="all-order-header-right"><div class="all-order-header-right-all-details"><input type="checkbox" id="all-order-show-all" onclick=showAllOrderDetails("click")> ' + jQuery('#trans-show-all-order').val() + '</div><div class="all-order-header-right-filter">' + jQuery('#trans-entries-per-page').val() + ': <select id="all-order-filter" onchange="changeEntryPerPage()"><option value="50">50</option><option value="100">100</option><option value="150">150</option></select></div></div></div>';
		}else{
			var order_confirm_content = '';
		}
		
		while(x < dgoAllOrders.length){
			
			var _OrderNumber		= "'"+dgoAllOrders[x].OrderNumber+"'";
			var _articleNumber		= dgoAllOrders[x].OrderArticle.length;
			var _orderDate			= dgoAllOrders[x].Created.ParseRfcDate();				
				_orderDate			= _orderDate.format("dd.mm.yyyy");

			//option in buttonAllOrder function    
			var option = "'details'";
			
			//container image thumb
			var _articleUri = "<span class='all-order-img-thumb-" + x + " all-order-img'></span>";
							
			//order content				
			order_confirm_content += '<div class="order-confirm-content" id="order-confirm-content-'+x+'">';
			order_confirm_content += '<div class="confirm-content-title"><span id="all-order-button-'+x+'" onclick="buttonAllOrder('+x+','+option+', '+_OrderNumber+');"><img src="'+web_2_print_blogInfo+'css/img/icon/Black_Plus.png" class="all-order-button"></span>'+_articleUri+'<span>'+_OrderNumber.replace(/'+/g,"")+'</span><span>'+_orderDate+'</span><span>' + jQuery('#trans-article').val() + ': '+_articleNumber+'</span><span id="all-order-sum-'+x+'"></span></div>';
			order_confirm_content += '<div class="confirm-order-detail" id="all-order-details-'+x+'"><div class="confirm-order-shipping">null</div><div class="confirm-order-payment">null</div></div>';
			order_confirm_content += '<div class="confirm-order-elements all-order-elements-'+x+'">null</div>';
			order_confirm_content += '</div>';
		
			//Get all article img				
			for(i=0;i<_articleNumber;i++){
				//get order number
				var _articleGuid = dgoAllOrders[x].OrderArticle[i].Guid;
				
				api.GetArticlePictures(_articleGuid, 
					function(articleData){		
						
						if(articleData.Value[0] != undefined){
							var img = {
										"ArticleGuid"	: 	_articleGuid,
										"Value"			: 	articleData.Value[0].Uri						
									}
							//global variable contain article image (object)
							dgoAllOrdersArticleImage.push(img);
						}
					})					
			}
			x++;
		}
					
		//show all order
		jQuery('.all-order-container').append(order_confirm_content);
		
		//get image thumb and calculate sum, get order details
		showAllOrderDetails('auto');
	}
}