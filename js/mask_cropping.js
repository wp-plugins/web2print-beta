//get picture from api
function getPictureFromApi(portal, user, handle, callback){
	//we have to check that the image finish upload or not every 10s
	var api = new delivergo.api.imaging();
		    
	/*if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal;
	
	api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';*/
	//set loading icon
	jQuery('#relative_div').addClass('loading');
	//hide the image
	jQuery('#designplaceholder').hide(); 		    	

	api.GetImageState(portal, user, handle, function(result){
		//call back
		callback(result);
	});
}

/*Calculate frame begining*/
/*function frame_begin_cal(square, dim_width, dim_height, img_width, img_height){
	//reset
	croppingReset();
	
	var cut_width = 0;
	var cut_height = 0;
	var cut_margin_top = 0;
	var cut_margin_left = 0;
	
	if(parseInt(dim_width) > parseInt(dim_height)){
		cut_width = square;	
		cut_height = Math.round(cut_width * dim_height / dim_width);
		
		cut_margin_top = (square - cut_height) / 2;
	}else{
		cut_height = square;
		cut_width = Math.round(cut_height * dim_width / dim_height);
		
		cut_margin_left = (square - cut_width) / 2;
	}
	
	/*jQuery('.image-crop-cut').width(cut_width + 'px');
	jQuery('.image-crop-cut').height(cut_height + 'px');
	jQuery('.image-crop-cut').css({marginTop: cut_margin_top + 'px'});
	jQuery('.image-crop-cut').css({marginLeft: cut_margin_left + 'px'});*/
	
	//set the frame outside
	/*if( cut_margin_left == 0 ){
		jQuery('.image-crop-left-top').width('300px');
		jQuery('.image-crop-left-top').css({top: '0px'});
		jQuery('.image-crop-right-bottom').width('300px');
		jQuery('.image-crop-right-bottom').css({left: '0px'});
		
		jQuery('.image-crop-left-top').height(cut_margin_top + 'px');
		jQuery('.image-crop-right-bottom').height(cut_margin_top + 'px');
		jQuery('.image-crop-right-bottom').css({top: 300 - cut_margin_top + 'px'});
	}else{
		jQuery('.image-crop-left-top').height('300px');
		jQuery('.image-crop-left-top').css({left: '0px'});
		jQuery('.image-crop-right-bottom').height('300px');
		jQuery('.image-crop-right-bottom').css({top: '0px'});
		
		jQuery('.image-crop-left-top').width(cut_margin_left + 'px');
		jQuery('.image-crop-right-bottom').width(cut_margin_left + 'px');
		jQuery('.image-crop-right-bottom').css({left: 300 - cut_margin_left + 'px'});
	}*/
	
	//calculate image begining
	/*image_begin_calculate(cut_width, cut_height, img_width, img_height);
}*/

/*Calculate image begining*/
function image_begin_cal(cut_width, cut_height, img_width, img_height){
	var cut_height_temp = Math.round(cut_width * img_height / img_width);

	if(cut_height_temp > cut_height){
		img_width = cut_width;
		img_height = cut_height_temp;
	}else{
		var cut_width_temp = Math.round(cut_height * img_width / img_height);
		img_width = cut_width_temp;
		img_height = cut_height;
	}

	//parameters init
	image_cut_width = img_width;
	image_cut_height = img_height;
	/*crop_frame_after_width = cut_width;        
	crop_frame_after_height = cut_height;
	crop_img_after_width = img_width;        
	crop_img_after_height = img_height;*/
	
	//zoom
	zoom_crop_cal(cut_width, cut_height, img_width, img_height);
}

