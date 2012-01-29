//////////////////////////////////////////////
// gera lista forma��es
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
	var x = global_xmlRequerimentos.getElementsByTagName("PROCESS");
	//alert(x.length);
	var htmlOutput = "";
	
	// procura nos processos o processo em quest�o
	for (i=0;i<x.length;i++) {
		var xmlYear = x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
		var xmlNumber = x[i].getElementsByTagName("NUMBER")[0].childNodes[0].nodeValue;
		
		// verifica se � coincidente com o numero e ano passados por parametro
		if ( xmlYear == year && xmlNumber == number ) {
		
			var processo = x[i];
			
			// imprime o cabe�alho do processo
			document.getElementById("n_processo").innerHTML = '<b>Processo:</b> ' + xmlNumber + '/' + xmlYear;
			document.getElementById("data").innerHTML = '<b>Data:</b> ' + processo.getElementsByTagName("SUBMIT_DATE")[0].childNodes[0].nodeValue;
			document.getElementById("curso").innerHTML = '<b>Curso:</b> ' + processo.getElementsByTagName("COURSE")[0].childNodes[0].nodeValue;
			document.getElementById("nome").innerHTML = '<b>Nome:</b> ' + processo.getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
			
			// para cada disciplina imprime as forma��es
			var disciplinas = processo.getElementsByTagName("CLASS");
			
			for (j=0;j<disciplinas.length;j++)
			{
				htmlOutput = htmlOutput + '<br><hr><b>Unidade Curricular: </b>' + disciplinas[j].getElementsByTagName("NAME")[0].childNodes[0].nodeValue; + '<br>';
				
				// escreve o cabe�alho
				htmlOutput = htmlOutput + '<table border="1" width="100%"><tr><td>Tipo de Forma��o</td><td>Descri��o</td><td>Anexos</td></tr>';
				
				// forma��es
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
					
					htmlOutput = htmlOutput + '</td>';
					htmlOutput = htmlOutput + '</tr>';
				}
				
				
				
				//fecha a tabela
				htmlOutput = htmlOutput + '</table><br>';
				
			}
		}
	}
	
	// passa � pr�xima forma��o
	document.getElementById("formacoes").innerHTML = htmlOutput;
	
}

//////////////////////////////////////////
// Desenha o esqueleto da p�gina de submiss�o
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
// gera o conte�do 
//////////////////////////////////////////////
function geraConteudoDetalheRequerimento(number, year)
{
	desenhaEsqueletoSubmissao()
	
	// adiciona t�tulo
	document.getElementById("titulo").innerHTML = "<h2>Detalhes do requerimento</h2>";
	
	// gera os detalhes do processo
	geraDetalheRequerimento(number, year);
	
	// sai
	return;
}