class AddFkSessionsUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :sessions do |t|
      t.belongs_to :users, index: true, foreign_key: true
    end
  end
end
