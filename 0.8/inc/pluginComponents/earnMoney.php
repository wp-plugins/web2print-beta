
<div class="addnewaddressForm">
	<input class="translate-title" type="hidden" value="<?php _e('AddNewAddress', $l10n_prefix); ?>"/>
	<form id="formIDAddress" method="post" action="">
	<div class="add-new-address-content">
			<div class="address-info-row add-info-name">
				<div class="address-label"><span><b><?php _e('Name', $l10n_prefix); ?>:</b></span></div>
				<div class="address-input address-name-last ">
					<div><input type="text" name="lastname" id="surname" /><div class="address-check"></div></div>
				</div>			
				<div class="address-input address-name-first ">
					<div style="display:none">
						<input type="text" name="name" id="testname" /><div class="address-check"></div>
					</div>
					<div>
						<input type="text" name="firstname" id="forename"/><div class="address-check"></div>
					</div>
				</div>
				<div style="display:none">
					<input type="text" name="name" id="forename" /><div class="address-check"></div>
				</div>
				<div class="address-name-content">
					<div class="gender-div">
						<select class="GenderSel" id="sexual">
							<option class='sexual' name='male' value='Male' selected='selected'><?php _e('Mr', $l10n_prefix); ?></option>
							<option class='sexual' name="female" value='Female'><?php _e('Mrs', $l10n_prefix); ?></option>
							<option class='sexual' name='neutral' value='Neutral'><?php _e('Neutral', $l10n_prefix); ?></option>
						</select>
					</div>				
				</div>
			</div>
			<div class="address-info-row add-info-company"><div class="address-label"><span><?php _e('Company', $l10n_prefix); ?>:</span></div><div class="address-input "><div><input type="text" value="" name="company" id="company"/></div></div></div>
			<div class="address-info-row add-info-street"><div class="address-label"><span><b><?php _e('Street', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-street "><div><input type="text" value="" name="street" id="street"/><div class="address-check"></div></div></div></div>				
			<div class="address-info-row add-info-city"><div class="address-label"><span><b><?php _e('City', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-city "><div><input type="text" value="" name="city" id="city"/><div class="address-check"></div></div></div></div>				
			<div class="address-info-row add-info-zip"><div class="address-label"><span><b><?php _e('Zip', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-zip "><div><input type="text" value="" name="zipcode" id="zipcode"/><div class="address-check"></div></div></div></div>
			<div class="address-info-row add-info-country"><div class="address-label"><span><b><?php _e('Country', $l10n_prefix); ?>:</b></span></div><div class="address-input "><div><div class="add-info-country country-dropdown-dialog"></div><div class="add-info-country-dropdown" style="display:none"><input type="hidden" class="add-info-country-dropdown-selected" value=""></div></div></div></div>
			<div class="address-info-row add-info-phone"><div class="address-label"><span><?php _e('Phone', $l10n_prefix); ?>:</span></div><div class="address-input address-name-phone "><div><input type="text" value="" name="phone" id="phone"/><div class="address-check"></div></div></div></div>				
			<div class="address-info-row add-info-email"><div class="address-label"><span><b><?php _e('Email', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-email "><div><input type="text" name="email" value="" id="email"/><div class="address-check" id='email-exist-status'></div></div></div></div>				
			<div class="address-info-row add-info-offers"><input type="checkbox" value=""/> <span><?php _e('SendMeOffer', $l10n_prefix); ?></span></div>
			<div class="address-info-row add-info-note"><div class="address-label"><span><?php _e('Note', $l10n_prefix); ?>:</span></div><div class="textarea-div address-name-note"><textarea name="addInfoNote" id="addressNote" name="note" ></textarea></div></div><br>
			<div class="address-info-row add-info-note-message" style="display:none"><div class="address-label"><span>&nbsp;</span></div><div class="address-note-content-message"></div></div>
			<div class="addressFooter is-bottons" id="BtnDone"><span><?php _e('Save', $l10n_prefix); ?></span></div>
		</div>
	</form>
</div>

<div class="dgo-dialog-form-cover">
	<div id='earn-money-add-resales-unit-form'>
		<div class='add-resales-unit-form-header'><?php _e('PlsFillTheForm', $l10n_prefix);?>.</div>
		<div class='add-resales-unit-form-header-block'>
			<div class='add-resales-unit-form-label'><?php _e('Name', $l10n_prefix);?>: </div>
			<div class='add-resales-unit-form-input'><input type='text' name='shopname' id='shopname'></div>
		</div>
		<div class='add-resales-unit-form-header-block'>
			<div class='add-resales-unit-form-label'><?php _e('Description', $l10n_prefix);?>: </div>
			<div class='add-resales-unit-form-data'><textarea type='text' name='shopdescription' id='shopdescription'></textarea></div>
		</div>
		<div class='add-resales-unit-form-header-block'>		
			<div class='is-bottons add-resales-unit-form-button'><?php _e('Create', $l10n_prefix);?></div>
		</div>
	</div>

 <!-- Provision Form -->
    <div class="large-chart-statistic">
    	<div id="large-chart-statistic-content"></div>
    	<div class="large-chart-statistic-footer">
    		<div class="large-chart-statistic-footer-calendar">
	    		<span class="dialog-earn-money-calendar-area"></span>				
			</div>
			
			<div class="large-chart-statistic-footer-selectbox">
				<select id='dialog-earn-money-tab-3-select-period'>
					<option value='last-7-days'>Last 7 days</option>
					<option value='this-month'>This month</option>
					<option value='last-month'>Last month</option>
					<option value='last-year'>LastYear</option>
					<option value='whole'>Whole</option>
					<option value='flexible'>Flexible dates</option>
				</select>
			</div>
			<div class="large-chart-statistic-footer-button-left">
				<div class="dialog-statistic-button-refesh"><?php _e('Refresh', $l10n_prefix);?></div>
			</div>			
			<div class="large-chart-statistic-footer-button-right">
				<div class="dialog-statistic-button-close"><?php _e('Close', $l10n_prefix);?></div>
			</div>
    	</div>
    </div>
    
    <!-- hidden input for translation -->
	<input type="hidden" id="trans-add-now" value="<?php _e('AddNow', $l10n_prefix); ?>">
	<input type="hidden" id="trans-save-now" value="<?php _e('Save', $l10n_prefix); ?>">
	<!-- end hidden input for translation -->
    
</div>