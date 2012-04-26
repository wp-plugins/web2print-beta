<?php
	include "../../../../wp-blog-header.php";
	
	class ApiCredentials {
		public static function GetApiUserName() {
			if(!isset($_SESSION['prices_import']['guid-affiliate-from-android'])){
				$profile_user = get_option('profile_user_info');
				return $profile_user['apikey'];	
			}else{
				return $_SESSION['prices_import']['guid-affiliate-from-android'];
			}								
		}
		public static function GetApiPass() {
			if(!isset($_SESSION['prices_import']['pass-affiliate-from-android'])){
				$profile_user = get_option('profile_user_info');
				return $profile_user['secret'];
			}else{
				return $_SESSION['prices_import']['pass-affiliate-from-android'];
			}
		}
	}
	
	if(isset($_GET['EndUserPriceFormat'])){
		$profile_user_old 			= get_option('profile_user_info');
		$profile_user['apikey'] 	= $profile_user_old['apikey'];
		$profile_user['secret'] 	= $profile_user_old['secret'];
		$profile_user['resale'] 	= $profile_user_old['resale'];
		$profile_user['resaleGuid'] = $profile_user_old['resaleGuid'];	
		$profile_user['MaxNumOfResaleUnits'] = $profile_user_old["MaxNumOfResaleUnits"];
		$profile_user['EndUserPriceFormat']  = $_GET['EndUserPriceFormat'];
		
		//update profile user login
		update_option( 'profile_user_info', $profile_user );
		
		echo json_encode($profile_user['EndUserPriceFormat']);
	}
?>