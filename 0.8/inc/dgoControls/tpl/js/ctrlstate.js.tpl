jQuery(function() {
	var state = { 
		__type: "DesignerState:#api.content.model.designer",
		SessionId: '{sessionid}',  
		ContentItemId: '{contentitemguid}',
		User: {userinfo}, 
		UseAjaxProxy: true, 
		AjaxProxyUri: '{ajaxproxy}', 
		//CropBoxWidth: 100, 
		//CropBoxHeight: 80, 
		LanguageToken: '{languagetoken}', 
		PortalId: '{portalid}', 
		ServerBaseUri: '{serverbase}'
	};
	dgo.setCurrentState(state);		 
});