class RenameSessionsForeignKey < ActiveRecord::Migration[7.0]
  def up
    rename_column :sessions, :users_id, :user_id
  end

  def down
    rename_column :sessions, :user_id, :users_id
  end
end
