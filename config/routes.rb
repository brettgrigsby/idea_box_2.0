Rails.application.routes.draw do
  root 'ideas#index'

  put '/ideas/:id/quality', to: 'ideas#update_quality'

  resources :ideas, only: [:create, :edit, :update, :destroy]
end
