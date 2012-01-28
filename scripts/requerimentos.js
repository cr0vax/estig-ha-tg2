//////////////////////////////////////////////
// TODO
//
//
//////////////////////////////////////////////
function comboCamposPesquisa(default_value, user_type)
{
	////alert('começou a gerar os campos da pesquisa');
	var fields = new Array();
	
	if ( user_type=='student' )
	{
		fields[0] = "YEAR;2008";
		fields[1] = "YEAR;2009";
		fields[2] = "YEAR;2010";
		fields[3] = "YEAR;2011";
		fields[4] = "YEAR;2012";
	}
	else
	{
		fields[0] = "NUMBER;Número do Processo";
		fields[1] = "STUDENT;Número do Aluno";
		fields[2] = "NAME;Nome do Aluno";
		fields[3] = "STATUS;Estado";
		fields[4] = "SUBMIT_DATE;Data de Emissão";
		fields[5] = "LIMIT_DATE;Data Limite";
		fields[6] = "ANSWER_DATE;Data de Resposta";
	}
	
	// chama a função que preenche a combobox
	return populateComboBox(default_value, 'field_filter', 'Pesquisa', fields);
}

//////////////////////////////////////////////
// TODO
//
//
//////////////////////////////////////////////
function pesquisa(user_type, field, filter)
{
	////alert('começou a gerar a pesquisa');
	/********************************
	cria a funcionalidade de pesquisa
	********************************/
	
	// adiciona a combo de pesquisa
	
	var pesquisa = comboCamposPesquisa(user_type, field);

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
	
		tblData = '<tr><td><a href="detalhes_requerimento.html?' + link + '">' +
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
function listaProcessos(user_type, field, filter)
{
	////alert("entrou na lista de processos");
	
	// adiciona a funcionalidade de pesquisa
	document.getElementById("pesquisa").innerHTML = pesquisa(user_type, field, filter);
	
	// adiciona a lista de processos
	document.getElementById("lista_processos").innerHTML = getLista(field, filter);
}

//////////////////////////////////////////////
// gera o conteúdo 
//////////////////////////////////////////////
function geraConteudo(field, filter)
{
	// se os fields não forem definidos coloa-os a ""
	field = field == undefined ? '' : field;
	filter = filter == undefined ? '' : filter;
	
	// adiciona título
	document.getElementById("titulo").innerHTML = "<h2>Consultar Requerimentos</h2>";

	// adiciona lista de pesquisa
	listaProcessos(readCookie('usertype'), field, filter);
}