var dialog_setting_flag = false; //setting events once.
jQuery(document).ready(function(){    
	jQuery('.orientation-format').click(function(){
		if(jQuery(this).children('input').val() != jQuery('.orientation-selected').children('input').val()){
			jQuery('.orientation-format').removeClass('orientation-selected');
			jQuery(this).addClass('orientation-selected');
			
			//mask orientation
			img_current.Orientationed = true;
			
			//img_current.FrameBeginCalculate();
			//img_current.ImageBeginCalculate();
			//img_current.ZoomCropCalculate();
			//save settings
			img_current.CropSettingsArchive();
			img_current.CropSettings.Zoom = 0;
			img_current.CropSettings.ImageTop = 0;
			img_current.CropSettings.ImageLeft = 0;

			ImageCropFunctionCall(img_current.ImgHandle, img_current.ProductWidth, img_current.ProductHeight, true);
			
			/*img_current.FrameBeginCalculate();
			img_current.ImageBeginCalculate();
			img_current.ZoomCropCalculate();
			//remove loading icon
			jQuery(img_current.DialogID + img_current.CropOverlay).hide();
			jQuery(img_current.DialogID + img_current.LoadingClass).hide();*/
		}
	});
});


function ImageCropCreate(){
	//declare crop object
	var ImageCropObj = new delivergoCrop();
	
	//authencation object
	var AuthenConfigObj = {
		PortalID: PortalGuid,
		//UserID: (dgoGuid == null || dgoGuid == '') ? UserGuid : dgoGuid
	}
	ImageCropObj.SetAuthenConfig(AuthenConfigObj);
	
	return ImageCropObj;
}


