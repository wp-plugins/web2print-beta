//=================================================================================================
function facebook_events_index_page() {
    // get account info
    getAccountInfo();
    // get normal albums
    getAlbums();
    // get albums of pages
    getAlbumPages();
    // get all friends
    getFriends();
    // submit form to post data
    FacebookSubmit();    
}
//=================================================================================================
window.FacebookSubmit = function() {
  FB.api('/me/albums', function(resp) {
    var previous_link = resp.paging.previous;
    document.getElementById('access_token').value = substr_VT(previous_link, "access_token", "callback");
    document.getElementById('previous_access_token').value = document.getElementById('access_token').value;
    document.getElementById('previous_limit').value = substr_VT(previous_link, "limit", "since");
    document.getElementById('previous_since').value = substr_VT(previous_link, "since", "");
    
    var next_link = resp.paging.next;
    document.getElementById('next_access_token').value = substr_VT(next_link, "access_token", "callback");
    document.getElementById('next_limit').value = substr_VT(next_link, "limit", "until");
    document.getElementById('next_until').value = substr_VT(next_link, "until", "");
    
    document.getElementById('frmFacebookVT').submit();
  });
};
//=================================================================================================
var albums = '';
var pages = '';
window.getAlbums = function() {
  FB.api('/me/albums', function(resp) {
    for (var i = 0; i < resp.data.length; i++) {
        albums += resp.data[i].id + ":" + resp.data[i].name + "||";
    }   // end for
    document.getElementById('hidListAlbums').value = albums;
  });
};
//=================================================================================================
window.getAlbumPages = function() {
  FB.api('/me/accounts', function(resp) {
    for (var i = 0; i < resp.data.length; i++) {
        if (resp.data[i].category == "Website") {
            pages += resp.data[i].id + ":" + resp.data[i].name + "||";
        }
    }   // end for
    
    document.getElementById('hidListAlbumsPages').value = pages;
  });
};
//=================================================================================================
window.getAccountInfo = function() {
  FB.api('/me/', function(resp) {
   /* var content = "<p> ID: "+ resp.id + " </p>";
    content += "<p> Name: "+ resp.name + " </p>";
    content += "<p> First Name: "+ resp.first_name + " </p>";
    content += "<p> Last Name: "+ resp.last_name + " </p>";
    content += "<p> Link: "+ resp.link + " </p>";
    content += "<p> Location: "+ resp.location.name + " </p>";
    content += "<p> Bio: "+ resp.bio + " </p>";
    content += "<p> Gender: "+ resp.gender + " </p>";
    content += "<p> Email: "+ resp.email + " </p>";
    content += "<p> Locale: "+ resp.locale + " </p>";
    content += "<p> Updated Time: "+ resp.updated_time + " </p>";
    console.log(content);      */
    //document.getElementById('account_info').value = content;
    document.getElementById('account_id').value = resp.id;
    document.getElementById('account_name').value = resp.name;
  });
};
//=================================================================================================
window.getFriends = function() {
  FB.api('/me/friends', function(resp) {
    var content = '';
    for (var i = 0; i < resp.data.length; i++) {
        //content += "<a href='http://www.facebook.com/profile.php?id="+ resp.data[i].id +"'><img border='0' src='http://graph.facebook.com/"+ resp.data[i].id +"/picture'> " + resp.data[i].name + "</a> <br>";
        content += resp.data[i].id + ":" + resp.data[i].name + "||";
    }
    document.getElementById('account_friends').value = content;
  });
  
};
//=================================================================================================