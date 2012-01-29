var anexosSubmetidos = new Array();
var novasFormacoes;
var temp;

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

/////////////////////////////////
// gera os passos
/////////////////////////////////
function geraPassos(passo)
{
	const PREFIXO = 'passo_';
	var passos = "";
	var imagem = "";
	var action = "";
	
	for (i=0;i<3;i++)
	{
		action = "";
		
		if (i<=passo) {
			imagem = PREFIXO + (i+1) + '_ok.png';
			action = 'onclick="submeterRequerimento(' + (i+1) +')"';
		}
		else
		{
			imagem = PREFIXO + (i+1) + '.png';
		}
		
		passos = passos + '<a href="#" ' + action + '><img src="' + IMAGENS_PATH + imagem + '"></a>';
	}

	return passos;
}

////////////////////////////////////////
// Gera a form dos anexos associados
////////////////////////////////////////
function geraListaAnexosAssociados()
{
	var formListaFormacaoRealizada;
	var formListaAnexosAssociados;
	var comboAnexosSubmetidos;
	
	// gera a combo dos anexos submetidos
	comboAnexosSubmetidos = geraComboAnexosSubmetidos();

	// gera a form para adicionar anexos
	formAdicionarAnexo = '' +
		'<form name="adicionar_formacao" class="border">' +
			'Descrição: <input type="text" name="descricao_anexo"><br>' +
			'Ficheiro: <input type="file" value="Ficheiro"/>' +
			'<input type="button" value="Carregar" />' +
		'</form>';
	
	// gera a form dos anexos associados
	formAnexosAssociados = '' +
		'<form name="anexos_associados" class="border">' +
			'<table>' +
				'<tr>' +
					'<td><input type="checkbox" name="all" value="all"  /></td>' +
					'<td>Designação</td>' +
					'<td>Anexo</td>' +
				'</tr>' +
			'</table><br>' +
			'<input type="button" value="Remover" onclick="novoAnexo(this.value)/><br>' +
			comboAnexosSubmetidos + '<br>' + 
			'<input type="button" value="Novo" />' +
			'<input type="button" value="Associar" />' +
			
		'</form>';
		
	return formAdicionarAnexo + formAnexosAssociados;
}

////////////////////////////////////////
// Gera a form das formações realizadas
////////////////////////////////////////
function geraListaFormacaoRealizada()
{
	var formListaFormacoes;
	var formAdicionarFormacao;
	var comboTipoFormacao;
	
	// gera a combo dos tipos de formação
	comboTipoFormacao = geraComboTiposFormacao();
	
	// gera a form para adicionar a formação
	formAdicionarFormacao = '' +
		'<form name="adicionar_formacao" class="border">' +
			'Descrição: <input type="text" name="descricao_formacao"><br>' +
			comboTipoFormacao + '<br>' +
			'<input type="button" value="Adicionar" onclick="adicionarFormacao(descricao_formacao.value, comboTipoFormacao.value)"/>' +
		'</form>';
	
	// gera a form com a lista de formações adicionadas
	formListaFormacoes = '' +
		'<form name="lista_formacoes" class="border">' +
			'<table>' +
				'<tr>' +
					'<td>&nbsp;</td>' +
					'<td>Tipo</td>' +
					'<td>Formação Realizada</td>' +
				'</tr>'
				
				if (novasFormacoes) {
					alert('TAMANHO:' + novasFormacoes.getElementsByTagName("TYPE").length);
					var x = novasFormacoes.getElementsByTagName("FORMATION");

					for (i=0;i<x.length;i++) {
						//alert(x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue);
						
						formListaFormacoes = '<tr>' + formListaFormacoes +
							//'<td><input type="checkbox" name="all" value="' + i + '"  /></td>' +
							'<td><input type="radio" name="all" value="' + i + '"  /></td>' +
							'<td>' + x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue + '</td>' +
							'<td>' + x[i].getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue + '</td></tr>'
					}
				}
		formListaFormacoes = formListaFormacoes +
			'</table><br>' +
			'<input type="button" value="Remover" />' +
		'</form>';
		
	document.getElementById("lista_formacao_realizada").innerHTML = formAdicionarFormacao + formListaFormacoes;
	//return formAdicionarFormacao + formListaFormacoes;
	
}


/////////////////////////////////
// adiciona os objetos ao ecrã correspondentes ao passo 1
/////////////////////////////////
function desenhaPasso1()
{
	var formListaFormacaoRealizada = "";
	var formListaAnexosAssociados = "";
	const TITULO_PASSO1 = "Submeter Requerimento - Passo 1";
	
	//lista_formacao_realizada
	//formListaFormacaoRealizada = geraListaFormacaoRealizada();
	geraListaFormacaoRealizada();
	
	//lista_anexos_associados
	formListaAnexosAssociados = geraListaAnexosAssociados();
	
	// adiciona passos ao documento
	document.getElementById("passos").innerHTML = geraPassos(0);
	
	// adiciona ao documento o título
	document.getElementById("titulo").innerHTML = TITULO_PASSO1;
	
	// adiciona ao documento a form das formações
	//document.getElementById("lista_formacao_realizada").innerHTML = formListaFormacaoRealizada;

	// adiciona ao documento a form dos anexos
	document.getElementById("lista_anexos_associados").innerHTML = formListaAnexosAssociados;
							
}

/////////////////////////////////
// adiciona os objetos à página
// recebe como parametro o passo a que se referem os objetos
/////////////////////////////////
function adicionarObjetos(passo)
{
	switch (passo)
	{
		case 2:
			break;
		case 3:
			break;
		default:
			desenhaPasso1()
			break;
	}
}


/////////////////////////////////
// gera o esqueleto para submeter o
// requerimento
// recebe como parametro o passo a que se refere 
// o esqueleto
/////////////////////////////////
function submeterRequerimentoDesenhaEsqueleto(passo)
{
	document.getElementById("text").innerHTML = 
		'<a id="help" onmousedown="help(\'submeteRequerimento_1\')" href="#">Ajuda</a>' + 
			'<div id="processo">' +
				'<div id="titulo"></div>' +
				'<div id="passos"></div>' +
				'<div id="conteudo">' +
					'<div id="lista_formacao_realizada" class="lista_formacoes"></div>' +
					'<div id="lista_anexos_associados" class="lista_anexos"></div>' +
				'<div id="botao_continuar"></div>' +
				'</div>' +
			'</div>'
			
	// adiciona campos à vista
	adicionarObjetos(passo);
	
}

/////////////////////////////////
// submete o requerimento
/////////////////////////////////
function submeterRequerimento(passo)
{
	// cria a estrutura
	// create temporary XML
	if (!(temp) && !novasFormacoes) {
		temp = global_xmlRequerimentos;
		novasFormacoes = temp.createElement("FORMATIONS");
	}
	// gera o esqueleto
	submeterRequerimentoDesenhaEsqueleto(passo);
}