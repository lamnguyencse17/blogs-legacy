require 'test_helper'

class AuthenticateControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get authenticate_index_url
    assert_response :success
  end

  test 'should get login' do
    get authenticate_login_url
    assert_response :success
  end

  test 'should get logout' do
    get authenticate_logout_url
    assert_response :success
  end
end
