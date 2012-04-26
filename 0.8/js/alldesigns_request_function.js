function toMotiveProductDesignArr(Arr){
	var newArr = [];
	
	for(var i = 0;i < Arr.length;i++){
		if(Arr[i].Type.split("_")[0] == "template"){			
			if(newArr[Arr[i].Type.split("_")[2].split(":")[0]] == undefined){
				newArr[Arr[i].Type.split("_")[2].split(":")[0]] = [];
				newArr[Arr[i].Type.split("_")[2].split(":")[0]].push(Arr[i]);
			}else{
				newArr[Arr[i].Type.split("_")[2].split(":")[0]].push(Arr[i]);
			}			
		}
	}
	
	return newArr;
}

function getLatestDesigns(PageSize, PageIndex){
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
    api.GetLatestDesigns(guidUser, resaleGuidUser, PageSize, PageIndex, globalLanguage,
    	function(result){
    	
    	var MotiveProductDesignArr = toMotiveProductDesignArr(result.Value);
    		dgoLatestDesigns = result.Value;
		
		var html = '';
		jQuery('.all-design-rightside-content').empty();
		var count = 0;
		var designType = jQuery('#design-type-select').val();
		var url = jQuery('#design-detail-url').val();
				
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
						
    				jQuery('.all-design-rightside-content').append('<div class="all-design-rightside-block"><a href="'+url+'_'+makeFriendlyUrl(designName)+'_'+Base62.encode(v.IdArticle)+'_'+Base62.encode(v.Id)+'"><div class="all-design-rightside-block-pic"><img class="thumb-product-'+i+'" src=""><img class="thumb-design-'+i+'" src="" style="display:none"></div><div class="all-design-rightside-block-title">'+designName+'</div></a></div>');
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
						
    				jQuery('.all-design-rightside-content').append('<div class="all-design-rightside-block"><a href="'+url+'_'+makeFriendlyUrl(designName)+'_'+Base62.encode(v.IdArticle)+'_'+Base62.encode(v.Id)+'"><div class="all-design-rightside-block-pic"><img class="thumb-product-'+i+'" src="" ><img class="thumb-design-'+i+'" src="" style="display:none"></div><div class="all-design-rightside-block-title">'+designName+'</div></a></div>');
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
		
		jQuery('.all-design-rightside-block-pic').hover(function(){
			jQuery(this).children('img:nth-child(2)').hide();
			jQuery(this).children('img:nth-child(1)').show();
		},function(){
			jQuery(this).children('img:nth-child(1)').hide();
			jQuery(this).children('img:nth-child(2)').show();
		});
    });
}

//function to get available article
function alldesign_getAvailableArticle(){
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
    	
    	dgoAvailableArticles = result.Value;
    	
    		if(dgoCurrentPage == 'MotiveDesigns'){
    			var li = '';
        		
        		for(var i = 0;i < dgoAvailableArticles.length;i++){
        			li += '<li class="article-cat article-cat-'+dgoAvailableArticles[i].Id+'"><input type="hidden" value="'+i+'" class="article-index-hidden"><input type="hidden" value="'+dgoAvailableArticles[i].Guid+'" class="article-guid-hidden"><input type="hidden" value="'+dgoAvailableArticles[i].Id+'" class="article-id-hidden">'+dgoAvailableArticles[i].Name+'</li>'        			
        		}
        		
        		jQuery('#all-design-category').html(li);
        		
        		jQuery('.article-cat').click(function(){
        			jQuery('.all-design-rightside-content').empty();
        			jQuery('.all-design-rightside-content').html('Loading...');
        			jQuery('.article-cat').removeClass('article-selected');
        			jQuery(this).addClass('article-selected');
        			
        			alldesign_getDesignByArticle(jQuery(this).children('.article-guid-hidden').val());
        			
        			var index = jQuery('.article-selected .article-index-hidden').val();
        			
        			var ArticleName = makeFriendlyUrl(dgoAvailableArticles[index].Name.toLowerCase());
        			
        			dgoArticleId = jQuery('.article-selected .article-id-hidden').val();
        			
        			var url = ArticleName + '_' + Base62.encode(dgoArticleId);
        			
        			if(dgoDesignType != null){
        				url += '_' + dgoDesignType;
        				jQuery('#design-type-select').val(dgoDesignType);
        				jQuery('.design-tab-type').removeClass('tab-selected');
        				jQuery('.design-tab-type-'+dgoDesignType).addClass('tab-selected');        				
        			}else{
        				url += '_' + jQuery('#design-type-select').val();        				
        			}
        			
        			window.location.hash = url;
        			
        		});
        		
        		if(dgoArticleId == null){
        			getLatestDesigns(50,1);
        		}else{
        			dgoArticleId = isNaN(dgoArticleId) == true ? Base62.decode(dgoArticleId) : dgoArticleId;
        			jQuery('.article-cat-'+dgoArticleId).click(); 
        		}
        		
        		  
    		}
    	});
}

