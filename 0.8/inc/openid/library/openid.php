<?php
 /**
 @Plugin Name: OpenID
 @Plugin URI: http://www.delivergo.com
 @Description: user can use other accounts from many websites to login
 @Author: Normprint Ltd.
 @Version: 1.0
 */
 
class openid
{
	public static $XRI_global_context_symbol = array('=', '@', '+', '$', '!', '(');

	private static $is_xri = false;
	private static $is_uri = false;

	private $types  = array();
	private $data   = array();
	private $params = array();

	private $server;
	private $claimed_id;
	private $identity;
	private $return_to;

	private $last_error = false;

	private $http;

	public function __construct()
	{
		$this->http = new http();
	}

	public function initialize($identity, $return_to)
	{
		list($server, $delegate) = $this->discovery($identity);

		$this->server     = $server;
		$this->claimed_id = $identity;
		$this->identity   = $delegate;
		$this->return_to  = $return_to;

		$_SESSION['openid_server'] = $server;
	}

	/**
	 * add
	 *
	 * piggybacks extension parameters for an openid request. if we have
	 * discovered an XRDS document we check whether the service support the
	 * extension if we have no informations what types are supported by the
	 * endpoint we add the params and hope that the server support it
	 *
	 * @param openid_iextension $extension
	 * @return void
	 */
	public function add(openid_iextension $extension)
	{
		if(empty($this->types))
		{
			$this->params+= $extension->get_params();
		}
		else
		{
			if(in_array($extension->get_ns(), $this->types))
			{
				$this->params+= $extension->get_params();
			}
			else
			{
				throw new openid_exception('the extension ' . $extension->get_ns() . ' is not supported by the service');
			}
		}
	}

	public function redirect(array $override_params = array())
	{
		$params = array(

			'openid.ns'         => 'http://specs.openid.net/auth/2.0',
			'openid.mode'       => 'checkid_setup',

			'openid.claimed_id' => $this->claimed_id,
			'openid.identity'   => $this->identity,

			'openid.return_to'  => $this->return_to,
			'openid.trust_root' => openid_root,

		) + $this->params;

		if(!empty($override_params))
		{
			foreach($override_params as $k => $v)
			{
				$params[$k] = $v;
			}
		}


		header('HTTP/1.1 302 Found');
		header('Location: ' . openid::build_url($this->server, $params));

		exit;
	}

