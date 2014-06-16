//variables
var auth = "";
var lat;
var lng;
var myLatlng;
var mapOptions;
var map;
var marker;
var listview;
var id_usuario=4;

var geocoder;

//Estado
var estado_seleccion;


//metodos
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	//normal login
	login: function(){
		//verificar que el usuario existe e ingresarlo al sistema.
		var user = document.getElementById("user").value;
		var pass = document.getElementById("pass").value;
		
		id_usuario = apiAccess.autenticarUsuario(user,pass).ID;
		
		if(id_usuario!=null)
		{
			
			self.location="#home";
			alert("id = "+  id_usuario);
		}
		else
		{
			alert("Usuario o Contraseña no validos");
			}
	},
	//facebook login
	fblogin: function(){
		//investigar la funcionalidad del  API de facebook para iniciar sesión y guardar el usuario en la bd
		
		//FB_ID = 623214291108215
		
		self.location="#home";
	},
	logout: function(){
		//cerrar sesión ya sea con facebook (?) o con el usuario local
		document.getElementById("user").value='';
		document.getElementById("pass").value='';
		
		alert("Sesión Cerrada!");
		self.location="#inicio";
	},
	register: function(){
		//Verificar que el usuario no exista y crearlo , si existe notificarle.
		var email = document.getElementById("user_register").value;
		var pass =  document.getElementById("pass_register").value;
		apiAccess.crearUsuario('0','','',email,pass,'');
		
		alert("Su usuario ha sido creado exitosamente!");
		
		self.location="#home";
	},
	cargarPerfil: function(){
	//cargar los datos del usuario en los campos
		var nombre = apiAccess.getUsuarioById(id_usuario).NOMBRE;
		var direccion = apiAccess.getUsuarioById(id_usuario).DIRECCION;
		var fecha_nacimiento = apiAccess.getUsuarioById(id_usuario).FECHA_NACIMIENTO;
		var email = apiAccess.getUsuarioById(id_usuario).EMAIL;
		var password = apiAccess.getUsuarioById(id_usuario).PASSWORD;
		
		//Se completan los inputs con la informacion obtenida del servidor
		document.getElementById('fullname').value = nombre;
		document.getElementById('address').value = direccion;
		document.getElementById('birthday').value = fecha_nacimiento;
		document.getElementById('profileEmail').value = email;
		document.getElementById('profilePassword').value = password;
		
		
		//alert("Perfil cargado: email: "+ email+" id_usuario: "+id_usuario);
	},
	
	
	//************************** Cargar Viajes en Buscar Viaje ******************************
	cargarViajes: function(){
		var viajes="";
		
		
		var total_viajes = apiAccess.getViajesSinUsuario(id_usuario);;
	
		app.cargarViajes_aux(total_viajes);
	},
	
	cargarViajes_aux: function(total_viajes){
		var viajes="";
		
		
	
		viajes += '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
		for (var i = 0; i < total_viajes.length; i++) { 
			
			
			var fecha_temp = total_viajes[i].FECHA.split('T');
			
			var info = '\''+total_viajes[i].ID_USUARIO+';'+total_viajes[i].ORIGEN +';'+total_viajes[i].LATITUD_ORIGEN+';'+total_viajes[i].LONGITUD_ORIGEN+';'+total_viajes[i].DESTINO+';'+total_viajes[i].LATITUD_DESTINO+';'+total_viajes[i].LONGITUD_DESTINO+';'+total_viajes[i].COSTO+';'+total_viajes[i].ESPACIOS+';'+fecha_temp[0]+';'+total_viajes[i].HORA+';'+total_viajes[i].ID_VIAJE+'\'';
			viajes += '<li><a href="#" onclick = "app.click_test('+info+','+1+')" class="ui-btn ui-btn-icon-right ui-icon-carat-r"><h2>'+ total_viajes[i].ORIGEN + ' > '+ total_viajes[i].DESTINO +'</h2>Costo: '+total_viajes[i].COSTO+' Total de Plazas: '+total_viajes[i].ESPACIOS;
			viajes += '<p class="ui-li-aside"> '+fecha_temp[0]+' '+total_viajes[i].HORA+'</p></a></li>';
		}
		viajes += '</ul>';
		
		document.getElementById('viajesDisponibles').innerHTML = viajes;
	},
	
	verViaje: function(info){
			
			sub_info = info.split(';');
			
			/********** VER MAPA ***********************/
			lat_origen =  parseFloat(sub_info[2]);
		  	lng_origen = parseFloat(sub_info[3]);
			
			lat_destino =  parseFloat(sub_info[5]);
		  	lng_destino = parseFloat(sub_info[6]);
			
		
			myLatlng_Origen = new google.maps.LatLng(lat_origen,lng_origen);
			
			myLatlng_Destino = new google.maps.LatLng(lat_destino,lng_destino);
			
			var latX = (lat_origen+lat_destino)/2;
			var lngX = (lng_origen+lng_destino)/2;
		
			myLatlng_Promedio = new google.maps.LatLng( latX , lngX );
			alert("promedio = "+myLatlng_Promedio + " origen= "+myLatlng_Origen+ " destino= "+myLatlng_Destino);
			
			mapOptions = {
				center: myLatlng_Promedio, 
				zoom: 10,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById("map-canvas_ver"), mapOptions);
			//agregar el marcador con la posición actual
			marker = new google.maps.Marker({
      			position: myLatlng_Origen,
			    map: map,
		        title: 'Origen!'
  			});
			
			marker = new google.maps.Marker({
      			position: myLatlng_Destino,
			    map: map,
		        title: 'Destino!'
  			});
			
		 	google.maps.event.trigger(map,'resize');
			
			var request = {
    			location: myLatlng_Origen,
			    radius: '500'
			};
			
			service = new google.maps.places.PlacesService(map);
			//service.search(request, callback);
			/************************ FIN VER MAPA *****************/
			
			
			
     },
	
	click_test: function(str,estado){
		var get_info = str.split(';');
		
		var id_usuario_viaje = get_info[0];
		var origen = get_info[1];
		var destino = get_info[4];
		var precio = get_info[7];
		var espacios = get_info[8];
		var fecha = get_info[9];
		var hora = get_info[10]
		var id_viaje = get_info[11];
		
		
		
		if(estado==1)
		{
			alert("estado: "+1);
			var boton = "";
			boton += '<button id="btnenviar_Solicitud" class="ui-btn ui-icon-search ui-icon-mail ui-btn-icon-top ui-corner-all" onClick="app.enviarSolicitud()" >Enviar Solicitud</button>';
		
		document.getElementById('botones_div').innerHTML = boton;
		}
		else if(estado==2)
		{
			alert("estado: "+2);
			var boton="";
			boton += '<button id="btnver_Solicitud" class="ui-btn ui-icon-search ui-icon-mail ui-btn-icon-top ui-corner-all" onClick="app.verSolicitud('+ id_viaje+ ')" >Ver Solicitudes</button>';
			
			boton += '<button id="btnver_Solicitud" class="ui-btn ui-icon- ui-icon-navigation ui-btn-icon-top ui-corner-allsearch" onClick="app.ejecutarWaze()" >Ir con Waze</button>';
			document.getElementById('botones_div').innerHTML = boton;
		}
		
		
		
		alert("id_viaje desde click: "+id_viaje);
		
		
		document.getElementById("id_viaje").value = id_viaje;
		var info = '<h4> Origen: ' + origen + ' -> Destino: ' + destino + ' </h4><h5> Precio: '+ precio +' Espacio: '+espacios+'</h5>'
		document.getElementById('info_viaje').innerHTML = info;
		self.location.href = "#infoViaje"
		
		
		
		//mostrar el mapa cuando la pagina esté cargada
		$(document).on("pageshow", "#infoViaje", function () {
			
			
			//ubicar a la persona en el mapa
			app.verViaje(str);
		});
		
		//alert(viajes);
		//document.getElementById('viajesDisponibles').innerHTML = viajes;
	},
	
	verSolicitud: function(id_viaje)
	{
		var solicitudes = apiAccess.getSolicitudesByViaje(id_viaje);
		alert(solicitudes[0].COMENTARIO);
		
		self.location = "#solicitudesPorViaje"
		
		app.cargarSolicitudes(solicitudes);
		},
	
	cargarSolicitudes: function(solicitudes){
		var viajes="";
		
		
		var total_viajes = solicitudes;
	
		app.cargarSolicitudes_aux(total_viajes);
	},
	
	cargarSolicitudes_aux: function(total_viajes){
		var solicitudes="";
		/*
		ID_SOLICITUD
		ID_VIJAE
		ID_USUARIO
		COMENTARIO
		ESTADO
		*/
		
	
		solicitudes += '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
		for (var i = 0; i < total_viajes.length; i++) { 
			
			var info = '\''+total_viajes[i].ID_SOLICITUD+';'+total_viajes[i].ID_VIAJE +';'+total_viajes[i].ID_USUARIO+';'+total_viajes[i].COMENTARIO+';'+total_viajes[i].ESTADO+'\'';
			
			solicitudes += '<li><a href="#" onclick = "" class="ui-btn ui-btn-icon-right ui-icon-carat-r"><h2>'+ total_viajes[i].COMENTARIO + ' > '+ total_viajes[i].ESTADO;
		}
		solicitudes += '</ul>';
		
		document.getElementById('SolicitudesporViajesDiv').innerHTML = solicitudes;
	},
	
	misViajes: function(){
		var viajes="";
		var origen = "Cartago";
		var destino = "San Jose";
		var costo = 500;
		var plazas = 4;
		var fecha = '15/06/14';
		var hora = '8:00 A.M.';
		var results = "";
		
		
		results = apiAccess.getViajesbyUsuario(id_usuario);
		
		
		//en realidad se va iterando desde el resultado de la consulta al backend
		viajes += '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
		for (var i = 0; i < results.length; i++) { 
		
		var fecha_temp = results[i].FECHA.split('T')
		
			var info = '\''+results[i].ID_USUARIO+';'+results[i].ORIGEN +';'+results[i].LATITUD_ORIGEN+';'+results[i].LONGITUD_ORIGEN+';'+results[i].DESTINO+';'+results[i].LATITUD_DESTINO+';'+results[i].LONGITUD_DESTINO+';'+results[i].COSTO+';'+results[i].ESPACIOS+';'+fecha_temp[0]+';'+results[i].HORA+';'+results[i].ID_VIAJE+'\'';
			
			viajes += '<li><a href="#" onclick = "app.click_test('+info+','+2+')" class="ui-btn ui-btn-icon-right ui-icon-carat-r"><h2>'+ results[i].ORIGEN + ' > '+ results[i].DESTINO +'</h2>Costo: '+results[i].COSTO+' Total de Plazas: '+results[i].ESPACIOS;
			viajes += '<p class="ui-li-aside"> '+fecha+' '+results[i].HORA+'</p></a></li>';
		}
		viajes += '</ul>';
		
		//alert(viajes);
		document.getElementById('misViajesDiv').innerHTML = viajes;
	},
	misSolicitudes: function(){
		var solicitudes="";
		var origen = "Cartago";
		var destino = "San Jose";
		var costo = 500;
		var plazas = 4;
		var fecha = '15/06/14';
		var hora = '8:00 A.M.';
		var user = 'Herberth Torres';
		var comment = 'Vamos juntos!';
		var results = [1,2,3];
		//en realidad se va iterando desde el resultado de la consulta al backend
		solicitudes += '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
		for (var i = 0; i < results.length; i++) { 
			solicitudes += '<li><a href="#" onclick = "" class="ui-btn ui-btn-icon-right ui-icon-carat-r"><h2>'+ origen + ' > '+ destino +'</h2>';
			solicitudes += '<h4>Usuario: '+user+'</h4>';
			solicitudes += 'Costo: '+costo+' Total de Plazas: '+plazas;
			solicitudes += '<h3>Comentario: '+comment+'</h3>';
			solicitudes += '<strong>Estado: '+'Pendiente'+'</strong>';
			solicitudes +='<center><td><button class="ui-btn ui-icon-comment ui-btn-icon-notext ui-corner-all" onClick="">No text</button></td>';
			solicitudes +='<td><button class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all" onClick="">No text</button></td></center>';
			solicitudes += '<p class="ui-li-aside"> '+fecha+' '+hora+'</p></a></li>';
		}
		solicitudes += '</ul>';
		
		//alert(viajes);
		document.getElementById('misSolicitudesDiv').innerHTML = solicitudes;
		
		
	},
	updateProfile: function(){
	//guardar los datos nuevos del usuario en la BD
		
		var nombre = document.getElementById('fullname').value;
		var direccion = document.getElementById('address').value;
		var fecha_nacimiento = document.getElementById('birthday').value;
		var email = document.getElementById('profileEmail').value;
		var password = document.getElementById('profilePassword').value;
		
		apiAccess.actualizarUsuario(id_usuario,nombre,direccion,email,password,fecha_nacimiento);
	
	
		alert("Perfil actualizado");
	},
	
	tripSubmit: function(){
		alert("id = "+ id_usuario);
		var origen = document.getElementById('origen').value
		var origen_lat = document.getElementById('lat_origen').value;
		var origen_ltn = document.getElementById('lng_origen').value;
		var destino = document.getElementById('destino').value;
		var destino_lat = document.getElementById('lat_destino').value;
		var destino_lng = document.getElementById('lng_destino').value;
		var espacios = document.getElementById('espacios').value;
		var costo = document.getElementById('costo').value;
		var fecha = document.getElementById('fecha').value;
		var hora = document.getElementById('hora').value;
		
		var hora_militar = hora.split(":")
		;
		
		hora_militar = hora_militar[0]*100+hora_militar[1]*1
		
		alert("hora militar: "+hora_militar);
		apiAccess.crearViaje('0',id_usuario,origen,origen_lat,origen_ltn,destino,destino_lat,destino_lng,costo,fecha,hora_militar,espacios); 
		
		},
	//****************** Ubicar Origen **********************************
	ubicarOrigen: function(){
		
		estado_seleccion = 'nuevo_viaje_buscar_origen'
		
		
		//irse a la pagina de buscarpunto
		self.location="#buscarPunto";
		
		
		//mostrar el mapa cuando la pagina esté cargada
		$(document).on("pageshow", "#buscarPunto", function () {
			//ubicar a la persona en el mapa
			app.posicionActual();
		});
	},
	
	//****************** Ubicar Origen Buscar**********************************
	ubicarOrigen_Buscar: function(){
		
		estado_seleccion = 'buscar_viaje_buscar_origen'
		

		//irse a la pagina de buscarpunto
		self.location="#buscarPunto";
		
		
		//mostrar el mapa cuando la pagina esté cargada
		$(document).on("pageshow", "#buscarPunto", function () {
			//ubicar a la persona en el mapa
			app.posicionActual();
		});
	},
	
	posicionActual: function(){
		navigator.geolocation.getCurrentPosition(onSuccess, onError,{ enableHighAccuracy: true });
		function onSuccess(position) {
			lat =  position.coords.latitude;
		  	lng = position.coords.longitude;
			myLatlng = new google.maps.LatLng(lat,lng);
			//alert('sucess');
			montarMapa();
      	}
		function onError(error) {
          	alert('code: ' + error.code + ' message: ' + error.message);
			myLatlng = new google.maps.LatLng(9.854246, -83.9096050)
			montarMapa();
        }
		function montarMapa(){
			mapOptions = {
				center: myLatlng, 
				zoom: 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			//agregar el marcador con la posición actual
			marker = new google.maps.Marker({
      			position: myLatlng,
			    map: map,
		        title: 'Aquí estoy yo!'
  			});
		 	google.maps.event.trigger(map,'resize');
			
			var request = {
    			location: myLatlng,
			    radius: '500'
			};
			
			service = new google.maps.places.PlacesService(map);
			service.search(request, callback);
			
			function callback(results, status) {
				
 				if (status == google.maps.places.PlacesServiceStatus.OK) {
					alert('places encontrados '+results.length);
					
					var lugares = '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
				    for (var i = 0; i < results.length; i++) {
						
						var parametro = '\''+results[i].name +';'+results[i].geometry.location.lat()+';'+results[i].geometry.location.lng()+'\'';
						
						//cargar los places en el listview
				      	lugares += '<li><a href="#" onclick = "app.get_params('+ parametro +')" class="ui-btn ui-btn-icon-right ui-icon-carat-r">';
						lugares += 'Lugar '+ results[i].name;
						lugares += '<p class="ui-li-aside"> --Texto de la esquina-- </p></a></li>';
    				}
					lugares += '</ul>';
					//alert (lugares);
		
				//alert(viajes);
				document.getElementById('placesList').innerHTML = lugares;
				}			
			}			
		}	
	},

	
	
	get_params: function(str){
		if (estado_seleccion == "nuevo_viaje_buscar_origen")
		{
				var str_split = str.split(";")
				
				var origen = str_split[0];
				var lat_origen = str_split[1];
				var lng_origen = str_split[2]
				alert(origen);
				alert(lat_origen);
				alert(lng_origen);
				document.getElementById('origen').value = origen;
				document.getElementById('lat_origen').value = lat_origen;
				document.getElementById('lng_origen').value = lng_origen;
				alert(document.getElementById('lat_origen').value);
				alert(document.getElementById('lng_origen').value)
				self.location.href="#ofrecerViaje";
		}
		
		if (estado_seleccion == "nuevo_viaje_buscar_destino")
		{
				var str_split = str.split(";")
				
				var origen = str_split[0];
				var lat_origen = str_split[1];
				var lng_origen = str_split[2]
				alert(origen);
				alert(lat_origen);
				alert(lng_origen);
				document.getElementById('destino').value = origen;
				document.getElementById('lat_destino').value = lat_origen;
				document.getElementById('lng_destino').value = lng_origen;
				//alert('destino '+document.getElementById('lat_destino').value);
				//alert(document.getElementById('lng_destino').value)
				self.location.href="#ofrecerViaje";
		}
		
		if (estado_seleccion == "buscar_viaje_buscar_origen")
		{
				var str_split = str.split(";")
				
				var origen = str_split[0];
				var lat_origen = str_split[1];
				var lng_origen = str_split[2]
				alert(origen);
				alert(lat_origen);
				alert(lng_origen);
				document.getElementById('origen_buscar').value = origen;
				document.getElementById('lat_origen_buscar').value = lat_origen;
				document.getElementById('lng_origen_buscar').value = lng_origen;
				alert('buscar origen '+document.getElementById('lat_origen').value);
				alert(document.getElementById('lng_origen').value)
				self.location.href="#buscarViaje";
		}
		
		else if (estado_seleccion == "buscar_viaje_buscar_destino")
		{
				var str_split = str.split(";")
				
				var origen = str_split[0];
				var lat_origen = str_split[1];
				var lng_origen = str_split[2]
				alert(origen);
				alert(lat_origen);
				alert(lng_origen);
				document.getElementById('destino_buscar').value = origen;
				document.getElementById('lat_destino_buscar').value = lat_origen;
				document.getElementById('lng_destino_buscar').value = lng_origen;
				alert('buscar destino '+document.getElementById('lat_origen').value);
				alert(document.getElementById('lng_origen').value)
				self.location.href="#buscarViaje";
		}
				
	},
	
	
	//****************** Ubicar Destino **********************************
	ubicarDestino: function(){
		//establcer estado
		
		estado_seleccion = 'nuevo_viaje_buscar_destino';
		self.location="#buscarPunto";
		
		//mostrar el mapa cuando la pagina esté cargada
		$(document).on("pageshow", "#buscarPunto", function () {
			//ubicar a la persona en el mapa
			app.posicionActual();
		});
	},
	
	//****************** Ubicar Destino Buscar **********************************
	ubicarDestino_Buscar: function(){
		//establcer estado
		
		estado_seleccion = 'buscar_viaje_buscar_destino';
		self.location="#buscarPunto";
		
		//mostrar el mapa cuando la pagina esté cargada
		$(document).on("pageshow", "#buscarPunto", function () {
			//ubicar a la persona en el mapa
			app.posicionActual();
		});
	},
	
	//*********************** BUSCADOR VIAJES *************************************
	searchTrips: function(){
		var txt_origen = document.getElementById('origen_buscar').value;
		var txt_destino = document.getElementById('destino_buscar').value;
		
		if(txt_origen=="" & txt_destino != "")
		{
				
				
			var total_viajes_destino = apiAccess.getViajesbyDestino(txt_destino);
			app.cargarViajes_aux(total_viajes_destino);
	
	
		}
		
		else if(txt_origen!="" & txt_destino == "")
		{
			var total_viajes_origen = apiAccess.getViajesbyOrigen(txt_origen);
			app.cargarViajes_aux(total_viajes_origen);
		}
		
		else if(txt_origen=="" & txt_destino == "")
		{
			var total_viajes_all = apiAccess.getViajesSinUsuario(id_usuario);
			
			app.cargarViajes_aux(total_viajes_all);
		}
		else if(txt_origen!="" & txt_destino!="")
		{
			alert("ambos");
			var total_viajes_ambos = apiAccess.getViajesbyOrigenyDestino(txt_origen,txt_destino);
			
			app.cargarViajes_aux(total_viajes_ambos);	
		}
	},
	
	enviarSolicitud: function()
	{
		var comentario="";
		var id_viaje="";
		
		comentario = prompt('Ingrese comentario','');
		
		id_viaje = document.getElementById("id_viaje").value
		if(comentario != null)
		{
		    apiAccess.crearSolicitud('0', id_viaje, id_usuario, comentario);
			alert("Solicitud Creada correctamente, Espere Confirmacion");
			self.location = "#home"
		}
	},
	
	buscarOrigen: function() {
		var pyrmont = new google.maps.LatLng(9.954976, -84.072910);
		/*var bounds = google.maps.LatLngBounds(
           new google.maps.LatLng(9.9603868,-84.5508152))
		*/
		var lugar = document.getElementById('buscarLugar').value;
		var request = {
			location: pyrmont,
			radius: '5000',
			//bounds: bounds,
			query: lugar
		};

  		service = new google.maps.places.PlacesService(map);
  		service.textSearch(request, callback);
		
		function callback(results, status) {
  			if (status == google.maps.places.PlacesServiceStatus.OK) {
				alert(results.length)
				
				
    		var lugares = '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
				    for (var i = 0; i < results.length; i++) {
						
						var parametro = '\''+results[i].name +';'+results[i].geometry.location.lat()+';'+results[i].geometry.location.lng()+'\'';
						
						//cargar los places en el listview
				      	lugares += '<li><a href="#" onclick = "app.get_params('+ parametro +')" class="ui-btn ui-btn-icon-right ui-icon-carat-r">';
						lugares += 'Lugar '+ results[i].name;
						lugares += '<p class="ui-li-aside"> --Texto de la esquina-- </p></a></li>';
    				}
					lugares += '</ul>';
					//alert (lugares);
		
				//alert(viajes);
				document.getElementById('placesList').innerHTML = lugares;
  			}
		}
	}

	
	
};
