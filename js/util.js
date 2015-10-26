(function () {
	"use strict";
	var util = window.util = {};
	var body = util.body = jQuery("body");
	var loadingScreenElement = util.loadingScreenElement = jQuery('#loading-screen');
	var loadingScreenQuantity = util.loadingScreenQuantity = 0;

	util.find = function find(selector, scope) {
		if (!scope) scope = document;
		return document.querySelectorAll(selector);
	};

	util.toArray = function toArray(arrayLike) {
		return Array.prototype.splice.call(arrayLike);
	};

	util.send = function send(settings) {
		util.loadingScreen(true);
		console.log(settings);
		setTimeout(function () {
			util.loadingScreen(false);
			var response = false;
			switch (settings.url) {
			case 'login':
				if (settings.data.login === '123123')
					return util.message({
						titulo: 'Falha na Conexão',
						tipo: 'error',
						conteudo: 'O servidor não está respondendo no momento. Tente novamente mais tarde.'
					});

				var user = dataUsuarios.filter(function (user) {
					return user.matricula === settings.data.login;
				})[0];

				if (!user)
					return util.message({
						tipo: 'error',
						titulo: 'Falha no Login',
						conteudo: 'Matrícula não encontrada. Por favor, verifique os dados e tente novamente.'
					});

				if (user.cpf !== settings.data.password)
					return util.message({
						tipo: 'error',
						titulo: 'Falha no Login',
						conteudo: 'O CPF digitado é inválido. Por favor, verifique seus dados e tente novamente.'
					});

				if (!user.adimplencia)
					return util.message({
						tipo: 'error',
						titulo: 'Falha no Login',
						conteudo: 'Aluno inadimplente, o acesso ao sistema foi negado.'
					});

				response = dataUsuarios1.indexOf(user.matricula) >= 0 ? data1 : data2;
				break;
			case 'aacc-detalhes':
				response = dataAACC;
				break;
			case 'solicitacao-campos':
				var campos = [];
				var dataCampos = dataUsuarios1.indexOf(TARCI.data.user.login) >= 0 ? dataCampos1 : dataCampos2;
				settings.data.campos.forEach(function (campo) {
					campos.push(jQuery.extend({}, campo, {
						opcoes: dataCampos[campo.id]
					}));
				});

				response = jQuery.extend({}, settings.data, {
					campos: campos
				});
				break;
			case 'solicitacao-enviar':
				response = {
					protocolo: settings.data.horario
				};
			}

			if (response) {
				console.log(response);
				return settings.onSuccess(response);
			}
		}, 1000);

		/* Em caso de implementação, remova o código abaixo e descomente o código abaixo dele.
		 * Ele cobrirá qualquer caso previsto no plano de migração.

		var ajaxPromise = jQuery.getJSON(TARCI.baseUrl + settings.url, settings.data || {}, function (response) {
			if (response.type !== 'success')
				return util.message({
					titulo: response.titulo || 'Desculpe',
					tipo: response.tipo || 'error',
					conteudo: response.conteudo || 'Houve um problema no servidor. Tente novamente mais tarde.'
				});

			clearTimeout(ajaxLifetime);
			if (typeof settings.onSuccess === 'function')
				settings.onSuccess(response.data);
		}).fail(function () {
			return util.message({
				titulo: 'Desculpe',
				tipo: 'error',
				conteudo: 'Houve um problema no servidor. Tente novamente mais tarde.'
			});
		}).always(function () {
			util.loadingScreen(false);
		});

		var ajaxLifetime = setTimeout(function () {
			ajaxPromise.abort();
			util.message({
				conteudo: 'O servidor não está respondendo no momento. Tente novamente mais tarde.',
				titulo: 'Falha no servidor',
				tipo: 'error'
			});
		}, settings.timeout | 0 || TARCI.baseTimeout);
		 */
	};

	util.loadingScreen = function loadingScreen(show) {
		if (show === true && loadingScreenQuantity === 0)
			body.addClass('loading-show');

		loadingScreenQuantity += show ? 1 : -1;

		if (show === false && loadingScreenQuantity === 0)
			body.removeClass('loading-show');
	};

	util.message = function message(obj) {
		var structure = util.template(TARCI.templates.modal, obj);
		body.append(structure);
		setTimeout(function () {
			body.addClass('modal');
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
		'professor': 'string',
		'materia': 'string',
		'faltas': 'number',
		'limite_faltas': 'number',
		'p1': 'number',
		'p2': 'number',
		'p3': 'number',
		'media': 'number'
	};

	util.validate.aaccVisaoGeral = {
		'horas_realizadas': 'number',
		'horas_necessarias': 'number'
	};

	util.validate.aaccRecentes = {
		'nome': 'string',
		'horas': 'number'
	};

	util.validate.aaccDetalhes = {
		'nome': 'string',
		'grupo': 'string',
		'horas': 'number'
	};

	util.validate.solicitacao = {
		'id': 'string',
		'nome': 'string',
		'data_inicial': 'string',
		'data_final': 'string'
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
			['p1', 'p2', 'p3', 'media'].forEach(function (key) {
				if (materia[key] < 0 || materia[key] > 10)
					materia[key] = '-';
			});
			['faltas', 'limite_faltas'].forEach(function (key) {
				if (materia[key] < 0 || isNaN(materia[key]))
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
		data.porcentagem_realizada = 100 * (data.horas_realizadas / data.horas_necessarias);
		data.porcentagem_necessaria = 100 * (1 - (data.horas_realizadas / data.horas_necessarias));
		var structure = util.template(TARCI.templates.aaccVisaoGeral, data);
		jQuery('.card-aacc-content').append(structure);
	};

	util.parseData.aaccRecentes = function (data) {
		if (!data || typeof data.length !== 'number')
			throw new Error('[util.parseData.aaccRecentes] Os dados devem estar contidos em um array: ' + data);

		data.splice(0, 3).forEach(function (recente) {
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
			try {
				util.validate('solicitacao', solicitacao);

				['data_inicial', 'data_final'].forEach(function (key) {
					var split = solicitacao[key].split('/');
					solicitacao[key] = new Date(split[2], split[1], split[0]);
				});
				var today = new Date();
				if (today > solicitacao.data_inicial && today < solicitacao.data_final) {
					var structure = util.template(TARCI.templates.solicitacoes, solicitacao);
					jQuery(structure).data(solicitacao).appendTo('.card-solicitacoes-lista');
				} else
					count -= 1;
			} catch ($$e) {
				count -= 1;
			}
		});

		if (count <= 0) {
			jQuery('.card-solicitacoes .card-content').html('Não há solicitações disponíveis no momento.');
		}
	};

	util.parseData.aaccDetalhes = function (data) {
		if (!data || typeof data !== 'object')
			throw new Error('[util.parseData.aaccDetalhes] Os dados devem estar contidos em um objeto: ' + data);

		if (data.length === 0)
			util.message({
				titulo: 'Detalhamento de AACCs',
				tipo: 'info',
				conteudo: 'Não há nenhuma AACC registrada em seu nome.'
			});
		else {
			var aaccs = [];
			data.forEach(function (detalhe) {
				util.validate('aaccDetalhes', detalhe);
				var structure = util.template(TARCI.templates.aaccDetalhes, detalhe);
				aaccs.push(structure);
			});

			util.message({
				titulo: 'Detalhamento de AACC',
				tipo: 'info',
				conteudo: '<table class="table modal-aacc-detalhes"><thead><tr><th>Descrição</th><th>Grupo</th><th>Horas</th></tr></thead><tbody>' + aaccs.join('') + '</tbody></table>'
			});
		}
	};

	util.parseData.solicitacao = function (data) {
		if (!data || typeof data !== 'object')
			throw new Error('[util.parseData.solicitacao] Os dados devem estar contidos em um objeto: ' + data);

		util.validate('solicitacao', data);

		var today = new Date();
		if (today > data.data_inicial && today < data.data_final) {
			data.campos = data.campos.map(function (campo) {
				return '<select name="' + campo.id + '" class="form-field">' + campo.opcoes.map(function (opcao) {
					return '<option value="' + opcao.id + '">' + opcao.label + '</option>';
				}).join('') + '</select><label class="form-placeholder" for="' + campo.id + '">' + campo.nome + '</label>';
			}).join('');

			util.message({
				titulo: data.nome,
				tipo: 'info',
				conteudo: util.template(TARCI.templates.lbSolicitacao, data)
			});
		} else util.message({
			titulo: data.nome,
			tipo: 'info',
			conteudo: "A requisição solicitada não está disponível no momento. Por favor, dirija-se ao Atendimento ao Aluno para futuras instruções."
		});

	};
}());