	public function verify()
	{
		$mode = isset($_GET['openid_mode']) ? $_GET['openid_mode'] : false;

		if($mode == 'cancel')
		{
			throw new openid_exception('user has canceled the request');
		}

		if($mode == 'error')
		{
			$msg = isset($_GET['openid_error']) ? $_GET['openid_error'] : 'An error occured';

			throw new openid_exception($msg);
		}

		if($mode == 'id_res')
		{
			$openid_identity     = isset($_GET['openid_identity'])     ? $_GET['openid_identity']     : false;
			$openid_op_endpoint  = isset($_GET['openid_op_endpoint'])  ? $_GET['openid_op_endpoint']  : false;
			$openid_assoc_handle = isset($_GET['openid_assoc_handle']) ? $_GET['openid_assoc_handle'] : false;
			$openid_signed       = isset($_GET['openid_signed'])       ? $_GET['openid_signed']       : false;
			$openid_sig          = isset($_GET['openid_sig'])          ? $_GET['openid_sig']          : false;


			$this->params = array(

				'openid.assoc_handle' => $openid_assoc_handle,
				'openid.signed'       => $openid_signed,
				'openid.sig'          => $openid_sig,
				'openid.mode'         => 'check_authentication',

			);


			# you should note that php replaces . (dot) in the query
			# fragment with _ (underscore) i.e. index.php?openid.foo=bar
			# can you access with $_GET['openid_foo']

			if(!empty($openid_signed))
			{
				$signed = $openid_signed;
				$parts  = explode(',', $signed);

				foreach($parts as $part)
				{
					$k = 'openid_' . str_replace('.', '_', $part);
					$v = isset($_GET[$k]) ? $_GET[$k] : false;

					if($v !== false && $k != 'openid_mode')
					{
						$this->params['openid.' . $part] = $v;
					}

					$this->data[$k] = urldecode($v);
				}
			}


			$this->server   = $openid_op_endpoint;
			$this->identity = self::normalize_identity($openid_identity);

			if(isset($_SESSION['openid_server']))
			{
				if($_SESSION['openid_server'] == $openid_op_endpoint)
				{
					$server = $_SESSION['openid_server'];
				}
				else
				{
					throw new openid_exception('invalid openid server received');
				}
			}
			else
			{
				throw new openid_exception('openid server was not set');
			}


			$response = $this->http->post(openid::build_url($server), $this->params);


			$data = openid::keyvalue_decode($response['body']);


			if(isset($data['error']))
			{
				$this->last_error = $data['error'];
			}

			if(isset($data['is_valid']) && $data['is_valid'] == 'true')
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}

	public function has_support($ns)
	{
		return in_array($ns, $this->types);
	}

	public function get_last_error()
	{
		return $this->last_error;
	}

	public function get_server()
	{
		return $this->server;
	}

	public function get_claimed_id()
	{
		return $this->claimed_id;
	}

	public function get_identity()
	{
		return $this->identity;
	}

	public function get_return_to()
	{
		return $this->return_to;
	}

	/**
	 * get_data
	 *
	 * Returns the data that we have received via the callback
	 *
	 * @return array
	 */
	public function get_data()
	{
		return $this->data;
	}

	/**
	 * get_types
	 *
	 * Returns an array with all service types that the discovered service
	 * support (namespaces)
	 *
	 * @return array
	 */
	public function get_types()
	{
		return $this->types;
	}

	public function has_extension($ns)
	{
		return in_array($ns, $this->types);
	}

	/**
	 * discovery
	 *
	 * Discovers an openid identity (URI or XRI). It uses the xri.net web
	 * service to resolve XRIs. Returns either an array where the first
	 * value is the absolute URL of the service and the second optional a
	 * claimed id or it throws an exception
	 *
	 * @param string $identity
	 * @return array
	 */
	private function discovery($identity)
	{
		$identity = self::normalize_uri($identity);

		if(!empty($identity))
		{
			$discovered_identity = false;

			if(self::$is_xri === true)
			{
				# we use the XRI resolver at xri.net
				$url = 'http://xri.net/' . $identity;

				$response = $this->http->get($url);

				# we accept all 3xx redirect status codes if we dont
				# get redirected we couldnt resolve the XRI
				if($response['code'] >= 300 && $response['code'] < 400 && isset($response['header']['location']))
				{
					$discovered_identity = $this->fetch_xrds($response['header']['location']);
				}
				else
				{
					throw new openid_exception('Couldnt resolve XRI');
				}
			}

			if(self::$is_uri === true)
			{
				# YADIS discovery
				$discovered_identity = $this->fetch_xrds($identity);

				# HTML based discovery
				if(empty($discovered_identity))
				{
					$response = $this->http->get($identity);

					$discovered_identity = $this->html_based_discovery($response['body']);
				}
			}

			if(!empty($discovered_identity))
			{
				list($server, $delegate) = $discovered_identity;

				if($delegate === false)
				{
					return array($server, $identity);
				}
				else
				{
					return array($server, $delegate);
				}
			}
			else
			{
				throw new openid_exception('Couldnt resolve identity');
			}
		}
		else
		{
			throw new openid_exception('Invalid openid identity');
		}
	}

	/**
	 * fetch_xrds
	 *
	 * We make a YADIS dicovery on the url. If we have found an fitting
	 * service the method returns the endpoint uri and if available a
	 * claimed id else it returns false
	 *
	 * @param string $url
	 * @return array
	 */
	private function fetch_xrds($url)
	{
		$yadis = new yadis();

		$xrds = $yadis->discover($url);

		if($xrds !== false)
		{
			# OP Identifier Element
			foreach($xrds['service'] as $service)
			{
				if(in_array('http://specs.openid.net/auth/2.0/server', $service['type']))
				{
					$this->types = $service['type'];

					return array($service['uri'], false);
				}
			}

			# Claimed Identifier Element
			foreach($xrds['service'] as $service)
			{
				if(in_array('http://specs.openid.net/auth/2.0/signon', $service['type']))
				{
					$this->types = $service['type'];

					return array($service['uri'], $service['localid']);
				}
			}
		}

		return false;
	}

	private function html_based_discovery($html)
	{
		$server   = false;
		$delegate = false;
		$matches  = array();

		preg_match('/<head(.*)<\/head>/ims', $html, $matches);

		if(!empty($matches))
		{
			$head = current($matches);
		}
		else
		{
			throw new openid_exception('Couldnt find head tag');
		}


		$dom = new DOMDocument();

		# we maybe must try to parse really crappy html
		# so turn off all checks and supress the errors
		# hopefully we get it parsed
		$dom->recover             = true;
		$dom->resolveExternals    = false;
		$dom->strictErrorChecking = false;
		$dom->substituteEntities  = false;

		@$dom->loadHTML($head);

		$list = $dom->getElementsByTagName('link');

		foreach($list as $node)
		{
			if($node->hasAttribute('rel') && $node->hasAttribute('href'))
			{
				$rel  = $node->getAttributeNode('rel');
				$href = $node->getAttributeNode('href');
                //var_dump($rel->value); exit;
				switch($rel->value)
				{
					case 'openid2.provider':
					case 'openid.server':

						$server = $href->value;

						break;

					case 'openid2.local_id':
					case 'openid.delegate':

						$delegate = $href->value;

						break;
				}
			}
		}

		if(!empty($server))
		{
			return array($server, $delegate);
		}
		else
		{
			throw new openid_exception('Couldnt find server in identifier');
		}
	}

	public static function build_url($url, array $params = array())
	{
		if(!empty($params))
		{
			$query = http_build_query($params, '', '&');

			return $url . '?' . $query;
		}
		else
		{
			return $url;
		}
	}

	public static function keyvalue_encode(array $data)
	{
		$content = '';

		foreach($data as $k => $v)
		{
			$content.= $k . ':' . $v . "\n";
		}

		return $content;
	}

	public static function keyvalue_decode($data)
	{
		$params = array();
		$lines  = explode("\n", $data);

		foreach($lines as $line)
		{
			$line = trim($line);

			if(!empty($line))
			{
				$pair = explode(':', $line, 2);

				if(isset($pair[0]) && isset($pair[1]))
				{
					$k = trim($pair[0]);
					$v = trim($pair[1]);

					$params[$k] = $v;
				}
			}
		}

		return $params;
	}

	public static function normalize_uri($uri)
	{
		if(!empty($uri))
		{
			$uri = strtolower($uri);

			if(substr($uri, 0, 6) == 'xri://')
			{
				self::$is_xri = true;

				return substr($uri, 6);
			}

			if(in_array($uri[0], self::$XRI_global_context_symbol))
			{
				self::$is_xri = true;

				return $uri;
			}

			if(substr($uri, 0, 7) != 'http://' && substr($uri, 0, 8) != 'https://')
			{
				$uri = 'http://' . $uri;
			}

			$parts  = parse_url($uri);

			$scheme = isset($parts['scheme']) ? $parts['scheme'] : false;
			$host   = isset($parts['host'])   ? $parts['host']   : false;
			$path   = isset($parts['path'])   ? $parts['path']   : false;

			if($scheme !== false && $host !== false)
			{
				if($scheme == 'http' || $scheme == 'https')
				{
					self::$is_uri = true;

					if(empty($path))
					{
						return $scheme . '://' . $host . '/';
					}
					else
					{
						return $scheme . '://' . $host . $path;
					}
				}
			}
		}

		return false;
	}

	/**
	 * normalize_identity
	 *
	 * This method normalize the openid identifier this is useful to save an
	 * user in an database because the following identifiers are all the
	 * same:
	 *
	 *  - https://k42b3.myopenid.com
	 *  - http://k42b3.myopenid.com
	 *  - https://k42b3.myopenid.com/
	 *  - http://k42b3.myopenid.com/
	 *
	 * The method strips of the protocol and the trailing slash so in all
	 * cases above you get k42b3.myopenid.com as identifier
	 *
	 * @param string $indetifier
	 * @return string
	 */
	public static function normalize_identity($identifier)
	{
		$identifier = trim($identifier);

		if(!empty($identifier))
		{
			if(substr($identifier, 0, 7) == 'http://')
			{
				$identifier = substr($identifier, 7);
			}

			if(substr($identifier, 0, 8) == 'https://')
			{
				$identifier = substr($identifier, 8);
			}

			$identifier = trim($identifier, '/');

			return $identifier;
		}

		return false;
	}
}