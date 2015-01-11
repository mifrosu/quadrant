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

ActiveRecord::Schema.define(version: 20150111085105) do

  create_table "data_sets", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.string   "id_title",   limit: 255
    t.string   "x_title",    limit: 255
    t.string   "y_title",    limit: 255
    t.string   "z_title",    limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "practice_data", force: :cascade do |t|
    t.string   "practice",   limit: 255
    t.integer  "month",      limit: 4
    t.integer  "count",      limit: 4
    t.integer  "value",      limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "row_items", force: :cascade do |t|
    t.string   "id_text",     limit: 255
    t.float    "x_data",      limit: 24
    t.float    "y_data",      limit: 24
    t.float    "z_data",      limit: 24
    t.integer  "data_set_id", limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "row_items", ["data_set_id"], name: "index_row_items_on_data_set_id", using: :btree

end
