<?php
/*
 Plugin Name: Widget to Login Plugin V1.0
 Plugin URI: http://www.delivergo.com
 Description: OpenID application
 Author: Normprint Ltd.
 Version: 1.0
*/
require_once('common.php');



if(isset($_GET['mode']) && $_GET['mode'] == 'redirect')
{
	try
	{
		$type     = isset($_GET['type']) ? $_GET['type'] : false;
		$identity = isset($_GET['openid_identifier']) ? $_GET['openid_identifier'] : false;

		/*if(empty($identity) && $type != "facebook" && $type != "twitter" && $type != "paypal")
		{
			throw new openid_exception('Identifier not set');
		}*/

		switch($type)
		{
			case 'aol':
			case 'blogger':
			case 'claimid':
			case 'flickr':
			case 'google':
			case 'myopenid':
			case 'verisign':
            case 'yahoo':
            case 'twitter':
            case 'linkedin':
            case 'myspace':
            case 'windowlive':
            case 'paypal':
            case 'hyves':
            case 'livejournal':
            case 'wordpress':
            case 'netlog':
            case 'smugmug':
            case 'technorati':
            case "facebook" :
            
				$class = 'openid_provider_' . $type;
				$openid = new $class();
				$openid->initialize($identity, openid_callback);
				break;
            //-------------------------------------------------------------------------------------
			case 'openid':
				$openid = new openid($identity, $callback);
				$openid->initialize($identity, openid_callback);
				break;
            //-------------------------------------------------------------------------------------
            /*case "facebook" :
                throw new openid_exception('Facebook login '.$identity);
                
                break;*/
            //-------------------------------------------------------------------------------------
			default:
				throw new openid_exception('Invalid login type');
				break;
            //-------------------------------------------------------------------------------------
		} // end switch


		# we try to get the fullname from the user ... first we check
		# whether ax is supported if yes we use that else we check
		# for sreg and if this also doesnt exist we dont add any extension
		# and use the discovered identity as name. google support only
		# first and last name yahoo only fullname so we request both and
		# see in the callback what we get

		$ax = new openid_extension_ax(array(

			'fullname'  => 'http://axschema.org/namePerson',
			'firstname' => 'http://axschema.org/namePerson/first',
            'lastname'  => 'http://axschema.org/namePerson/last',
			'email'  => 'http://axschema.org/contact/email',

		));

		if($openid->has_extension($ax->get_ns()))
		{
			$openid->add($ax);
		}
		else
		{
			$sreg = new openid_extension_sreg(array('fullname'));

			if($openid->has_extension($sreg->get_ns()))
			{
				$openid->add($sreg);
			}
		}


		$openid->redirect();
	}
	catch(Exception $e)
	{
		$error = $e->getMessage();
	}
}

?>
<?php echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n"; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>OpenID login</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" href="css/openid.css" type="text/css" media="screen, projection" />
	<script type="text/javascript">
	var openid_root  = "<?php echo openid_root; ?>";
    var facebook_key = "<?php echo facebook_key; ?>";
	//var paypal_key = "<?php echo paypal_key; ?>";
	</script>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/openid.js"></script>
</head>
<body>


<div class="openid">

	<form method="post" action="openid.php" name="frmVT" id="frmVT">

	<div class="provider" id="provider"></div>

	<h1><a href="openid.php">Sign in</a></h1>

	<p style="font-size: 13px;">Sign in with your OpenID <span id="hint_select_provider"></span> or if you don't have an OpenID click <a href="https://www.myopenid.com/signup">here</a> to register.</p>

	<?php if(isset($error)): ?>

		<div class="error" id="error"><?php echo $error; ?></div>

	<?php endif; ?>

	<div class="identity" id="identity">

		<noscript>

			<p>Enter your <strong>OpenID</strong></p>

			<input type="text" name="openid_identifier" id="openid_identifier" class="input_identity" />

			<input type="submit" value="Sign in" class="sign_in" />

		</noscript>

	</div>

	<div class="hidden">

		<input type="hidden" name="mode" value="redirect" />
		<input type="hidden" name="type" id="type" value="openid" />

	</div>

	</form>

</div>

<?php //include("gfc.html");?>
</body>
</html>