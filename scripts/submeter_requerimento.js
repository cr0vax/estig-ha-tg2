var anexosSubmetidos = new Array();
var unidadesCurriculares = new Array();
var novasFormacoes;
var novasDisciplinas;
var novoProcesso;
var temp;
var n_requerimento = 145;

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
		
		if (i<passo) {
			imagem = PREFIXO + (i+1) + '_ok.png';
			action = 'onclick="submeterRequerimento(' + (i+1) +')"';
		}
		else
		{
			imagem = PREFIXO + (i+1) + '.png';
		}
		
		passos = passos + '<a href="#"' + action + ' title="Passo ' + (i+1) + '"><img src="' + IMAGENS_PATH + imagem + '"></a>';
	}

	return passos;
}

/////////////////////////////////
// adiciona os objetos à pàgina
// recebe como parametro o passo a que se referem os objetos
/////////////////////////////////
function adicionarObjetos(passo)
{
	switch (passo)
	{
		case 2:
			desenhaPasso2();
			break;
		case 3:
			desenhaPasso3();
			break;
		case 4:
			desenhaPasso4();
			break;
		default:
			desenhaPasso1();
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
	switch (passo)
	{
		case 2:  // PASSO 2
			document.getElementById("text").innerHTML = 
				'<a title="Ajuda"  id="help" onmousedown="help(\'submeteRequerimento_2\')" href="#">Ajuda</a>' + 
				'<div id="processo">' +
					'<div id="titulo" class="titulo"></div>' +
					'<div id="passos"></div>' +
					'<br />' +
					'<div id="conteudo">' +
					'<div id="descricao"></div>' +
						'<fieldset>' +
						'<div id="lista_unidades_curriculares" class="lista_ucs"></div>' +
						'<div id="lista_formacoes_associadas" class="lista_formacoes"></div>' +
						'</fieldset>' +
					'</div>' +
					'<br />' +
					'<div id="botao_continuar">' +
						'<input type="button" onclick="submeterRequerimento(1)" value="Voltar">' +
						'<input type="button" onclick="submeterRequerimento(3)" value="Continuar">' +
					'</div>' +
				'</div>'
			break;
			
		case 3:  // PASSO 3
			document.getElementById("text").innerHTML = 
				'<a title="Ajuda" id="help" onmousedown="help(\'submeteRequerimento_3\')" href="#">Ajuda</a>' + 
					'<div id="processo">' +
					'<div id="titulo" class="titulo"></div>' +
					'<div id="passos"></div>' +
					'<br />' +
						'<div id="cabecalho">' +
							'<div id="descricao"></div>' +
						'</div>' +
						'<div id="formacoes"></div>' +
						'<div id="botoes">' +
							'<input type="button" onclick="submeterRequerimento(2)" value="Voltar">' +
							'<input type="button" onclick="submeterRequerimento(4)" value="Concluir">' +
						'</div>' +
					'</div>'
			break;
			
		case 4:  // Conclusão
			document.getElementById("text").innerHTML = 
				'<a title="Ajuda" id="help" onmousedown="help(\'submeteRequerimento_4\')" href="#">Ajuda</a>' + 
					'<div id="processo">' +
					'<div id="titulo" class="titulo"></div>' +
					'<div id="passos"></div>' +
					'<br />' +
						'<div id="mensagem_conclusao"></div>' +
					'</div>'
			break;
			
		default: // PASSO 1
			document.getElementById("text").innerHTML = 
				'<a title="Ajuda" id="help" onmousedown="help(\'submeteRequerimento_1\')" href="#">Ajuda</a>' + 
				'<div id="processo">' +
					'<div id="titulo" class="titulo"></div>' +
					'<div id="passos"></div>' +
					'<br />' +
					'<div id="conteudo">' +
						'<div id="descricao"></div>' +
						'<fieldset>' +
						'<div id="lista_formacao_realizada" class="lista_formacoes"></div>' +
						'<div id="lista_anexos_associados" class="lista_anexos"></div>' +
						'</fieldset>' +
					'</div>' +
					'<br />' +
					'<div id="botao_continuar">' +
						'<input type="button" onclick="submeterRequerimento(2)" value="Continuar">' +
					'</div>' +
				'</div>'
			break;
	}
			
	// adiciona campos à vista
	adicionarObjetos(passo);
	
}

/////////////////////////////////
// submete o requerimento
/////////////////////////////////
function submeterRequerimento(passo)
{
	// create temporary XML
	if (!passo) {
		temp = global_xmlRequerimentos;
		novasFormacoes = temp.createElement("FORMATIONS");
		novasDisciplinas = temp.createElement("CLASSES");
		
		// cria o novo processo
		novoProcesso = temp.createElement("REQUESTS");
		novoProcesso.appendChild(temp.createElement("PROCESS"));
	}
	
	// gera o esqueleto
	submeterRequerimentoDesenhaEsqueleto(passo);
}