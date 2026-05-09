const express = require("express")

const router = express.Router()

const {
  createPlace,
  getPlaces
} = require("../controllers/placeController")

router.post("/", createPlace)

router.get("/", getPlaces)

module.exports = router