class RemoveSessionTable < ActiveRecord::Migration[7.0]
  def up
    drop_table :sessions
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
