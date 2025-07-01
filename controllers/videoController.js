const path = require("path")
const ffmpeg = require("fluent-ffmpeg")
const ffmpegStatic = require("ffmpeg-static")
const fs = require("fs")

ffmpeg.setFfmpegPath(ffmpegStatic)


const downloadVideo = async (req, res) => {
  const videoFile = req.query.file 
  const resolution = req.query.resolution || "1080p" 
  const outputFormat = "mp4" 

  if (!videoFile) {
    return res.status(400).send("Video file not specified.")
  }

  const inputPath = path.join(__dirname, "..", "videos", videoFile)
  const outputPath = path.join(__dirname, "..", "videos", `output_${Date.now()}.${outputFormat}`)

  // Check if video file exists
  if (!fs.existsSync(inputPath)) {
    return res.status(404).send("Video file not found.")
  }

  // FFMPEG command to set resolution and maintain aspect ratio
  ffmpeg(inputPath)
    .outputOptions([
      "-vf", // Video filter options
      `scale=-2:${resolution === "1080p" ? 1080 : 720}`,
      "-c:v", "libx264", 
      "-preset", "fast", 
      "-movflags", "faststart", 
    ])
    .on("end", () => {
      console.log("Processing finished successfully")
      res.download(outputPath, (err) => {
        if (err) console.error("Download error:", err)
        fs.unlinkSync(outputPath);
      })
    })
    .on("error", (err) => {
      console.error("Error processing video:", err)
      res.status(500).send("Error processing video")
    })
    .save(outputPath); 
}

module.exports = { downloadVideo }
