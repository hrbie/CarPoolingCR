class CreateViajes < ActiveRecord::Migration
  def change
    create_table :viajes do |t|
      t.string :origen
      t.float :latitud_origen
      t.float :longitud_origen
      t.string :destino
      t.float :latitud_destino
      t.float :longitud_destino
      t.integer :costo
      t.date :fecha
      t.time :hora
      t.integer :espacio
      t.string :estado
      t.references :usuario, index: true

      t.timestamps
    end
  end
end
