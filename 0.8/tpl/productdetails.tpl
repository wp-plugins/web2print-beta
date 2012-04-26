<script type="text/javascript">
	$ = jQuery.noConflict();
	var socialPortal = null;
	var social_user_id = null;
	var socialSourceID = null;
	var max_volume = 1000;
	blogname = '{blogName}';
</script>
<link rel="stylesheet" type="text/css" href="http://api.delivergo.com/content.beta/css/delivergo.content.css" />	
<link rel="stylesheet" type="text/css" href="http://api.delivergo.com/content.beta/css/jquery.tooltip.css" />
<link rel="stylesheet" type="text/css" href="http://api.delivergo.com/content.beta/css/jquery.rater.css" />
<link rel="stylesheet" type="text/css" href="http://api.delivergo.com/content.beta/css/jquery.treeview.css" />
<link rel="stylesheet" type="text/css" href="http://api.delivergo.com/content.beta/css/jquery.dropdown.css" />
<link rel="stylesheet" type="text/css" href="http://api.delivergo.com/content.beta/css/jquery.checkbox.css" />
<link rel="stylesheet" type="text/css" href="http://api.delivergo.com/content.beta/css/jquery.colorPicker.css" />
<link rel="stylesheet" type="text/css" href="http://api.delivergo.com/content.beta/css/jquery.numeric.stepper.css" />
<link rel="stylesheet" type="text/css" href="http://api.delivergo.com/content.beta/css/jquery-ui-smoothness.css" />
<link rel="stylesheet" type="text/css" href="http://api.delivergo.com/content.beta/css/jquery.treeview.css" />
<link rel="stylesheet" type="text/css" href="http://api.delivergo.com/content.beta/css/fg.menu.css" />
<script src="http://api.delivergo.com/content.beta/js/delivergo.content.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/delivergo.content.browse.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/delivergo.content.design.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/delivergo.content.upload.js" type="text/javascript"></script>
<script type="text/javascript" src="{pluginUrl}js/jquery.rater.js"></script>
<script src="http://api.delivergo.com/content.beta/js/delivergo.content.social.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/delivergo.crypt.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/tools.scrollable-1.1.2.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/swfobject.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/jquery.simplemodal-1.3.5.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/fg.menu.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/jquery.zoompan.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/jquery-dotimeout.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/jquery.tooltip.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/jquery.format.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/jquery.checkbox.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/jquery.numeric.stepper.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/jquery.colorPicker.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/jquery.dropdown.js" type="text/javascript"></script>
<script src="http://api.delivergo.com/content.beta/js/jquery.treeview.js" type="text/javascript"></script>
<script type="text/javascript" src="{pluginUrl}/js/dgosocial.api.js"></script>

