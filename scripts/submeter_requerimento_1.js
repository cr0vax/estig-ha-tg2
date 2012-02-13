/////////////////////////////////
// Adiciona uma formação
/////////////////////////////////
function adicionarFormacao(descricao_formacao, tipo_formacao)
{
	
	// cria a nova formação
	novaFormacao = temp.createElement("FORMATION");
	novaFormacao.appendChild(temp.createElement("TYPE"));
	novaFormacao.appendChild(temp.createElement("DESCRIPTION"));
		
	// atualiza os valores
	novaFormacao.getElementsByTagName("TYPE")[0].appendChild(temp.createTextNode(tipo_formacao));
	novaFormacao.getElementsByTagName("DESCRIPTION")[0].appendChild(temp.createTextNode(descricao_formacao));
	novasFormacoes.appendChild(novaFormacao);
	
	// atualiza a lista
	geraListaFormacaoRealizada();
}

/////////////////////////////////
// gera uma combobox com os anexos submetidos
/////////////////////////////////
function geraComboAnexosSubmetidos()
{
	var combo;
	
	combo = populateComboBox('', 'comboAnexosSubmetidos', 'Anexos', anexosSubmetidos, '');
	
	return combo;
}

/////////////////////////////////
// gera uma combobox com os tipos de formação
/////////////////////////////////
function geraComboTiposFormacao()
{
	var campos = new Array();
	var combo;
	
		campos[0] = 'A;A - Formação Universitária';
		campos[1] = 'B;B - Curso de Especialização';
		campos[2] = 'C;C - Formação Pós-secundária';
		campos[3] = 'D;D - Experiência Profissional';
		campos[4] = 'E;E - Outra Formação';
		
		combo = populateComboBox('', 'comboTipoFormacao', 'Tipo', campos, '');

	return combo;
}

////////////////////////////////////////
// Carrega o anexo seleccionado
////////////////////////////////////////
function carregaAnexo(ficheiro, descricao_anexo)
{
	// verificar se os valores foram passados corretamente
	if (ficheiro && descricao_anexo)
	{
		// carrega anexo
		anexosSubmetidos[anexosSubmetidos.length] = ficheiro + ";" + descricao_anexo;
		
		// atualiza a form
		geraListaAnexosAssociados();
	}
}

////////////////////////////////////////
// Associa Anexo é formação seleccionada
////////////////////////////////////////
function associaAnexo(anexo)
{
	var id_formacao = validaRadioSeleccionado("rb_formacao");
	
	if (!id_formacao)
	{
		alert('tem de selecionar uma formação!');
		return;
	}
	
	var z = document.getElementsByName("comboAnexosSubmetidos");
	var descricaoAnexo = z[0].options[z[0].selectedIndex].text
	
	var novoGrupoAnexos = temp.createElement("DOCS");
	var novoAnexo = temp.createElement("DOC");
	
	novoAnexo.appendChild(temp.createElement("FILENAME"));
	novoAnexo.appendChild(temp.createElement("DESCRIPTION"));
	
	// atualiza os valores
	novoAnexo.getElementsByTagName("FILENAME")[0].appendChild(temp.createTextNode(anexo));
	novoAnexo.getElementsByTagName("DESCRIPTION")[0].appendChild(temp.createTextNode(descricaoAnexo));
	
	novoGrupoAnexos.appendChild(novoAnexo);
	novasFormacoes.getElementsByTagName("FORMATION")[id_formacao].appendChild(novoGrupoAnexos);
	
	// atualiza a lista
	geraListaAnexosAssociados(id_formacao);
}

////////////////////////////////////////
// Gera a form dos anexos associados
////////////////////////////////////////
function geraListaAnexosAssociados(formacao)
{
	var formListaFormacaoRealizada;
	var formListaAnexosAssociados;
	var comboAnexosSubmetidos;
	
	// se não foi passada nenhuma formação especifica para validar os anexos
	// procura a formação seleccionada nos controlos
	if (!formacao)
	{
		formacao = validaRadioSeleccionado("rb_formacao");
	}
	
	// gera a combo dos anexos submetidos
	comboAnexosSubmetidos = geraComboAnexosSubmetidos();

	// gera a form para adicionar anexos
	formAdicionarAnexo = '<fieldset id="listaAnexos">' +
		'<legend>Lista de anexos associados</legend>' +
		'<fieldset id="AdicionarAnexos">' + 
			'<legend>Adicionar Anexos</legend>' +
			'<form name="adicionar_formacao">' +
				'<label for="descricao_anexo">Descrição:</label>' +
				'<input type="text" name="descricao_anexo">' +
				'<br />' +
				'<label for="ficheiro">Ficheiro:</label>' +
				'<input type="file" name="ficheiro" value="Ficheiro"/>' +
				'<br />' +
				'<input type="button" value="Carregar" onclick="carregaAnexo(ficheiro.value, descricao_anexo.value)"/>' +
			'</form>' +
		'</fieldset>' + 
		'<br />';
	
	// gera a form dos anexos associados
	formAnexosAssociados = '' +
			'<form name="anexos_associados">' +
				'<table>' +
					'<tr>' +
						'<th>Designação</th>' +
						'<th>Anexo</th>' +
						'<th>&nbsp;</th>' +
					'</tr>'
				
				if (novasFormacoes && formacao) {
					//alert('começou a gerar a lista de anexos');
					var formacoes = novasFormacoes.getElementsByTagName("FORMATION")[formacao];
					var docs = formacoes.getElementsByTagName("DOCS");
					
					for (i=0;i<docs.length;i++)
					{
						formAnexosAssociados = formAnexosAssociados + '<tr>' +
							'<td>' + docs[i].getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue + '</td>' +
							'<td>' + docs[i].getElementsByTagName("FILENAME")[0].childNodes[0].nodeValue + '</td>' +
							'<td><input type="radio" id="rb_anexo" name="rb_anexo" value="' + i + '"  /></td></tr>'
					}
				}
				
			formAnexosAssociados = formAnexosAssociados +
				'</table><br>' +
				'<input type="button" value="Remover" onclick="removerAnexo(this.value)"/><br>' +
				comboAnexosSubmetidos + '<br />' +
				'<input type="button" value="Associar" onclick="associaAnexo(comboAnexosSubmetidos.value)"/>' +
			'</form>'
	
	// escreve no ecrã
	document.getElementById("lista_anexos_associados").innerHTML = formAdicionarAnexo + formAnexosAssociados + '</fieldset>';
	
	// se há documentos anexos então ativa o botão para continuar
	if (docs) {
		if (docs.length > 0) {
			document.getElementById("botao_continuar").innerHTML = '<input type="button" onclick="submeterRequerimento(2)" value="Continuar">';
		}
		else
		{
			document.getElementById("botao_continuar").innerHTML = '<input type="button" onclick="submeterRequerimento(2)" value="Continuar" disabled="disabled">';
		}
	}
	else
	{
		document.getElementById("botao_continuar").innerHTML = '<input type="button" onclick="submeterRequerimento(2)" value="Continuar" disabled="disabled">';
	}
}

