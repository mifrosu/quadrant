class DataSet < ActiveRecord::Base
  has_many :row_items, dependent: :destroy

  def self.import(file)
    file_data = CSV.read(file.path, {converters: :numeric})
    data_set = self.make_headline(file_data[0], self.sanitize(file.path.to_s))
    self.make_row_items(data_set, file_data[1..-1])
    data_set
  end

  def self.make_headline(row, title)
    self.clean_array!(row)
    DataSet.create!(title: title,
                    id_title: row[0], x_title: row[1],
                    y_title: row[2], radius_title: row[3])
  end

  def chart_data
    self.row_items.as_json(only: [:id_text, :x_data, :y_data, :radius_data])
  end

  private

  def self.make_row_items(data_set, rows)
      rows.each do |row|
        self.clean_array!(row)
        data_set.row_items.create!(id_text: row[0], x_data: row[1],
                                y_data: row[2], radius_data: row[3])
      end
      return true
  end

  def self.clean_array!(array)
    array.each do |e|
      self.clean_string!(e) if e.class == String
    end
  end

  def self.sanitize(filename)
    filename.sub!(/\A.*(\\|\/)/, "")
    self.clean_string!(filename)
  end

  def self.clean_string!(string)
    if string.class == String
      string.strip!
      string.gsub!(/[^\w\.\-]/,"")
    end
    string
  end

end
