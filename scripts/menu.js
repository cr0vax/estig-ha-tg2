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
	
	function loadMenu(usertype) {
	//TODO
		//alert(usertype);
		//valida o usertype
		if ( usertype == null )
		{
			return null;
		}
		
		// abre o ficheiro XML do menu
		makeRequest('./xml/menu.xml');
		xmlDoc=http_request.responseXML;
		var x = xmlDoc.getElementsByTagName("menu");
		var menuOutput = "";
		//alert(x.length);
		
		//document.write('<H3>MENU</H3>');
		
		for (i=0;i<x.length;i++){
			// procura as permissões do tipo de utilizador passado
			var xmlSubmenus = x[i].getElementsByTagName("submenu");
			for(z=0;z<xmlSubmenus.length;z++){
				var xmlPermissions = xmlSubmenus[z].getElementsByTagName("permissions")[0].childNodes[0].nodeValue;
				
				if ( xmlPermissions.indexOf(usertype, 0) >= 0 ) {
					//alert('aqui');
					
					menuOutput = menuOutput + 
						'<li><a href="' + xmlSubmenus[z].getElementsByTagName("url")[0].childNodes[0].nodeValue +'">' + 
						xmlSubmenus[z].getElementsByTagName("name")[0].childNodes[0].nodeValue + 
						'</a></li>';
				}
			}
			
			if (menuOutput != "") { 
				menuOutput = '<h4>' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</h4><ul>' + menuOutput + '</ul>';
				document.write(menuOutput);
				menuOutput = "";
			}
		}
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
					createCookie('autenticatted',1,1)
					createCookie('username',xmlUser,1)
					createCookie('usertype',xmlUserType,1)
					createCookie('name',xmlUserName,1)
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

