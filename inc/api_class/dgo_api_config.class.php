<?php
	/*
	 * Web 2 Print API Connection SDK Config
	 * -------------------------------------
	 * 
	 * @author slierka
	 * 
	 * last changed: 08/05/2011
	 * 
	 * */	
	class DgoW2PApiConfig {
		//credentials
		public $user = ''; //api key
		//public $user = 'ef6b991f-ff3c-473b-95de-da45d598bbf6'; //api key
		public $pass = ''; //api secret
		//public $pass = 'prinuprefe7'; //api secret
		
		//w2p
		public $isDebug = true; //debug means, no order will be placed
		public $isDev = true; //dev means, order will be placed, but DEV environment will be used
		//public $portalNameSpace = "nhain"; //namespace of heading web portal
		//public $portalNameSpace = "druckereiplus"; //namespace of heading web portal
		public $portalUri = "https://api.delivergo.com/portal{0}/{1}/api/";
		public $language = "VI"; //user language
		public $currency = "VND"; //user currency
		public $country = "VN"; //user currency
		
		public function setApiKey($username){
			$this->user = $username;
		}
		
		public function setApiSecret($password){
			$this->pass = $password;
		}
	}
?>