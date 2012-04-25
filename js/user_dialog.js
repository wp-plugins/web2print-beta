//User Dialog
jQuery(document).ready(function(){	
	// Login dialog
    jQuery(function() {
        jQuery( "#dgo-user-board" ).dialog({
            title: 'User Infomation<div class="ex-close-button"></div>',
            autoOpen: false,                            
            height: 200,
            width: 600,
            dialogClass: "dgo-dialog-class dgo-user-board",
            modal: true,   
            closeOnEscape: false,                                                
            resizable: false
        });                   
    });
});

//function show user dialog
function ShowUserDialog( dialog_title, dialog_icon, dialog_content, dialog_button){
	var window_width = jQuery(window).width();
	var window_height = jQuery(window).height();
	
	var dialog_width = 600;
	var dialog_height = 150;
	
	var dialog_left = (window_width - dialog_width) / 2;
	var dialog_top = (window_height - dialog_height) / 2;
	
	jQuery('.dgo-user-dialog').css({top: dialog_top});
	jQuery('.dgo-user-dialog').css({left: dialog_left});
	
	//jQuery('.dgo-user-title-text').html(dialog_title);
	jQuery('#dgo-user-icon').addClass(dialog_icon);
	jQuery('#dgo-user-text').html(dialog_content);
	jQuery('#dgo-user-button').html(dialog_button);
	
	jQuery('.dgo-user-dialog-over').show();
}
