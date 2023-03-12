# frozen_string_literal: true

require 'jwt'
module JsonWebToken
  extend ActiveSupport::Concern

  JWT_SECRET = ENV['JWT_SECRET'].presence || '12345'
  ALGORITHM = 'HS512'
  ISS = 'lamnguyencse17'
  DECODE_OPTIONS = { algorithm: ALGORITHM }.freeze

  def jwt_encode
    expires_in = Time.now.to_i + 3600 * 24
    jwt_payload = {
      data: { id: @user.id, username: @user.username, email: @user.email },
      iat: Time.now.to_i,
      iss: ISS,
      exp: expires_in
    }
    token = JWT.encode jwt_payload, JWT_SECRET, ALGORITHM
    [token, expires_in]
  end

  def jwt_decode(token)
    decoded = JWT.decode token, JWT_SECRET, true, DECODE_OPTIONS
    claim = decoded.first
    claim['data']
  end
end
