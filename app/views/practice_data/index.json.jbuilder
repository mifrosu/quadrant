json.array!(@practice_data) do |practice_datum|
  json.extract! practice_datum, :id, :practice, :month, :count, :value
  json.url practice_datum_url(practice_datum, format: :json)
end
