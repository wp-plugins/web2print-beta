<?php
    session_start();
	unset($_SESSION['dgoUserLogin']);

	//clear cache in inc/cache and inc/api_class/cache
	if(isset($_GET['option'])){
		if($_GET['option'] == "resetCache"){
			$url = $_SERVER['DOCUMENT_ROOT'];

			$mydir = $url."/wp-content/plugins/Web_2_Print_XML_V3/inc/cache"; 			
			/*
			$mydirPlakateTheme =  $url."/wp-content/themes/PlakateComWpTheme"; 
			
			//check if we use plakate theme and have cache for slider in header, we clear it too
			if(chdir($mydirPlakateTheme) == true){
				$mydirPlakateTheme .= '/inc/api_class/cache';
				$directoryTheme = dir($mydirPlakateTheme); 
				
				while($entry = $directoryTheme->read()) { 
					 if ($entry != "." && $entry != "..") { 
						unlink($mydirPlakateTheme."/".$entry); 
					 } 
				} 
				$directoryTheme->close(); 
			}
			*/
			$directory = dir($mydir); 
			
			while($entry = $directory->read()) { 
				 if ($entry != "." && $entry != "..") { 
				 	unlink($mydir."/".$entry); 
				 } 
			} 
			
			$directory->close(); 
		}
	}
	
?>