require 'jwt'

class Api::V1::AuthenticateController < ApplicationController
  include JsonWebToken
  skip_before_action :authenticate_request, only: [:login]

  def index
    render json: @current_user
  end

  def login
    @user = User.find_by_email(login_user_params[:email])
    if @user.password == params[:password]
      render json: {user: @user, token: jwt_encode}
    else
      render json: {}, status: 401
    end
  end

  def logout
  end

  private
  def login_user_params
    params.permit(:email, :password)
  end
end
