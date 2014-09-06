json.array!(@data_sets) do |data_set|
  json.extract! data_set, :id, :title, :id_title, :x_title, :y_title, :radius_title
  json.url data_set_url(data_set, format: :json)
end
