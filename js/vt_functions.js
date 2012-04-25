// global variables
var themes_path = "skins/";
//-----------------------------------------------------------------------------------------
function check_uncheck_item(itemObj, itemSrc, div_add_check) {
    var vtSrc = document.getElementById(itemObj).src;
    var addSrc = themes_path + "images/add.png";
    var checkSrc = themes_path + "images/check.png";
    document.getElementById(itemObj).src = checkSrc;                        
    if (vtSrc.indexOf("add.png") == -1) {
        document.getElementById(itemObj).src = addSrc;
        total_selected_photos = total_selected_photos - 1;                        
        document.getElementById(div_add_check).className = 'div_add';
    }
    else {
        total_selected_photos = total_selected_photos + 1;
        document.getElementById(div_add_check).className = 'div_check';
    }
    
    document.getElementById('div_total_selected_photos').innerHTML = total_selected_photos;
    
}
//-----------------------------------------------------------------------------------------
function gotoURL(url) {
    window.location.href = url;
}
//-----------------------------------------------------------------------------------------
var EL="";
function createRequest(){
    var request=null;
    try{
        request=new XMLHttpRequest();
    }
    catch(trymicrosoft){
        try{
            request=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(othermicrosoft){
            try{
                request=new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(failed){
                request=null;
            }
        }
    }
    return request;
}
//-----------------------------------------------------------------------------------------
function showid(data){
    var objBranch=document.getElementById(data);
    if(objBranch){
        if(objBranch.style.display=="block" || objBranch.style.display==""){
            objBranch.style.display="none";
        }
        else{
            objBranch.style.display="block";
        }
    }
}
//-----------------------------------------------------------------------------------------
var res_UpdateDataTable=null;
var show_loading = 1;
function UpdateDataTable(url, id, objElement){
    res_UpdateDataTable=createRequest();
    
    url = url+"&dummy="+new Date().getTime();  //alert(url);
    if (show_loading) {
        document.getElementById('show_loading').style.display="block";    
    } // end if dung de dong lai cau show_loading khi tu dong dung ham update
    var array=url.split("?");
    res_UpdateDataTable.open("POST",array[0],true);
    res_UpdateDataTable.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    res_UpdateDataTable.send(array[1]);
    if (show_loading) {
        setTimeout("showid('show_loading')",500);
    } // end if dung de dong lai cau show_loading khi tu dong dung ham update
}
//-----------------------------------------------------------------------------------------
function substr_VT(str, str_begin, str_end, eleID) {
    var pos1, pos2, rst;
    
    pos2 = str.length;
    pos1 = str.indexOf(str_begin) + str_begin.length + 1;
    if (str_end) {
        pos2 = str.indexOf(str_end) - 1;    
    } // end if
    
    rst = str.substring(pos1, pos2);
    return rst;
}
//-----------------------------------------------------------------------------------------
