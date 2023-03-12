require 'test_helper'

class Api::V1::AuthenticateControllerTest < ActionDispatch::IntegrationTest
  test 'should get login' do
    get api_v1_authenticate_login_url
    assert_response :success
  end

  test 'should get logout' do
    get api_v1_authenticate_logout_url
    assert_response :success
  end

  test 'should get index' do
    get api_v1_authenticate_index_url
    assert_response :success
  end
end
