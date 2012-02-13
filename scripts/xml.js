/******************************************************************
	Funções que interagem com os ficheiros XML
******************************************************************/

var http_request = false;

// ficheiros XML globais
var global_xmlMenu;
var global_xmlMensagens;
var global_xmlContactos;
var global_xmlRequerimentos;
var global_xmlUnidadesCurriculares;

//////////////////////////////////////////////
// abre ficheiro XML
// e define-lhe um título
//////////////////////////////////////////////
function makeRequest(url) {
	
	http_request = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();			
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
			// See note below about this line
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}

	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	
	http_request.open("get",url,false);
	http_request.send("");
}
	
//////////////////////////////////////////////
// abre ficheiro XML
// e define-lhe um título
//////////////////////////////////////////////
function readXML(xmlFile)
{
	// abre o ficheiro XML dos processos
	makeRequest(XML_PATH + xmlFile);
	var xmlDoc=http_request.responseXML;
	
	// retorna o ficheiro xml
	return xmlDoc;
}

//////////////////////////////////////////////
// Inicializa ficheiros XML
//////////////////////////////////////////////
function inicializaFicheirosXML()
{
	if ( !global_xmlRequerimentos &&
		 !global_xmlMenu &&
		 !global_xmlMensagens &&
		 !global_xmlContactos &&
		 !global_xmlUnidadesCurriculares)
	{
			global_xmlRequerimentos = readXML('requerimentos.xml');
			global_xmlMenu = readXML('menu.xml');
			global_xmlMensagens = readXML('mensagens.xml');
			global_xmlContactos = readXML('contactos.xml');
			global_xmlUnidadesCurriculares = readXML('uc.xml');
	}
}