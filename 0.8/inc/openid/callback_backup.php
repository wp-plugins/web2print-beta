<?php

require_once('common.php');

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
            if ($_REQUEST["access_token"]) {
                $fb = new facebook(facebook_key, facebook_secret);
                $fb->url = "https://graph.facebook.com/me?access_token={$_REQUEST["access_token"]}";
                $user_info = $fb->access_token_facebook();
                echo "<pre>";
				print_r($user_info);
				echo "</pre>";
                if($user_info["id"])
                {
                    if(isset($user_info['first_name']) && isset($user_info['last_name']))
                    {
                        $user = $user_info['first_name'] . ' ' . $user_info['last_name'];

                        $u->login($user, $user_info);
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
                } else {
                  /* Save HTTP status for error dialog on connnect page.*/
                  header('Location: ./clearsessions.php');
                }
                $arr_return = get_arr_data_from_twitter($user_info);
                if($user_info->id)
                {
                    if(isset($user_info->name))
                    {
                        $user = $user_info->name;

                        $u->login($user, $arr_return);
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

			if(isset($data['openid.sreg.fullname']))
			{
				$user = $data['openid.sreg.fullname'];

				$u->login($user);
			}
			else
			{
				$k_fn = '';
				$k_f  = '';
				$k_l  = '';

				foreach($data as $k => $v)
				{
					if($v == 'http://axschema.org/namePerson')
					{
						$k_fn = str_replace('type', 'value', $k);
					}

					if($v == 'http://axschema.org/namePerson/first')
					{
						$k_f = str_replace('type', 'value', $k);
					}

					if($v == 'http://axschema.org/namePerson/last')
					{
						$k_l = str_replace('type', 'value', $k);
					}
				}

				if(isset($data[$k_f]) && isset($data[$k_l]))
				{
					$user = $data[$k_f] . ' ' . $data[$k_l];

					$u->login($user);
				}
				elseif(isset($data[$k_fn]))
				{
					$user = $data[$k_fn];

					$u->login($user);
				}
				else
				{
					$user = $openid->get_identity();

					if(!empty($user))
					{
						$u->login($user);
					}
					else
					{
						throw new openid_exception('Couldnt get identity');
					}
				}
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
$_SESSION["SES"]["FACEBOOK_VT"] = $_REQUEST;

//-------------------------------------------------------------------------------------------------
function get_arr_data_from_twitter($obj) {
    $data["profile_background_image_url"] = $obj->profile_background_image_url;
    $data["followers_count"] = $obj->followers_count;
    $data["notifications"] = $obj->notifications;
    $data["profile_image_url"] = $obj->profile_image_url;
    $data["screen_name"] = $obj->screen_name;
    $data["name"] = $obj->name;
    return $data;
}
//-------------------------------------------------------------------------------------------------
/*
If the login was successful you probably want redirect the user direct to your
homepage instead of showing the "you have successful logged in" page.*/

if(!isset($error))
{
	//header('Location: http://pinkbear/wordpress');
	//exit;
}


?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>OpenID login</title>
	<link rel="stylesheet" href="css/openid.css" type="text/css" media="screen, projection" />
    <script>
        /*window.close();
        if (window.opener && !window.opener.closed) {
            window.opener.location.reload();
        }*/		
    </script>
</head>
<body>


<div class="openid">

	<h1>Sign in</h1>

	<?php if(isset($error)): ?>

		<div class="error"><?php echo $error; ?></div>

	<?php else: ?>

		<p>You have successful logged in. Click <a href="index.php">here</a> to goto the homepage.</p>

	<?php endif; ?>

</div>

<script>
    var temp_token = window.location.hash;
    if (temp_token) {
        var new_token = temp_token.replace("#", "&");
        window.location = "callback.php?mode=facebook" + new_token;
    } // end if
    
    
</script>

</body>
</html>