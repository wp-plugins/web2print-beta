imageHandleArray	= {imageHandleArray};
shop_articles 		= {shopArticles};
guidUserInShopCart  = '{guidUserShopCart}';
paymentsArray		= null;
shipmentArray		= null;
if(guidUserInShopCart != '')
	dgoGuid = guidUserInShopCart;
dgoCurrentPage 		= "shoppingCart";
maskArray 			= {maskArray};
var InfoBeforeCheckout = {Info_Before_Checkout};	

if(shop_articles != null){
	if(shop_articles.length > 0){		
		finalSumCost();			 
	}
}
var dgoAddressSession 	= new Array();
	dgoAddressSession   = {addressSession};

{pictureObjectJsDefine}

var img_current = null;
var pic_import_arr = {pic_import_arr};
var pics_arr = new Array();

if(pic_import_arr != null){
	for(var i = 0; i < pic_import_arr.length; i++){
		var _handle = pic_import_arr[i].Handle.replace(/-/g, '');
		pics_arr[_handle] = pic_import_arr[i];
	}
}

jQuery(document).ready(function(){	
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
    
    //check cropping
     if(PortalGuid == null){
		apiGetPortal('PortalForCrop', function(guid){
			PortalGuid = guid;
			
        	setTimeout(function () {
		        croppingPopupCheck();		
			}, 1000);		
		});
	}else{
		setTimeout(function () {
	        croppingPopupCheck();		
		}, 1000);
	}
});

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
					
					//set image on cart
					//handle the picture in shopcart
					var parent_class = jQuery(bordersidebarclass).children('.parent_class').val();
					jQuery(parent_class).find('.img_cut').load(function(){
						//increase count
						_count++;
						
						if(_count == _goal){
							//
							jQuery(img_current.CropOverlay).hide();
							jQuery(img_current.LoadingClass).hide();
							
							//close dialog
							jQuery('#mask-crop-form').dialog('close');
						}
					}).attr({src: image_link});
					
					if(jQuery('.'+image_handle.replace(/-/g, '')).attr('src') != undefined){
						//reload image in shopCart header						
						jQuery('.'+image_handle.replace(/-/g, '')).attr({src: image_link});
					}
					
					//save to session
			    	var _article_id = jQuery(parent_class).parent().parent().children('.article-id').val();
			    	
			    	if(_img_current.ImgWidth > _img_current.ImgHeight){	
			    		var format = 'picture_landscape'; 		
			    	}else{
			    		var format = 'picture_portrait';
			    	}
			    	
			    	var dataString = "option=image_change&article=" + _article_id + "&width=" + _img_current.ImgWidth + "&height=";
			    	dataString += _img_current.ImgHeight + "&format=" + format + "&handle=" + image_handle;

					jQuery.ajax({
						type: "GET",
						url: web_2_print_blogInfo + "inc/ajax/ajaxCutting.php",
						data: dataString,
						success: function(data){   				
							//console.log(data);
						}				
					});
					
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
				var image_handle = result.Value.ImageHandle.replace(/-/g, '');
				
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
				
				if(jQuery('.'+image_handle).attr('src') != undefined){				
					jQuery('.'+image_handle).load(function(){}).attr({src: image_link});
				}
				
				//set image on cart
				//handle the picture in shopcart
				var parent_class = jQuery(bordersidebarclass).children('.parent_class').val();
				jQuery(parent_class).find('.img_cut').load(function(){
					//increase count
					_count++;
					
					if(_count == _goal){						
						jQuery(img_current.CropOverlay).hide();
						jQuery(img_current.LoadingClass).hide();
						
						//close dialog
						jQuery('#mask-crop-form').dialog('close');
					}
				}).attr({src: image_link});
				
				if(jQuery('.'+image_handle.replace(/-/g, '')).attr('src') != undefined){					
					//reload image in shopCart header
					jQuery('.'+image_handle.replace(/-/g, '')).attr({src: image_link});
				}
				
				//save to session
		    	var _article_id = jQuery(parent_class).parent().parent().children('.article-id').val();
		    	
		    	if(_img_current.ImgWidth > _img_current.ImgHeight){	
		    		var format = 'picture_landscape';
		    		var size = scaleSize(40, 40, _img_current.ImgWidth, _img_current.ImgHeight);   
		    		jQuery('.'+image_handle).attr({height: size[1]});
		    		jQuery('.'+image_handle).attr({width: size[0]}); 		
		    	}else{
		    		var format = 'picture_portrait';
		    		var size = scaleSize(40, 40, _img_current.ImgWidth, _img_current.ImgHeight);   
		    		jQuery('.'+image_handle).attr({height: size[1]});
		    		jQuery('.'+image_handle).attr({width: size[0]});
		    	}
		    	
		    	var dataString = "option=image_change&article=" + _article_id + "&width=" + _img_current.ImgWidth + "&height=";
		    	dataString += _img_current.ImgHeight + "&format=" + format + "&handle=" + image_handle;

				jQuery.ajax({
					type: "GET",
					url: web_2_print_blogInfo + "inc/ajax/ajaxCutting.php",
					data: dataString,
					success: function(data){   										
					}				
				});
				
				//reset cropping settings
				//_img_current.CropSettings = {};
				
				_img_current.CropSettings.Zoom = 0;
				_img_current.CropSettings.ImageTop = 0;
				_img_current.CropSettings.ImageLeft = 0;
			});
		}
	}

}