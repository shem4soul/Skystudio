
const VideoService = require('../services/videoService')
const path = require('path')

class VideoController {
  static async download(req, res) {
    try {
      const { url, resolution, orientation } = req.body
      const outputPath = path.resolve(__dirname, '../downloads/video.mp4')
      
      await VideoService.downloadVideo(url, resolution, orientation, outputPath)
      res.download(outputPath, 'video.mp4')
    } catch (error) {
      res.status(500).send({ message: 'Failed to download video', error: error.message })
    }
  }
}

module.exports = VideoController
