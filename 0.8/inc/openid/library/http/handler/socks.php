<?php
/*
 *  $Id: socks.php 123 2009-12-19 16:39:36Z k42b3.x $
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
 * http_handler_socks
 *
 * @author     Christoph Kappestein <k42b3.x@gmail.com>
 * @license    http://www.gnu.org/licenses/gpl.html GPLv3
 * @link       http://phpsx.org
 * @version    $Revision: 123 $
 */
class http_handler_socks implements http_ihandler
{
	private $last_error;
	private $request;
	private $response;

	public function request($url, array $header = array(), $body = false, $ssl = false, $callback = false)
	{
		list($host, $port, $uri) = self::parse_url($url);

		$handle = fsockopen($host, $port, $errno, $errstr);

		if($handle !== false)
		{
			if(!empty($header))
			{
				$header = self::array_to_header($header);
			}
			else
			{
				throw new psx_http_exception('you must set an http header');
			}

			if($ssl === true)
			{
				throw new psx_http_exception('socks doesnt support ssl');
			}

			if(!empty($callback))
			{
				call_user_func_array($callback, array($handle, $url, $header, $body));
			}

			$request = !empty($body) ? $header . $body : $header;

			if(!fwrite($handle, $request))
			{
				throw new psx_http_exception('couldnt write to stream');
			}

			fflush($handle);


			$response = '';

			while(true)
			{
				if(!feof($handle))
				{
					$buf = fread($handle, 1024);

					if(!empty($buf))
					{
						$response.= $buf;

						continue;
					}
					else
					{
						break;
					}
				}
				else
				{
					break;
				}
			}

			fclose($handle);


			$this->last_error = false;
			$this->request    = $request;
			$this->response   = $response;

			return $response;
		}
		else
		{
			$this->last_error = $errstr;
			$this->request    = false;
			$this->response   = false;

			return false;
		}
	}

	public function get_last_error()
	{
		return $this->last_error;
	}

	public function get_request()
	{
		return $this->request;
	}

	public function get_response()
	{
		return $this->response;
	}

	private static function parse_url($url)
	{
		$parts = parse_url($url);

		if(isset($parts['scheme']) && isset($parts['host']))
		{
			$scheme = $parts['scheme'];
			$host   = $parts['host'];
			$port   = isset($parts['port']) ? $parts['port'] : getservbyname($parts['scheme'], 'tcp');

			if(isset($u['path']) && isset($u['query']))
			{
				$uri = $u['path'] . '?' . $u['query'];
			}
			elseif(isset($u['path']) && !isset($u['query']))
			{
				$uri = $u['path'];
			}
			else
			{
				$uri = '/';
			}

			return array($host, $port, $uri);
		}
		else
		{
			throw new psx_http_exception('no scheme or host was set');
		}
	}

	private static function array_to_header(array $header)
	{
		$header = implode(psx_http::$new_line, $header);

		return $header . psx_http::$new_line . psx_http::$new_line;
	}
}