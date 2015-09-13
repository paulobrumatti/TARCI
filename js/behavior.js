(function(TARCI){
	TARCI.init();
	
	jQuery('#state-login').submit(function(e) {
		e.preventDefault();
		TARCI.setState('Login', {
			login: this.login,
			password: this.password
		});
	});

	jQuery('.header-menu-logout').click(function() {
		TARCI.setState('Logout');
	});
}(window.TARCI))
