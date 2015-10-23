var data1 = {
	"materias": [{
		"professor": "OSWALDO ORTIZ FERNANDES JUNIOR",
		"materia": "INTELIGÊNCIA ARTIFICIAL E COMPUTACIONAL",
		"faltas": 3,
		"limite_faltas": 20,
		"p1": 5.6,
		"p2": -1,
		"p3": -1,
		"media": -1
	}, {
		"professor": "RICARDO RESENTE DE MENDONÇA",
		"materia": "COMPUTAÇÃO GRÁFICA E PROCESSAMENTO DE IMAGEM",
		"faltas": 0,
		"limite_faltas": 20,
		"p1": 6,
		"p2": 4,
		"p3": -1,
		"media": 5
	}, {
		"professor": "ARIOVALDO DIAS DE OLIVEIRA",
		"materia": "PROJETO E ANÁLISE DE ALGORÍTMOS",
		"faltas": 8,
		"limite_faltas": 20,
		"p1": 7,
		"p2": -1,
		"p3": -1,
		"media": -1
	}, {
		"professor": "CLAUDIO BURANELO",
		"materia": "PROGRAMAÇÃO DE DISPOSITIVOS MÓVEIS",
		"faltas": 4,
		"limite_faltas": 10,
		"p1": 3,
		"p2": 4,
		"p3": -1,
		"media": 5
	}, {
		"professor": "CLAUDIO CURA JUNIOR",
		"materia": "TÓPICOS ESPECIAIS EM COMPUTAÇÃO II",
		"faltas": 0,
		"limite_faltas": 10,
		"p1": 9,
		"p2": -1,
		"p3": -1,
		"media": -1
	}, {
		"professor": "FABIO SIQUEIRA NETO",
		"materia": "ROBÓTICA E AUTOMAÇÃO",
		"faltas": 2,
		"limite_faltas": 20,
		"p1": 10,
		"p2": 5,
		"p3": -1,
		"media": 7.5
	}],
	"aacc": {
		"recentes": [{
			"nome": "Os Vingadores",
			"horas": 4
		}, {
			"nome": "Cine USCSs",
			"horas": 15
		}, {
			"nome": "Defesa da Dissertação - Mestrado",
			"horas": 10
		}, {
			"nome": "Curso de Cobol",
			"horas": 45
		}],
		"horas_realizadas": 74,
		"horas_necessarias": 116
	}
};

var data2 = {
	"MATERIAS": [{
		"professor": "DENISE SCTOLO",
		"materia": "ADMINISTRAÇÃO III",
		"faltas": 2,
		"limite_faltas": 10,
		"p1": 6,
		"p2": -1,
		"p3": -1,
		"media": -1
	}, {
		"professor": "SAMARIS RAMIRO PEREIRA",
		"materia": "AUDITORIA,SEGURANÇA E AVAL. DE SISTEMAS",
		"faltas": 6,
		"limite_faltas": 20,
		"p1": 2,
		"p2": -1,
		"p3": -1,
		"media": -1
	}, {
		"professor": "PAULO KENSKE NONAKA",
		"materia": "GOVERNANÇA EM TI",
		"faltas": 2,
		"limite_faltas": 20,
		"p1": 4,
		"p2": -1,
		"p3": -1,
		"media": -1,
	}, {
		"professor": "ELIAS ESTEVAO GOULART",
		"materia": "PLANEJAMENTO DE SISTEMAS DE INFORMAÇÃO",
		"faltas": 6,
		"limite_faltas": 20,
		"p1": 9,
		"p2": -1,
		"p3": -1,
		"media": -1
	}, {
		"professor": "EUGEN ERICH PIEKNY",
		"materia": "METODOLOGIAS, TÉCNICAS E FERRAMENTAS DE APTD",
		"faltas": 0,
		"limite_faltas": 20,
		"p1": 6,
		"p2": -1,
		"p3": -1,
		"media": -1
	}, {
		"professor": "RUBENS SALES",
		"materia": "MÉTODOS ÁGEIS DE DESENVOLVIMENTO DE SISTEMAS",
		"faltas": 4,
		"limite_faltas": 20,
		"p1": 4,
		"p2": -1,
		"p3": -1,
		"media": -1
	}, {
		"professor": "SAMARIS RAMIRO PEREIRA",
		"materia": "AUDITORIA,SEGURANÇA E AVAL. DE SISTEMAS",
		"faltas": 2,
		"limite_faltas": 20,
		"p1": 4,
		"p2": -1,
		"p3": -1,
		"media": -1
	}, {
		"professor": "RENATO CARIOCA DUARTE",
		"materia": "TÓPICOS ESPECIAIS EM COMPUTAÇÃO II",
		"faltas": 2,
		"limite_faltas": 20,
		"p1": 3,
		"p2": -1,
		"p3": -1,
		"media": -1
	}],
	"aacc": {
		"recentes": [{
			"nome": "Os Vingadores",
			"horas": 4
		}, {
			"nome": "Cine USCSs",
			"horas": 15
		}, {
			"nome": "Defesa da Dissertação - Mestrado",
			"horas": 10
		}, {
			"nome": "Curso de Cobol",
			"horas": 45
		}],
		"horas_REALIZADAS": 74,
		"horas_NECESSARIAS": 116
	}
};

