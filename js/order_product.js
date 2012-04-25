/*Js file using for order product*/

/*Get available products*/
function avaiArticleGet(){
	var dataString = "type=getarticle";
	//save to session
	jQuery.ajax({
	   type: "GET",
	   url: web_2_print_blogInfo + "inc/saveArticle.php",
	   data: dataString,
	   success: function(data){	
	   		articleGroupList = jQuery.parseJSON(data);	   		
	   }
	});
}

/*Function mapping name for avai article*/
function articleNameMapping(){
	for(var i = 0; i < articleAvaiList.length; i++){
		for(var j = 0; j < articleGroupList.length; j++){
			if(articleAvaiList[i] == articleGroupList[j].articleID){
				articleAvaiList[i] = articleGroupList[j].articleName;
				if(articleAvaiList[i] == 'Posterplots'){
					articleAvaiList[i] = 'Posters';
				}
				break;
			}
		}
	}
}

//Show Prices
function pluginPriceShow(dim){	
	//empty order-product-content
	jQuery('.order-product-subcontent').empty();
	
	var seoLink = window.location.hash;		
	
	var api = new delivergo.api(); 
	
	if(global_price_object[0].Product.split('/').length <= 2){
		for(var i = 0; i < global_price_object.length; i++){
			//calculate price || affiliate
			var article_prices = global_price_object[i].Prices.Items;
			var article_price = 0;
			var article_currency = article_prices[0].Currency;
			var sale_object = [];
			var article_price_array = [];
			
			for(var j = 0; j < article_prices.length; j++){	
				//var chippest_shipment = Math.pow(2, 53);
				var type_split = article_prices[j].Type.split("|");
				
				if(type_split[0] != 'Shipment'){					
					sale_object.push(article_prices[j]);
				}	
			}
			
			article_price_array = api.CalculateGrossPrice(sale_object);
			
			article_price = (endUserPrice == "Net") ? article_price_array[0].SaleNetSum : article_price_array[0].SaleGrossSum;
			
			//sum up chippest shipment
			//article_price += chippest_shipment;					
			
			var article_price_show = formatCurrency( article_price , article_currency);		
			var productContent = '<div class="order-product-content-child"><div class="content-dimension"><input type="radio" style="background : none" name="radio-dimension" value=""/>';

			if(dim == 'inch'){
				productContent += '<span class="format-name-text" title="'+global_price_object[i].FormatObject.forname+'">' + global_price_object[i].FormatObject.forname + '</span>';
			}else{
				productContent += '<span class="format-name-text" title="'+global_price_object[i].FormatObject.forinchname+'">' + global_price_object[i].FormatObject.forinchname + '</span>';
			}
			
			productContent += '</div><div class="content-price"><input type="hidden" value="' + i + '" />';
			productContent += '<span>' + article_price_show + ' ' + article_currency + '</span>';
			productContent += '</div><input class="order-price-choosen" type="hidden" value="' + i + '"/></div>';
			
			//append to the order-product-content
			jQuery('.order-product-subcontent').append(productContent);
			
		}
	}else{
		var new_global_price_object = [];
		
		for(var i in global_price_object){
			if(new_global_price_object[global_price_object[i].ArticleIdentifier] == undefined){
				new_global_price_object[global_price_object[i].ArticleIdentifier] = new Array();
				new_global_price_object[global_price_object[i].ArticleIdentifier].push(global_price_object[i]);
			}else{
				new_global_price_object[global_price_object[i].ArticleIdentifier].push(global_price_object[i]);
			}
		}
		
		dgoUsername = new_global_price_object;
		
		jQuery('.order-product-subcontent').empty();
		
		/*New request instance, now it should have no article*/
	    var api = new delivergo.api();

		for(var x in new_global_price_object){
			jQuery.each(new_global_price_object[x], function (i, v){
				if(v.Prices != undefined){
					//calculate price || affiliate
					var article_prices = v.Prices.Items;
					var article_price = 0;
					var article_currency = article_prices[0].Currency;
					var sale_object = [];
					var article_price_array = [];
						
					for(var j = 0; j < article_prices.length; j++){	
						//var chippest_shipment = Math.pow(2, 53);
						var type_split = article_prices[j].Type.split("|");
						
						if(type_split[0] != 'Shipment'){
							sale_object.push(article_prices[j]);
						}
					}
									
					//sum up chippest shipment
					//article_price += chippest_shipment;
					
					article_price_array = api.CalculateGrossPrice(sale_object);
					
					article_price = (endUserPrice == "Net") ? article_price_array[0].SaleNetSum : article_price_array[0].SaleGrossSum;
					
					var article_price_show = formatCurrency( article_price , article_currency);		
					var productContent = '<div class="order-product-content-child"><div class="content-dimension"><input type="radio" name="radio-dimension" value=""/>';
									
					
					if(dim == 'inch'){
						productContent += '<span class="format-name-text" title="'+v.Product.split("/")[2] + " " + "(" + v.PageLengthOpen + " x " + v.PageWidthOpen + " x " + v.PageDepthOpen + " mm)"+'">' + v.Product.split("/")[2] + " " + "(" + v.PageLengthOpen + " x " + v.PageWidthOpen + " x " + v.PageDepthOpen + " mm)" + '</span>';
					}else{
						productContent += '<span class="format-name-text" title="'+v.Product.split("/")[2] + " " + "(" + api.ConvertMm2Inch(v.PageLengthOpen) + " x " + api.ConvertMm2Inch(v.PageWidthOpen) + " x " + api.ConvertMm2Inch(v.PageDepthOpen) + " inch)"+'">' + v.Product.split("/")[2] + " " + "(" + api.ConvertMm2Inch(v.PageLengthOpen) + " x " + api.ConvertMm2Inch(v.PageWidthOpen) + " x " + api.ConvertMm2Inch(v.PageDepthOpen) + " inch)" + '</span>';
					}
					
					var number = null;
					
					for(var j = 0;j < global_price_object.length; j++){
						if(global_price_object[j].Identifier == v.Identifier && 
						   global_price_object[j].PageDepthOpen == v.PageDepthOpen && 
						   global_price_object[j].PageLengthOpen == v.PageLengthOpen && 
						   global_price_object[j].PageWidthOpen == v.PageWidthOpen){
							number = j;
							break;
						}
					}
					 
					
					productContent += '</div><div class="content-price"><input class="order-price-choosen-identifier" type="hidden" value="' + v.Identifier + '" />';
					productContent += '<span>' + article_price_show + ' ' + article_currency + '</span>';
					productContent += '</div><input class="order-price-choosen" type="hidden" value="' + number + '"/></div>';
					
					//append to the order-product-content
					jQuery('.order-product-subcontent').append(productContent);
					
					//if we have seo link already, we dont choose the first one
					if(dgoSeoId == null){
						jQuery('.order-product-content-child:nth-child(1)').addClass('order-product-content-child-selected');
					}
				}
				
			});
			
		}
		 
	    var seoLink = window.location.hash;
	    
	    var identifier1 = jQuery('.dgo-style-select-selected').children('.dgo-identifier-input').val();
		
	    if(identifier1 == "Crystal/KeyChain"){
			var ArticleName = makeFriendlyUrl(jQuery('.article-select-label').html());
			
			var identiferArticleArr = dgoSubtypeProductArr["Crystal/KeyChain"];
			
			if(dgoSeoId == null){
				window.location.hash = ArticleName +'-A'+ Base62.encode(identiferArticleArr[identiferArticleArr.length-1].Id);
			}
			
		}else{
			
			if(seoLink != ""){
				jQuery('.order-product-content-child').removeClass('order-product-content-child-selected');
				
				var arrLink = seoLink.split("-");
				
				if(arrLink[2] != undefined){
					jQuery('.order-product-subcontent').children('.order-product-content-child').each(function(){	
						var label = jQuery(this).children('.content-dimension').children('span').html().replace(/\s+/g,"");
					    if(jQuery(this).children('.order-price-choosen').val() == parseInt(arrLink[2].split("_")[0]) && arrLink[2].split("_")[1] == label){
					    	jQuery(this).click();
					    }
					});
				}else{
					jQuery('.order-product-subcontent').children('.order-product-content-child:first').addClass('order-product-content-child-selected');
					jQuery('.order-product-subcontent').children('.order-product-content-child:first').children('.content-dimension').children('input:radio').attr("checked","checked");
					
					var formatId   = jQuery('.order-product-subcontent').children('.order-product-content-child:first').children('.order-price-choosen').val();
					var formatName = jQuery('.order-product-subcontent').children('.order-product-content-child:first').children('.content-dimension').children('span').html().replace(/\s+/g,"");
					
					seoLink += '-' + Base62.encode(formatId) + '_' + formatName + '_lang=' + globalLanguage + '_curr=' + globalCurrency;
					
					window.location.hash = seoLink;
				}
			}else{
				jQuery('.order-product-content-child:first').click();
			}
			
		}
		
	    
	}

	
}

