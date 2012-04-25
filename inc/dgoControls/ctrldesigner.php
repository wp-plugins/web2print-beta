<?php
	/*
	 * DgoContentDesigner
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

	//if(class_exists('DgoContentDesigner')) { exit(); } 
	
	// baseclass
	require_once dirname(__FILE__) . '/inc/controlbase.php';
	require_once dirname(__FILE__) . '/ctrldesignercontrols.php'; //needed, if you use the designer control
	
	class DgoContentDesigner extends DgoControlBase {
		// ctor
		public function __construct(){
			$this->designerPlaceholderId = 'designerplaceholder';
			$this->bShowControls = true;
			parent::__construct();
		}
		
		// properties
		private $designerPlaceholderId;
		private $bShowControls;
		
		// setters
		public function setDesignerPlaceholderId($id){ $this->designerPlaceholderId = $id; }
		public function setBShowControls($val){ $this->bShowControls = $val; }
	
		// methods
		//overrides getControlHtml(), replaces all placeholders
	    //in template file(s) and returns the full html code
	    //for the control
		public function getControlHtml() {
			//create new template engine
			$tpl = new TemplateEngine($this->getTplDir().'ctrldesigner.tpl');
			//$tplJs = new TemplateEngine($this->getTplDir().'js/ctrldesigner.js.tpl');
		 	
			//first replace js placeholders
			/*$tplJs->replace_tags(array(
				"ajaxproxy"						=> array($this->getAjaxProxy(), false),
				"languagetoken"					=> array($this->getLanguageToken(), false),
				"portalid"						=> array($this->getPortalId(), false),
				"userinfo"						=> array($this->getUserInfo(), false),
				"serverbase"					=> array($this->getServerBase(), false),
				"sessionid"						=> array(session_id(), false),
				"controlloaded"					=> array($this->getControlLoaded(), false),
				"stageWidth"					=> array("380", false),
				"stageHeight"					=> array("380", false),
				"templatesPlaceHolderId" 		=> array($this->getTemplatesPlaceHolderId(), false)
			));*/
			
		 	//then replace all template placeholders
			$tpl->replace_tags(array(
				//"scriptplaceholder" 			=> array($tplJs->getHtml(), false),
				//"designercontrolscode" 			=> array($designerControlsControl->getControlHtml(), false),
				"designerplaceholder" 			=> array($this->designerPlaceholderId, false),
				//"showcontrols"					=> array($displayValue, false)
			));
			
			return $tpl->getHtml();
		}

		public function getDesignerControlsHtml(){
			$designerControlsControl 	= new DgoContentDesignerControls(); //designer controls control
			
			//designer controls control properties
			$designerControlsControl->setControlsPlaceholderId('DesignerControlsCtl');
			
			//check whether the controls should be shown or not
			$displayValue = $this->bShowControls == true ? "block" : "none";
			
			return '<div id="designercontrolsfloatingdiv" style="display:'.$displayValue.';">
				'.$designerControlsControl->getControlHtml().'
			</div>';
		}
		
		public function getDesignerScript(){
			$tplJs = new TemplateEngine($this->getTplDir().'js/ctrldesigner.js.tpl');
			
			$tplJs->replace_tags(array(
				"ajaxproxy"						=> array($this->getAjaxProxy(), false),
				"languagetoken"					=> array($this->getLanguageToken(), false),
				"portalid"						=> array($this->getPortalId(), false),
				"userinfo"						=> array($this->getUserInfo(), false),
				"serverbase"					=> array($this->getServerBase(), false),
				"sessionid"						=> array(session_id(), false),
				"controlloaded"					=> array($this->getControlLoaded(), false),
				"stageWidth"					=> array("460", false),
				"stageHeight"					=> array("460", false),
				"designerplaceholder" 			=> array($this->designerPlaceholderId, false),
				"templatesPlaceHolderId" 		=> array($this->getTemplatesPlaceHolderId(), false)
			));
				
			return $tplJs->getHtml();
		}
		
		//get generated pdf link to finished product
		//TODO: improve it! and then change it to public
		//PREALPHA, don't use!!!
		private function generatePdf() {
			return $this->getServerBase() . 'RenderTemplate.aspx?actionId=' . '<script type="text/javascript">getActionId();</script>';
		}
	}
?>