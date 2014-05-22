class CreateSolicituds < ActiveRecord::Migration
  def change
    create_table :solicituds do |t|
      t.integer :id_usuario
      t.string :comentario
      t.string :estado

      t.references :viaje

      t.timestamps
    end
  end
end