/*Function change to call api again*/
// Production type change
function ArticleOptionChange( index ){    
	var loading  = '<div class="loading-prices-text" style="text-align: center;"><span><img src="'+web_2_print_blogInfo+'css/img/icon/loading.gif"></span><br><span>'+jQuery('#transLoadings').val()+'...</span></div>';	
	jQuery('.order-product-subcontent').html(loading);
	
	//block sidebar, user cant touch it.
	jQuery('.order-product-main-block').show();
	
    jQuery('#article-select .article-select-input').val(article_result_return[index].Matchcode);
	jQuery('#article-select .article-identifier-input').val(article_result_return[index].Identifier);
	jQuery('#article-select .article-select-label').html(article_result_return[index].Name);
		    	
	jQuery('.dgo-type-select').removeClass('dgo-type-select-selected');
	jQuery('.dgo-type-select-'+index).addClass('dgo-type-select-selected');
	
    if(index != undefined && article_result_return[index].ArticleGroupEntry != undefined){ //for painting & crystal
    	jQuery('.dgo-type-div').hide();
    	
    	//fill to style select list
    	var group_article		= article_result_return[index].Group;
    	var group_article_html 	= '';
    	
    	var style_article 		= '';    	
    	
    	dgoSubtypeProductArr 	= [];
    	    	
    	for(var i = 0; i < group_article.length; i++){ 
    		
    		if(group_article[i].Matchcode.split("/").length <= 2){

        		img = group_article[i].Identifier;
        		
        		if(Global_ProductImg['Article'][group_article[i].Identifier] == undefined){
    				img = Global_ProductImg['Standard'].split(".")[0];
    			}
        		
    	    	style_article += '<div class="dgo-style-select">';  
				if(flagImageArticleFound == true){
					style_article +=	'<div class="dgo-style-img"><img width="80" height="80" src="' + web_2_print_themeUrl + 'css/img/imgArticle/' + img + '.png" /></div>';					
				}else{
					style_article +=	'<div class="dgo-style-img"><img width="80" height="80" src="' + web_2_print_blogInfo + 'css/img/imgArticle/STANDARD.png" /></div>';					
				}  				    			
    			style_article +=		'<input class="dgo-identifier-input" type="hidden" value="' + group_article[i].Identifier + '" />';
    			style_article +=		'<input class="dgo-arr-article-number" type="hidden" value="' + i + '" />';
    			style_article +=	'<div class="dgo-style-name">' + group_article[i].Name + '</div>';
    			style_article +=	'<div style="display: none" class="dgo-style-select-large">';	
				if(flagImageArticleFound == true){
					style_article +=	'<div class="dgo-style-img-large"><img width="80" height="80" src="' + web_2_print_themeUrl + 'css/img/imgArticle/' + img + '.png" /></div>';					
				}else{
					style_article +=	'<div class="dgo-style-img-large"><img width="80" height="80" src="' + web_2_print_blogInfo + 'css/img/imgArticle/STANDARD.png" /></div>';					
				}				
    	    	//style_article +=		'<div class="dgo-style-img-large"><img width="80" height="80" src="' + web_2_print_blogInfo + 'css/img/imgArticle/' + img + '.png" /></div>';
    	    	style_article +=		'<div class="dgo-style-name-large">' + group_article[i].Name + '</div>';
    	    	style_article +=	'</div>';
    			style_article += '</div>';

    		}else if(group_article[i].Matchcode.split("/").length == 3){    			
    			if(dgoSubtypeProductArr[group_article[i].Matchcode.split("/")[0]+'/'+group_article[i].Matchcode.split("/")[1]] == undefined){
    				dgoSubtypeProductArr[group_article[i].Matchcode.split("/")[0]+'/'+group_article[i].Matchcode.split("/")[1]] = new Array();
    				dgoSubtypeProductArr[group_article[i].Matchcode.split("/")[0]+'/'+group_article[i].Matchcode.split("/")[1]].push(group_article[i]);
    			}else{
    				dgoSubtypeProductArr[group_article[i].Matchcode.split("/")[0]+'/'+group_article[i].Matchcode.split("/")[1]].push(group_article[i]);
    			}
    		}    		
    	}
    	
		for(var i in dgoSubtypeProductArr){
			if(i != undefined && i.split("/")[1] != undefined){
				var img = i.split("/")[0].toUpperCase() + '_' + i.split("/")[1].toUpperCase();
	    		
	    		if(Global_ProductImg['Article'][img] == undefined){
					img = Global_ProductImg['Standard'].split(".")[0];
				}
				
				style_article += '<div class="dgo-style-select">'; 
				if(flagImageArticleFound == true){
					style_article +=	'<div class="dgo-style-img"><img width="80" height="80" src="' + web_2_print_themeUrl + 'css/img/imgArticle/' + img + '.png" /></div>';					
				}else{
					style_article +=	'<div class="dgo-style-img"><img width="80" height="80" src="' + web_2_print_blogInfo + 'css/img/imgArticle/STANDARD.png" /></div>';					
				}   				
				//style_article +=	'<div class="dgo-style-img"><img width="80" height="80" src="' + web_2_print_blogInfo + 'css/img/imgArticle/' + img + '.png" /></div>';
				style_article +=		'<input class="dgo-identifier-input" type="hidden" value="' + i.split("/")[0]+'/'+i.split("/")[1] + '" />';
				style_article +=		'<input class="dgo-arr-article-number" type="hidden" value="' + i + '" />';
				style_article +=	'<div class="dgo-style-name">' + i.split("/")[0]+' '+ i.split("/")[1] + '</div>';
				style_article +=	'<div style="display: none" class="dgo-style-select-large">';	
				if(flagImageArticleFound == true){
					style_article +=	'<div class="dgo-style-img-large"><img width="80" height="80" src="' + web_2_print_themeUrl + 'css/img/imgArticle/' + img + '.png" /></div>';					
				}else{
					style_article +=	'<div class="dgo-style-img-large"><img width="80" height="80" src="' + web_2_print_blogInfo + 'css/img/imgArticle/STANDARD.png" /></div>';					
				}
		    	//style_article +=		'<div class="dgo-style-img-large"><img width="80" height="80" src="' + web_2_print_blogInfo + 'css/img/imgArticle/' + img + '.png" /></div>';
		    	style_article +=		'<div class="dgo-style-name-large">' + i.split("/")[0]+' '+i.split("/")[1] + '</div>';
		    	style_article +=	'</div>';
				style_article += '</div>';
			}
		}
		
		jQuery('#material-select-div').hide();
		jQuery('#style-select-div').show();
		
    	//append to body
    	jQuery('body .dgo-style-abso').remove();
    	jQuery('body').append('<div class="dgo-style-abso"><div class="dgo-style-arrow-left"></div><div class="dgo-style-div"><div class="dgo-style-title"><div class="dgo-type-ttl">'+jQuery('#transStyles').val()+'</div><div class="dgo-style-cancel"></div></div><div class="dgo-style-auto-fill"><div class="dgo-style-loading">Loading Style...</div></div></div><div class="dgo-style-arrow-right"></div></div>');
    	
    	//append the content    	
    	jQuery('.dgo-style-auto-fill').empty().append(style_article);
    	    	
    	
    	jQuery('.dgo-style-select').click(function(){
    	
			var identifier = jQuery(this).children('.dgo-identifier-input').val();
			
    		jQuery('.dgo-style-select').removeClass('dgo-style-select-selected');
	    	
	    	jQuery('.dgo-style-abso').fadeOut(1);
	    	
	    	jQuery(this).addClass('dgo-style-select-selected');
	    	//hide locked background
			//jQuery('.dgo-material-select-gray').fadeOut(1);
	    	jQuery('.style-select-label').html(jQuery(this).children('.dgo-style-name').html());
	    	//get price
	    	
	    	var dgo_identifier = jQuery('.dgo-style-select-selected').children('.dgo-identifier-input').val();
	    	//clear format_object items
	    	if(dgo_identifier == "Crystal/KeyChain"){
	    		formats_object = [];
				
	    	}
	    	
	    	var loading  = '<div class="loading-prices-text" style="text-align: center;"><span><img src="'+web_2_print_blogInfo+'css/img/icon/loading.gif"></span><br><span>'+jQuery('#transLoadings').val()+'</span></div>';
	    	
	    	jQuery('.order-product-subcontent').html(loading);
	    	
	    	global_price_object = [];
	    	
	    	var arrLink = window.location.hash.split("-");
	    	
	    	if(isNaN(parseInt(jQuery(this).children('.dgo-arr-article-number').val())) == true){
	    		var seoLink = "#" + makeFriendlyUrl(article_result_return[index].Name) + '-A' + Base62.encode(dgoSubtypeProductArr[jQuery(this).children('.dgo-arr-article-number').val()][0].Id);
	    	}else{
	    		var seoLink = "#" + makeFriendlyUrl(article_result_return[index].Name) + '-A' + Base62.encode(article_result_return[index].Group[jQuery(this).children('.dgo-arr-article-number').val()].Id);
	    	}
	    	
	    	if(dgoSeoDimension != null){
	    		seoLink += '-' + dgoSeoDimension;
	    		//dgoSeoDimension = null;
	    	}
	    	
	    	window.location.hash = seoLink;
	    	
	    	w2pMaterialGet( dgo_identifier );
	    	
	    	if(dgoStatusSeoLink != null){
	    		if(dgoStatusSeoLink == false){
	    			if(identifier == "Crystal/KeyChain"){
						hash = window.location.hash.split('-')[0];
						window.location.hash = hash;				
					}
	    		}else{
	    			dgoStatusSeoLink = false;
	    		}	    		
	    	}else{
	    		if(identifier == "Crystal/KeyChain"){
					hash = window.location.hash.split('-')[0];
					window.location.hash = hash;				
				}
	    	}
			
		});
		    	
	    //dgo-material-select hover
	    jQuery('.dgo-style-select').hover(
	    	function(){
	    		jQuery(this).addClass('dgo-style-select-hv-f');
	    		setTimeout(function(){
	    			jQuery('.dgo-style-select-hv-f').addClass('dgo-style-select-hv');
	    		}, 300);		    		
	    	},
	    	function(){
	    		jQuery(this).removeClass('dgo-style-select-hv-f');
	    		jQuery(this).removeClass('dgo-style-select-hv');
	    	}
	    );	
	    //dgo-materials-abso mouse hover event
	    var timer = null;
	    //close megadropdown box
	    jQuery('.dgo-style-cancel').click(function(){		    	
	    	 setTimeout(function(){
	    			jQuery('.dgo-style-abso').hide();	
	    			setTimeout(function(){
	    			clearTimeout(timer);	
	    			}, 200);    			
	    		}, 0);		    	 
	    });

	    jQuery('.dgo-style-abso').hover(
	    	function(){
	    		clearTimeout(timer);		    		
	    		jQuery('.dgo-style-abso').show(); 
	    	},		    		
	        function(){		   			
	    		timer = setTimeout(function(){
	    			jQuery('.dgo-style-abso').hide();
	    		}, 700);
	    	});
    			    
		var seoLink = window.location.hash;
		
		var arrLink = seoLink.split("-");
		
		var dgoSeoOldId = dgoSeoId;		
		 
		for(var i = 0;i < article_result_return[index].Group.length;i++){
			dgoSeoId = null;
			if(article_result_return[index].Group[i].Id == dgoSeoOldId){
				dgoSeoId = dgoSeoOldId;
				break;
			}
		}
		
		if(dgoSeoId != null){
			jQuery('.dgo-style-auto-fill').children('.dgo-style-select').each(function(){

				if(jQuery(this).children('.dgo-identifier-input').val().split("/").length <= 2){
					if(jQuery(this).children('.dgo-identifier-input').val() == 'Crystal/KeyChain'){
						var id = jQuery(this).children('.dgo-identifier-input').val();
						
						for(var i = 0;i < dgoSubtypeProductArr[id].length;i++){							
							if(dgoSubtypeProductArr[id][i].Id == Base62.decode(arrLink[1])){							
								jQuery(this).click();
								dgoSeoId = null;
								break;
							}
						}
					}else{
						for(var i = 0;i < article_result_return[index].Group.length;i++){						
							if(article_result_return[index].Group[i].Identifier == jQuery(this).children('.dgo-identifier-input').val() && article_result_return[index].Group[i].Id == dgoSeoId){
								jQuery(this).click();
								dgoSeoId = null;
								break;
							}
						}
					}
					
				}
			});
		}else{
			jQuery('.dgo-style-select:first').click();
		}    
    	
    }else{  
    	
    	//var seoLink = window.location.hash;
		
		//var arrLink = seoLink.split("-");
    	
    	var seoLink = "#" + makeFriendlyUrl(article_result_return[index].Name) + '-A' + Base62.encode(article_result_return[index].Id);    	
    	
    	if(dgoSeoDimension != null){
        	if(jQuery('.dgo-type-select-selected .dgo-identifier-input').val() != "Crystal" && jQuery('.dgo-style-select-selected .dgo-identifier-input').val() != "Crystal/KeyChain"){
        		seoLink += '-' + dgoSeoDimension;
        		dgoSeoDimension = null;
    		}else{
    			dgoSeoDimension = null;
    		}
    		
    	}
    	window.location.hash = seoLink;
    	jQuery('#material-select-div').show();
		jQuery('#style-select-div').hide();
    	//call function get material from api
    	w2pMaterialGet();
    }
}

