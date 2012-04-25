/*================Ready function====================*/
jQuery(function(){
	//mask crop dialog
	jQuery(function() {
        jQuery( "#mask-crop-form" ).dialog({
            title: jQuery('#mask-crop-form .translate-title').val() + '<div class="ex-close-button"></div>',
            autoOpen: false,                            
            width: 590,
            dialogClass: "dgo-dialog-class dgo-dialog-crop",
            modal: true,    
            zIndex: 5001,
            resizable: false
        });                   
    });
    
	jQuery('.tabs-menu .tab').click(function(){
		jQuery('.tabs-menu .tab').removeClass('tab-selected');
		jQuery(this).addClass('tab-selected');
		
		jQuery('#fb-controls-tab').attr({'class': ''});
		jQuery('#fb-controls-tab').addClass(jQuery(this).children('input').val());
	});
	
	//generate link and send it to shopping cart
	sendDesignToShoppingCart = function(actionId) {
		//create printdata link
		var linkToPdf = 'http://api.delivergo.com/content.beta/RenderTemplate.aspx?actionId=' + actionId;
		jQuery.unblockUI();
		
		//TODO: send link to shoppingcart here!
		global_price_object[order_price_chosen].PrintData[0].Items.push(linkToPdf);
		
		//leave object to hidden input
		jQuery('#prices-import').val(JSON2.stringify(global_price_object[order_price_chosen]));
		
		//save order to session
		//go to shopcart
		jQuery('#multiSelectSubmitForm').submit();
		/*jQuery.post('inc/shop_cart_redirect.php', 
			{ data: JSON2.stringify(product_price) }, 
			showResult, 
			"text"
		);*/
	}
	
	renderTemplate = function(){
		//generate pdf and send it to shopping cart
		dgo.design.renderDesign(sendDesignToShoppingCart);
	}
	
	renderTemplateAsImg = function(){
		var linkToImg = 'http://api.delivergo.com/content.beta/RenderTemplate.aspx?sessionId='+ dgo.getCurrentState().SessionId +'&f=img';
		//window.open(linkToImg,"_blank");//TODO: remove that
		
		//save the link image to PrintData
		var print_data = {
    		GroupName: 'Group1',
    		Items: [ linkToImg ]
    	};
    	
    	global_price_object[order_price_chosen].Pictures = [];
    	global_price_object[order_price_chosen].PrintData = [];
    	global_price_object[order_price_chosen].PrintData.push(print_data);
		
		//generate pdf and send it to shopping cart
		dgo.design.commitHtml(false, renderTemplate, true, false);
	}
	
	//add to cart button
	jQuery('#addtocart-button').click(function(){
		jQuery.blockUI();
		
		//get design image
		dgo.design.commitHtml(false, renderTemplateAsImg, true, false);	
	});
});

//sum-price change
function sum_price_change(){
	if(jQuery('#sum-text').next('input').val() == 'summe'){
		jQuery('#sum-text').html('Einzelpreis');
		jQuery('#sum-text').next('input').val('einzelpreis');
		jQuery('.price-is-text').html('Summe:');
		
		if(jQuery('#cross-start-value').val() == ""){
			//change the price
			var EndPrices = parseFloat(jQuery('#price-start-value').val()) * parseInt(jQuery('.amount-input').val());				

			jQuery('.price-start-value').animate({top: '25px'}, 500, function(){
				//change cross price				
				jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
				
				//price trick html
				jQuery('.price-start-value-trick').html(jQuery('.price-start-value').html());
				
				jQuery('.price-start-value').animate({top: '-25px'}, 0, function(){});
				jQuery('.price-start-value').animate({top: '0px'}, 500, function(){});				
			});
		}else{
			//change the price
			var EndPrices = parseFloat(jQuery('#price-start-value').val()) * parseInt(jQuery('.amount-input').val());	
			var CrossPrice = parseFloat(jQuery('#cross-start-value').val()) * parseInt(jQuery('.amount-input').val());

			jQuery('.price-start-value').animate({top: '25px'}, 500, function(){
				//change cross price
				jQuery('.cross-start-value').html(formatCurrency(CrossPrice, dgoCurrencies));
				jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
				
				//price trick html
				jQuery('.price-start-value-trick').html(jQuery('.price-start-value').html());
				
				jQuery('.price-start-value').animate({top: '-25px'}, 0, function(){});
				jQuery('.price-start-value').animate({top: '0px'}, 500, function(){});
				
				if(formatCurrency(CrossPrice, dgoCurrencies).length > 7){
					jQuery('.cross-start-value').hide();
				}else{
					jQuery('.cross-start-value').show();
				}
			});
		}
	}else{
		jQuery('#sum-text').html('Summe');
		jQuery('#sum-text').next('input').val('summe');
		jQuery('.price-is-text').html('Preis je:');
		
		if(jQuery('#cross-start-value').val() == ""){
			//change the price
			var EndPrices = parseFloat(jQuery('#price-start-value').val());				

			jQuery('.price-start-value').animate({top: '-25px'}, 500, function(){
				//change cross price				
				jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
				
				//price trick html
				jQuery('.price-start-value-trick').html(jQuery('.price-start-value').html());
				
				jQuery('.price-start-value').animate({top: '25px'}, 0, function(){});
				jQuery('.price-start-value').animate({top: '0px'}, 500, function(){});				
			});
		}else{
			//change the price
			var EndPrices = parseFloat(jQuery('#price-start-value').val());	
			var CrossPrice = parseFloat(jQuery('#cross-start-value').val());

			jQuery('.price-start-value').animate({top: '-25px'}, 500, function(){
				//change cross price
				jQuery('.cross-start-value').html(formatCurrency(CrossPrice, dgoCurrencies));
				jQuery('.price-start-value').html(formatCurrency(EndPrices, dgoCurrencies));
				
				//price trick html
				jQuery('.price-start-value-trick').html(jQuery('.price-start-value').html());
				
				jQuery('.price-start-value').animate({top: '25px'}, 0, function(){});
				jQuery('.price-start-value').animate({top: '0px'}, 500, function(){});
				
				if(formatCurrency(EndPrices, dgoCurrencies).length > 7){
					jQuery('.cross-start-value').hide();
				}else{
					jQuery('.cross-start-value').show();
				}
			});
		}
	}
}