<div class="prod-detail-container">
	<input id="keyword_products" type="hidden" value="{keyword_products}"/>
	<input class="pic-message-resolution" type="hidden" value="{PicHasLowResolution}"/>
	<input class="trans-ready-to-upload" type="hidden" value="{Readytoupload}"/>
	<input class="trans-cancel-upload-image" type="hidden" value="{Doyouwanttocanceluploadthisimage}"/>
	<input class="trans-saving" type="hidden" value="{Saving}"/>
	<input class="trans-of" type="hidden" value="{of}"/>
	<input class="trans-upload-complete" type="hidden" value="{UploadComplete}"/>
	<input class="trans-finihed" type="hidden" value="{Finished}"/>
	<input class="trans-seconds" type="hidden" value="{seconds}"/>
	<input class="trans-minutes" type="hidden" value="{minutes}"/>
	<input class="trans-hours" type="hidden" value="{hours}"/>
	<input class="trans-days" type="hidden" value="{days}"/>
	<input class="trans-maxpricePer" type="hidden" value="{transmaxpricePer}"/>
	
	<div class="prod-detail-part-1">
		<div class="prod-detail-part-1-top">
			<div id="breadcrumb">  
			    <ul class="crumbs">  
			        <li class="first"><a href="#" style="z-index:9;"><span></span>{keyword_breadcrumb}</a></li>  
			        <li class="li-article-group"><a href="#" style="z-index:8;">...</a></li>  
			        <li class="li-article"><a href="#" style="z-index:7;">...</a></li>  
			    </ul>  
			</div> 
			<div class="prod-detail-rating" id="prod-detail-rating">
				<span class="ui-rater">
					<span style="width: 100px;" class="ui-rater-starsOff">
						<span style="width: 0px;" class="ui-rater-starsOn"></span>
					</span>
					<span class="ui-rater-rating"></span>&nbsp;(<span class="ui-rater-rateCount">0</span>)
				</span>
			</div>
		</div>
		<div class="prod-detail-part-1-leftside" id="prod-detail-leftside-standard">
			<div class="prod-detail-part-1-leftside-content">
				<div class="showing-image">
					<div class="left-narrow"></div>
					<div class="right-narrow"></div>
					<div id="div-loader">
						<a href="" id="loader" class="loading" rel='prettyPhoto'>
							<img id="img" src="{pluginUrl}/css/img/icon/loading.gif" style="40px">
						</a>
					</div>
					<div id="reel-container" style="display:none">
						<a href=""><img id="img" src="{pluginUrl}/css/img/icon/object-reel.jpg" width='276' height='126'></a>
					</div>
				</div>
				<div class="image-list">
					<div class="left-narrow-small"></div>					
					<div class="image-list-container">
						<div class="image-list-content">						
						</div>
					</div>
					<div class="right-narrow-small"></div>
					<div id="slider-wrap" style="display:none">
					</div>
				</div>
			</div>
			<div class="prod-detail-part-1-leftside-shadow"></div>
		</div>
		
		<div class="prod-detail-part-1-leftside" id="prod-detail-leftside-preview" style="display: none">
			<div class="prod-detail-part-1-leftside-content">
				<div class="showing-image">
					<div id="div-loader-preview">
						<img id="background-img" src="" />
						<img id="img-mask" class="img-mask" src=""/>
						<img id="img-mask-inside" class="img-mask-inside" src=""/>
					</div>
				</div>
				<div class="image-list">
					<div class="left-narrow-small"></div>					
					<div class="image-list-container">
						<div class="image-list-content">						
						</div>
					</div>
					<div class="right-narrow-small"></div>
				</div>
			</div>
			<div class="prod-detail-part-1-leftside-shadow"></div>
		</div>
		
		<div class="prod-detail-part-1-rightside">
			<div class="prod-detail-part-1-rightside-name-description">				
				<input type="hidden" id="article-identifier">
				<input type="hidden" id="material-key">
				<div class="prod-detail-part-1-rightside-name">
					{transLoading}...
				</div>
				<div class="prod-detail-part-1-rightside-description">
					{transLoading}...			
				</div>
			</div>			
			<div class="prod-detail-part-1-rightside-price">
				<div class="price-start-container">
					<div class="prod-detail-part-1-rightside-top">
						<div class="prod-detail-part-1-rightside-amount">
							<input type="hidden" id="amount-run-type" value="">							
							<div class='pro-details-dropdown-block'>
								<div class='pro-details-dropdown-input'>
									<span><input type="text" value="..." class="amount-input" onkeypress="return isNumber(event);"></span>
								</div>
								<div class='pro-details-dropdown-button' id="pro-details-dropdown-button"></div>
							</div>
							<div id="runs-dropdown">
								
							</div>
						</div>
						<div class="prod-detail-part-1-rightside-currency">
							<div class="price-is-text" style="float: left; margin-right: 10px; line-height: 27px;">{transPricePer}:</div>
							<div class="cross-start-value" style="display: none"></div>
							<input id="cross-start-value" type="hidden" value="" />
							<div class="price-start-value-border"><div class="price-start-value">{imgLoadingSmall}</div><div class="price-start-value-trick" style="font-size: 22px; color: white;">100</div></div>										
							<input type="hidden" id="price-start-value" value="">
							<div style="float:left;width:20%">
								<select class="prod-details-currency-dropdown">
									<option>EUR</option>						
								</select>
							</div>
						</div>
					</div>
					<div class="price-description" style="clear: both; padding: 0 20px;">
						<div style="float: left;"><span id="cross-min-price"></span></div>
						<div id="sum-price-change" style="display: none; float: right; cursor: pointer;" onclick="sum_price_change();"><span id="sum-text"></span><input type="hidden" value="summe" /></div>
					</div>
				</div>
				<div class="end-user-price-note"><span>* {transEndUserPriceFormat}</span></div>
				<div class="prod-detail-part-1-rightside-bottom article-group-container" style="display:none">
					<div class="rightside-middle-label">{ArticleGroups}</div>
					<input type="hidden" id="article-group-id">
					<div class="rightside-middle-size article-group-content">
						{transLoading}...	
					</div>
					<div class="article-group-content-dropdown">
						<div class="article-group-dropdown-display">
							<span><img id="article-group-dropdown-img" src=""></span>
							<span id="article-group-dropdown-label" class="article-group-dropdown-label" title=""></span>
							<span id="article-group-dropdown-arrow" class="article-group-dropdown-arrow"></span>
						</div>
						<div class="article-group-dropdown-content">
							
						</div>
					</div>
				</div>				
				<div class="prod-detail-part-1-rightside-bottom article-subtype">
					<div class="rightside-middle-label">{Subtypes}</div>
					<input type="hidden" id="article-matchcode">
					<div class="rightside-middle-size subtypes-content">
						{transLoading}...				
					</div>
					<div class="subtypes-content-dropdown">
						<div class="subtypes-dropdown-display">
							<span><img id="subtypes-dropdown-img" src=""></span>
							<span id="subtypes-dropdown-label" class="subtypes-dropdown-label" title="">...</span>
							<span id="subtypes-dropdown-arrow" class="subtypes-dropdown-arrow"></span>
						</div>
						<div class="subtypes-dropdown-content">
							
						</div>
					</div>
				</div>
				<div class="prod-detail-part-1-rightside-middle colour-container" style="display:none">
					<div class="rightside-middle-label">{AvailableColors}</div>					
					<div class="rightside-middle-content colour_content">						
					</div>
				</div>
				<div class="prod-detail-part-1-rightside-bottom article-size-container">
					<div class="rightside-middle-label">{AvailableSizes}</div>
					<input type="hidden" id="article-size">
					<div class="rightside-middle-size available-size">
						{transLoading}...	
					</div>
					<div class="rightside-middle-size available-size-dropdown">
						<div class="size-dropdown-container" >
							<div class="size-dropdown-main content-size-selected">
								<div class="size-dropdown-main-name" id="size-dropdown-main-name">{transLoading}...</div>
								<div class="size-dropdown-main-arrow" id="size-dropdown-main-id"></div>
								<input type="hidden" class="size-value" value="">
							</div>
							<div class="size-dropdown-content">
								<div class="size-dropdown-content-item">{transLoading}...</div>								
							</div>
						</div>
					</div>
				</div>	
			</div>

			<form action="{pluginUrl}inc/ajax/redirectShop.php" method="post" id="multiSelectSubmitForm">
				<input type="hidden" name="prices_import" value="" id="prices-import">
				<input type="hidden" name="shopcart_permalink" value="/shopping-cart" class="shopcart-link-hidden">
				<img style="display: none" id="img-link-render" src="" />
				<input type="hidden" id="img-link-hidden" value="" />
			</form>
			
			<form action="{pluginUrl}inc/ajax/shop_multi_redirect.php" method="post" id="shopMultiRedirectForm">
				<input type="hidden" name="multi_prices_import" value="" id="multi_prices-import">
				<input type="hidden" name="shopcart_permalink" value="/shopping-cart" class="shopcart-link-hidden">
			</form>
			
			<div class="prod-detail-part-1-rightside-footer">
				<div class="prod-details-upload-creat-button is-bottons" id="back-button" style="float: left; display: none" onclick="backHandle();">
					Back	
				</div>
				<div class="prod-details-upload-creat-button is-bottons" id="customize-button" style="float: left; display:none" onclick="customizeHandle();">
					{transOnlineDesigner}	
				</div>
				<div class="prod-details-upload-creat-button is-bottons" id="uploadify-wrapper">
					<input style="display: none" id="uploadify" type="file" name="file_upload" multiple=""/>    
			        <span id="dgo-bt-text">{transUploadPictures}</span>	
				</div>
				<div class="prod-details-upload-creat-button is-bottons" id="addtocart-button" style="display: none">
					Add to cart
				</div>
				<div class="prod-details-upload-creat-button is-bottons" id="addtocart-button2" style="display: none" onclick="preview2shopcart()">
					Add to cart
				</div>
			</div>
			<div class="prod-detail-trust-part">
				<div class="prod-detail-trust-part-title">
					<span>{YourAdvantages}</span>
				</div>
				<div class="prod-detail-trust-advantages">
					<ul>
						<li>{TageRueckgaberecht}</li>
						<li>{Expressversandmgl}</li>
						<li>{KeineMindestabnahme}</li>
					</ul>
				</div>				
				<div class="prod-detail-trust-bank">
					<div class="prod-detail-trust-bank-icons"></div>
				</div>
			</div>
			<div class="prod-detail-part-1-rightside-social">
					<div class="procal-links-area">
						<div class="googleplus">  
							<div class="googlehider">  
								<g:plusone size="small" annotation="none"></g:plusone>  
								<script type="text/javascript">  
								  window.___gcfg = {lang: 'en-GB'};  
								  
								  (function() {  
									var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;  
									po.src = 'https://apis.google.com/js/plusone.js';  
									var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);  
								  })();  
								</script>  
							</div>  
								<div class="mygoogle"></div>
						</div>
					
						<div class="tweet-like">
							<div class="tweethider"> 
								<a href="https://twitter.com/share" target="_blank" class="twitter-share-button" data-count="none">Tweet</a>
								<script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>
							</div>

							<div class="mytweet"></div>
						</div>	
																	
						<div class="fb"> 
								<div class="fbhider">
									<iframe src="http://www.facebook.com/plugins/like.php?app_id=185800681493185&amp;href={currentPageUrl}&amp;send=false&amp;layout=standard&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=35" scrolling="no" frameborder="0" style="border:none;overflow:hidden;width:20px; height:35px;" allowTransparency="true"></iframe>									
							</div>
							<div class="myfb"></div>
						</div>
						<div class="trust-pinit"><a href="http://pinterest.com/pin/create/button/?url={currentPageUrl}&media=http%3A%2F%2Fd3io1k5o0zdpqr.cloudfront.net%2Fimages%2Fpinit.png" class="pin-it-button" count-layout="none">Pin It</a>
						<script type="text/javascript" src="http://assets.pinterest.com/js/pinit.js"></script></div>
						<div class="tell-a-friend">{Tellafriends}</div>
						<div class="trust-link">{Link}</div>
				</div>
				<div class="tablink">
					<input type="text" name="link" id="testlink"  />
					<div class="btcopy" id="test_copy">{Copy}</div>
					<div class="small-arrow"></div>
				</div>
				<script type="text/javascript">
				jQuery(document).ready(function(){
							jQuery(".trust-link").click(function(){
								jQuery('.tablink').toggle('fast', function() {
									jQuery("#testlink[type=text]").select();
									jQuery('#test_copy').zclip({
										path: web_2_print_blogInfo+'js/ZeroClipboard.swf',
										copy:function(){return jQuery(this).prev().val();}
									});	   							 
  								});
								jQuery("#testlink").val(window.location.href);
							});
				});
				jQuery(".trust-link").show();
				jQuery(".tablink").hide();
				</script>				   
			</div>
		</div>
	</div>

	<div class="prod-details-middle-footer">
		<div class="prod-details-comment">
			<h5>Reviews and Comments</h5>
			<div class="prod-details-comment-border">
				<div id="comment-comments" class="comment-comments"><img id="comment-loading" src="{pluginUrl}css/img/icon/ajax-loading.gif" /></div>
				<div id="comment-user" class="comment-user">
					<{nologinopen}span class="comment-text-translation">{transLeaveAComment}</span>
					<div class="login-button is-bottons" onclick="jQuery('.loginForm').dialog('open');">{transLogin}</div>
					<span class="comment-text-translation">{transOr}</span>
					<div class="signup-button is-bottons">{transSignUp}</div{nologinclose}>
					
					<{loginopen}div class="user-logo"><img height=50 src="{userlogourl}" alt=""/></div>
					<div class="user-info">
						<span>{transHello} {username},</span><br/>
						<span>{transLookForwardIdea}</span>
					</div{loginclose}>
				</div>
				<div id="comment-write">
					<textarea id="text-area" class="text-area"></textarea><input class="is-bottons text-button" id="text-button" type="button" value="{transSend}" onclick="sendComment();"/>
				</div>
				<input id="no-comment" type="hidden" value="{NoCommentTranslation}" />
			</div>
		</div>
	</div>
	
