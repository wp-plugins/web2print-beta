/*This file using for admin script*/
/*Ready function*/
//function to use multi onload
    function addLoadEvent(func) { 
      var oldonload = window.onload; 
      if (typeof window.onload != 'function') { 
        window.onload = func; 
      } else { 
        window.onload = function() { 
          if (oldonload) { 
            oldonload(); 
          } 
          func(); 
        } 
      } 
    }
    
function tooltipEvent(){
    //Make the tooltip
    jQuery(".tooltips").hover(
        function() { jQuery(this).contents(".tooltip").css({ display: "block" }); },
        function() { jQuery(this).contents(".tooltip").css({ display: "none" }); }
    );
    jQuery(".tooltips").mousemove(function(e) {
        var mousex = e.pageX + 10;
        var mousey = e.pageY + 5;
        jQuery(this).contents("span:last-child").css({  top: mousey, left: mousex });
    });
}
/*Other functions*/
/*Get the country from api*/
function adminAPIGet(){
    apiCountryGet('adminIn', codeIndex);
    apiCurrencyGet('adminIn', nameIndex);
    apiDimensionSet('adminIn', 'mm');
    apiProductSet('adminIn', 2);
}

function adminOutAPIGet(){
    apiCountryGet('adminOut', codeIndex);
    apiCurrencyGet('adminOut', nameIndex);
    apiDimensionSet('adminOut','mm');
    apiProductSet('adminOut', 2);
}

function apiDimensionSet(callWhere, dim){
    if(callWhere == 'adminIn'){
        var className = '.dim-sel';        
    }else if(callWhere == 'adminOut'){
        var className = '.out-dim-sel';
    }
    
    if(dim == 'inch'){
        jQuery(className).empty();
        jQuery(className).append('<option selected value="in">inch</option><option value="mm">mm</option>');
    }else{
        jQuery(className).empty();
        jQuery(className).append('<option value="in">inch</option><option selected value="mm">mm</option>');
    }    
}

function apiProductSet(callWhere, proTypeValue){
    if(callWhere == 'adminIn'){
        var productOption = '<option value="1">Stamps</option><option value="2">Visit Cards</option><option value="3">Letters</option><option value="4">Posters</option>';
        jQuery('.product-sel').empty();
        jQuery('.product-sel').append(productOption);
        
        jQuery('.product-sel').children(' option[value = ' + proTypeValue + ']').attr('selected', 'selected');    
    }else{
        var productOption = '<option value="1">Stamps</option><option value="2">Visit Cards</option><option value="3">Letters</option><option value="4">Posters</option>';
        jQuery('.product-sel-widget').empty();
        jQuery('.product-sel-widget').append(productOption);
        
        jQuery('.product-sel-widget').children(' option[value = ' + proTypeValue + ']').attr('selected', 'selected');
    }
}
/*------------------------------------*/

/*administrator page functions*/
//function reset input
function inputDivReset( parent ){
	jQuery('.' + parent + ' .inputDiv').css({background: 'none'});
	jQuery('.' + parent + ' .inputDiv').css({borderColor: '#CDCDCD'});
	jQuery('.' + parent + ' .checkImg').removeClass('checkImgFalse');	
	jQuery('.' + parent + ' .checkImg').removeClass('checkImgTrue');
	jQuery('.' + parent + ' input').val('');
}

//function hide affiliate login
function affiliateLoginHide(){
	//show the configure dialog
	jQuery('.general-content-none').css({display: 'none'});
	jQuery('.add-new-button').css({display: 'none'});
	jQuery('.logout-button').css({display: 'block'});
	jQuery('.general-content').css({display: 'block'});
	jQuery('.footer-contact').css({display: 'block'});
	//provisionFormShow();
}

//function show configure dialog
function adminConfigShow(){
    jQuery('.adminConfigForm').dialog('open');
    jQuery('.adminConfigForm').dialog({ position: 'center' });
}

function provisionFormShow(){
    jQuery('.provisionForm').dialog('open');
    jQuery('.provisionForm').dialog({ position: 'center' });
}

//function asking for which shop P user chooses
function askShopChosen(shopDiscount){
	//shop div
	var shopDiv = '';
	
	for(var i = 0; i < shopDiscount.length; i++){
		shopDiv += '<div class="shop-div-chosen">';
		shopDiv += '<div class="shop-div-name"><span>' + shopDiscount[i].shopName + '</span></div>';
		shopDiv += '<div class="shop-div-des"><span>' + shopDiscount[i].shopDes + '</span></div>';
		shopDiv += '<input class="shop-div-id" type="hidden" value="' + shopDiscount[i].shopID + '"></div>';
	}
	
	jQuery('.shop-div-chosen').remove();
	jQuery('.asking-shop-content').append(shopDiv);
	jQuery('.askingShopForm').dialog('open');
	jQuery('.askingShopForm').dialog({ position: 'center' });
	
	//shop div chosen click
	jQuery('.shop-div-chosen').click(function(){
		var shopID = jQuery(this).children('.shop-div-id').val();
		
		//go to chosen shop
		jQuery('.askingShopForm').dialog('close');
		jQuery('.provisionForm').dialog('open');
		jQuery('.provisionForm').dialog({ position: 'center' });
		
		//change the shop
		jQuery('.affiliate-select').val(shopID);
		provisionShopChange(shopID);
	});
}

//function get active product
function productActiveGet( shopID ){
	var listChosen = ' ';
	
	for(var i = 0; i < shopDiscount.length; i++){
    	if(shopDiscount[i].shopID == shopID){
    		for(var j = 0; j < shopDiscount[i].Product.length; j++){
    			if(shopDiscount[i].Product[j].groupActive == true){
    				//get to list of chosen
    				listChosen += articleGroupArr[shopDiscount[i].Product[j].groupID] + ', ';
    			}
    		}
    	}
    }
    
    jQuery('.select-products').append(listChosen);
}

