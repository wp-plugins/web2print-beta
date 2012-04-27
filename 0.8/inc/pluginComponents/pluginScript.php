<script type="text/javascript">        
		//global currency and language
		var globalCurrency = "VND";
		var globalLanguage = "EN";
	
        //View info
        var infoNameArray = new Array();
        var infoDesArray = new Array();
        
        //the dimension
        var heightArray = new Array();
        var widthArray = new Array();
        var heightArrayView = new Array();
        var widthArrayView = new Array();
        
        //pictures link array
        var picturesArr = new Array();
        var stt_begin = new Array();
        var lastAlbumSelected = 'none';       
        
        function webToPrintWidgetLoad(){         
            ////if admin choose one production type
            /*if(jQuery('#dgo-type-sel').val() == ''){
                var productionType = jQuery('#dgo-type-sel').html(); 
            }else{
                var productionType = jQuery("#dgo-type-sel").val();
            }
            
            switch(productionType){
                case 'Visit Cards': {
                    jQuery('#buttonMultiUpload').css({display: 'block'});
                    jQuery('#buttonSimpleUpload').css({display: 'none'});
                    createMutiUploader();
                    break;                    
                }
                case 'Posters': {         
                    jQuery('#buttonMultiUpload').css({display: 'none'});
                    jQuery('#buttonSimpleUpload').css({display: 'block'});
                    break;
                }
            }*/     
                
            //get country
            apiCountryGet('address');           
        
            //call function get material from api                   
            w2pMaterialGet();                          
        }                      
</script>