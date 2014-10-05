json.array!(@row_items) do |row_item|
  json.extract! row_item, :id, :id_text, :x_data, :y_data, :z_data, :data_set_id
  json.url row_item_url(row_item, format: :json)
end
