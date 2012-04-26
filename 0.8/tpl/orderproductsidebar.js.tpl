dgoStatusSeoLink = null;
amountPicturesToCount = 0;
dgoUploadPictures = new Array();
amountPictures = 0;
ArticleGroup = {ArticleGroupArray};
CategoryArray = {categoryArray};
countriesGetFromPhp({countryArray});
contacting_GetViaGuidFromPhp({contacting},'addressBook');
apiGetPortalFromPhp({portal});
GetTimeZonesFromPhp({timezones});
GetCurrenciesFromPhp({currencies});
GetLanguagesFromPhp({languages});
if(window.location.hash == ""){
	w2pGetArticleFromPhp({availableArticleArr});
	w2pGetMaterialFromPhp({materialResult});
	w2pGetFormatsFromPhp({formatsResult}, {matchcode});
	w2pGetPricesFromPhp({pricesResult}, {matchcode});
}else{
	if(window.location.hash == '#earn-money-tabs-3'){
		w2pGetArticleFromPhp({availableArticleArr});
		w2pGetMaterialFromPhp({materialResult});
		w2pGetFormatsFromPhp({formatsResult}, {matchcode});
		w2pGetPricesFromPhp({pricesResult}, {matchcode});
	}else if(window.location.hash.split('-')[1] != undefined){
		if(isNaN(parseInt(Base62.decode(window.location.hash.split('-')[1].substring(1)))) == false){		
			w2pGetArticleFromPhp({availableArticleArr});
			dgoStatusSeoLink = true;
		}else{
			w2pGetArticleFromPhp({availableArticleArr});
			w2pGetMaterialFromPhp({materialResult});
			w2pGetFormatsFromPhp({formatsResult}, {matchcode});
			w2pGetPricesFromPhp({pricesResult}, {matchcode});
		}
	}else{
		w2pGetArticleFromPhp({availableArticleArr});
		w2pGetMaterialFromPhp({materialResult});
		w2pGetFormatsFromPhp({formatsResult}, {matchcode});
		w2pGetPricesFromPhp({pricesResult}, {matchcode});
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
		jQuery.blockUI(0);
		
		for(var i = 0; i < dgoUploadPictures.length; i++){
			//save to object            
            //add format css style
            dgoUploadPictures[i].Format = (dgoUploadPictures[i].ImageWidth > dgoUploadPictures[i].ImageHeight) ? 'picture_landscape' : 'picture_portrait';
                	
			//add to price object
			global_price_object[order_price_chosen].Pictures.push(dgoUploadPictures[i]);
			
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
		
	}
}