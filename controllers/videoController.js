const path = require("path")
const ffmpeg = require("fluent-ffmpeg")
const ffmpegStatic = require("ffmpeg-static")
const fs = require("fs")

ffmpeg.setFfmpegPath(ffmpegStatic)

// Function to handle video download
const downloadVideo = async (req, res) => {
  const videoFile = req.query.file // Video filename passed as a query parameter
  const resolution = req.query.resolution || "1080p" // Default resolution
  const outputFormat = "mp4" // You can change based on requirements

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
      `scale=-2:${resolution === "1080p" ? 1080 : 720}`, // Dynamic resolution based on user input
      "-c:v", "libx264", // Encoding with x264 codec
      "-preset", "fast", // Encoding speed (adjust as needed)
      "-movflags", "faststart", // Fast start for MP4 files
    ])
    .on("end", () => {
      console.log("Processing finished successfully")
      res.download(outputPath, (err) => {
        if (err) console.error("Download error:", err)
        fs.unlinkSync(outputPath); // Clean up temp file after download
      })
    })
    .on("error", (err) => {
      console.error("Error processing video:", err)
      res.status(500).send("Error processing video")
    })
    .save(outputPath); // Output file
}

module.exports = { downloadVideo }
