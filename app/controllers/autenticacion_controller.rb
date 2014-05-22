class AutenticacionController < ApplicationController

  #Accion que crea inicializa la variable #usuario
  def sign_in
    @usuario = Usuario.new
  end

  def login

    email=params[:usuario][:email]
    password = params[:usuario][:password]
    @usuario= Usuario.authenticate_by_email(email, password)

    if @usuario
      session[:usuario_id] = @usuario.id
      redirect_to @usuario
    else
      flash.now[:error] = 'Usuario o Password Incorrecto. Vuelvalo a intentar'
      render :action => "sign_in"
    end

  end

  def signed_out
    session[:usuario_id] = nil
    redirect_to :root
  end

  def nuevo_usuario
    @usuario = Usuario.new
  end

  def registro
    @usuario = Usuario.new(usuario_params)

    if @usuario.valid?
      @usuario.save
      session[:usuario_id] = @usuario.id
      flash[:notice] = 'Bienvenido.'
      redirect_to @usuario
    else
      render :action => "nuevo_usuario"
    end
  end

  private
  def usuario_params
    params.require(:usuario).permit(:nombre, :primer_apellido,:segundo_apellido,:direccion, :oficio,:telefono,:email, :password)
  end
end