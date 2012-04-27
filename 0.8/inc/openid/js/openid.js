var openid = {

	provider: [
        ['twitter', 'Twitter', 'user_vt', ''], // new vytien
        ['facebook', 'Facebook', 'facebook', ''], // vytien83@yahoo.com    user = facebook
        ['paypal', 'Pay Pal', 'user_vt', ''], // new   // vytien83@yahoo.com 
        ['yahoo', 'Yahoo', 'user', ''],  //vytien83
        ['google', 'Google', 'user', ''], // vytien ok
        ['myopenid', 'My Open ID', 'user', ''],  //http://vytien.myopenid.com
        //['verisign', 'Verisign', 'user', ''], // vytien
        //['aol', 'AOL', 'user', ''],   //vytien123
        ['openid', 'OpenID', 'openid', ''] 
	],

	set_provider: function(type){

		$('.selected').removeAttr('class');

		$('#p_' + type).attr('class', 'selected');

		$('#type').attr('value', type);

		for(var i = 0; i < this.provider.length; i++)
		{
			var k = this.provider[i][0];

			if(k == type)
			{
				var v = this.provider[i][1];
				var t = this.provider[i][2];
				var d = this.provider[i][3];
				$('#identity').html(eval('this.' + t + '_input("' + v + '","' + d + '");'));
			}
		}

	},

	user_input: function(provider, user){

        var tpl = '';

        tpl+= '<p>Enter your <strong>' + provider + '</strong> username</p>';
        tpl+= '<label for="openid_identifier">Username:</label>';
        tpl+= '<input type="text" name="openid_identifier" id="openid_identifier" class="input_name" value="' + user + '" />';
        tpl+= '<input type="submit" value="Sign in" class="sign_in" />';
        tpl+= '<script>document.getElementById("frmVT").submit();</script>';
        return tpl;

    },
    
    user_vt_input: function(provider, user){

		var tpl = '';

		tpl+= '<p>Sign in with your <strong>' + provider + '</strong> username</p>';
		tpl+= '<label for="openid_identifier">Username:</label>';
		tpl+= '<input type="submit" value="Sign in" class="sign_in" />';
        tpl+= '<script>document.getElementById("frmVT").submit();</script>';

		return tpl;

	},

	openid_input: function(provider, openid){

		var tpl = '';

		tpl+= '<p>Enter your <strong>' + provider + '</strong></p>';
		tpl+= '<input type="text" name="openid_identifier" id="openid_identifier" class="input_identity" value="' + openid + '" />';
		tpl+= '<input type="submit" value="Sign in" class="sign_in" />';
        
		return tpl;

	},

	facebook_input: function(provider, facebook){

        var tpl = '';

        tpl+= '<p>Sign in with your <strong>' + provider + '</strong> username</p>';
        //tpl+= '<label for="openid_identifier">Username:</label>';
        //tpl+= '<input type="text" name="openid_identifier" id="openid_identifier" class="input_name" value="' + facebook + '" />';
        tpl+= '<input type="submit" value="Sign in" class="sign_in" />';
        tpl+= '<script>document.getElementById("frmVT").submit();</script>';
        return tpl;

    },
    facebook_input_old: function(provider, facebook){

		var tpl = '';

		tpl+= '<script type="text/javascript" src="http://static.ak.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php"></script>';
		tpl+= '<script type="text/javascript">';
		tpl+= 'FB.init("' + facebook_key + '", "' + openid_root + '/xd_receiver.htm");';
		tpl+= 'FB.Bootstrap.requireFeatures(["Connect"], function(){';
		tpl+= '$("#fb_login").removeAttr("disabled")';
		tpl+= '});';
		tpl+= '</script>';

		tpl+= '<p>Use your <strong>' + provider + '</strong> account to login</p>';
		tpl+= '<input disabled="disabled" id="fb_login" type="button" value="Connect" class="sign_in" onclick="openid.facebook_login();" />';

		tpl+= '';

		return tpl;

	},

	facebook_login: function(){

		FB.Connect.requireSession(function(){

			window.location.href = 'callback.php?mode=facebook';

		}, function(){

			window.location.href = 'callback.php?mode=facebook&canceled';

		});

	},

	provider_list: function(){

		var tpl = '';

		tpl+= '<ul>';

		for(var i = 0; i < this.provider.length; i++)
		{
			var k = this.provider[i][0];
			var v = this.provider[i][1];

			if(i == 0)
			{
				tpl+= '<li id="p_' + k + '" class="selected"><a href="#" onclick="openid.set_provider(\'' + k + '\');"><img src="img/provider/' + k + '.png" alt="icon" />' + v + '</a></li>';
			}
			else
			{
				tpl+= '<li id="p_' + k + '"><a href="#" onclick="openid.set_provider(\'' + k + '\');"><img src="img/provider/' + k + '.png" alt="icon" />' + v + '</a></li>';
			}
		}

		tpl+= '</ul>';

		return tpl;

	},

	ini: function(){

		jQuery('#provider').css('display', 'inline');

		jQuery('#provider').html(this.provider_list());

		//this.set_provider('openid');

		jQuery('#hint_select_provider').html('or select one of the provider');

	}

};


$(document).ready(function(){

	openid.ini();

});

