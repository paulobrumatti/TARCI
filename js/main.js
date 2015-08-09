var TARSI = {
	init: function init() {

		// TODO - Migrar para config externo em YML
		this.config = {
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
	},
	find: function find(selector, scope) {
		if (scope)
			scope = document;
		return document.querySelectorAll(selector);
	},
	doLogin: function doLogin() {
		TARSI.setState('loading');

		var killAjax = 0;

		var loginAjax = TARSI.getURL(TARSI.config.login, function(response) {
			clearTimeout(killAjax);
			if (response.message === 'ok')
				TARSI.setState('dashboard');
			else
				TARSI.setState('login', {
					message: response.message,
					type: 'wrong-credentials'
				});
		});


		killAjax = setTimeout(function() {
			loginAjax.abort();
		}, TARSI.config.timeout);
	},
	setState: function setState(state, data) {

	},
	getJSON: function getJSON(url) {
		return jQuery.getJSON(url);
	}

};