load{treeplaceholder} = function() {
	var settings = {
		mode: 'TreeView',
		categoryBasedPlaceHolderId: '{treeplaceholder}',
		contentItemsListPlaceholderId: '{listplaceholder}',
		treeItemLinkHandled: false,
		templatesPlaceHolderId: '{templatesPlaceHolderId}'
	}
	var state = null;
	dgo.browse.loadCategoryBasedControl(settings, state)
};
jQuery(function() {
	load{treeplaceholder}();
}); 