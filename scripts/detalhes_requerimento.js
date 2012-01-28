//////////////////////////////////////////////
// TODO
//
//
//////////////////////////////////////////////
function comboCamposPesquisa(default_value)
{
	////alert('começou a gerar os campos da pesquisa');
	var fields = new Array();
	
	fields[0] = "NUMBER;Número do Processo";
	fields[1] = "STUDENT;Número do Aluno";
	fields[2] = "NAME;Nome do Aluno";
	fields[3] = "STATUS;Estado";
	fields[4] = "SUBMIT_DATE;Data de Emissão";
	fields[5] = "LIMIT_DATE;Data Limite";
	fields[6] = "ANSWER_DATE;Data de Resposta";
	
	// chama a função que preenche a combobox
	return populateComboBox(default_value, 'field_filter', 'Pesquisa', fields);
}

//////////////////////////////////////////////
// TODO
//
//
//////////////////////////////////////////////
function pesquisa(field, filter)
{
	////alert('começou a gerar a pesquisa');
	/********************************
	cria a funcionalidade de pesquisa
	********************************/
	
	// adiciona a combo de pesquisa
	var pesquisa = comboCamposPesquisa(field);

	// adiciona a text box de pesquisa
	pesquisa = pesquisa + '<input class="txt" id="filter" name="filter" type="text" value="' + filter + '">';
						 
	// adiciona o botão ok
	pesquisa = pesquisa + '<input class="btn" id="pesquisar" type="submit" value="Pesquisar" name="Pesquisar" onclick="geraConteudo(document.getElementById(\'field_filter\').value, document.getElementById(\'filter\').value)" >';
	
	// escreve no documento es elementos de pesquisa
	return pesquisa;
}

//////////////////////////////////////////////
// gera lista dos processos
//
//////////////////////////////////////////////
function getLista(field, filter)
{
	//alert('Entrou no getlista de processos');
	
	// abre o ficheiro XML dos processos
	makeRequest('./xml/requerimentos.xml');
	var xmlDoc=http_request.responseXML;
	var x = xmlDoc.getElementsByTagName("PROCESS");
	//var listaOutput = "";
	var tblOutput;
	var tblHeader;
	var tblRows = "";
	var rowData;
	//alert(x.length);
	
	tblOutput = '<table id="lista_processos" class="lista_processos">';
	
	tblHeader = '<tr>' +
					'<td>Nº Processo</td>' +
					'<td>Nº Aluno</td>' +
					'<td>Nome Aluno</td>' +
					'<td>Estado</td>' +
					'<td>Data Emissão</td>' +
					'<td>Data Limite</td>' +
					'<td>Data Resposta</td>' +
				'</tr>'
	
 	for (i=0;i<x.length;i++) {
	
		var link = 'number=' + x[i].getElementsByTagName("NUMBER")[0].childNodes[0].nodeValue + 
				   '&year=' + x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue
	
		tblData = '<tr><td><a href="consultar_requerimentos.html?' + link + '">' +
			x[i].getElementsByTagName("NUMBER")[0].childNodes[0].nodeValue + '/' +
			x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue + '</a></td><td>' + 
			x[i].getElementsByTagName("STUDENT")[0].childNodes[0].nodeValue + '</td><td>' + 
			x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue + '</td><td>' + 
			x[i].getElementsByTagName("STATUS")[0].childNodes[0].nodeValue + '</td><td>' + 
			x[i].getElementsByTagName("SUBMIT_DATE")[0].childNodes[0].nodeValue + '</td><td>' + 
			x[i].getElementsByTagName("LIMIT_DATE")[0].childNodes[0].nodeValue + '</td><td>' + 
			x[i].getElementsByTagName("ANSWER_DATE")[0].childNodes[0].nodeValue + '</td>';
		
		// alert('Tamanho de filter: ' + filter.length + ' Conteúdo de filter: ' + filter);
		// alert('Tamanho de field: ' + field.length + ' Conteúdo de field: ' + field);
		
		if (filter.length != 0 && field.length != 0) {
			var a = x[i].getElementsByTagName(field)[0].childNodes[0].nodeValue;
			// alert('conteúdo encontrado: ' + a);
			
			if (x[i].getElementsByTagName(field)[0].childNodes[0].nodeValue == filter) {
				
				// alert(' adicionado ' + tblData);
				// Procura o cabeçalho do processo
				tblRows = tblRows + tblData;
			}
		} else {
			tblRows = tblRows + tblData;
		}
		
	}
	
	// verifica se foram encontradas rows com o critério, se não foram diz que não foram encotnrados resultados
	if (tblRows.length <= 0) {
		tblRows = '<tr><td colspan="7">Não foram encontrados resultados</td></tr>';
	}

	tblOutput = tblOutput + tblHeader + tblRows + '</table>';
	
	return tblOutput;
}


