<?php
 /*
 Plugin Name: Widget to Login Plugin V1.0
 Plugin URI: http://www.delivergo.com
 Description: OpenID application
 Author: Normprint Ltd.
 Version: 1.0
 */
/**
 * openid_provider_claimid
 *
 * @author     Christoph Kappestein <k42b3.x@gmail.com>
 * @license    http://www.gnu.org/licenses/gpl.html GPLv3
 * @link       http://phpsx.org
 * @version    $Revision: 119 $
 */
class openid_provider_claimid implements openid_iprovider
{
	private $endpoint = 'http://claimid.com/%s';

	private $openid;

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