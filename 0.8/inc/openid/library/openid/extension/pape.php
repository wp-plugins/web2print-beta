<?php
/*
 *  $Id: pape.php 120 2009-12-19 14:16:48Z k42b3.x $
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
 * openid_extension_pape
 *
 * @author     Christoph Kappestein <k42b3.x@gmail.com>
 * @license    http://www.gnu.org/licenses/gpl.html GPLv3
 * @link       http://phpsx.org
 * @version    $Revision: 120 $
 */
class openid_extension_pape implements openid_iextension
{
	private $ns = 'http://specs.openid.net/extensions/pape/1.0';

	public static $policies = array(

		'phishing-resistant'    => 'http://schemas.openid.net/pape/policies/2007/06/phishing-resistant',
		'multi-factor'          => 'http://schemas.openid.net/pape/policies/2007/06/multi-factor',
		'multi-factor-physical' => 'http://schemas.openid.net/pape/policies/2007/06/multi-factor-physical',

	);

	private $max_auth_age            = false;
	private $preferred_auth_policies = array();

	public function __construct(array $preferred_auth_policies, $max_auth_age = false)
	{
		foreach($preferred_auth_policies as $policy)
		{
			$this->add_preferred_auth_policies($policy);
		}

		if($max_auth_age !== false)
		{
			$this->set_max_auth_age($max_auth_age);
		}
	}

	public function set_max_auth_age($age)
	{
		$this->max_auth_age = intval($age);
	}

	public function add_preferred_auth_policies($policy)
	{
		if(isset(self::$policies[$policy]))
		{
			$this->preferred_auth_policies[] = self::$policies[$policy];
		}
		else
		{
			throw new psx_net_openid_exception('invalid auth policy ' . $policy);
		}
	}

	public function get_params()
	{
		$params = array();

		$params['openid.ns.pape'] = $this->ns;

		if($this->max_auth_age !== false)
		{
			$params['openid.pape.max_auth_age'] = intval($this->max_auth_age);
		}

		if(!empty($this->preferred_auth_policies))
		{
			$params['openid.pape.preferred_auth_policies'] = implode(' ', $this->preferred_auth_policies);
		}
		else
		{
			$params['openid.pape.preferred_auth_policies'] = '';
		}

		return $params;
	}

	public function get_ns()
	{
		return $this->ns;
	}
}