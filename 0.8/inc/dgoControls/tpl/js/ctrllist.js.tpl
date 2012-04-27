jQuery(function() {
	load{contentItemsListPlaceholderId}();
});
load{contentItemsListPlaceholderId} = function() {
	var settings = {
		previewSize: 'Small',
		contentItemsListPlaceholderId: '{contentItemsListPlaceholderId}', 
		onPlacingItem: {onplacingitem},  
		filter: {filter}, 
		permaLinkCallback: {getpermalink}, 
		detailLevel: {detaillevel}, 
		showPager: {showpager}, 
		showFilter: {showfilter}, 
		templatesPlaceHolderId: '{templatesPlaceHolderId}', 
		controlLoaded: {controlloaded}
	};
	var state = null;
	dgo.browse.getCategoryPager(settings, state);
};