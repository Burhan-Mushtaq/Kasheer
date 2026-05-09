const express = require("express")
const router = express.Router()

const axios = require("axios")

router.post("/", async (req, res) => {

  try {

    const response = await axios.post(
      "http://localhost:8000/chat",
      {
        message: req.body.message
      }
    )

    res.json(response.data)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })
  }
})

module.exports = router