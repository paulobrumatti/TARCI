(function (TARCI) {
	TARCI.init();

	jQuery('#state-login').on('submit', function (e) {
		e.preventDefault();
		TARCI.setState('Login', {
			login: this.login,
			password: this.password
		});
	});

	jQuery('.header-logout').on('click', function () {
		TARCI.setState('Logout');
	});

	jQuery('.header-logo').on('click', function () {
		// TARCI.util.ajaxTimeout({
		// 	url: 'https://bruninho-tcc-thiagodp6.c9.io/geturl/?url=http://sheetsu.com/apis/38844672',
		// 	data: {},
		// 	callback: function (result) {
		// 		if (result.status === 200 && result.responseJSON.result) {
		// 			TARCI.util.parseData('solicitacoes', result.responseJSON.result);
		// 		} else {
		// 			jQuery('.card-solicitacoes .card-content').html('Não há solicitações disponíveis no momento.')
		// 		}
		// 		toggleSection('dashboard');
		// 	},
		// 	timeout: 5000,
		// 	timeoutCallback: function () {
		// 		jQuery('.card-solicitacoes .card-content').html('Não há solicitações disponíveis no momento.')
		// 	}
		// });
		TARCI.util.message({
			CONTEUDO: 'O servidor não está respondendo no momento. Tente novamente mais tarde.',
			TITULO: 'Falha no servidor',
			TIPO: 'error'
		});
	});

	jQuery('body').on('change', 'input', function () {
		jQuery(this).toggleClass('invalid', !!this.value && !this.checkValidity());
	});

	if (document.location.search.indexOf('debug') >= 0)
		jQuery('input').val('55338-8');

	jQuery('body').on('click', '.modal-close, .modal-backdrop', function () {
		jQuery('body').removeClass('modal');
		setTimeout(function () {
			jQuery('.modal-container, .modal-backdrop').remove();
		}, 700);
	});

	jQuery('.card-aacc-detalhes').on('click', function () {
		TARCI.setState('AACC', dataAACC);
	});

	jQuery('.card-solicitacoes-lista-solicitacao').on('click', 'a', function () {
		TARCI.setState('Solicitacao', this.id)
	});
}(window.TARCI))