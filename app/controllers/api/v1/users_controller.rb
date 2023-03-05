class Api::V1::UsersController < ApplicationController
  def create
    @user = User.new(create_user_params)
    @user.password = params[:password]
    @user.save!
    render json: @user
  end

  def authenticate
    
  end

  private

  def create_user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
