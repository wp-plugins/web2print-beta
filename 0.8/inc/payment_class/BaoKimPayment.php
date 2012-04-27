<?php
class BaoKimPayment 
{	
	// URL checkout on BaoKim Payment system
	private $baokim_url = 'https://www.baokim.vn/payment/customize_payment/order';

	// merchante site code 
	private $merchant_id = '1059';	// Biến này được baokim.vn cung cấp khi bạn đăng ký merchant site

	// merchante site password
	private $secure_pass = 'da97f4023392f8ed'; // Biến này được baokim.vn cung cấp khi bạn đăng ký merchant site

	/*	 * Url to baokim.vn and process order	 * @param $order_id				Order ID	 * @param $business 			Receiver Email	 * @param $total_amount			Total Price	 * @param $shipping_fee			Shipping cost	 * @param $tax_fee				Tax	 * @param $order_description	Order description	 * @param $url_success			Url callback to update payment status on our site	 * @param $url_cancel			Url callback when we cancel	 * @param $url_detail			Url contain details information about order	 * @return url	 */
	public function createRequestUrl($order_id, $business, $total_amount, $shipping_fee, $tax_fee, $order_description, $url_success, $url_cancel, $url_detail)
	{
		
		$params = array(
			'merchant_id'		=>	strval($this->merchant_id),
			'order_id'			=>	strval($order_id),
			'business'			=>	strval($business),
			'total_amount'		=>	strval($total_amount),
			'shipping_fee'		=>  strval($shipping_fee),
			'tax_fee'			=>  strval($tax_fee),
			'order_description'	=>	strval($order_description),
			'url_success'		=>	strtolower($url_success),
			'url_cancel'		=>	strtolower($url_cancel),
			'url_detail'		=>	strtolower($url_detail)
		);
		ksort($params);
		
		$str_combined = $this->secure_pass.implode('', $params);
		$params['checksum'] = strtoupper(md5($str_combined));
		
		//Check if $redirect_url exists or not
		$redirect_url = $this->baokim_url;
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
		$url_params = '';
		foreach ($params as $key=>$value)
		{
			if ($url_params == '')
				$url_params .= $key . '=' . urlencode($value);
			else
				$url_params .= '&' . $key . '=' . urlencode($value);
		}
		return $redirect_url.$url_params;
	}
	
	/* Function to verify infomations returned from baokim.vn	 * @param $_GET contain parameters returned	 * @return true if infomatinons is right, and otherwise is false 	 */	
	public function verifyResponseUrl($_GET = array())
	{
		$checksum = $_GET['checksum'];
		unset($_GET['checksum']);
		
		ksort($_GET);
		$str_combined = $this->secure_pass.implode('', $_GET);

        // verification code from our site
		$verify_checksum = strtoupper(md5($str_combined));
		
		// compare verification code from our site with verification code returned from baokim.vns
		if ($verify_checksum === $checksum) 
			return true;
		
		return false;
	}
}
?>