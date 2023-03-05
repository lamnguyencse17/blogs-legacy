require 'jwt'

class Api::V1::UsersController < ApplicationController
  include JsonWebToken
  skip_before_action :authenticate_request, only: [:create]
  def create
    @user = User.new(create_user_params)
    @user.password = params[:password]
    @user.save!

    render json: {user: @user, token: jwt_encode}
  end

  def authenticate
    render json: @current_user
  end

  private

  def create_user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
