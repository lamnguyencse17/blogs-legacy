require 'jwt'

class Api::V1::UsersController < ApplicationController
  def create
    @user = User.new(create_user_params)
    @user.password = params[:password]
    @user.save!

    @jwt_payload = {id: @user.id, username: @user.username, email: @user.email}
    @token = JWT.encode @jwt_payload, ENV['JWT_SECRET'] ,'HS512'

    render json: {user: @user, token: @token }
  end

  def authenticate

  end

  private

  def create_user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
