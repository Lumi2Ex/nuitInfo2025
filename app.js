const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const audioFile = document.getElementById('audioFile');
const audioElement = document.getElementById('audio');
const playButton = document.getElementById('playButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.6;

let audioContext;
let analyser;
let source;
let dataArray;
let bufferLength;
let isPlaying = false;

function setupAudio(fileURL) {
  if(audioContext) audioContext.close(); // reset previous audio
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioContext.resume();

  if(source) source.disconnect();
  source = audioContext.createMediaElementSource(audioElement);

  analyser = audioContext.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  analyser.fftSize = 256;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  draw();
}

function draw() {
  requestAnimationFrame(draw);

  if(!analyser) return;

  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i];
    const r = barHeight + 25 * (i / bufferLength);
    const g = 250 * (i / bufferLength);
    const b = 50;

    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

// Handle file selection
audioFile.addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;

  const fileURL = URL.createObjectURL(file);
  audioElement.src = fileURL;

  setupAudio(fileURL);
  isPlaying = false;
  playButton.textContent = 'Play';
});

// Handle play/pause
playButton.addEventListener('click', () => {
  if (!audioElement.src) return;

  if (!isPlaying) {
    audioContext.resume().then(() => {
      audioElement.play();
      playButton.textContent = 'Pause';
      isPlaying = true;
    });
  } else {
    audioElement.pause();
    playButton.textContent = 'Play';
    isPlaying = false;
  }
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.6;
});