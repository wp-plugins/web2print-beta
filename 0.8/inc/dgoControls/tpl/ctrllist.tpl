<script type="text/javascript">
	{scriptplaceholder}
</script>

<div id="{contentItemsListPlaceholderId}" SortCriteria="Newest">
	<div id="{templatesPlaceHolderId}" style="display: none;">
		<div class="dgo-db-page" id="PreviewContainerTemplate">
			<div class="dgo-db-page-control" style="display: none">
				<button id="dgo-db-page-removeBtn" class="ui-state-default ui-corner-all dgo-ui-button-small dgo-ui-button-icon-solo" title="Löschen">
					<span class="dgo-ui-icon-i dgo-ui-icon-remove">Löschen</span>
				</button>
			</div>
			<div class="dgo-db-page-holder">
				<input type="hidden" class="dgo-db-page-id" /> 
					<a class="dgo-db-page-link"> <img class="dgo-db-page-image"	style="display: none" /> </a>
			</div>
			<div class="dgo-db-page-label"></div>
			<div class="dgo-db-page-rating">
				<div class="statVal">
					<span class="ui-rater">
						<span class="ui-rater-starsOff" style="width: 100px;">
							<span class="ui-rater-starsOn"></span> 
						</span>
						<span class="ui-rater-rating"></span>
						&#160;(<span class="ui-rater-rateCount"></span>) 
					</span>
				</div>
			</div>
		</div>

	</div>
	<div id="PagerOptionsHolder" style="display: none">
		<span>Sortieren nach: </span> 
		<select id="SortCriteria">
			<option value="Newest">Neueste zuerst</option>
			<option value="Oldest">Älteste zuerst</option>
			<option value="TopViewed">Am häufigsten angesehen</option>
			<option value="TopRated">Beste Bewertung</option>
			<option value="Random">Zufallsauswahl</option>
		</select> 
		<select id="ItemsPerPage">
			<option value="12">12 Ergebnisse</option>
			<option value="24">24 Ergebnisse</option>
			<option value="48">48 Ergebnisse</option>
			<option value="96">96 Ergebnisse</option>
		</select> 
		<select id="ThumbSize">
			<option value="Small">Kleine Vorschau</option>
			<option value="Medium">Mittlere Vorschau</option>
			<option value="Large">Große Vorschau</option>
		</select> 
		<select id="DetailLevel">
			<option value="0">Keine Details</option>
			<option value="1">Wenige Details</option>
			<option value="2">Viele Details</option>
		</select>
	</div>
	<span class="pager-number-results"></span>
	<span id="PagerInfoHolder" style="display: none"></span>
	<div id="PagerHolder" class="pager" style="display: none"></div>
	<div id="ImageHolder" style="display: block;"></div>
	<span class="pager-number-results"></span>
	<span id="PagerInfoHolder" style="display: none"></span>
	<div id="PagerHolder" class="pager" style="display: none"></div>
</div>