function alldesign_getDesignByArticle(ArticleGuid){
	var api = new delivergo.api.contact();
    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.GetArticlePictures(ArticleGuid, function(result){
    	if(result.Value.length != 0){
    		if(dgoCurrentPage == 'MotiveDesigns'){
    			var MotiveProductDesignArr = toMotiveProductDesignArr(result.Value);
    			dgoDesigns = result.Value;
        		
        		var html = '';
        		jQuery('.all-design-rightside-content').empty();
        		var count = 0;
        		var designType = jQuery('#design-type-select').val();
        		var url = jQuery('#design-detail-url').val();
        		var guidArticle = jQuery('.article-selected .article-id-hidden').val();
        		
        		jQuery.each(dgoDesigns, function(i, v){
        			if(designType == 'motiv'){
        				if(v.Type.split("_")[1] == 'main'){
        					var	designName = '';
        					
        					for(var j = 0;j < v.ThumbnailTranslation.length;j++){
        						if(v.ThumbnailTranslation[j].LanguageToken == globalLanguage){
        							designName = v.ThumbnailTranslation[j].Name;
        						}
        					}	
        						
            				jQuery('.all-design-rightside-content').append('<div class="all-design-rightside-block"><a href="'+url+'_'+makeFriendlyUrl(v.ThumbnailTranslation[0].Name)+'_'+Base62.encode(guidArticle)+'_'+Base62.encode(v.Id)+'"><div class="all-design-rightside-block-pic"><img class="thumb-product-'+i+'" src=""><img class="thumb-design-'+i+'" src="" style="display:none"></div><div class="all-design-rightside-block-title">'+designName+'</div></a></div>');
            				count++;
            				dgoDesignsAfterFilter.push(v);
            			}
        			}else{
        				if(v.Type.split("_")[1] == "product"){
							var	designName = '';
        					for(var j = 0;j < v.ThumbnailTranslation.length;j++){
        						if(v.ThumbnailTranslation[j].LanguageToken == globalLanguage){
        							designName = v.ThumbnailTranslation[j].Name;
        						}
        					}		
    							
            				jQuery('.all-design-rightside-content').append('<div class="all-design-rightside-block"><a href="'+url+'_'+makeFriendlyUrl(v.ThumbnailTranslation[0].Name)+'_'+Base62.encode(guidArticle)+'_'+Base62.encode(v.Id)+'"><div class="all-design-rightside-block-pic"><img class="thumb-product-'+i+'" src="" ><img class="thumb-design-'+i+'" src="" style="display:none"></div><div class="all-design-rightside-block-title">'+designName+'</div></a></div>');
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
        		
        		jQuery('.all-design-rightside-block-pic').hover(function(){
        			jQuery(this).children('img:nth-child(2)').hide();
        			jQuery(this).children('img:nth-child(1)').show();
        		},function(){
        			jQuery(this).children('img:nth-child(1)').hide();
        			jQuery(this).children('img:nth-child(2)').show();
        		});
    		}
    		
    		if(dgoCurrentPage == 'designDetails'){
    			dgoDesigns = result.Value;
    			
    			dgoDesignGuid = isNaN(dgoDesignGuid) == true ? Base62.decode(dgoDesignGuid) : dgoDesignGuid;
    			
    			for(var i = 0;i < dgoDesigns.length;i++){
    				if(dgoDesigns[i].Id == dgoDesignGuid){
    					dgoDesignGuid = dgoDesigns[i].Type.split("_")[2];
    					dgoDesignGuid = dgoDesignGuid.split(":")[0];
    					break;
    				}
    			}
    			
    			var imgList = '';
    			var count = 0;
        		
    			if(dgoDesigns.length != 0){        			        			
        			jQuery.each(dgoDesigns, function (i, v) {
        				if(v.Type != ""){
        					var guidDesign = v.Type.split("_")[2];
        						guidDesign = guidDesign.split(":")[0];
							
	        				if(guidDesign == dgoDesignGuid){        					
	        					if(v.Type.split("_")[1] == 'motive' || v.Type.split("_")[1] == 'product' || v.Type.split("_")[1] == 'main'){
	            			        var imagesource = v.Uri;
	            			        var tmpImg = new Image(); //create temporary image                          
	            			            tmpImg.onload = function () { //set onload handler. IMPORTANT: set it first, after that, set src parameter!!!!!!
	            			                var size = scaleSize(40, 40, this.width, this.height);                             
	            			                
	            			                dgoDesignsAfterFilter.push(v);
	            			                
	            			                jQuery('.image-list-content').append('<div><a class="img-cover img-cover-'+i+'" id="design-'+i+'" title="Pic_'+Base62.encode(v.Id)+'" hash="javascript:void(0)"><img class="design-thumb-'+i+'" id="'+size[0]+'-'+size[1]+'" style="width:' + size[0] + 'px;height:' + size[1] + 'px" src="' + imagesource + '" bigthumb="' + imagesource + '"></div>');
	            			                
	            			                jQuery('.img-cover').hover(function(){
	        			                			//change selected image
	        			                			jQuery('.img-cover').removeClass('img-cover-selected');
	        			                			jQuery(this).addClass('img-cover-selected');
	        			                			
	        			                			if(jQuery(this).attr("id") == "images-reel-effect"){
	        			                				//load image
	        			                				loadImage(jQuery(this).children('img').attr('bigthumb'),true);
	        			                			}else{
	        			                				//load image
	        			                				loadImage(jQuery(this).children('img').attr('bigthumb'),false);
	        			                			}
	        			                			
	        			                			//rewrite url
	        			        					//var currentUrl = getUrlVars();
	        			        						var currentUrl = '';
	        			        						
	        			        						if(dgoArticleSize == null){
	        			        							currentUrl += '#'+ dgoArticleName;
	        			        						}else{
	        			        							currentUrl += '#'+ dgoArticleName+ '-' + dgoArticleSize + '-' + dgoArticleRun + '-' + jQuery('.img-cover-selected').attr('title');
	        			        						}
	        			        						
	        			        						window.location.hash = currentUrl;
	        			                		}      			                		
	        			                	);
	        			                	
	        			                	jQuery('.img-cover').click(function() {
	        			                		//change selected image
	        			                		jQuery('.img-cover').removeClass('img-cover-selected');
	        			                		jQuery(this).addClass('img-cover-selected');
	        			                			                	
	        			                		if(jQuery(this).attr("id") == "images-reel-effect"){
	        			                			//load image
	        			                			loadImage(jQuery(this).children('img').attr('bigthumb'),true);
	        			                		}else{
	        			                			//load image
	        			                			loadImage(jQuery(this).children('img').attr('bigthumb'),false);
	        			                		}
	        			                		
	        			                		//rewrite url
	        		        					//var currentUrl = getUrlVars();
	        		        					var currentUrl = '';
	        		        						
	        	        						if(dgoArticleSize == null){
	        	        							currentUrl += '#'+ dgoArticleName;
	        	        						}else{
	        	        							currentUrl += '#'+ dgoArticleName + '-' + dgoArticleSize + '-' + dgoArticleRun + '-' + jQuery(this).attr('title');
	        	        						}
	
	        	        						window.location.hash = currentUrl;
	        			                	});
	        			                	
	        			                	jQuery('.img-cover:first').click();
	        			                	
	        			                	//choose pic
	        			                	if(dgoArticlePic != ''){
	        			                		jQuery('.image-list-content').children('div').each(function(){
	        				        				if(jQuery(this).children('.img-cover').attr('title') == dgoArticlePic){
	        				    	    				jQuery('.img-cover').removeClass('img-cover-selected');
	        				    	    				jQuery(this).children('.img-cover').addClass('img-cover-selected');
	        				    	    				
	        				    	    				if(jQuery(this).children('.img-cover').attr("id") == "images-reel-effect"){
	        					                			//load image
	        					                			loadImage(jQuery(this).children('.img-cover').children('img').attr('bigthumb'),true);
	        					                		}else{
	        					                			//load image
	        					                			loadImage(jQuery(this).children('.img-cover').children('img').attr('bigthumb'),false);
	        					                		}
	        				    	    				
	        				    	    				//rewrite url
	        				        					//var currentUrl = getUrlVars();
	        				        					var currentUrl = '';
	        				        						
	        			        						if(dgoArticleSize == null){
	        			        							currentUrl += '#'+ dgoArticleName;
	        			        						}else{
	        			        							currentUrl += '#'+ dgoArticleName + '-' + dgoArticleSize + '-' + dgoArticleRun;
	        			        						}
	        			        							
	        			        						if(dgoArticlePic != ''){
	        			    								currentUrl += '-' + dgoArticlePic;
	        			    							}else if(jQuery('.img-cover-selected').attr('title') != undefined){
	        			    								currentUrl += '-' + jQuery('.img-cover-selected').attr('title');
	        			    							}
	        			        						
	        			        						window.location.hash = currentUrl;
	
	        				        				}
	        				        			});
	        			                	}
	        			                	
	            			            }
	            			            tmpImg.src = imagesource;
	            			            count++;
	            			                			           
	            			    }
	        				}
        				}
        				
        				
        			    
        			});
        			
        			
        			
        			if(count == 0){
        				jQuery('#loader').html( '<img src="' + web_2_print_blogInfo + 'css/img/icon/no_photo.png">');
        			}else{

            			//show arrow icon or not
        	    		jQuery('.image-list').hover(function(){
        	    			//show icon
        	    			if(count/6 > 1){
        	    				jQuery('.left-narrow-small').css({"visibility":"visible"});
        	    				jQuery('.right-narrow-small').css({"visibility":"visible"});
        	    			}
        	    		},function(){
        	    				//hide icon
        	    				jQuery('.left-narrow-small').css({"visibility":"hidden"});
        	    				jQuery('.right-narrow-small').css({"visibility":"hidden"});
        	    		});
        	    		
        	    		jQuery('.image-list-content').css({"width":dgoDesigns.length*200});
        	    		
        	    		//event for slider
        	    		jQuery( "#slider-wrap" ).slider({    			
        	    			orientation: 'horizontal',
        	    			min: 0,
        	    			max: count - 6,    			
        	        		slide: function(event, ui) {
        	    				var newValue = 0;    			
        	    					newValue = 0 - ui.value * 73;
        	            		jQuery('.image-list-content').animate({left: newValue}, 40); 
        	            		
        	             	},
        	             	change: function(event, ui) {
        	             		var newValue = 0;    				
        	             			newValue = 0 - ui.value * 73;
        	            		jQuery('.image-list-content').animate({left: newValue}, 40); 
        	                }
        	    		
        	        	});  
        	    		
        	    		//event for mousewheel
        	    		jQuery(".image-list-content,#slider-wrap").mousewheel(function(event, delta){
        	    			var sliderVal = jQuery('#slider-wrap').slider("value");//read current value of the slider
        	    			
        	    			sliderVal += delta;//increment the current value

        	    			jQuery('#slider-wrap').slider("value", sliderVal);//and set the new value of the slider
        	    			
        	    			event.preventDefault();//stop any default behaviour
        	    		});
        	    		
        	    		//event on left arrow icon
        	    		jQuery('.left-narrow-small').click(function(){
        	    			var sliderVal = jQuery('#slider-wrap').slider("value");//read current value of the slider
        	    			
        	    			if(Math.round(count/6) <= sliderVal){
        	    				sliderVal -= 1;//increment the current value

        		    			jQuery('#slider-wrap').slider("value", sliderVal);//and set the new value of the slider
        	    			}    	    			

        	    		});
        	    		
        	    		//event on right arrow icon
        	    		jQuery('.right-narrow-small').click(function(){
        	    			var sliderVal = jQuery('#slider-wrap').slider("value");//read current value of the slider
        	    			
        	    			if(Math.round(count/6) >= sliderVal){
        		    			sliderVal += 1;//increment the current value

        		    			jQuery('#slider-wrap').slider("value", sliderVal);//and set the new value of the slider
        	    			}

        	    		});
        	    		
        	    		var img = new Image();

        	    		jQuery(function () {	
        	    			// wrap our new image in jQuery, then:
        	    		  	jQuery(img).load(function () {
        	    			   // set the image hidden by default    
        	    			   jQuery(this).hide();
        	    			    
        	    			   // with the holding div #loader, apply:
        	    			   jQuery('#loader')   
        	    			   		// remove the loading class (so no background spinner), 
        	    			        .removeClass('loading')

        	    			        // then insert our image
        	    			        .append(this)
        		            	    			    	
        	    			    	// fade our image in to create a nice effect
        	    				    jQuery(this).show();			      
        	    		  	})
        	    			    
        	    		    // if there was an error loading the image, react accordingly
        	    		    .error(function () {
        	    		      // notify the user that the image could not be loaded
        	    		    })
        	    			
        	    		    
        	    		    // *finally*, set the src attribute of the new image to our image
        	    		    .attr('src', jQuery('.image-list .img-cover:first-child').children('img').attr('bigthumb'));
        	    		});

        	    		//image list first click
        	    		jQuery('.image-list li:first-child').children('.img-cover').addClass('img-cover-selected');

        	    		jQuery('.showing-image').hover(function(){
        	    			jQuery('.left-narrow').css({display: 'block'});
        	    			jQuery('.right-narrow').css({display: 'block'});
        	    		}, function(){
        	    			jQuery('.left-narrow').css({display: 'none'});
        	    			jQuery('.right-narrow').css({display: 'none'});
        	    		});

        	    		//function load image
        	    		function loadImage(url,options){
        	    			
        	    			if(options == false){
        	    				jQuery('#loader').show();
        	    				jQuery('#reel-container').hide();
        	    				
        	    				//jQuery('#loader img').attr('src', '');
        	    				
        	    				jQuery('#loader img').hide();
        	    				jQuery('#loader').addClass('loading');
        	    				
        	    				
        	    				// wrap our new image in jQuery, then:
        	    				jQuery(img).load(function () {
        	    					// with the holding div #loader, apply:			   
        	    					// remove the loading class (so no background spinner),  
        	    					jQuery('#loader').removeClass('loading');
        	    					
        	    				})
        	    						
        	    				// if there was an error loading the image, react accordingly
        	    				.error(function () {
        	    				  // notify the user that the image could not be loaded
        	    				})
        	    					
        	    				// *finally*, set the src attribute of the new image to our image
        	    				.attr('src', url);
        	    				//.attr('src', 'css/img/oxford.jpg');
        	    				
        	    				
        	    				
        	    				var im = new Image();
        	    					im.src = url;	

        	    					if(im.height >= im.width){
        	    						if(im.height >= 460){
        	    							jQuery("#loader img").css("height","460px");
        	    							jQuery("#loader img").css("width","");
        	    						}else{
        	    							jQuery("#loader img").css("height",im.height);
        	    							jQuery("#loader img").css("width",im.width);
        	    						}
        	    						
        	    					}else{
        	    						if(im.width >= 460){
        	    							jQuery("#loader img").css("width","460px");
        	    							jQuery("#loader img").css("height","");
        	    						}else{
        	    							jQuery("#loader img").css("width",im.width);
        	    							jQuery("#loader img").css("height",im.height);
        	    						}
        	    						
        	    					}

        	    					jQuery('#loader img').show();	
        	    			}else{
        	    				jQuery('#loader').hide();
        	    				jQuery('#reel-container').show();
        	    				
        	    				//jQuery('#loader img').attr('src', '');
        	    				
        	    				//jQuery('#reel-container img').hide();
        	    				jQuery('#reel-container').addClass('loading');
        	    				
        	    				// wrap our new image in jQuery, then:
        	    				jQuery(img).load(function () {
        	    					// with the holding div #loader, apply:			   
        	    					// remove the loading class (so no background spinner),  
        	    					jQuery('#reel-container').removeClass('loading');
        	    					
        	    				})
        	    						
        	    				// if there was an error loading the image, react accordingly
        	    				.error(function () {
        	    				  // notify the user that the image could not be loaded
        	    				})
        	    					
        	    				// *finally*, set the src attribute of the new image to our image
        	    				.attr('src', url);
        	    				//.attr('src', 'css/img/oxford.jpg');
        	    				
        	    				jQuery('#img').reel({
        	    	                frames: 35, 
        	    	                saves: true 
        	    	            });
        	    				
        	    				jQuery('#img-reel').css({"margin":"0 auto","padding-top": "20px"});
        	    				jQuery('#img-reel img').css({"height":"116px"});
        	    			}
        	    			
        	    			//light box ;)
        		    		jQuery(function(){
        		    			jQuery("#loader").attr("href",jQuery('#loader').children('img').attr('src'));
        		    			jQuery("#loader").prettyPhoto({animation_speed:'fast',slideshow:3000, autoplay_slideshow: false,theme:"facebook"});
        		    		});

        	    		}

        	    		//left narrow click
        	    		jQuery('.left-narrow').click(function(){
        	    			if(jQuery('.img-cover-selected').parent().prev().length != 0)
        	    			{	
        	    				jQuery('.img-cover-selected').parent().prev().children('.img-cover').addClass('img-pre-selected');
        	    				jQuery('.img-cover').removeClass('img-cover-selected');
        	    				jQuery('.img-pre-selected').addClass('img-cover-selected');
        	    				jQuery('.img-cover-selected').removeClass('img-pre-selected');
        	    			}else{
        	    				//select first image
        	    				jQuery('.img-cover').removeClass('img-cover-selected');
        	    				jQuery('.image-list li:last-child').children('.img-cover').addClass('img-cover-selected');
        	    			}
        	    			
        	    			if(jQuery('.img-cover-selected').attr("id") == "images-reel-effect"){
        	    				//load image
        	    				loadImage(jQuery('.img-cover-selected img').attr('bigthumb'),true);
        	    			}else{
        	    				//load image
        	    				loadImage(jQuery('.img-cover-selected img').attr('bigthumb'),false);
        	    			}		
        	    		});

        	    		//right narrow click
        	    		jQuery('.right-narrow').click(function(){
        	    			if(jQuery('.img-cover-selected').parent().next().length != 0)
        	    			{	
        	    				jQuery('.img-cover-selected').parent().next().children('.img-cover').addClass('img-pre-selected');
        	    				jQuery('.img-cover').removeClass('img-cover-selected');
        	    				jQuery('.img-pre-selected').addClass('img-cover-selected');
        	    				jQuery('.img-cover-selected').removeClass('img-pre-selected');
        	    			}else{
        	    				//select first image
        	    				jQuery('.img-cover').removeClass('img-cover-selected');
        	    				jQuery('.image-list li:first-child').children('.img-cover').addClass('img-cover-selected');
        	    			}
        	    			
        	    			if(jQuery('.img-cover-selected').attr("id") == "images-reel-effect"){
        	    				//load image
        	    				loadImage(jQuery('.img-cover-selected img').attr('bigthumb'),true);
        	    			}else{
        	    				//load image
        	    				loadImage(jQuery('.img-cover-selected img').attr('bigthumb'),false);
        	    			}
        	    			
        	    		});
        			}
        			
        			jQuery('#loader').click(function(){
        				//rewrite url
    					//var currentUrl = getUrlVars();
    						/*var currentUrl = '';
    						
    						if(dgoArticleSize == null){
    							currentUrl += '#'+ dgoArticleName + '-' + dgoArticleGroupId;
    						}else{
    							currentUrl += '#'+ dgoArticleName + '-' + dgoArticleGroupId + '-' + dgoArticleSize + '-' + dgoArticleRun;
    						}
    						
    						dgoArticlePic = jQuery('.img-cover-selected').attr('title');
    						*/
    						//window.location.hash = currentUrl + '-' + jQuery('.img-cover-selected').attr('title');
        			});
        			
        			
        			
        		}else{    			
        			jQuery('#loader').html( '<img src="' + web_2_print_blogInfo + 'css/img/icon/no_photo.png">');
        		}
    		}
    		   		
    	}else{
    		jQuery('.all-design-rightside-content').html('UPDATE coming soon.');
    	}
    });
}

//function get article from api
function DesignDetails_getArticleGroup(identifierGroup, options, identifier){
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
    		
	    	dgoAvailableArticles = result.Value;			
	    	
	    	dgoArticleGroupId = isNaN(dgoArticleGroupId) == true ? Base62.decode(dgoArticleGroupId) : dgoArticleGroupId;
	    	
	    	if(options == null){
	    		for(var i = 0;i < dgoAvailableArticles.length;i++){
	    			if(dgoAvailableArticles[i].Id == dgoArticleGroupId){
	    				alldesign_getDesignByArticle(dgoAvailableArticles[i].Guid);
	    				break;
	    			}        			
	    		}
	    	}
    	
    		if(identifierGroup == null){
    			for(var i = 0;i < result.Value.length; i++){
    				if(result.Value[i].Id == dgoArticleGroupId){
    					dgoArticleGroupIdentifier = identifierGroup = result.Value[i].ArticleGroupIdentifier;
    					dgoArticleIdentifier = identifier = result.Value[i].Identifier;
    					
    					//Article Description
        				jQuery('.prod-detail-part-1-rightside-description').html(result.Value[i].Description);
        				//Article Name
        				jQuery('.prod-detail-part-1-rightside-name').html(result.Value[i].Name);
    					
    					if(identifierGroup.split("_")[0] == "CRYSTAL"){
    						identifierGroup = "CRYSTAL";
    					}
    				}
    			}
    		}
    	
    		ArticleGroup = articles 	= ArticleDecentralization(result.Value);
    		
    		var ArticleGroupMatchcode 	= null;
    		//with orthers article groups except crystal
    		
    		
    		if(identifierGroup != "CRYSTAL"){
    			for(var i in ArticleGroup){
    				if(ArticleGroup[i].Items != undefined){
    					if(i == identifierGroup){
            				         				
            				ArticleGroupMatchcode	= ArticleGroup[i].Items[0].Matchcode;
            				
            				//match code for this article group
            				jQuery('#article-matchcode').val(ArticleGroupMatchcode);
            				        				
            			}
    				}    				
        		}

    			if(ArticleGroup[identifierGroup].Items.length == 1){
    				jQuery('.article-subtype').hide();
    			}
    			
    			var subtypes = '';
    			//get materials
    			for(var j = 0;j < ArticleGroup[identifierGroup].Items.length;j++){
    				if(ArticleGroup[identifierGroup].Items[j].Id == dgoArticleGroupId){
						var img = ArticleGroup[identifierGroup].Items[j].Identifier;
						
						if(Global_ProductImg['Article'][ArticleGroup[identifierGroup].Items[j].Identifier] == undefined){
	    					img = Global_ProductImg['Standard'].split('.')[0];
	    				}
						
						dgoArticleIdentifier = ArticleGroup[identifierGroup].Items[j].Identifier;
						
						dgoArticleName = makeFriendlyUrl(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						
						//article identifider use to calculate the prices
						jQuery('#article-identifier').val(ArticleGroup[identifierGroup].Items[j].Identifier);
						
					  	subtypes += '<div class="rightside-middle-subtypes-block content-size-selected">';
					  	subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[identifierGroup].Items[j].Identifier+'">';
					  	subtypes += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[identifierGroup].Items[j].Name+'" title="'+ArticleGroup[identifierGroup].Items[j].Name+'"></div>';
					}   				
    				
    				jQuery('.subtypes-content').html(subtypes);
    				
    				
    			}
    			    			
    		}else{
    			
    			jQuery('.article-group-container').show();

				jQuery('.prod-detail-part-1-rightside-description').html('Crystal');
				//Article Name
				jQuery('.prod-detail-part-1-rightside-name').html('Crystal');
				
				var article_group_block = '';
				
				for(var i in ArticleGroup[identifierGroup].Items){
					if(ArticleGroup[identifierGroup].Items[i][0] != undefined){
						var img = i;
						
						if(Global_ProductImg['Article'][i] == undefined){
	    					img = Global_ProductImg['Standard'].split('.')[0];
	    				}
						
						article_group_block += '<div class="rightside-middle-article-block">';
						article_group_block += '<input type="hidden" class="article-group-identifer" value="'+i+'">';
						article_group_block += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/'+img+'.png" alt="'+i+'" title="'+i+'"></div>';
					}
					
				}
				
				//fill items to article group list
				jQuery('.article-group-content').html(article_group_block);
				
				//event click on article group element
				jQuery('.rightside-middle-article-block').click(function(){
					jQuery('.rightside-middle-article-block').removeClass('article-block-selected');
					
					jQuery(this).addClass('article-block-selected');
					
					var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
					
					jQuery('.price-start-value').html(imgLoading);
					
					//get article identifier
					var article_identifier = jQuery(this).children('.article-group-identifer').val();
					
					if(dgoHandle != null){
						dgoArticleSize = null;
						dgoArticleRun = null;	
						
						dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][0].Id;
					}
					
					var subtypes = '';
					
					for(var j in ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier]){
						if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Amount != undefined){							
								if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Id == dgoArticleGroupId){
		    						var img = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier;
		    						
		    						if(Global_ProductImg['Article'][ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier] == undefined){
		    	    					img = Global_ProductImg['Standard'].split('.')[0];
		    	    				}
		    						//get article group matchcode
		    						ArticleGroupMatchcode	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Matchcode;
		    						
		    						dgoArticleName 	= makeFriendlyUrl(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name);
		    						
		    						dgoArticleGroupId 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Id;
		    						
		    						//match code for this article group
		    						jQuery('#article-matchcode').val(ArticleGroupMatchcode);
		    						
		    						//article identifider use to calculate the prices
		    						jQuery('#article-identifier').val(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier);
		    						
		    						dgoArticleIdentifier = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier;
		    						
		    					  	subtypes += '<div class="rightside-middle-subtypes-block content-size-selected">';
		    					  	subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier+'">';
		    					  	subtypes += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></div>';	    				
		    					}else{
		    						var img = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier;
		    						
		    						if(Global_ProductImg['Article'][ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier] == undefined){
		    	    					img = Global_ProductImg['Standard'].split('.')[0];
		    	    				}
		    						
		    					  	subtypes += '<div class="rightside-middle-subtypes-block">';
		    					  	subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier+'">';
		    					  	subtypes += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></div>';	    				  
		    					}
						}						
					}
					
					jQuery('.subtypes-content').html(subtypes);
					
					//event click on article group element
					jQuery('.rightside-middle-subtypes-block').click(function(){
						jQuery(".rightside-middle-subtypes-block").removeClass("content-size-selected");
						
						jQuery(this).addClass("content-size-selected");
						
						var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
						
						jQuery('.price-start-value').html(imgLoading);
						
						jQuery('.available-size').html('Loading...');
						
						jQuery('#article-identifier').val(jQuery(this).children('.subtypes-identifer').val());
						
						dgoArticleIdentifier = jQuery(this).children('.subtypes-identifer').val();
												
						if(dgoArticleGroupIdentifier.split("_")[0] == "CRYSTAL"){
							for(var j in ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()]){
								if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Identifier == jQuery(this).children('.subtypes-identifer').val()){
									jQuery('#article-matchcode').val(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Matchcode);
									
									dgoArticleName = makeFriendlyUrl(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Name);
									
									//Article Description
			        				jQuery('.prod-detail-part-1-rightside-description').html(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Description);
			        				//Article Name
			        				jQuery('.prod-detail-part-1-rightside-name').html(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Name);
									
									dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Id;
									
								}
							}
						}else{
							for(var j in ArticleGroup[dgoArticleGroupIdentifier].Items){
								if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Identifier == jQuery(this).children('.subtypes-identifer').val()){
									jQuery('#article-matchcode').val(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Matchcode);
									
									dgoArticleName = makeFriendlyUrl(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
									
									//Article Description
			        				jQuery('.prod-detail-part-1-rightside-description').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Description);
			        				//Article Name
			        				jQuery('.prod-detail-part-1-rightside-name').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
									
									dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier].Items[j].Id;
									
									
								}
							}
						}						
						
						//rewrite url
						//var currentUrl = getUrlVars();
						var currentUrl = '';
						
						if(dgoHandle != null){
							dgoArticleSize 	= null;
							dgoArticleRun	= null;
							
							currentUrl += '#'+ dgoArticleName + '-' + dgoArticleGroupId;													
							
						}else{
							dgoHandle = 'userClick';
							
							if(dgoArticleSize == null){
								currentUrl += '#'+ dgoArticleName + '-' + dgoArticleGroupId;
							}else{
								currentUrl += '#'+ dgoArticleName + '-' + dgoArticleGroupId + '-' + dgoArticleSize + '-' + dgoArticleRun;
							}
							
							if(dgoArticlePic != ''){
								currentUrl += '-' + dgoArticlePic;
							}else if(jQuery('.img-cover-selected').attr('title') != undefined){
								currentUrl += '-' + jQuery('.img-cover-selected').attr('title');
							}
						}
						
						//get materials
		    			DesignDetails_getMaterials(jQuery(this).children('.subtypes-identifer').val());
					});
						
						if(dgoArticleIdentifier != undefined){
							jQuery('.subtypes-content').children('.rightside-middle-subtypes-block').each(function(){
								if(jQuery(this).children('.subtypes-identifer').val() == dgoArticleIdentifier){
									jQuery(this).click();
								}
							})
						}else{
							jQuery('.rightside-middle-subtypes-block:first').click();
						}
					
					
				});//end event click on article group element

				if(dgoArticleGroupIdentifier != undefined){
					jQuery('.article-group-content').children('.rightside-middle-article-block').each(function(){
						if(jQuery(this).children('.article-group-identifer').val() == dgoArticleGroupIdentifier){
							jQuery(this).click();
						}
					})
				}else{
					jQuery('.rightside-middle-article-block:first').click();
				}
    		}
   		
    		
			jQuery('.rightside-middle-subtypes-block').click(function(){
				jQuery(".rightside-middle-subtypes-block").removeClass("content-size-selected");
				
				jQuery(this).addClass("content-size-selected");
				
				var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
				
				jQuery('.price-start-value').html(imgLoading);
				
				jQuery('.available-size').html('Loading...');
				
				jQuery('#article-identifier').val(jQuery(this).children('.subtypes-identifer').val());
				
				if(dgoArticleGroupIdentifier.split("_")[0] == "CRYSTAL"){
					for(var j in ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()]){
						if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Identifier == jQuery(this).children('.subtypes-identifer').val()){
							jQuery('#article-matchcode').val(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Matchcode);
							
							dgoArticleName = makeFriendlyUrl(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Name);
							
							//Article Description
	        				jQuery('.prod-detail-part-1-rightside-description').html(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Description);
	        				//Article Name
	        				jQuery('.prod-detail-part-1-rightside-name').html(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Name);
							
							dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Id;
							
						}
					}
				}else{
					for(var j in ArticleGroup[dgoArticleGroupIdentifier].Items){
						if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Identifier == jQuery(this).children('.subtypes-identifer').val()){
							jQuery('#article-matchcode').val(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Matchcode);
							
							dgoArticleName = makeFriendlyUrl(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
							
							//Article Description
	        				jQuery('.prod-detail-part-1-rightside-description').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Description);
	        				//Article Name
	        				jQuery('.prod-detail-part-1-rightside-name').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
							
							dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier].Items[j].Id;
							
						}
					}
				}						
				
				dgoArticleIdentifier = jQuery(this).children('.subtypes-identifer').val();
				
				//rewrite url
				//var currentUrl = getUrlVars();
					var currentUrl = '';
					
					dgoArticleSize 	= null;
					dgoArticleRun	= null;
										
					currentUrl += '#'+ dgoArticleName;
					
					jQuery('.amount-input').val('...');
					
					window.location.hash = currentUrl;   
				
				//get materials
    			DesignDetails_getMaterials(jQuery(this).children('.subtypes-identifer').val());
			});
			
			if(dgoArticleGroupIdentifier != "CRYSTAL"){
				//get materials
				DesignDetails_getMaterials(identifier);
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

function DesignDetails_getMaterials(identifier){
	/*New request instance, now it should have no article*/
    var api = new delivergo.api();
    
    if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
		
	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
	
	//change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //set apikey
    api.ApiKey = guidUser;
	
    //Change the language
	api.Request.Header.Language = globalLanguage;
    
    if(dgoArticleGroupIdentifier.split("_")[0] != "CRYSTAL"){
    	//get materials
		for(var j = 0; j < ArticleGroup[dgoArticleGroupIdentifier].Items.length; j++){
			if(identifier == null || identifier == undefined){
				if(j == 0){        	
					
					//add article
    				api.AddArticle(resaleGuidUser, ArticleGroup[dgoArticleGroupIdentifier].Items[j].Matchcode, ArticleGroup[dgoArticleGroupIdentifier].Items[j].Identifier, globalLanguage);
    				var article = api.GetArticle(j);
				  	// change the article element
				  	article.Materials = null;
				  	article.Material = null;
				  	
				  	article.NumberColorsBack 	= ArticleGroup[dgoArticleGroupIdentifier].Items[j].NumberColorsBack;        
	                article.NumberColorsFront 	= ArticleGroup[dgoArticleGroupIdentifier].Items[j].NumberColorsFront; 
				  					  	
				}	     				
			}else{
				if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Identifier == identifier){
					
					//add article
    				api.AddArticle(resaleGuidUser, ArticleGroup[dgoArticleGroupIdentifier].Items[j].Matchcode, ArticleGroup[dgoArticleGroupIdentifier].Items[j].Identifier, globalLanguage);
			  		
    				var article = api.GetArticle(0);
    				
    				article.NumberColorsBack 	= ArticleGroup[dgoArticleGroupIdentifier].Items[j].NumberColorsBack;        
                    article.NumberColorsFront 	= ArticleGroup[dgoArticleGroupIdentifier].Items[j].NumberColorsFront; 
    				
				}
			}
		}
    }else{
    	var article_group_identifier = jQuery('.article-block-selected').children('.article-group-identifer').val();
    	
    	for(var j = 0; j < ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier].length; j++){
    		if(identifier == null || identifier == undefined){
				if(j == 0){        	
					
					//add article
    				api.AddArticle(resaleGuidUser, ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].Matchcode, ArticleGroup[dgoArticleGroupIdentifier].Items[article_group_identifier][j].Identifier, globalLanguage);
    				var article = api.GetArticle(j);
				  	// change the article element
				  	article.Materials = null;
				  	article.Material = null;
				  	
				  	article.NumberColorsBack 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].NumberColorsBack;        
	                article.NumberColorsFront 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].NumberColorsFront; 
				  					  	
				}	     				
			}else{
				if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].Identifier == identifier){
					
					//add article
    				api.AddArticle(resaleGuidUser, ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].Matchcode, ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].Identifier, globalLanguage);
			  		
    				var article = api.GetArticle(0);
    				
    				article.NumberColorsBack 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].NumberColorsBack;        
                    article.NumberColorsFront 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].NumberColorsFront; 
    				
				}
			}
    	}
    }
    
	//get material
	api.GetMaterials(
		function(result){
			
			if(result.Order != null){
				
				jQuery('#article-size').val(result.Order.Article[0].Materials[0].Key);
				
				//Min and Max area
		        maxArea = result.Order.Article[0].MaxAreaToCalculate;                   
		        minArea = result.Order.Article[0].MinAreaToCalculate; 
		        
		        jQuery('#material-key').val(result.Order.Article[0].Materials[0].Key);
				
		        var amountDropdown = '';
				
		        if(result.Order.Article[0].VolumeDiscounts.length == 0){
		        	if(result.Order.Article[0].Runs.length <= 1){
			        	for(var i = 1;i <= 20; i++){
			        		amountDropdown += '<div class="run-select"><b>'+i+'</b><input type="hidden" value="'+i+'"></div>';
			        	}
			        	jQuery('#amount-run-type').val("Amount");
			        }else{
			        	for(var i = 0;i < result.Order.Article[0].Runs.length;i++){			        		
			        		amountDropdown += '<div class="run-select"><b>' + result.Order.Article[0].Runs[i] + '</b><input type="hidden" value="'+result.Order.Article[0].Runs[i]+'"></div>';
			        	}
			        	jQuery('#amount-run-type').val("Run");
			        }
		        	
		        	jQuery('#runs-dropdown').css({"min-width":"63px"});
		        	
		        }else{
		        	if(result.Order.Article[0].Runs.length <= 1){
			        	for(var i = 1;i < result.Order.Article[0].VolumeDiscounts[0].Amount; i++){
			        		amountDropdown += '<div class="run-select"><b>'+i+'</b><input type="hidden" value="'+i+'"></div>';
			        	}
			        	
			        	for(var i = 0;i < result.Order.Article[0].VolumeDiscounts.length; i++){
			        		amountDropdown += '<div class="run-select"><b>'+result.Order.Article[0].VolumeDiscounts[i].Amount+'</b><br><span>(Save '+result.Order.Article[0].VolumeDiscounts[i].Percentage+'%)</span><input type="hidden" value="'+result.Order.Article[0].VolumeDiscounts[i].Amount+'"></div>';
			        	}
			        	
			        	jQuery('#amount-run-type').val("Amount");
			        }else{
			        	for(var i = 0;i < result.Order.Article[0].Runs.length;i++){			        		
			        		amountDropdown += '<div class="run-select"><b>' + result.Order.Article[0].Runs[i] + '</b><input type="hidden" value="'+i+'"></div>';
			        	}
			        	jQuery('#amount-run-type').val("Run");
			        }
		        }		        
		        
		        //jQuery('.prod-details-amount-dropdown').html(amountDropdown);
		        jQuery('#runs-dropdown').html(amountDropdown);
		        
		        jQuery('.run-select').hover(function(){
		    		jQuery(this).addClass('run-select-hover');
		    	}, function(){
		    		jQuery(this).removeClass('run-select-hover');
		    	});
		        
		        jQuery('.run-select').click(function(){
		        	
		        	jQuery('.amount-input').val(jQuery(this).children('input').val());
		        	
		        	dgoArticleRun = jQuery(this).children('input').val() + '_Run';
		    		
		    		var currentUrl = '';

		    			currentUrl += '#'+ dgoArticleName + '-' + dgoArticleSize +  '-' + dgoArticleRun;
		    		
		    			if(dgoArticlePic != ''){
		    				currentUrl += '-' + dgoArticlePic;
		    			}
		    			
		    			window.location.hash = currentUrl;
		    		
		    		var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
		        	
		        	jQuery('.price-start-value').html(imgLoading);	
					
		    		DesignDetails_getPrices();
		        });
		        
		        jQuery('.amount-input').blur(function(){
		        	dgoArticleRun = jQuery(this).val() + '_Run';
		    		
		    		var currentUrl = '';

		    			currentUrl += '#'+ dgoArticleName + '-' + dgoArticleSize +  '-' + dgoArticleRun;
		    		
		    			if(dgoArticlePic != ''){
		    				currentUrl += '-' + dgoArticlePic;
		    			}
		    			
		    			window.location.hash = currentUrl;
		    		
		    		var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
		        	
		        	jQuery('.price-start-value').html(imgLoading);	
					
		    		DesignDetails_getPrices();
		        })
		        
		        if(dgoArticleRun == null){
		        	
		        	jQuery('.amount-input').val(parseInt(jQuery('.run-select:first').children('input').val()));
		        	
		        	dgoArticleRun = jQuery('.amount-input').val() + '_Run';		        	
		        }else{
		        	jQuery('.amount-input').val(parseInt(dgoArticleRun.split("_")[0]));
		        	
		        }
		        
				DesignDetails_getFormat(jQuery('#article-matchcode').val());
								
			}
			
		}, true);
}

