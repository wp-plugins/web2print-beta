dgoCurrentPage 	= "designDetails";
dgoCurrencies	= globalCurrency;
dgoDesigns 		= null;
dgoDesignsAfterFilter = new Array();
dgoArticleGroupIdentifier = null; 
dgoArticleIdentifier = null;
dgoArticleName 		= null;
dgoHandle			= null;
formats_object 		= null;
maxArea				= null;
minArea				= null;
dgoArticlePrices	= null;



global_price_object = [];
order_price_chosen 	= 0;
var ArticleGroup 	= null;

function getArticleGroupId(){
	var url = window.location.href;
		url = url.split('#')[0];
		url = url.split('_')[url.split('_').length - 2];
	
	return url;
}

function getDesignGuid(){
	var url = window.location.href;
		url = url.split('#')[0];
		url = url.split('_')[url.split('_').length - 1];
	
	return url;
}

function getArticleSize(){
	var url = window.location.href;
	
	if(url.split('#')[1] != undefined){
		url = url.split('#')[1];
		
		if(url.split('-')[1] != undefined){
			url = url.split('-')[1];
		}else{
			url = null;
		}	
	}else{
		url = null;
	}
	
	
	return url;
}

function getArticleRun(){
	var url = window.location.href;
		
	if(url.split('#')[1] != undefined){
		url = url.split('#')[1];
		
		if(url.split('-')[2] != undefined){
			url = url.split('-')[2];
		}else{
			url = null;
		}	
	}else{
		url = null;
	}
	
	return url;
}

function getArticlePic(){
	var url = window.location.href;
	
	if(url.split('#')[1] != undefined){
		url = url.split('#')[1];
		
		if(url.split('-')[3] != undefined){
			url = url.split('-')[3];
		}else{
			url = '';
		}	
	}else{
		url = '';
	}
	
	return url;
}

dgoArticleGroupId = getArticleGroupId();
dgoDesignGuid 	  = getDesignGuid();
dgoArticleSize	  = getArticleSize();
dgoArticleRun	  = getArticleRun();
dgoArticlePic	  = getArticlePic();

ProductDetailsGetCurrencies();
DesignDetails_getArticleGroup(null, null, null);
 