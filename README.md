# SkyStudio

A Node.js video platform that lets signed-in users download videos in high resolution, with a choice of **1080p** or **720p**. FFMPEG does the processing: each video is scaled to the requested resolution while keeping its quality.

## Features

- Download a video in 1080p or 720p
- Server-side video scaling with FFMPEG
- User authentication

## How it works

1. A signed-in user picks a video and a resolution (1080p or 720p).
2. The server runs the video through FFMPEG, scaling it to the requested resolution.
3. The processed video is returned to the user as a download.

For reference, scaling a video to 720p with FFMPEG looks like this (illustrative, not copied from the code):

```bash
ffmpeg -i input.mp4 -vf "scale=-2:720" output.mp4
```

## Tech stack

- Node.js and JavaScript
- FFMPEG for video processing

## Requirements

- [Node.js](https://nodejs.org/) (a current LTS version)
- [FFMPEG](https://ffmpeg.org/download.html) installed and available on your `PATH`. Check with `ffmpeg -version`.

## Getting started

```bash
git clone https://github.com/shem4soul/Skystudio.git
cd Skystudio
npm install
node app.js
```

<!-- TODO: add the port the app listens on (see app.js) and any .env variables it needs, for example: "Open http://localhost:3000" -->

## Project structure

```
Skystudio/
├── app.js           application entry point
├── routes/          route definitions (for example videoRoutes.js)
├── controllers/     request handlers (for example videoController.js)
├── services/        supporting logic, including user authentication
├── views/           pages shown to the user
└── videos/          source videos
```

<!-- TODO: add a short table of the main routes (method, path, what it does) from routes/videoRoutes.js -->

## Author

**Emmanuel Seun Shittu**, Software Engineer

- GitHub: [github.com/shem4soul](https://github.com/shem4soul)
- LinkedIn: [linkedin.com/in/emmanuel-shittu91573915a](https://linkedin.com/in/emmanuel-shittu91573915a)
