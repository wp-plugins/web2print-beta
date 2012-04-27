<?php
	/*
	 * DgoControlBase
	 * ----------------------------------------
	 * 
	 * PHP control base
	 * holds some properties used by all
	 * controls
	 * 
	 * Version 0.0.5a
	 * 
	 * Last changes: 12.04.2011
	 * 
	 * @author slierka
	 * 
	 * */
	
	// enums
	require_once dirname(__FILE__) . '/enumclasses.php';

	// template engine
	if(!class_exists('TemplateEngine')) { include_once dirname(__FILE__) . '/template_engine.php'; }
	
	// abstract class, because nobody should
	// use this class as standalone object.
	abstract class DgoControlBase {
		// ctor
		public function __construct(){
			//init some properties
			$this->ajaxproxy = 'ajaxproxy.php';
		    $this->languagetoken = 'EN';
		    $this->portalid = '00000000-0000-0000-0000-000000000000';
		    $this->controlloaded = 'function(){}';
		    $this->userinfo = '{ Guid: "00000000-0000-0000-0000-000000000000", Name: "Guest" }';
		    $this->serverbase = 'http://api.delivergo.com/content.beta/';
		    $this->templatesPlaceHolderId = 'delivergo_templates';
		    
		    $this->tplDir = dirname(__FILE__) . '/../tpl/';
	    	$this->jsDir  = dirname(__FILE__) . '/../js/';
	    	$this->cssDir = dirname(__FILE__) . '/../css/';
	    	$this->incDir = dirname(__FILE__) . '/../inc/';
		}
		// pathes
	    private $tplDir;
	    private $jsDir;
	    private $cssDir;
	    private $incDir;
	    
	    // properties
	    private $ajaxproxy;
	    private $languagetoken;
	    private $portalid;
	    private $controlloaded;
	    private $userinfo;
	    private $serverbase;
	    private $templatesPlaceHolderId;
	    
	    // setter
	    public function setAjaxProxy($val){ $this->ajaxproxy = $val; }
		public function setLanguageToken($val){ $this->languagetoken = $val; }
		public function setPortalId($val){ $this->portalid = $val; }
		public function setControlLoaded($val){ $this->controlloaded = $val; }
		public function setUserInfo($val){ $this->userinfo = $val; }
		public function setTemplatesPlaceHolderId($id){ $this->templatesPlaceHolderId = $id; }
		public function setContentitemGuid($id){ $this->contentitemGuid = $id;; }
	
	    // getter
	    protected function getAjaxProxy(){ return $this->ajaxproxy; }
		protected function getLanguageToken(){ return $this->languagetoken; }
		protected function getPortalId(){ return $this->portalid; }
		protected function getControlLoaded(){ return $this->controlloaded; }
		protected function getUserInfo(){ return $this->userinfo; }
		protected function getServerBase(){ return $this->serverbase; }
		public function getTplDir(){ return $this->tplDir; }
		public function getJsDir(){ return $this->jsDir; }
		public function getCssDir(){ return $this->cssDir; }
		public function getIncDir(){ return $this->incDir; }
		protected function getTemplatesPlaceHolderId(){ return $this->templatesPlaceHolderId; }
		protected function getContentitemGuid(){ return $this->contentitemGuid; }
		
		// methods
		// getControlHtml() should be always overwritten!
		abstract public function getControlHtml();
		
		//helper
		public function getCurPageURL() {
			$pageURL = 'http';
			$pageURL .= ($_SERVER["HTTPS"] == "on") ? $pageURL .= "s://" : "://";
			if ($_SERVER["SERVER_PORT"] != "80") {
				$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
			} else {
				$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
			}
			return $pageURL;
		}
	}
?>