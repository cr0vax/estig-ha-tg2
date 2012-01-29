const PAGINA_ENTRADA = "entrada.html";
const PAGINA_INICIAL = "index.html";
const DOCS_PATH = "./docs/";
const XML_PATH = './xml/';
const IMAGENS_PATH = './imagens/';

//////////////////////////////////////////////
// Fun��o respons�vel pela disponibiliza��o de
// ajuda na p�gina
//////////////////////////////////////////////
function help()
{
	alert('TODO');
}

//////////////////////////////////////////////
// Fun��o respons�vel pela disponibiliza��o de
// de informa��o relativa ao utilizador
//////////////////////////////////////////////
function loadUserStats()
{
	var name = readCookie('name');
	var nMessages = 0;
	var conteudo = "";
	
	conteudo = '<a onclick="sair();" href="#">Sair</a><br>' +
			   name + '<br>' +
			   '<a href="#">Dados de utilizador</a><br>' +
		       '<a href="#">Tem ' + nMessages + ' mensagens novas</a><br>';
			   
	return conteudo;
}

//////////////////////////////////////////////
// preenche uma caixa de combina��o
// e define-lhe um t�tulo
//////////////////////////////////////////////
function populateComboBox(default_value, name, title, fields, action)
{
	//var action = "alert('cliquei')";
	//alert(default_value);
	//alert('come�ou a preencher a combo');
	
	var combo = title + ': <select name="' + name + '" id="' + name + '" size="1" ' + action + ' value="' + default_value + '">';
	//<select name="example" size="1" onchange="location=this.options[this.selectedIndex].value">
	

	
	for (i=0;i < fields.length;i++) {
		combo = combo + '<option value="' + fields[i].split(';')[0] + '">' + fields[i].split(';')[1] + '</option>';
	}
	
	combo = combo + '</select>';
	
	return combo;
}


//////////////////////////////////////////////
// Valida se a sess�o est� iniciada com base
// no cookie, se esta j� estiver iniciada passa
// para a p�gina entrada.html
//////////////////////////////////////////////
function validarSessao() {
	var autenticado = readCookie('authenticatted');
	
	var index = document.URL.indexOf(PAGINA_INICIAL);
	
	// valida se h� autentica��o v�lida
	if ( autenticado == 1 ) {
		// se a p�gina for o index vai para entrada
		if ( index >= 0 ) {
			//window.location = PAGINA_ENTRADA;
		}
	} else {
		// se a p�gina n�o for o index vai para o index
		if ( index < 0 ) {
			window.location = PAGINA_INICIAL;
		}
	}
}

//////////////////////////////////////////////
// Termina a sess�o do utilizador
//////////////////////////////////////////////
function sair()
{
	eraseCookie('authenticatted');
	window.location = PAGINA_INICIAL;
}
