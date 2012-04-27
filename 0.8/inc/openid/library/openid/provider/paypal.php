<?php
  /*
 Plugin Name: Widget to Login Plugin V1.0
 Plugin URI: http://www.delivergo.com
 Description: OpenID application
 Author: Normprint Ltd.
 Version: 1.0
 */
class openid_provider_paypal
{
    function openid_provider_paypal() {
        $this->url = 'https://openid.paypal-ids.com/&force_reauth=false&xdReceiver='.paypal_callback.'&callback='.paypal_api;
        redirect($this->url);
    }
    //=============================================================================================    
}