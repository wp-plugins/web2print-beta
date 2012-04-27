<?php
/*
 Plugin Name: Widget to Login Plugin V1.0
 Plugin URI: http://www.delivergo.com
 Description: OpenID application
 Author: Normprint Ltd.
 Version: 1.0
 */

class openid_provider_facebook 
{
	function openid_provider_facebook() {
        $this->url = 'https://graph.facebook.com/oauth/authorize?client_id='.facebook_id.'&type=user_agent&redirect_uri='.$this->format_url(facebook_callback).'&scope=email,publish_stream';
        redirect($this->url);
    }   // end function
    //=============================================================================================
    function format_url($url) {
        $url = str_replace("://", "%3A%2F%2F", $url);
        $url = str_replace("/", "%2F", $url);
        return $url;
    }
    //=================================================================================================
    
}