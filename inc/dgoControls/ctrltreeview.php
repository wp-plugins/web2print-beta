<?php
	/*
	 * DgoContentTreeview
	 * - extends ControlBase
	 * ----------------------------------------
	 * 
	 * PHP control, which shows the category
	 * tree
	 * 
	 * Version 0.383 b
	 * 
	 * Last changes: 03.05.2011
	 * 
	 * @author slierka
	 * 
	 * */

	// baseclass
	require_once dirname(__FILE__) . '/inc/controlbase.php';
	
	//TODO: rename files 
	class DgoContentCategory extends DgoControlBase {	
		// ctor
		public function __construct(){
			$this->treeplaceholder = 'dgotreeview';
			$this->listplaceholder = 'contentItemList';
			$this->templatesPlaceHolderId = 'dgo_templates';
			$this->controlMode = CategoryControlMode::Treeview;
			$this->skipRoot = false;
			$this->allowMultipleChoice = false;
			parent::__construct();
		}
		
		// properties
	    private $treeplaceholder;
	    private $listplaceholder;
	    private $templatesPlaceHolderId;
	    private $controlMode;
	    private $skipRoot;
	    private $allowMultipleChoice;
	    
	    // setters
		public function setTreeplaceHolder($id){ $this->treeplaceholder = $id; }
		public function setListplaceHolder($id){ $this->listplaceholder = $id; }
		public function setTemplatesplaceHolder($id){ $this->templatesPlaceHolderId = $id; }
		public function setControlMode($id){ $this->controlMode = $id; }//CategoryControlMode enum
		
		private function setSkipRoot($id){ $this->skipRoot = $id; } //TODO: use public later
		private function setAllowMultipleChoice($id){ $this->allowMultipleChoice = $id; } //TODO: use public later
	    
		// private functions
		private function getTreeList(){
			//TODO: get tree list from webservice
		}
		
		private function handleTreeList(){
			//TODO: build ul-li-structure from tree list
		}
		
		private function getTreeHtml(){
			//TODO: get all html elements
		}
		
		// public functions
		public function getControlHtml() {
			//TODO: remove this die statement
		 	die('This class was not finally implemented yet. Please remove all calls to "DgoContentCategory"!!'); 
		 	//create new template engine
			$tpl = new TemplateEngine($this->getTplDir().'ctrltreeview.tpl');
			$tplJs = new TemplateEngine($this->getTplDir().'js/ctrltreeview.js.tpl');
			
			//first replace js placeholders
			$tplJs->replace_tags(array(
				"treeplaceholder" => array($this->treeplaceholder, false),
				"listplaceholder" => array($this->listplaceholder, false),
				"templatesPlaceHolderId" => array($this->templatesPlaceHolderId, false)
			));	
			
			//TODO: get tree data and add it to html
			$tpl->replace_tags(array(
				"scriptplaceholder" => array($tplJs->getHtml(), false),
				"treeplaceholder" => array($this->treeplaceholder, false)
			));

			return $tpl->getHtml();
		}
	}
?>