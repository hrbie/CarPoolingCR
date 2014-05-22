class ViajesController < ApplicationController
    def nuevo_viaje
        @viaje = Viaje.new
    end

    def create
        @usuario = Usuario.find(params[:usuario_id])
        @viaje = @usuario.viajes.create(viajes_params)
        redirect_to usuario_path(@usuario)


      end

    def new
      @usuario = Usuario.find(params[:usuario_id])
      render :new
    end

    def index
        @usuario = Usuario.find(params[:usuario_id])
        @viaje = @usuario.viajes.all
    end

    def index_all
        @usuario = Usuario.find(params[:usuario_id])
        @viaje = Viaje.all
        render :index_all
    end

    def show
        @viaje = Viaje.find(params[:id])
        render :show
    end

     def edit
            @usuario = Usuario.find(params[:usuario_id])
            @viaje = Viaje.find(params[:id])

            render :edit
        end

    def update
        @usuario = Usuario.find(params[:usuario_id])
      	@viaje = Viaje.find(params[:id])

    	@viaje.update(viajes_params)
    	render :show
    end

    def viaje
        @viaje = Viaje.find(params[:usuario_id])
        render :show
    end
  private
    def viajes_params
      params.require(:viaje).permit(:origen, :latitud_origen, :longitud_origen, :destino, :latitud_destino, :longitud_destino, :fecha, :hora, :espacio,:estado, :costo)
    end
end