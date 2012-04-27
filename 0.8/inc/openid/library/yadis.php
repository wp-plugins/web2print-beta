<?php
/*
 *  $Id: yadis.php 119 2009-12-17 20:28:26Z k42b3.x $
 *
 * psx
 * A object oriented and modular based PHP framework for developing
 * dynamic web applications. For the current version and informations
 * visit <http://phpsx.org>
 *
 * Copyright (c) 2009 Christoph Kappestein <k42b3.x@gmail.com>
 *
 * This file is part of psx. psx is free software: you can
 * redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or any later version.
 *
 * psx is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with psx. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * yadis
 *
 * @author     Christoph Kappestein <k42b3.x@gmail.com>
 * @license    http://www.gnu.org/licenses/gpl.html GPLv3
 * @link       http://phpsx.org
 * @version    $Revision: 119 $
 */
class yadis
{
	private $max_recursion = 3;
	private $http;

	public function __construct()
	{
		$this->http = new http();
	}

	public function discover($url, $raw = false, $deep = 0)
	{
		if($this->max_recursion >= $deep)
		{
			$response = $this->request($url);

			# x-xrds-location
			if(isset($response['header']['x-xrds-location']))
			{
				if(strcasecmp($url, $response['header']['x-xrds-location']) != 0)
				{
					return $this->discover($response['header']['x-xrds-location'], $raw, $deep++);
				}
			}

			# application/xrds+xml
			if(isset($response['header']['content-type']) && strpos($response['header']['content-type'], 'application/xrds+xml') !== false)
			{
				if($raw === true)
				{
					return $response['body'];
				}
				else
				{
					return $this->parse($response['body']);
				}
			}

			# <meta />
			$matches = array();

			preg_match_all('/<meta(.*)>/imsU', $response['body'], $matches);

			if(!empty($matches))
			{
				foreach($matches as $match)
				{
					$match = strtolower(current($match));

					if(strpos($match, 'x-xrds-location') !== false)
					{
						$match  = str_replace('\'', '"', $match);

						$offset = strpos($match, 'content');

						if($offset !== false)
						{
							$s = strpos($match, '"', $offset);
							$e = strpos($match, '"', $s + 1);

							if($s !== false && $e !== false)
							{
								$location = substr($match, $s + 1, $e - $s - 1);

								return $this->discover($location, $raw, $deep++);
							}
						}
					}
				}
			}

			# we dont find anything
			return false;
		}
		else
		{
			throw new yadis_exception('max recurison level reached');
		}
	}

	public function parse($xrds)
	{
		$xml = simplexml_load_string($xrds);

		if($xml !== false)
		{
			$redirect = isset($xml['redirect']) ? strval($xml['redirect']) : false;
			$ref      = isset($xml['ref'])      ? strval($xml['ref'])      : false;

			if(isset($xml->XRD))
			{
				$xrd = new yadis_xrd($xml->XRD);

				return $xrd;
			}
		}
		else
		{
			throw new yadis_exception('We dont receive an valid XRDS document');
		}
	}

	public function request($url)
	{
		list($host, $uri) = http::parse_url($url);

		$response = $this->http->request($url, array(

			'GET ' . $uri . ' HTTP/1.1',
			'Host: ' . $host,
			'Accept: application/xrds+xml',

		));

		$last_error = $this->http->get_last_error();

		if(!empty($last_error))
		{
			throw new yadis_exception($last_error);
		}
		else
		{
			return http::parse_response($response);
		}
	}
}