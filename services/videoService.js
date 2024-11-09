
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

class VideoService {
  static downloadVideo(url, resolution, orientation, outputPath) {
    return new Promise((resolve, reject) => {
      let command = ffmpeg(url)
        .outputOptions('-vf', `scale=-2:${resolution}`) // Scale based on desired resolution
        .outputOptions('-preset', 'slow') // for high quality
        .output(outputPath)

      if (orientation === 'horizontal') {
        command.outputOptions('-vf', 'transpose=0'); // Horizontal
      } else if (orientation === 'vertical') {
        command.outputOptions('-vf', 'transpose=2'); // Vertical
      }

      command
        .on('end', () => resolve(outputPath))
        .on('error', (err) => reject(err))
        .run()
    })
  }
}

module.exports = VideoService
