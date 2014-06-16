var apiAccess = {
	//devuelve todos los usuarios que esten en la BD
	getUsuarios : function() {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Usuario',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				//console.log( data );
				items = data;
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	getUsuarioById : function(id) {
		jQuery.support.cors = true;
		var item = null;
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Usuario',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				//console.log( data );
				for(i=0;i<data.length;i++){
					if(data[i].ID == id){
						item = data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return item;		
	},
	//si el email y el pass coinciden con un usuario devuelve true, sino devuelve false
	autenticarUsuario: function(email,pass) {
		users = apiAccess.getUsuarios();
		
		for (i = 0; i < users.length; i++){
			item = users[i];
			if (item.EMAIL == email && item.PASSWORD == pass){
				return users[i];
			}
		}
		return null;
	},
	actualizarUsuario: function(id, nombre, direccion, email, pass, fecha_nacimiento){
		jQuery.support.cors = true;
		result = false;
        var user = {
            id: id,
            nombre: nombre,
			direccion:direccion,
			email:email,
			password: pass,
			fecha_nacimiento: fecha_nacimiento
        };             
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Usuario/'+id,
            type: 'PUT',
			async: false,
            data:JSON.stringify(user),            
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                alert('success');
				result = true;
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
		return result;
	},
	crearUsuario: function( id, nombre, direccion, email, pass, fecha_nacimiento){
		jQuery.support.cors = true;
		result = false;
        var user = {
			id: id,
            nombre: nombre,
			direccion:direccion,
			email:email,
			password: pass,
			fecha_nacimiento: fecha_nacimiento
        };             
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Usuario/',
            type: 'POST',
			async: false,
            data:JSON.stringify(user),            
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                alert('success');
				result = true;
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
		return result;
	},
	crearViaje: function( id, id_usuario, origen, latOrigen, lngOrigen, destino, latDestino, lngDestino, costo, fecha, hora, espacios){
		jQuery.support.cors = true;
		result = false;
        var viaje = {
			id_viaje : id,
			id_usuario : id_usuario, 
			origen : origen, 
			latitud_origen : latOrigen, 
			longitud_origen : lngOrigen, 
			destino : destino, 
			latitud_destino : latDestino, 
			longitud_destino : lngDestino, 
			costo : costo, 
			fecha : fecha, 
			hora : hora, 
			espacios : espacios, 
			estado : "Activo"
        };             
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Viaje/',
            type: 'POST',
			async: false,
            data:JSON.stringify(viaje),            
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                //alert('success');
				result = true;
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
		return result;
	},
	getViajes : function() {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Viaje',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				//console.log( data );
				//alert("success");
				for(i=0; i<data.length; i++){
					if(data[i].ESTADO != 'Cancelado'){
						items[items.length]=data[i];
					}
				}
				items  = data;
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	getViajesSinUsuario : function(id_usuario) {
		jQuery.support.cors = true;
		var viajes = apiAccess.getViajes();
		var result = [];
		for(i=0;i<viajes.length;i++){
			if(viajes[i].ID_USUARIO != id_usuario){
				result[result.length] = viajes[i];
			}
		}
		return result;		
	},
	getViajeById : function(id) {
		jQuery.support.cors = true;
		var items = null;
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Viaje',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				for(i=0; i<data.length; i++){
					if(data[i].ID_VIAJE == id){
						items = data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	getViajesbyOrigen : function(origen) {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Viaje',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {
				for(i=0; i<data.length; i++){
					if(data[i].ORIGEN == origen && data[i].ESTADO != 'Cancelado'){
						items[items.length]=data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	getViajesbyDestino : function(destino) {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Viaje',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {
				for(i=0; i<data.length; i++){
					if(data[i].DESTINO == destino && data[i].ESTADO != 'Cancelado'){
						items[items.length]=data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	getViajesbyOrigenyDestino : function(origen,destino) {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Viaje',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {
				for(i=0; i<data.length; i++){
					if(data[i].ORIGEN == origen && data[i].DESTINO == destino && data[i].ESTADO != 'Cancelado'){
						items[items.length]=data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	cancelarViaje: function(id){
		jQuery.support.cors = true;
		result = false;
        var viaje = apiAccess.getViajeById(id);
		viaje.ESTADO = "Cancelado";
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Viaje/'+id,
            type: 'PUT',
			async: false,
            data:JSON.stringify(viaje),            
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                //alert('success');
				result = true;
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
		//Rechazar todas las solicitudes asociadas a este viaje
		solicitudes = apiAccess.getSolicitudesByViaje(id);
		for(i=0;i<solicitudes.length;i++){
			apiAccess.rechazarSolicitud(solicitudes[i].ID_SOLICITUD);
		}
		return result;
	},
	//devuelve todas las solicitudes excepto las canceladas.
	getSolicitudesByUsuario : function(idUsuario) {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Solicitud',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				//console.log( data );
				//alert("success");
				for(i=0; i<data.length; i++){
					if(data[i].ID_USUARIO == idUsuario && data[i].ESTADO != 'Cancelada'){
						items[items.length]=data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	getSolicitudesById : function(id) {
		jQuery.support.cors = true;
		var items = null;
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Solicitud',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				//console.log( data );
				//alert("success");
				for(i=0; i<data.length; i++){
					if(data[i].ID_SOLICITUD == id){
						items = data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	getSolicitudesByUsuarioAndEstado : function(idUsuario,estado) {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Solicitud',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				for(i=0; i<data.length; i++){
					if(data[i].ID_USUARIO == idUsuario && data[i].ESTADO == estado){
						items[items.length]=data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	getSolicitudesByViaje : function(idViaje) {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Solicitud',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				//console.log( data );
				//alert("success");
				for(i=0; i<data.length; i++){
					if(data[i].ID_VIAJE == idViaje && data[i].ESTADO != 'Cancelada'){
						items[items.length]=data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	crearSolicitud : function(id, id_viaje, id_usuario, comentario){
		jQuery.support.cors = true;
		result = false;
        var solicitud = {
			id_solicitud : id,
			id_viaje : id_viaje,
			id_usuario : id_usuario, 
			comentario : comentario,
			estado : "Pendiente"
        };             
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Solicitud/',
            type: 'POST',
			async: false,
            data:JSON.stringify(solicitud),            
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                alert('success');
				result = true;
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
		return result;
	},
	cambiarEstadoSolicitud : function(id,estado){
		jQuery.support.cors = true;
		result = false;
        var solicitud = apiAccess.getSolicitudesById(id);
		solicitud.ESTADO = estado;             
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Solicitud/'+id,
            type: 'PUT',
			async: false,
            data:JSON.stringify(solicitud),            
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                alert('success');
				result = true;
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
		return result;
	},
	cancelarSolicitud : function(id){
		return apiAccess.cambiarEstadoSolicitud(id,"Cancelada");
	},
	aceptarSolicitud : function(id){
		return apiAccess.cambiarEstadoSolicitud(id,"Aceptada");
	},
	rechazarSolicitud : function(id){
		return apiAccess.cambiarEstadoSolicitud(id,"Rechazada");
	},
	getMensajesBySolicitud : function(idSolicitud) {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Mensaje',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				//console.log( data );
				//alert("success");
				for(i=0; i<data.length; i++){
					if(data[i].ID_SOLICITUD == idSolicitud){
						items[items.length]=data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	enviarMensaje : function(id_mensaje, id_solicitud, id_usuario, mensaje){
		jQuery.support.cors = true;
		result = false;
        var mensaje = {
			id_mensaje : id_mensaje,
			id_solicitud : id_solicitud,
			id_usuario :  id_usuario,
			mensaje1 : mensaje
        };             
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Mensaje/',
            type: 'POST',
			async: false,
            data:JSON.stringify(mensaje),            
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                alert('success');
				result = true;
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
		return result;
	},
	getViajesbyUsuario : function(idUsuario) {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Viaje',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {
				for(i=0; i<data.length; i++){
					if(data[i].ID_USUARIO == idUsuario){
						items[items.length]=data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
		getViajesbyUsuarioYEstado : function(idUsuario,estado) {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://carpoolingccr.azurewebsites.net/api/Viaje',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {
				for(i=0; i<data.length; i++){
					if(data[i].ID_USUARIO == idUsuario && data[i].ESTADO == estado){
						items[items.length]=data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	}
}