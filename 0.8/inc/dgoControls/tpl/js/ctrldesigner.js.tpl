jQuery(function() {	 
	load{designerplaceholder}();
});

load{designerplaceholder} = function() {
	var settings = {
		designerPlaceholderId: '{designerplaceholder}', 
		useCookieForViewCount: false, 
		templatesPlaceHolderId: '{templatesPlaceHolderId}',
		stageWidth: {stageWidth},
		stageHeight: {stageHeight},
		controlLoaded: {controlloaded}
	}
	var state = null;
	return dgo.design.getDesigner(settings, state)
};

showRenderedDesign = function(actionId) {
	document.write(actionid);
}
getActionId = function(){
	//dgo.design.renderDesign(showRenderedDesign);
}