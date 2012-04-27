<?php
/*
 *  $Id: sreg.php 115 2009-12-16 22:49:16Z k42b3.x $
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
 * openid_extension_sreg
 *
 * @author     Christoph Kappestein <k42b3.x@gmail.com>
 * @license    http://www.gnu.org/licenses/gpl.html GPLv3
 * @link       http://phpsx.org
 * @version    $Revision: 115 $
 */
class openid_extension_sreg implements openid_iextension
{
	private $ns = 'http://openid.net/extensions/sreg/1.1';

	public static $fields = array('nickname', 'email', 'fullname', 'dob', 'gender', 'postcode', 'country', 'language', 'timezone');

	private $required   = array();
	private $optional   = array();
	private $policy_url = '';

	public function __construct(array $required_fields = array(), array $optional_fields = array(), $policy_url = false)
	{
		foreach($required_fields as $field)
		{
			$this->add_required_field($field);
		}

		foreach($optional_fields as $field)
		{
			$this->add_optional_field($field);
		}

		if($policy_url !== false)
		{
			$this->set_policy_url($policy_url);
		}
	}

	public function add_required_field($field)
	{
		$this->required[] = $field;
	}

	public function add_optional_field($field)
	{
		$this->optional[] = $field;
	}

	public function set_policy_url($url)
	{
		$this->policy_url = $url;
	}

	public function get_params()
	{
		$params = array();

		$params['openid.ns.sreg'] = $this->ns;

		if(!empty($this->required))
		{
			$params['openid.sreg.required'] = implode(',', $this->required);
		}

		if(!empty($this->optional))
		{
			$params['openid.sreg.optional'] = implode(',', $this->optional);
		}

		if(!empty($this->policy_url))
		{
			$params['openid.sreg.policy_url'] = $this->policy_url;
		}

		return $params;
	}

	public function get_ns()
	{
		return $this->ns;
	}
}