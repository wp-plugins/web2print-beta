<?php 
	if(isset($_SESSION['dgoUserLogin'])){
		$key 			= $_SESSION['dgoUserLogin']['loginProvider'];
		$loginProvider 	= $_SESSION['dgoUserLogin']['email']; 
		$first_name 	= $_SESSION['dgoUserLogin']['first_name']; 
		$last_name 		= $_SESSION['dgoUserLogin']['last_name']; 
	}
?>	<input type="hidden" id="trans-dialog-login" value="<?php _e('Login', $l10n_prefix); ?>">
	<input type="hidden" id="trans-dialog-forgot-password" value="<?php _e('ForgotYourPassword?', $l10n_prefix); ?>">
	<input type="hidden" id="trans-dialog-active-account" value="<?php _e('ActiveAccount?', $l10n_prefix); ?>">
	<input type="hidden" id="trans-dialog-open-new-via-openid" value="<?php _e('OpenNewAccount', $l10n_prefix); ?>">
	<input type="hidden" id="trans-dialog-invalid-email" value="<?php _e('InvalidEmailAddress', $l10n_prefix); ?>">
	<input type="hidden" id="trans-dialog-invalid-password" value="<?php _e('MustBeMore6Char', $l10n_prefix); ?>">
	<input type="hidden" id="trans-dialog-email-not-exist" value="<?php _e('Thisemailaddressnotexist', $l10n_prefix); ?>">
	<input type="hidden" id="trans-dialog-wrong-password" value="<?php _e('wrongpassword', $l10n_prefix); ?>">
	<input type="hidden" id="trans-dialog-password-confirm" value="<?php _e('PasswordConfirm', $l10n_prefix); ?>">
	<input type="hidden" id="trans-dialog-password" value="<?php _e('Password', $l10n_prefix); ?>">
	<input type="hidden" id="trans-dialog-confirm-not-equal" value="<?php _e('ConfirmShouldBeSameAsPass', $l10n_prefix); ?>">
	
	<div class="dgo-dialog-form-cover">
		<!-- User info dialog -->
		<div id="dgo-user-board">
			<div id="dgo-user-board-content"></div>
		</div>
		
		<!-- login dialog -->
		<div class="loginForm">
			<input id="login-form-state" type="hidden" value="login" />
			<div class="leftLoginForm loginBoard">
				<div class="leftContentDiv">
					<form id="formIDLogin" method="post" action="">
					<span style="font-weight: normal; font-size: 14px;"><?php _e('PlsInputYourLoginDetailsBelow', $l10n_prefix); ?>.</span><br/><br />
					<span><?php _e('YourEmailAddress', $l10n_prefix); ?></span><br />             
					<div class="config-input-login validate-input login-input-login"><div class="inputDiv"><input class="login-username" type="text" value="" id="login-username"/><div class="address-check"></div></div></div>
					<div class="login-user-message"></div>              					<span><?php _e('Password', $l10n_prefix); ?></span><br />
					<div class="config-input-login validate-input login-input-password"><div class="inputDiv"><input class="login-password" type="password" value="" id="login-password"/><div class="address-check"></div></div></div>
					<div class="login-password-message"></div>
					</form>
				</div><!-- End left content div -->
				<div class="leftFooterDiv">
					<div class="is-bottons btRecover" onclick="recoverPassword()"><span><?php _e('ForgotPassword', $l10n_prefix); ?></span></div>
					<div class="is-bottons btSpan" onclick="userAuthentication()"><span><?php _e('Login', $l10n_prefix); ?></span></div>            				</div><!-- End left footer div -->            			</div><!-- End left login div -->        
			<div class="leftLoginForm registerBoard">
				<div class="leftContentDiv">
					<span style="font-weight: normal; font-size: 14px;"><?php _e('CreateYourFreeAccountNow', $l10n_prefix); ?>.</span><br /><br/>
					<span><?php _e('YourEmailAddress', $l10n_prefix); ?></span><br />
						<div class="config-input-login validate-input email-user"><div class="inputDiv"><input id="res-username" class="reg-username" type="text" value=""/><div class="address-check-user"></div></div></div><br />
						<input type='hidden' id='check-user-exist-status' value='false'>						<div class="register-status-message"></div>					<div class="passContentDiv">
						<div class="leftPassContentDiv">
							<span><?php _e('Password', $l10n_prefix); ?>:</span><br/>
							<div class="config-input-login double-pass validate-input"><div class="inputDiv"><input id="reg-password" type="password" value=""><div class="address-check"></div></div></div>
						</div>
						<div class="rightPassContentDiv">
							<span><?php _e('PasswordConfirm', $l10n_prefix); ?>:</span><br/>
							<div class="config-input-login double-pass validate-input"><div class="inputDiv"><input id="reg-confirm" type="password" value=""><div class="address-check-confirm"></div></div></div>
						</div>						<div class="register-status-message-password"></div>
					</div>				</div><!-- End left content div -->				<div class="leftFooterDiv">					<div class="is-bottons btSpan" id='Register-button'><?php _e('Register', $l10n_prefix); ?></div>				</div><!-- End left footer div -->			</div><!-- End left login div -->						<div class="leftLoginForm detailBoard">				<div class="leftContentDiv">                        					<span>Gender</span><br />
					<input class="radioInput" type="radio" name="gender"/><label>Male</label><input class="radioInput" type="radio" name="gender"/><label>FeMale</label><br/>					<span>Birthday</span><br />					<input type="text" value=""/><br />
					<span>First Name</span><br />					<input type="text" value=""/><br />					<span>Last Name</span><br />					<input type="text" value=""/>				</div><!-- End left content div -->
				<div class="leftFooterDiv">
					<div class="is-bottons btSpan" onclick="backClickHandle();"><span>Back</span></div>					<div class="is-bottons btSpan"><span>Register</span></div>				</div><!-- End left footer div -->			</div><!-- End left login div -->			
			<div class="rightLoginForm">				<div class="rightContentDiv">					<span><?php _e('AlreadyAnAccountCaption', $l10n_prefix); ?></span><br />                  					<form method="post" action="" name="frmVT" id="frmVT">						<div class="imgLogin">							<!--<a href="javascript: void(0);"><img src="<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/facebook.png" alt="Facebook" onclick="openWindow('facebook','loginProvider');"/></a>-->							<div class="icon-wrapper"><div class="icon-wrapper2"><a href="javascript: void(0);"><img src="<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/yahoo.png" alt="Yahoo" onclick="openWindow('yahoo','loginProvider');"/></a></div></div>												<div class="icon-wrapper"><div class="icon-wrapper2"><a href="javascript: void(0);"><img src="<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/google.png" alt="Google" onclick="openWindow('google','loginProvider');"/></a></div></div>													<div class="icon-wrapper"><div class="icon-wrapper2"><a href="javascript: void(0);"><img src="<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/twitter.png" alt="Twitter" onclick="openWindow('twitter','loginProvider');"/></a></div></div>
							<!-- a href="javascript: void(0);"><img src="<?php //echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/aol.png" alt="AOL"/></a><br/>																										<a href="javascript: void(0);"><img src="<?php //echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgLogin/msn.png" alt="FlickR"/></a><br/-->                    						</div><!--End div image login -->						
						<div class="hidden">                  								<input type="hidden" name="mode" value="redirect" />
							<input type="hidden" name="type" id="type" value="" />                        						</div>                            					</form>
				</div><!-- End left content div -->
				<div class="rightFooterDiv">
					<div class="is-bottons btSpan btSpanRight reg-button" onclick="registerClickHandle();"><?php _e('Register', $l10n_prefix); ?></div>
					<div class="is-bottons btSpan btSpanRight log-button" style="display: none" onclick="registerClickHandle();"><?php _e('Login', $l10n_prefix); ?></div>
				</div><!-- End left footer div -->
			</div><!-- End right login div -->
		</div><!-- End div login form -->	   
		<!-- Active account dialog-->
		<div id="active-account">			<div class="forgot-password">
				<form id="formActiveAccount" method="post" action="">				<div class="forgot-password-header"><?php _e('AccountExistButEnable', $l10n_prefix); ?>.</div>				<div class="forgot-password-content">									<p><input type="text" class="validate[required,custom[email]]" name="activeAccount" id="activeAccount"></p>					<div class="forgot-password-content-message-active"></div>					<p><input type="button" name="activeAccountButton" id="activeAccountButton" value="<?php _e('ActiveNow', $l10n_prefix); ?>"></p>				</div>				</form>
			</div>		</div>	
		<!-- input hidden translation for pop up -->
		<input type="hidden" id="popup-trans-pass-mess" value="<?php _e('MustBeMore6Char', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-pass" value="<?php _e('Password', $l10n_prefix); ?>" >    
		<input type="hidden" id="popup-trans-note" value="<?php _e('Note', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-invalid-note" value="<?php _e('MaxlengthIs30Char', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-firstname" value="<?php _e('FirstName', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-lastname" value="<?php _e('LastName', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-street" value="<?php _e('Street', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-city" value="<?php _e('City', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-email" value="<?php _e('Email', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-invalid-email" value="<?php _e('InvalidEmailAddress', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-email-exist" value="<?php _e('Thisemailaddressalreadyexists', $l10n_prefix);?>" >
		<input type="hidden" id="popup-trans-phone" value="<?php _e('Phone', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-invalid-phone" value="<?php _e('InvalidPhoneNumber', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-zipcode" value="<?php _e('Zip', $l10n_prefix); ?>" >
		<input type="hidden" id="popup-trans-require" value="<?php _e('ThisFieldIsRequired', $l10n_prefix); ?>" >    
		<input type="hidden" id="errorMessage-title" value="<?php _e('ErrorMessage', $l10n_prefix); ?>" >    
		<input type="hidden" id="mess-resgiter-successful" value="<?php _e('RegisterSuccessful', $l10n_prefix); ?>" >    
		<input type="hidden" id="mess-active-successful" value="<?php _e('ActiveSuccessful', $l10n_prefix); ?>" >    
		<!-- end of input hidden-->

		<!-- Add new account via openid-->		<div class="addNewContactViaOpenId">			<form id="formNewContactViaOpenId" method="post" action="">			<div class="add-new-address-content">				<div class="address-info-row add-new-add-name">
					<div class="address-label"><span><b><?php _e('Name', $l10n_prefix); ?>:</b></span></div>
					<div class="address-input address-name-last"><div><input type="text" name='lastname' value="" id="openid-surname"/><div class="address-check"></div></div></div>
					<div class="address-input address-name-first">
						<div style="display:none">
							<input type="text" name="name" id="testname" /><div class="address-check"></div>
						</div>
						<div><input type="text"  value="" name='firstname' id="openid-forename"/><div class="address-check"></div></div>
					</div>
					<div style="display:none">
						<input type="text" name="name" id="testname" /><div class="address-check"></div>
					</div>
					<div class="address-name-content"><div class="gender-div"><select class="GenderSel" id="openid-sexual"><option class='sexual' name='male' value='Male' selected='selected'><?php _e('Mr', $l10n_prefix); ?></option><option class='sexual' name='female' value='Female'><?php _e('Mrs', $l10n_prefix); ?></option><option class='sexual' name='neutral' value='Neutral'><?php _e('Neutral', $l10n_prefix); ?></option></select></div></div>				
				</div>
				<div class="address-info-row add-new-add-company"><div class="address-label"><span><?php _e('Company', $l10n_prefix); ?>:</span></div><div class="address-input address-name-company"><div><input type="text" value="" name='company' id="openid-company"/></div></div></div>				<div class="address-info-row add-new-add-street"><div class="address-label"><span><b><?php _e('Street', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-street"><div><input type="text" value="" name='street' id="openid-street"/><div class="address-check"></div></div></div></div>				
				<div class="address-info-row add-new-add-city"><div class="address-label"><span><b><?php _e('City', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-city"><div><input type="text" value="" name='city' id="openid-city"/><div class="address-check"></div></div></div></div>				
				<div class="address-info-row add-new-add-zip"><div class="address-label"><span><b><?php _e('Zip', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-zip"><div><input type="text" value="" name='zipcode' id="openid-zipcode"/><div class="address-check"></div></div></div></div>											
				<div class="address-info-row add-info-country"><div class="address-label"><span><b><?php _e('Country', $l10n_prefix); ?>:</b></span></div><div class="address-input "><div><div class="add-info-country country-dropdown-dialog"></div><div class="add-info-country-dropdown" style="display:none"><input type="hidden" class="add-info-country-dropdown-selected" value=""></div></div></div></div>				<div class="address-info-row add-new-add-phone"><div class="address-label"><span><?php _e('Phone', $l10n_prefix); ?>:</span></div><div class="address-input address-name-phone"><div><input type="text" value="" name='phone' id="openid-phone"/><div class="address-check"></div></div></div></div>				
				<div class="address-info-row add-new-add-email"><div class="address-label"><span><b><?php _e('Email', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-email"><div><input type="text" name='email' value="" id="openid-email"/><div class="address-check-openid-email"></div></div></div></div>				<div class="address-info-row add-info-email-message" style="display:none"><div class="address-label"><span>&nbsp;</span></div><div class="openid-address-email-content-message"></div></div>				<input type='hidden' id='check-openid-email-status' value='false'>				<div class="address-info-row add-new-add-offers"><input type="checkbox" value=""/> <span><?php _e('SendMeOffer', $l10n_prefix); ?></span></div>				<div class="address-info-row add-new-add-note"><div class="address-label address-label-note"><span><?php _e('Note', $l10n_prefix); ?>:</span></div><div class="textarea-div address-name-note"><textarea name="addInfoNote" id="openid-addressNote" name='addressnote'></textarea></div></div>				<div class="address-info-row add-info-note-message" style="display:none"><div class="address-label"><span>&nbsp;</span></div><div class="openid-address-note-content-message"></div></div>
				<div class="addressFooter is-bottons" id="openid-BtnDone"><span><?php _e('Save', $l10n_prefix); ?></span></div>				<input type="hidden" id="openid-loginprovifer" value="">				<input type="hidden" id="openid-id" value="">			</div>			</form>		</div>				<!-- Choose the way to assign openid account to our account-->		<div class="assignOpenidOr">			<div class="assign-head"><?php _e('OpenNewAccountOrAssign', $l10n_prefix); ?></div>			<div class="is-bottons open-new-account" onclick='MakeNewAddress("<?php echo $key?>","<?php echo $loginProvider?>","<?php echo $first_name?>","<?php echo $last_name?>")'><?php _e('OpenNewAccount', $l10n_prefix); ?></div>			<div class="is-bottons assign-exist-account"><?php _e('AssginToExistAccount', $l10n_prefix); ?></div>		</div>				<!-- Forgot Password dialog-->		<div id="forgot-password">			<div class="forgot-password">				<form id="formRecoverPass" method="post" action="">					<div class="forgot-password-header"><?php _e('WeWillSendReSet', $l10n_prefix); ?></div>					<div class="forgot-password-content">					<div class="forgot-password-content-input"><input type="text" class="validate[required,custom[email]]" name="loginName" id="loginName"></div><div class='forgot-password-checkLoginExistStatus'></div>									<div class="forgot-password-content-message"></div>											<input type="hidden" value="false" id="forgotPassCheckExistStatus">						<div class="is-bottons" id="recoverButton"><?php _e('RecoverPassword', $l10n_prefix); ?></div>										</div>				</form>			</div>
		</div>
		
		<!-- Message dialog -->
		<div id="message-dialog" class="message-dialog-container">
			<div class="message-dialog-container">
				<div class="message-dialog-icon"></div>
				<div class="message-dialog-content">No message at the moment</div>
			</div>
			<div class="message-dialog-footer">
				<div class="message-dialog-button-ok is-bottons">Close</div>
			</div>			
		</div>
		
	</div>
	<?php?>
