class PracticeDatum < ActiveRecord::Base

  def self.chart_data
    self.all.as_json(only: [:practice, :month, :count, :value])
  end

end
