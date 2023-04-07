FROM ruby:3.2.2
EXPOSE 80
ENV RAILS_ENV=production
ENV SECRET_KEY_BASE=dummy
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -\
  && apt-get update -qq && apt-get install -qq --no-install-recommends \
    nodejs \
  && apt-get upgrade -qq \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*\
  && npm install -g yarn@1

RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN bundle exec rake assets:clean

RUN bundle exec rake assets:precompile

COPY . .

CMD ["./bin/rails", "s", "-e", "production", "-p", "80"]

