(function() {
	var TARCI = {};

	TARCI.sections = jQuery('.state');
	TARCI.init = function init() {

		// TODO - Migrar para config externo em YML
		TARCI.config = {
			"timeout": 5000,
			"url": {
				"base": "https://www.uscs.edu.br/",
				"login": "login",
				"logout": "logout",
				"dashboard": "information",
				"restful": "restful"
			},
			"states": [
				"login",
				"dashboard",
				"notas-faltas",
				"aacc",
				"solicitacao"
			],
			"solicitacoes": {
				"Dispensa de Disciplina": {
					"data-inicio": "05/08/2015",
					"data-termino": "10/12/2105"
				}
			}
		};

		toggleSection('login');
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
		setTimeout(function() {
			TARCI.stateDashboard();
			TARCI.util.loadingScreen(false);
		}, 2000);
	};

	TARCI.stateLogout = function stateLogout() {
		TARCI.util.loadingScreen(true);
		document.location.reload();
	};

	TARCI.stateDashboard = function stateDashboard () {
		toggleSection('dashboard');
	};

	function toggleSection(section) {
		document.body.className = section;
		TARCI.sections.each(function(i, el) {
			if (el.id === 'state-' + section)
				el.className.split(' ').indexOf('show') === -1 && el.classList.add('show');
			else
				el.classList.remove('show');
		});
	}

	window.TARCI = TARCI;
}())