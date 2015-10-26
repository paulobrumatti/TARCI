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
		'lbSolicitacao': '<form class="lbSolicitacao" data-nome="{{nome}}" data-id="{{id}}">{{campos}}<input type="text" class="form-field" name="obs" required></input><label for="obs" class="form-placeholder">Motivo</label><input class="button button-fullwidth" type="submit" value="Enviar"></input></form>'
	};
	TARCI.init = function init() {
		toggleSection('login');
	};

	TARCI.setState = function setState(state, data) {
		return TARCI['state' + state](data);
	};

	TARCI.stateLogout = function stateLogout() {
		util.loadingScreen(true);
		setTimeout(function () {
			document.location.reload();
		}, 500);
	};

	TARCI.stateLogin = function stateLogin(credentials) {
		util.send({
			url: 'login',
			data: credentials,
			onSuccess: function (data) {
				TARCI.data.user = credentials;
				TARCI.setState('Dashboard', data);
			}
		});
	};

	TARCI.stateDashboard = function stateDashboard(data) {
		if (typeof data !== 'object')
			throw new Error('[TARCI.stateDashboard] Dados recebidos no formato incorreto');

		util.parseData('materias', data.materias);
		util.parseData('aaccVisaoGeral', data.aacc);
		util.parseData('aaccRecentes', data.aaccRecentes);
		util.parseData('solicitacoes', data.solicitacoes);

		toggleSection('dashboard');
	};

	TARCI.stateDetalhesAACC = function stateDetalhesAACC(data) {
		util.send({
			url: 'aacc-detalhes',
			data: TARCI.data.user,
			onSuccess: function (data) {
				if (typeof data !== 'object')
					throw new Error('[TARCI.stateDetalhesAACC] Dados recebidos incorretos');
				util.parseData('aaccDetalhes', data);
			}
		});
	};

	TARCI.stateSolicitacao = function stateSolicitacao(solicitacao) {
		if (solicitacao.campos.length)
			util.send({
				url: 'solicitacao-campos',
				data: solicitacao,
				onSuccess: function (data) {
					if (typeof data !== 'object')
						throw new Error('[TARCI.stateSolicitacao] Dados recebidos incorretos');

					util.parseData('solicitacao', data);
				}
			});
		else
			util.parseData('solicitacao', solicitacao);
	};

	TARCI.enviarSolicitacao = function enviarSolicitacao(form) {
		var $form = jQuery(form);
		var data = jQuery.extend({}, $form.data(), {
			horario: new Date().getTime(),
			campos: $form.find('input, select').toArray().map(function (el) {
				return {
					campo: el.name,
					valor: el.value
				};
			})
		});

		util.send({
			url: 'solicitacao-enviar',
			data: data,
			onSuccess: function (data) {
				util.message({
					titulo: 'Sucesso',
					tipo: 'success',
					conteudo: '<p>Solicitação enviada com sucesso. Aguarde contato do Atendimento ao Aluno para dar sequência à sua solicitação.</p><br><p>Protocolo: ' + data.protocolo + '</p>'
				});
			}
		});
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

	window.TARCI = TARCI;
}())