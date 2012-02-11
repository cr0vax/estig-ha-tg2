

/////////////////////////////////
// adiciona os objetos ao ecrã correspondentes ao passo 3
/////////////////////////////////
function desenhaPasso3()
{
	const TITULO_PASSO3 = "Submeter Requerimento - Passo 3";
	//var aluno = readCookie('number');
	
	//lista_formacao_realizada
	//geraListaFormacoesAssociadas(aluno);
	geraDetalheRequerimento(0, 0, novasDisciplinas);
	
	// adiciona passos ao documento
	document.getElementById("passos").innerHTML = geraPassos(3);
	
	// adiciona ao documento o título
	document.getElementById("titulo").innerHTML = TITULO_PASSO3;
							
}