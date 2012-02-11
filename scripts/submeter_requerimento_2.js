/////////////////////////////////
// associa formação realizada à disciplina
/////////////////////////////////
function associaFormacaoRealizada(id_formacao, aluno)
{
	//alert(id_formacao);
	var id_uc = validaRadioSeleccionado("rb_uc");
	
	// se a unidade curricular está slecionada
	if (id_uc)
	{
		// adiciona às disciplinas as formações realizadas
		var y = novasFormacoes.getElementsByTagName("FORMATION")[id_formacao];
		
		// coloca em x as disciplinas selecionadas
		var x = novasDisciplinas.getElementsByTagName("CLASS")[id_uc];
		
		// faz o append da formação à uc
		x.appendChild(y.cloneNode(true));
	}
	
	// atualiza a lista
	geraListaFormacoesAssociadas(aluno, id_uc);
}

/////////////////////////////////
// gera uma combobox com as formações
/////////////////////////////////
function geraComboFormacoes(aluno)
{
	var combo;
	var n_aluno;
	var uc;
	var className;
	var arFormacoes = new Array();
	
	
	// carrega unidades curriculares do ficheiro XML
	var formacoes = novasFormacoes.getElementsByTagName("FORMATION");
	
	// percorre os alunos até encontrar o atual e depois preenche o array com
	// as disciplinas do aluno
	for (i = 0; i < formacoes.length; i++ )
	{
		var nomeFormacao = formacoes[i].getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue;
		arFormacoes[arFormacoes.length] = i + ";" + nomeFormacao;
	}	
	
	combo = populateComboBox('', 'comboFormacoesRealizadas', 'Formações realizadas', arFormacoes, '');
	
	return combo;
}

/////////////////////////////////
// Gera a lista das formações realizadas
/////////////////////////////////
function geraListaFormacoesAssociadas(aluno, id_uc)
{
	var formAdicionarFormacaoRealizada;
	var formFormacoesAssociadas;
	
	// gera a combo dos anexos submetidos
	var comboFormacoesRealizadas = geraComboFormacoes(aluno);
	
	if (!id_uc)
	{
		id_uc = validaRadioSeleccionado("rb_uc");
	}
	
	// gera a form para adicionar unidades curriculares
	formAdicionarFormacaoRealizada = '' +
		'<fieldset id="listaAnexos">' +
			'<legend>Lista de formações associadas</legend>' +
			'<fieldset id="AssociarFormacoes">' + 
				'<legend>Associar nova formação realizada</legend>' +
				'<form name="associar_formacao">' +
					comboFormacoesRealizadas +
					'<br />' +
					'<input type="button" value="Associar" onclick="associaFormacaoRealizada(comboFormacoesRealizadas.value,' + aluno + ')"/>' +
				'</form>' +
			'</fieldset>' + 
			'<br />';
	
	// gera a form das unidades curriculares adicionadas
	formFormacoesAssociadas = '' +
			'<form name="lista_formacoes_associadas">' +
				'<table>' +
					'<tr>' +
						'<th>Formações Associadas</th>' +
						'<th>&nbsp;</th>' +
					'</tr>'
				
				if (novasDisciplinas && id_uc) {
					//alert('começou a gerar a lista de disciplinas');
					var disciplina = novasDisciplinas.getElementsByTagName("CLASS")[id_uc];
					var formacoes = disciplina.getElementsByTagName("FORMATION");
					
					for (i=0;i<formacoes.length;i++)
					{
						formFormacoesAssociadas = formFormacoesAssociadas + '<tr>' +
							'<td>' + formacoes[i].getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue + '</td>' +
							'<td><input type="radio" id="rb_uc" name="rb_uc" value="' + i + '"  /></td></tr>'
					}
				}
				
				formFormacoesAssociadas = formFormacoesAssociadas +
				'</table><br>' +
				'<input type="button" value="Remover" onclick="removerFormacaoRealizada(' + aluno + ')"/><br>' +
			'</form>'
	
	// escreve no ecrã
	document.getElementById("lista_formacoes_associadas").innerHTML = formAdicionarFormacaoRealizada + formFormacoesAssociadas + '</fieldset>';
}

////////////////////////////////////////
// Remove uma unidade curricular da lista
////////////////////////////////////////
function removerUnidadeCurricular(aluno)
{
	var id_uc = validaRadioSeleccionado("rb_uc");
	var nome;
	
	// se o id da unidade curricular existir e houverem disciplinas carregadas remove-a
	if (id_uc && novasDisciplinas)
	{
		var y = novasDisciplinas.getElementsByTagName("CLASS")[id_uc];
		y.parentNode.removeChild(y);
	}
	
	// atualiza a lista de formações
	geraListaUnidadesCurriculares(aluno);
}