//dgo upload function
//function reset and close dialog when done
function dgouploadcomplete(){
	//reset status
	jQuery('#MultiUploadForm #uploading-file').html('');
	jQuery('#MultiUploadForm #uploading-remain').html('');
	jQuery('#MultiUploadForm #uploading-speed').html('');
	
	//close dialog
	jQuery('#MultiUploadForm').dialog('close');
	
	//upload complete handler
	if(dgoUploadPictures.length > 0){
		//import picture to Crop Pictures				
		var img_slide_html = '';
		for(var i = 0; i < dgoUploadPictures.length; i++){
			//var img_html = "<img width=50 src='"+ dgoUploadPictures[i].ThumbnailUri +"' onclick='ImageCropFunctionCall(\""+ dgoUploadPictures[i].Handle +"\")'/>";
			//var img_html = '<div><a class="img-cover" title="Pic_Mask" hash="javascript:void(0)"><img alt="Picture" style="width:' + size[0] + 'px;height:' + size[1] + 'px" src="' + v.ThumbnailUri + '" bigthumb="' + imagesource + '"></div>';
			//jQuery('.picture-area').append(img_html);	
			//add the small thumbs to the sidebar
			var img_selected = '';
			if(i == 0){ img_selected = 'crop-picture-border-selected';}
			var _imageFag = (parseInt(dgoUploadPictures[i].ImageWidth) > parseInt(dgoUploadPictures[i].ImageHeight)) ? 'picture_landscape' : 'picture_portrait';
			
			img_slide_html += '<li class="crop-picture-li"><div class="crop-picture-border crop-picture-border'+ dgoUploadPictures[i].Handle.replace(/-/g, '') +' '+ img_selected +'"><img class="img-sidebar '+ _imageFag +'" file="'+ dgoUploadPictures[i].ImageUri +'" src="'+ dgoUploadPictures[i].ThumbnailUri +'" /><img class="handle_tick" src="'+ web_2_print_blogInfo +'css/img/icon/tick_green.png" />';
			img_slide_html += '<input class="handle" type="hidden" value="'+ dgoUploadPictures[i].Handle +'"><input class="name" type="hidden" value="'+ dgoUploadPictures[i].Filename +'"><input class="width" type="hidden" value="'+ dgoUploadPictures[i].ImageWidth +'"><input class="height" type="hidden" value="'+ dgoUploadPictures[i].ImageHeight +'">';
			//img_slide_html += '<div class="amount"><span>1</span><input type="hidden" value="1"><div class="arrow"></div></div>';
			
			//define image object
			var _handle = dgoUploadPictures[i].Handle.replace(/-/g, '');
			eval('img' + _handle  + ' = undefined');
			
			//add to pics_arr
			pics_arr[_handle] = dgoUploadPictures[i];
			
			//block screen
			jQuery.blockUI(0);
			
			if(dgoGuid != null && dgoGuid != ""){
				var imageObject = [{
	 							"Filename": dgoUploadPictures[i].Handle,
	 							"IdPortal": PortalGuid,	 							
	 							}];
	 					
	 			//assign uploaded pictures to user
	 			AssignThumbnailsToUser(dgoGuid, "Upload", "normprint", imageObject); 	
			}else{
				var imageObject = [{
	 							"Filename": dgoUploadPictures[i].Handle,
	 							"IdPortal": PortalGuid,	 							
	 							}];
	 					
	 			//assign uploaded pictures to user
	 			AssignThumbnailsToUser(UserGuid, "Upload", "normprint", imageObject); 	
			}
		}
		
		//append html
		jQuery('.image-crop-slider-content').empty().append(img_slide_html);
		jQuery(".image-crop-slider-content").width(67 * dgoUploadPictures.length);
		
		//use for product detail
		var product_width = formats_object[jQuery('.content-size-selected .size-value').val()].forwidth;
		var product_height = formats_object[jQuery('.content-size-selected .size-value').val()].forheight;
			
		//click event
		jQuery('.crop-picture-border').click(function(){
			
			var handle_select = jQuery(this).children('.handle').val();
		
			if(img_current.ImgHandle.replace(/-/g, '') != handle_select){
				//change the selected
				jQuery('.crop-picture-border').removeClass('crop-picture-border-selected');
				jQuery(this).addClass('crop-picture-border-selected');

				//call the crop function
				ImageCropFunctionCall(handle_select, product_width, product_height);
			}
		});
		
		//call the crop function
		ImageCropFunctionCall(dgoUploadPictures[0].Handle, product_width, product_height);
		
		//reset array
		proDgoUploadPictures = dgoUploadPictures;
		dgoUploadPictures = [];
		
		//open cropping dialog
		jQuery('#mask-crop-form').dialog('open');
	}
}

