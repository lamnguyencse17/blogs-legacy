# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

5.times do |time|
  Article.create(
    title: Faker::Lorem.sentence,
    body: Faker::Markdown.sandwich(sentences: 3 * (time + 1)),
    user_id: 5
  )
end
