<?php
/*
 Plugin Name: Widget to Login Plugin V1.0
 Plugin URI: http://www.delivergo.com
 Description: OpenID application
 Author: Normprint Ltd.
 Version: 1.0
 */
interface openid_iprovider
{
	public function initialize($username, $return_to);
	public function add(openid_iextension $extension);
	public function redirect();
	public function verify();
	public function get_data();
	public function has_extension($ns);
}