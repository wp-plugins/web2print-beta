<div class="cart_article_{articleId}">
	<div class="cartArticle">
		<div class="posDiv"></div>
		<div class="descriptionDiv"><span class="descriptionDiv-name">{articleName}</span><br/><span class="descriptionDiv-des" title="{articleProductName} {articleDescription}">{articleProductName} {articleDescription}</span><br />{transProductFinishedCaption} <select class="product-time-select"><option value="{articlePriceType}">{articlePriceTime} - {articlePriceType}</option></select><br /></div>
		<div class="amountDiv" id="{articleId}">
			<input class="run-input-value" type="text"  maxlength="5" value={firstRun}>
			<div class="drop-icon"></div>
			<div class="amount-select-discount" style="display:none; {fix_height_css}">
				{runOption}
			</div>
			<input id="test_amount_run" type="hidden" value="{amountRun}" />
			<input id="max-volume" type="hidden" value="{max_volume}" />
		</div>		
		<div class="delAction"></div>
		<div class="priceDiv">{articleOldPriceShow}<span class="priceDiv-articlePriceShow" style="color:{articlePriceShowStyle}">{articlePriceShow}</span></div>
		<input class="article_id" type="hidden" value="{articleId}" />
		<input class="order_dim_width" type="hidden" value="{articlePageWidthOpen}" />
		<input class="order_dim_height" type="hidden" value="{articlePageLengthOpen}" />
	</div>
	<div class="shop-article-pictures">
		<div class="shop-article-pictures-in">
			{articlePictures}
			<input type="hidden" class="article-id" value="{articleId}" />			
			<input class="check-out-name" type="hidden" name="item_name[]" value="{articleName}">
			<input class="check-out-des" type="hidden" name="item_desc[]" value="{articleDescription}">
			<input class="check-out-run" type="hidden" name="item_qty[]" value="{articleRun}">
			<input class="check-out-price" type="hidden" name="item_unit_price[]" value="{articlePriceVAT}">				
		</div>
	</div>
	<input class="article_id" type="hidden" value="{articleId}" />
	<input class="order_dim_width" type="hidden" value="{articlePageWidthOpen}" />
	<input class="order_dim_height" type="hidden" value="{articlePageLengthOpen}" />
	<input class="article-guid-hidden" type="hidden" value="{articleguid}" />
</div>
<script type="text/javascript">	
setTimeout(function(){
	//check changing run of article
	/*var changing_run = '{changing_run_flag}';
	if(changing_run != ''){
		var changing_run_class = '.cartArticle #' + changing_run;
		var current_run = jQuery(changing_run_class).children('.run-input-value').val();

			jQuery(changing_run_class).children('.amount-select-discount').find('.drop-run-hide').each(function(){
			    if(jQuery(this).children('input').val() == current_run){
			    	jQuery(this).click();
				}
			});
	}*/
}, 10000);
</script>