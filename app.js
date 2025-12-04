import WaveSurfer from "https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js";

const surfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "violet",
  progressColor: "purple",
  interact: true
});

surfer.load("./resources/whistle.mp3");

// === VISUALIZER SETUP ===
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

const audioCtx = surfer.backend.ac;
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;

const source = surfer.backend.bufferSource;
surfer.backend.gainNode.connect(analyser);

const dataArray = new Uint8Array(analyser.frequencyBinCount);

function draw() {
  requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / dataArray.length) * 2.5;
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i];

    ctx.fillStyle = `rgb(${barHeight + 30}, 50, 200)`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

draw();

// Play button
document.getElementById("playBtn").onclick = () => surfer.playPause();
