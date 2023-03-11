class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions do |t|
      t.timestamp :expires_in
      t.text :token

      t.timestamps
    end
  end
end
