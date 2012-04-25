delivergoCrop = function(){
	//declare properties
	this.PortalID = null;
	this.ImageUserID = null;
	this.UserID = null;
	this.AjaxProxyUrl = null;
	this.RenderImageUri = 'https://api.normprint.com/portal.dev/normprint/api/RenderImageEdit.ashx?w=';
	
	this.BoxSquare = 380; //square of crop box (380 x 380)
	this.FrameWidth = 0; // Frame cropping width
	this.FrameHeight = 0; // Frame cropping height
	this.ProductWidth = 0 ;// Order product width
	this.ProductHeight = 0; // Order product height
	this.CropRulerTop = 0; //
	this.CropRulerLeft = 0; //
	
	this.CroppingPersist = false; //to do a real cropping
	this.RotateAngle = 0; // Rotation status
	this.RotateFormat = false; //Know the image is portrait or landscape
	this.OrientateStatus = 1; // Orientation status
	this.ImgResolution = 0; // Image resolution -. should come from api
	this.MaskCroppingActive = false; //Do not use mask for paper products
	this.MaskCroppingType = null; //The type of masks eg. circle, heart, dish, mug...
	this.MaskBackground = null;
	this.MaskSettings = null;// position and size of mask
	this.CropSettings = {};// save what user changed...
	this.ImgRotateRender = null;
	
	this.ImgHandle = null; //image handle
	this.Name = null; // image name
	this.ImgWidth = 0; // image original width
	this.ImgHeight = 0; // image original height
	this.ImgResizeWidth = 0; // image width resized along to box square
	this.ImgResizeHeight = 0; // image height resized along to box square
	this.ImgResizeWidthDefault = 0; // image height resized along to box square
	this.ImgResizeHeightDefault = 0; // image height resized along to box square
	this.ImgUri = null;
	this.ImgThumb = null;
	this.ImgRender = null;
	this.ImageCropped = false;
	
	this.DialogID = '#mask-crop-form ';
	this.ImageContainer = '.image-crop-container-border';
	this.ImageBorderID = '#image-crop-bound';
	this.GhostDivID = '#ghost-div';
	this.MaskDivID = '#mask-div';
	this.ImageCropID = '#image-crop-img';
	this.RuleBorderLeft = '.image-crop-left-top';
	this.RuleBorderRight = '.image-crop-right-bottom';
	this.LoadingClass = '.image-crop-loading';
	this.OrientationLandscape = '#orientation-landscape';
	this.OrientationPortrait = '#orientation-portrait';
	this.Orientationed = false;
	this.CropOverlay = '#crop-overlay-layer';
};

/*==================================================================*/
/*Function set product size*/
delivergoCrop.prototype.SetProductSize = function(width, height){
	this.ProductWidth = width; // Order product width
	this.ProductHeight = height; // Order product height
}

/*Function do the authentication*/
delivergoCrop.prototype.SetAuthenConfig = function(obj){	
	this.PortalID = obj.PortalID;
	
	if(obj.AjaxProxyUrl != undefined && obj.AjaxProxyUrl != null){
		this.AjaxProxyUrl = obj.AjaxProxyUrl;
	}
	
	if(obj.RenderImageUri != undefined && obj.RenderImageUri != null){
		this.RenderImageUri = obj.RenderImageUri;
	}
}

/*Function integrate image infos to this*/
delivergoCrop.prototype.IntegrateImage = function(obj){
	this.ImgHandle = obj.Handle; //image handle
	this.Name = obj.Filename; // image name
	this.ImgWidth = obj.ImageWidth; // image original width
	this.ImgHeight = obj.ImageHeight; // image original height
	this.ImgUri = obj.ImageUri;
	this.ImgThumb = obj.ThumbnailUri;
	
	this.ImageUserID = this.ImgUri.split("/")[5];
	if(UserGuid.replace(/-/g, '') == this.ImageUserID){
		this.UserID = UserGuid;
	}else if(dgoGuid.replace(/-/g, '') == this.ImageUserID){
		this.UserID = dgoGuid;
	}else{
		console.log('UserGuid of cropping function is null...');
	}
}

