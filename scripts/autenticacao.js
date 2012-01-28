	var http_request = false;
	var xmlDoc;

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
	
	function login(username, password) {
		var message = "";
	
		// abre o ficheiro XML com as credenciais
		makeRequest('./xml/credenciais.xml');
		xmlDoc=http_request.responseXML;
		var x = xmlDoc.getElementsByTagName("USER");
		//alert(x.length);

		// procura o nome de utilizador
		for (i=0;i<x.length;i++){
			
			if ( x[i].getElementsByTagName("login")[0].childNodes[0].nodeValue == username ) {
				var xmlUser = x[i].getElementsByTagName("login")[0].childNodes[0].nodeValue;
				var xmlPassword = x[i].getElementsByTagName("password")[0].childNodes[0].nodeValue;
				var xmlUserName = x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
				var xmlUserType = x[i].getElementsByTagName("usertype")[0].childNodes[0].nodeValue;
/* 				alert(u);
				alert(p); */
			}
		}

		if ( username == xmlUser ) {
			// se achar valida a password
				if ( password == xmlPassword ) {				
					// TODO: se estiver ok escreve no cookie e passa para a página seguinte
					//var c = 'ipbejacookie=' + xmlUserType + ';' + xmlUserName + ';' + 'path=/';
					//alert(c);
					createCookie('authenticatted',1)
					createCookie('username',xmlUser)
					createCookie('usertype',xmlUserType)
					createCookie('name',xmlUserName)
					//document.cookie = c;
					var URL = "entrada.html";
					window.location = URL;
				} else {
					// senão dá mensagem de erro a dizer que a password é inválida
					message = "Password errada!";
				}
		} else {
			// se não achar dá mensagem de erro a dizer utilizador desconhecido
			message = "Utilizador desconhecido!";
		}
		
		// escreve a mensagem na página
		document.getElementById("message").innerHTML = message;
	}