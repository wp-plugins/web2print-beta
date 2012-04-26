<?php
/*
 * @author Peter
 */

function rewriteUrl(){
	require_once('translation.class.php');	
	//get product details page ID
	$productdetailsPageID 		= get_option('productdetailsPageID');
	$designDetailsPageID 		= get_option('designDetailsPageID');
	//get product details link
	$arrPro						= get_permalink($productdetailsPageID);
	//get Design details link
	$arrDesignDetails			= get_permalink($designDetailsPageID);
	
	//get new array from these links
	$arrPro						= explode("/",$arrPro);
	$arrDesignDetails			= explode("/",$arrDesignDetails);
		
	$translation 				= new Web_2_print_Translation('web2print');	
	
	//add new rule for rewrite url. e.g: photo_cug#cup-1999-0_40x40mm-1_Run
    add_rewrite_rule($translation->translate('Keyword_products').'_(.*)$', 'index.php?pagename='.$arrPro[count($arrPro)-1],'top');
    //add new rule for rewrite url. e.g: design_cuu_deo_kinh_1737_388#ly_su_in_hinh_doc_dao-0_190x80mm-1_Run-Pic_387
    add_rewrite_rule('design_(.*)$', 'index.php?pagename='.$arrDesignDetails[count($arrDesignDetails)-1],'top');
	add_rewrite_rule('register$', 'index.php','top');
   	add_rewrite_rule('login$', 'index.php','top');
    
    //Remove rewrite rules and then recreate rewrite rules.
    flush_rewrite_rules(false);
}