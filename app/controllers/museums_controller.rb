class MuseumsController < ApplicationController
    def index 
        @museum = Museum.new(lat: params[:lat], lng: params[:lng])
        @museum.save
    end 
end
