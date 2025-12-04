import WaveSurfer from "https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js";
import Spectrogram from "https://cdn.jsdelivr.net/npm/wavesurfer.js@7/plugins/spectrogram.esm.js";

const surfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "violet",
  progressColor: "purple",
  // enable WebAudio analyzer
  autoCenter: true,
});

// Load audio
surfer.load("./resources/whistle.mp3");

// Add a spectrogram visualizer
Spectrogram.create({
  wavesurfer: surfer,
  container: "#visualizer",
  labels: true,
});
    
document.getElementById("playBtn").onclick = () => {
  surfer.playPause();
};
