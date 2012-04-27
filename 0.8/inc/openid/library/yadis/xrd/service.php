<?php
/*
 *  $Id: service.php 117 2009-12-17 15:28:10Z k42b3.x $
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
 * yadis_xrd_service
 *
 * @author     Christoph Kappestein <k42b3.x@gmail.com>
 * @license    http://www.gnu.org/licenses/gpl.html GPLv3
 * @link       http://phpsx.org
 * @version    $Revision: 117 $
 */
class yadis_xrd_service implements ArrayAccess
{
	public $priority;

	private $providerid = array();
	private $type       = array();
	private $path       = array();
	private $mediatype  = array();
	private $uri        = array();
	private $redirect   = array();
	private $ref        = array();
	private $localid    = array();

	private $raw;

	public function __construct(SimpleXMLElement $service)
	{
		$this->priority = isset($service['priority']) ? intval($service['priority']) : 0;
		$this->raw      = $service;

		foreach($service->children() as $child)
		{
			$name = strtolower($child->getName());

			switch($name)
			{
				case 'uri':
				case 'localid':
				case 'providerid':
				case 'mediatype':
				case 'path':
				case 'redirect':
				case 'ref':

					$this->$name = strval($child);

					break;

				case 'type':

					array_push($this->$name, strval($child));

					break;
			}
		}
	}

	public function get_providerid()
	{
		return $this->providerid;
	}

	public function get_type()
	{
		return $this->type;
	}

	public function get_path()
	{
		return $this->path;
	}

	public function get_mediatype()
	{
		return $this->mediatype;
	}

	public function get_uri()
	{
		return $this->uri;
	}

	public function get_redirect()
	{
		return $this->redirect;
	}

	public function get_ref()
	{
		return $this->ref;
	}

	public function get_localid()
	{
		return $this->localid;
	}

	public function get_raw()
	{
		return $this->raw;
	}


	public function offsetExists($offset)
	{
		$offset = strtolower($offset);

		return isset($this->$offset);
	}

	public function offsetGet($offset)
	{
		$offset = strtolower($offset);

		return isset($this->$offset) ? $this->$offset : null;
	}

	public function offsetSet($offset, $value)
	{
	}

	public function offsetUnset($offset)
	{
	}


	public function __toString()
	{
		return $this->get_raw();
	}
}