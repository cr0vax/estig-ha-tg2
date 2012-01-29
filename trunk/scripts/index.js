	///////////////////////////////////////
	// Autentica o utilizador na aplica��o
	///////////////////////////////////////
	
	function login(username, password) {
		var message = "";
	
		readXML('credenciais.xml');
		// abre o ficheiro XML com as credenciais
		
		var xmlDoc=http_request.responseXML;
		var x = xmlDoc.getElementsByTagName("USER");
		//alert(x.length);

		// procura o nome de utilizador
		for (i=0;i<x.length;i++){
			
			if ( x[i].getElementsByTagName("login")[0].childNodes[0].nodeValue == username ) {
				var xmlUser = x[i].getElementsByTagName("login")[0].childNodes[0].nodeValue;
				var xmlPassword = x[i].getElementsByTagName("password")[0].childNodes[0].nodeValue;
				var xmlUserName = x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
				var xmlUserType = x[i].getElementsByTagName("usertype")[0].childNodes[0].nodeValue;
				var xmlUserNumber = x[i].getElementsByTagName("numero")[0].childNodes[0].nodeValue;
			}
		}

		if ( username == xmlUser ) {
			// se achar valida a password
				if ( password == xmlPassword ) {				
					// se estiver ok escreve no cookie e passa para a p�gina seguinte
					createCookie('authenticatted',1);
					createCookie('username',xmlUser);
					createCookie('usertype',xmlUserType);
					createCookie('name',xmlUserName);
					createCookie('number',xmlUserNumber);

					// redireciona o utilizador para a p�gina
					window.location = PAGINA_ENTRADA;
				} else {
					// sen�o d� mensagem de erro a dizer que a password � inv�lida
					message = "Password errada!";
				}
		} else {
			// se n�o achar d� mensagem de erro a dizer utilizador desconhecido
			message = "Utilizador desconhecido!";
		}
		
		// escreve a mensagem na p�gina
		document.getElementById("message").innerHTML = message;
	}