<div style="height:1px;overflow:hidden">		
{dgouploadtpl}

{dgocroptpl}	
</div>

<div class="email-popup" style="height: 1px;overflow: hidden;">
	<div class="email-form">
		<form name="EmailForm" action="{pluginUrl}inc/ajax/saveLogin.php" method="post"> 
			<div class="emailForm-element">
				<div class="emailForm-element-left">
					<div class="emailForm-element-label">Ihr Name:</div>
					<div class="emailForm-element-input"><input class="emailForm-yourname" type="text" name="yourname" ><div class="emailForm-email-error"></div></div>
				</div>
				<div class="emailForm-element-right">
					<div class="emailForm-element-label">Ihre E-Mail Adresse:</div>
					<div class="emailForm-element-input"><input class="emailForm-youremail" type="text" name="youremail" ><div class="emailForm-email-error"></div></div>
				</div>
			</div>
			<div class="emailForm-element">
				<div class="emailForm-element-checkbox"><input type="checkbox" value="yes" checked="checked"></div>
				<div class="emailForm-element-text">
					Ja, ich moechte Sonderangebote & News per E-Mail erhalten.
				</div>
			</div>
			<div class="emailForm-element">
				<div class="emailForm-element-left">
					<div class="emailForm-element-label"></div>
					<div class="emailForm-element-picture">
						<img src="{pluginUrl}css/img/imgMaterials/STANDARD.png" title="Keychains" alt="Keychains" name="Keychains">
					</div>
				</div>
				<div class="emailForm-element-right">
					<div class="emailForm-element-label">Ihre Nachricht:</div>
					<div class="emailForm-element-input"><textarea class="emailForm-message"></textarea></div>
				</div>
			</div>
			<div class="emailForm-element more-email-container">
				<div class="emailForm-element-container">
					<div class="emailForm-element-left">
						<div class="emailForm-element-label">Name des Empfängers:</div>
						<div class="emailForm-element-input"><input class="emailForm-name" type="text" name="name-1" ><div class="emailForm-email-error"></div></div>
					</div>
					<div class="emailForm-element-right">
						<div class="emailForm-element-label">E-Mail Adresse:</div>
						<div class="emailForm-element-input"><input class="emailForm-email" id="emailForm-email-1" type="text" name="email-1" ><div class="emailForm-email-error"></div></div>
					</div>					
				</div>					
			</div>
			<div class="emailForm-element">
				<div class="emailForm-element-left">
					<div class="emailForm-element-button add-more-emails">+ Empfaenger hinzufuegen</div>						
				</div>
				<div class="emailForm-element-right">
					<div class="emailForm-element-button send-to-friends">Nachricht jetzt senden</div>						
				</div>
			</div>
		</form>
	</div>	
