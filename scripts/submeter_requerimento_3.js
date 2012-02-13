/////////////////////////////////
// Adiciona ao processo as disciplinas e respetivas formações
/////////////////////////////////
function constroiProcesso(disciplinas)
{
	// pesquisa todas as disciplinas
	var d = disciplinas.getElementsByTagName("CLASS");
	var x = novoProcesso.getElementsByTagName("PROCESS");
	
	for (i=0;i<d.length;i++)
	{
		// adiciona ao processo as disciplinas existentes em disciplinas
		x[0].appendChild(d[i]);
	}
}

/////////////////////////////////
// adiciona os objetos ao ecrã correspondentes ao passo 3
/////////////////////////////////
function desenhaPasso3()
{
	const TITULO_PASSO3 = "Submeter Requerimento - Passo 3";
	
	// adiciona descrição do passo
	document.getElementById("descricao").innerHTML = "Detalhes do requerimento";
	
	// gera o detalhe do requerimento
	constroiProcesso(novasDisciplinas);
	geraDetalheRequerimento(0, 0, novoProcesso);
	
	// adiciona passos ao documento
	document.getElementById("passos").innerHTML = geraPassos(2);
	
	// adiciona ao documento o título
	document.getElementById("titulo").innerHTML = TITULO_PASSO3;
							
}