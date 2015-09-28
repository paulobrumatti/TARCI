var data = {
	"MATERIAS": [{
		"PROFESSOR": "OSWALDO ORTIZ FERNANDES JUNIOR",
		"MATERIA": "INTELIGÊNCIA ARTIFICIAL E COMPUTACIONAL",
		"FALTAS": 12,
		"LIMITE_FALTAS": 20,
		"P1": 5.6,
		"P2": -1,
		"P3": -1,
		"MEDIA": -1
	}, {
		"PROFESSOR": "RICARDO RESENTE DE MENDONÇA",
		"MATERIA": "COMPUTAÇÃO GRÁFICA E PROCESSAMENTO DE IMAGEM",
		"FALTAS": 0,
		"LIMITE_FALTAS": 0,
		"P1": 6,
		"P2": 4,
		"P3": -1,
		"MEDIA": 5
	}, {
		"PROFESSOR": "OSWALDO ORTIZ FERNANDES JUNIOR",
		"MATERIA": "INTELIGÊNCIA ARTIFICIAL E COMPUTACIONAL",
		"FALTAS": 12,
		"LIMITE_FALTAS": 20,
		"P1": 5.6,
		"P2": -1,
		"P3": -1,
		"MEDIA": -1
	}, {
		"PROFESSOR": "RICARDO RESENTE DE MENDONÇA",
		"MATERIA": "COMPUTAÇÃO GRÁFICA E PROCESSAMENTO DE IMAGEM",
		"FALTAS": 0,
		"LIMITE_FALTAS": 0,
		"P1": 6,
		"P2": 4,
		"P3": -1,
		"MEDIA": 5
	}],
	"AACC": {
		"RECENTES": [{
			"NOME_AACC": "Cine USCS",
			"HORAS_AACC": 15
		}, {
			"NOME_AACC": "Os Vingadores",
			"HORAS_AACC": 4
		}],
		"HORAS_REALIZADAS": 19,
		"HORAS_NECESSARIAS": 190
	},
	"SOLICITACOES": [{
		'ID_SOLICITACAO': 'mudanca-de-sala',
		'NOME_SOLICITACAO': 'Mudança de Sala'
	}, {
		'ID_SOLICITACAO': 'mudanca-de-periodo',
		'NOME_SOLICITACAO': 'Mudança de Período'
	}, {
		'ID_SOLICITACAO': 'mudanca-de-curso',
		'NOME_SOLICITACAO': 'Mudança de Curso'
	}, {
		'ID_SOLICITACAO': 'dispensa-de-disciplina',
		'NOME_SOLICITACAO': 'Dispensa de Disciplina'
	}]
};

(function () {
	var TARCI = {};

	TARCI.sections = jQuery('.state');
	TARCI.templates = {
		'materia': jQuery('#template-materia').html(),
		'aaccRecentes': jQuery('#template-aacc-recentes').html(),
		'aaccVisaoGeral': jQuery('#template-aacc-visaogeral').html(),
		'solicitacoes': jQuery('#template-solicitacoes').html(),
	};
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
		setTimeout(function () {
			TARCI.stateDashboard(data);
			TARCI.util.loadingScreen(false);
		}, 2000);
	};

	TARCI.stateLogout = function stateLogout() {
		TARCI.util.loadingScreen(true);
		document.location.reload();
	};

	TARCI.stateDashboard = function stateDashboard(data) {
		if (typeof data !== 'object')
			throw new Error('[TARCI.stateDashboard] Dados recebidos incorretos');

		TARCI.util.parseData('materias', data.MATERIAS);
		TARCI.util.parseData('aaccVisaoGeral', data.AACC);
		TARCI.util.parseData('aaccRecentes', data.AACC.RECENTES);
		TARCI.util.parseData('solicitacoes', data.SOLICITACOES);

		toggleSection('dashboard');
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