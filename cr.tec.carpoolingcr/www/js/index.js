//variables
var auth = "";
var lat;
var lng;
var myLatlng;
var mapOptions;
var map;
var marker;
var listview;
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
			viajes += '<li><a href="#" onclick = "" class="ui-btn ui-btn-icon-right ui-icon-carat-r"><h2>'+ origen + ' > '+ destino +'</h2>Costo: '+costo+' Total de Plazas: '+plazas;
			viajes += '<p class="ui-li-aside"> '+fecha+' '+hora+'</p></a></li>';
		}
		viajes += '</ul>';
		
		//alert(viajes);
		document.getElementById('viajesDisponibles').innerHTML = viajes;
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
			viajes += '<li><a href="#" onclick = "" class="ui-btn ui-btn-icon-right ui-icon-carat-r"><h2>'+ origen + ' > '+ destino +'</h2>Costo: '+costo+' Total de Plazas: '+plazas;
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
	ubicarOrigen: function(){
		

		//irse a la pagina de buscarpunto
		self.location="#buscarPunto";
		//mostrar el mapa cuando la pagina esté cargada
		$(document).on("pageshow", "#buscarPunto", function () {
			//ubicar a la persona en el mapa
			app.posicionActual();
		});
		//sacar los Places cercanos al centro del mapa y ponerlos en el listview
		
		//buscar los Places cercanos a la persona y ponerlos en el Listview
		<!--listview = "<ul data-role="listview" data-inset="true">";
		 	<!--<li><a href="#" onclick="">
				<!--<h2>Stephen Weber</h2>
				<!--<p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
				<!--<p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
				<!--<p class="ui-li-aside"><strong>6:24</strong>PM</p>
			<!--</a></li>
			
			<!--<li><a href="#">
				<!--<h2>jQuery Team</h2>
				<!--<p><strong>Boston Conference Planning</strong></p>
				<!--<p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
				<!--<p class="ui-li-aside"><strong>9:18</strong>AM</p>
			<!--</a></li>
		<!--</ul>-->
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
		}
	},
	buscarOrigen:  function(){
		//buscar Places que coincidan con la búsqueda y listarlos en un listview
	},
	ubicarDestino: function(){
		
		self.location="#buscarPunto";
	}
};