//zooming function
function zoom_crop_cal(cut_width, cut_height, img_width, img_height){	
	var img_left = 0;
	var img_top = 0;
	var border_width = 0;
	var border_height = 0;
	var border_left = 0;
	var border_top = 0;
	
	//calculate
	border_width = (img_width - cut_width) * 2 + cut_width;
	border_height = (img_height - cut_height) * 2 + cut_height;
	border_left = cut_width - img_width;
	border_top = cut_height - img_height;
	
	//resize and change position
	//border size and position
	jQuery('#image-crop-bound').animate({
	    left: border_left + 'px',
	    top: border_top + 'px',
	    height: border_height + 'px',
	    width: border_width + 'px'
	  }, 0, function() {
	    // Animation complete.
	  });
	  
	//image size and position
	img_left = (border_width - cut_width) / 4;
	img_top =  (border_height - cut_height) / 4;
	
	//fix bug
	if(img_left < 0){
		img_left = -1;
		img_top = -1;
	}	
	
	//image size and position
	jQuery('#ghost-div, #image-crop-img').animate({
		top: img_top + 'px',
		left: img_left + 'px',
	    height: img_height + 'px',
	    width: img_width + 'px'
	  }, 0, function() {
	    // Animation complete.
	  });
	  
	//calculate dpi
	if(image_resolution != 0){
		previewCropCal(image_resolution);
	}else{
		setTimeout(function(){
			if(image_resolution != 0){
				previewCropCal(image_resolution);
			}			
		}, 5000);
	}	
}

/*Api rotate function*/
function apiRotateFunc(imgWidth, imgHeight, imgHandle, imgName, angle){
	/*New request instance, now it should have no article*/
    var api = new delivergo.api.imaging();
    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //Initializes default Image Edit Action object
	api.Init(imgWidth, imgHeight, imgName);
    
   //add info to object
    api.Request.Value.UserGuid = UserGuid;
    api.Request.Value.ImageHandle = imgHandle;
    api.Request.Value.PortalGuid = PortalGuid;
    
    //set rotation
    api.SetRotate( angle );
    
    //set loading
    //jQuery('.image-crop-loading').show();
    //show loading icon
	jQuery('.image-crop-container-border').addClass("loading");
	//hide the image
	jQuery('#image-crop-img').hide();
    
    //crop
    api.QueueAction(false, false, function(result){		
		//calculate frame
		//image_begin_cal(frame_cut_width, frame_cut_height, image_real_width, image_real_height);
		
		//get result and show the image
    	jQuery('#image-crop-img').load(function(){
    		//remove loading icon
			jQuery('.image-crop-container-border').removeClass("loading");
			
			//show the image
			jQuery(this).show();
			
			//calculate frame
			image_begin_cal(frame_cut_width, frame_cut_height, image_real_width, image_real_height);
    	})
    	.error(function(){})
    	.attr({src: 'http://api.delivergo.com/content.dev/api/RenderImageEdit.ashx?w=' + imgWidth + '&h=' + imgHeight + '&a=' + result.Value.ActionId });
		
		/*jQuery( "#photo-zoom-slider" ).slider( "option", "value", 0 );
		jQuery('#photo-zoom-process').width('0px');		*/
		croppingReset();
		
		//close loading
		jQuery('.image-crop-loading-m').hide();
    });
}

