<?php
	session_start();
		
	include_once "api_class/dgo_api.class.php";		
	
/*Hook function Administrator*/
function adminInitFunction(){
    ?>
        <script type="text/javascript">
        //+function getblog url+//
            function getBlogUrl(){
                var blogUrl = '<?php echo get_bloginfo('url'); ?>/wp-content/plugins/Web_2_Print_XML_V3';
                return blogUrl;
            }
        </script>
    <?php
}
/*Admin page=================================*/
    //function create administrator page
    function createAdminMenu(){
        //parent menu Web 2 print
        add_menu_page('Web 2 Print', 'Web 2 Print', 'manage_options', 'general-settings', 'createAdminOption', get_bloginfo('url').'/wp-content/plugins/Web_2_Print_XML_V3/css/img/icon/warrior_red_favicon(2).ico', 30);
        //submenu
        add_submenu_page('general-settings','Web 2 Print >> General','General','manage_options','general-settings','createAdminOption');
        add_submenu_page( 'general-settings', 'Web 2 Print >> Widget', 'Widgets', 'manage_options', 'widget-settings', 'widgetAdminOption');
		add_submenu_page( 'general-settings', 'Web 2 Print >> Themes', 'Themes', 'manage_options', 'theme-settings', 'themeAdminOption');
		add_submenu_page( 'general-settings', 'Web 2 Print >> Options', 'Options', 'manage_options', 'options-settings', 'optionsAdminOption');
    }
    //function create Admin options
    function createAdminOption(){
        if (!current_user_can('manage_options'))  {
            wp_die( __('You do not have sufficient permissions to access this page.') );
        }
        
        //logout
        if(isset($_POST['logout-flag'])){
        	$profile_user['apikey'] 			= 'none';
			$profile_user['secret'] 			= 'none';
			$profile_user['resale'] 			= 'none';
			$profile_user['resaleGuid'] 		= 'none';
			$profile_user['EndUserPriceFormat'] = 'none';
			$profile_user['MaxNumOfResaleUnits'] = 'none';
			//update profile user login
			update_option( 'profile_user_info', $profile_user );
        }
        
        //Affiliate login
		if(isset($_POST["affiliateId"])){
			$profile_user['apikey'] = $_POST["affiliateId"];
			$profile_user['secret'] = $_POST["affiliatePass"];
			$profile_user['resale'] = $_POST["afiiliateResale"];
			$profile_user['MaxNumOfResaleUnits'] = $_POST["MaxNumOfResaleUnits"];
			
			//update profile user login
			update_option( 'profile_user_info', $profile_user );

			$plugin_option = get_option("w2p_plugin_option");			
			
			$arrLanguage = array(
								  	"EN" => "English",
									"CS" => "Czech",
									"DK" => "Danish",
									"NL" => "Dutch",
									"ET" => "Estonian",
									"FI" => "Finnish",
									"FR" => "French",
									"DE" => "German",
									"HU" => "Hungarian",
									"PL" => "Polish",
									"RO" => "Romanian",
									"SV" => "Swedish",
									"VI" => "Vietnamese"
								);
								
			foreach($arrLanguage as $key => $value){
				if($key == $_POST["current-language"]){
					$plugin_option['language_name'] = $value;
				}
			}
			
			//if no value match, we set default language is English
			if($plugin_option['language_name'] == ""){
				$plugin_option['language_name'] = "English";
				$plugin_option['language']		= "EN";				
			}else{
				$plugin_option['language'] = $_POST["current-language"];				
			}

			$plugin_option['currency'] = $_POST["current-currency"];	
			
			//update option
        	update_option('w2p_plugin_option', $plugin_option); 
        	
		}
		
		//chose shop at the first time
		if(isset($_POST['affiliateSelect'])){
			$profile_user_old 			= get_option('profile_user_info');
			$profile_user['apikey'] 	= $profile_user_old['apikey'];
			$profile_user['secret'] 	= $profile_user_old['secret'];
			$profile_user['MaxNumOfResaleUnits'] = $profile_user_old["MaxNumOfResaleUnits"];
			$profile_user['resale'] 	= $_POST['affiliateSelect'];
			$profile_user['resaleGuid'] = $_POST['resale-guid'];			
			$profile_user['EndUserPriceFormat'] = $_POST['EndUserPriceFormat'];
			
			//update profile user login
			update_option( 'profile_user_info', $profile_user );
		}				
        
		$plugin_option = get_option("w2p_plugin_option");
		
		if($plugin_option['language'] == ""){
			$_SESSION["current_language"]['key'] = "en_EN";
		}else{
			$_SESSION["current_language"]['key'] = strtolower($plugin_option['language'])."_".$plugin_option['language'];
		}
		
		//<Provisions Form            
        //Include language file
		require_once("pluginComponents/provisionsForm.php");			
       ?>   
       
       		 <link href="<?php echo linkToPlugin; ?>css/jquery-ui.css" rel="stylesheet" type="text/css"/?>
             <script type="text/javascript">           
                //global articleProfit
                var affiliate_level = new Array();
                var articleProfit;
                
                //article group array                
                var articleGroupArr = new Array();                
                var dgoCurrentPage  = 'admin';
                var dgoContacting 	= null;
				//parameters use in provision configure
                var dgoArticleGroup = null;
                var dgoAllDiscounts = null;
                var dgoDefaultPercentage = 0; 
                //-------------------------------------
                //Discount shop object
                var shopDiscount = [];                

                var PortalName = null;
                var Username   = null;

                var settingKey     = <?php echo (isset($_SESSION['dgoUserLogin']['loginProvider']) ? '"'.$_SESSION['dgoUserLogin']['loginProvider'].'"' : "null") ?>;
                var settingValue   = <?php echo (isset($_SESSION['dgoUserLogin']['email']) ? '"'.$_SESSION['dgoUserLogin']['email'].'"' : "null") ?>;

        		if(settingKey != null && settingValue != null && dgoCurrentPage == 'admin'){	
        			contactingLoginViaProvider(settingKey,settingValue);	        				          			
                }
                
                //get profile user info
                <?php 
                	$profile_user 	= get_option('profile_user_info'); 
                	$plugin_option 	= get_option("w2p_plugin_option");
					
                	
                	//ApiKey and ApiSecret use in ajaxproxy.php
					$_SESSION['ApiKey'] 	= $profile_user['apikey'];
					$_SESSION['ApiSecret']  = $profile_user['secret'];
					
					$language = explode("_", $_SESSION["current_language"]['key']);
					
					$api = new DgoApiConnectionW2P();					
					$api->setApiKey($profile_user['apikey']);							
					$api->setApiSecret($profile_user['secret']);
					//call api by PHP
					$portal = $api->DoApiGetRequest('Portal/'.$language[1], null, 'Portal:'.$language[1]);
					$contacting = $api->DoApiGetRequest('Customer/Guid/'.$profile_user['apikey'], null, 'Contacting:'.$profile_user['apikey']);
					$articleGroup = $api->DoApiGetRequest('ArticleGroups',$language[1],'ArticleGroups:'.$language[1]);
					$resaleUnits = $api->DoApiGetRequest('Customer/'.$profile_user['apikey'].'/ResaleUnits',null,'ResaleUnits:'.$profile_user['apikey']);
					$profitArray = $api->DoApiGetRequest('Customer/'.$profile_user['apikey'].'/Discounts',null,'Discounts:'.$profile_user['apikey']);
					$salesStatistic = $api->GetSalesStatistic('Affiliate/'.$profile_user['apikey'].'/Sales');
                ?>      
              	//visibility status
                var visibilityCalculator 		= '<?php echo $plugin_option['Visibility']['Calculator']; ?>';
                
                var profile_user = new Array();
                profile_user['apikey'] 		= '<?php echo $profile_user['apikey'] ?>';
                profile_user['secret'] 		= '<?php echo $profile_user['secret'] ?>';
                profile_user['resale'] 		= '<?php echo $profile_user['resale'] ?>';
                profile_user['resaleGuid'] 	= '<?php echo $profile_user['resaleGuid'] ?>';
                profile_user['EndUserPriceFormat'] 	= '<?php echo $profile_user['EndUserPriceFormat'] ?>';
                profile_user['MaxNumOfResaleUnits'] 	= '<?php echo $profile_user['MaxNumOfResaleUnits'] ?>';

                var globalCurrencyToken 	= '<?php echo $plugin_option['currency']?>';
                var globalLanguage 			= '<?php echo $plugin_option['language']?>';
				
                //if plugin user configured already
                if( profile_user['apikey'] != 'none'){
                	//don't show the affiliate login
                	affiliateLoginHide();                	
            		//get contacting info
					contactingGet_handle(<?php echo $contacting; ?>, <?php echo $salesStatistic; ?>);
            		//contactingGet( profile_user['apikey'] );
            		//Get Product Group
					articleGroupGet_handle(<?php echo $articleGroup; ?>);
                	//articleGroupGet();                 	
					//get portal info
                	apiGetPortalFromPhp(<?php echo $portal; ?>); 
					
                	//show the first time
                	var comeback = '';
                	var whichShopChosen = 'none';
                	if(profile_user['resale'] == 'new'){                		
                		comeback = 'new';
                		//askShopChosen(shopDiscount);
                	}else{
                		//which shop plgin user chooses
                		whichShopChosen = profile_user['resale'];
	                	//disabled Currency select box ;-)	                	
	                	jQuery('.currency-select').attr({disabled: 'disabled'});
	                } 
					
					adminResaleGet_handle(<?php echo $resaleUnits; ?>, comeback, <?php echo $profitArray; ?>);
	                //Get resale units
	                //adminResaleGet( comeback );                       
                }        
            </script>    
       <?php
    }
    //function create general admin option
    function widgetAdminOption(){
        if (!current_user_can('manage_options'))  {
            wp_die( __('You do not have sufficient permissions to access this page.') );
        }
        register_sidebar(array(
         'name' => '<span id="IL_AD2" class="IL_AD">Home Page</span>', // The sidebar name you can choose <span id="IL_AD10" class="IL_AD">as per</span> your choice <span id="IL_AD3" class="IL_AD">to register</span>
         'before_widget' => 'PUT YOUR OPENING CSS DIV AND CSS CLASSES AND IDS HERE',
         'after_widget' => 'CLOSE THE DIV',
         'before_title' => '<h2>',
         'after_title' => '</h2>',
        ));
        // Home Page sidebar
     if(function_exists('register_sidebar'))
          register_sidebar(array(
          'name' => 'Home Page',
          'before_widget' => 'PUT YOUR OPENING CSS DIV AND CSS CLASSES AND IDS HERE',
          'after_widget' => 'CLOSE THE DIV',
          'before_title' => '<h3>',
          'after_title' => '</h3>',
     ));
     // Blog Page sidebar
     if(function_exists('register_sidebar'))
          register_sidebar(array(
          'name' => 'Blog Page',
          'before_widget' => 'PUT YOUR OPENING CSS DIV AND CSS CLASSES AND IDS HERE',
          'after_widget' => 'CLOSE THE DIV',
          'before_title' => '<h3>',
          'after_title' => '</h3>',
     ));
     // <a title="Contact us" href="http://wordpressapi.com/contact/">Contact us</a> Page sidebar
     if(function_exists('register_sidebar'))
          register_sidebar(array(
          'name' => 'Contact Page',
          'before_widget' => 'PUT YOUR OPENING CSS DIV AND CSS CLASSES AND IDS HERE',
          'after_widget' => 'CLOSE THE DIV',
          'before_title' => '<h3>',
          'after_title' => '</h3>',
     ));
     // About us Page sidebar
     if(function_exists('register_sidebar'))
          register_sidebar(array(
          'name' => 'About us',
          'before_widget' => 'PUT YOUR OPENING CSS DIV AND CSS CLASSES AND IDS HERE',
          'after_widget' => 'CLOSE THE DIV',
          'before_title' => '<h3>',
          'after_title' => '</h3>',
     ));
	
        ?>
            <!-- Script -->
            <script type="text/javascript">                
                var codeIndex = 'VI';
                var nameIndex = 'VND';
                //addLoadEvent(adminAPIGet);
                //addLoadEvent(adminOutAPIGet);  
            </script>
			
            <link href="<?php echo linkToPlugin;?>css/widget-settings.css" rel="stylesheet" type="text/css"/>
            <link href="<?php echo linkToPlugin;?>css/jquery-ui.css" rel="stylesheet" type="text/css"/>            
            <!-- Widget Form -->
            <?php			
            $profile_user 	= get_option('profile_user_info'); 			
			
			$api = new DgoApiConnectionW2P();					
			$api->setApiKey($profile_user['apikey']);							
			$api->setApiSecret($profile_user['secret']);
			
            //Include widget form file
			require_once("pluginComponents/widgetForm.php");
			?>
        <?php
    } 
	//create admin theme options
	function themeAdminOption(){
	
		$plugin_option 	= get_option("w2p_plugin_option");
		$profile_user=get_option('profile_user_info', $profile_user);
		
		if(isset($_POST['dgo_language'])){
			$temp = $_POST['dgo_language'];
			$temp = split("[_]", $temp);
			$plugin_option['language'] = $temp[0];
			$plugin_option['language_name'] = $temp[1];						
			if(isset($_POST['header_option_show'])){
				$plugin_option['header_option_show'] = true;
			}else{
				$plugin_option['header_option_show'] = false;
			}
			
			$_SESSION["current_language"]['key'] = strtolower($plugin_option['language'])."_".$plugin_option['language'];
		}else{
			if($plugin_option['language'] == ""){
				$_SESSION["current_language"]['key'] = "en_EN";
			}else{
				$_SESSION["current_language"]['key'] = strtolower($plugin_option['language'])."_".$plugin_option['language'];
			}
		}
		
		//get colors
		$colors = get_option('colors');		

		if(isset($_POST["radius"])){
			//$color
			$colors[0] = $_POST["hexbox1"]; $colors[1] = $_POST["hexbox2"]; $colors[2] = $_POST["hexbox3"]; $colors[3] = $_POST["hexbox4"]; 
			$colors[4] = $_POST["hexbox5"]; $colors[5] = $_POST["hexbox6"]; $colors[6] = $_POST["hexbox7"]; $colors[7] = $_POST["hexbox8"];
			$colors[9] = $_POST["hexbox10"];$colors[8] = $_POST["hexbox9"]; $colors[10] = $_POST["hexbox11"]; $colors[11] = $_POST["hexbox12"];
			$colors[12] = $_POST["hexbox13"];
			$colors['buttontextshadow'] = $_POST["buttontextshadow"];
			$colors['headertextshadow'] = $_POST["headertextshadow"];
			$colors['radius'] = $_POST["radius"];
			
			$colors['headertext'][substr($_POST["dgo_language"],0,2)] = $_POST["headertext"];
			$colors['button_text'][substr($_POST["dgo_language"],0,2)] = $_POST["button_text"];
			$colors['NetendpriceText'][substr($_POST["dgo_language"],0,2)] = $_POST["NetendpriceText"];
			$colors['GrossendpriceText'][substr($_POST["dgo_language"],0,2)] = $_POST["GrossendpriceText"];
			$plugin_option['language']=substr($_POST["dgo_language"],0,2);//get language key: DE,EN or VI
			$plugin_option['language_name']=substr($_POST["dgo_language"],3);//get language name : Vietnamese ..
			update_option( 'colors', $colors );
		}
		?>
			<link href="<?php echo linkToPlugin;?>css/theme-setting.css" rel="stylesheet" type="text/css"/>
			<link href="<?php echo linkToPlugin;?>css/colorPicker/css/colorpicker.css" rel="stylesheet" type="text/css"/>
			<script type="text/javascript">		
				var profile_user='<?php echo $profile_user['EndUserPriceFormat'];?>';
				var colorArr = new Array();
				var headerTextArrTmp = <?php echo json_encode($colors['headertext']);?>;
				var buttonTextArrTmp = <?php echo json_encode($colors['button_text']);?>;
				var NetendpricetextTmp= <?php echo json_encode($colors['NetendpriceText']);?>;
				var GrossendpricetextTmp= <?php echo json_encode($colors['GrossendpriceText']);?>;
				var NetendpricetextArr=[];
				var GrossendpricetextArr=[];
				var	headerTextArr = [];
				var buttonTextArr=[];
				
				
				jQuery.each(headerTextArrTmp, function(i,v){
					headerTextArr[i] = v;				
				});
				jQuery.each(buttonTextArrTmp, function(i,v){
					buttonTextArr[i] = v;				
				});
				jQuery.each(GrossendpricetextTmp, function(i,v){
					 GrossendpricetextArr[i] = v;				
				});
				jQuery.each(NetendpricetextTmp, function(i,v){
					NetendpricetextArr[i] = v;				
				});
				colorArr['default'] = [<?php 
					for($i = 0; $i < count($colors) - 1; $i++){
						echo "'".$colors[$i]."'";
						if($i < count($colors) - 2){
							echo ",";
						}
					}
				?>];
				colorArr['silver'] = ['383738', 'ffffff', '948B94', '616161', 'ffffff', 'b3acb3', 'dbdbdb', 'fffcff','b3acb3','827a82','f2f2f2','E3E0E3','F0F0F0'];
				colorArr['white'] = ['a1a1a1', 'ffffff', '5c5c5c', '6b6b6b', 'ffffff', 'adadad', 'e3e3e3', '8a888a','ffffff','9c9c9c','f5f5f5','ffffff','ffffff'];
				colorArr['blue'] = ['0056f5', 'ffffff', 'ffffff', '043b87', 'ffffff', '2b6ecc', '355599', 'ffffff','5071de','043b87','6299ed','a1c0f5','3774d6'];
				colorArr['black'] = ['000000', 'ffffff', 'ffffff', 'ffffff', 'ffffff', '616161', '242324', 'fff7ff','9e9e9e','ffffff','000000','000000','000000'];
				colorArr['red'] = ['fa0303', 'ffffff', 'ffffff', '8c0b0b', 'fcfcfc', '858080', 'd41313', 'fcfcfc','ba0413','f7f7f7','ff3333','f5444a','f73131'];
				colorArr['atomic'] = ['ff7403', 'fcfcfc', '1c0303', '360505', 'ffffff', '403d40', 'e66605', 'f5f5f5','3d3936','1c0303','ff7403','ff7403','ff7403'];
				colorArr['cloud'] = ['99C4DC', '99c4dc', '0f3d94', '073c57', '61aed4', '86b9d4', '4b97b3', '83cafc','003452','0a374d','9fd8e0','bdf0ee','bae6f5'];
				colorArr['shadow'] = ['2e292c', 'ffffff', 'ffffff', '2b282a', 'fafafa', '332c30', '403d3f', 'ffffff','6b6b6b','333032','3b393a','3d3b3c','3d3d3d'];
				colorArr['green'] = ['067502', 'ffffff', '06660b', '0a690d', 'ffffff', '19b02a', 'f7f7f7', 'ffffff','08f730','0b8c11','1bb83a','1bb83a','1bb83a'];
				colorArr['brown'] = ['ab5e05', '9e4d13', '000000', '241402', 'ab5300', '825a41', '915831', '994908','4a2706','000000','9e5a1b','c2750f','4d2a03'];	
				//set default theme
				addLoadEvent(load);
				function load(){
					jQuery('.radius-setting-input input').val(<?php echo $colors['radius']; ?>);
					jQuery('.txt-shadow-input input').val(<?php echo $colors['buttontextshadow']; ?>);
					jQuery('.txt-header-shadow-input input').val(<?php echo $colors['headertextshadow']; ?>);
					jQuery('#editme5').html(headerTextArr[select_language_value.split('_')[0]]);
					jQuery('#buttonMultiUpload').html(buttonTextArr[select_language_value.split('_')[0]]);
					if(profile_user=='Net'){
						jQuery('.text-endprice').html(NetendpricetextArr[select_language_value.split('_')[0]]);
					}else{
						jQuery('.text-endprice').html(GrossendpricetextArr[select_language_value.split('_')[0]]);
					}
					//jQuery('.radius-slider-process').width(<?php echo $colors['radius']; ?>*2 +'%');					 
					
					shadowSet();
					shadowheaderSet();
					radiusSet();
					themeColorSet(colorArr['default']);
				}				
			</script>
		<?php
		/* ========================= TRANSLATION =======================================*/		
		//Include language file
		require_once("pluginComponents/language_w2p.php");			
		// Load up the plugin text domain
		load_plugin_textdomain( 
			$l10n_prefix,                        		// Plugin text domain reference
			false,                                     // False - deprecated parameter
			dirname( plugin_basename( __FILE__ ) ) . '/lang/'  // Path to translation files
		);
		/*==============================================================================*/
       
		$api = new DgoApiConnectionW2P();					
		$api->setApiKey($profile_user['apikey']);							
		$api->setApiSecret($profile_user['secret']);    
		
		//include theme file
		require_once("pluginComponents/themeForm.php");
	}
	
	function optionsAdminOption(){
		?>
		<link href="<?php echo linkToPlugin;?>css/widget-settings.css" rel="stylesheet" type="text/css"/>
		<link href="<?php echo linkToPlugin;?>css/jquery-ui.css" rel="stylesheet" type="text/css"/> 
		
		<?php 		
		$profile_user 	= get_option('profile_user_info'); 
		
		$api = new DgoApiConnectionW2P();					
		$api->setApiKey($profile_user['apikey']);							
		$api->setApiSecret($profile_user['secret']);
		
		require_once("pluginComponents/optionsForm.php");
	}		
?>