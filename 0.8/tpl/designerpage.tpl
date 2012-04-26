<div id="statecontroldiv">
	{statecontrolcode}
</div>
<div id="moretemplatesdiv">
	{listcontrolcode}
</div>
<div id="designercontroldiv">
	{designercode}
</div>
<div id="imagescontroldiv" style="clear:both;">
	{imagecontrol}
</div><br />
<div style="text-align:right;">
	<div id="dgoorderdesign" class="order-designed-template login-buttons is-bottons"><span>Order</span></div>
</div>
<script type="text/javascript">
	//TODO: move that functionality to another file
	jQuery(function() {
		//generate link and send it to shopping cart
		sendDesignToShoppingCart = function(actionId) {
			//create printdata link
			var linkToPdf = 'http://api.delivergo.com/content.dev/RenderTemplate.aspx?actionId=' + actionId;
			//get temporary saved json and add a new printdata
			//object, if it doesn't exist
			var tmpjson = JSON2.parse(jQuery('#prices_import').val());
			
			//add printdata to json object here
			tmpjson["Order"]["Article"].push({"PrintData": [{"Items": [linkToPdf]}]});
			
			jQuery('#prices_import').val(JSON2.stringify(tmpjson["Order"]["Article"][0]));
			jQuery('#cartform').submit();
		}
		renderTemplate = function(){
			//generate pdf and send it to shopping cart
			dgo.design.renderDesign(sendDesignToShoppingCart);
		}
		jQuery('#dgoorderdesign').click(function(){
			//generate pdf and send it to shopping cart
			dgo.design.commitHtml(false, renderTemplate, true, false);
		});
	});
	function getPermaLink(/*TODO:arguments*/){
		//TODO: add permalink handling here
	}
	function controlLoaded(){
		//TODO: add code here, which should be executed after control loading
	}	
</script>