class HomeController < ApplicationController
  def index
  end

  def match
    matches = []
    params[:friends].each do |f|
      match = Ballot.find_friend(f['name'])
      if match
        matches << {
          name: f['name'],
          photo: f['photo'],
          county: match.county,
          city: match.city_state_zip,
          reason: match.unaccepted_reason
        }
      end
    end
    render :json => matches.to_json
  end
end
