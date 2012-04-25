var dgoUploadPictures = new Array();
var proDgoUploadPictures = new Array();
var pics_arr = new Array();
var mask_arr = new Array();
var mask_settings = null;
var mask_background = null;
var result_arr = new Array();
var comment_arr = new Array();
var img_current = null;
var dropdownSwitchItems = '{dropdownSwitchItem}';
function getUrlVars(){var pathName = window.location.href;return pathName;}
function getArticleGroupId(url){url = url.split('#')[1];url = url.split('-')[1];return url;}
function getArticleSize(url){url = url.split('#')[1];if(url.split('-')[2] != undefined){url = url.split('-')[2];}else{url = null;}return url;}
function getArticleRun(url){url = url.split('#')[1];if(url.split('-')[3] != undefined){url = url.split('-')[3];}else{url = null;}return url;}
function getArticlePic(url){url = url.split('#')[1];if(url.split('-')[4] != undefined){url = url.split('-')[4];}else{url = '';}return url;}
dgoColourArray = null;
dgoCurrentPage 		= 'productDetails';
dgoCurrencies		= '{globalCurrency}';
dgoArticleGroups	= null;
dgoArticleGroupView = '{articleGroupView}';
dgoMetaTagTitle 	= '{MetaTagTitle}';
dgoMetaTagDesciprtion 	= '{MetaTagDes}';
dgoArticleGroupIdentifier = null; 
dgoArticleIdentifier 	  = null
dgoArticleCategory		  = null;
dgoArticleColor			  = null;
globalLanguage			  = '{globallanguage}';
dgoArticleGroupId = dgoArticleSize = dgoArticleRun = dgoArticlePic = getUrlVars();
dgoCatId				  = null;
dgoArticleGroupArray	  = null;
dgoTypeOfId				  = null;
dgoArticleSize			  = getArticleSize(dgoArticleSize);
dgoArticleRun			  = getArticleRun(dgoArticleRun);
dgoArticlePic			  = getArticlePic(dgoArticlePic);
dgoArticleGroupId		  = getArticleGroupId(dgoArticleGroupId);
if(dgoArticleSize != undefined){
	if(dgoArticleSize.charAt(0) == "V"){
		var url 	= window.location.hash;
			url		= url.split("-");		
		dgoArticleColor = Base62.decode(dgoArticleSize.substring(1));		
		//if article size is exist in url
		if(url[3] != undefined){
			dgoArticleSize = url[3];
		}else{
			dgoArticleSize = null;
		}		
		//if run is exist in url
		if(url[4] != undefined){
			dgoArticleRun = url[4];
		}else{
			dgoArticleRun = null;
		}		
		//if picture is exist in url
		if(url[5] != undefined){
			dgoArticlePic = url[5];
		}else{
			dgoArticlePic = '';
		}
	}
}
if(dgoArticleGroupId.charAt(0) != "A"){
	dgoCatId = dgoArticleGroupId.substring(1);
	dgoTypeOfId = "C";
	var url 	= window.location.hash;
		url		= url.split("-");
	//if article size is exist in url
	if(url[4] != undefined){
		dgoArticleSize = url[4];
		if(dgoArticleSize.charAt(0) == "V"){
			dgoArticleColor = Base62.decode(dgoArticleSize.substring(1));
			dgoArticleSize = url[5];
		}
	}else{
		dgoArticleSize = null;
	}
	//if run is exist in url
	if(url[5] != undefined){
		dgoArticleRun = dgoArticleColor == null ? url[5] : url[6];		
	}else{
		dgoArticleRun = null;
	}
	//if picture is exist in url
	if(url[6] != undefined){
		dgoArticlePic = dgoArticleColor == null ? url[6] : url[7];
	}else{
		dgoArticlePic = '';
	}
}else{
	dgoTypeOfId = "A";
}
dgoGuidFlag = false;
dgoGuid = '{dgoGuid}';
if(dgoGuid != ''){
	dgoGuidFlag = true;
	dgoUsername = '{dgoUsername}';
}
dgoCount			= 0;
amountPictures 		= 0;
amountPicturesToCount = 0;
dgoArticleName 		= null;
ArticleGroupArray	= null;
dgoCatInfo			= null;
dgoHandle			= null;
dgoHandleForPhp		= null;
formats_object 		= new Array();
dgoFormatArray	    = null;
maxArea				= null;
minArea				= null;
dgoArticlePrices	= null;
dgoArticlePricesMin = null;
dgoArticlePricesMax = null;
global_price_object = [];
order_price_chosen 	= 0;
var ArticleGroup 	= null;
ProductDetailsGetCurrenciesFromPhp({currencyArray});
apiGetPortalFromPhp({portalArray});

dgoArticleGroupId = dgoTypeOfId + Base62.decode(dgoArticleGroupId.substring(1));
var dataString = "language={language}&currency={currency}&portal={portal}&ArticleId="+dgoArticleGroupId;
if(dgoArticleRun != null){
	dataString += "&amount=" + dgoArticleRun.split('_')[0];
}

if(dgoTypeOfId == "C"){
	var url = window.location.hash.split("-");
	if(url[3] != undefined){dataString += "&RealArticleId="+Base62.decode(url[3].substring(1));}		
}

jQuery.ajax({
   type: "GET",
   url: "{pluginUrl}inc/ajax/ajaxProductDetails.php",
   data: dataString,	   
   success: function(data){
		
		dgoArticleCategory    = {ArticleCategory};
		dgoArticleGroupArray  = {ArticleGroupArray};
		ArticleGroupArray	  = data.Value.ArticleGroups.Value;
		dgoFormatArray		  = data.Value.Format;
		dgoArticlePrices	  = global_price_object = data.Value.Prices.Order.Article;
		dgoArticlePricesMin	  = data.Value.MinPrices.Order.Article;
		dgoArticlePricesMax	  = data.Value.MaxPrices.Order.Article;
		maxArea = data.Value.Material.Order.Article[0].MaxAreaToCalculate;
		minArea = data.Value.Material.Order.Article[0].MinAreaToCalculate;			
		getArticleGroupFromPhp(dgoArticleGroupArray,null,null,null); 	
		getProductVariationFromPhp(data.Value.productVariation);
		getArticlePictureFromPhp(data.Value.productPictures);
		getMaterialsFromPhp(data.Value.Material);
		getFormatFromPhp(data.Value.Format);							
		getMinPricesFromPhp(data.Value.MinPrices);
		getMaxPricesFromPhp(data.Value.MaxPrices);		
		getPricesFromPhp();
		getMasksFromPhp();
		
		//save max volume
		var _article = data.Value.Material.Order.Article[0];
		
		//if volume discount array is not empty
		if(_article.VolumeDiscounts.length > 0){
			max_volume = _article.VolumeDiscounts[_article.VolumeDiscounts.length - 1].Amount;
		}else if(_article.Runs.length > 0){
			max_volume = _article.Runs[_article.Runs.length - 1]
		}									
   }				
});