function ImageCropFunctionCall(handle, product_width, product_height, reload){
	var img_handle = handle.replace(/-/g, '');
	
	if(eval('img' + img_handle) == undefined){
		//create new crop object
		eval('img' + img_handle + ' = ImageCropCreate()');
		
		//add img img infos to crop object
		eval('img' + img_handle).IntegrateImage(pics_arr[img_handle]);
	}
	
	//setting infos for cropping
	img_current = eval('img' + img_handle);
	
	//check the userguid again
	//var current_userguid = img_current.
	
	//check using mask or not
	if(jQuery('#crop-mask-flag').val() == 'orientation'){
		img_current.MaskCroppingActive = false;
	}else{
		img_current.MaskCroppingActive = true;
	}
	if(img_current.MaskCroppingActive){
		if(img_current.MaskCroppingType == null){
			img_current.MaskCroppingType = jQuery(img_current.DialogID + '#masks-dropdown .mask-selected input').val().split('_')[1];
		}else{
			jQuery(img_current.DialogID + '#masks-dropdown').find('div').each(function(){
				if(jQuery(this).children('input').val().split('_')[1] == img_current.MaskCroppingType){
					jQuery(this).click();
				}
			});	
		}
	}
	
	if(!img_current.MaskCroppingActive){
		jQuery(img_current.DialogID + '.crop-mask-div').hide();
		jQuery(img_current.DialogID + '.crop-orientation-div').show();
	}else{
		jQuery(img_current.DialogID + '.crop-mask-div').show();
		jQuery(img_current.DialogID + '.crop-orientation-div').hide();
	}
	
	//load the image
	var imgUri = (img_current.CropSettings.ImageRotateRender == null) ? img_current.ImgThumb : img_current.CropSettings.ImageRotateRender;
	if(img_current.ImgRender != null){
		imgUri = img_current.ImgRender;
	}
	if(imgUri == null){
		imgUri = img_current.ImgUri;
	}
	
	//get result and show the image
	if(reload == null || reload == undefined){
		jQuery(img_current.DialogID + img_current.CropOverlay).show();
		jQuery(img_current.DialogID + img_current.ImageCropID).hide();
		jQuery(img_current.DialogID + img_current.LoadingClass).show();
	
		setTimeout(function(){
			jQuery(img_current.DialogID + img_current.ImageCropID).load(function(){
	
				//remove loading icon
				jQuery(img_current.DialogID + img_current.CropOverlay).hide();
				jQuery(img_current.DialogID + img_current.LoadingClass).hide();
			
				//show the image
				jQuery(this).show();
				
			})
			.error(function(){})
		    .attr({'src': imgUri});
		}, 1000);
	}
	
	//the product size	
	if(product_width != undefined && product_height != undefined){
		img_current.SetProductSize(product_width, product_height);
	}
	
	//change width and height of image if rotation changed
	var rotate_flag = false;
	if(img_current.CropSettings.RotateAngle == 90 || img_current.CropSettings.RotateAngle == 270){
		rotate_flag = true;
	}
	
	img_current.FrameBeginCalculate();
	//change the cropping image
	if(rotate_flag){
		//change width to height
		img_current.ImageBeginCalculate(img_current.ImgHeight, img_current.ImgWidth);
	}else{
		//change width to height
		img_current.ImageBeginCalculate(img_current.ImgWidth, img_current.ImgHeight);
	}
	img_current.ZoomCropCalculate();
	
	if(!dialog_setting_flag){
		dialog_setting_flag = true;
		
		var class_drag = "#mask-crop-form #ghost-div";
		
		//trick for IE
		if(navigator.userAgent.indexOf('MSIE') != -1){
			if(!img_current.MaskCroppingActive){
				class_drag = "#mask-crop-form #image-crop-img"; 
			}
		}
		
		//ghost draggable
		jQuery(class_drag).draggable({              
		  drag: function(event, ui) {     
		        var pos = ui.helper.position();
		        jQuery("#mask-crop-form #image-crop-img").css({
		          left: pos.left,
		          top: pos.top
		        });
		        
		        //save settings
				img_current.CropSettingsArchive();
		      }
		     //helper: "#ghost"
		     ,
		     cursor: 'pointer',
			 containment: '#mask-crop-form #image-crop-bound',
			 scroll: false
		});
		
		//create slider for crop picture
		jQuery(img_current.DialogID + "#crop-zoom-slider" ).slider({
		    value: 0,
		    min: 0,
		    max: 10,	    
		    slide: function(event, ui) { 
		    	var process_width = ui.value * 12;
		    	jQuery(img_current.DialogID + '#crop-zoom-process').width( process_width + 'px');
		    	
		    	img_current.ImgResizeWidth = Math.round(img_current.ImgResizeWidthDefault + img_current.ImgResizeWidthDefault * ui.value / 10);
				img_current.ImgResizeHeight = Math.round(img_current.ImgResizeHeightDefault + img_current.ImgResizeHeightDefault * ui.value / 10);			
				
				//zoom
				img_current.ZoomCropCalculate();
				
				//change label of zooming
				jQuery(img_current.DialogID + '#crop-image-zoom-percent').html(' ' + (ui.value + 1) + 'x');
				
				//save settings
				img_current.CropSettingsArchive(ui.value);
		    }
		});
		
		//mouse wheel
		jQuery(img_current.DialogID + '.image-crop-cut').mousewheel(function(event, delta) {
			//know the slider value here
			var slider_value = jQuery(img_current.DialogID + "#crop-zoom-slider" ).slider( "option", "value" );
	
			if (delta > 0 && slider_value < 10){
				slider_value++;
				jQuery(img_current.DialogID + "#crop-zoom-slider" ).slider( "option", "value", slider_value );
				
				var process_width = slider_value * 12;
		    	jQuery(img_current.DialogID + '#crop-zoom-process').width( process_width + 'px');
		    	
				img_current.ImgResizeWidth = Math.round(img_current.ImgResizeWidthDefault + img_current.ImgResizeWidthDefault * slider_value / 10);
				img_current.ImgResizeHeight = Math.round(img_current.ImgResizeHeightDefault + img_current.ImgResizeHeightDefault * slider_value / 10);
				
				//zoom
				img_current.ZoomCropCalculate();
				
				//save settings
				img_current.CropSettingsArchive(slider_value);
			}else if (delta < 0 && slider_value > 0){
				slider_value--;
				jQuery(img_current.DialogID + "#crop-zoom-slider" ).slider( "option", "value", slider_value );
				
				var process_width = slider_value * 12;
		    	jQuery(img_current.DialogID + '#crop-zoom-process').width( process_width + 'px');
		    	
		    	img_current.ImgResizeWidth = Math.round(img_current.ImgResizeWidthDefault + img_current.ImgResizeWidthDefault * slider_value / 10);
				img_current.ImgResizeHeight = Math.round(img_current.ImgResizeHeightDefault + img_current.ImgResizeHeightDefault * slider_value / 10);
				
				//zoom
				img_current.ZoomCropCalculate();
				
				//save settings
				img_current.CropSettingsArchive(slider_value);
			}	
			
			//change label of zooming
			jQuery(img_current.DialogID + '#crop-image-zoom-percent').html(' ' + (slider_value + 1) + 'x');
				
			return false;
		});
	}
	
	//reset cropping zoom
	jQuery(img_current.DialogID + "#crop-zoom-slider" ).slider( "option", "value", 0 );
	jQuery(img_current.DialogID + '#crop-zoom-process').width('0px');
	jQuery(img_current.DialogID + '#crop-image-zoom-percent').html(' 1x');
	
	//image cropping settings reset
	if(img_current.CropSettings.Zoom != undefined){
		img_current.CropSettingsReset();
	}else{
		//save settings		
		setTimeout(function(){
			img_current.CropSettingsArchive();
		}, 1000);
	}
				
	//mark this image is editted
	img_current.ImageCropped = true;
	jQuery('.crop-picture-border-selected .handle_tick').show();
	
	if(reload != null && reload != undefined){
		jQuery(img_current.DialogID + img_current.LoadingClass).hide();
	}
}

