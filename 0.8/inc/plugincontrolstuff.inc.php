<?php
	//function builds widget design
	function createCalculatorSideBarControl(){
		//Get info of changing options
        $plugin_option = get_option("w2p_plugin_option");
		
		?>
			<script type="text/javascript">
	            /*Ready function*/
	            jQuery(document).ready(function() {
		            if(!flag_func_call){ flag_func_call = true;
		            
		            	//get language
		            	adminControlGetLanguage( 'wp_control' );
		            	
		            	//get language
		            	adminControlGetCurrency( 'wp_control' );
		            	
		            	//get language
		            	adminControlGetDimension( 'wp_control' );
		            }
	            });
	        </script>
	        <!--end admin script -->
	        
			<!--Css for admin controls-->
       		<link href="<?php echo linkToPlugin; ?>css/admin_option_css.css" rel="stylesheet" type="text/css"/>
       		
       		<!--HTML here-->     
       		<div id="dgo-price-control">
       			<div class="price-control-title">Settings</div>       		      		
        		<div class="price-control-tab1">
        			<input class="show-option" name="showoption1" type="checkbox" value=""/>
        			<span>Show only, when the User is logged in.</span>
        		</div>
        		<div class="price-control-tab2">
        			<div class="price-control-tab2-1">Preselection</div>
        			<div class="price-control-tab2-2"><span>Show</span><input autocomplete="off" class="show-option" name="header_option_show" type="checkbox" value="<?php if($plugin_option['header_option_show']){echo 'true';}else{echo 'false';} ?>" <?php if($plugin_option['header_option_show']){echo 'checked=""';} ?>/></div>
        		</div>
        		<div class="price-control-tab3">
        			<input type="hidden" id="hidden-language" value="<?php echo $plugin_option['language']; ?>"/>
        			<select class="price-control-select" id="dgo-control-language" name="dgo_language">
        				<option value="<?php echo $plugin_option['language']; ?>"><?php echo $plugin_option['language_name']; ?></option>
        			</select>
        			
        			<input type="hidden" id="hidden-currency" value="<?php echo $plugin_option['currency']; ?>"/>
        			<select class="price-control-select" id="dgo-control-currency" name="dgo_currency">
        				<option value="<?php echo $plugin_option['currency']; ?>"><?php echo $plugin_option['currency']; ?></option>
        			</select>
        			
        			<input type="hidden" id="hidden-dimension" value="<?php echo $plugin_option['dimension']; ?>"/>
        			<select class="price-control-select" id="dgo-control-dimension" name="dgo_dimension">
        				<option value="<?php echo $plugin_option['dimension']; ?>"><?php echo $plugin_option['dimension']; ?></option>
        			</select>
        		</div>
       		</div> 		
		<?php
			
			/*Save the setting*/
			if(isset($_POST['dgo_language'])){
				$temp = $_POST['dgo_language'];
				$temp = split("[_]", $temp);
				
				if($plugin_option['language'] != $temp[0] || $plugin_option['currency'] != $_POST['dgo_currency'] || $plugin_option['dimension'] = $_POST['dgo_dimension']){
					$plugin_option['edited'] = true;
				}
				
				$plugin_option['language'] = $temp[0];
				$plugin_option['language_name'] = $temp[1];
				$plugin_option['currency'] = $_POST['dgo_currency'];
				$plugin_option['dimension'] = $_POST['dgo_dimension'];				
				
				if(isset($_POST['header_option_show'])){
					$plugin_option['header_option_show'] = true;
				}else{
					$plugin_option['header_option_show'] = false;
				}
				
				?>
				<script type="text/javascript">
					//reload page
					window.open(location.reload(true));
				</script>
				<?php
			}
			
			//update option
        	update_option('w2p_plugin_option', $plugin_option); 			
	}
?>
