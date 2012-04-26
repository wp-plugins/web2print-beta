//get age rating
function getAgeRating(portal, isDev){

	//create a new api object
    var api = new delivergo.api.contact();  
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal for nhain.vn
	api.PortalNameSpace = portal == undefined ? globalPortal : portal; 
	
	api.IsDev = isDev;
    
    //change url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';     
    
    api.GetAgeRating(globalLanguage, function( result ){  
	
    });

}
//get motif category, use in my motives page
function getMotifCategory(portal, isDev){

	//create a new api object
    var api = new delivergo.api();  
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal for nhain.vn
	api.PortalNameSpace = portal == undefined ? globalPortal : portal; 
	
	api.IsDev = isDev;
    
    //change url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';     
    
    api.GetMotifCategory(globalLanguage, function( result ){  
    		
    });
}
/*This file includes ai request functions*/
/*function get all product data*/
function getAllProductData(identifierGroup, callback){
	//get all article
	var api = new delivergo.api();
	
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
		
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //set apikey
    api.ApiKey = guidUser;
    
    //Change the language & currency & shiptocountry
	api.Request.Header.Language = globalLanguage;
	api.Request.Header.Currency = globalCurrency;
	api.Request.Order.Shipment.ShipTo.Country = globalCountry;
    //get article from api
    api.GetAvailableArticles(resaleGuidUser, globalLanguage,
    	function(result){
    		var _identifierGroup = [];
    		var articles = result.Value;
    		
    		//get product group info
    		for(var i = 0; i < articles.length; i++){
    			if(articles[i].ArticleGroupIdentifier == identifierGroup){
    				_identifierGroup.push(articles[i]);
    			}
    		}
    		
    		if(_identifierGroup.length != 0){
    			//get materials
    			for(var j = 0; j < _identifierGroup.length; j++){
    				//add article
    				api.AddArticle(resaleGuidUser, _identifierGroup[j].Matchcode, _identifierGroup[j].Identifier, globalLanguage);
    				var article = api.GetArticle(j);
				  	// change the article element
				  	article.Materials = null;
				  	article.Material = null;
    			}
    			
    			//get material
				api.GetMaterials(
					function(result){
						//clear article
						api.Request.Order.Article = [];
						
						var article_count = 0;
						var _articles = result.Order.Article;
						for(var k = 0; k < _articles.length; k++){
							for(var m = 0; m < _articles[k].Materials.length; m++){								
								//create articles for all identifier and materials
								api.AddArticle(resaleGuidUser, _identifierGroup[k].Matchcode, _identifierGroup[k].Identifier, globalLanguage);
								
								//add material
								var _article = api.GetArticle(article_count);
								_article.Material = _articles[k].Materials[m].Key;
								
								//add printing data
								_article.PrintData = [];						        
					        	var print_data = {
					        		GroupName: 'Group1',
					        		Items: ['http://www.nhain.vn/wp-content/themes/iblogpro_nhain/images/npimg/Nhain-VN-Header-Logo.png']
					        	};					        	
					        	_article.PrintData.push(print_data);
						        
								
								//increase article  count
								article_count++;
							}
						}
						
						//resale guid setting
    					api.Request.Order.ResaleUnitId = resaleGuidUser;
						
						//now we get price
						api.Calculate(
							function(result){
								//callback function
								callback(result);
							}, true
						);
					}, true
				);
    		}else{
    			console.log("Your Identifier (" + identifierGroup + ") is not defined");
    		}		
    	}, true
    );
}

function w2pGetArticleFromPhp(result){
	
	var matchcode_tmp = null;
    		
		for(var i = 1; i < result.Value.length; i++){
			if(result.Value[i].Matchcode.split("/")[0] == result.Value[i-1].Matchcode.split("/")[0]){
				if(matchcode_tmp == null || matchcode_tmp != result.Value[i-1].Matchcode.split("/")[0]){
					
					matchcode_tmp = result.Value[i].Matchcode.split("/")[0];
					if(article_result_return == null){
						article_result_return = GroupOrderArticle(result.Value, matchcode_tmp);				
					}else{
						article_result_return = GroupOrderArticle(article_result_return, matchcode_tmp);
					}
					
				}    				
			}
		}
		
		for(var i = 0;i < article_result_return.length; i++){
			if(article_result_return[i].Group != undefined && article_result_return[i].Group.length > 1){
				for(var j = 0;j < article_result_return[i].Group.length;j++){
					var size_j = article_result_return[i].Group[j].PageWidthOpen * article_result_return[i].Group[j].PageLengthOpen * (article_result_return[i].Group[j].PageDepthOpen != null ? article_result_return[i].Group[j].PageDepthOpen : 1);
					for(var m = j + 1;m < article_result_return[i].Group.length;m++){
						var size_m = article_result_return[i].Group[m].PageWidthOpen * article_result_return[i].Group[m].PageLengthOpen * (article_result_return[i].Group[m].PageDepthOpen != null ? article_result_return[i].Group[m].PageDepthOpen : 1);
						if(article_result_return[i].Group[j].ArticleGroupIdentifier == article_result_return[i].Group[m].ArticleGroupIdentifier){							
							if(size_j > size_m){
								var tmp = {};
								tmp = article_result_return[i].Group[j];
								article_result_return[i].Group[j] = article_result_return[i].Group[m];
								article_result_return[i].Group[m] = tmp;
							}
						}
					}
				}
			}
		}
		
		if(PortalTagString == "nhain"){
			for(var i = 0;i < article_result_return.length; i++){
				if(article_result_return[i].Group != undefined){
					for(var j = 0;j < ArticleGroup.length;j++){
						if(ArticleGroup[j].Token == article_result_return[i].Group[0].ArticleGroupIdentifier){
							article_result_return[i].Name =  ArticleGroup[j].ArticleGroupTranslation[0].Name;
						}
					}
				}
			}
		}else{
			for(var i = 0;i < article_result_return.length; i++){			
				if(article_result_return[i].Categories != undefined){
					var categoryChildren = article_result_return[i].Categories;
					for(var j = 0;j < categoryChildren.length;j++){
						for(var n = 0;n < CategoryArray.length;n++){
							if(CategoryArray[n].Key == categoryChildren[j]){
								article_result_return[i].Name = CategoryArray[n].Name;
							}else if(CategoryArray[n].Children != undefined){
								for(var m = 0;m < CategoryArray[n].Children.length;m++){
									if(CategoryArray[n].Children[m].Key == categoryChildren[j]){
										article_result_return[i].Name = CategoryArray[n].Children[m].Name;
									}
								}
							}
						}
					}
				}else{
					var categoryChildren = article_result_return[i].Group[0].Categories;
					for(var j = 0;j < categoryChildren.length;j++){
						for(var n = 0;n < CategoryArray.length;n++){
							if(CategoryArray[n].Key == categoryChildren[j]){
								article_result_return[i].Name = CategoryArray[n].Name;
							}else if(CategoryArray[n].Children != undefined){
								for(var m = 0;m < CategoryArray[n].Children.length;m++){
									if(CategoryArray[n].Children[m].Key == categoryChildren[j]){
										article_result_return[i].Name = CategoryArray[n].Children[m].Name;
									}
								}
							}
						}
					}
				}
			}
		}

		jQuery('body .dgo-type-abso').remove();
		jQuery('body').append('<div class="dgo-type-abso"><div class="dgo-type-arrow-left"></div><div class="dgo-type-div"><div class="dgo-type-title"><div class="dgo-type-ttl">'+jQuery('#transArticle').val()+'</div><div class="dgo-type-cancel"></div></div><div class="dgo-type-auto-fill"><div class="dgo-type-loading">Loading Article...</div></div></div><div class="dgo-type-arrow-right"></div></div>');
		var available_article = '';
		
		var firstSelectFlag = false;
		
		var seoLink = window.location.hash;
		
		for(var i = 0; i < article_result_return.length; i++){
			if(article_result_return[i].Matchcode != undefined){    				
				available_article += '<div class="dgo-type-select dgo-type-select-'+i+'" onclick="ArticleOptionChange(' + i + ')">';
				
				var img = article_result_return[i].Identifier.toUpperCase();
				if(Global_ProductImg['Article'][article_result_return[i].Identifier.toUpperCase()] == undefined){
					img = Global_ProductImg['Standard'].split(".")[0];
				}
				
				if(article_result_return[i].Name == undefined){
					var name = article_result_return[i].ArticleGroupIdentifier.toLocaleLowerCase()
																			  .replace("_"," ");
						name = name.charAt(0).toUpperCase() + name.slice(1);
				}else{
					var name = article_result_return[i].Name;
				}
				
				if(flagImageArticleFound == true){
					available_article +=	'<div class="dgo-type-img"><img width="80" height="80" src="' + web_2_print_themeUrl + 'css/img/imgArticle/' + img + '.png" /></div>';
				}else{
					available_article +=	'<div class="dgo-type-img"><img width="80" height="80" src="' + web_2_print_blogInfo + 'css/img/imgArticle/STANDARD.png" /></div>';
				}
								
        		available_article +=	'<div class="dgo-type-name">' + name + '</div>';
        		available_article +=	'<div style="display: none" class="dgo-type-select-large">';
        		available_article +=		'<input class="dgo-type-input-large" type="hidden" value="' + article_result_return[i].Matchcode + '" />';
        		available_article +=		'<input class="dgo-identifier-input" type="hidden" value="' + article_result_return[i].Identifier + '" />';
        		available_article +=		'<input class="article-array-number" type="hidden" value="' + i + '" />';

				if(flagImageArticleFound == true){
					available_article +=	'<div class="dgo-type-img-large"><img width="80" height="80" src="' + web_2_print_themeUrl + 'css/img/imgArticle/' + img + '.png" /></div>';
				}else{
					available_article +=	'<div class="dgo-type-img-large"><img width="80" height="80" src="' + web_2_print_blogInfo + 'css/img/imgArticle/STANDARD.png" /></div>';
				}
   	        	
   	        	available_article +=		'<div class="dgo-type-name-large">' + name + '</div>';
   	        	available_article +=	'</div>';
        		available_article += '</div>';
        		
				//set the first selected article
				
        		if(i == 0){
        			
        			jQuery('#article-select .article-select-label').html(name);
        			jQuery('#article-select .article-select-input').val(article_result_return[i].Matchcode);
        			jQuery('#article-select .article-identifier-input').val(article_result_return[i].Identifier);
        			
        			firstSelectFlag = true;
        		}
			}else{
				
			}
		}
		
		//append to megadropdown
		jQuery('.dgo-type-auto-fill').empty().append(available_article);
		
		//dgo-materials-abso mouse hover event
	    var timer = null;
	    //close  box
	    jQuery('.dgo-type-cancel').click(function(){		    	
	    	 setTimeout(function(){
	    			jQuery('.dgo-type-abso').hide();	
	    			setTimeout(function(){
	    			clearTimeout(timer);	
	    			}, 200);    			
	    		}, 0);		    	 
	    });
	
	    jQuery('.dgo-type-abso').hover(
	    	function(){
	    		clearTimeout(timer);		    		
	    		jQuery('.dgo-type-abso').show(); 
	    	},		    		
	        function(){		   			
	    		timer = setTimeout(function(){
	    			jQuery('.dgo-type-abso').hide();
	    		}, 700);
	    	}
	    );
		
		//
	    jQuery('.dgo-type-select').hover(
	    	function(){
	    		jQuery(this).addClass('dgo-type-select-hv-f');
	    		setTimeout(function(){
	    			jQuery('.dgo-type-select-hv-f').addClass('dgo-type-select-hv');
	    		}, 300);		    		
	    	},
	    	function(){
	    		jQuery(this).removeClass('dgo-type-select-hv-f');
	    		jQuery(this).removeClass('dgo-type-select-hv');
	    	}
		);
		
		//append article megadropdown
	    jQuery('.dgo-type-select').click(function(){
	    	jQuery('.dgo-type-select').removeClass('dgo-type-select-selected');
	    	jQuery(this).addClass('dgo-type-select-selected');
	    	jQuery('.dgo-type-abso').fadeOut(1);		    			    		
		});
		
	    //change seo link
	    if(seoLink != "" && seoLink.split("-")[1] != undefined){
			var arrLink = seoLink.split("-");
			
			if(arrLink[1] != undefined){
				dgoSeoId = Base62.decode(arrLink[1].substring(1));
			}
			
			if(arrLink[2] != undefined){
				dgoSeoDimension = arrLink[2];
			}
			
			for(var i = 0; i < article_result_return.length; i++){				
    			if(article_result_return[i].Matchcode != undefined){
    				if(article_result_return[i].Id != undefined){
    					if(article_result_return[i].Id == dgoSeoId){	    						
    						jQuery('.dgo-type-select-'+i).click();    						
	    					break;
	    				}
    				}else{	    					
    					for(var j = 0;j < article_result_return[i].Group.length;j++){	    						
    						if(article_result_return[i].Group[j].Id == dgoSeoId){    							
    							jQuery('.dgo-type-select-'+i).click();    							
		    					break;
    						}
    					}
    				}
    				
    			}
    		}
			
		}else{
			jQuery('.dgo-type-select:first').addClass('dgo-type-select-selected');
		}
}