//////////////////////////////////////////////
// lista os processos e suas funcionalidades
//////////////////////////////////////////////
function listaProcessos(field, filter)
{
	////alert("entrou na lista de processos");
	
	// adiciona a funcionalidade de pesquisa
	document.getElementById("pesquisa").innerHTML = pesquisa(field, filter);
	
	// adiciona a lista de processos
	document.getElementById("lista_processos").innerHTML = getLista(field, filter);
}

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
function geraDetalheRequerimento(number, year)
{
	var x = readXML('requerimentos.xml').getElementsByTagName("PROCESS");
	//alert(x.length);
	var htmlOutput = "";
	
	// procura nos processos o processo em questão
	for (i=0;i<x.length;i++) {
		var xmlYear = x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
		var xmlNumber = x[i].getElementsByTagName("NUMBER")[0].childNodes[0].nodeValue;
		
		// verifica se é coincidente com o numero e ano passados por parametro
		if ( xmlYear == year && xmlNumber == number ) {
		
			var processo = x[i];
			
			// imprime o cabeçalho do processo
			document.getElementById("n_processo").innerHTML = '<b>Processo:</b> ' + xmlNumber + '/' + xmlYear;
			document.getElementById("data").innerHTML = '<b>Data:</b> ' + processo.getElementsByTagName("SUBMIT_DATE")[0].childNodes[0].nodeValue;
			document.getElementById("curso").innerHTML = '<b>Curso:</b> ' + processo.getElementsByTagName("COURSE")[0].childNodes[0].nodeValue;
			document.getElementById("nome").innerHTML = '<b>Nome:</b> ' + processo.getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
			
			// para cada disciplina imprime as formações
			var disciplinas = processo.getElementsByTagName("CLASS");
			
			for (j=0;j<disciplinas.length;j++)
			{
				htmlOutput = htmlOutput + '<br><hr><b>Unidade Curricular: </b>' + disciplinas[j].getElementsByTagName("NAME")[0].childNodes[0].nodeValue; + '<br>';
				
				// escreve o cabeçalho
				htmlOutput = htmlOutput + '<table border="1" width="100%"><tr><td>Tipo de Formação</td><td>Descrição</td><td>Anexos</td></tr>';
				
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
						
						htmlOutput = htmlOutput + '<a href="./' + DOCS_PATH + '/' + nome_ficheiro + '">' + descricao + '</a><br>';
					}
					
					htmlOutput = htmlOutput + '</td>';
					htmlOutput = htmlOutput + '</tr>';
				}
				
				
				
				//fecha a tabela
				htmlOutput = htmlOutput + '</table><br>';
				
			}
		}
	}
	
	// passa à próxima formação
	document.getElementById("formacoes").innerHTML = htmlOutput;
	
}

//////////////////////////////////////////////
// gera o conteúdo 
//////////////////////////////////////////////
function geraConteudo(field, filter)
{
	// adiciona título
	document.getElementById("titulo").innerHTML = "<h2>Detalhes do requerimento</h2>";

	// valida se foram passados os parametros
	var index = document.URL.indexOf('=', 0);
	
	var variaveis = document.URL.substring(index + 1);
	variaveis = variaveis.split("&");
	
	var number = variaveis[0].substring(variaveis[0].indexOf('=') + 1);
	var year = variaveis[1].substring(variaveis[1].indexOf('=') + 1);
	
	// gera os detalhes do processo
	geraDetalheRequerimento(number, year);
	
	// sai
	return;
}