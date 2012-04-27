<?php 
	//session start
	session_start();
	
	if(isset($_GET['option'])){
		if($_GET['option'] == 'image_change'){
			$article_id = $_GET['article'];
		
			$imgHandle = $_GET['handle'];
			$imgWidth = $_GET['width'];
			$imgHeight = $_GET['height'];
			$ratioW = $_GET['ratioW'];
			$ratioH = $_GET['ratioH'];
			$imgFormat = $_GET['format'];
			$imgLink = $_GET['link'].'&h='.$_GET['h'].'&a='.$_GET['a'];			
			
			for($i = 0; $i < count($_SESSION['prices_import']); $i++){
				//find the article
				if($_SESSION['prices_import'][$i]->{'ArticleID'} == $article_id){
					//find the picture
					for($j = 0; $j < count($_SESSION['prices_import'][$i]->{'Pictures'}); $j++){
						$pictures_object = $_SESSION['prices_import'][$i]->{'Pictures'}[$j];

						if(str_replace("-", "", $pictures_object->{'Handle'}) == $imgHandle){
							$pictures_object->{'ImageWidth'} = $imgWidth;
							$pictures_object->{'ImageHeight'} = $imgHeight;
							$pictures_object->{'Ratio'}->{'RatioWidth'} = $ratioW;						
							$pictures_object->{'Ratio'}->{'RatioHeight'} = $ratioH;

							$pictures_object->{'Format'} = $imgFormat;
							echo json_encode('Success');				
						}
					}				
				}
			}
		}else if($_GET['option'] == 'image_delete'){
			$article_id = $_GET['article'];
			$image = $_GET['image'];
			
			for($i = 0; $i < count($_SESSION['prices_import']); $i++){
				//find the article
				if($_SESSION['prices_import'][$i]->{'ArticleID'} == $article_id){
					//delete the picture
					$_SESSION['prices_import'][$i]->{'Pictures'}[$image]->{'Active'} = 'false';
					echo json_encode('Success');			
				}
			}
		}
	}
?>