/////////////////////////////////
// Adicionar a unidade curricular à lista de UC's escolhida
/////////////////////////////////
function adicionaUnidadeCurricular(unidadeCurricular, aluno)
{
	var novaDisciplina = temp.createElement("CLASS");
	novaDisciplina.appendChild(temp.createElement("NAME"));
	
	// atualiza os valores
	novaDisciplina.getElementsByTagName("NAME")[0].appendChild(temp.createTextNode(unidadeCurricular));
	
	// adicionar a nova disciplina a lista de disciplinas globais
	novasDisciplinas.appendChild(novaDisciplina);

	// atualiza a lista
	geraListaUnidadesCurriculares(aluno);
}

/////////////////////////////////
// gera uma combobox com os anexos submetidos
/////////////////////////////////
function geraComboUnidadesCurriculares(aluno)
{
	var combo;
	var n_aluno;
	var uc;
	var className;
	
	
	// se o array ainda não foi preenchido
	if (unidadesCurriculares.length <= 0)
	{
		// carrega unidades curriculares do ficheiro XML
		var alunos = global_xmlUnidadesCurriculares.getElementsByTagName("STUDENT");
		
		// percorre os alunos até encontrar o atual e depois preenche o array com
		// as disciplinas do aluno
		for (i = 0; i < alunos.length; i++ )
		{
			n_aluno = alunos[i].getElementsByTagName("NUMBER")[0].childNodes[0].nodeValue;
			
			// se o aluno for o mesmo preenche a combobox das disciplinas com as unidades curriculares em
			// que o aluno se encontra matriculado
			if (n_aluno == aluno)
			{
				// 
				uc = alunos[i].getElementsByTagName("CLASS");
				
				for (y=0; y<uc.length;y++)
				{
					className = uc[y].childNodes[0].nodeValue;
					
					// adicionar as unidades curriculares ao array
					unidadesCurriculares[unidadesCurriculares.length] = className + ";" + className;
				}
			}
		}	
	}
	
	combo = populateComboBox('', 'comboUnidadesCurriculares', 'Unidades Curriculares', unidadesCurriculares, '');
	
	return combo;
}

/////////////////////////////////
// Gera a lista das disciplinas de um determinado aluno
/////////////////////////////////
function geraListaUnidadesCurriculares(aluno)
{
	var formListaUnidadesCurriculares;
	var formAdicionarUnidadeCurricular;
	var comboAnexosSubmetidos;
	
	// gera a combo dos anexos submetidos
	comboUnidadesCurriculares = geraComboUnidadesCurriculares(aluno);
	
	// gera a form para adicionar unidades curriculares
	formAdicionarUnidadeCurricular = '' +
		'<fieldset id="listaAnexos">' +
			'<legend>Lista de unidades curriculares</legend>' +
			'<fieldset id="AdicionarAnexos">' + 
				'<legend>Adicionar nova unidade curricular</legend>' +
				'<form name="adicionar_formacao">' +
					comboUnidadesCurriculares +
					'<br />' +
					'<input type="button" value="Adicionar" onclick="adicionaUnidadeCurricular(comboUnidadesCurriculares.value, ' + aluno + ')"/>' +
				'</form>' +
			'</fieldset>' + 
			'<br />';
	
	// gera a form das unidades curriculares adicionadas
	formUnidadesCurricularesAdicionadas = '' +
			'<form name="lista_unidades_curriculares">' +
				'<table>' +
					'<tr>' +
						'<th>Unidade curricular</th>' +
						'<th>&nbsp;</th>' +
					'</tr>'
				
				if (novasDisciplinas && aluno) {
					//alert('começou a gerar a lista de disciplinas');
					var disciplinas = novasDisciplinas.getElementsByTagName("NAME");
					
					for (i=0;i<disciplinas.length;i++)
					{
						formUnidadesCurricularesAdicionadas = formUnidadesCurricularesAdicionadas + '<tr>' +
							'<td>' + disciplinas[i].childNodes[0].nodeValue + '</td>' +
							'<td><input type="radio" id="rb_uc" name="rb_uc" value="' + i + '" onclick="geraListaFormacoesAssociadas()" /></td></tr>'
					}
				}
				
				formUnidadesCurricularesAdicionadas = formUnidadesCurricularesAdicionadas +
				'</table><br>' +
				'<input type="button" value="Remover" onclick="removerUnidadeCurricular(' + aluno + ')"/><br>' +
			'</form>'
	
	// escreve no ecrã
	document.getElementById("lista_unidades_curriculares").innerHTML = formAdicionarUnidadeCurricular + formUnidadesCurricularesAdicionadas + '</fieldset>';
}

/////////////////////////////////
// adiciona os objetos ao ecrã correspondentes ao passo 2
/////////////////////////////////
function desenhaPasso2()
{
	const TITULO_PASSO2 = "Submeter Requerimento - Passo 2";
	var aluno = readCookie('number');
	
	//lista_formacao_realizada
	geraListaUnidadesCurriculares(aluno);
	
	//lista_anexos_associados
	geraListaFormacoesAssociadas(aluno);
	
	// adiciona passos ao documento
	document.getElementById("passos").innerHTML = geraPassos(1);
	
	// adiciona ao documento o título
	document.getElementById("titulo").innerHTML = TITULO_PASSO2;
							
}