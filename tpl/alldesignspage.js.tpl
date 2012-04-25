dgoCurrentPage = 'MotiveDesigns';
alldesign_getAvailableArticle();
dgoDesigns = null;
dgoDesignsAfterFilter = new Array();
dgoArticleId = getArticleIdviaUrl();
dgoDesignType = getDesignTypeUrl();
dgoLatestDesigns = null;
function getArticleIdviaUrl(){
	var url = window.location.hash;
	
	if(url != ""){
		url = url.split("_");
		url = url[url.length-2];
		return url;
	}else{
		return null;	
	}
}

function getDesignTypeUrl(){
	var url = window.location.hash;
	
	if(url != ""){
		url = url.split("_");
		url = url[url.length-1];
		return url;
	}else{
		return null;	
	}
}