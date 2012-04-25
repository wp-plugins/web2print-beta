<?php 
	/*
	 * Web 2 Print API Connection ENUM
	 * -------------------------------
	 * 
	 * @author slierka
	 * 
	 * last changed: 07/19/2011
	 * 
	 * */

	//enum to evaluate if the api
	//should calculate or place an order
	class DgoEnumApiCallMode {
		const CALCULATE = "Calculate";
		const ORDER = "Order";
	}
	
	class DgoEnumApiGetCallMode {
		const ARTICLEGROUPS = "ArticleGroups";
	}
	//enum for article types
	class DgoEnumArticleIdentifier {
		const DYNCUP = "A_DYN_CUP";
	}
	
	//enum for material types
	class DgoEnumMaterial {
		const WHITEPORCELAIN = "CUP_PORCELAIN_WHITE";
		const COLOREDPORCELAIN = "CUP_PORCELAIN_COLOURED";
	}
?>