function w2pGetMaterialFromPhp(result){
	
	jQuery('body .dgo-materials-abso').remove();
    jQuery('body').append('<div class="dgo-materials-abso" style="display: none"><div class="dgo-materials-arrow-left"></div><div class="dgo-materials-div"><div class="dgo-materials-title"><div class="dgo-materials-ttl">'+jQuery('#transMaterials').val()+'</div><div class="dgo-materials-cancel"></div></div><div class="dgo-materials-auto-fill"><div class="dgo-materials-loading">Loading materials...</div></div><div class="dgo-materials-arrow-right"></div></div>');
	
    if(result.Order.Article[0].Materials.length >= 1){	    			 
        var materialMegaOption = "";                         

        //amount of materials
        var numMaterial = result.Order.Article[0].Materials.length;
        
        //sort result
		//materialBubbleSort(result.Order.Article[0].Materials, numMaterial);
        
        // fill dropdown with materials// 
        for(var i = 0; i < numMaterial; i++){
            var idText 	= img = result.Order.Article[0].Materials[i].Key;
			var size 	= null;
            
			if(Global_ProductImg['Material'][result.Order.Article[0].Materials[i].Key] == undefined){
				img = 'STANDARD';
			}

            var nameText = result.Order.Article[0].Materials[i].Name;
            
            if(result.Order.Article[0].Materials[i].Name != undefined){                    
                materialMegaOption += '<div class="dgo-material-select"><div class="dgo-material-img">';
				if(flagImageArticleFound == true){
					materialMegaOption += '<img width="80" src="' + web_2_print_themeUrl + 'css/img/imgMaterials/' + img + '.png" />';
				}else{
					materialMegaOption += '<img width="80" src="' + web_2_print_blogInfo + 'css/img/imgMaterials/' + img + '.png" />';
				}
                
                materialMegaOption += '</div><div class="dgo-material-name">' + nameText + '</div><input type="hidden" value="' + idText + '" />';
                if(flagImageArticleFound == true){
					materialMegaOption += '<div style="display: none" class="dgo-material-select-large"><div class="dgo-material-img-large"><img width="80" src="' + web_2_print_themeUrl + 'css/img/imgMaterials/' + img + '.png" /></div><div class="dgo-material-name-large">' + nameText + '</div></div></div>';					
				}else{					
					materialMegaOption += '<div style="display: none" class="dgo-material-select-large"><div class="dgo-material-img-large"><img width="80" src="' + web_2_print_blogInfo + 'css/img/imgMaterials/' + img + '.png" /></div><div class="dgo-material-name-large">' + nameText + '</div></div></div>';					
				}
				
                
                //set the first selected material
        		if(i == 0){
        			jQuery('#material-key').val(idText);
        			jQuery('.material-select-label').html(nameText);
        		}
            }                            
        }  
        
        //Min and Max area
        maxArea = result.Order.Article[0].MaxAreaToCalculate;                   
        minArea = result.Order.Article[0].MinAreaToCalculate;  
        if(result.Order.Article[0].Runs.length != 0){
        	runInit = result.Order.Article[0].Runs[0]; 
        }else{
        	runInit = 1; 
        }
               
        // Append to materials megadropdownbox
        jQuery(".dgo-materials-auto-fill").empty().append(materialMegaOption);
        
	    jQuery('.dgo-material-select').click(function(){
	    	jQuery('.dgo-material-select').removeClass('dgo-material-select-selected');
	    	jQuery(this).addClass('dgo-material-select-selected');
	    	jQuery('.dgo-materials-abso').fadeOut(1);
	    	//hide locked background
			//jQuery('.dgo-material-select-gray').fadeOut(1);
	    	jQuery('.material-select-label').html(jQuery(this).children('.dgo-material-name').html());
	    	//get price
	    	var material = jQuery('.dgo-material-select-selected').children('input').val();
	    	
	    	var loading  = '<div class="loading-prices-text" style="text-align: center;"><span><img src="'+web_2_print_blogInfo+'css/img/icon/loading.gif"></span><br><span>'+jQuery('#transLoadings').val()+'</span></div>';
	    	
	    	jQuery('.order-product-subcontent').html(loading);
	    	
	    	w2pPriceGet( material );
	    });
	    	
	    //dgo-material-select hover
	    jQuery('.dgo-material-select').hover(
	    	function(){
	    		jQuery(this).addClass('dgo-material-select-hv-f');
	    		setTimeout(function(){
	    			jQuery('.dgo-material-select-hv-f').addClass('dgo-material-select-hv');
	    		}, 300);	
	    		var src = jQuery(this).children('.dgo-material-img').children("img").attr("src");
	    		
	    		var ImageObj 	 = new Image();
	    			ImageObj.src = src;
	    			
	    			jQuery(this).children('.dgo-material-select-large').children('.dgo-material-img-large').children("img").removeAttr("width");
	    			
	    			if(ImageObj.width >= ImageObj.height){
	    				jQuery(this).children('.dgo-material-select-large').children('.dgo-material-img-large').children("img").css("width","95px");
	    				jQuery(this).children('.dgo-material-select-large').children('.dgo-material-img-large').children("img").css("height","");		    				
	    			}else{
	    				jQuery(this).children('.dgo-material-select-large').children('.dgo-material-img-large').children("img").css("height","95px");
	    				jQuery(this).children('.dgo-material-select-large').children('.dgo-material-img-large').children("img").css("width","");		    				
	    			}
	    	},
	    	function(){
	    		jQuery(this).removeClass('dgo-material-select-hv-f');
	    		jQuery(this).removeClass('dgo-material-select-hv');
	    	}
	    );	
	    
	    //dgo-materials-abso mouse hover event
	    var timer = null;
	    
	    //close megadropdown box
	    jQuery('.dgo-materials-cancel').click(function(){		    	
	    	 setTimeout(function(){
	    			jQuery('.dgo-materials-abso').hide();	
	    			setTimeout(function(){
	    			clearTimeout(timer);	
	    			}, 200);    			
	    		}, 0);		    	 
	    });

	    jQuery('.dgo-materials-abso').hover(
	    	function(){
	    		clearTimeout(timer);		    		
	    		jQuery('.dgo-materials-abso').show(); 
	    	},		    		
	        function(){		   			
	    		timer = setTimeout(function(){
	    			jQuery('.dgo-materials-abso').hide();
	    		}, 700);
	    	}
	    );	
		       
	    //get formats
	    /*Dimension settings*/
		//w2pFormatsGet(jQuery("#article-select .article-select-input").val(), result.Order.Article[0].Offcut);
	
    }
}

function w2pGetFormatsFromPhp(result, matchCode){
	/*New request instance, now it should have no article*/
    var api = new delivergo.api(); 
    
	for(var i = 0; i < result.length; i++){
		var children = result[i];
		
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

			if(children.Depth != null && children.Depth != ""){
    			forDepth = children.Depth;
    			if(matchCode.split('/').length > 2){
    				forInchName = matchCode.split('/')[2] + ' (' + api.ConvertMm2Inch(forWidth) + ' x ' + api.ConvertMm2Inch(forHeight) + ' x ' + api.ConvertMm2Inch(forDepth) +' inch' + ')';
    			}else{
    				forInchName =  forInchName.replace(forDepth,api.ConvertMm2Inch(forDepth));
    			}
    			
    			formats_object.push({forwidth: forWidth, forheight: forHeight, forname: forName, forinchname: forInchName, fordepth: forDepth});
    		}else{
    			var forArea = children.Area;
    			//forArea < minArea || 
	    		if(forArea > maxArea){
	    			//do nothing
	    		}else{
	    			formats_object.push({forwidth: forWidth, forheight: forHeight, forname: forName, forinchname: forInchName, fordepth: forDepth});
	    		}  
    		}
		
	}
}

function w2pGetPricesFromPhp(result, matchCode){
	/*New request instance, now it should have no article*/
    var api = new delivergo.api(); 
    
    productionType = matchCode;
    	
	/*Receive result from API if success*/ 
	if(matchCode != undefined){
		if(matchCode.split('/').length <= 2){
			//refresh global price object
            global_price_object = [];  
		}
	}else{
		global_price_object = [];
	}
	
    //get result                        
    for(var i = 0; i < result.Order.Article.length; i++){
    	
    	var article_prices = result.Order.Article[i].Prices.Items;
    	
    	for(var j = 0; j < article_prices.length; j++){					
			if(article_prices[j].Type == 'BasePrice|Standard'){
				var price_time = article_prices[j].MaxDate.ParseRfcDate();
            	price_time = price_time.format("dd.mm.yyyy");
				result.Order.Article[i].PriceTime = price_time;
			}
		}  
		
		//product price
		var sale_object = [];
		var product_price = 0;
		var product_price_vat = 0;
		
		for(var j = 0; j < article_prices.length; j++){						
			var type_split = article_prices[j].Type.split("|");
			
			if(type_split[0] != 'Shipment'){
				sale_object.push(article_prices[j]);
			}	
		}
		
		var grossPrice = api.CalculateGrossPrice(sale_object);
		product_price = grossPrice[0].SaleNetSum;
		product_price_vat = grossPrice[0].SaleGrossSum;				
		
    	//add to article object
    	result.Order.Article[i].Pictures = [];
    	result.Order.Article[i].ArticleID = 'article_id';
    	result.Order.Article[i].Product = productionType;
    	result.Order.Article[i].ArticleIdentifier = result.Order.Article[i].Identifier;
		
    	for(var k = 0;k < article_result_return.length;k++){
    		if(article_result_return[k].Group == undefined){
    			if(article_result_return[k].Identifier == result.Order.Article[i].Identifier){
        			result.Order.Article[i].ArticleGuid = article_result_return[k].Guid;
        		}
    		}else{
    			for(var n = 0; n < article_result_return[k].Group.length;n++){
    				if(article_result_return[k].Group[n].Identifier == result.Order.Article[i].Identifier){
    					result.Order.Article[i].ArticleGuid = article_result_return[k].Group[n].Guid;
    				}
    			}
    		}    		
    	}

    	if(jQuery('.dgo-type-select-selected .dgo-type-input-large').val() != "Crystal"){
    		result.Order.Article[i].FormatObject = formats_object[i];
    	}else{
    		if(jQuery('.dgo-style-select-selected .dgo-identifier-input').val() == "Crystal/KeyChain"){
    			for(var x = 0; x < formats_object.length; x++){
            		if(formats_object[x].forname.split(" ")[0] == productionType.split("/")[2]){
            			result.Order.Article[i].FormatObject = formats_object[x];
            			break;
            		}
            	}
    		}else{
    			result.Order.Article[i].FormatObject = formats_object[i];
    		}            		
    	}            	
    	
    	result.Order.Article[i].ProductPrice = product_price;
    	result.Order.Article[i].ProductPriceVAT = product_price_vat;
    	
    	if(productionType == "Portrait"){
    		result.Order.Article[i].ProductName = jQuery('.style-select-label').html();
    	}else{
    		result.Order.Article[i].ProductName = jQuery('.material-select-label').html();
    	}            	
    	
    	//push to global object            	
    	global_price_object.push(result.Order.Article[i]);  
    	
    }
    
    
    //Sort prices
    priceBubbleSort(global_price_object, global_price_object.length);
    
    //Show Prices
	var dim = jQuery('#dimSelect .dropdown-dime-select').html();
   
	pluginPriceShow(dim);
	
	order_product_mouseEvent('all', 0);     
}

