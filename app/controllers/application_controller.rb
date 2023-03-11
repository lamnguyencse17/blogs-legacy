require 'jwt'

class ApplicationController < ActionController::API
  include JsonWebToken
  before_action :authenticate_request

  private
  def authenticate_request
    header = request.headers["Authorization"]
    token = (header.split(" ").last if header) || nil
    if token.nil?
        render json: {}, status: 401
    end

    claim_data = nil
    begin
      claim_data = jwt_decode(token)
    rescue JWT::DecodeError
      render json: {}, status: 401 and return
    rescue  => error
      logger.debug "Error: #{error}"
      render json: {}, status: 500 and return
    end
    @current_user = User.find(claim_data['id'])
    if @current_user.nil?
      render json: {}, status: 401 and nil
    end
  end
end
