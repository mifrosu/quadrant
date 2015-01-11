class CreatePracticeData < ActiveRecord::Migration
  def change
    create_table :practice_data do |t|
      t.string :practice
      t.integer :month
      t.integer :count
      t.integer :value

      t.timestamps
    end
  end
end
