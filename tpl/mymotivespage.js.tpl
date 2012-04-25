dgoCurrentPage 	= 'myMotives';
dgoGuid 		= '{guidUser}';
dgoThumbsArray 	= {thumbsarray};
dgoMotifSharing = {motifSharing};
dgoMotifEvaluation 	= {motifEvaluation};
dgoMotifCategory 	= {motifCategory};
dgoResaleUnits		= {resaleUnits};
dgoPaginatorLimit	= {paginatorLimit};

if(dgoThumbsArray.length == 0){
	jQuery('.paginator-element').hide();
	jQuery('.search-result-total').hide();		
}

//load all images and get the correct size
jQuery.each(dgoThumbsArray, function(i,v){
	var imagesource = v.ThumbnailUri;
	var id = i;
	var tmpImg = new Image(); //create temporary image                          
		tmpImg.onload = function () {
			 var size = scaleSize(70, 70, this.width, this.height); 	        	
			 jQuery('#myproduct-'+id+' .column-left-picture img').attr({
				 src: v.ThumbnailUri,
				 height: size[1],
				 width: size[0]
			 });	           
		}
		tmpImg.src = imagesource;

		//if the image load fail or something like that
		if(!tmpImg.complete)
		{
			 ///do other work;
			 jQuery('#myproduct-'+id+' .column-left-picture img').attr({
				 src: web_2_print_blogInfo+"css/img/icon/upload_image_temp.png",
				 height: 64,
				 width: 64
			 });
			   
		}
});

function showPaginator(currentPage, pageNumber, option){

	paginator = '<div class="paginator-next">'+jQuery('.paginator-next').html()+'</div>';

	if(option == 'next'){
		end = (currentPage + (dgoPaginatorLimit - 1)) >= pageNumber ? pageNumber : currentPage + (dgoPaginatorLimit - 1);
		for(i = end;i >= currentPage;i--){
			if(i == currentPage)
				paginator += '<div class="paginator-number paginator-selected">'+i+'</div>';
			else
				paginator += '<div class="paginator-number">'+i+'</div>'; 	
		}
	}
	
	if(option == 'prev'){			
		end = (currentPage - (dgoPaginatorLimit - 1)) <= 1 ? 1 : dgoPaginatorLimit;
		start = currentPage >= dgoPaginatorLimit ? currentPage : dgoPaginatorLimit;		
		for(i = start;i >= end;i--){
			if(i == currentPage)
				paginator += '<div class="paginator-number paginator-selected">'+i+'</div>';
			else
				paginator += '<div class="paginator-number">'+i+'</div>'; 	
		}
	}	
	
	paginator += '<div class="paginator-prev">'+jQuery('.paginator-prev').html()+'</div>';
		
	//show new paginator
	jQuery('.paginator-element').html(paginator);
	
	//event for paginator
	eventForPaginator();
}

function eventForPaginator(){	
	//event for pagination previous
	jQuery('.paginator-prev').click(function(){
		if(jQuery('.paginator-selected').html() != jQuery(this).prev().html()){			
			//current page								
			currentPage = jQuery('.paginator-selected').next().html() * 1;
			jQuery('.paginator-number').removeClass('paginator-selected');
			jQuery('.paginator-element').children().each(function(){
				if(jQuery(this).html() == currentPage){
					jQuery(this).addClass('paginator-selected');
				}
			});
			
			//show new elements in new page number
			showNewElement(currentPage, 'prev');

			//event mouseover for each item
			eventForHeaderElement();

			//event for edit button
			eventForEditButton();
			 
		}
	});

	jQuery('.paginator-next').click(function(){
		if(jQuery('.paginator-selected').html() != jQuery(this).next().html()){			
			//jQuery(this).addClass('paginator-selected');									
			currentPage = jQuery('.paginator-selected').prev().html() * 1;
			jQuery('.paginator-number').removeClass('paginator-selected');
			jQuery('.paginator-element').children().each(function(){
				if(jQuery(this).html() == currentPage){
					jQuery(this).addClass('paginator-selected');
				}
			});
			
			//show new elements in new page number
			showNewElement(currentPage, 'next');

			//event mouseover for each item
			eventForHeaderElement();

			//event for edit button
			eventForEditButton(); 
		}
	});

	jQuery('.paginator-number').click(function(){		
		if(jQuery(this).attr('class') != 'paginator-number paginator-selected'){
			oldPage = jQuery('.paginator-selected').html() * 1;
			
			jQuery('.paginator-number').removeClass('paginator-selected');
											
			currentPage = jQuery(this).html() * 1;
			
			jQuery('.paginator-element').children().each(function(){
				if(jQuery(this).html() == currentPage){
					jQuery(this).addClass('paginator-selected');
				}
			});
			
			//show new elements in new page number
			if(oldPage < currentPage){				
				showNewElement(currentPage, 'next');
			}else{
				showNewElement(currentPage, 'prev');
			}			

			//event mouseover for each item
			eventForHeaderElement();

			//event for edit button
			eventForEditButton();
		}		
	});
}

