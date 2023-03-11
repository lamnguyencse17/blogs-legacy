class Api::V1::HealthController < ApplicationController
  skip_before_action :authenticate_request

  def index
    render json: {}, status: 200 and return
  end
end
