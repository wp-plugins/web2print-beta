<?php
	
   	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Function create Calculator Widget
    function createCalculatorWidget(){    	
    	/* ========================= TRANSLATION =======================================*/		
    	//Include language file
		require_once("pluginComponents/language_w2p.php");			
		// Load up the plugin text domain
		load_plugin_textdomain( 
			$l10n_prefix,                        		// Plugin text domain reference
			false,                                     // False - deprecated parameter
			dirname( plugin_basename( __FILE__ ) ) . '/lang/'  // Path to translation files
		);		
		
		
		/*===========================RESALE REQUIRE CONFIGURE============================*/
        ?>            
            <script type="text/javascript">  
            	<?php 
            		//get guid && shop from plugin
            		
            	?> 
            	
            	//if isset article groups session
            	<?php            	
            		if(isset($_SESSION['articleGroup'])){
            			?>          				
            				if(guidUser != 'none' && resaleUser != 'new'){
            					//articleProfitGet( guidUser, resaleUser);
            				}else if(guidUser != 'none'){
            					console.log('No shop has created or configured yet.');
            				}else{
            					console.log('Affiliate ID is wrong or you have not logged in.');
            				}         				          				
            			<?php
            		}else{
            			?>
            				//get article group from api
            				if(guidUser != 'none' && resaleUser != 'new'){
            					//articleGroupGet();
            				}else if(guidUser != 'none'){
            					console.log('No shop has created or configured yet.');
            				}else{
            					console.log('Affiliate ID is wrong or you have not logged in.');
            				}            				
            			<?php
            		}
            	?>
            	//getting article discount from API
	         </script>
	    <?php
	    /*===================================================================================*/    
	    /*============================================HTML===================================*/    
	    /*Include Order Product Widget, Pages, Forms*/  	    
	        /*include order widget file (ORDER PRODUCT WIDGET)*/
	        require_once("orderproductsidebar.php");			
	        /*include login forms file (LOGIN FORM)*/
			require_once("pluginComponents/loginForm.php");
			/*include hidden forms file */
			require_once("pluginComponents/hiddenForm.php");			
			
			/*Get current page*/
			global $post;
			$global_current_page = get_the_title($post->ID);

			if($global_current_page == __('AddressBook', $l10n_prefix)){
				/*include address forms file */
				require_once("pluginComponents/addressBook.php");
			}else if($global_current_page == __('AccountDetails', $l10n_prefix)){
				/*include account details forms file */
				require_once("pluginComponents/accountDetails.php");
			}else if($global_current_page == __('EarnMoney', $l10n_prefix)){
				/*include earn money forms file*/
				require_once("pluginComponents/earnMoney.php");
			}
			
			/*include style to hide metabar and post_excerpt*/
			require_once("clearexcerpt.php");			
					
			/*Check for login & recognize which page we are in*/
			$flagOrder = false;
			$flagLogin = false;
			/*GET FROM SESSION IF USER LOGED IN*/
			if(isset($_SESSION['login'])){
				$flagLogin = true;
        	}else if(isset($_SESSION['dgoUserLogin'])){
        		$flagOrder = true;
				//check contactingSetting exist
				echo '<script type="text/javascript">
						var settingKey   = "'.$_SESSION['dgoUserLogin']['loginProvider'].'"; 
						var settingValue = "'.$_SESSION['dgoUserLogin']['email'].'";
						contacting_checkLoginProviderExist(settingKey,settingValue,"openid-new-account");
					  </script>';
				/*--------------------------------------------*/
        	}
        	
        	if(isset($_SESSION['MoreProvider'])){
				echo '<script type="text/javascript">
						dgologinProvider = "'.$_SESSION['MoreProvider']['loginProvider'].'";
						dgologinName = "'.$_SESSION['MoreProvider']['email'].'";
					  </script>';
			}
			?>
				<script type="text/javascript">
				
					if(guidUser != 'none' || resaleUser != 'none'){
						
						var flagLogin = '<?php echo $flagLogin; ?>';
						var flagOrder = '<?php echo $flagOrder; ?>';
						/*If we are in shopping Cart*/
						<?php if(is_page('Shopping Cart'))
							{
						?>					
							dgoCurrentPage = 'shoppingCart';
								
			                if(flagLogin == true){
								//assign content to address book							
					 			dgoGuid = '<?php echo $_SESSION['login']['guid']; ?>';
							}else if( flagOrder == true ){
								dgoLoginOrder = true;
							}					
						<?php
							}
						?>

						<?php if(is_page('All Orders'))
							{
						?>
							dgoCurrentPage 	= 'allOrders';
							dgoGuid 		= '<?php echo $_SESSION['login']['guid']; ?>';
							
							<?php
								//include account details file
								require_once("pluginComponents/pluginAllOrders.php");
    						}
							?>
							
					}					
				</script>
			<?php         
   	}
   	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   	// Function create Customer center settings widget
    function createTemplateWidget(){
    	echo "<div>";
    	//maybe we find a solution to
		//provide it over an webservice
		if(!class_exists('DgoStateControl')) {
			include_once 'dgoControls/ctrlstate.php'; //needed for every other control	
		}
    	if(!class_exists('DgoContentItemList')) {
			include_once 'dgoControls/ctrllist.php';	
		}
        include_once '../tpl/templateswidget.tpl';
    	?>
			<div class="template-search">
				<div class="template-text"><input type="text" value="" /></div>
				<div class="template-search-button is-bottons"><span>Search</span></div>		
			</div>	
        <?php
        echo "</div>";
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
?>