////////////////////////////////////////
// Remove um Anexo
////////////////////////////////////////
function removerAnexo()
{
	var id_formacao = validaRadioSeleccionado("rb_formacao");
	var id_anexo = validaRadioSeleccionado("rb_anexo");
	
	// se o id de formação existir e houverem formações carregadas remove-a
	if (id_formacao && novasFormacoes)
	{
		var formacoes = novasFormacoes.getElementsByTagName("FORMATION")[id_formacao];
		var docs = formacoes.getElementsByTagName("DOCS")[id_anexo];
		docs.parentNode.removeChild(docs);
	}
	
	// atualiza a lista de formações
	geraListaAnexosAssociados(id_formacao);
}


////////////////////////////////////////
// Remove uma formação da lista
////////////////////////////////////////
function removerFormacao()
{
	var id_formacao = validaRadioSeleccionado("rb_formacao");
	
	// se o id de formação existir e houverem formações carregadas remove-a
	if (id_formacao && novasFormacoes)
	{
		var y = novasFormacoes.getElementsByTagName("FORMATION")[id_formacao];
		y.parentNode.removeChild(y);
	}
	
	// atualiza a lista de formações
	geraListaFormacaoRealizada();
}

////////////////////////////////////////
// Gera a form das formações realizadas
////////////////////////////////////////
function geraListaFormacaoRealizada()
{
	var formListaFormacoes;
	var formAdicionarFormacao;
	var comboTipoFormacao;
	const titulo = "Formação realizada";
	
	// gera a combo dos tipos de formação
	comboTipoFormacao = geraComboTiposFormacao();

	// gera a form para adicionar a formação
	formAdicionarFormacao = '<fieldset id="listaFormacoes">' +
		'<legend>Lista de formações realizadas</legend>' +
		'<fieldset id="AdicionarFormacao">' + 
			'<legend>Adicionar nova formação</legend>' +
		'<form name="adicionar_formacao">' +
			'<label for="descricao_formacao">Descrição:</label><input type="text" name="descricao_formacao">' +
			'<br />' +
			comboTipoFormacao + 
			'<br />' +
			'<input type="button" value="Adicionar" onclick="adicionarFormacao(descricao_formacao.value, comboTipoFormacao.value)"/>' +
		'</form>' + 
		'</fieldset><br />';
	
	// gera a form com a lista de formações adicionadas
	formListaFormacoes = '' +
		'<form name="lista_formacoes">' +
			'<table>' +
				'<tr>' +
					'<th>Tipo</th>' +
					'<th>Formação Realizada</th>' +
					'<th></th>' +
				'</tr>'
				
				if (novasFormacoes) {
					var x = novasFormacoes.getElementsByTagName("FORMATION");

					for (i=0;i<x.length;i++) {
						
						formListaFormacoes = '<tr>' + formListaFormacoes +
							'<td>' + x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue + '</td>' +
							'<td>' + x[i].getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue + '</td>' +
							'<td><input type="radio" onclick="geraListaAnexosAssociados(this.value)" id="rb_formacao" name="rb_formacao" value="' + i + '"  /></td></tr>'
					}
				}
		formListaFormacoes = formListaFormacoes +
			'</table><br>' +
			'<input type="button" value="Remover" onclick="removerFormacao()"/>' +
		'</form>';
		
	document.getElementById("lista_formacao_realizada").innerHTML = formAdicionarFormacao + formListaFormacoes + '</fieldset>';
	
}


/////////////////////////////////
// adiciona os objetos ao ecrã correspondentes ao passo 1
/////////////////////////////////
function desenhaPasso1()
{
	const TITULO_PASSO1 = "Submeter Requerimento - Passo 1";
	
	// adiciona descrição do passo
	document.getElementById("descricao").innerHTML = "Submissão das formações";
	
	//lista_formacao_realizada
	geraListaFormacaoRealizada();
	
	//lista_anexos_associados
	geraListaAnexosAssociados();
	
	// adiciona passos ao documento
	document.getElementById("passos").innerHTML = geraPassos(0);
	
	// adiciona ao documento o título
	document.getElementById("titulo").innerHTML = TITULO_PASSO1;
							
}