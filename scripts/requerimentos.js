//////////////////////////////////////////////
// TODO
//
//
//////////////////////////////////////////////

function comboCamposPesquisa(user_type, user_number, default_value)
{
	////alert('começou a gerar os campos da pesquisa');
	var fields = new Array();
	var index = 0;
	var action = "";
	
	if ( user_type=='student' )
	{
		var processos = global_xmlRequerimentos.getElementsByTagName("PROCESS");
		for (i=0;i<processos.length;i++)
		{
			if (processos[i].getElementsByTagName("STUDENT")[0].childNodes[0].nodeValue == user_number)
			{
				fields[index] = processos[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue + ';' + processos[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
				index++;
			}
		}
		
		// define a ação da combobox
		action = 'onchange="atualizaLista(\'' + user_type + '\',' + user_number + ', \'YEAR\', document.getElementById(\'field_filter\').value)"';
	}
	else
	{
		fields[0] = "NUMBER;Número do Processo";
		fields[1] = "STUDENT;Número do Aluno";
		fields[2] = "STUDENT_NAME;Nome do Aluno";
		fields[3] = "STATUS;Estado";
		fields[4] = "SUBMIT_DATE;Data de Emissão";
		fields[5] = "LIMIT_DATE;Data Limite";
		fields[6] = "ANSWER_DATE;Data de Resposta";
	}
	
	// chama a função que preenche a combobox
	//alert('default_value: ' + default_value);
	
	return populateComboBox(default_value, 'field_filter', 'Pesquisa', fields, action);
}
//////////////////////////////////////////////
// TODO
//
//
//////////////////////////////////////////////
function pesquisa(user_type, user_number, field, filter)
{
	////alert('começou a gerar a pesquisa');
	/********************************
	cria a funcionalidade de pesquisa
	********************************/
	
	// adiciona a combo de pesquisa
	var pesquisa = comboCamposPesquisa(user_type, user_number, field);

	if (user_type != 'student') 
	{
		// adiciona a text box de pesquisa
		pesquisa = pesquisa + '<input class="txt" id="filter" name="filter" type="text" value="' + filter + '">';
							 
		// adiciona o botão ok
		pesquisa = pesquisa + '<input class="btn" id="pesquisar" type="submit" value="Pesquisar" name="Pesquisar" ' +
							  'onclick="atualizaLista(\'' + user_type + '\',' + user_number + ', document.getElementById(\'field_filter\').value, document.getElementById(\'filter\').value)">';
	}
	
	// escreve no documento es elementos de pesquisa
	return pesquisa;
}

//////////////////////////////////////////////
// filtra a informação apresentada ao utilizador
//
//////////////////////////////////////////////
function filtraInformacao(user_type, number, data)
{
	var canSee = false;
	
	// o aluno apenas pode ver os seus processos
	switch (user_type) {
		case 'student':
			// só pode ver se pertencer a ele
			if (data.getElementsByTagName("STUDENT")[0].childNodes[0].nodeValue == number)
			{
				canSee = true;			
			}
			break;
		case 'employee':
			// por defeito vê os para validar
			if (data.getElementsByTagName("STATUS")[0].childNodes[0].nodeValue == 'Para Validar')
			{
				canSee = true;			
			}
			break;
		case 'coordinator':
			// por defeito vê os para parecer
			if (data.getElementsByTagName("STATUS")[0].childNodes[0].nodeValue == 'Para Parecer')
			{
				canSee = true;			
			}
			break;
	}
	
	return canSee;
}

//////////////////////////////////////////////
// gera lista dos processos
//
//////////////////////////////////////////////
function getLista(field, filter, user_type, number, action)
{
	//alert('Entrou no getlista de processos');
	
	// abre o ficheiro XML dos processos
	var x = global_xmlRequerimentos.getElementsByTagName("PROCESS");
	//var listaOutput = "";
	var tblOutput;
	var tblHeader;
	var tblRows = "";
	var rowData;
	
	// define a ação a ser realizada
	if (!action)
	{
		action = 'geraConteudoDetalheRequerimento';
	}
	
	
	tblOutput = '<table id="lista_processos" class="lista_processos">';
	
	tblHeader = '<tr>' +
					'<th>Nº Processo</th>' +
					'<th>Nº Aluno</th>' +
					'<th>Nome Aluno</th>' +
					'<th>Estado</th>' +
					'<th>Data Emissão</th>' +
					'<th>Data Limite</th>' +
					'<th>Data Resposta</th>' +
				'</tr>'
	
 	for (i=0;i<x.length;i++) {
	
		var parametros = x[i].getElementsByTagName("NUMBER")[0].childNodes[0].nodeValue + 
				   ',' + x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue
	
		tblData = '<tr><td><a href="#" onclick="' + action + '(' + parametros + ')">' +
			x[i].getElementsByTagName("NUMBER")[0].childNodes[0].nodeValue + '/' +
			x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue + '</a></td><td>' + 
			x[i].getElementsByTagName("STUDENT")[0].childNodes[0].nodeValue + '</td><td>' + 
			x[i].getElementsByTagName("STUDENT_NAME")[0].childNodes[0].nodeValue + '</td><td>' + 
			x[i].getElementsByTagName("STATUS")[0].childNodes[0].nodeValue + '</td><td>' + 
			x[i].getElementsByTagName("SUBMIT_DATE")[0].childNodes[0].nodeValue + '</td><td>' + 
			x[i].getElementsByTagName("LIMIT_DATE")[0].childNodes[0].nodeValue + '</td><td>'
			
			if (x[i].getElementsByTagName("ANSWER_DATE")[0].childNodes[0].nodeValue)
			{
				tblData = tblData + x[i].getElementsByTagName("ANSWER_DATE")[0].childNodes[0].nodeValue;
			}
			
		tblData = tblData + '</td>';
		
		if (filter.length != 0 && field.length != 0) {
			var a = x[i].getElementsByTagName(field)[0].childNodes[0].nodeValue;
			
			if (x[i].getElementsByTagName(field)[0].childNodes[0].nodeValue == filter) {
				
				// Procura o cabeçalho do processo
				tblRows = tblRows + tblData;
			}
		} else {
		
			// verifica se o utilizador pode ver a informação
			if ( filtraInformacao(user_type, number, x[i]) ) {
				tblRows = tblRows + tblData;
			}
			
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
// Atualiza a lista de processos com base em
// em critérios e tipo de utilizador
//////////////////////////////////////////////
function atualizaLista(user_type, user_number, field, filter)
{
	// adiciona a lista de processos
	document.getElementById("lista_processos").innerHTML = getLista(field, filter, user_type, user_number);
}

//////////////////////////////////////////////
// Atualiza os campos de pesquisa com base no
// tipo de utilizador
//////////////////////////////////////////////
function atualizaPesquisa(user_type, user_number, field, filter)
{
	// adiciona a funcionalidade de pesquisa
	document.getElementById("pesquisa").innerHTML = pesquisa(user_type, user_number, field, filter);
}

//////////////////////////////////////////////
// lista os processos e suas funcionalidades
//////////////////////////////////////////////
function listaProcessos(user_type, user_number, field, filter, action)
{
	////alert("entrou na lista de processos");
	
	// adiciona a funcionalidade de pesquisa
	document.getElementById("pesquisa").innerHTML = pesquisa(user_type, user_number, field, filter);
	
	// adiciona a lista de processos
	document.getElementById("lista_processos").innerHTML = getLista(field, filter, user_type, user_number, action);
}

//////////////////////////////////////////////
// gera o esqueleto da página com os divs necessários
//////////////////////////////////////////////
function desenhaEsqueleto(field, filter)
{
	
	// verifica se o esqueleto a desenhar é do requerimento ou do detalhe
	if (field == "" && filter == "")
	{
		// esqueleto da lista de requerimentos
		document.getElementById("text").innerHTML = 
			'<a href="#" onmousedown="help(\'consultaRequerimento\')" id="help">Ajuda</a>' +
			'<div id="processos">' +
				'<div id="titulo"></div>' +
				'<div id="pesquisa"></div>' +
				'<div id="lista_processos"></div>' +
			'</div>'
	}
	else
	{
		// esqueleto do detalhe do requerimento
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
}

//////////////////////////////////////////////
// consulta requerimentos anteriormente submetidos
//////////////////////////////////////////////
function consultaRequerimento(field, filter)
{
	// se os fields não forem definidos coloa-os a ""
	field = field == undefined ? '' : field;
	filter = filter == undefined ? '' : filter;

	// desenha o esqueleto das divs da página
	desenhaEsqueleto(field, filter);
	
	// adiciona título
	document.getElementById("titulo").innerHTML = "<h2>Consultar Requerimentos</h2>";

	// adiciona lista de pesquisa
	listaProcessos(readCookie('usertype'), readCookie('number'), field, filter);
}

//////////////////////////////////////////////
// submete requerimentos
//////////////////////////////////////////////
function submeteRequerimento()
{
	// desenha o esqueleto das divs da página
	desenhaEsqueletoSubmissao();
	
	// adiciona título
	document.getElementById("titulo").innerHTML = "<h2>Consultar Requerimentos</h2>";

	// adiciona lista de pesquisa
	listaProcessos(readCookie('usertype'), readCookie('number'), field, filter);
}