//functions
function SliderCropLeftMove(){
	if(jQuery(".image-crop-slider-content").position().left < 0){
		jQuery(".image-crop-slider-content").animate({left:'+=67'},500);
	}	
}

function SliderCropRightMove(){
	if((jQuery(".image-crop-slider-content").width() + jQuery(".image-crop-slider-content").position().left) > (67 * 5)){
		jQuery(".image-crop-slider-content").animate({left:'-=67'},500);
	}
}

//Function rotate event
function ImageRotateFunc(angle){
	if(img_current.RotateAngle != angle){
		var rotate_flag = false;
		if(angle == 90 || angle == 270){
			rotate_flag = true;
		}
		
		//set the angle
		img_current.RotateAngle = angle;
		
		//add loading
		jQuery(img_current.DialogID + img_current.CropOverlay).show();
		jQuery(img_current.DialogID + img_current.LoadingClass).show();
		
		//rotate
		img_current.ImageRotate(function(result){
			jQuery(img_current.DialogID + img_current.ImageCropID).hide();
			jQuery(img_current.DialogID + img_current.LoadingClass).show();
			
			//set the image rotated render
			img_current.ImgRotateRender = img_current.RenderImageUri + img_current.ImgWidth + '&h=' + img_current.ImgHeight + '&a=' + result.Value.ActionId;
			
			//get result and show the image
    		jQuery(img_current.DialogID + img_current.ImageCropID).load(function(){
	    		//remove loading icon
	    		jQuery(img_current.DialogID + img_current.CropOverlay).hide();
				jQuery(img_current.DialogID + img_current.LoadingClass).hide();
			
				//show the image
				jQuery(this).show();
				
				//save settings
				img_current.CropSettingsArchive();
	    	})
	    	.error(function(){})
	    	.attr({src: img_current.RenderImageUri + img_current.ImgWidth + '&h=' + img_current.ImgHeight + '&a=' + result.Value.ActionId });
	    	
	    	//change the cropping image
	    	if(rotate_flag){
	    		//change width to height
	    		img_current.ImageBeginCalculate(img_current.ImgHeight, img_current.ImgWidth);
	    	}else{
	    		//change width to height
	    		img_current.ImageBeginCalculate(img_current.ImgWidth, img_current.ImgHeight);
	    	}
			
	    	img_current.ZoomCropCalculate();
		});
	}
}