/*This file includes ai request functions*/
//function get article from api
function w2pArticleGet(){
	/*New request instance, now it should have no article*/
    var api = new delivergo.api();
    
    if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
		
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //set apikey
    api.ApiKey = guidUser;

    //get article from api
    api.GetAvailableArticles(resaleGuidUser, globalLanguage,
    	function(result){
    		var matchcode_tmp = null;
    		/*
    		for(var i = 1; i < result.Value.length; i++){
    			if(result.Value[i-1].Matchcode.split("/")[0] != "Crystal" || result.Value[i].Matchcode.split("/")[0] != "Crystal")
    			if(result.Value[i].Matchcode.split("/")[0] == result.Value[i-1].Matchcode.split("/")[0]){
    				if(matchcode_tmp == null || matchcode_tmp != result.Value[i-1].Matchcode.split("/")[0]){
    					matchcode_tmp = result.Value[i].Matchcode.split("/")[0];
    					if(article_result_return == null){
    						article_result_return = GroupOrderArticle(result.Value, matchcode_tmp, result.Value[i].ArticleGroupIdentifier);
    					}else{
    						article_result_return = GroupOrderArticle(article_result_return, matchcode_tmp, result.Value[i].ArticleGroupIdentifier);
    					}
    					
    				}    				
    			}
    		}
			*/
			for(var i = 1; i < result.Value.length; i++){
				if(result.Value[i].Matchcode.split("/")[0] == result.Value[i-1].Matchcode.split("/")[0]){
					if(matchcode_tmp == null || matchcode_tmp != result.Value[i-1].Matchcode.split("/")[0]){
						
						matchcode_tmp = result.Value[i].Matchcode.split("/")[0];
						if(article_result_return == null){
							article_result_return = GroupOrderArticle(result.Value, matchcode_tmp);				
						}else{
							article_result_return = GroupOrderArticle(article_result_return, matchcode_tmp);
						}
						
					}    				
				}
			}
			
			for(var i = 0;i < article_result_return.length; i++){
				if(article_result_return[i].Group != undefined && article_result_return[i].Group.length > 1){
					for(var j = 0;j < article_result_return[i].Group.length;j++){
						var size_j = article_result_return[i].Group[j].PageWidthOpen * article_result_return[i].Group[j].PageLengthOpen * (article_result_return[i].Group[j].PageDepthOpen != null ? article_result_return[i].Group[j].PageDepthOpen : 1);
						for(var m = j + 1;m < article_result_return[i].Group.length;m++){
							var size_m = article_result_return[i].Group[m].PageWidthOpen * article_result_return[i].Group[m].PageLengthOpen * (article_result_return[i].Group[m].PageDepthOpen != null ? article_result_return[i].Group[m].PageDepthOpen : 1);
							if(article_result_return[i].Group[j].ArticleGroupIdentifier == article_result_return[i].Group[m].ArticleGroupIdentifier){							
								if(size_j > size_m){
									var tmp = {};
									tmp = article_result_return[i].Group[j];
									article_result_return[i].Group[j] = article_result_return[i].Group[m];
									article_result_return[i].Group[m] = tmp;
								}
							}
						}
					}
				}
			}
			
			if(PortalTagString == "nhain"){
				for(var i = 0;i < article_result_return.length; i++){
					if(article_result_return[i].Group != undefined){
						for(var j = 0;j < ArticleGroup.length;j++){
							if(ArticleGroup[j].Token == article_result_return[i].Group[0].ArticleGroupIdentifier){
								article_result_return[i].Name =  ArticleGroup[j].ArticleGroupTranslation[0].Name;
							}
						}
					}
				}
			}else{
				for(var i = 0;i < article_result_return.length; i++){			
					if(article_result_return[i].Categories != undefined){
						var categoryChildren = article_result_return[i].Categories;
						for(var j = 0;j < categoryChildren.length;j++){
							for(var n = 0;n < CategoryArray.length;n++){
								if(CategoryArray[n].Key == categoryChildren[j]){
									article_result_return[i].Name = CategoryArray[n].Name;
								}else if(CategoryArray[n].Children != undefined){
									for(var m = 0;m < CategoryArray[n].Children.length;m++){
										if(CategoryArray[n].Children[m].Key == categoryChildren[j]){
											article_result_return[i].Name = CategoryArray[n].Children[m].Name;
										}
									}
								}
							}
						}
					}else{
						var categoryChildren = article_result_return[i].Group[0].Categories;
						for(var j = 0;j < categoryChildren.length;j++){
							for(var n = 0;n < CategoryArray.length;n++){
								if(CategoryArray[n].Key == categoryChildren[j]){
									article_result_return[i].Name = CategoryArray[n].Name;
								}else if(CategoryArray[n].Children != undefined){
									for(var m = 0;m < CategoryArray[n].Children.length;m++){
										if(CategoryArray[n].Children[m].Key == categoryChildren[j]){
											article_result_return[i].Name = CategoryArray[n].Children[m].Name;
										}
									}
								}
							}
						}
					}
				}
			}
    	
    		//return result
    		//group by article    		    		
    		//article_result_return = GroupOrderArticle(article_result_return, 'Crystal', 'CRYSTAL_CUBIC');    		
    		    		
    		jQuery('body .dgo-type-abso').remove();
    		jQuery('body').append('<div class="dgo-type-abso"><div class="dgo-type-arrow-left"></div><div class="dgo-type-div"><div class="dgo-type-title"><div class="dgo-type-ttl">'+jQuery('#transArticle').val()+'</div><div class="dgo-type-cancel"></div></div><div class="dgo-type-auto-fill"><div class="dgo-type-loading">Loading Article...</div></div></div><div class="dgo-type-arrow-right"></div></div>');
    		var available_article = '';
    		var firstSelectFlag = false;
    		
    		var seoLink = window.location.hash;
    		
    		for(var i = 0; i < article_result_return.length; i++){
    			if(article_result_return[i].Matchcode != undefined){    				
    				
    				available_article += '<div class="dgo-type-select dgo-type-select-'+i+'" onclick="ArticleOptionChange(' + i + ')">';
    				
    				var img = article_result_return[i].Identifier.toUpperCase();

    				if(Global_ProductImg['Article'][article_result_return[i].Identifier.toUpperCase()] == undefined){
    					img = Global_ProductImg['Standard'].split(".")[0];
    				}
    				
    				if(article_result_return[i].Name == undefined){
					var name = article_result_return[i].ArticleGroupIdentifier.toLocaleLowerCase()
																			  .replace("_"," ");
						name = name.charAt(0).toUpperCase() + name.slice(1);
				}else{
					var name = article_result_return[i].Name;
				}
				
				if(flagImageArticleFound == true){
					available_article +=	'<div class="dgo-type-img"><img width="80" height="80" src="' + web_2_print_themeUrl + 'css/img/imgArticle/' + img + '.png" /></div>';
				}else{
					available_article +=	'<div class="dgo-type-img"><img width="80" height="80" src="' + web_2_print_blogInfo + 'css/img/imgArticle/STANDARD.png" /></div>';
				}
								
        		available_article +=	'<div class="dgo-type-name">' + name + '</div>';
        		available_article +=	'<div style="display: none" class="dgo-type-select-large">';
        		available_article +=		'<input class="dgo-type-input-large" type="hidden" value="' + article_result_return[i].Matchcode + '" />';
        		available_article +=		'<input class="dgo-identifier-input" type="hidden" value="' + article_result_return[i].Identifier + '" />';
        		available_article +=		'<input class="article-array-number" type="hidden" value="' + i + '" />';

				if(flagImageArticleFound == true){
					available_article +=	'<div class="dgo-type-img-large"><img width="80" height="80" src="' + web_2_print_themeUrl + 'css/img/imgArticle/' + img + '.png" /></div>';
				}else{
					available_article +=	'<div class="dgo-type-img-large"><img width="80" height="80" src="' + web_2_print_blogInfo + 'css/img/imgArticle/STANDARD.png" /></div>';
				}
   	        	
   	        	available_article +=		'<div class="dgo-type-name-large">' + name + '</div>';
   	        	available_article +=	'</div>';
        		available_article += '</div>';
	        		
	        		//set the first selected article
	        		if(!firstSelectFlag){
	        			jQuery('.article-select-label').html(article_result_return[i].Name);
	        			jQuery('.article-select-input').val(article_result_return[i].Matchcode);
	        			jQuery('.article-identifier-input').val(article_result_return[i].Identifier);
	        			
	        			firstSelectFlag = true;
	        		}
    			}else{
    				
    			}
    		}
    		
    		//append to megadropdown
    		jQuery('.dgo-type-auto-fill').empty().append(available_article);
    		
    		//dgo-materials-abso mouse hover event
		    var timer = null;
		    //close  box
		    jQuery('.dgo-type-cancel').click(function(){		    	
		    	 setTimeout(function(){
		    			jQuery('.dgo-type-abso').hide();	
		    			setTimeout(function(){
		    			clearTimeout(timer);	
		    			}, 200);    			
		    		}, 0);		    	 
		    });
		
		    jQuery('.dgo-type-abso').hover(
		    	function(){
		    		clearTimeout(timer);		    		
		    		jQuery('.dgo-type-abso').show(); 
		    	},		    		
		        function(){		   			
		    		timer = setTimeout(function(){
		    			jQuery('.dgo-type-abso').hide();
		    		}, 700);
		    	}
		    );
    		
    		//
		    jQuery('.dgo-type-select').hover(
		    	function(){
		    		jQuery(this).addClass('dgo-type-select-hv-f');
		    		setTimeout(function(){
		    			jQuery('.dgo-type-select-hv-f').addClass('dgo-type-select-hv');
		    		}, 300);		    		
		    	},
		    	function(){
		    		jQuery(this).removeClass('dgo-type-select-hv-f');
		    		jQuery(this).removeClass('dgo-type-select-hv');
		    	}
			);
			
			//append article megadropdown
		    jQuery('.dgo-type-select').click(function(){
		    	jQuery('.dgo-type-select').removeClass('dgo-type-select-selected');
		    	jQuery(this).addClass('dgo-type-select-selected');
		    	jQuery('.dgo-type-abso').fadeOut(1);	
		    	
			});
			
		    //change seo link
		    if(seoLink != ""){
				var arrLink = seoLink.split("-");
				
				if(arrLink[1] != undefined){
					dgoSeoId = Base62.decode(arrLink[1].substring(1));
				}
				
				if(arrLink[2] != undefined){
					dgoSeoDimension = arrLink[2];
				}
				
				for(var i = 0; i < article_result_return.length; i++){
					
	    			if(article_result_return[i].Matchcode != undefined){
	    				if(article_result_return[i].Id != undefined){
	    					if(article_result_return[i].Id == arrLink[1]){	    						
	    						jQuery('.dgo-type-select-'+i).click();
		    					break;
		    				}
	    				}else{	    					
	    					for(var j = 0;j < article_result_return[i].Group.length;j++){	    						
	    						if(article_result_return[i].Group[j].Id == parseInt(arrLink[1])){	    							
	    							jQuery('.dgo-type-select-'+i).click();
			    					break;
	    						}
	    					}
	    				}
	    				
	    			}
	    		}
				
			}else{
				jQuery('.dgo-type-select:first').addClass('dgo-type-select-selected');
				//get materials
				w2pMaterialGet();
			}
			
    	}
    );
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

//function get material from API
function w2pMaterialGet( identifier ){
    /*
        // We will connect to API and get Materials first with no idMaterial parameter
        // in article
        // Because this function just get materials so we can use what values you want (dimension, run, priceType...)
        // We just change production type to get different materials
    */
	
	var flag = false;
    /*New request instance, now it should have no article*/
    var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//Change the language
	api.Request.Header.Language = globalLanguage;
	
	//get production type
	var productionType = jQuery("#article-select .article-select-input").val();	
	
	if(identifier != undefined){
		var productIdentifier = identifier;

	}else{
		var productIdentifier = jQuery("#article-select .article-identifier-input").val();
	}	

	
	//index value in article_result_return array
	var arrNumber = parseInt(jQuery('.dgo-type-select-selected .article-array-number').val());
	
	//check if we dont click any article type
	if(isNaN(arrNumber) == true){
		arrNumber = 0;
	}
	
	/*if this article is a group*/
	if(article_result_return[arrNumber].ArticleGroupEntry != undefined){		
		//show and hide select box
		jQuery('#material-select-div').hide();		
		jQuery('#style-select-div').show();
		jQuery('#material-select').hide();
		jQuery('#materialSel').show();

		if(productIdentifier.split("/").length <= 1){
			for(var i in article_result_return){
				if(article_result_return[i].Matchcode == productionType){
					for(var j in article_result_return[i].Group){
						if(article_result_return[i].Group[j].Identifier == identifier){
							productionType = article_result_return[i].Group[j].Matchcode;
						}
					}
				}
			}
		}else{
			for(var i in article_result_return){
				if(article_result_return[i].Matchcode == productionType.split("/")[0]){
					for(var j in article_result_return[i].Group){
						if(article_result_return[i].Group[j].Identifier == identifier){
							productionType = article_result_return[i].Group[j].Matchcode;
						}
					}
				}
			}
			
			flag = true;
			
			jQuery.each(dgoSubtypeProductArr[productIdentifier], function (i, v){
				
				//set apikey
			    api.ApiKey = guidUser;

			    //change the url to ajaxproxy file
			    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
			    
			    //add article
			    api.AddArticle(resaleGuidUser, v.Matchcode, v.Identifier, globalLanguage);    
			    
			    var article = api.GetArticle(i);
			  	// change the article element
			  	article.Materials = null;
			  	article.Material = null;
			  	
			  	article.NumberColorsBack 	= v.NumberColorsBack;        
                article.NumberColorsFront 	= v.NumberColorsFront;                
                
                article.PageDepthOpen		= v.PageDepthOpen;
                article.PageLengthOpen		= v.PageLengthOpen;
                article.PageWidthOpen		= v.PageWidthOpen;
			  	
			    if(i == dgoSubtypeProductArr[productIdentifier].length-1){
			    	// get material from api
				    api.GetMaterials(
				    	function(result){
				    		jQuery('#material-key').val(result.Order.Article[0].Materials[0].Key);
				    		
				    		if(result.Order.Article[0].Runs.length != 0){
					        	runInit = result.Order.Article[0].Runs[0]; 
					        }else{
					        	runInit = 1; 
					        }
				    		
				    		jQuery.each(dgoSubtypeProductArr[productIdentifier], function (i, v){				    			
				    			w2pFormatsGet(v.Matchcode, v.Offcut);
				    		})
				    })
			    }
			    			    
			})
		}
		
		
	}else{
		
		//show and hide select box
		jQuery('#material-select-div').show();
		jQuery('#material-select').show();
		jQuery('#material-select .material-select-label').html(jQuery('#transLoadings').val()+"...");
		jQuery('#materialSel').hide();
		jQuery('#style-select-div').hide();
	}
	
	if(flag == false){
		//set apikey
	    api.ApiKey = guidUser;

	    //change the url to ajaxproxy file
	    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
	    
	    //add article
	    api.AddArticle(resaleGuidUser, productionType, productIdentifier, globalLanguage);    
	    
	    // get material from api
	    api.GetMaterials(
	    	function(result){
	    	/*Receive result from API and using them*/  
	    		jQuery('body .dgo-materials-abso').remove();
	            jQuery('body').append('<div class="dgo-materials-abso" style="display: none"><div class="dgo-materials-arrow-left"></div><div class="dgo-materials-div"><div class="dgo-materials-title"><div class="dgo-materials-ttl">'+jQuery('#transMaterials').val()+'</div><div class="dgo-materials-cancel"></div></div><div class="dgo-materials-auto-fill"><div class="dgo-materials-loading">Loading materials...</div></div><div class="dgo-materials-arrow-right"></div></div>');
	    		
	            if(result.Order.Article[0].Materials.length >= 1){	    			 
		            var materialMegaOption = "";                         

		            //amount of materials
		            var numMaterial = result.Order.Article[0].Materials.length;
		            
		            //sort result
		    		//materialBubbleSort(result.Order.Article[0].Materials, numMaterial);
		            
		            // fill dropdown with materials// 
		            for(var i = numMaterial-1; i >= 0; i--){
		                var idText 	= img = result.Order.Article[0].Materials[i].Key;
						var size 	= null;
		                
						if(Global_ProductImg['Material'][result.Order.Article[0].Materials[i].Key] == undefined){
							img = 'STANDARD';
						}

		                var nameText = result.Order.Article[0].Materials[i].Name;                              
		                if(result.Order.Article[0].Materials[i].Name != undefined){                    
		                    materialMegaOption += '<div class="dgo-material-select"><div class="dgo-material-img">';
							if(flagImageArticleFound == true){
								materialMegaOption += '<img width="80" src="' + web_2_print_themeUrl + 'css/img/imgMaterials/' + img + '.png" />';
							}else{
								materialMegaOption += '<img width="80" src="' + web_2_print_blogInfo + 'css/img/imgMaterials/' + img + '.png" />';
							}
							
							materialMegaOption += '</div><div class="dgo-material-name">' + nameText + '</div><input type="hidden" value="' + idText + '" />';
							if(flagImageArticleFound == true){
								materialMegaOption += '<div style="display: none" class="dgo-material-select-large"><div class="dgo-material-img-large"><img width="80" src="' + web_2_print_themeUrl + 'css/img/imgMaterials/' + img + '.png" /></div><div class="dgo-material-name-large">' + nameText + '</div></div></div>';					
							}else{					
								materialMegaOption += '<div style="display: none" class="dgo-material-select-large"><div class="dgo-material-img-large"><img width="80" src="' + web_2_print_blogInfo + 'css/img/imgMaterials/' + img + '.png" /></div><div class="dgo-material-name-large">' + nameText + '</div></div></div>';					
							}
							
							
							//set the first selected material
							if(i == 0){
								jQuery('#material-key').val(idText);
								jQuery('.material-select-label').html(nameText);
							}
		                    //set the first selected material
			        		if(i == numMaterial-1){
			        			jQuery('#material-key').val(idText);
			        			jQuery('.material-select-label').html(nameText);
			        		}
		                }                            
		           
		            }  
		            
		            //Min and Max area
			        maxArea = result.Order.Article[0].MaxAreaToCalculate;                   
			        minArea = result.Order.Article[0].MinAreaToCalculate;  
			        if(result.Order.Article[0].Runs.length != 0){
			        	runInit = result.Order.Article[0].Runs[0]; 
			        }else{
			        	runInit = 1; 
			        }
			                          
		            
		            // Append to materials megadropdownbox
		            jQuery(".dgo-materials-auto-fill").empty().append(materialMegaOption);
				    jQuery('.dgo-material-select').click(function(){
				    	jQuery('.dgo-material-select').removeClass('dgo-material-select-selected');
				    	jQuery(this).addClass('dgo-material-select-selected');
				    	jQuery('.dgo-materials-abso').fadeOut(1);
				    	//hide locked background
		    			//jQuery('.dgo-material-select-gray').fadeOut(1);
				    	jQuery('.material-select-label').html(jQuery(this).children('.dgo-material-name').html());
				    	//get price
				    	var material = jQuery('.dgo-material-select-selected').children('input').val();
				    	
				    	var loading  = '<div class="loading-prices-text" style="text-align: center;"><span><img src="'+web_2_print_blogInfo+'css/img/icon/loading.gif"></span><br><span>'+jQuery('#transLoadings').val()+'</span></div>';
				    	
				    	jQuery('.order-product-subcontent').html(loading);
				    	
				    	w2pPriceGet( material );
				    });
				    	
				    //dgo-material-select hover
				    jQuery('.dgo-material-select').hover(
				    	function(){
				    		jQuery(this).addClass('dgo-material-select-hv-f');
				    		setTimeout(function(){
				    			jQuery('.dgo-material-select-hv-f').addClass('dgo-material-select-hv');
				    		}, 300);	
				    		var src = jQuery(this).children('.dgo-material-img').children("img").attr("src");
				    		
				    		var ImageObj 	 = new Image();
				    			ImageObj.src = src;
				    			
				    			jQuery(this).children('.dgo-material-select-large').children('.dgo-material-img-large').children("img").removeAttr("width");
				    			
				    			if(ImageObj.width >= ImageObj.height){
				    				jQuery(this).children('.dgo-material-select-large').children('.dgo-material-img-large').children("img").css("width","95px");
				    				jQuery(this).children('.dgo-material-select-large').children('.dgo-material-img-large').children("img").css("height","");		    				
				    			}else{
				    				jQuery(this).children('.dgo-material-select-large').children('.dgo-material-img-large').children("img").css("height","95px");
				    				jQuery(this).children('.dgo-material-select-large').children('.dgo-material-img-large').children("img").css("width","");		    				
				    			}
				    	},
				    	function(){
				    		jQuery(this).removeClass('dgo-material-select-hv-f');
				    		jQuery(this).removeClass('dgo-material-select-hv');
				    	}
				    );	
				    //dgo-materials-abso mouse hover event
				    var timer = null;
				    //close megadropdown box
				    jQuery('.dgo-materials-cancel').click(function(){		    	
				    	 setTimeout(function(){
				    			jQuery('.dgo-materials-abso').hide();	
				    			setTimeout(function(){
				    			clearTimeout(timer);	
				    			}, 200);    			
				    		}, 0);		    	 
				    });
		    
				    jQuery('.dgo-materials-abso').hover(
				    	function(){
				    		clearTimeout(timer);		    		
				    		jQuery('.dgo-materials-abso').show(); 
				    	},		    		
				        function(){		   			
				    		timer = setTimeout(function(){
				    			jQuery('.dgo-materials-abso').hide();
				    		}, 700);
				    	}
				    );	
					       
				    //get formats
				    /*Dimension settings*/
					w2pFormatsGet(productionType, result.Order.Article[0].Offcut);
				    //w2pFormatsGet(productionType);
	    		}
	            
			}, true
		);
		
	    api.OnError = function(error) {
	      api.Log(error);
	      
	    };
	            
	    api.OnWarning = function(warning) {
	      api.Log(warning.Text);
	    };
	}
	
	 	
} 

/*Get formats from api*/
function w2pFormatsGet( matchCode, offcutInMm ){
	/*New request instance, now it should have no article*/
    var api = new delivergo.api();
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    //change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    if(matchCode.split('/').length <= 2){
    	//clear formats object
    	formats_object = [];
    }
    
    //format endpoint
    var format_endpoint = matchCode;
    
    api.GetFormats(function(result){
    	
    	//save to object
    	if(result.Value == undefined){
    		result.Value = result.value.Value;
    	}

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
	    			//forArea < minArea || 
		    		if(forArea > maxArea){
		    			//do nothing
		    		}else{
		    			formats_object.push({forwidth: forWidth, forheight: forHeight, forname: forName, forinchname: forInchName, fordepth: forDepth});
		    		}  
	    		}
  		
    	}
    	
    	//get price automatically
    	w2pPriceGet(undefined, matchCode);
    }, globalLanguage, format_endpoint, null, offcutInMm );
      //}, globalLanguage, format_endpoint );
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

