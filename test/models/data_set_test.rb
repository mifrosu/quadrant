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

  test "A DataSet and its row items can be made by importing a CSV" do
    file = File.open(@file_path, 'r')
    data_set = DataSet.import(file)
    file.close
    assert_equal 12, data_set.row_items.count
    assert_equal "Creature", data_set.id_title
    assert_equal "Adipose", data_set.row_items.first.id_text
    assert_equal 0.1, data_set.row_items.first.radius_data
    assert_equal "Zygon", data_set.row_items.last.id_text
    assert_equal 1.0, data_set.row_items.last.radius_data
  end

end
