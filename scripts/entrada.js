


function conteudo(pagina)
{
	var conteudo = "";

	switch (pagina) {
		case 'consultaRequerimentos': 
			conteudo = 'one'; 
			break;
		case 'submeteRequerimento_1': 
			conteudo = 'two'; 
			break;
		case 'submeteRequerimento_2': 
			conteudo = 'two'; 
			break;
		case 'submeteRequerimento_3': 
			conteudo = 'two'; 
			break;
		default: 
			conteudo = '<p>Bem vindo ao Sistema de Gest�o de Processos de Credita��o.</p>' +
					   '<p>Este tem como objectivo automatizar as actividades relacionadas com o processo de credita��o, sendo poss�vel executar todas as a��es a este inerentes.</p>'
	}
	return conteudo;
}


//////////////////////////////////
// TODO ponto de partida para fazer o load content das p�ginas
//////////////////////////////////
function loadContent()
{
	// inicializa os ficheiros XML
	//alert('vou inicializar os ficheiros XML');
	inicializaFicheirosXML();
	
	// menu do utilizador
	//alert('vou inicializar o menu do utilizador');
	document.getElementById("user_stats_content").innerHTML = loadUserStats();
	 
	// menu principal
	//alert('vou inicializar o menu principal');
	document.getElementById("menu_content").innerHTML = loadMenu(readCookie('usertype'));
	
	// breadcrumbs
	//alert('vou inicializar os breadcrumbs');
	document.getElementById("breadcrumbs").innerHTML = MPJSBackLinks();
	
	// conte�do da p�gina
	//alert('vou inicializar o conte�do da p�gina');
	document.getElementById("text").innerHTML = conteudo();
}