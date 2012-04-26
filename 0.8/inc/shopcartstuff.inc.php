<?php
/*
 * function to create address book page
 * 
 * @Peter
 * 
 */
	//remove_filter ('the_content', 'wpautop');
	//add_filter('the_content', 'dgoReplaceShopCartPlaceholder',100);	
	add_shortcode('shopcartplaceholder', 'dgoReplaceShopCartPlaceholder');
	add_filter('the_title', 'filter_text');	
		
	function filter_text($text){
		require_once('translation.class.php');	
		$translation = new Web_2_print_Translation('web2print');
		
		$text = str_replace('Shopping Cart', $translation->translate('ShoppingCart'), $text);
		$text = str_replace('Designer', $translation->translate('Designer'), $text);
		$text = str_replace('All Orders', $translation->translate('AllOrders'), $text);
		$text = str_replace('Archive', $translation->translate('Archive'), $text);
		$text = str_replace('Address Book', $translation->translate('AddressBook'), $text);
		$text = str_replace('Account Details', $translation->translate('AccountDetails'), $text);
		$text = str_replace('Earn Money', $translation->translate('EarnMoney'), $text);
		$text = str_replace('Order Confirmation', $translation->translate('OrderConfirmation'), $text);
		$text = str_replace('Article', $translation->translate('Article'), $text);
		$text = str_replace('Price', $translation->translate('Price'), $text);
		$text = str_replace('Product Details', $translation->translate('ProductDetails'), $text);
		return $text;
	}
	
	function formatCurrency($price, $cur){
		$priceFormat = null;
		
		if($cur == 'EUR'){
			$priceFormat = number_format( $price, 2, ',', '.');
		}else if($cur == 'VND'){
			$priceFormat = number_format( $price, 0, '.', '.');		
		}else{
			$priceFormat = number_format( $price, 2, '.', '.');
		}
		
		return $priceFormat;
	}
		
	//function fill data
	function dgoReplaceShopCartPlaceholder($data){
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}		
		
		$page = get_post(get_option('shoppingPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
		
		require_once('translation.class.php');
	
		$translation = new Web_2_print_Translation('web2print');
		
		/*Get info from wordpress database*/
		$profile_user = get_option('profile_user_info');
		
		//show end price format text
		$endPriceUserFormat = ($profile_user['EndUserPriceFormat'] == "Net") ? $translation->translate('EndUserPriceFormat') : $translation->translate('EndUserPriceFormatGross');
		
		//amount of uploaded pictures
		$amountPicture = 0;

		//add articles			
		if(isset($_SESSION['prices_import'])){
			
			//print_r($_SESSION['prices_import']);
			$articleContent 	= null;
			$baokim_totalPrice 	= 0;
			$baokim_proName 	= '';
			$baokim_quantity 	= count($_SESSION['prices_import']);
			$baokim_description = '';
			
			$pageURL = 'http://'.$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];

			$shop_articles = array();
			$prices_import_sessions = array();
			
			//cropping js object
			$pictureObjectJsDefine = null;
			
			//get mask Picture from PAC Online
			include_once "api_class/dgo_api.class.php";
			
			include_once "api_class/GroupArticle.php";
		
			$api = new DgoApiConnectionW2P();
			
			$api->setApiKey($profile_user['apikey']);	
				
			$api->setApiSecret($profile_user['secret']);
			$tmp_mask_arr=array();
			$tmp_mask_Type=array();
			$mask_array_return = array();
			
			foreach($_SESSION['prices_import'] as $key=>$value){
			    $ArticleGuid=$value->{'ArticleGuid'};	 
				$GetmaskPicture=$api->DoApiGetRequest('Article/'.$ArticleGuid.'/Thumbnails', null);
				$GetmaskPicture= json_decode($GetmaskPicture);
				$GetmaskPicture=$GetmaskPicture->{'Value'};
				
				//article size
				$article_w = $value->{'PageWidthOpen'};
				$article_h = $value->{'PageLengthOpen'};
				if($article_h != 0){
					$article_r = $article_w / $article_h;
				}				
				
				$mask_array = null;
				for($i = 0; $i < count($GetmaskPicture); $i++){
					$pictureType=explode(":", $GetmaskPicture[$i]->{'Type'});
					
					//get mask size
					$mask_size_w = 0;
					$mask_size_h = 0;
					for($j = 0; $j < count($GetmaskPicture[$i]->{'ThumbnailSetting'}); $j++){
						switch($GetmaskPicture[$i]->{'ThumbnailSetting'}[$j]->{'Key'}){
							case 'Metadata.Key': 
								$mask_size = explode('_', $GetmaskPicture[$i]->{'ThumbnailSetting'}[$j]->{'Value'});
								$mask_size_w = $mask_size[1];
								$mask_size_h = $mask_size[2];
								break;
							case 'SubMetadata.Key': 
								$mask_size = explode('_', $GetmaskPicture[$i]->{'ThumbnailSetting'}[$j]->{'Value'});
								$mask_size_w = $mask_size[1];
								$mask_size_h = $mask_size[2];
								break;
							default: break;
						}
					}
					
					if($article_w == $mask_size_w && $article_h == $mask_size_h){
						if($pictureType[0]=="mask"){
								$mask_array['mask'] = array(						
									"MaskUri"=> $GetmaskPicture[$i]->{'Uri'},"MaskThumbUri"=> $GetmaskPicture[$i]->{'ThumbnailUri'},"ArticleGuid"=>$ArticleGuid,"ThumbnailSetting"	=>$GetmaskPicture[$i]->{'ThumbnailSetting'}, "ThumbnailTranslation"	=>$GetmaskPicture[$i]->{'ThumbnailTranslation'}, "MaskSize"	=> $mask_size_w.'_'.$mask_size_h
									);						
						}
						
						$_submask = explode(":", $pictureType[0]);
						$_submask = explode("$", $_submask[0]);
	
						if($_submask[0] == 'submask' && $_submask[2] != 'background'){
							$submask_arr_temp = array(						
									"MaskUri"=> $GetmaskPicture[$i]->{'Uri'}, "MaskThumbUri"=> $GetmaskPicture[$i]->{'ThumbnailUri'}, "ThumbnailTranslation"	=>$GetmaskPicture[$i]->{'ThumbnailTranslation'});
							if(!is_array($mask_array['submask'])){
								$mask_array['submask'] = array();
							}
							array_push($mask_array['submask'], $submask_arr_temp);
						}
						
						if($_submask[2] == 'background'){
							$mask_array['background'] = array(						
									"MaskUri"=> $GetmaskPicture[$i]->{'Uri'}, "MaskThumbUri"=> $GetmaskPicture[$i]->{'ThumbnailUri'}, "MaskID"=>$_submask[1]
									);
						}	
					}					
				}
				
				if($mask_array != null){
					array_push($mask_array_return, $mask_array);
				}
			};

			foreach($_SESSION['prices_import'] as $key => $value){
				$prices_import_session = $_SESSION['prices_import'][$key];
				
				//get mask and background from paconline
				$masklink = null;
				$backgroundlink = null;
				$mask_style = '';
				$img_style = '';
				$checkArticleguid=$prices_import_session->{'ArticleGuid'};
				$checkMaskSize = $prices_import_session->{'PageWidthOpen'}.'_'.$prices_import_session->{'PageLengthOpen'};
				
				for($i=0;$i<count($mask_array_return);$i++){
					if ($mask_array_return[$i]['mask']['ArticleGuid']==$checkArticleguid && $mask_array_return[$i]['mask']['MaskSize'] == $checkMaskSize){
						$masklink=$mask_array_return[$i]['mask']['MaskThumbUri'];
						$backgroundlink=$mask_array_return[$i]['background']['MaskThumbUri'];
						
						//set size and position for mask and picture
						$big_mask_size = 460;
						$small_mask_size = 75;						
						$mask_settings = $mask_array_return[$i]['mask']['ThumbnailSetting'];
						for($j = 0; $j < count($mask_settings); $j++){
							switch($mask_settings[$j]->{'Key'}){
								case "Metadata.Position.Y": $mask_style .= 'top:'.$mask_settings[$j]->{'Value'} * $small_mask_size / $big_mask_size.'px;'; break;
								case "Metadata.Size.Height": $mask_style .= 'height:'.$mask_settings[$j]->{'Value'} * $small_mask_size / $big_mask_size.'px;'; break;
								case "Metadata.Position.X": $mask_style .= 'left:'.$mask_settings[$j]->{'Value'} * $small_mask_size / $big_mask_size.'px;'; break;
								case "Metadata.Size.Width": $mask_style .= 'width:'.$mask_settings[$j]->{'Value'} * $small_mask_size / $big_mask_size.'px;'; break;
								case "Metadata.ImgPosition.X": $img_style .= 'margin-left:'.$mask_settings[$j]->{'Value'} * $small_mask_size / $big_mask_size.'px;'; break;
								case "Metadata.ImgPosition.Y": $img_style .= 'margin-top:'.$mask_settings[$j]->{'Value'} * $small_mask_size / $big_mask_size.'px;'; break;
							}
						}
					}
				}				
				
				if(is_int($key) == true){					
					//assign parameters for session
					$value->{'ArticleID'} = 'article_'.$key;
					//save to object
					$shop_articles[count($shop_articles)] = $value;
					//loop pictures					
					$pictureContent = null;	
					$amountPicture += count($prices_import_session->{'Pictures'});
					$pictureTotal = 0;
					for($j = 0; $j < count($prices_import_session->{'Pictures'}); $j++){
						$pictures_import = $prices_import_session->{'Pictures'}[$j];
						if($pictures_import->{'Active'} == null){
							$pictureTotal++;
							$articlePictureBorder 		= 'article-picture-border_'.$key.$j;
							$pictureOrder 				= $j;
							$articlePictureFormat 		= 'article_'.$pictures_import->{'Format'};
							$articlePictureThumb 		= $pictures_import->{'ThumbnailUri'};
							$articlePictureUri 			= $pictures_import->{'ImageUri'};
							$articleId 					= $prices_import_session->{'ArticleID'};
							$articlePictureHandle 		= $pictures_import->{'Handle'};
							$articlePictureFileName 	= $pictures_import->{'Filename'};
							$articlePictureImageWidth 	= $pictures_import->{'ImageWidth'};
							$articlePictureImageHeight 	= $pictures_import->{'ImageHeight'};
							
							$articleRatio = $articlePictureImageWidth / $articlePictureImageHeight;
							if($articleRatio > $article_r){
								$articlePictureFormat = 'article_picture_portrait';
							}else{
								$articlePictureFormat = 'article_picture_landscape';
							}
							
							$articlePictureDeleteFunc 	= 'ArticlePictureDelete('.$key.','.$j.')';
							$articlePictureEditFunc 	= 'ArticlePictureEdit('.$key.','.$j.')';
							$articleThumbs =str_replace('.','_',$value->{'Identifier'});
							$img_background = $backgroundlink;
							$article_picture_mask=$masklink;
							$have_mask = ($mask_style == '') ? 'no' : 'yes';
							//pic array
							array_push($prices_import_sessions, $prices_import_session->{'Pictures'}[$j]); 
							//open the picture template file
							$pictureTemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/shopcartpicture.tpl');
							$pictureTemplate->replace_tags(array(
									"articlePictureBorder" 		=> array( $articlePictureBorder ,false),										
									"pictureOrder" 				=> array( $pictureOrder ,false),										
									"articlePictureFormat" 		=> array( $articlePictureFormat ,false),										
									"articlePictureThumb"		=> array( $articlePictureThumb ,false),										
									"articlePictureUri" 		=> array( $articlePictureUri ,false),										
									"articleId" 				=> array( $articleId ,false),										
									"articlePictureHandle" 		=> array( $articlePictureHandle ,false),										
									"articlePictureFileName" 	=> array( $articlePictureFileName ,false),										
									"articlePictureImageWidth" 	=> array( $articlePictureImageWidth ,false),										
									"articlePictureImageHeight" => array( $articlePictureImageHeight ,false),										
									"articlePictureDeleteFunc" 	=> array( $articlePictureDeleteFunc ,false),										
									"articlePictureEditFunc" 	=> array( $articlePictureEditFunc ,false),
									//"articleThumbs"				=> array( $articleThumbs ,false),
									"img_background"			=> array( $img_background ,false),
									"articlePicturemask"		=> array( $article_picture_mask ,false),				
									"mask_style"				=> array( $mask_style ,false),	
									"img_style"					=> array( $img_style ,false),	
									"have_mask"					=> array( $have_mask ,false)		
								  )
							);
							$pictureContent .= $pictureTemplate->getHtml();							
							
							//script
							$_picHandle = str_replace("-", "", $pictures_import->{'Handle'});
							$pictureObjectJsDefine .= 'eval("img'.$_picHandle.' = undefined");';
						}						
					}
					
					//loop android picture & others
					$androidItems = $prices_import_session->{'PrintData'}[0]->{'Items'};
					$androidItemSettings = $prices_import_session->{'PrintDataSettings'};
					$GroupName = $prices_import_session->{'PrintData'}[0]->{'GroupName'};
					$androidPictureNum = 0;

					$item_mask_style = '';
					$item_image_style = '';
					$small_mask_size = 75;
					$big_mask_size = 460;
					
					for($t = 0; $t < count($androidItemSettings); $t++){
						switch($androidItemSettings[$t]->{Key}){
							case 'Metadata.Position.X': $item_mask_style .= 'left: '.$androidItemSettings[$t]->{"Value"} * $small_mask_size / $big_mask_size .'px;'; break;
							case 'Metadata.Position.Y': $item_mask_style .= 'top: '.$androidItemSettings[$t]->{"Value"} * $small_mask_size / $big_mask_size .'px;'; break;
							case 'Metadata.ImgPosition.X': $item_image_style .= 'left: '.$androidItemSettings[$t]->{"Value"} * $small_mask_size / $big_mask_size .'px;'; break;
							case 'Metadata.ImgPosition.Y': $item_image_style .= 'top: '.$androidItemSettings[$t]->{"Value"} * $small_mask_size / $big_mask_size .'px;'; break;
							case 'Metadata.Size.Width': $item_mask_style .= 'width: '.$androidItemSettings[$t]->{"Value"} * $small_mask_size / $big_mask_size .'px;'; break;
							case 'Metadata.Size.Height': $item_mask_style .= 'height: '.$androidItemSettings[$t]->{"Value"} * $small_mask_size / $big_mask_size .'px;'; break;
							case 'Metadata.Size.Image.Width':  $item_image_style .= 'width: '.$androidItemSettings[$t]->{"Value"} * $small_mask_size / $big_mask_size .'px;'; break;
							case 'Metadata.Size.Image.Height':  $item_image_style .= 'height: '.$androidItemSettings[$t]->{"Value"} * $small_mask_size / $big_mask_size .'px;'; break;
						}
					}
					
					if($GroupName == 'MASK_PRODUCT'){
						$item_background = $androidItems[2];		
						$item_image = $androidItems[0];		
						$item_mask = $androidItems[1];	
						
						$maskPicture = new TemplateEngine(dirname(__FILE__).'/../tpl/shopmaskpicture.tpl');
						$maskPicture->replace_tags(array(
										"imgbackground" => array( $item_background ,false),																							
										"imgimage" => array( $item_image ,false),																							
										"imgmask" => array( $item_mask ,false),																				
										"mask_style" => array( $item_mask_style ,false),
										"img_style" => array ( $item_image_style, false )
									  )
								);
						$pictureContent .= $maskPicture->getHtml();	
					}else{
						for($k = 0; $k < count($androidItems); $k++){
							$androidPictureNum++;
							
							$androidPictureThumb = $androidItems[$k];
	
							//$androidPictureThumb = substr($androidPictureThumb, 0, strlen($androidPictureThumb) - 3)."thumb.".substr($androidPictureThumb, strlen($androidPictureThumb) - 3, 3);
	
							//open the picture template file
							$androidPicture = new TemplateEngine(dirname(__FILE__).'/../tpl/shopcartandroidpicture.tpl');
							$androidPicture->replace_tags(array(
											"androidPictureThumb" => array( $androidPictureThumb ,false),																							
										  )
									);
							$pictureContent .= $androidPicture->getHtml();
						}
					}				
					
					$articleId 				= $prices_import_session->{'ArticleID'};
					$articleDescription 	= $prices_import_session->{'Description'};	
					$articleName 			= $prices_import_session->{'Name'};
					$articleProductName		= $prices_import_session->{'ProductName'};
					$articlePriceType 		= $prices_import_session->{'PriceType'}; 	
					$articlePriceTime 		= $prices_import_session->{'PriceTime'}; 				
					$articleRun 			= $prices_import_session->{'Run'};
					$articleAmount 			= $prices_import_session->{'Amount'};
					$runOption ='';
					$amountOption ='';
					$amountRun ='';
					$runDiscount='';
					$drop_css_fix='';
					$max_volume = 1000;
					$runTemp = $prices_import_session->{'Runs'};
					$runTempdiscount=$prices_import_session->{'VolumeDiscounts'};
					
					//min run
					$min_run = 0;
					$changing_run_flag = null;
					for($m = 0; $m < count($prices_import_session->{'Pictures'}); $m++){
						if($prices_import_session->{'Pictures'}[$m]->{'Active'} == null){
							$min_run++;
						}
					}
					
					if($androidPictureNum > 0){$min_run = $androidPictureNum;}
					
					//change Run
					if($articleRun < $min_run){
						$articleRun = $min_run;
						$changing_run_flag = $articleId;
					}
					//change amount
					if($articleAmount < $min_run){
						$articleAmount = $min_run;
						$changing_run_flag = $articleId;
					}
					
					if(count($runTempdiscount) > 0){
						$max_volume = $runTempdiscount[count($runTempdiscount) - 1]->{'Amount'};
					}else if(count($runTemp) > 0){
						$max_volume = $runTemp[count($runTemp) - 1];
					}
					
					if(count($runTempdiscount)==0){
						if((count($runTemp) > 1) && ($prices_import_session->{'Product'} != 'Portrait')){
							for($r = 0; $r < count($runTemp); $r++){
								if($runTemp[$r] >= $min_run){
									$runOption .='<div class="drop-run-hide">'.$runTemp[$r].'<input type="hidden" value="'.$runTemp[$r].'"></br></div>';
								}else{
									$runOption .='<div class="drop-run-hide" style="display: none">'.$runTemp[$r].'<input type="hidden" value="'.$runTemp[$r].'"></br></div>';
								}								
							}
						$amountRun = "run";
						$firstRun=$articleRun;
						}else{
							for($r = 1; $r < 21; $r++){
								if($r >= $min_run){
									$runOption .='<div class="drop-run-hide">'.$r.'<input type="hidden" value="'.$r.'"></br></div>';
								}else{
									$runOption .='<div class="drop-run-hide" style="display: none">'.$r.'<input type="hidden" value="'.$r.'"></br></div>';
								}
							}
						$amountRun = "amount";
						$firstRun=$articleAmount;
						}
					}else {
						for($r=1;$r<($prices_import_session->{'VolumeDiscounts'}[0]->{'Amount'});$r++){
							$amount_product=$prices_import_session->{'VolumeDiscounts'}[$r]->{'Amount'};
							if($r >= $min_run){
								$runOption.='<div class="drop-run-hide"><b>'.$r.'</b><input type="hidden" value="'.$r.'"></br></div>';
							}
                    	}
						for ($r=0;$r<count($runTempdiscount);$r++){
							$amount_product=$prices_import_session->{'VolumeDiscounts'}[$r]->{'Amount'};
							$discount_product=$prices_import_session->{'VolumeDiscounts'}[$r]->{'Percentage'};
							if($amount_product >= $min_run){
								if($discount_product != 0)
									$runOption.='<div class="drop-run-hide"><b>'.$amount_product.'</b><input type="hidden" value="'.$amount_product.'"></br><span>(Save '.$discount_product.'%)'.'</span></div></br></br>';
								else
									$runOption.='<div class="drop-run-hide"><b>'.$amount_product.'</b><input type="hidden" value="'.$amount_product.'"></div>';
							}
						}
						$amountRun = "amount";
						$firstRun=$articleAmount;
					}
					
					//fix css of dropdow RunAmount box(fix height flexible with orther article)
					if(count($runTempdiscount)==0){
						if((count($runTemp) > 1)&&(count($runTemp)<10)){
							$height_dropbox= (count($runTemp)*20 + 5).'px';
							$drop_css_fix = 'height:'.$height_dropbox.'!important'.';';
						}else{
							$height_dropbox= (10*20).'px';
							$drop_css_fix = 'height:'.$height_dropbox.'!important'.' '.';'.'overflow-y:scroll'.';';
						}
					}else{
						if(count($runTempdiscount)<7){
							$height_dropbox= (count($runTempdiscount)*40+100).'px';
							$drop_css_fix = 'height:'.$height_dropbox.'!important'.';';
						}else{
							$height_dropbox= (6*30).'px';
							$drop_css_fix = 'height:'.$height_dropbox.'!important'.' '.';'.'overflow-y:scroll'.';';
						}
					}						
					$articlePrice 			= $prices_import_session->{'ProductPrice'};
					$articlePriceVAT 		= round($prices_import_session->{'ProductPriceVAT'},2);
					$articleCurrency 		= $prices_import_session->{'Prices'}->{'Items'}[0]->{'Currency'};
					
					//show price with VAT or not
					if($profile_user['EndUserPriceFormat'] == "Net")
						{$articlePriceShow 		= formatCurrency($articlePrice, $articleCurrency).' '.$articleCurrency;}				
					else
						{$articlePriceShow 		= formatCurrency($articlePriceVAT, $articleCurrency).' '.$articleCurrency;}
					
					$articleOldPriceShow = '';
					$articlePriceShowStyle = '';
					
					if(isset($prices_import_session->{'VolumeDiscounts'})){
						if(count($prices_import_session->{'VolumeDiscounts'})*1 != 0){
							$realPricesNonDiscount = 0;
							
							foreach($prices_import_session->{'Prices'}->{'Items'} as $n => $v){
								if(stristr($v->{'Type'}, 'Shipment') === false){
									if($profile_user['EndUserPriceFormat'] == "Net")
										$realPricesNonDiscount += $v->{'SaleNet'} ;
									else
										$realPricesNonDiscount += $v->{'SaleNet'} + ($v->{'SaleNet'} * $v->{'VatPercentage'} / 100);
								}															
							}
							
							$pricesToDisplay = ($prices_import_session->{'Amount'}*1 == 1) ? formatCurrency($pictureTotal * $realPricesNonDiscount, $_SESSION["current_currency"]['key']).' '.$_SESSION["current_currency"]['key'] : formatCurrency($prices_import_session->{'Amount'} * $realPricesNonDiscount, $_SESSION["current_currency"]['key']).' '.$_SESSION["current_currency"]['key'];
							
							foreach($prices_import_session->{'VolumeDiscounts'} as $c => $r){
								if($prices_import_session->{'Amount'}*1 == $r->{'Amount'}){
									if($r->{'Percentage'} != 0){
										$articleOldPriceShow .= '<span class="priceDiv-articleOldPriceShow" style="text-decoration: line-through;">';
										$articleOldPriceShow .= $pricesToDisplay;
										$articleOldPriceShow .= '</span>';	
										$articlePriceShowStyle = 'red';
									}
									break;
								}
								
							}
						}
					}
					//reset acount number for picture
					$pictureTotal = 0;
					
					$articlePageWidthOpen 	= $prices_import_session->{'PageWidthOpen'}; 				
					$articlePageLengthOpen 	= $prices_import_session->{'PageLengthOpen'};					
										
					//sum of price
					$baokim_totalPrice 	+= $articlePrice;
					$baokim_proName 	.= $prices_import_session->{'Name'} . ';';
					$baokim_description .= $prices_import_session->{'Description'} . ';';
					
					//open the article template file
					$articleTemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/shopcartarticle.tpl');
					$articleTemplate->replace_tags(array(
									"item_sku" 						=> array( $i ,false),
									"articleId" 					=> array( $articleId ,false),																	
									"articleguid" 					=> array( $checkArticleguid ,false),																	
									"changing_run_flag" 			=> array( $changing_run_flag ,false),										
									"articleDescription" 			=> array( $articleDescription ,false),										
									"articleName" 					=> array( $articleName ,false),										
									"articleProductName" 			=> array( $articleProductName ,false),										
									"transProductFinishedCaption" 	=> array( $translation->translate('ProductFinishedCaption') ,false),										
									"articlePriceType" 				=> array( $articlePriceType ,false),										
									"articlePriceTime" 				=> array( $articlePriceTime ,false),										
									"articlePriceShowStyle" 		=> array( $articlePriceShowStyle ,false),										
									"runOption" 					=> array( $runOption ,false),										
									"amountOption" 					=> array( $amountOption ,false),										
									"amountRun" 					=> array( $amountRun ,false),										
									"articlePrice" 					=> array( $articlePrice ,false),										
									"articleOldPriceShow" 			=> array( $articleOldPriceShow ,false),										
									"articlePriceVAT" 				=> array( $articlePriceVAT ,false),										
									"articlePriceShow" 				=> array( $articlePriceShow ,false),										
									"articlePageWidthOpen" 			=> array( $articlePageWidthOpen ,false),										
									"articlePageLengthOpen" 		=> array( $articlePageLengthOpen ,false),													
									"articlePictures" 				=> array( $pictureContent ,false),
									"firstRun"						=> array( $firstRun ,false),
									"fix_height_css"				=> array( $drop_css_fix ,false),		
									"max_volume"					=> array( $max_volume ,false),		
								  )
							); 		
					$articleContent .= $articleTemplate->getHtml();
 				}
			}	
		}
		$Info_Before_Checkout = null;
		
		if(isset($_SESSION["Info_Before_Checkout"]) && isset($_POST["L_QTY0"])){
			$Info_Before_Checkout = $_SESSION["Info_Before_Checkout"];			
		}
		
		$guidUserShopCart = null;
		
		if(isset($_SESSION['prices_import']['guid-user-from-android'])){			
			$guidUserShopCart = $_SESSION['prices_import']['guid-user-from-android'];				
		}
		
		//open crop js template file
		$dgocropjstpl = new TemplateEngine(dirname(__FILE__).'/../tpl/dgo.crop.js.tpl');
		
		$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/shopcartpage.js.tpl');
		
		$jstemplate->replace_tags(array(										
										"imageHandleArray" 				=> array(json_encode($_SESSION['prices_import']),false),
										"amountPictures" 				=> array($amountPicture,false),			
										"shopArticles" 					=> array(json_encode($shop_articles),false),
										"addressSession" 				=> array(json_encode($_SESSION['anonymous']),false),										
										"Info_Before_Checkout" 			=> array(json_encode($Info_Before_Checkout),false),	
										"guidUserShopCart" 				=> array( $guidUserShopCart ,false),	
										"pictureObjectJsDefine" 		=> array( $pictureObjectJsDefine, false),
										"dgocropjstpl" 					=> array( $dgocropjstpl->getHtml(), false),								
										"somepictures" 					=> array( json_encode($translation->translate('SomePictures')), false),	
										"1picture" 						=> array( json_encode($translation->translate('1Picture')), false),	
										"youhavealso" 					=> array( json_encode($translation->translate('YouHaveAlso')), false),	
										"whichnottouchedyet" 			=> array( json_encode($translation->translate('WhichNotTouchedYet')), false),	
										"pic_import_arr" 				=> array( json_encode($prices_import_sessions), false),
										"maskArray" 					=> array(json_encode($mask_array_return),false)								
									  )
								);					
		$script = $jstemplate->getHtml();

		$imgLoading = "<img src='".linkToPlugin."css/img/icon/ajax-loading.gif'>";
		
		//open crop template file	
		$dgocroptpl = new TemplateEngine(dirname(__FILE__).'/../tpl/dgo.crop.tpl');
		$dgocroptpl->replace_tags(array(
			"pluginUrl" 			=> array(linkToPlugin,false),
			"transQuality" 			=> array($translation->translate('Quality') ,false),										
			"transPreview" 			=> array($translation->translate('Preview') ,false),										
			"transCropFitpictures" 	=> array($translation->translate('CropFitpictures') ,false),
			"transOrientation" 		=> array($translation->translate('Orientation') ,false),										
			"transZoom" 			=> array($translation->translate('Zoom') ,false),
			"transDone" 			=> array($translation->translate('Done') ,false),
			"transPreview" 			=> array($translation->translate('Preview') ,false),
		));
		
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/shopcartpage.tpl');
		$template->replace_tags(array(
										"scriptPlaceHolder" 			=> array( $script ,false),
										"articleArticles" 				=> array( $articleContent ,false),										
										"transOrder" 					=> array( $translation->translate('Order') ,false),										
										"transPos" 						=> array( $translation->translate('Pos') ,false),										
										"transArticleAndDescription" 	=> array( $translation->translate('ArticleAndDescription') ,false),										
										"transAmount" 					=> array( $translation->translate('Amount') ,false),										
										"transAction" 					=> array( $translation->translate('Action') ,false),										
										"transPrice" 					=> array( $translation->translate('Price') ,false),										
										"transSelectShippingAddress" 	=> array( $translation->translate('SelectShippingAddress') ,false),										
										"transYourAddress" 				=> array( $translation->translate('YourAddress') ,false),										
										"transFree" 					=> array( $translation->translate('Free') ,false),										
										"transCropMessage" 				=> array( $translation->translate('CropMessage') ,false),										
										"transSelectShippingMethod" 	=> array( $translation->translate('SelectShippingMethod') ,false),										
										"transStandardShipping" 		=> array( $translation->translate('StandardShipping') ,false),										
										"transSelectPaymentMethod" 		=> array( $translation->translate('SelectPaymentMethod') ,false),										
										"transPaymentMethod" 			=> array( $translation->translate('PaymentMethod') ,false),										
										"transTermsAndConditionCaption" => array( $translation->translate('TermsAndConditionCaption') ,false),
										"transCartEmptyText" 			=> array( $translation->translate('CartEmptyText') ,false),										
										"transInclude" 					=> array( $translation->translate('includedPrices') ,false),																			
										"transName" 	=> array( $translation->translate('Name') ,false),																			
										"transMr" 	=> array( $translation->translate('Mr') ,false),																			
										"transMrs" 	=> array( $translation->translate('Mrs') ,false),																			
										"transNeutral" 	=> array( $translation->translate('Neutral') ,false),																			
										"transCompany" 	=> array( $translation->translate('Company') ,false),																			
										"transStreet" 	=> array( $translation->translate('Street') ,false),																			
										"transCity" 	=> array( $translation->translate('City') ,false),																			
										"transZip" 	=> array( $translation->translate('Zip') ,false),																			
										"transCountry" 	=> array( $translation->translate('Country') ,false),																			
										"transPhone" 	=> array( $translation->translate('Phone') ,false),																			
										"transEmail" 	=> array( $translation->translate('Email') ,false),																			
										"transPasswordSettings" 	=> array( $translation->translate('PasswordSettings') ,false),																			
										"transPassword" 	=> array( $translation->translate('Password') ,false),																			
										"transSendMeOffer" 	=> array( $translation->translate('SendMeOffer') ,false),																			
										"transNote" 	=> array( $translation->translate('Note') ,false),																			
										"transSave" 	=> array( $translation->translate('Save') ,false),																			
										"transAddress" 	=> array( $translation->translate('Address') ,false),																			
										"transPaymentMethod" 	=> array( $translation->translate('PaymentMethod') ,false),																			
										"transAlreadyAnAccountCaption" 	=> array( $translation->translate('AlreadyAnAccountCaption') ,false),																			
										"transLoginHere" 	=> array( $translation->translate('LoginHere') ,false),																			
										"transShippingType" 	=> array( $translation->translate('ShippingType') ,false),																			
										"transShowMePriceFor" 	=> array( $translation->translate('ShowMePriceFor') ,false),																			
										"transState" 	=> array( $translation->translate('State') ,false),																			
										"transNewAddressCaption" 	=> array( $translation->translate('NewAddressCaption') ,false),																			
										"transOrChoose" 	=> array( $translation->translate('OrChoose') ,false),																			
										"transLoginReturningCus" 	=> array( $translation->translate('LoginReturningCus') ,false),																			
										"transSelectShippingAddress" 	=> array( $translation->translate('SelectShippingAddress') ,false),																			
										"transSelectThisAddress" 	=> array( $translation->translate('SelectThisAddress') ,false),																			
										"transSearch" 	=> array( $translation->translate('Search') ,false),																			
										"transNewAddressCaption" 	=> array( $translation->translate('NewAddressCaption') ,false),																																					
										"transLoginReturningCus" 	=> array( $translation->translate('LoginReturningCus') ,false),																																					
										"TotalAmount" 					=> array( $baokim_totalPrice ,false),																			
										"productName" 					=> array( $baokim_proName ,false),																			
										"productQuantity" 				=> array( $baokim_quantity ,false),																			
										"productDescription" 			=> array( $baokim_description ,false),																			
										"pageUrl" 						=> array( $pageURL ,false),																			
										"returnURi" 					=> array( $pageURL ,false),																			
										"userLanguage" 					=> array( "EN" ,false),																			
										"imgLoadingSmall" 				=> array( $imgLoading ,false),	
										"dgocroptpl" 					=> array( $dgocroptpl->getHtml(), false),
										"metaTag"					=> array($postTitle,false),										
										"blogName"					=> array(get_bloginfo(),false),										
									  )
								);
		
		//get the html code of the control
		echo $html = $template->getHtml();
	}
	
	//function create address book page
	function createShopCartPage(){
		//create a new shopping cart page
        //If hasn't any page with name: Shopping cart, inserting a page with this name
        $page = get_page_by_title('Shopping Cart');
        if(!$page){
            //init page
            $currentData['post_title'] 		= 'Shopping Cart';            
            $currentData['post_content'] 	= "[shopcartplaceholder]";
            $currentData['post_status'] 	= 'publish';
            $currentData['comment_status'] 	= 'closed';
            $currentData['ping_status'] 	= 'closed';
            $currentData['post_type'] 		= 'page';
            //insert page
            $pageID = wp_insert_post($currentData);
            //using add_option to mark it
            delete_option('shoppingPageID');
            add_option('shoppingPageID', $pageID); 
            //using add_option to remember the title of page 
            delete_option('shoppingPageTitle');
            add_option('shoppingPageTitle', $currentData['post_title']);         
        }
	}
?>