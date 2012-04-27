<?php
/*
 *  $Id: curl.php 123 2009-12-19 16:39:36Z k42b3.x $
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
 * http_handler_curl
 *
 * @author     Christoph Kappestein <k42b3.x@gmail.com>
 * @license    http://www.gnu.org/licenses/gpl.html GPLv3
 * @link       http://phpsx.org
 * @version    $Revision: 123 $
 */
class http_handler_curl implements http_ihandler
{
	private $last_error;
	private $request;
	private $response;

	public function request($url, array $header = array(), $body = false, $ssl = false, $callback = false)
	{
		$handle = curl_init($url);

		curl_setopt($handle, CURLOPT_HEADER, true);
		curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($handle, CURLINFO_HEADER_OUT, true);


		if(!empty($header))
		{
			curl_setopt($handle, CURLOPT_HTTPHEADER, $header);
		}

		if(!empty($body))
		{
			curl_setopt($handle, CURLOPT_POST, true);
			curl_setopt($handle, CURLOPT_POSTFIELDS, $body);
		}

		if($ssl === true)
		{
			# absolute path to ca bundle
			$path = 'D:\xampp\htdocs\projects\psx\lib\psx\http\ca-bundle.pem';

			curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, true);
			curl_setopt($handle, CURLOPT_CAINFO, $path);
		}
		else
		{
			curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
		}

		if(!empty($callback))
		{
			call_user_func_array($callback, array($handle, $url, $header, $body));
		}

		$response = curl_exec($handle);


		if(!curl_errno($handle))
		{
			$this->last_error = false;
			$this->request    = curl_getinfo($handle, CURLINFO_HEADER_OUT);
			$this->response   = $response;
		}
		else
		{
			$this->last_error = curl_error($handle);
			$this->request    = false;
			$this->response   = false;
		}

		curl_close($handle);


		return $response;
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
}