var dataSolicitacoes = [{
	"id": "mudanca-de-sala",
	"nome": "Mudança de Sala",
	"data_inicial": "01/07/2015",
	"data_final": "31/12/2015",
	"campos": []
}, {
	"id": "mudanca-de-periodo",
	"nome": "Mudança de Período",
	"data_inicial": "01/07/2015",
	"data_final": "31/12/2015",
	"campos": []
}, {
	"id": "mudanca-de-curso",
	"nome": "Mudança de Curso",
	"data_inicial": "01/07/2015",
	"data_final": "31/12/2015",
	"campos": [{
		"nome": "Curso",
		"filtro": "curso-mesma-escola"
	}]
}, {
	"id": "dispensa-de-disciplina",
	"nome": "Dispensa de Disciplina",
	"data_inicial": "01/07/2015",
	"data_final": "31/12/2015",
	"campos": [{
		"nome": "Disciplina",
		"filtro": "disciplinas-semestre-atual"
	}]
}, {
	"id": "nao-deve-exibir",
	"nome": "Não Deve Exibir",
	"data_inicial": "01/01/2015",
	"data_final": "31/06/2015",
	"campos": []
}, {
	"id": "nao-deve-exibir2",
	"nome": "Não Deve Exibir2",
	"data_inicial": "01/07/2016",
	"data_final": "31/12/2016",
	"campos": []
}];

var dataAACC = [{
	"nome": "Os Vingadores",
	"grupo": "Cultura",
	"horas": 4
}, {
	"nome": "Cine USCSs",
	"grupo": "Cultura",
	"horas": 15
}, {
	"nome": "Defesa da Dissertação - Mestrado",
	"grupo": "Palestra",
	"horas": 10
}, {
	"nome": "Curso de Cobol",
	"grupo": "Cursos",
	"horas": 5
}, {
	"nome": "Curso de Objective-C",
	"grupo": "Cursos",
	"horas": 15
}, {
	"nome": "Curso de Inglês",
	"grupo": "Cursos",
	"horas": 10
}, {
	"nome": "L\"Illustre Molière",
	"grupo": "Cultura",
	"horas": 5
}, {
	"nome": "Curso de Francês",
	"grupo": "Cultura",
	"horas": 10
}];

