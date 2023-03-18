require 'jwt'

class Api::V1::AuthenticateController < ApplicationController
  include JsonWebToken
  skip_before_action :authenticate_request, only: [:login]

  def index
    render json: {user: @current_user, token: @token}
  end

  def login
    @user = User.find_by_email(login_user_params[:email])
    render json: { code: 'AUTH_01' }, status: 401, content_type: 'application/json' and return if @user.nil?

    if @user.password == params[:password]
      generated_token, _expires_in = jwt_encode
      render json: { user: @user, token: generated_token }
    else
      render json: {}, status: 401
    end
  end

  def logout; end

  private

  def login_user_params
    params.require(:authenticate).permit(:email, :password)
  end
end
