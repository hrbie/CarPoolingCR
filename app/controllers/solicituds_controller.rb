class SolicitudsController <ApplicationController
  def new
    @usuario = Usuario.find(params[:usuario_id])
    @viaje = Viaje.find(params[:viaje_id])
    render :new
  end

  def create

    @usuario = Usuario.find(params[:usuario_id])
    @viaje = Viaje.find(params[:viaje_id])
    @solicitud = @viaje.solicituds.create(solicituds_params)
    render :'solicituds/index'
  end

  def index
    @solicitud = Solicitud.find_by_viaje_id(params[:viaje_id])
    if @solicitud
      @usuario = Usuario.find(@solicitud.id_usuario)
      @viaje = Viaje.find(params[:viaje_id])
    else
      flash.now[:informacion] = "No hay solicitudes disponibles en este momento"

    end

    render :index
  end

  def show
    @solicitud = Solicitud.find(params[:id])
    @usuario = Usuario.find(@solicitud.id_usuario)
    @viaje = Viaje.find(@solicitud.viaje_id)

  end

  def edit
    @solicitud = Solicitud.find(params[:id])
    @usuario = Usuario.find(@solicitud.id_usuario)
    @viaje = Viaje.find(@solicitud.viaje_id)
  end

  def update
    @solicitud = Solicitud.find(params[:id])
    @usuario = Usuario.find(@solicitud.id_usuario)
    @viaje = Viaje.find(@solicitud.viaje_id)
    if @solicitud.update(solicituds_params)
      render 'show'
    else
      render 'edit'
    end
  end


  private
    def solicituds_params
      params.require(:solicitud).permit(:id_usuario,:comentario,:estado)

    end
end