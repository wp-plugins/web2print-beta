<?php

include_once "cache.php";
include_once "apicred.inc.php";

if(!function_exists('getallheaders')) {
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

function startsWith($haystack, $needle, $case=true) {
  if($case) {
    return (strcmp(substr($haystack, 0, strlen($needle)), $needle) === 0);
  }
  return (strcasecmp(substr($haystack, 0, strlen($needle)), $needle) === 0);
}

class Response {
  var $key;
  var $headers;
  var $body;

  function __construct() {
  }

}

class Http {
  var $ttl;
  var $log;
  var $dir;
  var $filename;
  var $url;
  var $port;
  var $verb;
  var $status;
  var $responseHeaders;
  var $responseBody;
  var $requestHeaders;
  var $postvars;
  var $connect_timeout;
  var $data_ts;
  var $buffer_size;
  var $bodyRequired;
  var $request;
  var $requestBody;
  var $requestHash;
  var $cacheKey;
  var $cache;

  function Log($line="") {
    $this -> log .= $line . "<br>\n";
  }

  function __construct() {

    $this -> cache = new FileCache( array('size' => 1048576, 'dir' => "cache", 'project' => 'AjaxProxy.php'));

    //$this -> cacheKey = 'delivergo.ajax.cache';
    $this -> Log("New Http() object instantiated.");
    $this -> connect_timeout = 600;

    //Default to current dir.
    $this -> clean();
    return true;
  }

  function addResponseHeader($headerLine) {
    array_push($this -> responseHeaders, $headerLine);
  }

  function fetch($user="", $pwd="", $verb="GET", $cacheDuration=-1) {
    $this -> Log("--------------------------------");
    $this -> Log("fetch() called on: ". $this -> url);
    $this -> status = "";
    $this -> buffer_size = 4096;
    $this -> responseBody = "";
    if(!$this -> url) {
      $this -> Log("OOPS: You need to pass an URL!");
      return false;
    }

    if($cacheDuration > 0) {
      $cacheEntry = $this -> cache -> get($this -> requestHash);
      if($cacheEntry != null) {
        $this -> responseBody = $cacheEntry -> body;
        $this -> responseHeaders = $cacheEntry -> headers;
        $this -> addResponseHeader("X-AjaxProxy-Cached: true");
        return 200;
      }
    }

    $useCurl = function_exists("curl_version") == "Enabled";

    // if cURL is installed, use it, otherwise fallback to classic sockets
    if($useCurl) {
      if(!($this -> getFromUrlCurl($user, $pwd, $verb))) {
        return false;
      }
    } else {
      if(!($this -> getFromUrl($user, $pwd, $verb))) {
        return false;
      }
    }

    $this->addResponseHeader("X-AjaxProxy-Method: ". ($useCurl? "CURL":"FSOCKET"));
    $this->addResponseHeader("X-AjaxProxy-Status: ". $this -> status);
    
    if($this -> status != 200) {      
      
      return $this -> status;
    }
    
    if($cacheDuration > 0) {
      $cacheEntry = new Response();
      $cacheEntry -> body = $this -> responseBody;
      $cacheEntry -> headers = $this -> responseHeaders;
      $cacheEntry -> key = $this -> requestHash;

      $cache[$this -> requestHash] = $cacheEntry;            

      $this -> cache -> set($this -> requestHash, $cacheEntry, $cacheDuration);
    }

    return $this -> status;
  }

  function prepare($verb="GET", $cacheDuration=-1) {
    $this -> Log("getFromUrl() called");

    $this -> bodyRequired = $verb == "POST" || $verb == "PUT" || $verb == "DELETE";

    if($this -> bodyRequired) {
      if(count($this -> postvars) > 0) {
        foreach($this->postvars as $key => $value) {
          $this -> requestBody .= "&" . urlencode($key) . "=" . urlencode($value);
        }
      } else {
        $this -> requestBody .= file_get_contents("php://input");
      }
    }

    // if cache is requested, calculate md5 as cache key upon verb, uri and body
    if($cacheDuration > 0) {
      $requestHashSource = "";
      $requestHashSource .= $verb;
      $requestHashSource .= "\r\n" . $this -> url;
      $requestHashSource .= "\r\n" . $this -> requestBody;

      $this -> requestHash = md5($requestHashSource);
    }
  }

  /* CURL - Retrieval */
  function getFromUrlCurl($user="", $pwd="", $verb="GET") {
    $ch = curl_init();

    //set the URL to connect to
    curl_setopt($ch, CURLOPT_URL, $this -> url);

    //do not include headers in the response
    curl_setopt($ch, CURLOPT_HEADER, 0);

    //register a callback function which will process the headers
    //this assumes your code is into a class method, and uses $this->readHeader as the callback //function
    curl_setopt($ch, CURLOPT_HEADERFUNCTION, array(&$this, 'processCurlHeader'));

    //Response will be read in chunks of 64000 bytes
    curl_setopt($ch, CURLOPT_BUFFERSIZE, 64000);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 600);
    //curl_setopt($ch, CURLOPT_ENCODING, 1);    
    //curl_setopt($curl, CURLOPT_ENCODING, 'gzip'); 

    $headers = getallheaders();

    if($user != "" && $pwd != "") {
      curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
      curl_setopt($ch, CURLOPT_USERPWD, $user . ':' . $pwd);
    }

    $this -> requestHeaders["Accept"] = $headers['Accept'];
    $this -> requestHeaders["Content-Type"] = $headers['Content-Type'];

    $requestOrigin = null;

    if(isset($_SERVER["REMOTE_ADDR"])) {
      $requestOrigin = $_SERVER["REMOTE_ADDR"] . ' ';
    } else if(isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
      $requestOrigin = $_SERVER["HTTP_X_FORWARDED_FOR"];
    } else if(isset($_SERVER["HTTP_CLIENT_IP"])) {
      $requestOrigin = $_SERVER["HTTP_CLIENT_IP"];
    }

    if($requestOrigin != null) {
      $this -> requestHeaders["HTTP_X_FORWARDED_FOR"] = $requestOrigin;
    }

    $headerArray = array();
    foreach($this->requestHeaders as $key => $value) {
      $headerLine = $key . ": " . $value;
      array_push($headerArray, $headerLine);
    }

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArray);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $verb);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $this -> requestBody);

    $this -> responseBody = curl_exec($ch);
    
    $this -> status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    //close connection
    curl_close($ch);

    return true;
  }

  private function processCurlHeader($ch, $header_line) {
    $this -> addResponseHeader($header_line);
    ;

    return  strlen($header_line);
  }

  /*
   Classic fsockopen - Retrieval
   */
  function getFromUrl($user="", $pwd="", $verb="GET") {
    $this -> Log("getFromUrl() called");

    preg_match("~([a-z]*://)?([^:^/]*)(:([0-9]{1,5}))?(/.*)?~i", $this -> url, $parts);
    $protocol = $parts[1];
    $server = $parts[2];
    $port = $parts[4];
    $path = $parts[5];

    if($port == "") {
      if(strtolower($protocol) == "https://") {
        $port = "443";
      } else {
        $port = "80";
      }
    }
    if($path == "") {
      $path = "/";
    }

    $sockUri = ((strtolower($protocol) == "https://") ? "ssl://" : "") . $server;

    if(!$sock = @fsockopen($sockUri, $port, $errno, $errstr, $this -> connect_timeout)) {
      $this -> Log("Could not open connection. Error " . $errno . ": " . $errstr);
      return false;
    }

    $this -> requestHeaders["Host"] = $server . ":" . $port;
    $headers = getallheaders();
    if($user != "" && $pwd != "") {
      $this -> Log("Authentication will be attempted");
      $this -> requestHeaders["Authorization"] = "Basic " . base64_encode($user . ":" . $pwd);
    }

    $this -> Log("Using " . $verb);
    $request = $verb . " " . $path . " HTTP/1.0\r\n";

    $this -> Log("Body required? " . $this -> bodyRequired);
    ;

    // generelle header
    $this -> requestHeaders["Accept"] = $headers['Accept'];
    $this -> requestHeaders["Content-Type"] = $headers['Content-Type'];

    $requestOrigin = null;

    if(isset($_SERVER["REMOTE_ADDR"])) {
      $requestOrigin = $_SERVER["REMOTE_ADDR"] . ' ';
    } else if(isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
      $requestOrigin = $_SERVER["HTTP_X_FORWARDED_FOR"];
    } else if(isset($_SERVER["HTTP_CLIENT_IP"])) {
      $requestOrigin = $_SERVER["HTTP_CLIENT_IP"];
    }

    if($requestOrigin != null) {
      $this -> requestHeaders["HTTP_X_FORWARDED_FOR"] = $requestOrigin;
    }

    // body required? then prepare specific headers like content-length
    if($this -> bodyRequired) {
      $this -> Log("Variables will be POSTed");
      $this -> requestHeaders["Content-Length"] = strlen($this -> requestBody);
    }

    if(fwrite($sock, $request) === FALSE) {
      fclose($sock);
      $this -> Log("Error writing request type to socket");
      return false;
    } else {
      $this -> Log("Socket opened.");
    }

    foreach($this->requestHeaders as $key => $value) {
      $this -> Log("Writing header: " . $key . " = " . $value);
      if(fwrite($sock, $key . ": " . $value . "\r\n") === FALSE) {
        fclose($sock);
        $this -> Log("Error writing headers to socket");
        return false;
      }
    }
    if(fwrite($sock, "\r\n") === FALSE) {
      fclose($sock);
      $this -> Log("Error writing end-of-line to socket");
      return false;
    } else {
      $this -> Log("Header finished.");
    }

    // body required? then send it
    if($this -> bodyRequired) {
      if(fwrite($sock, $this -> requestBody . "\r\n") === FALSE) {
        fclose($sock);
        $this -> Log("Error writing POST data to socket");
        return false;
      } else {
        $this -> Log("Form data posted");
      }
    }

    $statusLine = fgets($sock, $this -> buffer_size);
    //$this -> responseHeaders = fgets($sock, $this -> buffer_size);
    $this -> status = substr($statusLine, 9, 3);
    $this -> addResponseHeader($statusLine);

    while((trim($line = fgets($sock, $this -> buffer_size)) != "") && (!feof($sock))) {
      $this -> addResponseHeader($line);
      if($this -> status == "401" and strpos($line, "WWW-Authenticate: Basic realm=\"") === 0) {
        fclose($sock);
        $this -> Log("Could not authenticate");
        return FALSE;
      }
    }

    while(!feof($sock)) {
      $this -> responseBody .= fgets($sock, $this -> buffer_size);
    }
    fclose($sock);
    return true;

  }

  /*
   PRIVATE clean() method to reset the instance back to mostly new state.
   */
  function clean() {
    $this -> status = "";
    $this -> responseHeaders = array();
    $this -> responseBody = "";
    $this -> requestHeaders = array();
    $this -> postvars = array();

    /*
     Try to use user agent of the user making this request. If not available,
     default to IE6.0 on WinXP, SP1.
     */
    if(isset($_SERVER['HTTP_USER_AGENT'])) {
      $this -> requestHeaders["User-Agent"] = $_SERVER['HTTP_USER_AGENT'];
    } else {
      $this -> requestHeaders["User-Agent"] = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)";
    }

    /*
     Set referrer to the current script since in essence, it is the referring
     page.
     */
    if(substr($_SERVER['SERVER_PROTOCOL'], 0, 5) == "HTTPS") {
      $this -> requestHeaders["Referer"] = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    } else {
      $this -> requestHeaders["Referer"] = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    }
  }

}

