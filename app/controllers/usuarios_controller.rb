class UsuariosController <ApplicationController
  def show
    @usuario = Usuario.find(params[:id])
  end


end