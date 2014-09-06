class DataSet < ActiveRecord::Base
  has_many :row_items, dependent: :destroy
end
