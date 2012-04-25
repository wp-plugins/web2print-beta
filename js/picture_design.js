//design
//flag to know rotate image or not 
var rotflag=0;
//create pan zoom 

function createzoom(imagewidth,min,max,imgselector,bwidth,bheight,iw,ih){

var zoomper=100;
 jQuery( ".zoom" ).slider({
                value: 0,
                min: min,
                max: max,
                
                change: function(event, ui) {
                 if(parseFloat(iw)/parseFloat(ih)<1.6){
                 jQuery(imgselector).animate({
					
                    width:ui.value+imagewidth+'px'
					})
					zoomper=(ui.value+imagewidth)*100/(imagewidth);
                  }				  
					else
					{
					  jQuery(imgselector).animate({
					height:ui.value+bheight+'px'
					});
					zoomper=(bheight+ui.value)*100/(bheight);
					
					}
				  setTimeout(function(){
				  var a=zoomcheckborder(jQuery(imgselector).css('top'), jQuery(imgselector).css('left'), jQuery(imgselector).height(),jQuery(imgselector).width(),bwidth,bheight);
				 
				  jQuery(imgselector).animate({
					
					  //  width:ui.value
						top:a['top'],
						left:a['left']
						});
			  //   jQuery('.infozoom').html(jQuery('.imagebefore').find('img').width()+'x'+ jQuery('.imagebefore').find('img').height() +':'+ui.value+'a'+a['top']+'b'+jQuery('.imagebefore').find('img').css('top'))
				},20);
				
				
				jQuery('.zoominfo').html('Zoom : '+ parseInt(zoomper)+' %');
         }
        
    });
    jQuery(imgselector).draggable(
    {
         drag: function(event, ui) { 
            
          //  jQuery('.info').html(ui.position.left+' x '+ui.position.top)
            
         },
        stop: function(event, ui) {
            var x=jQuery(imgselector).height();
            var y = jQuery(imgselector).width();
           var k= checkBorder(ui,x,y,bheight,bwidth );
            jQuery(imgselector).animate({
                'top':k.position.top,
                'left':k.position.left
            })
            
        
        }
    }
    );
    // jQuery('.imagebefore').find('img').resizable();
}

//check border for zoom and pan 

function checkBorder(ui,oheight,owidth,bheight,bwidth )
{
if(rotflag==0){
         if(ui.position.left+owidth<bwidth)
         {
            ui.position.left=bwidth-owidth ;
         }
         if(ui.position.left>0)
         {
            ui.position.left=0;
         }
         if(ui.position.top+oheight<bheight)
            {
                ui.position.top=bheight-oheight;
                
            }
            if(ui.position.top>0)
            {
                ui.position.top=0;
            }
            return ui;
        
    }
	else
	{
		if(ui.position.left+owidth<bwidth-(bwidth-(bheight*bheight/bwidth))/2)
         {
            ui.position.left=bwidth-owidth ;
         }
         if(ui.position.left>(bwidth-(bheight*bheight/bwidth))/2)
         {
            ui.position.left=0;
         }
         if(ui.position.top+oheight<bheight)
            {
                ui.position.top=bheight-oheight;
                
            }
            if(ui.position.top>0)
            {
                ui.position.top=0;
            }
            return ui;
	}
}

function zoomcheckborder(otop, oleft, oheight,owidth,bwidth,bheight)
{
    otop=parseFloat(otop);
    oleft=parseFloat(oleft);
    if(otop +oheight<bheight)
    {
        
        otop=0;
    }
    if(oleft+owidth<bwidth)
    {
        oleft=0 ;
        
    }
    var a= new Array();
     a['top']=otop;
     a['left']=oleft;
    return a;
    
    
}

//rotate img
function rotateIt(){
	if(rotflag==0){

		jQuery( ".divlayout1" ).show();
		jQuery( ".divlayout2" ).show();
		rotflag=1;
		
	}
	else
	{
		jQuery( ".divlayout1" ).hide();
		jQuery( ".divlayout2" ).hide();
		rotflag=0;
	}
}

//we should caculate for position of divlayout1 &2

/*

*/
//param
/*
image:  resource image for crop
width: resource image width
height: resource image height
imgnum : number for back to the upload
op: what we do with the crop;
bwidth: border width
bheight: border height
imgselector: select wich img for croppable
*/

