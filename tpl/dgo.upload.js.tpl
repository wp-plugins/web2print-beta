/*Globle variables*/
	//var PortalGuid = "3583ffe1-c037-47cc-95ea-3a2e2c05c09f";
	//var UserGuid = "56ee2956-d374-4f70-b1d4-b1fa8774a53d";
	var AuthenGuid = "08AACA47-9341-4045-962D-0EBF0E3B1B56";
	var cur_file_upload = 0;
	var total_file_upload = 0;
	var cur_upload_size = 0;
	var total_upload_size = 0;
	var upload_timer = 3;
	var upload_timer_limit = 4;
	
	//dgo upload dialog init
	//upload picture dialog
	jQuery(function() {
        jQuery( "#MultiUploadForm" ).dialog({
            title: jQuery('#MultiUploadForm .translate-title').val() + '<div class="ex-close-button"></div>',
            autoOpen: false,                            
            width: 720,
            zIndex: 5001,
            dialogClass: "dgo-dialog-class dgo-dialog-multi-upload",
            modal: true,                                                   
            resizable: false
        });                   
    });	

	onOpen = function(event, id, fileObj) {	
		//get current uploadify id
		var _uploadify_id = '#uploadify' + id;
		
		//update file upload status
		fileUploadStatus();
		 var numofDivs = jQuery("#UploadQueue > div").size(); //count DIV tag that contained img tag
		if(numofDivs<=3){
				jQuery('.dgo-dialog-multi-upload').css({"width":"720px"});
				jQuery('#UploadQueue').css({"overflow-x":"hidden"});
			}else{
				jQuery('.dgo-dialog-multi-upload').css({"width":"735px"});
				jQuery('#UploadQueue').css({"overflow":"auto"});
				jQuery('#UploadQueue').css({"overflow-x":"hidden"});
				
			}	
    };
    
    onProgress = function(event,ID,fileObj,data){
    	
    	//show the speed
    	var _speed = data.speed.toFixed(2) + ' kB/s';
    	jQuery('#MultiUploadForm #uploading-speed').html(_speed);
    	
    	//show the remaining time
		cur_upload_size = data.bytesLoaded;
		var remain_time = (total_upload_size - cur_upload_size) / 1024 / data.speed; 				
		if(upload_timer == upload_timer_limit){
			if(remain_time != Infinity){
				jQuery('#MultiUploadForm #uploading-remain').html(timeConverter(Math.round(remain_time)));
			}					
			upload_timer = 0;
		}
		upload_timer++;
    };
    
    // datei wurde hochgeladen -> liste updaten
    onComplete = function(event, id, fileObj, response, data) {
      //showCustomerUploads();
      //append finished pictures to array
      	var responseJSON = JSON2.parse(response);
		
      	dgoUploadPictures.push(responseJSON.Files[0]);
		
      	//increase count number
      	amountPictures++;
      	//increase current file upload
      	cur_file_upload++;
      	//update file upload status
		fileUploadStatus();
		
		//decrease total file size
		total_upload_size -= fileObj.size;
    };
    
    onAvatarUploadComplete = function(event, id, fileObj, response, data) {
    	//assign to the address
    	var _id = jQuery('#uploadAvatarId').val();
    	var responseJSON = JSON2.parse(response);
    	var avatarUrl = responseJSON.Files[0].ThumbnailUri;
    	
    	contacting_UploadAvatar(_id, avatarUrl, 0);
    	
    	//close the dialog
    	jQuery('#MultiUploadForm').dialog('close');
    	jQuery('.directUploadForm').dialog('close');
    };
    
    onSelect = function(event, id, fileObj){
    	//increase total file upload
    	total_file_upload++;
    	//total upload size
    	total_upload_size += fileObj.size;
    }
    
    onSelectOnce = function(event,data) {
    	//open dialog
    	jQuery('#MultiUploadForm').dialog('open');
    	jQuery('#MultiUploadForm').dialog({ position: 'center' });
    }
    
    onCancel = function(event,ID,fileObj,data){
    	//decrease total upload file
		total_file_upload--;
		if(total_file_upload<=3){
				jQuery('.dgo-dialog-multi-upload').css({"width":"720px"});
			}else{
				jQuery('.dgo-dialog-multi-upload').css({"width":"735px"});
				jQuery('#UploadQueue').css({"overflow":"auto"});
			}
		//update file upload status
		fileUploadStatus();
		
		//decrease total file size
		total_upload_size -= fileObj.size;
		
		//if the rest of upload file
		if(data.fileCount == 0){
			jQuery('#uploadify').uploadifyClearQueue();
			
			//upload complete
			dgouploadcomplete();
		}
    }
    
    onAllComplete = function(event,data){
    	//upload complete
    	dgouploadcomplete();
    }

	jQuery(document).ready(function() {
		if(PortalGuid == null){
			apiGetPortal('PortalForUpload', function(){
				multiFlashUploadCreate();
				
				//using for upload avartar
				avatarFlashUploadCreate();
			});
		}else{
			multiFlashUploadCreate();
			
			//using for upload avartar
			avatarFlashUploadCreate();
		}
	});
	
	//function create flash upload
	function multiFlashUploadCreate(){
		jQuery('#uploadify').uploadify({
		    'uploader'  : '{pluginUrl}js/uploadify.embedded.font.swf',
		    'script'    : 'https://api.normprint.com/portal.dev/normprint/UploadProxy.ashx',
		    'cancelImg' : '{pluginUrl}css/img/icon/dialog-close.png',
		    'queueID'	: 'UploadQueue',
		    'scriptData': {
			                /*ts: '300',
							p: 'c80a405e-90da-11e0-9b79-93104924019b',
							u: '352964ed-c59b-4b29-8301-6a709390d764'*/
							pid: PortalGuid,
							uid: (dgoGuid == null || dgoGuid == '') ? UserGuid : dgoGuid,
			                aid: AuthenGuid,
			                ts: 600
			              },
			'buttonText': 'Upload Picture',
			'hideButton': true,
			'onComplete': onComplete,
			'onOpen': onOpen,
			'onProgress'  : onProgress,
			'onSelect'  : onSelect,
			'onSelectOnce' : onSelectOnce,
			'onCancel'  : onCancel,
			'onAllComplete'  : onAllComplete,
			'fileExt': '*.jpg;*.jpeg;*.png;*.tiff;*.gif',
			'fileDesc': 'Images',
			'width': 225,
			'height': 55,
			//'buttonImg': '{pluginUrl}css/img/icon/uploadButton.png',
			'wmode'       : 'transparent',
		    'auto'      : true,
		    'removeCompleted' : false,
		    'multi': true,
		    'maxFilenameLabelSize': 30
		});
	}
	
	//function create flash upload
	function avatarFlashUploadCreate(){
		jQuery('#buttonSimpleUpload').uploadify({
		    'uploader'  : '{pluginUrl}js/uploadify.embedded.font.swf',
		    'script'    : 'https://api.normprint.com/portal.dev/normprint/UploadProxy.ashx',
		    'cancelImg' : '{pluginUrl}css/img/icon/dialog-close.png',
		    'queueID'	: 'UploadQueue',
		    'scriptData': {
							pid: PortalGuid,
							uid: (dgoGuid == null || dgoGuid == '') ? UserGuid : dgoGuid,
			                aid: AuthenGuid,
			                ts: 150
			              },
			'buttonText': 'Upload Avatar',
			'hideButton': true,
			'onComplete': onAvatarUploadComplete,
			'onOpen': onOpen,
			'onProgress'  : onProgress,
			'onSelect'  : onSelect,
			'onSelectOnce' : onSelectOnce,
			'onCancel'  : onCancel,
			'fileExt': '*.jpg;*.jpeg;*.png;*.tiff;*.gif',
			'fileDesc': 'Images',
			'width': 225,
			'height': 55,
			//'buttonImg': '{pluginUrl}css/img/icon/uploadButton.png',
			'wmode'       : 'transparent',
		    'auto'      : true,
		    'multi': false,
		    'maxFilenameLabelSize': 30
		});
	}
	
	//function upload cancel
	function uploadifyCancel(id){
		if(confirm('Are you sure want to cancel this upload?')){                
			jQuery('#uploadify').uploadifyCancel(id);					
	    }				
	}
	
	//function stop all upload
	function upload_stop_all(){
		if(confirm('Are you sure want to cancel all current uploads?')){                
			jQuery('#uploadify').uploadifyClearQueue();	
			
			//upload complete
			dgouploadcomplete();			
	    }
	}
	
	//set up file upload status
	function fileUploadStatus(){
		jQuery('#MultiUploadForm #uploading-file').html((cur_file_upload + 1) + ' '+ jQuery('.trans-of').val() +' ' + total_file_upload);
	}
	
	//function convert seconds to minutes...
    function timeConverter(seconds){
        //count the minutes
        var minutes = Math.floor(seconds / 60);  
        
        //return seconds
        seconds = seconds - (minutes * 60);  
        
        //count the hours
        if(minutes != 0){
            var hours = Math.floor(minutes / 60);
            
            //return minutes
            minutes = minutes - (hours * 60);
            
            //count the days
            if(hours != 0){
                var days = Math.floor(hours / 24);
                
                //return the hours 
                hours = hours - (days * 24);
                
                //continue for weeks, mounths, years ....
                
            }
        }
        
        	seconds = seconds > 9 ? seconds : '0' + seconds;
        	
        var result = '00:00:' + seconds;
        
        //return result
        if(minutes != 0){
           
            minutes = minutes > 9 ? minutes : '0' + minutes;
            
            result = '00:' + minutes + ':' + seconds;
            
            if(hours){
               
                hours = hours > 9 ? hours : '0' + hours;
               
                result = hours + ':' + minutes + ':' + seconds;
                
                if(days){
                    if(days == 1){
                        var txtDays = ' ' + jQuery('.trans-days').val();
                    }else{
                        var txtDays = ' ' + jQuery('.trans-days').val();
                    }
                    
                    result = days + txtDays;
                    
                    //continue...(weeks, mounths, years)
                }
            }
        }
        
        return result;
    }