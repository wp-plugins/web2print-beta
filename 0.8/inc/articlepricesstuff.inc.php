<?php
/*
 * function to create article & prices page
 * 
 * Peter / Dao Hung Cuong
 * 
 */

 	//remove_filter ('the_content', 'wpautop');
	//add_filter('the_content', 'dgoReplaceArticlePricesPlaceholder',100);
	add_shortcode('articlepricesplaceholder', 'dgoReplaceArticlePricesPlaceholder');
		
	//function fill data
	function dgoReplaceArticlePricesPlaceholder($data){		
		if (!class_exists('TemplateEngine')) {
		 	//needed for every other control
			require_once 'dgoControls/inc/template_engine.php'; 	
		}

		require_once('translation.class.php');	
		
		$productdetailsPageID 		= get_option('productdetailsPageID');
		
		$page = get_post(get_option('articlePricesPageID'));		
		//get meta tag for this post
		$postTitle = $page->post_title;
		
		$designDetailsPageID 		= get_option('designDetailsPageID');
		//get product details link
		$arrPro						= get_permalink($productdetailsPageID);
		$arrDesignDetails			= get_permalink($designDetailsPageID);
		
		//change to array
		$arrPro						= explode("/",$arrPro);
		$arrDesignDetails			= explode("/",$arrDesignDetails);
			
		$translation 				= new Web_2_print_Translation('web2print');	

		//echo $translation->translate('Keyword_products').'_(.*)$'.'<br>';
		//echo 'index.php?pagename='.$arrPro[count($arrPro)-1];
		
		//add new rule for rewrite url. e.g: photo_cug#cup-1999-0_40x40mm-1_Run
	    //add_rewrite_rule($translation->translate('Keyword_products').'_(.*)$', 'index.php?pagename='.$arrPro[count($arrPro)-1],'top');
		add_rewrite_rule('(anh|photo|foto)_(.*)$', 'index.php?pagename='.$arrPro[count($arrPro)-1],'top');		
	    add_rewrite_rule('design_(.*)$', 'index.php?pagename='.$arrDesignDetails[count($arrDesignDetails)-1],'top');
	    add_rewrite_rule('register$', 'index.php','top');
    	add_rewrite_rule('login$', 'index.php','top');
	    //Remove rewrite rules and then recreate rewrite rules.
	    flush_rewrite_rules(false);
		
		//Get info of changing options
		//$plugin_option = get_option("w2p_plugin_option");
		$globallanguage = explode("_",$_SESSION["current_language"]['key']);
		
		//use template for js
		//$jstemplate = new TemplateEngine(dirname(__FILE__).'/../tpl/articleprices.js.tpl');
		
		//$script = $jstemplate->getHtml();	

		//Get info of changing options
		$profile_user = get_option("profile_user_info");

		//Get info of changing options
		$plugin_option = get_option("w2p_plugin_option");
		
		//open the template file
		$template = new TemplateEngine(dirname(__FILE__).'/../tpl/articleprices.tpl');	
		
		include_once "api_class/dgo_api.class.php";
		
		include_once "api_class/GroupArticle.php";
					
		$api = new DgoApiConnectionW2P();
		
		$api->setApiKey($profile_user['apikey']);
		
		$api->setApiSecret($profile_user['secret']);
		
		$res = $api->DoApiGetRequest('ArticleGroups',$globallanguage[0],'ArticleGroups:'.$globallanguage[0]);		
		
		$res1 =$api->DoApiGetRequest('Customer/'.$profile_user['apikey'].'/ResaleUnit/'.$profile_user['resaleGuid'].'/Articles', $globallanguage[0], 'Available:'.$globallanguage[0]);
		
		if(W2PConfig::$PortalTagString == "nhain")
			$categories = $api->DoApiGetRequest('Category/'.$globallanguage[0].'/Article', null, W2PConfig::$PortalTagString.':'.$globallanguage[0]);
		else
			$categories = $api->DoApiGetRequest('Category/'.$globallanguage[0].'/Article/'.W2PConfig::$PortalTagString, null, W2PConfig::$PortalTagString.':'.$globallanguage[0]);	
		
		$categories = json_decode($categories);	
		$categories = $categories->{'Value'}->{'Children'};	
		
		$res = json_decode($res);		
		
		$res1 = json_decode($res1);		
		
		$arr= $res1->{'Value'};
		
		$article = ArticleDecentralization1($arr, $res->{'Value'}, $translation);	

		foreach($article as $key => $value){
			if(count($value['Items']) > 1){				
				for($j = 0;$j < count($value['Items']);$j++){					
					$size_j = $value['Items'][$j]->{'PageLengthOpen'} * $value['Items'][$j]->{'PageWidthOpen'};					
					$size_j = ($value['Items'][$j]->{'PageDepthOpen'} == "") ? $size_j : $size_j * $value['Items'][$j]->{'PageDepthOpen'};
					for($k = $j+1;$k < count($value['Items']);$k++){						
						$size_k = $value['Items'][$k]->{'PageLengthOpen'} * $value['Items'][$k]->{'PageWidthOpen'};
						$size_k = ($value['Items'][$k]->{'PageDepthOpen'} == "") ? $size_k : $size_k * $value['Items'][$k]->{'PageDepthOpen'};						
						if($size_k < $size_j){
							$tmp = array();
							$tmp = $article[$key]['Items'][$k];
							$article[$key]['Items'][$k] = $article[$key]['Items'][$j];
							$article[$key]['Items'][$j] = $tmp;		
						}
					}
				}
			}
		}

		//get keyword
		$keywordSlider = $translation->translate('Keyword_products');
		
		//get site url
		$linkToPlugin = 'http://'.$_SERVER['SERVER_NAME'];
		//get real path
		$RealPath=$_SERVER['DOCUMENT_ROOT'];
		
		//add wordpress if you're in localhost
		if($linkToPlugin=='http://localhost'){
				$linkToPlugin .= '/wordpress';
				$RealPath .='/wordpress';
		}		
		
		if(W2PConfig::$PortalTagString == "nhain"){
			foreach($article as $key=>$value){
				$iconCat = file_exists($RealPath.'/wp-content/themes/iblogpro_nhain/css/img/imgArticle/'.$key.'.png') == true ? $linkToPlugin.'/wp-content/themes/iblogpro_nhain/css/img/imgArticle/'.$key.'.png' : $linkToPlugin.'/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgArticle/STANDARD.png';				
				if($key!='CRYSTAL'){
					if(!isset($plugin_option['ArticleName'][makeFriendlyUrl($article[$key]["Name"])])){
						$plugin_option['ArticleName'][makeFriendlyUrl($article[$key]["Name"])] = $article[$key]["Name"];
					}else if($plugin_option['ArticleName'][makeFriendlyUrl($article[$key]["Name"])] != $article[$key]["Name"]){
						$plugin_option['ArticleName'][makeFriendlyUrl($article[$key]["Name"])] = $article[$key]["Name"];
					}
					
					$article_price .= '<div class="art-part-1-element" ><input type="hidden" class="articleGroupId" ><a href="'.$linkToPlugin.'/'.$keywordSlider.'_'.makeFriendlyUrl($article[$key]["Name"]).'#'.makeFriendlyUrl($article[$key]["Name"]).'-A'.Helper::base_dec2base($article[$key]['Items'][0]->{'Id'}, 62).'" class="article-link"><div class="art-part-1-element-pic"><img src="'.$iconCat.'"></div><div class="art-part-1-element-label">'.$article[$key]["Name"].'</div></a></div>';
				}
				else{
					if(!isset($plugin_option['ArticleName'][makeFriendlyUrl($article[$key]["Name"])])){
						$plugin_option['ArticleName'][makeFriendlyUrl($article[$key]["Name"])] = $article[$key]["Name"];
					}else if($plugin_option['ArticleName'][makeFriendlyUrl($article[$key]["Name"])] != $article[$key]["Name"]){
						$plugin_option['ArticleName'][makeFriendlyUrl($article[$key]["Name"])] = $article[$key]["Name"];
					}
				
					$article_price .= '<div class="art-part-1-element" ><input type="hidden" class="articleGroupId" ><a href="'.$linkToPlugin.'/'.$keywordSlider.'_'.makeFriendlyUrl($article[$key]["Name"]).'#'.makeFriendlyUrl($article[$key]['Items']['CRYSTAL_CUBIC'][0]->{'Name'}).'-A'.Helper::base_dec2base($article[$key]['Items']['CRYSTAL_CUBIC'][0]->{'Id'}, 62).'" class="article-link"><div class="art-part-1-element-pic"><img src="'.$iconCat.'"></div><div class="art-part-1-element-label">'.$article[$key]["Name"].'</div></a></div>';
				}
			}
			
			//update to wp database
			update_option('w2p_plugin_option', $plugin_option);
		}else{
			foreach($article as $key => $value){	
				if(isset($value['Items'][0]->{'Categories'})){
					foreach($value['Items'][0]->{'Categories'} as $k => $v){
						for($i = 0;$i < count($categories);$i++){								
							if($v == $categories[$i]->{'Key'}){						
								$article[$key]['Tagstring'] = $categories[$i]->{'Name'};						
								$article[$key]['Name'] = $categories[$i]->{'Name'};						
							}else if(isset($categories[$i]->{'Children'})){
								foreach($categories[$i]->{'Children'} as $number => $result){							
									if($v == $result->{'Key'}){	
										$article[$key]['Tagstring'] = $result->{'Name'};		
										$article[$key]['Name'] = $result->{'Name'};		
									}
								}
							}
						}
					}
				}			
			}
			foreach($categories as $key => $value){
				if(isset($value->{'Children'})){
					foreach($value->{'Children'} as $k => $v){	
						if(!isset($plugin_option['ArticleName'][makeFriendlyUrl($v->{'Name'})])){
							$plugin_option['ArticleName'][makeFriendlyUrl($v->{'Name'})] = $v->{'Name'};
						}else if($plugin_option['ArticleName'][makeFriendlyUrl($v->{'Name'})] != $v->{'Name'}){
							$plugin_option['ArticleName'][makeFriendlyUrl($v->{'Name'})] = $v->{'Name'};
						}
						
						$iconCat = file_exists($RealPath.'/wp-content/themes/PlakateComWpTheme/css/img/imgArticle/'.strtoupper(makeFriendlyUrl($v->{'TagString'})).'.png') == true ? $linkToPlugin.'/wp-content/themes/PlakateComWpTheme/css/img/imgArticle/'.strtoupper(makeFriendlyUrl($v->{'TagString'})).'.png' : $linkToPlugin.'/wp-content/plugins/Web_2_Print_XML_V3/css/img/imgArticle/STANDARD.png';
						$article_price .= '<div class="art-part-1-element" ><input type="hidden" class="articleGroupId" ><a href="'.$linkToPlugin.'/'.$keywordSlider.'_'.makeFriendlyUrl($v->{'Name'}).'#'.makeFriendlyUrl($v->{'Name'}).'-C'.Helper::base_dec2base($v->{'Key'}, 62).'" class="article-link"><div class="art-part-1-element-pic"><img src="'.$iconCat.'"></div><div class="art-part-1-element-label">'.$v->{'Name'}.'</div></a></div>';		
					}
				}			
			}
			
			//update to wp database
			update_option('w2p_plugin_option', $plugin_option);
		}

		$template->replace_tags(array(
										"scriptPlaceHolder" 	=> array($script,false),
										"pluginUrl" 			=> array(linkToPlugin,false),										
										"globallanguage" 		=> array($globallanguage[1] ,false),										
										"photoTrans" 			=> array($translation->translate('Keyword_products') ,false),
										"article_price"			=>array($article_price,false),
										"metaTag"				=>array($postTitle,false),										
										"blogName"				=>array(get_bloginfo(),false),										
									)
								);
		//get the html code of the control
		echo $html = $template->getHtml();
	}
	
	//function create account details page
	function createArticlePricesPage(){
		//If hasn't any page with name: Address Book, inserting a page with this name
		$page = get_page_by_title('Article & Price');
        if(!$page){
            //init page
            $currentData['post_title'] 		= 'Article & Price';            
            $currentData['post_content'] 	= "[articlepricesplaceholder]";
            $currentData['post_status'] 	= 'publish';
            $currentData['comment_status'] 	= 'closed';
            $currentData['ping_status'] 	= 'closed';
            $currentData['post_type'] 		= 'page';
            //insert page
            $pageID = wp_insert_post($currentData);
            //using add_option to mark it
            delete_option('articlePricesPageID');
            add_option('articlePricesPageID', $pageID); 
            
            //using add_option to remember the title of page 
            delete_option('articlePricesPageTitle');
            add_option('articlePricesPageTitle', $currentData['post_title']);

            //update post metadata to set our own full width template
			update_post_meta($pageID, "_wp_page_template", "page-fullwidth.php");
        }
	}
	
?>