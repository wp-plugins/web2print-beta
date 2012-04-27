<?php session_start();
	
	include_once "../../config/config.class.php";
	
	include_once "../api_class/dgo_api.class.php";
	
	include_once "../api_class/GroupArticle.php";
	
	include "../../../../../wp-load.php";	
	
	if(isset($_GET)){		
		/*Get info from wordpress database*/
		$profile_user = get_option('profile_user_info');
		
		$api = new DgoApiConnectionW2P();
	
		$api->setApiKey($profile_user['apikey']);	
		
		$api->setApiSecret($profile_user['secret']);
		
		$language = $_GET['language'];
		$currency = $_GET['currency'];

		//get article id or article group id
		$articleGroupId = $_GET['ArticleId'];
		
		$typeOfId 		= substr($articleGroupId,0,1);
		$articleGroupId = substr($articleGroupId,1);
		
		//get article group from php
		$articleGroup = $api->DoApiGetRequest('ArticleGroups',$language,'ArticleGroups:'.$language);
		
		//get available article from php
		$getArticle = $api->DoApiGetRequest('Customer/'.$profile_user['apikey'].'/ResaleUnit/'.$profile_user['resaleGuid'].'/Articles', $language, 'Available:'.$language);
		
		$getArticle = json_decode($getArticle);

		$articleGroup = json_decode($articleGroup);
		
		$arr = $getArticle->{'Value'};	
	
		$matchCode_tmp = null;
		$ArticleArray = null;
		//function to group article by matchcode
		function GroupOrderArticle($valueObject, $groupName){
			$orderObjectReturn = array();
			$orderObjectGroup = array();
			
			$count = 0;
			
			for($i = 0; $i < count($valueObject); $i++){	
				if(is_array($valueObject[$i]) == false){
					$matchCode = explode("/", $valueObject[$i]->{'Matchcode'});
					
					if($matchCode[0] == $groupName){
						array_push($orderObjectGroup, $valueObject[$i]);
						$count++;
					}else{
						array_push($orderObjectReturn, $valueObject[$i]);
					}
					
				}else{
					$matchCode = explode("/", $valueObject[$i]['Matchcode']);
					
					if($matchCode[0] == $groupName){
						if(!isset($valueObject[$i]['Group'])){
							array_push($orderObjectGroup, $valueObject[$i]);
							$count++;
						}else{
							$orderObjectGroup = $valueObject[$i]['Group'];
							$count++;
						}
						
					}else{
						array_push($orderObjectReturn, $valueObject[$i]);
					}
					
				}		
			}
			
			if($count > 0){
				array_push($orderObjectReturn, array('Matchcode'  => $groupName, 
											  		 'Identifier' => $groupName, 
											  		 'Name' 	  => $groupName, 
											  		 'ArticleGroupEntry' => $groupName, 
											  		 'Group' 	  => $orderObjectGroup));
			}	
			
			return $orderObjectReturn;
		}
		
		
		foreach($arr as $key => $value){
			$match = explode("/",$value->{'Matchcode'});
			if($match[0] == "Crystal"){				
				$ArticleArray = GroupOrderArticle($arr, 'Crystal');
			}
		}

		for($i = 1;$i < count($arr);$i++){
			$matchCodeArr = explode("/",$arr[$i]->{'Matchcode'});
			$matchCodeArrBefore = explode("/",$arr[$i-1]->{'Matchcode'});
			
			if($matchCodeArr[0] == $matchCodeArrBefore[0]){
				if($matchCode_tmp == null || $matchCode_tmp != $matchCodeArr[0]){
					$matchCode_tmp = $matchCodeArr[0];					
					if($ArticleArray == null){
						$ArticleArray = GroupOrderArticle($arr, $matchCode_tmp);
					}else{
						$ArticleArray = GroupOrderArticle($ArticleArray, $matchCode_tmp);
					}
				}
			}
		}
		
		for($i = 0; $i < count($ArticleArray);$i++){
			if(is_array($ArticleArray[$i]) == true){
				if(count($ArticleArray[$i]['Group']) > 1){
					for($j = 0;$j < count($ArticleArray[$i]['Group']);$j++){
						$size_j = $ArticleArray[$i]['Group'][$j]->{'PageLengthOpen'} * $ArticleArray[$i]['Group'][$j]->{'PageWidthOpen'};
						$size_j = isset($ArticleArray[$i]['Group'][$j]->{'PageDepthOpen'}) == false ? $size_j : $size_j * $ArticleArray[$i]['Group'][$j]->{'PageDepthOpen'};
						
						for($k = $j+1;$k < count($ArticleArray[$i]['Group']);$k++){
							
							$size_k = $ArticleArray[$i]['Group'][$k]->{'PageLengthOpen'} * $ArticleArray[$i]['Group'][$k]->{'PageWidthOpen'};
							$size_k = $ArticleArray[$i]['Group'][$k]->{'PageDepthOpen'} == null ? $size_k : $size_k * $ArticleArray[$i]['Group'][$k]->{'PageDepthOpen'};
							
							if($ArticleArray[$i]['Group'][$k]->{'ArticleGroupIdentifier'} == $ArticleArray[$i]['Group'][$j]->{'ArticleGroupIdentifier'}){
								if($size_k < $size_j){
									$tmp = array();
									$tmp = $ArticleArray[$i]['Group'][$k];
									$ArticleArray[$i]['Group'][$k] = $ArticleArray[$i]['Group'][$j];
									$ArticleArray[$i]['Group'][$j] = $tmp;										
								}
							}								
						}
					}
				}
			}
		}

		$articleGuid = null;
		$identifier	 = null;
		$offCut		 = null;
		$matchCode	 = null;
		
		//find matchcode and article guid
		if($typeOfId == "A"){
			foreach($ArticleArray as $key => $value){
				if(is_array($value) == false){					
					if($value->{'Id'} == $articleGroupId){					
						$articleGuid = $value->{'Guid'};
						$matchCode   = $value->{'Matchcode'};	
						$identifier  = $value->{'Identifier'};	
						$offCut		 = $value->{'Offcut'};	
						break;								
					}
				}else{					
					foreach($value['Group'] as $k => $v){
						if($v->{'Id'} == $articleGroupId){
							$articleGuid = $v->{'Guid'};
							$matchCode   = $v->{'Matchcode'};	
							$identifier  = $v->{'Identifier'};	
							$offCut		 = $v->{'Offcut'};
							break;
						}
					}
				}				
			}
		}else{
			if(isset($_GET['RealArticleId'])){
				foreach($ArticleArray as $key => $value){
					if(is_array($value) == true){	
						foreach($value['Group'] as $k => $v){
							if($v->{'Id'} == $_GET['RealArticleId']){
								$articleGroupId = $v->{'Id'};			
								$articleGuid = $v->{'Guid'};
								$matchCode   = $v->{'Matchcode'};	
								$identifier  = $v->{'Identifier'};	
								$offCut		 = $v->{'Offcut'};	
								break;								
							}				
						}	
					}else{
						if($value->{'Id'} == $_GET['RealArticleId']){
							$articleGroupId = $value->{'Id'};			
							$articleGuid = $value->{'Guid'};
							$matchCode   = $value->{'Matchcode'};	
							$identifier  = $value->{'Identifier'};	
							$offCut		 = $value->{'Offcut'};	
							break;
						}
					}				
				}
			}else{
				foreach($ArticleArray as $key => $value){
					if(is_array($value) == false){	
						foreach($value->{'Categories'} as $k => $v){
							if($v == $articleGroupId){
								$articleGroupId = $value->{'Id'};			
								$articleGuid = $value->{'Guid'};
								$matchCode   = $value->{'Matchcode'};	
								$identifier  = $value->{'Identifier'};	
								$offCut		 = $value->{'Offcut'};	
								break;								
							}
						}									
					}else{					
						foreach($value['Group'] as $k => $v){
							if(isset($v->{'Categories'})){
								foreach($v->{'Categories'} as $i => $t){
									if($t == $articleGroupId){
										$articleGroupId = $v->{'Id'};			
										$articleGuid = $v->{'Guid'};
										$matchCode   = $v->{'Matchcode'};	
										$identifier  = $v->{'Identifier'};	
										$offCut		 = $v->{'Offcut'};	
										break;								
									}
								}	
							}						
						}	
					}				
				}
			}			
						
		}
		
		//get product colors
		$productVariation = $api->DoApiGetRequest('Token/'.$language.'/ProductVariation/'.$_GET['portal'].'/'.$matchCode ,null, 'ProductVariation:'.$matchcode.':'.$language.':'.$identifier.$articleGroupId, null, 86400);
		
		//get product pictures
		$productPics = $api->DoApiGetRequest('Article/'.$articleGuid.'/Thumbnails' ,null, 'Thumbnails:'.$articleGuid, null, 86400);
		
		//call request to get material
		$material = $api->getMaterial('Calculate', $matchCode, $identifier, $ArticleArray, $language ,$currency, "", $matchCode.':'.$language.':'.$articleGroupId, 86400);
		$material = json_decode($material);
		
		/*Edit by Henry*/
		$max_discount = 0;
		$material_article = $material->{'Order'}->{'Article'}[0];
		
		if(count($material_article->{'VolumeDiscounts'}) > 0){
			$max_discount = $material_article->{'VolumeDiscounts'}[count($material_article->{'VolumeDiscounts'}) - 1]->{'Amount'};
			$amountType = 'amount';
		}else{
			$max_discount = $material_article->{'Runs'}[count($material_article->{'Runs'}) - 1];
			$amountType = 'run';
		}
		
		//get format from php
		$formatObj = $api->getFormats('Token/'.$language.'/Format/PaperPrint/'.$matchCode, null, "mm", $offCut, $matchCode.':Formats:'.$language.':'.$articleGroupId);

		if(count($formatObj) > 1){
			for($i = 0;$i < count($formatObj);$i++){
				for($j = $i+1;$j < count($formatObj);$j++){
					if($formatObj[$j]->{'Area'} < $formatObj[$i]->{'Area'}){
						$tmp = array();
						$tmp = $formatObj[$j];
						$formatObj[$j] = $formatObj[$i];
						$formatObj[$i] = $tmp;
					}					
				}
			}
		}
		
		$runInit = count($material->{'Order'}->{'Article'}[0]->{'Runs'}) > 1 ? $material->{'Order'}->{'Article'}[0]->{'Runs'}[0] : 1;

		//get prices from php
		$amount = isset($_GET['amount']) ? $_GET['amount'] : 1;
		
		//echo $amount;
		$pricesArr =  $api->getPrices('Calculate',$formatObj, $matchCode, $identifier, $ArticleArray, $material->{'Order'}->{'Article'}[0]->{'Materials'}[0]->{'Key'}, $material->{'Order'}->{'Article'}[0]->{'MaxAreaToCalculate'},$language,$currency, $profile_user['resaleGuid'], $amount, $runInit,$amountType, $identifier.':Prices:'.$material->{'Order'}->{'Article'}[0]->{'Materials'}[0]->{'Key'}.':'.$language.$articleGroupId.$amount);
		
		/*Edit by Henry*/
		$pricesMin =  $api->getPrices('Calculate',$formatObj, $matchCode, $identifier, $ArticleArray, $material->{'Order'}->{'Article'}[0]->{'Materials'}[0]->{'Key'}, $material->{'Order'}->{'Article'}[0]->{'MaxAreaToCalculate'},$language,$currency, $profile_user['resaleGuid'], 1, $runInit,$amountType, $identifier.':Prices:'.$material->{'Order'}->{'Article'}[0]->{'Materials'}[0]->{'Key'}.':'.$language.$articleGroupId.'MIN');
		$pricesMax =  $api->getPrices('Calculate',$formatObj, $matchCode, $identifier, $ArticleArray, $material->{'Order'}->{'Article'}[0]->{'Materials'}[0]->{'Key'}, $material->{'Order'}->{'Article'}[0]->{'MaxAreaToCalculate'},$language,$currency, $profile_user['resaleGuid'], $max_discount, $runInit,$amountType, $identifier.':Prices:'.$material->{'Order'}->{'Article'}[0]->{'Materials'}[0]->{'Key'}.':'.$language.$articleGroupId.'MAX');
		
		foreach($pricesArr->{'Order'}->{'Article'} as $key => $value){
			$value->{'Identifier'} = $identifier;
		}
		
		//return result
		$resultReturn = array();
		$resultReturn['Value']['ArticleGroups'] 	= $articleGroup;
		$resultReturn['Value']['AvailableArticles'] = $getArticle;
		$resultReturn['Value']['ArticleArray'] 		= $ArticleArray;
		$resultReturn['Value']['productVariation'] 	= json_decode($productVariation);
		$resultReturn['Value']['productPictures'] 	= json_decode($productPics);
		$resultReturn['Value']['Material'] 			= $material;
		$resultReturn['Value']['Format'] 			= $formatObj;
		$resultReturn['Value']['Prices'] 			= $pricesArr;
		$resultReturn['Value']['MinPrices'] 		= $pricesMin;
		$resultReturn['Value']['MaxPrices'] 		= $pricesMax;
		
		echo json_encode($resultReturn);
	}
	
	