/*Function set the mask*/
delivergoCrop.prototype.SetTheMask = function(url){
	//change the url
	this.MaskCroppingType = url;
	
	//add loading
	jQuery(this.DialogID + this.LoadingClass).show();
	
	//set the mask
	jQuery(this.DialogID + this.MaskDivID).css("background", "url(" + this.MaskCroppingType + ") no-repeat");
	
	if(this.MaskCroppingType == null){
		jQuery(this.DialogID + this.MaskDivID).css("background", "none");
	}
}

/*==================================================================*/

/*Function get picture details from api*/
delivergoCrop.prototype.GetPictureFromApi = function(imgHandle, callback){
	//declare delivergo api imaging 
	var api = new delivergo.api.imaging();
	
	//set ajaxproxy url
	if(this.AjaxProxyUrl != null){
		api.AjaxProxy = this.AjaxProxyUrl;
	}
	
	if(imgHandle == undefined){
		imgHandle = this.ImgHandle;
	}
	
	api.GetImageState(this.PortalID, this.UserID, imgHandle, function(result){
		//call back
		callback(result);
	});
};

/*Calculate frame begining*/
delivergoCrop.prototype.FrameBeginCalculate = function(){
	/*/if use mask cropping
	if(this.MaskCroppingActive){
		this.FrameWidth = this.BoxSquare; // Frame cropping width
		this.FrameHeight = this.BoxSquare; // Frame cropping height
		
		//reset ruler
		jQuery(this.DialogID + this.RuleBorderLeft).width('0px');
		jQuery(this.DialogID + this.RuleBorderLeft).height('0px');
		jQuery(this.DialogID + this.RuleBorderLeft).css({left: '0px'});
		jQuery(this.DialogID + this.RuleBorderLeft).css({top: '0px'});
		
		jQuery(this.DialogID + this.RuleBorderRight).width('0px');
		jQuery(this.DialogID + this.RuleBorderRight).height('0px');
		jQuery(this.DialogID + this.RuleBorderRight).css({left: '0px'});			
		jQuery(this.DialogID + this.RuleBorderRight).css({top: '0px'});
		
		this.CropRulerTop = 0 //
		this.CropRulerLeft = 0; //
		
		//set the mask
		this.SetTheMask(this.MaskCroppingType);
	}else{		
		//show the rule mask
		//jQuery(this.RuleBorderLeft).show();
		//jQuery(this.RuleBorderRight).show();
		//set the orientation
		if(!this.Orientationed){
			var _orientation = (parseInt(this.ProductWidth) > parseInt(this.ProductHeight)) ? this.OrientationLandscape : this.OrientationPortrait;			
			jQuery(this.DialogID + this.OrientationLandscape).removeClass('orientation-selected');
			jQuery(this.DialogID + this.OrientationPortrait).removeClass('orientation-selected');
			jQuery(this.DialogID + _orientation).addClass('orientation-selected');
		}else{
			var _orientation = (this.CropSettings.Orientation == 'landscape') ? this.OrientationLandscape : this.OrientationPortrait;			
			jQuery(this.DialogID + this.OrientationLandscape).removeClass('orientation-selected');
			jQuery(this.DialogID + this.OrientationPortrait).removeClass('orientation-selected');
			jQuery(this.DialogID + _orientation).addClass('orientation-selected');
		}
		
		if(jQuery('.orientation-selected').children('input').val() == 'landscape'){
			if(parseInt(this.ProductWidth) < parseInt(this.ProductHeight)){
				var _tmp = this.ProductWidth;
				this.ProductWidth = this.ProductHeight;
				this.ProductHeight = _tmp;
			}
		}else{
			if(parseInt(this.ProductWidth) > parseInt(this.ProductHeight)){
				var _tmp = this.ProductWidth;
				this.ProductWidth = this.ProductHeight;
				this.ProductHeight = _tmp;
			}
		}
		
		//reset
		this.CropRulerTop = 0;
		this.CropRulerLeft = 0;
		
		//set the frame
		if(parseInt(this.ProductWidth) > parseInt(this.ProductHeight)){
			this.FrameWidth = this.BoxSquare;	
			this.FrameHeight = Math.round(this.FrameWidth * this.ProductHeight / this.ProductWidth);
			
			this.CropRulerTop = (this.BoxSquare - this.FrameHeight) / 2;
		}else{
			this.FrameHeight = this.BoxSquare;
			this.FrameWidth = Math.round(this.FrameHeight * this.ProductWidth / this.ProductHeight);
			
			this.CropRulerLeft = (this.BoxSquare - this.FrameWidth) / 2;
		}
		
		//define size and position
		if( this.CropRulerLeft == 0 ){
			jQuery(this.DialogID + this.RuleBorderLeft).width(this.BoxSquare + 'px');
			jQuery(this.DialogID + this.RuleBorderLeft).height(this.CropRulerTop + 'px');
			jQuery(this.DialogID + this.RuleBorderLeft).css({top: '0px'});
			
			jQuery(this.DialogID + this.RuleBorderRight).width(this.BoxSquare + 'px');
			jQuery(this.DialogID + this.RuleBorderRight).height(this.CropRulerTop + 'px');
			jQuery(this.DialogID + this.RuleBorderRight).css({left: '0px'});			
			jQuery(this.DialogID + this.RuleBorderRight).css({top: this.BoxSquare - this.CropRulerTop + 'px'});
		}else{
			jQuery(this.DialogID + this.RuleBorderLeft).width(this.CropRulerLeft + 'px');
			jQuery(this.DialogID + this.RuleBorderLeft).height(this.BoxSquare + 'px');
			jQuery(this.DialogID + this.RuleBorderLeft).css({left: '0px'});			
			
			jQuery(this.DialogID + this.RuleBorderRight).height(this.BoxSquare + 'px');
			jQuery(this.DialogID + this.RuleBorderRight).css({top: '0px'});			
			jQuery(this.DialogID + this.RuleBorderRight).width(this.CropRulerLeft + 'px');
			jQuery(this.DialogID + this.RuleBorderRight).css({left: this.BoxSquare - this.CropRulerLeft + 'px'});
		}
		
		//set the mask
		this.SetTheMask(null);
	}*/
	//set the orientation
	if(!this.Orientationed){
		var _orientation = (parseInt(this.ProductWidth) > parseInt(this.ProductHeight)) ? this.OrientationLandscape : this.OrientationPortrait;			
		jQuery(this.DialogID + this.OrientationLandscape).removeClass('orientation-selected');
		jQuery(this.DialogID + this.OrientationPortrait).removeClass('orientation-selected');
		jQuery(this.DialogID + _orientation).addClass('orientation-selected');
	}else{
		var _orientation = (this.CropSettings.Orientation == 'landscape') ? this.OrientationLandscape : this.OrientationPortrait;			
		jQuery(this.DialogID + this.OrientationLandscape).removeClass('orientation-selected');
		jQuery(this.DialogID + this.OrientationPortrait).removeClass('orientation-selected');
		jQuery(this.DialogID + _orientation).addClass('orientation-selected');
	}
	
	if(jQuery('.orientation-selected').children('input').val() == 'landscape'){
		if(parseInt(this.ProductWidth) < parseInt(this.ProductHeight)){
			var _tmp = this.ProductWidth;
			this.ProductWidth = this.ProductHeight;
			this.ProductHeight = _tmp;
		}
	}else{
		if(parseInt(this.ProductWidth) > parseInt(this.ProductHeight)){
			var _tmp = this.ProductWidth;
			this.ProductWidth = this.ProductHeight;
			this.ProductHeight = _tmp;
		}
	}
	
	//reset
	this.CropRulerTop = 0;
	this.CropRulerLeft = 0;
	
	//set the frame
	if(parseInt(this.ProductWidth) > parseInt(this.ProductHeight)){
		this.FrameWidth = this.BoxSquare;	
		this.FrameHeight = Math.round(this.FrameWidth * this.ProductHeight / this.ProductWidth);
		
		this.CropRulerTop = (this.BoxSquare - this.FrameHeight) / 2;
	}else{
		this.FrameHeight = this.BoxSquare;
		this.FrameWidth = Math.round(this.FrameHeight * this.ProductWidth / this.ProductHeight);
		
		this.CropRulerLeft = (this.BoxSquare - this.FrameWidth) / 2;
	}
	
	//define size and position
	if( this.CropRulerLeft == 0 ){
		jQuery(this.DialogID + this.RuleBorderLeft).width(this.BoxSquare + 'px');
		jQuery(this.DialogID + this.RuleBorderLeft).height(this.CropRulerTop + 'px');
		jQuery(this.DialogID + this.RuleBorderLeft).css({top: '0px'});
		
		jQuery(this.DialogID + this.RuleBorderRight).width(this.BoxSquare + 'px');
		jQuery(this.DialogID + this.RuleBorderRight).height(this.CropRulerTop + 'px');
		jQuery(this.DialogID + this.RuleBorderRight).css({left: '0px'});			
		jQuery(this.DialogID + this.RuleBorderRight).css({top: this.BoxSquare - this.CropRulerTop + 'px'});
	}else{
		jQuery(this.DialogID + this.RuleBorderLeft).width(this.CropRulerLeft + 'px');
		jQuery(this.DialogID + this.RuleBorderLeft).height(this.BoxSquare + 'px');
		jQuery(this.DialogID + this.RuleBorderLeft).css({left: '0px'});			
		
		jQuery(this.DialogID + this.RuleBorderRight).height(this.BoxSquare + 'px');
		jQuery(this.DialogID + this.RuleBorderRight).css({top: '0px'});			
		jQuery(this.DialogID + this.RuleBorderRight).width(this.CropRulerLeft + 'px');
		jQuery(this.DialogID + this.RuleBorderRight).css({left: this.BoxSquare - this.CropRulerLeft + 'px'});
	}
	
	//if use mask cropping
	if(this.MaskCroppingActive){
		//set the mask
		this.SetTheMask(this.MaskCroppingType);
	}else{
		//set the mask
		this.SetTheMask(null);
	}
}

