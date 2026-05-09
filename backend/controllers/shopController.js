const Shop = require("../models/Shop")

exports.createShop = async (req, res) => {

  try {

    const shop = await Shop.create(req.body)

    res.json(shop)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })
  }
}

exports.getShops = async (req, res) => {

  try {

    const shops = await Shop.find()

    res.json(shops)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })
  }
}

exports.bulkCreateShops = async (req, res) => {

  try {

    const shops =
      await Shop.insertMany(req.body)

    res.json(shops)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })
  }
}