function eventForEditButton(){
	jQuery(".column-right-editdetails").click(function(){	    	
		jQuery( ".myproduct-hover-popup" ).parent('.ui-dialog').css('padding','0 !important');	    	
		jQuery( ".myproduct-hover-popup" ).parent('.dgo-dialog-class').css('padding','0 !important');	    	
		jQuery('.myproduct-hover-popup').prev('.ui-widget-header').hide();

		var id = jQuery(this).children('.thumb-id').val();
		jQuery('.current-motive-id').val(id);
		//show motive id in header dialog
		jQuery('.popup-center-title .motive-info-id').html('M' + Base62.encode(dgoThumbsArray[id].Id));
		
		if(dgoThumbsArray[id].ThumbnailTranslation != undefined){
			for(var i = 0;i < dgoThumbsArray[id].ThumbnailTranslation.length;i++){
				if(dgoThumbsArray[id].ThumbnailTranslation[i].LanguageToken == globalLanguage){
					jQuery('.center-details-des-name input').val(dgoThumbsArray[id].ThumbnailTranslation[i].Name);
					jQuery('.center-details-des-des textarea').val(dgoThumbsArray[id].ThumbnailTranslation[i].Description);
					break;
				}else if(i == dgoThumbsArray[id].ThumbnailTranslation.length - 1){
					jQuery('.center-details-des-name input').val(dgoThumbsArray[id].ThumbnailTranslation[i].Name);
					jQuery('.center-details-des-des textarea').val(dgoThumbsArray[id].ThumbnailTranslation[i].Description);
				}
			}			    	    		
		}
		
		if(dgoThumbsArray[id].ThumbnailCategory != undefined){
			if(dgoMotifCategory != null){
				var categoryHtml = '';
				for(var i = 0;i < dgoThumbsArray[id].ThumbnailCategory.length;i++){
					for(var j = 0;j < dgoMotifCategory.ChildCategories.length;j++){
						if(dgoThumbsArray[id].ThumbnailCategory[i].IdCategory == dgoMotifCategory.ChildCategories[j].Id){
							categoryHtml += dgoMotifCategory.ChildCategories[j].CategoryTranslation[0].Name + ', ';
						}
					}
				}
				//fill categories to creat / edit motive dialog
				jQuery('.center-details-category').html(categoryHtml);
				jQuery('.center-details-category').attr('title',categoryHtml);
			}else{
				jQuery('.center-details-category').html('...');
				jQuery('.center-details-category').attr('title','...');
			}
		}else{
			jQuery('.center-details-category').html('...');
			jQuery('.center-details-category').attr('title','...');
		}

		if(dgoThumbsArray[id].ThumbnailSetting != undefined){
			var keywords = '';
			
			for(var i = 0;i < dgoThumbsArray[id].ThumbnailSetting.length;i++){
				if(dgoThumbsArray[id].ThumbnailSetting[i].Key == 'Api.Metadata.Keyword.'+globalLanguage){
					keywords += dgoThumbsArray[id].ThumbnailSetting[i].Value + ' ';
				}
			}
			
			if(keywords != ''){
				jQuery('.center-details-keywords').html(keywords);
			}else{
				jQuery('.center-details-keywords').html('&nbsp;');
			}
							
			for(var i = 0;i < dgoThumbsArray[id].ThumbnailSetting.length;i++){
				if(dgoThumbsArray[id].ThumbnailSetting[i].Key == 'Api.Metadata.Visibility'){
					jQuery('.popup-share-box').children('.motif-sharing-item').each(function(){
						var sharingSelected = jQuery(this).children('.share-box-ele-input').children('.shareinput').val();							
						if(sharingSelected == dgoThumbsArray[id].ThumbnailSetting[i].Value){
							jQuery(this).click();
						}
					});
				}else if(i == dgoThumbsArray[id].ThumbnailSetting.length - 1){
					jQuery('#share-dropdown-text').html('...');
					jQuery('.motif-sharing-item').removeClass('motifSharing-selected');
					jQuery('.shareinput').attr('checked','');							
				}
				
				if(dgoThumbsArray[id].ThumbnailSetting[i].Key == 'Api.Metadata.ReviewState'){
					jQuery('.popup-status-select').val(dgoThumbsArray[id].ThumbnailSetting[i].Value);
				}
			}
		}else{
			jQuery('.center-details-keywords').html('...');
			jQuery('#share-dropdown-text').html('...');
			jQuery('.motif-sharing-item').removeClass('motifSharing-selected');
			jQuery('.shareinput').attr('checked','');					
		}

		var imagesource = dgoThumbsArray[id].ThumbnailUri;

		var tmpImg = new Image(); //create temporary image                          
			tmpImg.onload = function () {
				 var size = scaleSize(90, 90, this.width, this.height); 
				 var size_small = scaleSize(25, 25, this.width, this.height); 
				 jQuery('.des-pics-main img').attr({
						 src: dgoThumbsArray[id].ThumbnailUri,
						 height: size[1],
						 width: size[0]
					 });
				 jQuery('.des-pics-seco img').attr({
						 src: dgoThumbsArray[id].ThumbnailUri,
						 height: size_small[1],
						 width: size_small[0]
					 });

				jQuery( ".myproduct-hover-popup" ).dialog('open');
				jQuery( ".myproduct-hover-popup" ).dialog({ position: 'center' });
			}
			tmpImg.src = imagesource;

		  //if the image load fail or something like that
			if(!tmpImg.complete)
			{
				 ///do other work;
				 jQuery('.des-pics-main img').attr({
						 src: web_2_print_blogInfo+"css/img/icon/upload_image_temp.png",
						 height: 90,
						 width: 90
					 });
				 jQuery('.des-pics-seco img').attr({
						 src: web_2_print_blogInfo+"css/img/icon/upload_image_temp.png",
						 height: 25,
						 width: 25
					 });

				jQuery( ".myproduct-hover-popup" ).dialog('open');
				jQuery( ".myproduct-hover-popup" ).dialog({ position: 'center' });
			}
	});
}

function eventForHeaderElement(){
	jQuery('.myproduct-header-element').hover(function(){
		var id = jQuery(this).attr('id');
		jQuery('#'+id+' .center-info-others').css('visibility','visible');
		jQuery('#'+id+' .column-right-addshop').css('visibility','visible');
		jQuery('#'+id+' .column-right-editdetails').css('visibility','visible');
		jQuery('#'+id+' .column-left-productID').css('visibility','visible');
		jQuery('#'+id+' .column-left-active').css('visibility','visible');
	},function(){
		var id = jQuery(this).attr('id');
		jQuery('#'+id+' .center-info-others').css('visibility','hidden');
		jQuery('#'+id+' .column-right-addshop').css('visibility','hidden');
		jQuery('#'+id+' .column-right-editdetails').css('visibility','hidden');
		jQuery('#'+id+' .column-left-productID').css('visibility','hidden');
		jQuery('#'+id+' .column-left-active').css('visibility','hidden');
	});
}

