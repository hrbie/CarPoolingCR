class CreateUsuarioModel <ActiveRecord::Migration
  def self.up
    create_table :usuarios do |t|
      t.column :nombre, :string
      t.column :primer_apellido, :string
      t.column :segundo_apellido, :string
      t.column :direccion, :string
      t.column :oficio, :string
      t.column :email, :string
      t.column :telefono, :string
      t.column :password_hash, :string
      t.column :password_salt, :string
    end
  end


  def self.down
    drop_table :usuarios
  end
end