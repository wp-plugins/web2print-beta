<?php
	// Function create Customer center settings widget
    function createCustomerWidget(){
    	/* ========================= TRANSLATION =======================================*/		
    	//Include language file
		require_once("pluginComponents/language_cus.php");			
		// Load up the plugin text domain
		load_plugin_textdomain( 
			$l10n_prefix,                        		// Plugin text domain reference
			false,                                     // False - deprecated parameter
			dirname( plugin_basename( __FILE__ ) ) . '/lang/'  // Path to translation files
		);
		/*==============================================================================*/		
        ?> 
            <!--Html-->
            <!-- Login status -->
            <div class="widget-login-div">                
                <!--span class="userInfo"><?php if(isset($_SESSION['userInfo'])){if($_SESSION['userInfo']['name'] != ''){echo 'Hello  '; echo $_SESSION['userInfo']['name'];}else{echo 'Unknown';}} ?></span><span>&nbsp;</span-->
                <!--span class="loginBt"><?php if(isset($_SESSION['userInfo'])){ _e("Logout", $l10n_prefix);}else{ _e("Login", $l10n_prefix); } ?></span-->
                <?php
                	//flag login
                	$flagLogin = false;
					//flag display if user loged in our system.
					$flagMainDisplay = 'none';
                	if(isset($_SESSION['login'])){
                		$dgoUsername = $_SESSION['login']['loginUser'];
						//flag display if user loged in
						$flagDisplay = 'none';
						$flagMainDisplay = 'block';
						$flagLogin = true;
                	}else{
                		$dgoUsername = "";
                		$flagDisplay = 'block';
                	}
                	
                ?>                   	             
                <div class="is-bottons login-buttons" id="login-button" style="display: <?php echo $flagDisplay; ?>"><span><?php _e("Login", $l10n_prefix); ?></span></div>
                <?php ($flagDisplay=='block'?$flagDisplay = 'none':$flagDisplay = 'block'); ?>                
			    <div class="is-bottons login-buttons" id="logout-button" style="display: <?php echo $flagDisplay; ?>"><span><?php _e("Logout", $l10n_prefix); ?></span></div>
			    <div class="login-user-info" style="display: <?php echo $flagDisplay; ?>"><span id="hello-icon"></span><?php _e("Hello", $l10n_prefix); ?><span id="hello"><?php echo $dgoUsername ?></span></div>
            </div><!-- End login status -->
            <div class="customer-settings" style="display: <?php echo $flagDisplay; ?>">
                <!--div class="setting-menu"><span>My Templates</span></div>
                <div class="setting-menu"><span>Gallery</span></div-->
                <a href="<?php $allOrderID 		= get_option('allOrderPageID'); $allOrderLink = get_permalink( $allOrderID ); echo $allOrderLink;?>"><div class="setting-menu first-setting-menu"><span><?php _e("AllOrders", $l10n_prefix); ?></span></div></a>
                <!-- a href="<?php //$archiveID 		= get_option('archiveID'); $archiveLink = get_permalink( $archiveID ); echo $archiveLink;?>"><div class="setting-menu"><span><?php //_e("Archive", $l10n_prefix); ?></span></div></a-->
                <!-- a href="<?php //$myProductsID 	= get_option('myProductsPageID'); $myProductsLink = get_permalink( $myProductsID ); echo $myProductsLink;?>"><div class="setting-menu"><span><?php //_e("MyProducts", $l10n_prefix); ?></span></div></a-->
                <a href="<?php $myMotivesID 	= get_option('myMotivesPageID'); $myMotivesLink = get_permalink( $myMotivesID ); echo $myMotivesLink;?>"><div class="setting-menu"><span><?php _e("MyMotives", $l10n_prefix); ?></span></div></a>
                <a href="<?php $addressBookID 	= get_option('addressPageID'); $addressBookLink = get_permalink( $addressBookID ); echo $addressBookLink;?>"><div class="setting-menu"><span><?php _e("AddressBook", $l10n_prefix); ?></span></div></a>
                <a href="<?php $profileID 		= get_option('profilePageID'); $accountDetailsLink = get_permalink( $profileID ); echo $accountDetailsLink;?>"><div class="setting-menu"><span><?php _e("AccountDetails", $l10n_prefix); ?></span></div></a>
                <?php 
                /*Get info from wordpress database*/
				$profile_user = get_option('profile_user_info');
				
                if($profile_user['MaxNumOfResaleUnits'] != 1){
                	$earnMoneyID 	= get_option('earnMoneyPageID'); 
                	$earnMoneyLink = get_permalink( $earnMoneyID );
                	echo "<a href='" . $earnMoneyLink ."'><div class='setting-menu'><span>". __("EarnMoney", $l10n_prefix) ."</span></div></a>";
                } 
                ?>
                <!--div class="setting-menu"><span><?php _e("Settings", $l10n_prefix); ?></span></div-->
            </div><!-- End customer settings div -->           
        <?php
    }
?>