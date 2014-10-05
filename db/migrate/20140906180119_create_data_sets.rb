class CreateDataSets < ActiveRecord::Migration
  def change
    create_table :data_sets do |t|
      t.string :title
      t.string :id_title
      t.string :x_title
      t.string :y_title
      t.string :z_title

      t.timestamps
    end
  end
end
