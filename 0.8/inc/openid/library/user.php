<?php
/**
 * user
 *
 * This is a simple user class to demonstrate how you can implement an
 * authentication mechanism with the OpenID login. The class uses the session
 * system to see whether a user is authenticated.
 *
 * @author Christoph Kappestein <k42b3.x@gmail.com>
 */
class user
{
	/**
	 * Indicated whether the user is authenticated
	 *
	 * @var boolean
	 */
	private $authenticated = false;

	/**
	 * The time in seconds how long a user can be inactive before the
	 * session gets destroyed
	 *
	 * @var integer
	 */
	private $expire = 900;

	/**
	 * The name of the user whether an normalized openid identifier i.e.
	 * k42b3.myopenid.com or an facebook user name i.e. Christoph Kappestein
	 *
	 * @var string
	 */
	private $name;

	/**
	 * UNIX timestamp of the last activity. It is need to check whether the
	 * session is expired
	 *
	 * @var integer
	 */
	private $last_action;

	/**
	 * The key in the session where the values are stored
	 *
	 * @var string
	 */
	private static $key = 'dgoUserLogin';

	/**
	 * __construct
	 *
	 * Checks whether the user is already authenticated. If yes we look
	 * whether the current session is expired and if its not we set
	 * authenticated to true else we logout the current user.
	 *
	 * @return void
	 */
	public function __construct()
	{
		if(isset($_SESSION[self::$key]))
		{
			$this->name        = $_SESSION[self::$key]['name'];
			$this->last_action = $_SESSION[self::$key]['last_action'];

			if(time() > $this->last_action + $this->expire)
			{
				# user has been inactive for 15 minutes (900
				# seconds) so we logout the user automatically
				$this->logout();
			}
			else
			{
				$this->authenticated = true;

				$_SESSION[self::$key]['last_action'] = time();
			}
		}
	}

	/**
	 * is_authenticated
	 *
	 * Indicated whether the user is authenticated or not
	 *
	 * @return boolean
	 */
	public function is_authenticated()
	{
		return $this->authenticated;
	}

	/**
	 * get_name
	 *
	 * Returns the name
	 *
	 * @return string
	 */
	public function get_name()
	{
		return $this->name;
	}

	/**
	 * get_last_action
	 *
	 * Returns the last_action
	 *
	 * @return string
	 */
	public function get_last_action()
	{
		return $this->last_action;
	}

	/**
	 * Set the session for the user
	 *
	 * @return void
	 */
	public function login($name, $arr_returns = array())
	{
		$_SESSION[self::$key] = array(

			'name'        => $name,
			'last_action' => time(),

		);
        $_SESSION["arr_data"] = $arr_returns;
	}

	/**
	 * logout
	 *
	 * Destroys the current session of the user and set authentication to
	 * false
	 *
	 * @return void
	 */
	public function logout()
	{
		unset($_SESSION[self::$key]);

		$this->authenticated = false;

		$this->name          = null;
		$this->last_action   = null;
        redirect(facebook_logout_url);
	}
}