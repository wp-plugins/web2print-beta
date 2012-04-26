<script type="text/javascript">
	{scriptPlaceHolder}
</script>
<meta name="DC.Title" content="{blogName} - {metaTag}" />
<div class='activation-account'>
	<input class='dgo-page-name' type='hidden' value='activationAccount' />
	<div class='activation-account-content'>
		<form id='captchaform' action=''>
			<div class="activation-wrapper"><div class="activation-title">{transActivationTitle}</div>
				<div class='activation-account-content-item'>
					<div class='activation-account-content-item-label'>{transEmail}:</div>
					<div class='activation-account-content-item-input'>	
						<input type='text' id='activation-email' value='' placeholder='Enter Your Email Address'>					
					</div>
				</div>
				<div class='activation-account-content-item'>
					<div id='errorLogin'></div>
				</div>
				<div class='activation-account-content-item'>
					<div class='activation-account-content-item-label'>{transActivationCode}:</div>
					<div class='activation-account-content-item-input'>
						<input type='text' id='activation-code' value='' placeholder='Enter Your Activation Code'>
					</div>
				</div>
				<div class='activation-account-content-item'>
					<div id='errorActivationCode'></div>
				</div>
				<div class='activation-account-content-item' id='captcha-item-id' style='display:none'>
					<div class='activation-account-content-item-label'>&nbsp;</div>
					<div id='captchaimage'>
						{captcha}
					</div>
				</div>
				<div class='activation-account-content-item' id='captcha-input-item-id' style='display:none'>
					<div class='activation-account-content-item-label'>&nbsp;</div>
					<div class='activation-account-content-item-input'>
						<input type='text' maxlength='6' name='captcha' id='captcha' placeholder='Enter Captcha'>
					</div>
					<div id='errorAuthentication'></div>
				</div>
				<div class='activation-account-content-item' id='button-item-id' style='display:block'>
					<div class="active-button-area">
						<div class='activation-account-content-button'>
							<div class='is-bottons'>{transActiveNow}</div>
						</div>
					</div>
				</div>				
			</div>
		</form>
	</div>
</div>