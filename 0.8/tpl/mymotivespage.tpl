<meta name="DC.Title" content="{blogName} - {metaTag}" />
<div class="myproduct-container">
	<div class="myproduct-header">
		<div class="myproduct-header-above">
			<input type="hidden" value="{transEditDetails}" class="transEditDetails">
			<div class="add-motive-button">{AddNewMotive}</div>
			<div class="myproduct-header-search-button"><img alt="search" src="{pluginUrl}css/img/icon/search-white.png" width="21px" height="21px"></div>
			<div class="mymotive-header-search">
				<div class="search-icon-input">
					<span class="ad-search-chose-text">Home</span><span class="ad-search-chose-close" title="Close advanced search option">x</span>
				</div>
				<div class="search-input-box"><input type="text" placeholder="Search"></div>
				<div class="clear-search-button" title="Clear search"></div>
				<div class="dropdown-search-button" title="Advanced search options"></div>
			</div>
		</div>
		<div class="myproduct-header-below">
			<div class="myproduct-header-sort">
				<select><option>Sort</option></select>
			</div>
			<div class="search-result-total" style="display:{display}">
				<span class="search-result-total-val">{pagePerTotal}</span>				
				<span class="search-result-total-txt">{transPage}</span>				
			</div>
			<div class="paginator-element" style="display:{display}">
				{paginator}
			</div>
		</div>
	</div>
	<div class="myproduct-header-content">
		{contentHtml}
	</div>
	<div class="myproduct-header">		
		<div class="myproduct-header-below">
			<div class="myproduct-header-sort">
				
			</div>
			<div class="search-result-total" style="display:{display}">
				<span class="search-result-total-val">{pagePerTotal}</span>				
				<span class="search-result-total-txt">{transPage}</span>
			</div>
			<div class="paginator-element" style="display:{display}">
				{paginator}
			</div>
		</div>
	</div>
</div>
<div class="myproduct-hover-popup" style="height:1px;overflow:hidden">	
	<div class="hover-popup-center">
		<div class="popup-center-container">
			<input type="hidden" value="" class="current-motive-id">
			<div class="popup-center-title"><span><b>{edit} - {motiv}</b></span> - <span class="motive-info-id"></span> <span class="popup-center-close-button"></span><span class="popup-center-language"><select class="moitf-language-select">{htmlLanguage}</select></span></div>						
			<div class="popup-center-details">
				<div class="center-details-des">
					<div class="center-details-des-pics">
						<div class="des-pics-main"><img height="100px" width="100px" src="http://s3.amazonaws.com/c80a405e90da11e09b7993104924019b/Articles/ad782b8d93624de888a71d1411fad50f/Images/c6e57271cdb14ec58d4bae611d329a40.thumb.image"></div>
						<div class="des-pics-seco"><img height="30px" width="30px" src="http://s3.amazonaws.com/c80a405e90da11e09b7993104924019b/Articles/ad782b8d93624de888a71d1411fad50f/Images/c6e57271cdb14ec58d4bae611d329a40.thumb.image"></div>
						<div class="des-pics-seco"><img height="30px" width="30px" src="http://s3.amazonaws.com/c80a405e90da11e09b7993104924019b/Articles/ad782b8d93624de888a71d1411fad50f/Images/c6e57271cdb14ec58d4bae611d329a40.thumb.image"></div>
						<div class="des-pics-seco"><img height="30px" width="30px" src="http://s3.amazonaws.com/c80a405e90da11e09b7993104924019b/Articles/ad782b8d93624de888a71d1411fad50f/Images/c6e57271cdb14ec58d4bae611d329a40.thumb.image"></div>
					</div>
					<div class="center-details-des-name"><input type="text" placeholder="{transAddName}"></div>
					<div class="center-details-des-des"><textarea placeholder="{transAddDescription}"></textarea></div>
					<div class="center-details-addkeyword-input"><input type="text" class="addkeyword-input" placeholder="{transAddKeywords}"></div>
					<div class="center-details-addkeyword">{transAdd}</div>
					<div class="center-details-addcat">{transAddCategories}</div>						
					<div class="center-details-keywords">...</div>
					<div class="center-details-category">...</div>
					<div class="center-details-content-container">
						<div class="center-details-content-label">{transContent}</div>
						<div class="content-dropdown-container" id="center-details-content-container">
							<div class="content-dropdown-text" id="content-dropdown-text">...</div>
							<div class="content-dropdown-arrow" id="content-dropdown-arrow"></div>							
						</div>	
						<div class="popup-content-container">							
						<div class="popup-share-box">
							{motifAgeRatingHtml}														
						</div>	
					</div>
					</div>		
					<div class="center-details-motive-condition">
						<div>{transMotiveCanBeEditedByOtherUsers}</div>
						<div><input class="motive-condition-checkbox" type="checkbox" checked="checked"></div>
						<div>Yes</div>
					</div>	
				</div>				
				<div class="center-details-share-container">
					<div class="thumb-info-details">
						<div class="thumb-info-details-left">
							<div><span>{transCreator}:</span> <span>Skydesgin</span></div>
							<div><span>{transType}:</span> <span>JPG</span></div>
							<div><span>{transTransparentBG}:</span> <span>yes</span></div>
						</div>
						<div class="thumb-info-details-right">
							<div><span>{transLevel}:</span> <span>Titanium</span></div>
							<div><span>{transFormat}:</span> <span>3000 x 8000 pixel</span></div>							
						</div>
					</div>	
					<div class="center-details-content-container">
						<div class="center-details-content-label">{transShare}</div>
						<div class="content-dropdown-container" id="center-details-share-container">
							<div class="content-dropdown-text" id="share-dropdown-text">...</div>
							<div class="content-dropdown-arrow" id="share-dropdown-arrow"></div>							
						</div>	
						<div class="popup-share-container">							
							<div class="popup-share-box">
								{motifSharingHtml}						
							</div>	
						</div>
					</div>													
				</div>
				<div class="center-details-prices-container">
					<div class="center-details-prices-container-ele">
						<div class="center-details-prices-label">{transMotivePrice}:</div>
						<div class="center-details-prices-value"><span><input type="text" value="20000" class="motive-price-value"></span> VND</div>
					</div>
					<div class="center-details-prices-container-ele"> 
						<div class="center-details-prices-label"><span>{transYourCurrentCommissions}: (Titanium) 60,0%</span></div>
						<div class="current-commision-value">6.000 VND</div>
					</div>
				</div>
				<div class="center-details-status-container">
					<div class="center-details-status-label">{transStatus}</div>
					<div class="center-details-status-select">{motifEvaluationHtml}</div>
					<div class="center-details-status-term">{transIUnderstandAcceptTC}</div>
					<div class="center-details-status-checkbox"><input type="checkbox" checked="checked"></div>
				</div>
				<div class="center-details-button-container">
					<div class="center-details-delete">{transDelete}</div>
					<div class="center-details-button popup-save-button">{transSave}</div>
					<div class="center-details-button popup-cancel-button">{transCancel}</div>					
				</div>
			</div>
		</div>		
	</div>
	
	<div class="popup-add-category">
		<div class="popup-add-category-ele-container">
			{addCategoriesHtml}			
		</div>
		<div class="add-category-bottom">
			<div class="add-category-button">
				{transAdd}
			</div>
		</div>
	</div>
	
</div>
<script type="text/javascript">{scriptPlaceHolder}</script>