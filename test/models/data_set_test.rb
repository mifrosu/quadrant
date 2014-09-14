require 'test_helper'

class DataSetTest < ActiveSupport::TestCase

  def setup
    @file_path = Rails.root.join("test/fixtures/files/basic_test.csv")
  end

  def teardown
  end

  test "DataSet titles are made from a string array and a title" do
    title = "Some fruit"
    array = [" apples ", "pears", " bananas", "oranges "]
    data_set = DataSet.make_headline(array, title)
    assert_equal title, data_set.title
    assert_equal array.each { |e| e.strip! }, [data_set.id_title,
                                               data_set.x_title,
                                               data_set.y_title,
                                               data_set.radius_title]
  end

  test "A DataSet and its row items can be created by importing a CSV" do
    assert_difference 'DataSet.count', 1 do
      File.open(@file_path, 'r') do |file|
        DataSet.import(file)
      end
    end
    data = DataSet.where(title: 'basic_test.csv').first
    assert_equal 12, data.row_items.count
    assert_equal "Creature", data.id_title
    test_array = (data.row_items.map(&:id_text) & ['Adipose', 'Zygon'])
    assert_equal test_array, ['Adipose', 'Zygon']
  end

end
