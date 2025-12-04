import WaveSurfer from "https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js";

const surfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "violet",
  progressColor: "purple",
});

// MUST be a correct path
surfer.load("./resources/whistle.mp3");

document.getElementById("playBtn").onclick = () => {
  surfer.playPause();
};
