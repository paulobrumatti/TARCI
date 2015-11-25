(function (TARCI) {
	TARCI.init();

	jQuery('#state-login form').on('submit', function (e) {
		e.preventDefault();
		TARCI.setState('Login', {
			login: this.login.value.replace(/\D/g, ''),
			password: this.password.value.replace(/\D/g, '')
		});
	});

	jQuery('.header-logout').on('click', function (e) {
		e.preventDefault();
		TARCI.setState('Logout');
	});

	jQuery('body').on('change', 'input', function () {
		jQuery(this).toggleClass('invalid', !!this.value && !this.checkValidity());
	});

	jQuery('body').on('click', '.modal-close, .modal-backdrop', function (e) {
		e.preventDefault();
		jQuery('body').removeClass('modal');
		setTimeout(function () {
			jQuery('.modal-container, .modal-backdrop').remove();
		}, 700);
	});

	jQuery('.card-aacc-detalhes').on('click', function (e) {
		e.preventDefault();
		TARCI.setState('DetalhesAACC');
	});

	jQuery('.card-solicitacoes-lista').on('click', 'a', function (e) {
		e.preventDefault();
		TARCI.setState('Solicitacao', jQuery(this).parent().data());
	});

	jQuery('body').on('submit', '.lbSolicitacao', function (e) {
		e.preventDefault();
		TARCI.enviarSolicitacao(this);
		jQuery('.modal-close').click();
	});

	jQuery('#fab').on('click', function () {
		util.message({
			tipo: 'info',
			titulo: 'Perguntas Frequentes',
			conteudo: '<b>1) Por quê o curso para o qual desejo solicitar mudança não aparece na lista?</b><p>R: Trocas de cursos podem ser realizados apenas dentro da mesma escola de ensino</p><br><b>2) Minha sessão caiu enquanto realizava uma consulta. Ela foi registrada?</b><p>R: Caso a solicitação seja corretamente registrada, será enviada a confirmação por email. Caso esta mensagem não tenha sido recebida, verifique sua conexão e tente novamente. Entretando, se não conseguir realizar acesso ao sistema, por gentileza dirija-se ao Atendimento ao Aluno.</p><br><b>3) Eu posso realizar a troca de sala?</b><p>R: É possível realizar a mudança de sala, porém a mudança depende da existência de salas com disponibilidade para receber novos alunos.</p><br><b>4) Não consigo encontrar a solicitação que necessito realizar. O que fazer?</b><p>R: Todas as solicitações possuem um período específico a serem feitas. Com o prazo finalizado, as solicitações deixam de ser exibidas, uma vez que o setor responsável não mais atenderá a demanda.</p><br><b>5) Qual o pré-requisito para solicitar a dispensa de uma disciplina?</b><p>R: Para requisitar a dispensa, é necessário que não a tenha cursado..</p><br><b>6) Qual o procedimento após o envio das solicitações?</b><p>R: A solicitação é encaminhada diretamente ao setor de Atendimento ao Aluno, sendo assim, toda e quaisquer dúvida deverá ser direcionada diretamente a eles.</p><br>'
		});
	});
}(window.TARCI))