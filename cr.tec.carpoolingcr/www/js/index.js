//variables
var auth = "";
var lat;
var lng;
var myLatlng;
var mapOptions;
var map;
var marker;
var listview;

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
		self.location="#home";
	},
	//facebook login
	fblogin: function(){
		//investigar la funcionalidad del  API de facebook para iniciar sesión y guardar el usuario en la bd
		self.location="#home";
	},
	logout: function(){
		//cerrar sesión ya sea con facebook (?) o con el usuario local
		alert("Sesión Cerrada!");
		self.location="#inicio";
	},
	register: function(){
		//Verificar que el usuario no exista y crearlo , si existe notificarle.
		alert("Su usuario ha sido creado exitosamente!");
		self.location="#home";
	},
	cargarPerfil: function(){
	//cargar los datos del usuario en los campos
		alert("Perfil cargado");
	},
	cargarViajes: function(){
		var viajes="";
		var origen = "Cartago";
		var destino = "San Jose";
		var costo = 500;
		var plazas = 4;
		var fecha = '15/06/14';
		var hora = '8:00 A.M.';
		var results = [1,2,3];
		
		
		viajes += '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
		for (var i = 0; i < results.length; i++) { 
			
			/*
			Se supone que debe haber una forma de obtener esto del JSON el cual es un array
			*/
			
			var info = '\''+origen +';'+destino+';'+costo+';'+plazas+'\'';
		
		
			viajes += '<li><a href="#" onclick = "app.click_test('+info+')" class="ui-btn ui-btn-icon-right ui-icon-carat-r"><h2>'+ origen + ' > '+ destino +'</h2>Costo: '+costo+' Total de Plazas: '+plazas;
			viajes += '<p class="ui-li-aside"> '+fecha+' '+hora+'</p></a></li>';
		}
		viajes += '</ul>';
		
		
	},
	
	verViaje: function(){
			
			
			
			/********** VER MAPA ***********************/
			lat_origen =  9.56154654;
		  	lng_origen = -83.45646846;
			
			lat_destino =  9.16154654;
		  	lng_destino = -83.95646846;
			myLatlng_Origen = new google.maps.LatLng(lat_origen,lng_origen);
			
			myLatlng_Destino = new google.maps.LatLng(lat_destino,lng_destino);
			
			var latX = (lat_origen+lat_destino)/2;
			var lngX = (lng_origen+lng_destino)/2;
		
			myLatlng_Promedio = new google.maps.LatLng( latX , lngX );
			alert(myLatlng_Promedio);
			
			mapOptions = {
				center: myLatlng_Promedio, 
				zoom: 10,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			//agregar el marcador con la posición actual
			marker = new google.maps.Marker({
      			position: myLatlng_Origen,
			    map: map,
		        title: 'Aquí estoy yo!'
  			});
			
			marker = new google.maps.Marker({
      			position: myLatlng_Destino,
			    map: map,
		        title: 'Aquí estoy yo!'
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
	
	click_test: function(str){
		
		alert(str);
		
		
		var info = '<h4>'+ str +'</h4>'
		document.getElementById('info_viaje').innerHTML = info;
		self.location.href = "#infoViaje"
		
		
		
		//mostrar el mapa cuando la pagina esté cargada
		$(document).on("pageshow", "#infoViaje", function () {
			
			
			//ubicar a la persona en el mapa
			app.verViaje();
		});
		
		//alert(viajes);
		//document.getElementById('viajesDisponibles').innerHTML = viajes;
	},
	
	misViajes: function(){
		var viajes="";
		var origen = "Cartago";
		var destino = "San Jose";
		var costo = 500;
		var plazas = 4;
		var fecha = '15/06/14';
		var hora = '8:00 A.M.';
		var results = [1,2,3];
		//en realidad se va iterando desde el resultado de la consulta al backend
		viajes += '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
		for (var i = 0; i < results.length; i++) { 
		
			var info = '\''+origen +';'+destino+';'+costo+';'+plazas+'\'';
			
			viajes += '<li><a href="#" onclick = "app.click_test('+info+')" class="ui-btn ui-btn-icon-right ui-icon-carat-r"><h2>'+ origen + ' > '+ destino +'</h2>Costo: '+costo+' Total de Plazas: '+plazas;
			viajes += '<p class="ui-li-aside"> '+fecha+' '+hora+'</p></a></li>';
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
		alert("Perfil actualizado");
	},
	tripSubmit: function(){
	//guardar los datos nuevos del viaje en la BD
		alert("Viaje Guardado");
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
	buscarOrigen:  function(){
		//buscar Places que coincidan con la búsqueda y listarlos en un listview
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
	
	
};
