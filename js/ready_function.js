/*This file is using for ready functions when website is loaded*/
jQuery(document).ready(function(){
/*Dialog box's functions
*----------------------------------------------*/
	//call ready public event
	ready_public_event();

	//call login event
	ready_login_event();
	
	//call upload event
	ready_upload_event();

	//call activation page event
	ready_activation_event();

	/*Check current page*/
	if(dgoCurrentPage == 'addressBook'){
		//call user addressbook event
		ready_user_addressbook_event();
	}else
	
	if(dgoCurrentPage == 'accountDetails'){
		//call user accountdetails event
		ready_user_accountdetail_event();
	}else	
	
	if(dgoCurrentPage == 'shoppingCart'){
		//call shopcart event
		ready_shopcart_event();
	}else
	
	if(dgoCurrentPage == 'earnMoney'){
		//call earnMoney event
		ready_earnMoney_event();
	}else
	
	if(dgoCurrentPage == 'productDetails'){
		//call product details event
		ready_productDetails_event();
	}
	
	if(dgoCurrentPage == 'MotiveDesigns'){
		//call motive designs event
		ready_motiveDesigns_event();
	}
	
	if(dgoCurrentPage == 'designDetails'){
		//call design Details event
		ready_designDetails_event();
	}
	
	if(dgoCurrentPage == 'myMotives'){
		//call design Details event
		ready_myMotives_event();
	}
	
	if(dgoCurrentPage == 'allOrders'){
		//call design Details event
		ready_allOrders_event();
	}
	
	jQuery('.dimension-hide-dropdown').hover(function(){
		jQuery('.dimension-hide-dropdown').show();
	},
	function(){
		jQuery('.dimension-hide-dropdown').hide();
	}
	)

	
/*---------------------------------------------*/	    
});