/*Calculate image begining*/
delivergoCrop.prototype.ImageBeginCalculate = function(ImgWidth, ImgHeight){
	if(ImgWidth == undefined){
		ImgWidth = this.ImgWidth;
		ImgHeight = this.ImgHeight;
	}
	
	var cut_height_temp = Math.round(this.FrameWidth * ImgHeight / ImgWidth);

	if(cut_height_temp > this.FrameHeight){
		this.ImgResizeWidth = this.FrameWidth;
		this.ImgResizeHeight = cut_height_temp;
		
		//default will not be changed when we zoom
		this.ImgResizeWidthDefault = this.FrameWidth;
		this.ImgResizeHeightDefault = cut_height_temp;
	}else{
		var cut_width_temp = Math.round(this.FrameHeight * ImgWidth / ImgHeight);
		this.ImgResizeWidth = cut_width_temp;
		this.ImgResizeHeight = this.FrameHeight;
		
		//default will not be changed when we zoom
		this.ImgResizeWidthDefault = cut_width_temp;
		this.ImgResizeHeightDefault = this.FrameHeight;
	}
}

/*zooming function*/
delivergoCrop.prototype.ZoomCropCalculate = function(){		
	/*Variables to change position and size of image and border*/
	var img_left = 0;
	var img_top = 0;
	var border_width = 0;
	var border_height = 0;
	var border_left = 0;
	var border_top = 0;
	
	//calculate position and size of Border
	border_width = (this.ImgResizeWidth - this.FrameWidth) * 2 + this.FrameWidth;
	border_height = (this.ImgResizeHeight - this.FrameHeight) * 2 + this.FrameHeight;
	border_left = this.FrameWidth - this.ImgResizeWidth + this.CropRulerLeft;
	border_top = this.FrameHeight - this.ImgResizeHeight + this.CropRulerTop;	
	
	//calculate current position
	var image_pos = jQuery(this.ImageCropID).position();
	var bound_pos = jQuery(this.ImageBorderID).position();
	var crop_frame_width = jQuery(this.RuleBorderLeft).width();
	var crop_frame_height = jQuery(this.RuleBorderLeft).height();
	if(crop_frame_width == this.BoxSquare){ crop_frame_width = 0;}
	if(crop_frame_height == this.BoxSquare){ crop_frame_height = 0;}
	
	//calculate rate of position	
	var rate_x = 0;
	var rate_y = 0;
	
	if(bound_pos.left == 0){
		rate_x = 1;
	}else{
		var bound_pos_left = (bound_pos.left > 0) ? Math.abs(crop_frame_width - bound_pos.left) : bound_pos.left;
		var crop_distance_x = bound_pos_left < 0 ? crop_frame_width : 0;		
		
		rate_x = (Math.abs(bound_pos.left) + crop_distance_x - Math.abs(image_pos.left)) / (Math.abs(bound_pos.left) + crop_distance_x);
		if(rate_x < 0){rate_x = 0}
	}
	
	if(bound_pos.top == 0){
		rate_y = 1;
	}else{
		var bound_pos_top = (bound_pos.top > 0) ? Math.abs(crop_frame_height - bound_pos.top) : bound_pos.top;
		var crop_distance_y = bound_pos_top < 0 ? crop_frame_height : 0;
		
		rate_y = (Math.abs(bound_pos_top) + crop_distance_y - Math.abs(image_pos.top)) / (Math.abs(bound_pos_top) + crop_distance_y);
		if(rate_y < 0){rate_y = 0}
	}
	
	//image size and position
	img_left = ((border_width - this.FrameWidth) / 2) * (1 - rate_x);
	img_top =  ((border_height - this.FrameHeight) / 2) * (1 - rate_y);
	
	//fix bug (1 pixel missing when dragging)
	if(img_left < 0){
		img_left = -1;
		img_top = -1;
	}
	
	if(this.CropSettings.Zoom == undefined){
		img_left = 0;
		img_top = 0;
	}
	
	//resize and change position
	//border size and position
	jQuery(this.DialogID + this.ImageBorderID).animate({
	    left: border_left + 'px',
	    top: border_top + 'px',
	    height: border_height + 'px',
	    width: border_width + 'px'
	  }, 0, function() {
	    // Animation complete.
	    // do some awesome works here
	  });
	
	//image size and position
	jQuery(this.DialogID + this.ImageCropID).animate({
		top: img_top + 'px',
		left: img_left + 'px',
	    height: this.ImgResizeHeight + 'px',
	    width: this.ImgResizeWidth + 'px'
	  }, 0, function() {
	    // Animation complete.
	  });
	  
	//image size and position
	jQuery(this.DialogID + this.GhostDivID).animate({
		top: img_top + 'px',
		left: img_left + 'px',
	    height: this.ImgResizeHeight + 'px',
	    width: this.ImgResizeWidth + 'px'
	  }, 0, function() {
	    // Animation complete.
	  });
	  
	//calculate image viewport size
	//frame position
	var frame_pos_width = this.FrameWidth;
	var frame_pos_height = this.FrameHeight;
	
	var img_width = jQuery(this.ImageCropID).width();
	var img_height = jQuery(this.ImageCropID).height();
	
	//calculate rate
	if(this.RotateAngle == 90 || this.RotateAngle == 270){
		var rate = this.ImgWidth / img_height;
	}else{
		var rate = this.ImgWidth / img_width;
	}
	
	var frame_width = parseInt(frame_pos_width * rate);
	var frame_height = parseInt(frame_pos_height * rate);
	  
	//calculate DPI 
	this.CalculateDPI(frame_width, frame_height);
}

