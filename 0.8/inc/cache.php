<?php

define('CACHE_NEVER_EXPIRE', 0);
define('CACHE_DIR', 'cache');
define('ROOT_DIR', 'data');
define('TIMENOW', time());

function format_path($path) {
  if(strpos($path, '\\') !== false) {
    $path = str_replace('\\', '/', $path);
  }
  if(strpos($path, '//') !== false) {
    $path = str_replace('//', '/', $path);
  }
  return $path;
}

function read_serialize_file($filename) {
  if($return = @file_get_contents($filename)) {
    if(strpos($return, '<?php exit; ?' . '>') === 0) {
      $return = substr($return, 14);
    }

    return @unserialize($return);
  }
  return false;
}

function file_write($filename, $content, $mode ='rb+') {
  $length = strlen($content);

  if(!file_exists($filename)) {
    @touch($filename);
  }

  if(!is_writeable($filename)) {
    @chmod($filename, 0666);
  }

  switch ($mode) {
    case 'a' :
      $bytes = file_put_contents($filename, $content, FILE_APPEND);
      break;

    case 'w' :
      $bytes = file_put_contents($filename, $content, LOCK_EX);
      break;

    default :
      if(($fp = @fopen($filename, $mode)) === false) {
        trigger_error('file_write() failed to open stream: Permission denied', E_USER_WARNING);
        return false;
      }

      @flock($fp, LOCK_EX | LOCK_NB);

      $bytes = 0;
      if(($bytes = @fwrite($fp, $content)) === false) {
        $errormsg = sprintf('file_write() Failed to write %d bytes to %s', $length, $filename);
        trigger_error($errormsg, E_USER_WARNING);
        return false;
      }

      if($mode == 'rb+') {
        @ftruncate($fp, $length);
      }
      @fclose($fp);
  }

  if($bytes != $length) {
    $errormsg = sprintf('file_write() Only %d of %d bytes written, possibly out of free disk space.', $bytes, $length);
    trigger_error($errormsg, E_USER_WARNING);
    return false;
  }

  return $bytes;
}

function checkdir($dir, $is_file =false, $root =ROOT_DIR) {
  static $stats = array(), $rootlen = array();

  $hash = $dir . ':' . $root . ':' . ((string)$is_file);
  if(!isset($stats[$hash])) {
    $dir = format_path($dir);

    $stats[$hash] = true;
    if($is_file) {
      if(file_exists($dir) && is_writable($dir)) {
        return $stats[$hash];
      }
    } else if(is_dir($dir) && is_writable($dir)) {
      return $stats[$hash];
    }

    $check = '';
    if(strpos($dir, $root) === 0) {
      if(!isset($rootlen[$root])) {
        $rootlen[$root] = strlen($root);
      }
      $dir = substr($dir, $rootlen[$root]);
      $check = $root;
    }

    if(strrchr($dir, '/') === '/') {
      $dir = substr($dir, 0, -1);
    }

    $dir = explode('/', $dir);
    if($is_file) {
      $file = array_pop($dir);
    }
    $n = count($dir);
    for($i = 0; $i < $n; $i++) {
      if($dir[$i] === '') {
        continue ;
      }

      $check .= $dir[$i] . '/';
      if(!is_dir($check)) {
        if(!mkdir($check)) {
          $stats[$hash] = false;
        } else if(!chmod($check, 0777)) {
          $stats[$hash] = false;
        }
      } else if(!is_writable($check)) {
        if(!chmod($check, 0777)) {
          $stats[$hash] = false;
        }
      }
    }

    if($is_file) {
      $file = $check . $file;
      if(file_exists($file) && !is_writable($check . $file) && !chmod($file, 0666)) {
        $stats[$hash] = false;
      }
    }
  }

  return $stats[$hash];
}


function Dgo_format_path($path) {
  if(strpos($path, '\\') !== false) {
    $path = str_replace('\\', '/', $path);
  }
  if(strpos($path, '//') !== false) {
    $path = str_replace('//', '/', $path);
  }
  return $path;
}

function Dgo_read_serialize_file($filename) {
  if($return = @file_get_contents($filename)) {
    
	$return = explode("---",$return);
    
	return @unserialize($return[0]);
  }
  
  return false;
}

function Dgo_get_data_from_cache($filename){
	if($return = @file_get_contents($filename)) {
    
		$return = explode("---",$return);
		
		$return = @unserialize($return[1]);
		
		return $return;
	}
  
	return false;
}

