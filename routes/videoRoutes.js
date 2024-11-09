
const express = require('express');
const VideoController = require('../controllers/videoController')
const router = express.Router()

router.post('/download-video', VideoController.download)

module.exports = router