//function get price from API
function w2pPriceGet( material, matchcode ){	
    /*New request instance, now it should have no article*/
    var api = new delivergo.api(); 
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//set apikey
    api.ApiKey = guidUser;
    
    //change language and currency settings   
    api.Request.Header.Language = globalLanguage;
    api.Request.Header.Currency = globalCurrency;
	api.Request.Order.Shipment.ShipTo.Country = globalCountry;

	//get production type
	var productionType = jQuery("#article-select .article-select-input").val();

	//index value in article_result_return array
	var arrNumber = parseInt(jQuery('.dgo-type-select-selected .article-array-number').val());
	
	//check if we dont click any article type
	if(isNaN(arrNumber) == true){
		arrNumber = 0;
	}
	
	/*if this article is a group*/
	if(article_result_return[arrNumber].ArticleGroupEntry != undefined){
		var dgo_identifier = jQuery('.dgo-style-select-selected').children('.dgo-identifier-input').val();
		var productIdentifier = dgo_identifier;
		
		if(matchcode != undefined){
			productionType = matchcode;
			
			if(productionType.split("/").length <= 2){
				for(var i in article_result_return){
					if(article_result_return[i].Matchcode == productionType){
						for(var j in article_result_return[i].Group){
							if(article_result_return[i].Group[j].Identifier == dgo_identifier){
								productionType = article_result_return[i].Group[j].Matchcode;
							}
						}
					}
				}
			}else{
				for(var i in article_result_return){
					if(article_result_return[i].Matchcode == productionType.split("/")[0]){
						for(var j in article_result_return[i].Group){
							if(article_result_return[i].Group[j].Matchcode == productionType){
								productIdentifier = article_result_return[i].Group[j].Identifier;
							}
						}
					}
				}
			}
		}else{
			for(var i in article_result_return){
				if(article_result_return[i].Matchcode == productionType){
					for(var j in article_result_return[i].Group){
						if(article_result_return[i].Group[j].Identifier == dgo_identifier){
							productionType = article_result_return[i].Group[j].Matchcode;
						}
					}
				}
			}
		}	
		
	}else{
		var productIdentifier = jQuery("#article-select .article-identifier-input").val();
	}
	
    //resale guid setting
    api.Request.Order.ResaleUnitId = resaleGuidUser;
    
    //change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    
    var count = 0;
    //add articles with diffirent dimension
    for(var i = 0; i < formats_object.length; i++){
    	
        if(productionType.split('/').length <= 2){
        	//add article
        	api.AddArticle(resaleGuidUser, productionType, productIdentifier, globalLanguage);
        	var article = api.GetArticle(i);
    		
        	//set material
        	if(material != undefined){
        		article.Material = material;
        	}else{
        		article.Material = jQuery('#material-key').val();
        	} 
        	//set dimension
            article.PageLengthOpen = parseInt(formats_object[i].forheight);
            article.PageWidthOpen = parseInt(formats_object[i].forwidth);        
            
            if(formats_object[i].fordepth != null){
            	article.PageDepthOpen = parseInt(formats_object[i].fordepth);
            }
            
            //set run
            article.Run = runInit;
            
        }else if(productionType.split('/')[2] == formats_object[i].forname.split(' ')[0]){
        	//add article
        	api.AddArticle(resaleGuidUser, productionType, productIdentifier, globalLanguage);
        	var article = api.GetArticle(count);
    		
    		count++;
        	//set material
        	if(material != undefined){
        		article.Material = material;
        	}else{
        		article.Material = jQuery('#material-key').val();
        	} 
        	//set dimension
            article.PageLengthOpen = parseInt(formats_object[i].forheight);
            article.PageWidthOpen = parseInt(formats_object[i].forwidth);        
            
            if(formats_object[i].fordepth != null){
            	article.PageDepthOpen = parseInt(formats_object[i].fordepth);
            }
            
            //set run
            article.Run = runInit;
        }
    }   
 
    // get price from api
    api.Calculate(
    	function(result){
		
			//unblock sidebar, user cant touch it.
			jQuery('.order-product-main-block').hide();
    		    		
    		/*Receive result from API if success*/ 
    		if(matchcode != undefined){
    			if(matchcode.split('/').length <= 2){
        			//refresh global price object
                    global_price_object = [];  
        		}
    		}else{
    			global_price_object = [];
    		}
    		

            //get result                        
            for(var i = 0; i < result.Order.Article.length; i++){
            	
            	var article_prices = result.Order.Article[i].Prices.Items;
            	for(var j = 0; j < article_prices.length; j++){					
					if(article_prices[j].Type == 'BasePrice|Standard'){
						var price_time = article_prices[j].MaxDate.ParseRfcDate();
		            	price_time = price_time.format("dd.mm.yyyy");
						result.Order.Article[i].PriceTime = price_time;
					}
				}  
				
				//product price
				var sale_object = [];
				var product_price = 0;
				var product_price_vat = 0;
				for(var j = 0; j < article_prices.length; j++){						
					var type_split = article_prices[j].Type.split("|");
					
					if(type_split[0] != 'Shipment'){
						sale_object.push(article_prices[j]);
					}	
				}
				
				var grossPrice = api.CalculateGrossPrice(sale_object);
				product_price = grossPrice[0].SaleNetSum;
				product_price_vat = grossPrice[0].SaleGrossSum;				
				
            	//add to article object
            	result.Order.Article[i].Pictures = [];
            	result.Order.Article[i].ArticleID = 'article_id';
            	result.Order.Article[i].Product = productionType;
            	result.Order.Article[i].ArticleIdentifier = productIdentifier;
            	
            	for(var k = 0;k < article_result_return.length;k++){
            		if(article_result_return[k].Group == undefined){
            			if(article_result_return[k].Identifier == result.Order.Article[i].Identifier){
                			result.Order.Article[i].ArticleGuid = article_result_return[k].Guid;
                		}
            		}else{
            			for(var n = 0; n < article_result_return[k].Group.length;n++){
            				if(article_result_return[k].Group[n].Identifier == result.Order.Article[i].Identifier){
            					result.Order.Article[i].ArticleGuid = article_result_return[k].Group[n].Guid;
            				}
            			}
            		}    		
            	}
            	
            	if(jQuery('.dgo-type-select-selected .dgo-type-input-large').val() != "Crystal"){
            		result.Order.Article[i].FormatObject = formats_object[i];
            	}else{
            		if(jQuery('.dgo-style-select-selected .dgo-identifier-input').val() == "Crystal/KeyChain"){
            			for(var x = 0; x < formats_object.length; x++){
                    		if(formats_object[x].forname.split(" ")[0] == productionType.split("/")[2]){
                    			result.Order.Article[i].FormatObject = formats_object[x];
                    			break;
                    		}
                    	}
            		}else{
            			result.Order.Article[i].FormatObject = formats_object[i];
            		}            		
            	}            	
            	
            	result.Order.Article[i].ProductPrice = product_price;
            	result.Order.Article[i].ProductPriceVAT = product_price_vat;
            	
            	if(productionType == "Portrait"){
            		result.Order.Article[i].ProductName = jQuery('.style-select-label').html();
            	}else{
            		result.Order.Article[i].ProductName = jQuery('.material-select-label').html();
            	}            	
            	
            	//push to global object            	
            	global_price_object.push(result.Order.Article[i]);           	
            }
            
            //Sort prices
            priceBubbleSort(global_price_object, global_price_object.length);
            
            //Show Prices
			var dim = jQuery('#dimSelect .dropdown-dime-select').html();
           
			pluginPriceShow(dim);    
            
            //order product event
            order_product_mouseEvent('all', 0);            
    	}, true
    );
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    }; 
}


/*Shopping cart PRICES get*/
//function collect shopping cart element
//create order request
function elementRequestCreate(getType){
	/*New request instance, now it should have no article*/
    var api = new delivergo.api();
    
    //set apikey
    api.ApiKey = guidUser;
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
    
    //change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change language and currency settings   
	api.Request.Header.Currency = globalCurrency;
	api.Request.Header.Language = globalLanguage; 

	//resale unit add
	api.Request.Order.ResaleUnitId = resaleGuidUser;
    //collect elements
    var count = 0;
    for(var i in shop_articles){
    	if(shop_articles[i].Product != undefined){
    		api.AddArticle(resaleGuidUser, shop_articles[i].Product, shop_articles[i].ArticleIdentifier, globalLanguage);
	    	var article = api.GetArticle(count);
	    	count++;
	    	//change article details
	    	article.Material = shop_articles[i].Material;
	        article.PageLengthOpen= shop_articles[i].PageLengthOpen;
	        article.PageWidthOpen= shop_articles[i].PageWidthOpen;
	        
	        if(shop_articles[i].PageDepthOpen != undefined){
	        	 article.PageDepthOpen= shop_articles[i].PageDepthOpen;
	        }
	        
	        article.PriceType = shop_articles[i].PriceType;
	        article.Amount = shop_articles[i].Amount;
	        article.Run = shop_articles[i].Run;
	        article.Manufacturer = shop_articles[i].Manufacturer;
	        
	        //add printing data
	        if(getType == 'OrderProduct'){
				if(shop_articles[i].PrintData == undefined){
					article.PrintData = [];
			        for(var j = 0; j < shop_articles[i].Pictures.length; j++){
			        	var print_data = {
			        		GroupName: 'Group' + j,
			        		Items: [ shop_articles[i].Pictures[j].ImageUri ]
			        	};
			        	
			        	article.PrintData.push(print_data);
			        }
				}else{
					article.PrintData = shop_articles[i].PrintData
				}			        
	        }
	        
	        //if api payment request 
		    if(getType == 'PaymentMethod'){
		        article.Payment = "";    
		    }else if(getType == 'ProductionTime'){
		        article.PriceType = "";
		    }else if(getType == 'OrderProduct'){	    	
		    	article.Payment.Type = jQuery('.payment-select').val();
		    	article.PriceType =  shop_articles[i].PriceType;
		    	article.PrintingMethod = shop_articles[i].PrintingMethod;
		    }
		}
    }   
    if(getType == 'OrderProduct'){
    	var shipping_provider = jQuery('.ship-form-type-selected .ship-form-provider').html();
	    var shipping_tariff = jQuery('.ship-form-type-selected .ship-form-tariffs').html();
	    
	    api.Request.Order.Shipment.ShipmentProvider = shipping_provider;
	    api.Request.Order.Shipment.ShipmentTariff = shipping_tariff;
    }
    
    //return api
    return api;
}

//function get production time from api
function productionTimeGet( state ){
    var api = elementRequestCreate('ProductionTime');

    //change the country
    //default
    if(state == undefined || state == null){
	    api.Request.Order.Shipment.ShipTo.Country = globalCountry;
	    api.Request.Order.Shipment.ShipTo.State = "65";
	}else if(state == false){
		api.Request.Order.Shipment.ShipTo.Country = jQuery('.right-ship-country select').val();
	    api.Request.Order.Shipment.ShipTo.State = null;
	}else{
		api.Request.Order.Shipment.ShipTo.Country = jQuery('.right-ship-country select').val();
	    api.Request.Order.Shipment.ShipTo.State = state;
	}
    
    api.Calculate(function(result){
    	
        jQuery('.cartTable').find('.cartArticle').each(function(index){
			/*Production time selection*/
			var price_type_result = result.Order.Article[index].Prices.Items;
			
			var price_type_selected = jQuery(this).find('.product-time-select').val();
			jQuery(this).find('.product-time-select').empty();
			
			//production time object
			var pro_time_object = [];
			
			for(var i = 0; i < price_type_result.length; i++){
				if(price_type_result[i].__type != undefined){
					var priceTypeName = price_type_result[i].Type.substring(10);
					var priceTypeDate1 = price_type_result[i].MaxDate.ParseRfcDate();
					var priceTypeDate = priceTypeDate1.format("dd.mm.yyyy");	
					var priceTypeDateSort = priceTypeDate1.format("yyyymmdd");	
					priceTypeDateSort = parseInt(priceTypeDateSort);		
							
					pro_time_object.push({ PriceTypeName: priceTypeName, PriceTypeDate: priceTypeDate, PriceTyeSort: priceTypeDateSort});				
				}
			}
			
			//Bubble price type sort
			proTimeBubbleSort(pro_time_object, pro_time_object.length);
			
			//append to selectbox
			for(var j = 0; j < pro_time_object.length; j++){
				jQuery(this).find('.product-time-select').append('<option value="' + pro_time_object[j].PriceTypeName + '">' + pro_time_object[j].PriceTypeDate + ' - ' + pro_time_object[j].PriceTypeName + '</option>');
			}				
			
			//set value
			jQuery(this).find('.product-time-select').val(price_type_selected);
		});
    });
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
      
}