// provisions shops change
function provisionShopChange( shopID ){
	//article group html
	var articleGroup = '';
	
	//shop currency
	var shopCurrency = '';
	    
    //article profit array includes products in one shop
    articleProfit = new Array();
    
    for(var i = 0; i < shopDiscount.length; i++){		
		if(shopDiscount[i].shopID == shopID){
			//show end user price format
			var EndUserPriceFormat = (shopDiscount[i].EndUserPrice == "Net") ? "<option value='Net' selected='selected'>Price Net</option><option value='Gross'>Price Gross</option>" : "<option value='Net'>Price Net</option><option value='Gross' selected='selected'>Price Gross</option>";
			
			jQuery('.EndUserPriceFormat').html(EndUserPriceFormat);
			
		    for(var j = 0;j < dgoArticleGroup.length;j++){
		    	var n = 0;
		    	while(n <= dgoContacting.Discount.DiscountEntry.length-1){		    		
		    		if(dgoContacting.Discount.DiscountEntry[n].IdArticleGroup == dgoArticleGroup[j].Id){		    			
				    	var count = 0;	
				    	if(shopDiscount[i].Product.length > 0){
				    		while(count < shopDiscount[i].Product.length){
					    		
					    		if(shopDiscount[i].Product[count].groupID == dgoArticleGroup[j].Id){		    			
									break;
					    		}else if(count == shopDiscount[i].Product.length-1){
					    			var percentage = dgoDefaultPercentage;			    			
					    			for(var x = 0;x < dgoAllDiscounts.length; x++){
					    				if(dgoAllDiscounts[x].IdArticleGroup == dgoArticleGroup[j].Id){
					    					if(dgoAllDiscounts[x].Percentage != null){
					    						percentage = dgoAllDiscounts[x].Percentage;
					    					}
					    				}
					    			}
					    			
					    			articleGroup += '<div class="product-groups' + dgoArticleGroup[j].Id + ' product-groups even-groups"><span>';
									articleGroup += articleGroupArr[dgoArticleGroup[j].Id] + '</span><span style="float:right;padding-right:5px">('+ percentage +'%)</span><input class="min-percent-for-product" type="hidden" value="' + percentage + '" /><input class="apiIDHidden" type="hidden" value="' + dgoArticleGroup[j].Id + '" /></div>';
					    		}
					    		count++;
					    	}
				    	}else{
				    		if(dgoAllDiscounts != null){
					    		var percentage = dgoDefaultPercentage;
				    			for(var x = 0;x < dgoAllDiscounts.length; x++){
				    				if(dgoAllDiscounts[x].IdArticleGroup == dgoArticleGroup[j].Id){				    					
				    					if(dgoAllDiscounts[x].Percentage != null){
				    						percentage = dgoAllDiscounts[x].Percentage;
				    					}
				    				}
				    			}
					    		articleGroup += '<div class="product-groups' + dgoArticleGroup[j].Id + ' product-groups even-groups"><span>';
								articleGroup += articleGroupArr[dgoArticleGroup[j].Id] + '</span><span style="float:right;padding-right:5px">('+ percentage +'%)</span><input class="min-percent-for-product" type="hidden" value="' + percentage + '" /><input class="apiIDHidden" type="hidden" value="' + dgoArticleGroup[j].Id + '" /></div>';
				    		}else{
				    			for(var i = 0;i < dgoContacting.Discount.DiscountEntry.length;i++){
				    				for(var j in dgoArticleGroup){
				    					if(dgoContacting.Discount.DiscountEntry[i].IdArticleGroup == dgoArticleGroup[j].Id){
				    						articleGroup += '<div class="product-groups' + dgoArticleGroup[j].Id + ' product-groups even-groups"><span>';
											articleGroup += articleGroupArr[dgoArticleGroup[j].Id] + '</span><span style="float:right;padding-right:5px">('+ dgoDefaultPercentage +'%)</span><input class="min-percent-for-product" type="hidden" value="' + dgoDefaultPercentage + '" /><input class="apiIDHidden" type="hidden" value="' + dgoArticleGroup[j].Id + '" /></div>';
				    					}
				    				}
				    			}
				    		}
				    	}
				    	//----------------------------------------------------------------------------
				    	
		    		}
		    		n++;
		    	}
		    }
		}
    }

    //fill to product groups container + fill to article Array
	for(var i = 0; i < shopDiscount.length; i++){
		
		if(shopDiscount[i].shopID == shopID){
			for(var j = 0; j < shopDiscount[i].Product.length; j++){
				
				//fill to article Array
				//change the create and modify time
				var created = shopDiscount[i].Product[j].groupCreated.ParseRfcDate();
				var group_created = created.format("dd.mm.yyyy - hh:MM:ss");
				var group_created_sort = created.format("dd.mm.yyyy - hh:MM:ss");
				
				var group_modified = '';
				var group_modified_sort = '';
				if(shopDiscount[i].Product[j].groupModified != ""){
					var modified = shopDiscount[i].Product[j].groupModified.ParseRfcDate();
                    group_modified = modified.format("dd.mm.yyyy - hh:MM:ss");
                    group_modified_sort = modified.format("dd.mm.yyyy - hh:MM:ss");
				}
				
				articleProfit[shopDiscount[i].Product[j].groupID] = new Array();
				articleProfit[shopDiscount[i].Product[j].groupID]['active'] = shopDiscount[i].Product[j].groupActive;
				articleProfit[shopDiscount[i].Product[j].groupID]['amount'] = shopDiscount[i].Product[j].groupAmount;
				articleProfit[shopDiscount[i].Product[j].groupID]['percent'] = shopDiscount[i].Product[j].groupPercent;
				articleProfit[shopDiscount[i].Product[j].groupID]['currency'] = shopDiscount[i].currency;
				articleProfit[shopDiscount[i].Product[j].groupID]['name'] = shopDiscount[i].Product[j].groupName;
				shopCurrency = shopDiscount[i].currency;
				articleProfit[shopDiscount[i].Product[j].groupID]['minPercent'] = shopDiscount[i].Product[j].groupMinPercent;
				articleProfit[shopDiscount[i].Product[j].groupID]['created'] = group_created;
				articleProfit[shopDiscount[i].Product[j].groupID]['createdHidden'] = group_created_sort;
				articleProfit[shopDiscount[i].Product[j].groupID]['createdSave'] = shopDiscount[i].Product[j].groupCreated;
				articleProfit[shopDiscount[i].Product[j].groupID]['creator'] = shopDiscount[i].Product[j].groupCreator;
				articleProfit[shopDiscount[i].Product[j].groupID]['modified'] = group_modified;
				articleProfit[shopDiscount[i].Product[j].groupID]['modifiedHidden'] = group_modified_sort;
				articleProfit[shopDiscount[i].Product[j].groupID]['profitID'] = shopDiscount[i].Product[j].profitID;
				articleProfit[shopDiscount[i].Product[j].groupID]['discountID'] = shopDiscount[i].Product[j].discountID;
				articleProfit[shopDiscount[i].Product[j].groupID]['resaleID'] = shopDiscount[i].Product[j].resaleID;
				articleProfit[shopDiscount[i].Product[j].groupID]['groupID'] = shopDiscount[i].Product[j].groupID;
			}
			
			//change shop description
			jQuery('#shop-description').html(shopDiscount[i].shopName + ' & ' + shopDiscount[i].shopDes);
			
			//change hidden input
			jQuery('.resale-guid').val(shopDiscount[i].shopGuid);			
			
			//event for statistic tab
			jQuery('.navigator-statistic').click(function(){
		    	window.open(homeUrl+'/earn-money/#earn-money-tabs-3','_blank');
		    });

		}
	}
	
	//add active group
	jQuery('.product-group-content').empty();
    jQuery('.product-group-content').append(articleGroup);    
    
    //product group click
    jQuery('.product-groups').click(function(){
    	//remove selected product in existing product box
    	jQuery('.grid-content-row').removeClass('grid-content-row-selected');
    	
    	//add selected class
        jQuery('.product-groups').removeClass('product-groups-selected');
        jQuery(this).addClass('product-groups-selected');
        var idGroup = jQuery(this).children('.apiIDHidden').val();
        
        //change the calculation label
        jQuery('.provision-calculate-choose span:nth-child(2)').html(jQuery(this).children('span').html());
        
      //set min percent
        sliderBarMinPosSet(percentStartCal(jQuery(this).children('.min-percent-for-product').val()));
        
        //change amount and percentage                                 
        sliderBarPosSet( parseFloat(0) , percentStartCal(jQuery(this).children('.min-percent-for-product').val()));
        
        
        //change button text to 'Add now'
        jQuery('.warning-footer-button span').html(jQuery('#trans-add-now').val());
		
		//widget overview
       	if(article_group_arr == null){
			w2pArticleGet(idGroup);
		}else{
			widgetOverviewShow(article_group_arr, idGroup);
		}
    }); 
    
    for(var i = 0;i < articleProfit.length; i++){
    	if(articleProfit[i] != undefined){
    		//clear all grid 
    		resetState(shopCurrency, i);
    		break;
    	}
    }
    
    //select active product groups
    var gridCount = 0;
    
    
    
    for(var i = 0; i < shopDiscount.length; i++){
    	if(shopDiscount[i].shopID == shopID){
    		for(var j = 0; j < shopDiscount[i].Product.length; j++){    			
    			
				gotoGrid('add', 'server', shopDiscount[i].Product[j].groupActive, shopDiscount[i].Product[j].groupID);    				
				
				//increase count
				gridCount++;
    			
    		}
    	}
    }
    
  //event deactive or active in existing product
    jQuery('.grid-product-active').click(function(){
        if(jQuery(this).children('.input-article-status').val() == "true"){
        	gridRowDeactive(jQuery(this).children('.id-group-hidden').val());
        }else{
        	gridRowActive(jQuery(this).children('.id-group-hidden').val());
        }
    });
    
    //if have product group in grid, select the first grid
    if(gridCount > 0){
    	jQuery('.content-grid-content .grid-content-row:first-child').click();
    
    //else click first product group
    }else{
    	jQuery('.product-group-content .product-groups:first-child').click();	
    }
    
    //unblock ui
    jQuery.unblockUI();
}

