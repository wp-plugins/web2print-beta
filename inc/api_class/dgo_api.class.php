<?php
	/*
	 * Web 2 Print API Connection SDK
	 * ------------------------------
	 * 
	 * - connect to our API in
	 *   use of PHP + CURL
	 * 
	 * @author slierka
	 * 
	 * last changed: 07/19/2011
	 * 
	 * */

	include_once 'dgo_api_config.class.php';
	include_once 'dgo_api_enum.inc.php';
	include_once dirname(__FILE__).'/../cache.php';
	
	class DgoApiConnectionW2P extends DgoW2PApiConfig{
		//private vars - can just be changed by set methods
		private $portalURI;
		private $config;
		private $request;
		private $article;
		private $material;
		private $identifier;

		//ctor
		public function __construct(){ 
			//constant vars
			
			$this->portalURI = $this->portalUri;
			
			//dynamic vars
			$this->material = DgoEnumMaterial::WHITEPORCELAIN;
			$this->identifier = DgoEnumArticleIdentifier::DYNCUP;
			$this->request = $this->_getNewRequest($this->language, $this->currency);
			//$this->article = $this->_getNewArticle();

			//add a default article to request object
			//$this->AddNewArticleToRequest($this->article);
			
			//create basepath of request uri
			//if dev mode is turned on, use dev uri
			if($this->isDev == true) {				
				$this->portalURI = preg_replace("/\{0\}/", ".dev", $this->portalURI);	
			} else {
				$this->portalURI = preg_replace("/\{0\}/", "", $this->portalURI);
			}
			
			//insert the right portal namespace
			//(could be set in config file)
			$this->portalURI = preg_replace("/\{1\}/", W2PConfig::$globalPortal, $this->portalURI);
		}
		
		//===================== public functions below =========================
		
		public function setMaterial($material){
			$this->material = $material;
		}
		
		public function setIdentifer($identifier){
			$this->identifier = $identifier;
		}
		
		//adds another article json object
		//to request object
		public function AddNewArticleToRequest($article){
			array_push($this->request["Order"]["Article"], $article);	
					
		}
		
		//returns a new fresh article json
		//object (wrapper for private function)
		public function GetNewArticle($matchcode, $identifier, $availableArticle, $material = null){
			return $this->_getNewArticle($matchcode, $identifier, $availableArticle, $material);
		}
		
		public function SetNewArticle($matchcode, $identifier, $availableArticle, $material = null){
			$this->article = $this->_getNewArticle($matchcode, $identifier, $availableArticle, $material);
		}
		
		//write a new request object to the class member
		//take care, that you're using the right structure!
		public function SetRequest($request){
			$this->request = $request;
		}
		
		//get the whole request object
		//can be used to manipulate values
		//and give it back via "SetRequest"
		public function GetRequest(){
			return $this->request;
		}
		
		public function DoApiGetRequest($mode, $languageToken = null, $cacheKey = null, $portalUri = null, $expire = 604800) {
			
			$oldCacheKey = $cacheKey; 

			$cacheKey = md5($cacheKey).'.php';

			$filename = dirname(__FILE__).'/../'.CACHE_DIR.'/'.$cacheKey;
			
			if(Dgo_checkdir($cacheKey) == false){				
				$url = $portalUri == null ? $this->portalURI.$mode : $portalUri.$mode;	
				
				if($languageToken != null){
					$url .= "/".$languageToken;
				}	
				
				//init curl and set required options
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json; charset=utf-8","Accept: application/json")); 
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
				curl_setopt($ch, CURLOPT_USERPWD, $this->user.':'.$this->pass); 
				curl_setopt($ch, CURLOPT_POST, false);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				
				//execute request
				$result = curl_exec($ch);
				
				//on error, write error to result
				if($result === false) {
				    $result = curl_error($ch);
				}
				
				if($oldCacheKey != null){
					$expireObj = serialize(array("expire" => time() + $expire));
				
					//write to cache
					Dgo_file_write($filename, $expireObj."---".serialize($result), w);
				}
							
				//close curl
				curl_close($ch);
				
				
			}else{
								
				$result = Dgo_read_serialize_file($filename);	
				
				if(time() < $result['expire']){
					$result = Dgo_get_data_from_cache($filename);
				}else{
					@unlink($filename);
					
					$url = $portalUri == null ? $this->portalURI.$mode : $portalUri.$mode;	
					
					if($languageToken != null){
						$url .= "/".$languageToken;
					}
					
					//init curl and set required options
					$ch = curl_init();
					curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json; charset=utf-8","Accept: application/json")); 
					curl_setopt($ch, CURLOPT_URL, $url);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
					curl_setopt($ch, CURLOPT_USERPWD, $this->user.':'.$this->pass); 
					curl_setopt($ch, CURLOPT_POST, false);
					curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
					
					//execute request
					$result = curl_exec($ch);
					
					//on error, write error to result
					if($result === false) {
						$result = curl_error($ch);
					}
					
					if($oldCacheKey != null){
						$expireObj = serialize(array("expire" => time() + $expire));
					
						//write to cache
						Dgo_file_write($filename, $expireObj."---".serialize($result), w);
					}
								
					//close curl
					curl_close($ch);
				}
				
				
			}
			
			return $result;
		}
		
		//perform API call and send required
		//json data using curl
		public function DoApiRequest($mode, $portal = null){
			
			$url = $portal == null ? $this->portalURI.$mode : $portal.$mode;
		
			//init curl and set required options
			
				$ch = curl_init();
				
				curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json; charset=utf-8","Accept: application/json")); 
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
				curl_setopt($ch, CURLOPT_USERPWD, $this->user.':'.$this->pass); 
				curl_setopt($ch, CURLOPT_POST, false);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				
				//execute request
				$result = curl_exec($ch);
			
			//on error, write error to result
			if($result === false) {
			    $result = curl_error($ch);
			}

			//close curl
			curl_close($ch);
			
			return $result;
		}
		
		//generate a random unique identifier
		public function GetNewGuid($bUseHyphen){
			//initialize randommeter
			mt_srand((double)microtime() * 10000);//optional for php 4.2.0 and up.
	        $charid = strtoupper(md5(uniqid(rand(), true)));
	        $bUseHyphen == true ? $hyphen = chr(45) : $hyphen = "";//use "-" char as hyphen. if not wanted use ""
	        $uuid =  substr($charid, 0, 8).$hyphen
	                .substr($charid, 8, 4).$hyphen
	                .substr($charid,12, 4).$hyphen
	                .substr($charid,16, 4).$hyphen
	                .substr($charid,20,12);
	        return $uuid;
		}
		
		//===================== private functions below =========================
		
		//returns a new "fresh" article
		//json structure
		private function _getNewArticle($matchcode, $identifier, $availableArticle, $material = null) {
			
			$jsonArticle = "";
			
			$articleDefaults = array(
								"Poster" => array(
																"FabricationType" => "Plot",
																"PrintingMethod" => "OneOff",
																"Run" => 1
																),								
								"BusinessCard" => array(
																"FabricationType" => null,
																"PrintingMethod" => "GangRun",
																"Run" => 125
																),								
								"Stamp" => array(
																"FabricationType" => "LaserGravure",
																"PrintingMethod" => "OneOff",
																"Run" => 1
																),								
								"Portrait" => array(
																"FabricationType" => null,
																"PrintingMethod" => "OneOff",
																"Run" => 1
																),								
								"Brochure" => array(
																"FabricationType" => "Offset",
																"PrintingMethod" => "OneOff",
																"Run" => 10
																),								
								"LetterPaper" => array(
																"FabricationType" => "Offset",
																"PrintingMethod" => "OneOff",
																"Run" => 10
																),								
								"Crystal" => array(
																"FabricationType" => "LaserGravure",
																"PrintingMethod" => "OneOff",
																"Run" => 1
																),								
								"Button" => array(
																"FabricationType" => "Plot",
																"PrintingMethod" => "OneOff",
																"Run" => 1
																),								
								"PvcBanner" => array(
																"FabricationType" => "Digital",
																"PrintingMethod" => "OneOff",
																"Run" => 1
																),								
								"AluDibond" => array(
																"FabricationType" => "Plot",
																"PrintingMethod" => "OneOff",
																"Run" => 1
																)								
									);
			
			$matchcode = explode("/", $matchcode);
			for($i = 0;$i < count($availableArticle);$i++){				
												
				if(is_array($availableArticle[$i]) == true){
					$articleMatchcode = explode("/", $availableArticle[$i]['Matchcode']);						
					for($k = 0; $k < count($availableArticle[$i]['Group']); $k++){	
						if($availableArticle[$i]['Group'][$k]->{'Identifier'} == $identifier && $articleMatchcode[0] == $matchcode[0]){
							
							if(isset($articleDefaults[$matchcode[0]])){								
								$jsonArticle = '{
									            "Amount":1,
									            "InternalNote": null,
									            "FabricationType":"'.$articleDefaults[$matchcode[0]]['FabricationType'].'",
									            "Identifier": "'.$identifier.'",
									            "Material": "'.$material.'",
									            "NumberColorsBack": '.$availableArticle[$i]['Group'][$k]->{'NumberColorsBack'}.',
									            "NumberColorsFront": '.$availableArticle[$i]['Group'][$k]->{'NumberColorsFront'}.',
									            "PageLengthOpen": '.$availableArticle[$i]['Group'][$k]->{'PageLengthOpen'}.',
									            "PageWidthOpen": '.$availableArticle[$i]['Group'][$k]->{'PageWidthOpen'}.',';
								
								if($availableArticle[$i]['Group'][$k]->{'PageDepthOpen'} != ""){
									$jsonArticle .= '
													"PageDepthOpen": '.$availableArticle[$i]['Group'][$k]->{'PageDepthOpen'}.',';
								}
								
								$jsonArticle .= '
												"Payment":{
									               "Type": "CIA"
									            },
									            "PriceType": "Standard",
									            "PrintingMethod": "'.$articleDefaults[$matchcode[0]]['PrintingMethod'].'",
									            "Run": '.$articleDefaults[$matchcode[0]]['Run'].'
									         }';
							}else{
								$jsonArticle = '{
									            "Amount": 1,
									            "InternalNote": null,
									            "FabricationType": null,
									            "Identifier": "'.$identifier.'",
									            "Material": "",
									            "NumberColorsBack": '.$availableArticle[$i]['Group'][$k]->{'NumberColorsBack'}.',
									            "NumberColorsFront": '.$availableArticle[$i]['Group'][$k]->{'NumberColorsFront'}.',
									            "PageLengthOpen": '.$availableArticle[$i]['Group'][$k]->{'PageLengthOpen'}.',
									            "PageWidthOpen": '.$availableArticle[$i]['Group'][$k]->{'PageWidthOpen'}.',';
								
								if($availableArticle[$i]['Group'][$k]->{'PageDepthOpen'} != ""){
									$jsonArticle .= '
													"PageDepthOpen": '.$availableArticle[$i]['Group'][$k]->{'PageDepthOpen'}.',';
								}
								
								$jsonArticle .= '
												"Payment":{
									               "Type": "CIA"
									            },
									            "PriceType": "Standard",
									            "Run": 1				            
									         }';
							}
							
						}						
					}
					
				}else{
					$articleMatchcode = explode("/", $availableArticle[$i]->{'Matchcode'});
					if($availableArticle[$i]->{'Identifier'} == $identifier && $articleMatchcode[0] == $matchcode[0]){
						if(isset($articleDefaults[$articleMatchcode[0]])){
							$jsonArticle = '{
								            "Amount":1,
								            "InternalNote": null,
								            "FabricationType":"'.$articleDefaults[$articleMatchcode[0]]['FabricationType'].'",
								            "Identifier": "'.$identifier.'",
								            "Material": "'.$material.'",
								            "NumberColorsBack": '.$availableArticle[$i]->{'NumberColorsBack'}.',
								            "NumberColorsFront": '.$availableArticle[$i]->{'NumberColorsFront'}.',
								            "PageLengthOpen": '.$availableArticle[$i]->{'PageLengthOpen'}.',
								            "PageWidthOpen": '.$availableArticle[$i]->{'PageWidthOpen'}.',';
							
							if($availableArticle[$i]->{'PageDepthOpen'} != ""){
								$jsonArticle .= '
												"PageDepthOpen": '.$availableArticle[$i]->{'PageDepthOpen'}.',';
							}
							
							$jsonArticle .= '
											"Payment":{
								               "Type": "CIA"
								            },
								            "PriceType": "Standard",
								            "PrintingMethod": "'.$articleDefaults[$articleMatchcode[0]]['PrintingMethod'].'",
								            "Run": '.$articleDefaults[$articleMatchcode[0]]['Run'].'
								         }';
						}else{
							$jsonArticle = '{
								            "Amount": 1,
								            "InternalNote": null,
								            "FabricationType": null,
								            "Identifier": "'.$identifier.'",
								            "Material": "",
								            "NumberColorsBack": '.$availableArticle[$i]->{'NumberColorsBack'}.',
								            "NumberColorsFront": '.$availableArticle[$i]->{'NumberColorsFront'}.',
								            "PageLengthOpen": '.$availableArticle[$i]->{'PageLengthOpen'}.',
								            "PageWidthOpen": '.$availableArticle[$i]->{'PageWidthOpen'}.',';
							
							if($availableArticle[$i]->{'PageDepthOpen'} != ""){
								$jsonArticle .= '
												"PageDepthOpen": '.$availableArticle[$i]->{'PageDepthOpen'}.',';
							}
							
							$jsonArticle .= '
											"Payment":{
								               "Type": "CIA"
								            },
								            "PriceType": "Standard",
								            "Run": 1				            
								         }';
						}
						
						break;
					}
				}						
			}

			return json_decode($jsonArticle, true);			
						
		}
		
		//returns a new "fresh" request
		//json structure
		private function _getNewRequest($language, $currency){
			$jsonRequest['Header']['Language'] = $language;
			$jsonRequest['Header']['Currency'] = $currency;
			$jsonRequest['Header']['SystemOfMeasurement'] = 'Metric';
			$jsonRequest['Header']['IsDebug'] = $this->isDebug;
			$jsonRequest['Order']['Shipment']['ShipTo']['Country'] = $this->country;
				
			return $jsonRequest;
		}
		
		public function getMaterial($mode, $matchcode, $identifier, $availableArticle, $language, $currency, $material = "", $cacheKey = null, $expire = 604800){
			$oldCacheKey = $cacheKey; 
			
			$cacheKey = md5($cacheKey).'.php';
			
			$filename = dirname(__FILE__).'/../'.CACHE_DIR.'/'.$cacheKey;
			
			$article = $this->_getNewArticle($matchcode, $identifier, $availableArticle, $material);
				
			//---------------------
			if(Dgo_checkdir($cacheKey) == false){
				$url = $this->portalURI.$mode;

				$this->request =  $this->_getNewRequest($language, $currency);
				
				$this->request['Order']['Article'] = array();							
				array_push($this->request['Order']['Article'], $article);	

				//init curl and set required options
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json; charset=utf-8","Accept: application/json")); 
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
				curl_setopt($ch, CURLOPT_USERPWD, $this->user.':'.$this->pass); 
				curl_setopt($ch, CURLOPT_POST, true);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($this->request));

				//execute request
				$result = curl_exec($ch);
				
				//on error, write error to result
				if($result === false) {
				    $result = curl_error($ch);
				}
				
				if($oldCacheKey != null){
					$expireObj = serialize(array("expire" => time() + $expire));
				
					//write to cache
					Dgo_file_write($filename, $expireObj."---".serialize($result), w);
				}
	
				//close curl
				curl_close($ch);
			}else{
				$result = Dgo_read_serialize_file($filename);				
				
				if(time() < $result['expire']){
					$result = Dgo_get_data_from_cache($filename);
				}else{
					@unlink($filename);
					
					$url = $this->portalURI.$mode;

					$this->request =  $this->_getNewRequest($language, $currency);
					$this->request['Order']['Article'] = array();							
					array_push($this->request['Order']['Article'], $article);	
		
					//init curl and set required options
					$ch = curl_init();
					curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json; charset=utf-8","Accept: application/json")); 
					curl_setopt($ch, CURLOPT_URL, $url);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
					curl_setopt($ch, CURLOPT_USERPWD, $this->user.':'.$this->pass); 
					curl_setopt($ch, CURLOPT_POST, true);
					curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
					curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($this->request));

					//execute request
					$result = curl_exec($ch);
					
					//on error, write error to result
					if($result === false) {
						$result = curl_error($ch);
					}
					
					if($oldCacheKey != null){
						$expireObj = serialize(array("expire" => time() + $expire));
					
						//write to cache
						Dgo_file_write($filename, $expireObj."---".serialize($result), w);
					}
		
					//close curl
					curl_close($ch);
				}
				
				
			}
						
			return $result;
		}
		
		public function getFormats($mode, $language, $unit = 'mm', $offcutInMm = null, $cacheKey = null, $expire = 604800){
			
			$oldCacheKey = $cacheKey; 
			
			$cacheKey = md5($cacheKey).'.php';
			
			$filename = dirname(__FILE__).'/../'.CACHE_DIR.'/'.$cacheKey;
			
			if(Dgo_checkdir($cacheKey) == false){
				$result = json_decode($this->DoApiGetRequest($mode));
	
				$result = $result->{'Value'};
				
				$formatArr = $result->{'ChildTokens'};
				
				$formatResultArr = array();
				
				for($i = 0; $i < count($formatArr);$i++){
					$dimArray = explode("_", $formatArr[$i]->{'Token'});
					
					if(count($dimArray) >= 2){
						if(!isset($formatArr[$i]->{'ChildTokens'})){
							
							$last = $dimArray[count($dimArray)-1];
	
							$is3d = $last == "custom" && count($dimArray) > 3;
											
							$widthInMm  = is_numeric($dimArray[1]*1) == true ? ($dimArray[1]) : ($dimArray[2]);
							$heightInMm = is_numeric($dimArray[2]*1) == true ? ($dimArray[2]) : ($dimArray[3]);
							
							$depthInMm  = 0;
	
							if($is3d == true){
								$depthInMm = ($dimArray[3]*1);
							}
							
							$widthInMmOffcut  = $widthInMm;
					        $heightInMmOffcut = $heightInMm;
					        $depthInMmOffcut  = $depthInMm;
					        
							if($offcutInMm != null) {
					            $widthInMmOffcut  += 2 * $offcutInMm;
					            $heightInMmOffcut += 2 * $offcutInMm;
					            $depthInMmOffcut  += 2 * $offcutInMm;
					        }
					        
					        $widthInUnit  = $widthInMm;
					        $heightInUnit = $heightInMm;
					        $depthInUnit  = $depthInMm;

					        $widthInUnitOffcut  =  $widthInMmOffcut;
		          			$heightInUnitOffcut =  $heightInMmOffcut;
		          			$depthInUnitOffcut  =  $depthInMmOffcut;
		          			
		          			$nameTranslationArr = $formatArr[$i]->{'SystemTokenTranslation'};
		          			
		          			$name = "";
		          			
							if($is3d == true){
								$name = $widthInUnit . ' x ' . $heightInUnit . ' x ' . $depthInUnit . ' ' . $unit;
							}else{
								$name = $widthInUnit . ' x ' . $heightInUnit . ' ' . $unit;
							}
	
		          			for($j = 0; $j < count($nameTranslationArr);$j++){
		          				if($nameTranslationArr[$j]->{'LanguageToken'} == $language){
		          					if($nameTranslationArr[$j]->{'Description'} != ""){
		          						$name = preg_replace("/#FORMAT#/",$name, $nameTranslationArr[$j]->{'Description'});	
		          													
		          					}       
									
		          				}else if($j == count($nameTranslationArr)-1){
		          					if($nameTranslationArr[0]->{'Description'} != ""){	          						
		          						$name = preg_replace("/#FORMAT#/",$name, $nameTranslationArr[0]->{'Description'});
		          							
		          					}
		          				}	
		          			}
	
		          			$areaOffcut = 0;

				            $areaOffcut = ($widthInUnitOffcut/1000)*($heightInUnitOffcut/1000)*($is3d == true ? ($depthInUnitOffcut/1000) : 1);
				            
				            $fixedAreaOffcut = round(floatval($areaOffcut) * pow(10, 6)) / pow(10, 6);
	
						    if(is_numeric($widthInUnit) == true){
						    	
								$depthInUnit = $depthInUnit == 0 ? "" : $depthInUnit;
								
						    	$jsonObject = '{
						    					"Width": "'.$widthInUnit.'",
						    					"Height": "'.$heightInUnit.'",
						    					"Depth": "'.$depthInUnit.'",
						    					"Name": "'.$name.'",
						    					"Area": "'.$fixedAreaOffcut.'"				    
						    					}';
						    	
						    	array_push($formatResultArr, json_decode($jsonObject));	
	
						    }
						}else{
							
							for($j = 0; $j < count($formatArr[$i]->{'ChildTokens'});$j++){
																
								$dimChildrenArray = explode('_',$formatArr[$i]->{'ChildTokens'}[$j]->{'Token'});
								
								$last = $dimChildrenArray[count($dimChildrenArray)-1];
								$is3d = $last == "custom" && count($dimChildrenArray) > 3;
								
								$widthInMm  = (is_numeric($dimChildrenArray[1]*1) == true) ? $dimChildrenArray[1] : $dimChildrenArray[2];
								$heightInMm = (is_numeric($dimChildrenArray[2]*1) == true) ? $dimChildrenArray[2] : $dimChildrenArray[3];
								$depthInMm  = 0;
								
								if($is3d == true){
									$depthInMm = is_numeric($dimChildrenArray[3]);
								}
								
								$widthInMmOffcut  = $widthInMm;
						        $heightInMmOffcut = $heightInMm;
						        $depthInMmOffcut  = $depthInMm;
						        
								if($offcutInMm != null) {
						            $widthInMmOffcut  += 2 * $offcutInMm;
						            $heightInMmOffcut += 2 * $offcutInMm;
						            $depthInMmOffcut  += 2 * $offcutInMm;
						        }
						        
						        $widthInUnit  = $widthInMm;
						        $heightInUnit = $heightInMm;
						        $depthInUnit  = $depthInMm;
						        
						        $widthInUnitOffcut  = $widthInMmOffcut;
			          			$heightInUnitOffcut = $heightInMmOffcut;
			          			$depthInUnitOffcut  = $depthInMmOffcut;
			          			
			          			$nameTranslationArr = $formatArr[$i]->{'ChildTokens'}[$j]->{'SystemTokenTranslation'};
			          			
			          			$name = "";
		          			
								if($is3d == true){
									$name = $widthInUnit . ' x ' . $heightInUnit . ' x ' . $depthInUnit . ' ' . $unit;
								}else{
									$name = $widthInUnit . ' x ' . $heightInUnit . ' ' . $unit;
								}
	
								for($k = 0; $k < count($nameTranslationArr);$k++){
									if($nameTranslationArr[$k]->{'LanguageToken'} == $language){
										if($nameTranslationArr[$k]->{'Description'} != ""){
											$name = preg_replace("/#FORMAT#/",$name,$nameTranslationArr[$k]->{'Description'});									
										}       
										
									}else if($k == count($nameTranslationArr)-1 && $name == ""){
										if($nameTranslationArr[0]->{'Description'} != ""){	          						
											$name = preg_replace("/#FORMAT#/",$name,$nameTranslationArr[0]->{'Description'});
										}
									}	
								}
			          			
	
			          			
			          			$areaOffcut = 0;

					            $areaOffcut = ($widthInUnitOffcut/1000)*($heightInUnitOffcut/1000)*($is3d == true ? ($depthInUnitOffcut/1000) : 1);
					            
					            $fixedAreaOffcut = round(floatval($areaOffcut) * pow(10, 6)) / pow(10, 6);
					            
							    if(is_numeric($widthInUnit) == true){
							    	
									$depthInUnit = $depthInUnit == 0 ? "" : $depthInUnit;
									
							    	$jsonObject = '{
							    					"Width": "'.$widthInUnit.'",
							    					"Height": "'.$heightInUnit.'",
							    					"Depth": "'.$depthInUnit.'",
							    					"Name": "'.$name.'",
							    					"Area": "'.$fixedAreaOffcut.'"				    
							    					}';
							    	
							    	array_push($formatResultArr, json_decode($jsonObject));		        	
					            }
							}
						}
						
					}
				}
				
				if($oldCacheKey != null){
					$expireObj = serialize(array("expire" => time() + $expire));
				
					//write to cache
					Dgo_file_write($filename, $expireObj."---".serialize($formatResultArr), w);
				}
			}else{
				$formatResultArr = Dgo_read_serialize_file($filename);				
				
				if(time() < $formatResultArr['expire']){
					$formatResultArr = Dgo_get_data_from_cache($filename);
				}else{
					@unlink($filename);
					
					$result = json_decode($this->DoApiGetRequest($mode));
	
					$result = $result->{'Value'};
					
					$formatArr = $result->{'ChildTokens'};
					
					$formatResultArr = array();
					
					for($i = 0; $i < count($formatArr);$i++){
						$dimArray = explode("_", $formatArr[$i]->{'Token'});
						
						if(count($dimArray) >= 2){
							if(!isset($formatArr[$i]->{'ChildTokens'})){
								
								$last = $dimArray[count($dimArray)-1];
		
								$is3d = $last == "custom" && count($dimArray) > 3;
												
								$widthInMm  = is_numeric($dimArray[1]*1) == true ? ($dimArray[1]) : ($dimArray[2]);
								$heightInMm = is_numeric($dimArray[2]*1) == true ? ($dimArray[2]) : ($dimArray[3]);
								
								$depthInMm  = 0;
		
								if($is3d == true){
									$depthInMm = ($dimArray[3]*1);
								}
								
								$widthInMmOffcut  = $widthInMm;
								$heightInMmOffcut = $heightInMm;
								$depthInMmOffcut  = $depthInMm;
								
								if($offcutInMm != null) {
									$widthInMmOffcut  += 2 * $offcutInMm;
									$heightInMmOffcut += 2 * $offcutInMm;
									$depthInMmOffcut  += 2 * $offcutInMm;
								}
								
								$widthInUnit  = $widthInMm;
								$heightInUnit = $heightInMm;
								$depthInUnit  = $depthInMm;

								$widthInUnitOffcut  =  $widthInMmOffcut;
								$heightInUnitOffcut =  $heightInMmOffcut;
								$depthInUnitOffcut  =  $depthInMmOffcut;
								
								$nameTranslationArr = $formatArr[$i]->{'SystemTokenTranslation'};
								
								$name = "";
								
								if($is3d == true){
									$name = $widthInUnit . ' x ' . $heightInUnit . ' x ' . $depthInUnit . ' ' . $unit;
								}else{
									$name = $widthInUnit . ' x ' . $heightInUnit . ' ' . $unit;
								}
		
								for($j = 0; $j < count($nameTranslationArr);$j++){
									if($nameTranslationArr[$j]->{'LanguageToken'} == $language){
										if($nameTranslationArr[$j]->{'Description'} != ""){
											$name = preg_replace("/#FORMAT#/",$name, $nameTranslationArr[$j]->{'Description'});	
																		
										}       
										
									}else if($j == count($nameTranslationArr)-1){
										if($nameTranslationArr[0]->{'Description'} != ""){	          						
											$name = preg_replace("/#FORMAT#/",$name, $nameTranslationArr[0]->{'Description'});
												
										}
									}	
								}
		
								$areaOffcut = 0;

								$areaOffcut = ($widthInUnitOffcut/1000)*($heightInUnitOffcut/1000)*($is3d == true ? ($depthInUnitOffcut/1000) : 1);
								
								$fixedAreaOffcut = round(floatval($areaOffcut) * pow(10, 6)) / pow(10, 6);
		
								if(is_numeric($widthInUnit) == true){
									
									$depthInUnit = $depthInUnit == 0 ? "" : $depthInUnit;
									
									$jsonObject = '{
													"Width": "'.$widthInUnit.'",
													"Height": "'.$heightInUnit.'",
													"Depth": "'.$depthInUnit.'",
													"Name": "'.$name.'",
													"Area": "'.$fixedAreaOffcut.'"				    
													}';
									
									array_push($formatResultArr, json_decode($jsonObject));	
		
								}
							}else{
								
								for($j = 0; $j < count($formatArr[$i]->{'ChildTokens'});$j++){
																	
									$dimChildrenArray = explode('_',$formatArr[$i]->{'ChildTokens'}[$j]->{'Token'});
									
									$last = $dimChildrenArray[count($dimChildrenArray)-1];
									$is3d = $last == "custom" && count($dimChildrenArray) > 3;
									
									$widthInMm  = (is_numeric($dimChildrenArray[1]*1) == true) ? $dimChildrenArray[1] : $dimChildrenArray[2];
									$heightInMm = (is_numeric($dimChildrenArray[2]*1) == true) ? $dimChildrenArray[2] : $dimChildrenArray[3];
									$depthInMm  = 0;
									
									if($is3d == true){
										$depthInMm = is_numeric($dimChildrenArray[3]);
									}
									
									$widthInMmOffcut  = $widthInMm;
									$heightInMmOffcut = $heightInMm;
									$depthInMmOffcut  = $depthInMm;
									
									if($offcutInMm != null) {
										$widthInMmOffcut  += 2 * $offcutInMm;
										$heightInMmOffcut += 2 * $offcutInMm;
										$depthInMmOffcut  += 2 * $offcutInMm;
									}
									
									$widthInUnit  = $widthInMm;
									$heightInUnit = $heightInMm;
									$depthInUnit  = $depthInMm;
									
									$widthInUnitOffcut  = $widthInMmOffcut;
									$heightInUnitOffcut = $heightInMmOffcut;
									$depthInUnitOffcut  = $depthInMmOffcut;
									
									$nameTranslationArr = $formatArr[$i]->{'ChildTokens'}[$j]->{'SystemTokenTranslation'};
									
									$name = "";
								
									if($is3d == true){
										$name = $widthInUnit . ' x ' . $heightInUnit . ' x ' . $depthInUnit . ' ' . $unit;
									}else{
										$name = $widthInUnit . ' x ' . $heightInUnit . ' ' . $unit;
									}
		
									for($k = 0; $k < count($nameTranslationArr);$k++){
										if($nameTranslationArr[$k]->{'LanguageToken'} == $language){
											if($nameTranslationArr[$k]->{'Description'} != ""){
												$name = preg_replace("/#FORMAT#/",$name,$nameTranslationArr[$k]->{'Description'});									
											}       
											
										}else if($k == count($nameTranslationArr)-1 && $name == ""){
											if($nameTranslationArr[0]->{'Description'} != ""){	          						
												$name = preg_replace("/#FORMAT#/",$name,$nameTranslationArr[0]->{'Description'});
											}
										}	
									}
									
		
									
									$areaOffcut = 0;

									$areaOffcut = ($widthInUnitOffcut/1000)*($heightInUnitOffcut/1000)*($is3d == true ? ($depthInUnitOffcut/1000) : 1);
									
									$fixedAreaOffcut = round(floatval($areaOffcut) * pow(10, 6)) / pow(10, 6);
									
									if(is_numeric($widthInUnit) == true){
										
										$depthInUnit = $depthInUnit == 0 ? "" : $depthInUnit;
										
										$jsonObject = '{
														"Width": "'.$widthInUnit.'",
														"Height": "'.$heightInUnit.'",
														"Depth": "'.$depthInUnit.'",
														"Name": "'.$name.'",
														"Area": "'.$fixedAreaOffcut.'"				    
														}';
										
										array_push($formatResultArr, json_decode($jsonObject));		        	
									}
								}
							}
							
						}
					}
					
					if($oldCacheKey != null){
						$expireObj = serialize(array("expire" => time() + $expire));
					
						//write to cache
						Dgo_file_write($filename, $expireObj."---".serialize($formatResultArr), w);
					}
				}
				
				
			}

			return $formatResultArr;
		}
		
		public function getPrices($mode, $formatObj, $matchcode, $identifier, $availableArticle, $material, $MaxToCalculate, $language, $currency, $ResaleUnitId, $amount, $runInit, $AmountType, $cacheKey = null, $expire = 604800){
			
			$oldCacheKey = $cacheKey; 
			
			$cacheKey = md5($cacheKey).'.php';
			
			$filename = dirname(__FILE__).'/../'.CACHE_DIR.'/'.$cacheKey;
			
			//---------------------
			if(Dgo_checkdir($cacheKey) == false){

				$this->request =  $this->_getNewRequest($language, $currency);

				$this->request['Order']['ResaleUnitId'] = $ResaleUnitId;
				
				for($i = 0;$i < count($formatObj);$i++){
					if($formatObj[$i]->{'Area'} <= $MaxToCalculate){
						$article = $this->_getNewArticle($matchcode, $identifier, $availableArticle, $material);
					
						$article['PageLengthOpen'] = $formatObj[$i]->{'Height'};
						$article['PageWidthOpen']  = $formatObj[$i]->{'Width'};
						
						if($formatObj[$i]->{'Depth'} != ""){
							$article['PageDepthOpen']  = $formatObj[$i]->{'Depth'};
						}
		
						$article['Material'] = $material;
						
						if($AmountType == 'amount'){
							$article['Run'] = 1;
						
							$article['Amount'] = $amount;
						}else{
							$article['Run'] = $amount;
						
							$article['Amount'] = 1;
						}

						$article = json_decode(json_encode($article));
						
						if(is_array($this->request['Order']['Article']) == false){
							$this->request['Order']['Article'] = array();
						}
						array_push($this->request['Order']['Article'], $article);

					}			
				}

				$this->request = json_decode(json_encode($this->request));

				//call api to get prices
				$url = $this->portalURI.$mode;
				
				//init curl and set required options
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json; charset=utf-8","Accept: application/json")); 
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
				curl_setopt($ch, CURLOPT_USERPWD, $this->user.':'.$this->pass); 
				curl_setopt($ch, CURLOPT_POST, true);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($this->request));

				//execute request
				$result = curl_exec($ch);
				
				//on error, write error to result
				if($result === false) {
				    $result = curl_error($ch);
				}
			
				if($oldCacheKey != null){
					$expireObj = serialize(array("expire" => time() + $expire));
				
					//write to cache
					Dgo_file_write($filename, $expireObj."---".serialize($result), w);
				}
				
				//close curl
				curl_close($ch);
			}else{
				$result = Dgo_read_serialize_file($filename);				
				
				if(time() < $result['expire']){
					$result = Dgo_get_data_from_cache($filename);
				}else{
					@unlink($filename);
					
					$this->request =  $this->_getNewRequest($language, $currency);

					$this->request['Order']['ResaleUnitId'] = $ResaleUnitId;
					
					for($i = 0;$i < count($formatObj);$i++){
						if($formatObj[$i]->{'Area'} <= $MaxToCalculate){
							$article = $this->_getNewArticle($matchcode, $identifier, $availableArticle, $material);
						
							$article['PageLengthOpen'] = $formatObj[$i]->{'Height'};
							$article['PageWidthOpen']  = $formatObj[$i]->{'Width'};
							
							if($formatObj[$i]->{'Depth'} != ""){
								$article['PageDepthOpen']  = $formatObj[$i]->{'Depth'};
							}
			
							$article['Material'] = $material;
							
							if($AmountType == 'amount'){
								$article['Run'] = 1;
							
								$article['Amount'] = $amount;
							}else{
								$article['Run'] = $amount;
							
								$article['Amount'] = 1;
							}

							$article = json_decode(json_encode($article));
							if(is_array($this->request['Order']['Article']) == false){
								$this->request['Order']['Article'] = array();
							}
							array_push($this->request['Order']['Article'], $article);

						}			
					}

					$this->request = json_decode(json_encode($this->request));

					//call api to get prices
					$url = $this->portalURI.$mode;
					
					//init curl and set required options
					$ch = curl_init();
					curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json; charset=utf-8","Accept: application/json")); 
					curl_setopt($ch, CURLOPT_URL, $url);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
					curl_setopt($ch, CURLOPT_USERPWD, $this->user.':'.$this->pass); 
					curl_setopt($ch, CURLOPT_POST, true);
					curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
					curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($this->request));

					//execute request
					$result = curl_exec($ch);
					
					//on error, write error to result
					if($result === false) {
						$result = curl_error($ch);
					}
				
					if($oldCacheKey != null){
						$expireObj = serialize(array("expire" => time() + $expire));
					
						//write to cache
						Dgo_file_write($filename, $expireObj."---".serialize($result), w);
					}
					
					//close curl
					curl_close($ch);
				}
				
				
			}

			return json_decode($result);
		}
		
		public function GetSalesStatistic($mode){
			$this->request =  $this->_getNewRequest($language, $currency);
			
			$this->request['Value'] = array(
											"FromDate" => null,
											"Interval" => "Daily",
											"ToDate" => null
											);			
			unset($this->request['Order']);
			
			//init curl and set required options
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json; charset=utf-8","Accept: application/json")); 
			curl_setopt($ch, CURLOPT_URL, $this->portalURI.$mode);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
			curl_setopt($ch, CURLOPT_USERPWD, $this->user.':'.$this->pass); 
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($this->request));

			//execute request
			$result = curl_exec($ch);
			
			//on error, write error to result
			if($result === false) {
			    $result = curl_error($ch);
			}
		
			//close curl
			curl_close($ch);
			
			return $result;
		}
		
		public function GetThumbnailsFromUser($type, $language, $currency, $idportal, $mode, $portal){
			$this->request =  $this->_getNewRequest($language, $currency);
			
			$this->request['Value'] = array(
											"Type" => $type,
											"Language" => $language,
											"Pagesize" => 50,
											"PageNumber" => 1,
											"IdPortal" => $idportal
											);
			
			unset($this->request['Order']);
											
			$this->request = json_decode(json_encode($this->request));

			//call api to get prices
			$url = $portal == null ? $this->portalURI.$mode : $portal.$mode;
			
			//init curl and set required options
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json; charset=utf-8","Accept: application/json")); 
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
			curl_setopt($ch, CURLOPT_USERPWD, $this->user.':'.$this->pass); 
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($this->request));

			//execute request
			$result = curl_exec($ch);
			
			//on error, write error to result
			if($result === false) {
			    $result = curl_error($ch);
			}
		
			//close curl
			curl_close($ch);
			
			return $result;
		} 
		
		public function ConvertMm2Inch($valueInMm){
			$inches = $valueInMm/25.4;
			
			if ($inches == 0) {
    			return 0;
  			}
  			
  			return round($inches,2);
		}
		
		public function ConvertInch2Mm($valueInInch){
			$mm = $valueInInch * 25.4;
			
			if ($mm == 0) {
    			return 0;
  			}
  			
  			return round($mm);
		}
	}
?>