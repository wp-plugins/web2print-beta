<?php
/*
 Plugin Name: Widget to Login Plugin V1.0
 Plugin URI: http://www.delivergo.com
 Description: OpenID application
 Author: Normprint Ltd.
 Version: 1.0
 */
class openid_provider_flickr implements openid_iprovider
{
    private $endpoint = 'http://www.flickr.com/';
	//private $endpoint = 'http://flickr.com/photos/%s';

	public function __construct()
	{
		$this->openid = new openid();
	}

	public function initialize($username, $return_to)
	{
		$this->openid->initialize($this->endpoint, $return_to);
	}

	public function add(openid_iextension $extension)
	{
		$this->openid->add($extension);
	}

	public function redirect()
	{
		$this->openid->redirect(array(

			'openid.claimed_id' => 'http://specs.openid.net/auth/2.0/identifier_select',
			'openid.identity'   => 'http://specs.openid.net/auth/2.0/identifier_select',

		));
	}

	public function verify()
	{
		return $this->openid->verify();
	}

	public function get_data()
	{
		return $this->openid->get_data();
	}

	public function has_extension($ns)
	{
		return $this->openid->has_extension($ns);
	}
}