/*Api saving crop settings*/
delivergoCrop.prototype.CropSettingsArchive = function(zoom){
	//save zoom value
	var _zoom_value = zoom == undefined ? jQuery(this.DialogID + "#crop-zoom-slider" ).slider( "option", "value" ) : zoom;
	
	//save image position
	//image position
	var img_pos = jQuery(this.ImageCropID).position();
	
	//image position
	var img_pos_left = img_pos.left;
	var img_pos_top = img_pos.top;
	
	if(this.CropSettings.Zoom == undefined){
		img_pos_left = 0;
		img_pos_top = 0;
	}
	
	//border size
	var border_pos_width = jQuery(this.ImageBorderID).width();
	var border_pos_height = jQuery(this.ImageBorderID).height();
	
	//frame size
	var frame_pos_width = this.FrameWidth;
	var frame_pos_height = this.FrameHeight;
	
	//image size
	var img_resize_width = jQuery(this.ImageCropID).width();
	var img_resize_height = jQuery(this.ImageCropID).height();
	
	//save orientation
	var _orientation = jQuery('.orientation-selected').children('input').val();
	
	//save the settings
	this.CropSettings = {
		Zoom: _zoom_value,
		ImageTop: img_pos_top,
		ImageLeft: img_pos_left,
		ImageResizeWidth: img_resize_width,
		ImageResizeHeight: img_resize_height,
		ImageWidth: this.ImgWidth,
		ImageHeight: this.ImgHeight,
		BorderWidth: border_pos_width,
		BorderHeight: border_pos_height,
		FrameWidth: frame_pos_width,
		FrameHeight: frame_pos_height,
		ImageRotateRender: this.ImgRotateRender,
		RotateAngle: this.RotateAngle,
		Orientation: _orientation,
		RotateFormat: this.RotateFormat,
		Name: this.Name
	};
}

