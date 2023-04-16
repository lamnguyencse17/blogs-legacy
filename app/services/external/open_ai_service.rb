# frozen_string_literal: true

require 'faraday'

class OpenAIService
  def initialize(api_key, organisation)
    @api_key = api_key
    @organisation = organisation
    @chat_completion_uri = '/v1/chat/completions'
    @model = 'gpt-3.5-turbo'
    @role = 'user'

    @conn = Faraday.new(
      url: 'https://api.openai.com',
      headers: { 'Content-Type' => 'application/json' }
    ) do |f|
      f.response :json
      f.adapter :net_http do |http|
        http.read_timeout = 90
      end
    end
  end

  def create_article
    verify_required_configs
    res = @conn.post(craft_chat_completion_url) do |req|
      req.headers['Authorization'] = "Bearer #{@api_key}"
      req.headers['OpenAI-Organization'] = @organisation
      req.body = craft_prompt_message
    end
    parse_chat_completion_response(res.body)
  end

  private

  def verify_required_configs
    if @api_key.nil?
      raise 'OPENAI_KEY must be provided'
    elsif @organisation.nil?
      raise 'ORGANISATION must be provided'
    end
  end

  def craft_prompt_message
    {
      model: @model,
      messages: [{
        role: @role,
        content: 'Generate an at least 3 minute programming article with one of the topics: Node.js, React, Javascript.
The level required to read this should be at least junior developer. The article should not be at introductory level.
The article should include code snippets and example and written in github markdown source code.'
      }]
    }.to_json
  end

  def craft_chat_completion_url
    @conn.build_url(@chat_completion_uri.to_s)
  end

  def parse_chat_completion_response(raw_response)
    choices = raw_response['choices']
    response = choices.first
    [response['finish_reason'], response['message']['content']]
  end
end
