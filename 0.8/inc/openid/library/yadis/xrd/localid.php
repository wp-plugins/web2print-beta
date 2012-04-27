<?php
/*
 *  $Id: localid.php 120 2009-12-19 14:16:48Z k42b3.x $
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
 * yadis_xrd_localid
 *
 * @author     Christoph Kappestein <k42b3.x@gmail.com>
 * @license    http://www.gnu.org/licenses/gpl.html GPLv3
 * @link       http://phpsx.org
 * @version    $Revision: 120 $
 */
class yadis_xrd_localid
{
	public $priority;

	private $value;

	private $raw;

	public function __construct(SimpleXMLElement $localid)
	{
		$this->priority = isset($localid['priority']) ? intval($localid['priority']) : 0;
		$this->value    = strval($localid);

		$this->raw      = $localid;
	}

	public function get_value()
	{
		return $this->value;
	}

	public function get_raw()
	{
		return $this->raw;
	}


	public function __toString()
	{
		return $this->get_raw();
	}
}