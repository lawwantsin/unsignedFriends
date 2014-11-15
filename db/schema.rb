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

ActiveRecord::Schema.define(version: 20141115071444) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ballots", force: true do |t|
    t.string   "county"
    t.string   "precinct_code"
    t.string   "split_code"
    t.string   "party"
    t.string   "first_name"
    t.string   "middle_name"
    t.string   "last_name"
    t.string   "full_name"
    t.string   "address"
    t.string   "city_state_zip"
    t.string   "unaccepted_code"
    t.string   "unaccepted_reason"
    t.string   "facebook_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ballots", ["full_name"], name: "index_ballots_on_full_name", using: :btree

end
