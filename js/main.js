(function () {
	var TARCI = {};

	TARCI.sections = jQuery('.state');
	TARCI.templates = {
		'modal': jQuery('#template-modal').html(),
		'materia': jQuery('#template-materia').html(),
		'aaccRecentes': jQuery('#template-aacc-recentes').html(),
		'aaccVisaoGeral': jQuery('#template-aacc-visaogeral').html(),
		'aaccDetalhes': jQuery('#template-aacc-detalhes').html(),
		'solicitacoes': jQuery('#template-solicitacoes').html(),
	};
	TARCI.init = function init() {
		// TARCI.util.ajaxTimeout({
		// 	url: 'https://bruninho-tcc-thiagodp6.c9.io/geturl/?url=http://sheetsu.com/apis/435e2f63'
		// });
		toggleSection('login');
		// TARCI.stateDashboard(data);
	};

	TARCI.setState = function setState(state, data) {
		return TARCI['state' + state](data);
	};

	TARCI.stateLogin = function stateLogin(credentials) {
		/*TARCI.util.ajaxTimeout(TARCI.config.login, credentials, function callback(response) {
			if (response.type === 'success')
				return TARCI.setState('Dashboard');

			return TARCI.util.message({
				message: response.message,
				type: response.type
			});
		});*/
		TARCI.util.loadingScreen(true);
		setTimeout(function () {
			TARCI.util.loadingScreen(false);
			TARCI.stateDashboard(data);
		}, 1000);
	};

	TARCI.stateLogout = function stateLogout() {
		TARCI.util.loadingScreen(true);
		setTimeout(function () {
			document.location.reload();
		}, 500);
	};

	TARCI.stateDashboard = function stateDashboard(data) {
		if (typeof data !== 'object')
			throw new Error('[TARCI.stateDashboard] Dados recebidos incorretos');

		TARCI.util.parseData('materias', data.MATERIAS);
		TARCI.util.parseData('aaccVisaoGeral', data.AACC);
		TARCI.util.parseData('aaccRecentes', data.AACC.RECENTES);
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

		TARCI.util.parseData('solicitacoes', dataSolicitacoes);

		toggleSection('dashboard');
	};

	TARCI.stateAACC = function stateAACC(data) {
		// if (typeof data !== 'object')
		// 	throw new Error('[TARCI.stateAACC] Dados recebidos incorretos');
		TARCI.util.parseData('aaccDetalhes', data);
	};

	TARCI.stateSolicitacao = function stateSolicitacao(data) {
		TARCI.util.parseData('solicitacao', data);
	};

	function toggleSection(section) {
		document.body.className = section;
		TARCI.sections.each(function (i, el) {
			if (el.id === 'state-' + section)
				el.className.split(' ').indexOf('show') === -1 && el.classList.add('show');
			else
				el.classList.remove('show');
		});
	}

	window.TARCI = TARCI;
}())