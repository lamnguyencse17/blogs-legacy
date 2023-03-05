class Api::V1::ArticlesController < ApplicationController
  skip_before_action :authenticate_request, only: [:index]
  def index
    @articles = Article.all
    render json: @articles
  end
end