</div>

<script type="text/javascript">

	jQuery('.email-popup').dialog({
        title: '{Tellafriends} <div class="ex-close-button"></div>',
        autoOpen: false,                            
        width: 500,
        dialogClass: "dgo-dialog-class dgo-tell-a-friend",
        modal: true, 
        zIndex: 5001,
        resizable: false,
        position: 'center'
    });
	
	jQuery('.tell-a-friend').click(function(){
		jQuery('.email-popup').dialog('open');
		jQuery( ".loginForm" ).dialog({ position: 'center' });
	});	

	jQuery('.img-cover-mask').click(function(){		
		var img_handle = jQuery(this).children('img').attr('handle');
		if(img_handle != undefined){
			//load image			
			if(jQuery('#div-loader #dummy-img').html() == null){
				jQuery('#div-loader').html('<img id="dummy-img" src="" />');
			}
			jQuery('#div-loader #dummy-img').attr({src: result_arr[img_handle].MaskUri});
			
			if(jQuery('#div-loader').children('#img-mask').html() == null){
				jQuery('#div-loader').append('<img id="img-mask" class="img-mask" src=""/><img id="img-mask-inside" class="img-mask-inside" src=""/>');
			}	
			
			jQuery('#img-mask-inside').load(function(){
				jQuery('#img-mask-inside').width(mask_size);
				jQuery('#img-mask-inside').css({top: mask_top + 'px'});
				jQuery('#img-mask-inside').css({left: mask_left + 'px'});
				
				jQuery('#img-mask').attr({'src': result_arr[img_handle].ImgMask});
				jQuery('#img-mask').width(mask_size);
				jQuery('#img-mask').css({top: mask_top + 'px'});
				jQuery('#img-mask').css({left: mask_left + 'px'});
			}).attr({'src': result_arr[img_handle].ImgMaskInside});
		}
	});
	
	jQuery('.img-cover-mask').click();
</script>
<script type="text/javascript">
	{scriptPlaceHolder}
	{scriptFunctionPlaceHolder}	
</script>