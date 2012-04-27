<div class="dgo-dialog-form-cover">
    <div class="addnewaddressForm">
    	<input class="translate-title" type="hidden" value="<?php _e('AddNewAddress', $l10n_prefix); ?>"/>
    	<form id="formIDAddress" method="post" action="">
			<div class="add-new-address-content">
				<div class="address-info-row add-info-name">
					<div class="address-label"><span><b><?php _e('Name', $l10n_prefix); ?>:</b></span></div>
					<div class="address-input address-name-last ">
						<div><input type="text" name="lastname" id="surname" /><div class="address-check"></div></div>
					</div>	
					<div class="address-input address-name-first ">
						<div style="display:none">
							<input type="text" name="name" id="testname" /><div class="address-check"></div>
						</div>
						<div>
							<input type="text" name="firstname" id="forename"/><div class="address-check"></div>
						</div>
					</div>
					<div style="display:none">
						<input type="text" name="name" id="forename" /><div class="address-check"></div>
					</div>
					<div class="address-name-content">
						<div class="gender-div">
							<select class="GenderSel" id="sexual">
								<option class='sexual' name='male' value='Male' selected='selected'><?php _e('Mr', $l10n_prefix); ?></option>
								<option class='sexual' name="female" value='Female'><?php _e('Mrs', $l10n_prefix); ?></option>
								<option class='sexual' name='neutral' value='Neutral'><?php _e('Neutral', $l10n_prefix); ?></option>
							</select>
						</div>
					</div>
				</div>				
				<div class="address-info-row add-info-company"><div class="address-label"><span><?php _e('Company', $l10n_prefix); ?>:</span></div><div class="address-input "><div><input type="text" value="" name="company" id="company"/></div></div></div>
				<div class="address-info-row add-info-street"><div class="address-label"><span><b><?php _e('Street', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-street "><div><input type="text" value="" name="street" id="street"/><div class="address-check"></div></div></div></div>				
				<div class="address-info-row add-info-city"><div class="address-label"><span><b><?php _e('City', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-city "><div><input type="text" value="" name="city" id="city"/><div class="address-check"></div></div></div></div>				
				<div class="address-info-row add-info-zip"><div class="address-label"><span><b><?php _e('Zip', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-zip "><div><input type="text" value="" name="zipcode" id="zipcode"/><div class="address-check"></div></div></div></div>
				<div class="address-info-row add-info-country"><div class="address-label"><span><b><?php _e('Country', $l10n_prefix); ?>:</b></span></div><div class="address-input "><div><div class="add-info-country country-dropdown-dialog"></div><div class="add-info-country-dropdown" style="display:none"><input type="hidden" class="add-info-country-dropdown-selected" value=""></div></div></div></div>
				<div class="address-info-row add-info-phone"><div class="address-label"><span><?php _e('Phone', $l10n_prefix); ?>:</span></div><div class="address-input address-name-phone "><div><input type="text" value="" name="phone" id="phone"/><div class="address-check"></div></div></div></div>				
				<div class="address-info-row add-info-email"><div class="address-label"><span><b><?php _e('Email', $l10n_prefix); ?>:</b></span></div><div class="address-input address-name-email "><div><input type="text" name="email" value="" id="email"/><div class="address-check" id='email-exist-status'></div></div></div></div>				
				<div class="address-info-row add-info-offers"><input type="checkbox" value=""/> <span><?php _e('SendMeOffer', $l10n_prefix); ?></span></div>
				<div class="address-info-row add-info-note"><div class="address-label address-label-note"><span><?php _e('Note', $l10n_prefix); ?>:</span></div><div class="textarea-div address-name-note"><textarea name="addInfoNote" id="addressNote" name="note" ></textarea></div></div><br>
				<div class="address-info-row add-info-note-message" style="display:none"><div class="address-label"><span>&nbsp;</span></div><div class="address-note-content-message"></div></div>
				<div class="addressFooter is-bottons" id="BtnDone"><span><?php _e('Save', $l10n_prefix); ?></span></div>
            </div>    
		</form>
    </div>

	<div id="import-contacting">
		<div id="import-contacting-header">
			<div class="dgo-text"><?php _e('PlsSelectYourShippingAdd', $l10n_prefix); ?></div>
			<div class="import-contact-search">
				<span>
					<a href="javascript: void(0)" onclick="showAll()"><?php _e('ShowAll', $l10n_prefix); ?></a>
				</span>
				<span>
					<input type="text" id="import-contacting-txt" name="import-contacting-txt">				
					<div class="is-bottons" id="import-contacting-search"/><?php _e('Search', $l10n_prefix); ?></div>
				</span>			
			</div>
		</div>
		<div id="import-contacting-content">
			<?php
				if(isset($_SESSION['contact'])){
				 
					foreach($_SESSION['contact'] as $key=>$value)
					{
						if($key!="Id"){
			?>
			<div class="import-contact-item" id="<?php echo 'import-contact-item-'.$key;?>" onclick="importGoogleDirect(<?php echo $key;?>)">
				<div class="import-contact-item-header"><?php _e('SelectThisAdd', $l10n_prefix); ?></div>
				<div class="import-contact-item-content">
					<?php _e('Name', $l10n_prefix); ?>: <span class="import-contact-item-name"><?php echo $value->name;?></span><br>
					<?php _e('Address', $l10n_prefix); ?>: <span class="import-contact-item-street"><?php echo $value->posAddress;?></span><br>
					<?php _e('Email', $l10n_prefix); ?>: <span class="import-contact-item-email"><?php echo $value->emailAddress[0];?></span>
					<?php _e('Phone', $l10n_prefix); ?>: <span class="import-contact-item-phone"><?php echo $value->phoneNumber;?></span>
				</div>
				<div class="dgo-tick-import" id="<?php echo "tick-".$key;?>">
					<img src="<?php echo linkToPlugin?>/css/img/tick.png" width="20" height="20">
					<input class="hidden" type="checkbox" name="check[]" id="<?php echo "check-".$key;?>" value="-1">
					
				</div>			
			</div>
			<?php 
						}
					}
				}else{
					echo "'"._e('LoginFirst', $l10n_prefix)."!'";
				}
			?>		
		</div>
		<div class="import-contacting-footer">
			<div class="import-contact-search">
				<span>
					<a href="javascript: void(0)" onclick="selectAll(<?php echo count($_SESSION['contact']);?>)"><?php _e('SelectAll', $l10n_prefix); ?></a> | <a href="javascript: void(0)" onclick="none(<?php echo count($_SESSION['contact']);?>)"><?php _e('None', $l10n_prefix); ?></a>
					<input type="button" class='import-from' id="import-contacting-now" name="import-contacting-now" value="<?php _e('ImportNow', $l10n_prefix); ?>" />
				</span>
			</div>
		</div>
	</div>

<div id="import-contacting-linkedin">
	<div id="import-contacting-linkedin-header">
		<div class="dgo-text"><?php _e('PlsSelectYourShippingAdd', $l10n_prefix); ?></div>
		<div class="import-contact-search">
			<span>
				<a href="javascript: void(0)" onclick="showAllLinkedin()"><?php _e('ShowAll', $l10n_prefix); ?></a>
			</span>
			<span>
				<input type="text" id="import-contacting-linkedin-txt" name="import-contacting-linkedin-txt" />
				<div class="is-bottons" id="import-contacting-linkedin-search"/><?php _e('Search', $l10n_prefix); ?></div>
			</span>			
		</div>
	</div>
	<div id="import-contacting-linkedin-content">
		<?php
			if(isset($_SESSION['linkedin'])){
			 	
				foreach($_SESSION['linkedin'] as $key=>$value)
				{
		?>
		<div class="import-contact-linkedin-item" id="<?php echo "import-contact-linkedin-item-".$key;?>" onclick="importLinkedinDirect(<?php echo $key;?>)">
			<div class="import-contact-linkedin-item-header"><?php _e('SelectThisAdd', $l10n_prefix); ?></div>
			<div class="import-contact-linkedin-item-content">
				<?php _e('FirstName', $l10n_prefix); ?>: <span class="import-contact-linkedin-item-first-name"><?php echo $value['first-name'];?></span><br>
				<?php _e('LastName', $l10n_prefix); ?>: <span class="import-contact-linkedin-item-last-name"><?php echo $value['last-name'];?></span><br>
				<?php _e('Street', $l10n_prefix); ?>: <span class="import-contact-linkedin-item-street"><?php echo $value['main-address'];?></span><br>
				<?php _e('City', $l10n_prefix); ?>: <span class="import-contact-linkedin-item-city"><?php echo $value['city'];?></span><br>
				<?php _e('Country', $l10n_prefix); ?>: <span class="import-contact-linkedin-item-country"><?php echo strtoupper($value['country']);?></span><br>
				<?php _e('Email', $l10n_prefix); ?>: <span class="import-contact-linkedin-item-email"></span><br>
				<?php _e('Phone', $l10n_prefix); ?>: <span class="import-contact-linkedin-item-phone"><?php echo $value['phone-number'];?></span>
			</div>
			<div class="dgo-tick-import-linkedin" id="<?php echo "tick-linkedin-".$key;?>">
				<img src="<?php echo linkToPlugin?>/css/img/tick.png" width="20" height="20">
				<input class="hidden" type="checkbox" name="check-linkedin[]" id="<?php echo "check-linkedin-".$key;?>" value="-1">
				<input class="hidden" type="hidden" id="<?php echo "picture-".$key;?>" value="<?php echo $value['picture-url'];?>">
			</div>			
		</div>
		<?php 
				}
			}else{
				echo "'"._e('LoginFirst', $l10n_prefix)."!'";
			}
		?>		
	</div>
	<div class="import-contacting-footer">
		<div class="import-contact-search">
			<span>
				<a href="javascript: void(0)" onclick="selectAllLinkedin(<?php echo count($_SESSION['linkedin']);?>)"><?php _e('SelectAll', $l10n_prefix); ?></a> | <a href="javascript: void(0)" onclick="noneLinkedin(<?php echo count($_SESSION['linkedin']);?>)"><?php _e('None', $l10n_prefix); ?></a>
				<input type="button" class='import-from' id="import-contacting-linkedin-now" name="import-contacting-linkedin-now" value="<?php _e('ImportNow', $l10n_prefix); ?>" />
			</span>
		</div>
	</div>
</div>