// function reset state
function resetState( shopCurrency, idGroup ){    
	//clear all grids
	jQuery('.grid-content-row').remove();
    
	//change to the right currency
    adminCurChange( shopCurrency , idGroup );
    
    jQuery('.currency-select').val( shopCurrency );
    
    //Change all of value to 0
    //add selected class    
    //change the calculation label
    jQuery('.provision-calculate-choose span:nth-child(2)').html('');

    //set the min percentage
    sliderBarMinPosSet(0);
    
    //change amount and percentage                                 
    sliderBarPosSet( 0 , 0 );
    
    //change to addnow label
    jQuery('.warning-footer-button span').html(jQuery('#trans-add-now').val());
}

// function currency change
function adminCurChange(currency, idGroup){    
    globalCurrencyToken = currency;

    if(currency == 'EUR')
    {
    	currency = 'Euro';
    }
    
    jQuery('.provision-currency').html(currency);
    //jQuery('.provision-merchant').val(formatCurrency(articleGroupArr[globalCurrencyToken][0], globalCurrencyToken));
           
    var value1 = jQuery( ".provision-slider" ).slider( "option", "value" );
    var value2 = jQuery( ".percentage-slider" ).slider( "option", "value" );
    
    var xValue = value2;
    
    if(idGroup != undefined){
    	if(Math.round(value2) == Math.round(percentStartCal(articleProfit[idGroup]['minPercent']))){
	        xValue = value2;
	    }else{
	        xValue = Math.round(value2);
	    }	    
	    
	    jQuery('.provision-amount-hidden').val(articleGroupArr[globalCurrencyToken][1] + value1 * articleGroupArr[globalCurrencyToken][2]);
	    jQuery('.provision-amount').html(formatCurrency(articleGroupArr[globalCurrencyToken][1] + value1 * articleGroupArr[globalCurrencyToken][2], globalCurrencyToken));
	    jQuery('.provision-percent-hidden').val(xValue);
	    jQuery('.provision-percent').html(formatCurrency( xValue, 'EUR'));
	    jQuery('.provision-calculate-percent .provision-price-element').html(formatCurrency(xValue * articleGroupArr[globalCurrencyToken][0]/100, globalCurrencyToken));	    
	    jQuery('.your-profit').html(formatCurrency(articleGroupArr[globalCurrencyToken][1] + value1 * articleGroupArr[globalCurrencyToken][2] + value2 * articleGroupArr[globalCurrencyToken][0]/100, globalCurrencyToken));
    }
    
	//widget overview
    if(article_group_arr != null){
    	if(idGroup != undefined){
	    	widgetOverviewShow(article_group_arr, idGroup);
	    }else{
	    	if(jQuery('.product-groups-selected').html() != null){
	    		var idGroup = jQuery('.product-groups-selected .apiIDHidden').val();
	    		widgetOverviewShow(article_group_arr, idGroup);
	    	}else if(jQuery('.grid-content-row-selected').html() != null){
	    		var idGroup = jQuery('.grid-content-row-selected .id-group-hidden').val();
	    		widgetOverviewShow(article_group_arr, idGroup);
	    	}
	    }	
    }
}

