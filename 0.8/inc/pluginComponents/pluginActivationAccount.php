<?php $char = strtoupper(substr(str_shuffle('abcdefghjkmnpqrstuvwxyz'), 0, 4));if(!isset($_SESSION['captcha_authen']['code'])){	$_SESSION['captcha_authen']['code'] = rand(1, 7) . rand(1, 7) . $char;}?>dgoCaptchaCode = '<?php echo $_SESSION['captcha_authen']['code']?>';var activationAccount = "<div class='activation-account-content'><form id='captchaform' action=''>";
	activationAccount += "<fieldset><legend>Please type your Email and Activation Code to active your account</legend>";
	activationAccount += "<div class='activation-account-content-item'><div class='activation-account-content-item-label'>Email:</div><div class='activation-account-content-item-input'><input type='text' id='activation-email' value='' placeholder='Enter Your Email' ><input type='hidden' id='activation-guid' value=''></div></div>";	
	activationAccount += "<div class='activation-account-content-item'><div id='errorLogin'></div></div>";	
	activationAccount += "<div class='activation-account-content-item'><div class='activation-account-content-item-label'>Activation Code:</div><div class='activation-account-content-item-input'><input type='text' id='activation-code' value='' placeholder='Enter Your Activation Code'></div></div>";		     
	activationAccount += "<div class='activation-account-content-item'><div id='errorActivationCode'></div></div>";		     
	activationAccount += "<div class='activation-account-content-item'><div class='activation-account-content-item-label'>&nbsp;</div><div id='captchaimage'>"+"<img src='"+web_2_print_blogInfo+"css/img/icon/image.php?<?php echo time(); ?>' width='132' height='46' class='img-captcha' alt='Captcha image' /></div></div>";
	activationAccount += "<div class='activation-account-content-item'><div class='activation-account-content-item-label'>&nbsp;</div><div class='activation-account-content-item-input'><input type='text' maxlength='6' name='captcha' id='captcha' placeholder='Enter Captcha'></div><div id='errorAuthentication'></div></div>";
	activationAccount += "<div class='activation-account-content-item'><div class='activation-account-content-button'><div class='is-bottons'>Active Now</div></div></div></fieldset></form><div>";	
					
//append to address book page
jQuery('.activation-account').empty();
jQuery('.activation-account').append(activationAccount);