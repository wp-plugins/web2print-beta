<?php
    //using session to 
    //session_start();
    //session_start();
	
	// Translation prefix
	//$l10n_prefix = "web2print";
		
	// An example callback method
	class LanguageTsl {
		static function myCallbackMethod() {
			return $_SESSION["current_language"]['key'];
		}
	}
	
	// If the locale switcher has been set
	add_filter( 'plugin_locale' , array('LanguageTsl', 'myCallbackMethod') );

?>