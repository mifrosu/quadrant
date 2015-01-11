require 'test_helper'

class PracticeDataControllerTest < ActionController::TestCase
  setup do
    @practice_datum = practice_data(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:practice_data)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create practice_datum" do
    assert_difference('PracticeDatum.count') do
      post :create, practice_datum: { count: @practice_datum.count, month: @practice_datum.month, practice: @practice_datum.practice, value: @practice_datum.value }
    end

    assert_redirected_to practice_datum_path(assigns(:practice_datum))
  end

  test "should show practice_datum" do
    get :show, id: @practice_datum
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @practice_datum
    assert_response :success
  end

  test "should update practice_datum" do
    patch :update, id: @practice_datum, practice_datum: { count: @practice_datum.count, month: @practice_datum.month, practice: @practice_datum.practice, value: @practice_datum.value }
    assert_redirected_to practice_datum_path(assigns(:practice_datum))
  end

  test "should destroy practice_datum" do
    assert_difference('PracticeDatum.count', -1) do
      delete :destroy, id: @practice_datum
    end

    assert_redirected_to practice_data_path
  end
end
