(function () {
	var TARCI = {};

	TARCI.data = {};
	TARCI.config = {
		baseUrl: 'https://www.uscs.edu.br/webservice/'
	};
	TARCI.sections = jQuery('.state');
	TARCI.templates = {
		'modal': jQuery('#template-modal').html(),
		'materia': jQuery('#template-materia').html(),
		'aaccRecentes': jQuery('#template-aacc-recentes').html(),
		'aaccVisaoGeral': jQuery('#template-aacc-visaogeral').html(),
		'aaccDetalhes': jQuery('#template-aacc-detalhes').html(),
		'solicitacoes': jQuery('#template-solicitacoes').html(),
		'lbSolicitacao': '<form class="lbSolicitacao" data-nome="{{nome}}" data-id="{{id}}">{{campos}}<br><input type="text" class="form-field" name="obs" required></input><label for="obs" class="form-placeholder">Motivo</label><input class="button button-fullwidth" type="submit" value="Enviar"></input></form>'
	};
	TARCI.init = function init() {
		toggleSection('login');
	};

	TARCI.setState = function setState(state, data) {
		return TARCI['state' + state](data);
	};

	TARCI.stateLogout = function stateLogout() {
		TARCI.util.loadingScreen(true);
		setTimeout(function () {
			document.location.reload();
		}, 500);
	};

	TARCI.stateLogin = function stateLogin(credentials) {
		// TARCI.util.ajaxTimeout(TARCI.config.baseUrl + 'login', credentials, function callback(response) {
		// 	if (response.type === 'success')
		// 		return TARCI.setState('Dashboard', response.data);

		// 	return TARCI.util.message({
		// 		titulo: 'Erro do Servidor',
		// 		tipo: response.type,
		// 		conteudo: response.message || 'Ocorreu um erro no servidor. Tente novamente mais tarde',
		// 	});
		// });

		var data = validateLogin(credentials);
		if (!data) return;

		TARCI.data.user = {
			login: credentials.login,
			password: credentials.password
		};

		TARCI.setState('Dashboard', data);
	};

	TARCI.stateDashboard = function stateDashboard(data) {
		console.log(data);
		TARCI.util.loadingScreen(true);
		setTimeout(function () {
			TARCI.util.loadingScreen(false);

			if (typeof data !== 'object')
				throw new Error('[TARCI.stateDashboard] Dados recebidos no formato incorreto');

			TARCI.util.parseData('materias', data.materias);
			TARCI.util.parseData('aaccVisaoGeral', data.aacc);
			TARCI.util.parseData('aaccRecentes', data.aacc.recentes);

			// TARCI.util.ajaxTimeout({
			// 	url: 'https://pacific-temple-5425.herokuapp.com/geturl/?url=http://sheetsu.com/apis/38844672',
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

			TARCI.data.solicitacoes = dataSolicitacoes;
			TARCI.util.parseData('solicitacoes', dataSolicitacoes);

			toggleSection('dashboard');
		}, 1000);
	};

	TARCI.stateAACC = function stateAACC(data) {
		if (typeof data !== 'object')
			throw new Error('[TARCI.stateAACC] Dados recebidos incorretos');
		TARCI.util.parseData('aaccDetalhes', data);
	};

	TARCI.stateSolicitacao = function stateSolicitacao(data) {
		TARCI.util.parseData('solicitacao', data);
	};

	TARCI.enviarSolicitacao = function enviarSolicitacao(data) {
		// TARCI.util.ajaxTimeout({
		// 	url: 'https://pacific-temple-5425.herokuapp.com/geturl/?url=http://sheetsu.com/apis/435e2f63',
		// 	data: {},
		// 	callback: function(response) {
		// 		console.log(response);
		// 	},
		// 	timeout: 5000
		// });
		setTimeout(function () {
			TARCI.util.message({
				titulo: 'Sucesso',
				tipo: 'success',
				conteudo: 'Solicitação enviada com sucesso. Aguarde contato do Atendimento ao Aluno para dar sequência à sua solicitação.'
			});
			TARCI.util.loadingScreen(false);
		}, 2000);
	}

	function toggleSection(section) {
		document.body.className = section;
		TARCI.sections.each(function (i, el) {
			if (el.id === 'state-' + section)
				el.className.split(' ').indexOf('show') === -1 && el.classList.add('show');
			else
				el.classList.remove('show');
		});
	}

	function validateLogin(credentials) {

		return data1;
		if (credentials.login === '123123') {
			return TARCI.util.message({
				titulo: 'Falha na Conexão',
				tipo: 'error',
				conteudo: 'O servidor não está respondendo no momento. Tente novamente mais tarde.'
			});
		}

		var user = dataUsuarios[credentials.login];

		if (!user)
			return TARCI.util.message({
				titulo: 'Falha no Login',
				tipo: 'error',
				conteudo: 'Matrícula não encontrada. Por favor, verifique os dados e tente novamente.'
			});

		if (user.CPF !== credentials.password) 
			return TARCI.util.message({
				titulo: 'Falha no Login',
				tipo: 'error',
				conteudo: 'O CPF digitado é inválido. Por favor, verifique seus dados e tente novamente.'
			});

		if (!user.ADIMPLENCIA)
			return TARCI.util.message({
				titulo: 'Falha no Login',
				tipo: 'error',
				conteudo: 'Aluno inadimplente, o acesso ao sistema foi negado.'
			});

		return user.data;
	}

	window.TARCI = TARCI;
}())