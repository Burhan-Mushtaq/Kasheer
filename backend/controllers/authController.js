const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.json(user)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}