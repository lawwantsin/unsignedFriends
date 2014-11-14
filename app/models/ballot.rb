class Ballot < ActiveRecord::Base

  def self.find_friend(friend_name)
    ballot = arel_table
    matched = where(ballot[:full_name].matches("%#{friend_name.upcase}%"))
    return matched.first
  end

end