var respostasServidor1 = {
	"salas-mesmo-curso": {
		"opcoes": []
	},
	"periodos-mesmo-curso": {
		"opcoes": [{
			"id": "m",
			"label": "Manhã"
		}]
	},
	"curso-mesma-escola": {
		"opcoes": [{
			"id": "si",
			"label": "Sistemas de Informação (Bacharelado)"
		}, {
			"id": "gti",
			"label": "Gestão da Tecnologia da Informação (Tecnólogo)"
		}, {
			"id": "rc",
			"label": "Redes de Computadores (Tecnólogo)"
		}, {
			"id": "spi",
			"label": "Sistemas para Internet (Web Design) (Tecnólogo)"
		}]
	},
	"disciplinas-semestre-atual": {
		"opcoes": [{
			"id": "08IAC",
			"label": "INTELIGÊNCIA ARTIFICIAL E COMPUTACIONAL"
		}, {
			"id": "08CGPI",
			"label": "COMPUTAÇÃO GRÁFICA E PROCESSAMENTO DE IMAGEM"
		}, {
			"id": "08PAA",
			"label": "PROJETO E ANÁLISE DE ALGORÍTMOS"
		}, {
			"id": "08PDM",
			"label": "PROGRAMAÇÃO DE DISPOSITIVOS MÓVEIS"
		}, {
			"id": "08TEC2",
			"label": "TÓPICOS ESPECIAIS EM COMPUTAÇÃO II"
		}, {
			"id": "08RA",
			"label": "ROBÓTICA E AUTOMAÇÃO"
		}]
	}
};

var respostasServidor2 = {
	"salas-mesmo-curso": {
		"opcoes": []
	},
	"periodos-mesmo-curso": {
		"opcoes": [{
			"id": "m",
			"label": "Manhã"
		}]
	},
	"curso-mesma-escola": {
		"opcoes": [{
			"id": "cc",
			"label": "Ciências da Computação (Bacharelado)"
		}, {
			"id": "gti",
			"label": "Gestão da Tecnologia da Informação (Tecnólogo)"
		}, {
			"id": "rc",
			"label": "Redes de Computadores (Tecnólogo)"
		}, {
			"id": "spi",
			"label": "Sistemas para Internet (Web Design) (Tecnólogo)"
		}]
	},
	"disciplinas-semestre-atual": {
		"opcoes": [{
			"id": "08ADM3",
			"label": "ADMINISTRAÇÃO III"
		}, {
			"id": "08ASAS",
			"label": "AUDITORIA,SEGURANÇA E AVAL. DE SISTEMAS"
		}, {
			"id": "08PGT",
			"label": "GOVERNANÇA EM TI"
		}, {
			"id": "08PSI",
			"label": "PLANEJAMENTO DE SISTEMAS DE INFORMAÇÃO"
		}, {
			"id": "08MTFA",
			"label": "METODOLOGIAS, TÉCNICAS E FERRAMENTAS DE APTD"
		}, {
			"id": "08MADS",
			"label": "MÉTODOS ÁGEIS DE DESENVOLVIMENTO DE SISTEMAS"
		}, {
			"id": "08TEC2",
			"label": "TÓPICOS ESPECIAIS EM COMPUTAÇÃO II"
		}]
	}
};

var dataUsuarios = [{
		"matricula": "596874",
		"cpf": "57455235739", //1
		"adimplencia": true
	}, {
		"matricula": "564245",
		"cpf": "08568724400", //1
		"adimplencia": false
	}, {
		"matricula": "1243252",
		"cpf": "31224936671", //2
		"adimplencia": true
	}, {
		"matricula": "553388",
		"cpf": "36527940874", //1
		"adimplencia": true
	}, {
		"matricula": "552976",
		"cpf": "40904700801", //1
		"adimplencia": true
	}, {
		"matricula": "552943",
		"cpf": "41127087851", //2
		"adimplencia": true
	}, {
		"matricula": "960252",
		"cpf": "44220578803", //2
		"adimplencia": true
	}, {
		"matricula": "958546",
		"cpf": "35653551821", //2
		"adimplencia": true
	}
];