

const express = require("express")
const router = express.Router()
const { downloadVideo } = require("../controllers/videoController")

// Route to download the video
router.get("/download", downloadVideo)

module.exports = router