function Dgo_file_write($filename, $content, $mode ='rb+') {
  $length = strlen($content);

  if(!file_exists($filename)) {
    @touch($filename);
  }

  if(!is_writeable($filename)) {
    @chmod($filename, 0666);
  }

  switch ($mode) {
    case 'a' :
      $bytes = file_put_contents($filename, $content, FILE_APPEND);
      break;

    case 'w' :
      $bytes = file_put_contents($filename, $content, LOCK_EX);
      break;

    default :
      if(($fp = @fopen($filename, $mode)) === false) {
        trigger_error('file_write() failed to open stream: Permission denied', E_USER_WARNING);
        return false;
      }

      @flock($fp, LOCK_EX | LOCK_NB);

      $bytes = 0;
      if(($bytes = @fwrite($fp, $content)) === false) {
        $errormsg = sprintf('file_write() Failed to write %d bytes to %s', $length, $filename);
        trigger_error($errormsg, E_USER_WARNING);
        return false;
      }

      if($mode == 'rb+') {
        @ftruncate($fp, $length);
      }
      @fclose($fp);
  }

  if($bytes != $length) {
    $errormsg = sprintf('file_write() Only %d of %d bytes written, possibly out of free disk space.', $bytes, $length);
    trigger_error($errormsg, E_USER_WARNING);
    return false;
  }

  return $bytes;
}

function Dgo_checkdir($dir) {
	$pathCache = dirname(__FILE__).'/'.CACHE_DIR;
	
	if(is_dir($pathCache)){
		if(!file_exists($pathCache.'/'.$dir)){
			return false;
		}else{
			return true;
		}
	}else{
		mkdir($pathCache, 0777);
		return false;
	}
}


class CacheBase {
  private $type;

  public function __construct() {
    $this -> type = strtolower(substr(get_class($this), 6));
  }

  public function IsConnected() {
    return true;
  }

  protected function _default($options, $default) {
    $options = array_merge($default, (array)$options);
    return $options;
  }

  protected function clear($prefix ='') {
    return false;
  }

}

class FileCache extends CacheBase {
  private $_options;
  private $_connected;
  private static $_path = array();

  function __construct($options) {
    $this -> _options = $this -> _default($options, array('dir' => CACHE_DIR, 'include' => false, ));

    $this -> _connected = checkdir($this -> _options['dir']);
  }

  function is_connected() {
    return $this -> _connected;
  }

  function get($name) {
    $name = $this -> getPath($name);

    if($this -> _options['include']) {
      @
      include ($name);
      if(!isset($data)) {
        return NULL;
      }
    } else {
      $data = read_serialize_file($name);

      if(empty($data) || ($data['expire'] != CACHE_NEVER_EXPIRE && $data['expire'] < TIMENOW)) {
        return NULL;
      }

      $data = $data['data'];
    }

    return $data;
  }

  function set($name, $value, $ttl =CACHE_NEVER_EXPIRE) {
    $name = $this -> getPath($name);

    $expire = ($ttl <= CACHE_NEVER_EXPIRE) ? CACHE_NEVER_EXPIRE : (TIMENOW + $ttl);
    if(!$this -> _options['include']) {
      $content = '<?php exit; ?' . '>' . serialize( array('expire' => $expire, 'data' => $value, ));
    } else {
      $content = '<?php ';
      if($expire != CACHE_NEVER_EXPIRE) {
        $content .= 'if (TIMENOW > ' . $expire . ') {return;} ';
      }
      $content .= '$data = ' . var_export($value, true) . '; ?>';
    }

    return    file_write($name, $content);
  }

  function rm($name) {
    $name = $this -> getPath($name);
    @unlink($name);
  }

  function clear($dir) {
    $dir = $this -> _options['dir'] . str_replace('_', '/', $dir);
    $dh = opendir($dir);
    while(($entry = readdir($dh)) !== false) {
      if($entry == '.' || $entry == '..') {
        continue ;
      }
      $name = $dir . $entry;
      if(is_dir($name)) {
        $this -> clear($name);
      } else if(is_file($name)) {
        @unlink($name);
      }
    }
    @closedir($dir);
  }

  private function getPath($name) {
    if(!isset(self::$_path[$name])) {
      /*if(strpos($name, '-') !== false) {
        $file = implode('/', array_map( function($c) {
          return is_numeric($c) ? number_hash($c) : $c;
        }, explode('-', $name)));

        if(strpos($file, '.') === false) {
          $file .= '/' . $name;
        }
      } else {*/
        $file = $name;
      //}

      $file = $this -> _options['dir'] . "/" . $file . '.php';
      if(!checkdir($file, true, $this -> _options['dir'])) {
        trigger_error('Path Error: ' . $file, E_USER_WARNING);
      }

      self::$_path[$name] = $file;
    }
    return self::$_path[$name];
  }

}
?>