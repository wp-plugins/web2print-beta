//upload image function 
// Function upload image  
//numberimg using for array input for post to oder page
var numberImg= 0 ;	
//number image submit
var numsubmit= 0 ;
//start time
var startTime = null;
//end time
var endTime = null;

function createSimpleUploader(){           
    //alert(basepath);
    var fcurrentLoaded = 0;
	var fuploadLoaded = 0;
	var fuploadTotal = 0;
    var files;
   var uploader = new qq.FileUploaderBasic(
   {		
		button: document. getElementById('buttonSimpleUpload'),
		action: encodeURI('http://api.delivergo.com/content.dev/UploadProxy.ashx'),
		multiple:false,
		allowedExtensions: ['jpg','png', 'gif', 'pdf', 'ai', 'psd', 'cdr', 'tif'], //for ext
		sizeLimit: 10000000000,   
		minSizeLimit:0,
		//drop area
		drop: document.getElementById('directUploadArea'),
		dropActive: 'multiUploadActive',
		fileQueryParamName: 'f',
			params: {
			 ts: '300',
			 p: PortalGuid, 
			 u: UserGuid
			 },
		onAssembleUri: function (uri) {
				return web_2_print_blogInfo + 'inc/ajaxproxy.php?u=' + encodeURIComponent(uri);
			} ,
		onSubmit: function(id, fileName){
			//open dialog
			numsubmit++;
			//jQuery( ".directUploadForm" ).dialog( "open" );
			jQuery('.direct-upload-choose').hide();
			
			//container uploading html
			var uploadingHtml = '<div class="uploading-component uploading-component' + id + '"><div class="uploading-image-before uploading-image-before' + id + '"></div>';
			uploadingHtml += '<div class="uploading-info"><div class="uploading-progress-border"><div class="uploading-progress-core uploading-progress-core' + id + '"></div><div class="uploading-progress-text uploading-progress-text' + id + '"></div></div>';
			uploadingHtml += '<div class="uploading-progress-cancel uploading-progress-cancel' + id + '"></div>';
			uploadingHtml += '<div class="uploading-progress-finish uploading-progress-finish' + id + '"><div class="uploading-picture-name"><span>' + fileName + '</span></div>';
			uploadingHtml += '</div></div>';
			
			//add html to upload area
			jQuery('#directUploadFiles').append( uploadingHtml );
			
			//for ff
			if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
				var  fileInput = document.getElementById("buttonuploadinput");
				
				file= fileInput.files;
				
				if(file.length!=0)
				{
					jQuery('.uploading-image-before').html('<div class="fix-upload-pictureS"><img style="height:80px;" src="'+file[0].getAsDataURL()+'"/></div>');
				}
			}
			//for chrome
			else if(jQuery.browser.chrome){
				var  fileInput = document.getElementById("buttonuploadinput");
				var reader = new FileReader(); 
				reader.onload = function(e) { 
				  //var fileContent = e.target.result; 
				} 
				file= fileInput.files;
				if(file.length!=0)
				{
                    jQuery('.uploading-image-before').html('<div class="fix-upload-pictureS"><img style="height:80px;" src="'+ reader.readAsDataURL(file[0]) +'"/></div>');
				}
			}
            
			//for cancel click function()
			jQuery('.uploading-progress-cancel').click( function(){				
				if (confirm(jQuery('.trans-cancel-upload-image').val())) { 
					uploader.oncancelClick(id,fileName);
					
					//empty progress upload
            		jQuery('#directUploadFiles').empty();
            		
            		//close popup
            		jQuery( ".directUploadForm" ).dialog( "close" );
            		jQuery('.direct-upload-choose').show();
				}
			});
            
			/*jQuery('.ProgessBarSimple').progressbar({value :Math.round(0)});
			        //timer
			        fcurrentLoaded = 0;
                    fuploadLoaded = 0;
                    fuploadTotal = 0;
                    
                    var fuploadTimer = '.uploadTimer';
                    var feveryTime = 'everyTime' ;                           
                    jQuery(fuploadTimer).everyTime(1000, feveryTime, function(i){
                        //+ Calculate remain time +//
                        //cal amount of byte uploaded for 5 seconds
                        var fsubLoaded = fuploadLoaded - fcurrentLoaded;
                        if(fsubLoaded==0)
					    {fsubLoaded=1;}
                        //
                        fcurrentLoaded = fuploadLoaded;
                        
                        //console.log(fsubLoaded);
                        //the rest of file are not uploaded
                        var frestLoaded = fuploadTotal - fuploadLoaded;
                      
                        //the remain time is (second)
                        var fremainTime = Math.round(frestLoaded / fsubLoaded) * 5;
				    
                        //
                        fcurrentLoaded = fuploadLoaded;
                        var dremainTime = timeConverter(fremainTime);
                        
                         jQuery(this).html(dremainTime);
					 });*/
		},
		onProgress: function(id, fileName, loaded, total){
		    //progress status
            var progress_text = '.uploading-progress-text' + id;
			var progress_text_status = Math.round(loaded / total * 100) + ' % '+jQuery('.trans-of').val()+' ' + uploader._formatSize(total);
			jQuery(progress_text).html('<span>' + progress_text_status + '</span>');
			jQuery(progress_text).css({color: '#BCBCBC'});
			
			//uploading progress
            jQuery('.uploading-progress-core').width(Math.round(loaded / total * 100)+ '%');		    
		},
		onComplete: function(id, fileName, responseJSON){
			//if upload is complete
			if(responseJSON.Files != undefined){
				//append to div input hidden
	            var hiddenString = '<input class="picHidden ' + responseJSON.Files[0].Handle + '" type="hidden" value="' + responseJSON.Files[0].ThumbnailUri + '" name="picHidden[' + responseJSON.Files[0].Handle + ']"/>';
	            if(responseJSON.Files[0].ImageWidth > responseJSON.Files[0].ImageHeight){
	                var formatImg = 'landscape';
	            }else{
	                var formatImg = 'portrait';
	            }
	            hiddenString += '<input class="formatHidden" type="hidden" value="' + formatImg + '" name="formatHidden[' + responseJSON.Files[0].Handle + ']"/>';
	            jQuery('#submitForm').append(hiddenString);
	                
	                
	            if(jQuery('#dgo-type-sel').val() == ''){
	                var productionType = jQuery('#dgo-type-sel').html(); 
	            }else{
	                var productionType = jQuery("#dgo-type-sel").val();
	            }
	            
	            jQuery('.typeSelHidden').val(productionType);
	            jQuery('.materialHidden').val(jQuery('#materialSel').val());
	            
	            //empty progress upload
	            jQuery('#directUploadFiles').empty();
	            
	            //close popup
	            jQuery( ".directUploadForm" ).dialog( "close" );
	            jQuery('.direct-upload-choose').show();
	            
	            //submit form
	            //jQuery('#submitForm').submit();
	            var avartar_id = jQuery('#uploadAvatarId').val();
	            contacting_UploadAvatar(avartar_id, responseJSON.Files[0].ThumbnailUri, 0); //function in contacting_request_function.js
			}else{
				//cancel upload
				uploader.oncancelClick(id,fileName);
					
				//empty progress upload
        		jQuery('#direcUploadFiles').empty();
        		
        		//close popup
        		jQuery( ".directUploadForm" ).dialog( "close" );
        		jQuery('.direct-upload-choose').show();
			}
			
            
		}
   });
}	
	
