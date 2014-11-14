class CreateBallots < ActiveRecord::Migration
  def change
    create_table :ballots do |t|
      t.string :county
      t.string :precinct_code
      t.string :split_code
      t.string :party
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :address
      t.string :city_state_zip
      t.string :unaccepted_code
      t.string :unaccepted_reason
      t.string :facebook_id
      t.string :full_name
      t.timestamps
    end
  end
end
