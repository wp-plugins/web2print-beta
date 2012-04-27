<?php
/*
 *  $Id: xrd.php 117 2009-12-17 15:28:10Z k42b3.x $
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
 * yadis_xrd
 *
 * @author     Christoph Kappestein <k42b3.x@gmail.com>
 * @license    http://www.gnu.org/licenses/gpl.html GPLv3
 * @link       http://phpsx.org
 * @version    $Revision: 117 $
 */
class yadis_xrd implements ArrayAccess
{
	public static $verify_attr_group          = array('absent', 'off', 'verified', 'failed');
	public static $selection_attr_group_match = array('default', 'any', 'non-null', 'null');
	public static $append_attr_group_append   = array('none', 'local', 'authority', 'path', 'query', 'qxri');

	public $query;
	public $providerid;
	public $redirect;
	public $ref;
	public $equivid;
	public $canonicalid;
	public $canonicalequivid;
	public $path;
	public $mediatype;
	public $uri;

	private $type         = array();
	private $status       = array();
	private $serverstatus = array();
	private $expires      = array();
	private $localid      = array();
	private $service      = array();

	private $raw;

	public function __construct(SimpleXMLElement $xrd)
	{
		$this->raw = $xrd;

		foreach($xrd->children() as $child)
		{
			$name = strtolower($child->getName());

			switch($name)
			{
				case 'query':
				case 'providerid':
				case 'redirect':
				case 'ref':
				case 'equivid':
				case 'canonicalid':
				case 'canonicalequivid':
				case 'path':
				case 'mediatype':
				case 'uri':

					$this->$name = strval($child);

					break;

				case 'type':
				case 'status':
				case 'serverstatus':
				case 'expires':
				case 'localid':
				case 'service':

					$class = 'yadis_xrd_' . $name;

					array_push($this->$name, new $class($child));

					break;
			}
		}
	}

	public function get_type()
	{
		return $this->type;
	}

	public function get_status()
	{
		return $this->status;
	}

	public function get_serverstatus()
	{
		return $this->serverstatus;
	}

	public function get_localid()
	{
		return $this->localid;
	}

	public function get_service()
	{
		return $this->service;
	}

	public function get_raw()
	{
		return $this->raw;
	}


	public function sort_service_priority()
	{
		# sort services after priority
		$order = array();

		foreach($services as $k => $service)
		{
			$order[$k] = $service['priority'];
		}

		array_multisort($order, SORT_DESC, $services);
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