{dgocropjstpl}
	
//finish all cropping
function DoAllImageCrop(){
	//check if some objects are not handled
	var unHandleArr = new Array();
	var HandleArr = new Array();

	jQuery(img_current.DialogID + '.image-crop-slider-content').find('.crop-picture-border').each(function(index){
		var _handle = jQuery(this).children('.handle').val().replace(/-/g, '');
		
		if(eval('img' + _handle) == undefined){
			//create new crop object
			eval('img' + _handle + ' = ImageCropCreate()');
			
			//add img img infos to crop object
			eval('img' + _handle).IntegrateImage(pics_arr[_handle]);
		}
		
		if(!eval('img' + _handle).ImageCropped){
			unHandleArr.push(_handle);
		}else{
			HandleArr.push(jQuery(this).children('.handle').val());
		}
	});
	
	if(unHandleArr.length > 0){
		var _text1 = {youhavealso};
		var _text2 = unHandleArr.length > 1 ? {somepictures} : {1picture};
		var _text3 = {whichnottouchedyet};
		
		if(confirm(_text1 + ' ' + _text2 + ' ' +  _text3)){
			//count number of images
			var _count = 0;
			var _goal = HandleArr.length;
				
			//begin with cropping
			for(var i = 0; i < HandleArr.length; i++){						
				//get the cropping settings
				var cropping_settings = eval('img' + HandleArr[i].replace(/-/g, '')).CropSettings;
	
				//begin cropping
				//waiting status
				jQuery(img_current.CropOverlay).show();
				jQuery(img_current.LoadingClass).show();
				
				//real action cutting
				img_current.CroppingPersist = true;
				
				img_current.ImageCrop(HandleArr[i], cropping_settings, function(result){
					//handle
					var image_handle = result.Value.ImageHandle.replace(/-/g, '');;
					
					//image render
					var image_link = img_current.RenderImageUri + result.Value.CropInfo.ViewportWidth + '&h=' + result.Value.CropInfo.ViewportHeight + '&a=' + result.Value.ActionId;
					
					var _img_current = eval('img' + image_handle.replace(/-/g, ''));
					
					//handle the cropped image
					_img_current.ImgRender = image_link;
					_img_current.ImgWidth = result.Value.CropInfo.ViewportWidth;
					_img_current.ImgHeight = result.Value.CropInfo.ViewportHeight;
					
					//handle the sidebar
					var imgsidebarclass = (result.Value.CropInfo.ViewportWidth > result.Value.CropInfo.ViewportHeight) ? 'picture_landscape' : 'picture_portrait';
					var bordersidebarclass = '.crop-picture-border' + image_handle.replace(/-/g, '');
					jQuery(bordersidebarclass).children('.img-sidebar').load(function(){
						jQuery(bordersidebarclass).children('.img-sidebar').attr({'class': 'img-sidebar ' + imgsidebarclass});
					}).attr({src: image_link});
					
					//increase count
					_count++;
	
					if(_count == _goal){
						//
						jQuery(img_current.CropOverlay).hide();
						jQuery(img_current.LoadingClass).hide();
						
						//close dialog
						//jQuery('#mask-crop-form').dialog('close');
					}
					
					//reset cropping settings
					//_img_current.CropSettings = {};
					
					_img_current.CropSettings.Zoom = 0;
					_img_current.CropSettings.ImageTop = 0;
					_img_current.CropSettings.ImageLeft = 0;
				});
			}
		}
	}else{
		//count number of images
		var _count = 0;
		var _goal = HandleArr.length;
			
		//begin with cropping
		for(var i = 0; i < HandleArr.length; i++){						
			//get the cropping settings
			var cropping_settings = eval('img' + HandleArr[i].replace(/-/g, '')).CropSettings;

			//begin cropping
			//waiting status
			jQuery(img_current.CropOverlay).show();
			jQuery(img_current.LoadingClass).show();
			
			//real action cutting
			img_current.CroppingPersist = true;
			
			
			img_current.ImageCrop(HandleArr[i], cropping_settings, function(result){
				//handle
				var image_handle = result.Value.ImageHandle.replace(/-/g, '');;
				
				//image render
				var image_link = img_current.RenderImageUri + result.Value.CropInfo.ViewportWidth + '&h=' + result.Value.CropInfo.ViewportHeight + '&a=' + result.Value.ActionId;
				
				var _img_current = eval('img' + image_handle.replace(/-/g, ''));
				
				//=================== Just using for product detail page ====================
				if(!img_current.MaskCroppingActive){
					//save the link image to PrintData
					var pictureArr = proDgoUploadPictures;
					var print_data_link = null;
					for(var i = 0; i < pictureArr.length; i++){
						if(pictureArr[i].Handle.replace(/-/g, '') == image_handle){
							//assign the link
							print_data_link = pictureArr[i].ThumbnailUri;
						}
					}
					
					var print_data = {
						GroupName: 'DETAILS_PRODUCT',
						Items: [ print_data_link ]
					};
					
					//append to print data element
					if(global_price_object[order_price_chosen].PrintData == undefined){
						global_price_object[order_price_chosen].PrintData = [];
					}									
					global_price_object[order_price_chosen].Pictures = [];
					if(global_price_object[order_price_chosen].PrintData.length == 0){
						global_price_object[order_price_chosen].PrintData.push(print_data);
					}else{
						global_price_object[order_price_chosen].PrintData[0].Items.push(print_data_link);
					}
				}else{
					//mask cropped settings
					if(mask_settings != undefined){
						_img_current.MaskSettings = mask_settings;
					}
					
					//mask background
					if(mask_arr != undefined && mask_background != undefined){
						_img_current.MaskBackground = mask_background;
					}
					
					//add current price object to this object
					_img_current.PriceObject = global_price_object[order_price_chosen];
			
					//remove others pictures inside Pictures object
					var _pictureObject = _img_current.PriceObject.Pictures;
					for(var i = 0; i < _pictureObject.length; i++){
						if(_pictureObject[i].Handle.replace(/-/g, '') != image_handle){
							_img_current.Pictures = [];
							_img_current.Pictures.push(_pictureObject[i]);
							break;
						}
					}
				}
				//=================== Just using for product detail page ====================
				
				//handle the cropped image
				_img_current.ImgRender = image_link;
				_img_current.ImgWidth = result.Value.CropInfo.ViewportWidth;
				_img_current.ImgHeight = result.Value.CropInfo.ViewportHeight;
				
				//handle the sidebar
				var imgsidebarclass = (result.Value.CropInfo.ViewportWidth > result.Value.CropInfo.ViewportHeight) ? 'picture_landscape' : 'picture_portrait';
				var bordersidebarclass = '.crop-picture-border' + image_handle.replace(/-/g, '');
				jQuery(bordersidebarclass).children('.img-sidebar').load(function(){
					jQuery(bordersidebarclass).children('.img-sidebar').attr({class: 'img-sidebar ' + imgsidebarclass});
					
					//increase count
					_count++;

					if(_count == _goal){
						//
						jQuery(img_current.CropOverlay).hide();
						jQuery(img_current.LoadingClass).hide();
						
						//close dialog
						jQuery('#mask-crop-form').dialog('close');
						
						//Product Preview
						ProductPreviewFill();
					}
				}).attr({src: image_link});
				
				//reset cropping settings
				//_img_current.CropSettings = {};
				
				_img_current.CropSettings.Zoom = 0;
				_img_current.CropSettings.ImageTop = 0;
				_img_current.CropSettings.ImageLeft = 0;
			});
		}
	}
}