// Material option change // Run & production time change 
function priceChange(){     
    //call function get price from api
    w2pPriceGet();
}

// Material option change // Run & production time change 
function megaArticleShow(){
	if(/webkit.*mobile/i.test(navigator.userAgent)){
		var pos 			= jQuery('#article-select').position();
		var off_pos			= jQuery('#article-select').offset();
		var plugin_position = jQuery('.order-product-main').offset();
		var browser_width 	= jQuery(window).width();
		if(plugin_position.left >= (browser_width/2)){
			jQuery('.dgo-type-arrow-right').show();
			var order_pro_width = jQuery('.order-product-main').width();
			jQuery('.dgo-type-abso').css({top:pos.top + 223,left:off_pos.left - 435});
			
		}else{
			jQuery('.dgo-type-arrow-left').show();
			var order_pro_width = jQuery('.order-product-main').width();
			jQuery('.dgo-type-abso').css({top:pos.top + 223,left:off_pos.left});
			jQuery('.dgo-type-div').css({"box-shadow":"-2px 2px 4px #A9A9A9"});
		}
	}else{
		var pos 			= jQuery('#article-select').offset();
		var plugin_position = jQuery('.order-product-main').offset();
		var browser_width 	= jQuery(window).width();
		if(plugin_position.left >= (browser_width/2)){
			jQuery('.dgo-type-arrow-right').show();
			var order_pro_width = jQuery('.order-product-main').width();
			jQuery('.dgo-type-abso').css({top:pos.top - 60,left:pos.left - 440});
			
		}else{
			jQuery('.dgo-type-arrow-left').show();
			var order_pro_width = jQuery('.order-product-main').width();
			jQuery('.dgo-type-abso').css({top:pos.top - 60,left:(pos.left + jQuery('.order-product-main').width()) - 10});
			jQuery('.dgo-type-div').css({"box-shadow":"-2px 2px 4px #A9A9A9"});
			
		}
	} 
	
		
	  
    //show megadropdown box
    jQuery('.dgo-type-abso').show();
    jQuery('.dgo-type-abso .dgo-type-div').show();
}

