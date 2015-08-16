var TARSI = {};

TARSI.init = function init() {

	// TODO - Migrar para config externo em YML
	TARSI.config = {
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

	TARSI.setState('login');
};

TARSI.setState = function setState(state, data) {
	return TARSI.actions[state](data);
}