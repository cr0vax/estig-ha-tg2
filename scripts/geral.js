const PAGINA_ENTRADA = "entrada.html";
const PAGINA_INICIAL = "index.html";
const DOCS_PATH = "./docs/";
const XML_PATH = './xml/';
const IMAGENS_PATH = './imagens/';

//////////////////////////////////////////////
// Função responsável pela disponibilização de
// ajuda na página
//////////////////////////////////////////////
function help()
{
	alert('TODO');
}

////////////////////////////////////////
// Valida a qual o valor seleccionado nos radio buttons
////////////////////////////////////////
function validaRadioSeleccionado(id)
{
	var radioGroup = document.getElementsByName(id);
	var return_id;
	
	// encontra o valor seleccionado
	for (var x = 0; x < radioGroup.length; x ++) {
		if (radioGroup[x].checked) {
		  return_id =  radioGroup[x].value;
		}
	}
	
	return return_id;
}

//////////////////////////////////////////////
// Função responsável pela disponibilização de
// de informação relativa ao utilizador
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
// preenche uma caixa de combinação
// e define-lhe um título
//////////////////////////////////////////////
function populateComboBox(default_value, name, title, fields, action)
{
	
	var combo = '<label for="' + name + '">' + title + ':</label>' +
				'<select name="' + name + '" id="' + name + '" size="1" ' + action + ' value="' + default_value + '">';
	
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
			//window.location = PAGINA_ENTRADA;
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
