(function (TARCI) {
	TARCI.init();

	jQuery('#state-login form').on('submit', function (e) {
		e.preventDefault();
		TARCI.setState('Login', {
			login: this.login.value.replace(/[^\d]/g, ''),
			password: this.password.value.replace(/[^\d]/g, '')
		});
	});

	jQuery('.header-logout').on('click', function (e) {
		e.preventDefault();
		TARCI.setState('Logout');
	});

	jQuery('body').on('change', 'input', function () {
		jQuery(this).toggleClass('invalid', !!this.value && !this.checkValidity());
	});

	jQuery('body').on('click', '.modal-close, .modal-backdrop', function (e) {
		e.preventDefault();
		jQuery('body').removeClass('modal');
		setTimeout(function () {
			jQuery('.modal-container, .modal-backdrop').remove();
		}, 700);
	});

	jQuery('.card-aacc-detalhes').on('click', function (e) {
		e.preventDefault();
		TARCI.setState('DetalhesAACC');
	});

	jQuery('.card-solicitacoes-lista').on('click', 'a', function (e) {
		e.preventDefault();
		TARCI.setState('Solicitacao', jQuery(this).parent().data());
	});

	jQuery('body').on('submit', '.lbSolicitacao', function (e) {
		e.preventDefault();
		TARCI.enviarSolicitacao(this);
		jQuery('.modal-close').click();
	});
}(window.TARCI))