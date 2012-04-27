<?php
/*
 Plugin Name: Widget to Login Plugin V1.0
 Plugin URI: http://www.delivergo.com
 Description: OpenID application
 Author: Normprint Ltd.
 Version: 1.0
 */
class openid_provider_twitter 
{
    //private $endpoint = 'http://openid.aol.com/%s';
    //private $endpoint = 'https://api.twitter.com/oauth/request_token';
    //private $endpoint = 'http://api.twitter.com/oauth/authorize?oauth_token=VAyHLylXZ3wcyRpHvdhkUE5lmpIbH8uFfjJEwo0&oauth_callback=http:://localhost:24649/TwitterIdentity/GetTwitterAuthorizationCallback/';
    function openid_provider_twitter() {
        $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
 
        /* Get temporary credentials. */
        $request_token = $connection->getRequestToken(OAUTH_CALLBACK);
        
        $_SESSION['oauth_token'] = $token = $request_token['oauth_token'];
        $_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
        
        /* If last connection failed don't display authorization link. */
        switch ($connection->http_code) {
          case 200:
            /* Build authorize URL and redirect user to Twitter. */
            $url = $connection->getAuthorizeURL($token);
            header('Location: ' . $url); 
            break;
          default:
            /* Show notification if something went wrong. */
            echo 'Could not connect to Twitter. Refresh the page or try again later.';
        }
    
    }
    //=============================================================================================
}