function DesignDetails_getFormat(matchCode){
	/*New request instance, now it should have no article*/
    var api = new delivergo.api();
        
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    //change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //clear formats object
    formats_object = [];
    
    //format endpoint
    var format_endpoint = matchCode;
    
    api.GetFormats(function(result){
    	
    	//save to object
    	if(result.Value == undefined){
    		result.Value = result.value.Value;
    	}
    	
    	var available_size 	= '';
    	var count 			= 0;
    	var flag 			= false;
    	for(var i = 0; i < result.Value.length; i++){
			var children = result.Value[i];
	
    		var forWidth 	= children.Width;
	    	var forHeight 	= children.Height;
    		var forName 	= children.Name;
    		var forDepth	= null;
			var forInchName = api.ConvertMm2Inch(forWidth) + ' x ' + api.ConvertMm2Inch(forHeight) + ' inch';				
			if(isNaN(parseInt(forName))){
				flag = true;
			}		
			if(children.Depth != null){
    			forDepth 	= children.Depth;
    			forInchName = api.ConvertMm2Inch(forWidth) + ' x ' + api.ConvertMm2Inch(forHeight) + ' x ' + api.ConvertMm2Inch(forDepth) +' inch';
    			formats_object.push({forwidth: forWidth, forheight: forHeight, forname: forName, forinchname: forInchName, fordepth: forDepth});
    			available_size += '<div class="rightside-middle-size-block"><input type="hidden" class="size-value" value="'+i+'">'+forName+'</div>';    			
    		}else{
    			var forArea = children.Area;
    			//forArea < minArea || 
	    		if(forArea > maxArea){
	    			//do nothing
	    		}else{	    			
	    			available_size += '<div class="rightside-middle-size-block"><input type="hidden" class="size-value" value="'+count+'">'+forName+'</div>';	    			
	    			formats_object.push({forwidth: forWidth, forheight: forHeight, forname: forName, forinchname: forInchName, fordepth: forDepth});
	    			count++;
	    		}  
    		}
    	}
    	//fill available sizes
    	jQuery('.available-size').html(available_size);
    	
    	if(flag == true){
    		jQuery('.rightside-middle-size-block').css('width','155px');
    	}
    	
    	if(dgoArticleSize == null){
    		//choose the first size
        	jQuery('.rightside-middle-size-block:first').addClass("content-size-selected");
    	}else{
    		jQuery('.available-size').children('.rightside-middle-size-block').each(function(){
    			if(jQuery(this).children('.size-value').val() == dgoArticleSize.split('_')[0]){
    				
    				jQuery(this).addClass("content-size-selected");
    			}
    		})
    	}
    	
    	
    	if(dgoArticleGroupIdentifier.split("_")[0] == "CRYSTAL"){
    		dgoArticleSize = jQuery('.content-size-selected .size-value').val()+'_'+formats_object[jQuery('.content-size-selected .size-value').val()].forwidth+'x'+formats_object[jQuery('.content-size-selected .size-value').val()].forheight+'x'+formats_object[jQuery('.content-size-selected .size-value').val()].fordepth+'mm';
    	}else{
    		dgoArticleSize = jQuery('.content-size-selected .size-value').val()+'_'+formats_object[jQuery('.content-size-selected .size-value').val()].forwidth+'x'+formats_object[jQuery('.content-size-selected .size-value').val()].forheight+'mm';
    	}
    	
		
		//rewrite url
		//var currentUrl = getUrlVars();
			var currentUrl = '';

			currentUrl += '#'+ dgoArticleName + '-' + dgoArticleSize +  '-' + dgoArticleRun;
			
			
			if(dgoArticlePic != ''){
				currentUrl += '-' + dgoArticlePic;
			}else if(jQuery('.img-cover-selected').attr('title') != undefined){
				currentUrl += '-' + jQuery('.img-cover-selected').attr('title');
			}
			
			window.location.hash = currentUrl;
    	
    	jQuery('.rightside-middle-size-block').click(function(){
    		jQuery('.rightside-middle-size-block').removeClass('content-size-selected');
    		
    		var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
			
			jQuery('.price-start-value').html(imgLoading);
    		
    		jQuery(this).addClass('content-size-selected');
    		
    		order_price_chosen = jQuery(this).children('.size-value').val();
    		
    		if(dgoArticleGroupIdentifier.split("_")[0] == "CRYSTAL"){
        		dgoArticleSize = order_price_chosen+'_'+formats_object[order_price_chosen].forwidth+'x'+formats_object[order_price_chosen].forheight+'x'+formats_object[order_price_chosen].fordepth+'mm';
        	}else{
        		dgoArticleSize = order_price_chosen+'_'+formats_object[order_price_chosen].forwidth+'x'+formats_object[order_price_chosen].forheight+'mm';
        	}
    		
    		
    		//rewrite url
			//var currentUrl = getUrlVars();
				var currentUrl = '';
				
				currentUrl += '#'+ dgoArticleName + '-' + dgoArticleSize +  '-' + dgoArticleRun;
				
				if(jQuery('.img-cover-selected').attr('title') != undefined){
					currentUrl += '-' + jQuery('.img-cover-selected').attr('title');
				}
				
				window.location.hash = currentUrl;
    		
    		//get price automatically
        	DesignDetails_getPrices();
    		
    	})
    	
    	//get price automatically
    	DesignDetails_getPrices();
    	
    }, globalLanguage, format_endpoint );
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    }; 
}

