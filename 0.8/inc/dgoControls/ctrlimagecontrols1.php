<?php
	/*
	 * DgoImageControls
	 * - extends ControlBase
	 * ----------------------------------------
	 * 
	 * PHP control, which shows the
	 * image upload controls for designer
	 * 
	 * Version 0.383 b
	 * 
	 * Last changes: 12.05.2011
	 * 
	 * @author slierka
	 * 
	 * */

	//if(class_exists('DgoImageControls')) { exit(); } 
	
	// baseclass
	require_once dirname(__FILE__) . '/inc/controlbase.php';
	
	class DgoImageControls extends DgoControlBase {
		// ctor
		public function __construct(){
			$this->imagecontrolsId = 'dgoImageUpload';
			$this->uploadSessionId = '00000000-0000-0000-0000-000000000000';
			$this->buttonImage = basename(dirname(__FILE__)) . '/img/own_uploads.png';
			$this->uploaderPath = basename(dirname(__FILE__)) . '/swf/uploadify.embedded.font.swf';
			$this->bExpandable = true;
			parent::__construct();
		}
		
		// properties
		private $imagecontrolsId;
		private $uploadSessionId;
		private $buttonImage;
		private $bExpandable;
		private $uploaderPath;
		
		// setters
		public function setImageControlsId($id){ $this->imagecontrolsId = $id; }
		public function setUploadSessionId($val){ $this->uploadSessionId = $val; }
		public function setButtonImage($val){ $this->buttonImage = $val; }
		public function setUploaderPath($val){ $this->uploaderPath = $val; }
		public function setExpandable($val){ $this->bExpandable = $val; } //currently not used
	
		// methods
		//overrides getControlHtml(), replaces all placeholders
	    //in template file(s) and returns the full html code
	    //for the control
		public function getControlHtml() {	
			//create new template engine
			$tpl = new TemplateEngine($this->getTplDir().'ctrlimagecontrols.tpl');
			$tplJs = new TemplateEngine($this->getTplDir().'js/ctrlimagecontrols.js.tpl');
		 	
			//first replace js placeholders
			$tplJs->replace_tags(array(
				"uploadsessionid"				=> array($this->uploadSessionId, false),
				"uploaderpath"					=> array($this->uploaderPath, false),
				"buttonimage"					=> array($this->buttonImage, false)
			));
			
		 	//then replace all template placeholders
			$tpl->replace_tags(array(
				"scriptplaceholder" 			=> array($tplJs->getHtml(), false),
				"imagecontrolsid"				=> array($this->imagecontrolsId, false),
				"templatesplaceholderid" 		=> array($this->getTemplatesPlaceHolderId(), false)
			));
			
			return $tpl->getHtml();
		}
	}
?>