//function close dialog and add cropped image to product preview
function ProductPreviewFill(){
	if(!img_current.MaskCroppingActive){			
			//leave object to hidden input
			//console.log(global_price_object[order_price_chosen]);
			jQuery('#prices-import').val(JSON2.stringify(global_price_object[order_price_chosen]));
		
			jQuery.blockUI(0);
		
			//submit form
			jQuery('#multiSelectSubmitForm').submit();
	}else{		
		var sidebarthumb = '';
		var sidebarthumbcount = 0;
		var show_mask_settings = {};
	
		jQuery('.image-crop-slider-content').find('.crop-picture-border').each(function(){
			var _handle = jQuery(this).children('.handle').val().replace(/-/g, '');
			
			//calculate mask size and position
			var thumbnail_setting = eval('img' + _handle).MaskSettings;
			
			for(var j = 0; j < thumbnail_setting.length; j++){
				switch(thumbnail_setting[j].Key){
					case "Metadata.Size.Width": 
						show_mask_settings.Width = thumbnail_setting[j].Value;
						break;
					case "Metadata.Size.Height": 
						show_mask_settings.Height = thumbnail_setting[j].Value;
						break;
					case "Metadata.ImgPosition.X": 
						show_mask_settings.ImgPosX	 = thumbnail_setting[j].Value;
						break;
					case "Metadata.Position.Y": 
						show_mask_settings.PosY = thumbnail_setting[j].Value;
						break;
					case "Metadata.ImgPosition.Y": 
						show_mask_settings.ImgPosY = thumbnail_setting[j].Value;
						break;
					case "Metadata.Position.X": 
						show_mask_settings.PosX = thumbnail_setting[j].Value;
						break;
					case "Metadata.Size.Image.Height": 
						show_mask_settings.ImgHeight = thumbnail_setting[j].Value;
						break;
					case "Metadata.Size.Image.Width": 
						show_mask_settings.ImgWidth = thumbnail_setting[j].Value;
						break;
				}
			}
			
			//small thumbs at sidebar
			var _rate = 50 / 460;
			var mask_thumb_bg = eval('img' + _handle).MaskBackground.MaskBackgroundThumb;
			var mask_thumb = eval('img' + _handle).MaskCroppingType;
			var mask_thumb_inside = eval('img' + _handle).ImgRender;
			
			sidebarthumb += '<div class="img-cover-mask"><img alt="Picture" style="width:50px;height:50px" src="' + mask_thumb_bg + '"/>';
			sidebarthumb += '<img alt="Mask" src="'+ mask_thumb +'" style="position: absolute; z-index: 4; width: '+ show_mask_settings.Width*_rate +'px; height: '+ show_mask_settings.Height*_rate +'px; top: '+ show_mask_settings.PosY*_rate +'px; left: '+ show_mask_settings.PosX*_rate +'px;" />';
			sidebarthumb += '<img alt="Mask Inside" src="'+ mask_thumb_inside +'" style="position: absolute; z-index: 3; width: '+ show_mask_settings.ImgWidth*_rate +'px; height: '+ show_mask_settings.ImgHeight*_rate +'px; top: '+ (show_mask_settings.ImgPosY*_rate + show_mask_settings.PosY*_rate) +'px; left: '+ (show_mask_settings.ImgPosX*_rate + show_mask_settings.PosX*_rate) +'px;" />';
			sidebarthumb += '<input type="hidden" value="'+ _handle +'" /><div class="amount amount-hide"><span>1</span><input type="hidden" value="1"><div class="arrow"></div></div></div>';

			sidebarthumbcount++;
		});

		//show the preview		
		jQuery('#prod-detail-leftside-preview .image-list-content').empty();
		jQuery('#prod-detail-leftside-preview .image-list-container').addClass('image-list-container-amount');
		jQuery('#prod-detail-leftside-preview .image-list-content').append(sidebarthumb);
		
		jQuery('#prod-detail-leftside-preview').show();
		jQuery('#prod-detail-leftside-standard').hide();
		
		//sidebar thumb click event
		jQuery('.img-cover-mask').click(function(){
			//change selected image
			jQuery('.img-cover-mask').removeClass('img-cover-mask-selected');
			jQuery(this).addClass('img-cover-mask-selected');
			
			var img_handle = jQuery(this).children('input').val();
			
			var mask_background = eval('img' + img_handle).MaskBackground.MaskBackgroundUri;
			var mask_thumb = eval('img' + img_handle).MaskCroppingType;
			var img_inside = eval('img' + img_handle).ImgRender;
			
			//load image
			jQuery('#div-loader-preview #background-img').attr({src: mask_background});
			
			jQuery('#img-mask-inside').load(function(){
				jQuery('#img-mask-inside').width(show_mask_settings.Width);
				jQuery('#img-mask-inside').css({top: parseFloat(show_mask_settings.PosY) + parseFloat(show_mask_settings.ImgPosY) + 'px'});
				jQuery('#img-mask-inside').css({left: parseFloat(show_mask_settings.PosX) + parseFloat(show_mask_settings.ImgPosX) + 'px'});
				
				jQuery('#img-mask').attr({src: mask_thumb});
				jQuery('#img-mask').width(show_mask_settings.Width);
				jQuery('#img-mask').css({top: show_mask_settings.PosY + 'px'});
				jQuery('#img-mask').css({left: show_mask_settings.PosX + 'px'});
			}).attr({src: img_inside});
			
			//change the amount
			var _amount = jQuery(this).children('.amount').children('input').val();
			
			//set amount
			jQuery('#runs-dropdown').find('.run-select').each(function(){
				if(jQuery(this).children('input').val() == _amount){
					jQuery(this).click();
				}
			});
		});
		
		//first click
		if(jQuery('.image-list-content .img-cover-mask-selected').length == 0){
			jQuery('.image-list-content .img-cover-mask:first-child').click();
		}
		
		//close dialog
		jQuery('#mask-crop-form').dialog('close');
		
		//change to add to cart button
		//remove designer control button
		jQuery('#customize-button').hide();
		//change the upload button to left and change name
		jQuery('#uploadify-wrapper').css({'float': 'left'});
		jQuery('#uploadify-wrapper .name').html('Upload more...');
		jQuery('#addtocart-button2').show();
	}
}

