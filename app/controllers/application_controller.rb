require 'jwt'

class ApplicationController < ActionController::API
  before_action :authenticate_request

  private
  def authenticate_request
    header = request.headers["Authorization"]
    token = header.split(" ").last if header
    claim = nil
    begin
      decoded = JWT.decode token, ENV['JWT_SECRET'], true, { algorithm: 'HS512' }
      claim = decoded.first
      logger.debug "CLAIM_DATA: #{claim}"

    rescue => error
      logger.debug "Error: #{error}"
      render json: {}, status: 401
    end

    @current_user = User.find(claim['data']['id'])
    if @current_user.nil?
      render json: {}, status: 401
    end
  end
end
