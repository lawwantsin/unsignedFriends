class HomeController < ApplicationController
  def index
  end

  def match
    matches = []
    params[:friends].each do |f|
      match = Ballot.find_friend(f['name'])
      if match
        matches << {
          name: f['name'].titleize,
          photo: f['photo'],
          county: match.county.titleize,
          city: match.city_state_zip,
          reason: match.unaccepted_reason.titleize
        }
      end
    end
    render :partial => 'home/friendbox', :collection => matches
  end
end