/*Set image crop settings*/
delivergoCrop.prototype.CropSettingsReset = function(){
	//set zoom
	var _zoom_value = parseInt(this.CropSettings.Zoom);
	var process_width = _zoom_value * 12;
	jQuery(this.DialogID + "#crop-zoom-slider" ).slider( "option", "value", _zoom_value );
	jQuery(this.DialogID + '#crop-zoom-process').width( process_width + 'px');
	
	this.ImgResizeWidth = Math.round(this.ImgResizeWidthDefault + this.ImgResizeWidthDefault * _zoom_value / 10);
	this.ImgResizeHeight = Math.round(this.ImgResizeHeightDefault + this.ImgResizeHeightDefault * _zoom_value / 10);			
	
	//zoom
	this.ZoomCropCalculate();
	
	//change label of zooming
	jQuery(this.DialogID + '#crop-image-zoom-percent').html(' ' + (_zoom_value + 1) + 'x');
	
	//image size and position
	jQuery(this.DialogID + this.ImageCropID).animate({
		top: this.CropSettings.ImageTop + 'px',
		left: this.CropSettings.ImageLeft + 'px',
	}, 0, function() {
	    // Animation complete.
	});
}

/*Api rotate function*/
delivergoCrop.prototype.ImageRotate = function(callback){
	/*New request instance, now it should have no article*/
    var api = new delivergo.api.imaging();
    
    //change the uri to normprint ( should be changed later because of security )
    api.PortalUriBase = 'https://api.normprint.com/portal.dev/normprint/api/ApiUploadService.svc/json/UserFiles/Remote';
    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    //Initializes default Image Edit Action object
	api.Init(this.ImgWidth, this.ImgHeight, this.Name);

   //add info to object
    api.Request.Value.PortalGuid = this.PortalID;
    api.Request.Value.UserGuid = this.UserID;
    api.Request.Value.ImageHandle = this.ImgHandle;
    
    //set rotation
    api.SetRotate( this.RotateAngle );
    
    //do the rotation
    api.QueueAction(false, false, function(result){		
		callback(result);
    });
}

