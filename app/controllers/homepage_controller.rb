class HomepageController < ActionController::Base
  layout 'application'
  def index
    render 'homepage/index'
  end
end
