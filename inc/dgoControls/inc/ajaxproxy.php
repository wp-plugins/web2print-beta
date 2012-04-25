<?php
/*
 * Filename.......: class_http.php
 * Author.........: Troy Wolf [troy@troywolf.com]
 * Last Modified..: Date: 2010/11/06
 * Description....: Screen-scraping class with caching. Includes image_cache.php
 companion script. Includes static methods to extract data
 out of HTML tables into arrays or XML. Now supports sending
 XML requests and custom verbs with support for making
 WebDAV requests to Microsoft Exchange Server.
 */

if (!function_exists('getallheaders')) {
	function getallheaders() {
		foreach($_SERVER as $name => $value) {
			if(substr($name, 0, 5) == 'HTTP_') {
				$key = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))));
				$headers[$key] = $value;
			}
		}
		$headers["Content-Length"] = $_SERVER["CONTENT_LENGTH"];
		$headers["Content-Type"] = $_SERVER["CONTENT_TYPE"];
		return $headers;
	}
}

class http {
	var $ttl;
	var $log;
	var $dir;
	var $name;
	var $filename;
	var $url;
	var $port;
	var $verb;
	var $status;
	var $header;
	var $body;
	var $headers;
	var $postvars;
	var $connect_timeout;
	var $data_ts;
	var $buffer_size;

	function addLog($line="") {
		$this->log .= $line."\n";
	}

	/*
	 The class constructor. Configure defaults.
	 */
	function http() {
		$this->addLog("New http() object instantiated.");
		/*
		 Seconds to attempt socket connection before giving up.
		 */
		$this->connect_timeout = 30;
		/*
		 Set the 'dir' property to the directory where you want to store the cached
		 content. I suggest a folder that is not web-accessible.
		 End this value with a "/".
		 */
		$this->dir = realpath("./")."/";
		//Default to current dir.
		$this->clean();
		return true;
	}

	/*
	 fetch() method to get the content. fetch() will use 'ttl' property to
	 determine whether to get the content from the url or the cache.
	 */
	function fetch($url="", $name="", $user="", $pwd="", $verb="GET") {
		$this->log .= "--------------------------------\nfetch() called\n";
		$this->log .= "url: ".$url."\n";
		$this->status = "";
		$this->header = "";
		$this->buffer_size = 4096;
		$this->body = "";
		if (!$url) {
			$this->log .= "OOPS: You need to pass an URL!\n";
			return false;
		}
		$this->url = $url;
		$this->name = $name;
		if (!$fh = $this->getFromUrl($url, $user, $pwd, $verb)) {
			return false;
		}

		/*
		 Get response header.
		 */
		$this->header = fgets($fh, $this->buffer_size);
		$this->status = substr($this->header,9,3);
		while ((trim($line = fgets($fh, $this->buffer_size)) != "") && (!feof($fh))) {
			$this->header .= $line;
			if ($this->status=="401" and strpos($line,"WWW-Authenticate: Basic realm=\"")===0) {
				fclose($fh);
				$this->log .= "Could not authenticate\n\n";
				return FALSE;
			}
		}

		/*
		 Get response body.
		 */
		while (!feof($fh)) {
			$this->body .= fgets($fh, $this->buffer_size);
		}
		fclose($fh);
		return $this->status;
	}

