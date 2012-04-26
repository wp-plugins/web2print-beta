<script type="text/javascript">
	{scriptPlaceHolder}
</script>
<meta name="DC.Title" content="{blogName} - {metaTag}" />
<input type="hidden" id='trans-account-details' value='{transAccountDetails}'>
<input type="hidden" id='trans-status' value='{transStatus}'>
<input type="hidden" id='trans-main-address' value='{transMainAddress}'>
<input type="hidden" id='trans-contact' value='{transContact}'>
<input type="hidden" id='trans-account-connection' value='{transAccountConnection}'>
<input type="hidden" id='trans-settings' value='{transSettings}'>
<input type="hidden" id='trans-change-password' value='{transChangePassword}'>
<input type="hidden" id='trans-add-connection' value='{transAddAConnection}'>
<input type="hidden" id='trans-we-love' value='{transWeLoveFeedback}'>
<input type="hidden" id='trans-you-dont-have-connection' value='{transDontHaveConnection}'>
<input type="hidden" id='trans-are-you-sure' value='{transAreYouSure}'>
<input type="hidden" id='trans-click-here-to-add-text' value='{transClickHereToAddText}'>
<input type="hidden" id='trans-via' value='{transVia}'>
<div class='account-details-container'>
	<input class='dgo-page-name' type='hidden' value='accountDetails' />
	<div class='account-details-main-address'>
		<div class='account-details-main-address-head'></div>
		<div class='account-details-main-address-head-content'>
			<div class='address-loading-image'>{accountdetails}</div>
		</div>
		<div class='account-details-below '>
			<div id='account-details-tabs'>
				<ul class='ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'>
					<li class='ui-state-default ui-corner-top ui-tabs-selected ui-state-active'><a href='#account-details-tabs-1'>{transAccounts}</a></li>
					<!-- li class='ui-state-default ui-corner-top'><a href='#account-details-tabs-2'>{transPaymentDetails}</a></li>
					<li class='ui-state-default ui-corner-top'><a href='#account-details-tabs-3'>{transSettings}</a></li-->
				</ul>
			<div class='ui-tabs-panel ui-widget-content ui-corner-bottom' id='account-details-tabs-1'>				
				loading...
			</div>
			<!-- div class='ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide' id='account-details-tabs-2'>
				<div class='account-details-payment-head'>{transPaymentDetails}</div>
				<div class='account-details-payment-type'>
					<div class='account-details-payment-img'>{imgPayment}</div>
					<div class='account-details-payment-contact'>Direct Debit<br>{transAccounts}: ******25<br>Valid to:<br>{transName}: Name, Surname</div>
					<div class='is-bottons account-details-payment-button'>{transDelete}</div>
					<div class='is-bottons account-details-payment-button'>{transEdit}</div>
				</div>
				<div class='account-details-payment-bottom'>
					<div class='is-bottons account-details-payment-button new-payment-button'>{transNewPaymentMethod}</div>
				</div>
			</div>
			<div class='ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide' id='account-details-tabs-3'>
				<div class='account-details-settings'>
					<div class='account-details-settings-cell'>&nbsp;</div>
					<div class='account-details-settings-cell'><input type='checkbox' class='input-check-box'></div>
					<div class='account-details-settings-cell'>
						<select class='account-details-settings-options-select'>
							<option>EUR</option>
							<option>USD</option>
							<option>VND</option>
						</select>
					</div> 
					<div class='account-details-settings-cell'>
						<select class='account-details-settings-options-select'>
							<option>EN</option>
							<option>DE</option>
							<option>VI</option>
						</select>
					</div>
					<div class='account-details-settings-cell'>
						<input type='checkbox' class='input-check-box'>
					</div>
					<div class='account-details-settings-cell'>
						<select class='account-details-settings-options-select'>
							<option>50</option>
							<option>100</option>
							<option>150</option>
						</select>
					</div>
				</div>
				<div class='account-details-settings-setting'>
					<div class='account-details-settings-setting-cell'>
						<strong>{transSettings}</strong>
					</div>
					<div class='account-details-settings-setting-cell'>{transNewsLetter}</div>
					<div class='account-details-settings-setting-cell'>{transCurrency}</div>
					<div class='account-details-settings-setting-cell'>{transLanguage}</div>
					<div class='account-details-settings-setting-cell'>{transAddress}</div>
					<div class='account-details-settings-setting-cell'>{transJobsPerPage}</div>
				</div>
				<div class='account-details-settings-description'>
					<div class='account-details-settings-description-cell'><strong>{transDescription}</strong></div>
					<div class='account-details-settings-description-cell'>{transGetTheNewestInfomation}</div>
					<div class='account-details-settings-description-cell'>{transChooseYourPreferedLanguage}</div>
					<div class='account-details-settings-description-cell'>{transChooseYourPreferedCurrency}</div>
					<div class='account-details-settings-description-cell'>{transChooseYourPreferedAddress}</div>
					<div class='account-details-settings-description-cell'>{transHowManyJobs}</div>
				</div>
				<div class='account-details-connection-bottom'>
					<div style='margin-top: 10px;'>{transSomethingIsMissing} ? {transWeLoveFeedback} </div>
					<div class='account-details-connection-bottom-divide'>{transWeLoveFeedback}</div>
					<div class='is-bottons account-details-connection-bottom-add'>{transDelete}</div>
				</div>
			</div-->
		</div>
	</div>
	</div>
</div>