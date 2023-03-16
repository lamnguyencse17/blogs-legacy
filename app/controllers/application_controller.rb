require 'jwt'

class ApplicationController < ActionController::API
  include JsonWebToken
  include ApplicationHelper
  before_action :authenticate_request

  private

  def authenticate_request
    @token = extract_token
    render json: {}, status: 401 and return if @token.nil?

    claim_data = nil
    begin
      claim_data = jwt_decode(@token)
    rescue JWT::DecodeError
      render json: {}, status: 401 and return
    rescue StandardError => e
      logger.debug "Error: #{e}"
      render json: {}, status: 500 and return
    end
    @current_user = User.select('email', 'username', 'id').find(claim_data['id'])
    return unless @current_user.nil?

    render json: {}, status: 401 and return
  end
end
