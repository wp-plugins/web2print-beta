<?php
/*
 * @author Peter
 * @copyright 2011
 */ 
	session_start();
	
	ini_set('session.gc_maxlifetime',30*60);
	ini_set('session.gc_probability',1);
	ini_set('session.gc_divisor',1);
	
	session_regenerate_id();
	
	if($_GET['option'] == 'login'){
		if(!empty($_GET['guid'])){
				$_SESSION['login']['guid'] 		= $_GET['guid'];
				$_SESSION['login']['pass'] 		= $_GET['pass'];								
				$_SESSION['login']['loginUser'] = $_GET['loginUser'];	
				$_SESSION['login']['photoUser'] = $_GET['photoUser'];	
				echo json_encode('Success');							
		}else{
			if(isset($_SESSION['login'])){
				echo json_encode($_SESSION['login']);
			}else if(isset($_SESSION['dgoUserLogin'])){
				echo json_encode($_SESSION['dgoUserLogin']);
			}
		}
		unset($_SESSION['anonymous']);
	}
	
	if($_GET['option'] == 'getPassword'){
		echo json_encode($_SESSION['login']['pass']);
	}
	
	if($_GET['option'] == 'logout'){
		unset($_SESSION['login']);
		unset($_SESSION['dgoUserLogin']);
		unset($_SESSION['contact']);
		unset($_SESSION['linkedin']);
		unset($_SESSION['MoreProvider']);
		unset($_SESSION['anonymous']);
		echo json_encode('Success');
	}
	
	if($_GET['option'] == 'logoutProvider'){
		unset($_SESSION['MoreProvider']);
	}
	
	//use for ShopCart
	//If you dont login and want to add address
	if($_GET['option'] == 'anonymous'){
		//add new address	
		if($_GET['action'] == 'add'){
			$flag = true;
			if(isset($_SESSION['anonymous'])){
					
				foreach($_SESSION['anonymous'] as $key=>$value){
					$newAdd = json_decode(stripslashes($_GET['newAdd']));
					if($value->{'Address'}->{'Email'}[0]->{'Text'} == $newAdd->{'Address'}->{'Email'}[0]->{'Text'}){
						$flag = false;						
					}					
				}
				if($flag){
					$n = count($_SESSION['anonymous']);			
					$_SESSION['anonymous'][$n] = $newAdd;
					echo json_encode($_SESSION['anonymous']);
				}else{
					echo json_encode('Found');
				}
			}else{
				$_SESSION['anonymous'][0] = json_decode(stripslashes($_GET['newAdd']));
				echo json_encode($_SESSION['anonymous']);
			}
		}	
		//edit address
		if($_GET['action'] == 'edit'){
			$id = $_GET['id'];
			$flag = true;
			foreach($_SESSION['anonymous'] as $key=>$value){
				$newAdd = json_decode(stripslashes($_GET['newAdd']));
				if($key != $id){
					if($value->{'Address'}->{'Email'}[0]->{'Text'} == $newAdd->{'Address'}->{'Email'}[0]->{'Text'}){
						$flag = false;						
					}
				}				
			}
			
			if($flag){
				$_SESSION['anonymous'][$id] = $newAdd;
				echo json_encode($_SESSION['anonymous']);
			}else{
				echo json_encode('Found');
			}

		}
		//delete address
		if($_GET['action'] == 'delete'){
			$id = $_GET['id'];
			$arr_temp = Array();
			
			foreach($_SESSION['anonymous'] as $key=>$value){
				if($key != $id){
					$arr_temp[$key] = $value;
				}
			}
						
			$_SESSION['anonymous'] = array_values($arr_temp);
			if(count($_SESSION['anonymous']) == 0){
				unset($_SESSION['anonymous']);	
				echo json_encode('NoAddress');				
			}else{			
				echo json_encode($_SESSION['anonymous']);
			}
		}
		//get address
		if($_GET['action'] == 'info'){
			echo json_encode($_SESSION['anonymous']);
		}
		
	}
	
	if($_GET['action'] == 'getJSON'){
		echo json_encode($_SESSION['prices_import'][0]);
	}	
	
	session_write_close();
?>

