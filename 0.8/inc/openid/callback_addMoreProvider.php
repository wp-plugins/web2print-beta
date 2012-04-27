<?php
session_start();
//$_SESSION["LoginProvider"] = array();

require_once('common_addMoreProvider.php');

if(isset($_GET['mode']) && $_GET['mode'] == 'facebook') 
{
    try
    {
        if(!isset($_GET['canceled']))
        {
            # if the user has logged in via facebook he gets
            # redirected to this callback. We use the facebook
            # library to check here whether the user is
            # authenticated.
            if ($_REQUEST["code"]) {
                $access_token = file_get_contents("https://graph.facebook.com/oauth/access_token?client_id=".facebook_id."&redirect_uri=".facebook_callback."&scope=offline_access&client_secret=".facebook_secret."&code={$_REQUEST["code"]}");
               
                $pos = strpos($access_token, "&expires");
                $_SESSION["SES"]["FACEBOOK_VT"]["access_token_code"] = substr($access_token, 0, $pos);
                redirect_vt(facebook_callback_import_photos);
            }
            if ($_REQUEST["access_token"]) {
                $fb = new facebook(facebook_key, facebook_secret);
                $fb->url = "https://graph.facebook.com/me?access_token={$_REQUEST["access_token"]}";
                $user_info = $fb->access_token_facebook();
               
                if($user_info["id"])
                {
                    if(isset($user_info['first_name']) && isset($user_info['last_name']))
                    {                        
						$_SESSION['MoreProvider']['email'] = $user_info['email'];						
						$_SESSION['MoreProvider']['loginProvider'] = 'LoginProvider.Facebook';						
                        
                    }
                    else
                    {
                        throw new facebook_exception('Couldnt get identity');
                    }
                } // end if
                else
                {
                    throw new facebook_exception('Login failed');
                }   
            }   // end if
            
        } // end if
        else
        {
            throw new facebook_exception('User has canceled the request');
        }
    }
    catch(Exception $e)
    {
        $error = $e->getMessage();
    }
}
else if(isset($_GET['mode']) && $_GET['mode'] == 'twitter')
{
	try
	{
		if(!isset($_GET['canceled']))
		{
			# if the user has logged in via facebook he gets
			# redirected to this callback. We use the facebook
			# library to check here whether the user is
			# authenticated.
			if ($_REQUEST["oauth_token"]) {
                //---------------------------------
                $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);

                /* Request access tokens from twitter */
                $access_token = $connection->getAccessToken($_REQUEST['oauth_verifier']);

                /* Save the access tokens. Normally these would be saved in a database for future use. */
                $_SESSION['access_token'] = $access_token;

                /* Remove no longer needed request tokens */
                unset($_SESSION['oauth_token']);
                unset($_SESSION['oauth_token_secret']);

                /* If HTTP response is 200 continue otherwise send to connect page to retry */
                if (200 == $connection->http_code) {
                  /* The user has been verified and the access tokens can be saved for future use */
                  $_SESSION['status'] = 'verified';
                  $user_info = $connection->get('account/verify_credentials');
				  	echo '<pre>';
					//print_r($user_info);
					echo '</pre>';
                } else {
                  /* Save HTTP status for error dialog on connnect page.*/
                  header('Location: ./clearsessions.php');
                }
                
				
                if($user_info->id)
                {
                    if(isset($user_info->name))
                    {
                        $_SESSION['MoreProvider']['email'] = $user_info->screen_name;											
						$_SESSION['MoreProvider']['loginProvider'] = 'LoginProvider.Twitter';						
                        
                    }
                    else
                    {
                        throw new facebook_exception('Couldnt get identity');
                    }
                } // end if
                else
                {
                    throw new facebook_exception('Login failed');
                }   
            }   // end if
            
		} // end if
		else
		{
			throw new facebook_exception('User has canceled the request');
		}
	}
	catch(Exception $e)
	{
		$error = $e->getMessage();
	}
}
else
{
	try
	{
		$openid = new openid();

		if($openid->verify() === true)
		{
			# the user logged in successful we check here for ax and
			# sreg values that we have requested. If we dont receive
			# anything we use the plain identifier.

			$data = $openid->get_data();
          
			if(isset($data['openid_ext1_value_email']))
			{
				
				$_SESSION['MoreProvider']['email'] = $data['openid_ext1_value_email'];						
				$_SESSION['MoreProvider']['loginProvider'] = 'LoginProvider.Google';				
				
			}
			if(isset($data['openid_ax_value_email']))
			{
				
				$_SESSION['MoreProvider']['email'] = $data['openid_ax_value_email'];				
				$_SESSION['MoreProvider']['loginProvider'] = 'LoginProvider.Yahoo';				
				
			}
		}
		else
		{
			$last_error = $openid->get_last_error();

			throw new openid_exception((empty($last_error) ? 'Authentication failed' : $last_error));
		}
	}
	catch(Exception $e)
	{
		$error = $e->getMessage();
	}
}
//-------------------------------------------------------------------------------------------------
function get_arr_data_from_twitter($obj) {
    $data["profile_background_image_url"] = $obj->profile_background_image_url;
    $data["followers_count"] = $obj->followers_count;
    $data["notifications"] = $obj->notifications;
    $data["profile_image_url"] = $obj->profile_image_url;
    $data["screen_name"] = $obj->screen_name;
    $data["name"] = $obj->name;
	$data["id"] = $obj->id;
    return $data;
}
//-------------------------------------------------------------------------------------------------
function redirect_vt($url) {
    print "<html>\n<head>\n<meta http-equiv=\"refresh\" content=\"0;URL=$url\">\n</head>\n</html>";
    exit;
}
//-------------------------------------------------------------------------------------------------
/*
If the login was successful you probably want redirect the user direct to your
homepage instead of showing the "you have successful logged in" page.

if(!isset($error))
{
	header('Location: ' . openid_root);
	exit;
}
*/
	
?>
<?php echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n"; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

</head>
<body>


<script>
    var temp_token = window.location.hash;
    if (temp_token) {
        var new_token = temp_token.replace("#", "&");
        window.location = "callback_addMoreProvider.php?mode=facebook" + new_token;
    } // end if
    
    window.close();
	if (window.opener && !window.opener.closed) {
		window.opener.location.reload();
	}
</script>

</body>
</html>