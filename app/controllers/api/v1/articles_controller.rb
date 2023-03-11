class Api::V1::ArticlesController < ApplicationController
  skip_before_action :authenticate_request, only: [:index]
  def index
    @articles = Article.all
    render json: @articles
  end

  def create
    logger.info("NEW ARTICLE: #{create_article_params.merge(user_id: @current_user.id)}")
    @article = Article.new(create_article_params.merge(user_id: @current_user.id))
    @article.save!
    render json: @article
  end

  private

  def create_article_params
    params.permit(:title, :body)
  end
end
