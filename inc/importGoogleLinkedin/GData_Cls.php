<?php
class GData
{
	var $client;
	var $result;
	var $hasToken=false;
	var $resultTitle;
	var $resultNum;
	var $resultId;
	
	public function setClient($client)
	{
		$this->client = $client;
	}
	public function getClient()
	{
		return $this->client;
	}
	public function logOut()
	{
		$php_self = htmlentities(substr($_SERVER['PHP_SELF'],0,strcspn($_SERVER['PHP_SELF'], "\n\r")),ENT_QUOTES);
		Zend_Gdata_AuthSub::AuthSubRevokeToken(unserialize($_SESSION['ACCESS_TOKEN']));
		unset($_SESSION['ACCESS_TOKEN']);
		unset($_SESSION['REQUEST_TOKEN']);
		header('Location: ' . $php_self);
		exit();
	}
	public function checkToken()
	{
		if(isset($_SESSION['cal_token']))
		{
			$this->hasToken = true;
		}
		else
		{
			$this->hasToken = false;
		}
		return $this->hasToken;
	}
	public function setToken($flag)
	{
		$this->hasToken = $flag;
	}
	public function getClientWithAccess($session)
	{
		global $oauthOptions;
		$accessToken = unserialize($session);//decode accestoken
		unset($_SESSION['REQUEST_TOKEN']);	
		$this->client = $accessToken->getHttpClient($oauthOptions);//get client
		return $this->client;
	}
	public function getClientWithRequest($session)
	{
		global $oauthOptions;
		global $consumer;
		
		$_SESSION['ACCESS_TOKEN'] = serialize($consumer->getAccessToken($_GET, unserialize($session)));
		unset($_SESSION['REQUEST_TOKEN']);	
		$accessToken = unserialize($_SESSION['ACCESS_TOKEN']);//decode accestoken
		unset($_SESSION['REQUEST_TOKEN']);	
		$this->client = $accessToken->getHttpClient($oauthOptions);//get client
		return $this->client;
	}
	public function getResultTitle()
	{
		return $this->resultTitle;
	}
	public function getresultId(){
		return $this->resultId;
	}
	public function getResultNum()
	{
		return $this->resultNum;
	}
	public function getResult()
	{
		
		
		$gdata = new Zend_Gdata($this->client);
		$gdata->setMajorProtocolVersion(3);
		// perform query and get result feed
		$scope = "https://www.google.com/m8/feeds/contacts/default/full/?orderby=lastmodified&sortorder=descending";
		
		//$scope="https://www.google.com/m8/feeds/contacts/default/thin";//test
		/*if(isset($_GET['desc']))
		{
			$scope .= "?sortorder=descending";
		}
		else if(isset($_GET['asc']))
		{
			$scope .= "?sortorder=ascending";
			}*/
		$query = new Zend_Gdata_Query($scope);
		
		$feed = $gdata->getFeed($query);
		
		$idXML = simplexml_load_string($feed->id->getXML());
		$this->resultId = $idXML;
		$this->resultTitle = trim(str_replace("'s Contacts",'',$feed->title));
		$this->resultNum = $feed->totalResults;
		$results = array();
		foreach($feed as $entry)
		{
			
			$xml = simplexml_load_string($entry->getXML());
			$obj = new stdClass;
			$str = (string)$entry->getEditLink()->href;
			$pos = strrpos($str,'/');
			$str = substr($str,$pos+1,strlen($str)-$pos);
			$obj->editLink = $str;
			$obj->name = (string) $entry->title;
			$obj->orgName = (string) $xml->organization->orgName;
			
			$obj->orgTitle = (string) $xml->organization->orgTitle; 
			$obj->posAddress = (string)$xml->structuredPostalAddress->formattedAddress[0];
			foreach($xml->im as $im)
			{
				$protocol =  (string)$im['protocol'];
				$pos = strpos($protocol,'#',0);
				$pro_v = substr($protocol,$pos+1,strlen($protocol)-$pos); 
				$pos = strpos((string)$im['address'],'@',0);
				if($pos===false)
				{
					$im_id = (string)$im['address'];
				}
				
				else
				{
					$im_id  = substr((string)$im['address'],0,$pos);
				}
				$obj->im[] = $im_id.'@'.(string)$pro_v;
			}
			foreach ($xml->email as $e)
			{
				$obj->emailAddress[] = (string) $e['address'];
			}
			foreach ($xml->phoneNumber as $p)
			{
				$obj->phoneNumber[] = (string) $p;
			}
			foreach ($xml->website as $w)
			{
				$obj->website[] = (string) $w['href'];
				}	
			$results[] = $obj;
		}
		return $results;
	}
	public function updateContact()
	{
		
	}
	public function addContact($entry, $scope)
	{
		$gdata = new Zend_Gdata($this->client);
		$result = $gdata->insertEntry($entry,$scope);
		return $result;
	}
	public function getGdata($client)
	{
		$gdata = new Zend_Gdata($client);
		$gdata->setMajorProtocolVersion(3);
		return $gdata;
	}
	public function deleteContact($i)
	{
		$this->client->resetParameters();
		$this->client->setHeaders("If-Match: *");
		$gdata = new Zend_Gdata($this->client);
		$gdata->setMajorProtocolVersion(3);
		
		$id = 'http://www.google.com/m8/feeds/contacts/default/full/'.$i;
		
		$var = $gdata->performHttpRequest('DELETE',$id,array('If-Match: *'));
		return $var;
	}
	public function getContactById($id)
	{
		$this->client->resetParameters();
		$gdataO = $this->getGdata($this->client);
		$scope = "https://www.google.com/m8/feeds/contacts/default/full/".$id;
		$contact = $gdataO->performHttpRequest('GET',$scope);
		$contact =  $contact->getBody();
		$contact = simplexml_load_string($contact);
		$child = $contact->children('http://schemas.google.com/g/2005') ;
		$CO = new stdClass;
		//echo var_dump($child);
		$gender='';
		$issendoffer=FALSE;
		foreach($child->extendedProperty as $exp)
		{
			$att_a = $exp->attributes();
			$name = $att_a['name'];
			$value = $att_a['value'];
			if($name=='gender')
			{
				$gender = (string)$value;
				}	
			else if($name=='issendoffer')
			{
				$issendoffer = (bool)$value;
			}
			
		}
		$CO->gender = $gender;
		$CO->issendoffer = $issendoffer;	
		$CO->givenname = $child->name->givenName;
		$CO->familyname = $child->name->familyName;
		$CO->organization = $child->organization->orgName;
		$CO->street = $child->structuredPostalAddress->street;
		$CO->zip = $child->structuredPostalAddress->postcode;
		$CO->city = $child->structuredPostalAddress->city;
		$CO->country = $child->structuredPostalAddress->country;
		$CO->phone = $child->phoneNumber;
		$email = $child->email->attributes();
		$email = $email['address'];
		$CO->email = $email;
		$CO->note = $contact->content;
		return $CO;	
	}
	public function composeContact($firstname,$lastname,$note,$email,$phone,$city,$street,$zip,$country,$company,$issendoffer,$gender)
	{
		$entry = 
		"
		<atom:entry xmlns:atom='http://www.w3.org/2005/Atom'
		xmlns:gd='http://schemas.google.com/g/2005'>
		<atom:category scheme='http://schemas.google.com/g/2005#kind'
		term='http://schemas.google.com/contact/2008#contact' />
		<gd:name>
		<gd:givenName>
		".$firstname."
		</gd:givenName>
		<gd:familyName>
		".$lastname."
		</gd:familyName>
		<gd:fullName>
		".$firstname." ".$lastname."
		</gd:fullName>
		</gd:name>
		<atom:content type='text'>
		".$note."
		</atom:content>
		<gd:email rel='http://schemas.google.com/g/2005#work'
		primary='true'
		address='".$email."' displayName='".$firstname." ".$lastname."' />
		<gd:phoneNumber rel='http://schemas.google.com/g/2005#work'
		primary='true'>
		".$phone."
		</gd:phoneNumber>
		<gd:structuredPostalAddress
		rel='http://schemas.google.com/g/2005#work'
		primary='true'>
		<gd:city>
		".$city."
		</gd:city>
		<gd:street>
		".$street."
		</gd:street>
		<gd:postcode>
		".$zip."
		</gd:postcode>
		<gd:country>
		".$country."
		</gd:country>
		<gd:formattedAddress>
		$street $city $country
		</gd:formattedAddress>
		</gd:structuredPostalAddress>";
		if($company!=NULL)
		{
			$entry.="
			<gd:organization rel='http://schemas.google.com/g/2005#work'  primary='true'>
			<gd:orgName>
			".$company."
			</gd:orgName>
			<gd:orgTitle>
			".$company."
			</gd:orgTitle>
			</gd:organization>
			";
		}
		$entry.="
		<gd:extendedProperty name='issendoffer' value='".$issendoffer."' />
		<gd:extendedProperty name='gender' value='".$gender."' />
		
		</atom:entry>
		";
		return $entry;
	}
}