//function get payment methods from api
function paymentMethodGet( state ){
	//get all element in shopping cart for request
    var api = elementRequestCreate('PaymentMethod');
	
	//change the country
    //default
    if(state == undefined || state == null){
	    api.Request.Order.Shipment.ShipTo.Country = globalCountry;
	    api.Request.Order.Shipment.ShipTo.State = "65";
	}else if(state == false){
		api.Request.Order.Shipment.ShipTo.Country = jQuery('.right-ship-country select').val();
	    api.Request.Order.Shipment.ShipTo.State = null;
	}else{
		api.Request.Order.Shipment.ShipTo.Country = jQuery('.right-ship-country select').val();
	    api.Request.Order.Shipment.ShipTo.State = state;
	}
   	
    api.Calculate(
        function (result) {
        	
        	jQuery('#payment-price').html('');
        	
            //return result
            var paymentContent = '';
	    	var payment_method = paymentsArray = result.Order.Article[0].Payments;
	
			//sort result
			priceBubbleSort2(payment_method, payment_method.length);
	    	
	    	for(var i = 0; i < payment_method.length; i++){	    		
	    		var payment_type = payment_method[i].Type;
	    		var payment_name = payment_method[i].Name;
	    		var payment_description = payment_method[i].Description;
	    		var payment_price = payment_method[i].Price.SaleNet;
	    		var payment_price_vat = payment_method[i].Price.SaleNet + payment_method[i].Price.SaleNet * payment_method[i].Price.VatPercentage / 100;
		    		if(payment_price == undefined){
		    			payment_price = 0;
		    			payment_price_vat = 0;
		    		}
		    	var payment_currency = payment_method[i].Price.Currency;
	    		
		    	var endPrice_payment = endUserPrice == "Net" ? payment_price : payment_price_vat;
		    	
		    	//show note for paypal
		    	/*if(payment_type == "PayPal"){
	    			paymentContent += '<div class="payment-method"><div class="description-payment-method" style="display:none"><div class="description-payment-method-icon"></div><div class="description-payment-method-content">'+jQuery('#trans-notice-payment').val()+' EUR.</div><div class="description-payment-method-arrow"></div></div><div class="payment-image payment-' + payment_type + '"></div><div class="payment-method-name">' + payment_name + '</div><div class="payment-method-price">' + formatCurrency(endPrice_payment, payment_currency) + ' ' + payment_currency + '</div><input type="hidden" value="' + payment_price_vat + '" /><input class="payment-type" type="hidden" value="' + payment_type + '"/></div>';
	    		}else*/ 
	    		if(payment_type == "BaoKimInstant" || payment_type == "NganLuong"){
	    			paymentContent += '<div class="payment-method"><div class="description-payment-method" style="display:none"><div class="description-payment-method-icon"></div><div class="description-payment-method-content">'+jQuery('#trans-notice-payment').val()+' VND.</div><div class="description-payment-method-arrow"></div></div><div class="payment-image payment-' + payment_type + '"></div><div class="payment-method-name">' + payment_name + '</div><div class="payment-method-price">' + formatCurrency(endPrice_payment, payment_currency) + ' ' + payment_currency + '</div><input type="hidden" value="' + payment_price_vat + '" /><input class="payment-type" type="hidden" value="' + payment_type + '"/></div>';
	    		}else{
	    			if(payment_description != ""){
	    				paymentContent += '<div class="payment-method"><div class="description-payment-method" style="display:none"><div class="description-payment-method-icon"></div><div class="description-payment-method-content">'+payment_description+'</div><div class="description-payment-method-arrow"></div></div><div class="payment-image payment-' + payment_type + '"></div><div class="payment-method-name">' + payment_name + '</div><div class="payment-method-price">' + formatCurrency(endPrice_payment, payment_currency) + ' ' + payment_currency + '</div><input type="hidden" value="' + payment_price_vat + '" /><input class="payment-type" type="hidden" value="' + payment_type + '"/></div>';
	    			}else{
	    				paymentContent += '<div class="payment-method"><div class="payment-image payment-' + payment_type + '"></div><div class="payment-method-name">' + payment_name + '</div><div class="payment-method-price">' + formatCurrency(endPrice_payment, payment_currency) + ' ' + payment_currency + '</div><input type="hidden" value="' + payment_price_vat + '" /><input class="payment-type" type="hidden" value="' + payment_type + '"/></div>';
	    			}
	    			
	    		}
	    		
	    	}	    
	    	
	    	//add to content of payment dialog
            jQuery('.payment-form-content').empty();
            jQuery('.payment-form-content').append(paymentContent);
            
            jQuery('.payment-method').hover(function(){
            	
            	jQuery(this).children(".description-payment-method").show();
            	
            }, function(){
            	jQuery(this).children(".description-payment-method").hide();
            });
            
            if(InfoBeforeCheckout != null && dgoCurrentPage == "shoppingCart"){
				
            	var payment = InfoBeforeCheckout.payment;
            	jQuery('.payment-form-content').find('.payment-method').each(function(){
				    if(jQuery(this).children('.payment-method-name').html() == payment){
				    	jQuery('.payment-payment span').html(jQuery(this).children('.payment-method-name').html());
				    	jQuery('#payment-price').html(jQuery(this).children('.payment-method-price').html());
				    	jQuery('.payment-method').removeClass('payment-method-selected');
		            	jQuery(this).addClass('payment-method-selected');
				    }					
				})           		
           		jQuery('.payment-select').val(payment);
            	jQuery('.cal-payment-input').val(InfoBeforeCheckout.payment_cost);
           		
           		//cal sum cost
           		finalSumCost(); 
           		
            	//check condition option
            	jQuery('.customerDiv input').attr({"checked":"checked"})
            	
           		//place order after checkout PayPal successfull
           		apiOrderConfirm();
			}          
            
          //payment element event
            jQuery('.payment-method').click(function(){
            	jQuery('.payment-method').removeClass('payment-method-selected');
            	jQuery(this).addClass('payment-method-selected');

            	//change currency if payment method is PayPal
            	if(globalCurrency != 'EUR' && jQuery(this).children('.payment-type').val() == "PayPal"){
            		globalCurrency 	= 'EUR';
            		
            		//loading images while calculate price
            		jQuery('#shipping-price').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
                	jQuery('#payment-price').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
                	jQuery('.cal-sum-value').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
                	jQuery('.priceDiv span').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
                	
            		//jQuery('#curSelect .dropdown-img-select img').attr({'src':'http://api.delivergo.com/lib/img/flags/16_png_rect/'+flags[globalCurrency]});
            		jQuery('.dropdown-curr-select').html(globalCurrency);

            		var dataString = "option=currency&currency=" + globalCurrency;	
            		jQuery.ajax({
            			type: "GET",
            			url: web_2_print_blogInfo + "inc/ajax/ajaxLanguage.php",
            			data: dataString,
            			success: function(data){            				
            				w2pPriceGet();
            				
            				if(dgoCurrentPage == 'shoppingCart'){
            					shippingMethodGet();            					
            				}
            			}				
            		});  

            	}
            	
            	//change currency if payment method is PayPal
            	if(globalCurrency != 'VND' && (jQuery(this).children('.payment-type').val() == "BaoKimInstant" || jQuery(this).children('.payment-type').val() == "NganLuong")){            		
            		globalCurrency 	= 'VND';
            		
            		//loading images while calculate price
            		jQuery('#shipping-price').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
                	jQuery('#payment-price').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
                	jQuery('.cal-sum-value').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
                	jQuery('.priceDiv span').html("<img src='"+web_2_print_blogInfo+"css/img/icon/ajax-loading.gif'>");
                	
                	jQuery('#curSelect .dropdown-img-select .dropdown-img').attr('class','dropdown-img flag_'+globalCurrency);
            		
            		jQuery('.dropdown-curr-select').html(globalCurrency);
            		
            		var dataString = "option=currency&currency=" + globalCurrency;	
            		jQuery.ajax({
            			type: "GET",
            			url: web_2_print_blogInfo + "inc/ajax/ajaxLanguage.php",
            			data: dataString,
            			success: function(data){            				
            				w2pPriceGet();
            				
            				if(dgoCurrentPage == 'shoppingCart'){
            					shippingMethodGet();            					
            				}
            			}				
            		});       
            	}
            	
            	//close dialog
            	jQuery('.paymentForm').dialog('close');

            	//show name and price
           		jQuery('.payment-payment span').html(jQuery(this).children('.payment-method-name').html());
           		jQuery('.payment-select').val(jQuery(this).children('.payment-type').val());
           		jQuery('.cal-payment-input').val(jQuery(this).children('input').val());
           		if(jQuery(this).children('input').val() == undefined){
           			jQuery('#payment-price').html('');
           		}else if(jQuery(this).children('input').val() == 0){
           			jQuery('#payment-price').html(jQuery('#transFree-default-text').val());
           		}else{
           			if(jQuery(this).children('.payment-method-price').html().split(" ")[1] == globalCurrency)
           				{jQuery('#payment-price').html(jQuery(this).children('.payment-method-price').html());}         			
           		}
           		
           		//cal sum cost
           		finalSumCost();      
           		
           		//close message dialog
            	jQuery( "#message-dialog" ).dialog('close');
            });
             
			//choose the cheapest price
			//jQuery('.payment-form-content .payment-method:first-child').click();	
			//clear chosen price
			//jQuery('#payment-price').html('');
			 //if payment is selected
            jQuery('.payment-form-content').find('.payment-method').each(function(){
            	var payment_select = jQuery(this).children('.payment-type').val();
            	var payment_selected = jQuery('.payment-select').val();

            	if(payment_select == payment_selected){
            		jQuery(this).click();
            	}
            });
            
            //cal sum cost
       		finalSumCost();
        }
    );
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

//function get shipping cost from api
function shippingMethodGet( state ){       
	//create api request
    var api = elementRequestCreate(); 
    
    //change the country
    //default
    if(state == undefined || state == null){
	    api.Request.Order.Shipment.ShipTo.Country = globalCountry;
	    api.Request.Order.Shipment.ShipTo.State = "65";
	}else if(state == false){
		api.Request.Order.Shipment.ShipTo.Country = jQuery('.right-ship-country select').val();
	    api.Request.Order.Shipment.ShipTo.State = null;
	}else{
		api.Request.Order.Shipment.ShipTo.Country = jQuery('.right-ship-country select').val();
	    api.Request.Order.Shipment.ShipTo.State = state;
	}
    
    api.Calculate(
        function (result) {
        	jQuery.unblockUI();
        	var shippingContent = '';			
	    	var shipping_detail = shipmentArray = result.Order.Shipment.ShipmentTariffs;
	    	var shipping_price = result.Order.Article[0].Prices.Items;			
	    	
	    	var chippestShipment = 100000000;	    	

	    	for(var i = 0; i < shipping_detail.length; i++){
	    		var ship_provider = shipping_detail[i].Provider;
	    		var ship_type = shipping_detail[i].Tariff;
	    		var ship_name = shipping_detail[i].Name;
	    		var ship_price = 0;
	    		var ship_price_vat = 0;
	    		var ship_currency = '';
	    		
	    		for(var j = 0; j < shipping_price.length; j++){
	    			if(shipping_price[j].Type == 'Shipment|BasePrice|' + ship_provider + '|' + ship_type){
	    				ship_price = shipping_price[j].SaleNet;
	    				ship_price_vat = shipping_price[j].SaleNet + shipping_price[j].SaleNet * shipping_price[j].VatPercentage / 100;
	    				ship_currency = shipping_price[j].Currency;
	    			}
	    		}
	    		
	    		//choose the right price: net or gross
	    		var endPrice_shipment = endUserPrice == "Net" ? ship_price : ship_price_vat;
	    		
	    		shippingContent += '<div class="ship-form-type"><div class="ship-form-tariffs" style="display: none;">' + ship_type + '</div><div class="ship-form-provider" style="display: none;">' + ship_provider + '</div>';
	    		shippingContent += '<div class="ship-form-' + ship_provider.toLowerCase() + '"></div><div class="ship-method-name">' + ship_name + '</div><div class="ship-method-price">' + formatCurrency(endPrice_shipment, ship_currency) + ' ' + ship_currency + '</div><input type="hidden" value="' + ship_price_vat + '" /></div>';
	    	}
	    	
	    	//add to content of payment dialog
            jQuery('.ship-form-content').empty();
            jQuery('.ship-form-content').append( shippingContent );
            
            if(InfoBeforeCheckout != null && dgoCurrentPage == "shoppingCart"){				            
            	
				var shipping = InfoBeforeCheckout.shipping;
				jQuery('.ship-form-content').find('.ship-form-type').each(function(){
				    if(jQuery(this).children('.ship-form-provider').html() + "_" + jQuery(this).children('.ship-form-tariffs').html() == shipping){
				    	jQuery('.payment-ship span').html(jQuery(this).children('.ship-method-name').html());
				    	jQuery('#shipping-price').html(jQuery(this).children('.ship-method-price').html());
				    }					
				})           		
           		jQuery('.shipping-select').val(shipping);
           		jQuery('.cal-shipping-input').val(InfoBeforeCheckout.shipping_cost);
           		
           		//cal sum cost
           		finalSumCost(); 
			}
            
          //payment element event
            jQuery('.ship-form-type').click(function(){
            	jQuery('.ship-form-type').removeClass('ship-form-type-selected');
            	jQuery(this).addClass('ship-form-type-selected');
            	
            	//close dialog
            	jQuery('.shippingForm').dialog('close');
            	
            	//show name and price
           		jQuery('.payment-ship span').html(jQuery(this).children('.ship-method-name').html());
           		jQuery('.shipping-select').val(jQuery(this).children('.ship-form-provider').html() + "_" + jQuery(this).children('.ship-form-tariffs').html());
           		jQuery('.cal-shipping-input').val(jQuery(this).children('input').val());
           		jQuery('.check-out-ship').val(jQuery(this).children('input').val());
           		if(jQuery(this).children('input').val() == 0){
           			jQuery('#shipping-price').html(jQuery('#transFree-default-text').val());
           		}else{
           			jQuery('#shipping-price').html(jQuery(this).children('.ship-method-price').html());
           		}
           		
           		//cal sum cost
           		finalSumCost(); 
            });

            if(jQuery('.shipping-select').val() == ""){
            	//choose the cheapest price
    			jQuery('.ship-form-content .ship-form-type:first-child').click();
            }
            
            //check if shipment is selected
            jQuery('.ship-form-content').find('.ship-form-type').each(function(index){
            	var shipping_select = jQuery(this).children('.ship-form-provider').html() + "_" + jQuery(this).children('.ship-form-tariffs').html();
            	var shipping_selected = jQuery('.shipping-select').val();
            	
            	if(shipping_select == shipping_selected){
            		jQuery(this).click();
            	}
            });
            
			
			//clear chosen price
			//jQuery('#shipping-price').html('');
            
            //Using new price with new currency
            //change article prices
            var count = 0;
            jQuery('.cartTable').find('.priceDiv .priceDiv-articlePriceShow').each(function(index){
            	var article_prices 	= result.Order.Article[index].Prices.Items;
            	
            	jQuery(this).parent().parent().find('.descriptionDiv-name').html(result.Order.Article[index].Name);
            	jQuery(this).parent().parent().find('.descriptionDiv-des').html(result.Order.Article[index].Description);
            	
            	var sale_object = [];
            	
            	for(var j = 0; j < article_prices.length; j++){	
					var chippest_shipment = Math.pow(2, 53);
					var type_split = article_prices[j].Type.split("|");
					
					if(type_split[0] != 'Shipment'){
						sale_object.push(article_prices[j]);
					}else{
						if( article_prices[j].SaleNet < chippest_shipment){
							chippest_shipment = article_prices[j].SaleNet;
						}
					}
				}			
				
				var _price = api.CalculateGrossPrice(sale_object);
				//sum up chippest shipment
				//span_price += chippest_shipment;
            	
				var article_price = (endUserPrice == "Net") ? _price[0].SaleNetSum : _price[0].SaleGrossSum;
				
            	var span_price_show = formatCurrency(article_price, _price[0].Currency) + ' ' + _price[0].Currency;            	
            	
            	jQuery(this).html(span_price_show);  
            	
            	//save to object
            	for(var i in shop_articles){
            		if(count == index){
            			shop_articles[i].ProductPrice = _price[0].SaleNetSum;
            			shop_articles[i].ProductPriceVAT = _price[0].SaleGrossSum;
            			shop_articles[i].Prices.Items[0].Currency = _price[0].Currency;
            			count = 0;
            			break;
            		}
            		count++;
            	}    
            	
            	//save to session
		    	var dataString = "option=price_change&index=" + index + "&price=" + _price[0].SaleNetSum + "&currency=" + _price[0].Currency + "&price_vat=" + _price[0].SaleGrossSum;
				jQuery.ajax({
					type: "GET",
					url: web_2_print_blogInfo + "inc/ajax/ajaxShopCart.php",
					data: dataString,
					success: function(data){
												
					}				
				});  	            	
            });   
            
            paymentMethodGet( state );
           	//calculate sum price
           	//finalSumCost();
        }
    ); 
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

/*Function get price per article*/
function article_price_get(article_id, protype, amount, run){
	/*New request instance, now it should have no article*/
    var api = new delivergo.api();
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//set apikey
    api.ApiKey = guidUser;
    
    //change language and currency settings   
	api.Request.Header.Language = globalLanguage;
    api.Request.Header.Currency = globalCurrency;
	api.Request.Order.Shipment.ShipTo.Country = globalCountry;
	
	//resale guid setting
    api.Request.Order.ResaleUnitId = resaleGuidUser;
    
    //change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    var article_flag = 0;
    for(var i in shop_articles){
    	if(shop_articles[i].ArticleID == article_id){
    		article_flag = i;
    		
    		api.AddArticle(resaleGuidUser, shop_articles[article_flag].Product, shop_articles[article_flag].ArticleIdentifier, globalLanguage);
    		var article = api.GetArticle();
    		
    		article.PriceType 		= protype;
    		article.Amount 			= amount;
    		article.Run 			= run;
    		article.Material 		= shop_articles[article_flag].Material;
	        article.PageLengthOpen	= shop_articles[article_flag].PageLengthOpen;
	        article.PageWidthOpen 	= shop_articles[article_flag].PageWidthOpen;
	        
	        if(shop_articles[article_flag].PageDepthOpen != undefined){
	        	 article.PageDepthOpen= shop_articles[article_flag].PageDepthOpen;
	        }
	        	        
    	}
    }
    
    //do request
	api.Calculate(
	    function (result) {	    	    		
    		//change article price
    		var article_price_class = '.cart_article_' + article_id + ' .cartArticle .priceDiv';
    		
    		var article_prices = result.Order.Article[0].Prices.Items;
    		var sale_object = [];
			
			for(var j = 0; j < article_prices.length; j++){	
				var chippest_shipment = Math.pow(2, 53);
				var type_split = article_prices[j].Type.split("|");
				
				if(type_split[0] != 'Shipment'){
					sale_object.push(article_prices[j]);
				}else{
					if( article_prices[j].SaleNet < chippest_shipment){
						chippest_shipment = article_prices[j].SaleNet;
					}
				}		
			}
			
			var _price = api.CalculateGrossPrice(sale_object);
			//sum up chippest shipment
			//article_price_new += chippest_shipment;
			
			var article_price = (endUserPrice == "Net") ? _price[0].SaleNetSum : _price[0].SaleGrossSum;
			
			//change the price cost in shopCart
    		jQuery(article_price_class).children('span').html(formatCurrency(article_price, _price[0].Currency) + ' ' + _price[0].Currency);
    		jQuery(article_price_class).children('span').attr('class','priceDiv-articlePriceShow');
			
			var id = article_id.charAt(article_id.length-1);
			
			//if we have shopCart in header, we need to update cart
			if(typeof(prices_import_header) != "undefined"){
				jQuery('#shopCart-'+id+' .shopCart-items-price-value').html(formatCurrency(article_price, _price[0].Currency) + ' ' + _price[0].Currency);
				jQuery('#shopCart-'+id+' .shopCart-items-prices-hidden-header').val(article_price);
				jQuery('#shopCart-'+id+' .shopCart-items-amount').html(jQuery('.cart_article_' + article_id + ' .run-input-value').val());
				
				//if this article has Discount
				if(jQuery('#shopCart-'+id+' .shopCart-items-price-noneDiscount').html() != null){
					var priceNonDiscount = jQuery('#shopCart-'+id+' .pricesNonDiscount').val();
					var priceFromCalc = formatCurrency(priceNonDiscount * jQuery('.cart_article_' + article_id + ' .run-input-value').val(), _price[0].Currency) + ' ' + _price[0].Currency					
					for(var n = 0;n < prices_import_header[id].VolumeDiscounts.length;n++){
						if(prices_import_header[id].VolumeDiscounts[n].Amount == jQuery('.cart_article_' + article_id + ' .run-input-value').val()){
							if(prices_import_header[id].VolumeDiscounts[n].Percentage == 0){
								jQuery('#shopCart-'+id+' .shopCart-items-price-noneDiscount').remove();									
								jQuery('#shopCart-'+id+' .shopCart-items-price-value').css('color','');								
							}else{
								jQuery('#shopCart-'+id+' .shopCart-items-price-noneDiscount').html(priceFromCalc);
								jQuery('#shopCart-'+id+' .shopCart-items-price-value').css('color','red');
							}
							break;
						}else if(n == prices_import_header[id].VolumeDiscounts.length - 1){
							jQuery('#shopCart-'+id+' .shopCart-items-price-noneDiscount').remove();									
							jQuery('#shopCart-'+id+' .shopCart-items-price-value').css('color','');								
						}
					}					
				}else if(jQuery('#shopCart-'+id+' .pricesNonDiscount').val() != undefined){
					var priceNonDiscount = jQuery('#shopCart-'+id+' .pricesNonDiscount').val();
					var priceFromCalc = formatCurrency(priceNonDiscount * jQuery('.cart_article_' + article_id + ' .run-input-value').val(), _price[0].Currency) + ' ' + _price[0].Currency					
					for(var n = 0;n < prices_import_header[id].VolumeDiscounts.length;n++){
						if(prices_import_header[id].VolumeDiscounts[n].Amount == jQuery('.cart_article_' + article_id + ' .run-input-value').val()){
							if(prices_import_header[id].VolumeDiscounts[n].Percentage == 0){
								jQuery('#shopCart-'+id+' .shopCart-items-price-noneDiscount').remove();	
								jQuery('#shopCart-'+id+' .shopCart-items-price-value').css('color','');
							}else{
								jQuery('#shopCart-'+id+' .shopCart-items-price-value').css('color','red');
								jQuery('#shopCart-'+id+' .shopCart-items-price').prepend('<span class="shopCart-items-price-noneDiscount" style="font-size:11px;text-decoration: line-through;float:left;width:100%;">'+priceFromCalc+'</span>');						
							}
							break;
						}else if(n == prices_import_header[id].VolumeDiscounts.length - 1){
							jQuery('#shopCart-'+id+' .shopCart-items-price-noneDiscount').remove();									
							jQuery('#shopCart-'+id+' .shopCart-items-price-value').css('color','');								
						}
					}	
				}
				
				for(var n = 0;n < prices_import_header[id].VolumeDiscounts.length;n++){
					if(prices_import_header[id].VolumeDiscounts[n].Amount == jQuery('.cart_article_' + article_id + ' .run-input-value').val()){
						if(prices_import_header[id].VolumeDiscounts[n].Percentage == 0){							
							jQuery(article_price_class).children('.priceDiv-articlePriceShow').css('color','');
						}else{
							jQuery(article_price_class).prepend('<span class="priceDiv-articleOldPriceShow" style="text-decoration: line-through;">'+priceFromCalc+'</span>');
							jQuery(article_price_class).children('.priceDiv-articlePriceShow').css('color','red');
						}
						break;
					}else if(n == prices_import_header[id].VolumeDiscounts.length - 1){								
						jQuery(article_price_class).children('.priceDiv-articlePriceShow').css('color','');
					}
				}	
				
				var sumPricesValue = 0;
				jQuery('.shopCart-items-container .shopCart-items').each(function(){
					sumPricesValue += jQuery(this).children('.shopCart-items-prices-hidden-header').val() * 1;
				});
				
				jQuery('.shopCart-Cost').html(formatCurrency(sumPricesValue, _price[0].Currency) + ' ' + _price[0].Currency);
				jQuery('.shopCart-endprice-total').html(formatCurrency(sumPricesValue, _price[0].Currency) + ' ' + _price[0].Currency);
			}else{	
				jQuery('#shopCart-'+id+' .shopCart-items-price-noneDiscount').remove();									
				jQuery('#shopCart-'+id+' .shopCart-items-price-value').css('color','');	
			}
    		    		   		
    		//need to save to session too
    		//save to session
	    	var dataString = "option=article_change&article=" + article_id + "&pro=" + protype + "&run=" + run + "&amount=" + amount + "&price=" + _price[0].SaleNetSum + '&currency=' + _price[0].Currency + '&price_vat=' + _price[0].SaleGrossSum;
			jQuery.ajax({
				type: "GET",
				url: web_2_print_blogInfo + "inc/ajax/ajaxShopCart.php",
				data: dataString,
				success: function(data){
					//save changing to shop_articles object
		    		shop_articles[article_flag].PriceType = protype;
		    		shop_articles[article_flag].Run = run;
		    		shop_articles[article_flag].Amount = amount;
		    		shop_articles[article_flag].ProductPrice = _price[0].SaleNetSum;
		    		shop_articles[article_flag].ProductPriceVAT = _price[0].SaleGrossSum;
		    		
		    		//get shipping cost
					//shippingMethodGet( jQuery('.right-ship-state select').val() );
			
		    		//calculate price again
    				finalSumCost();
				}				
			});			
	    }
	);
	
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    }; 	
}

//function get country from api
function countriesGet(){		
	
	//get the country 
    var countryCode = '';
    
	//create a new api object
    var api = new delivergo.api();  
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
    
    //change url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';  

    api.GetCountries(
    	function( result ){    		
    		//assign dgoCountryApi
    		dgoCountryApi = result.Value;
    		
    		//get contact if guid exist
    		if(dgoGuid != null && dgoGuid != ""){
    			contacting_GetViaGuid('addressBook');//function in contacting_request_function.js
    		}
			/*
	    	//get all orders
			if(dgoCurrentPage == 'allOrders'){
				allOrder_getList(dgoGuid, dgoEntryPerpage, 1);
			}
			*/
			if(dgoAddressSession != null){
				//dgoAddressSession = JSON2.parse(dgoAddressSession);
				//assign dgoAddressSession in pluginShopCart.php
				Func_Contact_ShowContactWithoutLogin(dgoAddressSession);
			}			
			
			if (jQuery.browser.msie && window.XDomainRequest) {
				var xdr = new XDomainRequest();
			   	xdr.open("get", "http://hdsjsonip.appspot.com/?json");  
				xdr.onload = function() {					
				   	data = JSON2.parse(xdr.responseText);
				   	var dataString = "option=getcountrycode&ip="+data.ip;
					jQuery.ajax({
		   				type: "GET",
		   				url: web_2_print_blogInfo + "inc/ajax/ajaxLanguage.php",
		  				data: dataString,	   
		   				success: function(country){
		   					globalCurrentCountry = 	country;	
		   					
		   					//fill result to selectbox
					        var countryOption = '';
					        
					        var countryDropdown = '';
					        
					        //fill country
					        for(x in dgoCountryApi){
					        	if(dgoCountryApi[x].Key != undefined){
					        		var key = dgoCountryApi[x].Key.toLowerCase();
					        		
					        		var rename = dgoCountryApi[x].Name.replace(/\s/g,'_')
					        						   				  .toLowerCase();				   
					        		countryDropdown += '<div class="add-info-country-dropdown-container" onclick=SelectCountry("'+dgoCountryApi[x].Key+'")>';		        	
						        	countryDropdown+= "<div class='add-info-country-flag flag_b_"+key+"'></div>";
						        	countryDropdown += '<div class="add-info-country-name-drop">'+dgoCountryApi[x].Name+'</div></div>';
						        	
						        	if(dgoCountryApi[x].Key == globalCurrentCountry){
						        		var countrySelected = '';	        					        		
						        		countrySelected += "<div class='add-info-country-flag flag_b_"+key+"'></div>";
						        		countrySelected += '<div class="add-info-country-name">'+dgoCountryApi[x].Name+'</div>';
						        		countrySelected += '<div class="add-info-country-button"></div>';
						        		jQuery('.add-info-country-dropdown-selected').val(dgoCountryApi[x].Key);
						        		jQuery('.country-dropdown-dialog').html(countrySelected);
						        	}
					        	}		        		
					        }
					        
					        //fill country dropdown
					        jQuery('.add-info-country-dropdown').append(countryDropdown);
					        
				         	for(var i = 0; i < dgoCountryApi.length; i++){
					            countryOption += '<option';
					            
					            //select the country from api           
					            if(dgoCountryApi[i].Key == globalCurrentCountry){
					                countryOption += ' selected '
					            }
					             
					            countryOption += ' value="' + dgoCountryApi[i].Key + '">'+ dgoCountryApi[i].Name + '</option>';
					        }				
					        //fill to shipping popup too
					        jQuery('.right-ship-country select').append(countryOption);		        

					        if(dgoCurrentPage == 'shoppingCart'){
					        	if(shop_articles != null){
					        		if(shop_articles.length > 0){		        				        			
					        			//get states if this country has
					        			statesGet("GetPrice");	        			
					        		}
					        	}
				        						
							}
		  				 }				
					});
				};     
			   	xdr.send();
				
			}else{
				jQuery.getJSON('http://api.wipmania.com/jsonp?callback=?', '', function(json) {
		    		globalCurrentCountry = json.address.country_code;
		    		//globalCurrentCountry = 'DE';

			        //fill result to selectbox
			        var countryOption = '';
			        
			        var countryDropdown = '';
			        
			        //fill country
			        for(x in dgoCountryApi){
			        	if(dgoCountryApi[x].Key != undefined){
			        		var key = dgoCountryApi[x].Key.toLowerCase();
			        		
			        		var rename = dgoCountryApi[x].Name.replace(/\s/g,'_')
			        						   				  .toLowerCase();				   
			        		countryDropdown += '<div class="add-info-country-dropdown-container" onclick=SelectCountry("'+dgoCountryApi[x].Key+'")>';		        	
				        	countryDropdown+= "<div class='add-info-country-flag flag_b_"+key+"'></div>";
				        	countryDropdown += '<div class="add-info-country-name-drop">'+dgoCountryApi[x].Name+'</div></div>';
				        	
				        	if(dgoCountryApi[x].Key == globalCurrentCountry){
				        		var countrySelected = '';	        					        		
				        		countrySelected += "<div class='add-info-country-flag flag_b_"+key+"'></div>";
				        		countrySelected += '<div class="add-info-country-name">'+dgoCountryApi[x].Name+'</div>';
				        		countrySelected += '<div class="add-info-country-button"></div>';
				        		jQuery('.add-info-country-dropdown-selected').val(dgoCountryApi[x].Key);
				        		jQuery('.country-dropdown-dialog').html(countrySelected);
				        	}
			        	}		        		
			        }
			        
			        //fill country dropdown
			        jQuery('.add-info-country-dropdown').append(countryDropdown);
			        
		         	for(var i = 0; i < dgoCountryApi.length; i++){
			            countryOption += '<option';
			            
			            //select the country from api           
			            if(dgoCountryApi[i].Key == globalCurrentCountry){
			                countryOption += ' selected '
			            }
			             
			            countryOption += ' value="' + dgoCountryApi[i].Key + '">'+ dgoCountryApi[i].Name + '</option>';
			        }				
			        //fill to shipping popup too
			        jQuery('.right-ship-country select').append(countryOption);		        

			        if(dgoCurrentPage == 'shoppingCart'){
			        	if(shop_articles != null){
			        		if(shop_articles.length > 0){		        				        			
			        			//get states if this country has
			        			statesGet("GetPrice");	        			
			        		}
			        	}
		        						
					}		        
				});
			}
			
			
    	},
    	globalLanguage
    ); 
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };               
}
function countriesGetFromPhp(result){
	//assign dgoCountryApi
	dgoCountryApi = result.Value;
	/*
	//get all orders
	if(dgoCurrentPage == 'allOrders'){
		allOrder_getList(dgoGuid, dgoEntryPerpage, 1);
	}
	*/
	if(dgoAddressSession != null){
		//dgoAddressSession = JSON2.parse(dgoAddressSession);
		//assign dgoAddressSession in pluginShopCart.php
		Func_Contact_ShowContactWithoutLogin(dgoAddressSession);
	}			
	
	if (jQuery.browser.msie && window.XDomainRequest) {
		var xdr = new XDomainRequest();
	   	xdr.open("get", "http://hdsjsonip.appspot.com/?json");  
		xdr.onload = function() {					
		   	data = JSON2.parse(xdr.responseText);
		   	var dataString = "option=getcountrycode&ip="+data.ip;
			jQuery.ajax({
   				type: "GET",
   				url: web_2_print_blogInfo + "inc/ajax/ajaxLanguage.php",
  				data: dataString,	   
   				success: function(country){
   					globalCurrentCountry = 	country;	
   					
   					//fill result to selectbox
			        var countryOption = '';
			        
			        var countryDropdown = '';
			       
			        //fill country
			        for(x in dgoCountryApi){
			        	if(dgoCountryApi[x].Key != undefined){
			        		var key = dgoCountryApi[x].Key.toLowerCase();
			        		
			        		var rename = dgoCountryApi[x].Name.replace(/\s/g,'_')
			        						   				  .toLowerCase();				   
			        		countryDropdown += '<div class="add-info-country-dropdown-container" onclick=SelectCountry("'+dgoCountryApi[x].Key+'")>';		        	
				        	countryDropdown+= "<div class='add-info-country-flag flag_b_"+key+"'></div>";
				        	countryDropdown += '<div class="add-info-country-name-drop">'+dgoCountryApi[x].Name+'</div></div>';
				        	
				        	if(dgoCountryApi[x].Key == globalCurrentCountry){
				        		var countrySelected = '';	        					        		
				        		countrySelected += "<div class='add-info-country-flag flag_b_"+key+"'></div>";
				        		countrySelected += '<div class="add-info-country-name">'+dgoCountryApi[x].Name+'</div>';
				        		countrySelected += '<div class="add-info-country-button"></div>';
				        		jQuery('.add-info-country-dropdown-selected').val(dgoCountryApi[x].Key);
				        		jQuery('.country-dropdown-dialog').html(countrySelected);
				        	}
			        	}		        		
			        }
			        
			        //fill country dropdown
			        jQuery('.add-info-country-dropdown').append(countryDropdown);
			        
		         	for(var i = 0; i < dgoCountryApi.length; i++){
			            countryOption += '<option';
			            
			            //select the country from api           
			            if(dgoCountryApi[i].Key == globalCurrentCountry){
			                countryOption += ' selected '
			            }
			             
			            countryOption += ' value="' + dgoCountryApi[i].Key + '">'+ dgoCountryApi[i].Name + '</option>';
			        }				
			        //fill to shipping popup too
			        jQuery('.right-ship-country select').append(countryOption);		        

			        if(dgoCurrentPage == 'shoppingCart'){
			        	if(shop_articles != null){
			        		if(shop_articles.length > 0){		        				        			
			        			//get states if this country has
			        			statesGet("GetPrice");	        			
			        		}
			        	}
		        						
					}
  				 }				
			});
		};     
	   	xdr.send();
		
	}else{
		jQuery.getJSON('http://api.wipmania.com/jsonp?callback=?', '', function(json) {
    		globalCurrentCountry = json.address.country_code;

	        //fill result to selectbox
	        var countryOption = '';
	        
	        var countryDropdown = '';
	        
	        //fill country
	        for(x in dgoCountryApi){
	        	if(dgoCountryApi[x].Key != undefined){
	        		var key = dgoCountryApi[x].Key.toLowerCase();
	        		
	        		var rename = dgoCountryApi[x].Name.replace(/\s/g,'_')
	        						   				  .toLowerCase();				   
	        		countryDropdown += '<div class="add-info-country-dropdown-container" onclick=SelectCountry("'+dgoCountryApi[x].Key+'")>';		        	
		        	countryDropdown+= "<div class='add-info-country-flag flag_b_"+key+"'></div>";
		        	countryDropdown += '<div class="add-info-country-name-drop">'+dgoCountryApi[x].Name+'</div></div>';
		        	
		        	if(dgoCountryApi[x].Key == globalCurrentCountry){
		        		var countrySelected = '';	        					        		
		        		countrySelected += "<div class='add-info-country-flag flag_b_"+key+"'></div>";
		        		countrySelected += '<div class="add-info-country-name">'+dgoCountryApi[x].Name+'</div>';
		        		countrySelected += '<div class="add-info-country-button"></div>';
		        		jQuery('.add-info-country-dropdown-selected').val(dgoCountryApi[x].Key);
		        		jQuery('.country-dropdown-dialog').html(countrySelected);
		        	}
	        	}		        		
	        }
	        
	        //fill country dropdown
	        jQuery('.add-info-country-dropdown').append(countryDropdown);
	        
         	for(var i = 0; i < dgoCountryApi.length; i++){
	            countryOption += '<option';
	            
	            //select the country from api           
	            if(dgoCountryApi[i].Key == globalCurrentCountry){
	                countryOption += ' selected '
	            }
	             
	            countryOption += ' value="' + dgoCountryApi[i].Key + '">'+ dgoCountryApi[i].Name + '</option>';
	        }				
	        //fill to shipping popup too
	        jQuery('.right-ship-country select').append(countryOption);		        

	        if(dgoCurrentPage == 'shoppingCart'){
	        	if(shop_articles != null){
	        		if(shop_articles.length > 0){		        				        			
	        			//get states if this country has
	        			statesGet("GetPrice");	        			
	        		}
	        	}
        						
			}		        
		});
	}
}
//function get states from api
function statesGet( get_price ){
	//which country we get states
	var country = jQuery('.right-ship-country select').val();
	
	//create a new api object
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//change url to ajaxproxy file
	api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';

	//get states
	api.GetCountry(country, 
		function(result){			
			
			//save cache
			if(result.Value == undefined){
	    		result.Value = result.value.Value;
	    	}
			
			//if require state for calculation
			if(result.Value.RequireStateForShipment != undefined && result.Value.RequireStateForShipment == true){
				//fill to dropdown box
				var states_fill = '';
				if(result.Value != undefined){
					var states = result.Value.StateCollection.State;
				}else{
					var states = result.value.Value;
				}
				
				for(var i = 0; i < states.length; i++){
		            if(states[i].StateTranslation != undefined){
		            	states_fill += '<option';
			            
			            //select the country from api           
			            if(states[i].Token == 65){ //Ho Chi Minh
			                states_fill += ' selected '
			            }
			            
			            states_fill += ' value="' + states[i].Token + '">' + states[i].StateTranslation[0].Name + '</option>';
		            }					
		        }
				
				jQuery('.right-ship-state select').empty().append(states_fill);	
				
				if(get_price != undefined && get_price != null){
					productionTimeGet( jQuery('.right-ship-state select').val() );
					shippingMethodGet( jQuery('.right-ship-state select').val() );
				}
				
				jQuery('.ship-form-footer').show();
			}else{
				productionTimeGet( false );
				shippingMethodGet( false );
				
				jQuery('.ship-form-footer').hide();
				
			}
			
		},
		globalLanguage
	);
	
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    }; 	
}

