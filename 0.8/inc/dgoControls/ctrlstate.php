<?php
	/*
	 * DgoStateControl
	 * - extends ControlBase
	 * ----------------------------------------
	 * 
	 * PHP control, which holds the state
	 * 
	 * Version 0.383 b
	 * 
	 * Last changes: 08.04.2011
	 * 
	 * @author slierka
	 * 
	 * */

	// baseclass
	include_once dirname(__FILE__) . '/inc/controlbase.php';
	
	class DgoStateControl extends DgoControlBase {
		// ctor
		public function __construct(){
			$this->designerPlaceholderId = 'designerplaceholder';
			parent::__construct();
		}
		
		// properties
		private $designerPlaceholderId;
		
		// setters
		public function setDesignerPlaceholderId($id){ $this->designerPlaceholderId = $id; }
		
		// methods
		//overrides getControlHtml(), replaces all placeholders
	    //in template file(s) and returns the full html code
	    //for the control
		public function getControlHtml() {
			//create new template engine
			$tpl = new TemplateEngine($this->getTplDir().'ctrlstate.tpl');
			$tplJs = new TemplateEngine($this->getTplDir().'js/ctrlstate.js.tpl');
		 	
			//first replace js placeholders
			$tplJs->replace_tags(array(
				"ajaxproxy"						=> array($this->getAjaxProxy(), false),
				"languagetoken"					=> array($this->getLanguageToken(), false),
				"portalid"						=> array($this->getPortalId(), false),
				"userinfo"						=> array($this->getUserInfo(), false),
				"serverbase"					=> array($this->getServerBase(), false),
				"sessionid"						=> array(session_id(), false),
				"templatesPlaceHolderId" 		=> array($this->getTemplatesPlaceHolderId(), false),
				"contentitemguid" 				=> array($this->getContentitemGuid(), false)
			));
			
		 	//then replace all template placeholders
			$tpl->replace_tags(array(
				"scriptplaceholder" 			=> array($tplJs->getHtml(), false)
			));
			
			//don't wonder.. there is no visible html
			//code for this control. it just holds the
			//state for our design controls.
			return $tpl->getHtml();
		}
	}
?>