//create multiuploader multi selection
function createUploadMultiSelect(){
	//current loaded
	var currentLoaded = 0;
	//a to count number file each select . for multi select
	var fileNum = 0 ;
	var currentUploadFile = -1;
	var totalUploadFile = 0;
	var removeFiles = new Array();
	var numberUploadFiles = 0;
	var numberUploadFinished = 0;
	
	//create new qqUploader
	var uploader = new qq.FileUploaderBasic({
		//upload button should have this id
		button: document.getElementById('multiSelectUploadButton'),
		action:  'http://api.delivergo.com/content.dev/UploadProxy.ashx',
		allowedExtensions: ['jpg','png', 'gif', 'pdf', 'ai', 'psd', 'cdr', 'tif', ''], //for ext
		fileQueryParamName: 'f',
		params: {
			ts: '300',
			p: PortalGuid,
			u: UserGuid
		},
		onAssembleUri: function (uri) {
            return web_2_print_blogInfo + 'inc/ajaxproxy.php?u=' + encodeURIComponent(uri);
       },
        sizeLimit: 0,   
		minSizeLimit:0,
		//drop area
		drop: document.getElementById('multiUploadArea'),
		dropActive: 'multiUploadActive',
		/*On submit event*/
		onSubmit: function(id, fileName){
			//open dialog
			jQuery('#posterMultiUploadForm').dialog('open');		
			jQuery('#posterMultiUploadForm').dialog({ position: 'center' });		
			
			//show the first cancle
			var upload_cancel = '';
			var _currentUploadFile = currentUploadFile + 1;
			if(id == _currentUploadFile){
				upload_cancel = 'uploading-progress-cancel ';
			}	
			
			//container uploading html
			var uploadingHtml = '<div class="uploading-component uploading-component' + id + '"><div class="uploading-image-before uploading-image-before' + id + '"><li style="display: inline-block"><div><img src="" alt="preview-image" /></div></li></div>';
			uploadingHtml += '<div class="uploading-info"><div class="uploading-progress-border"><div class="uploading-progress-core uploading-progress-core' + id + '"></div><div class="uploading-progress-text uploading-progress-text' + id + '"></div></div>';
			uploadingHtml += '<div class="'+ upload_cancel +'uploading-progress-cancel' + id + '"></div>';
			uploadingHtml += '<div class="uploading-progress-finish uploading-progress-finish' + id + '"><div class="uploading-picture-name"><span>' + fileName + '</span></div>';
			uploadingHtml += '</div></div>';
			
			//get image before if browers is firefox
			//if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
				//var  fileInput = document.getElementById("buttonuploadinput");
				//getImageUrl(fileInput);
                //alert(fileInput.value);
                //console.log(fileInput.files);//.files[0].mozFullPath
				//var file = fileInput.files;
				//var a = fileInput.files.getAsDataURL();console.log(a);
				//using for drop drag
				/*if(file.length!=0)
				{						
					//show image before upload start
					console.log(file[fileNum].getAsDataURL());
				}*/
			//}
			
			
			//add html to upload area
			jQuery('#multiUploadFiles').append( uploadingHtml );
			
			//beginning status
			var progress_text = '.uploading-progress-text' + id;
			jQuery(progress_text).html('<span>'+jQuery('.trans-ready-to-upload').val()+'</span>');
			
			//make cancel upload function
			var progress_cancel = '.uploading-progress-cancel' + id;
			jQuery(progress_cancel).click(function(){
				//if not current uploading
				if(id == currentUploadFile){
					if (confirm(jQuery('.trans-cancel-upload-image').val())){						
						//cancel this upload				    
						uploader.oncancelClick(id, fileName);
						
						//remove this component
						var uploading_component = '.uploading-component' + id;
						jQuery(uploading_component).remove();	
						
						//add cancel button to the next upload
						var next_id = id + 1;
						var cancel_class = '.uploading-progress-cancel' + next_id;
						jQuery(cancel_class).addClass('uploading-progress-cancel');							
						
						//decrease number upload files
						numberUploadFinished--;	
						totalUploadFile--;
						if(totalUploadFile>3){
								jQuery('.dgo-dialog-multi-upload').css({"width":"735px"});
								jQuery('.multi-upload-content').css({"overflow":"auto"});
							}else{
								jQuery('.multi-upload-content').css({"overflow":"hidden"});
								jQuery('.dgo-dialog-multi-upload').css({"width":"715px"});
							}	
						//reset current loaded
						currentLoaded = 0;
						
						//reset start time
						startTime = (new Date()).getTime();	   
						
						if(numberUploadFiles == numberUploadFinished){ 
							//leave object to hidden input
							jQuery('#prices-import').val(JSON2.stringify(global_price_object[order_price_chosen]));
				 			
				 			//submit form
				 			if(global_price_object[order_price_chosen].Pictures.length > 0){
				 				if(dgoCurrentPage != "productDetails"){
				 					jQuery('#multiSelectSubmitForm').submit();
				 				}else{
				 					console.log(global_price_object[order_price_chosen]);
				 				}
				 			}				 			
				 			
				 			//say finish
				 			jQuery('#uploading-speed').html("0 kb/s");
							jQuery('#uploading-remain').html(jQuery('.trans-finihed').val());
							
							//close dialog
							jQuery('#posterMultiUploadForm').dialog('close');
						} 
				    }
			    }
			
			});
			
			//Uploading files
			totalUploadFile++;
			numberUploadFinished++;
			if(totalUploadFile<=3){
				jQuery('.dgo-dialog-multi-upload').css({"width":"715px"});
			}else{
				jQuery('.dgo-dialog-multi-upload').css({"width":"735px"});
				jQuery('.multi-upload-content').css({"overflow":"auto"});
			}
			
			//which image div will be added picture
			//var imageBeforeDiv = '.uploading-image-before' + id;
			//jQuery(imageBeforeDiv).html('<div class="fix-upload-pictures"><div class="image-upload-temp"></div></div>');

			//remain time calculating
			//a to count number file each select . for multi select
			fileNum++;
			
			//get start time
			startTime = (new Date()).getTime();
		},
		onProgress: function(id, fileName, loaded, total){
			//get moment time		
			endTime = (new Date()).getTime();

			//get moment time			
			var duration = Math.round((endTime - startTime) / 1000);
			var speedBps = Math.round(loaded / duration);
			var speedKbps = (speedBps / 1024).toFixed(2);
			
			//remaining time
			var remainTime = Math.round((total - loaded) / speedBps);
			//var remainTimeText = timeConverter(remainTime);
			var remainTimeText = timeConverter(remainTime);
			
			//show		
			if((loaded - currentLoaded) > 50000 || total < 50000){
				jQuery('#uploading-remain').html(remainTimeText);
				jQuery('#uploading-speed').html(speedKbps + " kb/s");
				//set current loaded
				currentLoaded = loaded;
			}			
			if(remainTime == 0){
				jQuery('#uploading-remain').html(jQuery('.trans-saving').val()+'...');
				jQuery('#uploading-speed').html("0 kb/s");
			}			
			
		
			//a to count number file each select . for multi select
			fileNum = 0;			
			
			//progress status
            var progress_text = '.uploading-progress-text' + id;
			var progress_text_status = Math.round(loaded / total * 100) + ' % '+jQuery('.trans-of').val()+' ' + uploader._formatSize(total);
			jQuery(progress_text).html('<span>' + progress_text_status + '</span>');
			jQuery(progress_text).css({color: '#BCBCBC'});
			
			//uploading files
			currentUploadFile = id;
			var currentUploadFileS = numberUploadFiles + 1;
			jQuery('#uploading-file').html( currentUploadFileS + ' '+jQuery('.trans-of').val()+' ' + totalUploadFile);
			
            //which process is loading
            var proUploading = '.uploading-progress-core' + id;
            
            //uploading progress
            jQuery(proUploading).width(Math.round(loaded / total * 100)+ '%');
		},
		onComplete: function(id, fileName, responseJSON){
			//add cancel button to the next upload
			var next_id = id + 1;
			var cancel_class = '.uploading-progress-cancel' + next_id;
			jQuery(cancel_class).addClass('uploading-progress-cancel');
			
			//error
			if(responseJSON.Files == undefined){	
				alert('The upload is failed! Please try to upload again and make sure your network works fine.');		
				
				//increse number upload files
				numberUploadFiles++;
				
				//save result
				if(numberUploadFiles == numberUploadFinished){
					//close dialog
					jQuery('#posterMultiUploadForm').dialog('close');
				}
				
				return;
			}
			
			//increse number upload files
			numberUploadFiles++;
					
			//finish status
			var progress_text = '.uploading-progress-text' + id;
			jQuery(progress_text).html('<span>'+jQuery('.trans-upload-complete').val()+'</span>');
			
			//remove cancel button
			var progress_ok = '.uploading-progress-cancel' + id;
			jQuery(progress_ok).replaceWith('<div class="uploading-progress-ok"></div>');
			
			//add this picture to pictures uploaded object
			if(responseJSON.success = true){
				//save to object
				//format
				if(responseJSON.Files[0].ImageWidth > responseJSON.Files[0].ImageHeight){
                    var picture_format = 'picture_landscape';
                }else{
                    var picture_format = 'picture_portrait';
                }
                
                //ratio
                var picture_ratio = findUSCLN( responseJSON.Files[0].ImageWidth, responseJSON.Files[0].ImageHeight );
                
                //add format css style
                responseJSON.Files[0].Format = picture_format;              
                responseJSON.Files[0].Ratio = {
                	"RatioWidth" : responseJSON.Files[0].ImageWidth / picture_ratio, 
                	"RatioHeight" : responseJSON.Files[0].ImageHeight / picture_ratio
                	};               

				global_price_object[order_price_chosen].Pictures.push( responseJSON.Files[0] );    
				
				//using for crop function
				pic_import_arr.push( responseJSON.Files[0] );  						
			}			
			
			//reset current loaded
			currentLoaded = 0;
			
			//reset start time
			startTime = (new Date()).getTime();
			
			if(numberUploadFiles == numberUploadFinished){ 
				
				//leave object to hidden input
				jQuery('#prices-import').val(JSON2.stringify(global_price_object[order_price_chosen]));

				if(dgoCurrentPage != "productDetails"){
					jQuery.blockUI(0);
					//submit form
 					jQuery('#multiSelectSubmitForm').submit();
 				}else{
 					//close dialog
					jQuery('#posterMultiUploadForm').dialog('close');	
					
					//import picture to Crop Pictures					
					var img_slide_html = '';
					for(var i = 0; i < pic_import_arr.length; i++){
						//var img_html = "<img width=50 src='"+ pic_import_arr[i].ThumbnailUri +"' onclick='ImageCropFunctionCall(\""+ pic_import_arr[i].Handle +"\")'/>";
						//var img_html = '<div><a class="img-cover" title="Pic_Mask" hash="javascript:void(0)"><img alt="Picture" style="width:' + size[0] + 'px;height:' + size[1] + 'px" src="' + v.ThumbnailUri + '" bigthumb="' + imagesource + '"></div>';
						//jQuery('.picture-area').append(img_html);	
						//add the small thumbs to the sidebar
						var img_selected = '';
						if(i == 0){ img_selected = 'crop-picture-border-selected';}
						
						img_slide_html += '<li class="crop-picture-li"><div class="crop-picture-border '+ img_selected +'"><img class="picture_landscape" file="'+ pic_import_arr[i].ImageUri +'" src="'+ pic_import_arr[i].ThumbnailUri +'" />';
						img_slide_html += '<input class="handle" type="hidden" value="'+ pic_import_arr[i].Handle +'"><input class="name" type="hidden" value="'+ pic_import_arr[i].Filename +'"><input class="width" type="hidden" value="'+ pic_import_arr[i].ImageWidth +'"><input class="height" type="hidden" value="'+ pic_import_arr[i].ImageHeight +'">';
						//img_slide_html += '<div class="amount"><span>1</span><input type="hidden" value="1"><div class="arrow"></div></div>';
						
						//define image object
						var _handle = pic_import_arr[i].Handle.replace(/-/g, '');
						eval('img' + _handle  + ' = undefined');
						
						//add to pics_arr
						pics_arr[_handle] = pic_import_arr[i];
					}
					
					//append html
					jQuery('.image-crop-slider-content').empty().append(img_slide_html);
					jQuery(".image-crop-slider-content").width(60 * pic_import_arr.length);
					
					//use for product detail
					var product_width = formats_object[jQuery('.content-size-selected .size-value').val()].forwidth;
					var product_height = formats_object[jQuery('.content-size-selected .size-value').val()].forheight;
						
					//click event
					jQuery('.crop-picture-border').click(function(){
						//change the selected
						jQuery('.crop-picture-border').removeClass('crop-picture-border-selected');
						jQuery(this).addClass('crop-picture-border-selected');
						
						var handle_select = jQuery(this).children('.handle').val();
						
						//call the crop function
						ImageCropFunctionCall(handle_select, product_width, product_height);
					});
					
					//call the crop function
					ImageCropFunctionCall(pic_import_arr[0].Handle, product_width, product_height);
					
					//reset array
					pic_import_arr = [];
 				}
	 			
	 			//say finish
				jQuery('#uploading-remain').html(jQuery('.trans-finihed').val());
			}
		}
	});
}

