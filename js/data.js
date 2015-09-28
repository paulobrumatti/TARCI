var data = {
	"MATERIAS": [{
		"PROFESSOR": "OSWALDO ORTIZ FERNANDES JUNIOR",
		"MATERIA": "INTELIGÊNCIA ARTIFICIAL E COMPUTACIONAL",
		"FALTAS": 3,
		"LIMITE_FALTAS": 20,
		"P1": 5.6,
		"P2": -1,
		"P3": -1,
		"MEDIA": -1
	}, {
		"PROFESSOR": "RICARDO RESENTE DE MENDONÇA",
		"MATERIA": "COMPUTAÇÃO GRÁFICA E PROCESSAMENTO DE IMAGEM",
		"FALTAS": 0,
		"LIMITE_FALTAS": 20,
		"P1": 6,
		"P2": 4,
		"P3": -1,
		"MEDIA": 5
	}, {
		"PROFESSOR": "ARIOVALDO DIAS DE OLIVEIRA",
		"MATERIA": "PROJETO E ANÁLISE DE ALGORÍTMOS",
		"FALTAS": 8,
		"LIMITE_FALTAS": 20,
		"P1": 7,
		"P2": -1,
		"P3": -1,
		"MEDIA": -1
	}, {
		"PROFESSOR": "CLAUDIO BURANELO",
		"MATERIA": "PROGRAMAÇÃO DE DISPOSITIVOS MÓVEIS",
		"FALTAS": 4,
		"LIMITE_FALTAS": 10,
		"P1": 3,
		"P2": 4,
		"P3": -1,
		"MEDIA": 5
	}, {
		"PROFESSOR": "CLAUDIO CURA JUNIOR",
		"MATERIA": "TÓPICOS ESPECIAIS EM COMPUTAÇÃO II",
		"FALTAS": 0,
		"LIMITE_FALTAS": 10,
		"P1": 9,
		"P2": -1,
		"P3": -1,
		"MEDIA": -1
	}, {
		"PROFESSOR": "FABIO SIQUEIRA NETO",
		"MATERIA": "ROBÓTICA E AUTOMAÇÃO",
		"FALTAS": 2,
		"LIMITE_FALTAS": 20,
		"P1": 10,
		"P2": 5,
		"P3": -1,
		"MEDIA": 7.5
	}],
	"AACC": {
		"RECENTES": [{
			'NOME': 'Os Vingadores',
			'HORAS': 4
		}, {
			'NOME': 'Cine USCSs',
			'HORAS': 15
		}, {
			'NOME': 'Defesa da Dissertação - Mestrado',
			'HORAS': 10
		}, {
			'NOME': 'Curso de Cobol',
			'HORAS': 45
		}],
		"HORAS_REALIZADAS": 74,
		"HORAS_NECESSARIAS": 116
	}
};

var dataSolicitacoes = [{
	'ID': 'mudanca-de-sala',
	'NOME': 'Mudança de Sala',
	'DATA_INICIAL': '01/07/2015',
	'DATA_FINAL': '31/12/2015'
}, {
	'ID': 'mudanca-de-periodo',
	'NOME': 'Mudança de Período',
	'DATA_INICIAL': '01/07/2015',
	'DATA_FINAL': '31/12/2015'
}, {
	'ID': 'mudanca-de-curso',
	'NOME': 'Mudança de Curso',
	'DATA_INICIAL': '01/07/2015',
	'DATA_FINAL': '31/12/2015'
}, {
	'ID': 'dispensa-de-disciplina',
	'NOME': 'Dispensa de Disciplina',
	'DATA_INICIAL': '01/07/2015',
	'DATA_FINAL': '31/12/2015'
}, {
	'ID': 'nao-deve-exibir',
	'NOME': 'Não Deve Exibir',
	'DATA_INICIAL': '01/01/2015',
	'DATA_FINAL': '31/06/2015'
}, {
	'ID': 'nao-deve-exibir2',
	'NOME': 'Não Deve Exibir2',
	'DATA_INICIAL': '01/07/2016',
	'DATA_FINAL': '31/12/2016'
}];

var dataAACC = [{
	'NOME': 'Os Vingadores',
	'GRUPO': 'Cultura',
	'HORAS': 4
}, {
	'NOME': 'Cine USCSs',
	'GRUPO': 'Cultura',
	'HORAS': 15
}, {
	'NOME': 'Defesa da Dissertação - Mestrado',
	'GRUPO': 'Palestra',
	'HORAS': 10
}, {
	'NOME': 'Curso de Cobol',
	'GRUPO': 'Cursos',
	'HORAS': 45
}];