//function get product group to grid row
function gotoGrid(action, from, status, idGroup){
		
	//get product group name
	var product_group = articleProfit[idGroup]['name'];
	
	//get product group amount
	var provision_absolute = '<span class="provision-absolute-row">' + formatCurrency(articleProfit[idGroup]['amount'], globalCurrencyToken) + '</span>' + ' ' + '<span class="grid-provision-currency">' + globalCurrencyToken + '</span>';
    var provision_absolute_hidden = articleProfit[idGroup]['amount'];
    
    //get product group percent
    var provision_relative = formatCurrency(articleProfit[idGroup]['percent'],'EUR') + ' %';
    var provision_relative_hidden = articleProfit[idGroup]['percent'];
    
    //get product group created time
    var product_created = articleProfit[idGroup]['created'];
    var product_created_hidden = articleProfit[idGroup]['createdHidden'];
    
    //get product group modified time
    if(from == 'client'){
    	var now = new Date;
	    var last_change = now.format("dd.mm.yyyy - hh:MM:ss");
	    var last_change_hidden = now.FormatRfcDate(true);
    }else if(from == 'server'){
    	var last_change = articleProfit[idGroup]['modified'];
	    var last_change_hidden = articleProfit[idGroup]['modifiedHidden'];
    }else{
    	console.log('Wrong parameters on gotoGrid() furntion!');
    }
    
    //change array which includes amount and percentage
    var id_discount = articleProfit[idGroup]['groupID'];
    
    var xValue = 0;
    var sliderValue = jQuery( ".percentage-slider" ).slider( "option", "value" );
    if(Math.round(sliderValue) == Math.round(percentStartCal(articleProfit[id_discount]['minPercent']))){
               xValue = sliderValue;
    }else{
        xValue = Math.round(sliderValue);
    }
        
    //if action is add or save
    if(action == 'add'){
    	var id_group_row = "grid-content-row" + idGroup;
    	
        var grid_row = '';
        
        if(status == true){
        	grid_row += '<div onclick="gridRowEdit(' + idGroup + ')" class="grid-content-row ' + id_group_row + '"><div class="grid-product-active"><input class="id-group-hidden" type="hidden" value="' + idGroup + '"/><input type="hidden" value="true" class="input-article-status"><div class="grid-product-active-box"><img src="'+web_2_print_blogInfo+'css/img/icon/tick.png"></div></div><div class="grid-product-group">' + product_group + '</div><div class="grid-provision-absolute">' + provision_absolute + '<input type="hidden" value="' + provision_absolute_hidden + '" /></div>';
        }else{
        	grid_row += '<div onclick="gridRowEdit(' + idGroup + ')" class="grid-content-row ' + id_group_row + ' grid-product-deactive"><div class="grid-product-active"><input class="id-group-hidden" type="hidden" value="' + idGroup + '"/><input type="hidden" value="false" class="input-article-status"><div class="grid-product-active-box"></div></div><div class="grid-product-group">' + product_group + '</div><div class="grid-provision-absolute">' + provision_absolute + '<input type="hidden" value="' + provision_absolute_hidden + '" /></div>';
        }
        
        grid_row += '<div class="grid-provision-relative"><input type="hidden" value="' + provision_relative_hidden + '" />' + provision_relative + '</div><div class="grid-created"><input type="hidden" value="' + product_created_hidden + '" />' + product_created + '</div><div class="grid-last-change"><input type="hidden" value="' + last_change_hidden + '" />' + last_change + '</div><div onclick="gridRowDelete(' + articleProfit[idGroup]['profitID'] + ')" class="grid-delete-icon" title="Delete this row"></div></div>';
        
        jQuery('.content-grid-content').append(grid_row);        
        
        jQuery('.warning-footer-button span').html(jQuery('#trans-save-now').val());
    }else if(action == 'save'){
    	var id_group_row = ".grid-content-row" + idGroup;
            
        jQuery(id_group_row).children('.grid-provision-absolute').children('.provision-absolute-row').html(formatCurrency(jQuery('.provision-amount-hidden').val(), globalCurrencyToken));
        jQuery(id_group_row).children('.grid-provision-absolute').children('.grid-provision-currency').html(globalCurrencyToken);
        jQuery(id_group_row).children('.grid-provision-relative').html(provision_relative);
        jQuery(id_group_row).children('.grid-last-change').html(last_change);
    }else{
    	console.log('Wrong parameters on gotoGrid() furntion!');
    }
     
    
    
    //product group hidden
    var product_group_hidden = ".product-groups" + idGroup;
    jQuery(product_group_hidden).css({display: "none"});
}

// function set slider bar
function sliderBarPosSet(amount, percentage){
    //=================== amount first
    //change min of amount
    jQuery( ".provision-slider" ).slider( "option", "value", amount );
    
    //change color of progress bar for warning 
    if(amount < 50){
        jQuery('.provision-slider-process').css({background: '#48B43A'});
    }else if(amount < 80){
        jQuery('.provision-slider-process').css({background: '#F3C650'});
    }else{
        jQuery('.provision-slider-process').css({background: '#CA262F'});
    }
    
    //change process
    var processAmount = amount;
    jQuery('.provision-slider-process').width( processAmount + '%');
    
    //change amount
    jQuery('.provision-amount-hidden').val(articleGroupArr[globalCurrencyToken][1] + amount * articleGroupArr[globalCurrencyToken][2]);
    jQuery('.provision-amount').html(formatCurrency(articleGroupArr[globalCurrencyToken][1] + amount * articleGroupArr[globalCurrencyToken][2], globalCurrencyToken));    
    
    //=================== percentage
    //change min of percentage
    jQuery( ".percentage-slider" ).slider( "option", "value", percentage );
    
    //change process
    var processPercentage = percentage;
    jQuery('.percentage-slider-process').width( processPercentage + '%');
    
    //change color of progress bar for warning 
    if(percentage < 50){
        jQuery('.percentage-slider-process').css({background: '#48B43A'});
    }else if(percentage < 80){
        jQuery('.percentage-slider-process').css({background: '#F3C650'});
    }else{
        jQuery('.percentage-slider-process').css({background: '#CA262F'});
    }
    
    //change percentage
    jQuery('.provision-percent-hidden').val( percentage );
    jQuery('.provision-percent').html(formatCurrency( percentage, 'EUR' ));
    jQuery('.provision-calculate-percent .provision-price-element').html(formatCurrency(percentage * articleGroupArr[globalCurrencyToken][0]/100, globalCurrencyToken));    
    jQuery('.your-profit').html(formatCurrency( articleGroupArr[globalCurrencyToken][1] + amount * articleGroupArr[globalCurrencyToken][2] + percentage * articleGroupArr[globalCurrencyToken][0]/100, globalCurrencyToken));
}

// function set slider bar
function sliderBarMinPosSet(percentage){ 
    //=================== percentage
    //change min of percentage
    jQuery( ".percentage-slider" ).slider( "option", "min", percentage );
    
    //change margin left of slider
    if(percentage > 90){
        var marginPercentage = percentage - 5;    
    }else{
        var marginPercentage = percentage + 4;        
    }

    marginPercentage = marginPercentage + '%';
    jQuery('.percentage-slider').css({marginLeft: marginPercentage})
    
    //change process
    var processPercentage = percentage;
    jQuery('.percentage-slider-process').width( processPercentage + '%');
}

//fumction calculate percentate
function percentStartCal(percentDiscount){    
    var merchant = parseFloat(jQuery('.provision-merchant').val());
    
    var ourPrice = merchant - percentDiscount * merchant / 100;
    
    var percentStart = (merchant / ourPrice - 1)  * 100;
    
    return percentStart;
}

function percentReCal(percent){
    var merchant = parseFloat(jQuery('.provision-merchant').val());
    
    var ourPrice = merchant / (percent + 100) * 100;
    
    var percentReCal = (merchant - ourPrice) / merchant * 100;
    
    return percentReCal;
}

//Function for datagrid
function gridRowEdit(idGroup){
	
	//remove selected product in available product 
	jQuery('.product-groups').removeClass('product-groups-selected');
	
	//change button text to 'save now'
    jQuery('.warning-footer-button span').html(jQuery('#trans-save-now').val());
	
    //change the calculation label
    jQuery('.provision-calculate-choose span:nth-child(2)').html(articleProfit[idGroup]['name']);
    
    //row grid edit click 
    var id_grid_row = '.grid-content-row' + idGroup;
    jQuery('.grid-content-row').removeClass('grid-content-row-selected');
    jQuery(id_grid_row).addClass('grid-content-row-selected');
    
    //change currency
    var currency = jQuery(id_grid_row).children('.grid-provision-absolute').children('.grid-provision-currency').html();
    
    //set the min percentage
    sliderBarMinPosSet(percentStartCal(articleProfit[idGroup]['minPercent']));
    
    var amount = articleProfit[idGroup]['amount'];
    
    amount = amount / articleGroupArr[globalCurrencyToken][2];
    
    //change amount and percentage                                 
    sliderBarPosSet( amount , articleProfit[idGroup]['percent'] );
    
    if(currency != null){
        adminCurChange(currency, idGroup);
        jQuery('.maintain-title-right .currency-select').val(currency);
    }      
    
	//widget overview
    if(article_group_arr == null){
    	w2pArticleGet(idGroup);
    }else{
    	widgetOverviewShow(article_group_arr, idGroup);
    }
}

