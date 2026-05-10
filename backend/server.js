require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const authRoutes = require("./routes/authRoutes")
const placeRoutes =
  require("./routes/placeRoutes")
const chatRoutes =
  require("./routes/chatRoutes")
  const shopRoutes =
require("./routes/shopRoutes")

  
  const app = express()
  
  app.use(cors({
  origin: "*"
}));
  app.use(express.json())
  
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  
  app.use("/api/auth", authRoutes)
  app.use("/api/places", placeRoutes)
  app.use("/api/chat", chatRoutes)
  app.use("/api/shops", shopRoutes)

app.get("/", (req, res) => {
  res.send("Backend Running")
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