function DesignDetails_getPrices(){
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
    api.Request.Header.Currency = dgoCurrencies;
	api.Request.Order.Shipment.ShipTo.Country = globalCountry;
	
    //resale guid setting
    api.Request.Order.ResaleUnitId = resaleGuidUser;
    
    //change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    global_price_object = [];
    
    //add articles with diffirent dimension
    for(var i = 0; i < formats_object.length; i++){
    	//add article
    	api.AddArticle(resaleGuidUser, jQuery('#article-matchcode').val(), jQuery('#article-identifier').val(), globalLanguage);
    	
    	var article = api.GetArticle(i);
		
    	//set material
    	article.Material = jQuery('#material-key').val();
        
        //set dimension
        article.PageLengthOpen 		= parseInt(formats_object[i].forheight);
        article.PageWidthOpen 		= parseInt(formats_object[i].forwidth);
        
        if(dgoArticleGroupIdentifier.split("_")[0] != "CRYSTAL"){
        	for(var j in ArticleGroup[dgoArticleGroupIdentifier].Items){
            	if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Identifier == jQuery('#article-identifier').val()){
            		article.NumberColorsBack 	= ArticleGroup[dgoArticleGroupIdentifier].Items[j].NumberColorsBack;        
                    article.NumberColorsFront 	= ArticleGroup[dgoArticleGroupIdentifier].Items[j].NumberColorsFront;                   
                    if(jQuery('#amount-run-type').val() == "Run"){                	
                    	article.Run = jQuery('.amount-input').val() * 1;
                    }else{
                    	article.Amount = jQuery('.amount-input').val() * 1;
                    }
            	}
            }
        }else{
        	for(var j in ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()]){
            	if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Identifier == jQuery('#article-identifier').val()){
            		article.NumberColorsBack 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].NumberColorsBack;        
                    article.NumberColorsFront 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].NumberColorsFront;                   
                    if(jQuery('#amount-run-type').val() == "Run"){                	
                    	article.Run = jQuery('.amount-input').val() * 1;
                    }else{
                    	article.Amount = jQuery('.amount-input').val() * 1;
                    }
            	}
            }
        }	
        

        if(formats_object[i].fordepth != null){
        	article.PageDepthOpen = parseInt(formats_object[i].fordepth);
        }
    }   
    
    // get price from api
    api.Calculate(
    	function(result){
    		jQuery.unblockUI();
    		
    		if(result.Order != undefined){
    			dgoArticlePrices = result.Order.Article;
    			var IdSize		= jQuery('.content-size-selected .size-value').val();
    			var EndPrices 	= 0; 
    			//product price
				var sale_object = [];
				var product_price = 0;
				var product_price_vat = 0;
    			for(var i = 0;i < dgoArticlePrices[IdSize].Prices.Items.length;i++){
    				if(dgoArticlePrices[IdSize].Prices.Items[i] != undefined){
    					
    					if(dgoArticlePrices[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){
        					//var VATprices = (dgoArticlePrices[IdSize].Prices.Items[i].SaleNet * dgoArticlePrices[IdSize].Prices.Items[i].VatPercentage) / 100;
        					//EndPrices += dgoArticlePrices[IdSize].Prices.Items[i].SaleNet * ;
        					sale_object.push(dgoArticlePrices[IdSize].Prices.Items[i]);
        				}
    					
    					var grossPrice 		= api.CalculateGrossPrice(sale_object);
    					product_price = grossPrice[0].SaleNetSum;
    					product_price_vat 	= grossPrice[0].SaleGrossSum;
    					
    					//show the right price
    					EndPrices = endUserPrice == "Net" ? product_price : product_price_vat;
    					
    					dgoArticlePrices[IdSize].Pictures 			= [];
    					dgoArticlePrices[IdSize].ArticleID 			= 'article_id';
    					dgoArticlePrices[IdSize].Product 			= jQuery('#article-matchcode').val();
    					dgoArticlePrices[IdSize].ArticleIdentifier 	= jQuery('#article-identifier').val();
    					dgoArticlePrices[IdSize].FormatObject 		= formats_object[order_price_chosen];
    					dgoArticlePrices[IdSize].ProductPrice 		= product_price;
    					dgoArticlePrices[IdSize].ProductPriceVAT 	= product_price_vat;
    					
    					global_price_object.push(dgoArticlePrices[IdSize]);
    					
    				}
    				
    			}

    			jQuery('#price-start-value').val(EndPrices);
    			
    			//EndPrices = EndPrices * jQuery('.prod-details-amount-dropdown').val();
    			
    			jQuery('.price-start-value').html(formatCurrency(EndPrices,dgoCurrencies));
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