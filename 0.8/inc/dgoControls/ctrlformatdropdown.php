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
	class DgoFormatDropdown extends DgoControlBase {	
		// ctor
		public function __construct(){
			$this->templatesPlaceHolderId = 'dgo_templates';

			parent::__construct();
		}
		
		// properties
	    private $templatesPlaceHolderId;
	    
	    // setters
		public function setTemplatesplaceHolder($id){ $this->templatesPlaceHolderId = $id; }
	    
		// private functions
		
		// public functions
		public function getControlHtml() {
			//TODO: remove this die statement
		 	die('This class was not finally implemented yet. Please remove all calls to "DgoFormatDropdown"!!'); 
		 	//create new template engine
			$tpl = new TemplateEngine($this->getTplDir().'ctrltreeview.tpl');
			$tplJs = new TemplateEngine($this->getTplDir().'js/ctrltreeview.js.tpl');
			
			//first replace js placeholders
			$tplJs->replace_tags(array(
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