function gridRowActive(idGroup){
	//block ui
	jQuery.blockUI(0);
	
    //ok delete this row
    var id_grid_row = '.grid-content-row' + idGroup;
    jQuery(id_grid_row).removeClass('grid-product-deactive');         
    jQuery(id_grid_row + ' .grid-product-active-box').html('<img src="'+web_2_print_blogInfo+'css/img/icon/tick.png">');         
    jQuery(id_grid_row + ' .input-article-status').val("true");         
    
    //save to array and object
    articleProfit[idGroup]['active'] = true;
    var currentShop = jQuery('.affiliate-select').val();
    for(var i = 0; i < shopDiscount.length; i++){
    	if(shopDiscount[i].shopID == currentShop){
    		for(var j = 0; j < shopDiscount[i].Product.length; j++){
    			if(shopDiscount[i].Product[j].groupID == idGroup){
    				shopDiscount[i].Product[j].groupActive = articleProfit[idGroup]['active'];	    				
    			}
    		}
    	}
    }   
    var dataString = "option=resetCache";
	jQuery.ajax({
	   type: "GET",
	   url: web_2_print_blogInfo + "inc/ajax/unsetSession.php",
	   data: dataString,
	   success: function(data){
		   //save to api	    
		    articleProfitUpdate(articleProfit[idGroup], true);
	   }							 
	});   
}

function gridRowDeactive(idGroup){
	//block ui
	jQuery.blockUI(0);	
	
    //ok delete this row
    var id_grid_row = '.grid-content-row' + idGroup;
    jQuery(id_grid_row).addClass('grid-product-deactive');         
    jQuery(id_grid_row + ' .grid-product-active-box').html('');         
    jQuery(id_grid_row + ' .input-article-status').val("false");         
    
    //save to array and object
    articleProfit[idGroup]['active'] = false;
    var currentShop = jQuery('.affiliate-select').val();
    for(var i = 0; i < shopDiscount.length; i++){
    	if(shopDiscount[i].shopID == currentShop){
    		for(var j = 0; j < shopDiscount[i].Product.length; j++){
    			if(shopDiscount[i].Product[j].groupID == idGroup){
    				shopDiscount[i].Product[j].groupActive = articleProfit[idGroup]['active'];	    				
    			}
    		}
    	}
    }
    var dataString = "option=resetCache";
	jQuery.ajax({
	   type: "GET",
	   url: web_2_print_blogInfo + "inc/ajax/unsetSession.php",
	   data: dataString,
	   success: function(data){
		   //save to api	    
		    articleProfitUpdate(articleProfit[idGroup], false);
	   }							 
	}); 
}

function gridRowDelete(idDiscountProfit){	
	
	//delete grid row 
    if(confirm('Are you sure want to delete this row?')){                
    	//block ui
    	jQuery.blockUI(0);
    	
    	var dataString = "option=resetCache";
    	jQuery.ajax({
    	   type: "GET",
    	   url: web_2_print_blogInfo + "inc/ajax/unsetSession.php",
    	   data: dataString,
    	   success: function(data){
    		 //delete discount profit	    
    	     articleProfitDelete(idDiscountProfit);
    	   }							 
    	});
    	
    }    
}

function gridRowSort(type){
    var productGroup = [];
    var productGroupID = [];
    var flag = 0;
    
    switch(type){
        case "product":
            jQuery('.content-grid-content').find('.grid-product-group').each(function(){
                var product_name_id = jQuery(this).html() + jQuery(this).parent().find('.id-group-hidden').val();
                productGroup.push(product_name_id);
                productGroupID[product_name_id] = jQuery(this).parent().find('.id-group-hidden').val();
            });
            
            //identify flag
            flag = jQuery('.grid-title .grid-product-group input').val();
            break;
        case "absolute":
            jQuery('.content-grid-content').find('.grid-provision-absolute').each(function(){
                var product_name_id = jQuery(this).children('input').val() + jQuery(this).parent().find('.id-group-hidden').val();
                productGroup.push(product_name_id);
                productGroupID[product_name_id] = jQuery(this).parent().find('.id-group-hidden').val();
            });
            
            //identify flag
            flag = jQuery('.grid-title .grid-provision-absolute input').val();
            break;
        case "relative":
            jQuery('.content-grid-content').find('.grid-provision-relative').each(function(){
                var product_name_id = jQuery(this).children('input').val() + jQuery(this).parent().find('.id-group-hidden').val();
                productGroup.push(product_name_id);
                productGroupID[product_name_id] = jQuery(this).parent().find('.id-group-hidden').val();
            });
            
            //identify flag
            flag = jQuery('.grid-title .grid-provision-relative input').val();
            break;
        case "created":
            jQuery('.content-grid-content').find('.grid-created').each(function(){
                var product_name_id = jQuery(this).children('input').val() + jQuery(this).parent().find('.id-group-hidden').val();
                productGroup.push(product_name_id);
                productGroupID[product_name_id] = jQuery(this).parent().find('.id-group-hidden').val();
            });
            
            //identify flag
            flag = jQuery('.grid-title .grid-created input').val();
            break;
        case "modified":
            jQuery('.content-grid-content').find('.grid-last-change').each(function(){
                var product_name_id = jQuery(this).children('input').val() + jQuery(this).parent().find('.id-group-hidden').val();
                productGroup.push(product_name_id);
                productGroupID[product_name_id] = jQuery(this).parent().find('.id-group-hidden').val();
            });
            
            //identify flag
            flag = jQuery('.grid-title .grid-last-change input').val();
            break;            
    }
    
    //sort productGroup
    if(flag == 0){
        //sort ascending
        if(type == "absolute"){
        	productGroup.sort(compare);
        }else{
        	productGroup.sort();
        }
                
        flag = 1;   
    }else{
        //sort descending
        if(type == "absolute"){
        	productGroup.sort(compare);
        }else{
        	productGroup.sort();
        }   
        productGroup.reverse();
        flag = 0;
    }
    
    //return flag to input
    switch(type){
        case "product":
            jQuery('.grid-title .grid-product-group input').val(flag);
            break;
        case "absolute":
            jQuery('.grid-title .grid-provision-absolute input').val(flag);
            break;
        case "relative":
            jQuery('.grid-title .grid-provision-relative input').val(flag);
            break;
        case "created":
            jQuery('.grid-title .grid-created input').val(flag);
            break;
        case "modified":
            jQuery('.grid-title .grid-last-change input').val(flag);
            break;
    }  

    //begin to sort
    var grid_row_id = '';
    var idGroup = '';
    for(var i = 0; i < productGroup.length; i++){
        //get row
        idGroup = productGroupID[productGroup[i]]; 
        grid_row_id = '.grid-content-row' + idGroup;
        
        //sort
        jQuery(grid_row_id).appendTo('.content-grid-content');
    }
}