function showNewElement(currentPage, option){
	//total items
	totalItems = dgoThumbsArray.length;
	//number of items per page 
	itemsPerPage = dgoThumbsArray.length < 10 ? dgoThumbsArray.length : 10;
	//total number of pages
	pageNumber = Math.round(totalItems / itemsPerPage);
	//page start
	pageStart = currentPage == 1 ? (currentPage - 1) * itemsPerPage : (currentPage - 1) * itemsPerPage + 1;
	//page end
	pageEnd = currentPage * itemsPerPage > dgoThumbsArray.length ? dgoThumbsArray.length : currentPage * itemsPerPage;
	
	pageEnd = (pageEnd == dgoThumbsArray.length) ? dgoThumbsArray.length - 1 : pageEnd;		
	
	motivesHtml = '';
	
	jQuery('.search-result-total-val').html(currentPage+'/'+pageNumber);
	
	if(currentPage != dgoPaginatorLimit || currentPage != 1){
		if(option == 'next'){
			if(currentPage + (dgoPaginatorLimit - 1) <= pageNumber){
				showPaginator(currentPage * 1, pageNumber, option);
			}
		}
		
		if(option == 'prev'){
			if(currentPage - (dgoPaginatorLimit - 1) >= 1){
				showPaginator(currentPage * 1, pageNumber, option);
			}
		}		
	}
	
	//show motives from page start to page end
	for(i = pageStart;i <= pageEnd;i++){			
		descriptionHtml = '';
		statusHtml = '';
		sharingHtml = '';
		if(i == pageStart){			
			motivesHtml += '<div class="myproduct-header-element" id="myproduct-'+i+'">';
			motivesHtml += '<div class="header-element-head"><div class="head-column-left">'+jQuery('.head-column-left').html()+'</div><div class="head-column-center">'+jQuery('.head-column-center').html()+'</div><div class="head-column-right">'+jQuery('.head-column-right').html()+'</div></div>';
			motivesHtml += '<div class="header-element-content"><div class="content-column-left">';
			motivesHtml += '<div class="column-left-picture"><img src=""></div>';
			motivesHtml += '<div class="column-left-productID">ID: M'+Base62.encode(dgoThumbsArray[i].Id)+'</div>';
			motivesHtml += '<div class="column-left-active"><div class="column-left-active-checkbox"><input type="checkbox" '+(dgoThumbsArray[i].Active == 1 ? 'checked="checked"' : '')+' class="active-checker"></div><div class="column-left-active-text">'+jQuery('.column-left-active-text').html()+'</div></div></div>';
			motivesHtml += '<div class="content-column-center">';
			
			if(dgoThumbsArray[i].ThumbnailTranslation != undefined){
				for(j = 0; j < dgoThumbsArray[i].ThumbnailTranslation.length;j++){
					value = dgoThumbsArray[i].ThumbnailTranslation[j];
					if(value.LanguageToken == globalLanguage){
						motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(1) span:first').html()+'</span> <span class="center-info-name">'+value.Name+'</span></div>';
						descriptionHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(2) span:first').html()+'</span> <span class="center-info-des">'+value.Description+'</span></div>';
						break;
					}else if(j == dgoThumbsArray[i].ThumbnailTranslation.length - 1){
						motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(1) span:first').html()+'</span> <span class="center-info-name">'+value.Name+'</span></div>';
						descriptionHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(2) span:first').html()+'</span> <span class="center-info-des">'+value.Description+'</span></div>';
					}
				}
			}else{
				motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(1) span:first').html()+'</span> <span class="center-info-name">...</span></div>';	
				motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(2) span:first').html()+'</span> <span class="center-info-des">...</span></div>';	
			}
			motivesHtml += descriptionHtml;
			if(dgoThumbsArray[i].ThumbnailSetting != undefined){
				motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(3) span:first').html()+'</span> <span class="center-info-keyword">';
				for(var key in dgoThumbsArray[i].ThumbnailSetting){
					if(dgoThumbsArray[i].ThumbnailSetting[key].Key == 'Api.Metadata.Keyword.'+globalLanguage){
						motivesHtml += dgoThumbsArray[i].ThumbnailSetting[key].Value+', ';
					}else if(key == dgoThumbsArray[i].ThumbnailSetting.length - 1){
						motivesHtml += '...';
					}
				}
				motivesHtml += '</span></div>';
			}else{
				motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(3) span:first').html()+'</span> <span class="center-info-keyword">...</span></div>';
			}
			
			motivesHtml += '<div class="center-info-prices">';
			//motivesHtml += '<div class="center-info-prices-left"><div><span>'+jQuery('.content-column-center div:nth-child(4) span:first').html()+'</span> <span class="center-info-article-name">...</span></div></div>';								
			motivesHtml += '<div class="center-info-prices-right">';
			motivesHtml += '<div><span>'+jQuery('.center-info-prices-right div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-name">...</span></div></div></div>';
			motivesHtml += '<div class="center-info-others"><div class="center-info-others-left">';
			
			if(dgoThumbsArray[i].ThumbnailSetting != undefined){
				for(var key in dgoThumbsArray[i].ThumbnailSetting){
					if(dgoThumbsArray[i].ThumbnailSetting[key].Key == 'Api.Metadata.Visibility'){
						for(var j = 0;j < dgoMotifSharing.ChildTokens.length;j++){
							if(dgoMotifSharing.ChildTokens[j].Token == dgoThumbsArray[i].ThumbnailSetting[key].Value){
								motivesHtml += '<div><span>'+jQuery('.center-info-others-left div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-sharing" title="'+dgoMotifSharing.ChildTokens[j].SystemTokenTranslation[0].Name+'">'+dgoMotifSharing.ChildTokens[j].SystemTokenTranslation[0].Name+'</span></div>';
							}
						}
						break;
					}else if(key == dgoThumbsArray[i].ThumbnailSetting.length - 1){
						motivesHtml += '<div><span>'+jQuery('.center-info-others-left div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-sharing">...</span></div>';
					}							
				}
			}else{
				motivesHtml += '<div><span>'+jQuery('.center-info-others-left div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-sharing">...</span></div>';
			}
			
			motivesHtml += '<div><span>'+jQuery('.center-info-others-left div:nth-child(2) span:first').html()+'</span> <span class="center-info-article-created" title="'+dgoThumbsArray[i].Created.ParseRfcDate().format('dd.mm.yyyy')+'">'+dgoThumbsArray[i].Created.ParseRfcDate().format('dd.mm.yyyy')+'</span></div>';
			motivesHtml += '</div>';
			motivesHtml += '<div class="center-info-others-right">';
			
			if(dgoThumbsArray[i].ThumbnailSetting != undefined){
				for(var key in dgoThumbsArray[i].ThumbnailSetting){
					if(dgoThumbsArray[i].ThumbnailSetting[key].Key == 'Api.Metadata.ReviewState'){
						motivesHtml += '<div><span>'+jQuery('.center-info-others .center-info-others-right div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-status" title="'+dgoThumbsArray[i].ThumbnailSetting[key].Value+'">'+dgoThumbsArray[i].ThumbnailSetting[key].Value+'</span></div>';
						break;
					}else if(key == dgoThumbsArray[i].ThumbnailSetting.length - 1){
						motivesHtml += '<div><span>'+jQuery('.center-info-others .center-info-others-right div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-status">...</span></div>';
					}							
				}
			}else{
				motivesHtml += '<div><span>'+jQuery('.center-info-others .center-info-others-right div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-status">...</span></div>';
			}
			
			if(dgoThumbsArray[i].Modified != undefined){
				motivesHtml += '<div><span>'+jQuery('.center-info-others-right div:nth-child(2) span:first').html()+'</span> <span class="center-info-article-Modified" title="'+dgoThumbsArray[i].Modified.ParseRfcDate().format('dd.mm.yyyy')+'">'+dgoThumbsArray[i].Modified.ParseRfcDate().format('dd.mm.yyyy')+'</span></div>';	
			}else{
				motivesHtml += '<div><span>'+jQuery('.center-info-others-right div:nth-child(2) span:first').html()+'</span> <span class="center-info-article-Modified">...</span></div>';
			}
			
			motivesHtml += '</div></div></div>';
			motivesHtml += '<div class="content-column-right">';
			motivesHtml += '<div class="column-right-editdetails">'+jQuery('.transEditDetails').val()+'<input type="hidden" value="'+i+'" class="thumb-id"></div>';
			motivesHtml += '<div class="column-right-ordernow">'+jQuery('.column-right-ordernow').html()+'</div></div></div></div>';	
			
		}else{
			motivesHtml += '<div class="myproduct-header-element" id="myproduct-'+i+'">';
			motivesHtml += '<div class="header-element-content"><div class="content-column-left">';
			motivesHtml += '<div class="column-left-picture"><img src=""></div>';
			motivesHtml += '<div class="column-left-productID">ID: M'+Base62.encode(dgoThumbsArray[i].Id)+'</div>';
			motivesHtml += '<div class="column-left-active"><div class="column-left-active-checkbox"><input type="checkbox" '+(dgoThumbsArray[i].Active == 1 ? 'checked="checked"' : '')+' class="active-checker"></div><div class="column-left-active-text">'+jQuery('.column-left-active-text').html()+'</div></div></div>';
			motivesHtml += '<div class="content-column-center">';

			if(dgoThumbsArray[i].ThumbnailTranslation != undefined){
				for(j = 0; j < dgoThumbsArray[i].ThumbnailTranslation.length;j++){
					value = dgoThumbsArray[i].ThumbnailTranslation[j];
					if(value.LanguageToken == globalLanguage){
						motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(1) span:first').html()+'</span> <span class="center-info-name">'+value.Name+'</span></div>';
						descriptionHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(2) span:first').html()+'</span> <span class="center-info-des">'+value.Description+'</span></div>';
						break;
					}else if(j == dgoThumbsArray[i].ThumbnailTranslation.length - 1){
						motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(1) span:first').html()+'</span> <span class="center-info-name">'+value.Name+'</span></div>';
						descriptionHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(2) span:first').html()+'</span> <span class="center-info-des">'+value.Description+'</span></div>';
					}
				}
			}else{
				motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(1) span:first').html()+'</span> <span class="center-info-name">...</span></div>';	
				motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(2) span:first').html()+'</span> <span class="center-info-des">...</span></div>';	
			}
			
			motivesHtml += descriptionHtml;
			
			if(dgoThumbsArray[i].ThumbnailSetting != undefined){
				motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(3) span:first').html()+'</span> <span class="center-info-keyword">';
				for(var key in dgoThumbsArray[i].ThumbnailSetting){
					if(dgoThumbsArray[i].ThumbnailSetting[key].Key == 'Api.Metadata.Keyword.'+globalLanguage){
						motivesHtml += dgoThumbsArray[i].ThumbnailSetting[key].Value+', ';
					}else if(key == dgoThumbsArray[i].ThumbnailSetting.length - 1){
						motivesHtml += '...';
					}							
				}
				motivesHtml += '</span></div>';
				
			}else{
				motivesHtml += '<div><span>'+jQuery('.content-column-center div:nth-child(3) span:first').html()+'</span> <span class="center-info-keyword">...</span></div>';
				
			}
			
			motivesHtml += '<div class="center-info-prices">';
			//motivesHtml += '<div class="center-info-prices-left"><div><span>'+jQuery('.content-column-center div:nth-child(4) span:first').html()+'</span> <span class="center-info-article-name">...</span></div></div>';								
			motivesHtml += '<div class="center-info-prices-right">';
			motivesHtml += '<div><span>'+jQuery('.center-info-prices-right div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-name">...</span></div></div></div>';
			motivesHtml += '<div class="center-info-others"><div class="center-info-others-left">';
			
			if(dgoThumbsArray[i].ThumbnailSetting != undefined){
				for(var key in dgoThumbsArray[i].ThumbnailSetting){
					if(dgoThumbsArray[i].ThumbnailSetting[key].Key == 'Api.Metadata.Visibility'){
						for(var j = 0;j < dgoMotifSharing.ChildTokens.length;j++){
							if(dgoMotifSharing.ChildTokens[j].Token == dgoThumbsArray[i].ThumbnailSetting[key].Value){
								motivesHtml += '<div><span>'+jQuery('.center-info-others-left div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-sharing" title="'+dgoMotifSharing.ChildTokens[j].SystemTokenTranslation[0].Name+'">'+dgoMotifSharing.ChildTokens[j].SystemTokenTranslation[0].Name+'</span></div>';
							}
						}
						break;
					}else if(key == dgoThumbsArray[i].ThumbnailSetting.length - 1){
						motivesHtml += '<div><span>'+jQuery('.center-info-others-left div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-sharing">...</span></div>';
					}							
				}
			}else{
				motivesHtml += '<div><span>'+jQuery('.center-info-others-left div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-sharing">...</span></div>';
			}
			
			motivesHtml += '<div><span>'+jQuery('.center-info-others-left div:nth-child(2) span:first').html()+'</span> <span class="center-info-article-created" title="'+dgoThumbsArray[i].Created.ParseRfcDate().format('dd.mm.yyyy')+'">'+dgoThumbsArray[i].Created.ParseRfcDate().format('dd.mm.yyyy')+'</span></div>';
			motivesHtml += '</div>';
			motivesHtml += '<div class="center-info-others-right">';
			
			if(dgoThumbsArray[i].ThumbnailSetting != undefined){
				for(var key in dgoThumbsArray[i].ThumbnailSetting){
					if(dgoThumbsArray[i].ThumbnailSetting[key].Key == 'Api.Metadata.ReviewState'){
						motivesHtml += '<div><span>'+jQuery('.center-info-others .center-info-others-right div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-status" title="'+dgoThumbsArray[i].ThumbnailSetting[key].Value+'">'+dgoThumbsArray[i].ThumbnailSetting[key].Value+'</span></div>';
						break;
					}else if(key == dgoThumbsArray[i].ThumbnailSetting.length - 1){
						motivesHtml += '<div><span>'+jQuery('.center-info-others .center-info-others-right div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-status">...</span></div>';
					}							
				}
			}else{
				motivesHtml += '<div><span>'+jQuery('.center-info-others .center-info-others-right div:nth-child(1) span:first').html()+'</span> <span class="center-info-article-status">...</span></div>';
			}
			
			if(dgoThumbsArray[i].Modified != undefined){
				motivesHtml += '<div><span>'+jQuery('.center-info-others-right div:nth-child(2) span:first').html()+'</span> <span class="center-info-article-Modified" title="'+dgoThumbsArray[i].Modified.ParseRfcDate().format('dd.mm.yyyy')+'">'+dgoThumbsArray[i].Modified.ParseRfcDate().format('dd.mm.yyyy')+'</span></div>';	
			}else{
				motivesHtml += '<div><span>'+jQuery('.center-info-others-right div:nth-child(2) span:first').html()+'</span> <span class="center-info-article-Modified">...</span></div>';
			}
			
			motivesHtml += '</div></div></div>';
			motivesHtml += '<div class="content-column-right">';
			motivesHtml += '<div class="column-right-editdetails">'+jQuery('.transEditDetails').val()+'<input type="hidden" value="'+i+'" class="thumb-id"></div>';
			motivesHtml += '<div class="column-right-ordernow">'+jQuery('.column-right-ordernow').html()+'</div></div></div></div>';	
								
		}
	}
	
	jQuery('.myproduct-header-content').empty();
	jQuery('.myproduct-header-content').html(motivesHtml);
	
	jQuery.each(dgoThumbsArray, function(i,v){
		var imagesource = v.ThumbnailUri;
		var id = i;
		var tmpImg = new Image(); //create temporary image                          
			tmpImg.onload = function () {
				 var size = scaleSize(70, 70, this.width, this.height); 	        	
				 jQuery('#myproduct-'+id+' .column-left-picture img').attr({
					 src: v.ThumbnailUri,
					 height: size[1],
					 width: size[0]
				 });	           
			}
			tmpImg.src = imagesource;

			//if the image load fail or something like that
			if(!tmpImg.complete)
			{
				 ///do other work;
				 jQuery('#myproduct-'+id+' .column-left-picture img').attr({
					 src: web_2_print_blogInfo+"css/img/icon/upload_image_temp.png",
					 height: 64,
					 width: 64
				 });
				   
			}
	});
}

eventForPaginator();

//hover popup dialog
jQuery(function() {
	//create create / edit motive dialog
	jQuery( ".myproduct-hover-popup" ).dialog({
		title: 'Create / Edit <div class="ex-close-button"></div>',
		autoOpen: false,                            
		width: 600,
		dialogClass: "dgo-dialog-class dgo-errorMessage-dialog",
		modal: true, 
		zIndex: 5001,
		position: 'center',
		resizable: false
	});
	//create dialog add category
	jQuery('.popup-add-category').dialog({
		title: 'Add Category <div class="ex-close-button"></div>',
		autoOpen: false,                            
		width: 550,
		dialogClass: "dgo-dialog-class dgo-errorMessage-dialog",
		modal: true, 
		zIndex: 5001,
		position: 'center',
		resizable: false
	});
	
	//event click add category button
	jQuery('.center-details-addcat').click(function(){				
		var id = jQuery('.current-motive-id').val();
		if(dgoThumbsArray[id].ThumbnailCategory != undefined){
			jQuery('.popup-add-category-ele').each(function(){
				var idCategory = jQuery(this).children('.category-ele-checkbox').children('.category-checkbox-value').val();
				for(var i = 0;i < dgoThumbsArray[id].ThumbnailCategory.length;i++){
					if(dgoThumbsArray[id].ThumbnailCategory[i].IdCategory == idCategory){
						jQuery(this).children('.category-ele-checkbox').children('.category-checkbox-value').attr('checked','checked');
					}
				}
			});
		}
		
		jQuery('.popup-add-category').dialog('open');
		jQuery('.popup-add-category').dialog({ position: 'center' });
	});	
	
	//event click for add category button in add category dialog
	jQuery('.add-category-button').click(function(){
		jQuery.blockUI(0);
		var id = jQuery('.current-motive-id').val();
		
		if(dgoThumbsArray[id].ThumbnailCategory == undefined){
			dgoThumbsArray[id].ThumbnailCategory = new Array();					
		}else{
			dgoThumbsArray[id].ThumbnailCategory.splice(0, dgoThumbsArray[id].ThumbnailCategory.length);
		}
		
		jQuery('.popup-add-category-ele').each(function(){
			var idCategory = jQuery(this).children('.category-ele-checkbox').children('.category-checkbox-value:checked').val();
			if(idCategory != undefined){
				var obj = {
							"IdCategory": parseInt(idCategory),
							"IdThumbnail": dgoThumbsArray[id].Id
							}
				
				dgoThumbsArray[id].ThumbnailCategory.push(obj);
			}
		});		
		//update motive
		UpdateThumbnailsFromUser(id, "normprint", "save");				
	});
	
	//event mouseover for each item
	eventForHeaderElement();
	
	//event for hide dropdown in dialog
	jQuery('.myproduct-hover-popup').click(function(e){
		var target = e.target;
		
		if(target.id != 'center-details-content-container' && target.id != 'content-dropdown-text' && target.id != 'content-dropdown-arrow'){
			jQuery('.popup-content-container').fadeOut(1);						
		}
		if(target.id != 'center-details-share-container' && target.id != 'share-dropdown-text' && target.id != 'share-dropdown-arrow'){
			jQuery('.popup-share-container').fadeOut(1);						
		}
		if(jQuery(target).attr('class') != 'content-dropdown-arrow' && jQuery(target).attr('class') != 'content-dropdown-text' && jQuery(target).attr('class') != 'salesunit-box-ele-text' && jQuery(target).attr('class') != 'salesunit-box-ele-text' && jQuery(target).attr('class') != "input-salesunit" && jQuery(target).attr('class') != "salesunit-box-ele-none" && jQuery(target).attr('class') != "salesunit-box-ele-checkall" && jQuery(target).attr('class') != "salesunit-box-ele-divide" && jQuery(target).attr('class') != "popup-salesunit-box-ele-header"){
			jQuery('.popup-salesunit-container').fadeOut(1);						
		}
	});
	
	jQuery('#center-details-content-container').click(function(){
		jQuery('.popup-content-container').show();
	});

	jQuery('#center-details-share-container').click(function(){
		jQuery('.popup-share-container').show();
	});

	jQuery('#center-details-salesunit-container').click(function(){
		jQuery('.popup-salesunit-container').show();
	});

	//event for edit button
	eventForEditButton();
		
	//event for save button in popup dialog
	jQuery(".popup-save-button").click(function(){
		var id = jQuery('.current-motive-id').val();
		if(jQuery('.center-details-des-name input').val() != "" && jQuery('.center-details-des-des textarea').val() != ""){
			//remove border color red
			jQuery('.center-details-des-name').css('border-color','#CCC');
			jQuery('.center-details-des-des').css('border-color','#CCC');
			
			if(dgoThumbsArray[id].ThumbnailTranslation != undefined){
				for(var i = 0;i < dgoThumbsArray[id].ThumbnailTranslation.length;i++){
					if(dgoThumbsArray[id].ThumbnailTranslation[i].LanguageToken == globalLanguage){
						dgoThumbsArray[id].ThumbnailTranslation[i].Name = jQuery('.center-details-des-name input').val();
						dgoThumbsArray[id].ThumbnailTranslation[i].Description = jQuery('.center-details-des-des textarea').val();
						break;
					}else if(i == dgoThumbsArray[id].ThumbnailTranslation.length - 1){
						var obj = {
									"Description": jQuery('.center-details-des-des textarea').val(),
									"Name": jQuery('.center-details-des-name input').val(),
									"LanguageToken": globalLanguage
									}
						dgoThumbsArray[id].ThumbnailTranslation.push(obj);						
						break;
					}
				}	

				if(dgoThumbsArray[id].ThumbnailSetting != undefined){
					for(var i = 0;i < dgoThumbsArray[id].ThumbnailSetting.length;i++){
						if(dgoThumbsArray[id].ThumbnailSetting[i].Key == "Api.Metadata.ReviewState"){
							dgoThumbsArray[id].ThumbnailSetting[i].Value = jQuery('.popup-status-select').val();
							break;
						}else if(i == dgoThumbsArray[id].ThumbnailSetting.length - 1){
							var objStatus = {
										"Key": "Api.Metadata.ReviewState",
										"Type" : "System.String",
										"Value": jQuery('.popup-status-select').val()
									}
					
							dgoThumbsArray[id].ThumbnailSetting.push(objStatus);
						}
					}

					if(jQuery('.motifSharing-selected .shareinput').val() != undefined){
						for(var i = 0;i < dgoThumbsArray[id].ThumbnailSetting.length;i++){
							if(dgoThumbsArray[id].ThumbnailSetting[i].Key == "Api.Metadata.Visibility"){
								dgoThumbsArray[id].ThumbnailSetting[i].Value = jQuery('.motifSharing-selected .shareinput').val();
								break;
							}else if(i == dgoThumbsArray[id].ThumbnailSetting.length - 1){
								var obj = {
											"Key": "Api.Metadata.Visibility",
											"Type" : "System.String",
											"Value": jQuery('.motifSharing-selected .shareinput').val()
											}
								dgoThumbsArray[id].ThumbnailSetting.push(obj);
							}
						}
					}	
				}else{		
					dgoThumbsArray[id].ThumbnailSetting = new Array();
					if(jQuery('.motifSharing-selected .shareinput').val() != undefined){
						var obj = {
								"Key": "Api.Metadata.Visibility",
								"Type" : "System.String",
								"Value": jQuery('.motifSharing-selected .shareinput').val()
								}
						dgoThumbsArray[id].ThumbnailSetting.push(obj);
					}
					
					var objStatus = {
										"Key": "Api.Metadata.ReviewState",
										"Type" : "System.String",
										"Value": jQuery('.popup-status-select').val()
									}
					
					dgoThumbsArray[id].ThumbnailSetting.push(objStatus);
				}
				
				jQuery.blockUI(0);
				UpdateThumbnailsFromUser(id, "normprint", "save");				
			}else{
				if(globalLanguage == "EN"){
					dgoThumbsArray[id].ThumbnailTranslation = new Array();
					var obj = {
								"Description": jQuery('.center-details-des-des textarea').val(),
								"Name": jQuery('.center-details-des-name input').val(),
								"LanguageToken": globalLanguage
								}
					dgoThumbsArray[id].ThumbnailTranslation.push(obj);
				}else{
					jQuery.blockUI(0);
					var api = new delivergo.api();  
							
					if(globalPortalUri != null)
						api.PortalUriBase = globalPortalUri;

					api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;

					api.Request.Value = new Array();

					var objName = 
						  {
							 "Source":{
								"LanguageToken": globalLanguage,
								"Name": jQuery('.center-details-des-name input').val()
							 },
							 "Translations":[
								{
								   "LanguageToken":"EN"
								}
							 ]
						  }
						  
					var objDes = {
							 "Source":{
								"LanguageToken": globalLanguage,
								"Name": jQuery('.center-details-des-des textarea').val()
							 },
							 "Translations":[
								{
								   "LanguageToken":"EN"
								}
							 ]
						  }

					api.Request.Value.push(objName);
					api.Request.Value.push(objDes);
											
					api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';  
					
					api.GetTranslationFromApi(function( result ){
						if(result.Value != null){
							dgoThumbsArray[id].ThumbnailTranslation = new Array();
							var obj = {
										"Description": result.Value[1].Translations[0].Name,
										"Name": result.Value[0].Translations[0].Name,
										"LanguageToken": "EN"
										}
							var objEN = {
										"Description": jQuery('.center-details-des-des textarea').val(),
										"Name": jQuery('.center-details-des-name input').val(),
										"LanguageToken": globalLanguage
										}
										
							dgoThumbsArray[id].ThumbnailTranslation.push(obj);
							dgoThumbsArray[id].ThumbnailTranslation.push(objEN);
							
							if(dgoThumbsArray[id].ThumbnailSetting != undefined){
								for(var i = 0;i < dgoThumbsArray[id].ThumbnailSetting.length;i++){
									if(dgoThumbsArray[id].ThumbnailSetting[i].Key == "Api.Metadata.ReviewState"){
										dgoThumbsArray[id].ThumbnailSetting[i].Value = jQuery('.popup-status-select').val();
										break;
									}else if(i == dgoThumbsArray[id].ThumbnailSetting.length - 1){
										var objStatus = {
													"Key": "Api.Metadata.ReviewState",
													"Type" : "System.String",
													"Value": jQuery('.popup-status-select').val()
												}
								
										dgoThumbsArray[id].ThumbnailSetting.push(objStatus);
									}
								}

								if(jQuery('.motifSharing-selected .shareinput').val() != undefined){
									for(var i = 0;i < dgoThumbsArray[id].ThumbnailSetting.length;i++){
										if(dgoThumbsArray[id].ThumbnailSetting[i].Key == "Api.Metadata.Visibility"){
											dgoThumbsArray[id].ThumbnailSetting[i].Value = jQuery('.motifSharing-selected .shareinput').val();
											break;
										}else if(i == dgoThumbsArray[id].ThumbnailSetting.length - 1){
											var obj = {
														"Key": "Api.Metadata.Visibility",
														"Type" : "System.String",
														"Value": jQuery('.motifSharing-selected .shareinput').val()
														}
											dgoThumbsArray[id].ThumbnailSetting.push(obj);
										}
									}
								}	
							}else{		
								dgoThumbsArray[id].ThumbnailSetting = new Array();
								if(jQuery('.motifSharing-selected .shareinput').val() != undefined){
									var obj = {
											"Key": "Api.Metadata.Visibility",
											"Type" : "System.String",
											"Value": jQuery('.motifSharing-selected .shareinput').val()
											}
									dgoThumbsArray[id].ThumbnailSetting.push(obj);
								}
								
								var objStatus = {
													"Key": "Api.Metadata.ReviewState",
													"Type" : "System.String",
													"Value": jQuery('.popup-status-select').val()
												}
								
								dgoThumbsArray[id].ThumbnailSetting.push(objStatus);
							}							
							UpdateThumbnailsFromUser(id, "normprint", "save");				
						}
					});
				}		    	
			}
		}else{
			jQuery('.center-details-des-name').css('border-color','red');
			jQuery('.center-details-des-des').css('border-color','red');
		}
	}); 
			 
	jQuery(".center-details-addkeyword").click(function(){
		if(jQuery('.center-details-addkeyword-input input').val() != ""){
			var id = jQuery('.current-motive-id').val();
			
			if(dgoThumbsArray[id].ThumbnailSetting == undefined){
				dgoThumbsArray[id].ThumbnailSetting = new Array();

				if(globalLanguage != "EN"){
					jQuery.blockUI(0);	
					//create a new api object
					var api = new delivergo.api();  
						
					if(globalPortalUri != null)
						api.PortalUriBase = globalPortalUri;

					//change portal for nhain.vn
					api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
					
					//change url to ajaxproxy file
					api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';  

					api.Request.Value = new Array();

					var objKeyword = {
									 "Source":{
										"LanguageToken": globalLanguage,
										"Name": jQuery('.center-details-addkeyword-input input').val()
									 },
									 "Translations":[
										{
										   "LanguageToken":"EN"
										}
									 ]
								  }
					
					api.Request.Value.push(objKeyword);					
					
					api.GetTranslationFromApi(function( result ){  		    	    		
							var obj = {
									"Key": "Api.Metadata.Keyword.EN",
									"Type" : "System.String",
									"Value": result.Value[0].Translations[0].Name
										}
							dgoThumbsArray[id].ThumbnailSetting.push(obj);
							
							var obj = {
									"Key": "Api.Metadata.Keyword."+globalLanguage,
									"Type" : "System.String",
									"Value": jQuery('.center-details-addkeyword-input input').val()
										}
							
							dgoThumbsArray[id].ThumbnailSetting.push(obj);			    	    		
							UpdateThumbnailsFromUser(id, "normprint", "add-keyword");
					});
														
				}else{
					var obj = {
							"Key": "Api.Metadata.Keyword."+globalLanguage,
							"Type" : "System.String",
							"Value": jQuery('.center-details-addkeyword-input input').val()
								}
					
					dgoThumbsArray[id].ThumbnailSetting.push(obj);
					jQuery.blockUI(0);
					UpdateThumbnailsFromUser(id, "normprint", "add-keyword");
				}
			}else{
				if(globalLanguage != "EN"){	
					jQuery.blockUI(0);
					//create a new api object
					var api = new delivergo.api();  
						
					if(globalPortalUri != null)
						api.PortalUriBase = globalPortalUri;

					//change portal for nhain.vn
					api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;
					
					//change url to ajaxproxy file
					api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';  

					api.Request.Value = new Array();

					var objKeyword = {
									 "Source":{
										"LanguageToken": globalLanguage,
										"Name": jQuery('.center-details-addkeyword-input input').val()
									 },
									 "Translations":[
										{
										   "LanguageToken":"EN"
										}
									 ]
								  }
					
					api.Request.Value.push(objKeyword);					
					
					api.GetTranslationFromApi(function( result ){  		    	    		
							var obj = {
									"Key": "Api.Metadata.Keyword.EN",
									"Type" : "System.String",
									"Value": result.Value[0].Translations[0].Name
										}
							dgoThumbsArray[id].ThumbnailSetting.push(obj);
							
							var obj = {
									"Key": "Api.Metadata.Keyword."+globalLanguage,
									"Type" : "System.String",
									"Value": jQuery('.center-details-addkeyword-input input').val()
										}
							
							dgoThumbsArray[id].ThumbnailSetting.push(obj);			    	    		
							UpdateThumbnailsFromUser(id, "normprint", "add-keyword");
					});
														
				}else{
					var obj = {
							"Key": "Api.Metadata.Keyword."+globalLanguage,
							"Type" : "System.String",
							"Value": jQuery('.center-details-addkeyword-input input').val()
								}
					
					dgoThumbsArray[id].ThumbnailSetting.push(obj);
					jQuery.blockUI(0);
					UpdateThumbnailsFromUser(id, "normprint", "add-keyword");
				}
			}

			
		}
	}); 
	//event for sharing dropdown
	jQuery('.motif-sharing-item').click(function(){
		jQuery('.motif-sharing-item').removeClass('motifSharing-selected');
		jQuery(this).addClass('motifSharing-selected');			
		jQuery('#share-dropdown-text').html(jQuery(this).children('.share-box-ele-text').html());
		jQuery(this).children('.share-box-ele-input').children('input').attr('checked','checked');
	});   
	jQuery(".popup-center-close-button").click(function(){
		jQuery('.center-details-des-name input').val('');
		jQuery('.center-details-des-des textarea').val('');
		jQuery('.popup-share-container').hide();
		jQuery('.popup-salesunit-container').hide();
		jQuery('.popup-content-container').hide();
		jQuery('.center-details-des-name').css('border-color','#CCC');
		jQuery('.center-details-des-des').css('border-color','#CCC');			
		jQuery( ".myproduct-hover-popup" ).dialog('close');
	});    
	jQuery(".popup-cancel-button").click(function(){
		jQuery('.center-details-des-name input').val('');
		jQuery('.center-details-des-des textarea').val('');
		jQuery('.popup-share-container').hide();
		jQuery('.popup-salesunit-container').hide();
		jQuery('.popup-content-container').hide();
		jQuery('.center-details-des-name').css('border-color','#CCC');
		jQuery('.center-details-des-des').css('border-color','#CCC');
		jQuery( ".myproduct-hover-popup" ).dialog('close');
	});    
	jQuery(".salesunit-box-ele-checkall").click(function(){
		jQuery('.input-salesunit').attr('checked','checked');
	});    
	jQuery(".salesunit-box-ele-none").click(function(){
		jQuery('.input-salesunit').attr('checked','');
	});    			
});