	/*
	 PRIVATE getFromUrl() method to scrape content from url.
	 */
	function getFromUrl($url, $user="", $pwd="", $verb="GET") {
		$this->log .= "getFromUrl() called\n";
		preg_match("~([a-z]*://)?([^:^/]*)(:([0-9]{1,5}))?(/.*)?~i", $url, $parts);
		$protocol = $parts[1];
		$server = $parts[2];
		$port = $parts[4];
		$path = $parts[5];
		
		if ($port == "") {
			if (strtolower($protocol) == "https://") {
				$port = "443";
			} else {
				$port = "80";
			}
		}
		if ($path == "") {
			$path = "/";
		}

		$uri = ((strtolower($protocol) == "https://") ? "ssl://" : "").$server;
		
		if (!$sock = @fsockopen($uri, $port, $errno, $errstr, $this->connect_timeout)) {
			$this->log .= "Could not open connection. Error ".$errno.": ".$errstr."\n\n";
			return false;
		}
		$this->headers["Host"] = $server.":".$port;
		$headers = getallheaders();
		if ($user != "" && $pwd != "") {
			$this->log .= "Authentication will be attempted\n\n";
			$this->headers["Authorization"] = "Basic ".base64_encode($user.":".$pwd);
		}

		$this->log .= "Using ". $verb ."\n\n";
		$request = $verb." ".$path." HTTP/1.0\r\n";

		$bodyRequired = $verb=="POST" || $verb=="PUT" || $verb=="DELETE";

		$this->log .= "Body required? ". $bodyRequired ."\n\n";
			
		// generelle header
		$this->headers["Accept"] = $headers['Accept'];
		$this->headers["Content-Type"] = $headers['Content-Type'];

		// body required? then prepare specific headers like content-length
		if($bodyRequired) {
			if (count($this->postvars) > 0) {
				$this->log .= "Variables will be POSTed\n\n";
				$post_string = "";
				foreach ($this->postvars as $key=>$value) {
					$post_string .= "&".urlencode($key)."=".urlencode($value);
				}
				$post_string = substr($post_string,1);
				//$this->headers["Content-Type"] = "application/x-www-form-urlencoded";
				$this->headers["Content-Length"] = strlen($post_string);
			} else {
				$this->headers["Content-Length"] = $headers['Content-Length'];
			}
		}

		if (fwrite($sock, $request) === FALSE) {
			fclose($sock);
			$this->log .= "Error writing request type to socket\n\n";
			return false;
		} else {
			$this->log .= "Socket opened.\n\n";
		}
		foreach ($this->headers as $key=>$value) {
			$this->log .= "Writing header: ". $key ." = ". $value ."\n\n";
			if (fwrite($sock, $key.": ".$value."\r\n") === FALSE) {
				fclose($sock);
				$this->log .= "Error writing headers to socket\n\n";
				return false;
			}
		}
		if (fwrite($sock, "\r\n") === FALSE) {
			fclose($sock);
			$this->log .= "Error writing end-of-line to socket\n\n";
			return false;
		} else {
			$this->log .= "Header finished.\n\n";
		}

		// body required? then send it
		if($bodyRequired) {
			// POST Formular data
			if (count($this->postvars) > 0) {
				if (fwrite($sock, $post_string."\r\n") === FALSE) {
					fclose($sock);
					$this->log .= "Error writing POST string to socket\n\n";
					return false;
				} else {
					$this->log .= "Form data posted\n\n";
				}
			} else {
				// POST RAW BODY
				if (fwrite($sock,file_get_contents("php://input")) === FALSE) {
					fclose($sock);
					$this->log .= "Error writing xml request string to socket\n\n";
					return false;
				} else {
					$this->log .= "Raw body posted\n\n";
				}
			}
		}
		return $sock;
	}

	/*
	 PRIVATE clean() method to reset the instance back to mostly new state.
	 */
	function clean()    {
		$this->status = "";
		$this->header = "";
		$this->body = "";
		$this->headers = array();
		$this->postvars = array();

		/*
		 Try to use user agent of the user making this request. If not available,
		 default to IE6.0 on WinXP, SP1.
		 */
		if (isset($_SERVER['HTTP_USER_AGENT'])) {
			$this->headers["User-Agent"] = $_SERVER['HTTP_USER_AGENT'];
		} else {
			$this->headers["User-Agent"] = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)";
		}

		/*
		 Set referrer to the current script since in essence, it is the referring
		 page.
		 */
		if (substr($_SERVER['SERVER_PROTOCOL'],0,5) == "HTTPS") {
			$this->headers["Referer"] = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		} else {
			$this->headers["Referer"] = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		}
	}
}

$proxy_url = isset($_GET['u']) ? $_GET['u'] : false;
$proxy_url = urldecode($proxy_url);

$type = isset($_GET['type']) ? $_GET['type'] : false;

if (!$proxy_url) {
	header("HTTP/1.0 400 Bad Request");
	echo "proxy.php failed because 'u' query parameter is missing";
	exit();
}

// Instantiate the http object used to make the web requests.
if (!$h = new http()) {
	header("HTTP/1.0 501 Script Error");
	echo "proxy.php failed trying to initialize the http object";
	exit();
}

function startsWith($haystack,$needle,$case=true) {
	if($case){
		return (strcmp(substr($haystack, 0, strlen($needle)),$needle)===0);
	}
	return (strcasecmp(substr($haystack, 0, strlen($needle)),$needle)===0);
}

$h->url = $proxy_url;
$h->postvars = $_POST;

//$user='9a652984-9fc8-4ba1-996d-b54b9f9e94e6';
//$pass='wawiqugub8';

$user='56ee2956-d374-4f70-b1d4-b1fa8774a53d';
$pass='K5SUtrUf';

$h->fetch($h->url, "", $user,$pass, $_SERVER['REQUEST_METHOD']);

// Forward the headers to the client.
$ary_headers = explode("\n", $h->header);
foreach($ary_headers as $hdr) {
	if(!startsWith($hdr, "Server") && !startsWith($hdr, "X-Powered-By")) {
		$h->log .= "Reading header: ". $hdr."\n\n";
		header($hdr);
	}
}
// Send the response body to the client.
echo $h->body;
//var_dump($h->log);

/*$myFile = "errlog.txt";
$fh = fopen($myFile, 'a') or die("can't open file");
$stringData = $h->log;
fwrite($fh, $stringData);
fclose($fh);*/

?>