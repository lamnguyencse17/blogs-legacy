class RenameArticlesForeignKey < ActiveRecord::Migration[7.0]
  def up
    rename_column :articles, :users_id, :user_id
  end

  def down
    rename_column :articles, :user_id, :users_id
  end
end
