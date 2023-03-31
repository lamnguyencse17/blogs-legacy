class Api::V1::ArticlesController < ApplicationController
  skip_before_action :authenticate_request, only: %i[show index]

  def create
    @article = Article.new(create_article_params.merge(user_id: @current_user.id))
    @article.save!
    render json: @article
  end

  def show
    @article = Article.find(params[:id])
    render json: @article
  end

  def index
    query_filters = request.query_parameters
    limit = query_filters[:size].to_i
    offset = limit * (query_filters[:page].to_i - 1)
    @articles = Article.joins(:user).select('users.username as creator_username',
                                            'articles.*').limit(limit).offset(offset.negative? ? 0 : offset)
    render json: @articles
  end

  private

  def create_article_params
    params.require(:article).permit(:title, :body)
  end

  def list_article_params
    params.permit(:page, :size)
  end
end
