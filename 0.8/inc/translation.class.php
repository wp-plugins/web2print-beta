<?php
/*
* 
* translation class
 * 
 * Author Peter
*/

	// Load up the plugin text domain
    //Include language file
	require_once "pluginComponents/language_tsl.php";
				
	class Web_2_print_Translation{
			
		private $_l10n_prefix;
		
		private $_flag = false;	
		
		//define domain value
		public function __construct($l10n_prefix){
			$this->_l10n_prefix = $l10n_prefix;
		}
		
		//function return translated value
		public function translate($string){
			if(!$this->_flag){
				load_plugin_textdomain( 
					$this->_l10n_prefix,                        		// Plugin text domain reference
					false,                                     			// False - deprecated parameter
					dirname( plugin_basename( __FILE__ ) ) . '/lang/'  	// Path to translation files
				);
				$this->_flag = true;			
			}	
							
			return __($string, $this->_l10n_prefix);
		} 
	}

?>
