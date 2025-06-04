const songs = [
  {
    name: "Relaxing Beat",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    name: "Smooth Chill",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  }
];

const audio = document.getElementById("audioplayer");
const songtitle = document.getElementById("songtitle");
const playpausebtn = document.getElementById("playpausebtn");
const prebtn = document.getElementById("prebtn");
const nextbtn = document.getElementById("nextbtn");
const upload = document.getElementById("upload");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

let currentsong = 0;
let isPlaying = false;

function loadSong(index) {
  audio.src = songs[index].src;
  songtitle.textContent = songs[index].name;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playpausebtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playpausebtn.textContent = "▶";
}

function nextSong() {
  currentsong = (currentsong + 1) % songs.length;
  loadSong(currentsong);
  if (isPlaying) playSong();
}

function prevSong() {
  currentsong = (currentsong - 1 + songs.length) % songs.length;
  loadSong(currentsong);
  if (isPlaying) playSong();
}

playpausebtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextbtn.addEventListener("click", nextSong);
prebtn.addEventListener("click", prevSong);

upload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file);
    const newSong = {
      name: file.name,
      src: fileURL
    };
    songs.push(newSong);
    currentsong = songs.length - 1;
    loadSong(currentsong);
    playSong();
  }
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

loadSong(currentsong);
