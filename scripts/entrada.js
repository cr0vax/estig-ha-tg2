//////////////////////////////////
// Retorna o conteúdo da página
//////////////////////////////////
function conteudo()
{
	var conteudo = '<p>Bem vindo ao Sistema de Gestão de Processos de Creditação.</p>' +
				   '<p>Este tem como objectivo automatizar as actividades relacionadas com o processo de creditação, sendo possível executar todas as ações a este inerentes.</p>';
	
	return conteudo;
}


//////////////////////////////////
// ponto de partida para fazer o load content das páginas
//////////////////////////////////
function loadContent()
{
	// inicializa os ficheiros XML
	inicializaFicheirosXML();
	
	// menu do utilizador
	document.getElementById("user_stats_content").innerHTML = loadUserStats();
	 
	// menu principal
	document.getElementById("menu_content").innerHTML = loadMenu(readCookie('usertype'));
	
	// breadcrumbs
	breadcrumbs();
	
	// conteúd da página
	document.getElementById("text").innerHTML = conteudo();
}