$proxy_url = isset($_GET['u']) ? $_GET['u'] : false;
$cacheDuration = isset($_GET['c']) ? intval($_GET['c']) : -1;
$proxy_url = urldecode($proxy_url);

$type = isset($_GET['type']) ? $_GET['type'] : false;

if(!$proxy_url) {
  header("HTTP/1.0 400 Bad Request");
  echo "proxy.php failed because 'u' query parameter is missing";
  exit();
}

// Instantiate the Http object used to make the web requests.
if(!$h = new Http()) {
  header("HTTP/1.0 501 Script Error");
  echo "ajaxproxy.php failed trying to initialize the http object";
  exit();
}

$h -> url = $proxy_url;
$h -> postvars = $_POST;

$user = ApiCredentials::GetApiUserName();
$pass = ApiCredentials::GetApiPass();

if(isset($_GET['d'])){
	include_once('../config/config.class.php');
	$user = W2PConfig::$defaultAffid;
	$pass = W2PConfig::$defaultAffsecret;
}

$requestVerb = $_SERVER['REQUEST_METHOD'];
$durationStart = time();
$h -> prepare($requestVerb, $cacheDuration);
$h -> fetch($user, $pass, $requestVerb, $cacheDuration);
$durationEnd = time();

// Forward the headers to the client.
//$ary_headers = explode("\r\n", $h -> responseHeaders);
$h->addResponseHeader("X-AjaxProxy-Duration: " . ($durationEnd - $durationStart));
$h->addResponseHeader("X-AjaxProxy-CacheKey: " . ($h -> requestHash));

foreach($h->responseHeaders as $hdr) {
  if(!startsWith($hdr, "Server") && !startsWith($hdr, "X-Powered-By")&& !startsWith($hdr, "Content-Length")) {
    $h -> Log("Reading header: " . $hdr);
    header($hdr);
  }
}

//ini_set('zlib.output_compression_level', 9);
//if(!ob_start("ob_gzhandler")) ob_start();
echo($h->responseBody);

?>