Rails.application.routes.draw do
  root 'homepage#index'
  get '*path', to: 'homepage#index', constraints: ->(req) { !req.path.starts_with?('/api/') }
  namespace :api do
    namespace :v1 do
      resources :health, only: [:index]
      resources :articles
      resources :users
      resources :authenticate do
        collection do
          post 'login'
          post 'logout'
        end
      end
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