//=================Themes page==================//
function themeColorSet(colorArr){
	for(var i = 1; i < colorArr.length + 1; i++){
		var hexboxID = '#hexbox' + i;
		var colorBox = '#color-box' + i;
		jQuery(hexboxID).val(colorArr[i - 1]);
		jQuery(colorBox).css('backgroundColor', '#' + colorArr[i - 1]);
	}
	
	//change widget colors
	//theme-login
	jQuery('.theme-login').css('color', '#' + colorArr[0]);
	
	//main-background
	jQuery('.order-product-main').css('backgroundColor', '#' + colorArr[1]);
	
	//prices text color
	jQuery('.order-product-content').css('color', '#' + colorArr[2]);
	jQuery('.color-box-info-text1').children('span').css('color', '#'+ colorArr[2]);
	jQuery('.color-box-info-text2').children('span').css('color', '#'+ colorArr[2]);
	
	//button text color
	jQuery('.order-product-title').css('color','#'+colorArr[9]);
	jQuery('.uploadOrderDiv').css('color', '#' + colorArr[3]);
	
	//header & showtest header gradient background
	jQuery('.order-product-title').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + colorArr[4] + '), to(#'+colorArr[10]+'))');
	jQuery('.order-product-title').css('background', '-moz-linear-gradient(top,  #' + colorArr[4] + ',  #' + colorArr[10] + ')');
	jQuery('.order-product-title').css('-ms-filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=#' + colorArr[4] + ', endColorstr=#'+ colorArr[10]+')');
	jQuery('.order-product-title').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + colorArr[4] +  '), to(#'+ colorArr[10] +'))');
	jQuery('.order-product-title').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + colorArr[4] +  '\', EndColorStr=\''+'#'+ colorArr[10] +'\')');
	jQuery('.show-head-gra').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + colorArr[4] + '), to(#'+colorArr[10]+'))');
	jQuery('.show-head-gra').css('background', '-moz-linear-gradient(top,  #' + colorArr[4] + ',  #' + colorArr[10] + ')');
	jQuery('.show-head-gra').css('-ms-filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=#' + colorArr[4] + ', endColorstr=#'+ colorArr[10]+')');
	jQuery('.show-head-gra').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + colorArr[4] +  '), to(#'+ colorArr[10] +'))');
	jQuery('.show-head-gra').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + colorArr[4] +  '\', EndColorStr=\''+'#'+ colorArr[10] +'\')');
	//border outline
	jQuery('.order-product-main-container').css('borderColor', '#' + colorArr[5]);
	jQuery('.order-product-title').css('borderColor', '#' + colorArr[5]);
	jQuery('.order-product-header').css('borderColor', '#' + colorArr[5]);
	
	//price hover color
	jQuery('.order-product-subcontent .order-product-content-child:nth-child(2)').css('backgroundColor', '#' + colorArr[6]);
	
	//button background
	jQuery('#buttonMultiUpload').css('background', '-moz-linear-gradient(top,  #' + colorArr[7] + ',  #' + colorArr[11] + ')');
	jQuery('#buttonMultiUpload').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + colorArr[7] + '), to(#'+ colorArr[11]+'))');
	jQuery('#buttonMultiUpload').css('-ms-filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=#' + colorArr[7] + ', endColorstr=#'+ colorArr[11]+')');
	jQuery('#buttonMultiUpload').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + colorArr[7] +  '), to(#'+ colorArr[11] +'))');
	jQuery('#buttonMultiUpload').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + colorArr[7] +  '\', EndColorStr=\''+'#'+ colorArr[11] +'\')');
	jQuery('.gradient-show').css('background', '-moz-linear-gradient(top,  #' + colorArr[7] + ',  #' + colorArr[11] + ')');
	jQuery('.gradient-show').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + colorArr[7] + '), to(#'+ colorArr[11]+'))');
	jQuery('.gradient-show').css('-ms-filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=#' + colorArr[7] + ', endColorstr=#'+ colorArr[11]+')');
	jQuery('.gradient-show').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + colorArr[7] +  '), to(#'+ colorArr[11] +'))');
	jQuery('.gradient-show').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + colorArr[7] +  '\', EndColorStr=\''+'#'+ colorArr[11] +'\')');
	
	//background gradient
	jQuery('.order-product-main').css('background', '-moz-linear-gradient(top,  #' + colorArr[1] + ',  #' + colorArr[12] + ')');
	jQuery('.order-product-main').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + colorArr[1] + '), to(#'+ colorArr[12]+'))');
	jQuery('.order-product-main').css('-ms-filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=#' + colorArr[1] + ', endColorstr=#'+ colorArr[12]+')');
	jQuery('.order-product-main').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + colorArr[1] +  '), to(#'+ colorArr[12] +'))');
	jQuery('.order-product-main').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + colorArr[1] +  '\', EndColorStr=\''+'#'+ colorArr[12] +'\')');
	jQuery('.show-bg-gra').css('background', '-moz-linear-gradient(top,  #' + colorArr[1] + ',  #' + colorArr[12] + ')');
	jQuery('.show-bg-gra').css('background', '-webkit-gradient(linear, left top, left bottom, from(#' + colorArr[1] + '), to(#'+ colorArr[12]+'))');
	jQuery('.show-bg-gra').css('-ms-filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=#' + colorArr[1] + ', endColorstr=#'+ colorArr[12]+')');
	jQuery('.show-bg-gra').css('background', '-ms-linear-gradient(linear, left top, left bottom, from(#' + colorArr[1] +  '), to(#'+ colorArr[12] +'))');
	jQuery('.show-bg-gra').css('filter','progid:DXImageTransform.Microsoft.gradient(startColorStr=\''+'#' + colorArr[1] +  '\', EndColorStr=\''+'#'+ colorArr[12] +'\')');
	//buttom text color
	jQuery('#buttonMultiUpload').css('color', '#' + colorArr[3]);
	//buttom outline
	jQuery('.bt-uploader-container').css('borderColor','#'+ colorArr[8]);
	
		
}

