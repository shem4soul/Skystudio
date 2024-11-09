
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const dotenv = require('dotenv')
const videoRoutes = require('./routes/videoRoutes')

dotenv.config()

app.use(express.json())

const PORT = process.env.PORT || 5000

if (!process.env.MONGODB_URL) {
  console.error("MONGODB_URL is not set in the environment variables.")
  process.exit(1)
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MONGODB CONNECTED!"))
  .catch((error) => console.error("MongoDB connection error:", error))

app.use('/api', videoRoutes)

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})

