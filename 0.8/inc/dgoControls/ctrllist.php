<?php
	/*
	 * DgoContentItemListControl
	 * - extends ControlBase
	 * ----------------------------------------
	 * 
	 * PHP control, which returns a filtered
	 * content item list html sourcecode
	 * 
	 * Version 0.383 b
	 * 
	 * Last changes: 08.04.2011
	 * 
	 * @author slierka
	 * 
	 * */

	//if(class_exists('DgoContentItemList')) { exit(); }
	
	// baseclass
	require_once dirname(__FILE__) . '/inc/controlbase.php';
	
	class DgoContentItemList extends DgoControlBase {	
		// ctor
		public function __construct(){
			$this->contentItemListPlaceholderId = 'contentItemList';
			$this->filter = '';
			$this->getpermalink = 'function(){return "#";}';
			$this->onplacingitem = 'function(){}';
			$this->detaillevel = EnumDetailLevel::NoDetails;
			$this->showfilter = "false";
	    	$this->showpager = "false";
			parent::__construct();
		}	
		
	    // properties
	    private $contentItemsListPlaceholderId;
	    private $filter;
	    private $getpermalink;
	    private $onplacingitem;
	    private $detaillevel;
	    private $showfilter;
	    private $showpager;
		
	    // setters
	    public function setContentItemListPlaceholderId($id){ $this->contentItemsListPlaceholderId = $id; }
	    public function setFilter($val){ $this->filter = $val; }
		public function setGetPermaLink($val){ $this->getpermalink = $val; }
		public function setOnPlacingItem($val){ $this->onplacingitem = $val; }
		public function setDetailLevel($val){ $this->detaillevel = $val; }
		public function setShowPager($val){ $this->showpager = $val; }
		public function setShowFilter($val){ $this->showfilter = $val; }
	    
	    // methods
	    //overrides getControlHtml(), replaces all placeholders
	    //in template file(s) and returns the full html code
	    //for the control
	    public function getControlHtml() {
	        //create new template engine
			$tpl = new TemplateEngine($this->getTplDir().'ctrllist.tpl');
			$tplJs = new TemplateEngine($this->getTplDir().'js/ctrllist.js.tpl');
			
			//first replace js placeholders
			$tplJs->replace_tags(array(
				"filter"						=> array($this->filter, false),
				"controlloaded"					=> array($this->getControlLoaded(), false),
				"getpermalink"					=> array($this->getpermalink, false),
				"onplacingitem"					=> array($this->onplacingitem, false),
				"detaillevel"					=> array($this->detaillevel, false),
				"showpager"						=> array($this->showpager, false),
				"showfilter"					=> array($this->showfilter, false)
			));
			
			//then replace all template placeholders
			$tpl->replace_tags(array(
				"scriptplaceholder" 			=> array($tplJs->getHtml(), false),
			  	"contentItemsListPlaceholderId" => array($this->contentItemsListPlaceholderId, false),
			  	"templatesPlaceHolderId" 		=> array($this->getTemplatesPlaceHolderId(), false)
			));
	        
	        return $tpl->getHtml();
	    }
	}
?>