/*Api crop function*/
delivergoCrop.prototype.ImageCrop = function(handle, options, callback){
	//border position
	var border_pos_width = options.BorderWidth;
	var border_pos_height = options.BorderHeight;
	
	//frame position
	var frame_pos_width = options.FrameWidth;
	var frame_pos_height = options.FrameHeight;

	//image position
	var img_pos_left = ((border_pos_width - frame_pos_width) / 2) - parseInt(options.ImageLeft);
	var img_pos_top = ((border_pos_height - frame_pos_height) / 2) - parseInt(options.ImageTop);
	
	if(img_pos_left < 0){
		img_pos_left = 0;
	}
	if(img_pos_top < 0){
		img_pos_top = 0;
	}
	
	var img_width = options.ImageResizeWidth;
	var img_height = options.ImageResizeHeight;
	
	//calculate rate
	if(options.RotateAngle == 90 || options.RotateAngle == 270){
		var rate = options.ImageWidth / img_height;
	}else{
		var rate = options.ImageWidth / img_width;
	}	

	var img_cut_left = parseInt(img_pos_left * rate);
	var img_cut_top = parseInt(img_pos_top * rate);
	
	var frame_width = parseInt(frame_pos_width * rate);
	var frame_height = parseInt(frame_pos_height * rate);
	
	//New request instance, now it should have no article
    var api = new delivergo.api.imaging();
    
    //change the uri to normprint ( should be changed later because of security )
    api.PortalUriBase = 'https://api.normprint.com/portal.dev/normprint/api/ApiUploadService.svc/json/UserFiles/Remote';
    
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';
    
    if(options.RotateFormat){
		//change width to height
		var t = options.ImageWidth;
		options.ImageWidth = options.ImageHeight;
		options.ImageHeight = t;
	}
    
     //Initializes default Image Edit Action object
	api.Init(options.ImageWidth, options.ImageHeight, options.Name);
	
	//add info to object
    api.Request.Value.UserGuid = this.UserID;
    api.Request.Value.ImageHandle = handle;
    api.Request.Value.PortalGuid = this.PortalID;
    
    //set rotation
    api.SetRotate( options.RotateAngle );
    
    //set crop
    api.SetCrop(img_cut_left, img_cut_top, frame_width, frame_height);
    
    //add ThumbnailSize
    if(this.CroppingPersist){
    	api.Request.Value.ThumbnailSize = options.ImageWidth;
    }
    
    //crop
     api.QueueAction(this.CroppingPersist, this.CroppingPersist, function(result){
     	callback(result);
     });
}

