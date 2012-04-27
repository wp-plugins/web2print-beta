<?php
/*
 Plugin Name: Widget to Login Plugin V1.0
 Plugin URI: http://www.delivergo.com
 Description: OpenID application
 Author: Normprint Ltd.
 Version: 1.0
*/
class openid_provider_verisign implements openid_iprovider
{
	private $endpoint = 'http://%s.pip.verisignlabs.com/';

	public function __construct()
	{
		$this->openid = new openid();
	}

	public function initialize($username, $return_to)
	{
		$identity = sprintf($this->endpoint, $username);

		$this->openid->initialize($identity, $return_to);
	}

	public function add(openid_iextension $extension)
	{
		$this->openid->add($extension);
	}

	public function redirect()
	{
		$this->openid->redirect();
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