// Material option change // Run & production time change 
function materialMegaChange(){
	var pos 			= jQuery('#material-select').offset();
	var plugin_position = jQuery('.order-product-main').offset();
	var browser_width 	= jQuery(window).width();
	if(plugin_position.left >= (browser_width/2)){
		jQuery('.dgo-materials-arrow-right').show();
		var order_pro_width = jQuery('.order-product-main').width();
		jQuery('.dgo-materials-abso').css({top:pos.top - 60,left:pos.left - 590});
		
	}else{
		jQuery('.dgo-materials-arrow-left').show();
		var order_pro_width = jQuery('.order-product-main').width();
		jQuery('.dgo-materials-abso').css({top:pos.top - 60,left:(pos.left + jQuery('.order-product-main').width()) - 60});
		jQuery('.dgo-materials-div').css({"box-shadow":"-2px 2px 4px #A9A9A9"});
		
	}
	     
    //show megadropdown box
    jQuery('.dgo-materials-abso').show();
}

// Style change
function styleMegaChange(){
	var pos 			= jQuery('#style-select').offset();
	var plugin_position = jQuery('.order-product-main').offset();
	var browser_width 	= jQuery(window).width();
	if(plugin_position.left >= (browser_width/2)){
		jQuery('.dgo-style-arrow-right').show();
		var order_pro_width = jQuery('.order-product-main').width();
		jQuery('.dgo-style-abso').css({top:pos.top - 60,left:pos.left - 440});
		
	}else{
		jQuery('.dgo-style-arrow-left').show();
		var order_pro_width = jQuery('.order-product-main').width();
		jQuery('.dgo-style-abso').css({top:pos.top - 60,left:(pos.left + jQuery('.order-product-main').width()) - 10});
		jQuery('.dgo-style-div').css({"box-shadow":"-2px 2px 4px #A9A9A9"});
		
	}
	
	//show megadropdown box
    jQuery('.dgo-style-abso').show();
}

