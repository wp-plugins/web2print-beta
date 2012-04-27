<?php
/*
 *  $Id: http.php 123 2009-12-19 16:39:36Z k42b3.x $
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
 * http
 *
 * @author     Christoph Kappestein <k42b3.x@gmail.com>
 * @license    http://www.gnu.org/licenses/gpl.html GPLv3
 * @link       http://phpsx.org
 * @version    $Revision: 123 $
 */
class http
{
	public static $new_line = "\r\n";

	private $last_error;
	private $request;
	private $response;

	private $http_codes  = array(

		200 => 'OK',
		201 => 'Created',
		202 => 'Accepted',
		203 => 'Non-Authoritative Information',
		204 => 'No Content',
		205 => 'Reset Content',
		206 => 'Partial Content',
		300 => 'Multiple Choices',
		301 => 'Moved Permanently',
		302 => 'Found',
		303 => 'See Other',
		304 => 'Not Modified',
		305 => 'Use Proxy',
		307 => 'Temporary Redirect',
		400 => 'Bad Request',
		401 => 'Unauthorized',
		402 => 'Payment Required',
		403 => 'Forbidden',
		404 => 'Not Found',
		405 => 'Method Not Allowed',
		406 => 'Not Acceptable',
		407 => 'Proxy Authentication Required',
		408 => 'Request Timeout',
		409 => 'Conflict',
		410 => 'Gone',
		411 => 'Length Required',
		412 => 'Precondition Failed',
		413 => 'Request Entity Too Large',
		414 => 'Request-URI Too Long',
		415 => 'Unsupported Media Type',
		416 => 'Requested Range Not Satisfiable',
		417 => 'Expectation Failed',
		500 => 'Internal Server Error',
		501 => 'Not Implemented',
		502 => 'Bad Gateway',
		503 => 'Service Unavailable',
		504 => 'Gateway Timeout',
		505 => 'HTTP Version Not Supported'

	);

	public function __construct()
	{
		$this->set_handler();
	}

	public function request($url, array $header = array(), $body = false, $callback = false)
	{
		$response = $this->handler->request($url, $header, $body, $callback);

		$this->last_error = $this->handler->get_last_error();
		$this->request    = $this->handler->get_request();
		$this->response   = $this->handler->get_response();

		return $response;
	}

	public function get($url)
	{
		list($host, $uri) = self::parse_url($url);

		$response = $this->request($url, array(

			'GET ' . $uri . ' HTTP/1.1',
			'Host: ' . $host,
			'Accept: */*',

		));

		return self::parse_response($response);
	}

	public function post($url, $data)
	{
		list($host, $uri) = self::parse_url($url);

		$body = is_array($data) ? http_build_query($data, '', '&') : strval($data);

		$response = $this->request($url, array(

			'POST ' . $uri . ' HTTP/1.1',
			'Host: ' . $host,
			'Accept: */*',
			'Content-type: application/x-www-form-urlencoded',
			'Content-length: ' . strlen($body),

		), $body);

		return self::parse_response($response);
	}

	public function put($url, $data)
	{
		list($host, $uri) = self::parse_url($url);

		$body = is_array($data) ? http_build_query($data, '', '&') : strval($data);

		$response = $this->request($url, array(

			'POST ' . $uri . ' HTTP/1.1',
			'Host: ' . $host,
			'Accept: */*',
			'Content-type: application/x-www-form-urlencoded',
			'Content-length: ' . strlen($body),
			'X-HTTP-Method-Override: PUT',

		), $body);

		return self::parse_response($response);
	}

	public function delete($url)
	{
		list($host, $uri) = self::parse_url($url);

		$response = $this->request($url, array(

			'GET ' . $uri . ' HTTP/1.1',
			'Host: ' . $host,
			'Accept: */*',
			'X-HTTP-Method-Override: DELETE',

		));

		return self::parse_response($response);
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

	public function get_http_codes()
	{
		return $this->http_codes;
	}

	public static function parse_response($response)
	{
		list($header, $body) = self::split_response($response);

		list($scheme, $code, $message) = self::get_status($response);

		return array(

			'scheme'  => $scheme,
			'code'    => $code,
			'message' => $message,
			'header'  => self::header_to_array($header),
			'body'    => $body,

		);
	}

	public static function parse_url($url)
	{
		$u = parse_url($url);

		$host  = false;
		$uri   = false;

		if(isset($u['host']))
		{
			$host = $u['host'];
		}
		else
		{
			throw new http_exception('couldnt get host');
		}

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

		return array($host, $uri);
	}

	public static function split_response($response)
	{
		$pos    = strpos($response, self::$new_line . self::$new_line);
		$header = substr($response, 0, $pos);
		$body   = trim(substr($response, $pos + 1));

		return array($header, $body);
	}

	public static function header_to_array($header)
	{
		$lines  = explode(self::$new_line, $header);
		$header = array();

		foreach($lines as $line)
		{
			$parts = explode(':', $line, 2);

			if(isset($parts[0]) && isset($parts[1]))
			{
				$key   = strtolower(trim($parts[0]));
				$value = trim($parts[1]);

				$header[$key] = $value;
			}
		}

		return $header;
	}

	public static function get_status($response)
	{
		$line = self::get_status_line($response);

		if($line !== false)
		{
			$parts = explode(' ', $line, 3);

			if(isset($parts[0]) && isset($parts[1]) && isset($parts[2]))
			{
				$scheme  = strval($parts[0]);
				$code    = intval($parts[1]);
				$message = strval($parts[2]);

				return array($scheme, $code, $message);
			}
			else
			{
				throw new http_exception('invalid status line format');
			}
		}
		else
		{
			throw new http_exception('couldnt find status line');
		}
	}

	private static function get_status_line($request)
	{
		$pos = strpos($request, self::$new_line);

		if($pos !== false)
		{
			return substr($request, 0, $pos);
		}
		else
		{
			return false;
		}
	}

	private function set_handler()
	{
		$handler = 'curl';

		$class = 'http_handler_' . $handler;

		if($handler !== false && class_exists($class, true))
		{
			$this->handler = new $class();
		}
		else
		{
			throw new http_exception('no http handler was set');
		}
	}
}