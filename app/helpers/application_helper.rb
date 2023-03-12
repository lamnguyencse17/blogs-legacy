module ApplicationHelper
  def extract_token
    header = request.headers['Authorization']
    header&.split(' ')&.last || nil
  end
end
