﻿

/////////////////////////////////
// adiciona os objetos ao ecrã correspondentes ao passo 3
/////////////////////////////////
function desenhaPasso3()
{
	const TITULO_PASSO3 = "Submeter Requerimento - Passo 3";
	//var aluno = readCookie('number');
	
	//lista_formacao_realizada
	//geraListaFormacoesAssociadas(aluno);
	
	// adiciona passos ao documento
	document.getElementById("passos").innerHTML = geraPassos(2);
	
	// adiciona ao documento o título
	document.getElementById("titulo").innerHTML = TITULO_PASSO3;
							
}