//Make the order confirm
function apiOrderConfirm(){
		//get all element (should do this with out jquery later)
		var api = elementRequestCreate('OrderProduct');
		
		//if user doens't choose any address
		if(jQuery('.address-selected').length == 0){
			//ShowUserDialog
			//ShowUserDialog('User Information', 'dgo-user-loading', jQuery('#address_missing_inform').val(), 'Ok');
			console.log('1');
			api.Log(jQuery('#address_missing_inform').val());
			alert(jQuery('#address_missing_inform').val());
		}else if (jQuery('.ship-form-type-selected').length == 0){
			//ShowUserDialog
			//ShowUserDialog('User Information', 'dgo-user-loading', jQuery('#shipping_missing_inform').val(), 'Ok');
			console.log('2');			
	       	api.Log(jQuery('#shipping_missing_inform').val());
	       	alert(jQuery('#shipping_missing_inform').val());
		}else if (jQuery('.payment-method-selected').length == 0){
			//ShowUserDialog
			//ShowUserDialog('User Information', 'dgo-user-loading', jQuery('#payment_missing_inform').val(), 'Ok');
			console.log('3');
			console.log(jQuery('.payment-method-selected').length);
	       	api.Log(jQuery('#payment_missing_inform').val());
	    	alert(jQuery('#payment_missing_inform').val());
		}else if (!jQuery('input[name=termin]').is(':checked')){
			//ShowUserDialog
			//ShowUserDialog('User Information', 'dgo-user-loading', jQuery('#right_missing_inform').val(), 'Ok');
			console.log('4');
	       	api.Log(jQuery('#right_missing_inform').val());
	       	alert(jQuery('#right_missing_inform').val());
		}else{		
			
		//ShowUserDialog
		//ShowUserDialog('User Information', 'dgo-user-process', 'Please wait when the order is processing...', 'Close');

		//get address
		var orderSalutation = jQuery('.address-selected .shopping-field-salutation').val();
		var orderForename = jQuery('.address-selected .shopping-field-first-name').html();
		var orderSurname = jQuery('.address-selected .shopping-field-last-name').html();
		var orderStreet = jQuery('.address-selected .shopping-field-street').html();
		var orderCity = jQuery('.address-selected .shopping-field-city').html();
		var orderZipcode = jQuery('.address-selected .shopping-field-zipcode').html();
		var orderCountry = jQuery('.address-selected .shopping-field-countryToken').html();
		var orderState = jQuery('.right-ship-state select').val();
		var orderPhone = jQuery('.address-selected .shopping-field-phone').html();
		var orderEmail = jQuery('.address-selected .shopping-field-email').html();
		
		//add default customer
		api.addDefaultCustomer();
		
		if(dgoGuid == null){
			//set this element when order without login
			api.Request.NotifyCustomerOnAccountCreation = true;
		}

		if(jQuery('.address-selected .shopping-field-password').val() != undefined){
			var orderPassword = jQuery('.address-selected .shopping-field-password').val();
			api.Request.Order.Customer.Password = orderPassword;
		}
		
		api.Request.Order.Customer.TimeZone = jQuery('.address-selected .shopping-field-timezones').val();		
		
		//add address components
		var addressApi 			= api.Request.Order.Customer.Address;

        if(dgoContacting != null){
        	addressApi.Active 		= dgoContacting.ContactingAddress[0].Address.Active;		
    		addressApi.Salutation 	= dgoContacting.ContactingAddress[0].Address.SalutationToken;
    		addressApi.Forename 	= dgoContacting.ContactingAddress[0].Address.Forename;
            addressApi.Surname 		= dgoContacting.ContactingAddress[0].Address.Surname;
            addressApi.Street 		= dgoContacting.ContactingAddress[0].Address.Street;
            addressApi.City 		= dgoContacting.ContactingAddress[0].Address.City;
            addressApi.ZipCode 		= dgoContacting.ContactingAddress[0].Address.ZipCode;
            addressApi.Country 		= dgoContacting.ContactingAddress[0].Address.CountryToken;
            addressApi.State 		= dgoContacting.ContactingAddress[0].Address.StateToken;
            addressApi.Phone 		= (dgoContacting.ContactingAddress[0].Address.Telecommunication != undefined ? dgoContacting.ContactingAddress[0].Address.Telecommunication[0].Number : "");
        	addressApi.Email 		= dgoContacting.ContactingAddress[0].Address.Email[0].Text;
        }else{
        	api.Request.Order.Customer.Guid = UserGuid;
        	addressApi.Active 		= true;        	
    		addressApi.Salutation 	= orderSalutation;
    		addressApi.Forename 	= orderForename;
            addressApi.Surname 		= orderSurname;
            addressApi.Street 		= orderStreet;
            addressApi.City 		= orderCity;
            addressApi.ZipCode 		= orderZipcode;
            addressApi.Country 		= orderCountry;
            addressApi.State 		= orderState;
            addressApi.Phone 		= orderPhone;
        	addressApi.Email = orderEmail;
        }
        //add customer language & currency
        api.Request.Order.Customer.Language = globalLanguage;//edit path here
        
        var payment_method = jQuery('.payment-select').val();
        
        api.Request.Order.Customer.Currency = globalCurrency;      
    	api.Request.Header.Currency 		= globalCurrency;
        
        //add shipment components
        var shipToApi 			= api.Request.Order.Shipment.ShipTo;
        shipToApi.Salutation 	= orderSalutation;
        shipToApi.Forename 		= orderForename;
        shipToApi.Surname 		= orderSurname;
        shipToApi.Street	 	= orderStreet;
        shipToApi.City 			= orderCity;
        shipToApi.ZipCode 		= orderZipcode;
        shipToApi.Country 		= orderCountry;
        shipToApi.State 		= orderState;       
        shipToApi.Email	 		= orderEmail;       
        shipToApi.Phone 		= orderPhone;       
        
        //change debug to true
        //api.EnableDebug();
	    
        jQuery.blockUI(0);
        
	    //ORDER
	    api.PlaceOrder(
	        function (result) {	        		        	
        		//add description to order response
	        	var order_result = result.Order.Article;
	        	var order_count = 0;
	        	var flag = false;
	        	
	        	for(var i in shop_articles){
	        		if(shop_articles[i].Identifier != undefined){
	        			order_result[order_count].ProductNameDescription = shop_articles[i].ProductName;
	        			order_count++;
	        			if(dgoGuid != null && dgoGuid != ""){
							//we come to shopCart from sidebar
							if(shop_articles[i].Pictures.length > 0){
								for(var j = 0;j < shop_articles[i].Pictures.length;j++){
									if(shop_articles[i].Pictures[j].ImageUri.split("/")[5] == UserGuid.replace(/-+/g,'')){
										flag = true;
										break;
									}
								}
							//we come to shopCart from product details
							}else if(shop_articles[i].PrintData != undefined){
								for(var j = 0;j < shop_articles[i].PrintData[0].Items.length;j++){
									if(shop_articles[i].PrintData[0].Items[j].split("/")[5] == UserGuid.replace(/-+/g,'')){
										flag = true;
										break;
									}
								}
							}
	        			}
	        		}	        		
	        	}
				
				//add payment name and description to result
				for(i = 0;i < paymentsArray.length;i++){
					if(paymentsArray[i].Type == result.Order.Article[0].Payment.Type){
						result.Order.Article[0].Payment.Name = paymentsArray[i].Name;
						result.Order.Article[0].Payment.Description = paymentsArray[i].Description;
						break;
					}
				}
				
				//add shipment provider and tariff
				for(i = 0;i < shipmentArray.length;i++){
					if(shipmentArray[i].Provider == result.Order.Shipment.ShipmentProvider && shipmentArray[i].Tariff == result.Order.Shipment.ShipmentTariff){
						result.Order.Shipment.ShipmentName = shipmentArray[i].Provider;						
						break;
					}
				}
	        		        	
	        	//leave object to hidden input
	 			jQuery('.order-component-input').val(JSON2.stringify( result.Order ));	
	        	
	        	if(flag == true){	        		
	        		var imageObject = {
					            		"IdPortal": PortalGuid,
					            		"Creator": imageHandleArray.Guid
		            				  };
		
					//assign uploaded pictures to user
					MoveThumbnailsFromOneAccToAnother(dgoGuid, "normprint", imageObject);
	        	}else{		 			
		 			jQuery('#orderSubmitForm').submit();
	        	}
	    });
	    
		api.OnError = function(error) {	
			jQuery.unblockUI();
			alert(error.Text);		
			api.Log(error);			 
		};
		        
		api.OnWarning = function(warning) {			 
			  api.Log(warning.Text);
			  alert(warning.Text);
		}; 	    
	}
}

