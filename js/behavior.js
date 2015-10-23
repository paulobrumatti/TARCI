(function (TARCI) {
	TARCI.init();

	jQuery('#state-login form').on('submit', function (e) {
		e.preventDefault();
		var login = this.login.value.replace(/[^\d]/g, '');
		var password = this.password.value.replace(/[^\d]/g, '');
		TARCI.setState('Login', {
			login: login,
			password: password
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
		TARCI.setState('AACC', dataAACC);
	});

	jQuery('.card-solicitacoes-lista').on('click', 'a', function (e) {
		e.preventDefault();
		TARCI.setState('Solicitacao', jQuery(this).parent().data());
	});

	jQuery('body').on('submit', '.lbSolicitacao', function (e) {
		e.preventDefault();
		TARCI.util.loadingScreen(true);
		var obj = {
			id: jQuery(this).data('id'),
			nome: jQuery(this).data('nome'),
			campos: jQuery(this).find('input, select').toArray().map(function (el) {
				return {
					campo: el.name,
					valor: el.value
				};
			})
		};
		jQuery('.modal-close').click();

		TARCI.enviarSolicitacao(obj);
	})
}(window.TARCI))