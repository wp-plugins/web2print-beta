<?php
	session_start();
	ini_set('session.gc_maxlifetime',30*60);
	ini_set('session.gc_probability',1);
	ini_set('session.gc_divisor',1);
	
	session_regenerate_id();
	
	if(isset($_GET['article'])){
		$tmp = $_GET['article'];
		$tmp = json_decode($tmp);
	
		$_SESSION['articleGroup'] = $tmp;
	}else if(isset($_GET['type']) && isset($_SESSION['articleGroup'])){
		echo json_encode($_SESSION['articleGroup']);
	}	  

	session_write_close();	
?>

