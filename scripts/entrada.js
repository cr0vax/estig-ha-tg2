


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
			conteudo = '<p>Bem vindo ao Sistema de Gestão de Processos de Creditação.</p>' +
					   '<p>Este tem como objectivo automatizar as actividades relacionadas com o processo de creditação, sendo possível executar todas as ações a este inerentes.</p>'
	}
	return conteudo;
}


//////////////////////////////////
// TODO ponto de partida para fazer o load content das páginas
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
	
	// conteúd da página
	//alert('vou inicializar o conteúdo da páigna');
	document.getElementById("text").innerHTML = conteudo();
}