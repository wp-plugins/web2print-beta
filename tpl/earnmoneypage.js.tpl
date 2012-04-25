dgoCurrentPage 			= 'earnMoney';
dgoGuidAffi				= '{guid}';
dgoGuid 		    	= '{guid}';
var shopDiscount 		= new Array();
var affiliate_level  	= new Array();	             
var globalCurrencyToken = '{currency}';
var articleGroupArr 	= new Array();
var articleGroupId		= new Array();
var articleProfit;
var globalResaleUnit;
var dgoArticleGroup 	= null;
var dgoAllDiscounts 	= null;
var dgoDefaultPercentage = 0;
var currentShop			= null;
var dgoCurrencyForShop 	= null;

//variables for chart
var AffiliateSales 			= null;
var AffiliateSalesAfterSort = null;
var ArrOrdersDateArticle 	= null; //contain order days and numbers of sales / day
var ArrOrdersDate 			= null; // contain order days,
var ArrLabelChart 			= null;
var maxValue = 1;
var chartPeriodOptions		= null;

//array use to show chart
var newArrayAffiliateSales 	= null;
//array use to show label
var newArrayLabel  			= null;
//new array orders date
var newArrOrdersDate		= null;

if(dgoGuid != ""){
	articleGroupHandle({availableArticle});
	affiliate_GetReSaleUnit_handle({resaleUnits}, null, {affiliateSalesStatistic}, {profitArray});		
}

