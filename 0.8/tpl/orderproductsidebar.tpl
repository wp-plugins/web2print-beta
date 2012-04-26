<style type="text/css">
	.order-product-main{
		background: -moz-linear-gradient(top, #{color1},#{color12});
		background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#{color1}), to(#{color12}));
		filter:  progid:DXImageTransform.Microsoft.gradient(startColorStr='#{color1}', EndColorStr='#{color12}');
		-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#{color1}', EndColorStr='#{color12}')";
	}
	
	.order-product-content, .order-product-type, .order-product-material,.color-box-info-text span{color: #{color2};}
	.order-product-title{color: #{color3};}
	.order-product-main-container,.order-product-header, .order-product-settings{border-color: #{color5};}
	.order-product-content-child-selected{background-color: #{color6};}
	.multiSelectUploadButton-container{
		background: -moz-linear-gradient(top,  #{color7},  #{color11});
		background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#{color7}), to(#{color11}));
		color:#{color3};
		text-shadow:{text_shadow};
	}
	.order-product-main-container,.order-product-content{
		border-color: #{color5};
	}
	.multiSelectUploadButton-container{
		border-color:#{color8};
	}
	.order-product-title{
	    background: -moz-linear-gradient(top, #{color4},#{color10}  );
		background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#{color4}), to(#{color10}));
		filter:  progid:DXImageTransform.Microsoft.gradient(startColorStr='#{color4}', EndColorStr='#{color10}');
		-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#{color4}', EndColorStr='#{color10}')";
		behavior: url(border-radius.htc);
		text-shadow:{text_header_shadow};
		border-color:#{color5};
	}
	.order-product-main-container,.multiSelectUploadButton-container,.order-product-main,#multiSelectUploadButton,#uploadify-wrapper{
		-moz-border-radius: {radius}px;
		border-radius: {radius}px;
		-webkit-border-radius: {radius}px;
		behavior: url(border-radius.htc);
	}
	#uploadify-wrapper{
		filter:  progid:DXImageTransform.Microsoft.gradient(startColorStr='#{color7}', EndColorStr='#{color11}');
		-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#{color7}', EndColorStr='#{color11}')";
	}
	.order-product-title{
		-moz-border-radius: {radius}px {radius}px 0px 0px;
		border-radius: {radius}px {radius}px 0px 0px;
		-webkit-border-radius: {radius}px {radius}px 0px 0px;
		behavior: url(border-radius.htc);
	}
	.order-product-title span{
		color: #{color9};}
	}
</style>

<div class="order-product-main-container">	
	<div class="order-product-main-block">
	
	</div>
	<div class="order-product-main">                               
	    <div class="order-product-title">
	        <span>{transOrderProduct}</span>    
	    </div>	    
	    <div class="order-product-settings" style="display: {header_display}">
	        	<div class="language-container" title="Language">
	            	<div id="lanSelect" class="lanSelect">
	            		<div class='dropdown-item-select-lan'>
		            		<div class='dropdown-img-select'>{linkToFlagLang}</div>		            		
		            		<div class='dropdown-lan-select'>{curLangName}</div>
		            		<div class='dropdown-select-arrow'></div>
	            		</div>
	            	</div>	            	
		        </div>
	           
	            <div class="currency-container" title="Currency">
	            	<div id="curSelect" class="curSelect">
	            		<div class='dropdown-item-select-cur'>
		            		<div class='dropdown-img-select'>{linkToFlagCurr}</div>		            		
		            		<div class='dropdown-curr-select'>{curCurrName}</div>
		            		<div class='dropdown-select-arrow'></div>
	            		</div>
	            	</div>	            	
		        </div>
	           
	            <div class="dimension-container" title="Dimension">           	
	            	<div id="dimSelect" class="dimSelect">
	            		<div class='dropdown-item-select-dim'>
	            			<div class='dropdown-img-select-dim'><img src="{linkToIcon}css/img/icon/dimension_icon.gif"></div>
		            		<div class='dropdown-dime-select'>{curDime}</div>			            		
	            		</div>
	            	</div>	            	
				</div>				
	    </div>    	
	    <div class="order-product-type">
	        <span>{transArticle}</span><br />
	       	<div id="article-select" onclick="megaArticleShow()">
	       		<input class="article-select-input" autocomplete="off" type="hidden" value="" />
	       		<input class="article-identifier-input" autocomplete="off" type="hidden" value="" />
	       		<input id="transArticle" autocomplete="off" type="hidden" value="{transArticle}" />
	       		<input id="transMaterials" autocomplete="off" type="hidden" value="{transMaterials}" />
	       		<input id="transStyles" autocomplete="off" type="hidden" value="{transStyles}" />       		
	       		<input id="transLoadings" autocomplete="off" type="hidden" value="{transLoading}" />       		
	            <div class="article-select-label"></div>
	           	<div class="article-select-icon"></div>           
	        </div>                
	    </div>
	    
	    <div id="material-select-div" class="order-product-material">
	        <span>{transMaterials}</span><br>
	        <select style="display: none" id="materialSel" onchange="priceChange();">	          
	        </select>
	        <div id="material-select" onclick="materialMegaChange()">
	        	<input type="hidden" id="material-key" value="" />
	        	<div class="material-select-label"></div>
	        	<div class="material-select-icon"></div>			
	        </div>	       
	    </div>
	    
	    <div style="display: none" id="style-select-div" class="order-product-material">
	        <span>{transStyles}</span><br />
	         <div id="style-select" onclick="styleMegaChange()">
	        	<div class="style-select-label"></div>
	        	<div class="material-select-icon"></div>		
	        </div>	      
	    </div>   
	    
	    <div class="order-product-content">
	        <div class="order-product-subcontent">	            
	            <div class="loading-prices-text" style="text-align: center;"><span>{loading}</span><br><span>{transLoading}...</span></div>
	        </div>
	        <div class="end-user-price-note-slider"><span>{transEndUserPriceFormat}</span></div>
	    </div>
	    
	    <div class="btOrderDiv" align="center" style="padding-bottom: 10px; font-size: 20px; line-height: 55px;">
			<div class="multiSelectUploadButton-container">
				<div id="uploadify-wrapper">
			        <input style="display: none" id="uploadify" type="file" name="file_upload" multiple=""/>    
			        <span id="dgo-bt-text">{transUploadPicture}</span> 
		        </div>
			</div>
	    </div>
	</div>
</div>	
<script type="text/javascript">
	{scriptPlaceHolder}
</script>
{dgouploadtemplate}