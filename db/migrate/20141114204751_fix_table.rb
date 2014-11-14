class FixTable < ActiveRecord::Migration
  def change
    Ballot.all.each do |b|
      b.full_name = "#{b.first_name} #{b.last_name}"
      b.middle_name = nil if b.middle_name == '(null)'
      b.save
    end
  end
end