//function test mask cropping, should be deleted later
function maskcroppingtest(){
     var file_upload = { "ContentLength" : 0,
        "ContentType" : "image/jpeg",
        "Filename" : "10x0520iub235wqq.jpg",
        "Handle" : "409f4329-7529-4b8c-bfef-e573616ad275",
        "HasAlpha" : false,
        "ImageHeight" : 300,
        "ImageUri" : "http://s3.amazonaws.com/c80a405e90da11e09b7993104924019b/Users/352964edc59b4b2983016a709390d764/Images/409f432975294b8cbfefe573616ad275.image",
        "ImageWidth" : 500,
        "IsAsync" : false,
        "Note" : "File uploaded locally in: 00:00:00.0004270\nat: c:\\temp\\409f4329-7529-4b8c-bfef-e573616ad275.jpg\nThumb created and saved in: 00:00:00.0165318\nThumb uploaded to S3 in: 00:00:00.7546823\n",
        "Processing" : "None",
        "State" : "None",
        "ThumbnailUri" : "http://s3.amazonaws.com/c80a405e90da11e09b7993104924019b/Users/352964edc59b4b2983016a709390d764/Images/409f432975294b8cbfefe573616ad275.thumb.image"
     };
     
     var file_upload1 = { "ContentLength" : 0,
        "ContentType" : "image/png",
        "Filename" : "android_sunglasses.png",
        "Handle" : "582e1eb2-c295-4be0-98a6-b62b31b30526",
        "HasAlpha" : false,
        "ImageHeight" : 265,
        "ImageUri" : "http://s3.amazonaws.com/c80a405e90da11e09b7993104924019b/Users/352964edc59b4b2983016a709390d764/Images/582e1eb2c2954be098a6b62b31b30526.image",
        "ImageWidth" : 250,
        "IsAsync" : false,
        "Note" : "File uploaded locally in: 00:00:00.0004083\nat: c:\\temp\\582e1eb2-c295-4be0-98a6-b62b31b30526.png\nThumb created and saved in: 00:00:00.0132334\nThumb uploaded to S3 in: 00:00:00.7596741\n",
        "Processing" : "None",
        "State" : "None",
        "ThumbnailUri" : "http://s3.amazonaws.com/c80a405e90da11e09b7993104924019b/Users/352964edc59b4b2983016a709390d764/Images/582e1eb2c2954be098a6b62b31b30526.thumb.image"
     };
     
     if(file_upload.ImageWidth > file_upload.ImageHeight){
        var picture_format = 'picture_landscape';
    }else{
        var picture_format = 'picture_portrait';
    }
    
    //ratio
    var picture_ratio = findUSCLN( file_upload.ImageWidth, file_upload.ImageHeight );
    
    //add format css style
    file_upload.Format = picture_format;              
    file_upload.Ratio = {
    	"RatioWidth" : file_upload.ImageWidth / picture_ratio, 
    	"RatioHeight" : file_upload.ImageHeight / picture_ratio
    	};      
    	
    	         
     if(file_upload1.ImageWidth > file_upload1.ImageHeight){
        var picture_format = 'picture_landscape';
    }else{
        var picture_format = 'picture_portrait';
    }
    
    //ratio
    var picture_ratio = findUSCLN( file_upload1.ImageWidth, file_upload1.ImageHeight );
    
    //add format css style
    file_upload1.Format = picture_format;              
    file_upload1.Ratio = {
    	"RatioWidth" : file_upload1.ImageWidth / picture_ratio, 
    	"RatioHeight" : file_upload1.ImageHeight / picture_ratio
    	};               

	global_price_object[order_price_chosen].Pictures.push( file_upload );    
	global_price_object[order_price_chosen].Pictures.push( file_upload1 );     
	
	//using for crop function
	pic_import_arr.push( file_upload );
	pic_import_arr.push( file_upload1 );
	//pic_import_arr.push( file_upload2 );
	//pic_import_arr.push( file_upload3 );
	//pic_import_arr.push( file_upload4 );
	//pic_import_arr.push( file_upload5 );
	
	var img_slide_html = '';
	for(var i = 0; i < pic_import_arr.length; i++){
		//var img_html = "<img width=50 src='"+ pic_import_arr[i].ThumbnailUri +"' onclick='ImageCropFunctionCall(\""+ pic_import_arr[i].Handle +"\")'/>";
		//var img_html = '<div><a class="img-cover" title="Pic_Mask" hash="javascript:void(0)"><img alt="Picture" style="width:' + size[0] + 'px;height:' + size[1] + 'px" src="' + v.ThumbnailUri + '" bigthumb="' + imagesource + '"></div>';
		//jQuery('.picture-area').append(img_html);	
		//add the small thumbs to the sidebar
		var img_selected = '';
		if(i == 0){ img_selected = 'crop-picture-border-selected';}
		var _imageFag = (parseInt(pic_import_arr[i].ImageWidth) > parseInt(pic_import_arr[i].ImageHeight)) ? 'picture_landscape' : 'picture_portrait';
		
		img_slide_html += '<li class="crop-picture-li"><div class="crop-picture-border '+ img_selected +'"><img class="'+ _imageFag +'" file="'+ pic_import_arr[i].ImageUri +'" src="'+ pic_import_arr[i].ThumbnailUri +'" />';
		img_slide_html += '<input class="handle" type="hidden" value="'+ pic_import_arr[i].Handle +'"><input class="name" type="hidden" value="'+ pic_import_arr[i].Filename +'"><input class="width" type="hidden" value="'+ pic_import_arr[i].ImageWidth +'"><input class="height" type="hidden" value="'+ pic_import_arr[i].ImageHeight +'">';
		//img_slide_html += '<div class="amount"><span>1</span><input type="hidden" value="1"><div class="arrow"></div></div>';
		
		//define image object
		var _handle = pic_import_arr[i].Handle.replace(/-/g, '');
		eval('img' + _handle  + ' = undefined');
		
		//add to pics_arr
		pics_arr[_handle] = pic_import_arr[i];
	}
	
	//append html
	jQuery('.image-crop-slider-content').empty().append(img_slide_html);
	jQuery(".image-crop-slider-content").width(60 * pic_import_arr.length);
	
	//use for product detail
	var product_width = formats_object[jQuery('.content-size-selected .size-value').val()].forwidth;
	var product_height = formats_object[jQuery('.content-size-selected .size-value').val()].forheight;
		
	//click event
	jQuery('.crop-picture-border').click(function(){
		//change the selected
		jQuery('.crop-picture-border').removeClass('crop-picture-border-selected');
		jQuery(this).addClass('crop-picture-border-selected');
		
		var handle_select = jQuery(this).children('.handle').val();
		
		//call the crop function
		ImageCropFunctionCall(handle_select, product_width, product_height);
	});
	
	//call the crop function
	ImageCropFunctionCall(pic_import_arr[0].Handle, product_width, product_height);
	
	//reset array
	pic_import_arr = [];
}


function getImageUrl(id, file){		
	var reader = new FileReader();
	
	reader.onload = function(e){
		
		// e.target.result holds the DataURL which
		// can be used as a source of the image:
		
		//image.attr('src',e.target.result);
		//preview image class
		var preview_class = '.uploading-image-before' + id;
		jQuery(preview_class).children().children().children('img').attr('src',e.target.result);
	};
	
	// Reading the file as a DataURL. When finished,
	// this will trigger the onload function above:
	reader.readAsDataURL(file);
	
	//message.hide();
	//preview.appendTo(dropbox);
	
	// Associating a preview container
	// with the file, using jQuery's $.data():
	
	//$.data(file,preview);
}