function cropsend(image,width,height,imgnum,op,bwidth,bheight){

var imgselector=jQuery('.imageDesign') .find('img');	
					
				
                    var w= width;
                    var h = height;
					
                    var a=  jQuery(imgselector).width();
                    var ration = (a/w);
					
                   if(rotflag==0){
					var yi =(0-parseFloat(jQuery(imgselector).css('top')))/ration;
					var xi =(0-parseFloat(jQuery(imgselector).css('left')))/ration;
					var hi = bheight/ration;
					var wi= bwidth/ration;
					}
					else
					{
					var yi =(0-parseFloat(jQuery(imgselector).css('top')))/ration;
					var xi =((bwidth-(bheight*bheight/bwidth))/2+0-parseFloat(jQuery(imgselector).css('left')))/ration;
					var hi = bheight/ration;
					var wi= (bheight*bheight/bwidth)/ration;
					
					}
					
					//wating scene
					jQuery('.cropped').html('<img id="imageforcropped" src="'+pathmodule+'inc/img/ajax-loader.gif" style="position:relative; top:50% !important; left:250% !important;" />');
						
					jQuery('.layouthide').show();
						jQuery('.cropped').show();
						
					
					var data= 'x='+xi+'&y='+yi+'&w='+wi+'&h='+hi+'&image='+image;
						jQuery.ajax({						 
    					url: pathmodule+'inc/server/newcrop.php',
						type: "GET",
    					dataType: 'json',
    					data: data,
    					contentType: "application/json; charset=utf-8",                           
                        success: function(result){
					
						
						//show the image after crop
						if(op=='preview')
						{
						jQuery('.cropped').html('<img id="imageforcropped" src="'+pathmodule+'inc/server/uploads/'+result.thumb+'" onclick="jQuery( \'.layouthide\' ).hide();jQuery( \'.cropped\' ).hide();" />');
						if(rotflag==0){
							jQuery('#imageforcropped').addClass('imageH');
						}else{
							jQuery('#imageforcropped').addClass('imageV');
						}
						//jQuery('.layouthide').show();
						//jQuery('.cropped').show();
						}
						else
						{
						var classname= image.replace(/ /g,"_");
				
				var ar= '<div class="divim'+classname+' " onmouseover="imageMouseOver(\''+result.thumb+'\');" onmouseout="imageMouseOut(\''+result.thumb+'\');" >';
				ar+='<img class="image" id ="'+classname+'" src="'+pathmodule+'inc/server/uploads/'+result.thumb+'"  /></div>';
				//ar+='<div class="editImageuploaded editImageuploaded'+classname+'" onmouseover="imageMouseOver(\''+result.thumb+'\')" onmouseout="imageMouseOut(\''+result.thumb+'\');" >';
			//	ar+='<img onclick="deleteImageUploaded(\''+result.thumb+'\',\''+imgnum+'\');" src="'+pathmodule+'inc/img/2.png" />&nbsp;&nbsp;<img onclick="showEditDialog3(\''+result.thumb+'\',\''+result.crop+'\',\''+result.width+'\',\''+result.height+'\');" src="'+pathmodule+'inc/img/edit.png" /> </div>' ;
				
						
						jQuery(document.getElementsByClassName(classname)).html(ar);
						jQuery(document.getElementsByClassName(classname)).addClass(result.thumb);
						var k= document.getElementById(classname);
					 var selector='.'+imgnum;
					 jQuery(selector).remove();
					 creatFormUploadContent(imgnum,pathmodule+'inc/server/uploads/'+result.crop,pathmodule+'inc/server/uploads/'+result.thumb,result.width,result.height);
						
						
				var r= (result.width)/(result.height);		
				
				if( r>1)
				{		
					jQuery(k).addClass('imageuploadedH');
					jQuery(document.getElementsByClassName('divim'+classname)).addClass('centerImage');
				}else if(r<1)
				{
					jQuery(k).addClass('imageuploadedV');
				}else
				{
					jQuery(k).addClass('imageuploaded');
					
				}
						jQuery( ".editImageDialog" ).dialog("close");
						jQuery( ".UploadDialog" ).dialog( "open" );
						}
						}
					});
					
					
					
}


