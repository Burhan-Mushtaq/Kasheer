const Place = require("../models/Place")

exports.createPlace = async (req, res) => {

  try {

    const place = await Place.create(req.body)

    res.json(place)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getPlaces = async (req, res) => {

  const places = await Place.find()

  res.json(places)
}