//change the language
function languageChange(languageKey,languageName){
	jQuery('.dropdown-container-lan').hide();
	//dropdown-img flag_EN
	jQuery('#lanSelect .dropdown-img-select').children('div').attr('class','dropdown-img flag_'+languageKey);
	jQuery('.dropdown-lan-select').html(languageName);
	
	var seoLink = window.location.hash;
	
	if(seoLink != ""){
		seoLink = seoLink.replace('lang='+globalLanguage,'lang='+languageKey);
		window.location.hash = seoLink;
	}

	var dataString = "option=language&language=" + languageKey +"&languageName=" + languageName;	
	jQuery.ajax({
		type: "GET",
		url: web_2_print_blogInfo + "inc/ajax/ajaxLanguage.php",
		data: dataString,
		success: function(data){
			window.location.reload( false );				
		}				
	});
}

//change the currency
function currencyChange(currencyKey){	
	
	if(dgoCurrentPage == "shoppingCart"){
    		//loading images while calculate price
    		jQuery('#shipping-price').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
        	jQuery('#payment-price').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
        	jQuery('.cal-sum-value').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
        	jQuery('.priceDiv span').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
    		
			jQuery('.dropdown-container-cur').hide();
			//jQuery('#curSelect .dropdown-img-select img').attr({'src':'http://api.delivergo.com/lib/img/flags/16_png_rect/'+flags[currencyKey]});
			jQuery('.dropdown-item-select-cur').children('.dropdown-img-select').html('<div class="dropdown-img flag_'+currencyKey+'"></div>');
			jQuery('.dropdown-curr-select').html(currencyKey);
			
			var dataString = "option=currency&currency=" + currencyKey;	
			jQuery.ajax({
				type: "GET",
				url: web_2_print_blogInfo + "inc/ajax/ajaxLanguage.php",
				data: dataString,
				success: function(data){
					globalCurrency = currencyKey;
					
					var loading  = '<div class="loading-prices-text" style="text-align: center;"><span><img src="'+web_2_print_blogInfo+'css/img/icon/loading.gif"></span><br><span>'+jQuery('#transLoadings').val()+'</span></div>';
			    	
			    	jQuery('.order-product-subcontent').html(loading);
					
					if(jQuery('.dgo-type-select-selected .dgo-type-input-large').val() == "Crystal" && jQuery('.dgo-style-select-selected .dgo-identifier-input').val() == "Crystal/KeyChain"){

				    	global_price_object = [];
				    	
				    	formats_object = [];
				    	
				    	w2pMaterialGet(jQuery('.dgo-style-select-selected').children('.dgo-identifier-input').val());
					}else{
						w2pPriceGet(jQuery('#material-key').val());
					}
					
					shippingMethodGet();
					paymentMethodGet();
					
					
				}				
			});
	}else{		

		jQuery('.dropdown-container-cur').hide();
		//jQuery('#curSelect .dropdown-img-select img').attr({'src':'http://api.delivergo.com/lib/img/flags/16_png_rect/'+flags[currencyKey]});
		jQuery('.dropdown-item-select-cur').children('.dropdown-img-select').html('<div class="dropdown-img flag_'+currencyKey+'"></div>');
		jQuery('.dropdown-curr-select').html(currencyKey);
		var dataString = "option=currency&currency=" + currencyKey;	
		jQuery.ajax({
			type: "GET",
			url: web_2_print_blogInfo + "inc/ajax/ajaxLanguage.php",
			data: dataString,
			success: function(data){
				globalCurrency = currencyKey;
				
				var loading  = '<div class="loading-prices-text" style="text-align: center;"><span><img src="'+web_2_print_blogInfo+'css/img/icon/loading.gif"></span><br><span>'+jQuery('#transLoadings').val()+'</span></div>';
		    	
		    	jQuery('.order-product-subcontent').html(loading);
		    	
				if(jQuery('.dgo-type-select-selected .dgo-type-input-large').val() == "Crystal" && jQuery('.dgo-style-select-selected .dgo-identifier-input').val() == "Crystal/KeyChain"){

			    	global_price_object = [];
			    	
			    	formats_object = [];
			    	
			    	w2pMaterialGet(jQuery('.dgo-style-select-selected').children('.dgo-identifier-input').val());
				}else{
					w2pPriceGet(jQuery('#material-key').val());
				}
				
			}				
		});
	}
	
	var seoLink = window.location.hash;
	var arrLink = seoLink.split("_");
	
	if(seoLink != ""){
		seoLink = seoLink.replace('curr='+globalCurrency,'curr='+currencyKey);		
		window.location.hash = seoLink;
	}
	
	
	
}

