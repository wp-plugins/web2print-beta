<script type="text/javascript">
	{scriptPlaceHolder}
</script><meta name="DC.Title" content="{blogName} - {metaTag}" />
<div class='address-book-container'>
	<input class='dgo-page-name' type='hidden' value='addressBook' />
	<input id='trans-edit-button' type='hidden' value='{trans-edit-button}' />
	<input id='trans-delete-button' type='hidden' value='{trans-delete-button}' />
	<input id='trans-upload-avatar' type='hidden' value='{transUploadAvatar}' />
	<input id='transYouDontHave' type='hidden' value='{transYouDontHave}' />
	<input id='transNote' type='hidden' value='{transNote}' />
	<input id='transEmail' type='hidden' value='{transEmail}' />
	<input id='transPhone' type='hidden' value='{transPhone}' />
	<input id='transFirstName' type='hidden' value='{transFirstName}' />
	<input id='transLastName' type='hidden' value='{transLastName}' />
	<div id="address-book-container">
		<div id="address-search-sort">
			<div id="address-search">
				<input type="text" id="searchValue" name="searchValue" class="search">
				<div id="searchButton"><span>{transSearch}</span></div>
			</div>
			<div id="address-sort">
				<select id="sortValue">
					<option value="first-name">{transFirstName}</option>
					<option value="last-name">{transLastName}</option>
					<option value="company">{transCompany}</option>
					<option value="city">{transCity}</option>
				</select>
			</div>
		</div>
		
		<div class="import">			<!-- 
			{btnImportGoogle} 			-->
			{btnImportLinkedin}
			<div type="button" id="newAddress" class="newAddress is-bottons">{transAddNewAddress}</div>
		</div>
		
		<div id="header-field">
			<div class="img-field">&nbsp;</div>
			<div class="name-field"><b>{transName}</b></div>
			<div class="address-field"><b>{transAddress}</b></div>
			<div class="contact-field"><b>{transContact}</b></div>
			<div class="button-field">&nbsp;</div>
		</div>
		<div id="all-contact-field">
			
		</div>
		<div class="import">
			<!--{btnImportGoogle}-->
			{btnImportLinkedin}			<div type="button" id="newAddress" class="newAddress is-bottons">{transAddNewAddress}</div>
			<!--input type="button" id="newAddress" class="newAddress  is-bottons" value='{transAddNewAddress}'-->
		</div>		
	</div>
</div>	