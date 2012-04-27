<?php
/*
 *  $Id: ax.php 115 2009-12-16 22:49:16Z k42b3.x $
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
 * openid_extension_ax
 *
 * @author     Christoph Kappestein <k42b3.x@gmail.com>
 * @license    http://www.gnu.org/licenses/gpl.html GPLv3
 * @link       http://phpsx.org
 * @version    $Revision: 115 $
 */
class openid_extension_ax implements openid_iextension
{
	private $ns = 'http://openid.net/srv/ax/1.0';

	private $required     = array();
	private $optional     = array();
	private $if_available = array();

	public function __construct(array $required = array(), array $if_available = array())
	{
		foreach($required as $name => $ns)
		{
			$this->add_required($name, $ns);
		}

		foreach($if_available as $name => $ns)
		{
			$this->add_if_available($name, $ns);
		}
	}

	/**
	 * add_attribute
	 *
	 * Adds an required attribute that you want fetch from an openid request.
	 *
	 * @see http://www.axschema.org/types/
	 * @param string $name
	 * @param string $ns
	 * @return void
	 */
	public function add_required($name, $ns)
	{
		$this->required[$name] = $ns;
	}

	public function add_if_available($name, $ns)
	{
		$this->if_available[$name] = $ns;
	}

	public function get_params()
	{
		$params = array();

		$params['openid.ns.ax'] = $this->ns;

		$params['openid.ax.mode'] = 'fetch_request';

		if(!empty($this->required))
		{
			$params['openid.ax.required'] = implode(',', array_keys($this->required));

			foreach($this->required as $name => $ns)
			{
				$params['openid.ax.type.' . $name] = $ns;
			}
		}

		if(!empty($this->if_available))
		{
			$params['openid.ax.if_available'] = implode(',', array_keys($this->if_available));

			foreach($this->if_available as $name => $ns)
			{
				$params['openid.ax.type.' . $name] = $ns;
			}
		}

		return $params;
	}

	public function get_ns()
	{
		return $this->ns;
	}
}