function artPri_getArticleGroup(){
	//create a new api object
    var api = new delivergo.api();

	if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

    //change portal
	api.PortalNameSpace = globalPortal; api.IsDev = globalIsDev;

    //change the URL to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';

    //get country from api
    api.GetArticleGroups( globalLanguage,
        function (result) {
    		dgoArticleGroupTranslation = result.Value;

    		artPri_getAvailableArticleGroup();
    })
}

//function get article from api
function artPri_getAvailableArticleGroup(){
	/*New request instance, now it should have no article*/
    var api = new delivergo.api();

    if(globalPortalUri != null)
		api.PortalUriBase = globalPortalUri;

	//change portal for nhain.vn
	api.PortalNameSpace = globalPortal;

	api.IsDev = globalIsDev;

	//change the url to ajaxproxy file
    api.AjaxProxy = web_2_print_blogInfo + 'inc/ajaxproxy.php?u=';

    //set apikey
    api.ApiKey = guidUser;

    //get article from api
    api.GetAvailableArticles(resaleGuidUser, globalLanguage,
    	function(result){
    		if(result.Value != null){
    			dgoArticleGroups 	= result.Value;

    			dgoNewArticleGroups = ArticleDecentralization( dgoArticleGroups);

    			var article_element = ''

    			for(var i in dgoNewArticleGroups){

    				if(dgoNewArticleGroups[i].Name != undefined){

    					for(var j=0;j<dgoArticleGroupTranslation.length;j++){
    						if(dgoArticleGroupTranslation[j].Token == i){
    							dgoNewArticleGroups[i].Name = dgoArticleGroupTranslation[j].ArticleGroupTranslation[0].Name;
    						}

    						if(i == "CRYSTAL"){
    							if(globalLanguage == "VI"){
    								dgoNewArticleGroups[i].Name = "Pha lê";
    							}

    							if(globalLanguage == "DE"){
    								dgoNewArticleGroups[i].Name = "Kristall";
    							}
    						}
    					}

        				if(Global_ProductImg['Article'][i] == undefined){
        					img = Global_ProductImg['Standard'];
        				}else{
        					img = Global_ProductImg['Article'][i];
        				}

        				article_element += '<div class="art-part-1-element" onclick=goToProductDetails("'+i+'")><input type="hidden" class="articleGroupId" value="'+i+'">';
        				article_element += '<a href="#" class="article-link"><div class="art-part-1-element-pic"><img src="' + web_2_print_blogInfo + 'css/img/imgArticle/' + img + '"></div>';
        				article_element += '<div class="art-part-1-element-label">' + dgoNewArticleGroups[i].Name + '</div></a>';
        				article_element += '</div>';
    				}
    			}

    			//fill all article
    			jQuery('.art-pri-part-1-content').html(article_element);

    			jQuery('.art-part-1-element').hover(function(){
    				//jQuery('#articleIdentifer').val(identifier);
    				var url  = jQuery('#articleForm').attr('action');
    				identifier = jQuery(this).children('.articleGroupId').val();
    				if(identifier != 'CRYSTAL'){
    					jQuery(this).children('a').attr('href',url + makeFriendlyUrl(dgoNewArticleGroups[identifier].Name) + "#" + makeFriendlyUrl(dgoNewArticleGroups[identifier].Items[0].Name) + "-" + "a" + dgoNewArticleGroups[identifier].Items[0].Id);
    				}else{
    					jQuery(this).children('a').attr('href',url + makeFriendlyUrl(dgoNewArticleGroups[identifier].Name) + "#" + makeFriendlyUrl(dgoNewArticleGroups[identifier].Items['CRYSTAL_CUBIC'][0].Name) + "-" + "a" + dgoNewArticleGroups[identifier].Items['CRYSTAL_CUBIC'][0].Id);
    				}
    			})
    		}
    });
}

function goToProductDetails(identifier){
	//jQuery('#articleIdentifer').val(identifier);
	var url  = jQuery('#articleForm').attr('action');
	if(identifier != 'CRYSTAL'){
		url += makeFriendlyUrl(dgoNewArticleGroups[identifier].Name) + "#" + makeFriendlyUrl(dgoNewArticleGroups[identifier].Items[0].Name) + "-" + "a" + Base62.encode(dgoNewArticleGroups[identifier].Items[0].Id);
	}else{
		url += makeFriendlyUrl(dgoNewArticleGroups[identifier].Name) + "#" + makeFriendlyUrl(dgoNewArticleGroups[identifier].Items['CRYSTAL_CUBIC'][0].Name) + "-" + "a" + Base62.encode(dgoNewArticleGroups[identifier].Items['CRYSTAL_CUBIC'][0].Id);
	}

	window.location.href = url;
}

function ArticleDecentralization(Arr){
	var newArr = [];
	for(var i = 0; i < Arr.length; i++){
		if(newArr[Arr[i].ArticleGroupIdentifier] == undefined){
			if(Arr[i].ArticleGroupIdentifier.split("_")[0] == "CRYSTAL"){
				if(newArr["CRYSTAL"] == undefined){
					newArr["CRYSTAL"] = {};
					newArr["CRYSTAL"].Name = "Crystal";
					newArr["CRYSTAL"].Items = [];
				}

				if(newArr["CRYSTAL"].Items[Arr[i].ArticleGroupIdentifier] == undefined){
					newArr["CRYSTAL"].Items[Arr[i].ArticleGroupIdentifier] = [];
				}

				newArr["CRYSTAL"].Items[Arr[i].ArticleGroupIdentifier].push(Arr[i]);

			}else{
				newArr[Arr[i].ArticleGroupIdentifier] 		= {};
				newArr[Arr[i].ArticleGroupIdentifier].Name 	= Arr[i].Matchcode.split("/")[0];
				newArr[Arr[i].ArticleGroupIdentifier].Items = [];
				newArr[Arr[i].ArticleGroupIdentifier].Items.push(Arr[i]);
			}

		}else{
			newArr[Arr[i].ArticleGroupIdentifier].Items.push(Arr[i]);
		}

	}

	return newArr;
}

//make friendly url
function makeFriendlyUrl(url){
	url  = url.toLowerCase()
			  .replace(/[ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự]/g,"u")
			  .replace(/[ü]/g,"ue")
			  .replace(/[á|à|ả|ã|ạ|â|ấ|ầ|ẩ|ẫ|ậ|ă|ắ|ằ|ẳ|ẵ|ặ]/g,"a")
			  .replace(/[ä]/g,"ae")
			  .replace(/[ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ]/g,"o")
			  .replace(/[ö]/g,"oe")
			  .replace(/[é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ]/g,"e")
			  .replace(/[ý|ỳ|ỷ|ỹ|ỵ]/g,"y")
		  	  .replace(/[í|ì|ỉ|ĩ|ị]/g,"i")
			  .replace(/đ/g,"d")
			  .replace(/ñ/g,"n")
			  .replace(/ß/g,"ss")
			  .replace(/^\s+|\s+$/g, "")// trim leading and trailing spaces
			  .replace(/[^a-z0-9]+/g," ") // remove all non-alphanumeric characters
	   		  .replace(/[-|\s]+/g, "_") // change all spaces and minus to a "_"
	   		  .replace(/[_]+/g, "_") 	// replace multiple instances of the "_" with a single instance
	   		  .replace(/^_+|_+$/g, ""); // trim leading and trailing "_"
	return url;
}
