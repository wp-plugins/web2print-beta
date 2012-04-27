jQuery(function() {
	loadDesignerControlsCtl();
});
loadDesignerControlsCtl = function() {
	var settings = {
		controlsPlaceholderId: '{controlsplaceholder}', 
		designerMode: 'UseDesignComplex', 
		templatesPlaceHolderId: '{templatesPlaceHolderId}'
	}
	var state = null;
	dgo.design.getDesignerControls(settings);
};