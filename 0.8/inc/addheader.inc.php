<?php    
	
	//Add header css and script
    function addPrintHeader(){
		/*Important Script*/
		wp_deregister_script( 'jquery' );		
		wp_enqueue_script('jquery', 'http://api.delivergo.com/lib.dev/jquery/jquery-1.5.1.js');  
		wp_deregister_script( 'jquery-ui' );
		wp_enqueue_script('jquery-ui', 'http://api.delivergo.com/lib/jquery/jquery-ui-1.8.9.custom.js');
		wp_deregister_script( 'json2' );
		wp_enqueue_script('json2', 'http://api.delivergo.com/lib/js/json2.js');
		wp_deregister_script( 'jcacher' );
		wp_enqueue_script('jcacher', 'http://api.delivergo.com/lib.dev/js/jquery.jcacher-1.0.0.js');
		wp_deregister_script( 'md5' );
		wp_enqueue_script('md5', 'http://api.delivergo.com/lib.dev/js/md5.js');
		wp_deregister_script( 'jquery-dotimeout' );
		wp_enqueue_script('jquery-dotimeout', 'http://api.delivergo.com/lib.dev/js/jquery-dotimeout.js');				
		wp_deregister_script( 'base62' );
		wp_enqueue_script('base62', 'http://api.delivergo.com/lib.dev/js/base62.js');
		wp_deregister_script( 'jquery-copy' );				
		wp_enqueue_script('jquery-copy','http://api.delivergo.com/lib.dev/js/jquery.copy.js');
		wp_deregister_script( 'popup-window' );	
		wp_enqueue_script('popup-window','http://api.delivergo.com/lib.dev/js/popupWindow.js');
		wp_deregister_script( 'edit-place' );	
		wp_enqueue_script('edit-place','http://api.delivergo.com/lib.dev/js/jquery.editinplace.js');
		wp_deregister_script( 'fileuploader' );	
		wp_enqueue_script('fileuploader','http://api.delivergo.com/lib.dev/js/fileuploader.js');
		wp_deregister_script( 'openid' );	
		wp_enqueue_script('openid','http://api.delivergo.com/lib.dev/js/openid.js');
		wp_deregister_script( 'jquerytimers' );	
		wp_enqueue_script('jquerytimers','http://api.delivergo.com/lib.dev/js/jquerytimers.js');
		wp_deregister_script( 'number-format' );	
		wp_enqueue_script('number-format','http://api.delivergo.com/lib.dev/js/number-format.js');
		wp_deregister_script( 'color-picker' );	
		wp_enqueue_script('color-picker','http://api.delivergo.com/lib.dev/js/colorpicker.js');
		wp_deregister_script( 'date-format' );	
		wp_enqueue_script('date-format','http://api.delivergo.com/lib.dev/js/dateFormat.js');	
		wp_deregister_script( 'jquery.mousewheel' );			
		wp_enqueue_script('jquery.mousewheel','http://api.delivergo.com/lib.dev/js/jquery.mousewheel.min.js');
		wp_deregister_script( 'daterangepicker' );	
		wp_enqueue_script('daterangepicker','http://api.delivergo.com/lib.dev/js/daterangepicker.jQuery.js');
		wp_deregister_script( 'prettyPhoto' );	
		wp_enqueue_script('prettyPhoto','http://api.delivergo.com/lib.dev/js/jquery.prettyPhoto.js');
		wp_deregister_script( 'reel' );	
		wp_enqueue_script('reel','http://api.delivergo.com/lib.dev/js/jquery.reel.js');
		wp_deregister_script( 'zclip' );	
		wp_enqueue_script('zclip','http://api.delivergo.com/lib.dev/js/jquery.zclip.js');
		wp_deregister_script( 'jquery.jqplot' );	
		wp_enqueue_script('jquery.jqplot','http://api.delivergo.com/lib.dev/js/jquery.jqplot.js');
		wp_deregister_script( 'jqplot.canvasTextRenderer' );	
		wp_enqueue_script('jqplot.canvasTextRenderer','http://api.delivergo.com/lib.dev/js/jqplot.canvasTextRenderer.js');
		wp_deregister_script( 'jqplot.canvasAxisTickRenderer' );	
		wp_enqueue_script('jqplot.canvasAxisTickRenderer','http://api.delivergo.com/lib.dev/js/jqplot.canvasAxisTickRenderer.js');
		wp_deregister_script( 'jqplot.dateAxisRenderer' );	
		wp_enqueue_script('jqplot.dateAxisRenderer','http://api.delivergo.com/lib.dev/js/jqplot.dateAxisRenderer.js');
		wp_deregister_script( 'jqplot.highlighter' );	
		wp_enqueue_script('jqplot.highlighter','http://api.delivergo.com/lib.dev/js/jqplot.highlighter.js');
		wp_deregister_script( 'jqplot.cursor' );	
		wp_enqueue_script('jqplot.cursor','http://api.delivergo.com/lib.dev/js/jqplot.cursor.js');		
		//include needed scripts for designer pages
		//includeDesignerScripts();		
		/*All script files*/		
		if(!isset($GLOBALS['wp_scripts']->registered[ 'delivergo-api' ])){wp_enqueue_script('delivergo-api', 'http://api.delivergo.com/lib.dev/js/delivergo.api.js');}	
		if(!isset($GLOBALS['wp_scripts']->registered[ 'delivergo-api-contacting' ])){wp_enqueue_script('delivergo-api-contacting', 'http://api.delivergo.com/lib.dev/js/delivergo.api.contacting.js');}			
		if(!isset($GLOBALS['wp_scripts']->registered[ 'delivergo-api-crop' ])){wp_enqueue_script('delivergo-api-crop', 'http://api.delivergo.com/lib.dev/js/delivergo.api.imaging.js');}	
		if(!isset($GLOBALS['wp_scripts']->registered[ 'delivergo-api-ui' ])){wp_enqueue_script('delivergo-api-ui', 'http://api.delivergo.com/lib.dev/js/delivergo.ui.js');}							
	
		wp_enqueue_script('flags',linkToPlugin.'js/global_array.js');
		wp_enqueue_script('ready_function',linkToPlugin.'js/ready_function.js');		
		wp_enqueue_script('external_ready_function',linkToPlugin.'js/external_ready_function.js');
		wp_enqueue_script('api_request_function',linkToPlugin.'js/api_request_function.js');						
		wp_enqueue_script('user_dialog',linkToPlugin.'js/user_dialog.js');						
		wp_enqueue_script('external_function',linkToPlugin.'js/external_function.js');		
		wp_enqueue_script('order_product',linkToPlugin.'js/order_product.js');
		wp_enqueue_script('dialog_function',linkToPlugin.'js/dialog_function.js');
		wp_enqueue_script('picture_upload', linkToPlugin.'js/uploadify.js');
		wp_enqueue_script('picture_design',linkToPlugin.'js/picture_design.js');		
		wp_enqueue_script('all_order_product',linkToPlugin.'js/allOrder_request_function.js');		
		wp_enqueue_script('contacting_request',linkToPlugin.'js/contacting_request_function.js');
		wp_enqueue_script('affiliate_request',linkToPlugin.'js/affiliate_request_function.js');		
		wp_enqueue_script('product_details_request',linkToPlugin.'js/product_details_request_function.js');		
		wp_enqueue_script('article_price_request',linkToPlugin.'js/article_price_request.js');		
		wp_enqueue_script('alldesigns_request',linkToPlugin.'js/alldesigns_request_function.js');				
		//All CSS files
		wp_enqueue_style('web-2-print-css', linkToPlugin.'css/web_2_print.css');		       
		/*Get info from wordpress database*/
		$profile_user = get_option('profile_user_info');
		//ApiKey and ApiSecret use in ajaxproxy.php
		$_SESSION['ApiKey'] 	= $profile_user['apikey'];
		$_SESSION['ApiSecret']  = $profile_user['secret'];
		//session Porttal Guid
		$_SESSION['PortalGuid'] = W2PConfig::$PortalGuid;
		//Get info of changing options
		$plugin_option = get_option("w2p_plugin_option");
		
		//global currency
		if(!isset($_SESSION["current_currency"]) || $plugin_option['edited'] == true){
			$_SESSION["current_currency"]['key'] = $plugin_option['currency'];
		}
		//global language
		$plugin_language = strtolower($plugin_option['language'])."_".$plugin_option['language'];
		
		if(!isset($_SESSION["current_language"]) || $plugin_option['edited'] == true){
			$_SESSION["current_language"]['key'] = $plugin_language;
			$_SESSION["current_language"]['name'] = $plugin_option['language_name'];
		}
		
		//global dimension
		if(!isset($_SESSION["current_dimension"]) || $plugin_option['edited'] == true){
			if($plugin_option['dimension'] == 'mm'){
				$_SESSION["current_dimension"] = 'inch';
			}else{
				$_SESSION["current_dimension"] = 'mm';
			}			
		}		
		//reset option 
		$plugin_option['edited'] = false;
		//update option
        update_option('w2p_plugin_option', $plugin_option);
        
        //create session
		if(!isset($_SESSION['prices_import'])){		
			$_SESSION['prices_import'] = Array();
			$_SESSION['prices_import']['Guid'] = Helper::GetNewGuid();
		}else if($_SESSION['prices_import']['Guid'] == ""){			
			$_SESSION['prices_import']['Guid'] = Helper::GetNewGuid();
		}
		
		$RealPath = $_SERVER['DOCUMENT_ROOT'];
		//add wordpress if you're in localhost
		if('http://'.$_SERVER['SERVER_NAME'] == 'http://localhost'){				
			$RealPath .='/wordpress';
		}
		
		if(W2PConfig::$PortalTagString == "nhain"){
			$RealPath .= '/wp-content/themes/iblogpro_nhain/css/img/imgArticle/';
		}else{
			$RealPath .= '/wp-content/themes/PlakateComWpTheme/css/img/imgArticle/';
		}
?>

				<script type="text/javascript">	
					var flagImageArticleFound   = <?php echo file_exists($RealPath . 'STANDARD.png') == true ? 'true' : 'false' ?>;
					var dgoGuidAffi 	  		= '<?php echo $_SESSION['login']['guid'] ?>';
				    var guidUser 				= '<?php echo  (!isset($_SESSION['prices_import']['guid-affiliate-from-android'])?$profile_user['apikey']:$_SESSION['prices_import']['guid-affiliate-from-android']) ?>';
				    var resaleUser 				= '<?php echo  $profile_user['resale'] ?>';
				    var resaleGuidUser 			= '<?php echo  (!isset($_SESSION['prices_import']['resaleid-from-android'])?$profile_user['resaleGuid']:$_SESSION['prices_import']['resaleid-from-android']) ?>';
					var endUserPrice			= '<?php echo $profile_user['EndUserPriceFormat'];?>';
					var MaxNumOfResaleUnits		= '<?php echo $profile_user['MaxNumOfResaleUnits'];?>';
				    var articleGroupList;
				    var articleAvaiList 		= new Array();
				    var article_result_return 	= null;				
					var web_2_print_blogInfo 	= '<?php echo linkToPlugin; ?>';
					var web_2_print_themeUrl 	= '<?php echo linkToTheme; ?>';
					var homeUrl 				= '<?php echo get_bloginfo('url'); ?>';
					/*Global variable system*/					
					var UserGuid 				= '<?php echo strtolower($_SESSION['prices_import']['Guid']); //W2PConfig::$UserGuid; ?>';
					var PortalGuid 				= null;
					var PortalName 				= null;
					var PortalObject			= null;
					var PortalToken				= '<?php echo W2PConfig::$PortalToken?>';
					var PortalTagString			= '<?php echo W2PConfig::$PortalTagString; ?>';
					var dgoCurrencies			='<?php echo $plugin_option['currency']; ?>';
					var dgoLanguages			= null;
					var dgoDimension			= '<?php echo $_SESSION["current_dimension"]; ?>';
					var dgoCatId				= null;
					var dgoArticleGroupId		= null;
					/*Global prices dimension*/
					var formats_object 			= [];
					/*Global varailbes prices widget*/
					var global_price_object;
					var order_price_chosen;
					/*Min & Max area*/
					//Min and Max area
			        var maxArea = null;                   
			        var minArea = null;
			        var runInit = null;
					var dgoSeoDimension = null;
					var dgoSeoId = null;
					//global variables login & contacting
					var dgoContacting 		= null; 
					var dgoCountryApi;
					var dgoContactIdGlobal;
					var dgoContactOptions;
					var dgoCurrentPage 		= null;
					var dgoLoginOrder 		= false;
					var dgoUsername 		= null; 
					var dgoPassword 		= null;
					var dgoGuid 			= null;
					<?php 
						if(isset($_SESSION['login']['guid'])){
							?>
								dgoGuid = '<?php echo $_SESSION['login']['guid'] ?>';
							<?php
						}
					?>
					var dgoCaptchaCode 		= null;
					var dgologinProvider 	= null;
					var dgologinName 		= null;
					//global variables all orders
					var dgoAllOrders 		= null;
					var dgoEntryPerpage 	= 50;
					var dgoAllOrdersArticleImage = [];
					//global variable contain address session data, in shopping cart
					var dgoAddressSession 		= null;
					//global array for order product sidebar
					var dgoSubtypeProductArr	= []; 
					//global currency and language
					var globalCurrency 			= '<?php echo $_SESSION["current_currency"]['key']; ?>';
					var globalLanguage 			= '<?php echo substr($_SESSION["current_language"]['key'],3,2); ?>';
					var globalCountry 			= '<?php echo W2PConfig::$globalCountry; ?>';
					var globalPortal        	= '<?php echo W2PConfig::$globalPortal; ?>';
					var globalIsDev        		= <?php echo W2PConfig::$globalIsDev; ?>;
					var globalPortalUri			= <?php echo (W2PConfig::$globalPortalUri == "null" ? W2PConfig::$globalPortalUri : "'".W2PConfig::$globalPortalUri."'"); ?>;
					var globalCurrentCountry 	= <?php echo (W2PConfig::$globalCurrentCountry == "null" ? W2PConfig::$globalCurrentCountry : "'".W2PConfig::$globalCurrentCountry."'"); ?>; 
					var dgoAvailableArticles	= null;	
			        //pictures link array
			        var picturesArr 		= new Array();
			        var stt_begin 			= new Array();
			        var lastAlbumSelected 	= 'none';   
			        //pictures crop variables
			        /*====Global variables for cropping*/
					var crop_frame_real_width 	= null;
					var crop_frame_real_height 	= null;
					var crop_frame_after_width 	= null;
					var crop_frame_after_height = null;
					var crop_img_real_width 	= null;
					var crop_img_real_height 	= null;
					var crop_img_after_width 	= null;
					var crop_img_after_height 	= null;
					var crop_img_handle 		= null;
					var crop_img_name 			= null;
					var orientation_status 		= null;
					var rotate_status 			= null;
					var render_status           = null;
					var cropping_persist 		= false;
					var cropping_timer 			= true;	 
					var cropping_edit_possible  = true;       

					//article group array sort
					var article_group_arr = null;
					var article_group_price = new Array();
					var defaultAffid			= '<?php echo W2PConfig::$defaultAffid;?>';
					var resaleUnitid			= '<?php echo W2PConfig::$resaleUnitid;?>';
				</script>
			<?php
    }    
    //function add header script
    function addAdminHeader(){
    		$profile_user 	= get_option('profile_user_info');
    		$plugin_option 	= get_option("w2p_plugin_option"); 
        ?>	         
	        <script type="text/javascript">
				var defaultAffid			= '<?php echo W2PConfig::$defaultAffid;?>';
				var resaleUnitid			= '<?php echo W2PConfig::$resaleUnitid;?>';
				
	            //url to plugin, use in admin_api_request_function.js
	    		var web_2_print_blogInfo 	= '<?php echo linkToPlugin; ?>';
	    		var homeUrl 				= '<?php echo get_bloginfo('url'); ?>';
	    		var profile_user 			= new Array();
                	profile_user['apikey'] 	= '<?php echo $profile_user['apikey'] ?>';
                var dgoCurrencies			='<?php echo $plugin_option['currency']; ?>';
				var dgoLanguages			= null;
				var dgoDimension			= '<?php echo $_SESSION["current_dimension"]; ?>';
	    		//change portal here
	    		var globalCountry 			= '<?php echo W2PConfig::$globalCountry;?>';
				var globalPortal        	= '<?php echo W2PConfig::$globalPortal;?>';
				var globalIsDev        		= <?php echo W2PConfig::$globalIsDev; ?>;
				var globalPortalUri			= <?php echo (W2PConfig::$globalPortalUri == "null" ? W2PConfig::$globalPortalUri : "'".W2PConfig::$globalPortalUri."'"); ?>;
				var globalCurrentCountry 	= <?php echo (W2PConfig::$globalCurrentCountry == "null" ? W2PConfig::$globalCurrentCountry : "'".W2PConfig::$globalCurrentCountry."'"); ?>;
				var globalGuid				= null;
				var globalResaleUnits		= null;
				var globalCurrencyToken 	= '<?php echo $plugin_option['currency']?>';
	            var globalLanguage 			= '<?php echo $plugin_option['language']?>';
	            var select_language_value 	= '<?php echo isset($_POST["dgo_language"]) ? $_POST["dgo_language"] : $plugin_option['language'].'_'.$plugin_option['language_name']; ?>';
				var select_curency_value	= '<?php echo $_SESSION["current_currency"]['key']; ?>';
				//
				var flag_func_call 			= false;
				var flag_shop_change_call   = false;
				
				//article group array sort
				var article_group_arr = null;
				var article_group_price = new Array();

				var defaultMaxArea	= null;
				var defaultMinArea	= null;
	        </script>
            <script src="http://api.delivergo.com/lib/jquery/jquery-ui-1.8.9.custom.js"></script>
            <script src="http://api.delivergo.com/lib/js/json2.js"></script>
            <script src="http://api.delivergo.com/lib.dev/js/jquery.jcacher-1.0.0.js"></script>
            <script src="http://api.delivergo.com/lib.dev/js/md5.js"></script>
            <script src="http://api.delivergo.com/lib.dev/js/jquery-dotimeout.js"></script>
            <link href="<?php echo linkToPlugin; ?>css/general.css" rel="stylesheet" type="text/css"/> 
            <link href="<?php echo linkToPlugin; ?>css/jquery-ui.css" rel="stylesheet" type="text/css"/>            
            <link href="<?php echo linkToPlugin; ?>css/jquery.jqplot.css" rel="stylesheet" type="text/css"/>             
            <link href="http://api.delivergo.com/lib.dev/css/delivergo.ui.css" rel="stylesheet" type="text/css"/>
            <script src="http://api.delivergo.com/lib.dev/js/delivergo.api.js"></script>    
         	<script src="http://api.delivergo.com/lib.dev/js/delivergo.api.contacting.js"></script>                    
            <script src="http://api.delivergo.com/lib.dev/js/delivergo.api.admin.js"></script>
            <script src="http://api.delivergo.com/lib.dev/js/delivergo.ui.js"></script>
            <script src="http://api.delivergo.com/lib.dev/js/jquery.jqplot.js" type="text/javascript"></script>            
            <script src="http://api.delivergo.com/lib.dev/js/jqplot.canvasTextRenderer.js" type="text/javascript"></script>            
            <script src="http://api.delivergo.com/lib.dev/js/jqplot.canvasAxisTickRenderer.js" type="text/javascript"></script>            
            <script src="http://api.delivergo.com/lib.dev/js/jqplot.dateAxisRenderer.js"" type="text/javascript"></script>            
            <script src="http://api.delivergo.com/lib.dev/js/jqplot.highlighter.js"" type="text/javascript"></script>            
            <script src="http://api.delivergo.com/lib.dev/js/lib/jqplot.cursor.js" type="text/javascript"></script> 
            <script src="<?php echo linkToPlugin; ?>js/jquery.textshadow.js" type="text/javascript"></script>
            <script src="<?php echo linkToPlugin; ?>js/admin_ready_function.js" type="text/javascript"></script>
            <script src="<?php echo linkToPlugin; ?>js/admin_external_function.js" type="text/javascript"></script>            
            <script src="<?php echo linkToPlugin; ?>js/admin_api_request_function.js" type="text/javascript"></script>
            <script src="<?php echo linkToPlugin; ?>js/product_details_request_function.js" type="text/javascript"></script>
            <script src="http://api.delivergo.com/lib.dev/js/colorpicker.js" type="text/javascript"></script>
            <script src="http://api.delivergo.com/lib.dev/js/jquery.editinplace.js" type="text/javascript"></script> 
            <script src="http://api.delivergo.com/lib.dev/js/number-format.js" type="text/javascript"></script><!-- -->
            <script src="http://api.delivergo.com/lib.dev/js/dateFormat.js" type="text/javascript"></script><!-- -->           
        <?php
        
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
?>