//function upload picture from facebook
function facebook2S3(imgLink){
    jQuery.ajax({
        url: web_2_print_blogInfo + 'inc/ajax/ajaxproxy.php?u='+encodeURIComponent('https://api.delivergo.com/content.dev/UploadProxy.ashx?ts=150&p=3bec5ddd-dc75-4d08-8f5d-75102dad8324&u=352964ed-c59b-4b29-8301-6a709390d764&f=Filename&l=' + imgLink),
        type: "GET",
        success: function(result){
            var pictureFacebookOption = '<div class="border-upload-picture ' + result.Files[0].Handle + '"><div class="fix-upload-picture"><img src="' + result.Files[0].ThumbnailUri + '" alt="" height="100"><div class="menu-upload-picture" style="display: none"><div class="delete-button"></div><div class="edit-button" onclick="showEditDialog3(\''+ result.Files[0].ThumbnailUri + '\',\'' + result.Files[0].ImageUri+'\',\'' + result.Files[0].ImageWidth+'\',\''+ result.Files[0].ImageHeight+'\',\''+ result.Files[0].ImageHeight +'\');"></div></div></div></div>';    
            
            //import to upload center
            jQuery('.upload-center-content').append(pictureFacebookOption);
            
            //add hidden info
            var hiddenString = '<input class="picHidden ' + result.Files[0].Handle + '" type="hidden" value="' + result.Files[0].ThumbnailUri + '" name="picHidden[' + result.Files[0].Handle + ']"/>';
            
            if(result.Files[0].ImageWidth > result.Files[0].ImageHeight){
                var formatImg = 'landscape';
            }else{
                var formatImg = 'portrait';
            }
            
            hiddenString += '<input class="formatHidden" type="hidden" value="' + formatImg + '" name="formatHidden[' + result.Files[0].Handle + ']"/>';
            jQuery('#submitForm').append(hiddenString);
            
            //mouse event thumbnail
            var border_upload_picture = '.' + result.Files[0].Handle;
            jQuery(border_upload_picture).hover(
                function(){ jQuery(this).children().children('.menu-upload-picture').css({display: 'block'}) },
                function(){ jQuery(this).children().children('.menu-upload-picture').css({display: 'none'}) }
            );
            
            //delete thumbnail
            jQuery(border_upload_picture).children().children().children('.delete-button').click( function(){
                if (confirm("Do you want to remove this picture?")) {
                    jQuery(border_upload_picture).remove();                   
                }        
            });
        }
    });
}
//--------------------------------------------------------------------------------------------------//
//function get timezone
function GetTimeZones(){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
		
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
    
    api.GetTimeZones(globalLanguage, function(result){
    	dgoTimeZones = result.Value;
    	
    	var TimeZones = '';
    	for(x in dgoTimeZones){
    		if(dgoTimeZones[x].DisplayName != ""){
    			TimeZones += '<option value="' + dgoTimeZones[x].Id + '">(' + dgoTimeZones[x].UtcLabel + ') ' + dgoTimeZones[x].DisplayName + '</option>';
    		}else{
    			TimeZones += '<option value="' + dgoTimeZones[x].Id + '">(' + dgoTimeZones[x].UtcLabel + ') ' + dgoTimeZones[x].Token + '</option>';
    		}
    	}
    	
    	//fill to new timezone dropdown
		jQuery('.addInfoTimeZones').append(TimeZones);	
    });
    
    api.OnError = function(error) {
      api.Log(error);      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

function GetTimeZonesFromPhp(result){
	dgoTimeZones = result.Value;
	
	var TimeZones = '';
	for(x in dgoTimeZones){
		if(dgoTimeZones[x].DisplayName != ""){
			TimeZones += '<option value="' + dgoTimeZones[x].Id + '">(' + dgoTimeZones[x].UtcLabel + ') ' + dgoTimeZones[x].DisplayName + '</option>';
		}else{
			TimeZones += '<option value="' + dgoTimeZones[x].Id + '">(' + dgoTimeZones[x].UtcLabel + ') ' + dgoTimeZones[x].Token + '</option>';
		}
	}
	
	//fill to new timezone dropdown
	jQuery('.addInfoTimeZones').append(TimeZones);
}

//function get timezone
function GetCurrencies(){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
    
    api.GetCurrencies(globalLanguage, function(result){
    	dgoCurrencies = result.Value;
    	for(i in dgoCurrencies){
    		for(j in dgoCurrencies){
    			if(dgoCurrencies[i].Description < dgoCurrencies[j].Description){
    				var tmp = null;
    				tmp 			 = dgoCurrencies[i];
    				dgoCurrencies[i] = dgoCurrencies[j];
    				dgoCurrencies[j] = tmp;
    			}
    		}
    	}

    	var Currencies = '<div class="dropdown-container-cur"><div id="currencyDropdown" class="dgo-dropdown-sidebar">';
    	for(x in dgoCurrencies){
    		if(dgoCurrencies[x].Key != undefined){
    			
    			Currencies += "<div class='dropdown-item' onclick=currencyChange('" + dgoCurrencies[x].Key + "')>";
				//Currencies += "<div class='dropdown-img'><img src='http://api.delivergo.com/lib/img/flags/32_png_rect/"+flags[dgoCurrencies[x].Key]+"'></div>";
				Currencies += "<div class='dropdown-img flag_"+dgoCurrencies[x].Key+"'></div>";
				Currencies += "<div class='dropdown-desc'>" + dgoCurrencies[x].Description + "</div>";
				Currencies += "<div class='dropdown-curr'>" + dgoCurrencies[x].Key + "</div></div>";
    		}    		
	    					
    	}
    	Currencies += '</div></div>';
    	jQuery('body').append(Currencies);
    	
    	//event for dropdown
    	jQuery('.dropdown-container-cur').mouseleave(function(){
    		jQuery('.dropdown-container-cur').hide();
    	})
    });
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

function GetCurrenciesFromPhp(result){
	dgoCurrencies = result.Value;
	for(i in dgoCurrencies){
		for(j in dgoCurrencies){
			if(dgoCurrencies[i].Description < dgoCurrencies[j].Description){
				var tmp = null;
				tmp 			 = dgoCurrencies[i];
				dgoCurrencies[i] = dgoCurrencies[j];
				dgoCurrencies[j] = tmp;
			}
		}
	}

	var Currencies = '<div class="dropdown-container-cur"><div id="currencyDropdown" class="dgo-dropdown-sidebar">';
	for(x in dgoCurrencies){
		if(dgoCurrencies[x].Key != undefined){
			
			Currencies += "<div class='dropdown-item' onclick=currencyChange('" + dgoCurrencies[x].Key + "')>";
			//Currencies += "<div class='dropdown-img'><img src='http://api.delivergo.com/lib/img/flags/32_png_rect/"+flags[dgoCurrencies[x].Key]+"'></div>";
			Currencies += "<div class='dropdown-img flag_"+dgoCurrencies[x].Key+"'></div>";
			Currencies += "<div class='dropdown-desc'>" + dgoCurrencies[x].Description + "</div>";
			Currencies += "<div class='dropdown-curr'>" + dgoCurrencies[x].Key + "</div></div>";
		}    		
    					
	}
	Currencies += '</div></div>';
	jQuery('body').append(Currencies);
	
	//event for dropdown
	jQuery('.dropdown-container-cur').mouseleave(function(){
		jQuery('.dropdown-container-cur').hide();
	})
}

//function get timezone
function GetLanguages(){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
    
    api.GetLanguages(globalLanguage, function(result){
    	dgoLanguages = result.Value;
    	
    	var Languages = '<div class="dropdown-container-lan"><div id="languageDropdown" class="dgo-dropdown-sidebar">';
	            			            		
    	for(x in dgoLanguages){    		
    		if(dgoLanguages[x].Key == "VI" || dgoLanguages[x].Key == "DE" || dgoLanguages[x].Key == "EN"){
	    		Languages += "<div class='dropdown-item' title='' onclick=languageChange('" + dgoLanguages[x].Key + "','" + dgoLanguages[x].Name + "');>";
	    		//Languages += "<div class='dropdown-img'><img src='http://api.delivergo.com/lib/img/flags/32_png_rect/"+flags_lan[dgoLanguages[x].Key]+"'></div>";
	    		Languages += "<div class='dropdown-img flag_"+dgoLanguages[x].Key+"'></div>";
	    		Languages += "<div class='dropdown-desc'>" + dgoLanguages[x].Name + "</div>";
	    		Languages += "<div class='dropdown-curr'>" + dgoLanguages[x].Key + "</div></div>";	    		
    		}    		    		
    	}
    	
    	for(i in dgoLanguages){
    		if(dgoLanguages[i].Key != undefined){
    			if(dgoLanguages[i].Key != "VI" && dgoLanguages[i].Key != "DE" && dgoLanguages[i].Key != "EN"){
	    			Languages += "<div class='dropdown-item dropdown-item-deactive' title='Coming soon'>";
	    			//Languages += "<div class='dropdown-img'><img src='http://api.delivergo.com/lib/img/flags/32_png_rect/"+flags_lan[dgoLanguages[i].Key]+"'></div>";
	    			Languages += "<div class='dropdown-img flag_"+dgoLanguages[i].Key+"'></div>";
		    		Languages += "<div class='dropdown-desc'>" + dgoLanguages[i].Name + "</div>";
		    		Languages += "<div class='dropdown-curr'>" + dgoLanguages[i].Key + "</div></div>";	    		
    			}
    		}    	
    	}
    	
    	//show current language in order product sidebar
    	for(i in dgoLanguages){
    		if(dgoLanguages[i].Key == globalLanguage){
    			jQuery('.dropdown-lan-select').html(dgoLanguages[i].Name);    			
    		}    	
    	}
    	
    	
    	
    	Languages += '</div></div>';
    	
    	jQuery('body').append(Languages);
    	
    	//event for dropdown
    	jQuery('.dropdown-container-lan').mouseleave(function(){
    		jQuery('.dropdown-container-lan').hide();
    	});
    });
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

function GetLanguagesFromPhp(result){
	dgoLanguages = result.Value;
	
	var Languages = '<div class="dropdown-container-lan"><div id="languageDropdown" class="dgo-dropdown-sidebar">';
            			            		
	for(x in dgoLanguages){    		
		if(dgoLanguages[x].Key == "VI" || dgoLanguages[x].Key == "DE" || dgoLanguages[x].Key == "EN"){
    		Languages += "<div class='dropdown-item' title='' onclick=languageChange('" + dgoLanguages[x].Key + "','" + dgoLanguages[x].Name + "');>";    		
    		Languages += "<div class='dropdown-img flag_"+dgoLanguages[x].Key+"'></div>";
    		Languages += "<div class='dropdown-desc'>" + dgoLanguages[x].Name + "</div>";
    		Languages += "<div class='dropdown-curr'>" + dgoLanguages[x].Key + "</div></div>";	    		
		}    		    		
	}
	
	for(i in dgoLanguages){
		if(dgoLanguages[i].Key != undefined){
			if(dgoLanguages[i].Key != "VI" && dgoLanguages[i].Key != "DE" && dgoLanguages[i].Key != "EN"){
    			Languages += "<div class='dropdown-item dropdown-item-deactive' title='Coming soon'>";    			
    			Languages += "<div class='dropdown-img flag_"+dgoLanguages[i].Key+"'></div>";
	    		Languages += "<div class='dropdown-desc'>" + dgoLanguages[i].Name + "</div>";
	    		Languages += "<div class='dropdown-curr'>" + dgoLanguages[i].Key + "</div></div>";	    		
			}
		}    	
	}
	
	//show current language in order product sidebar
	for(i in dgoLanguages){
		if(dgoLanguages[i].Key == globalLanguage){
			jQuery('.dropdown-lan-select').html(dgoLanguages[i].Name);    			
		}    	
	}

	Languages += '</div></div>';
	
	jQuery('body').append(Languages);
	
	//event for dropdown
	jQuery('.dropdown-container-lan').mouseleave(function(){
		jQuery('.dropdown-container-lan').hide();
	});
}

function apiGetPortalFromPhp(result){	
	PortalObject = result.Value;
	
	//set the value to PortalGuid
	PortalGuid = result.Value.Info.Guid;
	if(result.Value.Info.PortalTranslation != undefined){
		PortalName = result.Value.Info.PortalTranslation[0].Name;
	}else{
		PortalName = result.Value.Info.Token;
	}
	
	
	if(dgoCurrentPage == "productDetails"){
		//assign upload button
		//createUploadMultiSelect();
	}else{
		if(dgoCurrentPage == "earnMoney"){
			//show portal name
			jQuery('.postal-affiliate').html(PortalName);
		}
		
		if(dgoCurrentPage == "shoppingCart"){
			jQuery('.PortalId').val(PortalGuid);
		}		
	}
}

//function get portal
function apiGetPortal(key, callback){
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
    		if(key == undefined){
    			
    			PortalObject = result.Value;
    			
				//set the value to PortalGuid
				PortalGuid = result.Value.Info.Guid;
				PortalName = result.Value.Info.PortalTranslation[0].Name;
				
				if(dgoCurrentPage == "productDetails"){
					//assign upload button
					//createUploadMultiSelect();
				}else{
					if(dgoCurrentPage == "earnMoney"){
						//show portal name
						jQuery('.postal-affiliate').html(PortalName);
					}
					
					if(dgoCurrentPage == "shoppingCart"){
						jQuery('.PortalId').val(PortalGuid);
					}
					
					//assign upload button
					//createUploadMultiSelect();    
					
					//upload avatar
					//createSimpleUploader();
				}
    		}else{
				callback(result.Value.Info.Guid);
			}
    	}
    );
}

//======================================================================================================
//function format currency
function formatCurrency(amount, cur){
	var numberOfDecimals = 0;
	  var decimalSeparator = '.';

	  if(cur) {
	    switch(cur) {
	      case 'EUR':
	        numberOfDecimals = 2;
	        decimalSeparator = ',';
	        break;
	      case 'USD':
	        numberOfDecimals = 2;
	        break;
	    }
	  }

	  var c = jQuery().number_format(amount, {
	    numberOfDecimals: numberOfDecimals,
	    decimalSeparator: decimalSeparator,
	    thousandSeparator: '.'
	  });

	  return c;    
}

//Object sort for prices
function priceBubbleSort(arrayName,length) {
    for (var i=0; i<(length-1); i++){
        for (var j=i+1; j<length; j++){
            if (arrayName[j].Prices.Items[0].SaleNet < arrayName[i].Prices.Items[0].SaleNet) {
                var dummy = arrayName[i];
                arrayName[i] = arrayName[j];
                arrayName[j] = dummy;
            }else if(arrayName[j].Prices.Items[0].SaleNet == arrayName[i].Prices.Items[0].SaleNet){
            	var dim_j = arrayName[j].PageWidthOpen * arrayName[j].PageLengthOpen;
            	var dim_i = arrayName[i].PageWidthOpen * arrayName[i].PageLengthOpen;
            	if(dim_j < dim_i){
            		var dummy = arrayName[i];
	                arrayName[i] = arrayName[j];
	                arrayName[j] = dummy;
            	}
            }
        }
    }
}

//Object sort for payment
function priceBubbleSort2(arrayName,length) {
    for (var i=0; i<(length-1); i++)
        for (var j=i+1; j<length; j++)
            if (arrayName[j].Price.SaleNet < arrayName[i].Price.SaleNet) {
                var dummy = arrayName[i];
                arrayName[i] = arrayName[j];
                arrayName[j] = dummy;
            }
}

//Object sort for materials
function materialBubbleSort(arrayName, length){
	for (var i=0; i<(length-1); i++)
        for (var j=i+1; j<length; j++)
            if (arrayName[j].Key < arrayName[i].Key || arrayName[i].Key == 'VN_PHO_PAPER') {
                var dummy = arrayName[i];
                arrayName[i] = arrayName[j];
                arrayName[j] = dummy;
            }
}

//Object sort for production time sort
function proTimeBubbleSort( arrayName, length ){
	for (var i=0; i<(length-1); i++)
        for (var j=i+1; j<length; j++)
            if (arrayName[j].PriceTyeSort > arrayName[i].PriceTyeSort) {
                var dummy = arrayName[i];
                arrayName[i] = arrayName[j];
                arrayName[j] = dummy;
            }
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

//Function find USCLN
function findUSCLN(a, b){
	while(a!=b)
	{
		if (a>b) a=a-b;
		else b=b-a;
	}
	
	return a;
}

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

//function group order article
function GroupOrderArticle( valueObject, groupName){
	var orderObjectReturn = [];
	var orderObjectGroup = [];
	
	var count = 0;
	for(var i = 0; i < valueObject.length; i++){	
		if(valueObject[i].Matchcode != undefined && valueObject[i].Group == undefined){
			var matchCode = valueObject[i].Matchcode.split("/");
			
			if(matchCode[0] == groupName){
				orderObjectGroup.push(valueObject[i]);
				count++;
			}else{
				orderObjectReturn.push(valueObject[i]);
			}
		}else{
			orderObjectReturn.push(valueObject[i]);
		}
	}
	if(count > 0){	
		var name = '';
		orderObjectReturn.push({Matchcode: groupName, Identifier: groupName, Name: name, ArticleGroupEntry: groupName, Group: orderObjectGroup});
	}	
	
	return orderObjectReturn;
}

function getMotifSharing(){
	var api = new delivergo.api();
    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    api.GetMotifSharing(globalLanguage, function(result){
    	
    });
}

function getMotifEvaluation(){
	var api = new delivergo.api();
    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    api.GetMotifEvaluation(globalLanguage, function(result){
    	
    });
}
//===============================================================================//