class CreateRowItems < ActiveRecord::Migration
  def change
    create_table :row_items do |t|
      t.string :id_text
      t.float :x_data
      t.float :y_data
      t.float :z_data
      t.references :data_set, index: true

      t.timestamps
    end
  end
end
