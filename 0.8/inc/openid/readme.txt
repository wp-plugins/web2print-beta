
	OpenID login

	[ About ]
	[ Installation ]
	[ Help ]


	[ About ]

	Let you easily integrate an OpenID login to your website. Several famous
	providers are preconfigured so that your users can choose whether they
	want login with an Google, Yahoo, Facebook, etc... account.

	OpenID has the advantage that your users dont have to create a new
	account on your website instead they use an OpenID to login. Probably
	more users use your website because they dont have to follow a
	registration process. More informations about OpenID can be found at
	http://openid.net.

	The facebook connect API is also implemented so that you can login
	with your facebook account.
	
	The interface is complete customizeable so you can integrate it easy in
	your current design. See the Live Preview for an example.

	The package contains the following files:

		- Example login website
		- OpenID php libraries
		- Javascript based login interface

	[ Installation ]

	You have to open the file common.php and edit the constant "openid_root"
	and "openid_callback". openid_root is the absolute url to the OpenID
	folder i.e. if your domain is foobar.com and the OpenID folder is at the
	root your absolute path is http://foobar.com/openid. openid_callback is
	the url where your user gets redirected from the service provider.

	If you want use facebook as provider you have to register your website
	as application on facebook. Enter the key and secret that you get in the
	constant "facebook_key" and "facebook_secret".

	In the file callback.php you have to set a cookie or a session value
	according to your current login system. You should probably redirect
	the user to the homepage / user panel. As example we use a session based
	login.

	[ Help ]

	If you need a new provider or simply need help to implement the OpenID
	login into your current system do not hesitate to contact me at
	christoph.kappestein@gmail.com. If you have any ideas, bugs, improvement
	proposal you can also send me an email to this address. Best regards

	Christoph <K42B3> Kappestein