/*Function calculate DPI*/
delivergoCrop.prototype.CalculateDPI = function(frameWidth, frameHeigth){	
	var currentImageSize = {width: frameWidth, height: frameHeigth};
	var article = {PageWidthOpen: this.ProductWidth, PageLengthOpen: this.ProductHeight};
	
	var api = new delivergo.api.imaging();
	    
	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	var dpi = api.CalculateDPI(article, currentImageSize);

	var dpiValue = (dpi.width > dpi.height ? dpi.width : dpi.height);
	
	//set stars for quality evaluation.
	if(dpiValue > 300 && dpiValue < 400){
		this.QualitySet(1);
	}else if(dpiValue > 400 && dpiValue < 500){
		this.QualitySet(2);
	}else if(dpiValue > 500 && dpiValue < 600){
		this.QualitySet(3);
	}else if(dpiValue > 600 && dpiValue < 700){
		this.QualitySet(4);
	}else if(dpiValue > 800){
		this.QualitySet(5);
	}else{
		this.QualitySet(0);
	}
}

/*Function show quality infos and warning*/
delivergoCrop.prototype.QualitySet = function(num){
	jQuery('.quality-star').removeClass('quality-star-gold');
	
	for(var i = 1; i <= num; i++){
		jQuery('.crop-quality-star .quality-star:nth-child(' + i + ')').addClass('quality-star-gold');
	}

	if(num == 0){
		jQuery('.image-crop-dpi-warning').show();
		jQuery('.image-crop-dpi-warning-message').css("background","gray");
		jQuery('.image-crop-dpi-warning-message').show();
		jQuery('.image-crop-dpi-warning-message').html(jQuery('.pic-message-resolution').val());
		jQuery('.crop-quality-star').addClass('crop-quality-star-bad');
	}else{
		jQuery('.image-crop-dpi-warning').hide();
		jQuery('.image-crop-dpi-warning-message').css("background","none");
		jQuery('.image-crop-dpi-warning-message').hide();
		jQuery('.image-crop-dpi-warning-message').empty();
		jQuery('.crop-quality-star').removeClass('crop-quality-star-bad');
	}
}