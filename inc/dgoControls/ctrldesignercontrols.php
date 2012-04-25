<?php
	/*
	 * DgoContentDesignerControls
	 * - extends ControlBase
	 * ----------------------------------------
	 * 
	 * PHP control, which shows the
	 * designer to change contentitems
	 * 
	 * Version 0.383 b
	 * 
	 * Last changes: 11.04.2011
	 * 
	 * @author slierka
	 * 
	 * */

	//if(class_exists('DgoContentDesignerControls')) { exit(); }
	
	// baseclass
	require_once dirname(__FILE__) . '/inc/controlbase.php';
	
	class DgoContentDesignerControls extends DgoControlBase {	
		// ctor
		public function __construct(){
			$this->controlsplaceholderid = 'designercontrolsplaceholder';
			parent::__construct();		
		}

		// properties
		private $controlsplaceholderid;
		
		// setters
		public function setControlsPlaceholderId($id){ $this->controlsplaceholderid = $id; }
		
		// methods
		//overrides getControlHtml(), replaces all placeholders
	    //in template file(s) and returns the full html code
	    //for the control
		public function getControlHtml() {
		 	$tpl = new TemplateEngine($this->getTplDir().'ctrldesignercontrols.tpl');
			$tplJs = new TemplateEngine($this->getTplDir().'js/ctrldesignercontrols.js.tpl');
		 	
			//first replace js placeholders
			$tplJs->replace_tags(array(
				"ajaxproxy"						=> array($this->getAjaxProxy(), false),
				"languagetoken"					=> array($this->getLanguageToken(), false),
				"portalid"						=> array($this->getPortalId(), false),
				"userinfo"						=> array($this->getUserInfo(), false),
				"serverbase"					=> array($this->getServerBase(), false),
				"controlloaded"					=> array($this->getControlLoaded(), false),
				"templatesPlaceHolderId" 		=> array($this->getTemplatesPlaceHolderId(), false)
			));
			
		 	//then replace all template placeholders
			$tpl->replace_tags(array(
				"scriptplaceholder" 			=> array($tplJs->getHtml(), false),
				"controlsplaceholder" 			=> array($this->controlsplaceholderid, false)
			));
			
			return $tpl->getHtml();
		}
	}
?>