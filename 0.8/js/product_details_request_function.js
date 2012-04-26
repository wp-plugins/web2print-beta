function loadMetagTag(option, articleName){
	/*
	if(option == 'title'){
		if(jQuery("meta[name='DC.Title']").attr('content') != undefined)
			jQuery("meta[name='DC.Title']").attr('content', dgoMetaTagTitle.replace('#sitename', blogname).replace('#articlename', articleName.toLowerCase()));
		else
			jQuery("head").prepend('<meta name="DC.Title" content="'+dgoMetaTagTitle.replace('#sitename', blogname).replace('#articlename', articleName.toLowerCase())+'">');			
	}
	
	jQuery('title').html(dgoMetaTagTitle.replace('#sitename', blogname).replace('#articlename', articleName.toLowerCase()));
	
	if(option == 'description'){
		if(jQuery("meta[name='DESCRIPTION']").attr('content') != undefined)
			jQuery("meta[name='DESCRIPTION']").attr('content', dgoMetaTagDesciprtion.replace('#articlename', articleName.toLowerCase()));
		else
			jQuery("head").prepend("<meta name='DESCRIPTION' content='"+dgoMetaTagDesciprtion.replace('#articlename', articleName.toLowerCase())+"' />");
	}
	*/
}

function EventForProductDetailsPage(option){
	if(option == 'Event-Article-Group-dropdown'){
		jQuery('.article-group-dropdown-display').click(function(){
			jQuery('.article-group-dropdown-element').each(function(){
				if(jQuery(this).children('.article-group-identifer').val() == dgoArticleGroupIdentifier){
					jQuery(this).hide();
				}else{
					jQuery(this).show();
				}
			});			
			jQuery(this).css('border-color','orange');		
			jQuery('.article-group-dropdown-content').show();
			jQuery('.subtypes-dropdown-content').fadeOut(1);
			jQuery('.subtypes-dropdown-display').css('border-color','#CCC');
		});		
	
		jQuery('.article-group-dropdown-element').click(function(){				
			jQuery('.subtypes-dropdown-content').empty();			
			jQuery('.article-group-dropdown-element').removeClass('article-block-selected');
			jQuery(this).addClass('article-block-selected');
			
			jQuery('.article-group-dropdown-label').html(jQuery('.article-block-selected .article-group-dropdown-text').html());
			jQuery('.article-group-dropdown-label').attr('title', jQuery('.article-block-selected .article-group-dropdown-text').html());
			jQuery('#article-group-dropdown-img').attr('src', jQuery('.article-block-selected').children('span:first').children('img').attr('src'));
				
			var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
			
			jQuery('.price-start-value').html(imgLoading);
			
			//get article identifier
			var article_identifier = dgoArticleGroupIdentifier = jQuery(this).children('.article-group-identifer').val();
			
			dgoArticleGroupId = ArticleGroup[article_identifier].Items[0].Id;
			
			var subtypes = '';
			
			//hide this area if we just have only one item
			if(ArticleGroup[article_identifier].Items.length == 1){
				jQuery('.article-subtype').hide();
			}else{
				jQuery('.article-subtype').show();
			}
			
			for(var j = 0;j < ArticleGroup[article_identifier].Items.length;j++){    				
				var img = ArticleGroup[article_identifier].Items[j].Identifier;
				
				if(Global_ProductImg['Article'][ArticleGroup[article_identifier].Items[j].Identifier] == undefined){
					img = Global_ProductImg['Standard'].split('.')[0];
				}
			
				subtypes += '<div class="subtypes-dropdown-element">';
				subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[article_identifier].Items[j].Identifier+'">';
				subtypes += '<input type="hidden" class="subtypes-id" value="'+ArticleGroup[article_identifier].Items[j].Id+'">';
				
				if(flagImageArticleFound == true){
					subtypes += '<span><img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[article_identifier].Items[j].Name+'" title="'+ArticleGroup[article_identifier].Items[j].Name+'"></span>';	    				
				}else{
					subtypes += '<span><img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[article_identifier].Items[j].Name+'" title="'+ArticleGroup[article_identifier].Items[j].Name+'"></span>';	    											
				}
				subtypes += '<span class="subtypes-dropdown-text" title="'+ArticleGroup[article_identifier].Items[j].Name+'">'+ArticleGroup[article_identifier].Items[j].Name+'</span></div>';
			}
			
			jQuery('.subtypes-dropdown-content').html(subtypes);
							
			//event choose subtype in every case
			jQuery('.subtypes-dropdown-element').click(function(){
				jQuery(".subtypes-dropdown-element").removeClass("content-size-selected");				
				jQuery(this).addClass("content-size-selected");
				
				jQuery('#subtypes-dropdown-img').attr('src',jQuery(this).children('span:first').children('img').attr('src'));
				jQuery('.subtypes-dropdown-label').html(jQuery(this).children('.subtypes-dropdown-text').html());
				jQuery('.subtypes-dropdown-label').attr('title', jQuery(this).children('.subtypes-dropdown-text').html());
				
				var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
				
				jQuery('.price-start-value').html(imgLoading);
				
				jQuery('.available-size').html('Loading...');
				
				jQuery('#article-identifier').val(jQuery(this).children('.subtypes-identifer').val());    				
				
				for(var j in ArticleGroup[dgoArticleGroupIdentifier].Items){
					if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Id == jQuery(this).children('.subtypes-id').val()){
						jQuery('#article-matchcode').val(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Matchcode);
						
						dgoArticleName = makeFriendlyUrl(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						
						//Article Description
						jQuery('.prod-detail-part-1-rightside-description').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Description);
						//Article Name
						jQuery('.prod-detail-part-1-rightside-name').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						//change meta tag name "DC.Title"
						loadMetagTag('title', ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);						
						loadMetagTag('description', ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);						
						
						jQuery('#breadcrumb .li-article a').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						
						dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier].Items[j].Id;
						
						jQuery('#loader').children('img').attr('src',web_2_print_blogInfo+'css/img/icon/loading.gif');
						
						jQuery('#loader').children('img').css('height','40px');
						
						if(jQuery('.image-list-content .img-cover-mask').html() == null){
							jQuery('.image-list-content').empty();
						}    								
						
						//get article pictures
						//getArticlePicture(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Guid);
						if(dgoHandleForPhp != null){
							getProductVariation(null, ArticleGroup[dgoArticleGroupIdentifier].Items[j].Guid);
						}
						
					}
				}

				dgoArticleIdentifier = jQuery(this).children('.subtypes-identifer').val();
				
				//rewrite url
				var currentUrl = '';
				
				dgoArticleSize 	= null;
				dgoArticleRun	= null;
				
				if(dgoTypeOfId == "A"){
					currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
				}else{
					currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
				}
				
				jQuery('.amount-input').val('...');
				
				window.location.hash = currentUrl;   
				
			});
			
			jQuery('.subtypes-dropdown-element').each(function(){
				if(jQuery(this).children('.subtypes-id').val() == dgoArticleGroupId){
					jQuery(this).click();
				}				
			});
			
		});
	}
	
	if(option == 'Event-Article-Group'){
		jQuery('.rightside-middle-article-block').click(function(){
				
			jQuery('.subtypes-content').empty();
			
			jQuery('.rightside-middle-article-block').removeClass('article-block-selected');
			
			jQuery(this).addClass('article-block-selected');
			
			var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
			
			jQuery('.price-start-value').html(imgLoading);
			
			//get article identifier
			var article_identifier = dgoArticleGroupIdentifier = jQuery(this).children('.article-group-identifer').val();
			
			dgoArticleGroupId = ArticleGroup[article_identifier].Items[0].Id;
			
			var subtypes = '';
			
			//hide this area if we just have only one item
			if(ArticleGroup[article_identifier].Items.length == 1){
				jQuery('.article-subtype').hide();
			}else{
				jQuery('.article-subtype').show();
			}
			
			for(var j = 0;j < ArticleGroup[article_identifier].Items.length;j++){    				
				var img = ArticleGroup[article_identifier].Items[j].Identifier;
				
				if(Global_ProductImg['Article'][ArticleGroup[article_identifier].Items[j].Identifier] == undefined){
					img = Global_ProductImg['Standard'].split('.')[0];
				}
				
				//content-size-selected
				subtypes += '<div class="rightside-middle-subtypes-block">';
				subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[article_identifier].Items[j].Identifier+'">';
				subtypes += '<input type="hidden" class="subtypes-id" value="'+ArticleGroup[article_identifier].Items[j].Id+'">';
				if(flagImageArticleFound == true){
					subtypes += '<img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[article_identifier].Items[j].Name+'" title="'+ArticleGroup[article_identifier].Items[j].Name+'"></div>';	    				
				}else{
					subtypes += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[article_identifier].Items[j].Name+'" title="'+ArticleGroup[article_identifier].Items[j].Name+'"></div>';	    				
				}
			}
			
			jQuery('.subtypes-content').html(subtypes);
							
			//event choose subtype in every case
			jQuery('.rightside-middle-subtypes-block').click(function(){
				jQuery(".rightside-middle-subtypes-block").removeClass("content-size-selected");
				
				jQuery(this).addClass("content-size-selected");
				
				var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
				
				jQuery('.price-start-value').html(imgLoading);
				
				jQuery('.available-size').html('Loading...');
				
				jQuery('#article-identifier').val(jQuery(this).children('.subtypes-identifer').val());    				
				
				for(var j in ArticleGroup[dgoArticleGroupIdentifier].Items){
					if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Id == jQuery(this).children('.subtypes-id').val()){
						jQuery('#article-matchcode').val(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Matchcode);
						
						dgoArticleName = makeFriendlyUrl(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						
						//Article Description
						jQuery('.prod-detail-part-1-rightside-description').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Description);
						//Article Name
						jQuery('.prod-detail-part-1-rightside-name').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						//change meta tag name "DC.Title"
						loadMetagTag('title', ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						loadMetagTag('description', ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						
						jQuery('#breadcrumb .li-article a').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						
						dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier].Items[j].Id;
						
						jQuery('#loader').children('img').attr('src',web_2_print_blogInfo+'css/img/icon/loading.gif');
						
						jQuery('#loader').children('img').css('height','40px');
						
						if(jQuery('.image-list-content .img-cover-mask').html() == null){
							jQuery('.image-list-content').empty();
						}    								
						
						//get article pictures
						//getArticlePicture(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Guid);
						if(dgoHandleForPhp != null){
							getProductVariation(null, ArticleGroup[dgoArticleGroupIdentifier].Items[j].Guid);
						}
						
					}
				}

				dgoArticleIdentifier = jQuery(this).children('.subtypes-identifer').val();
				
				//rewrite url
				var currentUrl = '';
				
				dgoArticleSize 	= null;
				dgoArticleRun	= null;
				
				if(dgoTypeOfId == "A"){
					currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
				}else{
					currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
				}
				
				jQuery('.amount-input').val('...');
				
				window.location.hash = currentUrl;   
				
				//get materials
				//getMaterials(jQuery(this).children('.subtypes-identifer').val());

			});
			
			jQuery('.subtypes-content').children('.rightside-middle-subtypes-block').each(function(){
				if(jQuery(this).children('.subtypes-id').val() == dgoArticleGroupId){
					jQuery(this).click();
				}
			});
			
		});
		
	}
	
	if(option == 'Event-Article-Group-Crystal-dropdown'){
		jQuery('.article-group-dropdown-display').click(function(){
			jQuery('.article-group-dropdown-element').each(function(){
				if(jQuery(this).children('.article-group-identifer').val() == dgoArticleGroupIdentifier){
					jQuery(this).hide();
				}else{
					jQuery(this).show();
				}
			});
			jQuery(this).css('border-color','orange');
			jQuery('.article-group-dropdown-content').show();
			jQuery('.subtypes-dropdown-content').fadeOut(1);
			jQuery('.subtypes-dropdown-display').css('border-color','#CCC');
		});	

		jQuery('.article-group-dropdown-element').click(function(){
			
			jQuery('.article-group-dropdown-element').removeClass('article-block-selected');
			jQuery(this).addClass('article-block-selected');
			
			jQuery('#article-group-dropdown-img').attr('src',jQuery(this).children('span:first').children('img').attr('src'));
			jQuery('.article-group-dropdown-label').html(jQuery(this).children('.article-group-dropdown-text').html());
			jQuery('.article-group-dropdown-label').attr('title', jQuery(this).children('.article-group-dropdown-text').html());
			
			var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
		
			jQuery('.price-start-value').html(imgLoading);
			
			//get article identifier
			var article_identifier = jQuery(this).children('.article-group-identifer').val();
			
			if(dgoHandle != null){
				dgoArticleSize = null;
				dgoArticleRun = null;	
				
				dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][0].Id;
			}
			
			//hide this area if we just have only one item
			if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier].length == 1){
				jQuery('.article-subtype').hide();
			}else{
				jQuery('.article-subtype').show();
			}
			
			var subtypes = '';
			
			if(dgoTypeOfId == "A"){
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
							
							subtypes += '<div class="subtypes-dropdown-element content-size-selected">';
							subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier+'">';
							if(flagImageArticleFound == true){
								subtypes += '<span><img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></span>';	    				
							}else{
								subtypes += '<span><img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></span>';	    											
							}
							subtypes += '<span class="subtypes-dropdown-text" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'">'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'</span></div>';
						}else{
							var img = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier;
							
							if(Global_ProductImg['Article'][ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier] == undefined){
								img = Global_ProductImg['Standard'].split('.')[0];
							}
							
							subtypes += '<div class="subtypes-dropdown-element">';
							subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier+'">';
							if(flagImageArticleFound == true){
								subtypes += '<span><img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></span>';	    				  
							}else{
								subtypes += '<span><img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></span>';	    											
							}
							subtypes += '<span class="subtypes-dropdown-text" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'">'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'</span></div>';
						}	
					}						
				}
			}else{
				for(var j in ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier]){
					if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Amount != undefined){
						for(var k = 0;k < ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Categories.length;k++){
							if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Categories[k] == Base62.decode(dgoCatId)){
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
									
									subtypes += '<div class="subtypes-dropdown-element content-size-selected">';
									subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier+'">';
									if(flagImageArticleFound == true){
										subtypes += '<span><img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></span>';	    				
									}else{
										subtypes += '<span><img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></span>';	    											
									}
									subtypes += '<span class="subtypes-dropdown-text" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'">'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'</span></div>';
									
								}else{
									var img = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier;
									
									if(Global_ProductImg['Article'][ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier] == undefined){
										img = Global_ProductImg['Standard'].split('.')[0];
									}
									
									subtypes += '<div class="subtypes-dropdown-element">';
									subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier+'">';
									if(flagImageArticleFound == true){
										subtypes += '<span><img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></span>';	    				  
									}else{
										subtypes += '<span><img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></span>';	    											
									}
									subtypes += '<span class="subtypes-dropdown-text" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'">'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'</span></div>';
								}
								
								break;
							}
						}
							
					}						
				}
			}

			jQuery('.subtypes-dropdown-content').html(subtypes);
			jQuery('.subtypes-content-dropdown').show();
			
			jQuery('.subtypes-dropdown-display').click(function(){
				jQuery('.subtypes-dropdown-content').children('.subtypes-dropdown-element').each(function(){
					if(jQuery(this).children('.subtypes-identifer').val() == dgoArticleIdentifier){
						jQuery(this).hide();
					}else{
						jQuery(this).show();
					}
				});
				jQuery(this).css('border-color','orange');
				jQuery('.subtypes-dropdown-content').show();
				jQuery('.article-group-dropdown-content').fadeOut(1);
				jQuery('.article-group-dropdown-display').css('border-color','#CCC');
			});	
				
			jQuery('.subtypes-dropdown-element').click(function(){
				jQuery(".subtypes-dropdown-element").removeClass("content-size-selected");				
				jQuery(this).addClass("content-size-selected");
				
				jQuery('.subtypes-dropdown-label').html(jQuery(".content-size-selected .subtypes-dropdown-text").html());
				jQuery('.subtypes-dropdown-label').attr('title', jQuery(".content-size-selected .subtypes-dropdown-text").html());
				jQuery('#subtypes-dropdown-img').attr('src', jQuery(".content-size-selected").children('span:first').children('img').attr('src'));
				
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
							//change meta tag name "DC.Title"
							loadMetagTag('title', ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Name);
							loadMetagTag('description', ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Name);
							
	        				jQuery('#breadcrumb .li-article a').html(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Name);
							dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Id;
							
							var item = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j];
							
							for(var i = 0;i < item.Categories.length;i++){
								for(var m = 0;m < dgoArticleCategory.Children.length;m++){
	    							if(dgoArticleCategory.Children[m].Children != undefined){
	    								for(var n = 0;n < dgoArticleCategory.Children[m].Children.length;n++){
	        								if(dgoArticleCategory.Children[m].Children[n].Key == item.Categories[i]){
	            		    					jQuery('.li-article-group').children('a').html(dgoArticleCategory.Children[m].Name);
	            		    					jQuery('.li-article').children('a').html(item.Name);
	            		    					break;
	            		    				}
	        							}
	    							}
	    						}
							}
							
							jQuery('#loader').children('img').attr('src',web_2_print_blogInfo+'css/img/icon/loading.gif');
							
							jQuery('#loader').children('img').css('height','40px');
							
							if(jQuery('.image-list-content .img-cover-mask').html() == null){
								jQuery('.image-list-content').empty();
							}
							
							//get article pictures
            				//getArticlePicture(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Guid);
							if(dgoHandleForPhp != null){
								getProductVariation(null, ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Guid);
							}
							
						}
					}
				}					
				
				//rewrite url
				//var currentUrl = getUrlVars();
				var currentUrl = '';
				
				if(dgoHandle != null){
					dgoArticleSize 	= null;
					dgoArticleRun	= null;
					
					if(dgoTypeOfId == "A"){
						currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
					}else{
						currentUrl += dgoCatInfo + '-' + dgoArticleName + '-' + Base62.encode(dgoArticleGroupId);
					}											
					
				}else{
					dgoHandle = 'userClick';
					
					if(dgoTypeOfId == "A"){
						currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
					}else{
						currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
					}
					
					if(dgoArticleSize != null){								
						currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun;
					}
					
					if(dgoArticlePic != ''){
						currentUrl += '-' + dgoArticlePic;
					}else if(jQuery('.img-cover-selected').attr('title') != undefined){
						currentUrl += '-' + jQuery('.img-cover-selected').attr('title');
					}
					
					
				}
				
				window.location.hash = currentUrl;
			});	
			
			if(dgoArticleIdentifier != undefined){
				jQuery('.subtypes-dropdown-content').children('.subtypes-dropdown-element').each(function(){
					if(jQuery(this).children('.subtypes-identifer').val() == dgoArticleIdentifier){
						jQuery(this).click();
					}
				});
			}else{
				jQuery('.subtypes-dropdown-element:first').click();
			}
			
		});	
	}
	
	if(option == 'Event-Article-Group-Crystal'){
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
			
			//hide this area if we just have only one item
			if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier].length == 1){
				jQuery('.article-subtype').hide();
			}else{
				jQuery('.article-subtype').show();
			}
			
			var subtypes = '';
			
			if(dgoTypeOfId == "A"){
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
    					  	if(flagImageArticleFound == true){
								subtypes += '<img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></div>';	    				
							}else{
								subtypes += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></div>';	    											
							}
    					}else{
    						var img = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier;
    						
    						if(Global_ProductImg['Article'][ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier] == undefined){
    	    					img = Global_ProductImg['Standard'].split('.')[0];
    	    				}
    						
    					  	subtypes += '<div class="rightside-middle-subtypes-block">';
    					  	subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier+'">';
    					  	if(flagImageArticleFound == true){
								subtypes += '<img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></div>';	    				  
							}else{
								subtypes += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></div>';	    											
							}
							
    					}	
					}						
				}
			}else{
				for(var j in ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier]){
					if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Amount != undefined){
						for(var k = 0;k < ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Categories.length;k++){
							if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Categories[k] == Base62.decode(dgoCatId)){
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
		    					  	if(flagImageArticleFound == true){
										subtypes += '<img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></div>';	    				
									}else{
										subtypes += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></div>';	    											
									}
									
		    					}else{
		    						var img = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier;
		    						
		    						if(Global_ProductImg['Article'][ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier] == undefined){
		    	    					img = Global_ProductImg['Standard'].split('.')[0];
		    	    				}
		    						
		    					  	subtypes += '<div class="rightside-middle-subtypes-block">';
		    					  	subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Identifier+'">';
		    					  	if(flagImageArticleFound == true){
										subtypes += '<img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></div>';	    				
									}else{
										subtypes += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'" title="'+ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_identifier][j].Name+'"></div>';	    											
									}
		    					}
								
								break;
							}
						}
							
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
							//change meta tag name "DC.Title"
							loadMetagTag('title', ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Name);
							loadMetagTag('description', ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Name);
	        				
							jQuery('#breadcrumb .li-article a').html(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Name);
							dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Id;
							
							var item = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j];
							
							for(var i = 0;i < item.Categories.length;i++){
								for(var m = 0;m < dgoArticleCategory.Children.length;m++){
	    							if(dgoArticleCategory.Children[m].Children != undefined){
	    								for(var n = 0;n < dgoArticleCategory.Children[m].Children.length;n++){
	        								if(dgoArticleCategory.Children[m].Children[n].Key == item.Categories[i]){
	            		    					jQuery('.li-article-group').children('a').html(dgoArticleCategory.Children[m].Name);
	            		    					jQuery('.li-article').children('a').html(item.Name);
	            		    					break;
	            		    				}
	        							}
	    							}
	    						}
							}
							
							jQuery('#loader').children('img').attr('src',web_2_print_blogInfo+'css/img/icon/loading.gif');
							
							jQuery('#loader').children('img').css('height','40px');
							
							if(jQuery('.image-list-content .img-cover-mask').html() == null){
								jQuery('.image-list-content').empty();
							}
							
							//get article pictures
            				//getArticlePicture(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Guid);
							if(dgoHandleForPhp != null){
								getProductVariation(null, ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Guid);
							}
							
						}
					}
				}					
				
				//rewrite url
				//var currentUrl = getUrlVars();
				var currentUrl = '';
				
				if(dgoHandle != null){
					dgoArticleSize 	= null;
					dgoArticleRun	= null;
					
					if(dgoTypeOfId == "A"){
						currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
					}else{
						currentUrl += dgoCatInfo + '-' + dgoArticleName + '-' + Base62.encode(dgoArticleGroupId);
					}											
					
				}else{
					dgoHandle = 'userClick';
					
					if(dgoTypeOfId == "A"){
						currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
					}else{
						currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
					}
					
					if(dgoArticleSize != null){								
						currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun;
					}
					
					if(dgoArticlePic != ''){
						currentUrl += '-' + dgoArticlePic;
					}else if(jQuery('.img-cover-selected').attr('title') != undefined){
						currentUrl += '-' + jQuery('.img-cover-selected').attr('title');
					}
					
					
				}
				
				window.location.hash = currentUrl;

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
	}
	
	if(option == 'Event-Subtype-dropdown'){
			jQuery('.subtypes-dropdown-display').click(function(){
				jQuery('.subtypes-dropdown-content').children('.subtypes-dropdown-element').each(function(){
					if(jQuery(this).children('.subtypes-id').val() == dgoArticleGroupId){
						jQuery(this).hide();
					}else{
						jQuery(this).show();
					}
				});
				jQuery(this).css('border-color','orange');
				jQuery('.subtypes-dropdown-content').show();
				jQuery('.article-group-dropdown-content').fadeOut(1);
				jQuery('.article-group-dropdown-display').css('border-color','#CCC');
			});	
	
			//event choose subtype in every case
			jQuery('.subtypes-dropdown-element').click(function(){		
				jQuery(".subtypes-dropdown-element").removeClass("content-size-selected");				
				jQuery(this).addClass("content-size-selected");
				
				jQuery('.subtypes-dropdown-label').html(jQuery(".content-size-selected .subtypes-dropdown-text").html());
				jQuery('.subtypes-dropdown-label').attr('title', jQuery(".content-size-selected .subtypes-dropdown-text").html());
				jQuery('#subtypes-dropdown-img').attr('src', jQuery(".content-size-selected").children('span:first').children('img').attr('src'));
				
				var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
				
				jQuery('.price-start-value').html(imgLoading);
				
				jQuery('.available-size').html('Loading...');
				
				jQuery('#article-identifier').val(jQuery(this).children('.subtypes-identifer').val());    				
				
				for(var j in ArticleGroup[dgoArticleGroupIdentifier].Items){
					if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Id == jQuery(this).children('.subtypes-id').val()){
						jQuery('#article-matchcode').val(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Matchcode);
						
						dgoArticleName = makeFriendlyUrl(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						
						//Article Description
						jQuery('.prod-detail-part-1-rightside-description').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Description);
						//Article Name
						jQuery('.prod-detail-part-1-rightside-name').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						//change meta tag name "DC.Title"
						loadMetagTag('title', ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						loadMetagTag('description', ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						
						jQuery('#breadcrumb .li-article a').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
						
						dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier].Items[j].Id;
						
						jQuery('#loader').children('img').attr('src',web_2_print_blogInfo+'css/img/icon/loading.gif');
						
						jQuery('#loader').children('img').css('height','40px');
						
						if(jQuery('.image-list-content .img-cover-mask').html() == null){
							jQuery('.image-list-content').empty();
						}    								
						
						//get article pictures
						//getArticlePicture(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Guid);
						if(dgoHandleForPhp != null){
							getProductVariation(null, ArticleGroup[dgoArticleGroupIdentifier].Items[j].Guid);
						}
						
					}
				}

				dgoArticleIdentifier = jQuery(this).children('.subtypes-identifer').val();
				
				//rewrite url
				var currentUrl = '';
				
				dgoArticleSize 	= null;
				dgoArticleRun	= null;
				
				if(dgoTypeOfId == "A"){
					currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
				}else{
					currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
				}
				
				jQuery('.amount-input').val('...');
				
				window.location.hash = currentUrl;   
			});
	}
	
	if(option == 'Event-Subtype'){		
		//event choose subtype in every case
		jQuery('.rightside-middle-subtypes-block').click(function(){
			jQuery(".rightside-middle-subtypes-block").removeClass("content-size-selected");
			
			jQuery(this).addClass("content-size-selected");
			
			var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
			
			jQuery('.price-start-value').html(imgLoading);
			
			jQuery('.available-size').html('Loading...');
			
			jQuery('#article-identifier').val(jQuery(this).children('.subtypes-identifer').val());    				
			
			for(var j in ArticleGroup[dgoArticleGroupIdentifier].Items){
				if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Id == jQuery(this).children('.subtypes-id').val()){
					jQuery('#article-matchcode').val(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Matchcode);
					
					dgoArticleName = makeFriendlyUrl(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
					
					//Article Description
					jQuery('.prod-detail-part-1-rightside-description').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Description);
					//Article Name
					jQuery('.prod-detail-part-1-rightside-name').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
					//change meta tag name "DC.Title"
					
					jQuery('#breadcrumb .li-article a').html(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Name);
					
					dgoArticleGroupId = ArticleGroup[dgoArticleGroupIdentifier].Items[j].Id;
					
					jQuery('#loader').children('img').attr('src',web_2_print_blogInfo+'css/img/icon/loading.gif');
					
					jQuery('#loader').children('img').css('height','40px');
					
					if(jQuery('.image-list-content .img-cover-mask').html() == null){
						jQuery('.image-list-content').empty();
					}    								
					
					//get article pictures
					//getArticlePicture(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Guid);
					if(dgoHandleForPhp != null){
						getProductVariation(null, ArticleGroup[dgoArticleGroupIdentifier].Items[j].Guid);
					}
					
				}
			}

			dgoArticleIdentifier = jQuery(this).children('.subtypes-identifer').val();
			
			//rewrite url
			var currentUrl = '';
			
			dgoArticleSize 	= null;
			dgoArticleRun	= null;
			
			if(dgoTypeOfId == "A"){
				currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
			}else{
				currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
			}
			
			jQuery('.amount-input').val('...');
			
			window.location.hash = currentUrl;   
			
			//get materials
			//getMaterials(jQuery(this).children('.subtypes-identifer').val());

		});
	}
	
	if(option == 'Event-Colour'){
		jQuery('.colour-block').click(function(){
			jQuery('.colour-block').removeClass('colour-block-selected');
			jQuery(this).addClass('colour-block-selected');
			var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
			
			jQuery('.price-start-value').html(imgLoading);	
			
			jQuery('#loader').children('img').attr('src',web_2_print_blogInfo+'css/img/icon/loading.gif');
			
			jQuery('#loader').children('img').css('height','40px');
			
			jQuery('.image-list-content').empty();
			
			dgoArticleColor = jQuery(this).children('.color-id').val();
			
			var currentUrl = '';
			
			if(dgoTypeOfId == "A"){
				currentUrl += '#'+ dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId) + '-V' + Base62.encode(dgoArticleColor);
			}else{
				currentUrl += dgoCatInfo + '-' + dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-A' + Base62.encode(dgoArticleGroupId) + '-V' + Base62.encode(dgoArticleColor);
			}
			
			if(dgoArticleSize != null){
				currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun;
			}
			
			window.location.hash = currentUrl;
			
			getColorMatchProduct();
			getPrices();
		});
	}

	if(option == 'Event-Run-Amount'){
	
		jQuery('.run-select').hover(function(){
			jQuery(this).addClass('run-select-hover');
		}, function(){
			jQuery(this).removeClass('run-select-hover');
		});
	
		jQuery('.run-select').click(function(){
        	var run_current = jQuery(this).children('input').val();
        	jQuery('.amount-input').val(jQuery(this).children('input').val());
        	dgoArticleRun = jQuery(this).children('input').val() + '_Run';
    		var currentUrl = '';	    		
			if(dgoArticleColor != null){
				if(dgoTypeOfId == "A"){
					currentUrl += '#'+ dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
				}else{
					currentUrl += dgoCatInfo + '-' + dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-A' + Base62.encode(dgoArticleGroupId);
				}
				currentUrl +=  '-V' + Base62.encode(dgoArticleColor) + '-' + dgoArticleSize +  '-' + dgoArticleRun;
			}else{
				if(dgoTypeOfId == "A"){
					currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
				}else{
					currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
				}
				currentUrl += '-' + dgoArticleSize +  '-' + dgoArticleRun;
			}
			if(jQuery('.img-cover-selected').length == 1){
				currentUrl += '-' + jQuery('.img-cover-selected').attr('title');
			}
			window.location.hash = currentUrl;
    		var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
        	jQuery('.price-start-value').html(imgLoading);	
    		getPrices();
    		
    		//using for product preview
    		if(jQuery('.image-list-content .img-cover-mask-selected').length != 0){
    			jQuery('.image-list-content .img-cover-mask-selected').children('.amount').children('span').html(run_current);
    			jQuery('.image-list-content .img-cover-mask-selected').children('.amount').children('input').val(run_current);
    			if(run_current == 1){
    				jQuery('.image-list-content .img-cover-mask-selected').children('.amount').addClass('amount-hide');
    			}else{
    				jQuery('.image-list-content .img-cover-mask-selected').children('.amount').removeClass('amount-hide');
    			}
    		}
        });
        
        jQuery('.amount-input').blur(function(){
        	if(parseInt(jQuery(this).val()) > max_volume){
        		jQuery(this).val(max_volume);
        	}        	
        	dgoArticleRun = jQuery(this).val() + '_Run';
    		var currentUrl = '';
	    		if(dgoArticleColor != null){
	    			if(dgoTypeOfId == "A"){
						currentUrl += '#'+ dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
					}else{
						currentUrl += dgoCatInfo + '-' + dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-A' + Base62.encode(dgoArticleGroupId);
					}
	    			currentUrl +=  '-V' + Base62.encode(dgoArticleColor) + '-' + dgoArticleSize +  '-' + dgoArticleRun;
	    		}else{
	    			if(dgoTypeOfId == "A"){
						currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
					}else{
						currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
					}
	    			currentUrl += '-' + dgoArticleSize +  '-' + dgoArticleRun;
	    		}
	    		if(jQuery('.img-cover-selected').length == 1){
	    			currentUrl += '-Pic_' + jQuery('.img-cover-selected').attr('title');
	    		}
    			window.location.hash = currentUrl;
    		var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
        	jQuery('.price-start-value').html(imgLoading);	
    		getPrices();
        });
	}
	
	if(option == 'Event-Format'){
		jQuery('.size-dropdown-main').click(function(){
			jQuery('.size-dropdown-content').show();
		});
		
		jQuery('.size-dropdown-content-item').click(function(){			
			jQuery('.size-value').val(jQuery(this).children('.size-value-dropdown').val());
			jQuery('.size-dropdown-main-name').html(jQuery(this).attr('title'));
			jQuery('.size-dropdown-content').hide();
			
			if(mask_arr.length > 0){
				getMasksFromPhp('recall');
			}
			
			order_price_chosen = jQuery(this).children('.size-value-dropdown').val();
			
			if(dgoArticleGroupIdentifier.split("_")[0] == "CRYSTAL"){
        		dgoArticleSize = order_price_chosen+'_'+formats_object[order_price_chosen].forwidth+'x'+formats_object[order_price_chosen].forheight+'x'+formats_object[order_price_chosen].fordepth+'mm';
        	}else{
        		dgoArticleSize = order_price_chosen+'_'+formats_object[order_price_chosen].forwidth+'x'+formats_object[order_price_chosen].forheight+'mm';
        	}
			jQuery('#loader').children('img').attr('src',web_2_print_blogInfo+'css/img/icon/loading.gif');
			
			jQuery('#loader').children('img').css('height','40px');
			jQuery('.image-list-content').empty();
			getArticlePictureByFormat();

    		//rewrite url
			//var currentUrl = getUrlVars();
				var currentUrl = '';
				
				if(dgoArticleColor != null){
	    			
					if(dgoTypeOfId == "A"){
						currentUrl += '#'+ dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
					}else{
						currentUrl += dgoCatInfo + '-' + dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-A' + Base62.encode(dgoArticleGroupId);
					}
	    			
	    			currentUrl +=  '-V' + Base62.encode(dgoArticleColor) + '-' + dgoArticleSize +  '-' + dgoArticleRun;
	    		}else{
	    			if(dgoTypeOfId == "A"){
						currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
					}else{
						currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
					}
	    			
	    			currentUrl += '-' + dgoArticleSize +  '-' + dgoArticleRun;
	    		}

				if(jQuery('.img-cover-selected').attr('title') != undefined){
					currentUrl += '-' + jQuery('.img-cover-selected').attr('title');
				}
				
				window.location.hash = currentUrl;
    		
    		//get price automatically
			if(dgoArticlePrices == null){
				var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
				
				jQuery('.price-start-value').html(imgLoading);
				
				//get price automatically
	        	getPrices();
			}else{
				var api = new delivergo.api(); 
				var IdSize		= jQuery('.content-size-selected .size-value').val();
    			var EndPrices 	= 0; 
    			//product price
				var sale_object = [];
				var product_min_price = 0;
				var product_min_price_vat = 0;
				var product_max_price = 0;
				var product_max_price_vat = 0;
		
				var product_price = 0;
				var product_price_vat = 0;
    			for(var i = 0;i < dgoArticlePrices[IdSize].Prices.Items.length;i++){    				
    				if(dgoArticlePrices[IdSize].Prices.Items[i] != undefined){
    					
    					if(dgoArticlePrices[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){
        					//var VATprices = (dgoArticlePrices[IdSize].Prices.Items[i].SaleNet * dgoArticlePrices[IdSize].Prices.Items[i].VatPercentage) / 100;
        					//EndPrices += dgoArticlePrices[IdSize].Prices.Items[i].SaleNet * ;
        					sale_object.push(dgoArticlePrices[IdSize].Prices.Items[i]);
        					
        					var _prices = dgoArticlePrices[IdSize].Prices.Items[i];
							product_price += _prices.SaleNet;
							product_price_vat += _prices.SaleNet + (_prices.SaleNet * _prices.VatPercentage / 100);
        				}
    					
    					var grossPrice 				= api.CalculateGrossPrice(sale_object);
    					//product_price 				= grossPrice[0].SaleNetSum;
    					//product_price_vat 			= grossPrice[0].SaleGrossSum;
    					
    					//show the right price
    					EndPrices = endUserPrice == "Net" ? product_price : product_price_vat;
    					
    					dgoArticlePrices[IdSize].Pictures 			= [];
    					dgoArticlePrices[IdSize].ArticleID 			= 'article_id';
    					dgoArticlePrices[IdSize].Product 			= jQuery('#article-matchcode').val();
    					dgoArticlePrices[IdSize].ArticleIdentifier 	= jQuery('#article-identifier').val();
    					dgoArticlePrices[IdSize].FormatObject 		= formats_object[order_price_chosen];
    					dgoArticlePrices[IdSize].ProductPrice 		= product_price;
    					dgoArticlePrices[IdSize].ProductPriceVAT 	= product_price_vat;

    				}
    				
    			}
    			
    			for(var i = 0;i < dgoArticlePricesMin[IdSize].Prices.Items.length;i++){    				
					if(dgoArticlePricesMin[IdSize].Prices.Items[i] != undefined){
						if(dgoArticlePricesMin[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){
							//get min price
							var _min_prices = dgoArticlePricesMin[IdSize].Prices.Items[i];
							product_min_price += _min_prices.SaleNet;
							product_min_price_vat += _min_prices.SaleNet + (_min_prices.SaleNet * _min_prices.VatPercentage / 100);
						}
					}
				}
				
				for(var i = 0;i < dgoArticlePricesMax[IdSize].Prices.Items.length;i++){    				
					if(dgoArticlePricesMax[IdSize].Prices.Items[i] != undefined){
						if(dgoArticlePricesMax[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){
							//get max price
							var _max_prices = dgoArticlePricesMax[IdSize].Prices.Items[i];
							product_max_price += _max_prices.SaleNet;
							product_max_price_vat += _max_prices.SaleNet + (_max_prices.SaleNet * _max_prices.VatPercentage / 100);
						}
					}
				}

				if(product_max_price != product_min_price && jQuery('#amount-run-type').val() != 'Run'){
    				jQuery('#cross-min-price').html(jQuery('.trans-maxpricePer').val() + ' ' + formatCurrency((endUserPrice == "Net") ? Math.round(product_max_price * 100) / 100 : Math.round(product_max_price_vat * 100) / 100 ,dgoCurrencies) + ' ' +  dgoCurrencies + '.');
    			}
				if(product_price == product_max_price){
    				jQuery('#cross-min-price').html('');
    			}
    			
    			//show the right price
				EndPrices = (endUserPrice == "Net") ? Math.round(product_price * 100) / 100 : Math.round(product_price_vat * 100) / 100;
				jQuery('#cross-start-value').val((endUserPrice == "Net") ? Math.round(product_min_price * 100) / 100 : Math.round(product_min_price_vat * 100) / 100);
				jQuery('.cross-start-value').html(formatCurrency(jQuery('#cross-start-value').val(),dgoCurrencies));
				
				if(EndPrices < parseFloat(jQuery('#cross-start-value').val()) && formatCurrency(EndPrices, dgoCurrencies).length < 8 && jQuery('#amount-run-type').val() != 'Run'){
					jQuery('.cross-start-value').show();
				}else{
					jQuery('.cross-start-value').hide();
				}
				
				//do the effect
				var _top1 = (EndPrices < parseFloat(jQuery('#price-start-value').val())) ? '-25px' : '25px';
				var _top2 = (EndPrices < parseFloat(jQuery('#price-start-value').val())) ? '25px' : '-25px';
				
				if(EndPrices != parseFloat(jQuery('#price-start-value').val())){
					jQuery('.price-start-value').animate({top: _top1}, 500, function(){
						jQuery('#price-start-value').val(EndPrices);
						
						//EndPrices = EndPrices * jQuery('.prod-details-amount-dropdown').val();
						if(jQuery('#sum-text').next('input').val() == 'einzelpreis'){
							//change cross price
							jQuery('.cross-start-value').html(formatCurrency(parseFloat(jQuery('#cross-start-value').val()) * parseInt(jQuery('.amount-input').val()), dgoCurrencies));
							EndPrices = parseFloat(EndPrices) * parseInt(jQuery('.amount-input').val());
						}
						
		    			if(endUserPrice == "Net")
		    				jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
		    			else{
		    				jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
		    				jQuery('.end-user-price-note').show();
		    			}
		    			
		    			jQuery('.price-start-value').animate({top: _top2}, 0, function(){});
						jQuery('.price-start-value').animate({top: '0px'}, 500, function(){});
						
						//price trick html
						jQuery('.price-start-value-trick').html(jQuery('.price-start-value').html());
					});
				}
			}
		});
	}
}

//function to decentrate article group
function ArticleDecentralizationCategory(Arr){
	var newArr = [];
	for(var i in Arr){
		if(Arr[i].Categories != undefined){
			if(newArr[Arr[i].ArticleGroupIdentifier] == undefined){
				if(Arr[i].Categories.length != 0){
					for(j = 0;j < Arr[i].Categories.length;j++){
						if(Arr[i].Categories[j] == Base62.decode(dgoCatId)){
							
							//with crystal, we have to hardcode
							if(Arr[i].ArticleGroupIdentifier.split("_")[0] == "CRYSTAL"){
								if(newArr["CRYSTAL"] == undefined){
									newArr["CRYSTAL"] = {};
									newArr["CRYSTAL"].Name = "Crystal";
									newArr["CRYSTAL"].Items = [];
								}
								
								if(newArr["CRYSTAL"].Items[Arr[i].ArticleGroupIdentifier] == undefined){
									newArr["CRYSTAL"].Items[Arr[i].ArticleGroupIdentifier] = [];
								}
								
								newArr["CRYSTAL"].Items[Arr[i].ArticleGroupIdentifier].push(Arr[i]);
								
							}else{
								newArr[Arr[i].ArticleGroupIdentifier] 		= {};
								newArr[Arr[i].ArticleGroupIdentifier].Name 	= Arr[i].Matchcode.split("/")[0];
								newArr[Arr[i].ArticleGroupIdentifier].Items = [];
								newArr[Arr[i].ArticleGroupIdentifier].Items.push(Arr[i]);
							}
						}
					}
				}
				
			}else{
				if(Arr[i].Categories.length != 0){
					for(j = 0;j < Arr[i].Categories.length;j++){
						if(Arr[i].Categories[j] == Base62.decode(dgoCatId)){
							newArr[Arr[i].ArticleGroupIdentifier].Items.push(Arr[i]);
						}			
					}
				}
			}
		}
	}
	
	return newArr;
}

function getArticleGroupFromPhp(result, identifierGroup, options, identifier){
	
	if(dgoTypeOfId == "A"){
		dgoArticleGroupId = dgoArticleGroupId.substring(1);
		
		ArticleGroup = articles 	= ArticleDecentralization(dgoArticleGroupArray);
		
		ArticleGroup = SortSubtypeBySize(ArticleGroup);		
		
	}else{
		
		dgoArticleGroupId = dgoArticleGroupId.substring(1);
		
		ArticleGroup = articles 	= ArticleDecentralizationCategory(dgoArticleGroupArray);
		
		ArticleGroup = SortSubtypeBySize(ArticleGroup);
		
		var url 	= window.location.hash;
			url		= url.split("-");
		
		//Category infomation, use to rewrite url	
		dgoCatInfo = url[0] + '-' + url[1]; 
		
		//find article id
		for(var k in ArticleGroup){
			if(ArticleGroup[k].Name != undefined){
				if(k == "CRYSTAL"){
					dgoArticleGroupId = ArticleGroup['CRYSTAL'].Items['CRYSTAL_CUBIC'][0].Id; 
					break;
				}else{
					dgoArticleGroupId = ArticleGroup[k].Items[0].Id; 
					break;
				}    					
			}
		}

		//if article group is exist in url
		if(url[3] != undefined){
			dgoArticleGroupId = Base62.decode(url[3].substring(1));
		}
		
		//if article size is exist in url
		if(url[4] != undefined){
			dgoArticleSize = url[4];
			if(dgoArticleSize.charAt(0) == "V"){
				dgoArticleColor = Base62.decode(dgoArticleSize.substring(1));
				dgoArticleSize = url[5];
			}
		}else{
			dgoArticleSize = null;
		}

		//if run is exist in url
		if(url[5] != undefined){
			dgoArticleRun = dgoArticleColor == null ? url[5] : url[6];		
		}else{
			dgoArticleRun = null;
		}
		
		//if picture is exist in url
		if(url[6] != undefined){
			dgoArticlePic = dgoArticleColor == null ? url[6] : url[7];
		}else{
			dgoArticlePic = '';
		}

	}

	if(identifierGroup == null){
		for(var i = 0;i < dgoArticleGroupArray.length; i++){
			if(dgoArticleGroupArray[i].Id == dgoArticleGroupId){
				dgoArticleGroupIdentifier = identifierGroup = dgoArticleGroupArray[i].ArticleGroupIdentifier;
				dgoArticleIdentifier = identifier = dgoArticleGroupArray[i].Identifier;
				
				//Article Description
				jQuery('.prod-detail-part-1-rightside-description').html(dgoArticleGroupArray[i].Description);
				//Article Name
				jQuery('.prod-detail-part-1-rightside-name').html(dgoArticleGroupArray[i].Name);
				//change meta tag name "DC.Title"
				loadMetagTag('title', dgoArticleGroupArray[i].Name);
				loadMetagTag('description', dgoArticleGroupArray[i].Name);
				
				jQuery('#breadcrumb .li-article a').html(dgoArticleGroupArray[i].Name);
				if(identifierGroup.split("_")[0] == "CRYSTAL"){
					identifierGroup = "CRYSTAL";
				}
				
				//get category name
				for(var k = 0;k < dgoArticleGroupArray[i].Categories.length;k++){
					for(var j = 0;j < dgoArticleCategory.Children.length;j++){
						if(dgoArticleCategory.Children[j].Key == dgoArticleGroupArray[i].Categories[k]){
							jQuery('.li-article-group').children('a').html(dgoArticleCategory.Children[j].Name);
							jQuery('.li-article').children('a').html(dgoArticleGroupArray[i].Name);
							break;
						}else if(dgoArticleCategory.Children[j].Children != undefined){
							for(var n = 0;n < dgoArticleCategory.Children[j].Children.length;n++){
								if(dgoArticleCategory.Children[j].Children[n].Key == dgoArticleGroupArray[i].Categories[k]){
			    					jQuery('.li-article-group').children('a').html(dgoArticleCategory.Children[j].Name);
			    					jQuery('.li-article').children('a').html(dgoArticleGroupArray[i].Name);
			    					break;
			    				}
							}
						}
					}
				}
				
			}
		}
	}
	
	var ArticleGroupMatchcode 	= null;
	//with orthers article groups except crystal
	var article_group_block = '';
	
	if(identifierGroup != "CRYSTAL"){
		if(dgoTypeOfId == 'A'){
			for(var i in ArticleGroup){
				if(ArticleGroup[i].Items != undefined){ 
					
					if(i == identifierGroup){
        				          				
        				ArticleGroupMatchcode	= ArticleGroup[i].Items[0].Matchcode;
        				
        				//match code for this article group
        				jQuery('#article-matchcode').val(ArticleGroupMatchcode);
        				
        			}
				}    				
    		}
		}else{
			var flagCountArticleGroup = 0;
			
			for(var i in ArticleGroup){
				if(ArticleGroup[i].Items != undefined){				
					flagCountArticleGroup++;
					var name = i;
					if(i == identifierGroup){        				         				
        				ArticleGroupMatchcode	= ArticleGroup[i].Items[0].Matchcode;        				
        				//match code for this article group
        				jQuery('#article-matchcode').val(ArticleGroupMatchcode);        				        				
        				var img = i;
						if(Global_ProductImg['Article'][i] == undefined){
	    					img = Global_ProductImg['Standard'].split('.')[0];
	    				}
						
						for(var j = 0;j < ArticleGroupArray.length;j++){
							if(ArticleGroupArray[j].Active != undefined){
								if(ArticleGroupArray[j].Token == i){
									name = ArticleGroupArray[j].ArticleGroupTranslation[0].Name;
									break;
								}
							}							
						}
						
						if(dgoArticleGroupView == 'thumbnail'){
							article_group_block += '<div class="rightside-middle-article-block article-block-selected">';
							article_group_block += '<input type="hidden" class="article-group-identifer" value="'+i+'">';
																					
							if(flagImageArticleFound == true){
								article_group_block += '<img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+name+'" title="'+name+'"></div>';
							}else{
								article_group_block += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+name+'" title="'+name+'"></div>';						
							}
						}else{
							article_group_block += '<div class="article-group-dropdown-element article-block-selected">';
							article_group_block += '<input type="hidden" class="article-group-identifer" value="'+i+'">';
							if(flagImageArticleFound == true){
								article_group_block += '<span><img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+name+'" title="'+name+'"></span>';
							}else{
								article_group_block += '<span><img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+name+'" title="'+name+'"></span>';						
							}						
							article_group_block += '<span class="article-group-dropdown-text" title="'+name+'">'+name+'</span></div>';
						}
        			}else{
        				var img = i;
						if(Global_ProductImg['Article'][i] == undefined){
	    					img = Global_ProductImg['Standard'].split('.')[0];
	    				}
						
						for(var j = 0;j < ArticleGroupArray.length;j++){
							if(ArticleGroupArray[j].Active != undefined){
								if(ArticleGroupArray[j].Token == i){
									name = ArticleGroupArray[j].ArticleGroupTranslation[0].Name;
									break;
								}
							}							
						}
						if(dgoArticleGroupView == 'thumbnail'){
							article_group_block += '<div class="rightside-middle-article-block">';
							article_group_block += '<input type="hidden" class="article-group-identifer" value="'+i+'">';
							if(flagImageArticleFound == true){
								article_group_block += '<img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+name+'" title="'+name+'"></div>';
							}else{
								article_group_block += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+name+'" title="'+name+'"></div>';						
							}
						}else{
							article_group_block += '<div class="article-group-dropdown-element">';
							article_group_block += '<input type="hidden" class="article-group-identifer" value="'+i+'">';
							if(flagImageArticleFound == true){
								article_group_block += '<span><img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+name+'" title="'+name+'"></span>';
							}else{
								article_group_block += '<span><img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+name+'" title="'+name+'"></span>';						
							}						
							article_group_block += '<span class="article-group-dropdown-text" title="'+name+'">'+name+'</span></div>';
						}
        			}					
				}    				
    		}
			
			if(flagCountArticleGroup > 1){				
				jQuery('.article-group-container').show();
			} 
			
			if(dgoArticleGroupView == 'thumbnail'){
				jQuery('.article-group-content').html(article_group_block);	
				
				//add event for article group
				EventForProductDetailsPage('Event-Article-Group');
			}else{
				jQuery('.article-group-content').hide();
				jQuery('.subtypes-content').hide();
				jQuery('.article-group-dropdown-content').html(article_group_block);
				jQuery('.article-group-content-dropdown').show();
				
				//add event for article group
				EventForProductDetailsPage('Event-Article-Group-dropdown');
				
				jQuery('.article-group-dropdown-label').html(jQuery('.article-block-selected .article-group-dropdown-text').html());
				jQuery('.article-group-dropdown-label').attr('title', jQuery('.article-block-selected .article-group-dropdown-text').html());
				jQuery('#article-group-dropdown-img').attr('src', jQuery('.article-block-selected').children('span:first').children('img').attr('src'));
			}
		}
		
		var subtypes = '';
		
		//hide this area if we just have only one item
		if(ArticleGroup[identifierGroup].Items.length == 1){
			jQuery('.article-subtype').hide();
		}else{
			jQuery('.article-subtype').show();
		}
		
		//get materials
		for(var j = 0;j < ArticleGroup[identifierGroup].Items.length;j++){    				
			var img = ArticleGroup[identifierGroup].Items[j].Identifier.toUpperCase();
			
			if(Global_ProductImg['Article'][img] == undefined){
				img = Global_ProductImg['Standard'].split('.')[0];
			}

			dgoArticleIdentifier = ArticleGroup[identifierGroup].Items[j].Identifier;
				
			//article identifider use to calculate the prices
			jQuery('#article-identifier').val(ArticleGroup[identifierGroup].Items[j].Identifier);
			
			if(dgoArticleGroupView == 'thumbnail'){			
				//content-size-selected
				subtypes += '<div class="rightside-middle-subtypes-block ">';
				subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[identifierGroup].Items[j].Identifier+'">';
				subtypes += '<input type="hidden" class="subtypes-id" value="'+ArticleGroup[identifierGroup].Items[j].Id+'">';
				if(flagImageArticleFound == true){
					subtypes += '<img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[identifierGroup].Items[j].Name+'" title="'+ArticleGroup[identifierGroup].Items[j].Name+'"></div>';	    				
				}else{				
					subtypes += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[identifierGroup].Items[j].Name+'" title="'+ArticleGroup[identifierGroup].Items[j].Name+'"></div>';	    								
				}
			}else{
				subtypes += '<div class="subtypes-dropdown-element content-size-selected">';
				subtypes += '<input type="hidden" class="subtypes-identifer" value="'+ArticleGroup[identifierGroup].Items[j].Identifier+'">';
				subtypes += '<input type="hidden" class="subtypes-id" value="'+ArticleGroup[identifierGroup].Items[j].Id+'">';
				if(flagImageArticleFound == true){
					subtypes += '<span><img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+ArticleGroup[identifierGroup].Items[j].Name+'" title="'+ArticleGroup[identifierGroup].Items[j].Name+'"></span>';	    				
				}else{
					subtypes += '<span><img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+ArticleGroup[identifierGroup].Items[j].Name+'" title="'+ArticleGroup[identifierGroup].Items[j].Name+'"></span>';	    											
				}
				subtypes += '<span class="subtypes-dropdown-text" title="'+ArticleGroup[identifierGroup].Items[j].Name+'">'+ArticleGroup[identifierGroup].Items[j].Name+'</span></div>';
			}
		}
		
		if(dgoArticleGroupView == 'thumbnail'){			
			jQuery('.subtypes-content').html(subtypes);
					
			//add event for clicking subtype		
			EventForProductDetailsPage('Event-Subtype');
			
			jQuery('.subtypes-content').children('.rightside-middle-subtypes-block').each(function(){
				if(jQuery(this).children('.subtypes-id').val() == dgoArticleGroupId){
					jQuery(this).click();
				}
			});
		}else{
			jQuery('.subtypes-content').hide();
			jQuery('.subtypes-dropdown-content').html(subtypes);
			jQuery('.subtypes-content-dropdown').show();
			
			//add event for clicking subtype		
			EventForProductDetailsPage('Event-Subtype-dropdown');
			
			jQuery('.subtypes-dropdown-content').children('.subtypes-dropdown-element').each(function(){
				if(jQuery(this).children('.subtypes-id').val() == dgoArticleGroupId){
					jQuery(this).click();
				}
			});
			
		}
		    			
	}else{
		
		jQuery('.article-group-container').show();

		jQuery('.prod-detail-part-1-rightside-description').html(jQuery('#breadcrumb .li-article a').html());
		//Article Name
		jQuery('.prod-detail-part-1-rightside-name').html(jQuery('#breadcrumb .li-article a').html());		
		//change meta tag name "DC.Title"
		loadMetagTag('title', jQuery('#breadcrumb .li-article a').html());
		loadMetagTag('description', jQuery('#breadcrumb .li-article a').html());
		
		var article_group_block = '';
		
		if(dgoTypeOfId == "A"){
			for(var i in ArticleGroup[identifierGroup].Items){
				if(ArticleGroup[identifierGroup].Items[i][0] != undefined){
					var img = i;
					var name = i;
					if(Global_ProductImg['Article'][i] == undefined){
    					img = Global_ProductImg['Standard'].split('.')[0];
    				}
					
					for(var j = 0;j < ArticleGroupArray.length;j++){
						if(ArticleGroupArray[j].Active != undefined){
							if(ArticleGroupArray[j].Token == i){
								name = ArticleGroupArray[j].ArticleGroupTranslation[0].Name;
								break;
							}
						}							
					}
					
					if(dgoArticleGroupView == 'thumbnail'){
						article_group_block += '<div class="rightside-middle-article-block">';
						article_group_block += '<input type="hidden" class="article-group-identifer" value="'+i+'">';
						if(flagImageArticleFound == true){
							article_group_block += '<img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+name+'" title="'+name+'"></div>';
						}else{
							article_group_block += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+name+'" title="'+name+'"></div>';						
						}
					}else{
						article_group_block += '<div class="article-group-dropdown-element">';
						article_group_block += '<input type="hidden" class="article-group-identifer" value="'+i+'">';
						if(flagImageArticleFound == true){
							article_group_block += '<span><img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+name+'" title="'+name+'"></span>';
						}else{
							article_group_block += '<span><img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+name+'" title="'+name+'"></span>';						
						}						
						article_group_block += '<span class="article-group-dropdown-text" title="'+name+'">'+name+'</span></div>';
					}
				}
				
			}
		}else{
			for(var i in ArticleGroup[identifierGroup].Items){
				var flag = false;
				if(ArticleGroup[identifierGroup].Items[i][0] != undefined){
					for(var j = 0;j < ArticleGroup[identifierGroup].Items[i].length;j++){
						if(ArticleGroup[identifierGroup].Items[i][j].Categories.length != 0){
							for(var k = 0;k < ArticleGroup[identifierGroup].Items[i][j].Categories.length;k++){
								if(ArticleGroup[identifierGroup].Items[i][j].Categories[k] == Base62.decode(dgoCatId)){
									var img = i;
									var name = i;
									if(Global_ProductImg['Article'][i] == undefined){
				    					img = Global_ProductImg['Standard'].split('.')[0];
				    				}
									
									for(var m = 0;m < ArticleGroupArray.length;m++){
										if(ArticleGroupArray[m].Active != undefined){
											if(ArticleGroupArray[m].Token == i){
												name = ArticleGroupArray[m].ArticleGroupTranslation[0].Name;
												break;
											}
										}							
									}
									
									if(dgoArticleGroupView == 'thumbnail'){
										article_group_block += '<div class="rightside-middle-article-block">';
										article_group_block += '<input type="hidden" class="article-group-identifer" value="'+i+'">';
										if(flagImageArticleFound == true){
											article_group_block += '<img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+name+'" title="'+name+'"></div>';
										}else{
											article_group_block += '<img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+name+'" title="'+name+'"></div>';						
										}
									}else{
										article_group_block += '<div class="article-group-dropdown-element">';
										article_group_block += '<input type="hidden" class="article-group-identifer" value="'+i+'">';
										if(flagImageArticleFound == true){
											article_group_block += '<span><img src="'+web_2_print_themeUrl+'css/img/imgArticle/'+img+'.png" alt="'+name+'" title="'+name+'"></span>';
										}else{
											article_group_block += '<span><img src="'+web_2_print_blogInfo+'css/img/imgArticle/STANDARD.png" alt="'+name+'" title="'+name+'"></span>';						
										}						
										article_group_block += '<span class="article-group-dropdown-text" title="'+name+'">'+name+'</span></div>';
									}
									
									flag = true;
									
									break;
								}
							}
						}
						
						if(flag == true){
							break;
						}
					}
				}
			}
		}
		
		if(dgoArticleGroupView == 'thumbnail'){
			//fill items to article group list
			jQuery('.article-group-content').html(article_group_block);
			
			//add event for clicking article group
			EventForProductDetailsPage('Event-Article-Group-Crystal');
			
			if(dgoArticleGroupIdentifier != undefined){
				jQuery('.article-group-content').children('.rightside-middle-article-block').each(function(){
					if(jQuery(this).children('.article-group-identifer').val() == dgoArticleGroupIdentifier){
						jQuery(this).click();
					}
				})
			}else{
				jQuery('.rightside-middle-article-block:first').click();
			}
		}else{
			jQuery('.article-group-content').hide();
			jQuery('.subtypes-content').hide();
			jQuery('.article-group-dropdown-content').html(article_group_block);
			jQuery('.article-group-content-dropdown').show();			
			
			//add event for clicking article group
			EventForProductDetailsPage('Event-Article-Group-Crystal-dropdown');
			
			if(dgoArticleGroupIdentifier != undefined){
				jQuery('.article-group-dropdown-content').children('.article-group-dropdown-element').each(function(){
					if(jQuery(this).children('.article-group-identifer').val() == dgoArticleGroupIdentifier){
						jQuery(this).click();
					}
				})
			}else{
				jQuery('.article-group-dropdown-element:first').click();
			}
		}
	}
	
	if(dgoGuid == '' || dgoGuid == null){
		if (jQuery.browser.msie && window.XDomainRequest){
			// Use Microsoft XDR
			var xdr = new XDomainRequest();
			xdr.open("get", "http://hdsjsonip.appspot.com/?json");  
			xdr.onload = function() {
				data = JSON2.parse(xdr.responseText);
				//JS Goodness here! Your ip variable is data.ip
				social_user_id = data.ip;
				
				if(dgoArticleGroupIdentifier.split("_")[0] != "CRYSTAL"){
					//article source id
					socialSourceID = ArticleGroup[dgoArticleGroupIdentifier].Items[0].Guid;
					
					//do rating call
					starRatingHandleCall(ArticleGroup[dgoArticleGroupIdentifier].Items[0].Guid);
					
					//do comment call
					GetSourceComment(ArticleGroup[dgoArticleGroupIdentifier].Items[0].Guid);
				}else{
					//article source id
					socialSourceID = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[dgoArticleGroupIdentifier][0].Guid;
					
					//do rating call
					starRatingHandleCall(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[dgoArticleGroupIdentifier][0].Guid);
					
					//do comment call
					GetSourceComment(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[dgoArticleGroupIdentifier][0].Guid);
				}
				
			}  		       
			xdr.send();
		}else{
			//get article
			jQuery.getJSON("http://hdsjsonip.appspot.com/?json",
			  function(data) {
				//JS Goodness here! Your ip variable is data.ip
				social_user_id = data.ip;
				
				if(dgoArticleGroupIdentifier.split("_")[0] != "CRYSTAL"){
					//article source id
					socialSourceID = ArticleGroup[dgoArticleGroupIdentifier].Items[0].Guid;
					
					//do rating call
					starRatingHandleCall(ArticleGroup[dgoArticleGroupIdentifier].Items[0].Guid);
					
					//do comment call
					GetSourceComment(ArticleGroup[dgoArticleGroupIdentifier].Items[0].Guid);
				}else{
					//article source id
					socialSourceID = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[dgoArticleGroupIdentifier][0].Guid;
					
					//do rating call
					starRatingHandleCall(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[dgoArticleGroupIdentifier][0].Guid);
					
					//do comment call
					GetSourceComment(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[dgoArticleGroupIdentifier][0].Guid);
				}
			});
		}
	}else{
		social_user_id = dgoGuid;
				
		if(dgoArticleGroupIdentifier.split("_")[0] != "CRYSTAL"){
			//article source id
			socialSourceID = ArticleGroup[dgoArticleGroupIdentifier].Items[0].Guid;
			
			//do rating call
			starRatingHandleCall(ArticleGroup[dgoArticleGroupIdentifier].Items[0].Guid);
			
			//do comment call
			GetSourceComment(ArticleGroup[dgoArticleGroupIdentifier].Items[0].Guid);
		}else{
			//article source id
			socialSourceID = ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[dgoArticleGroupIdentifier][0].Guid;
			
			//do rating call
			starRatingHandleCall(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[dgoArticleGroupIdentifier][0].Guid);
			
			//do comment call
			GetSourceComment(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[dgoArticleGroupIdentifier][0].Guid);
		}
	}

	if(dgoHandleForPhp == null){
		dgoHandleForPhp = 'handled';
	}
	
}

function getProductVariationFromPhp(result){
	if(result != null){
		if(result.Value != null){
			dgoColourArray = result.Value.ChildTokens[0];
		
			var colourHtml = '';

			for(var i = 0; i < dgoColourArray.ChildTokens.length;i++){	
				
				if(dgoColourArray.ChildTokens[i].SystemTokenTranslation != undefined){
					var name = dgoColourArray.ChildTokens[i].SystemTokenTranslation[0].Name.toLowerCase();
				}else{
					var name = dgoColourArray.ChildTokens[i].Token.split(":")[0].toLowerCase();
				}
				
				if(dgoColourArray.ChildTokens[i].Icon.split(":")[0] == "RGB"){
					colourHtml += '<div class="rightside-middle-content-block colour-block" title="'+dgoColourArray.ChildTokens[i].Token.split(":")[0]+'">';
					colourHtml += '<input type="hidden" class="color-name" value="'+name+'"><input type="hidden" class="color-id" value="'+dgoColourArray.ChildTokens[i].Id+'"><div style="width:20px;height:20px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius: 3px;background-image: -moz-linear-gradient(center bottom, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+' 29%, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+' 80%);background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.29, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+'), color-stop(0.80, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+'));background-image: gradient(center bottom, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+' 29%, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+' 80%);background-color:'+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+';text-align:center;color:grey;display:table-cell;vertical-align:middle;"></div><input type="hidden" id="input-color-chosen" value="'+dgoColourArray.ChildTokens[i].Token.split(":")[2]+'">';						
					colourHtml += '</div>';
				}else{
					colourHtml += '<div class="rightside-middle-content-block colour-block" title="'+dgoColourArray.ChildTokens[i].Token.split(":")[0]+'">';
					colourHtml += '<input type="hidden" class="color-name" value="'+name+'"><input type="hidden" class="color-id" value="'+dgoColourArray.ChildTokens[i].Id+'"><input type="hidden" id="input-color-chosen" value="'+dgoColourArray.ChildTokens[i].Token.split(":")[2]+'">';
					colourHtml += '<img src="'+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+'">';
					colourHtml += '</div>';
				}					
			}
			
			jQuery('.colour_content').html(colourHtml);
			if(dgoColourArray.ChildTokens.length == 1){
				jQuery('.colour-container').hide();
			}else{
				jQuery('.colour-container').show();
			}
			
			//add event for clicking colour
			EventForProductDetailsPage('Event-Colour');
						
			if(dgoArticleColor == null){
				jQuery('.colour-block:first').addClass('colour-block-selected');
				dgoArticleColor = jQuery('.colour-block-selected').children('.color-id').val();
			}else{
				jQuery('.colour-block').each(function(){
					if(dgoArticleColor == jQuery(this).children('.color-id').val()){
						jQuery(this).addClass('colour-block-selected');
					}
				})
			}
		}
	}
}

function getArticlePictureFromPhp(result){
	var imgList = '';
	//var count = 0;
	if(result != null){
		if(result.Value.length != 0){
			dgoArticleGroups = result.Value;	
			
			//show picture if it exist and add some event for slideshow
			getArticlePictureByFormat();

		}else if(result.Value.length == 0){    			
			jQuery('#loader').html( '<img src="' + web_2_print_blogInfo + 'css/img/icon/no_photo.png" style="top:0;left:0">');
			jQuery('.image-list').hide();
		}
	}else{
		jQuery('#loader').html( '<img src="' + web_2_print_blogInfo + 'css/img/icon/no_photo.png" style="top:0;left:0">');
		jQuery('.image-list').hide();
	}
	
}

function ProductDetailsGetArticleCategory(){
	//get all article
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
    
    var optionalSubPath = null;
    
    if(PortalTagString != "nhain"){
    	optionalSubPath = PortalTagString;
    }

    api.GetArticleCategory(globalLanguage, optionalSubPath,
	    function(result){
    		dgoArticleCategory = result.Value;
    	
    		//get article group
    		//getArticleGroup(null,null,null);
    });
}

function getMaterialsFromPhp(result, option){
	if(result.Order != null){
		jQuery('#article-size').val(result.Order.Article[0].Materials[0].Key);
		//Min and Max area
        maxArea = result.Order.Article[0].MaxAreaToCalculate;                   
        minArea = result.Order.Article[0].MinAreaToCalculate; 
        jQuery('#material-key').val(result.Order.Article[0].Materials[0].Key);
        var amountDropdown = '';   
		
        if(result.Order.Article[0].VolumeDiscounts.length == 0){
			if(result.Order.Article[0].Runs.length > 1){
				for(var i = 0;i < result.Order.Article[0].Runs.length;i++){			        		
					amountDropdown += '<div class="run-select"><b>' + number_format(result.Order.Article[0].Runs[i], 0) + '</b><input type="hidden" value="'+result.Order.Article[0].Runs[i]+'"></div>';
				}
			}else{
				for(var i = 1;i <= 15;i++){			        		
					amountDropdown += '<div class="run-select"><b>' + number_format(i, 0) + '</b><input type="hidden" value="'+i+'"></div>';
				}
			}
			jQuery('#amount-run-type').val("Run");
			jQuery('#runs-dropdown').css({"min-width":"63px"});
			
		}else{			
			for(var n = 0;n < result.Order.Article[0].VolumeDiscounts.length; n++){				
				if(result.Order.Article[0].VolumeDiscounts[n].Percentage != 0){
					
					for(var i = 1;i < result.Order.Article[0].VolumeDiscounts[0].Amount; i++){
						amountDropdown += '<div class="run-select"><span style="float:left;text-align:right;width:25px;padding-right:3px"><b>'+number_format(i, 0)+'</b></span><span style="float:right;width:67px">&nbsp;</span><input type="hidden" value="'+i+'"></div>';
					}
					
					var countLenght = 0;
					
					for(var i = 0;i < result.Order.Article[0].VolumeDiscounts.length; i++){
						if(countLenght < result.Order.Article[0].VolumeDiscounts[i].Amount){
							countLenght = result.Order.Article[0].VolumeDiscounts[i].Amount;
						}
						if(result.Order.Article[0].VolumeDiscounts[i].Percentage != 0){
							if(i != 0){
								if(result.Order.Article[0].VolumeDiscounts[i].Percentage == result.Order.Article[0].VolumeDiscounts[i-1].Percentage){
									amountDropdown += '<div class="run-select"><span style="float:left;text-align:right;width:25px;padding-right:3px"><b>'+number_format(result.Order.Article[0].VolumeDiscounts[i].Amount, 0)+'</b></span><span style="float:right;width:67px">&nbsp;</span><input type="hidden" value="'+result.Order.Article[0].VolumeDiscounts[i].Amount+'"></div>';
								}else{
									amountDropdown += '<div class="run-select"><span style="float:left;text-align:right;width:25px;padding-right:3px"><b>'+number_format(result.Order.Article[0].VolumeDiscounts[i].Amount, 0)+'</b></span> <span style="float:right;width:67px">(Save '+Math.round(result.Order.Article[0].VolumeDiscounts[i].Percentage * 10) / 10+' %)</span><input type="hidden" value="'+result.Order.Article[0].VolumeDiscounts[i].Amount+'"></div>';
								}
							}else{
								amountDropdown += '<div class="run-select"><span style="float:left;text-align:right;width:25px;padding-right:3px"><b>'+number_format(result.Order.Article[0].VolumeDiscounts[i].Amount, 0)+'</b></span> <span style="float:right;width:67px">(Save '+Math.round(result.Order.Article[0].VolumeDiscounts[i].Percentage * 10) / 10+' %)</span><input type="hidden" value="'+result.Order.Article[0].VolumeDiscounts[i].Amount+'"></div>';
							}
						}else{
							amountDropdown += '<div class="run-select"><span style="float:left;text-align:right;width:25px;padding-right:3px"><b>'+number_format(result.Order.Article[0].VolumeDiscounts[i].Amount, 0)+'</b></span><span style="float:right;width:67px">&nbsp;</span><input type="hidden" value="'+result.Order.Article[0].VolumeDiscounts[i].Amount+'"></div>';
						}
					}
					
					jQuery('#amount-run-type').val("Amount");
					
					if(countLenght >= 1000){
						jQuery('#runs-dropdown').css({"min-width":"100px"});
					}else if(countLenght >= 10000){
						jQuery('#runs-dropdown').css({"min-width":"105px"});
					}else if(countLenght >= 10000){
						jQuery('#runs-dropdown').css({"min-width":"110px"});
					}else if(countLenght >= 100000){
						jQuery('#runs-dropdown').css({"min-width":"115px"});
					}else if(countLenght >= 1000000){
						jQuery('#runs-dropdown').css({"min-width":"120px"});
					}else if(countLenght >= 10000000){
						jQuery('#runs-dropdown').css({"min-width":"125px"});
					}else if(countLenght >= 100000000){
						jQuery('#runs-dropdown').css({"min-width":"130px"});
					}else if(countLenght >= 1000000000){
						jQuery('#runs-dropdown').css({"min-width":"135px"});
					}else if(countLenght >= 10000000000){
						jQuery('#runs-dropdown').css({"min-width":"140px"});
					}else if(countLenght >= 100000000000){
						jQuery('#runs-dropdown').css({"min-width":"145px"});
					}
					
					break;
				}else if(n == result.Order.Article[0].VolumeDiscounts.length - 1){
					if(result.Order.Article[0].Runs.length > 1){
						for(var i = 0;i < result.Order.Article[0].Runs.length;i++){			        		
							amountDropdown += '<div class="run-select"><b>' + number_format(result.Order.Article[0].Runs[i], 0) + '</b><input type="hidden" value="'+result.Order.Article[0].Runs[i]+'"></div>';
						}
					}else{
						for(var i = 1;i <= 15;i++){			        		
							amountDropdown += '<div class="run-select"><b>' + number_format(i, 0) + '</b><input type="hidden" value="'+i+'"></div>';
						}
					}
					jQuery('#amount-run-type').val("Run");
					jQuery('#runs-dropdown').css({"min-width":"63px"});
				}
			}

			
		}		        
        
        //jQuery('.prod-details-amount-dropdown').html(amountDropdown);
        jQuery('#runs-dropdown').html(amountDropdown);

        //add event for changing run or amount
        EventForProductDetailsPage('Event-Run-Amount');
		
        if(dgoArticleRun == null){
        	jQuery('.amount-input').val(parseInt(jQuery('.run-select:first').children('input').val()));
        	dgoArticleRun = jQuery('.amount-input').val() + '_Run';		        	
        }else{
        	jQuery('.amount-input').val(parseInt(dgoArticleRun.split("_")[0]));
        }

		if(option != undefined){
			getFormat(jQuery('#article-matchcode').val(), option);
		}
	}
}

function sortFormat(FormatArray){
	var result = new Array();
	for(var i = 0;i < FormatArray.length;i++){
		if(FormatArray[i].Width != undefined){			
			for(var j = i+1;j < FormatArray.length;j++){							
				if(FormatArray[i].Area > FormatArray[j].Area){
					var tmp = {};
					tmp = FormatArray[i];
					FormatArray[i] = FormatArray[j];
					FormatArray[j] = tmp;
				}
			}
		}		
	}
	
	return FormatArray;
}

function getFormatFromPhp(result, option){
	var api = new delivergo.api(); 
	
	var available_size 	= available_size_dropdown = '';
	var count 			= 0;
	var flag 			= false;
	var maxLength		= 1;
	
	//result = sortFormat(result);
	
	for(var i = 0; i < result.length; i++){
		
		var children = result[i];
		
		var forWidth 	= children.Width;
    	var forHeight 	= children.Height;
		var forName 	= children.Name;
		var forDepth	= null;
		var forInchName = api.ConvertMm2Inch(forWidth) + ' x ' + api.ConvertMm2Inch(forHeight) + ' inch';				
		
		children.Depth = children.Depth == "" ? null : children.Depth;
		
		if(isNaN(parseInt(forName))){
			flag = true;
		}
		
		if(maxLength < forName.length){
			maxLength = forName.length;
		}
			
		if(children.Depth != null){
			forDepth 	= children.Depth;
			forInchName = api.ConvertMm2Inch(forWidth) + ' x ' + api.ConvertMm2Inch(forHeight) + ' x ' + api.ConvertMm2Inch(forDepth) +' inch';
			formats_object.push({forwidth: forWidth, forheight: forHeight, forname: forName, forinchname: forInchName, fordepth: forDepth});
			available_size += '<div class="rightside-middle-size-block" title="'+forName+'"><input type="hidden" class="size-value" value="'+i+'">'+forName+'</div>';    			
			available_size_dropdown += '<div class="size-dropdown-content-item" title="'+forName+'"><input type="hidden" class="size-value-dropdown" value="'+i+'">'+forName+'</div>';    			
		}else{
			
			var forArea = children.Area;
			
    		//forArea < minArea || 
			if(forArea > maxArea){
    			//do nothing
    		}else{    	
    			available_size += '<div class="rightside-middle-size-block" title="'+forName+'"><input type="hidden" class="size-value" value="'+count+'">'+forName+'</div>';
    			available_size_dropdown += '<div class="size-dropdown-content-item" title="'+forName+'"><input type="hidden" class="size-value-dropdown" value="'+i+'">'+forName+'</div>';
    			formats_object.push({forwidth: forWidth, forheight: forHeight, forname: forName, forinchname: forInchName, fordepth: forDepth});
    			count++;
    		}  
		}
	}

	if(result.length >= dropdownSwitchItems){
		jQuery('.available-size').hide();
		jQuery('.available-size-dropdown').show();    		
		jQuery('.size-dropdown-content').html(available_size_dropdown);
		
		//add event when changing format
		EventForProductDetailsPage('Event-Format');

		if(dgoArticleSize == null){
    		//choose the first size
			jQuery('.size-dropdown-main .size-value').val(jQuery('.size-dropdown-content-item:first .size-value-dropdown').val());
			jQuery('.size-dropdown-main-name').html(jQuery('.size-dropdown-content-item:first').attr('title'));
    	}else{
    		jQuery('.size-dropdown-content').children('.size-dropdown-content-item').each(function(){
    			if(jQuery(this).children('.size-value-dropdown').val() == dgoArticleSize.split('_')[0]){        				
    				jQuery('.size-dropdown-main .size-value').val(jQuery(this).children('.size-value-dropdown').val());
    				jQuery('.size-dropdown-main-name').html(jQuery(this).attr('title'));
    				order_price_chosen = jQuery('.size-dropdown-main .size-value').val();
    			}
    		});
    	}
		
	}else{
		//fill available sizes
    	jQuery('.available-size').html(available_size);
    	
    	if(dgoArticleSize == null){
    		//choose the first size
        	jQuery('.rightside-middle-size-block:first').addClass("content-size-selected");
    	}else{
    		jQuery('.available-size').children('.rightside-middle-size-block').each(function(){
    			if(jQuery(this).children('.size-value').val() == dgoArticleSize.split('_')[0]){        				
    				jQuery(this).addClass("content-size-selected");
    				order_price_chosen = jQuery(this).children('.size-value').val();
    			}
    		});
    	}
    	
	}

	if(flag == true){   
		if(maxLength <= 5){
			jQuery('.rightside-middle-size-block').css('width','30px');
		}else if(maxLength > 6 && maxLength < 25){
			jQuery('.rightside-middle-size-block').css('width','180px');
		}else if(maxLength >= 25){
			jQuery('.rightside-middle-size-block').css('width','320px');
		}
		
	}

	if(dgoArticleGroupIdentifier.split("_")[0] == "CRYSTAL"){
		dgoArticleSize = jQuery('.content-size-selected .size-value').val()+'_'+formats_object[jQuery('.content-size-selected .size-value').val()].forwidth+'x'+formats_object[jQuery('.content-size-selected .size-value').val()].forheight+'x'+formats_object[jQuery('.content-size-selected .size-value').val()].fordepth+'mm';
	}else{
		dgoArticleSize = jQuery('.content-size-selected .size-value').val()+'_'+formats_object[jQuery('.content-size-selected .size-value').val()].forwidth+'x'+formats_object[jQuery('.content-size-selected .size-value').val()].forheight+'mm';
	}
	
	
	//rewrite url
	//var currentUrl = getUrlVars();
		var currentUrl = '';
		
		if(dgoArticleColor != null){
			
			if(dgoTypeOfId == "A"){
				currentUrl += '#'+ dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
			}else{
				currentUrl += dgoCatInfo + '-' + dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-A' + Base62.encode(dgoArticleGroupId);
			}
			
			currentUrl +=  '-V' + Base62.encode(dgoArticleColor) + '-' + dgoArticleSize +  '-' + dgoArticleRun;
		}else{
			if(dgoTypeOfId == "A"){
				currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
			}else{
				currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
			}
			
			currentUrl += '-' + dgoArticleSize +  '-' + dgoArticleRun;
		}
		
		if(dgoArticlePic != ''){
			currentUrl += '-' + dgoArticlePic;
		}else if(jQuery('.img-cover-selected').attr('title') != undefined){
			currentUrl += '-' + jQuery('.img-cover-selected').attr('title');
		}
		
		window.location.hash = currentUrl;
	
	jQuery('.rightside-middle-size-block').click(function(){
		jQuery('.rightside-middle-size-block').removeClass('content-size-selected');
		jQuery(this).addClass('content-size-selected');
		
		if(mask_arr.length > 0){
			getMasksFromPhp('recall');
		}
		
		order_price_chosen = jQuery(this).children('.size-value').val();
		
		if(dgoArticleGroupIdentifier.split("_")[0] == "CRYSTAL"){
    		dgoArticleSize = order_price_chosen+'_'+formats_object[order_price_chosen].forwidth+'x'+formats_object[order_price_chosen].forheight+'x'+formats_object[order_price_chosen].fordepth+'mm';
    	}else{
    		dgoArticleSize = order_price_chosen+'_'+formats_object[order_price_chosen].forwidth+'x'+formats_object[order_price_chosen].forheight+'mm';
    	}
				
		//rewrite url
		//var currentUrl = getUrlVars();
			var currentUrl = '';
			
			if(dgoArticleColor != null){
    			
				if(dgoTypeOfId == "A"){
					currentUrl += '#'+ dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
				}else{
					currentUrl += dgoCatInfo + '-' + dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-A' + Base62.encode(dgoArticleGroupId);
				}
    			
    			currentUrl +=  '-V' + Base62.encode(dgoArticleColor) + '-' + dgoArticleSize +  '-' + dgoArticleRun;
    		}else{
    			if(dgoTypeOfId == "A"){
					currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
				}else{
					currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
				}
    			
    			currentUrl += '-' + dgoArticleSize +  '-' + dgoArticleRun;
    		}

			if(jQuery('.img-cover-selected').attr('title') != undefined){
				currentUrl += '-' + jQuery('.img-cover-selected').attr('title');
			}
			
			window.location.hash = currentUrl;
			jQuery('#loader').children('img').attr('src',web_2_print_blogInfo+'css/img/icon/loading.gif');
			jQuery('.image-list-content').empty();
			jQuery('#loader').children('img').css('height','40px');
			
			getArticlePictureByFormat();
			
			if(dgoArticlePrices == null){
				var imgLoading = '<img src="'+web_2_print_blogInfo+'css/img/icon/ajax-loading.gif">';
				
				jQuery('.price-start-value').html(imgLoading);
				
				//get price automatically
	        	getPrices();
			}else{
				var api = new delivergo.api(); 
				var IdSize		= jQuery('.content-size-selected .size-value').val();
    			var EndPrices 	= 0; 
    			//product price
				var sale_object = [];
				var product_min_price = 0;
				var product_min_price_vat = 0;
				var product_max_price = 0;
				var product_max_price_vat = 0;
		
				var product_price = 0;
				var product_price_vat = 0;
    			for(var i = 0;i < dgoArticlePrices[IdSize].Prices.Items.length;i++){    				
    				if(dgoArticlePrices[IdSize].Prices.Items[i] != undefined){
    					
    					if(dgoArticlePrices[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){
        					//var VATprices = (dgoArticlePrices[IdSize].Prices.Items[i].SaleNet * dgoArticlePrices[IdSize].Prices.Items[i].VatPercentage) / 100;
        					//EndPrices += dgoArticlePrices[IdSize].Prices.Items[i].SaleNet * ;
        					sale_object.push(dgoArticlePrices[IdSize].Prices.Items[i]);
        					
        					var _prices = dgoArticlePrices[IdSize].Prices.Items[i];
							product_price += _prices.SaleNet;
							product_price_vat += _prices.SaleNet + (_prices.SaleNet * _prices.VatPercentage / 100);
        				}
    					
    					var grossPrice 				= api.CalculateGrossPrice(sale_object);
    					//product_price 				= grossPrice[0].SaleNetSum;
    					//product_price_vat = grossPrice[0].SaleGrossSum;
    					
    					//show the right price
    					EndPrices = endUserPrice == "Net" ? product_price : product_price_vat;
    					
    					dgoArticlePrices[IdSize].Pictures 			= [];
    					dgoArticlePrices[IdSize].ArticleID 			= 'article_id';
    					dgoArticlePrices[IdSize].Product 			= jQuery('#article-matchcode').val();
    					dgoArticlePrices[IdSize].ArticleIdentifier 	= jQuery('#article-identifier').val();
    					dgoArticlePrices[IdSize].FormatObject 		= formats_object[order_price_chosen];
    					dgoArticlePrices[IdSize].ProductPrice 		= product_price;
    					dgoArticlePrices[IdSize].ProductPriceVAT 	= product_price_vat;

    				}
    				
    			}
    			
    			for(var i = 0;i < dgoArticlePricesMin[IdSize].Prices.Items.length;i++){    				
					if(dgoArticlePricesMin[IdSize].Prices.Items[i] != undefined){
						if(dgoArticlePricesMin[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){
							//get min price
							var _min_prices = dgoArticlePricesMin[IdSize].Prices.Items[i];
							product_min_price += _min_prices.SaleNet;
							product_min_price_vat += _min_prices.SaleNet + (_min_prices.SaleNet * _min_prices.VatPercentage / 100);
						}
					}
				}
				
				for(var i = 0;i < dgoArticlePricesMax[IdSize].Prices.Items.length;i++){    				
					if(dgoArticlePricesMax[IdSize].Prices.Items[i] != undefined){
						if(dgoArticlePricesMax[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){
							//get max price
							var _max_prices = dgoArticlePricesMax[IdSize].Prices.Items[i];
							product_max_price += _max_prices.SaleNet;
							product_max_price_vat += _max_prices.SaleNet + (_max_prices.SaleNet * _max_prices.VatPercentage / 100);
						}
					}
				}

				if(product_max_price != product_min_price && jQuery('#amount-run-type').val() != 'Run'){
    				jQuery('#cross-min-price').html(jQuery('.trans-maxpricePer').val() + ' ' + formatCurrency((endUserPrice == "Net") ? Math.round(product_max_price * 100) / 100 : Math.round(product_max_price_vat * 100) / 100 ,dgoCurrencies) + ' ' +  dgoCurrencies + '.');
    			}
				if(product_price == product_max_price){
    				jQuery('#cross-min-price').html('');
    			}
    			
    			//show the right price
				EndPrices = (endUserPrice == "Net") ? Math.round(product_price * 100) / 100 : Math.round(product_price_vat * 100) / 100;
				jQuery('#cross-start-value').val((endUserPrice == "Net") ? Math.round(product_min_price * 100) / 100 : Math.round(product_min_price_vat * 100) / 100);
				jQuery('.cross-start-value').html(formatCurrency(jQuery('#cross-start-value').val(),dgoCurrencies));
				
				if(EndPrices < parseFloat(jQuery('#cross-start-value').val()) && formatCurrency(EndPrices, dgoCurrencies).length < 8 && jQuery('#amount-run-type').val() != 'Run'){
					jQuery('.cross-start-value').show();
				}else{
					jQuery('.cross-start-value').hide();
				}
				
				//do the effect
				var _top1 = (EndPrices < parseFloat(jQuery('#price-start-value').val())) ? '-25px' : '25px';
				var _top2 = (EndPrices < parseFloat(jQuery('#price-start-value').val())) ? '25px' : '-25px';
				
				if(EndPrices != parseFloat(jQuery('#price-start-value').val())){
					jQuery('.price-start-value').animate({top: _top1}, 500, function(){
						jQuery('#price-start-value').val(EndPrices);
						
						//EndPrices = EndPrices * jQuery('.prod-details-amount-dropdown').val();
						if(jQuery('#sum-text').next('input').val() == 'einzelpreis'){
							//change cross price
							jQuery('.cross-start-value').html(formatCurrency(parseFloat(jQuery('#cross-start-value').val()) * parseInt(jQuery('.amount-input').val()), dgoCurrencies));
							EndPrices = parseFloat(EndPrices) * parseInt(jQuery('.amount-input').val());
						}
						
		    			if(endUserPrice == "Net")
		    				jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
		    			else{
		    				jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
		    				jQuery('.end-user-price-note').show();
		    			}
		    			
		    			jQuery('.price-start-value').animate({top: _top2}, 0, function(){});
						jQuery('.price-start-value').animate({top: '0px'}, 500, function(){});
						
						//price trick html
						jQuery('.price-start-value-trick').html(jQuery('.price-start-value').html());
					});
				}
			}
	});

	if(option != undefined){
		if(dgoTypeOfId == 'A'){
			if(dgoArticleGroupIdentifier.split('_')[0] == 'CRYSTAL'){
				for(var j = 0;j < ArticleGroup['CRYSTAL'].Items[dgoArticleGroupIdentifier].length;j++){
					if(ArticleGroup['CRYSTAL'].Items[dgoArticleGroupIdentifier][j].Identifier == dgoArticleIdentifier){
						getArticlePicture(ArticleGroup['CRYSTAL'].Items[dgoArticleGroupIdentifier][j].Guid);
						break;
					}
				}
			}else{
				for(var j = 0;j < ArticleGroup[dgoArticleGroupIdentifier].Items.length;j++){
					if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Identifier == dgoArticleIdentifier){
						getArticlePicture(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Guid);
						break;
					}
				}
			}
		}else{
			for(var j = 0;j < ArticleGroup[dgoArticleGroupIdentifier].Items.length;j++){
				if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Identifier == dgoArticleIdentifier){
					getArticlePicture(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Guid);
					break;
				}
			}
		}
		
		//get prices back
		getPrices(option);
	}
}
	
function getPricesFromPhp(_option, api){
	
	if(api == undefined){
		var api = new delivergo.api(); 
	}
	
	var IdSize		= jQuery('.content-size-selected .size-value').val();
	var EndPrices 	= 0; 
	//product price
	var sale_object = [];
	var product_min_price 		= 0;
	var product_min_price_vat 	= 0;
	var product_max_price 		= 0;
	var product_max_price_vat 	= 0;

	var product_price 		= 0;
	var product_price_vat 	= 0;
	
	//show summe text
	if(dgoArticlePrices[IdSize].Amount > 1 || dgoArticlePrices[IdSize].Run > 1){
		jQuery('#sum-price-change').show();
		jQuery('.price-description').css({'margin-top': '7px'});
	}else{
		jQuery('#sum-price-change').hide();
		if(jQuery('#cross-start-value').val() == ''){
			jQuery('.price-description').css({'margin-top': '0px'});
		}
	}
	
	for(var i = 0;i < dgoArticlePrices[IdSize].Prices.Items.length;i++){    				
		if(dgoArticlePrices[IdSize].Prices.Items[i] != undefined){
			
			if(dgoArticlePrices[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){				
				sale_object.push(dgoArticlePrices[IdSize].Prices.Items[i]);
				
				var _prices 		= dgoArticlePrices[IdSize].Prices.Items[i];
				
				product_price 		+= _prices.SaleNet;
				product_price_vat 	+= _prices.SaleNet + (_prices.SaleNet * _prices.VatPercentage / 100);
			}
			
			var grossPrice 			= api.CalculateGrossPrice(sale_object);
			
			//show the right price
			EndPrices = endUserPrice == "Net" ? product_price : product_price_vat;
			
			dgoArticlePrices[IdSize].Pictures 			= [];
			dgoArticlePrices[IdSize].ArticleID 			= 'article_id';
			dgoArticlePrices[IdSize].Product 			= jQuery('#article-matchcode').val();
			dgoArticlePrices[IdSize].ArticleIdentifier 	= jQuery('#article-identifier').val();
			dgoArticlePrices[IdSize].FormatObject 		= formats_object[order_price_chosen];
			dgoArticlePrices[IdSize].ProductPrice 		= product_price;
			dgoArticlePrices[IdSize].ProductPriceVAT 	= product_price_vat;
		}
	}
	
	//show the right price
	EndPrices = (endUserPrice == "Net") ? Math.round(product_price * 100) / 100 : Math.round(product_price_vat * 100) / 100;				
	
	//change min & max price
	if(_option != undefined && (_option == 'currencyChange' || _option == 'ArticleGroup') && dgoArticlePrices[0].VolumeDiscounts.length > 0){
		//change min price and max price
		if(jQuery('#amount-run-type').val() == 'Amount'){
			//get min price
			var _articles = api.Request.Order.Article;
			for(var j = 0; j < _articles.length; j++){
				_articles[j].Amount = 1;
			}
			api.Calculate(function(result){
				//cal min price
				dgoArticlePricesMin = result.Order.Article;
				
				for(var i = 0;i < dgoArticlePricesMin[IdSize].Prices.Items.length;i++){    				
					if(dgoArticlePricesMin[IdSize].Prices.Items[i] != undefined){
						if(dgoArticlePricesMin[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){
							//get min price
							var _min_prices = dgoArticlePricesMin[IdSize].Prices.Items[i];
							product_min_price += _min_prices.SaleNet;
							product_min_price_vat += _min_prices.SaleNet + (_min_prices.SaleNet * _min_prices.VatPercentage / 100);
						}
					}
				}
				
				//get max price
				if(dgoArticlePrices[0].VolumeDiscounts.length > 0){
					for(var k = 0; k < _articles.length; k++){
						_articles[k].Amount = parseInt(dgoArticlePrices[0].VolumeDiscounts[dgoArticlePrices[0].VolumeDiscounts.length - 1].Amount);
					}
					
					//cal max price
					api.Calculate(function(result){
						dgoArticlePricesMax = result.Order.Article;
						
						for(var i = 0;i < dgoArticlePricesMax[IdSize].Prices.Items.length;i++){    				
							if(dgoArticlePricesMax[IdSize].Prices.Items[i] != undefined){
								if(dgoArticlePricesMax[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){
									//get max price
									var _max_prices = dgoArticlePricesMax[IdSize].Prices.Items[i];
									product_max_price += _max_prices.SaleNet;
									product_max_price_vat += _max_prices.SaleNet + (_max_prices.SaleNet * _max_prices.VatPercentage / 100);
								}
							}
						}
						
						if(product_max_price != product_min_price && jQuery('#amount-run-type').val() != 'Run'){
							jQuery('#cross-min-price').html(jQuery('.trans-maxpricePer').val() + ' ' + formatCurrency((endUserPrice == "Net") ? Math.round(product_max_price * 100) / 100 : Math.round(product_max_price_vat * 100) / 100 ,dgoCurrencies) + ' ' +  dgoCurrencies + '.');
						}					    			
						if(product_price == product_max_price){
							jQuery('#cross-min-price').html('');
						}					    			
						
						jQuery('#cross-start-value').val((endUserPrice == "Net") ? Math.round(product_min_price * 100) / 100 : Math.round(product_min_price_vat * 100) / 100);
						jQuery('.cross-start-value').html(formatCurrency(jQuery('#cross-start-value').val(),dgoCurrencies));
						
						//do the effect
						var _top1 = (EndPrices < parseFloat(jQuery('#price-start-value').val())) ? '-25px' : '25px';
						var _top2 = (EndPrices < parseFloat(jQuery('#price-start-value').val())) ? '25px' : '-25px';
						
						if(EndPrices != parseFloat(jQuery('#price-start-value').val()) || 1 == 1){ //jQuery('#sum-text').next('input').val() == 'einzelpreis'
							jQuery('.price-start-value').animate({top: _top1}, 500, function(){
								if(EndPrices < parseFloat(jQuery('#cross-start-value').val()) && formatCurrency(EndPrices, dgoCurrencies).length < 8 && jQuery('#amount-run-type').val() != 'Run'){
									jQuery('.cross-start-value').show();
								}else{
									jQuery('.cross-start-value').hide();
								}
								
								jQuery('#price-start-value').val(EndPrices);
								
								//EndPrices = EndPrices * jQuery('.prod-details-amount-dropdown').val();
								if(jQuery('#sum-text').next('input').val() == 'einzelpreis'){
									//change cross price
									jQuery('.cross-start-value').html(formatCurrency(parseFloat(jQuery('#cross-start-value').val()) * parseInt(jQuery('.amount-input').val()), dgoCurrencies));
									EndPrices = parseFloat(EndPrices) * parseInt(jQuery('.amount-input').val());
								}
								
								if(endUserPrice == "Net")
									jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
								else{
									jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
									jQuery('.end-user-price-note').show();
								}
								
								//price trick html
								jQuery('.price-start-value-trick').html(jQuery('.price-start-value').html());
								
								jQuery('.price-start-value').animate({top: _top2}, 0, function(){});
								jQuery('.price-start-value').animate({top: '0px'}, 500, function(){});
							});
						}
						
						//if we have product preview we should change preview object
						if(jQuery('.img-cover-mask-selected').length == 1){
							var _handle = jQuery('.img-cover-mask-selected').children('input').val();
							eval('img' + _handle).PriceObject = result.Order.Article[0];
							
							jQuery('#pro-detail-preview-overlay').hide();
						}
					}, true);
				}
			}, true);
		}
	}else{
		for(var i = 0;i < dgoArticlePricesMin[IdSize].Prices.Items.length;i++){    				
			if(dgoArticlePricesMin[IdSize].Prices.Items[i] != undefined){
				if(dgoArticlePricesMin[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){
					//get min price
					var _min_prices = dgoArticlePricesMin[IdSize].Prices.Items[i];
					product_min_price += _min_prices.SaleNet;
					product_min_price_vat += _min_prices.SaleNet + (_min_prices.SaleNet * _min_prices.VatPercentage / 100);
				}
			}
		}
		
		for(var i = 0;i < dgoArticlePricesMax[IdSize].Prices.Items.length;i++){    				
			if(dgoArticlePricesMax[IdSize].Prices.Items[i] != undefined){
				if(dgoArticlePricesMax[IdSize].Prices.Items[i].Type.split("|")[0] != "Shipment"){
					//get max price
					var _max_prices = dgoArticlePricesMax[IdSize].Prices.Items[i];
					product_max_price += _max_prices.SaleNet;
					product_max_price_vat += _max_prices.SaleNet + (_max_prices.SaleNet * _max_prices.VatPercentage / 100);
				}
			}
		}
		
		if(product_max_price != product_min_price && jQuery('#amount-run-type').val() != 'Run'){
			jQuery('#cross-min-price').html(jQuery('.trans-maxpricePer').val() + ' ' + formatCurrency((endUserPrice == "Net") ? Math.round(product_max_price * 100) / 100 : Math.round(product_max_price_vat * 100) / 100 ,dgoCurrencies) + ' ' +  dgoCurrencies + '.');
		}
		if(product_price == product_max_price){
			jQuery('#cross-min-price').html('');
		}
		
		//do the effect
		var _top1 = (EndPrices < parseFloat(jQuery('#price-start-value').val())) ? '-25px' : '25px';
		var _top2 = (EndPrices < parseFloat(jQuery('#price-start-value').val())) ? '25px' : '-25px';
		
		if(EndPrices != parseFloat(jQuery('#price-start-value').val()) || 1 == 1){ //jQuery('#sum-text').next('input').val() == 'einzelpreis'
			jQuery('.price-start-value').animate({top: _top1}, 500, function(){
				if(EndPrices < parseFloat(jQuery('#cross-start-value').val()) && formatCurrency(EndPrices, dgoCurrencies).length < 8 && jQuery('#amount-run-type').val() != 'Run'){
					jQuery('.cross-start-value').show();
				}else{
					jQuery('.cross-start-value').hide();
				}
				
				jQuery('#price-start-value').val(EndPrices);
				
				//EndPrices = EndPrices * jQuery('.prod-details-amount-dropdown').val();
				if(jQuery('#sum-text').next('input').val() == 'einzelpreis'){
					//change cross price
					jQuery('.cross-start-value').html(formatCurrency(parseFloat(jQuery('#cross-start-value').val()) * parseInt(jQuery('.amount-input').val()), dgoCurrencies));
					EndPrices = parseFloat(EndPrices) * parseInt(jQuery('.amount-input').val());
				}
				
				if(endUserPrice == "Net")
					jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
				else{
					jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
					jQuery('.end-user-price-note').show();
				}
				
				//price trick html
				jQuery('.price-start-value-trick').html(jQuery('.price-start-value').html());
				
				jQuery('.price-start-value').animate({top: _top2}, 0, function(){});
				jQuery('.price-start-value').animate({top: '0px'}, 500, function(){});
			});
		}
	}	
}

/*Edit by Henry*/
//get min price from PHP
function getMinPricesFromPhp(result){
	if(result.Order.Article[0].VolumeDiscounts.length > 0){
		var _priceNet = 0;
		var _priceGross = 0;
		var _prices = result.Order.Article[0].Prices.Items;
		
		for(var i = 0; i < _prices.length; i++){
			if(_prices[i].Type.split("|")[0] != "Shipment"){
				_priceNet += _prices[i].SaleNet;
				_priceGross += _prices[i].SaleNet + (_prices[i].SaleNet * _prices[i].VatPercentage / 100);
			}
		}
		
		var _price = (endUserPrice != "Net") ? Math.round(_priceGross * 100) / 100 : Math.round(_priceNet * 100) / 100;
		jQuery('.cross-start-value').html(formatCurrency(_price,dgoCurrencies));
		jQuery('#cross-start-value').val(_price);	
	}
}
//get max price from PHP
function getMaxPricesFromPhp(result){
	if(result.Order.Article[0].VolumeDiscounts.length > 0){
		jQuery('#sum-text').html('Summe');
	}else{
		jQuery('#sum-text').html('Summe');
	}
}

//calculate new size, regarding the image ratio
function scaleSize(maxW, maxH, currW, currH){
    var ratio = currH / currW;

    if(currW >= maxW && ratio <= 1) { //landscape format
        currW = maxW;
        currH = currW * ratio;
    } else if (currH >= maxH) { //portrait format
        currH = maxH;
        currW = currH / ratio;
    }
    return [currW, currH];
}

//function sort subtype by size
function SortSubtypeBySize(Arr){
	for(var i in Arr){
		if(Arr[i].Name != undefined){
			if(Arr[i].Items.length > 1){
				for(var j = 0;j < Arr[i].Items.length;j++){
					var size_j = Arr[i].Items[j].PageLengthOpen * Arr[i].Items[j].PageWidthOpen;
						size_j = Arr[i].Items[j].PageDepthOpen == null ? size_j : size_j * Arr[i].Items[j].PageDepthOpen;
					
					for(var k = j+1;k < Arr[i].Items.length;k++){
						var size_k = Arr[i].Items[k].PageLengthOpen * Arr[i].Items[k].PageWidthOpen;
							size_k = Arr[i].Items[k].PageDepthOpen == null ? size_k : size_k * Arr[i].Items[k].PageDepthOpen;
						
							if(size_k < size_j){
							var tmp = {};
							tmp = Arr[i].Items[k];
							Arr[i].Items[k] = Arr[i].Items[j];
							Arr[i].Items[j] = tmp;  
						}
					}
				}
			}
		}
	}
	
	return Arr;
}

//function to decentrate article group
function ArticleDecentralization(Arr){
	var newArr = [];
	for(var i in Arr){
		if(newArr[Arr[i].ArticleGroupIdentifier] == undefined){
			//with crystal, we have to hardcode
			if(Arr[i].ArticleGroupIdentifier.split("_")[0] == "CRYSTAL"){
				if(newArr["CRYSTAL"] == undefined){
					newArr["CRYSTAL"] = {};
					newArr["CRYSTAL"].Name = "Crystal";
					newArr["CRYSTAL"].Items = [];
				}
				
				if(newArr["CRYSTAL"].Items[Arr[i].ArticleGroupIdentifier] == undefined){
					newArr["CRYSTAL"].Items[Arr[i].ArticleGroupIdentifier] = [];
				}
				
				newArr["CRYSTAL"].Items[Arr[i].ArticleGroupIdentifier].push(Arr[i]);
				
			}else{
				newArr[Arr[i].ArticleGroupIdentifier] 		= {};
				newArr[Arr[i].ArticleGroupIdentifier].Name 	= Arr[i].Matchcode.split("/")[0];
				newArr[Arr[i].ArticleGroupIdentifier].Items = [];
				newArr[Arr[i].ArticleGroupIdentifier].Items.push(Arr[i]);
			}

		}else{
			newArr[Arr[i].ArticleGroupIdentifier].Items.push(Arr[i]);
		}

	}
	
	return newArr;
}



function ProductDetailsGetCurrenciesFromPhp(result){
	var dropdown = '';
	for(var i=0;i < result.Value.length;i++){
		if(result.Value[i].Key == dgoCurrencies){
			dropdown += "<option selected>"+result.Value[i].Key+"</option>";
		}else{
			dropdown += "<option>"+result.Value[i].Key+"</option>";
		}
	}
	jQuery('.prod-details-currency-dropdown').html(dropdown);
}

//function get timezone
function ProductDetailsGetCurrencies(){
	var api = new delivergo.api();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //change portal for nhain.vn
	api.PortalNameSpace = globalPortal; 
	
	api.IsDev = globalIsDev;
    
    api.GetCurrencies('EN', function(result){
    	var dropdown = '';
    	for(var i=0;i < result.Value.length;i++){
    		if(result.Value[i].Key == dgoCurrencies){
    			dropdown += "<option selected>"+result.Value[i].Key+"</option>";
    		}else{
    			dropdown += "<option>"+result.Value[i].Key+"</option>";
    		}
    		
    	}
    	
    	jQuery('.prod-details-currency-dropdown').html(dropdown);
    }, true);
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

//function get article from api
function getArticleGroup(identifierGroup, options, identifier){
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
    		dgoArticleGroupArray = result.Value;

    		getArticleGroupFromPhp(dgoArticleGroupArray, identifierGroup, options, identifier);
    	}
    );
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    };     
}

function getProductVariation(matchcode, ArticleGuid){
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
	
	matchcode = (matchcode == undefined || matchcode == null) ?  jQuery('#article-matchcode').val() : matchcode;
	
	api.GetProductVariation(PortalToken, matchcode, globalLanguage, 
		function(result){
			
			if(result.Value != null){
				dgoColourArray = result.Value.ChildTokens[0];
				
				var colourHtml = '';

				for(var i = 0; i < dgoColourArray.ChildTokens.length;i++){
					
					if(dgoColourArray.ChildTokens[i].Icon.split(":")[0] == "RGB"){
						colourHtml += '<div class="rightside-middle-content-block colour-block" title="'+dgoColourArray.ChildTokens[i].Token.split(":")[0]+'">';
						colourHtml += '<div style="width:20px;height:20px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius: 3px;background-image: -moz-linear-gradient(center bottom, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+' 29%, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+' 80%);background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.29, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+'), color-stop(0.80, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+'));background-image: gradient(center bottom, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+' 29%, '+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+' 80%);background-color:'+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+';text-align:center;color:grey;display:table-cell;vertical-align:middle;"></div><input type="hidden" id="input-color-chosen" value="'+dgoColourArray.ChildTokens[i].Token.split(":")[2]+'">';						
						colourHtml += '</div>';
					}else{
						colourHtml += '<div class="rightside-middle-content-block colour-block" title="'+dgoColourArray.ChildTokens[i].Token.split(":")[0]+'">';
						colourHtml += '<input type="hidden" id="input-color-chosen" value="'+dgoColourArray.ChildTokens[i].Token.split(":")[2]+'">';
						colourHtml += '<img src="'+dgoColourArray.ChildTokens[i].Icon.split(":")[1]+'">';
						colourHtml += '</div>';
					}					
				}
				
				jQuery('.colour_content').html(colourHtml);
				
				if(dgoColourArray.ChildTokens.length == 1){
					jQuery('.colour-container').hide();
				}else{
					jQuery('.colour-container').show();
				}
				
				//add event for clicking colour
				EventForProductDetailsPage('Event-Colour');
				
				jQuery('.colour-block:first').addClass('colour-block-selected');

			}else{
				
				jQuery('.colour-container .colour_content').empty();
				jQuery('.colour-container').hide();
			}
			
			//get materials
			getMaterials(jQuery('.content-size-selected .subtypes-identifer').val(), 'ArticleGroup');
			
	})
}

function getColorMatchProduct(){
	dgoCount = 0;
	jQuery.each(dgoArticleGroups, function (i, v) {		
	    if(v.Type.split(":")[0] == "standard" && v.Type.split(":")[2] == jQuery('.colour-block-selected #input-color-chosen').val()){
	        var imagesource = v.Uri;
	        var tmpImg = new Image(); //create temporary image                          
	            tmpImg.onload = function () { //set onload handler. IMPORTANT: set it first, after that, set src parameter!!!!!!
	                var size = scaleSize(40, 40, this.width, this.height);                             
	                
	                jQuery('.image-list-content').prepend('<div><a class="img-cover" title="Pic_'+Base62.encode(v.Id)+'" hash="javascript:void(0)"><img alt="Picture" style="width:' + size[0] + 'px;height:' + size[1] + 'px" src="' + v.ThumbnailUri + '" bigthumb="' + imagesource + '"></a></div>');
	                
	                jQuery('.img-cover').hover(
                	
	                	function(){
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
        						
        						if(dgoTypeOfId == "A"){
    								currentUrl += '#'+ dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId) + '-V' + Base62.encode(dgoArticleColor);
    							}else{
    								currentUrl += dgoCatInfo + '-' + dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-A' + Base62.encode(dgoArticleGroupId) + '-V' + Base62.encode(dgoArticleColor);
    							}

        						if(dgoArticleSize != null){
        							currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun + '-' + jQuery('.img-cover-selected').attr('title');
        						}
        						
        						window.location.hash = currentUrl;

                		},
                		function(){
                			
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
                		
                		jQuery("#loader").attr("href",jQuery('.img-cover-selected').children('img').attr('bigthumb'));
                		
                		//rewrite url
    					//var currentUrl = getUrlVars();
    						var currentUrl = '';
    						
    						if(dgoTypeOfId == "A"){
								currentUrl += '#'+ dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId) + '-V' + Base62.encode(dgoArticleColor);
							}else{
								currentUrl += dgoCatInfo + '-' + dgoArticleName + '_' + jQuery('.colour-block-selected .color-name').val() + '-A' + Base62.encode(dgoArticleGroupId) + '-V' + Base62.encode(dgoArticleColor);
							}
    						
    						if(dgoArticleSize != null){
    							currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun + '-' + jQuery(this).attr('title');
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
	        					
	        					if(dgoTypeOfId == "A"){
    								currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
    							}else{
    								currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
    							}
	        					
        						if(dgoArticleSize != null){
        							currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun;
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
	            dgoCount++;
	                			           
	    /*Mask stuff*/
		}else if(v.Type.split(":")[0] == "mask" || v.Type.split(":")[0].split("$")[0] == 'submask'){
				mask_arr.push(v);   			    		
		}
	});
	
	if(dgoCount == 0){
		jQuery('#loader').html( '<img src="' + web_2_print_blogInfo + 'css/img/icon/no_photo.png" style="top:0;left:0">');
		jQuery('.image-list').hide();
	}else{
		jQuery('.image-list').show();
		//light box ;)
		jQuery(function(){
			jQuery("#loader").attr("href",jQuery('.img-cover-selected').children('img').attr('bigthumb'));
			jQuery("#loader").prettyPhoto({animation_speed:'fast',slideshow:3000, autoplay_slideshow: false,theme:"facebook"});
		});
		
		
		//show arrow icon or not
		jQuery('.image-list').hover(function(){
			//show icon
			if(dgoCount/6 > 1){
				jQuery('.left-narrow-small').css({"visibility":"visible"});
				jQuery('.right-narrow-small').css({"visibility":"visible"});
			}
		},function(){
				//hide icon
				jQuery('.left-narrow-small').css({"visibility":"hidden"});
				jQuery('.right-narrow-small').css({"visibility":"hidden"});
		});
		
		jQuery('.image-list-content').css({"width":dgoArticleGroups.length*200});
		
		//event for slider
		jQuery( "#slider-wrap" ).slider({    			
			orientation: 'horizontal',
			min: 0,
			max: dgoCount - 6,    			
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
			
			if(Math.round(dgoCount/6) <= sliderVal){
				sliderVal -= 1;//increment the current value

    			jQuery('#slider-wrap').slider("value", sliderVal);//and set the new value of the slider
			}    	    			

		});
		
		//event on right arrow icon
		jQuery('.right-narrow-small').click(function(){
			var sliderVal = jQuery('#slider-wrap').slider("value");//read current value of the slider
			
			if(Math.round(dgoCount/6) >= sliderVal){
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
				jQuery('.image-list-content div:last').children('.img-cover').addClass('img-cover-selected');
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
				jQuery('.image-list-content div:first').children('.img-cover').addClass('img-cover-selected');
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
			var currentUrl = '';
			
			if(dgoTypeOfId == "A"){
				currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
			}else{
				currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
			}
			
			if(dgoArticleSize != null){
				currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun;
			}
			
			dgoArticlePic = jQuery('.img-cover-selected').attr('title');
			
			window.location.hash = currentUrl + '-' + dgoArticlePic;
	});
}

function getMaterials(identifier, option){
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
				  	
				  	if(jQuery('.colour-block-selected #input-color-chosen').val() != undefined){
				  		article.Material  = jQuery('.colour-block-selected #input-color-chosen').val();
				  	}else{
				  		article.Material = jQuery('#material-key').val();
				  	}

				  	article.NumberColorsBack 	= ArticleGroup[dgoArticleGroupIdentifier].Items[j].NumberColorsBack;        
	                article.NumberColorsFront 	= ArticleGroup[dgoArticleGroupIdentifier].Items[j].NumberColorsFront; 
				  					  	
				}	     				
			}else{
				if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Identifier == identifier){
					
					//add article
    				api.AddArticle(resaleGuidUser, ArticleGroup[dgoArticleGroupIdentifier].Items[j].Matchcode, ArticleGroup[dgoArticleGroupIdentifier].Items[j].Identifier, globalLanguage);
			  		
    				var article = api.GetArticle(0);
    				
    				if(jQuery('.colour-block-selected #input-color-chosen').val() != undefined){
				  		article.Material  = jQuery('.colour-block-selected #input-color-chosen').val();
				  	}else{
				  		article.Material = jQuery('#material-key').val();
				  	}
    				
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
				  	article.Material = jQuery('.colour-block-selected #input-color-chosen').val();
				  	
				  	article.NumberColorsBack 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].NumberColorsBack;        
	                article.NumberColorsFront 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].NumberColorsFront; 
				  					  	
				}	     				
			}else{
				if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].Identifier == identifier){
					
					//add article
    				api.AddArticle(resaleGuidUser, ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].Matchcode, ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].Identifier, globalLanguage);
			  		
    				var article = api.GetArticle(0);
    				article.Material = jQuery('.colour-block-selected #input-color-chosen').val();
    				article.NumberColorsBack 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].NumberColorsBack;        
                    article.NumberColorsFront 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[article_group_identifier][j].NumberColorsFront; 
    				
				}
			}
    	}

    }
    
	//get material
	api.GetMaterials(
		function(result){
			getMaterialsFromPhp(result, option);			
		}, true);
}