//change radius corner
function radiusSet(){
	var r = jQuery('.radius-setting-input input').val();
		jQuery('.order-product-main-container').css('-moz-border-radius', r + 'px');
		jQuery('.order-product-main-container').css('border-radius', r + 'px');
		jQuery('.order-product-main-container').css('behavior','url(/PIE.htc)');
		jQuery('.order-product-main-container').css('-webkit-border-radius',r + 'px');
		jQuery('.order-product-main').css('-moz-border-radius', r + 'px');
		jQuery('.order-product-main').css('border-radius', r + 'px');
		jQuery('.order-product-main').css('behavior','url(/PIE.htc)');
		jQuery('.order-product-main').css('-webkit-border-radius',r + 'px');
		jQuery('.order-product-title').css('-moz-border-radius',+r+'px '+r+'px +0px +0px');
		jQuery('.order-product-title').css('border-radius',+r+'px '+r+'px +0px +0px');
		jQuery('.order-product-title').css('-webkit-border-radius',+r+'px '+r+'px +0px +0px');
		jQuery('.order-product-title').css('behavior','url(/PIE.htc)');

		
		jQuery('.bt-uploader-container').css('border-radius',r + 'px');
		jQuery('.bt-uploader-container').css('behavior','url(/PIE.htc)');
		jQuery('#buttonMultiUpload').css({'-moz-border-radius': r + 'px'});
		jQuery('#buttonMultiUpload').css('border-radius',r + 'px');
		jQuery('#buttonMultiUpload').css('-webkit-border-radius',r + 'px');
		jQuery('#buttonMultiUpload').css('behavior','url(/PIE.htc)');
		jQuery( ".radius-slider" ).slider( "option", "value", r );
		jQuery('.radius-slider-process').width(r*2+'%');
	
}
//change shadow text-bottom
function shadowSet(){
	var s = jQuery('.txt-shadow-input input').val();
		if(s>=11){
		alert('please chose text-shadow value less than 10');
		jQuery('.txt-shadow-input input').val(0);
		s=0;
		jQuery('#buttonMultiUpload').css('text-shadow','none');
		}else{
			if(s==0){
			jQuery('#buttonMultiUpload').css('text-shadow','none');
		}else{
			jQuery('#buttonMultiUpload').css('text-shadow','1px '+s+'px 1px #ffffff');
			jQuery('#buttonMultiUpload').css('text-shadow','#ffffff'+'1px '+s+'px 1px');
		}
	}

		jQuery( ".shadow-slider" ).slider( "option", "value", s );
		jQuery('.shadow-slider-process').width(s*33+'%');
}

//change shadow text header
function shadowheaderSet(){
	var s = jQuery('.txt-header-shadow-input input').val();
		if(s>=11){
		alert('please chose text-shadow value less than 10');
		jQuery('.txt-header-shadow-input input').val(0);
		s=0;
		jQuery('#editme5').css('text-shadow','none');
		}else{
			if(s==0){
			jQuery('#editme5').css('text-shadow','none');
		}else{
			jQuery('#editme5').css('text-shadow','1px '+s+'px 1px #ffffff');
			jQuery('#editme5 span').css('text-shadow','#ffffff'+'1px '+s+'px 1px');
			jQuery('.bt-uploader').children('span').css('filter','progid:DXImageTransform.Microsoft.Shadow(color=#0000FF,direction=45)');

		}
	}

		jQuery( ".shadow-header-slider" ).slider( "option", "value", s );
		jQuery('.shadow-header-slider-process').width(s*33+'%');
}
function textareachange(){
	jQuery('#set_headertext').val(jQuery('#editme5').html());
	jQuery('#colorsForm').submit();
}
function openWindow(typeName, option){
	if(option == 'loginProvider'){
		var top = (screen.height / 2) - 200;
		var left = (screen.width / 2) - 400;
		var url = web_2_print_blogInfo + 'inc/openid/openid.php?type=' + typeName + '&mode=redirect';
		var config = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=800, height=400, top=' + top + ', left=' + left;
		window.open(url,'Authentication',config);
		return false;
	}

}

//show the overview of the widget
function widgetOverviewShow(arr, idGroup){	
	var articleGroupName = null;
	
	for(var i = 0; i < dgoArticleGroup.length; i++){
		if(dgoArticleGroup[i].Id == idGroup){
			articleGroupName = dgoArticleGroup[i].Token;
			break;
		}
	}
	
	//fill Subtypes
	if(article_group_arr[articleGroupName] != undefined){		
		var articleItems = article_group_arr[articleGroupName].Items;		
	}else if(article_group_arr['CRYSTAL'] != undefined){
		var articleItems = article_group_arr['CRYSTAL'].Items;
	}
	
	if(articleItems != undefined){
		var subtypeOptions = '';
		
		if(articleItems[0] != undefined){
			for(var i = 0;i < articleItems.length; i++){
				var size_i = articleItems[i].PageLengthOpen * articleItems[i].PageWidthOpen;
					size_i = articleItems[i].PageDepthOpen == null ? size_i : size_i * articleItems[i].PageDepthOpen;
				for(var j = i+1;j < articleItems.length;j++){
					var size_j = articleItems[j].PageLengthOpen * articleItems[j].PageWidthOpen;
						size_j = articleItems[j].PageDepthOpen == null ? size_j : size_j * articleItems[j].PageDepthOpen;
						if(size_j < size_i){
							var tmp = {};
							tmp = articleItems[j];
							articleItems[j] = articleItems[i];
							articleItems[i] = tmp; 
						}
				}
			}
			
			for(var j = 0; j < articleItems.length; j++){
				subtypeOptions += '<option value="' + articleItems[j].Identifier + '__' + articleItems[j].Matchcode + '">' + articleItems[j].Name + '</option>';
			}
		}else{			
			for(var k = 0; k < articleItems[articleGroupName].length; k++){				
				subtypeOptions += '<option value="' + articleItems[articleGroupName][k].Identifier + '__' + articleItems[articleGroupName][k].Matchcode + '">' + articleItems[articleGroupName][k].Name + '</option>';
			}
		}
		
		jQuery('select#subtypes').empty().append(subtypeOptions);
		subTypeChange();
	}
}

//function subtype onchange
function subTypeChange(){
	var subTypeVal = jQuery('select#subtypes').val();
	var subTypeVal = subTypeVal.split('__');

	var matchCode = subTypeVal[1];
	var identifier = subTypeVal[0];
	
	w2pMaterialGet( matchCode, identifier, function(result){
		
		defaultMaxArea = result.Order.Article[0].MaxAreaToCalculate;
		defaultMinArea = result.Order.Article[0].MinAreaToCalculate;
		
		//fill materials box
		var materialOptions = '';
		var materials = result.Order.Article[0].Materials;
		for(var i = 0; i < materials.length; i++){
			materialOptions += '<option value="' + identifier + '__' + matchCode + '__' + materials[i].Key + '">' + materials[i].Name + '</option>';
		}
		
		jQuery('select#materials').empty().append(materialOptions);
		
		//material change
		materialChange();
	} );
}

