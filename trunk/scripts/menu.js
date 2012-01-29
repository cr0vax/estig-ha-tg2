	
	function loadMenu(usertype) {
	//TODO
		//alert(usertype);
		//valida o usertype
		if ( usertype == null )
		{
			return null;
		}
		
		//global_xmlMenu=readXML('menu.xml');
		//alert('Encontrei ' + global_xmlMenu.length + ' objetos no xml do menu');
		var x = global_xmlMenu.getElementsByTagName("menu");
		var menuOutput = "";
		var menuFinal = "";
		
		for (i=0;i<x.length;i++){
			// procura as permissões do tipo de utilizador passado
			var xmlSubmenus = x[i].getElementsByTagName("submenu");
			for(z=0;z<xmlSubmenus.length;z++){
				var xmlPermissions = xmlSubmenus[z].getElementsByTagName("permissions")[0].childNodes[0].nodeValue;
				
				if ( xmlPermissions.indexOf(usertype, 0) >= 0 ) {
					
					menuOutput = menuOutput + 
						'<li><a href="#" onclick="' + xmlSubmenus[z].getElementsByTagName("url")[0].childNodes[0].nodeValue +'()">' + 
						xmlSubmenus[z].getElementsByTagName("name")[0].childNodes[0].nodeValue + 
						'</a></li>';
				}
			}
			
			if (menuOutput != "") { 
				menuOutput = '<h4>' + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + '</h4><ul>' + menuOutput + '</ul>';
				menuFinal = menuFinal + menuOutput;
				menuOutput = "";
			}
		}
		
		return menuFinal;
	}

