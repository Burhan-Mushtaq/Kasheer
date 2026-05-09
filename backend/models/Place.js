const mongoose = require("mongoose")

const placeSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  category: String,
  image: String,
  bestSeason: String
})

module.exports = mongoose.model("Place", placeSchema)