//change the dimension
function dimensionChange(key){
		
	jQuery('.dropdown-container-dim').hide();
	jQuery('.dropdown-dime-select').html(key);
	
	var dataString = "option=dimension&dimension=" + key;	
	jQuery.ajax({
		type: "GET",
		url: web_2_print_blogInfo + "inc/ajax/ajaxLanguage.php",
		data: dataString,
		success: function(data){
		}				
	});
	
	//price selecting
	var price_selecting = jQuery('.order-product-content-child-selected .order-price-choosen').val();

	//show prices
	var dim = key;
    pluginPriceShow(dim);
	
	//order product event
    order_product_mouseEvent('all', 0);
}

// load function using for order product
function order_product_mouseEvent(numPrice, position){
	
    //if have no position
    if(position == 0){
        //check the first price
        jQuery(".order-product-subcontent .order-product-content-child:nth-child(1)").find("input").attr({checked: "checked"});
        jQuery(".order-product-subcontent .order-product-content-child:nth-child(1)").addClass('order-product-content-child-selected');
        order_price_chosen = 0;
    }
    
    //if choose view all prices
    if(numPrice == 'all'){
        
    }else{
        jQuery('.order-product-subcontent').find('.order-product-content-child').each(function(){           
            jQuery(this).children('.content-price').css({color: '#efefef'}); 
        });
    }
    
    //event choose format in sidebar
    jQuery('.order-product-content-child').click(function(){ 
        jQuery(this).children().children('input').attr({checked: 'checked'});    
        
        //reset
        //if choose view all prices
        if(numPrice == 'all'){
            jQuery(this).parent().find('.order-product-content-child').each(function(){ 
                jQuery(this).removeClass('order-product-content-child-selected');                
            });
        }else{
            jQuery(this).parent().find('.order-product-content-child').each(function(){ 
                jQuery(this).css({background: '#efefef'}); 
                jQuery(this).children('.content-price').css({color: '#efefef'}); 
            });
        }

      	//add class selected
        jQuery(this).addClass('order-product-content-child-selected');
        
      	order_price_chosen = jQuery('.order-product-content-child-selected .order-price-choosen').val();
      	var index = jQuery('.dgo-type-select-selected .article-array-number').val();
      	
      	var ArticleName = makeFriendlyUrl(jQuery('.article-select-label').html());
      	
      	if(article_result_return[index].Id != undefined){
      		var ArticleId = article_result_return[index].Id;
			var seoLink = '';      		
			var formatId   = order_price_chosen;			
			var formatName = jQuery(this).children('.content-dimension').children('span').html().replace(/\s+/g,"");
			
			seoLink = ArticleName + '-A' + Base62.encode(ArticleId) + '-' + formatId + '_' + formatName + '_lang=' + globalLanguage + '_curr=' + globalCurrency;
			
			window.location.hash = seoLink;
      	}else{
      		
      		if(jQuery('.dgo-style-select-selected .dgo-identifier-input').val() == "Crystal/KeyChain"){
      			//var ArticleId = article_result_return[index].Group[jQuery('.dgo-style-select-selected .dgo-arr-article-number').val()].Id;     
    			var identiferArticle = jQuery('.order-product-content-child-selected .order-price-choosen-identifier').val();    				
    			var identiferArticleArr = dgoSubtypeProductArr["Crystal/KeyChain"];    			
    			var ArticleId = null;

    			for(var j = 0;j<identiferArticleArr.length;j++){
					if(identiferArticleArr[j].Identifier == identiferArticle){
						ArticleId = identiferArticleArr[j].Id;
						break;
					}
				}	
      		}else{
      			var ArticleId = article_result_return[index].Group[jQuery('.dgo-style-select-selected .dgo-arr-article-number').val()].Id;
      		}  		

			var seoLink = '';				
			var formatId   = order_price_chosen;			
			var formatName = jQuery(this).children('.content-dimension').children('span').html().replace(/\s+/g,"");			
			seoLink = ArticleName + '-A' + Base62.encode(ArticleId) + '-' + formatId + '_' + formatName + '_lang=' + globalLanguage + '_curr=' + globalCurrency;			
			window.location.hash = seoLink;					
					
      	}
      	
    });
    
    var seoLink = window.location.hash;
    
    if(seoLink != ""){
		jQuery('.order-product-content-child').removeClass('order-product-content-child-selected');
	
		var arrLink = seoLink.split("-");
		
		if(arrLink[2] != undefined){
			jQuery('.order-product-subcontent').children('.order-product-content-child').each(function(){	
				var label = jQuery(this).children('.content-dimension').children('span').html().replace(/\s+/g,"");
			    if(jQuery(this).children('.order-price-choosen').val() == parseInt(arrLink[2].split("_")[0]) && arrLink[2].split("_")[1] == label){
			    	jQuery(this).click();
			    }
			});
			
				//jQuery('.order-product-subcontent .order-product-content-child:nth-child('+orderproduct+')').find("input").attr({checked: "checked"});
			if(dgoSeoId != undefined){
				if(dgoSeoId == null){
					jQuery('.order-product-subcontent').children('.order-product-content-child:first').addClass('order-product-content-child-selected');
				}
			}else{
				//jQuery('.order-product-subcontent').children('.order-product-content-child:first').addClass('order-product-content-child-selected');
			}
			
		}else{
			if(dgoSeoDimension != null){
				var formatLabel   = dgoSeoDimension.split("_")[1];
				var formatLabelId = dgoSeoDimension.split("_")[0];
				jQuery('.order-product-subcontent').children('.order-product-content-child').each(function(){	
					var label = jQuery(this).children('.content-dimension').children('span').html().replace(/\s+/g,"");					
				    if(jQuery(this).children('.order-price-choosen').val() == parseInt(formatLabelId) && formatLabel == label){				    	
				    	jQuery(this).addClass('order-product-content-child-selected');
				    	jQuery(this).children('.content-dimension').children('input:radio').attr("checked","checked");
				    	
				    	seoLink += '-' + Base62.encode(formatLabelId) + '_' + formatLabel + '_lang=' + globalLanguage + '_curr=' + globalCurrency;
						
						window.location.hash = seoLink;
				    }
				});
			}else{
				if(arrLink[1] == undefined){
					window.location.hash = arrLink[0];
					jQuery('.order-product-subcontent').children('.order-product-content-child:first').addClass('order-product-content-child-selected');
					jQuery('.order-product-subcontent').children('.order-product-content-child:first').children('.content-dimension').children('input:radio').attr("checked","checked");				
				}
				else{
					jQuery('.order-product-subcontent').children('.order-product-content-child:first').addClass('order-product-content-child-selected');
					jQuery('.order-product-subcontent').children('.order-product-content-child:first').children('.content-dimension').children('input:radio').attr("checked","checked");
					
					var formatId   = jQuery('.order-product-subcontent').children('.order-product-content-child:first').children('.order-price-choosen').val();
					var formatName = jQuery('.order-product-subcontent').children('.order-product-content-child:first').children('.content-dimension').children('span').html().replace(/\s+/g,"");
					
					seoLink += '-' + Base62.encode(formatId) + '_' + formatName + '_lang=' + globalLanguage + '_curr=' + globalCurrency;
					
					window.location.hash = seoLink;
				}
			}
			
		}
		
		order_price_chosen = jQuery('.order-product-content-child-selected .order-price-choosen').val();
		
	}
}

