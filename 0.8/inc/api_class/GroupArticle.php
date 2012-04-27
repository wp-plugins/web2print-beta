<?php

function ArticleDecentralization1($arr, $articleGroup, $translation){
    
	 $newArr = array();
			
		for($i = 0; $i <count($arr);$i++)
		{
					
			if(!isset($newArr[$arr[$i]->{'ArticleGroupIdentifier'}]))
			{
				$string=explode("_",$arr[$i]->{'ArticleGroupIdentifier'});
				
				if($string[0] == "CRYSTAL")
				{
						if(!isset($newArr["CRYSTAL"]))
						{
							
							$newArr["CRYSTAL"] = array($newArr["CRYSTAL"]);
							$newArr["CRYSTAL"]["Name"] = $translation->translate('Crystal');
							$newArr["CRYSTAL"]["Tagstring"] = '';
							$newArr["CRYSTAL"]["Items"] = array();
													
						}
				
						if(!isset($newArr["CRYSTAL"]["Items"][$arr[$i]->{'ArticleGroupIdentifier'}]))
						{
							$newArr["CRYSTAL"]["Items"][$arr[$i]->{'ArticleGroupIdentifier'}]=array();
						}
						$newArr["CRYSTAL"]["Items"][$arr[$i]->{'ArticleGroupIdentifier'}].array_push($newArr["CRYSTAL"]["Items"][$arr[$i]->{'ArticleGroupIdentifier'}],$arr[$i]);
						
				}
				else
				{
					for($j = 0;$j < count($articleGroup);$j++){
						if($articleGroup[$j]->{'Token'} == $arr[$i]->{'ArticleGroupIdentifier'}){
							$articleGroupName = $articleGroup[$j]->{'ArticleGroupTranslation'}[0]->{'Name'};
						}
					}	
					
					$string1=explode("_",$arr[$i]->{'ArticleGroupIdentifier'});
					$newArr[$arr[$i]->{'ArticleGroupIdentifier'}] = array($newArr[$arr[$i]->{'ArticleGroupIdentifier'}]);
					$newArr[$arr[$i]->{'ArticleGroupIdentifier'}]["Name"] = $articleGroupName;//ucwords(strtolower($string1[0].' '.$string1[1]));
					$newArr[$arr[$i]->{'ArticleGroupIdentifier'}]["Items"] = array();
					$newArr[$arr[$i]->{'ArticleGroupIdentifier'}]["Tagstring"] = '';
					$newArr[$arr[$i]->{'ArticleGroupIdentifier'}]["Items"].array_push($newArr[$arr[$i]->{'ArticleGroupIdentifier'}]["Items"],$arr[$i]);
				}
			
			
			}
			else
			{
				$newArr[$arr[$i]->{'ArticleGroupIdentifier'}]["Items"].array_push($newArr[$arr[$i]->{'ArticleGroupIdentifier'}]["Items"],$arr[$i]);
			}
				
		}
	return $newArr;
}
function makeFriendlyUrl($str){
	
	$str = preg_replace("/(ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự)/", 'u', $str);
	$str = preg_replace("/(ü)/", 'ue', $str);
	$str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
	$str = preg_replace("/(ä)/", 'ae', $str);
	$str = preg_replace("/(ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ)/", 'o', $str);
	$str = preg_replace("/(ö)/", 'oe', $str);
	$str = preg_replace("/(é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ)/", 'e', $str);
	$str = preg_replace("/(ý|ỳ|ỷ|ỹ|ỵ)/", 'y', $str);
	$str = preg_replace("/(í|ì|ỉ|ĩ|ị)/", 'i', $str);
	$str = preg_replace("/(đ)/", 'd', $str);
	$str = preg_replace("/(ñ)/", 'n', $str);
	$str = preg_replace("/(ß)/", 'ss', $str);
	$str = preg_replace("/(^a-z0-9)/", '', $str);
	$str = preg_replace("/(\s+|\/+|-+|_+)/", '', $str);
	$str = preg_replace("/(^_+|_+$)/", '', $str);
	$str = preg_replace("/&|\./", '', $str);
	
	return strtolower($str);
}

?>
