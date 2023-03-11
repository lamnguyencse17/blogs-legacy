class Api::V1::ArticlesController < ApplicationController
  skip_before_action :authenticate_request, only: [:show]

  def create
    @article = Article.new(create_article_params.merge(user_id: @current_user.id))
    @article.save!
    render json: @article
  end

  def show
    @article = Article.find(params[:id])
    render json: @article
  end

  private

  def create_article_params
    params.require(:article).permit(:title, :body)
  end
end
