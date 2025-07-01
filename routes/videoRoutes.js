

const express = require("express")
const router = express.Router()
const { downloadVideo } = require("../controllers/videoController")

router.get("/download", downloadVideo)

module.exports = router