function getFormat(matchCode, option){
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
    	
    	dgoFormatArray = result.Value = sortFormat(result.Value);
    	
    	getFormatFromPhp(result.Value, option);
		
    }, globalLanguage, format_endpoint );
    
    api.OnError = function(error) {
      api.Log(error);
      
    };
            
    api.OnWarning = function(warning) {
      api.Log(warning.Text);
    }; 
}

function getPrices(_option){
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
    	if(jQuery('.colour-block-selected #input-color-chosen').val() != undefined){
    		article.Material = jQuery('.colour-block-selected #input-color-chosen').val();
    	}else{
    		article.Material = jQuery('#material-key').val();
    	}

        //set dimension
        article.PageLengthOpen 		= parseInt(formats_object[i].forheight);
        article.PageWidthOpen 		= parseInt(formats_object[i].forwidth);        
        
        if(dgoArticleGroupIdentifier.split("_")[0] != "CRYSTAL"){
        	for(var j in ArticleGroup[dgoArticleGroupIdentifier].Items){
            	if(ArticleGroup[dgoArticleGroupIdentifier].Items[j].Identifier == jQuery('#article-identifier').val()){
            		article.NumberColorsBack 	= ArticleGroup[dgoArticleGroupIdentifier].Items[j].NumberColorsBack;        
                    article.NumberColorsFront 	= ArticleGroup[dgoArticleGroupIdentifier].Items[j].NumberColorsFront;                   
                    if(jQuery('#amount-run-type').val() == "Run"){                	
                    	//article.Run = jQuery('.amount-input').val() * 1;
                    	article.Run = parseInt(jQuery('.amount-input').val());
                    }else{
                    	article.Amount = parseInt(jQuery('.amount-input').val());
                    }
                    
            	}
            }
        }else{
        	for(var j in ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()]){
            	if(ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].Identifier == jQuery('#article-identifier').val()){
            		article.NumberColorsBack 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].NumberColorsBack;        
                    article.NumberColorsFront 	= ArticleGroup[dgoArticleGroupIdentifier.split("_")[0]].Items[jQuery('.article-block-selected').children('.article-group-identifer').val()][j].NumberColorsFront;                   
                    if(jQuery('#amount-run-type').val() == "Run"){                	
                    	//article.Run = jQuery('.amount-input').val() * 1;
                    	article.Run = parseInt(jQuery('.amount-input').val());
                    }else{
                    	article.Amount = parseInt(jQuery('.amount-input').val());
                    }
                   
            	}
            }
        }	
        

        if(formats_object[i].fordepth != null){
        	article.PageDepthOpen = parseInt(formats_object[i].fordepth);
        }
    }   
    
    if(jQuery('.img-cover-mask-selected').length == 1){
    	jQuery('#pro-detail-preview-overlay').show();
    }
    
    // get price from api
    api.Calculate(
    	function(result){
    		jQuery.unblockUI();
    		
    		if(result.Order != undefined){
    			dgoArticlePrices = global_price_object = result.Order.Article;
    			
				getPricesFromPhp(_option, api);
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

function getArticlePictureByFormat(){
	var id_color_selected = dgoArticleSize == null ? 0 : dgoArticleSize.charAt(0) * 1;
	dgoCount = 0;
	if(dgoArticleGroups != null){
		if(dgoColourArray == null){
			jQuery.each(dgoArticleGroups, function (i, v) { 				
				depthBoolean = (dgoFormatArray[id_color_selected].Depth != null && dgoFormatArray[id_color_selected].Depth != '') ? (dgoFormatArray[id_color_selected].Depth == v.Type.split(":")[3].split("_")[3]) : true;												
				if(v.Type.split(":")[0] == "standard" && ((v.Type.split(":")[3].split("_")[2] == dgoFormatArray[id_color_selected].Height && v.Type.split(":")[3].split("_")[1] == dgoFormatArray[id_color_selected].Width && depthBoolean) || v.Type.split(":")[3] == "all")){										
					var imagesource = v.Uri;
					var tmpImg = new Image(); //create temporary image                          
						tmpImg.onload = function () { //set onload handler. IMPORTANT: set it first, after that, set src parameter!!!!!!
							var size = scaleSize(40, 40, this.width, this.height);                             
							
							jQuery('.image-list-content').prepend('<div><a class="img-cover" title="Pic_'+Base62.encode(v.Id)+'" hash="javascript:void(0)"><img alt="Picture" style="width:' + size[0] + 'px;height:' + size[1] + 'px" src="' + v.ThumbnailUri + '" bigthumb="' + imagesource + '"></div>');
							
							jQuery('.img-cover').hover(
							
								function(){
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
										
										if(dgoTypeOfId == "A"){
											currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
										}else{
											currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
										}
										
										if(dgoArticleSize != null){
											currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun + '-' + jQuery('.img-cover-selected').attr('title');
										}
										
										window.location.hash = currentUrl;
		
								},
								function(){
									
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
								
								jQuery("#loader").attr("href",jQuery('.img-cover-selected').children('img').attr('bigthumb'));
								
								//rewrite url
								//var currentUrl = getUrlVars();
									var currentUrl = '';
									
									if(dgoTypeOfId == "A"){
										currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
									}else{
										currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
									}
									
									if(dgoArticleSize != null){
										currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun + '-' + jQuery(this).attr('title');
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
										
										if(dgoTypeOfId == "A"){
											currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
										}else{
											currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
										}
										
										if(dgoArticleSize != null){
											currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun;
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
						dgoCount++;
												   
				}else if(v.Type.split(":")[0] == "2d"){
																		   
						jQuery('#reel-container img').attr({"src":v.Uri});
						
						jQuery('.image-list-content').prepend('<div><a class="img-cover" title="Pic_'+Base62.encode(v.Id)+'" id="images-reel-effect" hash="javascript:void(0)"><img alt="Picture" style="width:40px;height:40px" src="' + web_2_print_blogInfo + 'css/img/icon/BrowserPreview.gif"></div>');
		
						dgoCount++;
						
				/*Mask stuff*/
				}else if(v.Type.split(":")[0] == "mask" || v.Type.split(":")[0].split("$")[0] == 'submask'){
						mask_arr.push(v);   			    		
				}else if(i == dgoArticleGroups.length - 1 && dgoCount == 0){
					jQuery('#loader').html( '<img src="' + web_2_print_blogInfo + 'css/img/icon/no_photo.png" style="top:0;left:0">');
					jQuery('.image-list').hide();
				}
			});
		}else{
			jQuery.each(dgoArticleGroups, function (i, v) {    
				depthBoolean = (dgoFormatArray[id_color_selected].Depth != null && dgoFormatArray[id_color_selected].Depth != '') ? (dgoFormatArray[id_color_selected].Depth == v.Type.split(":")[3].split("_")[3]) : true;				
				if(v.Type.split(":")[0] == "standard" && v.Type.split(":")[2] == jQuery('.colour-block-selected #input-color-chosen').val() && ((v.Type.split(":")[3].split("_")[2] == dgoFormatArray[id_color_selected].Height && v.Type.split(":")[3].split("_")[1] == dgoFormatArray[id_color_selected].Width && depthBoolean) || v.Type.split(":")[3] == "all")){
					
					var imagesource = v.Uri;
					var tmpImg = new Image(); //create temporary image                          
						tmpImg.onload = function () { //set onload handler. IMPORTANT: set it first, after that, set src parameter!!!!!!
							var size = scaleSize(40, 40, this.width, this.height);                             
							
							jQuery('.image-list-content').prepend('<div><a class="img-cover" title="Pic_'+Base62.encode(v.Id)+'" hash="javascript:void(0)"><img alt="Picture" style="width:' + size[0] + 'px;height:' + size[1] + 'px" src="' + v.ThumbnailUri + '" bigthumb="' + imagesource + '"></div>');
							
							jQuery('.img-cover').hover(
							
								function(){
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
										
										if(dgoTypeOfId == "A"){
											currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
										}else{
											currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
										}
										
										if(dgoArticleSize != null){
											currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun + '-' + jQuery('.img-cover-selected').attr('title');
										}
										
										window.location.hash = currentUrl;
		
								},
								function(){
									
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
								
								jQuery("#loader").attr("href",jQuery('.img-cover-selected').children('img').attr('bigthumb'));
								
								//rewrite url
								//var currentUrl = getUrlVars();
									var currentUrl = '';
									
									if(dgoTypeOfId == "A"){
										currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
									}else{
										currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
									}
									
									if(dgoArticleSize != null){
										currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun + '-' + jQuery(this).attr('title');
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
										
										if(dgoTypeOfId == "A"){
											currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
										}else{
											currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
										}
										
										if(dgoArticleSize != null){
											currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun;
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
						dgoCount++;
												   
				}else if(v.Type.split(":")[0] == "2d"){
																		   
						jQuery('#reel-container img').attr({"src":v.Uri});
						
						jQuery('.image-list-content').prepend('<div><a class="img-cover" title="Pic_'+Base62.encode(v.Id)+'" id="images-reel-effect" hash="javascript:void(0)"><img alt="Picture" style="width:40px;height:40px" src="' + web_2_print_blogInfo + 'css/img/icon/BrowserPreview.gif"></div>');
		
						dgoCount++;
						
				/*Mask stuff*/
				}else if(v.Type.split(":")[0] == "mask" || v.Type.split(":")[0].split("$")[0] == 'submask'){
						mask_arr.push(v);   			    		
				}else if(i == dgoArticleGroups.length - 1 && dgoCount == 0){
					jQuery('#loader').html( '<img src="' + web_2_print_blogInfo + 'css/img/icon/no_photo.png" style="top:0;left:0">');
					jQuery('.image-list').hide();
				}
			});
		}
		
		/*===================================================================================================*/			
			if(dgoCount == 0){
				jQuery('#loader').html( '<img src="' + web_2_print_blogInfo + 'css/img/icon/no_photo.png" style="top:0;left:0">');
				jQuery('.image-list').hide();
			}else{
				jQuery('.image-list').show();
				//light box ;)
				jQuery(function(){
					jQuery("#loader").attr("href",jQuery('.img-cover-selected').children('img').attr('bigthumb'));
					jQuery("#loader").prettyPhoto({animation_speed:'fast',slideshow:3000, autoplay_slideshow: false,theme:"facebook"});
				});
				
				
				//show arrow icon or not
				jQuery('.image-list').hover(function(){
					//show icon
					if(dgoCount/6 > 1){
						jQuery('.left-narrow-small').css({"visibility":"visible"});
						jQuery('.right-narrow-small').css({"visibility":"visible"});
					}
				},function(){
						//hide icon
						jQuery('.left-narrow-small').css({"visibility":"hidden"});
						jQuery('.right-narrow-small').css({"visibility":"hidden"});
				});
				
				jQuery('.image-list-content').css({"width":dgoArticleGroups.length*200});
				
				//event for slider
				jQuery( "#slider-wrap" ).slider({    			
					orientation: 'horizontal',
					min: 0,
					max: dgoCount - 6,    			
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
					
					if(Math.round(dgoCount/6) <= sliderVal){
						sliderVal -= 1;//increment the current value

						jQuery('#slider-wrap').slider("value", sliderVal);//and set the new value of the slider
					}    	    			

				});
				
				//event on right arrow icon
				jQuery('.right-narrow-small').click(function(){
					var sliderVal = jQuery('#slider-wrap').slider("value");//read current value of the slider
					
					if(Math.round(dgoCount/6) >= sliderVal){
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
						jQuery('.image-list-content div:last').children('.img-cover').addClass('img-cover-selected');
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
						jQuery('.image-list-content div:first').children('.img-cover').addClass('img-cover-selected');
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
					var currentUrl = '';
					
					if(dgoTypeOfId == "A"){
						currentUrl += '#'+ dgoArticleName + '-' + dgoTypeOfId + Base62.encode(dgoArticleGroupId);
					}else{
						currentUrl += dgoCatInfo + '-' + dgoArticleName + '-A' + Base62.encode(dgoArticleGroupId);
					}
					
					if(dgoArticleSize != null){
						currentUrl += '-' + dgoArticleSize + '-' + dgoArticleRun;
					}
					
					dgoArticlePic = jQuery('.img-cover-selected').attr('title');
					
					window.location.hash = currentUrl + '-' + dgoArticlePic;
			});
	}else{
		jQuery('#loader').html( '<img src="' + web_2_print_blogInfo + 'css/img/icon/no_photo.png" style="top:0;left:0">');
		jQuery('.image-list').hide();
	}
}
//Get Article Picture
function getArticlePicture(ArticleGuid){
	if(jQuery('.image-list-content .img-cover-mask').html() != null){
		//return;
	}
	
	var api = new delivergo.api.contact();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
	
	//change the URL to ajaxproxy file    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    api.GetArticlePictures(ArticleGuid, 
    	function(result){
	    	var imgList = '';
			//var count = 0;
    		
			if(result.Value.length != 0){
    			dgoArticleGroups = result.Value;
    			
				//show picture if it exist and add some event for slideshow
				getArticlePictureByFormat();

    		}else if(result.Value.length == 0){    			
    			jQuery('#loader').html( '<img src="' + web_2_print_blogInfo + 'css/img/icon/no_photo.png" style="top:0;left:0">');
				jQuery('.image-list').hide();
    		}

    })
}

/*Add to cart function (from preview page)*/
//product preview to shopcart
/*function preview2shopcart(){
	var product_arr = [];

	//
	jQuery('.image-list-content').find('.img-cover-mask').each(function(){
		var _handle = jQuery(this).children('input').val();
		
		var _image = eval('img' + _handle).ImgUri;
		var _mask = eval('img' + _handle).MaskCroppingType;
		var _image = eval('img' + _handle).MaskBackground.MaskBackgroundUri;
		var _settings = eval('img' + _handle).MaskSettings;
		
		//save the link image to PrintData
		var print_data = {
			GroupName: 'MASK_PRODUCT',
			Items: [ _image, _mask, _image],
			Settings: _settings
		};
		
		//append to print data element
		var preview_price_object = eval('img' + _handle).PriceObject;
		preview_price_object.PrintData = [];
		preview_price_object.PrintData.push(print_data);
		
		product_arr.push(preview_price_object);
	});
			
	//save order to session
	jQuery.post(web_2_print_blogInfo + 'inc/shop_multi_redirect.php', 
		{ data: JSON2.stringify(product_arr) }, 
		function(){
			//redirect here
		}, 
		"text"
	);
}*/

/*====================Social Api (Comment & Rating)====================*/
/*
 * Api request function includes functions which do requests from api 
 * 
 * */

/*Function getting source comment*/
function GetSourceComment(source){
	/*New request instance, now it should have no article*/
    var api = new dgosocial.api();
    
    if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
		
	//change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
	
	api.GetSourceComment(PortalGuid, source, function(result){
		var comments = '';
		var res = result.Value;
		
		if(res.length > 0){
			for(var i = 0; i < res.length; i++){
				//save comments
				comment_arr['a_' + res[i].Id] = res[i];
				
				//add event
				commentAppendEvent(res[i]);
			}
		}else{
			//you are the first comment ^^
			if(jQuery('img#comment-loading').length == 1){
				jQuery('img#comment-loading').remove();
			}
			jQuery('#comment-comments').append('<span id="no-comment-span">' + jQuery('input#no-comment').val() + '</span>');
		}
	});
}

/*Function write comment to source*/
function SetSourceComment(callback){
	/*New request instance, now it should have no article*/
    var api = new dgosocial.api();
    
    if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
		
	//change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
		
	var reqObject = {
	    Comment: jQuery('#text-area').val(),
		UserId: social_user_id,//change user ID here
		UserName: dgoUsername != null ? dgoUsername: 'Guest',//change the username here
		Website: 'http://www.',
		Source: socialSourceID
  	};

	//set the request
	api.SetCommentContent(reqObject);
	
	//post to api
	api.SetSourceComment(PortalGuid, function(result){
		callback(result);
	});
}

//Function get source rating
function GetSourceRating(source, callback){
	/*New request instance, now it should have no article*/
    var api = new dgosocial.api();
    
    if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
		
	//change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
		
	api.GetSourceRating(PortalGuid, source, social_user_id, function(result){
		callback(result);
	});
}

//Function set source rating
function SetSourceRating(source, rating, callback){
	/*New request instance, now it should have no article*/
    var api = new dgosocial.api();
    
  	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
		
	//change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
		
	api.SetSourceRating(PortalGuid, source, social_user_id, rating, function(result){
		callback(result);
	});
}

//Function vote up comments
function commentUpRating(comment_id){
	/*New request instance, now it should have no article*/
    var api = new dgosocial.api();
    
  	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
		
	//change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
		
	api.SetCommentRating(PortalGuid, comment_id, social_user_id, 'up', function(result){
		//callback(result);
		//if(result.Status.Errors != undefined){}
		//class id
		var _class_id = '.box-div-' + comment_id;
		var class_id = '.like-us-'+ comment_id;
		
		//remove click event
		jQuery(class_id).parent().children('.like').removeAttr('onclick');
		
		//add class selected
		jQuery(class_id).addClass('like-selected');
		
		//remove class hover
		removeRatingHover(comment_id);
		
		//increase number of rating
		if(result.Value != null && result.Value[0].PositiveRatingCount != undefined){
			if(jQuery(_class_id).children('.like-number').length == 1){
				jQuery(_class_id).children('.like-number').html('(' + result.Value[0].PositiveRatingCount + ')');
			}else{
				jQuery(_class_id).append('<span class="like-number">'+ result.Value[0].PositiveRatingCount +'</span><img src="'+ web_2_print_blogInfo +'css/img/icon/thumb_up.png" />');
			}				
		}
	});
}

//Function vote down comments
function commentDownRating(comment_id){
	/*New request instance, now it should have no article*/
    var api = new dgosocial.api();
    
  	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;
		
	//change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
		
	api.SetCommentRating(PortalGuid, comment_id, social_user_id, 'down', function(result){
		//callback(result);
		//class id
		var class_id = '.unlike-us-'+ comment_id;
		
		//remove click event
		jQuery(class_id).parent().children('.like').removeAttr('onclick');
		
		//add class selected
		jQuery(class_id).addClass('like-selected');
		
		//remove class hover
		removeRatingHover(comment_id);
	});
}

//Function delete comment
function removeComment(comment_id){
	if(confirm('Do you really want to delete this comment?')){
		/*New request instance, now it should have no article*/
	    var api = new dgosocial.api();
	    
	  	if(globalPortalUri != null)
			api.PortalUriBase = globalPortalUri;
			
		//change the url to ajaxproxy file
	    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
			
		api.CommentDelete(PortalGuid, comment_id, function(result){
			//class id
			var class_id = '.box-div-' + comment_id;
			
			//remove this comment
			jQuery(class_id).remove();
			
			//if there are no comment we show the text no-comment
			if(jQuery('div.box-div-content').length == 0){
				jQuery('#comment-comments').append('<span id="no-comment-span">' + jQuery('input#no-comment').val() + '</span>');
			}
		});	
	}
}