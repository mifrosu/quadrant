require 'test_helper'

class DataSetsControllerTest < ActionController::TestCase
  setup do
    @data_set = data_sets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:data_sets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create data_set" do
    assert_difference('DataSet.count') do
      post :create, data_set: { id_title: @data_set.id_title, radius_title: @data_set.radius_title, title: @data_set.title, x_title: @data_set.x_title, y_title: @data_set.y_title }
    end

    assert_redirected_to data_set_path(assigns(:data_set))
  end

  test "should show data_set" do
    get :show, id: @data_set
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @data_set
    assert_response :success
  end

  test "should update data_set" do
    patch :update, id: @data_set, data_set: { id_title: @data_set.id_title, radius_title: @data_set.radius_title, title: @data_set.title, x_title: @data_set.x_title, y_title: @data_set.y_title }
    assert_redirected_to data_set_path(assigns(:data_set))
  end

  test "should destroy data_set" do
    assert_difference('DataSet.count', -1) do
      delete :destroy, id: @data_set
    end

    assert_redirected_to data_sets_path
  end
end