class Article < ApplicationRecord
  belongs_to :user, foreign_key: :user_id

  validates :title, presence: true, length: { minimum: 6 }
  validates :body, presence: true, length: { minimum: 6 }
end
