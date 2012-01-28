const PAGINA_ENTRADA = "entrada.html";
const PAGINA_INICIAL = "index.html";
const DOCS_PATH = "docs";

//////////////////////////////////////////////
// abre ficheiro XML
// e define-lhe um título
//////////////////////////////////////////////
function readXML(xmlFile)
{
	const XML_PATH = './xml/';
	
	// abre o ficheiro XML dos processos
	makeRequest(XML_PATH + xmlFile);
	var xmlDoc=http_request.responseXML;
	
	// retorna o ficheiro xml
	return xmlDoc;
}

//////////////////////////////////////////////
// preenche uma caixa de combinação
// e define-lhe um título
//////////////////////////////////////////////
function help()
{
	alert('TODO');
}

//////////////////////////////////////////////
// preenche uma caixa de combinação
// e define-lhe um título
//////////////////////////////////////////////
function populateComboBox(default_value, name, title, fields)
{
	//alert('começou a preencher a combo');
	var combo = title + ': <select size="1" id ="' + name + '" name="' + name + '" value="' + default_value + '">';
	
	for (i=0;i < fields.length;i++) {
		combo = combo + '<option value="' + fields[i].split(';')[0] + '">' + fields[i].split(';')[1] + '</option>';
	}
	
	combo = combo + '</select>';
	
	return combo;
}


//////////////////////////////////////////////
// Valida se a sessão está iniciada com base
// no cookie, se esta já estiver iniciada passa
// para a página entrada.html
//////////////////////////////////////////////
function validarSessao() {
	var autenticado = readCookie('authenticatted');
	
	var index = document.URL.indexOf(PAGINA_INICIAL);
	
	// valida se há autenticação válida
	if ( autenticado == 1 ) {
		// se a página for o index vai para entrada
		if ( index >= 0 ) {
			window.location = PAGINA_ENTRADA;
		}
	} else {
		// se a página não for o index vai para o index
		if ( index < 0 ) {
			window.location = PAGINA_INICIAL;
		}
	}
}

//////////////////////////////////////////////
// Termina a sessão do utilizador
//////////////////////////////////////////////
function sair()
{
	eraseCookie('authenticatted');
	window.location = PAGINA_INICIAL;
}
