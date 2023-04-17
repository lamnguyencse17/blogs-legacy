require_relative '../services/external/open_ai_service'

class GenerateArticleJob
  include Sidekiq::Job

  def perform(*_args)
    open_ai_service = OpenAiService.new(ENV['OPENAI_KEY'], ENV['OPENAI_ORG'])
    stop_reason, content = open_ai_service.create_article
    return unless stop_reason == 'stop' || content.nil?

    title_match = /(?<=#)\s*(.*?)\s*(?=\n)/.match(content)

    open_ai_user = User.find_by_username('OpenAI')
    Article.create(
      user_id: open_ai_user.id,
      body: fix_bad_header(content),
      title: title_match[0].strip || 'Pending title'
    )
  end

  private

  def fix_bad_header(text)
    text.gsub(/(#+)(\w)/, '\1 \2')
  end
end