/*preview cropping calculate*/
function previewCropCal(action, callback){
	//image position
	var img_pos = jQuery('#image-crop-img').position();
	
	//border position
	var border_pos_width = jQuery('#image-crop-bound').width();
	var border_pos_height = jQuery('#image-crop-bound').height();
	
	//frame position
	var frame_pos_width = jQuery('.image-crop-cut').width();
	var frame_pos_height = jQuery('.image-crop-cut').height();
	
	//image position
	var img_pos_left = ((border_pos_width - frame_pos_width) / 2) - parseInt(img_pos.left);
	var img_pos_top = ((border_pos_height - frame_pos_height) / 2) - parseInt(img_pos.top);
	var img_width = jQuery('#image-crop-img').width();
	var img_height = jQuery('#image-crop-img').height();
	
	//calculate rate
	var rate = image_real_width / img_width;
	
	var img_cut_left = parseInt(img_pos_left * rate);
	var img_cut_top = parseInt(img_pos_top * rate);
	
	var frame_width = parseInt(frame_pos_width * rate);
	var frame_height = parseInt(frame_pos_height * rate);
	
	//cut
	var cut_angle = 0;
	switch (rotate_status){
		case 0: cut_angle = 0; break;
		case 1: cut_angle = 90; break;
		case 2: cut_angle = 180; break;
		case 3: cut_angle = 270; break;
	}

	/*/rotate
	if(rotate_status == 0 || rotate_status == 2){
		var img_cut_width = image_real_width;
		var img_cut_height = image_real_height;
	}else{
		var img_cut_width = image_real_height;
		var img_cut_height = image_real_width;
	}*/
	
	if(action != 'DO_CROP'){
		setTimeout(function(){
			calDPI(frame_width, frame_height, jQuery('.size-selected').children('.width-input').val(), jQuery('.size-selected').children('.height-input').val());
		}, 1000);
	}else{
		//real crop
		cropping_persist = true;
		
		//block UI
		//jQuery.blockUI(1);
		
		//crop
		apiCropFunction(img_cut_left, img_cut_top, frame_width, frame_height, image_real_width, image_real_height, crop_img_handle, crop_img_name, cut_angle, function(result){
			var image_link = 'http://api.delivergo.com/content.dev/api/RenderImageEdit.ashx?w=' + result.Value.CropInfo.ViewportWidth + '&h=' + result.Value.CropInfo.ViewportHeight + '&a=' + result.Value.ActionId;
			
			//save to session
			var dataString = "option=image_change&width=" + result.Value.CropInfo.ViewportWidth + "&height=" + result.Value.CropInfo.ViewportHeight + "&handle=" + result.Value.ImageHandle;
			jQuery.ajax({
				type: "GET",
				url: web_2_print_blogInfo + "inc/ajax/ajaxCrop.php",
				data: dataString,
				success: function(data){   				
					//call back
					callback(result, image_link);
				}				
			});
			
			//reset
			croppingReset();
			//render the image  		    	
	    	/*jQuery('#pro-img').load(function(){
				//unblock UI
				//jQuery.unblockUI();
				jQuery('.image-crop-loading').hide();
				
				//call back
				callback(image_link);
	    	})
	    	.error(function(){})
	    	.attr({src: image_link});*/
		});	
	}
}

//calculate dpi
function calDPI(imageWidth, imageHeight, cutWidth, cutHeight){
	var currentImageSize = {width: imageWidth, height: imageHeight};
	var article = {PageWidthOpen: cutWidth, PageLengthOpen: cutWidth};
	var api = new delivergo.api.imaging();

	var dpi = api.CalculateDPI(article, currentImageSize);
	
	var dpiValue = (dpi.width > dpi.height ? dpi.width : dpi.height);
	
	//set stars for quality evaluation.
	if(dpiValue > image_resolution && dpiValue < image_resolution + 50){
		starQuality(1);
	}else if(dpiValue > image_resolution + 50 && dpiValue < image_resolution + 100){
		starQuality(2);
	}else if(dpiValue > image_resolution + 100 && dpiValue < image_resolution + 150){
		starQuality(3);
	}else if(dpiValue > image_resolution + 150 && dpiValue < image_resolution + 200){
		starQuality(4);
	}else if(dpiValue > image_resolution + 250){
		starQuality(5);
	}else{
		starQuality(0);
	}
	
}

//set stars for quality evaluation.
function starQuality(num){
	jQuery('.quality-star').removeClass('quality-star-gold');
	for(var i = 1; i <= num; i++){
		jQuery('.crop-quality-star .quality-star:nth-child(' + i + ')').addClass('quality-star-gold');
	}
	
	if(num == 0){
		jQuery('.image-crop-dpi-warning').show();
		jQuery('.image-crop-dpi-warning-message').html(jQuery('.pic-message-resolution').val());
		jQuery('.crop-quality-star').addClass('crop-quality-star-bad');
	}else{
		jQuery('.image-crop-dpi-warning').hide();
		jQuery('.image-crop-dpi-warning-message').empty();
		jQuery('.crop-quality-star').removeClass('crop-quality-star-bad');
	}
}

/*function cropping reset*/
function croppingResetM(){
	//zoom reset
	jQuery("#crop-zoom-slider" ).slider( "option", "value", 0 );
	jQuery('#crop-zoom-process').width('0px');
	jQuery('#crop-image-zoom-percent').html(' 1x');
}