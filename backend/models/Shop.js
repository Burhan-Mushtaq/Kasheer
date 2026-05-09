const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({
  name: String,
  owner: String,
  category: String,
  description: String,
  location: String,
  image: String
})

module.exports = mongoose.model("Shop", shopSchema)