//==========================================================================================
function showCurrencyTooltip(){
    jQuery('.order-product-currency-tooltip').css({display: 'block'});
    
    if(jQuery('.currencyListBox').attr('selectedIndex') == -1){
        apiCurrencyGet('order', jQuery('.currencyChange .currency').html());    
    }
}

function showDimensionTooltip(){
    //change dimension
    if(jQuery('.dimensionChange span').html() == 'mm'){
       jQuery('.dimensionChange span').html('inch');
       
       //change dimension view
       var k = 0;
       jQuery('.order-product-subcontent').find('.content-dimension').each(function(){
            jQuery(this).children('span').html(heightArray[k] + ' x ' + widthArray[k] + ' mm');
            k++;    
       }); 
    }else{
       jQuery('.dimensionChange span').html('mm'); 
       
       //change dimension
       changeDimension();
       
       //change dimension view
       //change dimension view
       var k = 0;
       jQuery('.order-product-subcontent').find('.content-dimension').each(function(){
            jQuery(this).children('span').html(heightArrayView[k] + ' x ' + widthArrayView[k] + ' inch');
            k++;    
       });
    }
}

function inch2mm(a){                
    if (a*25.4 != 0){
        var b = a*25.4;
        return b;
    }                 
}

function mm2inch(a){                
    if (a/25.4 != 0){
        var b = a/25.4;
        var c = parseFloat(b);
        return c.toFixed(2);
    }                 
}

function changeDimension(){
    for(var i = 0; i < heightArray.length; i++){
        heightArrayView[i] = mm2inch(heightArray[i]);
        widthArrayView[i] = mm2inch(widthArray[i]);
    }    
}

//==========================================================================================
jQuery(document).ready(function(){
    jQuery('.order-product-currency-tooltip').mouseover(function(){
        jQuery(this).css({display: "block"});
    });
    
    jQuery('.order-product-currency-tooltip').mouseout(function(){
        jQuery(this).css({display: "none"});
    }); 
    
    jQuery('.order-product-currency-tooltip').click(function(){
        jQuery('.order-product-currency-tooltip').fadeOut(1000);                

        //change the text of language
        jQuery('.currencyChange').children('span').html(jQuery('.currencyListBox').val() + '');
        
        //recall materialGet();
        w2pPriceGet();
    });
    
    //change dimension  	
});