//function material change
function materialChange(){
	var materialVal = jQuery('select#materials').val().split('__');
	var matchCode = materialVal[1];
	var identifier = materialVal[0];
	var material = materialVal[2];
	
	jQuery('#sale-prices').html('<div style="text-align:center;margin-top:20px"><img src="'+web_2_print_blogInfo+'css/img/icon/loading.gif"><br>'+jQuery('#trans-loading').val()+'...</div>');
	
	//get formats
	w2pFormatsGet(matchCode, function(result){
		
		var api = new delivergo.api();
		
		//save to object
    	if(result.Value == undefined){
    		result.Value = result.value.Value;
    	}
		
    	var formats_object = new Array();
    	
		for(var i = 0; i < result.Value.length; i++){
    		var children = result.Value[i];
 		
	    		var forWidth 	= children.Width;
		    	var forHeight 	= children.Height;
		    	var forDepth	= null;
		    	
		    	if(matchCode.split('/').length > 2){
		    		var forName 	=  matchCode.split('/')[2] + ' (' + children.Name + ')';
		    		var forInchName =  matchCode.split('/')[2] + ' (' + api.ConvertMm2Inch(forWidth) + ' x ' + api.ConvertMm2Inch(forHeight) + ' inch' + ')';
		    	}else{
		    		var forName 	=  children.Name;
		    		
		    		var forInchName =  forName.replace(forWidth,api.ConvertMm2Inch(forWidth))
		    								  .replace(forHeight,api.ConvertMm2Inch(forHeight))
		    								  .replace("mm","inch");
		    		
		    	}

				if(children.Depth != null){
	    			forDepth = children.Depth;
	    			if(matchCode.split('/').length > 2){
	    				forInchName = matchCode.split('/')[2] + ' (' + api.ConvertMm2Inch(forWidth) + ' x ' + api.ConvertMm2Inch(forHeight) + ' x ' + api.ConvertMm2Inch(forDepth) +' inch' + ')';
	    			}else{
	    				forInchName =  forInchName.replace(forDepth,api.ConvertMm2Inch(forDepth));
	    			}
	    			
	    			formats_object.push({forwidth: forWidth, forheight: forHeight, forname: forName, forinchname: forInchName, fordepth: forDepth});
	    		}else{
	    			var forArea = children.Area;
	    			//forArea < defaultMinArea || 
		    		if(forArea > defaultMaxArea){
		    			//do nothing
		    		}else{
		    			formats_object.push({forwidth: forWidth, forheight: forHeight, forname: forName, forinchname: forInchName, fordepth: forDepth});
		    		}  
	    		}
  		
    	}
		
		w2pPriceGet(matchCode, identifier, material, formats_object, function(result){
			article_group_price = result.Order.Article;
			
			//show overview prices
			priceOverviewShow();
		});
	});
}

//function show prices
function priceOverviewShow(amount, percent){
	//price overviews
	var priceOverviews = '';
	
	var EndUserPrice = jQuery('.EndUserPriceFormat').val();
	
	var api = new delivergo.api(); 
	
	for(var i = 0; i < article_group_price.length; i++){
		//calculate price || affiliate
		var article_prices = article_group_price[i].Prices.Items;
		var article_price = 0;
		var article_currency = article_prices[0].Currency;
		
		var sale_object = [];
		var article_price_array = [];
		for(var j = 0; j < article_prices.length; j++){	
			var type_split = article_prices[j].Type.split("|");
			
			if(type_split[0] != 'Shipment'){
				//article_price += article_prices[j].SaleNet;
				sale_object.push(article_prices[j]);
			}	
						
		}
		
		article_price_array = api.CalculateGrossPrice(sale_object);
		
		article_price = (EndUserPrice == "Net") ? article_price_array[0].SaleNetSum : article_price_array[0].SaleGrossSum;
		
		if(amount == undefined){
			var article_price_show = formatCurrency( article_price , article_currency) + ' ' + article_currency;		
			if(article_group_price[i].PageDepthOpen != null){
				var formatSpan = article_group_price[i].PageWidthOpen + 'x' + article_group_price[i].PageLengthOpen + 'x' + article_group_price[i].PageDepthOpen + ' mm';
			}else{
				var formatSpan = article_group_price[i].PageWidthOpen + 'x' + article_group_price[i].PageLengthOpen + ' mm';
			}
		
		
			var priceOverview = '<div class="sale-price"><div class="sale-price-dimension"><input class="input-radio" type="radio" value="" name="radio-dimension"><span>' + formatSpan + '</span></div><div class="content-price"><span>' + article_price_show + '</span></div><input type="hidden" class="input-price" value="' + article_price + '"/><input type="hidden" class="overview-price" value="' + article_price + '"/></div>';
			priceOverviews += priceOverview;
		}else{
			article_price = article_price + amount + articleGroupArr[globalCurrencyToken][0]*percent/100;
			var article_price_show = formatCurrency( article_price , article_currency) + ' ' + article_currency;
			var _i = i + 1;
			jQuery('DIV.sale-price:nth-child(' + _i + ')').children('.content-price').children('span').html(article_price_show);
			jQuery('DIV.sale-price:nth-child(' + _i + ')').children('.overview-price').val(article_price);
			jQuery('input.provision-merchant').val(formatCurrency(jQuery('.sale-price-selected').children('.overview-price').val(), globalCurrencyToken));
		}
	}
	
	if(amount == undefined){
		jQuery('DIV#sale-prices').empty().append(priceOverviews);
		jQuery('DIV.sale-price').click(function(){
			jQuery(this).children().children('.input-radio').attr('checked', 'checked');
			jQuery('DIV.sale-price').css('background', 'none');
			jQuery(this).css('background', '#FFC400');
			
			jQuery('DIV.sale-price').removeClass('sale-price-selected');
			jQuery(this).addClass('sale-price-selected');
			
			if(jQuery('.product-groups-selected .apiIDHidden').val() != undefined){
	    		//get product group id
	            var idGroup = jQuery('.product-groups-selected .apiIDHidden').val();
	            var percent = dgoDefaultPercentage;
	
	    	}else if(jQuery('.grid-content-row-selected .id-group-hidden').val() != undefined){
	    		//get product group id
	            var idGroup = jQuery('.grid-content-row-selected .id-group-hidden').val();
	            var percent = articleProfit[idGroup]['minPercent'];
	    	}
	    	
			articleGroupArr[globalCurrencyToken][0] = parseFloat(jQuery(this).children('.input-price').val());			
			articleGroupArr[globalCurrencyToken][0] = articleGroupArr[globalCurrencyToken][0] - articleGroupArr[globalCurrencyToken][0]*percent/100;
			jQuery('input.provision-merchant').val(formatCurrency( jQuery(this).children('.overview-price').val() , globalCurrencyToken));			
			
			jQuery('.provision-calculate-percent .provision-price-element').html(formatCurrency(parseFloat(jQuery('.provision-percent-hidden').val())*articleGroupArr[globalCurrencyToken][0]/100, globalCurrencyToken));
			jQuery('.your-profit').html(formatCurrency(parseFloat(jQuery('.provision-amount-hidden').val()) + parseFloat(jQuery('.provision-percent-hidden').val())*articleGroupArr[globalCurrencyToken][0]/100, globalCurrencyToken));
		});	
		
		jQuery('DIV.sale-price:first-child').click();
	}
}