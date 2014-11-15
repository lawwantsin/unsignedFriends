class AddIndex < ActiveRecord::Migration
  def change
    add_index :ballots, :full_name
  end
end
