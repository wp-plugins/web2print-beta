<?php
	/*
	 * TemplateEngine
	 * ----------------------------------------
	 * PHP class, which replaces placeholders
	 * in a template file and returns the
	 * resulting html code
	 * 
	 * Version 1.0b
	 * 
	 * Last changes: 11.04.2011
	 * 
	 * @author slierka
	 * 
	 * */
	class TemplateEngine {
		//holds the resulting html code
		//so we can call replace_tags twice
		//to replace something else after
		//replacement
		private $tpl;
	
		//ctor
		//give it a templatefile. if not, default one
		//will be used
		public function TemplateEngine($template = "template.tpl") {
			//check if file exists. if not,
			//exit with error message
			if (file_exists($template))
				$this->tpl = join("", file($template));
			else
				die("Template file ".$template." not found.");
		}
		
		//parse a file and return the content of it
		//we use the output buffer for that, because
		//it's easier to clean
		private function parse($file) {
			ob_start();	//start the outputbuffer
			include($file);	//get the template file
			$buffer = ob_get_contents(); //get content from buffer
			ob_end_clean(); //clear the outputbuffer
			return $buffer; //return it
		}
	
		public function replace_tags($tags = array()) {
			if (sizeof($tags) > 0)
				foreach ($tags as $tag => $data) {
					//TODO: find another solution for gathering whether
					//to parse a file or input the filepath
					$data = (@file_exists($data[0]) && $data[1] == true) ? $this->parse($data[0]) : $data[0];
					$pattern = "/{" . $tag . "}/";
					$this->tpl = preg_replace($pattern, $data, $this->tpl);
				}
			else
				die("No tags designated for replacement.");
		}
		
		//call this, if all neccesary
		//tags are replaced and you'll
		//get the html code back
		public function getHtml() {
			return $this->tpl;
		}
	}
?>