//product preview to shopcart
function preview2shopcart(){
	var product_arr = [];

	//
	jQuery('.image-list-content').find('.img-cover-mask').each(function(){
		var _handle = jQuery(this).children('input').val();
		
		var _image = eval('img' + _handle).ImgUri;
		var _mask = eval('img' + _handle).MaskCroppingType;
		var _background = eval('img' + _handle).MaskBackground.MaskBackgroundUri;
		var _settings = eval('img' + _handle).MaskSettings;
		
		//save the link image to PrintData
		var print_data = {
			GroupName: 'MASK_PRODUCT',
			Items: [ _image, _mask, _background]
		};
		//Settings: _settings
		//append to print data element
		var preview_price_object = eval('img' + _handle).PriceObject;
		preview_price_object.PrintData = [];
		preview_price_object.PrintDataSettings = _settings;
		preview_price_object.Pictures = [];
		preview_price_object.PrintData.push(print_data);
		
		product_arr.push(preview_price_object);
	});
	
	//save order to session
	jQuery('#multi_prices-import').val(JSON2.stringify(product_arr));
	jQuery('#shopMultiRedirectForm').submit();
}

//function load image
function loadImage(url,options){
	if(options == false){
		jQuery('#loader').show();
		jQuery('#reel-container').hide();
		
		jQuery('#loader').html('<img src="">');   				
		
		jQuery('#loader').attr('href',url);
		
		// wrap our new image in jQuery, then:
		jQuery('#loader img').load(function () {
			
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
			
	}else{
		jQuery('#reel-container').show();
		
		jQuery('#loader').empty();
		
		jQuery('#reel-container img').hide();
		
		
		// wrap our new image in jQuery, then:
		jQuery('#loader img').load(function () {
			
		})
				
		// if there was an error loading the image, react accordingly
		.error(function () {
		  // notify the user that the image could not be loaded
		})
			
		// *finally*, set the src attribute of the new image to our image
		.attr('src', url);
		
		
		jQuery('#img').reel({
            frames: 35, 
            saves: true 
        });
		
		jQuery('#img-reel').css({"margin":"0 auto","padding-top": "20px"});
		jQuery('#img-reel img').css({"height":"116px"});
		
	}
}

function customizeHandle(){
	jQuery('.prod-detail-part-1-leftside-content').hide();
	jQuery('#customize-button').hide();
	jQuery('#uploadify-wrapper').hide();
	jQuery('.fb-dgo-control').show();
	jQuery('.prod-detail-part-2-leftside-content').show();
	jQuery('#back-button').show();
	jQuery('#addtocart-button').show();
}

function backHandle(){
	jQuery('.prod-detail-part-1-leftside-content').show();
	jQuery('#customize-button').show();
	jQuery('#uploadify-wrapper').show();
	jQuery('.fb-dgo-control').hide();
	jQuery('.prod-detail-part-2-leftside-content').hide();
	jQuery('#back-button').hide();
	jQuery('#addtocart-button').hide();
}

/*====================Social Api (Comment & Rating)====================*/
function starRatingHandleCall(articleGuid){
	var rate_element = '#prod-detail-rating';
	
	GetSourceRating(articleGuid, function(result){
		var res = result.Value;
		var rateobj = null;
		var options = {
			postHref: 'http://localhost/debug/',
			method: "GET"
		};
		
		if(res[0] != undefined){
			rateobj = {
				AverageRating: res[0].AverageRating,
				AbsoluteRatingCount: res[0].AbsoluteRatingCount
			}
			
			if(res[0].RatingEntry != undefined){
				options.enabled = false;
			}
		}
		
		options.Id = articleGuid;
		
		options.setSourceRating = function(source, rating, callback){
			SetSourceRating(source, rating, function(result){
				callback(result);
			});
		}
		
		jQuery(rate_element).starRater(options, rateobj);			
	});
}

/*Function send comment click*/
function sendComment(){
	if(jQuery('#text-area').val() != ''){
		if(dgoGuidFlag == true){
			jQuery('#text-button').css('cursor', 'wait');
		
			SetSourceComment(function(result){
				if(result.Value != null){
					//save the comment to arr
					comment_arr['a_' + result.Value[0].Id] = result.Value[0];
				
					//add event
					commentAppendEvent(result.Value[0]);
					
					//clear text area
					jQuery('#text-area').val('');
				}
				
				jQuery('#text-button').css('cursor', 'pointer');
			});
		}else{
			//open login dialog
			jQuery('.loginForm').dialog('open');
		}
	}
}

/*Function append comment and event*/
function commentAppendEvent(res){
	var id = res.Id;
	var comment = res.Comment;
	var userid = res.UserId;
	var username = res.UserName;
	var like_number = 0;
	var like_time = res.Created.ParseRfcDate();
	like_time = like_time.format("dd.mm.yyyy - HH:MM:ss");
	
	if(res.Rating != undefined && res.Rating.RatingMethod == "PositiveNegative"){
		like_number = res.Rating.PositiveRatingCount;
	}

	//comments content
	var comment_content = '<div class="box-div box-div-'+ id +'"><input type="hidden" class="comment-id" value="'+ id +'" /><div class="box-div-content">'+ comment +'</div><br><strong>'+ username +'</strong>&nbsp&nbsp&nbsp<i>'+ like_time +'</i>&nbsp&nbsp&nbsp&nbsp&nbsp';
	if(userid == social_user_id){
		comment_content += '<div class="remove-icon" onclick="removeComment('+ id +')"></div>';
	}else{
		comment_content += '<div class="like like-hover like-us like-us-'+ id +'" onclick="commentUpRating('+ id +')">Like<div class="thumb-up"><div class="thumb-text">Vote Up</div><div class="thumb-icon"></div></div></div><div class="like like-hover unlike-us unlike-us-'+ id +'" onclick="commentDownRating('+ id +')"><div class="thumb-down"><div class="thumb-text">Vote Down</div><div class="thumb-icon"></div></div></div>';
	}
	if(like_number > 0){
		comment_content += '<span class="like-number">'+ like_number +'</span>' + '<img src="'+ web_2_print_blogInfo +'css/img/icon/thumb_up.png" />';
	}
		

	//append comments
	//jQuery('#comment-comments').append('<div class="box-div box-div-'+ id +'"><input type="hidden" class="comment-id" value="'+ id +'" /><div class="box-div-content">'+ comment +'</div><br><i>'+ username +'</i><div class="remove-icon" onclick="removeComment('+ id +')"></div><div class="like like-us like-us-'+ id +'" onclick="commentUpRating('+ id +')"><div class="thumb-up"><div class="thumb-text">Vote Up</div><div class="thumb-icon"></div></div></div><div class="like unlike-us unlike-us-'+ id +'" onclick="commentDownRating('+ id +')"><div class="thumb-down"><div class="thumb-text">Vote Down</div><div class="thumb-icon"></div></div></div></div>');
	//count the comment
	if(jQuery('img#comment-loading').length == 1){
		jQuery('img#comment-loading').remove();
	}
	if(jQuery('span#no-comment-span').length == 1){
		jQuery('span#no-comment-span').remove();
	}
	jQuery('#comment-comments').append(comment_content);
	
	//event
	jQuery('.box-div').hover(
		function(){
			var _id = 'a_' + jQuery(this).children('.comment-id').val();
			if(comment_arr[_id].UserId != social_user_id){
				jQuery(this).children('.like').show();
			}else{
				jQuery(this).children('.remove-icon').show();
			}
		},
		function(){
			jQuery(this).children('.like').hide();
			jQuery(this).children('.thumb-up').hide();
			jQuery(this).children('.thumb-down').hide();
			jQuery(this).children('.remove-icon').hide();
		}
	);
	
	//event
	jQuery('.box-div .like-hover').hover(
		function(){
			jQuery(this).children('div').show();
		},
		function(){
			jQuery(this).children('div').hide();
		}
	);
}

function removeRatingHover(id){
	var like_class = '.like-us-'+ id;
	var unlike_class = '.unlike-us-'+ id;
	
	//remove class hover
	jQuery(like_class).removeClass('like-hover');
	jQuery(like_class).hover(function(){
		jQuery(this).children('div').hide();
	});
	
	//remove class hover
	jQuery(unlike_class).removeClass('like-hover');
	jQuery(unlike_class).hover(function(){
		jQuery(this).children('div').hide();
	});
}

function getMasksFromPhp(option){
	var cur_format = formats_object[jQuery('.content-size-selected').children('.size-value').val()];
	var cur_format_w = parseInt(cur_format.forwidth);
	var cur_format_h = parseInt(cur_format.forheight);
	var count_mask = 0;
	jQuery('#masks-dropdown').empty();
	
	//write the mask dropdown
	for(var i = 0; i < mask_arr.length; i++){
		for(var j = 0; j < mask_arr[i].ThumbnailSetting.length; j++){
			if(mask_arr[i].ThumbnailSetting[j].Key == 'Metadata.Key' || mask_arr[i].ThumbnailSetting[j].Key == 'SubMetadata.Key'){
				var _key = mask_arr[i].ThumbnailSetting[j].Value.split('_');
				
				if(cur_format_w == parseInt(_key[1]) && cur_format_h == parseInt(_key[2])){
					//get master mask setting.
					if(mask_arr[i].Type.split(':')[0] == 'mask'){
						mask_settings = mask_arr[i].ThumbnailSetting;
					}
					
					//get mask background
					if(mask_arr[i].Type.split(':')[0].split('$')[2] == 'background'){
						mask_background = {MaskBackgroundThumb: mask_arr[i].ThumbnailUri, MaskBackgroundUri: mask_arr[i].ThumbnailUri.replace('thumb.', '')};
					}else{
						count_mask = 1;
						var file_name = mask_arr[i].ThumbnailTranslation[0].Name;
						var maskID = mask_arr[i].Type.split(':')[0].split('$')[1] != undefined ? mask_arr[i].Type.split(':')[0].split('$')[1] : mask_arr[i].Id;
						jQuery('#masks-dropdown').append('<div><img title="'+ file_name +'" src="'+ mask_arr[i].ThumbnailUri +'"><span>'+ file_name +'</span><input type="hidden" value="'+ maskID + '_' + mask_arr[i].Uri +'"></div>');
					}
				}
			}
		}
	}
	
	//set mask input flag
	if(count_mask > 0){
		jQuery('#crop-mask-flag').val('mask');
	}
	
	//mask list click
	jQuery('#masks-list').click(function(e){
		jQuery('#masks-dropdown').show();
		e.stopPropagation();
	});
	
	//mask click
	jQuery('#masks-dropdown div').click(function(e){
		jQuery('#masks-dropdown div').removeClass('mask-selected');
		jQuery(this).addClass('mask-selected');
		
		//add loading
		jQuery('.image-crop-loading').show();
		jQuery('#mask-div img').load(function(){
			jQuery('.image-crop-loading').hide();
		}).attr({src: jQuery('#masks-dropdown .mask-selected input').val().split('_')[1]});
		
		jQuery('#masks-list .mask-name').attr({"title": jQuery(this).children('span').html()});
		jQuery('#masks-list .mask-name').html(jQuery(this).children('span').html());
		jQuery('#mask-user-chosen').attr({src: jQuery(this).children('img').attr('src')});
		jQuery('#masks-dropdown').fadeOut(1);
		
		//set the mask
		if(img_current != null){
			img_current.SetTheMask(jQuery('#masks-dropdown .mask-selected input').val().split('_')[1]);
		}					
		
		e.stopPropagation();
	});
	
	jQuery('#masks-dropdown div:first-child').click();
	
	//mask dropdown blur
	jQuery("body").click(function (evt) {
	     var target = evt.target;
	     if(target.id != 'masks-dropdown'){
	            jQuery("#masks-dropdown").fadeOut(1);
	    }                
	});
}