const express = require("express")

const router = express.Router()

const {
  createShop,
  getShops,
  bulkCreateShops
} = require("../controllers/shopController")

router.post("/", createShop)

router.get("/", getShops)

router.post("/bulk", bulkCreateShops)

module.exports = router