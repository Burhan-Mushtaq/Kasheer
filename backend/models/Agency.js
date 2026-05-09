const mongoose = require("mongoose")

const agencySchema = new mongoose.Schema({
  name: String,
  owner: String,
  description: String,
  location: String,
  contact: String,
  image: String
})

module.exports = mongoose.model("Agency", agencySchema)