<?php

/**
*	
*		Version: 0.1   
*		Class: NL_CheckOut
*		Function: Integrate NganLuong Payment for merchant sites have API
*						
*						
*		
**/

class NL_Checkout 
{
	// URL checkout
	private $nganluong_url = 'https://www.nganluong.vn/checkout.php';

	// merchante site ID 
	private $merchant_site_code = '19131';	// Biến này được nganluong.vn cung cấp khi bạn đăng ký merchant site

	// merchante site password
	private $secure_pass= 'normprint'; // Biến này được nganluong.vn cung cấp khi bạn đăng ký merchant site

	//Function to build checkout Url
	public function buildCheckoutUrl($return_url, $receiver, $transaction_info, $order_code, $price)
	{
		
		
		$arr_param = array(
			'merchant_site_code'=>	strval($this->merchant_site_code), 	//merchante site ID
			'return_url'		=>	strtolower(urlencode($return_url)), //return uri 
			'receiver'			=>	strval($receiver),					//receiver email
			'transaction_info'	=>	strval($transaction_info),			//transaction info
			'order_code'		=>	strval($order_code),				//order number
			'price'				=>	strval($price)						//total price
		);
		
		$secure_code ='';
		$secure_code = implode(' ', $arr_param) . ' ' . $this->secure_pass;
		$arr_param['secure_code'] = md5($secure_code);
		
		//Check if $redirect_url exists or not
		$redirect_url = $this->nganluong_url;
		if (strpos($redirect_url, '?') === false)
		{
			$redirect_url .= '?';
		}
		else if (substr($redirect_url, strlen($redirect_url)-1, 1) != '?' && strpos($redirect_url, '&') === false)
		{
			// If $redirect_url have '?' at the end but dont have '&', we have to add it to $redirect_url
			$redirect_url .= '&';			
		}
				
		//Url contain parameters
		$url = '';
		foreach ($arr_param as $key=>$value)
		{
			if ($url == '')
				$url .= $key . '=' . $value;
			else
				$url .= '&' . $key . '=' . $value;
		}
		
		return $redirect_url.$url;
	}
	
	/* Function to verify infomations returned from nganluong
	 * @param $_GET contain parameters returned
	 * @return true if infomatinons is right, and otherwise is false 
	 */
	
	public function verifyPaymentUrl($transaction_info, $order_code, $price, $payment_id, $payment_type, $error_text, $secure_code)
	{
		// Tạo mã xác thực từ chủ web
		$str = '';
		$str .= ' ' . strval($transaction_info);
		$str .= ' ' . strval($order_code);
		$str .= ' ' . strval($price);
		$str .= ' ' . strval($payment_id);
		$str .= ' ' . strval($payment_type);
		$str .= ' ' . strval($error_text);
		$str .= ' ' . strval($this->merchant_site_code);
		$str .= ' ' . strval($this->secure_pass);

        // verification code from our site
		$verify_secure_code = '';
		$verify_secure_code = md5($str);
		
		// compare verification code from our site with verification code returned from nganluong.vn
		if ($verify_secure_code === $secure_code) return true;
		
		return false;
	}
}
?>