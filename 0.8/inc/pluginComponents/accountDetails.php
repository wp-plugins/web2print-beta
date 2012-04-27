<div class="dgo-dialog-form-cover">
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

<!-- Change Password dialog-->
<div class="changePassForm">
	
	<div class="add-new-address-content">
		<form id="formChangePass" method="post" action="">
		<div class="address-info-row " align="center"><div class="address-label" ><span><?php _e('PlsTypeAllofFieldsBelowToChangeYourPass', $l10n_prefix);?></span></div></div><br>
		<div class="address-info-row "><div class="address-label"><span><b><?php _e('OldPass', $l10n_prefix);?>:</b></span></div><div class="address-input address-input-uncheck"><div><input type="password" class="validate[required,minSize[6]]" value="" id="oldPassword"/></div></div></div>
		<br><br><div class="address-info-row "><div class="address-label"><span><b><?php _e('NewPass', $l10n_prefix);?>:</b></span></div><div class="address-input address-input-general"><div><input type="password" class="validate[required,minSize[6]]" value="" id="newPassword"/><div class="address-check"></div></div></div></div>
		<br><br><div class="address-info-row "><div class="address-label"><span><b><?php _e('PassConfirm', $l10n_prefix);?>:</b></span></div><div class="address-input address-input-general"><div><input type="password" class="validate[required,minSize[6],equals[newPassword]]" value="" id="newPassConfirm"/><div class="address-check"></div></div></div></div>		
		<div class="addressFooter is-bottons" id="BtnChange"><span><?php _e('Change', $l10n_prefix);?></span></div>
		</form>
	</div>
	
</div>

<!-- Setting a connection-->
<div class='setting-account-connection'>
	<div class='setting-account-connection-select-provider'>
		<span class='add-account-connection-label'><?php _e('LoginProvider', $l10n_prefix);?></span>
		<span>
			<input type="text" readonly="readonly" name="setting-select-login-provider" id='setting-select-login-provider' value="">			
		</span>
		<span><input type="hidden" name="setting-select-login-provider-old" id='setting-select-login-provider-old' value=""></span>
	</div>
	<div class='setting-account-connection-login-name'>
		<span class='add-account-connection-label'><?php _e('YourLoginName', $l10n_prefix);?></span>
		<span><input type="text" readonly="readonly" name="setting-connection-login-name" id='setting-connection-login-name'></span>
		<span><input type="hidden" name="setting-connection-login-name-old" id='setting-connection-login-name-old' value=""></span>
	</div>
	<div class='setting-account-connection-button'>
		<span><div class='is-bottons setting-connection-button' name="connection-setting-delete-button" id='connection-setting-delete-button'><?php _e('DeleteConnection', $l10n_prefix);?></div></span>		
	</div>
</div>

<!-- add more login provider-->
<div id="add-more-login-provider">
	<div class="add-more-login-provider-LoginForm">		
		<div class="add-more-login-provider-ContentDiv">			
			<span><?php _e('DoYouHaveAnAccountHereAlready', $l10n_prefix);?>?</span><br /><br />				
			<form method="post" action="" name="frmVT" id="frmVT">				
				<div class="add-more-login-provider-imgLogin">					
					<!--<a href="javascript: void(0);"><img src="<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/facebook.png" alt="Facebook" onclick="openWindow('facebook','addLoginProvider');"/></a>-->						
					<a href="javascript: void(0);"><img src="<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/yahoo.png" alt="Yahoo" onclick="openWindow('yahoo','addLoginProvider');"/></a><br/>						
					<a href="javascript: void(0);"><img src="<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/google.png" alt="Google" onclick="openWindow('google','addLoginProvider');"/></a>						
					<!--<a href="javascript: void(0);"><img src="<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/aol.png" alt="AOL"/></a>--><br/>					
					<a href="javascript: void(0);"><img src="<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/twitter.png" alt="Twitter" onclick="openWindow('twitter','addLoginProvider');"/></a>						
					<!--<a href="javascript: void(0);"><img src="<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/msn.png" alt="FlickR"/></a><br/>	--></br/>					
				</div><!--End div image login -->
				
				<div class="hidden">					
					<input type="hidden" name="mode" value="redirect" />						
					<input type="hidden" name="type" id="type" value="" />					
				</div>				
			</form>			
		</div><!-- End left content div -->		
	</div><!-- End right login div -->
</div>
</div>