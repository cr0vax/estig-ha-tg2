//////////////////////////////////////////////
// gera lista formações
//////////////////////////////////////////////
function geraListaFormacoes(processChilds)
{
	//var formacoes = process.getElementsByTagName("COURSE");
	
	for (i = 0; i< processChilds.length; i++)
	{
		if ( processChilds[i].nodeName == "COURSE" ) 
		{
			var courseChilds = processChilds[i].childNodes;
			for (x=0; x< courseChilds.length; x++)
			{
				alert(courseChilds[x].nodeName);
			}
		}
	}
}


//////////////////////////////////////////////
// gera detalhes do requerimento
//////////////////////////////////////////////
function geraDetalheRequerimento(number, year, process)
{
	// se não foi passado um processo pesquisa-o nos gerais
	if (!process)
	{
		var x = global_xmlRequerimentos.getElementsByTagName("PROCESS");
	}
	else
	{
		//var x = process;
		var x = process.getElementsByTagName("PROCESS");
	}
	
	// se foi chamado de emitir parecer então é mostrar a coluna dos ects
	if (arguments.callee.caller.name == 'desenhaEmitirParecer2')
	{
		var ECTS = true;
	}
	
	var htmlOutput = '';
	
	// procura nos processos o processo em questão
	for (i=0;i<x.length;i++) {
	
		if (!process)
		{
			var xmlYear = x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
			var xmlNumber = x[i].getElementsByTagName("NUMBER")[0].childNodes[0].nodeValue;
		}
		// verifica se é coincidente com o numero e ano passados por parametro
		if ( (xmlYear == year && xmlNumber == number) || process ) {
		
			var processo = x[i];
			
			// imprime o cabeçaalho do processo, apenas se não foi passado um processo
			if (!process)
			{
				document.getElementById("n_processo").innerHTML = '<b>Processo:</b> ' + xmlNumber + '/' + xmlYear;
				document.getElementById("data").innerHTML = '<b>Data:</b> ' + processo.getElementsByTagName("SUBMIT_DATE")[0].childNodes[0].nodeValue;
				document.getElementById("curso").innerHTML = '<b>Curso:</b> ' + processo.getElementsByTagName("COURSE")[0].childNodes[0].nodeValue;
				document.getElementById("nome").innerHTML = '<b>Nome:</b> ' + processo.getElementsByTagName("STUDENT_NAME")[0].childNodes[0].nodeValue;
			}
			
			// para cada disciplina imprime as formações
			var disciplinas = processo.getElementsByTagName("CLASS");
			
			for (j=0;j<disciplinas.length;j++)
			{
				htmlOutput = htmlOutput + '<br><hr><b>Unidade Curricular: </b>' + disciplinas[j].getElementsByTagName("NAME")[0].childNodes[0].nodeValue; + '<br>';
				
				// escreve o cabeçalho
				htmlOutput = htmlOutput + 
					'<table border="1" width="100%">' +
						'<tr>' +
							'<th>Tipo de Formações</th>' +
							'<th>Descrição</th>' +
							'<th>Anexos</th>'
							
				if (ECTS) {htmlOutput = htmlOutput + '<th>ECTS</th>';}
				
				htmlOutput = htmlOutput + '</tr>';
				
				// formações
				var formacoes = disciplinas[j].getElementsByTagName("FORMATION");
				
				for (z=0;z<formacoes.length;z++)
				{
					htmlOutput = htmlOutput + '<tr>';
					htmlOutput = htmlOutput + '<td>' + formacoes[z].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue; + '</td>';					
					htmlOutput = htmlOutput + '<td>' + formacoes[z].getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue; + '</td>';				
					
					// anexos
					var anexos = formacoes[z].getElementsByTagName("DOC");
					
					htmlOutput = htmlOutput + '<td>';
					
					for (k=0;k<anexos.length;k++)
					{
						var descricao = anexos[k].getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue;
						var nome_ficheiro = anexos[k].getElementsByTagName("FILENAME")[0].childNodes[0].nodeValue;
						
						htmlOutput = htmlOutput + '<a href="' + DOCS_PATH + nome_ficheiro + '">' + descricao + '</a><br>';
					}
					
					// ECTS
					if (ECTS) 
					{
						var id = 'ects_' + j + z;
						htmlOutput = htmlOutput + '<td>' +
												  '<input type="text" value="0" name="ects" id="' + id + '" class="txt" onchange="atualizaValorTotal(this.value, \'' + id + '\')"/>' +
												  '</td>';
					}
					
					htmlOutput = htmlOutput + '</td>';
					htmlOutput = htmlOutput + '</tr>';

				}
				
				// ECTS
				if (ECTS) 
				{
					htmlOutput = htmlOutput + '<tr><td colspan="4" class="cf">' +
												'<label for="ects_' + j + '"><b>Classificação Final:</b></label>' +
												'<input type="text" value="0" name="total_ects" id="ects_' + j + '" class="txt" disabled />' +
											  '</td></tr>';
				}				
				
				//fecha a tabela
				htmlOutput = htmlOutput + '</table><br>';
				
			}
		}
	}
	
	// passa  à próxima formação
	document.getElementById("formacoes").innerHTML = htmlOutput;
	
}

//////////////////////////////////////////
// Desenha o esqueleto da página de submissão
//////////////////////////////////////////
function desenhaEsqueletoSubmissao()
{
	document.getElementById("text").innerHTML = 
		'<a id="help" onmousedown="help(\'consultaDetalheRequerimento\')" href="#">Ajuda</a>' + 
			'<div id="processo">' +
				'<div id="titulo"></div>' +
				'<div id="cabecalho">' +
					'<div id="n_processo"></div>' +
					'<div id="data"></div>' +
					'<div id="curso"></div>' +
					'<div id="nome"></div>' +
				'</div>' +
				'<div id="formacoes"></div>' +
			'</div>'
}

//////////////////////////////////////////////
// gera o conteúdo
//////////////////////////////////////////////
function geraConteudoDetalheRequerimento(number, year)
{
	desenhaEsqueletoSubmissao()
	
	// adiciona título
	document.getElementById("titulo").innerHTML = "Detalhes do requerimento";
	
	// gera os detalhes do processo
	geraDetalheRequerimento(number, year);
	
	// sai
	return;
}