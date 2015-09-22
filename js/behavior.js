(function (TARCI) {
	TARCI.init();

	jQuery('#state-login').submit(function (e) {
		e.preventDefault();
		TARCI.setState('Login', {
			login: this.login,
			password: this.password
		});
	});

	jQuery('.header-logout').click(function () {
		TARCI.setState('Logout');
	});

	jQuery('body').on('change', 'input', function () {
		jQuery(this).toggleClass('invalid', !!this.value && !this.checkValidity());
	});

	if (document.location.search.indexOf('debug') >= 0)
		jQuery('input').val('55338-8');
}(window.TARCI))