(function () {
	var util = TARCI.util = {};
	var loadingScreenElement = jQuery('#loading-screen');

	util.find = function find(selector, scope) {
		if (!scope) scope = document;
		return document.querySelectorAll(selector);
	};

	util.toArray = function toArray(arrayLike) {
		return Array.prototype.splice.call(arrayLike);
	};

	util.ajaxTimeout = function ajaxTimeout(settings) {
		util.loadingScreen(true);
		var ajaxPromise = jQuery.getJSON(settings.url, settings.data, function () {
			util.loadingScreen(false);
			clearTimeout(ajaxLife);
			settings.callback.apply(this, arguments);
		});

		var ajaxLife = setTimeout(function () {
			util.loadingScreen(false);
			ajaxPromise.abort();
			if (typeof timeoutCallback === 'function')
				settings.timeoutCallback();
			else
				TARCI.util.message({
					CONTEUDO: 'O servidor não está respondendo no momento. Tente novamente mais tarde.',
					TITULO: 'Falha no servidor',
					TIPO: 'error'
				});
		}, settings.timeout);
	};

	util.loadingScreen = function loadingScreen(show) {
		loadingScreenElement.toggleClass('loading-show', show)
	};

	util.message = function message(obj) {
		var structure = util.template(TARCI.templates.modal, obj);
		jQuery('body').append(structure);
		setTimeout(function () {
			document.body.classList.add('modal');
		}, 200);
	};

	util.template = function template(tmpl, obj) {
		if (typeof tmpl !== 'string')
			throw new Error('[util.template] Template inválido: ' + tmpl);
		if (typeof obj !== 'object')
			throw new Error('[util.template] Parametros inválidos: ' + tmpl);
		for (var key in obj) {
			tmpl = tmpl.replace('{{' + key + '}}', obj[key]);
		}

		return tmpl;
	};

	util.validateParams = function validateParams(obj, params) {
		if (typeof obj !== 'object')
			throw new Error('[util.validateParams] Objeto a ser validado invalido: ' + obj);
		if (typeof params !== 'object')
			throw new Error('[util.validateParams] Parametros a serem validados invalido: ' + obj);

		for (var key in params)
			if (typeof obj[key] !== params[key])
				return false;
		return true;
	};

	util.validate = function validate(type, obj) {
		if (!type || typeof type !== 'string')
			throw new Error('[util.validate] Tipo de validação inválida: ' + type);
		if (!obj || typeof obj !== 'object')
			throw new Error('[util.validate] Tipo de objeto inválido: ' + obj);
		if (typeof util.validate[type] !== 'object')
			throw new Error('[util.validate] Não há validação para este tipo de dados:' + type);

		return util.validateParams(obj, util.validate[type]);
	};

	util.validate.materia = {
		'PROFESSOR': 'string',
		'MATERIA': 'string',
		'FALTAS': 'number',
		'LIMITE_FALTAS': 'number',
		'P1': 'number',
		'P2': 'number',
		'P3': 'number',
		'MEDIA': 'number'
	};

	util.validate.aaccVisaoGeral = {
		'HORAS_REALIZADAS': 'number',
		'HORAS_NECESSARIAS': 'number'
	};

	util.validate.aaccRecentes = {
		'NOME': 'string',
		'HORAS': 'number'
	};

	util.validate.aaccDetalhes = {
		'NOME': 'string',
		'GRUPO': 'string',
		'HORAS': 'number'
	};

	util.validate.solicitacoes = {
		'ID': 'string',
		'NOME': 'string',
		'DATA_INICIAL': 'string',
		'DATA_FINAL': 'string'
	};

	util.validate.solicitacao = {
		'ID': 'string',
		'NOME': 'string',
		'DATA_INICIAL': 'string',
		'DATA_FINAL': 'string'
	};

	util.parseData = function parseData(type, data) {
		if (typeof type !== 'string' || !type)
			throw new Error('[util.parseData] O tipo de dados é inválido: ' + type);
		if (typeof data !== 'object' || !data)
			throw new Error('[util.parseData] Os dados não estão no formato correto: ' + data);
		if (typeof util.parseData[type] !== 'function')
			throw new Error('[util.parseData] Não existe validação para o tipo recebido: ' + type)

		return util.parseData[type](data);
	};

	util.parseData.materias = function (data) {
		if (!data || typeof data.length !== 'number')
			throw new Error('[util.parseData.materias] Os dados devem estar contidos em um array: ' + data);

		data.forEach(function (materia) {
			util.validate('materia', materia);
			['FALTAS', 'LIMITE_FALTAS', 'P1', 'P2', 'P3', 'MEDIA'].forEach(function (key) {
				if (materia[key] < 0 || materia[key] > 10)
					materia[key] = '-';
			});
			var structure = util.template(TARCI.templates.materia, materia);
			jQuery('.card-materias-content').append(structure);
		});
	};

	util.parseData.aaccVisaoGeral = function (data) {
		if (!data || typeof data !== 'object')
			throw new Error('[util.parseData.aaccVisaoGeral] Os dados devem estar contidos em um objeto: ' + data);

		util.validate('aaccVisaoGeral', data);
		data.PORCENTAGEM_REALIZADA = 100 * (data.HORAS_REALIZADAS / data.HORAS_NECESSARIAS);
		data.PORCENTAGEM_NECESSARIA = 100 * (1 - (data.HORAS_REALIZADAS / data.HORAS_NECESSARIAS));
		var structure = util.template(TARCI.templates.aaccVisaoGeral, data);
		jQuery('.card-aacc-content').append(structure);
	};

	util.parseData.aaccRecentes = function (data) {
		if (!data || typeof data.length !== 'number')
			throw new Error('[util.parseData.aaccRecentes] Os dados devem estar contidos em um array: ' + data);

		data.splice(0,3).forEach(function (recente) {
			util.validate('aaccRecentes', recente);
			var structure = util.template(TARCI.templates.aaccRecentes, recente);
			jQuery('.card-aacc-recentes-tabela').append(structure);
		});
	};

	util.parseData.solicitacoes = function (data) {
		if (!data || typeof data.length !== 'number')
			throw new Error('[util.parseData.solicitacoes] Os dados devem estar contidos em um array: ' + data);

		var count = data.length;
		data.forEach(function (solicitacao) {
			util.validate('solicitacoes', solicitacao);

			['DATA_INICIAL', 'DATA_FINAL'].forEach(function (key) {
				var split = solicitacao[key].split('/');
				solicitacao[key] = new Date(split[2], split[1], split[0]);
			});
			var today = new Date();
			if (today > solicitacao.DATA_INICIAL && today < solicitacao.DATA_FINAL) {
				var structure = util.template(TARCI.templates.solicitacoes, solicitacao);
				jQuery('.card-solicitacoes-lista').append(structure);
			} else
				count -= 1;
		});

		if (count <= 0) {
			jQuery('.card-solicitacoes .card-content').html('Não há solicitações disponíveis no momento.');
		}
	};

	util.parseData.aaccDetalhes = function (data) {
		if (!data || typeof data !== 'object')
			throw new Error('[util.parseData.aaccDetalhes] Os dados devem estar contidos em um objeto: ' + data);

		if (data.length === 0)
			TARCI.util.message({
				TITULO: 'Detalhamento de AACCs',
				TIPO: 'info',
				CONTEUDO: 'Não há nenhuma AACC registrada em seu nome.'
			});
		else {
			var aaccs = [];
			data.forEach(function (detalhe) {
				util.validate('aaccDetalhes', detalhe);
				var structure = util.template(TARCI.templates.aaccDetalhes, detalhe);
				aaccs.push(structure);
			});

			util.message({
				TITULO: 'Detalhamento de AACC',
				TIPO: 'info',
				CONTEUDO: '<table class="table modal-aacc-detalhes"><thead><tr><th>Descrição</th><th>Grupo</th><th>Horas</th></tr></thead><tbody>' + aaccs.join('') + '</tbody></table>'
			});
		}
	};
}());