class Usuario < ActiveRecord::Base
  #has_many :viajes
  attr_accessor :password

  #Antes de guardar ejecutar la funcion encrypt_password
  before_save :encrypt_password

  #Validaciones
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email, :on => :create
  validates_uniqueness_of :email



  #Funcion de autenticacion
  #Entradas: email, password
  #Salidas: user
  #Restricciones
  def self.authenticate(email, password)
    usuario = find_by_email(email)
    if usuario && usuario.password_hash == BCrypt::Engine.hash_secret(password, usuario.password_salt)
      usuario
    else
      nil
    end
  end

  #Funcion que encripta el password utilizano BCrypt
  def encrypt_password
   if password.present?
     self.password_salt = BCrypt::Engine.generate_salt
     self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
   end
  end

  #Autenticacion con email y password
  def self.authenticate_by_email(email, password)
   usuario = find_by_email(email)
   if usuario && usuario.password_hash == BCrypt::Engine.hash_secret(password, usuario.password_salt)
     usuario
   else
     nil
   end
  end
end