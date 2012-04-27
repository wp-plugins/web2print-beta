var addressContainer = '<div id="address-book-container"><div id="address-search-sort"><div id="address-search">';
addressContainer += '<input type="text" id="searchValue" name="searchValue" class="search"><div id="searchButton" class="is-bottons"><span>Search</span></div>';
addressContainer += '</div><div id="address-sort"><select id="sortValue"><option value="first-name">First Name</option><option value="last-name">Last Name</option>';
addressContainer += '<option value="company">Company</option><option value="city">City</option></select></div></div><hr><div class="import"><?php echo $btnImportGoogle;?><?php echo $btnImportLinkedin;?><input type="button" id="newAddress" value="Add New Address" class="newAddress"></div><hr>';
addressContainer += '<div id="header-field"><div class="img-field">&nbsp;</div><div class="name-field">Name</div><div class="address-field">Address</div><div class="contact-field">Contact</div><div class="button-field">&nbsp;</div></div>';
addressContainer += '<div id="all-contact-field"></div>';
addressContainer += '<div class="import"><?php echo $btnImportGoogle;?><?php echo $btnImportLinkedin;?><input type="button" id="newAddress" class="newAddress" value="Add New Address"></div><hr></div>';

//append to address book page
jQuery('.address-book-container').empty();
jQuery('.address-book-container').append(addressContainer);
//countriesGet();