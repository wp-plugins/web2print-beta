<script type="text/javascript">
	{scriptPlaceHolder}
</script>
<meta name="DC.Title" content="{blogName} - {metaTag}" />
<div class="prod-detail-container">
	<div class="prod-detail-part-1">
		<div class="prod-detail-part-1-top" style="display: none;">
			<a href="#">Keyword / Product Group / Product</a>
		</div>
		<div class="prod-detail-part-1-leftside">
			<div class="prod-detail-part-1-leftside-content">
				<div class="showing-image">
					<div class="left-narrow"></div>
					<div class="right-narrow"></div>
					<div id="div-loader">
						<a href="" id="loader" class="loading" rel='prettyPhoto'></a>
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
			<div class="prod-detail-part-1-leftside-shadow">				
			</div>
		</div>
		<div class="prod-detail-part-1-rightside">
			<div class="prod-detail-part-1-rightside-name-description">				
				<input type="hidden" id="article-identifier">
				<input type="hidden" id="material-key">
				<div class="prod-detail-part-1-rightside-name">
					{transLoading}
				</div>
				<div class="prod-detail-part-1-rightside-description">
					{transLoading}				
				</div>

			</div>
			<div class="prod-detail-part-1-rightside-price">
				<div class="price-start-container">
					<div class="prod-detail-part-1-rightside-top">
						<div class="prod-detail-part-1-rightside-amount">
							<input type="hidden" id="amount-run-type" value="">
							<!-- select class="prod-details-amount-dropdown">
								<option>1</option>						
							</select-->
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
							<div class="price-start-value">{imgLoadingSmall}</div>											
							<input type="hidden" id="price-start-value" value="">
							<div style="float:left;width:20%">
								<select class="prod-details-currency-dropdown">
									<option>EUR</option>						
								</select>
							</div>
						</div>
					</div>
					
				</div>
				<div class="end-user-price-note"><span>* {transEndUserPriceFormat}</span></div>
				<div class="prod-detail-part-1-rightside-bottom article-group-container" style="display:none">
					<div class="rightside-middle-label">Article Groups</div>
					<input type="hidden" id="article-group-id">
					<div class="rightside-middle-size article-group-content">
						Loading...	
					</div>
				</div>				
				<div class="prod-detail-part-1-rightside-bottom article-subtype" style="display:none">
					<div class="rightside-middle-label">Subtypes</div>
					<input type="hidden" id="article-matchcode">
					<div class="rightside-middle-size subtypes-content">
						Loading...					
					</div>
				</div>
				<div class="prod-detail-part-1-rightside-middle" style="display:none">
					<div class="rightside-middle-label">Available Colors</div>
					<div class="rightside-middle-content">
						<div class="rightside-middle-content-block content-block-selected">
							<img src="{pluginUrl}/css/img/icon/swatch_152_c60.gif">
						</div>
						<div class="rightside-middle-content-block">
							<img src="{pluginUrl}/css/img/icon/swatch_darktshirt_black.gif">
						</div>
						<div class="rightside-middle-content-block">
							<img src="{pluginUrl}/css/img/icon/swatch_darktshirt_cardinal.gif">
						</div>
						<div class="rightside-middle-content-block">
							<img src="{pluginUrl}/css/img/icon/swatch_darktshirt_royal.gif">
						</div>
						<div class="rightside-middle-content-block">
							<img src="{pluginUrl}/css/img/icon/swatch_darktshirt_red.gif">
						</div>						
						<div class="rightside-middle-content-block">
							<img src="{pluginUrl}/css/img/icon/swatch_darktshirt_charcoal.gif">
						</div>
					</div>
				</div>
				<div class="prod-detail-part-1-rightside-bottom">
					<div class="rightside-middle-label">Available Sizes</div>
					<input type="hidden" id="article-size">
					<div class="rightside-middle-size available-size">
						Loading...	
					</div>
				</div>
				
			</div>
			
			<form action="{pluginUrl}inc/ajax/redirectShop.php" method="post" id="designSelectSubmitForm">
				<input type="hidden" name="prices_import" value="" id="prices-import">
				<input type="hidden" name="shopcart_permalink" value="/shopping-cart" class="shopcart-link-hidden">
			</form>
			
			<div class="prod-detail-part-1-rightside-footer">
				<div class="prod-details-add-cart-button is-bottons">
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
							<iframe src="//www.facebook.com/plugins/like.php?href=http://wp.dev.delivergo.com%2Fpage%2Fto%2Flike&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;height=35" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:20px; height:35px;" allowTransparency="true"></iframe>
							</div>
							<div class="myfb"></div>
						</div>
						<div class="trust-pinit"><a href="http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fwp.dev.delivergo.com%2Ffoto_poster&media=http%3A%2F%2Fd3io1k5o0zdpqr.cloudfront.net%2Fimages%2Fpinit.png" class="pin-it-button" count-layout="none">Pin It</a>
						<script type="text/javascript" src="http://assets.pinterest.com/js/pinit.js"></script></div>
						<!-- div class="tell-a-friend">{Tellafriends}</div-->
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
   							 // Animation complete.
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
</div>
