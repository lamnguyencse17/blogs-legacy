require 'jwt'

class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:create]
  def create
    @user = User.new(create_user_params)
    @user.password = params[:password]
    @user.save!

    @jwt_payload = {
      data: {id: @user.id, username: @user.username, email: @user.email},
      iat: Time.now.to_i,
      iss: 'lamnguyencse17',
      exp: Time.now.to_i + 3600
    }
    @token = JWT.encode @jwt_payload, ENV['JWT_SECRET'] ,'HS512'

    render json: {user: @user, token: @token }
  end

  def authenticate
    render json: @current_user
  end

  private

  def create_user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
