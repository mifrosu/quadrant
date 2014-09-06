require 'test_helper'

class RowItemsControllerTest < ActionController::TestCase
  setup do
    @row_item = row_items(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:row_items)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create row_item" do
    assert_difference('RowItem.count') do
      post :create, row_item: { data_set_id: @row_item.data_set_id, id_text: @row_item.id_text, radius_data: @row_item.radius_data, x_data: @row_item.x_data, y_data: @row_item.y_data }
    end

    assert_redirected_to row_item_path(assigns(:row_item))
  end

  test "should show row_item" do
    get :show, id: @row_item
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @row_item
    assert_response :success
  end

  test "should update row_item" do
    patch :update, id: @row_item, row_item: { data_set_id: @row_item.data_set_id, id_text: @row_item.id_text, radius_data: @row_item.radius_data, x_data: @row_item.x_data, y_data: @row_item.y_data }
    assert_redirected_to row_item_path(assigns(:row_item))
  end

  test "should destroy row_item" do
    assert_difference('RowItem.count', -1) do
      delete :destroy, id: @row_item
    end

    assert_redirected_to row_items_path
  end
end
