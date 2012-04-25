jQuery(document).ready(function(){
    jQuery('.border-album-photos').hover(
        function(){ 
            if(jQuery(this).children().children('.check-input').val() != 'selected'){
                jQuery(this).css({background: '#ffa020'}) 
            }
        },
        function(){
            if(jQuery(this).children().children('.check-input').val() != 'selected'){
                jQuery(this).css({background: 'none'});    
            }             
        }    
    ); 
    
    jQuery('.border-album-photos').click(        
        function(){
            var url_img = jQuery(this).children().children('img').attr('src');
            var pos = jQuery(this).children().children('.pos-input').val();
            var albumID = jQuery(this).children().children('img').attr('alt');
            
            if(jQuery(this).children().children('.check-input').val() != 'selected'){ 
                //selected
                jQuery(this).children().children('.check-input').val('selected');                
                save_selected_picture(url_img, pos);
                
                jQuery(this).css({background: 'green'});
                var count = 'more';
                
                //ajax to set
                ajaxSelected(pos, 'selected', albumID);
            }else{
                //no selected
                jQuery(this).children().children('.check-input').val(''); 
                away_selected_picture(pos);
                
                jQuery(this).css({background: 'none'});
                var count = 'less';
                
                //ajax to unset
                ajaxSelected(pos, '', albumID);    
            }
             
            ivnGetSetValue(count);
        });   
});

//=====================================================================
window.ivnGetSetValue = function(count){
    remote_form = parent.document.forms["count-form"];
    
    if(count == 'more'){
        remote_form.data.value = parseInt(remote_form.data.value) + 1;    
    }else{
        remote_form.data.value = parseInt(remote_form.data.value) - 1; 
    }
}

window.ivnSetNumberPictures = function(number){
    remote_form = parent.document.forms["detail-album-form"];
    
    remote_form.data.value = number;
}

//======================================================================
//choose selected pictures
function save_selected_picture(url_img, pos){
    var input_temp = '<input type="hidden" value="' + url_img + '" name="save_piture[]" class="save_picture' + pos + '"/>';
    jQuery('#selected-form').append(input_temp);    
}

//away saving selected pictures
function away_selected_picture(pos){
    var input_temp = '.save_picture' + pos;
    jQuery(input_temp).remove(); 
}

//=======================================================================
//Using ajax to save pictures selected to session
function ajaxSelected(id, status, albumID){
    jQuery.ajax({
        url: 'ajaxselected.php',
        type: 'POST',
        data: 'id=' + id + '&status=' + status + '&albumID=' + albumID,                            
        success: function(result){
            //console.log(result);
        },
        error: function (){
            console.log('error!');
        }
    });        
}

//=========================================================================
//count pictures in album
function countAlbumPictures(){
    var pictures = 0;
    jQuery('.photo-page-border').find('.border-album-photos').each(function(){
        pictures++;    
    });

    ivnSetNumberPictures(pictures);
}

//=========================================================================
//pictures selected setting
function pictureSelectedSet(){
    jQuery('.photo-page-border').find('.check-input').each(function(){
        if(jQuery(this).val() == 'selected'){
            jQuery(this).parent().parent('.border-album-photos').css({background: 'green'});
            var url_img = jQuery(this).prev('img').attr('src');
            var pos = jQuery(this).next('.pos-input').val();
            save_selected_picture(url_img, pos);
        }
    });    
}
