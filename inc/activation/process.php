<?php

session_start();

if(trim(strtoupper($_GET['captcha'])) == $_SESSION['captcha_id'])
{
		echo json_encode(true);
		
}

else
	{
		echo json_encode(false);
	}

?>