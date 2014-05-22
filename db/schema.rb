# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140522154501) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "usuarios", force: true do |t|
    t.string "nombre"
    t.string "primer_apellido"
    t.string "segundo_apellido"
    t.string "direccion"
    t.string "oficio"
    t.string "email"
    t.string "telefono"
    t.string "password_hash"
    t.string "password_salt"
  end

  create_table "viajes", force: true do |t|
    t.string   "origen"
    t.float    "latitud_origen"
    t.float    "longitud_origen"
    t.string   "destino"
    t.float    "latitud_destino"
    t.float    "longitud_destino"
    t.integer  "costo"
    t.date     "fecha"
    t.time     "hora"
    t.integer  "espacio"
    t.string   "estado"
    t.integer  "usuario_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "viajes", ["usuario_id"], name: "index_viajes_on_usuario_id", using: :btree

end
