import WaveSurfer from "https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js";

const surfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "violet",
  progressColor: "purple",
});

// Load any audio URL
surfer.load("/resources/whistle.mp3");

document.getElementById("playBtn").onclick = () => {
  surfer.playPause();
};
