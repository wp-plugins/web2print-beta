load{imagecontrolsid} = function() {
	var settings = {
		fileUploadsPlaceHolder: '{imagecontrolsid}', 
		uploadQueueControlId: 'UploadQueue', 
		uploadedFilesControlId: 'UploadedFiles', 
		uploaderPath: '{uploaderpath}',
		buttonImage: '{buttonimage}', 
		buttonText: 'Upload', 
		buttonWidth: 60, 
		buttonHeight: 28, 
		autoStartUpload: true, 
		multipleFileSelection: true, 
		uploadSessionId: '{uploadsessionid}', 
		templatesPlaceHolderId: '{templatesplaceholderid}'
	}
	var state = null;
	return dgo.upload.initUpload(settings, state);
};

jQuery(function() {
	load{imagecontrolsid}();
	var bImagesLoaded = false;
	jQuery('#{imagecontrolsid}wrapper').hide();
	
	toggleImagesDiv = function(){
		if(!bImagesLoaded) {
			dgo.upload.api.loadUserImages();
			bImagesLoaded = true;
		}
		if( jQuery('#{imagecontrolsid}wrapper').is(':visible') ) {
			jQuery('#{imagecontrolsid}wrapper').slideUp('fast');
		}
		else {
		    jQuery('#{imagecontrolsid}wrapper').slideDown('fast');
		}	
	}
	
});